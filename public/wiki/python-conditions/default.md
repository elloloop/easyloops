# Conditions and Branching -- Making Decisions

Up until now, every program you have written runs every line from top to bottom. Every line executes, every time. That is not how real programs work. Real programs make decisions. They check something and then choose what to do based on the answer.

That is what conditions are for.

---

## The `if` Statement -- Running Code Only When Something Is True

The `if` statement is the most fundamental decision-making tool in programming. It says: "If this thing is true, then do this."

```python
temperature: int = 35

if temperature > 30:
    print("It is hot outside")
```

If `temperature` is greater than 30, the indented line runs. If not, Python skips it entirely and moves on.

Three things to notice:

1. The condition (`temperature > 30`) is an expression that produces a `bool`.
2. There is a colon `:` at the end of the `if` line.
3. The code that runs when the condition is true is **indented** (4 spaces).

The indentation is not optional. It is how Python knows which code belongs to the `if` statement. Everything indented under the `if` runs only when the condition is true.

```python
score: int = 85

if score >= 70:
    print("You passed!")
    print("Congratulations!")

print("This line always runs, regardless of the score.")
```

The first two `print` lines only run when `score >= 70`. The last `print` runs no matter what because it is not indented under the `if`.

Open your editor. Type this and run it:

```python
age: int = 20

if age >= 18:
    print("You are an adult")
    print("You can vote")

print("Program finished")
```

Run it. Then change `age` to `15` and run again. Notice which lines print and which do not.

---

## The `else` Clause -- What to Do When the Condition Is False

Often you want to do one thing if the condition is true and a different thing if it is false. That is what `else` is for.

```python
age: int = 15

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

The `else` block runs only when the `if` condition is `False`. One of the two blocks always runs -- never both, never neither.

```python
number: int = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")
```

Open your editor. Type this and run it with different values of `number`:

```python
number: int = 42

if number % 2 == 0:
    result: str = "even"
else:
    result: str = "odd"

print(f"{number} is {result}")
```

Try `number = 42`, then `number = 7`, then `number = 0`. Predict the output each time before running.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between using just `if` and using `if`/`else`? When would you use one versus the other? Give me an example of each."</div>
</div>

---

## The `elif` Clause -- Checking Multiple Conditions

Sometimes you need more than two options. That is where `elif` (short for "else if") comes in.

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

print(f"Score: {score}, Grade: {grade}")
```

Python checks each condition from top to bottom. As soon as it finds one that is true, it runs that block and skips everything else. If none of the conditions are true, the `else` block runs.

The order matters. If you put `score >= 70` before `score >= 90`, a score of 95 would get a "C" because `95 >= 70` is true and Python would stop there.

```python
# WRONG ORDER -- a score of 95 would get "C"
score: int = 95

if score >= 70:
    grade: str = "C"   # This runs first! 95 >= 70 is True
elif score >= 80:
    grade: str = "B"   # Never reached for 95
elif score >= 90:
    grade: str = "A"   # Never reached for 95
```

Always put the most specific (or most restrictive) condition first.

Open your editor. Type in the correct grading program and test it with these scores: 95, 85, 75, 65, 50. Verify each grade is correct.

```python
score: int = 95   # Change this value and rerun

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

print(f"Score: {score}, Grade: {grade}")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why does the order of `elif` conditions matter? If I check `score >= 60` before `score >= 90`, what happens when the score is 95? Explain step by step."</div>
</div>

---

## Boolean Expressions in Conditions

The condition in an `if` statement is just a boolean expression -- anything that evaluates to `True` or `False`. You already learned about comparison and logical operators. Now you use them.

```python
age: int = 25
has_id: bool = True

if age >= 21 and has_id:
    print("You can enter the venue")
```

```python
temperature: float = 72.0

if temperature < 60 or temperature > 90:
    print("Uncomfortable temperature")
else:
    print("Temperature is comfortable")
```

```python
is_weekend: bool = False

if not is_weekend:
    print("Time to go to work")
```

Open your editor. Try combining conditions:

```python
hour: int = 14
is_weekday: bool = True

if is_weekday and hour >= 9 and hour < 17:
    print("Working hours")
elif is_weekday:
    print("Weekday but outside work hours")
else:
    print("Weekend!")
```

Change `hour` and `is_weekday` to test different cases.

---

## Nesting `if` Statements

You can put an `if` inside another `if`. This is called nesting.

```python
age: int = 25
has_ticket: bool = True

if age >= 18:
    if has_ticket:
        print("Welcome to the show")
    else:
        print("You need a ticket")
else:
    print("You must be 18 or older")
```

Nesting works, but deep nesting makes code hard to read. If you find yourself indenting more than 2-3 levels, there is usually a better way to write it.

```python
# Hard to read -- too much nesting
if condition_a:
    if condition_b:
        if condition_c:
            if condition_d:
                do_something()   # 4 levels deep -- avoid this
```

Later in this page you will learn about guard clauses, which help avoid deep nesting.

---

## The Ternary Expression -- Inline Conditions

Sometimes you just need to pick one of two values based on a condition. Python has a one-line way to do this.

```python
age: int = 20
status: str = "adult" if age >= 18 else "minor"
print(status)   # "adult"
```

This is the same as:

```python
age: int = 20
if age >= 18:
    status: str = "adult"
else:
    status: str = "minor"
print(status)
```

The ternary expression is useful when the choice is simple. If the logic is more complex, use a regular `if`/`else` -- readability is more important than saving lines.

```python
# Good use of ternary -- simple choice
label: str = "even" if number % 2 == 0 else "odd"

# Bad use of ternary -- too complex, use regular if/else instead
# result: str = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
```

Open your editor. Try this:

```python
temperature: float = 75.0
feeling: str = "warm" if temperature > 70 else "cool"
print(f"It feels {feeling} at {temperature} degrees")
```

Change the temperature and run it again.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Rewrite this if/else block as a single ternary expression: `if x > 0: sign = 'positive'` / `else: sign = 'non-positive'`. Then explain when you should NOT use a ternary expression."</div>
</div>

---

## Common Patterns

These patterns show up constantly in real programs. Learn to recognize them.

### Checking Positive, Negative, or Zero

```python
number: int = -5

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```

### Checking Even or Odd

```python
number: int = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")
```

Remember: `%` gives the remainder. If the remainder when dividing by 2 is 0, the number is even.

### Checking if Something Is None

```python
username: str | None = None

if username is None:
    print("No username set")
else:
    print(f"Hello, {username}")
```

Use `is None`, not `== None`. The `is` keyword checks identity (is it the exact same object?), which is the correct way to check for `None`.

### Checking Membership with `in`

```python
vowels: str = "aeiou"
letter: str = "e"

if letter in vowels:
    print(f"'{letter}' is a vowel")
else:
    print(f"'{letter}' is a consonant")
```

```python
valid_colors: list[str] = ["red", "green", "blue"]
chosen: str = "purple"

if chosen in valid_colors:
    print(f"{chosen} is a valid color")
else:
    print(f"{chosen} is not a valid color")
```

### Checking a Range

```python
age: int = 25

if 18 <= age <= 65:
    print("Working age")
```

Python lets you chain comparisons like this. `18 <= age <= 65` means "age is between 18 and 65, inclusive." This is cleaner than writing `age >= 18 and age <= 65`.

Open your editor. Try each of these patterns. Change the values and predict the output before running.

---

## `is` vs `==` -- Identity vs Equality

These are different and the difference matters.

- `==` checks if two values are **equal** (same content).
- `is` checks if two variables point to the **exact same object** in memory.

```python
a: list[int] = [1, 2, 3]
b: list[int] = [1, 2, 3]
c: list[int] = a

print(a == b)   # True (same content)
print(a is b)   # False (different objects in memory)
print(a is c)   # True (same object -- c points to a)
```

The rule of thumb:
- Use `is` only for `None`: `if x is None`
- Use `==` for everything else: `if x == 5`

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between `is` and `==`? When should you use each one? Why do we write `if x is None` instead of `if x == None`?"</div>
</div>

---

## Truthy and Falsy Values

In Python, every value has a "truthiness." When you use a non-boolean value in an `if` condition, Python automatically treats it as `True` or `False`.

These values are **falsy** (treated as `False`):
- `False`
- `0` (integer zero)
- `0.0` (float zero)
- `""` (empty string)
- `[]` (empty list)
- `{}` (empty dict)
- `None`

Everything else is **truthy** (treated as `True`).

```python
name: str = ""

if name:
    print(f"Hello, {name}")
else:
    print("No name provided")
# Prints: "No name provided" because "" is falsy
```

```python
items: list[str] = []

if items:
    print(f"You have {len(items)} items")
else:
    print("Your list is empty")
# Prints: "Your list is empty" because [] is falsy
```

```python
count: int = 0

if count:
    print(f"Count is {count}")
else:
    print("Count is zero")
# Prints: "Count is zero" because 0 is falsy
```

This is a very Pythonic way to check for empty or zero values. Instead of writing `if len(items) > 0:`, you write `if items:`. Both work, but the second is more common in Python.

Open your editor. Test each falsy value:

```python
values: list = [False, 0, 0.0, "", [], {}, None, True, 1, "hello", [1, 2]]

for val in values:
    if val:
        print(f"{str(val):>10} is truthy")
    else:
        print(f"{str(val):>10} is falsy")
```

Run it and study the output.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Which of these are falsy in Python: `0`, `1`, `''`, `'hello'`, `[]`, `[0]`, `None`, `False`, `True`? For each one, explain why."</div>
</div>

---

## Guard Clauses -- Returning Early to Avoid Deep Nesting

A guard clause is an `if` statement at the top of a function that handles edge cases early, usually by returning immediately. This lets you avoid nesting.

Without guard clauses (deeply nested):

```python
def process_order(quantity: int, price: float, has_account: bool) -> str:
    if quantity > 0:
        if price > 0:
            if has_account:
                total: float = quantity * price
                return f"Order total: ${total:.2f}"
            else:
                return "You need an account"
        else:
            return "Price must be positive"
    else:
        return "Quantity must be positive"
```

With guard clauses (flat and readable):

```python
def process_order(quantity: int, price: float, has_account: bool) -> str:
    if quantity <= 0:
        return "Quantity must be positive"

    if price <= 0:
        return "Price must be positive"

    if not has_account:
        return "You need an account"

    total: float = quantity * price
    return f"Order total: ${total:.2f}"
```

The second version is much easier to read. Each guard clause handles one problem and returns immediately. The "happy path" (the normal case where everything is fine) is at the bottom with no nesting.

The pattern is: **check for the bad case, return early, keep going**.

Open your editor. Type both versions and test them with the same inputs:

```python
def process_order(quantity: int, price: float, has_account: bool) -> str:
    if quantity <= 0:
        return "Quantity must be positive"

    if price <= 0:
        return "Price must be positive"

    if not has_account:
        return "You need an account"

    total: float = quantity * price
    return f"Order total: ${total:.2f}"

print(process_order(3, 25.0, True))
print(process_order(-1, 25.0, True))
print(process_order(3, -5.0, True))
print(process_order(3, 25.0, False))
```

---

## Where People Go Wrong

### Mistake 1: Forgetting the Colon

```python
# WRONG -- missing colon
# if age >= 18
#     print("Adult")

# RIGHT
if age >= 18:
    print("Adult")
```

Every `if`, `elif`, and `else` line must end with a colon `:`. Python will give you a `SyntaxError` if you forget it.

### Mistake 2: Wrong Indentation

```python
# WRONG -- inconsistent indentation
# if age >= 18:
# print("Adult")          # Not indented -- runs regardless
#     print("Can vote")   # IndentationError

# RIGHT
if age >= 18:
    print("Adult")
    print("Can vote")
```

Python uses indentation to know which code belongs to the `if` block. Use 4 spaces for each level. Be consistent.

### Mistake 3: Using `=` Instead of `==`

```python
x: int = 5

# WRONG -- this is assignment
# if x = 5:   # SyntaxError

# RIGHT -- this is comparison
if x == 5:
    print("x is five")
```

This is the same mistake from the operators page, but it happens most often inside `if` statements.

### Mistake 4: Writing `elif` as Two Words

```python
# WRONG
# else if x > 10:   # SyntaxError

# RIGHT
elif x > 10:
    print("Greater than 10")
```

In Python it is `elif`, not `else if`. One word, no space.

### Mistake 5: Unnecessary Comparison to True or False

```python
is_valid: bool = True

# WRONG -- unnecessary, but works
if is_valid == True:
    print("Valid")

# RIGHT -- cleaner
if is_valid:
    print("Valid")

# Also RIGHT for checking False
if not is_valid:
    print("Not valid")
```

If a variable is already a boolean, you do not need to compare it to `True` or `False`. Just use it directly.

### Mistake 6: Forgetting That `else` Has No Condition

```python
# WRONG
# else score < 60:   # SyntaxError -- else takes no condition

# RIGHT
else:
    print("Failed")

# If you need a condition, use elif
elif score < 60:
    print("Failed")
```

`else` means "everything that was not caught by the previous conditions." It never has a condition of its own.

### Mistake 7: The Always-True `or` Mistake

```python
color: str = "green"

# WRONG -- "red" is a non-empty string, which is truthy
# This is always True!
if color == "red" or "blue":
    print("Primary color")   # This always prints!

# RIGHT -- compare to each value separately
if color == "red" or color == "blue":
    print("Primary color")

# ALSO RIGHT -- using in
if color in ("red", "blue"):
    print("Primary color")
```

Open your editor. Try the "wrong" version and see that it prints "Primary color" even for `color = "green"`. Then fix it.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I wrote `if color == 'red' or 'blue':` and it always runs the if block no matter what color is. Why? How do I fix it?"</div>
</div>

---

## Putting It All Together

Here is a complete program that uses conditions. Open your editor, type it (do not copy-paste), and run it.

```python
def check_eligibility(age: int, gpa: float, has_recommendation: bool) -> str:
    """Check if a student is eligible for a scholarship."""
    if age < 16:
        return "Too young to apply"

    if age > 25:
        return "Too old to apply"

    if gpa < 3.0:
        return "GPA too low"

    if gpa >= 3.8:
        return "Eligible for full scholarship!"

    if gpa >= 3.5 and has_recommendation:
        return "Eligible for partial scholarship with recommendation"

    if gpa >= 3.0:
        return "Eligible for partial scholarship"

    return "Not eligible"


# Test with different inputs
print(check_eligibility(15, 4.0, True))
print(check_eligibility(20, 3.9, True))
print(check_eligibility(20, 3.6, True))
print(check_eligibility(20, 3.6, False))
print(check_eligibility(20, 2.5, True))
print(check_eligibility(30, 4.0, True))
```

Study how this function uses guard clauses. The first three checks handle disqualifying conditions. Then it checks for the best case first and works down. Each condition has a clear, single responsibility.

Change the input values. Add new test cases. Predict the output before you run it.

---

**Previous:** [[wiki:python-operators]] | **Next:** [[wiki:python-loops]]
