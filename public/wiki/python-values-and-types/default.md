# Values and Types — Every Piece of Data Has a Category

In the last lesson you used `print()` to display things on the screen. Some of those things were text like `"Hello, world!"` and some were numbers like `42`. These are all **values**, and every value in Python has a **type**.

Understanding values and types is foundational. Everything you will ever do in programming revolves around this idea:

> **Everything in programming is a value. Values have types. Types determine what you can do with them.**

## What Is a Value?

A value is a piece of data. That is all. Here are some values:

```python
42
3.14
"hello"
True
None
```

Each one is a piece of data that Python knows how to work with. A value is the most basic building block in programming — it is a thing your program can store, combine, compare, or display.

## What Is a Type?

A type is the category a value belongs to. Just like in the real world, different categories of things work differently. You can add numbers together, but you can't add a number and a sandwich. You can combine words together, but you can't multiply a word by another word (well, not in the normal sense).

Python has several types, but we are going to start with the four most basic ones.

## The Four Basic Types

### int — Whole Numbers

```python
age: int = 25
year: int = 2025
negative: int = -10
zero: int = 0
```

`int` is short for "integer." Integers are whole numbers — no decimal point. They can be positive, negative, or zero.

### float — Decimal Numbers

```python
price: float = 19.99
temperature: float = 98.6
pi: float = 3.14159
negative_float: float = -0.5
```

`float` is short for "floating-point number." Floats are numbers with a decimal point. Even `3.0` is a float, not an int — the decimal point is what matters.

### str — Text

```python
name: str = "Alice"
greeting: str = "Hello, world!"
empty: str = ""
number_as_text: str = "42"
```

`str` is short for "string." A string is text — a sequence of characters. Strings are always wrapped in quotes (single `'` or double `"` — both work the same way).

Important: `"42"` is a string, not a number. It is the text characters 4 and 2. You cannot do math with it.

### bool — True or False

```python
is_raining: bool = True
has_permission: bool = False
```

`bool` is short for "boolean" (named after mathematician George Boole). A boolean has only two possible values: `True` or `False`. Notice the capital T and capital F — this matters. `true` and `false` (lowercase) will cause an error in Python.

**Open your editor. Create a file called `types_demo.py`. Type each of the examples above. Add a `print()` call for each one. Run it.**

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What type is each of these values? Answer without running code: 99, 'hello', 3.0, False, '3.0', 0, '', True"</div>
</div>

## Using type() to Check — When in Doubt, Ask Python

You do not have to guess what type a value is. Python will tell you. The `type()` function tells you the type of any value:

```python
print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hello"))    # <class 'str'>
print(type(True))       # <class 'bool'>
print(type(None))       # <class 'NoneType'>
```

The output says `<class 'int'>` — don't worry about the word "class" for now. Just read the part in quotes: `'int'`, `'float'`, `'str'`, `'bool'`.

**Open your REPL right now. Type each of these:**

```python
>>> type(42)
>>> type("hello")
>>> type(3.14)
>>> type(True)
>>> type(None)
```

Get in the habit of using `type()` whenever you are unsure. It is like asking Python "what kind of thing is this?"

### Some Surprising Results

```python
print(type(3.0))    # <class 'float'> — not int! The decimal point makes it a float
print(type("42"))   # <class 'str'> — not int! The quotes make it a string
print(type("True")) # <class 'str'> — not bool! The quotes make it a string
```

The quotes change everything. `42` is an integer. `"42"` is a string. `True` is a boolean. `"True"` is a string. Python takes your punctuation literally.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the output of type(3.0)? Why is it not int? What is the output of type('False')? Why is it not bool?"</div>
</div>

## Why Types Matter

Different types support different operations. This is the whole reason types exist — they tell Python what you are allowed to do with a value.

### What You Can Do With Numbers

```python
# Math works with int and float
result: int = 10 + 5       # 15
result2: float = 10 / 3    # 3.3333...
result3: int = 10 * 5      # 50
result4: int = 10 - 5      # 5
```

### What You Can Do With Strings

```python
# Combining strings (concatenation)
full_name: str = "Alice" + " " + "Smith"  # "Alice Smith"

# Repeating strings
line: str = "-" * 20  # "--------------------"

# Getting the length
length: int = len("hello")  # 5
```

### What You CANNOT Do — TypeError

```python
# This will crash your program
result = "hello" + 5
```

```
TypeError: can only concatenate str (not "int") to str
```

Python is telling you: "I know how to add a string to a string, and I know how to add a number to a number, but I don't know how to add a string to a number. Those are different types."

This is not Python being difficult. It is Python being precise. What would "hello" + 5 even mean? Is the answer "hello5"? Is it an error? Different languages handle this differently. Python makes you be explicit about what you want.

**Open your editor. Try `print("hello" + 5)`. Read the error. Then try `print("hello" + str(5))` instead. We will cover that conversion next.**

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why does Python give a TypeError when you try to do 'age: ' + 25? What are two different ways you could fix this so it prints 'age: 25'?"</div>
</div>

## Type Conversion — Changing a Value's Type

Sometimes you have a value in one type and you need it in another. Python gives you functions for this:

### int() — Convert to Integer

```python
# String to int
age: int = int("25")       # 25
print(type(age))           # <class 'int'>

# Float to int (drops the decimal part — does NOT round)
whole: int = int(3.9)      # 3 (not 4!)
print(whole)               # 3

# Bool to int
one: int = int(True)       # 1
zero: int = int(False)     # 0
```

Warning: `int(3.9)` gives you `3`, not `4`. It chops off the decimal — it does not round. This trips up a lot of people.

### float() — Convert to Float

```python
# String to float
price: float = float("19.99")  # 19.99

# Int to float
number: float = float(42)      # 42.0

# Bool to float
one: float = float(True)       # 1.0
```

### str() — Convert to String

```python
# Number to string
age_text: str = str(25)         # "25"
price_text: str = str(19.99)    # "19.99"

# Bool to string
true_text: str = str(True)      # "True"

# Now you can combine text and numbers
message: str = "I am " + str(25) + " years old"
print(message)  # I am 25 years old
```

This is how you fix the `TypeError` from earlier. If you want to combine text with a number using `+`, convert the number to a string first with `str()`.

### bool() — Convert to Boolean

```python
# Numbers to bool
print(bool(1))      # True
print(bool(0))      # False
print(bool(42))     # True
print(bool(-1))     # True

# Strings to bool
print(bool("hello"))  # True
print(bool(""))       # False

# None to bool
print(bool(None))     # False
```

### What Happens When Conversion Fails

```python
# This will crash
number: int = int("hello")
```

```
ValueError: invalid literal for int() with base 10: 'hello'
```

Python cannot turn the text "hello" into a number because "hello" is not a number. Only strings that look like numbers can be converted: `int("42")` works, `int("hello")` does not.

**Open your REPL. Try all of these conversions. Try some that you think might fail. See what happens.**

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What does int(7.8) return — 7 or 8? What does int('7.8') do — does it return 7, 8, or cause an error? Try both in the REPL."</div>
</div>

## Truthy and Falsy — What bool() Considers True vs False

This is a concept that will matter a lot when you learn about conditions later. Every value in Python can be treated as either `True` or `False`. We call these "truthy" and "falsy" values.

### Falsy Values (treated as False)

These are the values that `bool()` considers `False`:

```python
print(bool(0))        # False — zero
print(bool(0.0))      # False — zero as a float
print(bool(""))       # False — empty string
print(bool(None))     # False — None
print(bool(False))    # False — obviously
```

The pattern: **zero, empty, and nothing are false**.

### Truthy Values (treated as True)

Pretty much everything else is `True`:

```python
print(bool(1))        # True — any non-zero number
print(bool(-5))       # True — negative numbers too
print(bool(0.1))      # True — any non-zero float
print(bool("hello"))  # True — any non-empty string
print(bool(" "))      # True — a space is still a character!
print(bool("0"))      # True — the STRING "0" is non-empty!
```

Watch out for that last one. The string `"0"` is truthy because it is a non-empty string. It contains one character (the digit 0). The integer `0` is falsy because it is zero. Types matter.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Is the string '0' truthy or falsy? Is the string '' truthy or falsy? Is the integer 0 truthy or falsy? Explain why for each."</div>
</div>

## None — The Absence of a Value

`None` is a special value that means "nothing" or "no value." It is not zero. It is not an empty string. It is not `False`. It is its own thing — the deliberate absence of a value.

```python
result: None = None
print(result)        # None
print(type(result))  # <class 'NoneType'>
```

You will encounter `None` frequently as you learn more Python. For now, just know it exists and what it means: "There is no value here."

```python
# None is falsy
print(bool(None))  # False

# None is not the same as 0 or "" or False
print(None == 0)      # False
print(None == "")     # False
print(None == False)  # False
```

`None` is its own category. It only equals itself.

## Exercises

**Type every one of these. Do not just read them.**

### Exercise 1: Type Detective

Create a file called `type_detective.py`:

```python
# Type Detective — figure out the types

value1 = 42
value2 = "42"
value3 = 42.0
value4 = True
value5 = "True"
value6 = None

print("value1:", type(value1))
print("value2:", type(value2))
print("value3:", type(value3))
print("value4:", type(value4))
print("value5:", type(value5))
print("value6:", type(value6))
```

Before you run it, write down what type you think each one is. Then run it and check.

### Exercise 2: Type Conversion Chain

```python
# Start with an integer
start: int = 42
print("Start:", start, type(start))

# Convert to string
as_string: str = str(start)
print("As string:", as_string, type(as_string))

# Convert to float
as_float: float = float(start)
print("As float:", as_float, type(as_float))

# Convert to bool
as_bool: bool = bool(start)
print("As bool:", as_bool, type(as_bool))
```

Run it. Then change `start` to `0` and run it again. What changes?

### Exercise 3: Break Things on Purpose

Try each of these in the REPL and read the error messages:

```python
>>> "hello" + 5
>>> int("hello")
>>> int("3.5")
>>> float("not a number")
```

For each error, can you explain in your own words what Python is complaining about?

### Exercise 4: Truthy/Falsy Explorer

```python
# Test every value you can think of
test_values = [0, 1, -1, 0.0, 0.1, "", "hello", " ", "0", None, True, False]

for value in test_values:
    print(f"bool({value!r:>10}) = {bool(value)}")
```

Don't worry if the `for` loop syntax looks unfamiliar — we will cover loops later. Just type it, run it, and read the output. Focus on which values are truthy and which are falsy.

## Where People Go Wrong

**1. Confusing `"42"` with `42`.** The string `"42"` and the integer `42` are completely different things. One is text, the other is a number. You cannot do math with `"42"`. Always check with `type()` if you are unsure.

**2. Thinking `int()` rounds numbers.** `int(3.9)` is `3`, not `4`. It always chops toward zero. If you want rounding, use `round(3.9)` which gives `4`.

**3. Assuming `bool("False")` is `False`.** Nope. It is `True`, because `"False"` is a non-empty string. It doesn't matter what the text says — any non-empty string is truthy. Only the empty string `""` is falsy.

**4. Forgetting that `int("3.5")` fails.** You might expect it to give you `3`, but Python refuses. You need to convert to float first and then to int: `int(float("3.5"))`.

**5. Not using `type()` when confused.** If your code is behaving unexpectedly, put `print(type(your_variable))` in there. Nine times out of ten, something is a different type than you expected.

**6. Thinking `None` is the same as `0` or `""` or `False`.** `None` means "no value." Zero is a value (the number zero). An empty string is a value (text with no characters). `False` is a value (the boolean false). They are all different things that happen to share the property of being falsy.

## What You Learned

- Every piece of data in Python is a value
- Every value has a type that determines what you can do with it
- The four basic types are `int`, `float`, `str`, and `bool`
- `type()` tells you the type of any value
- You cannot mix types without converting first (e.g., `"hello" + 5` fails)
- `int()`, `float()`, `str()`, and `bool()` convert between types
- Falsy values: `0`, `0.0`, `""`, `None`, `False`
- Everything else is truthy
- `None` means "no value" — it is its own thing

---

**Previous:** [[wiki:python-hello-world]] | **Next:** [[wiki:python-variables-and-memory]]
