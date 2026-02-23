# Special Methods -- Making Your Types Behave Like Built-ins

## The Magic of Python

When you write `len("hello")`, Python calls a special method on the string object. When you write `3 + 4`, Python calls a special method on the integer object. When you write `print(something)`, Python calls a special method to get the text to display.

You can define these same special methods on your own classes. That means you can make your objects work with `+`, `==`, `len()`, `print()`, `for` loops, and more -- just like the built-in types.

---

## What Are Special Methods?

Special methods are methods with double underscores on both sides: `__something__`. Python calls them automatically in response to certain operations.

You have already seen one: `__init__`. Python calls it automatically when you create a new object.

Here are the most useful ones, grouped by what they do.

---

## String Representation: `__str__` and `__repr__`

When you `print()` an object, Python calls `__str__`. When you inspect an object in the REPL (or use `repr()`), Python calls `__repr__`.

Without these methods, you get something useless:

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age

rex: Dog = Dog("Rex", 5)
print(rex)  # <__main__.Dog object at 0x7f...>  -- useless!
```

With `__str__` and `__repr__`:

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age

    def __str__(self) -> str:
        return f"{self.name}, age {self.age}"

    def __repr__(self) -> str:
        return f"Dog(name='{self.name}', age={self.age})"

rex: Dog = Dog("Rex", 5)
print(rex)       # Rex, age 5          -- __str__
print(repr(rex)) # Dog(name='Rex', age=5) -- __repr__
```

**The difference:**
- `__str__` is for humans. It should be nice to read.
- `__repr__` is for developers. It should show how to recreate the object.

**Rule of thumb:** Always define `__repr__`. If `__str__` is not defined, Python falls back to `__repr__`.

Open your editor. Type this. Run it.

```python
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

    def __repr__(self) -> str:
        return f"Point(x={self.x}, y={self.y})"

    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

p: Point = Point(3.0, 4.0)
print(p)        # (3.0, 4.0)
print(repr(p))  # Point(x=3.0, y=4.0)
print(f"The point is {p}")  # The point is (3.0, 4.0)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Color with red, green, and blue attributes (all int). Define __str__ to return something like 'rgb(255, 128, 0)' and __repr__ to return something like 'Color(red=255, green=128, blue=0)'. Test both with print() and repr()."</div>
</div>

---

## Comparison: `__eq__`, `__lt__`, `__le__`, `__gt__`, `__ge__`

By default, `==` checks if two variables point to the same object in memory, not if they have the same data:

```python
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

p1: Point = Point(3.0, 4.0)
p2: Point = Point(3.0, 4.0)
print(p1 == p2)  # False! Different objects in memory
```

Define `__eq__` to compare by value:

```python
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1: Point = Point(3.0, 4.0)
p2: Point = Point(3.0, 4.0)
p3: Point = Point(1.0, 2.0)

print(p1 == p2)  # True -- same values
print(p1 == p3)  # False -- different values
```

For ordering (`<`, `<=`, `>`, `>=`), define the comparison methods:

```python
class Student:
    def __init__(self, name: str, gpa: float) -> None:
        self.name: str = name
        self.gpa: float = gpa

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa == other.gpa

    def __lt__(self, other: "Student") -> bool:
        return self.gpa < other.gpa

    def __le__(self, other: "Student") -> bool:
        return self.gpa <= other.gpa

    def __gt__(self, other: "Student") -> bool:
        return self.gpa > other.gpa

    def __ge__(self, other: "Student") -> bool:
        return self.gpa >= other.gpa

    def __repr__(self) -> str:
        return f"Student('{self.name}', gpa={self.gpa})"
```

### The `@functools.total_ordering` Shortcut

Writing all five comparison methods is tedious. If you define `__eq__` and one other (like `__lt__`), `total_ordering` fills in the rest.

```python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name: str, gpa: float) -> None:
        self.name: str = name
        self.gpa: float = gpa

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa == other.gpa

    def __lt__(self, other: "Student") -> bool:
        return self.gpa < other.gpa

    def __repr__(self) -> str:
        return f"Student('{self.name}', gpa={self.gpa})"
```

Open your editor. Type this. Run it.

```python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name: str, gpa: float) -> None:
        self.name: str = name
        self.gpa: float = gpa

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa == other.gpa

    def __lt__(self, other: "Student") -> bool:
        return self.gpa < other.gpa

    def __repr__(self) -> str:
        return f"Student('{self.name}', gpa={self.gpa})"

alice: Student = Student("Alice", 3.9)
bob: Student = Student("Bob", 3.5)
charlie: Student = Student("Charlie", 3.9)

print(alice > bob)      # True
print(alice == charlie)  # True (same GPA)
print(bob >= alice)      # False

# Sorting works automatically!
students: list[Student] = [alice, bob, charlie]
students.sort()
print(students)  # [Student('Bob', gpa=3.5), Student('Alice', gpa=3.9), ...]
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Temperature with a value in celsius. Use @total_ordering to make Temperature objects comparable using ==, <, >, <=, >=. Then create a list of temperatures and sort them. Type-hint everything."</div>
</div>

---

## Arithmetic: `__add__`, `__sub__`, `__mul__`, `__truediv__`

You can make `+`, `-`, `*`, and `/` work with your objects.

```python
class Vector:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other: "Vector") -> "Vector":
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar: float) -> "Vector":
        return Vector(self.x * scalar, self.y * scalar)

    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"
```

Open your editor. Type this. Run it.

```python
class Vector:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other: "Vector") -> "Vector":
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar: float) -> "Vector":
        return Vector(self.x * scalar, self.y * scalar)

    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"

v1: Vector = Vector(1.0, 2.0)
v2: Vector = Vector(3.0, 4.0)

print(v1 + v2)    # Vector(4.0, 6.0)
print(v2 - v1)    # Vector(2.0, 2.0)
print(v1 * 3.0)   # Vector(3.0, 6.0)
```

### Practical Example: Money Class

```python
class Money:
    def __init__(self, amount: float, currency: str) -> None:
        self.amount: float = round(amount, 2)
        self.currency: str = currency

    def __add__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError(f"Cannot add {self.currency} and {other.currency}")
        return Money(self.amount + other.amount, self.currency)

    def __sub__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError(f"Cannot subtract {self.currency} and {other.currency}")
        return Money(self.amount - other.amount, self.currency)

    def __mul__(self, factor: float) -> "Money":
        return Money(self.amount * factor, self.currency)

    def __truediv__(self, divisor: float) -> "Money":
        if divisor == 0:
            raise ValueError("Cannot divide by zero")
        return Money(self.amount / divisor, self.currency)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount and self.currency == other.currency

    def __repr__(self) -> str:
        return f"Money({self.amount}, '{self.currency}')"

    def __str__(self) -> str:
        return f"${self.amount:.2f} {self.currency}"

price: Money = Money(29.99, "USD")
tax: Money = Money(2.40, "USD")
total: Money = price + tax
print(total)          # $32.39 USD
print(total * 2)      # $64.78 USD
print(total / 4)      # $8.10 USD
```

---

## Container Behavior: `__len__`, `__getitem__`, `__setitem__`, `__contains__`

These let your object behave like a list, dictionary, or other container.

```python
class Playlist:
    def __init__(self, name: str) -> None:
        self.name: str = name
        self._songs: list[str] = []

    def add(self, song: str) -> None:
        self._songs.append(song)

    def __len__(self) -> int:
        return len(self._songs)

    def __getitem__(self, index: int) -> str:
        return self._songs[index]

    def __setitem__(self, index: int, song: str) -> None:
        self._songs[index] = song

    def __contains__(self, song: str) -> bool:
        return song in self._songs

    def __repr__(self) -> str:
        return f"Playlist('{self.name}', {len(self._songs)} songs)"
```

Open your editor. Type this. Run it.

```python
class Playlist:
    def __init__(self, name: str) -> None:
        self.name: str = name
        self._songs: list[str] = []

    def add(self, song: str) -> None:
        self._songs.append(song)

    def __len__(self) -> int:
        return len(self._songs)

    def __getitem__(self, index: int) -> str:
        return self._songs[index]

    def __setitem__(self, index: int, song: str) -> None:
        self._songs[index] = song

    def __contains__(self, song: str) -> bool:
        return song in self._songs

    def __repr__(self) -> str:
        return f"Playlist('{self.name}', {len(self._songs)} songs)"

playlist: Playlist = Playlist("Road Trip")
playlist.add("Bohemian Rhapsody")
playlist.add("Hotel California")
playlist.add("Stairway to Heaven")

print(len(playlist))              # 3          -- __len__
print(playlist[0])                # Bohemian Rhapsody -- __getitem__
print("Hotel California" in playlist)  # True  -- __contains__

playlist[1] = "Imagine"           # __setitem__
print(playlist[1])                # Imagine
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called GradeBook that stores student names and grades as a list of tuples. Implement __len__ to return the number of students, __getitem__ to access a student by index, and __contains__ to check if a student name is in the grade book. Type-hint everything and test each operation."</div>
</div>

---

## Making Objects Iterable: `__iter__` and `__next__`

To use your object in a `for` loop, implement `__iter__` and `__next__`.

```python
class Countdown:
    def __init__(self, start: int) -> None:
        self.start: int = start
        self._current: int = start

    def __iter__(self) -> "Countdown":
        self._current = self.start
        return self

    def __next__(self) -> int:
        if self._current < 0:
            raise StopIteration
        value: int = self._current
        self._current -= 1
        return value

    def __repr__(self) -> str:
        return f"Countdown(start={self.start})"
```

Open your editor. Type this. Run it.

```python
class Countdown:
    def __init__(self, start: int) -> None:
        self.start: int = start
        self._current: int = start

    def __iter__(self) -> "Countdown":
        self._current = self.start
        return self

    def __next__(self) -> int:
        if self._current < 0:
            raise StopIteration
        value: int = self._current
        self._current -= 1
        return value

countdown: Countdown = Countdown(5)
for number in countdown:
    print(number)
# 5
# 4
# 3
# 2
# 1
# 0
```

`__iter__` returns the iterator (usually `self`). `__next__` returns the next value. When there are no more values, raise `StopIteration` to tell the `for` loop to stop.

---

## Context Managers: `__enter__` and `__exit__`

The `with` statement calls `__enter__` at the start and `__exit__` at the end. This is perfect for resources that need cleanup (files, connections, locks).

```python
class FileManager:
    def __init__(self, filename: str, mode: str) -> None:
        self.filename: str = filename
        self.mode: str = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        if self.file:
            self.file.close()
        return False  # Don't suppress exceptions
```

A simpler, more practical example -- a timer:

Open your editor. Type this. Run it.

```python
import time

class Timer:
    def __init__(self, label: str) -> None:
        self.label: str = label
        self._start: float = 0.0

    def __enter__(self) -> "Timer":
        self._start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        elapsed: float = time.time() - self._start
        print(f"{self.label}: {elapsed:.4f} seconds")
        return False

with Timer("Loop"):
    total: int = 0
    for i in range(1_000_000):
        total += i
    print(f"Sum: {total}")

# Sum: 499999500000
# Loop: 0.0523 seconds  (your time will vary)
```

The `with` block guarantees that `__exit__` runs, even if an error happens inside the block.

---

## Callable Objects: `__call__`

`__call__` lets you use an object as if it were a function.

```python
class Multiplier:
    def __init__(self, factor: int) -> None:
        self.factor: int = factor

    def __call__(self, value: int) -> int:
        return value * self.factor

double: Multiplier = Multiplier(2)
triple: Multiplier = Multiplier(3)

print(double(5))   # 10 -- calling the object like a function
print(triple(5))   # 15
```

This is useful for objects that need to remember state between calls:

```python
class CallCounter:
    def __init__(self) -> None:
        self.count: int = 0

    def __call__(self, message: str) -> str:
        self.count += 1
        return f"[Call #{self.count}] {message}"

logger: CallCounter = CallCounter()
print(logger("Starting"))    # [Call #1] Starting
print(logger("Processing"))  # [Call #2] Processing
print(logger("Done"))        # [Call #3] Done
print(f"Total calls: {logger.count}")  # Total calls: 3
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Validator that takes a minimum and maximum value in __init__. When called with a value, it returns True if the value is within range, False otherwise. Example: age_check = Validator(0, 150); age_check(25) returns True; age_check(200) returns False. Use type hints."</div>
</div>

---

## Hashing: `__hash__`

If you want to use your objects as dictionary keys or put them in sets, you need `__hash__`. Objects that compare equal must have the same hash.

**Important rule:** If you define `__eq__`, Python automatically sets `__hash__` to `None`, making your objects unhashable. You need to explicitly define `__hash__` to get it back.

```python
class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self) -> int:
        return hash((self.x, self.y))

    def __repr__(self) -> str:
        return f"Point({self.x}, {self.y})"

# Now you can use Points in sets and as dict keys
p1: Point = Point(1, 2)
p2: Point = Point(1, 2)
p3: Point = Point(3, 4)

point_set: set[Point] = {p1, p2, p3}
print(point_set)  # {Point(1, 2), Point(3, 4)} -- p1 and p2 are the same

distances: dict[Point, float] = {
    Point(0, 0): 0.0,
    Point(3, 4): 5.0,
}
print(distances[Point(3, 4)])  # 5.0
```

---

## Practical Example: Matrix Class

Open your editor. Type this. Run it.

```python
class Matrix:
    def __init__(self, rows: list[list[float]]) -> None:
        self._rows: list[list[float]] = rows
        self.num_rows: int = len(rows)
        self.num_cols: int = len(rows[0]) if rows else 0

    def __getitem__(self, index: tuple[int, int]) -> float:
        row, col = index
        return self._rows[row][col]

    def __setitem__(self, index: tuple[int, int], value: float) -> None:
        row, col = index
        self._rows[row][col] = value

    def __add__(self, other: "Matrix") -> "Matrix":
        if self.num_rows != other.num_rows or self.num_cols != other.num_cols:
            raise ValueError("Matrices must have the same dimensions")
        result: list[list[float]] = []
        for i in range(self.num_rows):
            row: list[float] = []
            for j in range(self.num_cols):
                row.append(self._rows[i][j] + other._rows[i][j])
            result.append(row)
        return Matrix(result)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Matrix):
            return NotImplemented
        return self._rows == other._rows

    def __len__(self) -> int:
        return self.num_rows * self.num_cols

    def __repr__(self) -> str:
        rows_str: str = ", ".join(str(row) for row in self._rows)
        return f"Matrix([{rows_str}])"

    def __str__(self) -> str:
        lines: list[str] = []
        for row in self._rows:
            lines.append("  ".join(f"{val:6.1f}" for val in row))
        return "\n".join(lines)

# Create matrices
m1: Matrix = Matrix([[1.0, 2.0], [3.0, 4.0]])
m2: Matrix = Matrix([[5.0, 6.0], [7.0, 8.0]])

# Use special methods
print(m1[0, 1])    # 2.0          -- __getitem__
print(len(m1))     # 4            -- __len__

m3: Matrix = m1 + m2               # __add__
print(m3)
#    6.0     8.0
#   10.0    12.0

m1[0, 0] = 99.0                    # __setitem__
print(m1[0, 0])    # 99.0
```

---

## Practical Example: Custom Collection

```python
from typing import Iterator

class UniqueList:
    """A list that only keeps unique items, in insertion order."""

    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        if item not in self._items:
            self._items.append(item)

    def __len__(self) -> int:
        return len(self._items)

    def __getitem__(self, index: int) -> str:
        return self._items[index]

    def __contains__(self, item: str) -> bool:
        return item in self._items

    def __iter__(self) -> Iterator[str]:
        return iter(self._items)

    def __repr__(self) -> str:
        return f"UniqueList({self._items})"

    def __str__(self) -> str:
        return ", ".join(self._items)

tags: UniqueList = UniqueList()
tags.add("python")
tags.add("coding")
tags.add("python")  # Duplicate -- ignored
tags.add("tutorial")

print(len(tags))           # 3
print("python" in tags)    # True
print(tags[1])             # coding

for tag in tags:
    print(f"Tag: {tag}")
# Tag: python
# Tag: coding
# Tag: tutorial
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Fraction with numerator and denominator (both int). Implement __add__, __mul__, __eq__, __repr__, and __str__. For __str__, display like '3/4'. For __add__, find a common denominator. Make sure two Fraction objects with the same value are equal even if they look different (2/4 == 1/2). Type-hint everything."</div>
</div>

---

## Where People Go Wrong

### Forgetting `__repr__`

Always define `__repr__`. Without it, debugging is painful because `print(my_object)` gives you `<MyClass object at 0x...>` which tells you nothing.

```python
# Always do at least this:
def __repr__(self) -> str:
    return f"MyClass(field1={self.field1!r}, field2={self.field2!r})"
```

### Inconsistent `__eq__` and `__hash__`

If two objects are equal (`__eq__` returns `True`), they MUST have the same hash. Otherwise, dictionaries and sets break.

```python
# BAD -- equal objects with different hashes
class BadPoint:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, BadPoint):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self) -> int:
        return id(self)  # WRONG! Equal objects get different hashes

# GOOD -- hash based on the same data as __eq__
class GoodPoint:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, GoodPoint):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self) -> int:
        return hash((self.x, self.y))  # Same fields used in __eq__
```

### Overloading Everything

Just because you can define `__add__` does not mean you should. Only implement special methods that make sense for your type.

```python
# Does this make sense?
class User:
    def __add__(self, other: "User") -> "User":
        # What does adding two users mean? Nothing sensible.
        pass

# Don't do it. Only add special methods that have a clear, obvious meaning.
```

If someone reading your code has to guess what `user1 + user2` means, do not define it. Use a regular method with a clear name like `merge_accounts()` instead.

---

## Quick Reference: Common Special Methods

| Operation | Method | Example |
|---|---|---|
| `print(obj)` | `__str__` | Human-readable string |
| `repr(obj)` | `__repr__` | Developer-readable string |
| `obj1 == obj2` | `__eq__` | Equality comparison |
| `obj1 < obj2` | `__lt__` | Less than |
| `obj1 + obj2` | `__add__` | Addition |
| `obj1 - obj2` | `__sub__` | Subtraction |
| `obj1 * obj2` | `__mul__` | Multiplication |
| `obj1 / obj2` | `__truediv__` | Division |
| `len(obj)` | `__len__` | Length |
| `obj[key]` | `__getitem__` | Indexing |
| `obj[key] = val` | `__setitem__` | Index assignment |
| `item in obj` | `__contains__` | Membership test |
| `for x in obj` | `__iter__` | Iteration |
| `obj(args)` | `__call__` | Callable object |
| `hash(obj)` | `__hash__` | Hashing (for dicts/sets) |
| `with obj` | `__enter__`/`__exit__` | Context manager |

---

## Summary

- Special methods (dunder methods) let your objects work with Python's built-in operations.
- `__str__` and `__repr__` control how your object appears when printed. Always define at least `__repr__`.
- `__eq__` compares values. Use `@total_ordering` to get all comparisons from just `__eq__` and `__lt__`.
- `__add__`, `__sub__`, `__mul__`, `__truediv__` let your objects work with arithmetic operators.
- `__len__`, `__getitem__`, `__contains__` make your object act like a container.
- `__iter__` and `__next__` make your object work in `for` loops.
- `__enter__` and `__exit__` make your object work with `with` statements.
- `__call__` makes your object callable like a function.
- `__hash__` must be consistent with `__eq__` for dict keys and sets.
- Only implement special methods that make clear sense for your type.

---

**Previous:** [[wiki:python-inheritance]] | **Next:** [[wiki:python-iterators-generators]]
