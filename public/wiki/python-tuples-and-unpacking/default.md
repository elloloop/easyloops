# Tuples and Unpacking -- Fixed Collections

You now know lists, dictionaries, and sets. There is one more collection type you need: the **tuple**. A tuple is like a list, but once you create it, you cannot change it. No adding, no removing, no modifying. It is locked in place. That sounds limiting, but it turns out to be extremely useful.

## What Is a Tuple?

A tuple is an ordered, immutable sequence of values. You create one with parentheses `()`:

```python
point: tuple[int, int] = (3, 4)
print(point)     # (3, 4)
print(type(point))  # <class 'tuple'>
```

You can access elements by index, just like a list:

```python
point: tuple[int, int] = (3, 4)
print(point[0])  # 3
print(point[1])  # 4
```

But you cannot change them:

```python
point: tuple[int, int] = (3, 4)
# point[0] = 5  # TypeError: 'tuple' object does not support item assignment
```

Open your editor. Type this. Run it.

```python
color: tuple[int, int, int] = (255, 128, 0)
print(color)
print(color[0])
print(color[1])
print(color[2])
print(len(color))
```

You should see the RGB values for orange and a length of 3.

## Creating Tuples

```python
# With parentheses
coordinates: tuple[float, float] = (3.5, 7.2)

# Tuples can hold different types
person: tuple[str, int, str] = ("Alice", 30, "New York")

# You can also create a tuple without parentheses (tuple packing)
dimensions: tuple[int, int, int] = 10, 20, 30
print(dimensions)       # (10, 20, 30)
print(type(dimensions)) # <class 'tuple'>
```

The parentheses are optional in many cases. Python sees the commas and knows you mean a tuple. But using parentheses makes your code clearer.

### The Empty Tuple and Single-Element Tuple

```python
# Empty tuple
empty: tuple[()] = ()

# Single-element tuple -- THE COMMA IS REQUIRED
single: tuple[int] = (42,)
print(single)       # (42,)
print(type(single)) # <class 'tuple'>

# Without the comma, it is just a number in parentheses
not_a_tuple: int = (42)
print(not_a_tuple)       # 42
print(type(not_a_tuple)) # <class 'int'>
```

This is one of the trickiest things in Python. `(42)` is just the number 42 with parentheses around it (like in math). `(42,)` with the trailing comma is a tuple containing the number 42. The comma makes all the difference.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between `x = (42)` and `x = (42,)`? What type is each one? Why does this matter?"</div>
</div>

## Type Hints for Tuples

Tuple type hints are different from list type hints. You specify the type of **each position**:

```python
# Each position has a specific type
point: tuple[int, int] = (3, 4)
person: tuple[str, int, bool] = ("Alice", 30, True)
record: tuple[str, str, float] = ("Widget", "A123", 9.99)
```

For a tuple where all elements are the same type and the length can vary, use `...`:

```python
# Variable-length tuple of all the same type
numbers: tuple[int, ...] = (1, 2, 3, 4, 5)
names: tuple[str, ...] = ("Alice", "Bob", "Charlie")
empty_ints: tuple[int, ...] = ()
```

The difference:
- `tuple[int, int]` -- exactly 2 integers
- `tuple[int, ...]` -- any number of integers (including zero)

## Why Use Tuples?

If tuples are just lists you cannot change, why bother? There are several good reasons.

### 1. When Data Should Not Change

Some data is naturally fixed. A date has a year, month, and day. A coordinate has an x and y. An RGB color has three values. These should not change after creation.

```python
birthday: tuple[int, int, int] = (1990, 5, 15)  # year, month, day
origin: tuple[float, float] = (0.0, 0.0)
white: tuple[int, int, int] = (255, 255, 255)
```

Using a tuple makes your intention clear: this data is fixed.

### 2. As Dictionary Keys

Lists cannot be dictionary keys because they are mutable. Tuples can.

```python
# Track which seats are taken in a theater
# Seat is identified by (row, number)
taken_seats: dict[tuple[int, int], str] = {
    (1, 5): "Alice",
    (1, 6): "Bob",
    (3, 10): "Charlie"
}

print(taken_seats[(1, 5)])  # Alice

# Check if a seat is taken
seat: tuple[int, int] = (3, 10)
if seat in taken_seats:
    print(f"Seat {seat} is taken by {taken_seats[seat]}")
```

### 3. Returning Multiple Values from Functions

This is one of the most common uses of tuples:

```python
def divide(a: int, b: int) -> tuple[int, int]:
    quotient: int = a // b
    remainder: int = a % b
    return (quotient, remainder)

result: tuple[int, int] = divide(17, 5)
print(result)     # (3, 2)
print(result[0])  # 3 (quotient)
print(result[1])  # 2 (remainder)
```

Open your editor. Type this. Run it.

```python
def min_max(numbers: list[int]) -> tuple[int, int]:
    smallest: int = numbers[0]
    largest: int = numbers[0]

    i: int = 1
    while i < len(numbers):
        if numbers[i] < smallest:
            smallest = numbers[i]
        if numbers[i] > largest:
            largest = numbers[i]
        i += 1

    return (smallest, largest)

values: list[int] = [45, 22, 89, 34, 67, 12]
low, high = min_max(values)
print(f"Min: {low}, Max: {high}")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a function `first_and_last(items: list[str]) -> tuple[str, str]` that returns the first and last elements of a list as a tuple. What happens if the list has only one element?"</div>
</div>

## Tuple Unpacking

Unpacking is taking a tuple apart and assigning each element to a separate variable. This is one of the most useful features in Python.

```python
point: tuple[int, int] = (3, 4)
x, y = point
print(x)  # 3
print(y)  # 4
```

The number of variables on the left must match the number of elements in the tuple:

```python
person: tuple[str, int, str] = ("Alice", 30, "New York")
name, age, city = person
print(name)  # Alice
print(age)   # 30
print(city)  # New York
```

If the count does not match, you get an error:

```python
point: tuple[int, int] = (3, 4)
# x, y, z = point  # ValueError: not enough values to unpack
```

### Unpacking Function Return Values

This is why functions returning tuples is so powerful:

```python
def divide(a: int, b: int) -> tuple[int, int]:
    return (a // b, a % b)

quotient, remainder = divide(17, 5)
print(f"17 / 5 = {quotient} remainder {remainder}")
```

You do not need to store the tuple first and then access elements by index. You grab all the values in one line.

### Unpacking in Loops

When iterating over a list of tuples, you can unpack each tuple right in the loop:

```python
students: list[tuple[str, int]] = [
    ("Alice", 92),
    ("Bob", 85),
    ("Charlie", 78),
    ("Dana", 95)
]

# While loop with unpacking
i: int = 0
while i < len(students):
    name, score = students[i]
    print(f"{name}: {score}")
    i += 1
```

With a for loop:

```python
students: list[tuple[str, int]] = [
    ("Alice", 92),
    ("Bob", 85),
    ("Charlie", 78),
    ("Dana", 95)
]

for name, score in students:
    print(f"{name}: {score}")
```

This also works with dictionary `.items()`:

```python
ages: dict[str, int] = {"Alice": 30, "Bob": 25, "Charlie": 35}

for name, age in ages.items():
    print(f"{name} is {age}")
```

When you call `.items()`, each pair comes back as a tuple `("Alice", 30)`, and the `for name, age` unpacks it.

Open your editor. Type this. Run it.

```python
menu: list[tuple[str, float]] = [
    ("Coffee", 3.50),
    ("Tea", 2.50),
    ("Juice", 4.00),
    ("Water", 1.00)
]

total: float = 0.0
for item, price in menu:
    print(f"{item}: ${price:.2f}")
    total += price

print(f"Total: ${total:.2f}")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `pairs: list[tuple[str, int]] = [('a', 1), ('b', 2), ('c', 3)]`, write a for loop that unpacks each tuple and prints the letter and number. Then write the same thing as a while loop."</div>
</div>

## The Swap Trick

Normally, swapping two variables requires a temporary variable:

```python
a: int = 10
b: int = 20

temp: int = a
a = b
b = temp

print(a)  # 20
print(b)  # 10
```

Python lets you do this in one line using tuple unpacking:

```python
a: int = 10
b: int = 20

a, b = b, a

print(a)  # 20
print(b)  # 10
```

What happens here: `b, a` creates a tuple `(20, 10)`, and then `a, b = (20, 10)` unpacks it. Both sides are evaluated before any assignment happens, so it works perfectly.

This is not just a cute trick. You will use this in sorting algorithms and many other places.

```python
# Swap elements in a list
numbers: list[int] = [5, 3, 8, 1]
numbers[0], numbers[1] = numbers[1], numbers[0]
print(numbers)  # [3, 5, 8, 1]
```

## Named Tuples

Regular tuples use index numbers to access elements, which can be confusing:

```python
person: tuple[str, int, str] = ("Alice", 30, "New York")
print(person[0])  # What is index 0 again? Name? Age?
```

Named tuples let you access elements by name:

```python
from collections import namedtuple

Person = namedtuple("Person", ["name", "age", "city"])

alice: Person = Person(name="Alice", age=30, city="New York")
print(alice.name)  # Alice
print(alice.age)   # 30
print(alice.city)  # New York

# You can still use index access
print(alice[0])  # Alice

# They are still immutable
# alice.age = 31  # AttributeError
```

Open your editor. Type this. Run it.

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])

origin: Point = Point(x=0, y=0)
target: Point = Point(x=3, y=4)

print(f"Origin: ({origin.x}, {origin.y})")
print(f"Target: ({target.x}, {target.y})")

# Calculate distance
dx: float = target.x - origin.x
dy: float = target.y - origin.y
distance: float = (dx**2 + dy**2) ** 0.5
print(f"Distance: {distance:.2f}")
```

Named tuples give you the safety of tuples (immutable) with the readability of using names instead of index numbers.

## Tuple vs List -- When to Use Which

| Feature | Tuple | List |
|---------|-------|------|
| Mutable? | No | Yes |
| Syntax | `(1, 2, 3)` | `[1, 2, 3]` |
| Can be dict key? | Yes | No |
| Typical use | Fixed data, return values | Collections you modify |
| Performance | Slightly faster | Slightly slower |

Ask yourself:
1. Will I need to add, remove, or change elements? Use a **list**.
2. Is this a fixed group of values that belong together (like coordinates)? Use a **tuple**.
3. Do I need this as a dictionary key? Must be a **tuple**.
4. Am I returning multiple values from a function? Use a **tuple**.

## Packing and Unpacking with *

The `*` operator lets you capture "the rest" of the elements:

```python
numbers: tuple[int, ...] = (1, 2, 3, 4, 5)

first, *rest = numbers
print(first)  # 1
print(rest)   # [2, 3, 4, 5]  (note: rest is a list, not a tuple)

first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

*start, last = numbers
print(start)  # [1, 2, 3, 4]
print(last)   # 5
```

This works with any sequence, not just tuples:

```python
first, *rest = [10, 20, 30, 40]
print(first)  # 10
print(rest)   # [20, 30, 40]
```

A practical example -- processing a header line:

```python
line: str = "Name Age City Country"
parts: list[str] = line.split()

header, *columns = parts
print(header)   # Name
print(columns)  # ["Age", "City", "Country"]
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `data: tuple[int, ...] = (10, 20, 30, 40, 50)`, what do you get from `first, *middle, last = data`? What types are `first`, `middle`, and `last`?"</div>
</div>

## Tuples and Iteration

You can iterate over tuples the same way you iterate over lists.

### While Loop

```python
colors: tuple[str, ...] = ("red", "green", "blue", "yellow")

i: int = 0
while i < len(colors):
    print(f"Color {i}: {colors[i]}")
    i += 1
```

### For Loop

```python
colors: tuple[str, ...] = ("red", "green", "blue", "yellow")

for color in colors:
    print(color)
```

### Useful Tuple Methods

Tuples have very few methods (because they cannot be changed), but two are useful:

```python
numbers: tuple[int, ...] = (3, 1, 4, 1, 5, 9, 2, 6, 5)

# count() -- how many times a value appears
print(numbers.count(1))  # 2
print(numbers.count(5))  # 2
print(numbers.count(7))  # 0

# index() -- find the position of a value
print(numbers.index(4))  # 2  (first occurrence at index 2)
print(numbers.index(5))  # 4  (first occurrence at index 4)
```

## Practical Examples

### Returning Multiple Values

```python
def analyze_scores(scores: list[int]) -> tuple[float, int, int]:
    total: int = 0
    i: int = 0
    while i < len(scores):
        total += scores[i]
        i += 1

    average: float = total / len(scores)
    highest: int = max(scores)
    lowest: int = min(scores)
    return (average, highest, lowest)

test_scores: list[int] = [85, 92, 78, 95, 88]
avg, high, low = analyze_scores(test_scores)
print(f"Average: {avg:.1f}")
print(f"Highest: {high}")
print(f"Lowest: {low}")
```

### Using Tuples as Dictionary Keys

```python
# Track scores for each game between two teams
game_scores: dict[tuple[str, str], int] = {}

game_scores[("Lions", "Tigers")] = 3
game_scores[("Tigers", "Bears")] = 1
game_scores[("Bears", "Lions")] = 2

matchup: tuple[str, str] = ("Lions", "Tigers")
if matchup in game_scores:
    print(f"{matchup[0]} vs {matchup[1]}: {game_scores[matchup]} points")
```

### Sorting with Tuples

When you have pairs of data, tuples sort by first element, then by second:

```python
students: list[tuple[str, int]] = [
    ("Charlie", 78),
    ("Alice", 92),
    ("Bob", 85),
    ("Dana", 92)
]

students_sorted: list[tuple[str, int]] = sorted(students)
for name, score in students_sorted:
    print(f"{name}: {score}")
# Alice: 92
# Bob: 85
# Charlie: 78
# Dana: 92
```

To sort by score instead of name:

```python
students: list[tuple[str, int]] = [
    ("Charlie", 78),
    ("Alice", 92),
    ("Bob", 85),
    ("Dana", 92)
]

# Sort by the second element (score)
by_score: list[tuple[str, int]] = sorted(students, key=lambda s: s[1])
for name, score in by_score:
    print(f"{name}: {score}")
# Charlie: 78
# Bob: 85
# Alice: 92
# Dana: 92
```

Open your editor. Type this. Run it.

```python
inventory: list[tuple[str, int, float]] = [
    ("Widget", 50, 9.99),
    ("Gadget", 30, 14.99),
    ("Doohickey", 100, 4.99),
    ("Thingamajig", 20, 24.99)
]

print("--- Inventory Report ---")
for name, quantity, price in inventory:
    value: float = quantity * price
    print(f"{name}: {quantity} units @ ${price:.2f} = ${value:.2f}")

# Find total inventory value
total: float = 0.0
for name, quantity, price in inventory:
    total += quantity * price

print(f"\nTotal inventory value: ${total:.2f}")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a function `split_list(items: list[int]) -> tuple[list[int], list[int]]` that takes a list of numbers and returns two lists: one with even numbers and one with odd numbers. Use tuple unpacking to capture the result."</div>
</div>

## Where People Go Wrong

### Forgetting the Comma in Single-Element Tuples

This is the number one tuple mistake:

```python
# WRONG -- this is just an int
not_tuple: int = (42)
print(type(not_tuple))  # <class 'int'>

# RIGHT -- the comma makes it a tuple
actual_tuple: tuple[int] = (42,)
print(type(actual_tuple))  # <class 'tuple'>
```

### Trying to Modify a Tuple

```python
point: tuple[int, int] = (3, 4)
# point[0] = 5        # TypeError!
# point.append(6)     # AttributeError! Tuples have no append
# point.remove(3)     # AttributeError! Tuples have no remove
```

If you need to "change" a tuple, create a new one:

```python
point: tuple[int, int] = (3, 4)
new_point: tuple[int, int] = (5, point[1])
print(new_point)  # (5, 4)
```

### Wrong Number of Variables When Unpacking

```python
data: tuple[int, int, int] = (1, 2, 3)

# WRONG -- too few variables
# a, b = data  # ValueError: too many values to unpack

# WRONG -- too many variables
# a, b, c, d = data  # ValueError: not enough values to unpack

# RIGHT
a, b, c = data

# Or use * to capture extras
first, *rest = data
```

### Confusing Tuples and Lists

Remember the key difference: tuples are for fixed, related data (like a coordinate pair or a record). Lists are for collections of similar items that may grow or shrink.

```python
# Good use of tuple -- a fixed record
employee: tuple[str, int, str] = ("Alice", 50000, "Engineering")

# Good use of list -- a collection that changes
employees: list[tuple[str, int, str]] = [
    ("Alice", 50000, "Engineering"),
    ("Bob", 45000, "Marketing"),
    ("Charlie", 55000, "Engineering")
]

# You can add to the list
employees.append(("Dana", 48000, "Sales"))
# But you cannot change any individual tuple
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "You have `records: list[tuple[str, float]] = [('Alice', 85.5), ('Bob', 92.0), ('Charlie', 78.3)]`. Write code that: 1) prints each name and score using unpacking, 2) finds the student with the highest score, 3) calculates the average score. Use a while loop for at least one of these tasks."</div>
</div>

## Summary

- A tuple is an immutable, ordered sequence: `my_tuple: tuple[int, int] = (3, 4)`.
- Create with parentheses. Single-element tuples need a comma: `(42,)`.
- Use tuples for fixed data, dictionary keys, and function return values.
- Unpacking assigns each element to a variable: `x, y = point`.
- Unpacking works in loops: `for name, score in students:`.
- The swap trick uses tuple unpacking: `a, b = b, a`.
- Use `*` to capture remaining elements: `first, *rest = data`.
- Named tuples add readability: access by name instead of index.

---

**Previous:** [[wiki:python-strings]] | **Next:** [[wiki:python-functions]]
