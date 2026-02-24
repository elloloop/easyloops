# HTTP and the Web -- How the Internet Communicates

Every time you visit a website, check social media, or use an app on your phone, your device is having a conversation with another computer somewhere in the world. That conversation follows a set of rules called HTTP. Before you can build anything for the web, you need to understand how this conversation works.

---

## What Is the Internet? The Client-Server Model

The internet is a network of computers that can talk to each other. That is it. Everything else is built on top of that simple idea.

When you open a web browser and go to a website, here is what happens:

1. **Your computer** (the **client**) sends a request: "Give me the homepage."
2. **Another computer** (the **server**) receives that request and sends back a response: "Here is the HTML for the homepage."

```
Client (your browser)          Server (example.com)
       |                              |
       |--- "GET /homepage" --------->|
       |                              |
       |<-- "200 OK, here's HTML" ----|
       |                              |
```

That is the client-server model. The client asks. The server answers. Every single interaction on the web follows this pattern.

**Key point:** The client and server are just programs running on computers. Your browser is a client program. A web server is a server program. Later in this learning path, you will build your own server program.

---

## What Is HTTP?

HTTP stands for **HyperText Transfer Protocol**. A protocol is just a set of rules for how two computers should talk to each other.

Think of it like a conversation format. If you call a restaurant to order food, there is an expected format:

1. You say what you want (the request)
2. They confirm the order and give you a total (the response)

HTTP is the same idea but for computers. The rules define:
- How to ask for data
- How to send data
- How to report errors
- What format to use

---

## HTTP Methods -- What Are You Trying to Do?

Every HTTP request includes a **method** that tells the server what kind of action you want. There are five main ones:

| Method | Meaning | Example |
|--------|---------|---------|
| GET | Give me data | Load a user's profile |
| POST | Here is new data, create something | Sign up a new user |
| PUT | Replace this data entirely | Update a user's entire profile |
| PATCH | Change part of this data | Update just the user's email |
| DELETE | Remove this data | Delete a user's account |

Think of it this way:
- **GET** = "Give me data" (reading)
- **POST** = "Here's new data" (creating)
- **PUT** = "Replace this" (full update)
- **PATCH** = "Change this part" (partial update)
- **DELETE** = "Remove this" (deleting)

**A GET request should never change anything on the server.** Refreshing a page (which sends a GET) should not accidentally delete your account. This is called being "safe" and "idempotent."

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I want to build a to-do list app. What HTTP method would I use to: (1) see all my tasks, (2) add a new task, (3) mark a task as complete, (4) remove a task? Explain why each method fits."</div>
</div>

---

## URLs -- Where to Find Things

A URL (Uniform Resource Locator) is the address that tells you where something lives on the internet.

```
https://api.example.com:443/users/42?format=json#profile
|___|   |_______________|___|______| |__________| |_____|
scheme       host       port  path     query     fragment
```

Let us break each part down:

- **Scheme**: `https` -- the protocol to use (HTTP or HTTPS for encrypted)
- **Host**: `api.example.com` -- which server to talk to
- **Port**: `443` -- which "door" on the server (443 is default for HTTPS, 80 for HTTP)
- **Path**: `/users/42` -- which resource on that server
- **Query**: `?format=json` -- extra parameters (key=value pairs, separated by `&`)
- **Fragment**: `#profile` -- a section within the page (only used by the browser, not sent to the server)

In practice, you will mostly deal with the **path** and **query** parts when building APIs.

---

## HTTP Request Anatomy

Every HTTP request has these parts:

```
POST /users HTTP/1.1              <-- method, path, version
Host: api.example.com             <-- header
Content-Type: application/json    <-- header
Authorization: Bearer abc123      <-- header
                                  <-- blank line separates headers from body
{"name": "Alice", "age": 30}      <-- body (optional)
```

1. **Request line**: the method (POST), the path (/users), and the HTTP version
2. **Headers**: key-value pairs with metadata about the request
3. **Body**: the actual data you are sending (not all requests have a body -- GET usually does not)

---

## HTTP Response Anatomy

The server sends back a response in a similar format:

```
HTTP/1.1 201 Created              <-- version, status code, reason
Content-Type: application/json    <-- header
                                  <-- blank line
{"id": 1, "name": "Alice"}        <-- body
```

1. **Status line**: the HTTP version, status code, and human-readable reason
2. **Headers**: metadata about the response
3. **Body**: the actual data being returned

---

## Status Codes -- What Happened?

Status codes tell the client what happened with their request. They are grouped by the first digit:

| Range | Category | Meaning |
|-------|----------|---------|
| 1xx | Informational | Request received, processing |
| 2xx | Success | Request worked |
| 3xx | Redirection | Go look somewhere else |
| 4xx | Client Error | You did something wrong |
| 5xx | Server Error | The server broke |

**The codes you will use most:**

| Code | Name | When to Use |
|------|------|-------------|
| 200 | OK | Request succeeded. Here is the data. |
| 201 | Created | New resource was created successfully. |
| 204 | No Content | Success, but nothing to send back (used for DELETE). |
| 400 | Bad Request | The client sent invalid data. |
| 401 | Unauthorized | You need to log in first. |
| 403 | Forbidden | You are logged in but not allowed to do this. |
| 404 | Not Found | That resource does not exist. |
| 422 | Unprocessable Entity | Data format is right but values are wrong. |
| 500 | Internal Server Error | Something crashed on the server. |

**How to remember the difference between 401 and 403:**
- 401 = "Who are you?" (not authenticated)
- 403 = "I know who you are, but you can't do that." (not authorized)

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What status code should a server return in each scenario: (1) user successfully loads their profile, (2) user tries to access a page that does not exist, (3) user submits a form with missing required fields, (4) user tries to view someone else's private data while logged in, (5) the server's database crashes mid-request?"</div>
</div>

---

## Headers -- Metadata About the Message

Headers carry important information that is not the actual data but tells you about it.

**Common request headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| Content-Type | What format is the body? | `application/json` |
| Accept | What format do you want back? | `application/json` |
| Authorization | Who am I? | `Bearer eyJhbG...` |
| User-Agent | What software is making the request? | `Mozilla/5.0` |

**Common response headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| Content-Type | What format is the body? | `application/json` |
| Content-Length | How big is the body? | `256` |
| Set-Cookie | Save this data in the browser | `session_id=abc123` |

---

## JSON -- The Language of APIs

JSON (JavaScript Object Notation) is how most APIs send and receive data. It looks very similar to Python dictionaries.

```json
{
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com",
    "hobbies": ["reading", "coding"],
    "address": {
        "city": "New York",
        "state": "NY"
    }
}
```

JSON supports these types:
- Strings: `"hello"`
- Numbers: `42`, `3.14`
- Booleans: `true`, `false`
- Null: `null`
- Arrays: `[1, 2, 3]`
- Objects: `{"key": "value"}`

**Python to JSON and back:**

```python
import json

# Python dict -> JSON string
user_data: dict[str, str | int] = {"name": "Alice", "age": 30}
json_string: str = json.dumps(user_data)
print(json_string)        # '{"name": "Alice", "age": 30}'
print(type(json_string))  # <class 'str'>

# JSON string -> Python dict
raw_json: str = '{"name": "Bob", "age": 25}'
parsed_data: dict[str, str | int] = json.loads(raw_json)
print(parsed_data["name"])  # Bob
print(type(parsed_data))    # <class 'dict'>
```

Notice the function names: `dumps` (dump to string) and `loads` (load from string). The `s` stands for "string."

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Convert this Python dictionary to a JSON string and back: {'users': [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}], 'total': 2}. Show the code using json.dumps() and json.loads(). What Python types do JSON arrays and objects become?"</div>
</div>

---

## Making HTTP Requests with Python

The `requests` library makes it easy to send HTTP requests from Python. Open your editor and try this.

First, install the library:

```bash
pip install requests
```

### GET Request -- Fetching Data

```python
import requests

# Fetch a list of users from a public test API
response: requests.Response = requests.get(
    "https://jsonplaceholder.typicode.com/users"
)

# Check the status code
print(response.status_code)  # 200

# Get the response body as JSON (parsed into Python dicts/lists)
users: list[dict[str, object]] = response.json()

# Print the first user's name
print(users[0]["name"])  # Leanne Graham
```

### POST Request -- Sending Data

```python
import requests

# Create a new post
new_post: dict[str, str | int] = {
    "title": "My First Post",
    "body": "Hello, world!",
    "userId": 1
}

response: requests.Response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=new_post  # automatically converts to JSON and sets Content-Type
)

print(response.status_code)  # 201 (Created)
created_post: dict[str, object] = response.json()
print(created_post["id"])  # 101
```

### Handling Errors

```python
import requests

response: requests.Response = requests.get(
    "https://jsonplaceholder.typicode.com/users/9999"
)

if response.status_code == 200:
    user: dict[str, object] = response.json()
    print(f"Found user: {user['name']}")
elif response.status_code == 404:
    print("User not found")
else:
    print(f"Unexpected error: {response.status_code}")
```

### Adding Headers

```python
import requests

headers: dict[str, str] = {
    "Authorization": "Bearer my-secret-token",
    "Accept": "application/json"
}

response: requests.Response = requests.get(
    "https://api.example.com/protected-data",
    headers=headers
)
```

---

## What Is an API?

API stands for **Application Programming Interface**. It is a way for programs to talk to each other.

When you use the `requests` library to fetch data from a website, you are calling that website's API. The API defines:
- What endpoints (URLs) are available
- What methods (GET, POST, etc.) each endpoint accepts
- What data format to send and receive
- What authentication is required

Think of a restaurant menu. The menu is the API. It tells you what you can order (endpoints), how to order it (methods), and what you will get back (response format). You do not need to know how the kitchen works. You just follow the menu.

---

## REST -- A Set of Conventions

REST (Representational State Transfer) is not a technology. It is a set of conventions for designing APIs. Most APIs you will encounter follow REST principles.

**REST conventions:**

1. **Resources have URLs**: `/users`, `/users/42`, `/posts/7/comments`
2. **Use HTTP methods**: GET to read, POST to create, PUT to update, DELETE to remove
3. **Use status codes**: 200 for success, 404 for not found, etc.
4. **Stateless**: each request is independent. The server does not remember your previous request.

**Stateless** is the key concept. If you send a GET request for user 42, the server does not remember that you just asked about user 42. If you want to ask again, you send the full request again. Every request contains all the information the server needs.

Why stateless? Because it makes servers simpler and more scalable. Any server in a cluster can handle any request because no server needs to remember what happened before.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Design a REST API for a bookstore. What URLs would you create for: listing all books, getting one book by ID, adding a new book, updating a book's price, and deleting a book? What HTTP method goes with each? What status code should each return on success?"</div>
</div>

---

## Putting It All Together -- A Complete Example

Open your editor. Build this program that interacts with a real API.

```python
import requests
import json


def get_all_posts() -> list[dict[str, object]]:
    """Fetch all posts from the API."""
    response: requests.Response = requests.get(
        "https://jsonplaceholder.typicode.com/posts"
    )
    response.raise_for_status()  # raises exception if status >= 400
    posts: list[dict[str, object]] = response.json()
    return posts


def get_post_by_id(post_id: int) -> dict[str, object] | None:
    """Fetch a single post by its ID."""
    response: requests.Response = requests.get(
        f"https://jsonplaceholder.typicode.com/posts/{post_id}"
    )
    if response.status_code == 404:
        return None
    response.raise_for_status()
    post: dict[str, object] = response.json()
    return post


def create_post(title: str, body: str, user_id: int) -> dict[str, object]:
    """Create a new post."""
    payload: dict[str, str | int] = {
        "title": title,
        "body": body,
        "userId": user_id
    }
    response: requests.Response = requests.post(
        "https://jsonplaceholder.typicode.com/posts",
        json=payload
    )
    response.raise_for_status()
    created: dict[str, object] = response.json()
    return created


def update_post(post_id: int, title: str, body: str) -> dict[str, object]:
    """Update an existing post."""
    payload: dict[str, str | int] = {
        "title": title,
        "body": body,
        "userId": 1
    }
    response: requests.Response = requests.put(
        f"https://jsonplaceholder.typicode.com/posts/{post_id}",
        json=payload
    )
    response.raise_for_status()
    updated: dict[str, object] = response.json()
    return updated


def delete_post(post_id: int) -> bool:
    """Delete a post. Returns True if successful."""
    response: requests.Response = requests.delete(
        f"https://jsonplaceholder.typicode.com/posts/{post_id}"
    )
    return response.status_code == 200


# Try it out
if __name__ == "__main__":
    # Read
    posts: list[dict[str, object]] = get_all_posts()
    print(f"Total posts: {len(posts)}")

    # Read one
    post: dict[str, object] | None = get_post_by_id(1)
    if post is not None:
        print(f"Post 1 title: {post['title']}")

    # Create
    new_post: dict[str, object] = create_post(
        title="Learning HTTP",
        body="HTTP is how the web communicates.",
        user_id=1
    )
    print(f"Created post with ID: {new_post['id']}")

    # Update
    updated: dict[str, object] = update_post(
        post_id=1,
        title="Updated Title",
        body="Updated body text."
    )
    print(f"Updated post title: {updated['title']}")

    # Delete
    deleted: bool = delete_post(1)
    print(f"Post deleted: {deleted}")
```

---

## Where People Go Wrong

**Confusing HTTP methods.** Using GET when you should use POST, or using POST for everything. GET is for reading. POST is for creating. PUT is for replacing. DELETE is for removing. Pick the right one.

**Ignoring status codes.** If the server returns 400 or 500, your code needs to handle that. Do not assume every request succeeds.

**Not understanding stateless.** Each HTTP request is independent. The server does not remember your last request. If you need the server to know who you are, you must send authentication with every request.

**Sending data in the wrong format.** If the server expects JSON, do not send a plain string. Set the `Content-Type` header to `application/json` and format your data properly.

**Not using HTTPS.** HTTP sends data in plain text. Anyone between your computer and the server can read it. HTTPS encrypts the traffic. Always use HTTPS in production.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a Python function that calls the JSONPlaceholder API to get all comments for a specific post. The URL pattern is /posts/{id}/comments. The function should take a post_id parameter, handle the case where the post does not exist (404), and return a list of comment dictionaries. Include type hints everywhere."</div>
</div>

---

## Key Takeaways

1. HTTP is a protocol for clients to request data from servers and receive responses.
2. HTTP methods tell the server what action you want: GET (read), POST (create), PUT (update), DELETE (remove).
3. Status codes tell the client what happened: 2xx (success), 4xx (client error), 5xx (server error).
4. JSON is the standard format for sending data in APIs.
5. REST is a set of conventions: resources have URLs, use proper methods and status codes, stateless.
6. The `requests` library makes HTTP calls simple in Python.

---

**Previous:** [[wiki:python-leetcode-patterns]] | **Next:** [[wiki:python-backend-apis]]
