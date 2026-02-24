# Building APIs -- Creating Your Own Server

In the previous page you learned how to call APIs that other people built. Now you are going to build your own. You will create a program that listens for HTTP requests and sends back responses. That program is called a web server.

By the end of this page, you will have a working REST API that handles creating, reading, updating, and deleting data.

---

## What Is a Web Server?

A web server is a program that:

1. Starts up and listens on a port (like a door number)
2. Waits for HTTP requests to arrive
3. Looks at each request (what method? what URL? what data?)
4. Runs some code based on the request
5. Sends back an HTTP response

That is all it does. Listen, process, respond. Over and over.

```
Client sends: GET /users/42
                    |
                    v
Server receives the request
                    |
                    v
Server runs your code: look_up_user(42)
                    |
                    v
Server sends back: 200 OK {"name": "Alice", "age": 30}
```

---

## Why FastAPI?

There are many Python web frameworks. We are using **FastAPI** because:

1. **It uses type hints everywhere.** You have been learning type hints throughout this course. FastAPI makes them actually do something -- it validates input automatically based on your types.
2. **It is fast to learn.** Less boilerplate than Flask or Django.
3. **It generates documentation automatically.** Your API gets a built-in interactive docs page.
4. **It is modern.** Built on current Python standards (3.7+).

Install FastAPI and Uvicorn (the server that runs FastAPI apps):

```bash
pip install fastapi uvicorn
```

---

## Your First API

Open your editor. Create a file called `main.py`. Type this:

```python
from fastapi import FastAPI

app: FastAPI = FastAPI()


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Hello, World!"}


@app.get("/hello/{name}")
def hello(name: str) -> dict[str, str]:
    return {"message": f"Hello, {name}!"}
```

Run it:

```bash
uvicorn main:app --reload
```

- `main` = the file name (main.py)
- `app` = the variable name of your FastAPI instance
- `--reload` = restart automatically when you change code

Open your browser and go to `http://127.0.0.1:8000`. You should see:

```json
{"message": "Hello, World!"}
```

Go to `http://127.0.0.1:8000/hello/Alice`. You should see:

```json
{"message": "Hello, Alice!"}
```

Now go to `http://127.0.0.1:8000/docs`. FastAPI generated interactive API documentation for you. This is Swagger UI, and it lets you test your endpoints right in the browser.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I created a FastAPI app with @app.get('/hello/{name}'). Explain what happens step by step when a browser visits http://127.0.0.1:8000/hello/Alice. What does the decorator do? What is 'name: str' in the function signature? How does the return value become JSON?"</div>
</div>

---

## Route Parameters vs Query Parameters

There are two ways to pass data in a URL.

### Route Parameters: Part of the Path

Route parameters are embedded in the URL path. Use them for identifying a specific resource.

```python
@app.get("/users/{user_id}")
def get_user(user_id: int) -> dict[str, int | str]:
    return {"user_id": user_id, "name": f"User {user_id}"}
```

URL: `/users/42` -- FastAPI extracts `42` and converts it to `int` because you declared `user_id: int`.

If someone visits `/users/abc`, FastAPI automatically returns a 422 error because `"abc"` is not an integer. You did not write any validation code. The type hint did it for you.

### Query Parameters: After the Question Mark

Query parameters are key-value pairs after `?` in the URL. Use them for optional settings like pagination, filtering, and sorting.

```python
@app.get("/users")
def list_users(page: int = 1, limit: int = 10) -> dict[str, int | list[str]]:
    # Default values make these parameters optional
    start: int = (page - 1) * limit
    end: int = start + limit
    fake_users: list[str] = [f"User {i}" for i in range(start, end)]
    return {"page": page, "limit": limit, "users": fake_users}
```

URL: `/users?page=2&limit=5`

If you leave out a query parameter, it uses the default value. `/users` is the same as `/users?page=1&limit=10`.

---

## Request Bodies with Pydantic Models

When a client sends data to create or update something, that data comes in the request body. FastAPI uses Pydantic models to define and validate the shape of that data.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app: FastAPI = FastAPI()


class TaskCreate(BaseModel):
    """What the client sends to create a new task."""
    title: str
    description: str = ""  # optional, defaults to empty string
    completed: bool = False


class TaskResponse(BaseModel):
    """What the server sends back."""
    id: int
    title: str
    description: str
    completed: bool


@app.post("/tasks", status_code=201)
def create_task(task: TaskCreate) -> TaskResponse:
    # In a real app, you would save to a database here
    new_task: TaskResponse = TaskResponse(
        id=1,
        title=task.title,
        description=task.description,
        completed=task.completed
    )
    return new_task
```

When a client sends a POST request with this JSON body:

```json
{"title": "Learn FastAPI", "description": "Build a REST API"}
```

FastAPI automatically:
1. Reads the JSON from the request body
2. Validates that `title` is a string (required), `description` is a string, `completed` is a boolean
3. Creates a `TaskCreate` object with the data
4. Passes it to your function as the `task` parameter

If the client sends invalid data (missing `title`, wrong type), FastAPI returns a 422 error with a detailed explanation of what went wrong. You wrote zero validation code.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a Pydantic model called BookCreate with fields: title (string, required), author (string, required), pages (integer, required), isbn (string, optional with default empty string). Then create a BookResponse model that adds an 'id' field. Write a POST endpoint that accepts BookCreate and returns BookResponse."</div>
</div>

---

## Building a Complete REST API -- TODO App

This is the main project for this page. Open your editor. Build this step by step.

### The Full Application

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


# --- Models ---

class TodoCreate(BaseModel):
    """Data needed to create a new todo."""
    title: str
    description: str = ""
    completed: bool = False


class TodoUpdate(BaseModel):
    """Data that can be updated on a todo."""
    title: str | None = None
    description: str | None = None
    completed: bool | None = None


class TodoResponse(BaseModel):
    """Data returned for a todo."""
    id: int
    title: str
    description: str
    completed: bool


# --- App Setup ---

app: FastAPI = FastAPI(title="Todo API", version="1.0.0")

# In-memory storage (a real app would use a database)
todos: dict[int, TodoResponse] = {}
next_id: int = 1


# --- Endpoints ---

@app.get("/todos")
def list_todos(completed: bool | None = None) -> list[TodoResponse]:
    """Get all todos. Optionally filter by completed status."""
    all_todos: list[TodoResponse] = list(todos.values())
    if completed is not None:
        all_todos = [t for t in all_todos if t.completed == completed]
    return all_todos


@app.get("/todos/{todo_id}")
def get_todo(todo_id: int) -> TodoResponse:
    """Get a single todo by ID."""
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todos[todo_id]


@app.post("/todos", status_code=201)
def create_todo(todo: TodoCreate) -> TodoResponse:
    """Create a new todo."""
    global next_id
    new_todo: TodoResponse = TodoResponse(
        id=next_id,
        title=todo.title,
        description=todo.description,
        completed=todo.completed
    )
    todos[next_id] = new_todo
    next_id += 1
    return new_todo


@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate) -> TodoResponse:
    """Update an existing todo."""
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")

    existing: TodoResponse = todos[todo_id]

    # Only update fields that were provided
    updated_data: dict[str, object] = existing.model_dump()
    if todo.title is not None:
        updated_data["title"] = todo.title
    if todo.description is not None:
        updated_data["description"] = todo.description
    if todo.completed is not None:
        updated_data["completed"] = todo.completed

    updated_todo: TodoResponse = TodoResponse(**updated_data)
    todos[todo_id] = updated_todo
    return updated_todo


@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int) -> None:
    """Delete a todo."""
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    del todos[todo_id]
```

### What Each Endpoint Does

| Method | URL | What It Does | Status Code |
|--------|-----|-------------|-------------|
| GET | /todos | List all todos | 200 |
| GET | /todos/1 | Get todo with ID 1 | 200 or 404 |
| POST | /todos | Create a new todo | 201 |
| PUT | /todos/1 | Update todo with ID 1 | 200 or 404 |
| DELETE | /todos/1 | Delete todo with ID 1 | 204 or 404 |

Run the app and try it out at `http://127.0.0.1:8000/docs`. The Swagger UI lets you test every endpoint interactively.

---

## Error Handling with HTTPException

When something goes wrong, raise an `HTTPException`. This sends back the right status code and an error message.

```python
from fastapi import FastAPI, HTTPException

app: FastAPI = FastAPI()


@app.get("/items/{item_id}")
def get_item(item_id: int) -> dict[str, str]:
    if item_id < 1:
        raise HTTPException(
            status_code=400,
            detail="Item ID must be a positive integer"
        )
    if item_id > 100:
        raise HTTPException(
            status_code=404,
            detail=f"Item {item_id} not found"
        )
    return {"item": f"Item {item_id}"}
```

When you raise `HTTPException(status_code=404, detail="Item not found")`, FastAPI sends back:

```json
{"detail": "Item not found"}
```

with a 404 status code. The client knows exactly what went wrong.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Extend the Todo API to add a new endpoint: GET /todos/stats that returns a dictionary with three fields: total (total number of todos), completed (number of completed todos), and pending (number of pending todos). Write the endpoint function with full type hints."</div>
</div>

---

## Middleware -- Code That Runs on Every Request

Middleware is code that runs before and/or after every request. Common uses: logging, timing, adding headers.

```python
import time
from fastapi import FastAPI, Request

app: FastAPI = FastAPI()


@app.middleware("http")
async def add_timing_header(request: Request, call_next):
    """Measure how long each request takes."""
    start_time: float = time.time()
    response = await call_next(request)
    process_time: float = time.time() - start_time
    response.headers["X-Process-Time"] = str(round(process_time, 4))
    return response
```

Do not worry about `async` and `await` right now. This is just showing you the concept. Every response from your server will now include an `X-Process-Time` header showing how many seconds the request took.

---

## CORS -- Allowing Other Websites to Call Your API

By default, a web browser will block requests from one website to a different domain. This is a security feature called CORS (Cross-Origin Resource Sharing).

If your API runs on `localhost:8000` and your frontend runs on `localhost:3000`, the browser will block the frontend from calling your API unless you explicitly allow it.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)
```

In production, replace `["*"]` with specific values. Allowing everything is a security risk.

---

## A Brief Note on Flask

Flask is another popular Python web framework. You will see it in many tutorials and job postings. Here is the same "Hello World" in Flask for comparison:

```python
from flask import Flask, jsonify

app: Flask = Flask(__name__)


@app.route("/hello/<name>", methods=["GET"])
def hello(name: str):
    return jsonify({"message": f"Hello, {name}!"})
```

Flask works well, but it does not use type hints for validation like FastAPI does. With Flask, you have to validate input manually. FastAPI gives you that for free.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Build a complete REST API for a contacts list. You need: a Contact model with name, email, and phone (all strings). Endpoints for: list all contacts (GET /contacts), get one contact (GET /contacts/{id}), create a contact (POST /contacts), and delete a contact (DELETE /contacts/{id}). Use in-memory storage like the Todo example. Include error handling for missing contacts."</div>
</div>

---

## Project Structure for Larger APIs

As your API grows, you should not keep everything in one file. Here is a common structure:

```
my_api/
    main.py          # app creation and startup
    models.py        # Pydantic models
    routes/
        __init__.py
        users.py     # user-related endpoints
        todos.py     # todo-related endpoints
    services/
        __init__.py
        user_service.py  # business logic for users
```

FastAPI has a feature called **routers** that lets you split endpoints across files:

```python
# routes/users.py
from fastapi import APIRouter

router: APIRouter = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
def list_users() -> list[dict[str, str]]:
    return [{"name": "Alice"}, {"name": "Bob"}]


@router.get("/{user_id}")
def get_user(user_id: int) -> dict[str, str | int]:
    return {"id": user_id, "name": f"User {user_id}"}
```

```python
# main.py
from fastapi import FastAPI
from routes.users import router as user_router

app: FastAPI = FastAPI()
app.include_router(user_router)
```

Now `/users/` and `/users/42` work, and your code is organized.

---

## Where People Go Wrong

**Not validating input.** If a user sends garbage data, your server should return a clear error, not crash. Pydantic models handle this, but only if you use them. Never trust raw input.

**Using the wrong HTTP methods.** Creating a resource with GET, or reading data with POST. Follow REST conventions. Interviewers and teammates will notice.

**Not handling errors.** Every endpoint should handle the case where things go wrong. What if the ID does not exist? What if the data is incomplete? Always raise HTTPException with a clear message.

**Putting all code in one file.** Fine for learning, but real projects need structure. Use routers and separate files once you have more than a few endpoints.

**Ignoring the auto-generated docs.** FastAPI gives you free, interactive documentation at `/docs`. Use it to test your API during development. Show it to your teammates. It is one of FastAPI's best features.

---

## Key Takeaways

1. A web server listens for HTTP requests and sends responses.
2. FastAPI uses type hints for automatic input validation. Declare your types and FastAPI does the rest.
3. Route parameters go in the URL path. Query parameters go after `?`.
4. Pydantic models define the shape and validation of request/response data.
5. Use HTTPException to return proper error codes and messages.
6. CRUD maps to HTTP methods: Create (POST), Read (GET), Update (PUT), Delete (DELETE).

---

**Previous:** [[wiki:python-backend-http]] | **Next:** [[wiki:python-backend-databases]]
