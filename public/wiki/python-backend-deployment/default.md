# Deployment -- Getting Your Code to Users

Your code works on your machine. It passes all the tests. The API responds correctly. The database stores data.

None of that matters if nobody else can use it.

Deployment is the process of taking your code from "works on my laptop" to "works for anyone on the internet, 24 hours a day, 7 days a week." This page covers every piece of that process.

---

## The Problem

On your laptop, you run `uvicorn main:app --reload` and visit `localhost:8000`. Works great. But:

- Your laptop is not running 24/7
- Your laptop is behind your home router (the internet cannot reach it)
- You have one machine -- it cannot handle 10,000 users at once
- If your laptop crashes, the app goes down

Deployment solves these problems by running your code on servers in data centers that are always on, always connected, and built for reliability.

---

## Environments -- Development, Staging, Production

Real projects run in multiple environments:

| Environment | Purpose | Who Uses It |
|-------------|---------|-------------|
| **Development** (local) | Writing and testing code | You, the developer |
| **Staging** | Testing in a production-like setup | Your team, QA |
| **Production** | The real thing, serving real users | Everyone |

Each environment might have different databases, different settings, and different scale. You never test on production. You never experiment on production. Production is sacred.

---

## Environment Variables -- Keeping Secrets Out of Code

Database passwords, API keys, and secret tokens should never be in your source code. If your code is on GitHub, anyone can see it.

**Environment variables** store configuration outside your code. Your code reads them at runtime.

```python
import os

# Read configuration from environment variables
database_url: str = os.environ["DATABASE_URL"]
secret_key: str = os.environ["SECRET_KEY"]
debug_mode: bool = os.environ.get("DEBUG", "false").lower() == "true"
port: int = int(os.environ.get("PORT", "8000"))

print(f"Connecting to database: {database_url}")
print(f"Debug mode: {debug_mode}")
print(f"Running on port: {port}")
```

### Setting Environment Variables

On your local machine, create a `.env` file (never commit this to git!):

```
DATABASE_URL=sqlite:///app.db
SECRET_KEY=my-local-dev-secret
DEBUG=true
PORT=8000
```

Use `python-dotenv` to load it automatically:

```bash
pip install python-dotenv
```

```python
from dotenv import load_dotenv
import os

load_dotenv()  # loads variables from .env file

database_url: str = os.environ["DATABASE_URL"]
secret_key: str = os.environ["SECRET_KEY"]
```

**Critical rule:** Add `.env` to your `.gitignore` file. Never commit secrets to version control.

```
# .gitignore
.env
__pycache__/
*.pyc
```

### Using Pydantic Settings for Configuration

For a more structured approach, use Pydantic's settings management:

```python
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""
    database_url: str
    secret_key: str
    debug: bool = False
    port: int = 8000

    class Config:
        env_file = ".env"


settings: Settings = Settings()

print(settings.database_url)
print(settings.secret_key)
print(settings.port)
```

Pydantic validates the types automatically. If `PORT` is set to `"abc"`, it raises a clear error because `port` expects an `int`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why should you never hardcode secrets like database passwords or API keys in your source code? What are environment variables and how do they solve this problem? What is a .env file and why should it never be committed to Git? Show a Python example of reading a database URL from an environment variable."</div>
</div>

---

## Docker -- Packaging Your App

The classic deployment problem: "It works on my machine, but not on the server." This happens because your machine has different versions of Python, different libraries, different operating system settings.

**Docker** solves this by packaging your app with everything it needs into a **container**. A container is like a lightweight virtual machine. It includes your code, Python, all your libraries, and the operating system configuration. If it works in the container on your machine, it works in the same container on any server.

### Dockerfile -- The Recipe

A `Dockerfile` is a recipe that tells Docker how to build your container.

```dockerfile
# Start with an official Python image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application code
COPY . .

# Tell Docker what command to run
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Why copy `requirements.txt` first, then code separately? Docker caches each step. If your code changes but your dependencies have not, Docker reuses the cached dependency layer and skips `pip install`. This makes rebuilds much faster.

### Building and Running

```bash
# Build the container image
docker build -t my-api .

# Run the container
docker run -p 8000:8000 my-api

# Run with environment variables
docker run -p 8000:8000 \
  -e DATABASE_URL=sqlite:///app.db \
  -e SECRET_KEY=my-secret \
  my-api

# Run in the background (detached mode)
docker run -d -p 8000:8000 my-api
```

The `-p 8000:8000` flag maps port 8000 on your machine to port 8000 inside the container. Without it, the container's port is not accessible from outside.

### A Complete requirements.txt

```
fastapi==0.109.0
uvicorn==0.27.0
sqlmodel==0.0.14
bcrypt==4.1.2
PyJWT==2.8.0
python-dotenv==1.0.1
pydantic-settings==2.1.0
```

Always pin your dependency versions. `fastapi==0.109.0` (exact version) instead of `fastapi` (latest, which could break things).

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain Docker in simple terms. What problem does it solve? What is a Dockerfile? Walk through each line of a Dockerfile that sets up a Python web application. What does 'docker build -t my-app .' do? What does 'docker run -p 8000:8000 my-app' do?"</div>
</div>

---

## Docker Compose -- Running Multiple Services

A real application has more than just your API. You need a database, maybe a cache (Redis), maybe a message queue. Docker Compose lets you define and run all these services together.

Create a file called `docker-compose.yml`:

```yaml
version: "3.9"

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - SECRET_KEY=change-me-in-production
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run everything with one command:

```bash
docker-compose up
```

This starts both your API and a PostgreSQL database. The API can reach the database at `db:5432` (Docker's internal networking). The `volumes` section makes the database data persistent -- it survives container restarts.

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop everything
docker-compose down

# Stop and remove data
docker-compose down -v
```

---

## CI/CD -- Automated Testing and Deployment

CI/CD stands for Continuous Integration / Continuous Deployment.

**Continuous Integration**: Every time you push code, tests run automatically. If they fail, the push is flagged.

**Continuous Deployment**: If tests pass, the code is automatically deployed to production (or staging).

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Test and Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest --cov=app -v

  deploy:
    needs: test  # only runs if tests pass
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production
        run: |
          # Your deployment commands here
          # For example, push to a cloud platform
          echo "Deploying to production..."
```

The `needs: test` line means deployment only happens if all tests pass. A failing test blocks deployment automatically.

---

## Cloud Platforms

You need a server to run your container. Cloud platforms provide servers you can rent.

### The Big Three

| Platform | Best For |
|----------|----------|
| **AWS** (Amazon Web Services) | Everything. Most popular. Most complex. |
| **GCP** (Google Cloud Platform) | Data and ML workloads |
| **Azure** (Microsoft) | Enterprise and .NET shops |

These are powerful but complex. For a first deployment, use simpler platforms.

### Simpler Options

| Platform | Why Use It |
|----------|-----------|
| **Railway** | Deploy from GitHub in minutes. Free tier. |
| **Render** | Simple. Supports Docker. Free tier. |
| **Fly.io** | Runs containers globally. Good free tier. |
| **Heroku** | The original simple platform. Paid only now. |

For your first deployment, Railway or Render is the easiest. Push to GitHub, connect the platform, and it deploys automatically.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain the CI/CD pipeline: what happens from the moment a developer pushes code to GitHub until the code is running in production? What role do automated tests play? What happens if a test fails? Why is this process better than manually deploying?"</div>
</div>

---

## WSGI and ASGI -- Connecting Your App to a Server

Your FastAPI app is a Python program, but it needs something to actually handle incoming HTTP connections from the internet.

**WSGI** (Web Server Gateway Interface): The older standard. Used by Flask, Django.
- Server: Gunicorn

**ASGI** (Asynchronous Server Gateway Interface): The newer standard. Used by FastAPI.
- Server: Uvicorn

```bash
# Development (single worker, auto-reload)
uvicorn main:app --reload

# Production (multiple workers for handling concurrent requests)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

In production, run multiple workers. Each worker handles requests independently. Four workers means four requests can be processed simultaneously.

Gunicorn can also manage Uvicorn workers:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

This is the recommended production setup: Gunicorn as the process manager, Uvicorn as the ASGI worker.

---

## Process Managers -- Keeping Your App Running

What happens if your app crashes? Without a process manager, it stays down until you notice and restart it manually.

A **process manager** monitors your app and restarts it automatically if it crashes.

### systemd (Linux)

Most Linux servers use systemd. Create a service file:

```ini
# /etc/systemd/system/myapi.service
[Unit]
Description=My FastAPI Application
After=network.target

[Service]
User=www-data
WorkingDirectory=/opt/myapi
ExecStart=/opt/myapi/venv/bin/gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
Restart=always
RestartSec=5
Environment=DATABASE_URL=postgresql://user:pass@localhost/mydb
Environment=SECRET_KEY=production-secret

[Install]
WantedBy=multi-user.target
```

```bash
# Start the service
sudo systemctl start myapi

# Enable on boot
sudo systemctl enable myapi

# Check status
sudo systemctl status myapi

# View logs
sudo journalctl -u myapi -f
```

`Restart=always` is the key line. If the process dies for any reason, systemd restarts it within 5 seconds.

---

## Reverse Proxy -- Nginx in Front of Your App

In production, you do not expose your Python app directly to the internet. You put **Nginx** in front of it as a reverse proxy.

Nginx handles:
- **HTTPS termination**: manages SSL certificates and encryption
- **Static files**: serves images, CSS, JS without touching your Python app
- **Load balancing**: distributes requests across multiple instances
- **Rate limiting**: prevents abuse
- **Compression**: shrinks responses to save bandwidth

```nginx
# /etc/nginx/sites-available/myapi
server {
    listen 80;
    server_name api.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

The flow: `User -> Nginx (port 443, HTTPS) -> Your App (port 8000, HTTP)`. Nginx handles the encryption. Your app just deals with plain HTTP internally.

---

## Logging and Monitoring

In production, you cannot watch the terminal. You need logs and monitoring.

### Logging in Python

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger: logging.Logger = logging.getLogger(__name__)


def process_order(order_id: int, amount: float) -> bool:
    """Process a customer order."""
    logger.info(f"Processing order {order_id} for ${amount:.2f}")

    if amount <= 0:
        logger.warning(f"Order {order_id} has invalid amount: {amount}")
        return False

    try:
        # ... process payment ...
        logger.info(f"Order {order_id} processed successfully")
        return True
    except Exception as e:
        logger.error(f"Order {order_id} failed: {e}", exc_info=True)
        return False
```

Use the right log levels:
- **DEBUG**: detailed info for debugging (not in production)
- **INFO**: general information about what the app is doing
- **WARNING**: something unexpected but not critical
- **ERROR**: something failed
- **CRITICAL**: the app cannot continue

### Log output example:

```
2024-01-15 10:23:45 - orders - INFO - Processing order 1234 for $59.99
2024-01-15 10:23:46 - orders - INFO - Order 1234 processed successfully
2024-01-15 10:24:01 - orders - WARNING - Order 1235 has invalid amount: -5.0
```

---

## Health Checks

A health check endpoint tells monitoring tools that your app is alive and working.

```python
from fastapi import FastAPI
from datetime import datetime, timezone

app: FastAPI = FastAPI()

start_time: datetime = datetime.now(timezone.utc)


@app.get("/health")
def health_check() -> dict[str, str | float]:
    """Health check endpoint for monitoring and load balancers."""
    uptime_seconds: float = (
        datetime.now(timezone.utc) - start_time
    ).total_seconds()
    return {
        "status": "healthy",
        "uptime_seconds": round(uptime_seconds, 1),
        "version": "1.0.0"
    }
```

Load balancers, Docker, and monitoring tools ping this endpoint regularly. If it stops responding, they know your app is down and can take action (restart it, route traffic elsewhere).

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Describe a complete production deployment setup for a FastAPI application. Include: environment variables for secrets, Docker for packaging, Nginx as a reverse proxy, Gunicorn with Uvicorn workers, a health check endpoint, and logging. Draw a diagram showing how a user's request flows from the internet to your Python code and back."</div>
</div>

---

## Scaling -- Handling More Users

### Vertical Scaling (Scale Up)

Give your server more resources: more CPU, more RAM, bigger disk.

- **Pros:** Simple. No code changes.
- **Cons:** There is a limit. The biggest machine money can buy eventually is not enough.

### Horizontal Scaling (Scale Out)

Run multiple copies of your app on different machines. Use a **load balancer** to distribute requests.

```
                    Load Balancer
                   /     |      \
                  v      v       v
              Server 1  Server 2  Server 3
              (your app) (your app) (your app)
                  \      |       /
                   v     v      v
                    Database
```

- **Pros:** Nearly unlimited scaling. If one server dies, the others handle the load.
- **Cons:** More complex. Your app must be stateless (no storing data in memory across requests).

This is why stateless design (covered in the HTTP page) matters. If user session data is stored in Server 1's memory, and the next request goes to Server 2, the session is lost. Store shared state in the database or a cache like Redis.

---

## Where People Go Wrong

**Hardcoding secrets.** `SECRET_KEY = "my-password-123"` right in the code, committed to GitHub. Use environment variables. Always.

**Not using Docker.** "It works on my machine." Docker makes sure it works everywhere. Use it from the start.

**No health checks.** Your app has been crashed for 3 hours and nobody noticed. A health check endpoint and monitoring would have caught it in seconds.

**No logging.** Something went wrong in production. You have no idea what because there are no logs. Log important events and errors from day one.

**Deploying without CI/CD.** Manual deployment is error-prone. One wrong command and production is down. Automate it.

**Not pinning dependencies.** `pip install fastapi` installs the latest version. If a new version has a breaking change, your deployment breaks. Always pin versions in `requirements.txt`.

---

## The Full Stack -- Everything Together

Here is how all the pieces of this learning path come together in a deployed application:

```
User's Browser
      |
      v
   Nginx (HTTPS, reverse proxy)
      |
      v
   Gunicorn + Uvicorn (ASGI server, multiple workers)
      |
      v
   FastAPI Application
   ├── Routes (API endpoints)
   ├── Pydantic Models (input validation)
   ├── Authentication (JWT, bcrypt)
   ├── Business Logic (your Python code)
   └── SQLModel / SQLAlchemy (database access)
      |
      v
   PostgreSQL Database
```

Monitored by: logging, health checks, CI/CD pipeline, Docker containers.

---

## Comprehensive Final Quiz -- The Entire Python Learning Path

You have made it through the entire Python programming learning path. This final quiz covers everything from Phase 1 through Phase 9. Use it to test yourself on the concepts that matter most.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 1 - Fundamentals: Explain the difference between a value and a variable. What does it mean that Python is dynamically typed? What are type hints and why should you always use them? Show a function with proper type hints that takes two integers and returns their average as a float."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 2 - Collections and Flow: I have a list of student scores: [85, 92, 78, 95, 88, 76, 90]. Using a list comprehension, filter out scores below 80. Then write a function using a dictionary to count how many times each score range appears (70-79, 80-89, 90-100). Include type hints everywhere."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 3 - Functions and Modules: Explain closures and decorators. Write a decorator called @timer that prints how long a function takes to execute. Then write a decorator called @retry(max_attempts=3) that retries a function up to 3 times if it raises an exception. Show both with full type hints."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 4 - OOP: Design a class hierarchy for a vehicle rental system. Create a base Vehicle class with make, model, and daily_rate. Create Car and Truck subclasses. Implement a RentalManager class that can add vehicles, rent them out, return them, and calculate total revenue. Use proper type hints, special methods (__str__, __repr__), and explain when you used inheritance vs composition."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 5 - Data Structures: Compare arrays, linked lists, hash tables, trees, and heaps. For each one, state the time complexity of insertion, deletion, and search. When would you choose each one? Implement a MinHeap class from scratch with insert and extract_min methods. Include type hints."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 6 - Algorithms: Explain the difference between O(1), O(log n), O(n), O(n log n), and O(n^2) with real examples. Implement merge sort with full type hints. Then explain when you would use DFS vs BFS on a graph and implement both."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 7 - Algorithm Patterns: Solve this problem using dynamic programming: given a list of coin denominations [1, 5, 10, 25] and an amount 67, find the minimum number of coins needed. Show the brute force approach first, explain why it is slow, then build the DP solution step by step with a table. Analyze the time and space complexity."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 8 - Problem Solving: Here is a LeetCode-style problem: given a string, find the length of the longest substring without repeating characters. Use the six-step method: understand the problem, work through examples by hand, identify the pattern (sliding window), code the solution, test edge cases (empty string, all same characters, all unique characters), and analyze time/space complexity."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Phase 9 - Backend: Build a complete mental model of a web application. A user visits your website and creates an account. Trace the entire flow: the browser sends an HTTP request, Nginx receives it, forwards to your FastAPI app, the app validates input with Pydantic, hashes the password with bcrypt, stores the user in PostgreSQL via SQLModel, returns a JWT token. Explain each component, what it does, and why it is needed."</div>
</div>

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Final Challenge: Design and describe (in detail) a complete backend system for a URL shortener. Cover: the API endpoints (create short URL, redirect, get stats), the database schema, authentication for the API, testing strategy (unit and integration tests), Docker setup, and deployment. What data structures and algorithms would you use to generate short codes? How would you handle millions of URLs?"</div>
</div>

---

## Key Takeaways

1. Use environment variables for secrets. Never hardcode them.
2. Docker packages your app with all its dependencies. Works on any machine.
3. Docker Compose runs multiple services (app + database) together.
4. CI/CD automates testing and deployment. Tests gate deployment.
5. Nginx handles HTTPS, static files, and load balancing in front of your app.
6. Health checks and logging let you monitor your app in production.
7. Scale vertically (bigger machine) for simplicity, horizontally (more machines) for growth.

---

**Previous:** [[wiki:python-backend-testing]]
