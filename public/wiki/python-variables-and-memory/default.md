# Variables and Memory — Giving Names to Values

In the last lesson you worked with values directly: `42`, `"hello"`, `3.14`, `True`. But real programs don't just use values once and throw them away. You need to hold onto them, refer to them later, combine them, and change them. That is what variables are for.

A variable is a **name that refers to a value**.

That is the whole concept. Let's dig into what it actually means.

## Your First Variable

```python
age: int = 25
print(age)  # 25
```

The line `age: int = 25` does three things:

1. Creates a value `25` in memory
2. Gives it the name `age`
3. The `: int` part is a **type hint** — it tells anyone reading the code "this is supposed to be an integer"

After this line, whenever Python sees the name `age`, it looks up what value that name refers to and uses that value.

```python
name: str = "Alice"
height: float = 5.7
is_student: bool = True

print(name)        # Alice
print(height)      # 5.7
print(is_student)  # True
```

**Open your editor. Create a file called `variables.py`. Type the above code. Run it. Change the values. Run it again.**

## The = Sign Means Assignment, Not Equality

This is crucial. In math class, `x = 5` means "x equals 5" — it is a statement of fact. In programming, `x = 5` means **"make the name x refer to the value 5."** It is a command, not a statement.

```python
x: int = 5    # "x now refers to 5"
x = 10        # "x now refers to 10" (the 5 is gone from x)
x = x + 1     # "take the current value of x (10), add 1, and make x refer to the result (11)"
print(x)       # 11
```

That last line, `x = x + 1`, makes no sense in math (nothing equals itself plus one). But in programming it is perfectly normal. It means:

1. Look up the current value of `x` (which is `10`)
2. Add `1` to it (getting `11`)
3. Make the name `x` now refer to `11`

This is called **reassignment** — changing what a name refers to.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the value of x after these three lines run?

x: int = 10
x = x + 5
x = x * 2

Work through it step by step before running the code."</div>
</div>

## Variables Are Not Boxes — They Are Labels

Many tutorials tell you that "a variable is like a box that holds a value." This is a tempting analogy, but it is misleading. Here is a better one:

**A variable is a name tag (label) that you stick on a value.**

The value exists in your computer's memory. The variable name is just a way to find it. This difference matters because:

- A single value can have multiple name tags on it
- Moving a name tag to a new value doesn't destroy the old value
- The name tag and the value are separate things

```python
a: int = 42      # the name "a" is a label on the value 42
b: int = a       # the name "b" is now ALSO a label on the same value 42
print(a)         # 42
print(b)         # 42
```

Both `a` and `b` point to the exact same value `42` in memory. We didn't make a copy. We just put a second label on the same thing.

### Reassignment Moves the Label

```python
a: int = 42
b: int = a       # both labels on 42

a = 100          # move label "a" to a new value 100
print(a)         # 100
print(b)         # 42 — b still points to the original value
```

When we wrote `a = 100`, we moved the label `a` to a new value. We did NOT change `b`. The label `b` is still stuck on `42`.

**Open your editor. Type this example. Before you run it, predict what `a` and `b` will be. Then run it and check.**

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "After these lines, what are the values of x and y? Explain why.

x: int = 5
y: int = x
x = 99"</div>
</div>

## Multiple Names for the Same Value (Aliasing)

When two names refer to the same value, we call it **aliasing**. With simple types like integers and strings, this doesn't cause surprises. But it is still worth understanding:

```python
greeting: str = "hello"
salutation: str = greeting  # both names refer to the same "hello"

print(greeting)     # hello
print(salutation)   # hello
```

You can verify they point to the same value in memory using `id()`, which we will cover shortly.

## Naming Rules

Python has strict rules about what you can name a variable:

### You MUST Follow These Rules

1. **Start with a letter or underscore** — `name`, `_private`, `Name` are all valid
2. **Only contain letters, numbers, and underscores** — `first_name`, `age2`, `MAX_SIZE` are valid
3. **No spaces** — `first name` is NOT valid
4. **No starting with a number** — `2fast` is NOT valid
5. **Case-sensitive** — `age`, `Age`, and `AGE` are three different variables

```python
# Valid names
name: str = "Alice"
first_name: str = "Alice"
_internal: int = 42
count2: int = 10

# Invalid names — these will cause errors
# 2count = 10       # starts with a number
# my name = "Alice" # has a space
# my-name = "Alice" # has a hyphen
# class = "math"    # "class" is a reserved word in Python
```

**Open your REPL. Try creating a variable called `2fast` and see what error you get. Try `my-name`. Try `class`. Read the error messages.**

### Reserved Words

Python has words that are already taken — you cannot use them as variable names:

```
False  True   None   and    as     assert  async   await
break  class  continue  def  del   elif    else    except
finally  for  from   global  if    import  in      is
lambda  nonlocal  not  or   pass  raise   return  try
while  with  yield
```

If you accidentally use one, Python will give you a `SyntaxError`.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Which of these variable names are valid in Python, and which will cause errors? Explain why for each.

my_age, 1st_place, _hidden, first-name, class, myClass, TOTAL, hello world"</div>
</div>

## Naming Conventions — How You SHOULD Name Things

Beyond the strict rules, Python has conventions — agreed-upon styles that the community follows. You should follow them too, because other programmers (and future you) will expect it.

### snake_case for Variables and Functions

In Python, variable names use `snake_case` — all lowercase, words separated by underscores:

```python
# Good — snake_case
first_name: str = "Alice"
total_score: int = 100
is_logged_in: bool = True
max_retry_count: int = 3

# Bad — other styles (valid Python, but not the convention)
firstName: str = "Alice"    # This is camelCase — used in JavaScript, not Python
TotalScore: int = 100       # This is PascalCase — used for class names in Python
```

### Descriptive Names

Name your variables so anyone reading the code can understand what they hold:

```python
# Good — clear what these represent
user_age: int = 25
monthly_salary: float = 4500.00
is_active: bool = True

# Bad — meaningless
a: int = 25
x: float = 4500.00
flag: bool = True
```

Single-letter variable names like `x`, `i`, `n` are acceptable in very short, mathematical contexts. But for most code, be descriptive.

## Type Hints on Variables

You have already seen these in the examples. Type hints tell the reader (and tools like code editors) what type a variable is expected to hold:

```python
# With type hints — clear and professional
name: str = "Alice"
age: int = 25
price: float = 19.99
is_active: bool = True
```

Compare to without type hints:

```python
# Without type hints — works, but less clear
name = "Alice"
age = 25
price = 19.99
is_active = True
```

Both versions work exactly the same way. Python does NOT enforce type hints — they are for humans and tools, not for Python itself. But you should **always use them**. They make your code clearer and help your editor catch mistakes.

```python
# Type hints help you document what you expect
user_count: int = 0
average_score: float = 0.0
status_message: str = ""
has_errors: bool = False
```

**Get in the habit now.** Every variable you create, add a type hint. `count: int = 0` not just `count = 0`.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write variable declarations with proper type hints for: a person's name, their age, their height in meters, and whether they have a driver's license. Use snake_case naming."</div>
</div>

## Using Variables in Expressions

Variables really become useful when you combine them in calculations:

```python
price: float = 29.99
tax_rate: float = 0.08
quantity: int = 3

subtotal: float = price * quantity
tax_amount: float = subtotal * tax_rate
total: float = subtotal + tax_amount

print("Subtotal:", subtotal)
print("Tax:", tax_amount)
print("Total:", total)
```

Output:

```
Subtotal: 89.97
Tax: 7.1976
Total: 97.1676
```

Each variable builds on the previous ones. This is how real programs work — you break a problem into small steps, store each result in a named variable, and combine them.

### String Variables

```python
first_name: str = "Alice"
last_name: str = "Smith"
full_name: str = first_name + " " + last_name
print(full_name)  # Alice Smith

# Using f-strings (formatted strings) — a better way to combine text and variables
greeting: str = f"Hello, {first_name}! Your full name is {full_name}."
print(greeting)  # Hello, Alice! Your full name is Alice Smith.
```

The `f` before the string is an f-string — it lets you put variables inside `{}` braces. This is cleaner than using `+` to glue strings together.

**Open your editor. Write the price calculation example. Change the price and quantity. Run it again. Then write the name example with f-strings.**

## The id() Function — Where Values Live in Memory

Every value in Python lives somewhere in your computer's memory. The `id()` function tells you the memory address — a number that represents where that value is stored:

```python
x: int = 42
print(id(x))  # Something like 140234866478288 — a big number

y: int = 42
print(id(y))  # Might be the same number! (Python reuses small integers)

z: int = x
print(id(z))  # Definitely the same as id(x) — same value, same memory location
```

You don't need to memorize memory addresses. The point is to prove that variables are labels, not boxes:

```python
a: str = "hello"
b: str = a

print(id(a))  # Some number
print(id(b))  # Same number! Both names point to the same place in memory.

a = "world"   # Move label "a" to a new value
print(id(a))  # Different number now — "a" points somewhere new
print(id(b))  # Still the original number — "b" didn't move
```

**Open your REPL. Try `id(42)`. Try `x = 42` then `id(x)`. Try `y = 42` then `id(y)`. Are they the same? Now try with a large number like `x = 123456789` and `y = 123456789` — are those the same?**

Python caches small integers (typically -5 to 256), so `id(42)` might be the same in different variables. But for larger numbers, they might have different ids. This is a Python optimization detail, not something you need to worry about in practice.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "If a = 'hello' and b = a, and then you check id(a) and id(b), will they be the same or different? What about after you then write a = 'goodbye' — what will id(a) and id(b) be now (same or different)? Explain why."</div>
</div>

## What Happens to Old Values — Garbage Collection

When a value has no more names pointing to it, Python automatically reclaims that memory. This is called **garbage collection**.

```python
x: str = "hello"   # "hello" is in memory, x points to it
x = "world"        # x now points to "world"
                    # If nothing else points to "hello", Python can clean it up
```

You don't have to manage this yourself. Python handles it automatically. Some languages (like C) make you do this manually, which is harder and more error-prone. Python takes care of it for you.

Just know that when you reassign a variable, the old value doesn't leak or pile up. Python is tidying up behind you.

## Constants by Convention — ALL_CAPS

Sometimes you have a value that should never change during your program — like the speed of light, the number of days in a week, or a tax rate that is set by policy.

Python doesn't have a way to actually enforce that a variable can't be changed. But the convention is to name constants in `ALL_CAPS`:

```python
MAX_ATTEMPTS: int = 3
TAX_RATE: float = 0.08
PI: float = 3.14159
DEFAULT_NAME: str = "Guest"
```

When another programmer (or future you) sees `ALL_CAPS`, they understand: "this is not supposed to change." Python won't stop you from writing `PI = 999`, but the naming convention signals that you shouldn't.

```python
# These are constants — don't change them
MAX_SPEED: int = 120
MIN_AGE: int = 18
GREETING: str = "Welcome!"

# This is a regular variable — expected to change
current_speed: int = 0
current_speed = 60
current_speed = 90  # Fine — it's a regular variable
```

## Exercises

**Type every one of these. Do not skip the exercises.**

### Exercise 1: Variable Basics

```python
# Create these variables with proper type hints
your_name: str = "Your name here"
your_age: int = 0          # Put your real age
your_height: float = 0.0   # In feet or meters
likes_python: bool = True   # Be honest

# Print them all using an f-string
print(f"Name: {your_name}")
print(f"Age: {your_age}")
print(f"Height: {your_height}")
print(f"Likes Python: {likes_python}")
```

Fill in your real information. Run it.

### Exercise 2: Reassignment Tracker

Before running this code, predict the final value of `score`:

```python
score: int = 0
print("Start:", score)

score = score + 10
print("After +10:", score)

score = score * 2
print("After *2:", score)

score = score - 5
print("After -5:", score)

score = 100
print("After reset:", score)
```

Write down your predictions for each `print()` line. Then run it and check.

### Exercise 3: Labels Not Boxes

```python
a: int = 1
b: int = a
print("a:", a, "b:", b)
print("Same object?", id(a) == id(b))

a = 2
print("a:", a, "b:", b)
print("Same object?", id(a) == id(b))
```

Before you run this: will changing `a` also change `b`? Run it and see.

### Exercise 4: Calculator with Variables

```python
# A simple receipt calculator
item_name: str = "Widget"
item_price: float = 24.99
item_quantity: int = 4
tax_rate: float = 0.07

subtotal: float = item_price * item_quantity
tax: float = subtotal * tax_rate
total: float = subtotal + tax

print(f"Item: {item_name}")
print(f"Price: ${item_price} x {item_quantity}")
print(f"Subtotal: ${subtotal}")
print(f"Tax: ${tax}")
print(f"Total: ${total}")
```

Run it. Then change the item, price, and quantity. Notice how you only have to change the values at the top — the calculations update automatically. This is a huge reason to use variables.

### Exercise 5: Naming Practice

Fix the badly named variables:

```python
# Bad names — rewrite these with clear, snake_case names and type hints
a = "Alice Johnson"
b = 32
c = True
d = 75000.00
e = "Engineering"
```

Rewrite them so anyone could understand what they hold without needing context.

### Exercise 6: Break Things on Purpose

Try each of these in the REPL and read the error:

```python
>>> 1name = "Alice"
>>> my name = "Alice"
>>> class = "Math"
>>> print(undefined_variable)
```

For each error, explain what Python is telling you.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a complete Python program from scratch that: creates variables for a rectangle's width and height (with type hints), calculates the area and perimeter, and prints the results using f-strings. Use clear variable names and snake_case."</div>
</div>

## Where People Go Wrong

**1. Confusing `=` with `==`.** A single `=` is assignment — it puts a label on a value. A double `==` is comparison — it checks if two values are equal. We will cover `==` when we get to conditions, but for now remember: one equals sign means "assign."

```python
x: int = 5     # Assignment: x now refers to 5
x == 5         # Comparison: asks "is x equal to 5?" (returns True)
```

**2. Thinking variables store values directly.** Variables are names (labels), not containers (boxes). When you write `b = a`, both names point to the same value — you don't make a copy of the value.

**3. Thinking reassignment affects other variables.** If `a = 42` and `b = a`, then `a = 100` does NOT change `b`. Moving one label doesn't move other labels.

**4. Using variables before they exist.** Python reads top to bottom. You can't use a name before you've assigned it:

```python
print(score)        # NameError! score doesn't exist yet
score: int = 100    # Too late — the error already happened
```

**5. Inconsistent naming.** Pick `snake_case` and stick with it. Don't mix `firstName` and `first_name` in the same program. Python's community universally uses `snake_case` for variables.

**6. Forgetting type hints.** They are not required by Python, but they make your code much clearer. Write `age: int = 25` not `age = 25`. Make it a habit from day one.

**7. Not using descriptive names.** `x`, `a`, `temp`, and `data` tell you nothing. `user_age`, `item_price`, `is_valid`, and `error_message` tell you everything. Invest the extra keystrokes — you will thank yourself later.

## What You Learned

- A variable is a name (label) that refers to a value
- `=` is assignment: it makes a name refer to a value
- Variables are labels, not boxes — multiple names can point to the same value
- Reassigning one name doesn't affect other names pointing to the old value
- Variable names must start with a letter or underscore, and contain only letters, numbers, and underscores
- Python convention is `snake_case` for variables, `ALL_CAPS` for constants
- Always use type hints: `count: int = 0`
- `id()` shows where a value lives in memory
- Python automatically cleans up values that nothing points to anymore (garbage collection)

You now know how to create values, understand their types, and give them names. These three concepts — values, types, and variables — are the foundation of everything else you will learn. Every program you ever write will use all three.

---

**Previous:** [[wiki:python-values-and-types]] | **Next:** [[wiki:python-operators]]
