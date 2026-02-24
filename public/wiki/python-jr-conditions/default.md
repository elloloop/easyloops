# Conditions -- Making Decisions in Your Code

Every program you have written so far runs every line, from top to bottom, every single time. But real programs need to make **decisions**. They need to check something and then do different things depending on the answer.

Think of a fork in the road. You come to a split and a sign says "If it is raining, go left to the shelter. Otherwise, go right to the park." That is exactly what conditions do in Python.

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a fork in a colorful path, with a signpost showing two arrows pointing in different directions labeled with checkmarks and X marks. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The `if` Statement -- Do This Only When Something Is True

The `if` statement is the most basic decision-making tool. It says: "**If** this thing is true, **then** do this."

```python
temperature: int = 35

if temperature > 30:
    print("It is hot outside!")
```

If `temperature` is bigger than 30, the indented line runs and you see the message. If `temperature` is 30 or less, Python skips that line entirely and moves on.

There are three important things to notice:

1. **The condition** (`temperature > 30`) is an expression that gives `True` or `False`. You learned about comparison operators like `>`, `<`, `==` in the operators lesson.
2. **The colon** (`:`) at the end of the `if` line. You must have it. Python will give you an error if you forget it.
3. **The indentation** (the spaces at the beginning of the next line). This is how Python knows which code "belongs to" the `if`. Everything indented under the `if` only runs when the condition is `True`.

### Indentation -- The Spaces Matter

In Python, the spaces at the beginning of a line are not just for looks. They tell Python which code is part of the `if` block.

```python
score: int = 85

if score >= 70:
    print("You passed!")          # This is inside the if
    print("Congratulations!")     # This is also inside the if

print("Thanks for playing.")     # This is OUTSIDE the if -- it always runs
```

The first two `print` lines are indented (they have 4 spaces at the beginning), so they only run when `score >= 70`. The last `print` is not indented, so it runs no matter what.

**Use exactly 4 spaces for each level of indentation.** Most code editors will do this automatically when you press the Tab key.

**Try it yourself.** Type this code and run it:

```python
age: int = 10

if age >= 13:
    print("You are a teenager or older.")
    print("You can create your own account.")

print("Program finished.")
```

Run it with `age = 10`. Then change it to `age = 15` and run again. Notice which lines print each time.

---

## The `else` Clause -- Do This OR That

Often you want to do one thing if the condition is true and a **different** thing if it is false. That is what `else` is for.

```python
age: int = 10

if age >= 13:
    print("You can create an account.")
else:
    print("You are too young for an account.")
```

With `if`/`else`, **exactly one** of the two blocks always runs. Never both, never neither. If the condition is `True`, the `if` block runs. If the condition is `False`, the `else` block runs.

Think of it like a light switch: it is either on or off. There is no in-between.

```python
number: int = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")
```

Remember from the operators lesson: `%` gives the remainder. If `number % 2` is `0`, the number is even. Otherwise, it is odd.

**Try it yourself.** Run the code above with `number = 7`, then `number = 4`, then `number = 0`. Predict the output each time before running.

---

## The `elif` Clause -- Checking Multiple Things

Sometimes you have more than two choices. Think of a set of doors: you check the first one, and if it is locked, you try the next one, and the next one, until you find one that opens. If none open, you go to the default.

That is what `elif` (short for "else if") does.

```python
score: int = 85

if score >= 90:
    grade: str = "A"
elif score >= 80:
    grade: str = "B"
elif score >= 70:
    grade: str = "C"
elif score >= 60:
    grade: str = "D"
else:
    grade: str = "F"

print(f"Your score is {score} and your grade is {grade}.")
```

Python checks each condition from top to bottom. The moment it finds one that is `True`, it runs that block and **skips everything below it**. If none of the conditions are `True`, the `else` block runs.

For a score of 85:
1. Is `85 >= 90`? No. Move on.
2. Is `85 >= 80`? Yes! Run this block. `grade` is `"B"`.
3. Skip everything else.

![A flat vector illustration in a children's educational book style showing Byte the robot checking a series of colorful doors numbered with grade letters A through F, with the B door glowing and open. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

### Order Matters!

The order of your conditions is very important. Python stops at the **first** condition that is True. If you put a "weaker" check before a "stronger" one, you will get wrong results:

```python
# WRONG ORDER -- a score of 95 would get "C"!
score: int = 95

if score >= 70:
    grade: str = "C"   # 95 >= 70 is True, so Python stops here!
elif score >= 80:
    grade: str = "B"   # Never reached for 95
elif score >= 90:
    grade: str = "A"   # Never reached for 95
```

Always put the most specific (strictest) condition first. Check for `>= 90` before `>= 80` before `>= 70`.

**Try it yourself.** Type the grading program (the correct version) and test it with scores: 95, 85, 75, 65, 50. Make sure each grade is correct.

---

## Boolean Expressions in Conditions

The condition inside an `if` statement is just any expression that gives `True` or `False`. You learned about comparison operators and logical operators (`and`, `or`, `not`) in the operators lesson. Now you put them to work.

### Using `and` -- Both Must Be True

```python
age: int = 12
has_permission: bool = True

if age >= 10 and has_permission:
    print("You can ride the roller coaster!")
else:
    print("Sorry, you cannot ride.")
```

Both conditions must be True. You must be at least 10 **and** you must have permission.

### Using `or` -- At Least One Must Be True

```python
is_weekend: bool = True
is_holiday: bool = False

if is_weekend or is_holiday:
    print("No school today!")
else:
    print("Time for school.")
```

At least one must be True. It is a weekend **or** a holiday (or both).

### Using `not` -- Flip It

```python
is_raining: bool = False

if not is_raining:
    print("Let's go to the park!")
else:
    print("Better stay inside.")
```

`not is_raining` flips the value. If `is_raining` is `False`, then `not is_raining` is `True`.

### Combining Them

You can combine `and`, `or`, and `not` to make more complex checks:

```python
hour: int = 14
is_weekday: bool = True

if is_weekday and hour >= 9 and hour < 15:
    print("School is in session.")
elif is_weekday:
    print("It is a weekday, but school is out.")
else:
    print("It is the weekend!")
```

**Try it yourself.** Change `hour` and `is_weekday` to different values and predict what will print each time.

---

## Nesting -- An `if` Inside an `if`

You can put an `if` statement inside another `if` statement. This is called **nesting**. Think of it as checking multiple things, one after another.

```python
age: int = 15
has_ticket: bool = True

if age >= 12:
    print("You are old enough.")
    if has_ticket:
        print("Welcome to the show!")
    else:
        print("You need to buy a ticket first.")
else:
    print("Sorry, you must be at least 12.")
```

Notice the indentation: the inner `if` is indented inside the outer `if`. Each level of nesting adds another 4 spaces.

Step by step for `age = 15` and `has_ticket = True`:
1. Is `15 >= 12`? Yes. Enter the first `if` block.
2. Print "You are old enough."
3. Is `has_ticket` True? Yes. Enter the inner `if` block.
4. Print "Welcome to the show!"

Now try `age = 15` and `has_ticket = False`. Then try `age = 10`.

**A word of caution:** If you find yourself nesting more than two or three levels deep, your code is getting hard to read. There are usually better ways to organize it (you will learn some later). For now, try to keep nesting to two levels at most.

---

## The Ternary Expression -- A Shortcut for Simple Choices

Sometimes you just need to pick one of two values based on a condition. Python has a one-line shortcut for this:

```python
age: int = 15
status: str = "teenager" if age >= 13 else "kid"
print(status)  # teenager
```

Read it like an English sentence: "status is 'teenager' **if** age is at least 13, **else** it is 'kid'."

This is the same as writing:

```python
age: int = 15
if age >= 13:
    status: str = "teenager"
else:
    status: str = "kid"
print(status)
```

The one-line version is called a **ternary expression** (ternary means "three parts": the value-if-true, the condition, and the value-if-false).

Use it when the choice is simple. If the logic is more complex, use a regular `if`/`else` -- being easy to read is more important than saving lines.

```python
# Good use -- simple and clear
label: str = "even" if number % 2 == 0 else "odd"

# Bad use -- too complicated for one line
# grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
# Use a regular if/elif/else for this instead!
```

---

## Common Patterns You Will See Again and Again

These patterns show up so often that they are worth memorizing.

### Checking Even or Odd

```python
number: int = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")
```

Remember: `%` gives the remainder. If dividing by 2 leaves no remainder, the number is even.

### Checking if a Number Is in a Range

```python
age: int = 15

if 13 <= age <= 19:
    print("You are a teenager!")
```

Python lets you chain comparisons like this. `13 <= age <= 19` means "age is between 13 and 19, including both." This is much nicer than writing `age >= 13 and age <= 19` (though that works too).

### Checking if Something Is in a List

The word `in` checks if a value exists inside a collection (like a list or a string):

```python
favorite_colors: list[str] = ["blue", "green", "purple"]
chosen: str = "red"

if chosen in favorite_colors:
    print(f"Yes, {chosen} is one of your favorites!")
else:
    print(f"No, {chosen} is not in your favorites.")
```

You can also use `in` with strings to check if one piece of text is inside another:

```python
sentence: str = "The quick brown fox"

if "fox" in sentence:
    print("Found the fox!")

if "cat" not in sentence:
    print("No cat here.")
```

### Checking Positive, Negative, or Zero

```python
number: int = -3

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```

---

## Truthy and Falsy -- Some Values Act Like True or False

Here is something that might surprise you. In Python, you do not always need a comparison in your `if` statement. You can put **any** value in there, and Python will treat it as either True or False.

The simple rule:

> **Empty means no. Zero means no. Everything else means yes.**

These values are treated as `False` (they are called **falsy**):

| Value | Why It Is Falsy |
|-------|----------------|
| `False` | It literally is False |
| `0` | Zero, nothing |
| `0.0` | Zero with a decimal, still nothing |
| `""` | Empty text (no characters) |
| `[]` | Empty list (nothing in it) |
| `None` | A special Python value that means "nothing here" |

**Everything else** is treated as `True` (called **truthy**): any non-zero number, any text with at least one character, any list with at least one item, and so on.

```python
name: str = ""

if name:
    print(f"Hello, {name}!")
else:
    print("You did not enter a name.")
# Prints: "You did not enter a name." because "" is falsy
```

```python
score: int = 0

if score:
    print(f"Your score is {score}")
else:
    print("You have not scored yet.")
# Prints: "You have not scored yet." because 0 is falsy
```

```python
items: list[str] = ["apple", "banana"]

if items:
    print(f"You have {len(items)} items.")
else:
    print("Your list is empty.")
# Prints: "You have 2 items." because a non-empty list is truthy
```

This is a very common pattern in Python. Instead of writing `if len(items) > 0:`, experienced Python programmers write `if items:`. It means the same thing and is easier to read.

---

## Common Mistakes to Watch For

These are mistakes that almost everyone makes. Read them now so you can recognize them when they happen.

### Mistake 1: Forgetting the Colon

Every `if`, `elif`, and `else` line must end with a colon `:`.

```python
# WRONG -- missing colon
# if age >= 13
#     print("teenager")

# RIGHT
if age >= 13:
    print("teenager")
```

If you forget the colon, Python will give you a `SyntaxError`. Always double-check that the colon is there.

### Mistake 2: Wrong Indentation

The code inside an `if` block must be indented. If it is not, it will either cause an error or run when it should not.

```python
# WRONG -- the print is not indented, so it always runs
if score >= 70:
print("You passed!")   # This causes an IndentationError!

# RIGHT
if score >= 70:
    print("You passed!")   # Indented with 4 spaces
```

### Mistake 3: Using `=` Instead of `==`

Remember from the operators lesson: one `=` means "store a value," two `==` means "check if these are the same."

```python
score: int = 85

# WRONG -- this tries to store, not compare
# if score = 100:   # SyntaxError!

# RIGHT -- this checks if score is 100
if score == 100:
    print("Perfect score!")
```

This is the most common mistake with conditions. Always ask yourself: "Am I storing or checking?"

### Mistake 4: The Always-True `or` Mistake

This one is tricky. In English, you might say "Is the color red or blue?" But in Python, you cannot write it the way you say it:

```python
color: str = "green"

# WRONG -- this is ALWAYS True!
if color == "red" or "blue":
    print("Match!")   # This runs even when color is "green"!

# RIGHT -- check each value separately
if color == "red" or color == "blue":
    print("Match!")

# ALSO RIGHT -- use "in"
if color in ("red", "blue"):
    print("Match!")
```

Why is the wrong version always True? Because Python reads `color == "red" or "blue"` as `(color == "red") or ("blue")`. The string `"blue"` is not empty, so it is truthy, so the whole thing is always True.

### Mistake 5: Writing `else if` Instead of `elif`

In some other programming languages, you write `else if`. In Python, it is one word: `elif`.

```python
# WRONG
# else if score >= 80:   # SyntaxError!

# RIGHT
elif score >= 80:
    grade: str = "B"
```

### Mistake 6: Putting a Condition After `else`

The `else` block catches everything that was not caught by the `if` and `elif` blocks. It never has a condition.

```python
# WRONG
# else score < 60:   # SyntaxError!

# RIGHT
else:
    grade: str = "F"
```

If you need a condition, use `elif`, not `else`.

---

## Exercises

**Type every one of these. Do not skip them.**

### Exercise 1: Ticket Price Calculator

```python
age: int = 10

if age < 5:
    price: float = 0.00
    label: str = "Free"
elif age <= 12:
    price: float = 5.00
    label: str = "Child"
elif age <= 17:
    price: float = 8.00
    label: str = "Teen"
elif age >= 65:
    price: float = 6.00
    label: str = "Senior"
else:
    price: float = 12.00
    label: str = "Adult"

print(f"Age: {age}")
print(f"Ticket type: {label}")
print(f"Price: ${price:.2f}")
```

Test it with ages: 3, 10, 15, 30, 70.

### Exercise 2: Password Strength Checker

```python
password: str = "hello"
length: int = len(password)

if length >= 12:
    strength: str = "Strong"
elif length >= 8:
    strength: str = "Medium"
elif length >= 4:
    strength: str = "Weak"
else:
    strength: str = "Too short"

print(f"Password: {password}")
print(f"Length: {length}")
print(f"Strength: {strength}")
```

Try it with passwords of different lengths.

### Exercise 3: Number Classifier

Write a program that takes a number and prints whether it is:
- Positive, negative, or zero
- Even or odd (only if it is not zero)

```python
number: int = -4

if number > 0:
    sign: str = "positive"
elif number < 0:
    sign: str = "negative"
else:
    sign: str = "zero"

print(f"{number} is {sign}")

if number != 0:
    if number % 2 == 0:
        print(f"{number} is even")
    else:
        print(f"{number} is odd")
```

Test with: 7, -4, 0, 100, -1.

### Exercise 4: Season Finder

```python
month: int = 7

if month in (12, 1, 2):
    season: str = "Winter"
elif month in (3, 4, 5):
    season: str = "Spring"
elif month in (6, 7, 8):
    season: str = "Summer"
elif month in (9, 10, 11):
    season: str = "Fall"
else:
    season: str = "Invalid month"

print(f"Month {month} is in {season}.")
```

Test with months 1 through 12. Also try 0 and 13 to see the "Invalid month" message.

### Exercise 5: Simple Quiz Game

```python
print("What planet is closest to the Sun?")
print("A) Venus")
print("B) Mercury")
print("C) Mars")

answer: str = "B"

if answer == "B":
    print("Correct! Mercury is the closest planet to the Sun.")
else:
    print(f"Sorry, {answer} is wrong. The correct answer is B) Mercury.")
```

Change the answer to test both the correct and incorrect paths.

---

## Putting It All Together

Here is a complete program that uses many of the concepts from this lesson. Type it in and run it.

```python
# Simple number guessing game (one guess)
SECRET_NUMBER: int = 7
guess: int = 5

print(f"You guessed {guess}.")

if guess == SECRET_NUMBER:
    print("You got it! Amazing!")
elif guess > SECRET_NUMBER:
    print("Too high! The number was lower.")
else:
    print("Too low! The number was higher.")

# Show how far off they were
difference: int = guess - SECRET_NUMBER
if difference < 0:
    difference = -difference  # make it positive

if difference == 0:
    message: str = "Perfect guess!"
elif difference <= 2:
    message: str = "So close!"
elif difference <= 5:
    message: str = "Not bad."
else:
    message: str = "Way off!"

print(message)
print(f"The secret number was {SECRET_NUMBER}.")
```

Change `guess` to different values: try 7, 5, 9, 3, 100. Predict the output before running each time.

![A flat vector illustration in a children's educational book style showing Byte the robot playing a guessing game with numbered cards, with a thought bubble showing question marks and a hidden card. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What You Learned

- The `if` statement runs code only when a condition is `True` -- like a fork in the road
- **Indentation** (4 spaces) tells Python which code belongs to the `if` block
- `if`/`else` lets you do one thing OR another -- exactly one block always runs
- `elif` lets you check multiple conditions, like trying multiple doors
- **Boolean expressions** using `and`, `or`, and `not` let you combine conditions
- **Nesting** puts an `if` inside another `if` for multi-step checks
- The **ternary expression** is a one-line shortcut for simple if/else choices
- Common patterns: checking even/odd with `%`, checking ranges with chained comparisons, checking membership with `in`
- **Truthy and falsy**: empty and zero values act like `False`, everything else acts like `True`
- Common mistakes: forgetting the colon, wrong indentation, using `=` instead of `==`

---

## Practice Questions

**1.** What will this code print?

```python
x: int = 15

if x > 20:
    print("big")
elif x > 10:
    print("medium")
elif x > 5:
    print("small")
else:
    print("tiny")
```

**2.** What is wrong with this code?

```python
temperature: int = 75

if temperature > 80
    print("It is hot!")
```

**3.** What will this code print?

```python
name: str = ""

if name:
    print(f"Hello, {name}!")
else:
    print("No name given.")
```

**4.** What will this code print? Trace through it step by step.

```python
a: int = 5
b: int = 10

if a > 3 and b < 8:
    print("both")
elif a > 3 or b < 8:
    print("at least one")
else:
    print("neither")
```

**5.** Rewrite this `if`/`else` block as a ternary expression:

```python
number: int = 7
if number % 2 == 0:
    label: str = "even"
else:
    label: str = "odd"
```

**6.** Why does this code always print "Match!" no matter what `fruit` is?

```python
fruit: str = "grape"

if fruit == "apple" or "banana":
    print("Match!")
```

**7.** What will this code print when `score` is 85?

```python
score: int = 85

if score >= 70:
    grade: str = "C"
elif score >= 80:
    grade: str = "B"
elif score >= 90:
    grade: str = "A"
else:
    grade: str = "F"

print(grade)
```

Is this the correct grade for a score of 85? If not, what is wrong?

---

## Answers to Practice Questions

**1.** It prints `medium`. Python checks from top to bottom. `15 > 20` is False, so it moves on. `15 > 10` is True, so it runs that block and prints `"medium"`. It skips everything below, even though `15 > 5` is also True.

**2.** There is a missing colon at the end of the `if` line. It should be `if temperature > 80:` with a colon at the end. Without the colon, Python will give a `SyntaxError`.

**3.** It prints `No name given.` The variable `name` is an empty string `""`. Empty strings are **falsy** in Python, so `if name:` evaluates to `if False:`, and the `else` block runs instead.

**4.** It prints `at least one`. Let us trace through:
- `a > 3` is `5 > 3` which is `True`
- `b < 8` is `10 < 8` which is `False`
- `True and False` is `False`, so the first block is skipped
- `True or False` is `True`, so the second block runs and prints `"at least one"`

**5.**
```python
number: int = 7
label: str = "even" if number % 2 == 0 else "odd"
```

**6.** Because Python reads `fruit == "apple" or "banana"` as `(fruit == "apple") or ("banana")`. The string `"banana"` is not empty, so it is truthy (it acts like `True`). So the expression becomes `False or True`, which is `True`. The fix is: `if fruit == "apple" or fruit == "banana":` or even better: `if fruit in ("apple", "banana"):`.

**7.** It prints `C`, which is wrong. A score of 85 should get a `B`. The problem is the order of conditions. Python checks `score >= 70` first, and since `85 >= 70` is `True`, it assigns `"C"` and skips everything else. The fix is to check the strictest condition first: check `>= 90`, then `>= 80`, then `>= 70`.

---

**Previous:** [[wiki:python-jr-operators]] | **Next:** [[wiki:python-jr-loops]]
