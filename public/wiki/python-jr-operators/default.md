# Operators and Expressions -- Doing Things With Values

You already know how to create values, check their types, store them in variables, and print them with f-strings. But so far, your programs have mostly just stored things and printed them. Now it is time to actually **do things** with your values.

That is what **operators** are for.

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a workbench with colorful building blocks labeled with math symbols like +, -, *, and /. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is an Operator?

An **operator** is a symbol that does something to values. You already know some from math class:

- `+` adds things
- `-` subtracts things
- `*` multiplies things
- `/` divides things

In Python, these symbols work the same way, plus there are some new ones you have not seen before.

```python
result: int = 5 + 3
print(result)  # 8
```

The `+` is the operator. The `5` and `3` are the values it works on (programmers call these **operands** -- the things being operated on, like the ingredients in a recipe).

## What Is an Expression?

An **expression** is any combination of values, variables, and operators that Python can figure out the answer to. Every expression produces a result.

```python
age: int = 10
next_year: int = age + 1   # "age + 1" is an expression -- Python figures it out to be 11
```

Here is an easy way to think about it: if you can put it on the right side of `=` and Python can work out a value, it is an expression.

- `5 + 3` is an expression (Python figures out `8`)
- `age * 2` is an expression (Python figures out double whatever `age` is)
- `"Hi " + name` is an expression (Python figures out the two texts joined together)

---

## Arithmetic Operators -- Doing Math

These are the operators for doing math. You will use them all the time.

### Addition `+` and Subtraction `-`

These work exactly like you expect from math class.

```python
total: int = 15 + 7      # 22
difference: int = 15 - 7  # 8
print(total)
print(difference)
```

You can use them with variables too:

```python
apples: int = 10
eaten: int = 3
remaining: int = apples - eaten
print(f"You have {remaining} apples left.")  # You have 7 apples left.
```

### Multiplication `*`

The `*` symbol means multiply. On your keyboard, it is the asterisk (Shift + 8 on most keyboards).

```python
width: int = 6
height: int = 4
area: int = width * height
print(f"The area is {area}")  # The area is 24
```

### Division `/` -- Always Gives a Decimal

Here is something that surprises a lot of people. The `/` operator **always** gives you a decimal number (a `float`), even when the numbers divide evenly.

```python
result: float = 10 / 2
print(result)       # 5.0  (not 5 -- notice the decimal point!)
print(type(result)) # <class 'float'>
```

Even though 10 divided by 2 is a nice clean 5, Python gives you `5.0` with a decimal point. That is just how `/` works -- it always returns a `float`.

```python
result: float = 7 / 2
print(result)  # 3.5
```

### Whole Number Division `//` -- Throw Away the Decimal

What if you want to divide but only keep the whole number part, with no decimal? Use `//` (two slashes).

Think of sharing candy. If you have 17 candies and share them equally among 5 friends:

```python
candies: int = 17
friends: int = 5
each_gets: int = candies // friends
print(each_gets)  # 3
```

Each friend gets **3** whole candies. The `//` operator throws away the leftover part. It does not round -- it just chops off the decimal.

### Remainder `%` -- What Is Left Over?

The `%` operator (called **modulo**) tells you the **leftover** after dividing. Back to our candy example:

```python
candies: int = 17
friends: int = 5
leftover: int = candies % friends
print(leftover)  # 2
```

17 candies shared among 5 friends: each friend gets 3 (that is `17 // 5`), and you have **2 left over** (that is `17 % 5`). Together, `//` and `%` tell you the whole story of a division.

![A flat vector illustration in a children's educational book style showing Byte the robot dividing 17 colorful candies into 5 equal groups of 3, with 2 candies remaining in a separate pile. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

One really common use: checking if a number is even or odd.

```python
number: int = 7
leftover: int = number % 2
print(leftover)  # 1 -- so 7 is odd

number2: int = 8
leftover2: int = number2 % 2
print(leftover2)  # 0 -- so 8 is even
```

If a number divided by 2 has **no remainder** (`% 2` gives `0`), it is even. If it has a remainder of `1`, it is odd. You will use this trick a lot.

### Power `**` -- Multiplying a Number by Itself

In math class, you might write 2 to the power of 3 as 2^3 (which means 2 times 2 times 2). In Python, you use **two asterisks** `**`:

```python
squared: int = 5 ** 2    # 5 * 5 = 25
cubed: int = 2 ** 3      # 2 * 2 * 2 = 8
big_number: int = 10 ** 6  # 1,000,000 (a million!)

print(squared)     # 25
print(cubed)       # 8
print(big_number)  # 1000000
```

**Warning:** Do NOT use `^` for powers. In Python, `^` does something completely different (and confusing). Always use `**`.

```python
# RIGHT way to do powers
print(2 ** 3)  # 8

# WRONG -- ^ does NOT mean "to the power of"
print(2 ^ 3)   # 1 (this is NOT what you want!)
```

### Quick Reference Table

| Operator | What It Does | Example | Result |
|----------|-------------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division (always decimal) | `7 / 2` | `3.5` |
| `//` | Whole number division | `7 // 2` | `3` |
| `%` | Remainder (leftover) | `7 % 2` | `1` |
| `**` | Power | `2 ** 3` | `8` |

**Try it yourself.** Open your Python editor and try every single one of these operators. Change the numbers. Experiment.

---

## Comparison Operators -- Asking Yes-or-No Questions

Comparison operators ask a question about two values and always give you a **yes or no** answer -- in Python, that means `True` or `False` (a `bool`).

### The Full List

| Operator | What It Asks | Example | Answer |
|----------|-------------|---------|--------|
| `==` | Are these the same? | `5 == 5` | `True` |
| `!=` | Are these different? | `5 != 3` | `True` |
| `<` | Is the left one smaller? | `3 < 5` | `True` |
| `>` | Is the left one bigger? | `5 > 3` | `True` |
| `<=` | Is the left one smaller or equal? | `5 <= 5` | `True` |
| `>=` | Is the left one bigger or equal? | `3 >= 5` | `False` |

```python
score: int = 85

print(score > 50)    # True  -- 85 is bigger than 50
print(score < 50)    # False -- 85 is NOT smaller than 50
print(score == 85)   # True  -- 85 is the same as 85
print(score != 100)  # True  -- 85 is NOT the same as 100
print(score >= 85)   # True  -- 85 is bigger than or equal to 85
print(score <= 90)   # True  -- 85 is smaller than or equal to 90
```

### BIG WARNING: `=` vs `==`

This is the number one mistake that every beginner makes. Read this carefully:

> - **One `=`** means "make this name point to this value" (assignment -- you learned this in the variables lesson)
> - **Two `==`** means "are these two things the same?" (comparison)

```python
score: int = 85     # ONE = sign: "score now points to 85"
print(score == 85)  # TWO = signs: "is score the same as 85?" (True)
print(score == 100) # TWO = signs: "is score the same as 100?" (False)
```

If you mix them up, Python will give you an error or your code will do the wrong thing. Always ask yourself: "Am I storing a value, or asking a question?"

- Storing a value? Use `=`
- Asking a question? Use `==`

---

## Logical Operators -- Combining Yes/No Answers

Sometimes one yes-or-no question is not enough. You need to combine them. That is what **logical operators** do. There are three: `and`, `or`, and `not`.

### `and` -- Both Must Be True

Think of going to a movie: you need a ticket **AND** the movie must be showing. If either one is missing, you cannot watch the movie.

```python
has_ticket: bool = True
movie_is_showing: bool = True

can_watch: bool = has_ticket and movie_is_showing
print(can_watch)  # True -- both are True, so you can watch!
```

```python
has_ticket: bool = True
movie_is_showing: bool = False

can_watch: bool = has_ticket and movie_is_showing
print(can_watch)  # False -- the movie is not showing, so no luck
```

The rule for `and`: **both sides must be True** for the whole thing to be True. If either side is False, the result is False.

| Left Side | Right Side | Left `and` Right |
|-----------|-----------|-----------------|
| True | True | **True** |
| True | False | **False** |
| False | True | **False** |
| False | False | **False** |

### `or` -- At Least One Must Be True

Think of paying for lunch: you can pay with cash **OR** a card. As long as you have at least one, you are fine.

```python
has_cash: bool = False
has_card: bool = True

can_pay: bool = has_cash or has_card
print(can_pay)  # True -- you have a card, so you can pay!
```

The rule for `or`: **at least one side must be True** for the whole thing to be True. The only way to get False is if both sides are False.

| Left Side | Right Side | Left `or` Right |
|-----------|-----------|-----------------|
| True | True | **True** |
| True | False | **True** |
| False | True | **True** |
| False | False | **False** |

### `not` -- Flip It

`not` takes a single True/False value and flips it to the opposite.

```python
is_raining: bool = True
is_dry: bool = not is_raining
print(is_dry)  # False -- if it IS raining, it is NOT dry
```

```python
is_raining: bool = False
is_dry: bool = not is_raining
print(is_dry)  # True -- if it is NOT raining, it IS dry
```

| Value | `not` Value |
|-------|------------|
| True | **False** |
| False | **True** |

### Combining Them

You can combine these to ask more complex questions:

```python
age: int = 12
has_permission: bool = True

# Can you ride the roller coaster?
# You must be at least 10 AND have permission
can_ride: bool = age >= 10 and has_permission
print(f"Can ride? {can_ride}")  # True

# Can you skip school?
# It must be a weekend OR a holiday
is_weekend: bool = False
is_holiday: bool = False
day_off: bool = is_weekend or is_holiday
print(f"Day off? {day_off}")  # False
```

---

## String Operators -- Working With Text

The `+` and `*` operators do special things when used with text (strings).

### `+` Joins Text Together

When you use `+` with two strings, it glues them together (this is called **concatenation**):

```python
first: str = "Hello"
second: str = " World"
greeting: str = first + second
print(greeting)  # Hello World
```

Important: you can only use `+` with two strings. You cannot add a string and a number:

```python
# This will cause an error:
# result = "Score: " + 100

# Fix it by converting the number to text first:
result: str = "Score: " + str(100)
print(result)  # Score: 100

# Or even better, use an f-string:
score: int = 100
result: str = f"Score: {score}"
print(result)  # Score: 100
```

### `*` Repeats Text

When you use `*` with a string and a number, it repeats the text that many times:

```python
line: str = "-" * 20
print(line)  # --------------------

cheer: str = "Go! " * 3
print(cheer)  # Go! Go! Go!

print("Ha" * 5)  # HaHaHaHaHa
```

This is really handy for making borders or decorations in your output:

```python
border: str = "=" * 30
title: str = "MY GAME"
print(border)
print(title)
print(border)
```

Output:
```
==============================
MY GAME
==============================
```

---

## Operator Precedence -- What Happens First?

When you have multiple operators in one expression, Python needs to know which one to do first. This is called **operator precedence** (the order of operations).

You might already know this from math class as **PEMDAS**:

1. **P**arentheses first -- `()`
2. **E**xponents -- `**`
3. **M**ultiplication and **D**ivision -- `*`, `/`, `//`, `%`
4. **A**ddition and **S**ubtraction -- `+`, `-`

Python follows the same order, plus a few extras for comparisons and logical operators:

1. `()` Parentheses
2. `**` Power
3. `*`, `/`, `//`, `%` Multiplication, division, remainder
4. `+`, `-` Addition, subtraction
5. `==`, `!=`, `<`, `>`, `<=`, `>=` Comparisons
6. `not`
7. `and`
8. `or`

Here is why this matters:

```python
result: int = 2 + 3 * 4
print(result)  # 14, NOT 20
```

Python does the multiplication first (`3 * 4 = 12`), then the addition (`2 + 12 = 14`). Just like in math class.

If you want the addition to happen first, use parentheses:

```python
result: int = (2 + 3) * 4
print(result)  # 20
```

**The golden rule:** When you are not sure which operation happens first, **use parentheses**. They make your code easier to read and prevent mistakes.

```python
# Hard to figure out at a glance -- what happens first?
value: int = 5 + 3 * 2 - 1

# Much clearer with parentheses
value: int = 5 + (3 * 2) - 1
```

Both lines give the same answer (`10`), but the second one is easier to understand.

![A flat vector illustration in a children's educational book style showing Byte the robot arranging operation blocks in order of priority on a staircase, with parentheses at the top and or at the bottom. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Augmented Assignment -- Shortcuts for Updating Variables

You already know how to update a variable:

```python
score: int = 100
score = score + 10  # add 10 to score
print(score)  # 110
```

Python gives you a shortcut for this. Instead of writing `score = score + 10`, you can write:

```python
score: int = 100
score += 10  # same thing: add 10 to score
print(score)  # 110
```

The `+=` means "take the current value, add this to it, and update." Here are all the common shortcuts:

| Long Way | Shortcut | What It Means |
|----------|----------|--------------|
| `x = x + 5` | `x += 5` | Add 5 to x |
| `x = x - 3` | `x -= 3` | Subtract 3 from x |
| `x = x * 2` | `x *= 2` | Multiply x by 2 |
| `x = x / 4` | `x /= 4` | Divide x by 4 |
| `x = x // 3` | `x //= 3` | Whole-number-divide x by 3 |
| `x = x % 2` | `x %= 2` | Get the remainder of x divided by 2 |
| `x = x ** 2` | `x **= 2` | Raise x to the power of 2 |

These shortcuts are very common in real programs. Here is an example that keeps track of a bank balance:

```python
balance: float = 100.00

balance += 50.00   # deposit: 100 + 50 = 150
print(f"After deposit: ${balance}")

balance -= 20.00   # withdrawal: 150 - 20 = 130
print(f"After withdrawal: ${balance}")

balance *= 1.05    # 5% interest: 130 * 1.05 = 136.5
print(f"After interest: ${balance}")
```

You can also use `+=` with strings:

```python
message: str = "Hello"
message += " World"
message += "!"
print(message)  # Hello World!
```

---

## Exercises

**Type every one of these. Do not skip them.**

### Exercise 1: Candy Sharing

```python
total_candies: int = 23
friends: int = 4

each_gets: int = total_candies // friends
leftover: int = total_candies % friends

print(f"You have {total_candies} candies and {friends} friends.")
print(f"Each friend gets {each_gets} candies.")
print(f"You have {leftover} candies left over.")
```

Run it. Then change the numbers and predict the output before running again.

### Exercise 2: Temperature Converter

```python
fahrenheit: float = 98.6
celsius: float = (fahrenheit - 32) * 5 / 9
print(f"{fahrenheit} degrees F = {celsius:.1f} degrees C")
```

The `:.1f` inside the f-string means "show one decimal place." Try different temperatures: 32 (freezing), 212 (boiling), 72 (room temperature).

### Exercise 3: Even or Odd Checker

```python
number: int = 17
remainder: int = number % 2

if remainder == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")
```

Try it with several numbers: 4, 7, 0, 100, 33.

### Exercise 4: Predict the Output

Before running this, write down what you think each line will print. Then run it and check.

```python
a: int = 10
b: int = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
```

### Exercise 5: Comparison Practice

```python
x: int = 15

print(f"x == 15: {x == 15}")
print(f"x != 10: {x != 10}")
print(f"x > 20: {x > 20}")
print(f"x < 20: {x < 20}")
print(f"x >= 15: {x >= 15}")
print(f"x <= 10: {x <= 10}")
```

Before running, predict which ones will be `True` and which will be `False`.

### Exercise 6: Build a Progress Bar

Use string repetition to make a simple progress bar:

```python
total: int = 20
filled: int = 14
empty: int = total - filled

bar: str = "#" * filled + "-" * empty
percent: float = filled / total * 100

print(f"[{bar}] {percent:.0f}%")
```

Change `filled` to different numbers (from 0 to 20) and see how the bar changes.

---

## Common Mistakes to Watch For

**1. Using `=` when you mean `==`.** One `=` stores a value. Two `==` asks "are these the same?" If you write `score = 100` when you meant to check if score is 100, you will overwrite score instead of checking it.

**2. Using `^` for powers.** In Python, `^` does NOT mean "to the power of." Use `**` instead. `2 ** 3` gives you `8`. `2 ^ 3` gives you `1` (which is wrong and confusing).

**3. Forgetting that `/` always gives a decimal.** `10 / 2` gives you `5.0`, not `5`. If you need a whole number, use `//`.

**4. Trying to add a string and a number.** `"Score: " + 100` will cause an error. Convert the number first with `str(100)`, or better yet, use an f-string: `f"Score: {100}"`.

**5. Forgetting operator precedence.** `2 + 3 * 4` is `14`, not `20`. When in doubt, use parentheses: `(2 + 3) * 4` is `20`.

---

## What You Learned

- An **operator** is a symbol that does something to values (like `+`, `-`, `*`, `/`)
- An **expression** is a combination that Python can figure out the answer to
- **Arithmetic operators**: `+`, `-`, `*`, `/` (decimal division), `//` (whole number division), `%` (remainder), `**` (power)
- **Comparison operators**: `==`, `!=`, `<`, `>`, `<=`, `>=` -- they always give `True` or `False`
- `=` means "store" and `==` means "is the same as?" -- do not mix them up
- **Logical operators**: `and` (both must be true), `or` (at least one must be true), `not` (flip it)
- **String operators**: `+` joins text, `*` repeats text
- **Operator precedence** follows the same PEMDAS rules as math class -- use parentheses when in doubt
- **Augmented assignment** shortcuts: `+=`, `-=`, `*=` and others save you from writing the variable name twice

---

## Practice Questions

**1.** What will this code print?

```python
candies: int = 20
friends: int = 6
print(candies // friends)
print(candies % friends)
```

**2.** What is the difference between `/` and `//`? What does `15 / 4` give you? What does `15 // 4` give you?

**3.** What will this code print?

```python
result: int = 2 + 3 * 4
print(result)
```

And what would it print if you changed it to `(2 + 3) * 4`?

**4.** What is wrong with this code?

```python
name: str = "Sam"
age: int = 12
message: str = "My name is " + name + " and I am " + age + " years old."
```

**5.** What does each of these produce -- `True` or `False`?

```python
print(10 > 5)
print(10 == 5)
print(True and False)
print(True or False)
print(not True)
```

**6.** What will `score` be at the end of this code?

```python
score: int = 0
score += 10
score *= 3
score -= 5
print(score)
```

**7.** A student wrote this code to check if a number is even. What is wrong?

```python
number: int = 8
is_even: bool = number / 2 == 0
print(is_even)
```

---

## Answers to Practice Questions

**1.** It prints `3` and then `2`. When you share 20 candies among 6 friends: each gets 3 whole candies (`20 // 6 = 3`) and there are 2 left over (`20 % 6 = 2`), because 6 times 3 is 18, and 20 minus 18 is 2.

**2.** `/` is normal division that always gives a decimal (`float`). `//` is whole number division that throws away the decimal part. `15 / 4` gives `3.75`. `15 // 4` gives `3`.

**3.** It prints `14`. Because of operator precedence, multiplication happens before addition: `3 * 4 = 12`, then `2 + 12 = 14`. If you change it to `(2 + 3) * 4`, the parentheses force addition first: `2 + 3 = 5`, then `5 * 4 = 20`.

**4.** You cannot use `+` to join a string and an integer. The `age` variable is an `int`, so `+ age +` will cause a `TypeError`. Fix it by converting age to a string: `str(age)`, or better yet, use an f-string: `f"My name is {name} and I am {age} years old."`

**5.**
- `10 > 5` is `True` (10 is bigger than 5)
- `10 == 5` is `False` (10 is not the same as 5)
- `True and False` is `False` (with `and`, both must be True)
- `True or False` is `True` (with `or`, at least one must be True)
- `not True` is `False` (`not` flips the value)

**6.** `score` is `25`. Step by step: starts at `0`, add `10` makes it `10`, multiply by `3` makes it `30`, subtract `5` makes it `25`.

**7.** The student used `/` instead of `%`. The expression `number / 2` gives `4.0` (regular division), and `4.0 == 0` is `False`. To check if a number is even, you need the **remainder**: `number % 2 == 0`. If the remainder is `0`, the number is even.

---

**Previous:** [[wiki:python-jr-variables-and-memory]] | **Next:** [[wiki:python-jr-conditions]]
