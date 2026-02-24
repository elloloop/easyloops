# Loops -- Making the Computer Repeat Things

So far you know how to tell the computer to do something once: print a word, do some math, check a condition. But what if you need the computer to do the same thing over and over again? That is where **loops** come in.

This is one of the biggest ideas in programming. Take your time with this page -- read slowly, type every example, and make sure each one makes sense before moving on.

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

That prints the numbers 1 through 5. Not too bad, right? But what if you needed to print every number from 1 to 1000? You would have to write **one thousand** lines of `print(...)`. Nobody wants to do that!

A **loop** lets you tell the computer: "Do this thing again and again until I say stop." Instead of writing 1000 lines, you write just a few lines and the computer does the repeating for you.

Each time the computer goes through the loop is called an **iteration** (just a fancy word for "one trip through the loop").

![A flat vector illustration in a children's educational book style showing a conveyor belt with numbered boxes 1 through 1000 rolling past. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The `while` Loop -- "Keep Going As Long As..."

The `while` loop is the first loop you should learn. It works exactly like it sounds in English:

> "**While** something is true, keep doing this."

Here is your first loop:

```python
count: int = 1

while count <= 5:
    print(count)
    count = count + 1
```

Output:
```
1
2
3
4
5
```

Five numbers printed, but you only wrote a few lines of code. That is the power of a loop!

### The Three Parts of Every `while` Loop

Think of running laps around a track. There are three things you always do:

1. **Set up** -- Stand at the starting line (lap 1).
2. **Check** -- "Have I finished all my laps yet?" If no, keep running. If yes, stop.
3. **Update** -- After each lap, add 1 to your lap count.

Every `while` loop works the same way:

```python
# 1. SET UP -- create a variable to keep track
count: int = 1

# 2. CHECK -- are we done yet?
while count <= 5:
    # ... do the work ...
    print(count)

    # 3. UPDATE -- move forward
    count = count + 1

print("Done!")
```

Let's walk through what happens step by step:

| Step | `count` value | Is `count <= 5`? | What happens        |
|------|--------------|-------------------|----------------------|
| 1    | 1            | Yes               | Print 1, count becomes 2 |
| 2    | 2            | Yes               | Print 2, count becomes 3 |
| 3    | 3            | Yes               | Print 3, count becomes 4 |
| 4    | 4            | Yes               | Print 4, count becomes 5 |
| 5    | 5            | Yes               | Print 5, count becomes 6 |
| 6    | 6            | No                | Stop! Loop is over   |

Notice that when `count` reaches 6, the check `6 <= 5` is `False`, so the loop ends.

---

## More `while` Loop Examples

### Counting Down (Like a Rocket Launch)

```python
countdown: int = 5

while countdown > 0:
    print(countdown)
    countdown = countdown - 1

print("Liftoff!")
```

Output:
```
5
4
3
2
1
Liftoff!
```

Here the **set up** starts at 5, the **check** is "is it still greater than 0?", and the **update** subtracts 1 each time.

### Adding Numbers Together

Let's add the numbers 1 through 5 (so 1 + 2 + 3 + 4 + 5):

```python
number: int = 1
total: int = 0

while number <= 5:
    total = total + number
    number = number + 1

print(total)
```

Output:
```
15
```

We use two variables here: `number` keeps track of which number we are on, and `total` keeps a running sum.

![A flat vector illustration in a children's educational book style showing Byte the robot running around a circular track with lap numbers marked on it. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Infinite Loops -- When You Forget to Update!

What happens if you forget the update step?

```python
count: int = 1

while count <= 5:
    print(count)
    # Oops! We forgot: count = count + 1
```

The variable `count` stays at 1 forever. The check `1 <= 5` is always `True`. The computer will print `1` over and over and **never stop**. This is called an **infinite loop** (infinite means "going on forever").

If this ever happens to you, don't panic! Press **Ctrl+C** on your keyboard (hold the Ctrl key and press C). That tells the computer: "Stop what you are doing right now!"

**Remember:** every `while` loop MUST have an update step that eventually makes the condition `False`.

---

## `break` -- The Emergency Exit

Sometimes you want to leave a loop early, before the condition becomes `False`. The keyword `break` means "stop the loop right now and jump out."

```python
count: int = 1

while count <= 10:
    if count == 6:
        print("I'm stopping early!")
        break
    print(count)
    count = count + 1
```

Output:
```
1
2
3
4
5
I'm stopping early!
```

The loop was supposed to go up to 10, but when `count` hit 6, we used `break` to exit early. Think of it like an emergency exit door in a building -- you can leave anytime, even if the building is still open.

---

## `continue` -- Skip This One, Keep Going

The keyword `continue` means "skip the rest of this iteration and go back to the check step." It does NOT end the loop -- it just skips one trip.

```python
count: int = 0

while count < 10:
    count = count + 1
    if count == 5:
        continue
    print(count)
```

Output:
```
1
2
3
4
6
7
8
9
10
```

Notice that 5 is missing! When `count` was 5, `continue` told the loop to skip the `print` and jump straight back to the check.

Think of it like this: you are handing out candy to 10 people in a line, but you skip person number 5 because they already have candy.

---

## The `while True` Pattern -- Keep Going Until Told to Stop

Sometimes you don't know ahead of time when to stop. In that case, you can use `while True:` -- this creates a loop that runs forever... unless you use `break` to stop it.

```python
while True:
    answer: str = input("Type 'quit' to stop: ")
    if answer == "quit":
        break
    print("You typed: " + answer)

print("Goodbye!")
```

This loop keeps asking the user for input. It only stops when the user types "quit". The `while True` part means "the condition is always True, so keep going." The `break` inside is the only way out.

This pattern is very common for menus and programs that wait for the user to decide when to stop.

---

## The `for` Loop -- A Handy Shortcut

Now that you understand `while` loops, let's learn the `for` loop. The `for` loop is really just a **shortcut** for a very common `while` pattern.

### Side-by-Side Comparison

Here is a `while` loop that prints the numbers 0 through 4:

```python
# Using while
i: int = 0
while i < 5:
    print(i)
    i = i + 1
```

And here is a `for` loop that does the exact same thing:

```python
# Using for
for i in range(5):
    print(i)
```

Output (both give the same result):
```
0
1
2
3
4
```

The `for` loop handles the **set up**, the **check**, and the **update** all automatically! You just say "for each number in this range, do something."

### Another Comparison

Counting from 1 to 5:

```python
# While version
count: int = 1
while count <= 5:
    print(count)
    count = count + 1

# For version (same result)
for count in range(1, 6):
    print(count)
```

Both print:
```
1
2
3
4
5
```

The `for` loop is shorter and you can't accidentally forget the update step!

![A flat vector illustration in a children's educational book style showing two side-by-side paths through a garden maze, one longer and winding and one shorter and direct, both leading to the same destination. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## `range()` -- Generating Numbers

The `range()` function gives you a sequence of numbers. It is used with `for` loops all the time.

### One Number: `range(5)`

Gives you: 0, 1, 2, 3, 4 (starts at 0, stops **before** 5).

```python
for i in range(5):
    print(i)
```
```
0
1
2
3
4
```

### Two Numbers: `range(1, 6)`

Gives you: 1, 2, 3, 4, 5 (starts at 1, stops **before** 6).

```python
for i in range(1, 6):
    print(i)
```
```
1
2
3
4
5
```

### Three Numbers: `range(0, 10, 2)`

The third number is the **step** -- how much to jump by each time. `range(0, 10, 2)` gives you: 0, 2, 4, 6, 8 (starts at 0, goes up by 2, stops before 10).

```python
for i in range(0, 10, 2):
    print(i)
```
```
0
2
4
6
8
```

### Quick Reference

| Code              | Numbers you get       |
|-------------------|-----------------------|
| `range(5)`        | 0, 1, 2, 3, 4        |
| `range(1, 6)`     | 1, 2, 3, 4, 5        |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8        |
| `range(10, 0, -1)`| 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 |
| `range(3, 3)`     | (nothing -- start equals stop) |

---

## Looping Through a List

You already know that a list is a group of items (you will learn more in [[wiki:python-jr-collections-lists]]). A `for` loop can go through each item in a list one by one:

```python
fruits: list[str] = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

Output:
```
apple
banana
cherry
```

The variable `fruit` takes on each value in the list, one at a time. First it is `"apple"`, then `"banana"`, then `"cherry"`.

Here is the same thing with a `while` loop, so you can see the connection:

```python
fruits: list[str] = ["apple", "banana", "cherry"]
i: int = 0

while i < len(fruits):
    print(fruits[i])
    i = i + 1
```

The `for` version is much cleaner!

---

## `enumerate()` -- Getting the Position AND the Item

Sometimes you want to know both the **position number** (called the index) and the **item** itself. The `enumerate()` function gives you both:

```python
colors: list[str] = ["red", "green", "blue"]

for index, color in enumerate(colors):
    print(str(index) + ": " + color)
```

Output:
```
0: red
1: green
2: blue
```

The word `enumerate` just means "number them." It pairs each item with its position: (0, "red"), (1, "green"), (2, "blue").

Without `enumerate`, you would have to manage the index yourself:

```python
colors: list[str] = ["red", "green", "blue"]
index: int = 0

for color in colors:
    print(str(index) + ": " + color)
    index = index + 1
```

`enumerate` is simpler and less error-prone.

---

## Nested Loops -- A Loop Inside a Loop

You can put a loop inside another loop. This is called a **nested loop**.

Think of a clock. The **hours** go from 1 to 12. For **each** hour, the **minutes** go from 0 to 59. The minutes loop is *inside* the hours loop.

Here is a simpler example -- printing pairs of numbers:

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(str(i) + "," + str(j))
```

Output:
```
1,1
1,2
1,3
2,1
2,2
2,3
3,1
3,2
3,3
```

The outer loop (`i`) runs 3 times. For **each** time `i` runs, the inner loop (`j`) runs 3 times. So you get 3 x 3 = 9 pairs.

### Multiplication Table

A classic use of nested loops:

```python
for row in range(1, 6):
    line: str = ""
    for col in range(1, 6):
        product: int = row * col
        line = line + str(product) + "\t"
    print(line)
```

Output:
```
1	2	3	4	5
2	4	6	8	10
3	6	9	12	15
4	8	12	16	20
5	10	15	20	25
```

(The `\t` adds a tab space so the numbers line up.)

For each row, we go through every column and multiply. That is two loops working together!

![A flat vector illustration in a children's educational book style showing a grid of colorful multiplication results arranged like tiles on a wall. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Common Loop Patterns

Here are patterns you will use again and again.

### Pattern 1: Counting

Count how many items match a rule:

```python
numbers: list[int] = [4, 7, 2, 9, 1, 8, 3]
big_count: int = 0

for num in numbers:
    if num > 5:
        big_count = big_count + 1

print("Numbers bigger than 5: " + str(big_count))
```

Output: `Numbers bigger than 5: 3`

### Pattern 2: Accumulating (Building Up a Total)

Add up all the numbers in a list:

```python
prices: list[float] = [2.50, 1.75, 3.00, 0.99]
total: float = 0.0

for price in prices:
    total = total + price

print("Total: " + str(total))
```

Output: `Total: 8.24`

### Pattern 3: Searching

Find whether something is in a list:

```python
names: list[str] = ["Alice", "Bob", "Charlie", "Diana"]
looking_for: str = "Charlie"
found: bool = False

for name in names:
    if name == looking_for:
        found = True
        break

if found:
    print("Found " + looking_for + "!")
else:
    print(looking_for + " is not in the list.")
```

Output: `Found Charlie!`

### Pattern 4: Building a New List

Create a new list from an old one:

```python
numbers: list[int] = [1, 2, 3, 4, 5]
doubled: list[int] = []

for num in numbers:
    doubled.append(num * 2)

print(doubled)
```

Output: `[2, 4, 6, 8, 10]`

We start with an empty list `[]` and use `append()` to add items one by one.

---

## Common Mistakes

### Mistake 1: Forgetting the Update

```python
# BROKEN -- runs forever!
count: int = 1
while count <= 5:
    print(count)
    # Missing: count = count + 1
```

Always make sure something changes inside the loop so the condition eventually becomes `False`.

### Mistake 2: Off-by-One Errors

An **off-by-one error** means your loop runs one time too many or one time too few.

```python
# Oops -- this prints 0 through 4, not 1 through 5
for i in range(5):
    print(i)
```

If you want 1 through 5, you need `range(1, 6)`. Remember, `range` stops **before** the second number.

### Mistake 3: Changing a List While Looping Through It

```python
# BROKEN -- don't do this!
numbers: list[int] = [1, 2, 3, 4, 5]
for num in numbers:
    if num == 3:
        numbers.remove(num)
```

Removing items from a list while you are looping through it causes strange behavior. Instead, build a new list:

```python
# CORRECT
numbers: list[int] = [1, 2, 3, 4, 5]
kept: list[int] = []
for num in numbers:
    if num != 3:
        kept.append(num)
```

---

## Quick Summary

| Concept         | What it does                                        |
|----------------|-----------------------------------------------------|
| `while`        | Keep repeating as long as the condition is True      |
| `for`          | Go through each item in a sequence (shortcut)        |
| `range()`      | Generate a sequence of numbers                       |
| `break`        | Exit the loop immediately                            |
| `continue`     | Skip to the next iteration                           |
| `enumerate()`  | Get both the position number and the item            |
| Nested loop    | A loop inside another loop                           |
| Infinite loop  | A loop that never stops (usually a bug!)             |

---

## Practice Questions

**1.** What will this code print?

```python
x: int = 10
while x > 0:
    print(x)
    x = x - 3
```

**2.** Write a `while` loop that prints the even numbers from 2 to 20 (2, 4, 6, ..., 20).

**3.** What is wrong with this code? What will happen if you run it?

```python
n: int = 1
while n != 10:
    print(n)
    n = n + 2
```

**4.** Rewrite this `while` loop as a `for` loop that produces the same output:

```python
i: int = 0
while i < 5:
    print(i * i)
    i = i + 1
```

**5.** What numbers does `range(2, 11, 3)` produce?

**6.** Write a `for` loop that goes through the list `["cat", "dog", "fish", "bird"]` and prints each animal with its position number, like:
```
0: cat
1: dog
2: fish
3: bird
```

**7.** What will this code print?

```python
for i in range(3):
    for j in range(2):
        print(str(i) + "-" + str(j))
```

**8.** Write a loop that asks the user to type a number. If they type `0`, the loop stops and prints the total of all the numbers they entered. (Hint: use `while True` and `break`.)

**9.** What will this code print?

```python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
```

**10.** Write a `for` loop that calculates the sum of all numbers from 1 to 100. (Hint: use `range` and an accumulator variable.)

---

## Answers to Practice Questions

**Answer 1:**
```
10
7
4
1
```
`x` starts at 10, then becomes 7, then 4, then 1. When `x` becomes -2, the condition `x > 0` is `False` and the loop stops.

**Answer 2:**
```python
num: int = 2
while num <= 20:
    print(num)
    num = num + 2
```

**Answer 3:**
The variable `n` starts at 1 and goes up by 2 each time: 1, 3, 5, 7, 9, 11, 13... It will **never equal 10** because it jumps from 9 to 11. This creates an infinite loop! A safer condition would be `n < 10`.

**Answer 4:**
```python
for i in range(5):
    print(i * i)
```

**Answer 5:**
`range(2, 11, 3)` produces: 2, 5, 8. It starts at 2, goes up by 3 each time, and stops before 11.

**Answer 6:**
```python
animals: list[str] = ["cat", "dog", "fish", "bird"]
for index, animal in enumerate(animals):
    print(str(index) + ": " + animal)
```

**Answer 7:**
```
0-0
0-1
1-0
1-1
2-0
2-1
```
The outer loop runs 3 times (i = 0, 1, 2). For each `i`, the inner loop runs 2 times (j = 0, 1). So there are 3 x 2 = 6 lines.

**Answer 8:**
```python
total: int = 0

while True:
    text: str = input("Enter a number (0 to stop): ")
    number: int = int(text)
    if number == 0:
        break
    total = total + number

print("Total: " + str(total))
```

**Answer 9:**
```
1
2
4
5
```
When `i` is 3, `continue` skips the `print` and jumps to the next iteration. So 3 is not printed.

**Answer 10:**
```python
total: int = 0
for i in range(1, 101):
    total = total + i
print(total)
```
The answer is 5050.

---

**Previous:** [[wiki:python-jr-conditions]] | **Next:** [[wiki:python-jr-collections-lists]]
