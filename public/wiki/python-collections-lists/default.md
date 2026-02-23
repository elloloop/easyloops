# Lists -- Ordered Collections of Things

So far, every variable you have created holds one value. One number. One string. One boolean. But real programs almost never work with just one thing. You have a list of students. A list of prices. A list of temperatures for the week. You need a way to store many values together, under one name. That is what a list is.

## What Is a Collection?

A collection is a single variable that holds multiple values. Instead of writing this:

```python
student1: str = "Alice"
student2: str = "Bob"
student3: str = "Charlie"
student4: str = "Dana"
```

You write this:

```python
students: list[str] = ["Alice", "Bob", "Charlie", "Dana"]
```

One variable. Four values. And if you need 400 students, you still use one variable. That is why collections exist -- they let you work with groups of related data without creating hundreds of separate variables.

## Creating Lists

A list is created with square brackets `[]`. You put the values inside, separated by commas.

```python
numbers: list[int] = [1, 2, 3, 4, 5]
names: list[str] = ["Alice", "Bob", "Charlie"]
prices: list[float] = [9.99, 14.50, 3.25]
flags: list[bool] = [True, False, True, True]
```

Open your editor. Type this. Run it.

```python
colors: list[str] = ["red", "green", "blue"]
print(colors)
print(type(colors))
```

You should see `['red', 'green', 'blue']` and `<class 'list'>`.

### Type Hints for Lists

The type hint tells you what kind of values live inside the list:

- `list[int]` -- a list of integers
- `list[str]` -- a list of strings
- `list[float]` -- a list of decimal numbers
- `list[bool]` -- a list of booleans

Always write the type hint. It tells anyone reading your code what to expect inside the list.

You can also have an empty list:

```python
empty: list[int] = []
```

This creates a list with nothing in it. You might add things to it later.

## Accessing Elements by Index

Every element in a list has a position number called an **index**. The first element is at index 0, not 1.

Why 0? Think of the index as "how many steps from the start." The first element is 0 steps from the start. The second is 1 step. The third is 2 steps.

```python
fruits: list[str] = ["apple", "banana", "cherry", "date"]
#                     index 0   index 1   index 2   index 3

print(fruits[0])  # apple
print(fruits[1])  # banana
print(fruits[2])  # cherry
print(fruits[3])  # date
```

Open your editor. Type this. Run it.

```python
animals: list[str] = ["cat", "dog", "fish", "bird"]
print(animals[0])
print(animals[2])
```

You should see `cat` and `fish`.

If you try to access an index that does not exist, Python crashes with an `IndexError`:

```python
animals: list[str] = ["cat", "dog", "fish"]
print(animals[5])  # IndexError: list index out of range
```

### Negative Indexing

Python lets you count from the end using negative numbers. `-1` is the last element, `-2` is second to last, and so on.

```python
letters: list[str] = ["a", "b", "c", "d", "e"]

print(letters[-1])  # e  (last)
print(letters[-2])  # d  (second to last)
print(letters[-3])  # c  (third to last)
```

This is very useful when you want the last element but you do not know how long the list is.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have `items: list[str] = ['x', 'y', 'z']`. What does `items[1]` give me? What about `items[-1]`? What happens if I try `items[3]`?"</div>
</div>

## How Many Elements? len()

The `len()` function tells you how many elements are in a list.

```python
numbers: list[int] = [10, 20, 30, 40]
count: int = len(numbers)
print(count)  # 4
```

Notice something important: the list has 4 elements, but the last index is 3 (because we start counting at 0). The last valid index is always `len(my_list) - 1`.

```python
names: list[str] = ["Alice", "Bob", "Charlie"]
last_index: int = len(names) - 1
print(names[last_index])  # Charlie
# Or just use negative indexing:
print(names[-1])           # Charlie
```

## Modifying Lists

Lists are **mutable** -- you can change them after you create them. This is a big deal. Not all collections work this way.

### Changing an Element

```python
scores: list[int] = [85, 90, 78, 92]
scores[2] = 88  # Change the third element
print(scores)    # [85, 90, 88, 92]
```

### Adding Elements

```python
fruits: list[str] = ["apple", "banana"]

# append() adds to the end
fruits.append("cherry")
print(fruits)  # ["apple", "banana", "cherry"]

# insert() adds at a specific position
fruits.insert(1, "blueberry")
print(fruits)  # ["apple", "blueberry", "banana", "cherry"]
```

### Removing Elements

```python
colors: list[str] = ["red", "green", "blue", "green"]

# remove() removes the first matching value
colors.remove("green")
print(colors)  # ["red", "blue", "green"]

# pop() removes by index and gives you the removed value
removed: str = colors.pop(1)
print(removed)  # blue
print(colors)   # ["red", "green"]

# pop() with no argument removes the last element
last: str = colors.pop()
print(last)    # green
print(colors)  # ["red"]
```

Open your editor. Type this. Run it.

```python
tasks: list[str] = ["wake up", "eat breakfast"]
tasks.append("go to work")
tasks.insert(1, "brush teeth")
print(tasks)
tasks.remove("eat breakfast")
print(tasks)
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Start with `nums: list[int] = [10, 20, 30]`. Write code that: 1) adds 40 to the end, 2) inserts 15 at index 1, 3) removes the value 30. What does the list look like after all three operations?"</div>
</div>

## Slicing

Slicing lets you grab a portion of a list. The syntax is `my_list[start:end]`, where `start` is included and `end` is excluded.

```python
letters: list[str] = ["a", "b", "c", "d", "e", "f"]

print(letters[1:4])   # ["b", "c", "d"]  (index 1, 2, 3 -- not 4)
print(letters[:3])    # ["a", "b", "c"]  (from the start to index 2)
print(letters[3:])    # ["d", "e", "f"]  (from index 3 to the end)
print(letters[:])     # ["a", "b", "c", "d", "e", "f"]  (a copy of everything)
```

Why is the end excluded? So that `letters[:3]` gives you 3 elements. The number of elements you get is always `end - start`.

### Slicing with a Step

You can add a third number for the step:

```python
numbers: list[int] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[::2])    # [0, 2, 4, 6, 8]  (every other element)
print(numbers[1::2])   # [1, 3, 5, 7, 9]  (every other, starting at 1)
print(numbers[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  (reversed)
```

The step `-1` reverses the list. This is a common trick.

## Iterating Over a List

This is where lists become truly powerful. You can go through every element, one at a time, and do something with it.

### While Loop (The Fundamental Way)

A while loop with a counter variable is the most explicit way to walk through a list. You control the index yourself.

```python
names: list[str] = ["Alice", "Bob", "Charlie", "Dana"]

i: int = 0
while i < len(names):
    print(f"Student {i}: {names[i]}")
    i += 1
```

This prints:
```
Student 0: Alice
Student 1: Bob
Student 2: Charlie
Student 3: Dana
```

You start at index 0. You keep going as long as `i` is less than the length of the list. Each time through, you use `names[i]` to get the current element, then increase `i` by 1.

Open your editor. Type this. Run it.

```python
prices: list[float] = [9.99, 14.50, 3.25, 7.80]
total: float = 0.0

i: int = 0
while i < len(prices):
    total += prices[i]
    i += 1

print(f"Total: ${total:.2f}")
```

### For Loop (The Shortcut)

Python gives you a shorter way to do the exact same thing:

```python
names: list[str] = ["Alice", "Bob", "Charlie", "Dana"]

for name in names:
    print(f"Student: {name}")
```

The `for` loop does the counter management for you. Each time through the loop, `name` automatically becomes the next element. No need to manage `i` yourself.

Here is the same total-prices example with a for loop:

```python
prices: list[float] = [9.99, 14.50, 3.25, 7.80]
total: float = 0.0

for price in prices:
    total += price

print(f"Total: ${total:.2f}")
```

Same result. Less code. But understand that behind the scenes, the same thing is happening -- going through each element one at a time.

### When You Need the Index

Sometimes you need both the element and its position. You can use `enumerate()`:

```python
fruits: list[str] = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

Or with a while loop, you already have the index:

```python
fruits: list[str] = ["apple", "banana", "cherry"]

i: int = 0
while i < len(fruits):
    print(f"{i}: {fruits[i]}")
    i += 1
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a while loop that goes through `temps: list[float] = [72.5, 68.0, 75.3, 80.1, 69.9]` and prints only the temperatures above 70. Then rewrite it as a for loop."</div>
</div>

## List Operations

### Concatenation (+)

You can combine two lists with `+`:

```python
first: list[int] = [1, 2, 3]
second: list[int] = [4, 5, 6]
combined: list[int] = first + second
print(combined)  # [1, 2, 3, 4, 5, 6]
```

### Repetition (*)

You can repeat a list with `*`:

```python
zeros: list[int] = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]
```

### Membership (in)

Check if a value exists in a list with `in`:

```python
colors: list[str] = ["red", "green", "blue"]

print("red" in colors)     # True
print("yellow" in colors)  # False
print("red" not in colors) # False
```

## Sorting

### sort() -- Changes the List In Place

```python
numbers: list[int] = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Reverse sort:
numbers.sort(reverse=True)
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]
```

### sorted() -- Returns a New List

```python
original: list[int] = [3, 1, 4, 1, 5]
new_sorted: list[int] = sorted(original)

print(original)    # [3, 1, 4, 1, 5]  (unchanged!)
print(new_sorted)  # [1, 1, 3, 4, 5]
```

The difference: `sort()` changes your list. `sorted()` gives you a new list and leaves the original alone.

## Copying Lists -- The Aliasing Trap

This is one of the most common mistakes beginners make. Watch carefully.

```python
a: list[int] = [1, 2, 3]
b: list[int] = a  # This does NOT copy the list!

b.append(4)
print(a)  # [1, 2, 3, 4]  -- wait, what?!
print(b)  # [1, 2, 3, 4]
```

When you write `b = a`, you are not copying the list. You are giving the same list a second name. Both `a` and `b` point to the exact same list in memory. Change one, and you change both. This is called **aliasing**.

To actually copy a list:

```python
a: list[int] = [1, 2, 3]

# Method 1: slice copy
b: list[int] = a[:]

# Method 2: list() constructor
c: list[int] = list(a)

# Method 3: .copy() method
d: list[int] = a.copy()

b.append(4)
print(a)  # [1, 2, 3]  (unchanged -- b is a real copy)
print(b)  # [1, 2, 3, 4]
```

Open your editor. Type this. Run it.

```python
original: list[str] = ["a", "b", "c"]
alias: list[str] = original
copy: list[str] = original[:]

alias.append("d")
copy.append("e")

print(f"original: {original}")
print(f"alias: {alias}")
print(f"copy: {copy}")
```

You should see that `original` and `alias` both have `"d"` added, but `copy` is independent.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between `b = a` and `b = a[:]` when `a` is a list? Write code that proves they behave differently by modifying `b` and checking what happens to `a`."</div>
</div>

## List of Lists (2D Structures)

A list can contain other lists. This is useful for grids, tables, or matrices.

```python
grid: list[list[int]] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access row 1, column 2:
print(grid[1][2])  # 6

# Row 0:
print(grid[0])  # [1, 2, 3]
```

To go through every element in a 2D list:

```python
grid: list[list[int]] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

row: int = 0
while row < len(grid):
    col: int = 0
    while col < len(grid[row]):
        print(grid[row][col], end=" ")
        col += 1
    print()  # new line after each row
    row += 1
```

Or with for loops:

```python
grid: list[list[int]] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in grid:
    for value in row:
        print(value, end=" ")
    print()
```

## Common Patterns

### Finding the Maximum

```python
numbers: list[int] = [45, 22, 89, 34, 67, 12]

maximum: int = numbers[0]
i: int = 1
while i < len(numbers):
    if numbers[i] > maximum:
        maximum = numbers[i]
    i += 1

print(f"Max: {maximum}")  # Max: 89

# Or just use the built-in:
print(max(numbers))  # 89
print(min(numbers))  # 12
```

### Filtering

```python
scores: list[int] = [85, 42, 91, 67, 38, 95, 73]
passing: list[int] = []

for score in scores:
    if score >= 60:
        passing.append(score)

print(passing)  # [85, 91, 67, 95, 73]
```

### Transforming

```python
prices: list[float] = [10.0, 20.0, 30.0, 40.0]
discounted: list[float] = []

for price in prices:
    discounted.append(price * 0.9)

print(discounted)  # [9.0, 18.0, 27.0, 36.0]
```

### Counting Occurrences

```python
grades: list[str] = ["A", "B", "A", "C", "B", "A", "B"]
count_a: int = 0

for grade in grades:
    if grade == "A":
        count_a += 1

print(f"Number of A's: {count_a}")  # Number of A's: 3

# Or use .count():
print(grades.count("A"))  # 3
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `values: list[int] = [3, 7, 2, 9, 1, 5, 8]`, write code using a while loop that builds a new list containing only values greater than 4. Then write the same thing using a for loop."</div>
</div>

## Where People Go Wrong

### Off-by-One Errors

The most common bug: using `<=` instead of `<` when looping.

```python
items: list[str] = ["a", "b", "c"]

# WRONG -- crashes on the last iteration
i: int = 0
while i <= len(items):  # should be < not <=
    print(items[i])     # IndexError when i == 3
    i += 1

# RIGHT
i = 0
while i < len(items):
    print(items[i])
    i += 1
```

### Mutation vs Reassignment

```python
# Mutation -- changes the list itself
numbers: list[int] = [1, 2, 3]
numbers.append(4)  # same list, now with 4 elements

# Reassignment -- creates a brand new list
numbers = [5, 6, 7]  # now points to a completely different list
```

### Modifying a List While Looping Over It

Never add or remove elements from a list while you are looping through it. It causes skipped elements or infinite loops.

```python
# WRONG -- do not do this
numbers: list[int] = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # modifying while iterating!

# RIGHT -- build a new list
numbers: list[int] = [1, 2, 3, 4, 5]
odds: list[int] = []
for num in numbers:
    if num % 2 != 0:
        odds.append(num)
print(odds)  # [1, 3, 5]
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a program that takes a list of test scores `scores: list[int] = [88, 45, 92, 67, 55, 73, 81, 39]` and creates two new lists: `passed` (scores 60 or above) and `failed` (scores below 60). Print both lists and the count of each."</div>
</div>

## Summary

- A list holds multiple values in order: `my_list: list[int] = [1, 2, 3]`
- Indexing starts at 0. Use `-1` for the last element.
- `len()` gives the number of elements.
- Lists are mutable: use `append()`, `insert()`, `remove()`, `pop()`.
- Slicing gives you a portion: `my_list[start:end]`.
- Use a while loop or for loop to walk through every element.
- `b = a` creates an alias, not a copy. Use `a[:]` or `a.copy()` for a real copy.
- Never modify a list while looping over it.

---

**Previous:** [[wiki:python-loops]] | **Next:** [[wiki:python-collections-dicts-sets]]
