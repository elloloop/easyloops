# Testing -- Proving Your Code Works

You have written code that works. At least, you think it works. You ran it a few times and the output looked right. But how do you know it works for every input? What happens when you change something next month -- did you break anything?

Testing gives you confidence. It is code that checks your code. You write a test once, and it verifies that your code works correctly every time you run it. If you break something, the test fails immediately and tells you exactly what went wrong.

---

## Why Test?

**1. Confidence.** "Does my code work?" becomes "My code passes 200 tests. Yes, it works."

**2. Catching bugs early.** A bug caught during development takes minutes to fix. A bug caught in production takes hours and angry users.

**3. Documentation.** Tests show exactly how your code is supposed to behave. New developers can read the tests to understand what each function does.

**4. Refactoring safety.** You want to rewrite a function to make it faster. How do you know you did not break it? Run the tests. If they still pass, you are safe.

---

## Types of Tests

### Unit Tests

Test a single function or method in isolation. The smallest, fastest tests.

```python
# The function
def calculate_total(prices: list[float], tax_rate: float) -> float:
    """Calculate the total price including tax."""
    subtotal: float = sum(prices)
    tax: float = subtotal * tax_rate
    return round(subtotal + tax, 2)


# The unit test
def test_calculate_total() -> None:
    result: float = calculate_total([10.00, 20.00, 5.00], 0.08)
    assert result == 37.80
```

### Integration Tests

Test multiple components working together. For example, testing that your API endpoint correctly talks to the database.

```python
def test_create_and_retrieve_user() -> None:
    """Test that creating a user and then reading it back works."""
    # Create a user through the API
    create_response = client.post("/users", json={"name": "Alice", "email": "alice@test.com"})
    assert create_response.status_code == 201

    # Read it back
    user_id: int = create_response.json()["id"]
    get_response = client.get(f"/users/{user_id}")
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Alice"
```

### End-to-End (E2E) Tests

Test the entire system from the user's perspective. The slowest tests, but the most realistic.

```python
def test_user_signup_and_login_flow() -> None:
    """Test the full signup -> login -> access profile flow."""
    # Register
    client.post("/register", json={"username": "alice", "password": "secret123"})

    # Login
    login_response = client.post("/login", json={"username": "alice", "password": "secret123"})
    token: str = login_response.json()["access_token"]

    # Access protected route
    profile_response = client.get("/profile", headers={"Authorization": f"Bearer {token}"})
    assert profile_response.json()["username"] == "alice"
```

---

## The Testing Pyramid

```
        /\
       /  \        Few E2E tests (slow, expensive, realistic)
      /    \
     /------\
    /        \     Some integration tests (medium speed)
   /          \
  /------------\
 /              \   Many unit tests (fast, cheap, focused)
/________________\
```

Write many unit tests. They are fast and tell you exactly which function broke. Write some integration tests to verify components work together. Write few E2E tests for critical user flows.

If your test suite takes 30 minutes because it is all E2E tests, something is wrong. Most of your tests should be unit tests that run in seconds.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain the difference between unit tests, integration tests, and end-to-end tests. Give a concrete example of each for an e-commerce application with a shopping cart. Why should you have more unit tests than E2E tests?"</div>
</div>

---

## pytest -- The Testing Framework

pytest is the standard testing framework for Python. It is simple, powerful, and the one you will see in most Python projects.

```bash
pip install pytest
```

### Your First Test

Create a file called `test_math.py`. pytest discovers test files that start with `test_` automatically.

```python
# test_math.py

def add(a: int, b: int) -> int:
    return a + b


def multiply(a: int, b: int) -> int:
    return a * b


def test_add_positive_numbers() -> None:
    assert add(2, 3) == 5


def test_add_negative_numbers() -> None:
    assert add(-1, -1) == -2


def test_add_zero() -> None:
    assert add(0, 0) == 0


def test_multiply_basic() -> None:
    assert multiply(3, 4) == 12


def test_multiply_by_zero() -> None:
    assert multiply(5, 0) == 0


def test_multiply_negative() -> None:
    assert multiply(-2, 3) == -6
```

Run the tests:

```bash
pytest test_math.py
```

Output:

```
test_math.py ......                                  [100%]
6 passed in 0.01s
```

Six dots. Six passes. If a test fails, pytest tells you exactly which one and why:

```
test_math.py .....F                                  [100%]
FAILED test_math.py::test_multiply_negative - assert -6 == 6
```

### Running Tests

```bash
# Run all tests in the current directory
pytest

# Run with verbose output (shows each test name)
pytest -v

# Run a specific file
pytest test_math.py

# Run a specific test function
pytest test_math.py::test_add_positive_numbers

# Run tests matching a keyword
pytest -k "multiply"

# Stop on first failure
pytest -x
```

---

## Writing Good Assertions

The `assert` statement is the backbone of testing. If the expression after `assert` is True, the test passes. If it is False, the test fails.

```python
def test_string_operations() -> None:
    name: str = "Alice"

    # Equality
    assert name == "Alice"

    # Not equal
    assert name != "Bob"

    # Truthiness
    assert name  # non-empty string is truthy
    assert not ""  # empty string is falsy

    # Containment
    assert "lic" in name
    assert "xyz" not in name

    # Type checking
    assert isinstance(name, str)

    # Comparison
    assert len(name) == 5
    assert len(name) > 3


def test_list_operations() -> None:
    numbers: list[int] = [1, 2, 3, 4, 5]

    assert len(numbers) == 5
    assert 3 in numbers
    assert numbers[0] == 1
    assert numbers[-1] == 5
    assert sorted(numbers) == numbers  # already sorted
```

### Testing for Exceptions

Sometimes you want to verify that code raises an error.

```python
import pytest


def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b


def test_divide_normal() -> None:
    assert divide(10, 2) == 5.0


def test_divide_by_zero_raises_error() -> None:
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
```

The `pytest.raises` context manager catches the exception. If the exception is not raised, the test fails.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a function called validate_email that takes a string and returns True if it contains exactly one '@' symbol and at least one '.' after the '@'. Then write at least 5 test functions covering: valid email, missing @, missing dot, multiple @ symbols, and empty string. Use pytest and assert statements."</div>
</div>

---

## Test Fixtures -- Setup and Teardown

Many tests need the same setup. Instead of repeating it in every test, use **fixtures**.

```python
import pytest


class ShoppingCart:
    def __init__(self) -> None:
        self.items: list[dict[str, str | float]] = []

    def add_item(self, name: str, price: float) -> None:
        self.items.append({"name": name, "price": price})

    def total(self) -> float:
        return sum(item["price"] for item in self.items)

    def item_count(self) -> int:
        return len(self.items)

    def clear(self) -> None:
        self.items = []


@pytest.fixture
def empty_cart() -> ShoppingCart:
    """Create a fresh, empty cart for each test."""
    return ShoppingCart()


@pytest.fixture
def cart_with_items() -> ShoppingCart:
    """Create a cart with some items already in it."""
    cart: ShoppingCart = ShoppingCart()
    cart.add_item("Apple", 1.50)
    cart.add_item("Bread", 3.00)
    cart.add_item("Milk", 2.50)
    return cart


def test_empty_cart_total(empty_cart: ShoppingCart) -> None:
    assert empty_cart.total() == 0.0


def test_empty_cart_count(empty_cart: ShoppingCart) -> None:
    assert empty_cart.item_count() == 0


def test_cart_with_items_total(cart_with_items: ShoppingCart) -> None:
    assert cart_with_items.total() == 7.00


def test_cart_with_items_count(cart_with_items: ShoppingCart) -> None:
    assert cart_with_items.item_count() == 3


def test_add_item_increases_total(empty_cart: ShoppingCart) -> None:
    empty_cart.add_item("Book", 15.00)
    assert empty_cart.total() == 15.00
    assert empty_cart.item_count() == 1


def test_clear_removes_all_items(cart_with_items: ShoppingCart) -> None:
    cart_with_items.clear()
    assert cart_with_items.total() == 0.0
    assert cart_with_items.item_count() == 0
```

Each test that has a fixture parameter gets a fresh instance. Tests are isolated from each other. The cart in one test does not affect the cart in another test.

---

## Mocking -- Replacing Real Things with Fake Things

Sometimes your code depends on external services: an API, a database, the file system, the current time. You do not want your tests to hit the real API or depend on the real clock.

**Mocking** replaces a real thing with a fake thing that you control.

```python
from unittest.mock import patch, MagicMock


# The real code
def get_weather(city: str) -> str:
    """Calls an external weather API (we don't want to do this in tests)."""
    import requests
    response: requests.Response = requests.get(
        f"https://api.weather.com/{city}"
    )
    data: dict[str, str] = response.json()
    return data["temperature"]


def format_weather_report(city: str) -> str:
    """Create a human-readable weather report."""
    temp: str = get_weather(city)
    return f"The temperature in {city} is {temp}."


# The test -- mock the external API call
def test_format_weather_report() -> None:
    with patch("__main__.get_weather") as mock_weather:
        mock_weather.return_value = "72F"

        result: str = format_weather_report("New York")

        assert result == "The temperature in New York is 72F."
        mock_weather.assert_called_once_with("New York")
```

The test never calls the real weather API. It replaces `get_weather` with a mock that returns "72F" every time. This makes the test fast, reliable, and independent of the internet.

### When to Mock

- External APIs (weather, payment, email)
- Database calls (in unit tests, not integration tests)
- File system operations
- The current time (when testing time-dependent logic)

### When NOT to Mock

- The actual logic you are testing
- Simple utility functions
- When you can use a real test database instead

Too much mocking makes tests brittle and meaningless. If you mock everything, your tests prove that your mocks work, not that your code works.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have a function send_welcome_email(user_email: str) -> bool that calls an external email service. Write a test for a register_user function that calls send_welcome_email after creating a user. Use mocking so the test does not actually send an email. Verify that send_welcome_email was called with the correct email address."</div>
</div>

---

## Testing APIs -- Using TestClient

FastAPI provides a `TestClient` that lets you test your API endpoints without running a real server.

```python
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel


# --- The App ---

app: FastAPI = FastAPI()

items: dict[int, dict[str, str | int]] = {}
next_id: int = 1


class ItemCreate(BaseModel):
    name: str
    price: float


@app.post("/items", status_code=201)
def create_item(item: ItemCreate) -> dict[str, str | int | float]:
    global next_id
    new_item: dict[str, str | int | float] = {
        "id": next_id,
        "name": item.name,
        "price": item.price
    }
    items[next_id] = new_item
    next_id += 1
    return new_item


@app.get("/items/{item_id}")
def get_item(item_id: int) -> dict[str, str | int | float]:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]


# --- The Tests ---

client: TestClient = TestClient(app)


def test_create_item() -> None:
    response = client.post("/items", json={"name": "Widget", "price": 9.99})
    assert response.status_code == 201
    data: dict[str, object] = response.json()
    assert data["name"] == "Widget"
    assert data["price"] == 9.99
    assert "id" in data


def test_get_item() -> None:
    # First create an item
    create_response = client.post(
        "/items", json={"name": "Gadget", "price": 19.99}
    )
    item_id: int = create_response.json()["id"]

    # Then retrieve it
    get_response = client.get(f"/items/{item_id}")
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Gadget"


def test_get_nonexistent_item() -> None:
    response = client.get("/items/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"


def test_create_item_missing_field() -> None:
    response = client.post("/items", json={"name": "Incomplete"})
    assert response.status_code == 422  # validation error -- missing price
```

No server running. No network calls. The `TestClient` simulates HTTP requests directly against your FastAPI app. Tests run in milliseconds.

---

## Test Coverage -- How Much Code Is Tested?

Test coverage measures what percentage of your code is executed by your tests.

```bash
pip install pytest-cov
pytest --cov=my_app --cov-report=term-missing
```

Output:

```
Name           Stmts   Miss  Cover   Missing
--------------------------------------------
my_app/main.py    50      5    90%   42-46
my_app/auth.py    30     10    67%   15-20, 25-28
--------------------------------------------
TOTAL              80     15    81%
```

The "Missing" column tells you exactly which lines are not covered by any test. Those are the lines where bugs could hide undetected.

**Aim for 80%+ coverage.** 100% is not always realistic or useful. But below 50% means large parts of your code have never been tested.

---

## TDD -- Test-Driven Development

TDD flips the process: write the test first, then write the code to make it pass.

### The Red-Green-Refactor Cycle

1. **Red**: Write a test that fails (because the code does not exist yet)
2. **Green**: Write the minimum code to make the test pass
3. **Refactor**: Clean up the code while keeping the test green

### Example: Building a Password Validator with TDD

**Step 1: Red -- Write the failing test**

```python
def test_password_too_short() -> None:
    assert validate_password("abc") == False


def test_password_no_uppercase() -> None:
    assert validate_password("abcdefgh") == False


def test_password_no_digit() -> None:
    assert validate_password("Abcdefgh") == False


def test_valid_password() -> None:
    assert validate_password("Abcdefg1") == True
```

These tests fail because `validate_password` does not exist yet.

**Step 2: Green -- Write the minimum code**

```python
def validate_password(password: str) -> bool:
    """Check if a password meets the requirements."""
    if len(password) < 8:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True
```

All tests pass.

**Step 3: Refactor -- Clean up**

The code is already clean in this case. In a real project, you might reorganize, extract helper functions, or improve naming.

TDD forces you to think about what your code should do before you think about how to do it. The tests become a specification.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Using TDD, build a function called fizzbuzz(n: int) -> str that returns 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for multiples of both, and the number as a string otherwise. Write the tests FIRST: test for 1, 3, 5, 15, and 7. Then write the code to make them pass."</div>
</div>

---

## Property-Based Testing -- A Brief Look

Regular tests check specific examples: `add(2, 3) == 5`. Property-based tests check general properties: "for any two numbers, `add(a, b)` should equal `add(b, a)`."

The **Hypothesis** library generates random test inputs automatically.

```bash
pip install hypothesis
```

```python
from hypothesis import given
from hypothesis import strategies as st


def reverse_string(s: str) -> str:
    return s[::-1]


@given(st.text())
def test_reverse_twice_returns_original(s: str) -> None:
    """Reversing a string twice should give back the original."""
    assert reverse_string(reverse_string(s)) == s


@given(st.text())
def test_reverse_preserves_length(s: str) -> None:
    """Reversing should not change the length."""
    assert len(reverse_string(s)) == len(s)


@given(st.integers(), st.integers())
def test_addition_is_commutative(a: int, b: int) -> None:
    """a + b should equal b + a."""
    assert a + b == b + a
```

Hypothesis generates hundreds of random inputs and checks the property holds for all of them. It is great at finding edge cases you would never think of.

---

## CI/CD -- Running Tests Automatically

CI (Continuous Integration) means running your tests automatically every time someone pushes code. If the tests fail, the push is blocked.

Here is a basic GitHub Actions workflow:

```yaml
# .github/workflows/tests.yml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
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
      - run: pytest --cov=my_app -v
```

Every push to `main` and every pull request triggers the test suite. If any test fails, the CI pipeline fails, and the team knows immediately.

---

## Where People Go Wrong

**Not testing edge cases.** Your test uses `add(2, 3)` and calls it a day. What about `add(0, 0)`, `add(-1, 1)`, `add(999999999, 1)`? Edge cases are where bugs hide.

**Testing implementation instead of behavior.** Bad: "assert the function calls `sorted()` internally." Good: "assert the output is sorted." Test what the function does, not how it does it. This way you can refactor the internals without breaking tests.

**Too many mocks.** If every test mocks five things, your tests are not testing real behavior. They are testing that your mocks are set up correctly. Mock sparingly.

**No tests at all.** "I will add tests later." Later never comes. Write tests as you write code. TDD is the most reliable way to make this happen.

**Slow test suites.** If your tests take 20 minutes, people stop running them. Keep unit tests fast. Use integration tests sparingly. Run E2E tests only in CI.

---

## Key Takeaways

1. Tests give you confidence that your code works and keep working.
2. The testing pyramid: many unit tests, some integration tests, few E2E tests.
3. pytest is the standard. `assert` is your main tool. Fixtures provide reusable setup.
4. Mock external dependencies, but do not mock the thing you are testing.
5. TDD (Red-Green-Refactor) forces you to think about behavior before implementation.
6. Use CI/CD to run tests automatically on every push.

---

**Previous:** [[wiki:python-backend-auth]] | **Next:** [[wiki:python-backend-deployment]]
