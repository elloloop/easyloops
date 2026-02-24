# Building APIs -- Making Programs Talk to Each Other

In the last lesson, you learned how the internet works: clients send requests, servers send responses, and they communicate using HTTP. You even used Python's `requests` library to talk to servers that other people built.

Now it is time to build your own server. You are going to create a program that listens on the internet, receives requests, and sends back responses. This is called building an **API**.

---

## What Is an API?

API stands for **Application Programming Interface**. That is a fancy name for a simple idea: **a way for programs to talk to each other.**

When you use a weather app on your phone, the app does not figure out the weather by itself. It sends a request to a weather server (an API), and the server sends back the current weather data. The app just displays it nicely.

### The Waiter Analogy

Think of an API like a **waiter in a restaurant**.

- **You** (the app) sit at your table and decide what you want.
- **The waiter** (the API) comes to your table and takes your order.
- **The kitchen** (the server and its data) prepares what you asked for.
- **The waiter** brings your food back to your table.

You never walk into the kitchen yourself. You do not need to know how the food is made. The waiter is the middleman who takes your request, brings it to the right place, and delivers the result back to you.

An API works the same way. It is a clearly defined set of requests that a program can make, and a clearly defined set of responses it will get back.

![A flat vector illustration in a children's educational book style showing Byte the robot dressed as a waiter, carrying a tray with data packets between a small table with a phone on it and a colorful kitchen counter labeled with gears and databases. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## REST API Design -- A Set of Rules for Organizing APIs

When you build an API, you need to organize it so that other programs know how to use it. The most popular way to organize APIs is called **REST** (Representational State Transfer).

REST is not a tool or a library -- it is a set of rules. Here are the most important ones:

1. **Use URLs to identify things.** Each thing your API manages gets its own URL. Pets live at `/pets`. A specific pet lives at `/pets/3`.

2. **Use HTTP methods to describe actions.** GET means read. POST means create. PUT means update. DELETE means delete.

3. **Send data as JSON.** Requests and responses use JSON format.

4. **Each request is independent.** The server does not remember previous requests. Every request contains everything the server needs to respond.

Here is what a REST API for a pet store might look like:

| Action              | Method   | URL            | What it does              |
|---------------------|----------|----------------|---------------------------|
| List all pets       | `GET`    | `/pets`        | Get a list of every pet   |
| Get one pet         | `GET`    | `/pets/3`      | Get pet number 3          |
| Add a new pet       | `POST`   | `/pets`        | Create a new pet          |
| Update a pet        | `PUT`    | `/pets/3`      | Replace pet number 3      |
| Delete a pet        | `DELETE` | `/pets/3`      | Remove pet number 3       |

Notice the pattern: the **URL** says *what thing* and the **method** says *what action*.

---

## Setting Up FastAPI

**FastAPI** is a Python tool for building APIs. It is designed to be simple, fast, and to work naturally with the type hints you have been learning throughout this course.

To get started, install FastAPI and Uvicorn (the server that runs FastAPI programs):

```bash
pip install fastapi uvicorn
```

FastAPI is the library you write your code with. Uvicorn is the program that actually starts your server and listens for requests.

---

## Your First API -- A "Hello World" Web Server

Let's build the simplest possible API. Create a file called `main.py`:

```python
from fastapi import FastAPI

app: FastAPI = FastAPI()


@app.get("/")
def home() -> dict:
    return {"message": "Hello, world!"}
```

Now run it:

```bash
uvicorn main:app --reload
```

Open your browser and go to `http://127.0.0.1:8000`. You will see:

```json
{"message": "Hello, world!"}
```

That is it. You just built a web server. Let's break down what happened:

1. **`app = FastAPI()`** creates your application.
2. **`@app.get("/")`** tells FastAPI: "When someone sends a GET request to `/`, run this function."
3. **The function returns a dictionary**, and FastAPI automatically converts it to JSON and sends it back.
4. **`uvicorn main:app --reload`** starts the server. `main` is the file name, `app` is the variable name, and `--reload` makes the server restart whenever you change your code.

The address `127.0.0.1` means "this computer" and `8000` is the port number (the door).

---

## Routes -- Different URLs Do Different Things

A **route** is a URL pattern that your server responds to. Each route is connected to a Python function. When a request comes in, FastAPI looks at the URL and the method, finds the matching route, and runs the connected function.

```python
from fastapi import FastAPI

app: FastAPI = FastAPI()


@app.get("/")
def home() -> dict:
    return {"message": "Welcome to the Pet Store!"}


@app.get("/pets")
def list_pets() -> dict:
    return {"pets": ["Buddy", "Whiskers", "Goldie"]}


@app.get("/about")
def about() -> dict:
    return {"name": "Pet Store API", "version": "1.0"}
```

Now your server responds to three different URLs:

- `GET /` returns a welcome message
- `GET /pets` returns a list of pet names
- `GET /about` returns information about the API

Each `@app.get(...)` line is called a **decorator**. You learned about decorators in [[wiki:python-jr-decorators-closures]]. Here, the decorator tells FastAPI which URL and method should trigger which function.

![A flat vector illustration in a children's educational book style showing Byte the robot standing in a colorful hallway with three doors, each door labeled with a different path like a directory sign, with arrows pointing to the matching doors. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Path Parameters -- Values Inside the URL

What if you want to get a specific pet, like pet number 3? You use a **path parameter** -- a value that is part of the URL itself.

```python
from fastapi import FastAPI

app: FastAPI = FastAPI()

pets_db: dict[int, dict] = {
    1: {"id": 1, "name": "Buddy", "animal": "dog", "age": 3},
    2: {"id": 2, "name": "Whiskers", "animal": "cat", "age": 5},
    3: {"id": 3, "name": "Goldie", "animal": "fish", "age": 1},
}


@app.get("/pets/{pet_id}")
def get_pet(pet_id: int) -> dict:
    if pet_id in pets_db:
        return pets_db[pet_id]
    return {"error": "Pet not found"}
```

The `{pet_id}` in the URL is a **placeholder**. When someone visits `/pets/3`, FastAPI takes the `3`, sees that `pet_id` has a type hint of `int`, converts it to the integer 3, and passes it to your function.

- `/pets/1` calls `get_pet(pet_id=1)` and returns Buddy
- `/pets/2` calls `get_pet(pet_id=2)` and returns Whiskers
- `/pets/3` calls `get_pet(pet_id=3)` and returns Goldie

Path parameters are **part of the URL**. They identify a specific thing: `/pets/3` means "pet number 3."

---

## Query Parameters -- Filtering and Searching

What if you want to filter pets by their animal type? You use **query parameters** -- values added to the end of the URL after a `?` sign.

```python
from fastapi import FastAPI

app: FastAPI = FastAPI()

pets_db: list[dict] = [
    {"id": 1, "name": "Buddy", "animal": "dog", "age": 3},
    {"id": 2, "name": "Whiskers", "animal": "cat", "age": 5},
    {"id": 3, "name": "Goldie", "animal": "fish", "age": 1},
    {"id": 4, "name": "Rex", "animal": "dog", "age": 7},
]


@app.get("/pets")
def list_pets(animal: str = "", min_age: int = 0) -> dict:
    results: list[dict] = []

    for pet in pets_db:
        if animal != "" and pet["animal"] != animal:
            continue
        if pet["age"] < min_age:
            continue
        results.append(pet)

    return {"pets": results}
```

Now you can filter:

- `/pets` returns all pets
- `/pets?animal=dog` returns only dogs
- `/pets?min_age=4` returns pets that are 4 or older
- `/pets?animal=dog&min_age=4` returns dogs that are 4 or older

### Path Parameters vs. Query Parameters

| Feature           | Path parameter                | Query parameter                  |
|-------------------|-------------------------------|----------------------------------|
| Where it goes     | Inside the URL: `/pets/3`     | After a `?`: `/pets?color=brown` |
| What it is for    | Identifying a specific thing  | Filtering or searching           |
| Required?         | Usually yes                   | Usually optional                 |
| Example           | "Give me pet number 3"        | "Show me brown pets"             |

Think of it this way: the **path** says "which shelf" and the **query** says "which item on that shelf."

---

## Request Bodies -- Sending Data with POST and PUT

When you create or update something, you need to send data to the server. This data is called the **request body**. It goes inside the request, not in the URL.

With FastAPI, you define what the data should look like using **Pydantic models**.

---

## Pydantic Models -- Automatic Data Checking

A **Pydantic model** is a Python class that describes what your data should look like. FastAPI uses it to automatically check that incoming data has the right fields and the right types.

Think of it like a form at the doctor's office. The form has specific fields: Name (text), Age (number), Phone (text). If someone writes their name in the age field, the form does not make sense. Pydantic catches mistakes like that automatically.

```python
from pydantic import BaseModel


class PetCreate(BaseModel):
    name: str
    animal: str
    age: int
```

This model says: "A pet must have a name (text), an animal type (text), and an age (whole number)." If someone sends data that does not match -- like sending a word where the age should be -- FastAPI will automatically send back a clear error message. You do not need to write the checking code yourself.

---

## Building a Complete Mini-API: The Pet Store

Let's put everything together and build a complete API with all five actions: list, get, create, update, and delete.

```python
from fastapi import FastAPI
from pydantic import BaseModel


# --- Pydantic Models ---

class PetCreate(BaseModel):
    name: str
    animal: str
    age: int


class PetUpdate(BaseModel):
    name: str
    animal: str
    age: int


# --- App Setup ---

app: FastAPI = FastAPI()

# Our "database" -- a simple dictionary (for now)
pets_db: dict[int, dict] = {}
next_id: int = 1


# --- Routes ---

@app.get("/pets")
def list_pets() -> dict:
    """List all pets in the store."""
    all_pets: list[dict] = list(pets_db.values())
    return {"pets": all_pets}


@app.get("/pets/{pet_id}")
def get_pet(pet_id: int) -> dict:
    """Get a single pet by its ID."""
    if pet_id not in pets_db:
        return {"error": "Pet not found"}
    return pets_db[pet_id]


@app.post("/pets", status_code=201)
def create_pet(pet: PetCreate) -> dict:
    """Add a new pet to the store."""
    global next_id

    new_pet: dict = {
        "id": next_id,
        "name": pet.name,
        "animal": pet.animal,
        "age": pet.age,
    }
    pets_db[next_id] = new_pet
    next_id = next_id + 1

    return new_pet


@app.put("/pets/{pet_id}")
def update_pet(pet_id: int, pet: PetUpdate) -> dict:
    """Replace a pet's information."""
    if pet_id not in pets_db:
        return {"error": "Pet not found"}

    updated_pet: dict = {
        "id": pet_id,
        "name": pet.name,
        "animal": pet.animal,
        "age": pet.age,
    }
    pets_db[pet_id] = updated_pet

    return updated_pet


@app.delete("/pets/{pet_id}")
def delete_pet(pet_id: int) -> dict:
    """Remove a pet from the store."""
    if pet_id not in pets_db:
        return {"error": "Pet not found"}

    deleted_pet: dict = pets_db.pop(pet_id)
    return {"message": "Pet deleted", "pet": deleted_pet}
```

Save this as `main.py` and run it:

```bash
uvicorn main:app --reload
```

### Testing Your API

FastAPI gives you a free interactive documentation page. Open your browser and go to:

```
http://127.0.0.1:8000/docs
```

You will see a beautiful page that lists every route in your API. You can click on any route, fill in the data, and test it right from your browser. This page is generated automatically from your code -- you did not have to write it.

Here is how you would test each action:

**Create a pet** (POST /pets):
```json
{
    "name": "Buddy",
    "animal": "dog",
    "age": 3
}
```

**List all pets** (GET /pets):
```
Just visit http://127.0.0.1:8000/pets
```

**Get a specific pet** (GET /pets/1):
```
Visit http://127.0.0.1:8000/pets/1
```

**Update a pet** (PUT /pets/1):
```json
{
    "name": "Buddy",
    "animal": "dog",
    "age": 4
}
```

**Delete a pet** (DELETE /pets/1):
```
Send a DELETE request to http://127.0.0.1:8000/pets/1
```

![A flat vector illustration in a children's educational book style showing Byte the robot proudly standing next to a colorful pet store shelf with labeled sections for dogs, cats, and fish, with a glowing computer screen showing an API response behind the counter. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Error Handling in APIs

Right now our API returns `{"error": "Pet not found"}` with a 200 status code when a pet does not exist. But that is not quite right. A "not found" response should use status code 404. Let's fix that using FastAPI's `HTTPException`:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app: FastAPI = FastAPI()

pets_db: dict[int, dict] = {}
next_id: int = 1


class PetCreate(BaseModel):
    name: str
    animal: str
    age: int


@app.get("/pets/{pet_id}")
def get_pet(pet_id: int) -> dict:
    if pet_id not in pets_db:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pets_db[pet_id]


@app.delete("/pets/{pet_id}")
def delete_pet(pet_id: int) -> dict:
    if pet_id not in pets_db:
        raise HTTPException(status_code=404, detail="Pet not found")
    deleted_pet: dict = pets_db.pop(pet_id)
    return {"message": "Pet deleted", "pet": deleted_pet}
```

`HTTPException` is like `raise ValueError(...)` that you learned in [[wiki:python-jr-error-handling]], but designed for web APIs. It sends the right status code and a helpful error message back to whoever made the request.

When someone asks for `/pets/999` and pet 999 does not exist, they now get:

- Status code: **404**
- Body: `{"detail": "Pet not found"}`

This is much better. The status code tells the client exactly what happened, and the message explains it in words.

### Validation Errors from Pydantic

Pydantic models handle another kind of error automatically. If someone sends data in the wrong format, FastAPI sends back a **422 status code** with a clear explanation of what was wrong.

For example, if someone tries to create a pet with `"age": "old"` instead of a number, they get:

```json
{
    "detail": [
        {
            "loc": ["body", "age"],
            "msg": "Input should be a valid integer",
            "type": "int_parsing"
        }
    ]
}
```

You did not have to write any of that error-handling code. Pydantic and FastAPI did it for you, because you used type hints in your Pydantic model.

---

## Quick Summary

| Concept            | What it means                                                      |
|--------------------|--------------------------------------------------------------------|
| API                | A way for programs to talk to each other                           |
| REST               | A set of rules for organizing APIs around URLs and HTTP methods    |
| FastAPI            | A Python tool for building APIs                                    |
| Route              | A URL pattern connected to a function                              |
| Path parameter     | A value inside the URL that identifies a specific thing (`/pets/3`)|
| Query parameter    | A filter added after `?` in the URL (`/pets?animal=dog`)          |
| Request body       | Data sent with POST/PUT requests                                   |
| Pydantic model     | A class that describes and checks the shape of your data           |
| HTTPException      | A way to send proper error codes from your API                     |

---

## Practice Questions

Try to answer these on your own before checking the answers at the bottom of the page.

**Question 1:** In the waiter analogy, what does the waiter represent? What does the kitchen represent? What do you (the customer) represent?

**Question 2:** You are building an API for a library. Design the REST routes (URL + method) for these actions:

- List all books
- Get a specific book
- Add a new book
- Update a book
- Delete a book

**Question 3:** What is the difference between a path parameter and a query parameter? Give an example of when you would use each one.

**Question 4:** Write a Pydantic model for a `Book` that has a title (text), an author (text), a number of pages (whole number), and a rating (decimal number).

**Question 5:** What happens if someone sends a POST request to create a pet but forgets to include the `age` field? What status code do they get?

**Question 6:** Why do we use `HTTPException` with status code 404 instead of just returning `{"error": "Not found"}` with the default 200 status code?

**Question 7:** Write a FastAPI route that takes a `book_id` as a path parameter and a `format` as an optional query parameter (defaulting to `"short"`). If `format` is `"short"`, return just the title. If `format` is `"full"`, return all the book details.

**Question 8:** What URL would you visit in your browser to see the automatic documentation page that FastAPI creates?

---

## Answers to Practice Questions

**Answer 1:** The waiter represents the **API** -- the middleman that takes your request and brings back the result. The kitchen represents the **server and its data** -- where the actual work gets done. You (the customer) represent the **client application** (like a phone app or a browser) that makes requests and uses the responses.

**Answer 2:**

| Action            | Method   | URL              |
|-------------------|----------|------------------|
| List all books    | `GET`    | `/books`         |
| Get a specific book | `GET`  | `/books/{book_id}` |
| Add a new book    | `POST`   | `/books`         |
| Update a book     | `PUT`    | `/books/{book_id}` |
| Delete a book     | `DELETE` | `/books/{book_id}` |

**Answer 3:** A **path parameter** is part of the URL and identifies a specific thing. Example: `/pets/3` to get pet number 3. A **query parameter** comes after a `?` and is used for filtering or optional settings. Example: `/pets?animal=dog` to list only dogs. Use path parameters when you want a specific item. Use query parameters when you want to search or filter a list.

**Answer 4:**

```python
from pydantic import BaseModel

class Book(BaseModel):
    title: str
    author: str
    pages: int
    rating: float
```

**Answer 5:** FastAPI and Pydantic automatically catch the missing field and send back a **422 status code** (Unprocessable Entity) with an error message explaining that the `age` field is required. You do not need to write code to check for this -- the Pydantic model handles it.

**Answer 6:** Status codes are important because they tell the client program what happened without needing to read the message. A 200 status code means "everything worked fine," so a client program might think the request succeeded even though the pet was not found. A 404 status code clearly communicates "this thing does not exist," and client programs can handle that differently (like showing a "not found" page).

**Answer 7:**

```python
@app.get("/books/{book_id}")
def get_book(book_id: int, format: str = "short") -> dict:
    if book_id not in books_db:
        raise HTTPException(status_code=404, detail="Book not found")

    book: dict = books_db[book_id]

    if format == "short":
        return {"title": book["title"]}
    else:
        return book
```

**Answer 8:** Visit `http://127.0.0.1:8000/docs` in your browser. FastAPI automatically generates this interactive documentation page from your route definitions and Pydantic models.

---

**Previous:** [[wiki:python-jr-backend-http]] | **Next:** [[wiki:python-jr-backend-databases]]
