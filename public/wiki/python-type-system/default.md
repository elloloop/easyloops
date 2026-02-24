# The Type System — Making Your Code Self-Documenting

## Why Type Hints?

Every code example in this entire wiki series has used type hints. Every single one. Now it is time to explain **why**.

Type hints do three things:

1. **Catch bugs before running your code.** A tool called `mypy` reads your type hints and tells you when something does not match. You find errors before your users do.
2. **Documentation that stays up to date.** Comments lie. They get outdated. Type hints are checked by tools, so they stay accurate.
3. **Better IDE support.** Your editor can autocomplete methods, show function signatures, and warn you about mistakes — because it knows the types.

Python does not **require** type hints. Your code runs exactly the same with or without them. But professional Python code uses them. They make you faster, not slower.

---

## Python Is Dynamically Typed

In Python, a variable can hold any type at any time. This is called **dynamic typing**.

```python
x = 5        # x is an int
x = "hello"  # now x is a string
x = [1, 2]   # now x is a list
```

This flexibility is one reason Python is easy to start with. But it is also a source of bugs. If a function expects an integer and you pass a string, Python will not warn you until the program crashes.

Type hints are **optional annotations** that tell both humans and tools what types you expect. They do not change how Python runs your code. They are there for tools like `mypy` and for the human reading the code.

---

## Basic Type Hints

The simplest type hints annotate variables and function parameters.

Open your editor. Type this. Run it.

```python
# Variable annotations
name: str = "Alice"
age: int = 30
height: float = 5.7
is_student: bool = True
nothing: None = None

# Function with type hints
def greet(name: str, excited: bool) -> str:
    if excited:
        return f"Hello, {name}!!!"
    return f"Hello, {name}."

message: str = greet("Alice", True)
print(message)  # Hello, Alice!!!
```

The syntax: `variable: type = value` for variables, `def func(param: type) -> return_type` for functions.

The `-> str` after the parentheses means this function returns a `str`. If a function returns nothing, use `-> None`.

```python
def print_greeting(name: str) -> None:
    print(f"Hello, {name}")
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about basic Python type hints. Quiz me: (1) What three benefits do type hints provide? (2) Do type hints affect how Python runs your code? (3) Add type hints to this function: def calculate_area(width, height) that returns a float. (4) What does -> None mean on a function? (5) Add type hints to these variables: name = 'Bob', count = 42, ratio = 3.14, active = False."</div>
</div>

---

## Collection Type Hints

When you have a list, dict, set, or tuple, you also specify what is **inside** the collection.

Open your editor. Type this. Run it.

```python
# A list of integers
scores: list[int] = [90, 85, 92, 78]

# A list of strings
names: list[str] = ["Alice", "Bob", "Charlie"]

# A dictionary mapping strings to integers
word_counts: dict[str, int] = {"hello": 5, "world": 3}

# A set of strings
tags: set[str] = {"python", "coding", "tutorial"}

# A tuple with specific types for each position
point: tuple[float, float] = (3.5, 7.2)

# A tuple with a fixed type but variable length
values: tuple[int, ...] = (1, 2, 3, 4, 5)
```

The lowercase `list`, `dict`, `set`, and `tuple` work as type hints in Python 3.9+. If you are on an older version, you need to import from `typing`: `List`, `Dict`, `Set`, `Tuple`.

### Nested Collections

Collections can contain other collections:

```python
# A list of lists of integers (a matrix)
matrix: list[list[int]] = [[1, 2], [3, 4], [5, 6]]

# A dictionary mapping strings to lists of integers
grade_book: dict[str, list[int]] = {
    "Alice": [90, 85, 92],
    "Bob": [78, 88, 95],
}

# A list of tuples
pairs: list[tuple[str, int]] = [("Alice", 30), ("Bob", 25)]
```

---

## Function Type Hints in Detail

Functions have type hints on every parameter and on the return value.

```python
def calculate_average(numbers: list[float]) -> float:
    """Calculate the average of a list of numbers."""
    total: float = sum(numbers)
    count: int = len(numbers)
    return total / count


def find_longest(words: list[str]) -> str:
    """Find the longest word in a list."""
    longest: str = ""
    word: str
    for word in words:
        if len(word) > len(longest):
            longest = word
    return longest


def build_greeting(name: str, title: str = "Mr.") -> str:
    """Build a formal greeting with an optional title."""
    return f"Dear {title} {name}"


average: float = calculate_average([1.0, 2.0, 3.0, 4.0])
longest: str = find_longest(["cat", "elephant", "dog"])
greeting: str = build_greeting("Smith")

print(average)   # 2.5
print(longest)   # elephant
print(greeting)  # Dear Mr. Smith
```

Default arguments work normally with type hints. The type hint goes before the `=`.

---

## Optional and Union Types

Sometimes a value can be one of several types, or it might be `None`.

### Optional — The Value Might Be None

```python
def find_user(user_id: int) -> str | None:
    """Find a user by ID. Returns None if not found."""
    users: dict[int, str] = {1: "Alice", 2: "Bob"}
    return users.get(user_id)


result: str | None = find_user(1)
print(result)  # Alice

result = find_user(999)
print(result)  # None
```

The `str | None` syntax means "this is either a `str` or `None`." This works in Python 3.10+. For older versions, use `Optional[str]` from the `typing` module:

```python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users: dict[int, str] = {1: "Alice", 2: "Bob"}
    return users.get(user_id)
```

`Optional[str]` is exactly the same as `str | None`.

### Union — The Value Can Be Multiple Types

```python
def display(value: int | str) -> str:
    """Convert a value to a display string."""
    return f"Value: {value}"


print(display(42))       # Value: 42
print(display("hello"))  # Value: hello
```

For older Python versions, import `Union`:

```python
from typing import Union

def display(value: Union[int, str]) -> str:
    return f"Value: {value}"
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on collection and optional type hints: (1) How do you type-hint a list of strings? (2) How do you type-hint a dictionary that maps integers to lists of strings? (3) What is the difference between str and str | None? (4) Write a function find_max that takes a list[int] and returns int | None (returning None if the list is empty). (5) What is the difference between tuple[int, str] and tuple[int, ...]? Include type hints on everything."</div>
</div>

---

## Type Aliases

When type hints get long and repetitive, you can create aliases — shorter names for complex types.

```python
# Python 3.12+ syntax
type UserId = int
type UserMap = dict[UserId, str]
type Matrix = list[list[float]]
type Coordinate = tuple[float, float]

# Now use the aliases
users: UserMap = {1: "Alice", 2: "Bob"}
grid: Matrix = [[1.0, 2.0], [3.0, 4.0]]
position: Coordinate = (5.5, 10.3)


def get_user(user_map: UserMap, user_id: UserId) -> str | None:
    return user_map.get(user_id)
```

For Python 3.9-3.11, use `TypeAlias`:

```python
from typing import TypeAlias

UserId: TypeAlias = int
UserMap: TypeAlias = dict[UserId, str]
```

Type aliases make complex signatures readable. Instead of `dict[int, list[tuple[str, float]]]` everywhere, you define it once and use a clear name.

---

## The Callable Type

Functions are values. So what is the type of a function? It is `Callable`.

```python
from typing import Callable


def apply_operation(x: int, y: int, operation: Callable[[int, int], int]) -> int:
    """Apply an operation to two numbers."""
    return operation(x, y)


def add(a: int, b: int) -> int:
    return a + b


def multiply(a: int, b: int) -> int:
    return a * b


result_1: int = apply_operation(3, 4, add)
result_2: int = apply_operation(3, 4, multiply)

print(result_1)  # 7
print(result_2)  # 12
```

`Callable[[int, int], int]` means: a function that takes two `int` arguments and returns an `int`. The first part `[int, int]` lists the parameter types. The second part `int` is the return type.

If you do not care about the signature, use `Callable[..., int]` (takes any arguments, returns `int`).

---

## Generic Types and TypeVar

Sometimes you want to write a function that works with any type, but the input and output types should match.

```python
from typing import TypeVar

T = TypeVar("T")


def first(items: list[T]) -> T:
    """Return the first item from a list."""
    return items[0]


# T is inferred as int
number: int = first([10, 20, 30])
print(number)  # 10

# T is inferred as str
word: str = first(["hello", "world"])
print(word)  # hello
```

`TypeVar("T")` creates a type variable. When you call `first([10, 20, 30])`, Python's type checker figures out that `T` is `int`, so the return type is `int`. When you call `first(["hello", "world"])`, `T` is `str`.

Without `TypeVar`, you would have to use `Any`, which provides no type safety:

```python
from typing import Any

# BAD — mypy cannot check the return type
def first_bad(items: list[Any]) -> Any:
    return items[0]

# GOOD — mypy knows the return type matches the input
def first_good(items: list[T]) -> T:
    return items[0]
```

### Constrained TypeVar

You can restrict a `TypeVar` to specific types:

```python
from typing import TypeVar

Number = TypeVar("Number", int, float)


def double(value: Number) -> Number:
    return value * 2


result_int: int = double(5)       # OK
result_float: float = double(3.14) # OK
# result_str: str = double("hi")  # mypy error — str is not int or float
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on advanced type hints: (1) What is a TypeVar and when do you use it? (2) What does Callable[[int, str], bool] mean? (3) Write a generic function called last that returns the last element of any list, using TypeVar. (4) Create a type alias called StudentGrades for dict[str, list[int]]. (5) What is the difference between using T = TypeVar('T') and using Any? When would you use each?"</div>
</div>

---

## Protocol — Duck Typing with Types

Python follows the philosophy "if it walks like a duck and quacks like a duck, it is a duck." This is called duck typing. `Protocol` lets you express this in the type system.

```python
from typing import Protocol


class Drawable(Protocol):
    """Anything with a draw method."""
    def draw(self) -> str: ...


class Circle:
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def draw(self) -> str:
        return f"Drawing circle with radius {self.radius}"


class Square:
    def __init__(self, side: float) -> None:
        self.side: float = side

    def draw(self) -> str:
        return f"Drawing square with side {self.side}"


def render(shape: Drawable) -> None:
    """Render any drawable shape."""
    print(shape.draw())


render(Circle(5.0))   # Drawing circle with radius 5.0
render(Square(3.0))   # Drawing square with side 3.0
```

`Circle` and `Square` do not inherit from `Drawable`. They do not even know `Drawable` exists. But they both have a `draw() -> str` method, which is all `Drawable` requires. This is called **structural subtyping** — the structure matches, so it counts.

---

## Literal Types

When a value can only be one of a few specific values, use `Literal`:

```python
from typing import Literal


def set_color(color: Literal["red", "green", "blue"]) -> str:
    return f"Color set to {color}"


print(set_color("red"))    # OK
print(set_color("green"))  # OK
# set_color("purple")      # mypy error — "purple" is not allowed
```

This is much better than using a plain `str` type. With `str`, any string would be accepted. With `Literal`, only the specific values you listed are allowed.

---

## TypedDict — Typed Dictionaries

Regular `dict[str, Any]` tells you nothing about what keys exist or what their value types are. `TypedDict` fixes this.

```python
from typing import TypedDict


class UserProfile(TypedDict):
    name: str
    age: int
    email: str
    is_active: bool


# This is still a regular dict at runtime
user: UserProfile = {
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com",
    "is_active": True,
}

print(user["name"])  # Alice
print(user["age"])   # 30

# mypy would catch these errors:
# user["phone"] = "555-1234"  # Error: "phone" is not a valid key
# user["age"] = "thirty"      # Error: expected int, got str
```

`TypedDict` is useful when you work with JSON data, API responses, or configuration dictionaries where the keys are known.

---

## Running mypy

All these type hints are useless if you do not check them. `mypy` is the tool that reads your code, checks the types, and reports errors — **without running your code**.

First, install it:

```
pip install mypy
```

Then create a file with a type error. Open your editor. Type this. Save it as `type_demo.py`.

```python
def add_numbers(a: int, b: int) -> int:
    return a + b


result: int = add_numbers(3, "five")  # Bug! "five" is not an int
print(result)
```

Now run mypy:

```
mypy type_demo.py
```

Output:

```
type_demo.py:5: error: Argument 2 to "add_numbers" has incompatible type "str"; expected "int"
```

mypy found the bug without running the code. If you had just run `python type_demo.py`, Python would crash at runtime with a `TypeError`. mypy catches it earlier.

### Common mypy Checks

```python
from typing import Optional


def process(name: str) -> str:
    return name.upper()


# mypy catches: might be None
value: Optional[str] = None
# process(value)  # Error: expected str, got Optional[str]

# Fix: check for None first
if value is not None:
    process(value)  # OK — mypy knows value is str here
```

mypy is smart enough to understand control flow. After an `if value is not None` check, it knows the type has been narrowed from `str | None` to `str`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on mypy and practical type checking: (1) What does mypy do? Does it run your code? (2) Given a variable x: int | None, why can't you call x.upper()? How do you fix it? (3) What is a Protocol and how does it relate to duck typing? (4) When would you use Literal instead of str? (5) Write a TypedDict for a Book with title (str), author (str), pages (int), and available (bool). (6) What command installs and runs mypy on a file called app.py?"</div>
</div>

---

## Type Hints Do NOT Affect Runtime

This is important to understand. Type hints are **completely ignored** by Python when your code runs. They exist only for:

- `mypy` and other type checkers
- Your IDE (autocomplete, error highlighting)
- Humans reading the code

```python
# This runs WITHOUT error in Python, even though the types are wrong
x: int = "this is a string"  # type: ignore
print(x)  # "this is a string"
```

Python does not enforce type hints. It is your responsibility to run `mypy` to check them. Think of type hints as a safety net you have to choose to use.

---

## Gradually Adding Types to Existing Code

You do not have to add type hints to every file at once. You can do it gradually:

1. **Start with function signatures.** Add parameter types and return types to your functions. This gives you the most value for the least effort.

2. **Add variable annotations for non-obvious types.** If the type is obvious from the right-hand side, you can skip it. But when it is not clear, annotate.

```python
# Type is obvious — annotation is optional but still good practice
name: str = "Alice"

# Type is NOT obvious — annotation is essential
result: dict[str, list[int]] = parse_grades(raw_data)
```

3. **Run mypy on individual files.** You can check one file at a time: `mypy my_file.py`.

4. **Use `# type: ignore` sparingly.** When mypy complains about something you cannot fix right now, add `# type: ignore` to silence it. But come back and fix it later.

5. **Configure mypy to be strict gradually.** Start with basic checking, then enable stricter settings as your codebase matures.

```python
# mypy.ini or pyproject.toml example:
# [mypy]
# python_version = 3.12
# warn_return_any = True
# disallow_untyped_defs = True
```

---

## The typing Module Reference

Here is a summary of the most important types from the `typing` module:

```python
from typing import (
    Any,          # Any type at all (escape hatch — avoid when possible)
    Callable,     # Function type: Callable[[param_types], return_type]
    Generator,    # Generator[yield_type, send_type, return_type]
    Iterator,     # Iterator[yield_type]
    Optional,     # Optional[X] = X | None
    Union,        # Union[X, Y] = X | Y
    TypeVar,      # Generic type variable
    Protocol,     # Structural subtyping
    Literal,      # Specific literal values
    TypedDict,    # Typed dictionary
    Final,        # Value cannot be reassigned
    ClassVar,     # Class-level variable, not instance variable
)
```

In modern Python (3.10+), prefer the shorthand syntax:

```python
# Instead of Optional[int]:
x: int | None = None

# Instead of Union[int, str]:
y: int | str = 42

# Instead of List[int] (with capital L):
z: list[int] = [1, 2, 3]
```

---

## Complete Example: Putting It All Together

Here is a small program that uses everything from this page.

Open your editor. Type this. Run it.

```python
from typing import TypeVar, Callable, Protocol, TypedDict

T = TypeVar("T")


class HasName(Protocol):
    """Anything with a name attribute."""
    name: str


class Student(TypedDict):
    name: str
    grades: list[int]
    active: bool


def first_or_default(items: list[T], default: T) -> T:
    """Return the first item, or default if the list is empty."""
    if len(items) == 0:
        return default
    return items[0]


def average(numbers: list[int | float]) -> float:
    """Calculate the average of a list of numbers."""
    if len(numbers) == 0:
        return 0.0
    return sum(numbers) / len(numbers)


def greet_named(thing: HasName) -> str:
    """Greet anything that has a name."""
    return f"Hello, {thing.name}!"


def apply_to_all(items: list[T], func: Callable[[T], T]) -> list[T]:
    """Apply a function to every item in a list."""
    return [func(item) for item in items]


# Using our typed functions
students: list[Student] = [
    {"name": "Alice", "grades": [90, 85, 92], "active": True},
    {"name": "Bob", "grades": [78, 88, 95], "active": True},
    {"name": "Charlie", "grades": [60, 70, 65], "active": False},
]

student: Student
for student in students:
    avg: float = average(student["grades"])
    print(f"{student['name']}: average = {avg:.1f}")

numbers: list[int] = [1, 2, 3, 4, 5]
doubled: list[int] = apply_to_all(numbers, lambda x: x * 2)
print(f"Doubled: {doubled}")

first: int = first_or_default([], 0)
print(f"First or default: {first}")
```

Every function has typed parameters and a typed return. Every variable has a type annotation. Every collection specifies what it contains. This is how professional Python code looks.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Comprehensive quiz on the Python type system: (1) Add complete type hints to this function: def process_data(items, threshold, callback) — it takes a list of floats, a float threshold, a function that takes a float and returns a bool, and returns a list of floats that pass the callback. (2) What is the difference between list[int] and List[int] from typing? (3) When should you use Any? When should you avoid it? (4) Write a Protocol called Measurable for objects that have a length() -> int method. (5) Create a TypedDict for a Config with host (str), port (int), debug (bool), and tags (list[str]). (6) What is the difference between type hints and runtime type checking? (7) Write a generic function swap that takes two values of the same type and returns them in reverse order as a tuple."</div>
</div>

---

## Where People Go Wrong

1. **Using `Any` everywhere.** `Any` defeats the purpose of type hints. It tells mypy "do not check this." Use it only when you truly cannot determine the type. If you find yourself using `Any` a lot, it means your types need more thought.

2. **Ignoring mypy errors.** When mypy reports an error, it is almost always a real bug or a type hint that needs fixing. Do not slap `# type: ignore` on everything. Read the error, understand it, fix it.

3. **Overly complex types.** If your type annotation is longer than the code it annotates, create a type alias. `dict[str, list[tuple[int, Callable[[str], bool]]]]` is unreadable. Give it a name.

```python
# Too complex inline
def process(data: dict[str, list[tuple[int, Callable[[str], bool]]]]) -> None: ...

# Better with an alias
type FilterEntry = tuple[int, Callable[[str], bool]]
type FilterMap = dict[str, list[FilterEntry]]

def process(data: FilterMap) -> None: ...
```

4. **Not using type hints at all.** Some developers avoid type hints because they feel like extra work. They are. But they pay for themselves many times over in caught bugs, better autocomplete, and code that documents itself. Start small. Add them to new code. Gradually add them to old code.

5. **Confusing type hints with validation.** Type hints do NOT validate data at runtime. If you receive JSON from an API, type hints will not check that the data has the right shape. You still need runtime validation (with libraries like `pydantic` or manual checks). Type hints tell `mypy` what to expect. Runtime validation tells your program what to reject.

---

**Previous:** [[wiki:python-decorators-closures]] | **Next:** [[wiki:python-ds-arrays]]