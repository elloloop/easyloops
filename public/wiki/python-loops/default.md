# Loops and Iteration -- Repeating Things

Programming would be pretty useless if you had to write every instruction once. Imagine printing the numbers 1 to 1000 -- you are not going to write 1000 print statements. Loops let you tell the computer: "Do this thing over and over until I say stop."

This is one of the most important concepts in all of programming. Take your time with this page.

---

## Why We Need Loops

Look at this code:

```python
print(1)
print(2)
print(3)
print(4)
print(5)
```

That prints the numbers 1 through 5. Now imagine you need 1 through 1000. Or you need to process every item in a list of 10,000 records. You cannot write that out by hand. You need a loop.

A loop runs a block of code repeatedly. Each time through is called an **iteration**.

---

## The `while` Loop -- The Fundamental Loop

The `while` loop is the simplest and most fundamental loop. It says: "Keep doing this as long as the condition is true."

```python
count: int = 1

while count <= 5:
    print(count)
    count += 1
```

Output:
```
1
2
3
4
5
```

Every `while` loop has three parts. You must understand all three:

### Part 1: Initialize

Before the loop starts, you set up your variables. In the example above, that is `count: int = 1`.

### Part 2: Check the Condition

At the start of each iteration, Python checks the condition (`count <= 5`). If it is `True`, the body runs. If it is `False`, the loop ends and Python moves to the next line after the loop.

### Part 3: Update

Inside the loop body, something must change so that the condition eventually becomes `False`. In the example, `count += 1` increases `count` by 1 each time. Eventually `count` reaches 6, the condition `6 <= 5` is `False`, and the loop stops.

**If you forget the update step, the loop runs forever.** This is the single most common loop mistake.

Let me spell it out with comments:

```python
# INITIALIZE: set the starting value
count: int = 1

# CHECK: is count still <= 5?
while count <= 5:
    # BODY: what to do each iteration
    print(count)
    # UPDATE: change the variable so we eventually stop
    count += 1

print("Loop finished!")
```

Open your editor. Type this exact code and run it. Then change the starting value from `1` to `3`. Then change `<= 5` to `<= 10`. Predict the output each time before running.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What are the three parts of every while loop? What happens if you forget the update step? Write a while loop that prints the numbers 1 through 7."</div>
</div>

---

## While Loop Examples

### Example: Counting from 1 to 10

```python
number: int = 1

while number <= 10:
    print(number)
    number += 1
```

Open your editor and type it. Run it.

### Example: Counting Down

```python
countdown: int = 10

while countdown > 0:
    print(countdown)
    countdown -= 1

print("Blastoff!")
```

Notice the update step is `countdown -= 1` (subtracting). The condition checks `countdown > 0`. When `countdown` reaches 0, the condition is `False` and the loop ends.

Open your editor. Type this and run it. Then change the starting value to 5. Then to 20.

### Example: Summing Numbers

Add up the numbers from 1 to 100.

```python
total: int = 0
number: int = 1

while number <= 100:
    total += number
    number += 1

print(f"Sum of 1 to 100 is {total}")   # 5050
```

Walk through this step by step:
- `total` starts at 0, `number` starts at 1.
- First iteration: `total = 0 + 1 = 1`, `number` becomes 2.
- Second iteration: `total = 1 + 2 = 3`, `number` becomes 3.
- Third iteration: `total = 3 + 3 = 6`, `number` becomes 4.
- ...and so on until `number` reaches 101, at which point the loop stops.

Open your editor. Type this and run it. Then change it to sum the numbers from 1 to 10 (answer should be 55) to verify you understand.

### Example: Finding a Value

Search through numbers to find the first one whose square is greater than 50.

```python
number: int = 1

while number ** 2 <= 50:
    number += 1

print(f"The first number whose square exceeds 50 is {number}")
print(f"{number} ** 2 = {number ** 2}")
```

Here the condition is checking something about the current value, not just counting.

### Example: Input Validation

Keep asking until the user gives valid input.

```python
age: int = -1

while age < 0 or age > 150:
    age_input: str = input("Enter your age (0-150): ")
    age = int(age_input)

print(f"Your age is {age}")
```

This is a real-world pattern. The loop keeps going until the user provides a valid answer. You do not know in advance how many times the user will enter bad data, which is exactly when a `while` loop is the right tool.

Open your editor. Type this and run it. Enter invalid values like -5 and 200, then a valid value like 25. Watch the loop repeat until you get it right.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a while loop that adds up all even numbers from 2 to 20 (2 + 4 + 6 + ... + 20). What is the total? Hint: start at 2 and increase by 2 each time."</div>
</div>

---

## Common While Loop Patterns

Here are patterns you will use over and over. Learn them.

### Pattern 1: Counting Up

```python
i: int = 0

while i < 10:
    print(i)
    i += 1
# Prints 0 through 9
```

### Pattern 2: Counting Down

```python
i: int = 10

while i > 0:
    print(i)
    i -= 1
# Prints 10 down to 1
```

### Pattern 3: Accumulating a Result

```python
total: float = 0.0
count: int = 1

while count <= 5:
    total += count
    count += 1

print(f"Total: {total}")   # 15.0
```

### Pattern 4: Searching for Something

```python
numbers: list[int] = [4, 7, 2, 9, 1, 8]
target: int = 9
index: int = 0

while index < len(numbers):
    if numbers[index] == target:
        print(f"Found {target} at index {index}")
        break
    index += 1
```

(We will cover `break` in detail soon.)

### Pattern 5: Processing Until a Condition Is Met

```python
balance: float = 1000.0
interest_rate: float = 0.05
years: int = 0

while balance < 2000.0:
    balance *= (1 + interest_rate)
    years += 1

print(f"It takes {years} years to double your money")
print(f"Final balance: ${balance:.2f}")
```

Open your editor. Type the "doubling money" example. Run it. Then change the interest rate to 0.10 (10%) and see how many years it takes. Try 0.01 (1%) too.

---

## Infinite Loops and How to Avoid Them

An infinite loop runs forever. It happens when the condition never becomes `False`.

```python
# DO NOT RUN THIS -- it will run forever
# count: int = 1
# while count <= 5:
#     print(count)
#     # Forgot count += 1 -- count is always 1, always <= 5
```

If you accidentally create an infinite loop, press `Ctrl+C` in your terminal to stop it.

The most common cause is forgetting the update step. Always ask yourself: "What changes each iteration to eventually make the condition `False`?"

### `break` -- Exit the Loop Immediately

The `break` keyword stops the loop right away, regardless of the condition.

```python
count: int = 1

while count <= 100:
    if count == 5:
        print("Stopping at 5")
        break
    print(count)
    count += 1
```

Output:
```
1
2
3
4
Stopping at 5
```

When Python hits `break`, it jumps out of the loop entirely and continues with the code after the loop.

### `continue` -- Skip to the Next Iteration

The `continue` keyword skips the rest of the current iteration and goes back to the condition check.

```python
count: int = 0

while count < 10:
    count += 1
    if count % 3 == 0:
        continue   # Skip multiples of 3
    print(count)
```

Output:
```
1
2
4
5
7
8
10
```

Notice 3, 6, and 9 are missing -- they were skipped by `continue`.

### The `while True` Pattern

Sometimes you want a loop that runs until you explicitly break out of it.

```python
while True:
    user_input: str = input("Enter 'quit' to exit: ")
    if user_input == "quit":
        break
    print(f"You entered: {user_input}")

print("Goodbye!")
```

The condition `True` is always true, so the loop would run forever without the `break`. This pattern is useful when you want to check the exit condition in the middle or end of the loop, not at the top.

Open your editor. Type this and run it:

```python
total: int = 0

while True:
    text: str = input("Enter a number (or 'done' to finish): ")
    if text == "done":
        break
    number: int = int(text)
    total += number
    print(f"Running total: {total}")

print(f"Final total: {total}")
```

Enter several numbers, then type "done" to see the final total.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What does `break` do? What does `continue` do? Write a while loop that prints numbers from 1 to 20 but skips numbers divisible by 4 (use continue)."</div>
</div>

---

## Now: The `for` Loop -- Syntactic Sugar

Everything you have done with `while` loops can also be done with `for` loops. The `for` loop is not a new concept. It is a **shortcut** for a very common `while` loop pattern.

Here is the key insight: **a `for` loop is a `while` loop with automatic iteration built in.**

Let me show you exactly what I mean.

### The Same Example: While Loop vs For Loop

Printing the numbers 1 through 5 with a `while` loop:

```python
# WHILE loop version
count: int = 1

while count <= 5:
    print(count)
    count += 1
```

Now the same thing with a `for` loop:

```python
# FOR loop version (same result)
for count in range(1, 6):
    print(count)
```

Both produce the exact same output:
```
1
2
3
4
5
```

The `for` loop does three things automatically that you had to do manually in the `while` loop:

1. **Initialize**: it creates the variable `count` and starts at 1.
2. **Update**: it automatically moves to the next value after each iteration.
3. **Check**: it automatically stops when it runs out of values.

You do not have to write the initialization, the update, or the condition. The `for` loop handles all of that.

### `range()` -- Generating Sequences of Numbers

`range()` is a function that generates a sequence of numbers. It has three forms:

```python
# range(stop) -- 0 to stop-1
for i in range(5):
    print(i)
# 0, 1, 2, 3, 4

# range(start, stop) -- start to stop-1
for i in range(1, 6):
    print(i)
# 1, 2, 3, 4, 5

# range(start, stop, step) -- start to stop-1, counting by step
for i in range(0, 10, 2):
    print(i)
# 0, 2, 4, 6, 8
```

Notice that `range()` does NOT include the stop value. `range(1, 6)` gives you 1, 2, 3, 4, 5 -- not 6. This trips people up at first, but it is consistent: the number of iterations is always `stop - start`.

You can also count backwards:

```python
for i in range(10, 0, -1):
    print(i)
# 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

Open your editor. Try all three forms of `range()`:

```python
print("range(5):")
for i in range(5):
    print(i, end=" ")
print()

print("range(3, 8):")
for i in range(3, 8):
    print(i, end=" ")
print()

print("range(0, 20, 3):")
for i in range(0, 20, 3):
    print(i, end=" ")
print()

print("range(10, 0, -2):")
for i in range(10, 0, -2):
    print(i, end=" ")
print()
```

### Iterating Over a List

The `for` loop can go through any collection, not just numbers. This is where it really shines compared to `while`.

```python
names: list[str] = ["Alice", "Bob", "Charlie"]

for name in names:
    print(f"Hello, {name}!")
```

The same thing with a `while` loop would be:

```python
names: list[str] = ["Alice", "Bob", "Charlie"]
index: int = 0

while index < len(names):
    print(f"Hello, {names[index]}!")
    index += 1
```

The `for` loop version is shorter and clearer. You do not have to manage an index variable or worry about off-by-one errors.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Rewrite this while loop as a for loop: `i = 0` / `while i < 8:` / `print(i * 2)` / `i += 1`. Then explain what range() arguments you used and why."</div>
</div>

---

## Side-by-Side Comparisons

This is the most important section. Study each pair carefully. See how the `for` loop is just a cleaner way to write the same `while` loop.

### Comparison 1: Counting Up

```python
# WHILE                          # FOR
i: int = 0                       for i in range(5):
while i < 5:                         print(i)
    print(i)
    i += 1
```

Both print: 0, 1, 2, 3, 4

### Comparison 2: Summing Numbers 1 to 10

```python
# WHILE version
total: int = 0
number: int = 1

while number <= 10:
    total += number
    number += 1

print(total)   # 55
```

```python
# FOR version
total: int = 0

for number in range(1, 11):
    total += number

print(total)   # 55
```

The `for` version is shorter. No need to initialize `number` or increment it.

### Comparison 3: Processing a List

```python
# WHILE version
fruits: list[str] = ["apple", "banana", "cherry"]
index: int = 0

while index < len(fruits):
    print(f"I like {fruits[index]}")
    index += 1
```

```python
# FOR version
fruits: list[str] = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")
```

The `for` version is much cleaner. No index management at all.

### Comparison 4: Finding a Value

```python
# WHILE version
numbers: list[int] = [4, 7, 2, 9, 1, 8]
target: int = 9
index: int = 0
found: bool = False

while index < len(numbers):
    if numbers[index] == target:
        found = True
        break
    index += 1

if found:
    print(f"Found {target} at index {index}")
```

```python
# FOR version
numbers: list[int] = [4, 7, 2, 9, 1, 8]
target: int = 9

for index, value in enumerate(numbers):
    if value == target:
        print(f"Found {target} at index {index}")
        break
```

(We will cover `enumerate` shortly.)

### Comparison 5: Counting Down

```python
# WHILE version
i: int = 10

while i > 0:
    print(i)
    i -= 1

print("Go!")
```

```python
# FOR version
for i in range(10, 0, -1):
    print(i)

print("Go!")
```

### Comparison 6: Accumulating Strings

```python
# WHILE version
words: list[str] = ["Hello", "beautiful", "world"]
sentence: str = ""
index: int = 0

while index < len(words):
    if sentence:
        sentence += " "
    sentence += words[index]
    index += 1

print(sentence)   # "Hello beautiful world"
```

```python
# FOR version
words: list[str] = ["Hello", "beautiful", "world"]
sentence: str = ""

for word in words:
    if sentence:
        sentence += " "
    sentence += word

print(sentence)   # "Hello beautiful world"
```

### When to Use Which

Here is the simple rule:

- **Use `for`** when you know how many times you need to loop, or when you are going through a collection item by item. This is the most common case.
- **Use `while`** when you do not know how many times you need to loop. For example: waiting for user input, processing until a condition is met, or running until convergence.

```python
# FOR -- you know you have 10 items
for i in range(10):
    print(i)

# WHILE -- you do not know when the user will type "quit"
user_input: str = ""
while user_input != "quit":
    user_input = input("Enter command: ")
```

Open your editor. Take any `while` loop example from earlier in this page and rewrite it as a `for` loop. Then take the `for` loop and convert it back to a `while` loop. Being able to translate between the two proves you understand what is really happening.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write both a while loop and a for loop that print the squares of numbers from 1 to 6 (1, 4, 9, 16, 25, 36). Which version is shorter? When would you prefer a while loop over a for loop?"</div>
</div>

---

## Nested Loops -- Loops Inside Loops

You can put a loop inside another loop. The inner loop runs completely for each iteration of the outer loop.

```python
for row in range(1, 4):
    for col in range(1, 4):
        print(f"({row},{col})", end="  ")
    print()   # New line after each row
```

Output:
```
(1,1)  (1,2)  (1,3)
(2,1)  (2,2)  (2,3)
(3,1)  (3,2)  (3,3)
```

The outer loop runs 3 times. For each of those 3 times, the inner loop runs 3 times. That is 3 x 3 = 9 total iterations.

Here is a practical example -- a multiplication table:

```python
size: int = 5

for row in range(1, size + 1):
    for col in range(1, size + 1):
        product: int = row * col
        print(f"{product:4}", end="")
    print()
```

Output:
```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

And with a `while` loop to show it is the same concept:

```python
size: int = 5
row: int = 1

while row <= size:
    col: int = 1
    while col <= size:
        product: int = row * col
        print(f"{product:4}", end="")
        col += 1
    print()
    row += 1
```

Same output. The `for` version is just shorter.

Open your editor. Type the multiplication table using the `for` loop version. Run it. Then change `size` to 10. Watch the full table print.

---

## Loop Patterns for Common Tasks

### Iterating Through Indices

Sometimes you need both the value and its position (index) in a list.

The manual way (works but clunky):

```python
colors: list[str] = ["red", "green", "blue"]

for i in range(len(colors)):
    print(f"Index {i}: {colors[i]}")
```

### `enumerate()` -- The Better Way

`enumerate()` gives you both the index and the value automatically.

```python
colors: list[str] = ["red", "green", "blue"]

for index, color in enumerate(colors):
    print(f"Index {index}: {color}")
```

Output:
```
Index 0: red
Index 1: green
Index 2: blue
```

This is cleaner and less error-prone. Use `enumerate()` whenever you need both the index and the value.

You can start counting from a different number:

```python
colors: list[str] = ["red", "green", "blue"]

for position, color in enumerate(colors, start=1):
    print(f"Color #{position}: {color}")
```

Output:
```
Color #1: red
Color #2: green
Color #3: blue
```

Open your editor. Try this:

```python
grocery_list: list[str] = ["milk", "eggs", "bread", "butter", "cheese"]

print("Shopping List:")
for number, item in enumerate(grocery_list, start=1):
    print(f"  {number}. {item}")
```

### Building Up a Result

A very common pattern: start with an empty result and add to it each iteration.

```python
# Building a list of squares
squares: list[int] = []

for number in range(1, 6):
    square: int = number ** 2
    squares.append(square)

print(squares)   # [1, 4, 9, 16, 25]
```

```python
# Building a filtered list
numbers: list[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens: list[int] = []

for num in numbers:
    if num % 2 == 0:
        evens.append(num)

print(evens)   # [2, 4, 6, 8, 10]
```

```python
# Counting occurrences
text: str = "hello world"
vowel_count: int = 0

for char in text:
    if char in "aeiou":
        vowel_count += 1

print(f"Vowels: {vowel_count}")   # 3
```

Open your editor. Type the vowel-counting example. Run it. Then change the text to your own name and predict the count before running.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What does `enumerate()` do? Write a for loop that goes through the list `['cat', 'dog', 'fish']` and prints each item with its position number starting from 1. Use enumerate()."</div>
</div>

---

## The `for` Loop With Strings

Strings are sequences too. You can loop through each character.

```python
word: str = "Python"

for letter in word:
    print(letter)
```

Output:
```
P
y
t
h
o
n
```

And the while loop equivalent:

```python
word: str = "Python"
index: int = 0

while index < len(word):
    print(word[index])
    index += 1
```

Same output. The `for` version is cleaner.

Open your editor. Try this program that counts the letters in a word:

```python
word: str = "programming"
letter_count: dict[str, int] = {}

for letter in word:
    if letter in letter_count:
        letter_count[letter] += 1
    else:
        letter_count[letter] = 1

for letter, count in letter_count.items():
    print(f"'{letter}' appears {count} time(s)")
```

---

## `break` and `continue` in For Loops

`break` and `continue` work the same way in `for` loops as in `while` loops.

```python
# break -- stop when we find what we need
names: list[str] = ["Alice", "Bob", "Charlie", "Diana"]

for name in names:
    if name == "Charlie":
        print(f"Found {name}!")
        break
    print(f"Checking {name}...")
```

Output:
```
Checking Alice...
Checking Bob...
Found Charlie!
```

```python
# continue -- skip certain items
numbers: list[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for num in numbers:
    if num % 2 != 0:
        continue   # Skip odd numbers
    print(num)
```

Output:
```
2
4
6
8
10
```

---

## The `else` Clause on Loops

Python has a unique feature: you can put an `else` on a loop. The `else` block runs only if the loop completed normally (without hitting `break`).

```python
numbers: list[int] = [1, 3, 5, 7, 9]
target: int = 4

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} was not found")
```

Output:
```
4 was not found
```

If you change `target` to `5`, the output would be `Found 5!` and the `else` block would not run.

This is a handy pattern for "search and report if not found."

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between `break` and `continue`? Write a for loop that goes through numbers 1-20 and prints only the ones that are divisible by 3. Use `continue` to skip the others."</div>
</div>

---

## Where People Go Wrong

### Mistake 1: Forgetting the Update Step in While Loops

This creates an infinite loop. The most common loop bug.

```python
# WRONG -- infinite loop!
# count: int = 1
# while count <= 5:
#     print(count)
#     # Forgot count += 1

# RIGHT
count: int = 1
while count <= 5:
    print(count)
    count += 1   # Do not forget this
```

### Mistake 2: Off-by-One Errors

```python
# WRONG -- prints 0 to 4, not 1 to 5
for i in range(5):
    print(i)

# RIGHT -- prints 1 to 5
for i in range(1, 6):
    print(i)
```

Remember: `range(n)` starts at 0 and stops before `n`. `range(1, 6)` gives you 1, 2, 3, 4, 5 -- not 1 through 6.

### Mistake 3: Modifying a List While Iterating Over It

```python
# WRONG -- unpredictable behavior!
# numbers: list[int] = [1, 2, 3, 4, 5]
# for num in numbers:
#     if num % 2 == 0:
#         numbers.remove(num)   # Modifying the list you are looping through!

# RIGHT -- build a new list
numbers: list[int] = [1, 2, 3, 4, 5]
odd_numbers: list[int] = []

for num in numbers:
    if num % 2 != 0:
        odd_numbers.append(num)

print(odd_numbers)   # [1, 3, 5]
```

Never add to or remove from a list while you are looping through it. Build a new list instead.

### Mistake 4: Using the Wrong Loop Variable Name

```python
# Confusing -- which 'i' is which?
for i in range(3):
    for i in range(3):   # This shadows the outer 'i'!
        print(i)
```

Use descriptive names for nested loops:

```python
# Clear
for row in range(3):
    for col in range(3):
        print(f"({row}, {col})")
```

### Mistake 5: Forgetting the Colon

```python
# WRONG
# while count < 10
#     print(count)

# RIGHT
while count < 10:
    print(count)
    count += 1
```

Same as `if` statements -- every `while` and `for` line ends with a colon.

### Mistake 6: Using `range(len(...))` When You Do Not Need To

```python
colors: list[str] = ["red", "green", "blue"]

# Works but clunky
for i in range(len(colors)):
    print(colors[i])

# Better -- iterate directly
for color in colors:
    print(color)

# If you need the index too, use enumerate
for i, color in enumerate(colors):
    print(f"{i}: {color}")
```

Use `range(len(...))` only when you genuinely need just the index and not the value. Most of the time, iterate directly or use `enumerate`.

Open your editor. Take one of the "wrong" examples and run it to see the problem. Then fix it using the "right" version.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is an off-by-one error? Give an example with `range()`. Why should you never modify a list while looping through it? What should you do instead?"</div>
</div>

---

## Putting It All Together

Here is a complete program that uses multiple loop patterns. Open your editor, type it in (do not copy-paste), and run it.

```python
def find_primes(limit: int) -> list[int]:
    """Find all prime numbers up to the given limit."""
    primes: list[int] = []

    for candidate in range(2, limit + 1):
        is_prime: bool = True

        for divisor in range(2, candidate):
            if candidate % divisor == 0:
                is_prime = False
                break

        if is_prime:
            primes.append(candidate)

    return primes


def print_number_pattern(rows: int) -> None:
    """Print a triangle pattern of numbers."""
    for row in range(1, rows + 1):
        for col in range(1, row + 1):
            print(col, end=" ")
        print()


def calculate_average(numbers: list[float]) -> float:
    """Calculate the average of a list of numbers."""
    if not numbers:
        return 0.0

    total: float = 0.0
    for num in numbers:
        total += num

    return total / len(numbers)


# Test find_primes
primes: list[int] = find_primes(30)
print(f"Primes up to 30: {primes}")
print()

# Test print_number_pattern
print("Number pattern:")
print_number_pattern(5)
print()

# Test calculate_average
scores: list[float] = [85.0, 92.0, 78.0, 95.0, 88.0]
avg: float = calculate_average(scores)
print(f"Scores: {scores}")
print(f"Average: {avg:.1f}")
```

Study each function. `find_primes` uses nested `for` loops with `break`. `print_number_pattern` uses nested loops to draw a shape. `calculate_average` uses the accumulator pattern.

Change the inputs. Try `find_primes(50)`. Try a different number of rows in the pattern. Add your own scores to the list.

Every time you modify the code and predict what will happen before running it, you are learning. Do this over and over. That is how programming becomes intuitive.

---

**Previous:** [[wiki:python-conditions]] | **Next:** [[wiki:python-collections-lists]]
