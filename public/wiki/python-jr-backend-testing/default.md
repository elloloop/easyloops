# Testing -- How Do You KNOW Your Code Works?

You have written an API. It has endpoints, a database, and authentication. You ran it a few times, clicked around, and everything seemed fine. Ship it!

...But does it actually work? What about the thing you did not try? What about that one weird edge case? What happens when someone sends an empty string, or a number where you expected a name, or a password that is a million characters long?

**Testing** is how you stop guessing and start **knowing** that your code works. It is code that checks your code. You write it once, and you can run it a thousand times. If something breaks, the tests catch it immediately.

![A flat vector illustration in a children's educational book style showing Byte the robot wearing safety goggles and a lab coat, standing in front of a colorful testing station with green checkmark lights and one red X light on a control panel. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Why Testing Matters

Here is an analogy: a pilot does not just **build** a plane and fly it. Before anyone gets on board, every single part is tested. The engines are tested. The landing gear is tested. The navigation system is tested. Then the whole plane is tested together in a test flight.

Software works the same way. You would not want to ride in a plane where the builder said "I think the engines work, but I have not really checked." You should not ship an app where the developer says "I think it works, but I have not really tested it."

Here is what testing gives you:

**1. Confidence.** Instead of "I think it works," you can say "It passes 50 tests. I know it works."

**2. Catching bugs early.** A bug found now takes a few minutes to fix. A bug found after your app is live takes hours and makes users unhappy.

**3. Safety when changing things.** A month from now, you want to rewrite a function to make it faster. How do you know you did not break it? Run the tests. If they all pass, you are safe.

**4. Documentation.** Tests show exactly how your code is supposed to behave. Someone reading your tests can understand what each function does without reading the actual code.

---

## Types of Tests

Not all tests are the same. Think of building something with LEGO bricks.

### Unit Tests -- Testing One Brick

A **unit test** checks one small piece of your code in isolation. Usually one function.

It is like picking up a single LEGO brick and checking: is it the right shape? Is it the right color? Does it snap together properly? You are not building anything yet -- you are just making sure this one brick is good.

```python
def add_tax(price: float, tax_rate: float) -> float:
    """Calculate the total price including tax."""
    return round(price + price * tax_rate, 2)


# Unit test -- testing just this one function
def test_add_tax_basic() -> None:
    result: float = add_tax(10.00, 0.08)
    assert result == 10.80


def test_add_tax_zero_rate() -> None:
    result: float = add_tax(25.00, 0.0)
    assert result == 25.00
```

### Integration Tests -- Testing Bricks Together

An **integration test** checks that multiple pieces work together correctly. You have tested each brick alone. Now snap a few together and make sure the wall holds up.

For example, testing that your API endpoint correctly saves data to the database and reads it back:

```python
def test_create_and_read_user() -> None:
    """Test that creating a user through the API actually saves it."""
    # Create a user
    response = client.post("/users", json={"name": "Alice", "email": "alice@test.com"})
    assert response.status_code == 201

    # Read the user back
    user_id: int = response.json()["id"]
    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Alice"
```

### End-to-End Tests -- Testing the Whole Castle

An **end-to-end test** (E2E) checks the entire system from start to finish, just like a real user would use it. You have tested the bricks, you have tested the walls. Now test the complete LEGO castle: does the drawbridge open? Do the towers stand? Does the whole thing stay together?

```python
def test_full_signup_and_login_flow() -> None:
    """Test the complete flow: register, login, access protected page."""
    # Register a new account
    client.post("/register", json={"username": "alice", "password": "secret123"})

    # Log in
    login_response = client.post(
        "/login", json={"username": "alice", "password": "secret123"}
    )
    token: str = login_response.json()["access_token"]

    # Access a protected page using the token
    profile_response = client.get(
        "/my-profile", headers={"Authorization": f"Bearer {token}"}
    )
    assert profile_response.json()["username"] == "alice"
```

---

## The Testing Pyramid

How many of each type of test should you write? Picture a pyramid:

```
        /\
       /  \        Few end-to-end tests (slow, but very realistic)
      /    \
     /------\
    /        \     Some integration tests (medium speed)
   /          \
  /------------\
 /              \   LOTS of unit tests (fast and focused)
/________________\
```

The bottom of the pyramid is the biggest. That means **most of your tests should be unit tests.** They are fast (they run in milliseconds), they are focused (they test one thing), and when they fail, they tell you exactly what broke.

Integration tests go in the middle. You need some, but not as many.

End-to-end tests go at the top. You need only a few, because they are slow and harder to set up.

If your tests take 30 minutes to run because they are ALL end-to-end tests, something is wrong. Most of your tests should run in seconds.

![A flat vector illustration in a children's educational book style showing Byte the robot building a pyramid out of colorful blocks, with many small green blocks at the bottom, medium yellow blocks in the middle, and a few large red blocks at the top. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## pytest -- Python's Testing Tool

Python has a tool called **pytest** that makes writing and running tests easy. It is the most popular testing tool in the Python world.

```bash
pip install pytest
```

### Writing Your First Test

Create a file called `test_math_helpers.py`. The name is important -- pytest automatically finds files that start with `test_`.

```python
# test_math_helpers.py

def double(n: int) -> int:
    """Return the number multiplied by 2."""
    return n * 2


def is_even(n: int) -> bool:
    """Check if a number is even."""
    return n % 2 == 0


# --- Tests ---

def test_double_positive() -> None:
    assert double(5) == 10


def test_double_zero() -> None:
    assert double(0) == 0


def test_double_negative() -> None:
    assert double(-3) == -6


def test_is_even_true() -> None:
    assert is_even(4) == True


def test_is_even_false() -> None:
    assert is_even(7) == False


def test_is_even_zero() -> None:
    assert is_even(0) == True
```

Test functions also start with `test_`. Each one checks one specific thing.

### The `assert` Statement

The word `assert` means **"this MUST be true, or something is wrong."**

```python
assert double(5) == 10  # "I assert that double(5) equals 10"
```

If it is true, the test passes. If it is false, the test fails and pytest tells you exactly what happened.

### Running Tests

Open your terminal and type:

```bash
pytest test_math_helpers.py
```

Output:

```
test_math_helpers.py ......                          [100%]
6 passed in 0.01s
```

Six dots. Six passes. Each dot is one test that passed. If a test fails, you see an `F` instead of a dot, and pytest shows you what went wrong:

```
FAILED test_math_helpers.py::test_double_positive
    assert 11 == 10
```

Here are more ways to run tests:

```bash
# Run all test files in the current folder
pytest

# Show the name of each test (verbose mode)
pytest -v

# Run only tests with "even" in the name
pytest -k "even"

# Stop as soon as one test fails
pytest -x
```

---

## Test Structure: Arrange, Act, Assert

Every good test follows a simple three-step pattern:

1. **Arrange** -- Set things up. Create the data you need.
2. **Act** -- Do the thing you are testing.
3. **Assert** -- Check that it worked correctly.

```python
def test_add_item_to_cart() -> None:
    # ARRANGE -- set up a shopping cart
    cart: list[str] = []

    # ACT -- add an item
    cart.append("Apple")

    # ASSERT -- check that it worked
    assert len(cart) == 1
    assert cart[0] == "Apple"
```

This pattern makes tests easy to read. Anyone looking at the test can immediately see: what was set up, what was done, and what should have happened.

---

## Fixtures -- Reusable Setup

Sometimes many tests need the same setup. Instead of repeating it in every test, you create a **fixture** -- a helper that prepares things for you.

Think of it like a kitchen that is already set up before you start cooking. The oven is preheated, the bowls are out, and the ingredients are measured. You just walk in and start cooking.

```python
import pytest


class TodoList:
    def __init__(self) -> None:
        self.items: list[str] = []

    def add(self, item: str) -> None:
        self.items.append(item)

    def count(self) -> int:
        return len(self.items)

    def clear(self) -> None:
        self.items = []


@pytest.fixture
def empty_list() -> TodoList:
    """A fresh, empty todo list for each test."""
    return TodoList()


@pytest.fixture
def full_list() -> TodoList:
    """A todo list with some items already in it."""
    todo: TodoList = TodoList()
    todo.add("Buy groceries")
    todo.add("Walk the dog")
    todo.add("Do homework")
    return todo


def test_empty_list_count(empty_list: TodoList) -> None:
    assert empty_list.count() == 0


def test_add_item(empty_list: TodoList) -> None:
    empty_list.add("Read a book")
    assert empty_list.count() == 1


def test_full_list_count(full_list: TodoList) -> None:
    assert full_list.count() == 3


def test_clear_list(full_list: TodoList) -> None:
    full_list.clear()
    assert full_list.count() == 0
```

Each test that uses a fixture gets a **fresh copy**. The `full_list` in one test is completely separate from the `full_list` in another test. They do not interfere with each other.

---

## Mocking -- Pretending Something Exists

Sometimes your code depends on things that are hard to use in a test. Maybe it calls a weather website, sends an email, or charges a credit card. You do NOT want your tests to actually do those things every time you run them.

**Mocking** means replacing a real thing with a fake thing that you control. It is like a **flight simulator**. You want to test a pilot's skills, but you do not want to put them in a real airplane for every test. The simulator pretends to be a real plane, and you control what happens.

```python
from unittest.mock import patch


def get_weather(city: str) -> str:
    """This function calls a real weather website (we do not want to do this in tests)."""
    import requests
    response = requests.get(f"https://api.weather.com/{city}")
    return response.json()["temperature"]


def weather_report(city: str) -> str:
    """Create a weather report for a city."""
    temp: str = get_weather(city)
    return f"The temperature in {city} is {temp}."


# Test using a mock -- no real internet call happens!
def test_weather_report() -> None:
    with patch("__main__.get_weather") as fake_weather:
        fake_weather.return_value = "72F"

        result: str = weather_report("Springfield")

        assert result == "The temperature in Springfield is 72F."
        fake_weather.assert_called_once_with("Springfield")
```

In this test, `get_weather` is replaced by a fake version that always returns "72F". The test runs instantly, works without the internet, and always gives the same result.

**When to mock:** External websites and APIs, databases (in unit tests), and things that are slow (sending emails, uploading files).

**When NOT to mock:** The actual function you are testing (if you mock it, you are testing the mock, not your code!) and simple math or string operations. Too much mocking makes tests useless. If you mock everything, your tests only prove that your fakes are set up correctly -- not that your real code works.

---

## Testing Your API with TestClient

FastAPI comes with a special tool called `TestClient` that lets you send pretend HTTP requests to your app without starting a real server.

```python
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel


# --- The App ---

app: FastAPI = FastAPI()
items: dict[int, dict] = {}
next_id: int = 1


class ItemCreate(BaseModel):
    name: str
    price: float


@app.post("/items", status_code=201)
def create_item(item: ItemCreate) -> dict:
    global next_id
    new_item: dict = {"id": next_id, "name": item.name, "price": item.price}
    items[next_id] = new_item
    next_id += 1
    return new_item


@app.get("/items/{item_id}")
def get_item(item_id: int) -> dict:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]


# --- The Tests ---

client: TestClient = TestClient(app)


def test_create_item() -> None:
    response = client.post("/items", json={"name": "Notebook", "price": 3.99})
    assert response.status_code == 201

    data: dict = response.json()
    assert data["name"] == "Notebook"
    assert data["price"] == 3.99
    assert "id" in data


def test_get_item_that_does_not_exist() -> None:
    response = client.get("/items/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"


def test_create_item_missing_price() -> None:
    response = client.post("/items", json={"name": "Pencil"})
    assert response.status_code == 422  # validation error
```

No server running. No network. The `TestClient` pretends to be a browser sending requests directly to your app. Tests run in milliseconds.

![A flat vector illustration in a children's educational book style showing Byte the robot sitting inside a flight simulator cockpit with colorful buttons and screens, with clouds and sky painted on the windows to simulate flying. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Test-Driven Development (TDD) -- Write the Test FIRST

Here is an idea that might sound backwards at first: what if you wrote the test **before** you wrote the code?

That is called **Test-Driven Development** (TDD), and it follows a three-step cycle:

### Red, Green, Refactor

**1. Red** -- Write a test for something that does not exist yet. Run it. It fails (red).

**2. Green** -- Write just enough code to make the test pass. Run it again. It passes (green).

**3. Refactor** -- Clean up the code. Make it nicer. Run the tests to make sure everything still passes.

Then repeat.

### Example: Building a Password Checker with TDD

**Step 1: Red -- Write the tests first**

```python
def test_password_too_short() -> None:
    assert check_password("abc") == False

def test_password_no_uppercase() -> None:
    assert check_password("abcdefgh") == False

def test_password_no_number() -> None:
    assert check_password("Abcdefgh") == False

def test_valid_password() -> None:
    assert check_password("Abcdefg1") == True
```

These tests all fail because `check_password` does not exist yet. That is the "red" step.

**Step 2: Green -- Write the code**

```python
def check_password(password: str) -> bool:
    """Check if a password is strong enough."""
    if len(password) < 8:
        return False
    if not any(letter.isupper() for letter in password):
        return False
    if not any(letter.isdigit() for letter in password):
        return False
    return True
```

Run the tests again. They all pass! That is the "green" step.

**Step 3: Refactor -- Clean up**

The code looks fine already. In a bigger project, you might rename variables or split things into smaller functions. The key is that the tests keep passing after every change. TDD makes you think about **what** your code should do before you think about **how** to do it.

---

## Code Coverage -- What Percentage Is Tested?

**Code coverage** tells you what percentage of your code is actually run by your tests. It is like a report card for your test suite.

```bash
pip install pytest-cov

pytest --cov=my_app --cov-report=term-missing
```

Output:

```
Name              Stmts   Miss  Cover   Missing
------------------------------------------------
my_app/main.py       50      5    90%   42-46
my_app/auth.py       30     10    67%   15-20, 25-28
------------------------------------------------
TOTAL                 80     15    81%
```

The "Missing" column shows exactly which lines are not covered. Those are the places where bugs could be hiding, undetected.

**Aim for 80% or higher.** Getting to 100% is not always realistic, but below 50% means large parts of your code have never been tested.

---

## Quick Summary

| Concept | What It Means |
|---------|---------------|
| Unit test | Tests one small piece (one function) |
| Integration test | Tests multiple pieces working together |
| End-to-end test | Tests the whole system like a real user |
| Testing pyramid | Many unit tests, some integration, few E2E |
| pytest | Python's testing tool |
| assert | "This must be true, or something is wrong" |
| Arrange, Act, Assert | The three steps of every test |
| Fixture | Reusable setup code for tests |
| Mocking | Replacing real things with fakes you control |
| TDD | Write the test first, then write the code |
| Code coverage | What percentage of your code is tested |

---

## Practice Questions

Try to answer these on your own before looking at the answers at the bottom of the page.

**Question 1:** A pilot tests every part of a plane before flying it. How does that relate to testing software? Why is "I tried it and it seemed to work" not good enough?

**Question 2:** What is the difference between a unit test, an integration test, and an end-to-end test? Use the LEGO analogy to explain each one.

**Question 3:** What does `assert` do? What happens if the expression after `assert` is True? What happens if it is False?

**Question 4:** Explain the Arrange, Act, Assert pattern. Write a test for a function called `reverse_string` that takes a string and returns it backwards. Label each section of your test.

**Question 5:** What is a fixture and why is it useful? What would happen if you did NOT use fixtures and instead copied the same setup code into every test?

**Question 6:** What is mocking? Use the flight simulator analogy to explain why you would mock something in a test. Give an example of something you SHOULD mock and something you should NOT mock.

**Question 7:** What does TDD stand for? What are the three steps (by color)? Why might writing the test FIRST be helpful?

**Question 8:** Look at this test. What is wrong with it?

```python
def test_add() -> None:
    assert 2 + 3 == 5
    assert 10 + 20 == 30
    assert -1 + 1 == 0
    assert 0 + 0 == 0
    assert 100 + 200 == 300
```

---

## Answers to Practice Questions

**Answer 1:** A pilot tests each part of a plane individually, then tests parts together, then does a full test flight. Software developers should do the same: test each function by itself (unit tests), test functions working together (integration tests), and test the whole system (end-to-end tests). "I tried it and it seemed to work" is not good enough because you probably only tried one or two cases. Tests check dozens or hundreds of cases automatically, including edge cases you might not think of. They also run every time you change your code, catching new bugs instantly.

**Answer 2:** A **unit test** is like testing one LEGO brick -- you check that a single small piece works correctly on its own. An **integration test** is like testing a wall made of LEGO bricks -- you check that the bricks snap together properly and the wall is sturdy. An **end-to-end test** is like testing the complete LEGO castle -- you check that the drawbridge opens, the towers stand, and the whole thing works together as expected.

**Answer 3:** `assert` checks if something is true. If the expression after `assert` is True, nothing happens and the test passes quietly. If the expression is False, the test immediately fails and pytest shows you what the actual value was versus what you expected.

**Answer 4:**
```python
def test_reverse_string() -> None:
    # ARRANGE -- set up the input
    original: str = "hello"

    # ACT -- do the thing we are testing
    result: str = reverse_string(original)

    # ASSERT -- check that it worked
    assert result == "olleh"
```
Arrange sets things up, Act does the thing you are testing, and Assert checks that the result is correct.

**Answer 5:** A fixture is a reusable piece of setup code that prepares things your tests need (like creating a fresh object or filling a list with test data). It is useful because many tests need the same setup. Without fixtures, you would copy the same setup code into every single test. If you ever needed to change the setup, you would have to change it in every test. Fixtures let you write it once and share it.

**Answer 6:** Mocking means replacing a real thing with a fake version you control. Just like a flight simulator lets you test a pilot's skills without using a real airplane, mocking lets you test your code without calling real external services. You SHOULD mock things like external websites (weather APIs, email services) because you do not want your tests to depend on the internet. You should NOT mock the actual function you are testing, because then you are testing the fake, not your real code.

**Answer 7:** TDD stands for Test-Driven Development. The three steps are: **Red** (write a test that fails because the code does not exist yet), **Green** (write just enough code to make the test pass), and **Refactor** (clean up the code while keeping the tests passing). Writing the test first is helpful because it forces you to think clearly about what your code should do before you start writing it. The test becomes a clear specification.

**Answer 8:** The test is not testing any function from the codebase! It is just testing Python's built-in `+` operator, which has already been tested by the people who built Python. A good test should test YOUR code -- a function that you wrote. Also, a test should ideally check one specific behavior, not five unrelated things. It would be better to have separate tests like `test_add_positive_numbers`, `test_add_negative_numbers`, etc., each testing a specific function you built.

---

**Previous:** [[wiki:python-jr-backend-auth]] | **Next:** [[wiki:python-jr-backend-deployment]]
