# Decorators and Closures — Functions That Modify Functions

## Prerequisites Recap

Before this page makes sense, you need to know two things:

1. **Functions are values.** You can store a function in a variable, pass it to another function, and return it from a function. A function is just an object, like an integer or a string.

2. **Functions can return functions.** A function can define a new function inside itself and return that inner function to the caller.

If either of those ideas feels shaky, go back to [[wiki:python-functions]] and review. Everything on this page builds on those ideas.

---

## What Is a Closure?

A closure is a function that **remembers variables from the scope where it was created**, even after that scope has finished running.

That sounds abstract. Here is a concrete example.

Open your editor. Type this. Run it.

```python
from typing import Callable


def make_adder(n: int) -> Callable[[int], int]:
    """Create a function that adds n to its argument."""

    def adder(x: int) -> int:
        return x + n  # n is "closed over" — remembered from make_adder

    return adder


add_five: Callable[[int], int] = make_adder(5)
add_ten: Callable[[int], int] = make_adder(10)

print(add_five(3))   # 8
print(add_five(20))  # 25
print(add_ten(3))    # 13
print(add_ten(20))   # 30
```

Walk through what happened:

1. `make_adder(5)` runs. It creates a local variable `n = 5`. It defines a function `adder` that uses `n`. It returns `adder`.
2. `make_adder` is now done. Normally, its local variable `n` would be garbage collected. But `adder` still references `n`. So Python keeps `n` alive.
3. When you call `add_five(3)`, the `adder` function runs. It accesses `n`, which is still `5`. It returns `3 + 5 = 8`.

The inner function `adder` **closed over** the variable `n`. That is why it is called a closure.

---

## Why Closures Matter

Closures let you create **specialized functions** on the fly. Instead of passing the same argument over and over, you bake it in.

```python
from typing import Callable


def make_multiplier(factor: int) -> Callable[[int], int]:
    """Create a function that multiplies by a fixed factor."""

    def multiply(x: int) -> int:
        return x * factor

    return multiply


double: Callable[[int], int] = make_multiplier(2)
triple: Callable[[int], int] = make_multiplier(3)

numbers: list[int] = [1, 2, 3, 4, 5]
doubled: list[int] = [double(n) for n in numbers]
tripled: list[int] = [triple(n) for n in numbers]

print(doubled)  # [2, 4, 6, 8, 10]
print(tripled)  # [3, 6, 9, 12, 15]
```

Another practical example — creating validators:

```python
from typing import Callable


def make_range_checker(low: int, high: int) -> Callable[[int], bool]:
    """Create a function that checks if a value is in range."""

    def check(value: int) -> bool:
        return low <= value <= high

    return check


is_valid_age: Callable[[int], bool] = make_range_checker(0, 150)
is_valid_score: Callable[[int], bool] = make_range_checker(0, 100)

print(is_valid_age(25))    # True
print(is_valid_age(200))   # False
print(is_valid_score(85))  # True
print(is_valid_score(150)) # False
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about closures in Python. Quiz me: (1) What is a closure? (2) What does it mean for a variable to be 'closed over'? (3) Write a closure called make_greeter that takes a greeting string and returns a function that greets a given name. Example: make_greeter('Hello')('Alice') should return 'Hello, Alice!'. (4) Why does the closed-over variable survive after the outer function finishes? Include type hints on everything."</div>
</div>

---

## What Is a Decorator?

A decorator is a function that **takes a function as input and returns a modified version of that function**. That is all it is. A function that wraps another function to add behavior.

Think of it like wrapping a gift. The gift (original function) is still inside. The wrapping (decorator) adds something around it — logging, timing, validation, whatever you need.

---

## Building a Decorator Step by Step

Let's build a decorator that prints a message before and after a function runs.

### Step 1: The Plain Function Call Approach

Open your editor. Type this. Run it.

```python
from typing import Any, Callable


def log_calls(func: Callable) -> Callable:
    """Wrap a function to print when it is called and when it finishes."""

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Calling {func.__name__}")
        result: Any = func(*args, **kwargs)
        print(f"Done calling {func.__name__}")
        return result

    return wrapper


def greet(name: str) -> str:
    return f"Hello, {name}!"


# Manually wrapping the function
greet = log_calls(greet)

message: str = greet("Alice")
print(message)
```

Output:

```
Calling greet
Done calling greet
Hello, Alice!
```

What happened: `log_calls(greet)` took the `greet` function, wrapped it in `wrapper`, and returned `wrapper`. We then reassigned `greet` to point to `wrapper`. Now when you call `greet("Alice")`, you are actually calling `wrapper("Alice")`, which calls the original `greet` inside.

### Step 2: The @ Syntax

That manual `greet = log_calls(greet)` line is ugly. Python provides the `@` shorthand. It does exactly the same thing.

Open your editor. Type this. Run it.

```python
from typing import Any, Callable


def log_calls(func: Callable) -> Callable:
    """Wrap a function to print when it is called and when it finishes."""

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Calling {func.__name__}")
        result: Any = func(*args, **kwargs)
        print(f"Done calling {func.__name__}")
        return result

    return wrapper


@log_calls
def greet(name: str) -> str:
    return f"Hello, {name}!"


@log_calls
def add(a: int, b: int) -> int:
    return a + b


print(greet("Alice"))
print(add(3, 5))
```

`@log_calls` above `def greet` is identical to writing `greet = log_calls(greet)` after the function definition. It is just cleaner.

---

## @functools.wraps — Preserving Metadata

There is a problem with our decorator. The wrapped function loses its identity.

```python
print(greet.__name__)  # "wrapper" — not "greet"!
```

The `wrapper` function replaced `greet`, so Python thinks the function is named "wrapper". This breaks debugging and documentation.

The fix is `@functools.wraps`. Open your editor. Type this. Run it.

```python
import functools
from typing import Any, Callable


def log_calls(func: Callable) -> Callable:
    """Wrap a function to print when it is called and when it finishes."""

    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Calling {func.__name__}")
        result: Any = func(*args, **kwargs)
        print(f"Done calling {func.__name__}")
        return result

    return wrapper


@log_calls
def greet(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"


print(greet.__name__)  # "greet" — correct!
print(greet.__doc__)   # "Greet someone by name." — preserved!
```

`@functools.wraps(func)` copies the original function's name, docstring, and other metadata onto the wrapper. **Always use it.** There is no good reason not to.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on decorators: (1) What does a decorator do? (2) What does @my_decorator above a function definition actually translate to in plain Python? (3) Why do we need @functools.wraps? What breaks without it? (4) Write a decorator called count_calls that counts how many times a function has been called and prints the count each time. Include type hints and @functools.wraps."</div>
</div>

---

## Practical Decorator: Timing

This is one of the most useful decorators you will ever write. It measures how long a function takes to run.

Open your editor. Type this. Run it.

```python
import functools
import time
from typing import Any, Callable


def timer(func: Callable) -> Callable:
    """Print how long the function took to execute."""

    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start: float = time.time()
        result: Any = func(*args, **kwargs)
        elapsed: float = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f} seconds")
        return result

    return wrapper


@timer
def slow_function() -> str:
    """Simulate a slow operation."""
    time.sleep(1)
    return "done"


result: str = slow_function()
print(result)
```

Output:

```
slow_function took 1.0012 seconds
done
```

---

## Practical Decorator: Retry Logic

Sometimes operations fail temporarily — network requests, database connections. A retry decorator automatically tries again.

```python
import functools
import time
from typing import Any, Callable


def retry(max_attempts: int = 3, delay: float = 1.0) -> Callable:
    """Retry a function up to max_attempts times if it raises an exception."""

    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            attempt: int = 0
            while attempt < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempt += 1
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
        return wrapper

    return decorator


@retry(max_attempts=3, delay=0.5)
def unreliable_api_call() -> str:
    """Simulate an unreliable API."""
    import random
    if random.random() < 0.7:
        raise ConnectionError("Server unavailable")
    return "Success!"
```

Notice something different here — this decorator **takes arguments**. That means there is an extra layer of nesting. We will explain that next.

---

## Decorators with Arguments (The Triple-Nested Pattern)

A regular decorator takes a function and returns a function. But what if you want to configure the decorator itself? You need a function that takes the configuration, returns a decorator, which takes a function, which returns a wrapper.

Three levels deep. This is the trickiest part.

```python
import functools
from typing import Any, Callable


def repeat(times: int) -> Callable:
    """Decorator that runs a function multiple times."""

    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            result: Any = None
            i: int = 0
            while i < times:
                result = func(*args, **kwargs)
                i += 1
            return result
        return wrapper

    return decorator


@repeat(times=3)
def say_hello(name: str) -> None:
    print(f"Hello, {name}!")


say_hello("Alice")
```

Output:

```
Hello, Alice!
Hello, Alice!
Hello, Alice!
```

What happened:
1. `repeat(times=3)` runs first. It returns `decorator`.
2. `decorator` is applied to `say_hello`. It returns `wrapper`.
3. `say_hello` is now `wrapper`. When called, it runs the original function 3 times.

The `@repeat(times=3)` syntax is equivalent to: `say_hello = repeat(times=3)(say_hello)`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on advanced decorators: (1) Why do decorators with arguments need three levels of nested functions? (2) What does @repeat(times=3) above a function definition expand to in plain code? (3) Write a decorator called validate_positive that checks if all integer arguments to a function are positive, raising ValueError if any are not. It should not take any arguments itself. (4) Write a decorator called slow_down(seconds) that pauses for a given number of seconds before calling the function. Include type hints and @functools.wraps."</div>
</div>

---

## Common Built-in Decorators

Python comes with several decorators you will use all the time.

### @property — Computed Attributes

```python
class Circle:
    def __init__(self, radius: float) -> None:
        self._radius: float = radius

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float) -> None:
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2


c: Circle = Circle(5.0)
print(c.radius)  # 5.0 — looks like an attribute, but calls a method
print(c.area)    # 78.53975
c.radius = 10.0  # calls the setter
# c.radius = -1  # would raise ValueError
```

### @staticmethod — No Self Needed

```python
class MathHelper:
    @staticmethod
    def add(a: int, b: int) -> int:
        return a + b


result: int = MathHelper.add(3, 5)
print(result)  # 8
```

### @classmethod — Takes the Class as First Argument

```python
class User:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age

    @classmethod
    def from_string(cls, data: str) -> "User":
        """Create a User from a 'name,age' string."""
        name: str
        age_str: str
        name, age_str = data.split(",")
        return cls(name, int(age_str))


user: User = User.from_string("Alice,30")
print(user.name)  # Alice
print(user.age)   # 30
```

---

## @functools.lru_cache — Free Caching

This decorator caches a function's results. If you call the function with the same arguments again, it returns the cached result instead of computing it again. "LRU" stands for "Least Recently Used."

Open your editor. Type this. Run it.

```python
import functools
import time


@functools.lru_cache(maxsize=128)
def expensive_computation(n: int) -> int:
    """Simulate a slow computation."""
    time.sleep(1)  # Pretend this takes a while
    return n * n


# First call — takes 1 second
start: float = time.time()
result_1: int = expensive_computation(42)
print(f"First call: {result_1}, took {time.time() - start:.2f}s")

# Second call with same argument — instant (cached)
start = time.time()
result_2: int = expensive_computation(42)
print(f"Second call: {result_2}, took {time.time() - start:.2f}s")
```

This is incredibly useful for recursive functions like Fibonacci:

```python
import functools


@functools.lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    """Compute the nth Fibonacci number."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


print(fibonacci(100))  # 354224848179261915075 — instant!
# Without caching, this would take longer than the age of the universe
```

---

## Decorator Order

When you stack multiple decorators, they apply from **bottom to top**.

```python
@decorator_a
@decorator_b
def my_function() -> None:
    pass

# This is equivalent to:
# my_function = decorator_a(decorator_b(my_function))
```

`decorator_b` wraps the function first. Then `decorator_a` wraps the result. When the function is called, `decorator_a`'s wrapper runs first, then `decorator_b`'s wrapper, then the original function.

```python
import functools
from typing import Any, Callable


def bold(func: Callable) -> Callable:
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> str:
        return f"<b>{func(*args, **kwargs)}</b>"
    return wrapper


def italic(func: Callable) -> Callable:
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> str:
        return f"<i>{func(*args, **kwargs)}</i>"
    return wrapper


@bold
@italic
def greet(name: str) -> str:
    return f"Hello, {name}"


print(greet("Alice"))  # <b><i>Hello, Alice</i></b>
```

`italic` wraps first (inner), then `bold` wraps that (outer). So the output has `<b>` on the outside and `<i>` on the inside.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Comprehensive quiz on decorators and closures: (1) What is the difference between a closure and a decorator? (2) What does @functools.lru_cache do and when should you use it? (3) If I stack @A then @B on a function, which decorator runs first when the function is called? (4) Write a decorator called require_auth that takes no arguments. It should check if a global variable LOGGED_IN is True before allowing the function to run, raising PermissionError if not. (5) Explain the triple-nested pattern for decorators with arguments. (6) Name three built-in Python decorators and explain what each does. Include type hints on all code."</div>
</div>

---

## Where People Go Wrong

1. **Forgetting `@functools.wraps`.** Without it, the decorated function loses its name, docstring, and other metadata. Always include it on your wrapper function.

2. **Confusing decorator order.** Decorators apply bottom-to-top but execute top-to-bottom. If you stack `@A` and `@B` on a function, `B` wraps first, then `A` wraps the result. When called, `A`'s code runs first.

3. **Confusing decoration time vs call time.** The decorator runs **once** — when the function is defined (or when the module loads). The wrapper runs **every time** the function is called. If you put a `print` in the decorator body (outside the wrapper), it prints once at definition time. If you put it inside the wrapper, it prints every call.

```python
import functools
from typing import Any, Callable


def my_decorator(func: Callable) -> Callable:
    print("Decorating!")  # Runs ONCE, at definition time

    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print("Calling!")  # Runs EVERY time the function is called
        return func(*args, **kwargs)

    return wrapper


@my_decorator  # Prints "Decorating!" right here
def say_hi() -> None:
    print("Hi!")


# Prints "Calling!" then "Hi!"
say_hi()
# Prints "Calling!" then "Hi!" again
say_hi()
```

4. **Making closures that all reference the same variable.** This is a classic trap:

```python
from typing import Callable

functions: list[Callable[[], int]] = []
i: int = 0
while i < 5:
    functions.append(lambda: i)  # All lambdas close over the SAME i
    i += 1

# They all return 5, not 0, 1, 2, 3, 4!
f: Callable[[], int]
for f in functions:
    print(f())  # 5, 5, 5, 5, 5
```

Fix: use a default argument to capture the current value:

```python
functions: list[Callable[[], int]] = []
i: int = 0
while i < 5:
    functions.append(lambda i=i: i)  # Captures current value of i
    i += 1

f: Callable[[], int]
for f in functions:
    print(f())  # 0, 1, 2, 3, 4
```

---

**Previous:** [[wiki:python-comprehensions]] | **Next:** [[wiki:python-type-system]]