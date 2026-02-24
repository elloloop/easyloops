# Tuples and Unpacking: Sealed Packages of Data

You already know about lists — collections of items you can change whenever you want. Now meet the **tuple**: a list's more cautious cousin. A tuple holds items in order, just like a list, but once you create it, **you can't change it**.

![A flat vector illustration in a children's educational book style showing Byte the robot holding a sealed gift box with a transparent window revealing three colorful items inside, representing a tuple. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Tuple?

A **tuple** is like a **list that you sealed shut**. You can look at what's inside, but you can't add, remove, or change any item.

Here's a good way to think about it:

- A **list** is a **whiteboard** — you can erase things and write new things whenever you want.
- A **tuple** is a **printed poster** — once it's printed, the content is fixed.

```python
# This is a list (square brackets)
my_list = [1, 2, 3]

# This is a tuple (parentheses)
my_tuple = (1, 2, 3)
```

You can read from both the same way:

```python
print(my_list[0])    # 1
print(my_tuple[0])   # 1
```

But if you try to change a tuple:

```python
my_tuple[0] = 99   # ERROR! Tuples don't allow this!
```

Python will say: `TypeError: 'tuple' object does not support item assignment`

---

## Creating Tuples

There are a few ways to make a tuple.

### With Parentheses

```python
coordinates = (3, 7)
rgb_color = (255, 128, 0)
student = ("Byte", 95, "A")
```

### With Just Commas (No Parentheses Needed!)

Python actually uses the **commas** to decide something is a tuple, not the parentheses. The parentheses just make it easier to read.

```python
coordinates = 3, 7
print(type(coordinates))   # <class 'tuple'>
```

### From Another Sequence

```python
my_tuple = tuple([1, 2, 3])        # From a list
my_tuple = tuple("hello")           # From a string: ('h', 'e', 'l', 'l', 'o')
```

---

## The Single-Element Trap

This is one of the trickiest things in Python. Watch out!

```python
# This is NOT a tuple — it's just the number 42 in parentheses
not_a_tuple = (42)
print(type(not_a_tuple))   # <class 'int'>

# THIS is a tuple with one element — notice the comma!
is_a_tuple = (42,)
print(type(is_a_tuple))    # <class 'tuple'>
```

That tiny comma makes all the difference. Without it, Python thinks the parentheses are just for grouping (like in math: `(2 + 3) * 4`).

**Rule to remember:** One-item tuple? Don't forget the comma! `(42,)` not `(42)`.

```python
# More examples
single = ("hello",)    # Tuple with one string
not_single = ("hello") # Just a string
```

![A flat vector illustration in a children's educational book style showing Byte the robot looking puzzled at two boxes, one labeled with a comma and containing a single item as a tuple, and one without a comma showing just a plain number. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Why Use Tuples?

If lists can do everything tuples can do (and more), why bother with tuples?

### 1. When Data Shouldn't Change

Some data is meant to stay the same. Using a tuple tells anyone reading your code: "This is not supposed to be modified."

```python
# Coordinates of a location don't change
school_location = (40.7128, -74.0060)

# Days of the week are fixed
days = ("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")

# A date
birthday = (2015, 6, 21)   # Year, month, day
```

### 2. Tuples Can Be Dictionary Keys (Lists Can't!)

Because tuples can't change, Python allows them as dictionary keys. Lists are not allowed because they could change after being used as a key.

```python
# Storing data by grid position
grid = {}
grid[(0, 0)] = "start"
grid[(1, 2)] = "treasure"

# This would cause an error:
# grid[[0, 0]] = "start"   # Lists can't be keys!
```

### 3. Tuples Are Slightly Faster

For very large programs, tuples use less memory and are a tiny bit faster than lists. You won't notice the difference in small programs, but it's good to know.

---

## Tuple Operations

Even though you can't change tuples, you can still do many things with them.

```python
colors = ("red", "green", "blue", "green")

# Length
print(len(colors))          # 4

# Counting
print(colors.count("green"))  # 2

# Finding position
print(colors.index("blue"))   # 2

# Checking membership
print("red" in colors)        # True

# Looping
for color in colors:
    print(color)

# Slicing (gives you a new tuple)
print(colors[1:3])            # ('green', 'blue')

# Combining tuples (gives you a new tuple)
more_colors = colors + ("yellow", "purple")
print(more_colors)
# ('red', 'green', 'blue', 'green', 'yellow', 'purple')
```

---

## Unpacking: Opening the Gift Box

This is where tuples get really fun. **Unpacking** means taking the items out of a tuple and putting each one into its own variable — all in one line.

Think of it like opening a gift box that has three items inside, and handing each item to a different person.

```python
# A tuple with three values
student = ("Byte", 95, "A")

# Unpack into three variables
name, score, grade = student

print(name)    # Byte
print(score)   # 95
print(grade)   # A
```

This is the same as writing:

```python
name = student[0]
score = student[1]
grade = student[2]
```

But unpacking is much cleaner!

### The Number of Variables Must Match

```python
point = (3, 7)
x, y = point         # Works: 2 values, 2 variables
x, y, z = point      # ERROR: not enough values
x = point             # Works, but x is the whole tuple, not unpacked
```

### Unpacking Works with Lists Too

Even though we're learning this with tuples, unpacking works with any sequence:

```python
a, b, c = [10, 20, 30]         # From a list
first, second = "AB"             # From a string
```

---

## The Swap Trick

Remember how swapping two variables usually needs a temporary storage?

In many programming languages, you'd write:

```python
# The long way
temp = a
a = b
b = temp
```

In Python, thanks to tuple unpacking, you can do it in **one line**:

```python
a = 10
b = 20

a, b = b, a   # Swap!

print(a)   # 20
print(b)   # 10
```

What happens behind the scenes: Python first creates the tuple `(b, a)` which is `(20, 10)`, then unpacks it into `a, b`. The swap is clean and instant.

![A flat vector illustration in a children's educational book style showing Byte the robot juggling two colorful balls, swapping them from left hand to right hand, representing the variable swap trick. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Functions Can Return Multiple Values

One of the most common uses of tuples is when a function needs to give back **more than one thing**.

```python
def min_max(numbers):
    return min(numbers), max(numbers)

# The function returns a tuple
result = min_max([4, 1, 7, 2, 9])
print(result)   # (1, 9)

# Or unpack directly
smallest, biggest = min_max([4, 1, 7, 2, 9])
print(f"Smallest: {smallest}")   # Smallest: 1
print(f"Biggest: {biggest}")     # Biggest: 9
```

Another example:

```python
def describe_pet(name, species):
    label = f"{name} the {species}"
    length = len(name)
    return label, length

pet_label, name_length = describe_pet("Buddy", "dog")
print(pet_label)      # Buddy the dog
print(name_length)    # 5
```

When you write `return a, b`, Python automatically packs `a` and `b` into a tuple.

---

## The * Operator: Capturing "The Rest"

Sometimes you only care about the first item or the last item and want to bundle up everything else. The `*` operator does exactly that.

```python
numbers = (1, 2, 3, 4, 5)

first, *middle, last = numbers

print(first)    # 1
print(middle)   # [2, 3, 4]  (notice: it becomes a list!)
print(last)     # 5
```

The variable with `*` always becomes a **list** that captures whatever is left over.

```python
# Get the first and dump the rest
winner, *others = ("gold", "silver", "bronze", "4th", "5th")
print(winner)    # gold
print(others)    # ['silver', 'bronze', '4th', '5th']

# Get the last and dump the rest
*beginning, last_place = ("gold", "silver", "bronze", "4th", "5th")
print(last_place)   # 5th
print(beginning)    # ['gold', 'silver', 'bronze', '4th']
```

You can only use **one** starred variable per unpacking.

---

## Named Tuples: Giving Names to Positions

Regular tuples use **index numbers** to access items. But what does `student[2]` mean? Is that the grade? The age? The score? Hard to tell.

**Named tuples** let you access items by **name** instead of just by number.

```python
from collections import namedtuple

# Create a new type called "Student"
Student = namedtuple("Student", ["name", "score", "grade"])

# Create a student
s = Student(name="Byte", score=95, grade="A")

# Access by name (much clearer!)
print(s.name)    # Byte
print(s.score)   # 95
print(s.grade)   # A

# Access by index still works too
print(s[0])      # Byte
```

Named tuples are still tuples — they're immutable. But they're much easier to read.

```python
# Coordinates are easier to understand with names
Point = namedtuple("Point", ["x", "y"])

origin = Point(0, 0)
target = Point(3, 4)

print(f"Going from ({origin.x}, {origin.y}) to ({target.x}, {target.y})")
# Going from (0, 0) to (3, 4)
```

---

## Tuple vs List: When to Use Which

| Feature | List | Tuple |
|---|---|---|
| Syntax | `[1, 2, 3]` | `(1, 2, 3)` |
| Can be changed? | Yes (mutable) | No (immutable) |
| Can be a dict key? | No | Yes |
| Use when... | Items might change | Items should stay fixed |
| Example | Shopping cart items | GPS coordinates |
| Example | Scores being updated | Days of the week |
| Example | To-do list | A date (year, month, day) |

**Simple rule of thumb:**

- **Use a list** when you have a collection of similar items that might grow, shrink, or change.
- **Use a tuple** when you have a fixed group of values that belong together and shouldn't be modified.

---

## Putting It All Together

Here's a program that uses tuples and unpacking in a practical way:

```python
from collections import namedtuple

# Define a named tuple for weather data
Weather = namedtuple("Weather", ["city", "temp", "condition"])

# A list of weather reports (each item is a tuple)
reports = [
    Weather("New York", 72, "Sunny"),
    Weather("London", 58, "Rainy"),
    Weather("Tokyo", 80, "Cloudy"),
    Weather("Sydney", 65, "Windy"),
]

# Find the hottest city using unpacking
hottest = max(reports, key=lambda r: r.temp)
print(f"The hottest city is {hottest.city} at {hottest.temp}F ({hottest.condition})")

# Unpack each report in a loop
print("\nWeather Report:")
print("-" * 35)
for city, temp, condition in reports:
    print(f"  {city:>10}: {temp}F, {condition}")
```

Output:
```
The hottest city is Tokyo at 80F (Cloudy)

Weather Report:
-----------------------------------
    New York: 72F, Sunny
      London: 58F, Rainy
       Tokyo: 80F, Cloudy
      Sydney: 65F, Windy
```

![A flat vector illustration in a children's educational book style showing Byte the robot organizing data cards on a table into neat sealed envelopes, each labeled with a city name and weather info, representing named tuples. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Quick Reference

| What You Want | How To Do It |
|---|---|
| Create a tuple | `t = (1, 2, 3)` or `t = 1, 2, 3` |
| Single-element tuple | `t = (42,)` — don't forget the comma! |
| Access an item | `t[0]`, `t[-1]` |
| Slice | `t[1:3]` |
| Length | `len(t)` |
| Count an item | `t.count(x)` |
| Find an item | `t.index(x)` |
| Unpack | `a, b, c = t` |
| Swap variables | `a, b = b, a` |
| Capture the rest | `first, *rest = t` |
| Named tuple | `from collections import namedtuple` |
| Convert list to tuple | `tuple(my_list)` |
| Convert tuple to list | `list(my_tuple)` |

---

## Practice Questions

Try these on your own before looking at the answers!

**Question 1:** What's the difference between `(5)` and `(5,)`?

**Question 2:** What does this code print?

```python
t = (10, 20, 30, 40, 50)
a, b, *rest = t
print(a)
print(b)
print(rest)
```

**Question 3:** Write code that swaps the values of `x` and `y` in one line. Before: `x = "hello"`, `y = "world"`. After: `x` should be `"world"` and `y` should be `"hello"`.

**Question 4:** What does this function return, and what type is the return value?

```python
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder
```

**Question 5:** Why would this code cause an error?

```python
point = (3, 7)
point[0] = 5
```

**Question 6:** Write a function called `first_and_last(sequence)` that takes any sequence (list, tuple, or string) and returns a tuple of the first and last elements. Then call it and unpack the result.

**Question 7:** What does this code print?

```python
from collections import namedtuple
Color = namedtuple("Color", ["r", "g", "b"])
sky = Color(135, 206, 235)
print(f"Red: {sky.r}, Green: {sky.g}, Blue: {sky.b}")
```

**Question 8:** Can you use a tuple as a key in a dictionary? Can you use a list? Why or why not?

---

## Answers to Practice Questions

**Answer 1:**
`(5)` is just the integer `5` — the parentheses are treated like math grouping. `(5,)` is a tuple containing the single element `5`. The comma is what makes it a tuple.

**Answer 2:**
```
10
20
[30, 40, 50]
```
`a` gets the first value (10), `b` gets the second (20), and `*rest` captures everything else as a list.

**Answer 3:**
```python
x = "hello"
y = "world"
x, y = y, x
# Now x is "world" and y is "hello"
```

**Answer 4:**
The function returns a **tuple** of two values: the quotient and the remainder. For example, `divide(17, 5)` returns `(3, 2)`. You could unpack it: `q, r = divide(17, 5)`.

**Answer 5:**
Tuples are **immutable**. You cannot change an element once the tuple is created. `point[0] = 5` tries to change the first element, which is not allowed. Python raises a `TypeError`.

**Answer 6:**
```python
def first_and_last(sequence):
    return (sequence[0], sequence[-1])

# Call it and unpack
first, last = first_and_last([10, 20, 30, 40])
print(f"First: {first}, Last: {last}")   # First: 10, Last: 40

first, last = first_and_last("Python")
print(f"First: {first}, Last: {last}")   # First: P, Last: n
```

**Answer 7:**
```
Red: 135, Green: 206, Blue: 235
```
Named tuples let you access items by their name (`sky.r`, `sky.g`, `sky.b`) instead of just by index.

**Answer 8:**
**Yes**, you can use a tuple as a dictionary key. **No**, you cannot use a list. Dictionary keys must be **immutable** (unchangeable). Tuples are immutable, so they're safe. Lists are mutable, so Python doesn't allow them as keys — if the list changed after being used as a key, the dictionary wouldn't know where to find it anymore.

---

**Next up:** [[wiki:python-jr-functions]] — Learn how to write your own reusable recipes!

**Previous:** [[wiki:python-jr-strings]] | **Up:** [[wiki:python-jr-home]]
