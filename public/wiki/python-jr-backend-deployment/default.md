# Deployment -- Sharing Your App with the World

Your code works. Your tests pass. Your API handles requests, your database stores data, and your authentication keeps things secure. You have built something real.

But right now, it only works on YOUR computer. If you close your laptop, the whole thing disappears. Nobody else in the world can use it.

That is like baking an amazing cake at home and then eating it alone in your kitchen. Would it not be better to open a bakery so everyone can have a slice?

**Deployment** is the process of putting your code on a computer that is always on, always connected to the internet, and ready to serve anyone who visits. This page covers how to do that.

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a colorful bakery shop with a big OPEN sign, handing a slice of cake through the window to happy customers outside. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The Problem: "It Works on My Computer"

On your computer, you run your app and visit `localhost:8000`. Everything works. But there are some problems:

- Your computer is not on 24 hours a day, 7 days a week.
- Your computer is behind your home internet router. People on the internet cannot reach it.
- Your computer can handle you, but probably not 10,000 people at the same time.
- If your computer crashes, your app goes down and nobody can fix it until you wake up.

Deployment solves all of these problems by running your code on special computers called **servers** that live in big buildings called **data centers**. These servers are always on, always connected, and built to be reliable.

---

## Environment Variables -- Keeping Secrets Out of Your Code

Before you put your code anywhere public (like GitHub), you need to deal with secrets. Things like:

- Your database password
- Your JWT secret key
- Your API keys for other services

These should **never** be written directly in your code. If your code is on GitHub, anyone can see it. That is like writing the combination to your safe on the front door of your house.

Instead, you use **environment variables**. These are settings that live OUTSIDE your code, on the computer that runs your app. Your code reads them when it starts up.

Think of it this way: the safe combination is written on a slip of paper locked inside the safe (not on the front door). Only people who already have access to the server can see the secrets.

Here is how it works in Python:

```python
import os

# Read secrets from environment variables (NOT from your code)
database_url: str = os.environ["DATABASE_URL"]
secret_key: str = os.environ["SECRET_KEY"]
debug_mode: bool = os.environ.get("DEBUG", "false").lower() == "true"
```

### The .env File (For Development Only)

On your own computer, you create a small file called `.env` that holds your secrets:

```
DATABASE_URL=sqlite:///app.db
SECRET_KEY=my-local-dev-secret
DEBUG=true
```

Then you use a library to load it:

```bash
pip install python-dotenv
```

```python
from dotenv import load_dotenv
import os

load_dotenv()  # reads the .env file

database_url: str = os.environ["DATABASE_URL"]
secret_key: str = os.environ["SECRET_KEY"]
```

**Very important:** add `.env` to your `.gitignore` file so it never gets uploaded to GitHub:

```
# .gitignore
.env
__pycache__/
```

On the real server, you set environment variables through the server's settings panel or command line. Your code works the same way in both places -- it just reads from environment variables.

---

## Docker -- Your App in a Box

Here is a problem you will run into: your app works perfectly on your computer, but when you try to run it on the server, it breaks. Maybe the server has a different version of Python. Maybe a library is missing. Maybe something is configured differently.

This is the classic problem: **"It works on my machine!"**

**Docker** solves this by putting your app and everything it needs into a **container**. A container is like a shipping container on a cargo ship. No matter what ship carries it, no matter what port it lands in, everything inside the container stays exactly the same.

Your Docker container includes:
- Your code
- The right version of Python
- All your libraries
- The settings your app needs

If it works in the container on your computer, it works in the same container on any server in the world.

### Dockerfile -- The Recipe

A **Dockerfile** is like a recipe. It tells Docker exactly how to build your container, step by step.

```dockerfile
# Step 1: Start with Python already installed
FROM python:3.12-slim

# Step 2: Create a folder for your app
WORKDIR /app

# Step 3: Copy the list of libraries you need
COPY requirements.txt .

# Step 4: Install all the libraries
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy your actual code
COPY . .

# Step 6: Tell Docker how to start your app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Why do we copy `requirements.txt` first and the code second? Docker is smart about caching. If you only changed your code (not your libraries), Docker skips the `pip install` step because the libraries have not changed. This makes rebuilding much faster.

### Building and Running Your Container

```bash
# Build the container (like following the recipe)
docker build -t my-app .

# Run the container (like serving the dish)
docker run -p 8000:8000 my-app

# Run with environment variables
docker run -p 8000:8000 \
  -e DATABASE_URL=sqlite:///app.db \
  -e SECRET_KEY=my-secret \
  my-app
```

The `-p 8000:8000` part connects port 8000 on your computer to port 8000 inside the container. Without it, the container is running but nobody can reach it -- like a bakery with no front door.

![A flat vector illustration in a children's educational book style showing Byte the robot placing a miniature colorful app with gears and code symbols into a big blue shipping container, with a cargo ship in the background ready to carry it. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Docker Compose -- Running Multiple Containers Together

A real app usually needs more than just your code. It needs a database too. Maybe other services as well. **Docker Compose** lets you run multiple containers together with one command.

You create a file called `docker-compose.yml`:

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

volumes:
  postgres_data:
```

Now one command starts everything:

```bash
# Start your app AND the database together
docker-compose up

# Start in the background (so your terminal is free)
docker-compose up -d

# Stop everything
docker-compose down
```

Docker gives the database its own container and your app its own container. They can talk to each other, but they are packaged separately. The `volumes` section makes the database data stick around even if you restart the containers.

---

## CI/CD -- The Automatic Assembly Line

Imagine you are working on your app. You change some code, test it on your computer, and then manually upload it to the server. Every single time. That gets old fast, and sooner or later, you will make a mistake during the upload.

**CI/CD** stands for **Continuous Integration / Continuous Deployment**. It is like an assembly line in a factory:

1. You push your code to GitHub.
2. **Automatically**, the assembly line starts.
3. It installs your app, runs all your tests, and checks for problems.
4. If everything passes, it **automatically** deploys your code to the server.
5. If anything fails, it stops and tells you what went wrong.

No manual uploading. No forgetting to run tests. The machine handles it all.

### GitHub Actions (A Quick Look)

GitHub has a built-in CI/CD system called **GitHub Actions**. You create a file in your project that describes what should happen when you push code:

```yaml
# .github/workflows/deploy.yml
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
      - run: pip install -r requirements.txt
      - run: pytest -v

  deploy:
    needs: test  # only runs if tests pass!
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: echo "Deploying..."
```

The magic line is `needs: test`. The deploy step **only** happens if all the tests pass. A failing test blocks deployment automatically. This keeps broken code from reaching your users.

---

## Cloud Platforms -- Where Your App Lives

You need a computer on the internet to run your container. That is what **cloud platforms** provide. They are companies that rent you servers.

For a first deployment, here are some beginner-friendly options:

| Platform | Why It Is Good for Beginners |
|----------|-------------------------------|
| **Railway** | Connect your GitHub and deploy in minutes |
| **Render** | Simple setup, supports Docker, has a free tier |
| **Fly.io** | Runs containers worldwide, good free tier |

The big cloud platforms (AWS, Google Cloud, Azure) are more powerful but much more complicated. Start with a simpler platform to get your feet wet.

The basic process is the same for most platforms:
1. Create an account.
2. Connect your GitHub repository.
3. Set your environment variables in the platform's settings.
4. The platform builds and runs your Docker container.
5. It gives you a URL like `https://my-app.railway.app`.

That is it. Your app is live on the internet.

---

## Logging -- Your App's Diary

When your app is running on a server, you cannot watch the terminal. You are not sitting there staring at the output. So how do you know what is happening? How do you find out what went wrong if something breaks at 3 AM?

**Logging** is like keeping a diary for your app. Every important thing that happens gets written down with a timestamp.

```python
import logging

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
        # ... process the payment ...
        logger.info(f"Order {order_id} processed successfully")
        return True
    except Exception as e:
        logger.error(f"Order {order_id} failed: {e}")
        return False
```

The log output looks like this:

```
2025-03-15 10:23:45 - orders - INFO - Processing order 1234 for $59.99
2025-03-15 10:23:46 - orders - INFO - Order 1234 processed successfully
2025-03-15 10:24:01 - orders - WARNING - Order 1235 has invalid amount: -5.0
```

Now if something goes wrong, you can look back through the diary and see exactly what happened, when it happened, and where.

There are different levels of seriousness:

| Level | When to Use It |
|-------|----------------|
| **INFO** | Normal events ("Order processed," "User logged in") |
| **WARNING** | Something odd, but not broken ("Invalid amount received") |
| **ERROR** | Something failed ("Payment processing failed") |

---

## Health Checks -- "Are You Still Alive?"

How do you know your app is still running? You could visit it every five minutes and check, but that is a terrible plan (what about 3 AM?).

A **health check** is a simple endpoint that answers one question: "Are you still alive and working?"

```python
from fastapi import FastAPI
from datetime import datetime, timezone

app: FastAPI = FastAPI()

start_time: datetime = datetime.now(timezone.utc)


@app.get("/health")
def health_check() -> dict:
    """A simple endpoint that says 'I am alive.'"""
    uptime_seconds: float = (
        datetime.now(timezone.utc) - start_time
    ).total_seconds()
    return {
        "status": "healthy",
        "uptime_seconds": round(uptime_seconds, 1)
    }
```

Monitoring tools, cloud platforms, and load balancers ping this endpoint regularly (like every 30 seconds). If it stops responding, they know your app is down and can restart it automatically or alert you.

It is like a lifeguard watching the pool. They check on everyone regularly. If someone stops swimming, they notice right away.

---

## Everything Together -- The Full Picture

Here is how all the pieces of the entire learning path fit together in a real, deployed application:

```
A user on the internet
        |
        v
  Cloud Platform (Railway, Render, etc.)
        |
        v
  Docker Container
        |
        v
  Your FastAPI Application
  |-- Routes (the API endpoints you built)
  |-- Pydantic Models (input validation)
  |-- Authentication (JWT tokens, bcrypt passwords)
  |-- Business Logic (your Python code)
  |-- SQLModel (talking to the database)
        |
        v
  PostgreSQL Database (also in a container)
```

Monitored by: logging, health checks, CI/CD pipeline.

Protected by: hashed passwords, JWT tokens, HTTPS, environment variables.

Tested by: unit tests, integration tests, end-to-end tests.

![A flat vector illustration in a children's educational book style showing Byte the robot standing proudly next to a tall colorful tower made of labeled building blocks stacked on top of each other: Database at the bottom, then Python Code, then Authentication, then API, then Docker, and a cloud at the top with happy users around it. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## You Did It!

Take a moment to appreciate how far you have come. Seriously. Stop and think about this.

When you started this roadmap, you wrote `print("Hello, World!")` and that was exciting. Now look at what you know:

- **Python fundamentals**: variables, types, conditions, loops, functions, classes, error handling
- **Data structures**: lists, dictionaries, stacks, queues, trees, graphs, hash tables
- **Algorithms**: sorting, searching, recursion, dynamic programming, graph traversal
- **Problem-solving patterns**: sliding window, two pointers, BFS, DFS, and more
- **HTTP**: how the internet sends messages back and forth
- **APIs**: building your own web services with FastAPI
- **Databases**: storing and retrieving data with SQL and SQLModel
- **Authentication**: keeping your users safe with hashing, tokens, and proper security
- **Testing**: writing code that proves your code works
- **Deployment**: putting your app on the internet for the world to use

You went from "what is a variable?" all the way to "I can build and deploy a full web application." That is a real achievement. You should be proud.

---

## What Comes Next?

This is the end of the roadmap, but it is not the end of your learning. Here are some exciting things to explore when you are ready:

**Async Programming**: Making your app do multiple things at the same time. Instead of waiting for a slow database query to finish before handling the next request, your app can handle both at once. Python has built-in tools for this with `async` and `await`.

**Design Patterns**: Common solutions to common problems. Things like "how do you make sure only one copy of an object exists?" or "how do you let objects talk to each other without knowing about each other?" These patterns show up in codebases everywhere.

**System Design**: Thinking about how to build really big systems. What happens when you have millions of users? How do you split your app across hundreds of servers? How do big companies like YouTube or Instagram handle all that traffic?

**Frontend Development**: Everything on this roadmap has been about the backend (the server side). The frontend is what users actually see and click on -- the buttons, the pages, the animations. Learning a frontend framework like React or Vue lets you build complete web applications.

Every one of these topics builds on everything you have learned here. You have the foundation. Now you get to build whatever you want on top of it.

---

## Quick Summary

| Concept | What It Means |
|---------|---------------|
| Environment variables | Storing secrets outside your code (like a safe in the back room) |
| Docker | Packaging your app so it runs the same everywhere (like a shipping container) |
| Dockerfile | The recipe for building a Docker container |
| Docker Compose | Running multiple containers together (app + database) |
| CI/CD | Automatically testing and deploying when you push code (like an assembly line) |
| GitHub Actions | GitHub's built-in CI/CD system |
| Cloud platforms | Services that run your containers on the internet |
| Logging | Your app's diary of what happened and when |
| Health checks | A simple endpoint that says "I am still alive" |

---

## Practice Questions

Try to answer these on your own before looking at the answers at the bottom of the page.

**Question 1:** Your code works perfectly on your computer. Why can you not just leave it there? What problems does deployment solve?

**Question 2:** Why should secrets like database passwords and JWT keys never be written directly in your code? What should you use instead? Use the "safe in the back room" analogy to explain.

**Question 3:** What is Docker? What problem does it solve? Use the shipping container analogy to explain.

**Question 4:** What is the difference between a Dockerfile and Docker Compose? When do you need Docker Compose?

**Question 5:** What does CI/CD stand for? Describe what happens step-by-step from the moment you push code to GitHub until it is running on a live server. What happens if a test fails?

**Question 6:** What is logging and why is it important for a deployed app? What is the difference between an INFO log and an ERROR log?

**Question 7:** What is a health check endpoint? Why would a cloud platform need to ping it regularly?

**Question 8:** Look back at the full picture diagram. Pick any three layers (like "Authentication" or "Database") and explain what each one does and why it is needed.

---

## Answers to Practice Questions

**Answer 1:** Your computer is not on 24/7, it is not connected to the internet in a way that other people can reach it, it cannot handle many users at once, and if it crashes, the app is down until you manually fix it. Deployment puts your code on a server that is always on, always connected, built for reliability, and can handle many users. It makes your app available to anyone in the world at any time.

**Answer 2:** If your code is on GitHub (or any public place), anyone can see those secrets. Even on private repositories, you do not want secrets in your code because they get saved in the version history forever. Instead, use environment variables -- settings that live outside your code, on the server itself. It is like keeping the combination to a safe locked inside the safe in a back room, not written on the front door where anyone walking by can read it.

**Answer 3:** Docker packages your app along with everything it needs (Python, libraries, settings) into a container. It solves the "it works on my machine" problem. Just like a shipping container keeps everything inside it the same no matter what truck or ship carries it, a Docker container keeps your app the same no matter what server runs it. If it works in the container on your computer, it works in the same container anywhere.

**Answer 4:** A **Dockerfile** is the recipe for building ONE container (your app). **Docker Compose** is a tool for running MULTIPLE containers together. You need Docker Compose when your app requires more than just itself -- for example, your app plus a PostgreSQL database. Docker Compose lets you define both containers and start them with one command, and they can talk to each other.

**Answer 5:** CI/CD stands for Continuous Integration / Continuous Deployment. Step by step: (1) You push code to GitHub. (2) GitHub Actions automatically starts. (3) It sets up a fresh computer, installs your dependencies, and runs all your tests. (4) If all tests pass, it deploys your code to the server (builds the Docker container, pushes it to the cloud platform). (5) The new version of your app is live. If a test fails, the deployment is BLOCKED. The broken code never reaches your users. You get a notification telling you what failed so you can fix it.

**Answer 6:** Logging is like a diary for your app. Every important event gets recorded with a timestamp. It is important because when your app is running on a remote server, you cannot watch the terminal. If something breaks at 3 AM, you need to be able to look back through the logs and see what happened. An INFO log records normal events ("User logged in," "Order processed"). An ERROR log records failures ("Payment failed," "Database connection lost"). ERROR logs are more serious and usually need someone to investigate.

**Answer 7:** A health check endpoint is a simple API endpoint (usually `/health`) that returns a quick response saying "I am alive and working." Cloud platforms and monitoring tools ping this endpoint regularly (like every 30 seconds). If the endpoint stops responding, the platform knows the app has crashed and can automatically restart it or send an alert. Without health checks, a crashed app might sit there broken for hours before anyone notices.

**Answer 8:** (Example answer picking three layers)

**Database (PostgreSQL):** This is where all the data lives permanently. User accounts, posts, orders -- everything is stored here. Without it, all data would disappear every time the app restarts. It uses SQL to organize and retrieve data efficiently.

**Authentication (JWT, bcrypt):** This layer makes sure the app knows WHO is making each request and whether they are ALLOWED to do it. Passwords are hashed with bcrypt so they are stored safely. JWT tokens act as digital passes so users do not have to type their password for every single request.

**Docker:** This layer packages the entire app and all its dependencies into a container that runs the same way everywhere. It solves the problem of "it works on my computer but not on the server" by making sure the app always runs in the exact same environment.

---

**Previous:** [[wiki:python-jr-backend-testing]]
