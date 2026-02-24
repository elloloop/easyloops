# Functions: Your Own Reusable Recipes

You've been using functions since your very first Python program — `print()`, `len()`, `input()`, `range()`. These are all functions that somebody else wrote for you. Now it's time to write your own!

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a kitchen counter with a recipe book open, placing ingredients into a machine that outputs a finished dish, representing how functions take inputs and produce outputs. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Function?

A **function** is a **reusable recipe with a name**.

Imagine you explain to someone how to make a peanut butter sandwich:

1. Get two slices of bread.
2. Spread peanut butter on one slice.
3. Put the other slice on top.

If you had to explain these steps every single time, it would get tiring. Instead, you write the recipe down once and call it `make_sandwich`. From then on, you just say "make_sandwich!" and everyone knows what to do.

That's exactly what a function does in code. You write the instructions **once**, give them a name, and then **call** that name whenever you need those instructions to run.

---

## Defining a Function with `def`

Here's how you create your own function:

```python
def say_hello():
    print("Hello, world!")
```

Let's break this down:

- `def` — short for "define." This keyword tells Python: "I'm creating a function."
- `say_hello` — the name of your function (you pick this).
- `()` — parentheses for any inputs (empty here because this function needs nothing).
- `:` — the colon starts the function's body.
- The indented lines below are the **body** — the instructions that run when you call the function.

**Defining** a function doesn't run it. It just teaches Python the recipe. To actually use it, you **call** it:

```python
def say_hello():
    print("Hello, world!")

# Nothing happens yet...

say_hello()   # NOW it runs! Prints: Hello, world!
say_hello()   # You can call it as many times as you want!
```

---

## Parameters: Ingredients the Recipe Needs

Most recipes need **ingredients**. Most functions need **inputs**. We call those inputs **parameters**.

```python
def say_hello(name):
    print(f"Hello, {name}!")

say_hello("Byte")     # Hello, Byte!
say_hello("Pixel")    # Hello, Pixel!
```

Here, `name` is a **parameter** — a placeholder for whatever value you pass in when you call the function. The actual value you pass in (`"Byte"`, `"Pixel"`) is called an **argument**.

You can have multiple parameters:

```python
def introduce(name, hobby):
    print(f"Hi, I'm {name} and I love {hobby}!")

introduce("Byte", "coding")     # Hi, I'm Byte and I love coding!
introduce("Pixel", "drawing")   # Hi, I'm Pixel and I love drawing!
```

---

## Return Values: What the Recipe Produces

Some functions don't just **do** something — they **give something back**. That's what `return` is for.

Think of it this way:
- A `print()` inside a function is like a chef **announcing** what they made.
- A `return` is like a chef **handing you the dish** so you can use it.

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8
```

Without `return`, the function gives back `None` (Python's way of saying "nothing"):

```python
def add_no_return(a, b):
    a + b   # Calculates but doesn't return anything!

result = add_no_return(3, 5)
print(result)   # None
```

You can use returned values directly in expressions:

```python
def double(n):
    return n * 2

print(double(5))              # 10
print(double(5) + double(3))  # 16
total = double(10) + 1        # 21
```

---

## Type Hints: Labeling Your Ingredients and Output

Python lets you add **type hints** to your functions. These are labels that say what types of values the function expects and what it gives back.

```python
def add(a: int, b: int) -> int:
    return a + b
```

This means: "Give me two whole numbers (`int`), and I'll give you back a whole number (`int`)."

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def average(numbers: list) -> float:
    return sum(numbers) / len(numbers)

def is_even(n: int) -> bool:
    return n % 2 == 0
```

**Important:** Type hints are like labels on a recipe — they tell people what to expect, but Python won't stop you if you pass in the wrong type. They're for **humans reading the code** (and for tools that check code), not enforced rules.

```python
def add(a: int, b: int) -> int:
    return a + b

# Python won't stop this, even though the hint says int:
print(add("hello", " world"))   # hello world
```

Still, type hints are very helpful for understanding what a function does at a glance.

![A flat vector illustration in a children's educational book style showing Byte the robot reading labels on colorful jars of ingredients, each labeled with a type like int, str, and bool, representing type hints. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Multiple Return Values (Returning a Tuple)

Remember tuples from [[wiki:python-jr-tuples-and-unpacking]]? Functions can return multiple values by returning a tuple.

```python
def min_and_max(numbers: list) -> tuple:
    return min(numbers), max(numbers)

smallest, biggest = min_and_max([4, 1, 9, 2, 7])
print(f"Smallest: {smallest}, Biggest: {biggest}")
# Smallest: 1, Biggest: 9
```

Another example:

```python
def analyze_word(word: str) -> tuple:
    length = len(word)
    upper = word.upper()
    reversed_word = word[::-1]
    return length, upper, reversed_word

size, shouted, backwards = analyze_word("python")
print(f"Length: {size}")       # Length: 6
print(f"Uppercase: {shouted}") # Uppercase: PYTHON
print(f"Reversed: {backwards}")# Reversed: nohtyp
```

---

## Default Parameters: Optional Ingredients

Sometimes a recipe has an ingredient that's usually the same. Like "add salt" — most of the time you use the default amount, but you *can* change it.

```python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

print(greet("Byte"))              # Hello, Byte!
print(greet("Byte", "Hey"))       # Hey, Byte!
print(greet("Pixel", "Howdy"))    # Howdy, Pixel!
```

The parameter `greeting` has a **default value** of `"Hello"`. If you don't provide it when calling the function, Python uses the default.

```python
def power(base: int, exponent: int = 2) -> int:
    return base ** exponent

print(power(5))      # 25  (5 squared, using default exponent 2)
print(power(5, 3))   # 125 (5 cubed)
print(power(2, 10))  # 1024
```

**Rule:** Parameters with defaults must come **after** parameters without defaults.

```python
# This is fine:
def greet(name: str, greeting: str = "Hello"):
    ...

# This causes an error:
def greet(greeting: str = "Hello", name: str):   # ERROR!
    ...
```

---

## Local vs Global Scope

Variables inside a function are **private** to that function. This is called **scope**.

Think of it like rooms in a house:
- Variables inside a function are in **your bedroom** (local scope). They belong to you and nobody else can see them.
- Variables outside all functions are in **the living room** (global scope). Everyone can see them.

```python
def my_function():
    secret = "only I know this"   # local variable
    print(secret)

my_function()      # Prints: only I know this
print(secret)      # ERROR! 'secret' doesn't exist out here
```

The variable `secret` was born inside the function and dies when the function ends.

### Functions Can See Global Variables (But Shouldn't Change Them)

```python
name = "Byte"   # global variable

def greet():
    print(f"Hello, {name}")   # Can read the global variable

greet()   # Hello, Byte
```

But be careful:

```python
count = 0   # global

def increment():
    count = count + 1   # ERROR! Python gets confused

increment()
```

Python sees `count` on the left side of `=` inside the function and thinks you're trying to create a **local** variable called `count`. But then you try to use `count + 1` before it's been created locally. This leads to an error.

The best practice is to **avoid changing global variables inside functions**. Instead, use parameters and return values:

```python
def increment(count: int) -> int:
    return count + 1

count = 0
count = increment(count)   # count is now 1
count = increment(count)   # count is now 2
```

This is much cleaner and easier to understand.

---

## Pure Functions: No Surprises

A **pure function** is a function where:

1. The **same input** always gives the **same output**.
2. It doesn't change anything outside itself (no side effects).

```python
# Pure function - same input, same output, every time
def add(a: int, b: int) -> int:
    return a + b

# Also pure
def is_positive(n: int) -> bool:
    return n > 0
```

Why are pure functions great?

- They're **predictable**. `add(3, 5)` will always be `8`.
- They're **easy to test**. You know exactly what to expect.
- They're **easy to understand**. You don't have to worry about what else they might change.

Compare with a **non-pure** function:

```python
total = 0

def add_to_total(n):
    global total
    total += n   # Changes something outside the function!
    return total

print(add_to_total(5))   # 5
print(add_to_total(5))   # 10  (same input, different output!)
```

This function is harder to reason about because calling it with the same argument gives different results depending on when you call it.

**Tip:** Try to write pure functions whenever possible. They make your code much easier to work with.

---

## Docstrings: Notes Inside Your Functions

A **docstring** is a note you put right inside a function to explain what it does. It's written as a string on the very first line of the function body, usually with triple quotes.

```python
def area_of_circle(radius: float) -> float:
    """Calculate the area of a circle given its radius."""
    return 3.14159 * radius ** 2
```

For more detailed functions, you can write a longer docstring:

```python
def find_longest_word(sentence: str) -> str:
    """Find and return the longest word in a sentence.

    If there are multiple words with the same length,
    returns the first one found.

    Parameters:
        sentence: A string containing words separated by spaces.

    Returns:
        The longest word as a string.
    """
    words = sentence.split()
    longest = ""
    for word in words:
        if len(word) > len(longest):
            longest = word
    return longest
```

Docstrings are helpful because:
- Anyone reading your code can quickly understand what a function does.
- The built-in `help()` function can display them:

```python
help(find_longest_word)
```

![A flat vector illustration in a children's educational book style showing Byte the robot writing a helpful note and attaching it to the top of a recipe card, representing how docstrings document functions. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Common Patterns

### Helper Functions

Big tasks are easier when you break them into smaller steps. Each step can be its own function.

```python
def is_vowel(char: str) -> bool:
    """Check if a character is a vowel."""
    return char.lower() in "aeiou"

def count_vowels(text: str) -> int:
    """Count how many vowels are in a string."""
    count = 0
    for char in text:
        if is_vowel(char):   # Using our helper function!
            count += 1
    return count

print(count_vowels("Hello World"))   # 3
```

`is_vowel()` is a **helper function** — a small function that helps a bigger function do its job.

### Validation Functions

These check whether some data is valid before you use it.

```python
def is_valid_score(score: int) -> bool:
    """Check if a score is between 0 and 100."""
    return 0 <= score <= 100

def is_valid_name(name: str) -> bool:
    """Check that a name is not empty and contains only letters."""
    return len(name.strip()) > 0 and name.replace(" ", "").isalpha()

# Using validation
score = 85
if is_valid_score(score):
    print(f"Score {score} recorded!")
else:
    print("Invalid score!")
```

---

## The Mutable Default Argument Trap

This is a sneaky bug that catches many Python programmers — even experienced ones. Let's look at it briefly so you know to watch out for it.

```python
# DANGER: Don't use a list as a default argument!
def add_item(item, shopping_list=[]):
    shopping_list.append(item)
    return shopping_list
```

You might think each call starts with a fresh empty list. But it doesn't!

```python
print(add_item("milk"))      # ['milk']
print(add_item("bread"))     # ['milk', 'bread']  Wait, where did milk come from?!
print(add_item("eggs"))      # ['milk', 'bread', 'eggs']  It keeps growing!
```

The problem: Python creates the default list **once** when the function is defined, and then **reuses the same list** every time the function is called without providing a list.

**The fix:** Use `None` as the default and create a new list inside the function.

```python
def add_item(item, shopping_list=None):
    if shopping_list is None:
        shopping_list = []   # Fresh list every time!
    shopping_list.append(item)
    return shopping_list

print(add_item("milk"))      # ['milk']
print(add_item("bread"))     # ['bread']  (fresh list, as expected)
```

**Rule to remember:** Never use a mutable value (like a list or a dictionary) as a default parameter. Use `None` instead and create the mutable value inside the function.

---

## Putting It All Together

Here's a complete program that uses many function concepts:

```python
def is_valid_name(name: str) -> bool:
    """Check that a name is not empty and contains only letters and spaces."""
    if len(name.strip()) == 0:
        return False
    return all(char.isalpha() or char == " " for char in name)

def calculate_grade(score: int) -> str:
    """Convert a numeric score to a letter grade."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

def format_report(name: str, scores: list) -> str:
    """Create a formatted report for a student.

    Parameters:
        name: The student's name.
        scores: A list of numeric scores.

    Returns:
        A formatted string with the student's report.
    """
    avg = sum(scores) / len(scores)
    grade = calculate_grade(int(avg))
    highest = max(scores)
    lowest = min(scores)

    report = f"Student: {name}\n"
    report += f"Scores: {scores}\n"
    report += f"Average: {avg:.1f}\n"
    report += f"Grade: {grade}\n"
    report += f"Highest: {highest}, Lowest: {lowest}"
    return report

# --- Main program ---
name = "Byte"
scores = [88, 92, 75, 95, 81]

if is_valid_name(name):
    print(format_report(name, scores))
else:
    print("Invalid name!")
```

Output:
```
Student: Byte
Scores: [88, 92, 75, 95, 81]
Average: 86.2
Grade: B
Highest: 95, Lowest: 75
```

Notice how each function does **one thing** clearly, and they work together to build the final result.

---

## Quick Reference

| What You Want | How To Do It |
|---|---|
| Define a function | `def my_func():` |
| Add parameters | `def my_func(a, b):` |
| Return a value | `return result` |
| Return multiple values | `return a, b` |
| Default parameter | `def my_func(x=10):` |
| Type hints | `def my_func(a: int) -> str:` |
| Add a docstring | `"""Description here."""` on line 1 |
| Call a function | `my_func()` or `my_func(arg1, arg2)` |
| Store a return value | `result = my_func()` |
| Unpack return values | `a, b = my_func()` |

![A flat vector illustration in a children's educational book style showing Byte the robot proudly standing next to a shelf of labeled recipe cards of different colors, each representing a different function, in an organized workshop. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practice Questions

Try these on your own before checking the answers!

**Question 1:** What does this code print?

```python
def mystery(a, b):
    return a * b + a

print(mystery(3, 4))
```

**Question 2:** Write a function called `is_even(n)` that returns `True` if a number is even and `False` if it's odd. Include a type hint and a docstring.

**Question 3:** What's wrong with this code?

```python
def greet():
    message = "Hello!"

greet()
print(message)
```

**Question 4:** Write a function called `temperature_converter(celsius)` that returns both the Fahrenheit and Kelvin equivalents of a Celsius temperature. (Fahrenheit = celsius * 9/5 + 32, Kelvin = celsius + 273.15)

**Question 5:** What does this code print, and why?

```python
def add(a, b=10):
    return a + b

print(add(5))
print(add(5, 20))
```

**Question 6:** Write a function called `initials(full_name)` that takes a full name like `"Byte The Robot"` and returns the initials like `"BTR"`. Use `.split()` and a loop.

**Question 7:** Why is this function NOT a pure function?

```python
counter = 0

def count_up():
    global counter
    counter += 1
    return counter
```

**Question 8:** What does this function return, and what type is the return value?

```python
def stats(numbers: list) -> tuple:
    """Return the sum and average of a list of numbers."""
    total = sum(numbers)
    avg = total / len(numbers)
    return total, avg
```

---

## Answers to Practice Questions

**Answer 1:**
```
15
```
`mystery(3, 4)` calculates `3 * 4 + 3` which is `12 + 3 = 15`.

**Answer 2:**
```python
def is_even(n: int) -> bool:
    """Return True if n is even, False if n is odd."""
    return n % 2 == 0
```

**Answer 3:**
The variable `message` is **local** to the `greet()` function. It only exists inside that function. When the function ends, `message` disappears. The `print(message)` line outside the function will cause a `NameError` because `message` is not defined in the global scope.

**Answer 4:**
```python
def temperature_converter(celsius: float) -> tuple:
    """Convert Celsius to both Fahrenheit and Kelvin."""
    fahrenheit = celsius * 9/5 + 32
    kelvin = celsius + 273.15
    return fahrenheit, kelvin

# Example usage:
f, k = temperature_converter(100)
print(f"100C = {f}F = {k}K")   # 100C = 212.0F = 373.15K
```

**Answer 5:**
```
15
25
```
When you call `add(5)`, the parameter `b` uses its default value of `10`, so it returns `5 + 10 = 15`. When you call `add(5, 20)`, you provide `b = 20`, overriding the default, so it returns `5 + 20 = 25`.

**Answer 6:**
```python
def initials(full_name: str) -> str:
    """Return the initials of a full name."""
    words = full_name.split()
    result = ""
    for word in words:
        result += word[0].upper()
    return result

print(initials("Byte The Robot"))   # BTR
```

**Answer 7:**
This function is **not pure** because:
1. It changes a **global variable** (`counter`) — this is a side effect.
2. Calling it with the same arguments (it takes none) gives **different results** each time: first call returns 1, second returns 2, third returns 3, and so on.

A pure function always returns the same output for the same input and never changes anything outside itself.

**Answer 8:**
The function returns a **tuple** of two values: the total (sum) and the average. For example, `stats([10, 20, 30])` returns `(60, 20.0)`. You can unpack it: `total, avg = stats([10, 20, 30])`.

---

**Next up:** [[wiki:python-jr-modules]] — Learn how to use code that other people have written!

**Previous:** [[wiki:python-jr-tuples-and-unpacking]] | **Up:** [[wiki:python-jr-home]]
