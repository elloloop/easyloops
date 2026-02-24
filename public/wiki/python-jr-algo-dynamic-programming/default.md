# Dynamic Programming -- Remembering Answers to Save Time

In the last lesson on [[wiki:python-jr-algo-recursion]], you learned that recursion solves big problems by breaking them into smaller pieces. That is a brilliant idea. But there is a sneaky problem hiding inside some recursive solutions: they solve the **same smaller piece over and over again**, wasting tons of time.

**Dynamic programming** (often called **DP**) is the fix. It is recursion with a superpower: a **memory**. Instead of recalculating the same thing ten times, you calculate it once, write down the answer, and look it up whenever you need it again.

This lesson is one of the most important ones on your journey to becoming a coding expert. It takes patience. Read every step, trace every example, and type every line of code yourself.

![A flat vector illustration in a children's educational book style showing Byte the robot standing in front of a large wall covered in colorful sticky notes, each with a number on it, organized from small to large. Byte is placing a new sticky note on the wall with a happy expression. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The Problem: Doing the Same Work Over and Over

### The Fibonacci Sequence

The **Fibonacci sequence** is a famous pattern of numbers where each number is the sum of the two before it:

```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
```

The rule is simple:
- `fib(0) = 0`
- `fib(1) = 1`
- `fib(n) = fib(n-1) + fib(n-2)` for everything else

This is a perfect job for recursion:

```python
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

Looks clean and simple. But there is a hidden disaster. Let's trace `fib(5)`:

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1) = 1
│   │   │   └── fib(0) = 0
│   │   └── fib(1) = 1
│   └── fib(2)
│       ├── fib(1) = 1
│       └── fib(0) = 0
└── fib(3)
    ├── fib(2)
    │   ├── fib(1) = 1
    │   └── fib(0) = 0
    └── fib(1) = 1
```

Look at this mess! `fib(3)` is calculated **twice**. `fib(2)` is calculated **three times**. `fib(1)` is calculated **five times**. And this is only `fib(5)`. If you tried `fib(40)`, the function would make over **300 million** calls. Your computer would sit there chugging for a very long time.

### Analogy: The Teacher and the Multiplication Problem

Imagine your teacher asks you: "What is 7 x 8?" You work it out: 56. Good.

Five minutes later, the teacher asks again: "What is 7 x 8?" Would you work it out from scratch again? Of course not! You **remember** the answer is 56.

But the simple recursive Fibonacci function is like a student who forgets the answer every single time and recalculates from scratch. That is incredibly wasteful.

**Dynamic programming is like writing the answer on a sticky note so you never have to recalculate it.**

---

## What Is Dynamic Programming?

**Dynamic programming** means solving a problem by:

1. **Breaking it into smaller subproblems** (just like recursion).
2. **Remembering the answer to each subproblem** so you never solve it twice.

That second part is what makes DP special. There are two ways to do it, and both give you the same answers. They just approach the problem from different directions.

---

## Approach 1: Top-Down (Memoization)

### The Idea

Start with the big problem. When you need a smaller answer, check if you already solved it. If yes, use the saved answer. If no, solve it, **save it**, and move on.

### Analogy: Sticky Notes on Your Desk

You are working on a big homework problem that keeps referring to smaller problems. Every time you solve a smaller problem, you write the answer on a sticky note and stick it on your desk. The next time you need that answer, you just glance at the sticky note instead of doing the work again.

### Fibonacci with Memoization

```python
def fib_memo(n: int, memo: dict[int, int] = {}) -> int:
    if n <= 1:              # Base case
        return n

    if n in memo:           # Already solved? Use the sticky note!
        return memo[n]

    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]
```

```python
print(fib_memo(5))   # 5
print(fib_memo(10))  # 55
print(fib_memo(40))  # 102334155 -- instant!
```

Let's trace `fib_memo(5)`:

```
fib_memo(5)
├── fib_memo(4)
│   ├── fib_memo(3)
│   │   ├── fib_memo(2)
│   │   │   ├── fib_memo(1) = 1
│   │   │   └── fib_memo(0) = 0
│   │   │   memo[2] = 1
│   │   └── fib_memo(1) = 1
│   │   memo[3] = 2
│   └── fib_memo(2) --> memo[2] already exists! Return 1 instantly.
│   memo[4] = 3
└── fib_memo(3) --> memo[3] already exists! Return 2 instantly.
memo[5] = 5
```

See the difference? When `fib_memo(5)` needs `fib_memo(3)`, it finds the answer already saved in the memo dictionary. No need to recalculate! Instead of making 15 calls, we make about 9. For bigger numbers, the savings are enormous.

![A flat vector illustration in a children's educational book style showing a tree diagram where some branches are highlighted in green (calculated once) and other branches have a shortcut arrow pointing to a sticky note with the answer already written. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Approach 2: Bottom-Up (Tabulation)

### The Idea

Instead of starting with the big problem and working down, start with the **smallest** problems and work your way **up**. Fill in a table (usually a list) one entry at a time, from small to large.

### Analogy: Building a Brick Wall

You cannot start a brick wall from the top. You lay the bottom row first, then the next row on top of that, and keep building upward. Each row rests on the one below it.

Bottom-up DP works the same way. You solve the smallest problems first (the bottom bricks), and each bigger answer is built from smaller answers you already have.

### Fibonacci with Tabulation

```python
def fib_table(n: int) -> int:
    if n <= 1:
        return n

    table: list[int] = [0] * (n + 1)  # Create a table with n+1 slots
    table[0] = 0                        # We know fib(0)
    table[1] = 1                        # We know fib(1)

    for i in range(2, n + 1):           # Fill in the rest, bottom to top
        table[i] = table[i - 1] + table[i - 2]

    return table[n]
```

```python
print(fib_table(5))   # 5
print(fib_table(10))  # 55
print(fib_table(40))  # 102334155
```

Let's trace `fib_table(5)`:

| Step | i | table[i-1] | table[i-2] | table[i] | Full table |
|------|---|-----------|-----------|---------|------------|
| Start | -- | -- | -- | -- | [0, 1, 0, 0, 0, 0] |
| 1 | 2 | 1 | 0 | 1 | [0, 1, 1, 0, 0, 0] |
| 2 | 3 | 1 | 1 | 2 | [0, 1, 1, 2, 0, 0] |
| 3 | 4 | 2 | 1 | 3 | [0, 1, 1, 2, 3, 0] |
| 4 | 5 | 3 | 2 | 5 | [0, 1, 1, 2, 3, 5] |

No recursion at all! Just a simple loop that fills in a table. Each entry depends on two entries that were already filled in.

---

## Comparing All Three Approaches

Here they are side by side:

```python
# 1. Plain recursion (SLOW -- recalculates everything)
def fib_slow(n: int) -> int:
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)


# 2. Top-down with memoization (FAST -- remembers answers)
def fib_memo(n: int, memo: dict[int, int] = {}) -> int:
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]


# 3. Bottom-up with tabulation (FAST -- builds up from the bottom)
def fib_table(n: int) -> int:
    if n <= 1:
        return n
    table: list[int] = [0] * (n + 1)
    table[0] = 0
    table[1] = 1
    for i in range(2, n + 1):
        table[i] = table[i - 1] + table[i - 2]
    return table[n]
```

| Approach | Speed | Uses recursion? | Extra memory |
|----------|-------|----------------|-------------|
| Plain recursion | Very slow for large n | Yes | Call stack only |
| Top-down (memoization) | Fast | Yes | Dictionary for answers |
| Bottom-up (tabulation) | Fast | No (uses a loop) | List/table for answers |

Both memoization and tabulation give the same answer. Memoization feels more natural if you already wrote the recursive version. Tabulation avoids recursion entirely, which can be better for very large problems.

---

## Problem: Climbing Stairs

Here is a classic puzzle. You are climbing a staircase with `n` steps. Each time, you can climb either **1 step** or **2 steps**. How many different ways can you reach the top?

**Example:** If there are 4 steps, the ways are:
- 1+1+1+1
- 1+1+2
- 1+2+1
- 2+1+1
- 2+2

That is **5** ways.

### Thinking It Through

If you are standing at step `n`, how did you get there? You either:
- Took 1 step from step `n-1`, OR
- Took 2 steps from step `n-2`

So the number of ways to reach step `n` = ways to reach step `n-1` + ways to reach step `n-2`.

Wait... that is the same pattern as Fibonacci!

### Bottom-Up Solution

```python
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n

    table: list[int] = [0] * (n + 1)
    table[1] = 1  # 1 way to climb 1 step
    table[2] = 2  # 2 ways to climb 2 steps

    for i in range(3, n + 1):
        table[i] = table[i - 1] + table[i - 2]

    return table[n]
```

```python
print(climb_stairs(4))   # 5
print(climb_stairs(5))   # 8
print(climb_stairs(10))  # 89
```

Trace for `climb_stairs(5)`:

| Step i | table[i-1] | table[i-2] | table[i] |
|--------|-----------|-----------|---------|
| 3 | 2 | 1 | 3 |
| 4 | 3 | 2 | 5 |
| 5 | 5 | 3 | 8 |

There are **8** ways to climb 5 stairs.

---

## Problem: Coin Change

You have a set of coin values and a target amount. What is the **fewest number of coins** you need to make exactly that amount?

**Example:** Coins are [1, 5, 10] and the target is 12.
- You could use 12 pennies (12 coins) -- that works but is a lot of coins.
- You could use 1 dime + 2 pennies (3 coins) -- much better!
- Is there a way with fewer? No! The answer is **3**.

### Thinking It Through

For each amount from 0 to target, ask: "What is the fewest coins to make THIS amount?"

For amount 0, the answer is 0 (no coins needed).

For any other amount, try every coin. If you use a coin of value `c`, then you need 1 + (fewest coins to make `amount - c`). Take the minimum across all coins.

### Bottom-Up Solution

```python
def coin_change(coins: list[int], amount: int) -> int:
    # table[i] = fewest coins to make amount i
    # Start with a big number meaning "impossible so far"
    big: int = amount + 1
    table: list[int] = [big] * (amount + 1)
    table[0] = 0  # 0 coins needed to make amount 0

    for current_amount in range(1, amount + 1):
        for coin in coins:
            if coin <= current_amount:
                remaining: int = current_amount - coin
                table[current_amount] = min(
                    table[current_amount],
                    1 + table[remaining]
                )

    if table[amount] > amount:
        return -1  # Impossible to make this amount
    return table[amount]
```

```python
print(coin_change([1, 5, 10], 12))  # 3 (10 + 1 + 1)
print(coin_change([1, 3, 4], 6))    # 2 (3 + 3)
print(coin_change([2], 3))          # -1 (impossible!)
```

Let's trace `coin_change([1, 5, 10], 12)` for the first few amounts:

| Amount | Try coin 1 | Try coin 5 | Try coin 10 | Best |
|--------|-----------|-----------|------------|------|
| 0 | -- | -- | -- | 0 |
| 1 | 1 + table[0] = 1 | too big | too big | 1 |
| 2 | 1 + table[1] = 2 | too big | too big | 2 |
| 3 | 1 + table[2] = 3 | too big | too big | 3 |
| 4 | 1 + table[3] = 4 | too big | too big | 4 |
| 5 | 1 + table[4] = 5 | 1 + table[0] = 1 | too big | 1 |
| 6 | 1 + table[5] = 2 | 1 + table[1] = 2 | too big | 2 |
| ... | ... | ... | ... | ... |
| 12 | 1 + table[11] = 3 | 1 + table[7] = 4 | 1 + table[2] = 3 | 3 |

Each row builds on rows above it -- that is the bottom-up approach in action!

![A flat vector illustration in a children's educational book style showing a staircase of colorful coins being stacked, with Byte the robot placing coins one by one while checking a chart on the wall that shows the fewest coins needed for each amount. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## How to Spot a DP Problem

Not every problem needs dynamic programming. Here are the clues that tell you DP might be the right tool:

### Clue 1: The Question Asks "How Many Ways..." or "What Is the Minimum/Maximum..."

- "How many ways can you climb the stairs?" --> DP
- "What is the minimum number of coins?" --> DP
- "What is the longest increasing sequence?" --> DP

### Clue 2: Overlapping Subproblems

When you draw the recursion tree and see the **same call appearing more than once**, you have overlapping subproblems. That is the big signal that plain recursion is doing wasted work, and DP can help.

### Clue 3: Optimal Substructure

The best solution to the big problem can be built from the best solutions to smaller problems. For example, the fewest coins for amount 12 depends on the fewest coins for amounts 11, 7, and 2 (if your coins are 1, 5, and 10).

### Quick Checklist

Ask yourself:
1. Can I break this into smaller versions of the same problem? (Yes --> could be DP)
2. Do the smaller problems overlap (same one solved multiple times)? (Yes --> DP will help)
3. Does the problem ask for a count, minimum, or maximum? (Yes --> probably DP)

---

## 1D vs 2D DP -- A Brief Look

So far, all our tables have been **one-dimensional** -- a single list where each position represents one value (like `table[amount]` or `table[step]`).

Some problems need a **two-dimensional** table -- a grid where you need two numbers to look up an answer. For example, `table[i][j]` might represent "the best answer using the first `i` items with a budget of `j`."

You do not need to master 2D DP right now. Just know that the same ideas apply: break the problem into subproblems, fill in a table from small to large, and each cell uses values from cells you already filled in. The table just has rows AND columns instead of only a single row.

---

## Quick Summary

| Concept | What It Means |
|---------|---------------|
| Dynamic Programming | Breaking a problem into subproblems and remembering answers to avoid repeat work |
| Overlapping subproblems | The same smaller problem gets solved multiple times in plain recursion |
| Memoization (top-down) | Start with the big problem, recurse down, save each answer in a dictionary |
| Tabulation (bottom-up) | Start with the smallest problems, fill in a table with a loop, build up to the answer |
| 1D DP | A table that is a single list (one dimension) |
| 2D DP | A table that is a grid of rows and columns (two dimensions) |

---

## Practice Questions

**1.** Why is the plain recursive Fibonacci function so slow for large numbers? What specific problem does it have?

**2.** Explain the difference between top-down (memoization) and bottom-up (tabulation) in your own words. Use an analogy if it helps.

**3.** Here is a memoized Fibonacci function with a bug. What is wrong?

```python
def fib_broken(n: int, memo: dict[int, int] = {}) -> int:
    if n <= 1:
        return n

    memo[n] = fib_broken(n - 1, memo) + fib_broken(n - 2, memo)
    return memo[n]
```

**4.** Using the climbing stairs idea, how many ways are there to climb a staircase with 6 steps? Work it out step by step using the bottom-up method.

**5.** You have coins [1, 3, 4] and need to make amount 6. Trace through the coin change algorithm. What is the fewest number of coins needed, and which coins are they?

**6.** For each of these problems, would you use dynamic programming? Why or why not?
- a) "Sort a list of numbers from smallest to largest."
- b) "How many ways can you make change for $1.00 using pennies, nickels, dimes, and quarters?"
- c) "Find the largest number in a list."
- d) "What is the minimum number of moves to solve this puzzle?"

**7.** Write a bottom-up DP solution for this problem: given a list of numbers, find the **maximum sum** you can get by picking numbers that are not next to each other. For example, in `[3, 2, 7, 10]`, you could pick 3 and 7 (sum 10), or 3 and 10 (sum 13), or 2 and 10 (sum 12). The best is 13.

**8.** The climbing stairs problem said you can take 1 or 2 steps at a time. What if you could take 1, 2, OR 3 steps at a time? Modify the solution to handle this. How many ways are there to climb 5 steps?

---

## Answers to Practice Questions

**Answer 1:**

The plain recursive Fibonacci function recalculates the same subproblems over and over. For example, `fib(5)` calls `fib(3)` twice, and each of those calls `fib(2)` and `fib(1)` again. The number of calls grows very fast (roughly doubling with each increase in n). This is called having **overlapping subproblems**. The function does not remember anything -- every time it needs an answer, it starts from scratch.

**Answer 2:**

**Top-down (memoization):** You start at the top of the problem and work your way down, asking for smaller and smaller answers. Whenever you solve something, you write the answer on a sticky note. Next time you need that answer, you check your sticky notes first. It uses recursion.

**Bottom-up (tabulation):** You start at the very bottom with the smallest, easiest problems and solve them first. Then you use those answers to solve slightly bigger problems, and keep building upward until you reach the big problem you actually care about. It uses a loop and a table.

Both strategies avoid redoing work. The difference is the direction: top-down starts big and breaks down, bottom-up starts small and builds up.

**Answer 3:**

The function never checks if `n` is already in `memo` before recalculating! It always recalculates `memo[n]` even if the answer is already saved. The fix is to add a check:

```python
def fib_fixed(n: int, memo: dict[int, int] = {}) -> int:
    if n <= 1:
        return n

    if n in memo:        # This line was missing!
        return memo[n]

    memo[n] = fib_fixed(n - 1, memo) + fib_fixed(n - 2, memo)
    return memo[n]
```

Without that check, the function still works (gives the right answer), but it is just as slow as the version without memoization because it never actually uses the saved answers.

**Answer 4:**

| Step | table[i-1] | table[i-2] | table[i] |
|------|-----------|-----------|---------|
| 1 | -- | -- | 1 |
| 2 | -- | -- | 2 |
| 3 | 2 | 1 | 3 |
| 4 | 3 | 2 | 5 |
| 5 | 5 | 3 | 8 |
| 6 | 8 | 5 | 13 |

There are **13** ways to climb 6 steps.

**Answer 5:**

Coins are [1, 3, 4], target is 6:

| Amount | Try coin 1 | Try coin 3 | Try coin 4 | Best |
|--------|-----------|-----------|-----------|------|
| 0 | -- | -- | -- | 0 |
| 1 | 1+table[0]=1 | too big | too big | 1 |
| 2 | 1+table[1]=2 | too big | too big | 2 |
| 3 | 1+table[2]=3 | 1+table[0]=1 | too big | 1 |
| 4 | 1+table[3]=2 | 1+table[1]=2 | 1+table[0]=1 | 1 |
| 5 | 1+table[4]=2 | 1+table[2]=3 | 1+table[1]=2 | 2 |
| 6 | 1+table[5]=3 | 1+table[3]=2 | 1+table[2]=3 | 2 |

The fewest coins is **2**. The coins are **3 + 3 = 6**. Notice that a greedy approach would pick coin 4 first (the biggest that fits), giving 4+1+1 = 3 coins. DP found the better answer!

**Answer 6:**

- a) **No.** Sorting does not have overlapping subproblems in the DP sense. Sorting algorithms like merge sort use a different technique (divide and conquer).
- b) **Yes.** This asks "how many ways," and the subproblems overlap (making change for 50 cents shows up when calculating change for 60 cents, 75 cents, etc.).
- c) **No.** Finding the largest number just requires one pass through the list. There are no subproblems to remember.
- d) **Yes.** This asks for a minimum, and puzzle states often repeat during exploration.

**Answer 7:**

```python
def max_non_adjacent_sum(numbers: list[int]) -> int:
    if len(numbers) == 0:
        return 0
    if len(numbers) == 1:
        return numbers[0]

    table: list[int] = [0] * len(numbers)
    table[0] = numbers[0]
    table[1] = max(numbers[0], numbers[1])

    for i in range(2, len(numbers)):
        # Either skip numbers[i] (take table[i-1])
        # or take numbers[i] + best from two spots back (table[i-2])
        table[i] = max(table[i - 1], numbers[i] + table[i - 2])

    return table[-1]
```

```python
print(max_non_adjacent_sum([3, 2, 7, 10]))  # 13 (pick 3 and 10)
print(max_non_adjacent_sum([5, 1, 1, 5]))   # 10 (pick 5 and 5)
```

**Answer 8:**

```python
def climb_stairs_three(n: int) -> int:
    if n <= 2:
        return n
    if n == 3:
        return 4  # 1+1+1, 1+2, 2+1, 3

    table: list[int] = [0] * (n + 1)
    table[1] = 1
    table[2] = 2
    table[3] = 4

    for i in range(4, n + 1):
        table[i] = table[i - 1] + table[i - 2] + table[i - 3]

    return table[n]
```

```python
print(climb_stairs_three(5))  # 13
```

For 5 steps: table[4] = 4+2+1 = 7, table[5] = 7+4+2 = **13** ways.

---

**Previous:** [[wiki:python-jr-algo-recursion]] | **Next:** [[wiki:python-jr-algo-greedy]]
