# Databases -- Persisting Data

In the previous page, you built a Todo API that stored everything in a Python dictionary. The problem? When you stop the server, all the data disappears. That is because it lived in memory (RAM), which gets wiped every time the program stops.

A database stores data on disk. It survives restarts, crashes, and power outages. Every real application needs one.

---

## Why Not Just Use Files?

You could save data to a text file or JSON file. For a personal project with one user, that works. But files fall apart when things get real:

- **Concurrent access**: What happens when two users try to write at the same time? Files get corrupted.
- **Querying**: How do you find all users older than 25? Read the entire file, parse it, filter it. Slow.
- **Relationships**: How do you connect users to their posts? Store post IDs inside user records? That gets messy fast.
- **Performance**: A 10 GB file is painful to search. Databases use indexes to find data in milliseconds.

Databases solve all of these problems.

---

## Two Types of Databases

### Relational Databases (SQL)

Data is stored in **tables** with **rows** and **columns**, like a spreadsheet. Tables can be connected to each other through **relationships**.

Examples: PostgreSQL, MySQL, SQLite, Microsoft SQL Server.

```
Users table:
| id | name    | email            | age |
|----|---------|------------------|-----|
| 1  | Alice   | alice@mail.com   | 30  |
| 2  | Bob     | bob@mail.com     | 25  |

Posts table:
| id | title        | user_id |
|----|-------------|---------|
| 1  | Hello World | 1       |
| 2  | My Day      | 1       |
| 3  | New Here    | 2       |
```

The `user_id` column in the Posts table connects each post to a user. This is a **relationship**.

### Non-Relational Databases (NoSQL)

Data is stored as documents (like JSON), key-value pairs, or graphs. No fixed structure required.

Examples: MongoDB, Redis, DynamoDB, Cassandra.

```json
{
    "id": 1,
    "name": "Alice",
    "email": "alice@mail.com",
    "posts": [
        {"title": "Hello World"},
        {"title": "My Day"}
    ]
}
```

**Which should you learn first?** SQL. The vast majority of applications use relational databases. Even if you end up using NoSQL later, the concepts of structured data and querying carry over.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain the difference between a relational database and a NoSQL database. When would you choose one over the other? Give a concrete example of data that fits well in a relational database and data that fits better in a document database."</div>
</div>

---

## SQL Basics

SQL (Structured Query Language) is the language you use to talk to relational databases. It is not Python. It is its own language, but it is simple enough to learn the basics in one sitting.

### Creating a Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER
);
```

This creates a table called `users` with four columns:
- `id`: a unique number for each row, automatically assigned
- `name`: text that cannot be empty (NOT NULL)
- `email`: text that must be unique and cannot be empty
- `age`: a number (can be empty/null)

### Inserting Data

```sql
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@mail.com', 30);
INSERT INTO users (name, email, age) VALUES ('Bob', 'bob@mail.com', 25);
INSERT INTO users (name, email, age) VALUES ('Charlie', 'charlie@mail.com', 35);
```

### Reading Data

```sql
-- Get all users
SELECT * FROM users;

-- Get specific columns
SELECT name, email FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE age > 28;

-- Sort results
SELECT * FROM users ORDER BY age DESC;

-- Limit results
SELECT * FROM users LIMIT 10;

-- Combine conditions
SELECT * FROM users WHERE age > 25 AND name LIKE 'A%';
```

### Updating Data

```sql
UPDATE users SET age = 31 WHERE id = 1;
UPDATE users SET name = 'Robert', age = 26 WHERE email = 'bob@mail.com';
```

### Deleting Data

```sql
DELETE FROM users WHERE id = 3;
```

**Warning:** `DELETE FROM users` without a WHERE clause deletes every single row. There is no undo. Always include a WHERE clause.

### Joining Tables

Joins connect data across tables. This is the power of relational databases.

```sql
-- Get all posts with the author's name
SELECT posts.title, users.name
FROM posts
JOIN users ON posts.user_id = users.id;

-- Result:
-- | title        | name  |
-- |-------------|-------|
-- | Hello World | Alice |
-- | My Day      | Alice |
-- | New Here    | Bob   |
```

### Primary Keys and Foreign Keys

- **Primary key**: uniquely identifies each row in a table (usually `id`)
- **Foreign key**: a column that references the primary key of another table (like `user_id` in the Posts table)

Foreign keys enforce relationships. If you try to insert a post with `user_id = 999` but no user with id 999 exists, the database will reject it.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write SQL queries to: (1) create a 'products' table with id, name, price, and category columns; (2) insert three products; (3) select all products under $20; (4) update the price of a product with id 1; (5) delete all products in the 'electronics' category. Explain what each query does."</div>
</div>

---

## SQLite -- A Database in a File

SQLite is a database that stores everything in a single file. No server to install. No configuration. It comes built into Python.

SQLite is perfect for:
- Learning SQL
- Small applications
- Prototyping before using a bigger database
- Mobile apps

Open your editor. Build this:

```python
import sqlite3


def setup_database() -> sqlite3.Connection:
    """Create the database and tables."""
    conn: sqlite3.Connection = sqlite3.connect("todo.db")
    cursor: sqlite3.Cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            completed INTEGER DEFAULT 0
        )
    """)

    conn.commit()
    return conn


def add_todo(conn: sqlite3.Connection, title: str, description: str = "") -> int:
    """Add a new todo. Returns the new todo's ID."""
    cursor: sqlite3.Cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO todos (title, description) VALUES (?, ?)",
        (title, description)
    )
    conn.commit()
    new_id: int = cursor.lastrowid if cursor.lastrowid else 0
    return new_id


def get_all_todos(conn: sqlite3.Connection) -> list[tuple[int, str, str, int]]:
    """Get all todos from the database."""
    cursor: sqlite3.Cursor = conn.cursor()
    cursor.execute("SELECT id, title, description, completed FROM todos")
    rows: list[tuple[int, str, str, int]] = cursor.fetchall()
    return rows


def get_todo_by_id(
    conn: sqlite3.Connection, todo_id: int
) -> tuple[int, str, str, int] | None:
    """Get a single todo by ID."""
    cursor: sqlite3.Cursor = conn.cursor()
    cursor.execute(
        "SELECT id, title, description, completed FROM todos WHERE id = ?",
        (todo_id,)
    )
    row: tuple[int, str, str, int] | None = cursor.fetchone()
    return row


def mark_completed(conn: sqlite3.Connection, todo_id: int) -> bool:
    """Mark a todo as completed. Returns True if the todo existed."""
    cursor: sqlite3.Cursor = conn.cursor()
    cursor.execute(
        "UPDATE todos SET completed = 1 WHERE id = ?",
        (todo_id,)
    )
    conn.commit()
    return cursor.rowcount > 0


def delete_todo(conn: sqlite3.Connection, todo_id: int) -> bool:
    """Delete a todo. Returns True if the todo existed."""
    cursor: sqlite3.Cursor = conn.cursor()
    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    conn.commit()
    return cursor.rowcount > 0


# Try it out
if __name__ == "__main__":
    db: sqlite3.Connection = setup_database()

    # Create
    id1: int = add_todo(db, "Learn SQL", "Study SELECT, INSERT, UPDATE, DELETE")
    id2: int = add_todo(db, "Build an API", "Use FastAPI with a database")
    print(f"Created todos with IDs: {id1}, {id2}")

    # Read all
    all_todos: list[tuple[int, str, str, int]] = get_all_todos(db)
    for todo in all_todos:
        print(f"  [{todo[0]}] {todo[1]} - completed: {bool(todo[3])}")

    # Read one
    single: tuple[int, str, str, int] | None = get_todo_by_id(db, id1)
    if single is not None:
        print(f"Found: {single[1]}")

    # Update
    mark_completed(db, id1)
    print(f"Marked todo {id1} as completed")

    # Delete
    delete_todo(db, id2)
    print(f"Deleted todo {id2}")

    db.close()
```

**Critical detail:** See those `?` placeholders in the SQL queries? That is **parameterized queries**. Never build SQL strings with f-strings or concatenation. We will explain why in the SQL injection section below.

---

## ORMs -- Mapping Classes to Tables

Writing raw SQL works, but it gets tedious. An **ORM** (Object-Relational Mapper) lets you use Python classes instead of SQL strings.

The ORM translates between:
- Python objects and database rows
- Python method calls and SQL queries

We will use **SQLModel**, which combines SQLAlchemy (the most popular Python ORM) with Pydantic (the validation library you already know from FastAPI).

```bash
pip install sqlmodel
```

### Defining Models

```python
from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    """A user in the database."""
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str = Field(unique=True)
    age: int | None = None


class Post(SQLModel, table=True):
    """A blog post written by a user."""
    id: int | None = Field(default=None, primary_key=True)
    title: str
    body: str = ""
    user_id: int = Field(foreign_key="user.id")
```

Each class becomes a table. Each attribute becomes a column. The `table=True` argument tells SQLModel this is an actual database table, not just a data model.

### CRUD with SQLModel

```python
from sqlmodel import SQLModel, Field, Session, create_engine, select


class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: str = ""
    completed: bool = False


# Create the database engine and tables
engine = create_engine("sqlite:///todo_orm.db")
SQLModel.metadata.create_all(engine)


def create_todo(title: str, description: str = "") -> Todo:
    """Create a new todo in the database."""
    todo: Todo = Todo(title=title, description=description)
    with Session(engine) as session:
        session.add(todo)
        session.commit()
        session.refresh(todo)  # loads the auto-generated id
    return todo


def get_all_todos() -> list[Todo]:
    """Get all todos."""
    with Session(engine) as session:
        statement = select(Todo)
        todos: list[Todo] = list(session.exec(statement).all())
    return todos


def get_todo(todo_id: int) -> Todo | None:
    """Get a todo by ID."""
    with Session(engine) as session:
        todo: Todo | None = session.get(Todo, todo_id)
    return todo


def update_todo(todo_id: int, completed: bool) -> Todo | None:
    """Update a todo's completed status."""
    with Session(engine) as session:
        todo: Todo | None = session.get(Todo, todo_id)
        if todo is None:
            return None
        todo.completed = completed
        session.add(todo)
        session.commit()
        session.refresh(todo)
    return todo


def delete_todo(todo_id: int) -> bool:
    """Delete a todo. Returns True if it existed."""
    with Session(engine) as session:
        todo: Todo | None = session.get(Todo, todo_id)
        if todo is None:
            return False
        session.delete(todo)
        session.commit()
    return True
```

Compare this to the raw SQLite code. No SQL strings anywhere. You work with Python objects. The ORM handles the translation.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have a SQLModel class: class Product(SQLModel, table=True) with id, name, price, and in_stock fields. Write functions using SQLModel's Session to: (1) create a product, (2) get all products that are in stock, (3) update a product's price, and (4) delete a product. Use proper type hints everywhere."</div>
</div>

---

## Migrations -- Changing Your Database Over Time

Your database schema will change. You will add columns, rename tables, create new relationships. You cannot just edit the model class and expect the database to update itself.

**Alembic** is the tool for managing database migrations. It tracks changes to your schema and applies them in order.

```bash
pip install alembic
alembic init migrations
```

The typical workflow:

1. Change your SQLModel/SQLAlchemy model
2. Generate a migration: `alembic revision --autogenerate -m "add phone column to users"`
3. Review the generated migration file
4. Apply it: `alembic upgrade head`

A migration file looks like this:

```python
"""add phone column to users"""

from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.add_column("user", sa.Column("phone", sa.String(), nullable=True))


def downgrade() -> None:
    op.drop_column("user", "phone")
```

Every migration has an `upgrade` (apply the change) and a `downgrade` (undo the change). This lets you roll back if something goes wrong.

---

## Relationships -- Connecting Tables

### One-to-Many

One user has many posts. Each post belongs to one user.

```python
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    posts: list["Post"] = Relationship(back_populates="author")


class Post(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    author_id: int = Field(foreign_key="user.id")
    author: User | None = Relationship(back_populates="posts")
```

Now you can access `user.posts` to get all posts by a user, and `post.author` to get the user who wrote a post.

### Many-to-Many

A student can take many courses. A course can have many students. This requires a link table.

```python
from sqlmodel import SQLModel, Field


class StudentCourseLink(SQLModel, table=True):
    """Link table connecting students and courses."""
    student_id: int = Field(foreign_key="student.id", primary_key=True)
    course_id: int = Field(foreign_key="course.id", primary_key=True)


class Student(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


class Course(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
```

---

## Indexes -- Making Queries Fast

When you search for a user by email, the database has to check every single row. With a million users, that is slow.

An **index** is like the index at the back of a textbook. Instead of reading every page to find a topic, you look up the page number in the index.

```python
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)   # create an index on name
    email: str = Field(unique=True)  # unique implies an index
```

**When to add indexes:**
- Columns you search by frequently (WHERE clauses)
- Columns you sort by frequently (ORDER BY)
- Columns used in JOINs (foreign keys)

**When NOT to add indexes:**
- Columns you rarely search by
- Tables with very few rows (the overhead is not worth it)
- Columns that change constantly (indexes slow down writes)

---

## SQL Injection -- The Most Dangerous Mistake

SQL injection is a security vulnerability where an attacker sends malicious SQL through user input.

```python
# NEVER DO THIS -- vulnerable to SQL injection
def get_user_UNSAFE(name: str) -> None:
    query: str = f"SELECT * FROM users WHERE name = '{name}'"
    # If name is:  ' OR '1'='1
    # The query becomes: SELECT * FROM users WHERE name = '' OR '1'='1'
    # This returns ALL users!
    cursor.execute(query)
```

The fix is **parameterized queries** -- let the database library handle inserting values safely:

```python
# ALWAYS DO THIS -- safe from SQL injection
def get_user_SAFE(conn: sqlite3.Connection, name: str) -> list[tuple]:
    cursor: sqlite3.Cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
    results: list[tuple] = cursor.fetchall()
    return results
```

With parameterized queries, the `?` placeholder is replaced by the database driver, which properly escapes special characters. The attacker's input is treated as data, not as SQL code.

**ORMs like SQLModel prevent SQL injection automatically.** When you use `session.get(User, 1)` or `select(User).where(User.name == "Alice")`, the ORM builds parameterized queries behind the scenes.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain SQL injection in simple terms. Show me a vulnerable code example using f-strings to build a SQL query, then show the safe version using parameterized queries. What input would an attacker use to exploit the vulnerable version? Why does the safe version prevent the attack?"</div>
</div>

---

## Connection Pooling

Opening a database connection is expensive. If every API request opens a new connection, your app will be slow.

A **connection pool** keeps a set of open connections ready to use. When your code needs a database connection, it borrows one from the pool. When it is done, it returns it to the pool.

```python
from sqlmodel import create_engine

# Create an engine with connection pooling
engine = create_engine(
    "sqlite:///app.db",
    pool_size=5,         # keep 5 connections ready
    max_overflow=10,     # allow up to 10 extra connections under heavy load
    pool_recycle=3600    # recycle connections after 1 hour
)
```

SQLAlchemy and SQLModel handle connection pooling for you. Just configure the engine, and the pool is managed automatically.

---

## PostgreSQL -- The Production Database

SQLite is great for learning and small apps. For production applications that serve many users, **PostgreSQL** is the standard choice.

PostgreSQL advantages over SQLite:
- Handles many concurrent users
- Advanced data types (JSON, arrays, full-text search)
- Better performance at scale
- Runs as a separate server (can be on a different machine)

Switching from SQLite to PostgreSQL is simple when using an ORM. Change one line:

```python
# SQLite
engine = create_engine("sqlite:///app.db")

# PostgreSQL
engine = create_engine("postgresql://user:password@localhost/mydb")
```

Your model code stays the same. That is the power of an ORM -- it abstracts away the specific database.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Design a database schema for a simple blog. You need tables for: users (id, name, email), posts (id, title, body, created_at, author), and comments (id, text, post, commenter). Draw out the tables, identify the primary keys and foreign keys, and explain the relationships (one-to-many). Then write the SQLModel classes."</div>
</div>

---

## Where People Go Wrong

**SQL injection.** Never build SQL queries with string formatting. Always use parameterized queries or an ORM. This is the number one security mistake beginners make.

**The N+1 query problem.** You load 100 users. Then for each user, you run a separate query to load their posts. That is 101 queries when one JOIN query would do. ORMs can cause this if you are not careful. Learn about eager loading.

**Not using indexes.** Your app is slow because every query does a full table scan. Adding an index on the columns you search by can make queries thousands of times faster.

**Not closing connections.** Every open connection uses server resources. If you open connections and forget to close them, your database will eventually run out. Use context managers (`with Session(engine) as session:`) to ensure connections are always closed.

**Storing everything in one table.** If your users table has 50 columns, something is wrong. Break it into smaller tables with relationships.

---

## Key Takeaways

1. Databases store data on disk. They survive restarts. Files are messy. Databases are structured.
2. SQL is the language for relational databases. Learn SELECT, INSERT, UPDATE, DELETE, and JOIN.
3. SQLite is a database in a file. Perfect for learning. PostgreSQL is for production.
4. ORMs like SQLModel let you use Python classes instead of SQL strings.
5. Never build SQL with string formatting. Use parameterized queries to prevent SQL injection.
6. Use indexes on columns you search by frequently.

---

**Previous:** [[wiki:python-backend-apis]] | **Next:** [[wiki:python-backend-auth]]
