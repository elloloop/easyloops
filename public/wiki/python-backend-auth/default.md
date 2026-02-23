# Authentication and Security -- Who Are You?

Your API is working. It stores data in a database. But right now, anyone can access anything. There is nothing stopping a random person from deleting all your data or reading someone else's private information.

Authentication and security fix this. This page covers how to verify who a user is, what they are allowed to do, and how to protect your application from common attacks.

---

## Authentication vs Authorization

These two words sound similar but mean very different things.

**Authentication** = Who are you?
- Logging in with a username and password
- Proving your identity

**Authorization** = What are you allowed to do?
- Can this user delete other people's posts?
- Can this user access the admin panel?

Think of it like a nightclub. Authentication is showing your ID at the door (proving who you are). Authorization is the VIP list (determining what areas you can access).

Authentication always happens first. You cannot decide what someone is allowed to do until you know who they are.

---

## Passwords -- Never Store Plain Text

This is the most important rule on this entire page:

**Never store passwords as plain text. Ever.**

If your database gets hacked (and databases do get hacked), every single user's password is exposed. If you stored "password123" in the database, the attacker now has "password123."

### Hashing -- One-Way Transformation

A hash function takes a password and turns it into a fixed-length string of random-looking characters. The critical property: **you cannot reverse it.** Given the hash, you cannot figure out the original password.

```
"password123"  -->  hash function  -->  "$2b$12$LJ3m4ys..."
"password123"  -->  hash function  -->  "$2b$12$LJ3m4ys..."  (same input, same output)
"password124"  -->  hash function  -->  "$2b$12$Xk9pRQ..."  (tiny change, completely different output)
```

To check a password: hash what the user typed and compare it to the stored hash. If they match, the password is correct.

### Salting -- Preventing Lookup Attacks

A **salt** is a random string added to the password before hashing. Each user gets a different salt.

Why? Without salting, if two users have the same password, they have the same hash. An attacker with a precomputed table of hashes (called a "rainbow table") can look up common passwords instantly.

With salting, even identical passwords produce different hashes because the random salt is different.

### bcrypt -- The Right Tool

bcrypt is a password hashing library designed specifically for this purpose. It automatically handles salting and is intentionally slow (making brute-force attacks impractical).

```bash
pip install bcrypt
```

```python
import bcrypt


def hash_password(plain_password: str) -> bytes:
    """Hash a password for storage."""
    password_bytes: bytes = plain_password.encode("utf-8")
    salt: bytes = bcrypt.gensalt()
    hashed: bytes = bcrypt.hashpw(password_bytes, salt)
    return hashed


def verify_password(plain_password: str, stored_hash: bytes) -> bool:
    """Check if a password matches the stored hash."""
    password_bytes: bytes = plain_password.encode("utf-8")
    is_valid: bool = bcrypt.checkpw(password_bytes, stored_hash)
    return is_valid


# Usage
stored: bytes = hash_password("my_secret_password")
print(stored)  # b'$2b$12$LJ3m4ys...' (different every time because of random salt)

# Verify correct password
print(verify_password("my_secret_password", stored))  # True

# Verify wrong password
print(verify_password("wrong_password", stored))  # False
```

Notice: you never "decrypt" the password. You hash the attempt and compare hashes. The original password is never recoverable.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain why storing plain-text passwords is dangerous. What is hashing? What is salting? Why is bcrypt better than using a simple hash like SHA-256 for passwords? If two users both choose 'password123', will their bcrypt hashes be the same? Why or why not?"</div>
</div>

---

## Sessions -- Server Remembers You

One approach to keeping users logged in: **sessions**.

Here is how it works:

1. User sends username + password to the login endpoint.
2. Server verifies the password.
3. Server creates a **session** (a record stored on the server, like "session #abc123 belongs to user Alice").
4. Server sends back a **session ID** in a cookie.
5. On every future request, the browser automatically sends the cookie with the session ID.
6. Server looks up the session ID and knows who the user is.

```
Login:
Client: POST /login  {username: "alice", password: "secret"}
Server: "Password correct. Creating session abc123."
Server: Set-Cookie: session_id=abc123

Next request:
Client: GET /profile  Cookie: session_id=abc123
Server: "Session abc123 belongs to Alice. Here's her profile."
```

**Pros:** Simple. The session data lives on the server, so it is secure.
**Cons:** The server has to store all active sessions. Hard to scale across multiple servers (server A created the session, but server B does not know about it).

---

## Tokens -- Client Proves Who They Are

A more modern approach: **tokens**. Instead of the server remembering who you are, it gives you a token (a signed string) that proves your identity.

### JWT -- JSON Web Token

A JWT has three parts, separated by dots:

```
eyJhbGci...  .  eyJ1c2Vy...  .  Sfl5c6Rh...
|___________|  |___________|  |___________|
   header         payload       signature
```

- **Header**: what algorithm was used to sign the token
- **Payload**: the actual data (user ID, expiration time, etc.)
- **Signature**: proof that the token was not tampered with

The server signs the token with a secret key. When the client sends the token back, the server verifies the signature. If someone modifies the payload, the signature will not match, and the server rejects it.

### Creating and Verifying JWTs in Python

```bash
pip install PyJWT
```

```python
import jwt
from datetime import datetime, timedelta, timezone


SECRET_KEY: str = "your-secret-key-keep-this-safe"
ALGORITHM: str = "HS256"


def create_token(user_id: int, username: str) -> str:
    """Create a JWT token for a user."""
    expiration: datetime = datetime.now(timezone.utc) + timedelta(hours=24)

    payload: dict[str, int | str | float] = {
        "user_id": user_id,
        "username": username,
        "exp": expiration.timestamp()  # token expires in 24 hours
    }

    token: str = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_token(token: str) -> dict[str, int | str | float] | None:
    """Verify a JWT token. Returns the payload if valid, None if invalid."""
    try:
        payload: dict[str, int | str | float] = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM]
        )
        return payload
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        return None
    except jwt.InvalidTokenError:
        print("Invalid token")
        return None


# Usage
token: str = create_token(user_id=1, username="alice")
print(f"Token: {token}")

# Later, verify the token
data: dict[str, int | str | float] | None = verify_token(token)
if data is not None:
    print(f"Authenticated user: {data['username']}")
else:
    print("Authentication failed")
```

**Pros:** The server does not need to store anything. Any server can verify the token as long as it knows the secret key. Great for scaling.
**Cons:** You cannot revoke a token before it expires (without extra infrastructure). If a token is stolen, the attacker has access until it expires.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Compare session-based and token-based authentication. How does each one work? What are the pros and cons of each? If you have 10 servers behind a load balancer, which approach is easier to implement? Why?"</div>
</div>

---

## OAuth 2.0 -- Login with Google/GitHub

You have seen "Log in with Google" or "Sign in with GitHub" buttons. That is OAuth 2.0.

The simplified flow:

1. Your app redirects the user to Google's login page.
2. The user logs in with Google.
3. Google redirects back to your app with a temporary **authorization code**.
4. Your app sends that code to Google's server and gets an **access token**.
5. Your app uses the access token to get the user's info (name, email) from Google.

The key benefit: **you never see the user's Google password.** Google handles the authentication. You just get a token confirming who they are.

Implementing OAuth from scratch is complex. In practice, you use libraries like `authlib` or `python-social-auth` that handle the details.

---

## API Keys -- Simple Server-to-Server Auth

For server-to-server communication (not users logging in), API keys are the simplest approach. An API key is just a long random string.

```python
from fastapi import FastAPI, Header, HTTPException

app: FastAPI = FastAPI()

VALID_API_KEYS: set[str] = {"key-abc123", "key-def456"}


@app.get("/data")
def get_data(x_api_key: str = Header()) -> dict[str, str]:
    """Endpoint protected by API key in header."""
    if x_api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return {"data": "This is protected data"}
```

The client includes the API key in a header:

```
GET /data
X-API-Key: key-abc123
```

**API keys are not for user authentication.** They identify an application, not a person. Use them for service-to-service calls, not for user-facing login.

---

## HTTPS -- Encrypting Traffic

HTTP sends data in plain text. If someone intercepts the network traffic (like on public WiFi), they can read everything: passwords, tokens, personal data.

**HTTPS** encrypts the traffic between client and server. Even if someone intercepts the data, they see encrypted gibberish.

In production, you must always use HTTPS. Your web server (Nginx, Caddy) or cloud platform handles the encryption certificates.

During development, `http://localhost` is fine because the traffic never leaves your machine.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain the difference between API keys, session cookies, JWTs, and OAuth. When would you use each one? Give a concrete scenario for each. Which ones are for authenticating users? Which ones are for authenticating applications?"</div>
</div>

---

## Common Security Vulnerabilities

### SQL Injection

You covered this in the database page, but it deserves repeating. Never build SQL queries with string formatting.

```python
# BAD -- SQL injection vulnerability
query: str = f"SELECT * FROM users WHERE name = '{user_input}'"

# GOOD -- parameterized query
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))
```

### XSS (Cross-Site Scripting)

An attacker injects malicious JavaScript into your website. When other users view the page, the script runs in their browser.

**Prevention:** Always escape user-generated content before displaying it in HTML. Modern frontend frameworks (React, Vue) do this automatically.

### CSRF (Cross-Site Request Forgery)

An attacker tricks a logged-in user into making requests they did not intend. For example, a hidden form on a malicious website submits a "transfer money" request to your bank.

**Prevention:** Use CSRF tokens. The server generates a random token for each form. When the form is submitted, the server checks the token.

### Rate Limiting

Without rate limiting, an attacker can send thousands of login attempts per second to guess passwords.

```python
from fastapi import FastAPI, Request, HTTPException
from collections import defaultdict
import time

app: FastAPI = FastAPI()

# Simple in-memory rate limiter (use Redis in production)
request_counts: dict[str, list[float]] = defaultdict(list)
MAX_REQUESTS: int = 10
WINDOW_SECONDS: int = 60


def check_rate_limit(client_ip: str) -> None:
    """Raise an error if the client has exceeded the rate limit."""
    now: float = time.time()
    # Remove old timestamps outside the window
    request_counts[client_ip] = [
        t for t in request_counts[client_ip]
        if now - t < WINDOW_SECONDS
    ]
    if len(request_counts[client_ip]) >= MAX_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please wait."
        )
    request_counts[client_ip].append(now)


@app.post("/login")
def login(request: Request) -> dict[str, str]:
    client_ip: str = request.client.host if request.client else "unknown"
    check_rate_limit(client_ip)
    # ... actual login logic here
    return {"message": "Login successful"}
```

---

## Implementing Auth in FastAPI

Now let us put it all together. Here is a complete authentication system using FastAPI, bcrypt, and JWT.

```python
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel


# --- Configuration ---

SECRET_KEY: str = "change-this-to-a-real-secret-key"
ALGORITHM: str = "HS256"
TOKEN_EXPIRY_HOURS: int = 24

app: FastAPI = FastAPI(title="Auth Example")
security: HTTPBearer = HTTPBearer()


# --- Models ---

class UserRegister(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# --- Fake Database ---

# In a real app, this would be a database table
users_db: dict[str, dict[str, str | bytes]] = {}


# --- Helper Functions ---

def hash_password(password: str) -> bytes:
    """Hash a password using bcrypt."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())


def verify_password(password: str, hashed: bytes) -> bool:
    """Verify a password against a bcrypt hash."""
    return bcrypt.checkpw(password.encode("utf-8"), hashed)


def create_access_token(username: str) -> str:
    """Create a JWT access token."""
    expiration: datetime = datetime.now(timezone.utc) + timedelta(
        hours=TOKEN_EXPIRY_HOURS
    )
    payload: dict[str, str | float] = {
        "sub": username,
        "exp": expiration.timestamp()
    }
    token: str = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    """Extract and verify the current user from the JWT token."""
    token: str = credentials.credentials
    try:
        payload: dict[str, str | float] = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM]
        )
        username: str = str(payload["sub"])
        if username not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# --- Endpoints ---

@app.post("/register", status_code=201)
def register(user: UserRegister) -> dict[str, str]:
    """Register a new user."""
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed: bytes = hash_password(user.password)
    users_db[user.username] = {
        "username": user.username,
        "password_hash": hashed
    }
    return {"message": f"User {user.username} created successfully"}


@app.post("/login")
def login(user: UserLogin) -> TokenResponse:
    """Log in and receive a JWT token."""
    if user.username not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_hash: bytes = bytes(users_db[user.username]["password_hash"])
    if not verify_password(user.password, stored_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token: str = create_access_token(user.username)
    return TokenResponse(access_token=token, token_type="bearer")


@app.get("/profile")
def get_profile(current_user: str = Depends(get_current_user)) -> dict[str, str]:
    """Protected endpoint -- requires authentication."""
    return {"username": current_user, "message": "This is your private profile"}


@app.get("/public")
def public_endpoint() -> dict[str, str]:
    """Public endpoint -- no authentication required."""
    return {"message": "This is public. Anyone can see this."}
```

### How It Works

1. **Register**: User sends username and password. Password is hashed with bcrypt and stored.
2. **Login**: User sends username and password. Server verifies the password and returns a JWT.
3. **Protected routes**: The `Depends(get_current_user)` decorator requires a valid JWT in the `Authorization: Bearer <token>` header. FastAPI runs `get_current_user` before the endpoint function, verifies the token, and passes the username.
4. **Public routes**: No `Depends` -- anyone can access.

### Testing the Flow

```bash
# Register
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "secret123"}'

# Login (save the token)
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "secret123"}'
# Returns: {"access_token": "eyJ...", "token_type": "bearer"}

# Access protected route (use the token)
curl http://localhost:8000/profile \
  -H "Authorization: Bearer eyJ..."

# Try without token
curl http://localhost:8000/profile
# Returns: 403 Forbidden
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Walk me through the complete authentication flow: a user registers, logs in, and then accesses a protected endpoint. At each step, what data is sent? What does the server do with it? What is stored in the database? What is sent back to the client? Draw a diagram showing the full flow."</div>
</div>

---

## Where People Go Wrong

**Storing plain-text passwords.** This has been said three times now because it is that important. Use bcrypt. Always.

**Not using HTTPS.** If you send a JWT over plain HTTP, anyone on the network can steal it. Always use HTTPS in production.

**JWTs without expiration.** If a token never expires, a stolen token works forever. Set a reasonable expiration (1 hour for sensitive apps, 24 hours for less sensitive ones).

**Returning "username not found" vs "wrong password."** This tells attackers which usernames exist. Always return the same message: "Invalid credentials." Do not help attackers narrow down their attack.

**Insecure cookies.** If you use cookies for session IDs, set `httponly=True` (prevents JavaScript access), `secure=True` (only sent over HTTPS), and `samesite="lax"` (prevents CSRF).

**Not rate-limiting login endpoints.** Without rate limiting, attackers can try millions of passwords. Always limit login attempts.

---

## Key Takeaways

1. Authentication = who are you. Authorization = what can you do.
2. Never store plain-text passwords. Hash them with bcrypt.
3. Sessions store state on the server. Tokens (JWT) are stateless and scale better.
4. JWT has three parts: header, payload, signature. Always set an expiration.
5. Protect against SQL injection, XSS, CSRF, and brute force (rate limiting).
6. Always use HTTPS in production.

---

**Previous:** [[wiki:python-backend-databases]] | **Next:** [[wiki:python-backend-testing]]
