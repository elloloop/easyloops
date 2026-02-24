# Databases -- Storing Data That Lasts

In the last lesson, you built a Pet Store API with FastAPI. It could create, read, update, and delete pets. But there was a big problem: **all the data was stored in a Python dictionary.** The moment you stopped the server, everything disappeared. Every pet you added was gone forever.

This is like writing notes on a whiteboard and then erasing the board every night. You need something better. You need a **database**.

---

## What Is a Database?

A database is a program that stores data and keeps it safe, even when you turn off the computer. It writes the data to disk (your hard drive), so it survives restarts, crashes, and power outages.

### The Filing Cabinet Analogy

Think of a database as a **filing cabinet that never forgets**. You can:

- **Add** new files to the cabinet
- **Look up** a specific file quickly
- **Change** the contents of a file
- **Remove** a file you no longer need

The filing cabinet keeps everything organized, and nothing disappears when you leave the room. Even if the lights go out and you come back the next day, all your files are still exactly where you left them.

Without a database, your API is like writing on sticky notes and taping them to the wall. A database is like having a proper filing cabinet with labeled folders.

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a large colorful filing cabinet with neatly labeled drawers, placing a folder into one of the drawers while a small whiteboard in the background has erased scribbles. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Relational Databases -- Data in Tables

The most common type of database is a **relational database**. It stores data in **tables**, which look a lot like spreadsheets.

Here is what a `pets` table might look like:

```
pets table:
| id | name     | animal | age |
|----|----------|--------|-----|
| 1  | Buddy    | dog    | 3   |
| 2  | Whiskers | cat    | 5   |
| 3  | Goldie   | fish   | 1   |
| 4  | Rex      | dog    | 7   |
```

Let's learn the vocabulary:

- **Table** -- A collection of related data (like one spreadsheet). The `pets` table holds all the pets.
- **Row** -- One item in the table. Each row is one pet. Buddy is one row. Whiskers is another row.
- **Column** -- One piece of information about every item. The `name` column holds every pet's name. The `age` column holds every pet's age.
- **Primary key** -- A unique identifier for each row. The `id` column is the primary key. No two pets can have the same `id`. This is how you tell pets apart, even if two pets happen to have the same name.

Think of it this way: a **table** is a filing cabinet drawer, each **row** is a folder in that drawer, and each **column** is a specific piece of information written on every folder.

---

## SQL -- The Language for Talking to Databases

Just like HTTP is the language browsers and servers use to talk, **SQL** (Structured Query Language) is the language you use to talk to a database. You write SQL commands to tell the database what you want it to do.

SQL is not Python. It is a completely separate language designed just for databases. But it is simple, and you will only need a handful of commands to get started.

Let's learn them one by one.

### CREATE TABLE -- Make a New Table

Before you can store any data, you need to create a table. This is like labeling a new drawer in the filing cabinet.

```sql
CREATE TABLE pets (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    animal TEXT NOT NULL,
    age INTEGER NOT NULL
);
```

This creates a `pets` table with four columns. `NOT NULL` means "this field is required" -- you cannot add a pet without giving it a name, animal type, and age.

### INSERT INTO -- Add a Row

Now let's add some pets to the table:

```sql
INSERT INTO pets (name, animal, age) VALUES ('Buddy', 'dog', 3);
INSERT INTO pets (name, animal, age) VALUES ('Whiskers', 'cat', 5);
INSERT INTO pets (name, animal, age) VALUES ('Goldie', 'fish', 1);
```

Each `INSERT INTO` adds one row. You list the columns you are filling in, then the values for each one. The `id` fills in automatically because it is the primary key.

### SELECT -- Find Data

This is the command you will use the most. `SELECT` lets you ask the database questions.

**Get everything:**
```sql
SELECT * FROM pets;
```

The `*` means "all columns." This returns every row in the pets table.

**Get specific columns:**
```sql
SELECT name, age FROM pets;
```

This returns only the name and age of each pet, not the other columns.

**Filter with WHERE:**
```sql
SELECT * FROM pets WHERE animal = 'dog';
SELECT * FROM pets WHERE age > 3;
SELECT * FROM pets WHERE animal = 'cat' AND age < 10;
```

`WHERE` is like a filter -- it says "only give me rows where this condition is true." You can combine conditions with `AND` and `OR`.

**Sort results with ORDER BY:**
```sql
SELECT * FROM pets ORDER BY age;
```

`ORDER BY age` sorts from youngest to oldest. Adding `DESC` after the column name sorts in reverse.

### UPDATE -- Change Data

Made a mistake? Need to update a pet's age for their birthday?

```sql
UPDATE pets SET age = 4 WHERE id = 1;
```

This changes Buddy's age to 4. The `WHERE id = 1` part makes sure you only change Buddy and not every pet in the table.

**Warning:** If you forget the `WHERE`, you will update EVERY row. Always include a `WHERE` clause when you use `UPDATE`.

### DELETE -- Remove Data

```sql
DELETE FROM pets WHERE id = 3;
```

This removes Goldie (pet number 3) from the table.

**Warning:** Just like `UPDATE`, if you forget the `WHERE`, you delete EVERYTHING. Always include a `WHERE` clause when you use `DELETE`.

![A flat vector illustration in a children's educational book style showing Byte the robot at a colorful desk with a large open book showing SQL commands on one page and a table of data on the other page, with arrows connecting the commands to the table. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Foreign Keys -- Connecting Tables Together

Real applications have more than one table. A pet store might have a `pets` table and an `owners` table. The question is: how do you connect them? How do you know which owner has which pet?

The answer is a **foreign key** -- a column in one table that points to a row in another table.

```
owners table:
| id | name    | phone        |
|----|---------|--------------|
| 1  | Alice   | 555-1234     |
| 2  | Bob     | 555-5678     |

pets table:
| id | name     | animal | age | owner_id |
|----|----------|--------|-----|----------|
| 1  | Buddy    | dog    | 3   | 1        |
| 2  | Whiskers | cat    | 5   | 1        |
| 3  | Goldie   | fish   | 1   | 2        |
```

The `owner_id` column in the `pets` table is a **foreign key**. It points to the `id` in the `owners` table. Buddy's `owner_id` is 1, meaning Buddy belongs to Alice. Here is how you create a table with a foreign key:

```sql
CREATE TABLE pets (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    animal TEXT NOT NULL,
    age INTEGER NOT NULL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES owners (id)
);
```

The `FOREIGN KEY` line tells the database: "The `owner_id` column must always contain a valid `id` from the `owners` table." If you try to add a pet with `owner_id = 99` and there is no owner 99, the database will refuse.

---

## JOIN -- Connecting Related Tables in a Query

Foreign keys connect the tables in the database, but to actually **see** the connected data together, you use a `JOIN`.

### The Analogy

Imagine you have a **Students** table and a **Classes** table. A JOIN lets you ask: "Which students are in which classes?" Instead of looking back and forth between two separate lists, a JOIN combines them into one result.

### Using JOIN

```sql
SELECT pets.name, pets.animal, owners.name AS owner_name
FROM pets
JOIN owners ON pets.owner_id = owners.id;
```

Result:

```
| name     | animal | owner_name |
|----------|--------|------------|
| Buddy    | dog    | Alice      |
| Whiskers | cat    | Alice      |
| Goldie   | fish   | Bob        |
```

The `JOIN` connects the two tables using `pets.owner_id = owners.id`. The `AS owner_name` gives the column a clear name so you do not end up with two columns both called `name`. You can add `WHERE` to filter the joined results, just like with a regular query.

---

## Using SQLite with Python

**SQLite** is a database that stores everything in a single file on your computer. There is no separate server to install or run. Python has SQLite support built in -- you do not need to install anything.

SQLite is perfect for learning and for small projects. Bigger projects might use PostgreSQL or MySQL, but the SQL language is the same.

### Connecting and Creating a Table

```python
import sqlite3

connection = sqlite3.connect("petstore.db")   # Opens or creates the file
cursor = connection.cursor()                    # Tool for sending SQL commands

cursor.execute("""
    CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        animal TEXT NOT NULL,
        age INTEGER NOT NULL
    )
""")

connection.commit()   # Save changes to disk
print("Table created!")
```

- `sqlite3.connect("petstore.db")` opens (or creates) the database file
- `AUTOINCREMENT` means the `id` fills in automatically (1, 2, 3, ...)
- `IF NOT EXISTS` prevents errors if you run the code multiple times
- `connection.commit()` writes the changes to disk so they are saved

### Adding Data

```python
import sqlite3

connection = sqlite3.connect("petstore.db")
cursor = connection.cursor()

cursor.execute("INSERT INTO pets (name, animal, age) VALUES (?, ?, ?)", ("Buddy", "dog", 3))
cursor.execute("INSERT INTO pets (name, animal, age) VALUES (?, ?, ?)", ("Whiskers", "cat", 5))
cursor.execute("INSERT INTO pets (name, animal, age) VALUES (?, ?, ?)", ("Goldie", "fish", 1))

connection.commit()
```

Notice the `?` marks. Those are **placeholders**. You put `?` where the values go, and then pass the actual values as a separate tuple. This is extremely important, and we will explain why in the SQL injection section below.

### Reading Data

```python
import sqlite3

connection = sqlite3.connect("petstore.db")
cursor = connection.cursor()

# Get all pets
cursor.execute("SELECT * FROM pets")
all_pets = cursor.fetchall()
for pet in all_pets:
    print(pet)
# Output: (1, 'Buddy', 'dog', 3)  (2, 'Whiskers', 'cat', 5)  (3, 'Goldie', 'fish', 1)

# Get only dogs
cursor.execute("SELECT * FROM pets WHERE animal = ?", ("dog",))
dogs = cursor.fetchall()
```

`fetchall()` returns every matching row as a list of tuples. `fetchone()` returns just the first matching row.

### Updating and Deleting Data

```python
import sqlite3

connection = sqlite3.connect("petstore.db")
cursor = connection.cursor()

cursor.execute("UPDATE pets SET age = ? WHERE id = ?", (4, 1))    # Update Buddy's age
cursor.execute("DELETE FROM pets WHERE id = ?", (3,))              # Delete Goldie

connection.commit()
```

### Always Close the Connection

The best way to handle the connection is with a `with` statement, which closes it automatically -- just like the `with open(...)` pattern from [[wiki:python-jr-file-io]]:

```python
import sqlite3

with sqlite3.connect("petstore.db") as connection:
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM pets")
    for pet in cursor.fetchall():
        print(pet)
# Connection is automatically closed here
```

![A flat vector illustration in a children's educational book style showing Byte the robot happily connecting a colorful cord between a laptop and a small glowing file icon labeled as a database, with data flowing through the cord. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## ORMs -- Using Python Classes Instead of SQL

As your project grows, writing SQL by hand can get repetitive. An **ORM** (Object-Relational Mapper) lets you use Python classes and objects instead. Each table becomes a class, each row becomes an object.

Instead of `INSERT INTO pets (name, animal, age) VALUES ('Buddy', 'dog', 3)`, you write:

```python
new_pet = Pet(name="Buddy", animal="dog", age=3)
session.add(new_pet)
session.commit()
```

The ORM translates your Python into SQL behind the scenes. Popular Python ORMs include **SQLAlchemy** and **SQLModel** (which works great with FastAPI). Here is a quick example with SQLModel:

```python
from sqlmodel import SQLModel, Field, create_engine, Session, select

class Pet(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    animal: str
    age: int

engine = create_engine("sqlite:///petstore.db")
SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    buddy = Pet(name="Buddy", animal="dog", age=3)
    session.add(buddy)
    session.commit()
```

You do not need to use an ORM right away. Writing raw SQL teaches you how databases really work, and that knowledge is valuable even when you switch to an ORM later. Think of it like learning to do math by hand before using a calculator.

---

## SQL Injection -- A Dangerous Mistake to Avoid

This is one of the most important security lessons in all of programming. Pay close attention.

### The Problem

Imagine you have a search feature where users type a pet's name, and you look it up in the database. Here is the **wrong** way to do it:

```python
# DANGEROUS -- never do this!
user_input = input("Enter pet name: ")
cursor.execute("SELECT * FROM pets WHERE name = '" + user_input + "'")
```

If the user types `Buddy`, the SQL becomes `SELECT * FROM pets WHERE name = 'Buddy'` -- that works fine. But what if someone types `' OR '1'='1` instead? The SQL becomes:

```sql
SELECT * FROM pets WHERE name = '' OR '1'='1'
```

Since `'1'='1'` is always true, this returns **every row in the table**. Even worse, someone could type `'; DROP TABLE pets; --` which **deletes your entire table**. All your data, gone, because you put user input directly into SQL.

### The Restaurant Analogy

It is like someone slipping extra instructions into your order at a restaurant. You write on the order slip: "One pizza." But the customer erases part of it and writes: "One pizza. Also, give me everything in the cash register." If the kitchen follows whatever is written on the slip without checking, they will give away all the money.

### The Solution: Always Use Parameters

**Never** put user input directly into a SQL string. Always use `?` placeholders:

```python
# SAFE -- always do it this way!
user_input = input("Enter pet name: ")
cursor.execute("SELECT * FROM pets WHERE name = ?", (user_input,))
```

When you use `?`, the database treats the user's input as **data only**, never as SQL commands. Even if someone types `'; DROP TABLE pets; --`, the database just looks for a pet with that exact (silly) name and finds nothing.

This is the single most important rule: **never build SQL strings by concatenating user input. Always use parameters.**

---

## Putting It All Together -- Pet Store API with a Real Database

Here is the key change to make the Pet Store API from the previous lesson use a real database. Instead of a Python dictionary, you use SQLite:

```python
import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect("petstore.db")
    connection.row_factory = sqlite3.Row
    return connection

def create_tables() -> None:
    connection = get_connection()
    connection.execute("""
        CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            animal TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    """)
    connection.commit()
    connection.close()

create_tables()

class PetCreate(BaseModel):
    name: str
    animal: str
    age: int

app: FastAPI = FastAPI()

@app.get("/pets")
def list_pets() -> dict:
    connection = get_connection()
    pets = connection.execute("SELECT * FROM pets").fetchall()
    connection.close()
    return {"pets": [dict(pet) for pet in pets]}

@app.post("/pets", status_code=201)
def create_pet(pet: PetCreate) -> dict:
    connection = get_connection()
    cursor = connection.execute(
        "INSERT INTO pets (name, animal, age) VALUES (?, ?, ?)",
        (pet.name, pet.animal, pet.age)
    )
    connection.commit()
    new_id: int = cursor.lastrowid
    new_pet = connection.execute(
        "SELECT * FROM pets WHERE id = ?", (new_id,)
    ).fetchone()
    connection.close()
    return dict(new_pet)

@app.get("/pets/{pet_id}")
def get_pet(pet_id: int) -> dict:
    connection = get_connection()
    pet = connection.execute(
        "SELECT * FROM pets WHERE id = ?", (pet_id,)
    ).fetchone()
    connection.close()
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return dict(pet)
```

The PUT and DELETE routes follow the same pattern: open a connection, run a parameterized SQL query, commit, close, and return the result.

Now you can stop and restart the server, and all your pets will still be there. The data lives in the `petstore.db` file on your computer, safe and sound.

![A flat vector illustration in a children's educational book style showing Byte the robot celebrating next to a glowing laptop screen showing a pet store application, with a small database file icon connected to it by a colorful line, and pet data cards floating around. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Quick Summary

| Concept           | What it means                                                     |
|-------------------|-------------------------------------------------------------------|
| Database          | Organized storage for data that survives restarts                 |
| Table             | A collection of related data (like a spreadsheet)                 |
| Row               | One item in a table                                               |
| Column            | One piece of information about every item                         |
| Primary key       | A unique identifier for each row                                  |
| Foreign key       | A column that points to a row in another table                    |
| SQL               | The language for talking to databases                             |
| SELECT            | Find data                                                         |
| INSERT INTO       | Add a new row                                                     |
| UPDATE            | Change existing data                                              |
| DELETE            | Remove data                                                       |
| JOIN              | Combine data from two related tables                              |
| SQLite            | A database stored in a single file, built into Python             |
| ORM               | A tool that lets you use Python classes instead of SQL             |
| SQL injection     | A security attack where user input gets treated as SQL commands   |
| Parameters (`?`)  | The safe way to include user input in SQL queries                 |

---

## Practice Questions

Try to answer these on your own before checking the answers at the bottom of the page.

**Question 1:** Why does your API lose all its data when you restart the server if you store everything in a Python dictionary? How does a database solve this problem?

**Question 2:** Write a SQL `CREATE TABLE` statement for a `books` table with these columns: `id` (primary key), `title` (text, required), `author` (text, required), `pages` (whole number, required), and `rating` (decimal number).

**Question 3:** Write SQL statements to: (a) add a book called "Python Adventures" by "Byte Robot" with 200 pages and a rating of 4.5, and (b) find all books by "Byte Robot."

**Question 4:** What is the difference between a primary key and a foreign key? Give an example of each.

**Question 5:** Look at this code. What is wrong with it, and how would you fix it?

```python
name = input("Enter pet name: ")
cursor.execute("SELECT * FROM pets WHERE name = '" + name + "'")
```

**Question 6:** What does a `JOIN` do? If you have a `students` table and a `classes` table connected by a foreign key, write a SQL query that shows each student's name alongside their class name.

**Question 7:** Write Python code using `sqlite3` that connects to a database called `school.db`, creates a `students` table with columns `id`, `name`, and `grade`, and adds one student named "Alice" in grade 5.

**Question 8:** What is an ORM, and what advantage does it have over writing raw SQL?

---

## Answers to Practice Questions

**Answer 1:** A Python dictionary lives in your computer's memory (RAM). When the program stops, RAM is cleared and the data is gone. A database writes data to disk (your hard drive), which keeps information even when the computer turns off. The database file stays on your computer and can be read again the next time you start the program.

**Answer 2:**

```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    pages INTEGER NOT NULL,
    rating REAL NOT NULL
);
```

`REAL` is the SQLite type for decimal numbers (like Python's `float`).

**Answer 3:**

(a) Adding a book:
```sql
INSERT INTO books (title, author, pages, rating)
VALUES ('Python Adventures', 'Byte Robot', 200, 4.5);
```

(b) Finding all books by Byte Robot:
```sql
SELECT * FROM books WHERE author = 'Byte Robot';
```

**Answer 4:** A **primary key** is a unique identifier for each row in a table. No two rows can have the same primary key. Example: the `id` column in a `pets` table (every pet has a unique number). A **foreign key** is a column that points to a primary key in another table, connecting the two tables. Example: an `owner_id` column in the `pets` table that points to the `id` in the `owners` table, telling you which owner each pet belongs to.

**Answer 5:** This code is vulnerable to **SQL injection**. The user's input is being placed directly into the SQL string, so a malicious user could type something like `' OR '1'='1` and see every row in the table, or even delete data. The fix is to use parameter placeholders:

```python
name = input("Enter pet name: ")
cursor.execute("SELECT * FROM pets WHERE name = ?", (name,))
```

Now the database treats the user's input as data, never as SQL commands.

**Answer 6:** A `JOIN` combines data from two tables that are connected by a foreign key, so you can see related information together in one result. Here is the query:

```sql
SELECT students.name, classes.name AS class_name
FROM students
JOIN classes ON students.class_id = classes.id;
```

This shows each student's name alongside the name of their class by matching the `class_id` in the `students` table to the `id` in the `classes` table.

**Answer 7:**

```python
import sqlite3

with sqlite3.connect("school.db") as connection:
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            grade INTEGER NOT NULL
        )
    """)

    cursor.execute(
        "INSERT INTO students (name, grade) VALUES (?, ?)",
        ("Alice", 5)
    )

    connection.commit()
    print("Student added!")
```

**Answer 8:** An ORM (Object-Relational Mapper) is a tool that lets you use Python classes and objects instead of writing SQL by hand. Each table becomes a Python class, and each row becomes an object. The advantage is that you write Python code instead of SQL, which can be easier to read, less repetitive, and less prone to mistakes like SQL injection. The ORM translates your Python code into the correct SQL behind the scenes.

---

**Previous:** [[wiki:python-jr-backend-apis]] | **Next:** [[wiki:python-jr-backend-auth]]
