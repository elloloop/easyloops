# Functions -- Reusable Blocks of Logic

## Why Functions?

Imagine you write the same 10 lines of code in five different places. Then you find a bug. Now you have to fix it in five places. Miss one? Your program breaks in some places but works in others.

Functions solve this. You write the logic once, give it a name, and call it whenever you need it. Fix a bug in the function? Fixed everywhere.

Three reasons to use functions:

1. **Don't repeat yourself.** Write once, use many times.
2. **Organize your code.** Break big problems into small, named pieces.
3. **Make it testable.** You can test a function by itself, without running the whole program.

---

## What is a Function?

A function is a machine. It takes **inputs**, does **work**, and produces **output**.

Think of a toaster. You put bread in (input), it heats the bread (work), and toast comes out (output).

In programming, you define a function once, then "call" it whenever you need it.

---

## Defining a Function

Here is the simplest function:

```python
def greet() -> None:
    print("Hello!")
```

- `def` means "I'm defining a function."
- `greet` is the name you chose.
- `()` is where inputs go (empty for now).
- `-> None` means this function does not return a value.
- The indented code is the **body** -- what the function does.

Open your editor. Type this. Run it:

```python
def greet() -> None:
    print("Hello!")

greet()
greet()
greet()
```

You called `greet()` three times. The body ran three times. One definition, many uses.

---

## Type Hints -- Always

Every function you write should have **type hints**. They tell you and anyone reading your code what goes in and what comes out.

**Bad -- no hints:**

```python
def add(a, b):
    return a + b
```

What types are `a` and `b`? Strings? Numbers? Lists? You have no idea.

**Good -- with hints:**

```python
def add(a: int, b: int) -> int:
    return a + b
```

Now it is clear: two integers go in, one integer comes out.

This is not optional in our code. Every function gets type hints.

Open your editor. Type this. Run it:

```python
def multiply(x: float, y: float) -> float:
    result: float = x * y
    return result

answer: float = multiply(3.5, 2.0)
print(answer)  # 7.0
```

---

## Parameters vs Arguments

These two words confuse people. Here is the difference:

- **Parameters** are the names in the function definition (the placeholders).
- **Arguments** are the actual values you pass when calling.

```python
def greet(name: str) -> None:   # "name" is a PARAMETER
    print(f"Hello, {name}!")

greet("Alice")                   # "Alice" is an ARGUMENT
greet("Bob")                     # "Bob" is an ARGUMENT
```

Parameters are like labeled slots. Arguments are the values you plug into those slots.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about defining functions with type hints, and the difference between parameters and arguments. Give me 3 small exercises: (1) Write a function that takes two strings and returns them combined with a space, (2) Write a function that takes a number and returns True if it's positive, (3) Identify the parameters and arguments in a given function call. Check my answers and explain anything I get wrong."</div>
</div>

---

## Return Values

Functions produce output with the `return` keyword. When Python hits `return`, the function stops and sends back a value.

```python
def square(n: int) -> int:
    return n * n

result: int = square(5)
print(result)  # 25
```

Important: **every function returns something.** If you don't use `return`, the function returns `None` automatically.

```python
def say_hello() -> None:
    print("Hello!")

result = say_hello()  # prints "Hello!"
print(result)         # None
```

Open your editor. Type this. Run it. See `None` printed on the second line.

---

## Multiple Return Values

A function can return more than one value by returning a tuple:

```python
def divide_and_remainder(a: int, b: int) -> tuple[int, int]:
    quotient: int = a // b
    remainder: int = a % b
    return quotient, remainder

q: int
r: int
q, r = divide_and_remainder(17, 5)
print(f"17 / 5 = {q} remainder {r}")  # 17 / 5 = 3 remainder 2
```

When you write `return quotient, remainder`, Python packs them into a tuple. When you write `q, r = ...`, Python unpacks them.

---

## Default Parameters

Sometimes a parameter has a sensible default. You can set it in the definition:

```python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

print(greet("Alice"))              # Hello, Alice!
print(greet("Alice", "Good morning"))  # Good morning, Alice!
```

Rules:
- Parameters with defaults must come **after** parameters without defaults.
- If you don't pass a value, the default is used.

Open your editor. Type this. Run it:

```python
def make_coffee(size: str = "medium", sugar: int = 1) -> str:
    return f"{size} coffee with {sugar} sugar(s)"

print(make_coffee())                    # medium coffee with 1 sugar(s)
print(make_coffee("large"))             # large coffee with 1 sugar(s)
print(make_coffee("small", 3))          # small coffee with 3 sugar(s)
```

---

## Keyword Arguments

When calling a function, you can name the arguments. This makes the call clearer and lets you skip defaults:

```python
def create_user(name: str, age: int, city: str = "Unknown") -> str:
    return f"{name}, age {age}, from {city}"

# Positional -- order matters
print(create_user("Alice", 30, "NYC"))

# Keyword -- order does not matter
print(create_user(age=30, city="NYC", name="Alice"))

# Skip the default
print(create_user("Bob", 25))
```

Keyword arguments are especially useful when a function has many parameters. Instead of memorizing the order, you name each one.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about return values, multiple return values, default parameters, and keyword arguments. Give me these exercises: (1) Write a function that takes a price and a tax rate (default 0.08) and returns the total, (2) Write a function that returns both the min and max of three numbers, (3) Call a function using keyword arguments in a different order than the definition. Check my work and explain what I got wrong."</div>
</div>

---

## Variable Arguments: *args and **kwargs

Sometimes you don't know how many arguments a function will receive.

**`*args` -- collects extra positional arguments into a tuple:**

```python
def sum_all(*args: float) -> float:
    total: float = 0.0
    index: int = 0
    while index < len(args):
        total += args[index]
        index += 1
    return total

print(sum_all(1, 2, 3))          # 6.0
print(sum_all(10, 20, 30, 40))   # 100.0
```

**`**kwargs` -- collects extra keyword arguments into a dictionary:**

```python
def print_info(**kwargs: str) -> None:
    keys: list[str] = list(kwargs.keys())
    index: int = 0
    while index < len(keys):
        key: str = keys[index]
        print(f"{key}: {kwargs[key]}")
        index += 1

print_info(name="Alice", role="Engineer", city="NYC")
```

You can also use a for loop as an alternative:

```python
def print_info_v2(**kwargs: str) -> None:
    for key in kwargs:
        print(f"{key}: {kwargs[key]}")
```

---

## Scope: Local vs Global

Variables inside a function are **local** -- they exist only while the function runs. Variables outside all functions are **global**.

```python
message: str = "I am global"

def show_scope() -> None:
    local_var: str = "I am local"
    print(message)     # Can READ global variables
    print(local_var)   # Can use local variables

show_scope()
# print(local_var)  # ERROR -- local_var does not exist here
```

Key rules:
- Functions **can read** global variables.
- Functions **cannot change** global variables unless you use the `global` keyword (which you should avoid).
- Local variables disappear when the function ends.

Open your editor. Type this. Run it:

```python
count: int = 0

def increment() -> None:
    global count    # tells Python you mean the global one
    count += 1

increment()
increment()
increment()
print(count)  # 3
```

This works, but using `global` is a bad habit. Better approach: pass values in and return values out.

```python
def increment(count: int) -> int:
    return count + 1

my_count: int = 0
my_count = increment(my_count)
my_count = increment(my_count)
my_count = increment(my_count)
print(my_count)  # 3
```

---

## The LEGB Rule (Simplified)

When Python sees a variable name, it searches in this order:

1. **L**ocal -- inside the current function
2. **E**nclosing -- inside any outer function (for nested functions)
3. **G**lobal -- at the top level of the file
4. **B**uilt-in -- Python's own names (like `print`, `len`, `int`)

It stops at the first match. If it finds nothing, you get a `NameError`.

```python
x: str = "global"

def outer() -> None:
    x: str = "enclosing"

    def inner() -> None:
        x: str = "local"
        print(x)   # "local" -- found at L

    inner()
    print(x)       # "enclosing" -- found at E (outer's local)

outer()
print(x)           # "global" -- found at G
```

Don't overthink this. The main takeaway: **variables inside your function are private.**

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about *args, **kwargs, variable scope, and the LEGB rule. Quiz me: (1) Write a function using *args that returns the largest number, (2) Given a code snippet with global and local variables, ask me what each print statement outputs, (3) Explain why using 'global' is usually a bad idea and show a better approach. Check my answers."</div>
</div>

---

## Pure Functions

A **pure function** always returns the same output for the same input, and it does not change anything outside itself (no side effects).

```python
# PURE -- same input, same output, no side effects
def add(a: int, b: int) -> int:
    return a + b

# NOT PURE -- changes something outside (prints to screen)
def add_and_print(a: int, b: int) -> int:
    print(f"Adding {a} + {b}")   # side effect!
    return a + b

# NOT PURE -- depends on something outside
total: int = 0
def add_to_total(n: int) -> int:
    global total
    total += n       # side effect! changes global state
    return total
```

Pure functions are easier to test, easier to understand, and less likely to cause bugs. Prefer them when you can.

---

## Functions as Values

In Python, functions are values just like numbers and strings. You can store them in variables and pass them to other functions.

```python
def shout(text: str) -> str:
    return text.upper() + "!"

def whisper(text: str) -> str:
    return text.lower() + "..."

def speak(text: str, style_func) -> str:
    return style_func(text)

print(speak("hello", shout))    # HELLO!
print(speak("hello", whisper))  # hello...
```

The `speak` function takes another function as an argument. This is powerful -- it lets you swap behavior without rewriting code.

---

## Nested Functions and Closures

You can define a function inside another function. The inner function can access variables from the outer function:

```python
def make_multiplier(factor: int):
    def multiply(n: int) -> int:
        return n * factor   # "factor" comes from the outer function
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
```

`make_multiplier` returns a function. That returned function "remembers" the `factor` value even after `make_multiplier` has finished. This is called a **closure**.

---

## Lambda Functions

A **lambda** is a tiny function without a name. Good for simple, one-off operations:

```python
# Regular function
def square(n: int) -> int:
    return n * n

# Same thing as a lambda
square_lambda = lambda n: n * n

print(square(4))         # 16
print(square_lambda(4))  # 16
```

Lambdas are most useful when passing a quick function to another function:

```python
names: list[str] = ["Charlie", "Alice", "Bob"]
sorted_names: list[str] = sorted(names, key=lambda name: name.lower())
print(sorted_names)  # ['Alice', 'Bob', 'Charlie']
```

Rule of thumb: if the lambda gets complicated, just write a regular function instead. Readability matters.

---

## Docstrings

A **docstring** is a string at the very start of a function that explains what it does. Python stores it and tools can read it.

```python
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculate Body Mass Index.

    Args:
        weight_kg: Weight in kilograms.
        height_m: Height in meters.

    Returns:
        The BMI value as a float.
    """
    return weight_kg / (height_m ** 2)

# You can read the docstring
help(calculate_bmi)
```

Open your editor. Type this. Run it. You'll see the docstring printed by `help()`.

Write docstrings for any function that isn't immediately obvious. Future you will thank present you.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about pure functions, functions as values, closures, lambdas, and docstrings. Test me: (1) Given three functions, identify which ones are pure, (2) Write a function that takes a list of numbers and a function, and applies that function to each number, (3) Write a lambda that filters out negative numbers from a list, (4) Write a proper docstring for a function I give you. Check my answers and explain what I missed."</div>
</div>

---

## Common Patterns

### Helper Functions

Break complex logic into small helpers:

```python
def is_valid_email(email: str) -> bool:
    """Check if an email has a basic valid format."""
    has_at: bool = "@" in email
    parts: list[str] = email.split("@")
    has_dot_after_at: bool = len(parts) == 2 and "." in parts[1]
    return has_at and has_dot_after_at

def register_user(name: str, email: str) -> str:
    """Register a user if email is valid."""
    if not is_valid_email(email):
        return "Invalid email"
    return f"User {name} registered with {email}"

print(register_user("Alice", "alice@example.com"))  # User Alice registered...
print(register_user("Bob", "bad-email"))             # Invalid email
```

### Validation Functions

Functions that return True or False to check conditions:

```python
def is_positive(n: float) -> bool:
    return n > 0

def is_in_range(n: float, low: float, high: float) -> bool:
    return low <= n <= high

def is_strong_password(password: str) -> bool:
    has_length: bool = len(password) >= 8
    has_digit: bool = False
    index: int = 0
    while index < len(password):
        if password[index].isdigit():
            has_digit = True
        index += 1
    return has_length and has_digit
```

### Transformation Functions

Functions that take data in one shape and return it in another:

```python
def celsius_to_fahrenheit(celsius: float) -> float:
    return celsius * 9 / 5 + 32

def format_name(first: str, last: str) -> str:
    return f"{last.upper()}, {first.capitalize()}"

def extract_initials(full_name: str) -> str:
    parts: list[str] = full_name.split()
    initials: str = ""
    index: int = 0
    while index < len(parts):
        initials += parts[index][0].upper()
        index += 1
    return initials

print(celsius_to_fahrenheit(100))         # 212.0
print(format_name("alice", "smith"))      # SMITH, Alice
print(extract_initials("John Paul Jones"))  # JPJ
```

---

## Where People Go Wrong

### 1. Forgetting to return

```python
# WRONG -- this returns None
def add(a: int, b: int) -> int:
    result: int = a + b
    # forgot return!

# RIGHT
def add(a: int, b: int) -> int:
    result: int = a + b
    return result
```

### 2. Mutating arguments by accident

Lists and dictionaries are passed by reference. If you change them inside a function, the original changes too:

```python
def add_item(items: list[str], item: str) -> None:
    items.append(item)   # this changes the ORIGINAL list!

my_list: list[str] = ["a", "b"]
add_item(my_list, "c")
print(my_list)  # ['a', 'b', 'c'] -- original was changed!
```

If you don't want this, make a copy first:

```python
def add_item_safe(items: list[str], item: str) -> list[str]:
    new_list: list[str] = items.copy()
    new_list.append(item)
    return new_list
```

### 3. Scope confusion

```python
x: int = 10

def change_x() -> None:
    x = 20           # this creates a LOCAL x, does NOT change global
    print(f"Inside: {x}")  # 20

change_x()
print(f"Outside: {x}")    # 10 -- global x unchanged
```

### 4. Mutable default arguments

This is a classic Python trap:

```python
# WRONG -- the default list is shared across all calls!
def add_item_bad(item: str, items: list[str] = []) -> list[str]:
    items.append(item)
    return items

print(add_item_bad("a"))  # ['a']
print(add_item_bad("b"))  # ['a', 'b'] -- unexpected!

# RIGHT -- use None as default
def add_item_good(item: str, items: list[str] | None = None) -> list[str]:
    if items is None:
        items = []
    items.append(item)
    return items
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I finished learning about functions. Give me a comprehensive quiz: (1) Write a function with type hints that takes a list of numbers and returns a tuple of (sum, average, count), (2) Write a helper function and a main function that uses it, (3) Show me a broken function and ask me to find the bug, (4) Explain the mutable default argument trap and how to fix it. Grade my answers and tell me what to review."</div>
</div>

---

## Summary

- Functions let you write logic once and reuse it.
- **Always** use type hints: `def func(x: int) -> int:`
- Parameters are names in the definition. Arguments are values you pass.
- `return` sends a value back. No return means `None`.
- `*args` collects extra positional arguments. `**kwargs` collects keyword arguments.
- Variables inside functions are local. Use the LEGB rule to understand scope.
- Pure functions are predictable and easy to test.
- Functions are values -- you can pass them around.
- Write docstrings so people know what your function does.
- Watch out for: forgetting return, mutating arguments, mutable defaults.

---

**Previous:** [[wiki:python-tuples-and-unpacking]] | **Next:** [[wiki:python-error-handling]]
