# Recursion and Backtracking -- Functions That Call Themselves

You have already learned how to write functions. You know that a function is a set of instructions with a name, and you can call that function whenever you need it. But here is something wild: **a function can call itself**. That idea is called **recursion**, and it is one of the most powerful tools in all of programming.

Recursion can feel strange at first. Take your time. Read every example slowly, trace through every step, and type every piece of code with your own hands. Once it clicks, you will see it everywhere.

![A flat vector illustration in a children's educational book style showing a set of Russian nesting dolls (matryoshka) on a table, each one smaller than the last, with the smallest one glowing. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

---

## What Is Recursion?

**Recursion** is when a function calls itself to solve a smaller piece of the same problem.

That sounds like a tongue twister, so let's use two analogies to make it click.

### Analogy 1: Russian Nesting Dolls

Imagine you have a set of Russian nesting dolls (those wooden dolls where each one has a smaller doll hidden inside). To get to the tiniest doll, you:

1. Open the big doll and find a medium doll inside.
2. Open the medium doll and find a small doll inside.
3. Open the small doll and find the **tiniest** doll inside.
4. The tiniest doll does not open -- you have reached the end!

Now you work your way back out, putting each doll back together.

Recursion works the same way. You keep breaking the problem into smaller and smaller versions of itself until you reach a version so simple you already know the answer. Then you work your way back up, combining the answers.

### Analogy 2: The Dictionary

Imagine you look up the word "happy" in a dictionary. The definition says: "feeling **joy**." But you do not know what "joy" means, so you look THAT up. The definition says: "a feeling of great **pleasure**." You do not know "pleasure" either, so you look THAT up. Eventually you find a word you already understand -- that is your **base case**. Now you can work backwards and understand every definition.

Recursion is exactly like that chain of lookups: each step leads to a simpler version of the question, until you reach something you already know.

---

## The Two Required Parts of Every Recursive Function

Every recursive function **must** have exactly two parts, or it will break:

### 1. The Base Case -- When to Stop

The base case is the simplest version of the problem, the one you already know the answer to. It is the tiniest nesting doll that does not open. It is the dictionary word you already understand.

**Without a base case, the function calls itself forever and your program crashes.**

### 2. The Recursive Case -- How to Make the Problem Smaller

The recursive case is where the function calls itself, but with a **smaller** or **simpler** version of the problem. Each call must move you closer to the base case.

Think of it this way:

- **Base case:** "I already know the answer. Stop here."
- **Recursive case:** "I don't know the answer yet, but if I solve a slightly smaller version of this problem, I can figure it out."

---

## Your First Recursive Function: Countdown

Let's start simple. Here is a function that counts down from a number to 1:

```python
def countdown(n: int) -> None:
    if n <= 0:        # Base case: stop when we reach 0
        print("Go!")
        return

    print(n)          # Do something with the current number
    countdown(n - 1)  # Recursive case: count down from a smaller number
```

```python
countdown(5)
```

Output:
```
5
4
3
2
1
Go!
```

Let's trace what happens step by step:

1. `countdown(5)` -- prints 5, then calls `countdown(4)`
2. `countdown(4)` -- prints 4, then calls `countdown(3)`
3. `countdown(3)` -- prints 3, then calls `countdown(2)`
4. `countdown(2)` -- prints 2, then calls `countdown(1)`
5. `countdown(1)` -- prints 1, then calls `countdown(0)`
6. `countdown(0)` -- base case! Prints "Go!" and stops.

Each call waited for the one it started before it could finish. That is recursion in action.

---

## Factorial -- The Classic Example

The **factorial** of a number is that number multiplied by every number below it, all the way down to 1. We write it with an exclamation mark:

- `5! = 5 x 4 x 3 x 2 x 1 = 120`
- `4! = 4 x 3 x 2 x 1 = 24`
- `3! = 3 x 2 x 1 = 6`
- `1! = 1`

Here is the key insight: **5! = 5 x 4!**. And 4! = 4 x 3!. And so on. Each factorial is defined in terms of a smaller factorial. That is recursion!

```python
def factorial(n: int) -> int:
    if n <= 1:            # Base case: 1! = 1 (and 0! = 1)
        return 1

    return n * factorial(n - 1)  # Recursive case: n! = n * (n-1)!
```

```python
print(factorial(5))  # 120
```

![A flat vector illustration in a children's educational book style showing a staircase of numbered blocks from 5 down to 1, with arrows showing how each step connects to the one below it, and the results bubbling back up. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

---

## The Call Stack -- How Recursion Really Works

When a function calls another function (or itself), the computer needs to remember where it was so it can come back later. It does this using a **call stack**.

Think of it like a stack of sticky notes. Every time a function is called, you write down "I was here, waiting for an answer" on a sticky note and put it on the pile. When that function finishes, you peel off the top sticky note and go back to where you were.

### Visual Walkthrough: `factorial(4)`

Let's trace `factorial(4)` step by step through the call stack.

**Going down (making calls):**

```
factorial(4)  -->  "I need 4 * factorial(3). Let me call factorial(3) and wait."
  factorial(3)  -->  "I need 3 * factorial(2). Let me call factorial(2) and wait."
    factorial(2)  -->  "I need 2 * factorial(1). Let me call factorial(1) and wait."
      factorial(1)  -->  "Base case! I know this one. Return 1."
```

**Coming back up (returning answers):**

```
      factorial(1) returns 1
    factorial(2) gets 1 back, calculates 2 * 1 = 2, returns 2
  factorial(3) gets 2 back, calculates 3 * 2 = 6, returns 6
factorial(4) gets 6 back, calculates 4 * 6 = 24, returns 24
```

The final answer is **24**.

Here is another way to picture it as a table:

| Call | Waiting for... | Gets back | Calculates | Returns |
|------|---------------|-----------|------------|---------|
| `factorial(4)` | `factorial(3)` | 6 | 4 x 6 | 24 |
| `factorial(3)` | `factorial(2)` | 2 | 3 x 2 | 6 |
| `factorial(2)` | `factorial(1)` | 1 | 2 x 1 | 2 |
| `factorial(1)` | nothing (base case) | -- | -- | 1 |

Each call sits on the stack, waiting for the one below it to finish. Then the answers bubble back up.

---

## Sum of a List

Here is another example: adding up all the numbers in a list using recursion.

The idea:
- **Base case:** an empty list has a sum of 0.
- **Recursive case:** the sum of a list is the first item plus the sum of the rest of the list.

```python
def sum_list(numbers: list[int]) -> int:
    if len(numbers) == 0:    # Base case: empty list
        return 0

    first: int = numbers[0]
    rest: list[int] = numbers[1:]

    return first + sum_list(rest)  # Recursive case
```

```python
print(sum_list([3, 7, 2, 5]))  # 17
```

Trace:
```
sum_list([3, 7, 2, 5])  -->  3 + sum_list([7, 2, 5])
  sum_list([7, 2, 5])   -->  7 + sum_list([2, 5])
    sum_list([2, 5])     -->  2 + sum_list([5])
      sum_list([5])      -->  5 + sum_list([])
        sum_list([])     -->  0 (base case!)

Now bubble back up:
        0
      5 + 0 = 5
    2 + 5 = 7
  7 + 7 = 14
3 + 14 = 17
```

---

## Common Mistake: Forgetting the Base Case

What happens if you forget the base case?

```python
def broken_countdown(n: int) -> None:
    print(n)
    broken_countdown(n - 1)  # No base case! When does this stop?
```

It never stops! The function calls itself with 5, then 4, then 3, then 2, then 1, then 0, then -1, then -2... forever. Eventually Python runs out of memory on the call stack and crashes with this error:

```
RecursionError: maximum recursion depth exceeded
```

Python has a safety limit (usually around 1000 calls deep). If your function goes deeper than that, Python stops it to protect your computer.

**Rule:** Always write the base case FIRST. Before you write any recursive call, ask yourself: "When should this function stop calling itself?"

---

## What Is Backtracking?

Now that you understand recursion, let's learn a powerful technique built on top of it: **backtracking**.

### Analogy: Solving a Maze

Imagine you are in a maze. You come to a fork in the path. You have three choices: go left, go straight, or go right.

1. You pick left and start walking.
2. You hit a dead end. Oops!
3. You **go back** to the fork (that is the "backtracking" part).
4. Now you try going straight.
5. You hit another dead end.
6. You **go back** to the fork again.
7. You try going right.
8. It works! You find the exit!

**Backtracking** means: try something. If it does not work, undo it and try something else. You keep trying options until you find one that works (or until you run out of options).

In code, backtracking uses recursion. At each step, you:
1. **Choose** an option.
2. **Explore** that option by recursing.
3. If it did not work, **undo** your choice and try the next option.

![A flat vector illustration in a children's educational book style showing a garden maze seen from above with multiple paths, some blocked with hedges. Footprints show a path that tried one direction, backed up, and tried another direction successfully. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

---

## Backtracking Example: Generating All Combinations

Let's say you have the letters `["a", "b", "c"]` and you want to find every possible combination of 2 letters. The answer should be: `ab`, `ac`, `bc`.

Here is how backtracking solves this:

```python
def find_combinations(
    letters: list[str],
    length: int,
    start: int,
    current: list[str],
    results: list[str]
) -> None:
    # Base case: we have picked enough letters
    if len(current) == length:
        results.append("".join(current))
        return

    for i in range(start, len(letters)):
        current.append(letters[i])           # Choose
        find_combinations(letters, length,    # Explore
                          i + 1, current, results)
        current.pop()                         # Undo (backtrack!)
```

```python
results: list[str] = []
find_combinations(["a", "b", "c"], 2, 0, [], results)
print(results)  # ['ab', 'ac', 'bc']
```

Let's trace through this:

1. Pick "a". Now pick "b". We have 2 letters --> save "ab". **Backtrack:** remove "b".
2. Still have "a". Pick "c". We have 2 letters --> save "ac". **Backtrack:** remove "c".
3. No more letters after "c". **Backtrack:** remove "a".
4. Pick "b". Pick "c". We have 2 letters --> save "bc". **Backtrack:** remove "c".
5. **Backtrack:** remove "b". Done!

The key line is `current.pop()` -- that is the **undo** step. It removes the last choice so we can try a different one.

---

## Backtracking Example: Finding a Path

Here is a simpler example. Imagine a grid where you can only move right or down. Can you find a path from the top-left corner to the bottom-right corner?

```python
def find_path(
    grid: list[list[int]],
    row: int,
    col: int,
    path: list[tuple[int, int]]
) -> bool:
    rows: int = len(grid)
    cols: int = len(grid[0])

    # Out of bounds or blocked? Stop.
    if row >= rows or col >= cols or grid[row][col] == 1:
        return False

    # Add current position to path
    path.append((row, col))

    # Base case: reached the goal!
    if row == rows - 1 and col == cols - 1:
        return True

    # Try moving right
    if find_path(grid, row, col + 1, path):
        return True

    # Try moving down
    if find_path(grid, row + 1, col, path):
        return True

    # Neither worked -- backtrack!
    path.pop()
    return False
```

```python
# 0 = open, 1 = blocked
grid: list[list[int]] = [
    [0, 0, 1],
    [0, 0, 0],
    [1, 0, 0]
]
path: list[tuple[int, int]] = []
find_path(grid, 0, 0, path)
print(path)  # [(0, 0), (0, 1), (1, 1), (1, 2), (2, 2)]
```

The function tries going right first. If that hits a wall, it **backtracks** (removes the position from the path) and tries going down instead. This is the maze analogy in action!

---

## A Preview: Memoization (Remembering Answers)

Sometimes a recursive function solves the **same smaller problem** more than once. For example, when calculating Fibonacci numbers (you will learn about these in the next lesson), `fib(5)` calls `fib(3)` multiple times, and `fib(3)` calls `fib(1)` multiple times. That is a lot of wasted work!

**Memoization** means saving the answer to each problem the first time you solve it, so if you need it again, you just look it up instead of recalculating.

```python
def fib(n: int, memo: dict[int, int] = {}) -> int:
    if n <= 1:           # Base case
        return n
    if n in memo:        # Already solved this? Return the saved answer!
        return memo[n]

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
```

This is a sneak peek. You will learn all about this technique in [[wiki:python-jr-algo-dynamic-programming]].

---

## Quick Summary

| Concept | What It Means |
|---------|---------------|
| Recursion | A function that calls itself to solve smaller pieces of the same problem |
| Base case | The simplest version of the problem -- when the function stops calling itself |
| Recursive case | The step where the function calls itself with a smaller problem |
| Call stack | The pile of function calls waiting for answers to come back |
| Backtracking | Try an option, and if it fails, undo it and try something else |
| Memoization | Saving answers you already calculated so you do not redo the work |

---

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a desk with a notepad, drawing a tree-like diagram with branches and arrows showing how a function calls itself and returns answers. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-04.png)

---

## Practice Questions

**1.** What are the two required parts of every recursive function? What happens if you leave one out?

**2.** What will this function print when you call `mystery(4)`?

```python
def mystery(n: int) -> None:
    if n <= 0:
        return
    mystery(n - 1)
    print(n)
```

(Hint: notice that the `print` comes AFTER the recursive call. Trace through it carefully!)

**3.** Write a recursive function called `power(base, exponent)` that calculates `base` raised to the `exponent`. For example, `power(2, 3)` should return 8 (because 2 x 2 x 2 = 8). Hint: `2^3 = 2 * 2^2`, and anything raised to the power 0 is 1.

**4.** Trace through the call stack for `factorial(5)`. Write out each call, what it waits for, and what it returns, similar to the `factorial(4)` table in this lesson.

**5.** Here is a broken recursive function. What is wrong with it, and how would you fix it?

```python
def count_down(n: int) -> None:
    print(n)
    count_down(n - 1)
```

**6.** Write a recursive function called `reverse_string(text)` that returns the string reversed. For example, `reverse_string("hello")` should return `"olleh"`. Hint: the reverse of a string is the last character plus the reverse of everything before it.

**7.** In the backtracking combination example, what does `current.pop()` do, and why is it important?

**8.** You are at position (0, 0) in a 3x3 grid and want to reach (2, 2). You can only move right or down. Without any blocked cells, how many different paths exist? Try to figure this out by hand using the backtracking idea. (Hint: every path requires exactly 2 right moves and 2 down moves.)

---

## Answers to Practice Questions

**Answer 1:**

The two required parts are the **base case** (when to stop) and the **recursive case** (how to make the problem smaller and call itself). If you leave out the base case, the function calls itself forever and crashes with a `RecursionError`. If you leave out the recursive case, the function is not actually recursive -- it just handles the simple case and nothing else.

**Answer 2:**

```
1
2
3
4
```

This is tricky! Because `print(n)` comes AFTER the recursive call, the function goes all the way down to `mystery(0)` first (which returns without printing), and then prints on the way BACK UP. So the numbers come out in ascending order (1, 2, 3, 4), not descending order. Trace:

- `mystery(4)` calls `mystery(3)`, then waits to print 4.
- `mystery(3)` calls `mystery(2)`, then waits to print 3.
- `mystery(2)` calls `mystery(1)`, then waits to print 1... wait, let's be careful:
- `mystery(2)` calls `mystery(1)`, then waits to print 2.
- `mystery(1)` calls `mystery(0)`, then waits to print 1.
- `mystery(0)` hits the base case. Returns.
- Now `mystery(1)` prints 1.
- Now `mystery(2)` prints 2.
- Now `mystery(3)` prints 3.
- Now `mystery(4)` prints 4.

**Answer 3:**

```python
def power(base: int, exponent: int) -> int:
    if exponent == 0:    # Base case: anything to the power 0 is 1
        return 1

    return base * power(base, exponent - 1)
```

```python
print(power(2, 3))  # 8
print(power(5, 2))  # 25
print(power(3, 0))  # 1
```

**Answer 4:**

| Call | Waiting for... | Gets back | Calculates | Returns |
|------|---------------|-----------|------------|---------|
| `factorial(5)` | `factorial(4)` | 24 | 5 x 24 | 120 |
| `factorial(4)` | `factorial(3)` | 6 | 4 x 6 | 24 |
| `factorial(3)` | `factorial(2)` | 2 | 3 x 2 | 6 |
| `factorial(2)` | `factorial(1)` | 1 | 2 x 1 | 2 |
| `factorial(1)` | nothing (base case) | -- | -- | 1 |

The final answer is 120.

**Answer 5:**

The function is missing a **base case**. It will print numbers forever (5, 4, 3, 2, 1, 0, -1, -2, ...) until Python crashes with a `RecursionError`. Fix it by adding a base case:

```python
def count_down(n: int) -> None:
    if n <= 0:       # Base case: stop at 0
        print("Go!")
        return

    print(n)
    count_down(n - 1)
```

**Answer 6:**

```python
def reverse_string(text: str) -> str:
    if len(text) <= 1:    # Base case: empty or single character
        return text

    last: str = text[-1]
    rest: str = text[:-1]

    return last + reverse_string(rest)
```

```python
print(reverse_string("hello"))  # "olleh"
print(reverse_string("abc"))    # "cba"
print(reverse_string("a"))      # "a"
```

Trace for "hello":
- `reverse_string("hello")` --> "o" + `reverse_string("hell")`
- `reverse_string("hell")` --> "l" + `reverse_string("hel")`
- `reverse_string("hel")` --> "l" + `reverse_string("he")`
- `reverse_string("he")` --> "e" + `reverse_string("h")`
- `reverse_string("h")` --> "h" (base case)
- Coming back up: "h" --> "eh" --> "leh" --> "lleh" --> "olleh"

**Answer 7:**

`current.pop()` removes the last item that was added to the `current` list. This is the **undo** step in backtracking. After exploring one option (for example, picking the letter "b"), we need to remove it so we can try the next option (for example, picking "c" instead). Without this line, the list would keep growing and we would never explore alternative choices.

**Answer 8:**

There are **6** different paths. Every path from (0,0) to (2,2) must include exactly 2 right moves (R) and 2 down moves (D). The possible orderings are:

1. R, R, D, D --> (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2)
2. R, D, R, D --> (0,0) -> (0,1) -> (1,1) -> (1,2) -> (2,2)
3. R, D, D, R --> (0,0) -> (0,1) -> (1,1) -> (2,1) -> (2,2)
4. D, R, R, D --> (0,0) -> (1,0) -> (1,1) -> (1,2) -> (2,2)
5. D, R, D, R --> (0,0) -> (1,0) -> (1,1) -> (2,1) -> (2,2)
6. D, D, R, R --> (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)

This is the same as asking "how many ways can you arrange 2 R's and 2 D's?" which is 4! / (2! x 2!) = 6.

---

**Previous:** [[wiki:python-jr-algo-searching]] | **Next:** [[wiki:python-jr-algo-dynamic-programming]]
