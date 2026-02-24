# Variables and Memory -- Giving Names to Things

In the last lesson you learned about values (like `42`, `"hello"`, `3.14`, `True`) and their types (`int`, `float`, `str`, `bool`). You also used `print()` and `type()` to look at them. But so far you have been using values once and then they disappear. What if you want to remember a value and use it again later?

That is what **variables** are for. A variable is a **name that points to a value**. That is the whole idea.

![A flat vector illustration in a children's educational book style showing Byte the robot sticking a name tag labeled "age" onto a floating number 10. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Variable?

Imagine you have a toy on a shelf. You stick a name tag on it that says "favorite_toy". Now whenever someone says "hand me favorite_toy," you know exactly which toy they mean.

A variable works the same way. It is a **name tag** (or a **sticky note**) that you stick onto a value so you can find it later.

```python
age: int = 10
print(age)  # 10
```

After this line, whenever Python sees the name `age`, it follows the name tag and finds the value `10`.

Here are a few more examples:

```python
name: str = "Sam"
height: float = 4.5
likes_pizza: bool = True

print(name)         # Sam
print(height)       # 4.5
print(likes_pizza)  # True
```

Each name points to its own value. `name` points to `"Sam"`, `height` points to `4.5`, and `likes_pizza` points to `True`.

**Try it yourself.** Open your Python editor, type those lines, and run them. Change the values to something about you and run it again.

---

## The `=` Sign Does NOT Mean "Equals"

This is one of the biggest surprises for beginners. In math class, `=` means "these two sides are the same." In Python, `=` means something completely different:

> **`=` means "make this name point to this value."**

Think of it like this: the name is on the left, the value is on the right, and the `=` sign is like an arrow pointing from the name to the value.

```python
score: int = 100
```

This does NOT mean "score is the same as 100." It means "stick the name tag `score` onto the value `100`."

This becomes really important when you see a line like this:

```python
score: int = 10
score = score + 5
print(score)  # 15
```

In math, `score = score + 5` makes no sense -- nothing can equal itself plus five. But in Python, it means:

1. Look up what `score` points to right now (it is `10`)
2. Add `5` to it (you get `15`)
3. Move the name tag `score` so it now points to `15`

The old value `10` is left behind. The name `score` now points to the new value `15`.

---

## Variables Are Sticky Notes, NOT Boxes

Some people say "a variable is like a box that holds a value." That picture is a little bit wrong, and it can confuse you later. Here is a better way to think about it:

> **A variable is a sticky note that you stick on a value.**

The value lives in your computer's memory (think of it like a giant shelf). The variable name is just a sticky note you put on it so you can find it.

Why does this matter? Because:

- You can stick **two different sticky notes** on the **same value**
- Peeling a sticky note off and moving it to a new value does NOT destroy the old value
- The sticky note and the value are **separate things**

![A flat vector illustration in a children's educational book style showing two sticky notes labeled "a" and "b" both stuck to the same toy block with the number 42 on it. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Reassignment -- Moving the Sticky Note

**Reassignment** means moving a name tag from one value to a different value.

```python
favorite_color: str = "blue"
print(favorite_color)  # blue

favorite_color = "green"
print(favorite_color)  # green
```

First, the name `favorite_color` pointed to `"blue"`. Then we moved it to point to `"green"`. The value `"blue"` is still out there in memory -- we just do not have a name pointing to it anymore.

Here is another example. Follow along step by step:

```python
lives: int = 3
print(lives)  # 3

lives = lives - 1
print(lives)  # 2

lives = lives - 1
print(lives)  # 1
```

Each time, we look up what `lives` currently points to, subtract `1`, and then move the sticky note to the new result. It is like a video game where you lose a life each time.

---

## Two Names for the Same Value

You can put two sticky notes on the same value. In programming, this is called **aliasing**.

```python
a: int = 42
b: int = a

print(a)  # 42
print(b)  # 42
```

Both `a` and `b` are pointing to the exact same `42`. We did not make a copy -- there is one `42`, and two names point to it.

Now watch what happens when we move one of the sticky notes:

```python
a: int = 42
b: int = a    # both point to 42

a = 100       # move "a" to point to 100
print(a)      # 100
print(b)      # 42  -- b did NOT change!
```

Moving the sticky note `a` to a new value does not affect `b`. The name `b` is still stuck on the original `42`. Each name tag is independent.

---

## Naming Rules -- What Names Are Allowed?

Python has strict rules about what you can use as a variable name. If you break these rules, Python will give you an error.

### The Rules

1. **Must start with a letter or an underscore** (`_`). You cannot start with a number.
2. **Can only contain letters, numbers, and underscores.** No spaces, no dashes, no dots, no other symbols.
3. **Case matters.** `score`, `Score`, and `SCORE` are three completely different names.

```python
# These names are allowed
my_name: str = "Sam"
player1: str = "Alex"
_secret: int = 42
total_score: int = 95

# These names will cause an error
# 1st_place = "Alex"      # starts with a number
# my name = "Sam"          # has a space
# my-score = 95            # has a dash
# total$ = 100             # has a dollar sign
```

**Try it yourself.** Open your Python editor and try typing `1st_place = "Alex"`. Look at the error message. Then try `my name = "Sam"`. Reading error messages is an important skill.

### Reserved Words

Python has a list of words that are already taken. They have special meanings, and you cannot use them as variable names:

```
False  True   None   and    or     not    if     else   elif
for    while  break  continue  def  return  class  import  from
```

If you try to use one, Python will be confused:

```python
# This will cause an error:
# class = "Math"   # "class" is a reserved word
```

---

## snake_case -- How Python Programmers Name Things

Beyond the rules (which you must follow), there are **conventions** (which you should follow). In Python, the convention for variable names is called **snake_case**:

- All lowercase letters
- Words separated by underscores

Think of a snake crawling along the ground -- the underscores look like the flat ground connecting the words.

```python
# Good -- snake_case (the Python way)
first_name: str = "Sam"
total_score: int = 95
is_game_over: bool = False
player_health: int = 100

# Not recommended -- other styles work but are not the Python convention
firstName = "Sam"     # this style is used in other languages
TotalScore = 95       # this style is for something else in Python
```

Also, make your names **descriptive**. Someone reading your code should understand what the variable holds just from its name:

```python
# Good -- you can tell what these hold
player_name: str = "Sam"
remaining_lives: int = 3
high_score: int = 5000

# Bad -- these tell you nothing
x: str = "Sam"
n: int = 3
z: int = 5000
```

---

## Type Hints -- Telling the Reader What Kind of Value to Expect

You have already seen the `: int` and `: str` parts in our examples. These are called **type hints**. They are little notes that say "this name is supposed to point to this kind of value."

```python
age: int = 10
```

Read this as: "**age** is a name for a **whole number** (`int`), and right now it points to **10**."

```python
name: str = "Sam"
```

Read this as: "**name** is a name for **text** (`str`), and right now it points to **'Sam'**."

Here are all four basic types with type hints:

```python
player_name: str = "Sam"         # text
player_age: int = 12             # whole number
player_height: float = 4.8       # decimal number
is_playing: bool = True           # yes or no (True or False)
```

Python does not actually force you to follow your type hints. If you write `age: int = 10` and then later write `age = "hello"`, Python will not stop you. But type hints are still useful because:

- They help you remember what kind of value a name should hold
- They help other people understand your code
- Code editors can use them to warn you about mistakes

**Always add type hints.** It is a good habit to start now.

---

## Using Variables in Calculations

Variables become really powerful when you use them in calculations. Think of it like a recipe: you list your ingredients at the top, then use them in the steps.

```python
# The ingredients (our starting values)
price_per_item: float = 3.50
number_of_items: int = 4
tax_rate: float = 0.08

# The recipe steps (calculations using our ingredients)
subtotal: float = price_per_item * number_of_items
tax: float = subtotal * tax_rate
total: float = subtotal + tax

print(subtotal)  # 14.0
print(tax)        # 1.12
print(total)      # 15.12
```

The beauty of using variables is that if you change one ingredient, all the calculations update automatically. Try changing `price_per_item` to `5.00` and run the code again -- the subtotal, tax, and total all change without you touching those lines.

![A flat vector illustration in a children's educational book style showing Byte the robot following a recipe card, connecting ingredient jars labeled with variable names to a mixing bowl where calculations happen. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Here is another example -- calculating the area of a rectangle:

```python
width: float = 5.0
height: float = 3.0
area: float = width * height
perimeter: float = 2 * (width + height)

print(f"Width: {width}")
print(f"Height: {height}")
print(f"Area: {area}")
print(f"Perimeter: {perimeter}")
```

Wait -- what is that `f` before the string? Read on!

---

## f-strings -- Mixing Text and Variables Together

An **f-string** (the `f` stands for "formatted") is a special kind of text that lets you put variable values right inside it. You put an `f` before the opening quote, and then use curly braces `{}` around any variable name.

```python
name: str = "Sam"
age: int = 12

greeting: str = f"Hi, my name is {name} and I am {age} years old."
print(greeting)  # Hi, my name is Sam and I am 12 years old.
```

Without f-strings, you would have to glue text together with `+`, which is messier:

```python
# The messy way (without f-strings)
greeting: str = "Hi, my name is " + name + " and I am " + str(age) + " years old."
```

See how much easier the f-string version is? The curly braces `{}` tell Python "find the value this name points to and put it right here."

You can even do math inside the curly braces:

```python
width: float = 5.0
height: float = 3.0
print(f"The area is {width * height} square units.")
# The area is 15.0 square units.
```

**Try it yourself.** Create variables for your name, your favorite number, and your favorite food. Then use an f-string to print a sentence using all three.

---

## The `id()` Function -- Where Does a Value Live?

Every value in Python has an **address** in your computer's memory -- a number that tells you where it is stored. Think of it like a house address: the value is the house, and the address tells you where to find it.

The `id()` function tells you this address:

```python
x: int = 42
print(id(x))  # A big number like 140234866478288
```

The exact number does not matter. What matters is that you can use `id()` to prove that variables are sticky notes, not boxes:

```python
a: int = 42
b: int = a

print(id(a))  # Some number, like 140234866478288
print(id(b))  # The SAME number! Both point to the same place.
```

Both `a` and `b` have the same address because they both point to the same value. There is one `42` in memory, and two names are stuck to it.

Now watch what happens when we reassign:

```python
a: int = 42
b: int = a

a = 99  # Move the "a" sticky note to 99

print(id(a))  # A DIFFERENT number now -- "a" moved to a new address
print(id(b))  # Still the SAME old number -- "b" did not move
```

This proves that reassigning `a` does not affect `b`. They are independent sticky notes.

---

## Constants -- Values That Should Not Change

Sometimes you have a value that should stay the same for your whole program. For example, the number of days in a week is always 7. The number of hours in a day is always 24.

In Python, we show this by writing the name in ALL CAPITAL LETTERS with underscores between words:

```python
DAYS_IN_WEEK: int = 7
HOURS_IN_DAY: int = 24
MAX_LIVES: int = 3
PI: float = 3.14159
```

These are called **constants**. The ALL_CAPS name is a signal that says "do not change this value." Python will not actually stop you from changing it, but the naming convention is a promise to anyone reading your code.

```python
MAX_LIVES: int = 3

# Regular variables can change
remaining_lives: int = MAX_LIVES
remaining_lives = remaining_lives - 1  # Fine -- this is a regular variable

# But you should NOT do this:
# MAX_LIVES = 99  # Technically works, but you are breaking the promise!
```

When you see ALL_CAPS, think "this is set in stone -- leave it alone."

---

## Exercises

**Type every one of these. Do not skip them.** The only way to learn programming is by doing it.

### Exercise 1: About You

Create variables about yourself and print them using f-strings:

```python
my_name: str = "Your Name Here"
my_age: int = 0               # your real age
my_favorite_color: str = ""    # your favorite color
likes_coding: bool = True      # True or False

print(f"My name is {my_name}.")
print(f"I am {my_age} years old.")
print(f"My favorite color is {my_favorite_color}.")
print(f"Do I like coding? {likes_coding}")
```

Fill in your real information. Run it. Change the values and run it again.

### Exercise 2: Predict the Output

Before you run this, write down what you think each `print()` will show. Then run it and check.

```python
x: int = 5
print(x)

x = x + 3
print(x)

x = x * 2
print(x)

x = 1
print(x)
```

### Exercise 3: Two Names, One Value

```python
a: int = 7
b: int = a
print(f"a is {a}, b is {b}")
print(f"Same address? {id(a) == id(b)}")

a = 99
print(f"a is {a}, b is {b}")
print(f"Same address? {id(a) == id(b)}")
```

Before you run it: will changing `a` also change `b`? Write down your prediction, then run it.

### Exercise 4: Shopping Calculator

```python
ITEM_NAME: str = "Notebook"
PRICE: float = 2.50
TAX_RATE: float = 0.06

quantity: int = 3
subtotal: float = PRICE * quantity
tax: float = subtotal * TAX_RATE
total: float = subtotal + tax

print(f"Item: {ITEM_NAME}")
print(f"Price: ${PRICE} x {quantity}")
print(f"Subtotal: ${subtotal}")
print(f"Tax: ${tax}")
print(f"Total: ${total}")
```

Run it. Then change the quantity to 10 and run it again. Notice how only one line changed but the whole receipt updated.

### Exercise 5: Fix the Names

These variables have bad names. Rewrite them with descriptive snake_case names and type hints:

```python
a = "Maple Elementary"
b = 450
c = True
d = "Mrs. Johnson"
e = 4.2
```

Think about what each value probably represents, and give it a name that makes that clear.

### Exercise 6: Rectangle Calculator

Write a program that:
1. Creates variables for a rectangle's width and height (use type hints)
2. Calculates the area (width times height)
3. Calculates the perimeter (2 times width plus 2 times height)
4. Prints all four values using f-strings

![A flat vector illustration in a children's educational book style showing Byte the robot measuring a colorful rectangle with a ruler, with labels showing width and height. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Common Mistakes to Watch For

**1. Using a name before you create it.** Python reads from top to bottom. You must create a variable before you use it.

```python
# This causes an error:
print(score)        # NameError! Python does not know "score" yet.
score: int = 100    # Too late -- the error already happened above.
```

**2. Thinking `=` means "equals."** Remember: `=` means "make this name point to this value." It is a command, not a fact. We will learn about `==` (which checks if two things are the same) in a later lesson.

**3. Thinking changing one name changes another.** If `a = 42` and `b = a`, and then you write `a = 100`, the name `b` still points to `42`. Moving one sticky note does not move the others.

**4. Spaces in variable names.** `my score = 100` will not work. Use an underscore: `my_score = 100`.

**5. Starting a name with a number.** `1st_place = "Alex"` will not work. Try `first_place = "Alex"` instead.

**6. Forgetting type hints.** They are not required, but they make your code much clearer. Always write `age: int = 10`, not just `age = 10`.

---

## What You Learned

- A variable is a **name** (like a sticky note) that **points to a value**
- The `=` sign means "make this name point to this value" -- it is NOT the same as "equals" in math
- **Reassignment** moves a name to point to a new value
- Two names can point to the **same value** (aliasing), and moving one does not move the other
- Variable names must start with a letter or underscore, and can only contain letters, numbers, and underscores
- Python convention is **snake_case** for regular variables and **ALL_CAPS** for constants
- **Type hints** (like `: int`) tell the reader what kind of value a name should point to
- **f-strings** let you mix text and variables: `f"Hello, {name}!"`
- The `id()` function shows the memory address where a value lives
- **Constants** are values that should not change -- name them in ALL_CAPS

You now know how to create values, check their types, and give them names. These three ideas -- values, types, and variables -- are the foundation of everything else. Every program you ever write will use all three.

---

## Practice Questions

**1.** What will this code print?

```python
x: int = 10
y: int = x
x = 20
print(y)
```

**2.** Which of these variable names are allowed in Python, and which will cause an error?

```
my_score     2nd_try     _hidden     player name     high-score     score2
```

**3.** What will this code print?

```python
lives: int = 5
lives = lives - 1
lives = lives - 1
lives = lives - 1
print(lives)
```

**4.** What is wrong with this code?

```python
print(message)
message: str = "Hello!"
```

**5.** Rewrite this code using an f-string instead of `+`:

```python
name: str = "Sam"
age: int = 12
print("My name is " + name + " and I am " + str(age) + ".")
```

**6.** After these lines run, will `id(a)` and `id(b)` be the same or different? Why?

```python
a: str = "hello"
b: str = a
a = "goodbye"
```

**7.** What is wrong with this variable declaration, and how would you fix it?

```python
Player Score: int = 250
```

---

## Answers to Practice Questions

**1.** It prints `10`. When we wrote `y = x`, the name `y` started pointing to the value `10`. When we then moved `x` to point to `20`, `y` was not affected -- it is still pointing to `10`. Each sticky note is independent.

**2.**
- `my_score` -- allowed (letters and underscore)
- `2nd_try` -- NOT allowed (starts with a number)
- `_hidden` -- allowed (starting with underscore is fine)
- `player name` -- NOT allowed (has a space)
- `high-score` -- NOT allowed (has a dash)
- `score2` -- allowed (numbers are fine as long as they are not first)

**3.** It prints `2`. Starting at `5`, we subtract `1` three times: `5 - 1 = 4`, `4 - 1 = 3`, `3 - 1 = 2`.

**4.** The `print(message)` line comes before `message` is created. Python reads from top to bottom, so it does not know what `message` is yet. You would get a `NameError`. The fix is to swap the lines so the variable is created first.

**5.**
```python
name: str = "Sam"
age: int = 12
print(f"My name is {name} and I am {age}.")
```

**6.** They will be **different**. At first, both `a` and `b` point to `"hello"` (same address). But when we write `a = "goodbye"`, we move `a` to point to a new value at a new address. The name `b` still points to `"hello"` at the old address. So `id(a)` and `id(b)` are now different.

**7.** The name `Player Score` has a space in it and starts with an uppercase letter. Variable names cannot have spaces. The fix is to use snake_case: `player_score: int = 250`.

---

**Previous:** [[wiki:python-jr-values-and-types]] | **Next:** [[wiki:python-jr-operators]]
