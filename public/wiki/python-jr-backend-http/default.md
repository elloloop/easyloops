# HTTP and the Web -- How the Internet Works

You have learned algorithms, data structures, and how to solve all sorts of problems with Python. Now comes the exciting part: **making programs that work on the internet and serve real people.** Everything you have built so far runs on your own computer. From here on out, you will build programs that anyone in the world can use.

But before you can build something for the internet, you need to understand how the internet actually works. Let's start from the very beginning.

---

## Your Browser Talks to Other Computers

Every time you visit a website -- typing an address into your browser and pressing Enter -- your computer sends a message to another computer somewhere in the world. That other computer reads the message, figures out what you want, and sends something back.

The computer you are using (your phone, your laptop, your tablet) is called the **client**. The computer that receives your message and sends something back is called the **server**.

That is the entire internet in two sentences. A client asks. A server answers.

### The Restaurant Analogy

Think of it like ordering food at a restaurant.

- **You** are the **client**. You sit at a table and decide what you want.
- **The kitchen** is the **server**. It has all the food and knows how to prepare it.
- **Your order** is the **request**. You tell the kitchen what you want.
- **The food that arrives at your table** is the **response**. The kitchen sends back what you asked for.

You do not walk into the kitchen yourself. You do not need to know how the food is prepared. You just send your order, and you get your food back. The internet works the same way.

```
You (the client/browser)           The Kitchen (the server)
        |                                    |
        |--- "I'd like the pasta" ---------> |
        |                                    |  (server prepares it)
        |<-- "Here's your pasta!" ---------- |
        |                                    |
```

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a colorful restaurant table, handing an order slip to a friendly waiter robot who is walking toward a kitchen window. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

---

## What Is HTTP?

HTTP stands for **HyperText Transfer Protocol**. That is a big name, but all it means is: **the language that browsers and servers use to talk to each other.**

When you speak to a friend, you both need to speak the same language or you will not understand each other. Computers are the same way. The client and the server both need to follow the same rules so they can understand each other's messages. HTTP is that set of rules.

Here is what HTTP defines:

- How to **ask for** something (a request)
- How to **send back** something (a response)
- How to **describe** what you want (methods)
- How to **report problems** (status codes)
- How to **attach extra information** (headers)

Every time you load a webpage, your browser creates an HTTP request and sends it to the server. The server reads it, does some work, and sends back an HTTP response. This happens dozens or even hundreds of times just to load a single webpage (one request for the page itself, more requests for images, fonts, and other files).

---

## HTTP Methods -- Different Types of Requests

When you send a request to a server, you need to tell it what kind of thing you want to do. Are you looking at something? Creating something new? Changing something? Deleting something?

HTTP uses **methods** (sometimes called "verbs") to describe what you want. Here are the four most important ones:

### GET -- "Can I see this?"

A GET request says: "I want to look at something. Please send it to me."

This is the most common method. Every time you type a website address and press Enter, your browser sends a GET request. You are just asking to see a page.

- Visiting `www.example.com` sends a GET request
- Clicking a link sends a GET request
- Loading an image sends a GET request

**GET does not change anything on the server.** It just looks. Like window shopping -- you can look at the display, but you are not buying anything.

### POST -- "Here's something new"

A POST request says: "I have some new information for you. Please save it."

This happens when you fill out a form and click "Submit." You are sending new data to the server.

- Signing up for an account sends a POST request
- Posting a comment sends a POST request
- Uploading a photo sends a POST request

### PUT -- "Replace this with this"

A PUT request says: "I want to completely replace something that already exists with this new version."

This is for updating things. If you edit your profile and save the changes, that might be a PUT request. You are saying: "Take the old version of my profile and replace it entirely with this new version."

### DELETE -- "Remove this"

A DELETE request says: "Please remove this thing."

- Deleting a post sends a DELETE request
- Removing an item from your cart sends a DELETE request

### Quick Reference Table

| Method   | What it means              | Example                        |
|----------|----------------------------|--------------------------------|
| `GET`    | "Can I see this?"          | Loading a webpage              |
| `POST`   | "Here's something new"     | Submitting a sign-up form      |
| `PUT`    | "Replace this with this"   | Updating your profile          |
| `DELETE` | "Remove this"              | Deleting a blog post           |

---

## URLs Explained -- The Internet's Street Addresses

You type URLs into your browser every day, but have you ever looked closely at what is in one? A URL is like a **street address** -- it tells the internet exactly where to go to find what you want.

Here is the structure of a URL:

```
scheme://host:port/path?query
```

Let's break that down piece by piece using a real-looking example:

```
https://www.petstore.com:443/pets/cats?color=orange
```

| Part       | Example              | What it means                                           |
|------------|---------------------|---------------------------------------------------------|
| **Scheme** | `https`              | The language to use (HTTP or HTTPS, the secure version) |
| **Host**   | `www.petstore.com`   | Which server to talk to (like the street name)          |
| **Port**   | `443`                | Which "door" on the server (usually hidden because there is a default) |
| **Path**   | `/pets/cats`         | Which specific thing on that server (like the apartment number) |
| **Query**  | `color=orange`       | Extra details or filters (like adding "second floor" to directions) |

### The Street Address Analogy

Think of it this way:

- The **host** is the **building** -- which building do you want to go to?
- The **port** is the **door** -- which entrance do you use? (Most of the time there is only one main door, so you do not need to think about it.)
- The **path** is the **room number** -- once inside the building, where exactly do you go?
- The **query** is **extra instructions** -- "I'm looking for the orange one."

Most of the time you do not see the port number because the browser uses a default (80 for HTTP, 443 for HTTPS). But every server has one, just like every building has a door.

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a street corner looking at a colorful signpost with arrows pointing to different destinations, each labeled with parts of a URL like a street address system. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

---

## Status Codes -- The Server's Answer

When the server sends a response back to you, it always includes a **status code** -- a number that tells you what happened. Did everything go well? Did something go wrong? Was the thing you asked for not found?

Status codes are three-digit numbers, and the first digit tells you the general category:

- **2xx** = Success! Everything worked.
- **4xx** = You made a mistake (the client did something wrong).
- **5xx** = The server made a mistake (something broke on their end).

Here are the most important ones to know:

### 200 -- "Here you go!" (OK)

Everything worked perfectly. The server found what you asked for and sent it back. This is the most common status code. When a webpage loads successfully, the status is 200.

### 201 -- "Created it!"

The server successfully created something new. When you sign up for an account and it works, the server sends back a 201 to say "I made your new account!"

### 404 -- "I can't find that" (Not Found)

The server looked for what you asked for, but it does not exist. You have probably seen a "404 Not Found" page before -- that happens when you visit a URL that does not point to anything real.

### 500 -- "Something went wrong on my end" (Server Error)

The server tried to handle your request, but something broke inside it. This is not your fault -- it is a problem with the server itself. It is like ordering food and the kitchen says "Sorry, the oven broke."

### Quick Reference Table

| Code | Meaning             | Whose fault?      |
|------|---------------------|--------------------|
| 200  | "Here you go!"      | Nobody's -- it worked! |
| 201  | "Created it!"       | Nobody's -- it worked! |
| 404  | "I can't find that" | The client asked for something that does not exist |
| 500  | "Something broke"   | The server had a problem |

---

## Headers -- Extra Notes on the Message

Every HTTP request and response can carry **headers** -- extra pieces of information attached to the message. Think of them like notes written on the outside of an envelope.

The letter inside the envelope is the main content (the webpage, the form data, whatever). But the envelope itself has useful information written on it: who it is from, where it is going, when it was sent.

Here are some common headers:

```
Content-Type: application/json       -- "The data inside is in JSON format"
Content-Length: 256                   -- "The data inside is 256 bytes long"
Authorization: Bearer abc123          -- "Here is proof that I am allowed to do this"
User-Agent: Mozilla/5.0               -- "I am a Firefox browser"
```

You do not need to memorize these right now. Just know that headers exist and they carry extra information about the request or response. You will use them more when you start building your own servers.

---

## JSON -- The Language of Data

When computers send data back and forth over the internet, they need a format that both sides can understand. The most common format today is **JSON** (JavaScript Object Notation).

JSON looks a lot like a Python dictionary. If you already know dictionaries, you almost already know JSON.

Here is what JSON looks like:

```json
{
    "name": "Byte",
    "type": "robot",
    "color": "blue",
    "friends": ["Pixel", "Widget", "Chip"],
    "details": {
        "height": 30,
        "battery": true
    }
}
```

### JSON Rules

- Keys are always **strings** (in double quotes)
- Values can be: strings, numbers, `true`/`false`, `null` (nothing), arrays (lists), or objects (dictionaries)
- No trailing commas allowed

### JSON vs. Python Dictionaries

| Feature     | Python Dictionary           | JSON                     |
|-------------|----------------------------|--------------------------|
| True/False  | `True` / `False`            | `true` / `false`         |
| Nothing     | `None`                      | `null`                   |
| Quotes      | Single or double            | Double only              |
| Keys        | Any hashable type           | Strings only             |

Python has a built-in `json` module for converting between Python dictionaries and JSON strings:

```python
import json

# Python dictionary to JSON string
pet: dict = {"name": "Buddy", "animal": "dog", "age": 3}
json_string: str = json.dumps(pet)
print(json_string)
# Output: {"name": "Buddy", "animal": "dog", "age": 3}

# JSON string back to Python dictionary
text: str = '{"name": "Buddy", "animal": "dog", "age": 3}'
pet_again: dict = json.loads(text)
print(pet_again["name"])
# Output: Buddy
```

`json.dumps()` turns a Python dictionary **into** a JSON string (the "s" stands for "string"). `json.loads()` turns a JSON string **back into** a Python dictionary.

![A flat vector illustration in a children's educational book style showing Byte the robot holding two cards side by side, one labeled with curly braces showing a Python dictionary and the other showing matching JSON, with arrows between them. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

---

## Making Requests with Python

Now that you understand how HTTP works, let's actually send some requests using Python! Python has a popular library called `requests` that makes this easy.

First, install it:

```bash
pip install requests
```

### Sending a GET Request

```python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/todos/1")

print(response.status_code)
# Output: 200

print(response.json())
# Output: {'userId': 1, 'id': 1, 'title': 'delectus aut autem', 'completed': False}
```

Let's break this down:

1. `requests.get(...)` sends a GET request to that URL
2. `response.status_code` tells us the status code (200 means success)
3. `response.json()` automatically converts the JSON response into a Python dictionary

### Sending a POST Request

```python
import requests

new_post: dict = {
    "title": "My First Post",
    "body": "Hello from Python!",
    "userId": 1
}

response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=new_post
)

print(response.status_code)
# Output: 201 (Created!)

print(response.json())
# Output: {'title': 'My First Post', 'body': 'Hello from Python!', 'userId': 1, 'id': 101}
```

Here we created a dictionary with our data and passed it using `json=new_post`. The `requests` library automatically converts it to JSON and sets the right headers.

### Sending PUT and DELETE Requests

```python
import requests

# PUT -- replace an existing post
updated_post: dict = {
    "title": "Updated Title",
    "body": "Updated body text",
    "userId": 1
}

response = requests.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    json=updated_post
)
print(response.status_code)
# Output: 200

# DELETE -- remove a post
response = requests.delete("https://jsonplaceholder.typicode.com/posts/1")
print(response.status_code)
# Output: 200
```

### Handling Errors

What happens if something goes wrong? You should always check the status code:

```python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts/99999")

if response.status_code == 200:
    print("Success!")
    print(response.json())
elif response.status_code == 404:
    print("Not found! That thing does not exist.")
else:
    print("Something went wrong. Status code: " + str(response.status_code))
```

### Adding Headers to a Request

Sometimes you need to send extra information with your request, like a password or a preferred language. You do this with headers:

```python
import requests

headers: dict = {
    "Authorization": "Bearer my-secret-token",
    "Accept": "application/json"
}

response = requests.get(
    "https://jsonplaceholder.typicode.com/posts/1",
    headers=headers
)

print(response.status_code)
```

### Query Parameters

Remember the query part of a URL (`?color=orange`)? You can add query parameters easily:

```python
import requests

params: dict = {
    "userId": 1
}

response = requests.get(
    "https://jsonplaceholder.typicode.com/posts",
    params=params
)

# This sends a request to:
# https://jsonplaceholder.typicode.com/posts?userId=1

posts: list = response.json()
print("Found " + str(len(posts)) + " posts by user 1")
```

The `params` dictionary gets turned into the `?userId=1` part of the URL automatically. This is much cleaner than building the URL string yourself.

---

## Putting It All Together -- A Complete Example

Here is a small program that fetches a list of posts, finds the ones by a specific user, and prints their titles:

```python
import requests

def get_posts_by_user(user_id: int) -> list[dict]:
    """Fetch all posts written by a specific user."""
    response = requests.get(
        "https://jsonplaceholder.typicode.com/posts",
        params={"userId": user_id}
    )

    if response.status_code != 200:
        print("Error: could not fetch posts (status " + str(response.status_code) + ")")
        return []

    return response.json()


def display_post_titles(posts: list[dict]) -> None:
    """Print the title of each post."""
    for i, post in enumerate(posts):
        print(str(i + 1) + ". " + post["title"])


# Main program
user_id: int = 1
posts: list[dict] = get_posts_by_user(user_id)

if len(posts) > 0:
    print("Posts by user " + str(user_id) + ":")
    display_post_titles(posts)
else:
    print("No posts found for user " + str(user_id))
```

This program demonstrates everything you learned in this lesson:

- Sending a GET request
- Using query parameters
- Checking the status code
- Reading JSON from the response
- Working with the data as regular Python dictionaries and lists

![A flat vector illustration in a children's educational book style showing Byte the robot at a computer screen with colorful data packets flying back and forth between the screen and a friendly cloud server in the sky. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-04.png)

---

## Quick Summary

| Concept           | What it means                                                  |
|-------------------|----------------------------------------------------------------|
| Client            | The computer (or program) that sends requests (your browser)   |
| Server            | The computer (or program) that receives requests and responds  |
| HTTP              | The language clients and servers use to talk                   |
| GET               | "Can I see this?"                                              |
| POST              | "Here's something new"                                         |
| PUT               | "Replace this with this"                                       |
| DELETE            | "Remove this"                                                  |
| URL               | An address that tells the internet where to go                 |
| Status code       | A number that says what happened (200 = OK, 404 = not found)  |
| Headers           | Extra information attached to requests and responses           |
| JSON              | The format computers use to exchange data                      |
| `requests` library| A Python tool for sending HTTP requests                       |

---

## Practice Questions

Try to answer these on your own before checking the answers at the bottom of the page.

**Question 1:** In the restaurant analogy, what does the client represent, what does the server represent, what is the request, and what is the response?

**Question 2:** Which HTTP method would you use for each of these situations?

- Looking at a friend's profile page
- Creating a new account on a website
- Changing your display name on your profile
- Removing a photo from your gallery

**Question 3:** Look at this URL and identify each part:

```
https://www.bookstore.com:443/books/fiction?author=rowling&sort=title
```

What is the scheme, host, port, path, and query?

**Question 4:** A server sends back status code 404. What does that mean? Is it the client's fault or the server's fault?

**Question 5:** What is the difference between JSON `true` and Python `True`? What about JSON `null` and Python `None`?

**Question 6:** What does `response.json()` do when you call it on the result of a `requests.get()` call?

**Question 7:** Write Python code using the `requests` library that sends a GET request to `https://jsonplaceholder.typicode.com/users/3` and prints the user's name. Handle the case where the request fails (status code is not 200).

**Question 8:** What is the difference between a GET request and a POST request? When would you use each one?

---

## Answers to Practice Questions

**Answer 1:** The client is **you**, the person ordering food. The server is **the kitchen**, which prepares and sends back what you asked for. The request is **your order** -- you telling the kitchen what you want. The response is **the food arriving at your table** -- the kitchen sending back what you asked for.

**Answer 2:**

- Looking at a friend's profile page: **GET** (you are just looking, not changing anything)
- Creating a new account: **POST** (you are sending new data to the server)
- Changing your display name: **PUT** (you are replacing your old name with a new one)
- Removing a photo: **DELETE** (you are asking the server to remove something)

**Answer 3:**

- Scheme: `https`
- Host: `www.bookstore.com`
- Port: `443`
- Path: `/books/fiction`
- Query: `author=rowling&sort=title` (two query parameters: author is "rowling" and sort is "title")

**Answer 4:** Status code 404 means "Not Found" -- the server could not find what you asked for. It is the client's fault, because the client asked for something that does not exist (like a misspelled URL or a deleted page).

**Answer 5:** JSON uses lowercase `true` and `false`, while Python uses uppercase `True` and `False`. JSON uses `null` to mean "nothing," while Python uses `None`. When you convert between JSON and Python (using `json.loads()` and `json.dumps()`), Python handles these differences automatically.

**Answer 6:** `response.json()` takes the JSON text that the server sent back and converts it into a Python dictionary (or list, depending on the data). It is a shortcut for `json.loads(response.text)`.

**Answer 7:**

```python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/users/3")

if response.status_code == 200:
    user: dict = response.json()
    print(user["name"])
else:
    print("Error: could not fetch user (status " + str(response.status_code) + ")")
```

**Answer 8:** A GET request asks to **see** something -- it does not send data or change anything on the server. A POST request **sends new data** to the server, usually to create something new. Use GET when you want to view a page or retrieve information. Use POST when you want to submit a form, create an account, or add new data.

---

**Previous:** [[wiki:python-jr-problem-solving]] | **Next:** [[wiki:python-jr-backend-apis]]
