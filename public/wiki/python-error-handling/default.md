# Error Handling -- When Things Go Wrong

## Programs Will Crash. That's Normal.

Every program you write will eventually hit an error. A user types a letter where you expected a number. A file you try to open doesn't exist. You divide by zero. The network goes down.

This is not a sign that you're bad at programming. It's a sign that the real world is messy. **Good programmers don't write code that never fails. They write code that handles failure gracefully.**

---

## Two Kinds of Errors

### Syntax Errors -- Before Running

Python reads your code before running it. If the structure is wrong, it won't even start.

```python
# SyntaxError -- missing colon
def greet(name: str) -> None
    print(f"Hello, {name}")

# SyntaxError -- mismatched parentheses
print("Hello"
```

You fix these by reading the error message. Python tells you the line number and what it expected.

### Exceptions -- While Running

Your code is valid Python, but something goes wrong during execution.

```python
# This is valid Python, but it crashes when it runs
number: int = int("abc")   # ValueError: can't convert "abc" to int
```

These are the errors you need to **handle** in your code.

---

## Common Exceptions

Here are the ones you'll see most often. Learn to recognize them by name:

```python
# TypeError -- wrong type for an operation
result: int = "5" + 3                    # can't add string and int

# ValueError -- right type, wrong value
number: int = int("abc")                 # "abc" isn't a valid number

# KeyError -- key doesn't exist in a dictionary
data: dict[str, int] = {"age": 25}
print(data["name"])                      # "name" not in dict

# IndexError -- index out of range
items: list[str] = ["a", "b", "c"]
print(items[10])                         # only indices 0, 1, 2 exist

# FileNotFoundError -- file doesn't exist
file = open("nonexistent.txt")           # file is not there

# ZeroDivisionError -- dividing by zero
result: float = 10 / 0                   # math says no
```

Open your editor. Type each one separately. Run them. Read the error messages. Get comfortable with what they look like.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about the difference between syntax errors and exceptions, and common exception types like TypeError, ValueError, KeyError, IndexError, FileNotFoundError, and ZeroDivisionError. Give me 6 code snippets and ask me to predict which exception each one raises. Then check my answers."</div>
</div>

---

## The try/except Pattern

This is the core of error handling. You **try** something that might fail, and **except** catches the failure.

```python
user_input: str = input("Enter a number: ")

try:
    number: int = int(user_input)
    print(f"You entered: {number}")
except ValueError:
    print("That's not a valid number.")
```

What happens:
1. Python runs the code inside `try`.
2. If it works, the `except` block is skipped entirely.
3. If a `ValueError` occurs, Python jumps to the `except` block.
4. Either way, the program continues running after the try/except.

Open your editor. Type this. Run it. Enter a valid number, then run it again and enter "abc".

```python
def get_number_from_user() -> int:
    """Keep asking until the user enters a valid number."""
    while True:
        user_input: str = input("Enter a whole number: ")
        try:
            number: int = int(user_input)
            return number
        except ValueError:
            print("That's not a whole number. Try again.")

result: int = get_number_from_user()
print(f"Got: {result}")
```

---

## Catching Specific Exceptions

**Never use bare except.** Always name the exception you expect.

```python
# BAD -- catches EVERYTHING, even bugs you should know about
try:
    result = do_something()
except:
    print("Something went wrong")

# BAD -- Exception is too broad
try:
    result = do_something()
except Exception:
    print("Something went wrong")

# GOOD -- catch exactly what you expect
try:
    result: int = int(user_input)
except ValueError:
    print("Not a valid number")
```

Why? If you catch everything, you hide real bugs. Your code might have a typo causing a `NameError`, but you'd never see it because your broad `except` swallows it silently.

---

## Multiple except Blocks

Different errors need different responses:

```python
def safe_divide(a_str: str, b_str: str) -> str:
    try:
        a: float = float(a_str)
        b: float = float(b_str)
        result: float = a / b
        return f"Result: {result}"
    except ValueError:
        return "Error: Please enter valid numbers."
    except ZeroDivisionError:
        return "Error: Cannot divide by zero."

print(safe_divide("10", "3"))    # Result: 3.333...
print(safe_divide("abc", "3"))   # Error: Please enter valid numbers.
print(safe_divide("10", "0"))    # Error: Cannot divide by zero.
```

Python checks each `except` from top to bottom and uses the first one that matches.

---

## The else Clause

The `else` block runs only if **no exception** occurred. It's useful for code that should only execute on success:

```python
def process_age(age_str: str) -> None:
    try:
        age: int = int(age_str)
    except ValueError:
        print("That's not a valid age.")
    else:
        # Only runs if int() succeeded
        if age < 0:
            print("Age can't be negative.")
        elif age > 150:
            print("That seems unlikely.")
        else:
            print(f"Your age is {age}.")

process_age("25")     # Your age is 25.
process_age("abc")    # That's not a valid age.
process_age("-5")     # Age can't be negative.
```

---

## The finally Clause

`finally` **always runs**, whether there was an exception or not. Use it for cleanup:

```python
def read_first_line(filename: str) -> str:
    file = None
    try:
        file = open(filename, "r")
        first_line: str = file.readline()
        return first_line.strip()
    except FileNotFoundError:
        return "File not found."
    finally:
        # This runs no matter what
        if file is not None:
            file.close()
            print("File closed.")
```

The `finally` block is your safety net. Even if the function returns early or crashes, `finally` still runs.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about try/except, multiple except blocks, else, and finally. Give me exercises: (1) Write a function that safely converts a string to a float, returning None on failure, (2) Write a function with try/except/else/finally that opens a file, reads it, and always closes it, (3) Given a code snippet with try/except/else/finally, ask me what order things print in for different scenarios. Check my answers."</div>
</div>

---

## Raising Exceptions

You don't just handle errors other code causes. You can **raise** your own when something is wrong:

```python
def set_age(age: int) -> str:
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age cannot be over 150")
    return f"Age set to {age}"

# This works
print(set_age(25))

# This raises an exception
try:
    print(set_age(-5))
except ValueError as e:
    print(f"Error: {e}")   # Error: Age cannot be negative
```

Use `raise` when your function receives input that doesn't make sense. It's your way of saying: "I can't do my job with this data."

The `as e` part captures the exception object, so you can read the message.

---

## Creating Custom Exceptions

For bigger programs, you can create your own exception types:

```python
class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the balance."""
    pass

class InvalidAmountError(Exception):
    """Raised when an amount is negative or zero."""
    pass

def withdraw(balance: float, amount: float) -> float:
    if amount <= 0:
        raise InvalidAmountError(f"Amount must be positive, got {amount}")
    if amount > balance:
        raise InsufficientFundsError(
            f"Cannot withdraw {amount} from balance of {balance}"
        )
    return balance - amount

# Using it
try:
    new_balance: float = withdraw(100.0, 150.0)
except InsufficientFundsError as e:
    print(f"Denied: {e}")
except InvalidAmountError as e:
    print(f"Bad input: {e}")
```

Custom exceptions make your error handling more readable. Instead of generic `ValueError` everywhere, you have descriptive names.

---

## LBYL vs EAFP

Two philosophies for dealing with potential errors:

**LBYL -- Look Before You Leap** (check first with if/else):

```python
def get_value_lbyl(data: dict[str, int], key: str) -> int | None:
    if key in data:
        return data[key]
    else:
        return None
```

**EAFP -- Easier to Ask Forgiveness than Permission** (try it, catch the error):

```python
def get_value_eafp(data: dict[str, int], key: str) -> int | None:
    try:
        return data[key]
    except KeyError:
        return None
```

Python community prefers EAFP. But use whichever makes your code clearer. For simple checks like "is this key in the dictionary," LBYL is fine. For operations that could fail in multiple ways (file I/O, network calls), EAFP is better.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about raising exceptions, custom exceptions, and LBYL vs EAFP. Quiz me: (1) Write a function that raises a ValueError if a string is empty, (2) Create a custom exception called NegativeNumberError and a function that uses it, (3) Rewrite a given LBYL function using EAFP style, and vice versa. Check my work."</div>
</div>

---

## Reading the Traceback -- A Critical Skill

When your program crashes, Python gives you a **traceback**. Learning to read it is one of the most important skills you'll develop.

Here's an example traceback:

```
Traceback (most recent call last):
  File "main.py", line 12, in <module>
    result = process_data("hello")
  File "main.py", line 8, in process_data
    return calculate(value)
  File "main.py", line 4, in calculate
    return int(text) * 2
ValueError: invalid literal for int() with base 10: 'hello'
```

Read it **from the bottom up**:

1. **Last line:** The actual error -- `ValueError` with a message.
2. **Lines above:** The chain of function calls that led to the error.
3. **Each "File" line:** The file name, line number, and function name.
4. **Bottom of the chain:** Where the error actually happened (line 4, in `calculate`).
5. **Top of the chain:** Where you called the code from (line 12).

Open your editor. Type this. Run it. Read the traceback:

```python
def step_three(text: str) -> int:
    return int(text)

def step_two(value: str) -> int:
    return step_three(value) * 2

def step_one(data: str) -> int:
    return step_two(data) + 10

result: int = step_one("abc")
```

Practice reading tracebacks. They tell you exactly what went wrong and where.

---

## Assert Statements

`assert` checks a condition during development. If the condition is False, the program crashes with an `AssertionError`.

```python
def calculate_average(numbers: list[float]) -> float:
    assert len(numbers) > 0, "Cannot average an empty list"
    total: float = 0.0
    index: int = 0
    while index < len(numbers):
        total += numbers[index]
        index += 1
    return total / len(numbers)

# This works
print(calculate_average([10.0, 20.0, 30.0]))  # 20.0

# This crashes with AssertionError
# print(calculate_average([]))
```

Use asserts for things that should **never** happen if your code is correct. They're development tools, not production error handling. In production, use proper exceptions.

---

## Common Patterns

### Input Validation Loop

```python
def get_positive_number() -> float:
    """Keep asking until user enters a positive number."""
    while True:
        user_input: str = input("Enter a positive number: ")
        try:
            number: float = float(user_input)
        except ValueError:
            print("That's not a number. Try again.")
            continue

        if number <= 0:
            print("Must be positive. Try again.")
            continue

        return number
```

### Safe Dictionary Access

```python
def get_user_field(user: dict[str, str], field: str) -> str:
    """Get a field from user data, returning 'Unknown' if missing."""
    try:
        return user[field]
    except KeyError:
        return "Unknown"

user_data: dict[str, str] = {"name": "Alice", "email": "alice@example.com"}
print(get_user_field(user_data, "name"))    # Alice
print(get_user_field(user_data, "phone"))   # Unknown
```

### Retry Pattern

```python
def fetch_with_retry(url: str, max_attempts: int = 3) -> str:
    """Try an operation multiple times before giving up."""
    attempt: int = 0
    while attempt < max_attempts:
        try:
            # Simulating a network call that might fail
            if attempt < 2:
                raise ConnectionError("Network timeout")
            return f"Data from {url}"
        except ConnectionError as e:
            attempt += 1
            print(f"Attempt {attempt} failed: {e}")
            if attempt == max_attempts:
                raise  # re-raise the last exception
    return ""  # unreachable, but satisfies type checker
```

---

## Where People Go Wrong

### 1. Catching too broadly

```python
# WRONG -- hides bugs
try:
    user_name: str = data["name"]
    user_age: int = int(data["age"])
    result: float = 100 / user_age
except:
    print("Something went wrong")

# RIGHT -- catch specific errors
try:
    user_name: str = data["name"]
    user_age: int = int(data["age"])
    result: float = 100 / user_age
except KeyError as e:
    print(f"Missing field: {e}")
except ValueError:
    print("Age is not a valid number")
except ZeroDivisionError:
    print("Age cannot be zero")
```

### 2. Using exceptions for normal flow control

```python
# WRONG -- exceptions for something predictable
def find_item(items: list[str], target: str) -> int:
    try:
        return items.index(target)
    except ValueError:
        return -1

# BETTER -- just check
def find_item(items: list[str], target: str) -> int:
    index: int = 0
    while index < len(items):
        if items[index] == target:
            return index
        index += 1
    return -1
```

### 3. Swallowing errors silently

```python
# TERRIBLE -- error happens and nobody knows
try:
    important_result: int = critical_calculation()
except ValueError:
    pass   # silently ignored!

# BETTER -- at least log it
try:
    important_result: int = critical_calculation()
except ValueError as e:
    print(f"Warning: calculation failed: {e}")
    important_result = 0  # provide a fallback
```

### 4. Putting too much code in try

```python
# WRONG -- too much in try, hard to know what raised the error
try:
    data: str = read_file("data.txt")
    parsed: dict[str, str] = parse_data(data)
    result: str = process(parsed)
    save_result(result)
except Exception:
    print("Something failed")

# RIGHT -- narrow try blocks
try:
    data: str = read_file("data.txt")
except FileNotFoundError:
    print("Data file not found")
else:
    try:
        parsed: dict[str, str] = parse_data(data)
        result: str = process(parsed)
    except ValueError as e:
        print(f"Bad data: {e}")
    else:
        save_result(result)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I finished learning about error handling. Comprehensive quiz: (1) Given a traceback, ask me to identify what went wrong and on which line, (2) Write a function that reads user input, validates it's a number between 1 and 100, and uses proper error handling, (3) Show me code with bad error handling practices and ask me to fix it, (4) Write a function that uses try/except/else/finally correctly. Grade my answers."</div>
</div>

---

## Summary

- **Syntax errors** happen before your code runs. **Exceptions** happen while running.
- Use `try/except` to catch exceptions. **Always catch specific types.**
- `else` runs when no exception happened. `finally` always runs.
- Use `raise` to create your own exceptions when input doesn't make sense.
- **Read tracebacks from the bottom up.** The last line is the error. The lines above show the call chain.
- `assert` is for development checks, not production error handling.
- Don't catch too broadly. Don't ignore errors. Don't put too much code in `try`.
- Python favors EAFP (try it, catch the error) over LBYL (check first).

---

**Previous:** [[wiki:python-functions]] | **Next:** [[wiki:python-file-io]]
