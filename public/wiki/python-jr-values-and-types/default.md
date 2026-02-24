# Values and Types -- Every Piece of Information Has a Kind

Remember when we learned about `print()` in the last lesson? You showed text like `"Hello, world!"` and numbers like `42` on the screen. Those are all pieces of information, and each one has a **kind** (called a **type**).

Understanding values and types is one of the most important things in all of programming. Here is the big idea:

> **Every piece of information in your program is a value. Every value has a type. The type determines what you can do with it.**

Let's break that down.

![A flat vector illustration in a children's educational book style showing Byte the robot sorting colorful blocks into labeled bins -- one bin labeled with numbers, one with letters, one with a checkmark and X, while holding up a block and examining it with a magnifying glass. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

---

## What Is a Value?

A **value** is a single piece of information. That is all. Here are some values:

```python
42
3.14
"hello"
True
```

Each one is something your program can use -- it can store it, show it on the screen, combine it with other values, or compare it to something else.

Think of values like items on a table: a toy car, a crayon, a sticker, a coin. Each one is a separate thing. In Python, `42`, `"hello"`, and `True` are each separate things -- separate values.

---

## What Is a Type?

A **type** is the **kind** of value something is. Just like in real life, different kinds of things work differently.

Think about a kitchen. You have ingredients like flour, eggs, and sugar. They are all "food," but they are different kinds of food, and you use them differently. You can crack an egg, but you cannot crack flour. You can pour sugar, but you cannot pour an egg (well, not easily).

In Python, the same idea applies. Numbers, text, and yes/no answers are all values, but they are different **types** of values, and you can do different things with them.

---

## The Four Basic Types

Python has many types, but you only need to know four to get started.

### int -- Whole Numbers

`int` is short for **integer**. An integer is a whole number -- a number with no decimal point. It can be positive, negative, or zero.

```python
print(5)
print(100)
print(-3)
print(0)
```

Integers are the counting numbers you already know: 1, 2, 3, 10, 100, -7, 0. If it does not have a dot in it, it is an integer.

**Examples of integers:** `1`, `42`, `-10`, `0`, `999999`

### float -- Numbers With a Decimal Point

`float` stands for **floating-point number**. A float is a number that has a decimal point in it.

```python
print(3.14)
print(0.5)
print(-2.7)
print(100.0)
```

Notice that last one: `100.0` is a float, not an integer, even though it is a "whole" amount. The decimal point is what makes it a float. The dot is the key!

Think of it this way: the number `3` and the number `3.0` might look like the same thing to you, but to Python, they are different types. `3` is an integer. `3.0` is a float. It is like the difference between writing "three" on a piece of paper and holding up three fingers -- same idea, different form.

**Examples of floats:** `3.14`, `0.5`, `-2.7`, `100.0`, `0.0`

### str -- Text (Words, Sentences, Characters)

`str` is short for **string**. A string is text -- any combination of letters, numbers, spaces, or symbols, wrapped in quotes.

```python
print("Hello, world!")
print("Python is fun")
print("12345")
print("")
```

That last one, `""`, is called an **empty string** -- it is text with nothing in it. It is like a blank piece of paper. The paper exists, but nothing is written on it.

**Here is the really important part.** Look at these two things:

```python
print(42)
print("42")
```

Both of these show `42` on the screen, but they are completely different things:

- `42` (without quotes) is a **number**. You can do math with it. You can add it to other numbers, multiply it, divide it.
- `"42"` (with quotes) is **text**. It is the characters "4" and "2" written down. You cannot do math with it, just like you cannot add two words together to get a bigger number.

**Here is an analogy.** Imagine you have 5 apples on a table. That is the number 5 -- a real quantity you can work with. Now imagine you write the word "five" on a sticky note. The sticky note has the word on it, but you cannot eat it or count it. The number 5 and the word "five" refer to the same idea, but they are different things.

In Python, `42` is the apples. `"42"` is the sticky note. The number is something you can calculate with. The text is just characters on the screen.

**Examples of strings:** `"hello"`, `"Python is fun"`, `"42"`, `""`, `"True"`, `"   "`

### bool -- Yes or No (True or False)

`bool` is short for **boolean** (named after a mathematician called George Boole). A boolean can only be one of two values: `True` or `False`. That is it -- just two options, like a light switch that is either on or off.

```python
print(True)
print(False)
```

**Important:** The `T` in `True` and the `F` in `False` must be capital letters. Writing `true` or `false` (lowercase) will cause an error.

Booleans are how your programs make decisions. Remember from the roadmap that you will learn about conditions -- "if this, then that"? Those conditions use booleans. Is it raining? `True` or `False`. Is the player's score above 100? `True` or `False`.

**Examples of booleans:** `True`, `False` (and that is all of them!)

---

## Using type() to Ask "What Kind of Thing Is This?"

You do not have to guess what type a value is. You can just ask Python! The `type()` function tells you what type any value is.

```python
print(type(42))
print(type(3.14))
print(type("hello"))
print(type(True))
```

Output:

```
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
```

Do not worry about the word "class" for now. Just look at the part inside the quotes: `'int'`, `'float'`, `'str'`, `'bool'`. That is the type.

Think of `type()` as asking Python: "Hey, what kind of thing is this?" And Python answers: "It is an int" or "It is a str."

**Open your REPL right now and try these:**

```python
>>> type(42)
>>> type(3.14)
>>> type("hello")
>>> type(True)
```

Get in the habit of using `type()` whenever you are not sure about something. It is one of the most useful tools you have.

### Surprises! Quotes Change Everything

Here are some results that surprise many beginners:

```python
print(type(3.0))      # <class 'float'> -- not int! The dot makes it a float
print(type("42"))     # <class 'str'> -- not int! The quotes make it text
print(type("True"))   # <class 'str'> -- not bool! The quotes make it text
print(type("3.14"))   # <class 'str'> -- not float! The quotes make it text
```

The quotes change everything. Anything inside quotes is text (a string), no matter what it looks like.

- `42` is an integer (a number)
- `"42"` is a string (text that happens to look like a number)
- `True` is a boolean (yes)
- `"True"` is a string (text that happens to look like a boolean)
- `3.14` is a float (a decimal number)
- `"3.14"` is a string (text that happens to look like a decimal number)

Remember the apples analogy: `42` is having 42 apples. `"42"` is having a piece of paper with "42" written on it. Very different things!

![A flat vector illustration in a children's educational book style showing Byte the robot holding up two cards -- one showing the number 5 with real apples behind it, and the other showing quotation marks around the word five on a sticky note, with a question mark between them. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

---

## Why Types Matter

Different types support different actions. This is the whole reason types exist -- they tell Python what you are allowed to do with a value.

### What You Can Do With Numbers

You can do math with numbers (both `int` and `float`):

```python
print(10 + 5)      # 15 -- addition
print(10 - 3)      # 7 -- subtraction
print(4 * 3)       # 12 -- multiplication
print(10 / 3)      # 3.3333... -- division
```

### What You Can Do With Text

You can stick pieces of text together (this is called **concatenation** -- a fancy word that just means "joining"):

```python
print("Hello" + " " + "world")   # Hello world
print("ha" * 3)                   # hahaha
```

Wait -- you can multiply text? Yes! `"ha" * 3` means "repeat the text 'ha' three times." Pretty neat!

### What You CANNOT Do -- Mixing Types

Here is where it gets important. Try this:

```python
print("I am " + 25 + " years old")
```

**What Python says:**

```
TypeError: can only concatenate str (not "int") to str
```

Python is saying: "You asked me to join text and a number together using `+`, but I do not know how to do that. Those are different types!"

Think of it like this: if someone asked you to "add a word and a number," what would you do? Add the word "cat" plus the number 5 -- what does that even mean? It does not make sense. Python agrees -- it refuses to guess what you want. You need to be specific.

This is actually a good thing! Python is protecting you from mistakes. In some other programming languages, the computer would just guess, and sometimes it guesses wrong, causing bugs that are really hard to find.

### How to Fix It

If you want to put text and a number together, you need to turn the number into text first:

```python
print("I am " + str(25) + " years old")
```

Output:

```
I am 25 years old
```

`str(25)` turns the number `25` into the text `"25"`. Now Python is joining text + text + text, which it knows how to do.

There is an even easier way -- using commas in `print()`:

```python
print("I am", 25, "years old")
```

Output:

```
I am 25 years old
```

Remember from the last lesson? When you separate things with commas in `print()`, Python shows them all with spaces between them. This works even when the types are different.

---

## Type Conversion -- Changing One Kind Into Another

Sometimes you have a value in one type and you need it in another. Python gives you functions to convert between types. Think of it like converting between units: you can turn inches into centimeters, and you can turn an integer into a float.

### int() -- Turn Something Into a Whole Number

```python
# Turn text into a number (only works if the text looks like a number!)
print(int("25"))     # 25

# Turn a float into an integer (WARNING: it chops off the decimal, it does NOT round!)
print(int(3.9))      # 3 (not 4!)
print(int(3.1))      # 3

# Turn a boolean into a number
print(int(True))     # 1
print(int(False))    # 0
```

**Be careful:** `int(3.9)` gives you `3`, not `4`. It does not round -- it just chops off everything after the decimal point. This surprises many people!

### float() -- Turn Something Into a Decimal Number

```python
# Turn text into a decimal number
print(float("3.14"))   # 3.14

# Turn an integer into a float
print(float(42))       # 42.0

# Turn a boolean into a float
print(float(True))     # 1.0
```

### str() -- Turn Something Into Text

```python
# Turn a number into text
print(str(25))         # "25"
print(str(3.14))       # "3.14"

# Turn a boolean into text
print(str(True))       # "True"

# Now you can join text and numbers together
print("Score: " + str(100))   # Score: 100
```

### bool() -- Turn Something Into True or False

```python
# Numbers to boolean
print(bool(1))       # True
print(bool(0))       # False
print(bool(42))      # True
print(bool(-5))      # True

# Text to boolean
print(bool("hello")) # True
print(bool(""))      # False
```

We will come back to `bool()` in detail in the truthy/falsy section below.

### When Conversion Goes Wrong

Not every conversion works. If you try to turn something into a number but it does not look like a number, Python will complain:

```python
print(int("hello"))
```

**What Python says:**

```
ValueError: invalid literal for int() with base 10: 'hello'
```

Python is saying: "You asked me to turn 'hello' into a number, but 'hello' is not a number. I cannot do that."

Here is another tricky one:

```python
print(int("3.5"))
```

**What Python says:**

```
ValueError: invalid literal for int() with base 10: '3.5'
```

You might think this would give you `3`, but it does not work! The text `"3.5"` looks like a decimal number, not a whole number. Python refuses to do two conversions at once. If you really want to go from `"3.5"` to `3`, you need two steps:

```python
print(int(float("3.5")))   # First turn "3.5" into 3.5, then turn 3.5 into 3
```

**Try all of these in your REPL. Try some conversions you think might fail and see what happens.**

---

## Truthy and Falsy -- Which Things Count as "Yes" and Which Count as "No"

This concept will matter a lot when you learn about conditions (the "if this, then that" lesson). In Python, every single value can be treated as either `True` or `False`. We call these **truthy** and **falsy** values.

### Falsy Values (Things That Count as "No")

These are the values that Python treats as `False`:

```python
print(bool(0))        # False -- zero
print(bool(0.0))      # False -- zero as a decimal
print(bool(""))       # False -- empty text (nothing between the quotes)
print(bool(False))    # False -- obviously
print(bool(None))     # False -- nothing at all (we will explain None below)
```

The pattern is easy to remember: **zero, empty, and nothing count as "no."**

Think of it like this:

- Zero means "none" -- you have zero of something, so it is like having nothing. That is a "no."
- An empty string `""` is like a blank page with nothing written on it. Nothing there. "No."
- `None` literally means "nothing." Definitely a "no."

### Truthy Values (Things That Count as "Yes")

Pretty much everything else counts as `True`:

```python
print(bool(1))        # True -- any number that is not zero
print(bool(-5))       # True -- even negative numbers!
print(bool(0.1))      # True -- any decimal that is not zero
print(bool("hello"))  # True -- text with something in it
print(bool(" "))      # True -- even a space is something!
print(bool("0"))      # True -- THIS IS TRICKY! See below.
```

### The Tricky One: "0" (Zero in Quotes)

Look at this carefully:

```python
print(bool(0))        # False -- this is the NUMBER zero
print(bool("0"))      # True -- this is the TEXT "0"
```

The string `"0"` is **truthy** because it is a non-empty string. There is something between the quotes -- the character "0." Python does not care that the character happens to be a zero. It only cares that the string is not empty.

The integer `0` is **falsy** because it is the number zero.

This is another reason why the difference between `42` and `"42"` matters! The type changes how Python treats the value.

---

## None -- Nothing at All

`None` is a special value in Python that means "no value" or "nothing." It is not zero. It is not an empty string. It is not `False`. It is its own unique thing that means "there is nothing here."

```python
print(None)          # None
print(type(None))    # <class 'NoneType'>
```

Think of the difference like this:

- **Zero (`0`)** is like having an empty jar. The jar exists, and you know it has zero items in it.
- **An empty string (`""`)** is like having a blank piece of paper. The paper exists, but nothing is written on it.
- **`None`** is like having no jar at all. There is nothing. Not even a container.

You will see `None` a lot more as you learn Python. For now, just know it exists and that it is **falsy** (it counts as "no").

```python
# None is its own thing -- it is not equal to 0, "", or False
print(None == 0)       # False
print(None == "")      # False
print(None == False)   # False
print(None == None)    # True -- None only equals itself
```

---

## Summary of the Four Types

Here is a quick reference card for the four basic types:

| Type    | What It Is      | Examples                | How to Spot It                 |
| ------- | --------------- | ----------------------- | ------------------------------ |
| `int`   | Whole numbers   | `5`, `100`, `-3`, `0`   | No decimal point, no quotes    |
| `float` | Decimal numbers | `3.14`, `0.5`, `100.0`  | Has a decimal point, no quotes |
| `str`   | Text            | `"hello"`, `"42"`, `""` | Has quotes around it           |
| `bool`  | Yes or No       | `True`, `False`         | Capital T or F, no quotes      |

Remember: if it has quotes, it is a string. Always.

---

## Exercises

**Type every one of these. Do not just read them.**

### Exercise 1: Type Detective

Create a file called `type_detective.py` and type this:

```python
# Type Detective -- Figure out the types!

print("Value: 42,       Type:", type(42))
print("Value: '42',     Type:", type("42"))
print("Value: 42.0,     Type:", type(42.0))
print("Value: True,     Type:", type(True))
print("Value: 'True',   Type:", type("True"))
print("Value: None,     Type:", type(None))
print("Value: '',       Type:", type(""))
print("Value: 0,        Type:", type(0))
```

Before you run it, write down what type you think each one is. Then run it and check your answers.

### Exercise 2: The Quotes Experiment

Try these in the REPL:

```python
>>> 10 + 5
>>> "10" + "5"
>>> 10 + "5"
```

What does each one give you? The first does math. The second joins text. The third gives an error. Make sure you understand why each result is what it is.

### Exercise 3: Conversion Practice

Create a file called `conversions.py`:

```python
# Start with a number
start = 42
print("Start:", start, "-- Type:", type(start))

# Turn it into text
as_text = str(start)
print("As text:", as_text, "-- Type:", type(as_text))

# Turn it into a decimal number
as_decimal = float(start)
print("As decimal:", as_decimal, "-- Type:", type(as_decimal))

# Turn it into a boolean
as_boolean = bool(start)
print("As boolean:", as_boolean, "-- Type:", type(as_boolean))
```

Run it. Then change `start` to `0` and run it again. What changes? Why?

### Exercise 4: Break Things on Purpose

Try each of these in the REPL and read the error messages:

```python
>>> "hello" + 5
>>> int("hello")
>>> int("3.5")
>>> float("not a number")
```

For each error, explain in your own words what Python is complaining about.

### Exercise 5: Truthy or Falsy?

Create a file called `truthy_falsy.py`:

```python
# Is each of these truthy or falsy?
print("bool(1):", bool(1))
print("bool(0):", bool(0))
print("bool(-1):", bool(-1))
print("bool(''):", bool(""))
print("bool('hello'):", bool("hello"))
print("bool(' '):", bool(" "))
print("bool('0'):", bool("0"))
print("bool(None):", bool(None))
print("bool(0.0):", bool(0.0))
print("bool(0.1):", bool(0.1))
```

Before running it, predict which ones will be `True` and which will be `False`. Then run it and check.

### Exercise 6: Build a Type Converter

Create a file called `type_converter.py`:

```python
# Start with the text "100"
text_number = "100"
print("Original:", text_number, "-- Type:", type(text_number))

# Turn it into a real number
real_number = int(text_number)
print("As integer:", real_number, "-- Type:", type(real_number))

# Do math with the real number
doubled = real_number * 2
print("Doubled:", doubled)

# Try to do math with the text version -- what happens?
# Uncomment the next line to see the error:
# broken = text_number * 2
# print("Text doubled:", broken)
```

Run it first as-is. Then remove the `#` from the last two lines and run it again. What does `"100" * 2` actually do? (Hint: it does not give you 200!)

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a large chart with four colorful columns labeled int float str and bool, with example values in each column and arrows showing conversion between them. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

---

## Where People Get Stuck

**1. Confusing `"42"` with `42`.** This is the number one mistake. The string `"42"` and the integer `42` are completely different things to Python. One is text, the other is a number. If something is not working, use `type()` to check -- you might have text when you think you have a number.

**2. Thinking `int()` rounds numbers.** `int(3.9)` gives you `3`, not `4`. It always chops off the decimal part. If you want to round, use `round(3.9)` which gives `4`.

**3. Thinking `bool("False")` is `False`.** Nope! It is `True`, because `"False"` is a non-empty string. Python does not read what is between the quotes -- it only checks if the string is empty or not. Only the empty string `""` is falsy.

**4. Forgetting that `int("3.5")` fails.** Python will not convert the text `"3.5"` directly to an integer. You need two steps: first turn it into a float (`float("3.5")` gives `3.5`), then turn that into an integer (`int(3.5)` gives `3`).

**5. Not using `type()` when confused.** Whenever your code does something unexpected, add `print(type(your_value))` to check what type it is. Most of the time, something is a different type than you expected.

**6. Thinking `None` is the same as `0` or `""`.** `None` means "no value at all." Zero is a value (the number zero). An empty string is a value (text with nothing in it). `False` is a value (the answer "no"). They are all different things that happen to be falsy.

---

## What You Learned

- Every piece of data in Python is a **value**
- Every value has a **type** that determines what you can do with it
- The four basic types are:
  - `int` -- whole numbers like `5`, `100`, `-3`
  - `float` -- decimal numbers like `3.14`, `0.5`, `100.0`
  - `str` -- text like `"hello"`, `"42"`, `""`
  - `bool` -- yes/no answers: `True` or `False`
- `type()` tells you the type of any value
- Quotes matter: `42` is a number, `"42"` is text
- You cannot mix types without converting (like `"hello" + 5` fails)
- `int()`, `float()`, `str()`, and `bool()` convert between types
- **Falsy** values (count as "no"): `0`, `0.0`, `""`, `None`, `False`
- **Truthy** values (count as "yes"): everything else
- `None` means "nothing at all" -- it is its own special thing

---

## Practice Questions

Try to answer these questions before looking at the answers at the bottom of the page.

**1.** What type is each of these values? `99`, `"hello"`, `3.0`, `False`, `"3.0"`, `0`, `""`, `True`

**2.** What will this code show on the screen?

```python
print(10 + 5)
print("10" + "5")
```

**3.** Why does this code cause an error?

```python
print("My age is " + 25)
```

How would you fix it? (Give two different ways.)

**4.** What does `int(7.8)` give you -- 7 or 8? Why?

**5.** Is `bool("0")` True or False? What about `bool(0)`? Explain why they are different.

**6.** What does `type("42")` tell you? Why is `"42"` not a number?

**7.** What will this code show on the screen?

```python
print(bool(""))
print(bool(" "))
print(bool("False"))
```

**8.** You have the text `"3.5"` and you want to turn it into the whole number `3`. Why does `int("3.5")` fail? What would you do instead?

---

## Answers to Practice Questions

**1.**

- `99` is `int` (whole number, no quotes, no decimal point)
- `"hello"` is `str` (text in quotes)
- `3.0` is `float` (has a decimal point)
- `False` is `bool` (a boolean value)
- `"3.0"` is `str` (it has quotes, so it is text, even though it looks like a number)
- `0` is `int` (whole number)
- `""` is `str` (an empty string -- it is text with nothing in it)
- `True` is `bool` (a boolean value)

**2.** The first line shows `15` because Python adds the numbers 10 and 5. The second line shows `105` because Python joins the text `"10"` and `"5"` together (concatenation). With numbers, `+` does addition. With text, `+` joins the pieces together.

**3.** Python cannot join text (`"My age is "`) and a number (`25`) using `+`. They are different types.

Fix 1: Convert the number to text: `print("My age is " + str(25))`

Fix 2: Use commas: `print("My age is", 25)`

**4.** `int(7.8)` gives you `7`. It chops off everything after the decimal point. It does NOT round. It always cuts toward zero.

**5.** `bool("0")` is `True` because `"0"` is a non-empty string -- there is a character between the quotes (the character "0"). `bool(0)` is `False` because `0` is the number zero, and zero is falsy. They are different because one is text and the other is a number. Types matter!

**6.** `type("42")` tells you `<class 'str'>`. It is a string (text), not a number, because it has quotes around it. The quotes tell Python "treat this as text." It is like writing the number 42 on a piece of paper -- the paper is not a number, it is a piece of paper with a number written on it. You cannot do math with a piece of paper.

**7.**

- `bool("")` shows `False` -- an empty string has nothing in it, so it is falsy
- `bool(" ")` shows `True` -- a space is still a character! The string is not empty.
- `bool("False")` shows `True` -- this is the text "False" (five characters: F-a-l-s-e), not the boolean `False`. Since the string is not empty, it is truthy. Python does not read the words inside the quotes.

**8.** `int("3.5")` fails because Python will not do two conversions at once. The text `"3.5"` looks like a decimal number, not a whole number. Python does not want to guess whether you want rounding or chopping. Instead, do it in two steps:

```python
result = int(float("3.5"))   # Step 1: "3.5" becomes 3.5   Step 2: 3.5 becomes 3
print(result)                 # 3
```

First, `float("3.5")` turns the text into the decimal number `3.5`. Then `int(3.5)` chops off the decimal to give you `3`.

---

**Previous:** [[wiki:python-jr-hello-world]] | **Next:** [[wiki:python-jr-variables-and-memory]]
