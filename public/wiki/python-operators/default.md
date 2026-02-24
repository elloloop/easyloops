# Operators and Expressions -- Combining Values

You know how to store values in variables. Now it is time to do things with those values. That is what operators are for.

## What Is an Operator?

An operator is a symbol that performs an operation on one or more values. You already know some operators from math class: `+`, `-`, `*`, `/`. Python uses these same symbols, plus a few extras.

```python
result: int = 5 + 3   # + is the operator, 5 and 3 are the values
print(result)          # 8
```

The values that an operator works on are called **operands**. In `5 + 3`, the operands are `5` and `3`.

## What Is an Expression?

An expression is any combination of values, variables, and operators that Python can evaluate to produce a new value. Every expression has a result.

```python
age: int = 25
next_year: int = age + 1   # "age + 1" is an expression that produces 26
```

If you can put it on the right side of `=` and Python can figure out a value, it is an expression.

Open your editor. Type this and run it:

```python
x: int = 10
y: int = 3
result: int = x + y * 2
print(result)
```

Before you run it, predict: will `result` be 26 or 16? Run it and see if you were right.

---

## Arithmetic Operators

These are the operators for doing math.

### Addition `+` and Subtraction `-`

These work exactly like you expect.

```python
total: int = 15 + 7    # 22
difference: int = 15 - 7   # 8
print(total)
print(difference)
```

### Multiplication `*`

```python
area: int = 6 * 4   # 24
print(area)
```

### True Division `/`

The `/` operator always gives you a float result, even when dividing two integers evenly.

```python
result: float = 10 / 3    # 3.3333333333333335
even_result: float = 10 / 2   # 5.0, not 5
print(result)
print(even_result)
```

This trips people up. `10 / 2` gives you `5.0`, not `5`. The `/` operator always returns a float.

Open your editor. Try this:

```python
a: float = 10 / 2
print(a)
print(type(a))
```

You will see `5.0` and `<class 'float'>`. Not an integer.

### Integer Division `//`

If you want to divide and throw away the decimal part, use `//`. This is sometimes called "floor division" because it rounds down to the nearest whole number.

```python
result: int = 10 // 3    # 3 (not 3.333...)
print(result)

large: int = 17 // 5     # 3
print(large)
```

This is useful when you need a whole number answer. For example, if you have 17 items and want to split them into groups of 5, you get 3 full groups.

```python
items: int = 17
group_size: int = 5
full_groups: int = items // group_size   # 3
print(full_groups)
```

### Modulo `%` -- The Remainder

The `%` operator gives you the remainder after division. This is more useful than it sounds.

```python
remainder: int = 17 % 5   # 2 (because 17 = 5 * 3 + 2)
print(remainder)
```

Common use: checking if a number is even or odd.

```python
number: int = 7
leftover: int = number % 2   # 1, so it is odd
print(leftover)

number2: int = 8
leftover2: int = number2 % 2   # 0, so it is even
print(leftover2)
```

If `number % 2` equals `0`, the number is even. If it equals `1`, the number is odd. You will use this pattern a lot.

Another use: "every Nth" patterns. Want to do something every 3rd time?

```python
step: int = 9
if step % 3 == 0:
    print("This is every 3rd step")
```

Open your editor. Type this and run it:

```python
for i in range(1, 11):
    remainder: int = i % 3
    print(f"{i} % 3 = {remainder}")
```

Look at the pattern in the output. The remainders cycle: 1, 2, 0, 1, 2, 0...

### Exponent `**` -- Power

In math class you might write 2^3 for "2 to the power of 3." In Python, `^` means something completely different. Use `**` instead.

```python
squared: int = 5 ** 2     # 25
cubed: int = 2 ** 3       # 8
big: int = 10 ** 6        # 1000000
print(squared)
print(cubed)
print(big)
```

Do not use `^` for exponents. In Python, `^` is a bitwise XOR operator, which does something completely unrelated. If you write `2 ^ 3` you will get `1`, not `8`.

Open your editor. Try this and see the difference:

```python
correct: int = 2 ** 3
wrong: int = 2 ^ 3
print(f"2 ** 3 = {correct}")   # 8
print(f"2 ^ 3 = {wrong}")     # 1 (NOT what you want)
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between / and // in Python? What does 15 / 4 give you? What does 15 // 4 give you? What does 15 % 4 give you? Tell me the answers and explain why."</div>
</div>

---

## Comparison Operators

Comparison operators compare two values and always produce a `bool` -- either `True` or `False`.

### The Full List

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | equal to | `5 == 5` | `True` |
| `!=` | not equal to | `5 != 3` | `True` |
| `<` | less than | `3 < 5` | `True` |
| `>` | greater than | `5 > 3` | `True` |
| `<=` | less than or equal to | `5 <= 5` | `True` |
| `>=` | greater than or equal to | `3 >= 5` | `False` |

```python
age: int = 20
is_adult: bool = age >= 18      # True
is_teenager: bool = age < 20    # False
is_exactly_20: bool = age == 20 # True
print(is_adult)
print(is_teenager)
print(is_exactly_20)
```

Notice the type hint. Comparison operators always produce a `bool`.

### The Biggest Beginner Mistake: `=` vs `==`

This will bite you. Guaranteed.

- `=` is **assignment**. It stores a value in a variable.
- `==` is **comparison**. It checks if two values are equal.

```python
x: int = 5     # This STORES 5 in x
x == 5         # This CHECKS if x equals 5 (produces True)
```

If you write `if x = 5:` instead of `if x == 5:`, Python will give you an error. Other languages might not even warn you, which is worse. Always double-check that you are using `==` when you mean to compare.

Open your editor. Type this:

```python
score: int = 100
print(score == 100)   # True
print(score == 99)    # False
print(score != 50)    # True
print(score > 50)     # True
print(score <= 100)   # True
```

Run it. Then change `score` to different values and predict the output before running again.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I wrote this code and it gives an error: `if score = 100:`. What is wrong and how do I fix it? Also, what type does a comparison operator always return?"</div>
</div>

---

## Logical Operators

Logical operators combine boolean values. There are three: `and`, `or`, and `not`.

### `and` -- Both Must Be True

`and` returns `True` only when **both** sides are `True`.

```python
age: int = 25
has_license: bool = True

can_drive: bool = age >= 16 and has_license
print(can_drive)   # True (both conditions are True)
```

Here is the full truth table for `and`. Read every row:

| A | B | A and B |
|---|---|---------|
| True | True | **True** |
| True | False | **False** |
| False | True | **False** |
| False | False | **False** |

Only one combination gives `True`: both must be `True`.

### `or` -- At Least One Must Be True

`or` returns `True` when **at least one** side is `True`.

```python
is_weekend: bool = True
is_holiday: bool = False

day_off: bool = is_weekend or is_holiday
print(day_off)   # True (at least one is True)
```

Truth table for `or`:

| A | B | A or B |
|---|---|--------|
| True | True | **True** |
| True | False | **True** |
| False | True | **True** |
| False | False | **False** |

Only one combination gives `False`: both must be `False`.

### `not` -- Flips the Value

`not` takes a single bool and flips it.

```python
is_raining: bool = True
is_dry: bool = not is_raining
print(is_dry)   # False
```

| A | not A |
|---|-------|
| True | **False** |
| False | **True** |

### Short-Circuit Evaluation

This is important. Python is lazy in a smart way.

With `and`: if the first value is `False`, Python does not even look at the second value. It already knows the result is `False`.

```python
x: int = 0
# Python sees x > 0 is False, so it skips the second part entirely
result: bool = x > 0 and 10 / x > 2
print(result)   # False (and no division by zero error!)
```

With `or`: if the first value is `True`, Python does not look at the second value. It already knows the result is `True`.

```python
name: str = "Alice"
# Python sees len(name) > 0 is True, so it skips the second part
result: bool = len(name) > 0 or name == "default"
print(result)   # True
```

Why does this matter? It means you can use `and` as a safety check. If the first condition fails, the potentially dangerous second condition never runs.

Open your editor. Try this:

```python
numerator: int = 10
denominator: int = 0

# This would crash without short-circuit evaluation
safe: bool = denominator != 0 and numerator / denominator > 2
print(safe)   # False (no crash!)
```

Now change `denominator` to `5` and run again. What happens?

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What does `True and False` produce? What about `True or False`? What about `not True`? If I write `False and some_function()`, does some_function() get called? Why or why not?"</div>
</div>

---

## String Operators

Strings have their own operators.

### Concatenation `+` -- Joining Strings

```python
first: str = "Hello"
second: str = " World"
greeting: str = first + second
print(greeting)   # "Hello World"
```

Important: you can only concatenate strings with strings. This will crash:

```python
age: int = 25
# message: str = "I am " + age   # ERROR! Cannot add str and int
message: str = "I am " + str(age)   # Convert int to str first
print(message)
```

Usually, f-strings are easier:

```python
age: int = 25
message: str = f"I am {age}"   # f-string handles the conversion
print(message)
```

### Repetition `*` -- Repeating Strings

```python
line: str = "-" * 40
print(line)   # ----------------------------------------

cheer: str = "Hip! " * 3
print(cheer)   # Hip! Hip! Hip!
```

Open your editor. Try this:

```python
border: str = "=" * 30
title: str = "MY PROGRAM"
print(border)
print(title)
print(border)
```

Run it. Change the number and see what happens.

---

## Operator Precedence -- What Happens First?

Just like in math, Python follows an order of operations. Here is the order from highest priority (happens first) to lowest:

1. `**` (exponent)
2. `*`, `/`, `//`, `%` (multiplication, division, modulo)
3. `+`, `-` (addition, subtraction)
4. `==`, `!=`, `<`, `>`, `<=`, `>=` (comparisons)
5. `not`
6. `and`
7. `or`

```python
result: int = 2 + 3 * 4   # 14, not 20 (multiplication first)
print(result)
```

**When in doubt, use parentheses.** They make your intent clear and prevent bugs.

```python
# These are clearer and less error-prone
result1: int = (2 + 3) * 4   # 20
result2: int = 2 + (3 * 4)   # 14
print(result1)
print(result2)
```

Parentheses are free. Use them. Nobody will judge you for making your code easier to read.

```python
# Hard to read -- what happens first?
value: bool = x > 5 and y < 10 or z == 0

# Much clearer
value: bool = (x > 5 and y < 10) or (z == 0)
```

Open your editor. Predict the result of each line, then run it:

```python
a: int = 2 + 3 * 4
b: int = (2 + 3) * 4
c: int = 2 ** 3 + 1
d: int = 2 ** (3 + 1)
print(f"a = {a}")
print(f"b = {b}")
print(f"c = {c}")
print(f"d = {d}")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the value of `2 + 3 * 4`? What about `(2 + 3) * 4`? Why are they different? What is the simplest rule to follow when you are not sure about operator precedence?"</div>
</div>

---

## Augmented Assignment Operators

These are shortcuts for updating a variable using its current value.

```python
score: int = 100

score = score + 10   # Long way
score += 10          # Short way (same thing)

print(score)   # 120
```

Here are all the common ones:

| Long Form | Shortcut | Meaning |
|-----------|----------|---------|
| `x = x + 5` | `x += 5` | Add 5 to x |
| `x = x - 3` | `x -= 3` | Subtract 3 from x |
| `x = x * 2` | `x *= 2` | Multiply x by 2 |
| `x = x / 4` | `x /= 4` | Divide x by 4 |
| `x = x // 3` | `x //= 3` | Integer-divide x by 3 |
| `x = x % 2` | `x %= 2` | Remainder of x divided by 2 |
| `x = x ** 2` | `x **= 2` | Raise x to the power of 2 |

```python
count: int = 0
count += 1    # count is now 1
count += 1    # count is now 2
count += 1    # count is now 3
print(count)  # 3
```

This pattern -- incrementing a counter -- shows up everywhere in programming.

You can also use `+=` with strings:

```python
message: str = "Hello"
message += " World"
print(message)   # "Hello World"
```

Open your editor. Try this:

```python
balance: float = 1000.0
balance += 500.0    # deposit
print(f"After deposit: {balance}")
balance -= 200.0    # withdrawal
print(f"After withdrawal: {balance}")
balance *= 1.05     # 5% interest
print(f"After interest: {balance}")
```

---

## Type Hints in Expressions -- Watching Types Flow

When you combine values with operators, the result has a type. You should always know what type your expression produces.

```python
# int + int = int
a: int = 5 + 3           # int

# int / int = float (always!)
b: float = 10 / 2        # float, even though result is 5.0

# int // int = int
c: int = 10 // 3         # int

# int * float = float
d: float = 5 * 2.5       # float

# str + str = str
e: str = "Hello" + " World"   # str

# comparison = bool
f: bool = 5 > 3          # bool

# logical = bool
g: bool = True and False  # bool
```

The general rule: if any operand is a float, the result is a float (for arithmetic). If you use `/`, the result is always a float.

Open your editor. Type this and run it to verify:

```python
x: int = 10
y: int = 3

print(type(x + y))     # int
print(type(x / y))     # float
print(type(x // y))    # int
print(type(x * 1.0))   # float
print(type(x > y))     # bool
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What type does each of these expressions produce? (1) `7 + 3` (2) `7 / 3` (3) `7 // 3` (4) `7 > 3` (5) `7 * 2.0` -- explain your reasoning for each."</div>
</div>

---

## Where People Go Wrong

These are the mistakes almost everyone makes. Read them now so you can recognize them later.

### Mistake 1: Using `=` Instead of `==`

```python
x: int = 5

# WRONG -- this is assignment, not comparison
# if x = 5:   # SyntaxError!

# RIGHT -- this is comparison
if x == 5:
    print("x is five")
```

### Mistake 2: Using `^` for Exponents

```python
# WRONG -- ^ is bitwise XOR, not exponent
wrong: int = 2 ^ 3    # 1, not 8

# RIGHT -- ** is the exponent operator
right: int = 2 ** 3   # 8
```

### Mistake 3: Forgetting That `/` Always Returns a Float

```python
# You might expect an int, but you get a float
result: float = 10 / 2   # 5.0, not 5

# If you need an int, use //
result_int: int = 10 // 2   # 5
```

### Mistake 4: Integer Division Rounding Direction

`//` rounds toward negative infinity, not toward zero. This matters with negative numbers.

```python
positive: int = 7 // 2     # 3 (rounds down)
negative: int = -7 // 2    # -4 (rounds down, toward negative infinity!)
print(positive)
print(negative)
```

This surprises people. `-7 // 2` is `-4`, not `-3`. It rounds **down** (toward negative infinity), not toward zero.

### Mistake 5: Concatenating a String and a Number

```python
age: int = 25

# WRONG -- cannot add str and int
# message: str = "Age: " + age   # TypeError!

# RIGHT -- convert to string first
message: str = "Age: " + str(age)

# BETTER -- use an f-string
message: str = f"Age: {age}"
```

### Mistake 6: Confusing `and`/`or` with English

In English, "Is x 5 or 10?" makes sense. In Python, you cannot write it that way.

```python
x: int = 7

# WRONG -- this does not do what you think
# if x == 5 or 10:   # This is always True! (10 is truthy)

# RIGHT -- compare x to each value separately
if x == 5 or x == 10:
    print("x is 5 or 10")
```

### Mistake 7: Modulo with Negative Numbers

```python
# This can be confusing
result: int = -7 % 3   # 2, not -1
print(result)
```

In Python, the result of `%` always has the same sign as the divisor (the number after `%`). This is different from some other languages. For now, just be aware that modulo with negative numbers can be surprising.

Open your editor. Try each of the "wrong" examples above (one at a time) to see the errors or unexpected results for yourself. Understanding what goes wrong is just as important as knowing what goes right.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "List three common mistakes with Python operators and explain how to avoid each one. Include a code example for each."</div>
</div>

---

## Putting It All Together

Here is a small program that uses many of the operators you learned. Open your editor, type it in (do not copy-paste), and run it.

```python
# Temperature converter
fahrenheit: float = 98.6
celsius: float = (fahrenheit - 32) * 5 / 9
print(f"{fahrenheit}F = {celsius:.1f}C")

# Check if a year is a leap year
year: int = 2024
is_leap: bool = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
print(f"{year} is a leap year: {is_leap}")

# Simple interest calculator
principal: float = 1000.0
rate: float = 0.05
years: int = 3
interest: float = principal * rate * years
total: float = principal + interest
print(f"Principal: ${principal:.2f}")
print(f"Interest after {years} years: ${interest:.2f}")
print(f"Total: ${total:.2f}")
```

Change the input values and run it again. Try a different temperature, a different year, a different principal amount. Every time you change something and predict the result, you learn.

---

**Previous:** [[wiki:python-variables-and-memory]] | **Next:** [[wiki:python-conditions]]
