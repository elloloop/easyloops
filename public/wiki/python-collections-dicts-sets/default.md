# Dictionaries and Sets -- Looking Things Up

Lists are great when you have an ordered collection and you access things by position. But what if you want to look something up by name? You have a student's name and you want their grade. You have a product code and you want its price. Position does not matter here -- what matters is the connection between a name and a value. That is what dictionaries are for.

## The Problem: Looking Things Up

Imagine you have a list of student names and a list of their scores:

```python
names: list[str] = ["Alice", "Bob", "Charlie"]
scores: list[int] = [92, 85, 78]
```

To find Bob's score, you have to search through the names list, find Bob's position, then use that position in the scores list. That works, but it is clumsy and slow. What you really want is to say "give me Bob's score" directly.

## What Is a Dictionary?

A dictionary stores **key-value pairs**. Each key maps to one value. You look things up by key, not by position.

```python
ages: dict[str, int] = {"alice": 30, "bob": 25, "charlie": 35}
```

Here, `"alice"` is a key and `30` is its value. `"bob"` is a key and `25` is its value. You can jump straight to any value if you know the key.

## Creating Dictionaries

Use curly braces `{}` with `key: value` pairs separated by commas.

```python
# Student grades
grades: dict[str, str] = {
    "Alice": "A",
    "Bob": "B",
    "Charlie": "A",
    "Dana": "C"
}

# Product prices
prices: dict[str, float] = {
    "apple": 1.50,
    "banana": 0.75,
    "cherry": 3.00
}

# Word counts
counts: dict[str, int] = {
    "hello": 5,
    "world": 3,
    "python": 8
}
```

Open your editor. Type this. Run it.

```python
phone_book: dict[str, str] = {
    "Alice": "555-1234",
    "Bob": "555-5678",
    "Charlie": "555-9999"
}
print(phone_book)
print(type(phone_book))
```

### Type Hints for Dictionaries

The type hint has two parts: the key type and the value type.

- `dict[str, int]` -- string keys, integer values
- `dict[str, str]` -- string keys, string values
- `dict[str, float]` -- string keys, float values
- `dict[str, list[int]]` -- string keys, list-of-integers values
- `dict[int, str]` -- integer keys, string values

An empty dictionary:

```python
empty: dict[str, int] = {}
```

## Accessing Values

Use square brackets with the key:

```python
grades: dict[str, str] = {"Alice": "A", "Bob": "B", "Charlie": "A"}

print(grades["Alice"])    # A
print(grades["Charlie"])  # A
```

But if the key does not exist, you get a `KeyError`:

```python
print(grades["Eve"])  # KeyError: 'Eve'
```

### Safe Access with .get()

The `.get()` method returns `None` if the key is missing, instead of crashing:

```python
grades: dict[str, str] = {"Alice": "A", "Bob": "B"}

result: str | None = grades.get("Alice")
print(result)  # A

result = grades.get("Eve")
print(result)  # None

# You can set a default value:
result = grades.get("Eve", "N/A")
print(result)  # N/A
```

Open your editor. Type this. Run it.

```python
ages: dict[str, int] = {"Alice": 30, "Bob": 25}
print(ages.get("Alice", 0))
print(ages.get("Charlie", 0))
```

You should see `30` and `0`.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between `my_dict['key']` and `my_dict.get('key')`? When would you use `.get()` instead of square brackets?"</div>
</div>

## Adding and Modifying Values

Just assign to a key. If the key exists, the value gets updated. If it does not exist, a new pair is created.

```python
scores: dict[str, int] = {"Alice": 92, "Bob": 85}

# Modify an existing key
scores["Bob"] = 90
print(scores)  # {"Alice": 92, "Bob": 90}

# Add a new key
scores["Charlie"] = 78
print(scores)  # {"Alice": 92, "Bob": 90, "Charlie": 78}
```

## Removing Values

```python
data: dict[str, int] = {"a": 1, "b": 2, "c": 3}

# del removes a key-value pair
del data["b"]
print(data)  # {"a": 1, "c": 3}

# .pop() removes and returns the value
removed: int = data.pop("a")
print(removed)  # 1
print(data)     # {"c": 3}

# .pop() with a default (safe -- no error if key missing)
result: int = data.pop("z", 0)
print(result)  # 0
```

## Checking If a Key Exists

Use `in` to check for keys:

```python
inventory: dict[str, int] = {"apples": 5, "bananas": 3, "cherries": 8}

if "apples" in inventory:
    print(f"We have {inventory['apples']} apples")

if "grapes" not in inventory:
    print("No grapes in stock")
```

This is important. Always check before accessing if you are not sure the key exists.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `stock: dict[str, int] = {'pen': 10, 'paper': 50}`, write code that: 1) adds 'eraser' with value 20, 2) changes 'pen' to 15, 3) removes 'paper', 4) checks if 'pencil' exists and prints a message either way."</div>
</div>

## Iterating Over Dictionaries

Dictionaries give you three ways to look at their contents:

- `.keys()` -- all the keys
- `.values()` -- all the values
- `.items()` -- all key-value pairs together

### While Loop Pattern

To iterate with a while loop, you first convert the keys to a list:

```python
ages: dict[str, int] = {"Alice": 30, "Bob": 25, "Charlie": 35}

keys: list[str] = list(ages.keys())
i: int = 0
while i < len(keys):
    key: str = keys[i]
    value: int = ages[key]
    print(f"{key} is {value} years old")
    i += 1
```

### For Loop Pattern

The for loop makes this much cleaner:

```python
ages: dict[str, int] = {"Alice": 30, "Bob": 25, "Charlie": 35}

# Loop through keys
for name in ages:
    print(f"{name} is {ages[name]} years old")

# Loop through key-value pairs (cleaner)
for name, age in ages.items():
    print(f"{name} is {age} years old")

# Loop through just values
for age in ages.values():
    print(age)
```

Open your editor. Type this. Run it.

```python
menu: dict[str, float] = {
    "coffee": 3.50,
    "tea": 2.50,
    "juice": 4.00,
    "water": 1.00
}

print("--- Menu ---")
for item, price in menu.items():
    print(f"{item}: ${price:.2f}")
```

## Common Dictionary Patterns

### Counting

Count how many times each thing appears:

```python
words: list[str] = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts: dict[str, int] = {}

for word in words:
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1

print(counts)  # {"apple": 3, "banana": 2, "cherry": 1}
```

Or using `.get()` to simplify:

```python
words: list[str] = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts: dict[str, int] = {}

for word in words:
    counts[word] = counts.get(word, 0) + 1

print(counts)  # {"apple": 3, "banana": 2, "cherry": 1}
```

### Grouping

Group items by some property:

```python
students: list[dict[str, str]] = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
    {"name": "Dana", "grade": "B"},
    {"name": "Eve", "grade": "A"}
]

by_grade: dict[str, list[str]] = {}

for student in students:
    grade: str = student["grade"]
    name: str = student["name"]
    if grade not in by_grade:
        by_grade[grade] = []
    by_grade[grade].append(name)

print(by_grade)
# {"A": ["Alice", "Charlie", "Eve"], "B": ["Bob", "Dana"]}
```

### Caching (Remembering Past Results)

```python
cache: dict[int, int] = {}

def slow_square(n: int) -> int:
    if n in cache:
        print(f"Cache hit for {n}")
        return cache[n]

    print(f"Computing {n} * {n}")
    result: int = n * n
    cache[n] = result
    return result

print(slow_square(5))  # Computing 5 * 5 -> 25
print(slow_square(5))  # Cache hit for 5 -> 25
print(slow_square(3))  # Computing 3 * 3 -> 9
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `letters: list[str] = ['a', 'b', 'a', 'c', 'b', 'a', 'b', 'c', 'c', 'c']`, write code that counts how many times each letter appears using a dictionary. What is the result?"</div>
</div>

## Sets -- Unique Elements Only

A set is a collection that holds only unique values. If you add a duplicate, it is ignored. Sets have no order -- you cannot access elements by index.

### Creating Sets

```python
unique_numbers: set[int] = {1, 2, 3, 4, 5}
print(unique_numbers)  # {1, 2, 3, 4, 5}

# Duplicates are removed automatically:
numbers: set[int] = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3}
```

Be careful: `{}` creates an empty **dictionary**, not a set. For an empty set, use `set()`:

```python
empty_dict: dict[str, int] = {}     # this is a dictionary
empty_set: set[int] = set()          # this is a set
```

### Type Hints for Sets

- `set[int]` -- a set of integers
- `set[str]` -- a set of strings

### Adding and Removing from Sets

```python
colors: set[str] = {"red", "green", "blue"}

colors.add("yellow")
print(colors)  # {"red", "green", "blue", "yellow"} (order may vary)

colors.add("red")  # already exists -- no effect
print(colors)

colors.discard("green")  # remove if exists, no error if not
colors.remove("blue")    # remove, but KeyError if not found
print(colors)
```

### Removing Duplicates from a List

One of the most common uses of sets:

```python
names: list[str] = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]
unique_names: list[str] = list(set(names))
print(unique_names)  # ["Alice", "Bob", "Charlie"] (order may vary)
```

### Set Operations

Sets support math-like operations:

```python
a: set[int] = {1, 2, 3, 4, 5}
b: set[int] = {4, 5, 6, 7, 8}

# Union: everything in either set
print(a | b)  # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersection: only things in BOTH sets
print(a & b)  # {4, 5}

# Difference: things in a but not in b
print(a - b)  # {1, 2, 3}

# Symmetric difference: things in one but not both
print(a ^ b)  # {1, 2, 3, 6, 7, 8}
```

Open your editor. Type this. Run it.

```python
enrolled_math: set[str] = {"Alice", "Bob", "Charlie", "Dana"}
enrolled_science: set[str] = {"Bob", "Charlie", "Eve", "Frank"}

both: set[str] = enrolled_math & enrolled_science
print(f"Taking both: {both}")

only_math: set[str] = enrolled_math - enrolled_science
print(f"Only math: {only_math}")

all_students: set[str] = enrolled_math | enrolled_science
print(f"All students: {all_students}")
```

### Checking Membership

The `in` operator is very fast on sets (much faster than on lists):

```python
allowed: set[str] = {"admin", "editor", "viewer"}

role: str = "editor"
if role in allowed:
    print("Access granted")
else:
    print("Access denied")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `team_a: set[str] = {'Alice', 'Bob', 'Charlie'}` and `team_b: set[str] = {'Bob', 'Dana', 'Eve'}`, what does `team_a & team_b` give you? What about `team_a | team_b`? What about `team_a - team_b`?"</div>
</div>

## When to Use List vs Dict vs Set

Here is a simple guide:

| Use a... | When you need... | Example |
|----------|------------------|---------|
| **List** | Ordered items, duplicates OK, access by position | Shopping cart items |
| **Dict** | Look up values by a unique key | Student grades by name |
| **Set** | Unique items only, fast membership checks | Allowed usernames |

Ask yourself these questions:
1. Do I need to look things up by name? Use a **dict**.
2. Do I need only unique values? Use a **set**.
3. Do I need order and/or duplicates? Use a **list**.

## Where People Go Wrong

### Mutable Keys

Dictionary keys must be something that cannot change (immutable). Strings, numbers, and tuples work. Lists do not.

```python
# This works:
valid: dict[str, int] = {"alice": 1}
also_valid: dict[tuple[int, int], str] = {(0, 0): "origin"}

# This crashes:
# bad: dict[list[int], str] = {[1, 2]: "nope"}  # TypeError!
```

### KeyError

Always check if a key exists before using it, or use `.get()`:

```python
data: dict[str, int] = {"a": 1, "b": 2}

# WRONG -- crashes if key missing
# print(data["c"])  # KeyError: 'c'

# RIGHT
print(data.get("c", 0))  # 0
```

### Thinking Dicts Are Ordered

In modern Python (3.7+), dictionaries do remember insertion order. But you should not rely on this for logic. If you need a sorted order, sort the keys yourself:

```python
ages: dict[str, int] = {"Charlie": 35, "Alice": 30, "Bob": 25}

for name in sorted(ages.keys()):
    print(f"{name}: {ages[name]}")
# Alice: 30
# Bob: 25
# Charlie: 35
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "You have a list of words: `words: list[str] = ['the', 'cat', 'sat', 'on', 'the', 'mat', 'the', 'cat']`. Write code that: 1) counts how many times each word appears (use a dict), 2) finds all unique words (use a set), 3) prints the words in alphabetical order with their counts."</div>
</div>

## Summary

- A dictionary maps keys to values: `my_dict: dict[str, int] = {"a": 1}`
- Access values with `my_dict["key"]` or safely with `my_dict.get("key")`.
- Use `.items()` to loop through key-value pairs together.
- A set holds only unique values: `my_set: set[int] = {1, 2, 3}`
- Sets support union (`|`), intersection (`&`), and difference (`-`).
- Use dicts to look things up by name. Use sets for uniqueness. Use lists for ordered sequences.

---

**Previous:** [[wiki:python-collections-lists]] | **Next:** [[wiki:python-strings]]
