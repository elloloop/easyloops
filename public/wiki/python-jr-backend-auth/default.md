# Authentication -- Who Are You?

Your API is up and running. It can save data to a database and send it back when someone asks. But right now, there is a big problem: **anyone** can do **anything**. A stranger could delete all the data, read someone else's private messages, or pretend to be someone they are not.

That is like a school with no locks on the doors, no student IDs, and no rules about who can go where. Total chaos!

This page is all about fixing that. You will learn how to check who someone is, decide what they are allowed to do, and keep their information safe.

![A flat vector illustration in a children's educational book style showing Byte the robot standing at the entrance of a colorful school building, holding up an ID badge while a friendly security gate checks the badge. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

---

## The Big Question: Who Is Using Your App?

Imagine a school where every student looks exactly the same and nobody wears a name tag. The teacher calls out "Turn in your homework!" but has no idea who is handing in what. Did Alice turn hers in? Did Bob turn in Alice's by mistake? Nobody knows.

That is what your app looks like right now. When a request comes in, your server has no idea who sent it. It could be a real user, or it could be someone causing trouble.

We need two things:

1. A way to find out **who** someone is.
2. A way to decide **what they are allowed to do**.

These two things have special names.

---

## Authentication vs Authorization

These two words look alike, but they mean very different things.

**Authentication** answers the question: **"Who are you?"**

Think of it like showing your student ID at the school entrance. You prove that you are Alice, not Bob, not a stranger.

**Authorization** answers the question: **"What are you allowed to do?"**

Your student ID might say you can enter the library but NOT the teacher's lounge. It might say you can use the computer lab on Tuesdays but not Fridays. Just because the school knows who you are does not mean you can go everywhere.

Authentication always comes first. You have to figure out **who** someone is before you can decide **what** they can do.

Here is a quick summary:

| Question | Name | Example |
|----------|------|---------|
| "Who are you?" | Authentication | Showing your student ID |
| "What can you do?" | Authorization | Your ID says "Library: Yes, Teacher's Lounge: No" |

---

## Password Safety -- This Is Really Important

When someone creates an account on your app, they pick a password. Your app needs to store that password somewhere so it can check it later when the person logs in.

Here is the number one rule of this entire page:

**NEVER store passwords as plain text. Ever. Not even once.**

### Why Plain Text Is Dangerous

"Plain text" means storing the password exactly as the user typed it. If your database has a table like this:

```
| username | password      |
|----------|---------------|
| alice    | fluffy_cat_99 |
| bob      | pizza_lover   |
| charlie  | secret123     |
```

...then anyone who sees the database can read every single password. And databases DO get broken into. It happens to big companies, small companies, everyone. If you stored plain text, every user's password is now in the hands of a bad actor.

This is like writing everyone's locker combination on the wall in the hallway. Sure, it is convenient, but anyone walking by can read it.

### Hashing -- A One-Way Scramble

So how do you store passwords safely? You use something called **hashing**.

A hash function takes a password and turns it into a long scrambled string of characters. The magic part: **you cannot turn it back.** Given the scrambled version, nobody can figure out the original password.

```
"fluffy_cat_99"  -->  hash function  -->  "$2b$12$xK9jQ..."
"fluffy_cat_99"  -->  hash function  -->  "$2b$12$xK9jQ..."  (same input = same output)
"fluffy_cat_98"  -->  hash function  -->  "$2b$12$Rm4pL..."  (tiny change = totally different output)
```

Here is a good way to think about it: **you can turn a grape into a raisin, but you can never turn a raisin back into a grape.** Hashing is one-way, just like drying a grape.

So instead of storing passwords, you store the **hash** of each password. When someone logs in, you hash what they typed and compare it to the stored hash. If they match, the password is correct!

### Salting -- Extra Protection

There is one more trick. What if two users both choose the password "secret123"? Without any extra protection, they would both have the exact same hash. A sneaky attacker could use a big lookup table (called a "rainbow table") to match common hashes back to common passwords.

**Salting** fixes this. A salt is a random bit of text that gets added to the password before hashing. Each user gets a different random salt, so even if two people have the same password, their hashes are completely different.

```
"secret123" + salt_abc  -->  hash function  -->  "$2b$12$aaa..."
"secret123" + salt_xyz  -->  hash function  -->  "$2b$12$zzz..."  (different salt = different hash!)
```

### bcrypt -- The Right Tool for the Job

Python has a library called `bcrypt` that handles hashing AND salting automatically. It is designed specifically for passwords.

```bash
pip install bcrypt
```

```python
import bcrypt


def hash_password(plain_password: str) -> bytes:
    """Hash a password for safe storage."""
    password_bytes: bytes = plain_password.encode("utf-8")
    salt: bytes = bcrypt.gensalt()
    hashed: bytes = bcrypt.hashpw(password_bytes, salt)
    return hashed


def check_password(plain_password: str, stored_hash: bytes) -> bool:
    """Check if a password matches the stored hash."""
    password_bytes: bytes = plain_password.encode("utf-8")
    return bcrypt.checkpw(password_bytes, stored_hash)


# Try it out
stored: bytes = hash_password("fluffy_cat_99")
print(stored)  # Something like b'$2b$12$xK9jQ...' (different every time!)

print(check_password("fluffy_cat_99", stored))  # True
print(check_password("wrong_password", stored))  # False
```

Notice that you never "undo" the hash. You never decrypt anything. You just hash the new attempt and compare the two hashes. The original password is gone forever -- and that is exactly what you want.

![A flat vector illustration in a children's educational book style showing Byte the robot at a workbench with three stations: one showing a grape turning into a raisin with an arrow, one showing a padlock with scrambled text inside, and one showing a salt shaker sprinkling onto a password before it enters a machine. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

---

## Tokens -- Your Digital Hall Pass

OK, so a user has created an account and logged in successfully. But HTTP is **stateless** -- remember from the HTTP page? The server does not automatically remember who you are between requests.

So every time the user wants to do something (view their profile, post a message, check their grades), they need to prove who they are all over again. Typing your password for every single click would be incredibly annoying.

The solution: **tokens**. After you log in, the server gives you a special pass. You send that pass along with every future request, and the server knows who you are without asking for your password again.

Think of it like a movie ticket. You pay once at the box office (that is logging in). They give you a ticket (that is the token). Every time you walk into the theater, you just show your ticket instead of paying again.

### JWT -- JSON Web Token

The most popular kind of token is called a **JWT** (pronounced "jot"). It stands for JSON Web Token.

A JWT has three parts separated by dots:

```
eyJhbGci...  .  eyJ1c2Vy...  .  Sfl5c6Rh...
|___________|  |___________|  |___________|
   header         payload       signature
```

- **Header**: tells you what kind of token it is and how it was signed.
- **Payload**: the actual information -- like the user's name and when the token expires.
- **Signature**: a special code that proves nobody tampered with the token.

The server creates the token using a **secret key** (a password that only the server knows). If anyone changes even one letter in the payload, the signature will not match, and the server will reject it. It is like a wax seal on an old-fashioned letter -- if the seal is broken, you know someone opened it.

Here is how to create and check JWTs in Python:

```bash
pip install PyJWT
```

```python
import jwt
from datetime import datetime, timedelta, timezone


SECRET_KEY: str = "my-super-secret-key-keep-this-safe"
ALGORITHM: str = "HS256"


def create_token(user_id: int, username: str) -> str:
    """Create a JWT token for a user."""
    expiration: datetime = datetime.now(timezone.utc) + timedelta(hours=24)

    payload: dict = {
        "user_id": user_id,
        "username": username,
        "exp": expiration.timestamp()
    }

    token: str = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_token(token: str) -> dict | None:
    """Check if a token is valid. Returns the payload or None."""
    try:
        payload: dict = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        print("This token has expired!")
        return None
    except jwt.InvalidTokenError:
        print("This token is not valid!")
        return None


# Create a token for Alice
token: str = create_token(user_id=1, username="alice")
print(f"Token: {token}")

# Later, verify the token
data: dict | None = verify_token(token)
if data is not None:
    print(f"Welcome back, {data['username']}!")
else:
    print("You need to log in again.")
```

The token expires after 24 hours. After that, the user has to log in again and get a new one. This way, even if someone steals a token, it stops working after a day.

---

## Building a Simple Login System

Now let us put all the pieces together. Here is how a simple login system works, step by step:

### Step 1: Register (Create an Account)

1. The user sends their username and password to the server.
2. The server hashes the password with bcrypt.
3. The server saves the username and the hashed password in the database.

### Step 2: Login

1. The user sends their username and password.
2. The server looks up the username in the database.
3. The server hashes the password the user just sent and compares it to the stored hash.
4. If they match, the server creates a JWT token and sends it back.
5. If they do not match, the server says "Invalid credentials." (It does NOT say "wrong password" or "user not found" -- more on that later.)

### Step 3: Access Protected Pages

1. The user sends a request along with their token.
2. The server checks the token -- is it valid? Has it expired?
3. If the token is good, the server handles the request.
4. If the token is bad, the server says "You are not allowed."

Here is the code for a complete login system using FastAPI:

```python
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel


# --- Setup ---

SECRET_KEY: str = "change-this-to-a-real-secret"
ALGORITHM: str = "HS256"

app: FastAPI = FastAPI()
security: HTTPBearer = HTTPBearer()


# --- What a request looks like ---

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# --- Our pretend database (a dictionary for now) ---

users_db: dict[str, dict] = {}


# --- Helper functions ---

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

def check_password(password: str, stored_hash: bytes) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), stored_hash)

def create_token(username: str) -> str:
    expiration: datetime = datetime.now(timezone.utc) + timedelta(hours=24)
    payload: dict = {"sub": username, "exp": expiration.timestamp()}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    """Check the token and figure out who the user is."""
    token: str = credentials.credentials
    try:
        payload: dict = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = str(payload["sub"])
        if username not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# --- The endpoints ---

@app.post("/register", status_code=201)
def register(user: RegisterRequest) -> dict[str, str]:
    """Create a new account."""
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed: bytes = hash_password(user.password)
    users_db[user.username] = {
        "username": user.username,
        "password_hash": hashed,
    }
    return {"message": f"Account created for {user.username}!"}


@app.post("/login")
def login(user: LoginRequest) -> TokenResponse:
    """Log in and get a token."""
    if user.username not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_hash: bytes = users_db[user.username]["password_hash"]
    if not check_password(user.password, stored_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token: str = create_token(user.username)
    return TokenResponse(access_token=token, token_type="bearer")


@app.get("/my-profile")
def my_profile(current_user: str = Depends(get_current_user)) -> dict[str, str]:
    """A protected page -- only logged-in users can see this."""
    return {"username": current_user, "message": "Welcome to your profile!"}


@app.get("/public")
def public_page() -> dict[str, str]:
    """A public page -- anyone can see this, no login needed."""
    return {"message": "Hello! This page is open to everyone."}
```

### Testing It Out

```bash
# 1. Create an account
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "my_secret_password"}'

# 2. Log in and get a token
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "my_secret_password"}'
# Returns: {"access_token": "eyJ...", "token_type": "bearer"}

# 3. Use the token to visit a protected page
curl http://localhost:8000/my-profile \
  -H "Authorization: Bearer eyJ..."

# 4. Try without a token -- you get an error
curl http://localhost:8000/my-profile
# Returns: 403 Forbidden
```

The flow is: **register once, log in to get a token, then use that token for everything else.**

---

## Common Security Mistakes

Here are mistakes that happen all the time. Learn them now so you never make them.

### Mistake 1: Storing Plain Text Passwords

This has been said multiple times already, but it is worth repeating one more time. **Never store passwords as plain text.** Use bcrypt. Always.

### Mistake 2: Not Using HTTPS

Remember from the [[wiki:python-jr-backend-http]] page that HTTP sends everything as plain text? If you send a password or token over regular HTTP, anyone snooping on the network can read it.

That is like shouting your password across a crowded room. Everyone can hear it.

**HTTPS** encrypts the connection so nobody can eavesdrop. Always use HTTPS when your app is live on the internet. During development on your own computer, `http://localhost` is fine because the data never leaves your machine.

### Mistake 3: Giving Hints About What Went Wrong

When a login fails, always say the same generic message: **"Invalid credentials."**

Do NOT say "Username not found" or "Wrong password." Why? Because that tells an attacker useful information. If they try "alice" and get "wrong password," they now know that "alice" is a real account and can focus on guessing her password.

### Mistake 4: Tokens That Never Expire

If a token lasts forever, then a stolen token gives an attacker permanent access. Always set an expiration time. A day (24 hours) is common. For very sensitive apps, an hour is better.

### Mistake 5: No Rate Limiting

Without rate limiting, an attacker can try thousands of passwords per second until one works. Rate limiting means saying "you can only try 10 times per minute." After that, they have to wait. This makes guessing passwords incredibly slow and impractical.

![A flat vector illustration in a children's educational book style showing Byte the robot at a chalkboard with five big red X marks, each next to a simple icon representing a common security mistake: a sticky note with a visible password, an open envelope being read by a sneaky figure, a helpful error message, an hourglass with infinity, and a flood of arrows hitting a door. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

---

## Quick Summary

| Concept | What It Means |
|---------|---------------|
| Authentication | Figuring out who someone is ("Show me your ID") |
| Authorization | Deciding what they can do ("Your ID lets you into the library") |
| Hashing | Turning a password into a scrambled code that cannot be reversed |
| Salting | Adding random text before hashing to make identical passwords look different |
| bcrypt | A Python library that hashes and salts passwords safely |
| JWT | A digital token that proves who you are (like a movie ticket) |
| HTTPS | Encrypts the connection so nobody can snoop on your data |

---

## Practice Questions

Try to answer these on your own before looking at the answers at the bottom of the page.

**Question 1:** What is the difference between authentication and authorization? Give an example of each that does NOT involve computers.

**Question 2:** Why is it dangerous to store passwords as plain text in a database? What should you do instead?

**Question 3:** Explain hashing in your own words. Why is it called "one-way"? Use the grape and raisin idea (or come up with your own example) to explain.

**Question 4:** Two users both choose "sunshine" as their password. Without salting, what would happen to their stored hashes? With salting, what would happen? Why does this matter?

**Question 5:** In our login system, when a login fails, we always return the same message: "Invalid credentials." Why do we NOT tell the user whether it was the username or the password that was wrong?

**Question 6:** What is a JWT? What are its three parts? What happens if someone tries to change the information inside a JWT?

**Question 7:** Put these steps in the correct order for a login system:
- Server creates a JWT token
- User sends username and password
- User sends the token with a request
- Server hashes the password and compares it
- Server checks the token and handles the request

**Question 8:** Name three common security mistakes and explain why each one is dangerous.

---

## Answers to Practice Questions

**Answer 1:** Authentication is proving who you are. Example: showing your student ID to a teacher so they know you are Alice. Authorization is deciding what you are allowed to do. Example: your student ID says you can check out books from the library, but you are not allowed to enter the teacher's lounge. First you prove who you are (authentication), then the school checks what you can do (authorization).

**Answer 2:** If the database gets broken into (and this happens to companies all the time), every user's password is immediately exposed. Attackers can read them directly. Instead, you should hash the passwords using a tool like bcrypt. That way, even if someone steals the database, they only get scrambled hashes that cannot be turned back into passwords.

**Answer 3:** Hashing takes a piece of text (like a password) and turns it into a long scrambled string of characters. It is called "one-way" because you cannot reverse the process. Just like you can turn a grape into a raisin by drying it, but you can never turn a raisin back into a grape. The same password always produces the same hash, so you can check if someone typed the right password by hashing their attempt and comparing it to the stored hash.

**Answer 4:** Without salting, both users would have the exact same hash stored in the database. An attacker could use a big lookup table to match that hash back to "sunshine." With salting, each user gets a different random salt added before hashing, so their hashes are completely different even though the original passwords are the same. This means an attacker cannot use lookup tables and has to try to crack each password separately.

**Answer 5:** If you say "Username not found," an attacker learns that the username does not exist, so they can try different usernames until they find a real one. If you say "Wrong password," the attacker learns that the username IS real and can now focus all their effort on guessing that user's password. By always saying "Invalid credentials," you give the attacker no useful information at all.

**Answer 6:** A JWT (JSON Web Token) is a digital pass that proves who you are. Its three parts are: the **header** (what kind of token and how it was signed), the **payload** (the actual data, like your username and when it expires), and the **signature** (a special code that proves the token has not been changed). If someone changes the payload, the signature will no longer match, and the server will reject the token.

**Answer 7:** The correct order is:
1. User sends username and password (login request).
2. Server hashes the password and compares it to the stored hash.
3. Server creates a JWT token and sends it back.
4. User sends the token with a request (to access a protected page).
5. Server checks the token and handles the request.

**Answer 8:** Three common mistakes:
1. **Storing plain text passwords** -- if the database is stolen, every password is exposed instantly.
2. **Not using HTTPS** -- passwords and tokens are sent as plain text over the network, so anyone snooping on the connection can read them (like shouting your password in a crowded room).
3. **No rate limiting** -- without it, an attacker can try thousands of passwords per second, making it easy to guess the right one through brute force.

---

**Previous:** [[wiki:python-jr-backend-databases]] | **Next:** [[wiki:python-jr-backend-testing]]
