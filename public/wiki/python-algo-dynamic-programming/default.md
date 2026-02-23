# Dynamic Programming -- Remembering to Save Work

Dynamic programming (DP) is one of the hardest topics for beginners. But the core idea is simple: **if you have solved a subproblem before, do not solve it again. Look up the saved answer.**

You already saw the problem in the recursion section. Naive Fibonacci computes `fib(3)` multiple times. That is wasted work. DP eliminates that waste.

This section teaches you to recognize DP problems, set up the solution step by step, and implement both top-down (memoization) and bottom-up (tabulation) approaches.

Open your editor. Every DP problem here should be implemented and tested by you.

---

## The Two Requirements for DP

A problem can be solved with DP if it has both of these properties:

### 1. Overlapping Subproblems

The same smaller problem is solved multiple times during recursion. In Fibonacci, `fib(3)` appears multiple times in the call tree for `fib(5)`.

If each subproblem were unique (like in merge sort, where each sub-array is different), DP would not help.

### 2. Optimal Substructure

The optimal solution to the big problem can be built from optimal solutions to its subproblems.

For Fibonacci: `fib(n) = fib(n-1) + fib(n-2)`. The answer for n depends on the answers for n-1 and n-2.

For shortest path: the shortest path from A to C through B uses the shortest path from A to B and the shortest path from B to C.

---

## Top-Down: Memoization (Recursion + Cache)

Start with the recursive solution. Add a cache. Before computing a result, check if it is already in the cache.

### Fibonacci with Memoization

```python
def fib(n: int, memo: dict[int, int] | None = None) -> int:
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
```

**Time complexity:** O(n) -- each value computed once.
**Space complexity:** O(n) -- for the cache and call stack.

### Trace

```
fib(5, {})
  fib(4, {})
    fib(3, {})
      fib(2, {})
        fib(1) -> 1
        fib(0) -> 0
      memo[2] = 1, return 1
      fib(1) -> 1 (no recursion needed, base case)
    memo[3] = 2, return 2
    fib(2, {2:1, 3:2}) -> found in memo! return 1
  memo[4] = 3, return 3
  fib(3, {2:1, 3:2, 4:3}) -> found in memo! return 2
memo[5] = 5, return 5
```

No repeated work. Each value computed exactly once.

### Using functools.lru_cache

Python has a built-in decorator for memoization:

```python
from functools import lru_cache


@lru_cache(maxsize=None)
def fib_cached(n: int) -> int:
    if n <= 1:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)
```

This is the cleanest way to add memoization in Python. `lru_cache` handles the dictionary for you.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning dynamic programming. (1) What are the two properties a problem must have for DP to apply? (2) Trace through fib(6) with memoization, showing the memo dictionary at each step. How many function calls happen compared to naive recursion? (3) What does @lru_cache do under the hood? (4) Why is memoized Fibonacci O(n) while naive recursive Fibonacci is O(2^n)?"</div>
</div>

---

## Bottom-Up: Tabulation (Build from the Smallest)

Instead of starting with the big problem and recursing down, start with the smallest subproblems and build up.

### Fibonacci with Tabulation

```python
def fib(n: int) -> int:
    if n <= 1:
        return n
    dp: list[int] = [0] * (n + 1)
    dp[1] = 1
    i: int = 2
    while i <= n:
        dp[i] = dp[i - 1] + dp[i - 2]
        i += 1
    return dp[n]
```

**Time complexity:** O(n).
**Space complexity:** O(n) for the dp array.

### Trace

```
fib(6):
dp = [0, 1, 0, 0, 0, 0, 0]

i=2: dp[2] = dp[1] + dp[0] = 1 + 0 = 1   -> [0, 1, 1, 0, 0, 0, 0]
i=3: dp[3] = dp[2] + dp[1] = 1 + 1 = 2   -> [0, 1, 1, 2, 0, 0, 0]
i=4: dp[4] = dp[3] + dp[2] = 2 + 1 = 3   -> [0, 1, 1, 2, 3, 0, 0]
i=5: dp[5] = dp[4] + dp[3] = 3 + 2 = 5   -> [0, 1, 1, 2, 3, 5, 0]
i=6: dp[6] = dp[5] + dp[4] = 5 + 3 = 8   -> [0, 1, 1, 2, 3, 5, 8]

return dp[6] = 8
```

No recursion. No call stack. Just a simple loop filling in a table.

---

## Space Optimization

For Fibonacci, you only need the last two values, not the entire table:

```python
def fib_optimized(n: int) -> int:
    if n <= 1:
        return n
    prev: int = 0
    curr: int = 1
    i: int = 2
    while i <= n:
        temp: int = curr
        curr = prev + curr
        prev = temp
        i += 1
    return curr
```

**Space:** O(1). You traded an O(n) array for two variables.

This optimization applies whenever the recurrence only looks back a fixed number of steps.

---

## The DP Approach: 5 Steps

When you face a DP problem, follow these steps:

### Step 1: Define the State

What does `dp[i]` (or `dp[i][j]`) represent? This is the most important step. Get this wrong and everything else falls apart.

### Step 2: Define the Recurrence Relation

How does `dp[i]` relate to previous states? This is the formula that builds the solution.

### Step 3: Define the Base Cases

What are the smallest subproblems you can solve directly?

### Step 4: Decide Top-Down or Bottom-Up

Top-down (memoization) is often easier to write -- just add a cache to the recursive solution. Bottom-up (tabulation) avoids recursion overhead and is usually faster.

### Step 5: Optimize Space If Possible

If the recurrence only looks back a fixed number of steps, you can reduce space from O(n) to O(1) or from O(n*m) to O(n).

---

## Classic DP: Climbing Stairs

You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?

### Step 1: State

`dp[i]` = number of ways to reach step `i`.

### Step 2: Recurrence

To reach step `i`, you either came from step `i-1` (one step) or step `i-2` (two steps):
`dp[i] = dp[i-1] + dp[i-2]`

### Step 3: Base Cases

`dp[0] = 1` (one way to stay at the ground), `dp[1] = 1` (one way to reach step 1).

### Implementation

```python
def climb_stairs(n: int) -> int:
    if n <= 1:
        return 1
    dp: list[int] = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    i: int = 2
    while i <= n:
        dp[i] = dp[i - 1] + dp[i - 2]
        i += 1
    return dp[n]
```

**Time:** O(n). **Space:** O(n), optimizable to O(1).

This is Fibonacci in disguise.

---

## Classic DP: Coin Change

Given coins of different denominations and a total amount, find the minimum number of coins needed to make that amount. If it is impossible, return -1.

Example: coins = `[1, 5, 10, 25]`, amount = `30` -> answer is 2 (one 5 + one 25).

### Step 1: State

`dp[i]` = minimum number of coins to make amount `i`.

### Step 2: Recurrence

For each coin `c`, if `i >= c`, then `dp[i] = min(dp[i], dp[i - c] + 1)`.

Use coin `c` to reduce the problem to amount `i - c`, then add 1 for that coin.

### Step 3: Base Cases

`dp[0] = 0` (zero coins to make amount 0).

### Implementation

```python
def coin_change(coins: list[int], amount: int) -> int:
    dp: list[int] = [amount + 1] * (amount + 1)  # "infinity"
    dp[0] = 0

    i: int = 1
    while i <= amount:
        j: int = 0
        while j < len(coins):
            if coins[j] <= i:
                dp[i] = min(dp[i], dp[i - coins[j]] + 1)
            j += 1
        i += 1

    if dp[amount] > amount:
        return -1
    return dp[amount]
```

**Time:** O(amount * len(coins)). **Space:** O(amount).

### Trace

```
coins = [1, 3, 4], amount = 6

dp = [0, inf, inf, inf, inf, inf, inf]

i=1: coin 1: dp[1] = min(inf, dp[0]+1) = 1
     coin 3: 3 > 1, skip
     coin 4: 4 > 1, skip
     dp = [0, 1, inf, inf, inf, inf, inf]

i=2: coin 1: dp[2] = min(inf, dp[1]+1) = 2
     dp = [0, 1, 2, inf, inf, inf, inf]

i=3: coin 1: dp[3] = min(inf, dp[2]+1) = 3
     coin 3: dp[3] = min(3, dp[0]+1) = 1
     dp = [0, 1, 2, 1, inf, inf, inf]

i=4: coin 1: dp[4] = min(inf, dp[3]+1) = 2
     coin 3: dp[4] = min(2, dp[1]+1) = 2
     coin 4: dp[4] = min(2, dp[0]+1) = 1
     dp = [0, 1, 2, 1, 1, inf, inf]

i=5: coin 1: dp[5] = min(inf, dp[4]+1) = 2
     coin 3: dp[5] = min(2, dp[2]+1) = 2 (no change, 3 is not better)
     coin 4: dp[5] = min(2, dp[1]+1) = 2
     dp = [0, 1, 2, 1, 1, 2, inf]

i=6: coin 1: dp[6] = min(inf, dp[5]+1) = 3
     coin 3: dp[6] = min(3, dp[3]+1) = 2
     coin 4: dp[6] = min(2, dp[2]+1) = 2 (no change, 3 is not better)
     dp = [0, 1, 2, 1, 1, 2, 2]

Answer: dp[6] = 2 (use two coins: 3 + 3)
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning dynamic programming. (1) For the coin change problem with coins [1, 5, 10] and amount 12, trace through the DP table step by step. What is the answer? Which coins are used? (2) Write the climbing stairs solution with space optimization (O(1) space). (3) What is the difference between top-down and bottom-up DP? Give an advantage of each approach."</div>
</div>

---

## Classic DP: Longest Common Subsequence (2D DP)

Given two strings, find the length of their longest common subsequence (LCS). A subsequence is a sequence that appears in the same order but not necessarily contiguously.

Example: `"abcde"` and `"ace"` -> LCS is `"ace"`, length 3.

This is a **2D DP** problem because the state depends on positions in TWO strings.

### Step 1: State

`dp[i][j]` = length of LCS of the first `i` characters of text1 and first `j` characters of text2.

### Step 2: Recurrence

If `text1[i-1] == text2[j-1]`: characters match, `dp[i][j] = dp[i-1][j-1] + 1`.
Otherwise: skip one character from either string, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

### Step 3: Base Cases

`dp[0][j] = 0` for all j (empty first string).
`dp[i][0] = 0` for all i (empty second string).

### Implementation

```python
def longest_common_subsequence(text1: str, text2: str) -> int:
    m: int = len(text1)
    n: int = len(text2)

    # create (m+1) x (n+1) table filled with 0
    dp: list[list[int]] = []
    i: int = 0
    while i <= m:
        row: list[int] = [0] * (n + 1)
        dp.append(row)
        i += 1

    i = 1
    while i <= m:
        j: int = 1
        while j <= n:
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            j += 1
        i += 1

    return dp[m][n]
```

**Time:** O(m * n). **Space:** O(m * n).

### Trace

```
text1 = "ace", text2 = "abcde"

      ""  a  b  c  d  e
  ""   0  0  0  0  0  0
  a    0  1  1  1  1  1
  c    0  1  1  2  2  2
  e    0  1  1  2  2  3

dp[3][5] = 3 -> LCS length is 3
```

---

## Classic DP: 0/1 Knapsack

You have items with weights and values. Your knapsack has a weight capacity. Maximize the total value without exceeding the capacity. Each item can be used at most once (0/1 = take it or leave it).

### Step 1: State

`dp[i][w]` = maximum value using the first `i` items with capacity `w`.

### Step 2: Recurrence

For each item, either skip it or take it (if it fits):
`dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])`

### Implementation

```python
def knapsack(weights: list[int], values: list[int], capacity: int) -> int:
    n: int = len(weights)

    dp: list[list[int]] = []
    i: int = 0
    while i <= n:
        row: list[int] = [0] * (capacity + 1)
        dp.append(row)
        i += 1

    i = 1
    while i <= n:
        w: int = 0
        while w <= capacity:
            # skip item i
            dp[i][w] = dp[i - 1][w]
            # take item i (if it fits)
            if weights[i - 1] <= w:
                take: int = dp[i - 1][w - weights[i - 1]] + values[i - 1]
                dp[i][w] = max(dp[i][w], take)
            w += 1
        i += 1

    return dp[n][capacity]
```

**Time:** O(n * capacity). **Space:** O(n * capacity).

---

## Classic DP: House Robber

You are a robber. Houses are in a row. Each house has money. You cannot rob two adjacent houses (alarm goes off). Maximize the money you can steal.

### Step 1: State

`dp[i]` = maximum money robbing from the first `i` houses.

### Step 2: Recurrence

For house `i`, either skip it or rob it:
`dp[i] = max(dp[i-1], dp[i-2] + money[i])`

Skip: take the best from the first `i-1` houses.
Rob: take money from house `i` plus the best from the first `i-2` houses (skip the adjacent one).

### Implementation

```python
def rob(houses: list[int]) -> int:
    n: int = len(houses)
    if n == 0:
        return 0
    if n == 1:
        return houses[0]

    dp: list[int] = [0] * n
    dp[0] = houses[0]
    dp[1] = max(houses[0], houses[1])

    i: int = 2
    while i < n:
        dp[i] = max(dp[i - 1], dp[i - 2] + houses[i])
        i += 1

    return dp[n - 1]
```

**Time:** O(n). **Space:** O(n), optimizable to O(1).

### Space-Optimized Version

```python
def rob_optimized(houses: list[int]) -> int:
    n: int = len(houses)
    if n == 0:
        return 0
    if n == 1:
        return houses[0]

    prev2: int = houses[0]
    prev1: int = max(houses[0], houses[1])

    i: int = 2
    while i < n:
        current: int = max(prev1, prev2 + houses[i])
        prev2 = prev1
        prev1 = current
        i += 1

    return prev1
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning dynamic programming. (1) For the house robber problem with houses [2, 7, 9, 3, 1], trace through the DP table and show which houses get robbed. (2) For the knapsack problem with weights [2, 3, 4, 5], values [3, 4, 5, 6], capacity 5, fill in the DP table and find the answer. (3) When can you optimize a DP solution from O(n) space to O(1) space? Give the general rule."</div>
</div>

---

## Classic DP: Longest Increasing Subsequence

Given an array, find the length of the longest strictly increasing subsequence.

Example: `[10, 9, 2, 5, 3, 7, 101, 18]` -> LIS is `[2, 3, 7, 101]`, length 4.

### Step 1: State

`dp[i]` = length of the longest increasing subsequence ending at index `i`.

### Step 2: Recurrence

For each `j < i`, if `arr[j] < arr[i]`, then `dp[i] = max(dp[i], dp[j] + 1)`.

### Implementation

```python
def length_of_lis(nums: list[int]) -> int:
    n: int = len(nums)
    if n == 0:
        return 0

    dp: list[int] = [1] * n  # every element is a subsequence of length 1

    i: int = 1
    while i < n:
        j: int = 0
        while j < i:
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
            j += 1
        i += 1

    return max(dp)
```

**Time:** O(n^2). **Space:** O(n).

### Trace

```
nums = [10, 9, 2, 5, 3, 7, 101, 18]
dp starts as [1, 1, 1, 1, 1, 1, 1, 1]

i=1 (9): no j where nums[j] < 9 exists before...
  j=0: nums[0]=10 >= 9, skip
  dp = [1, 1, 1, 1, 1, 1, 1, 1]

i=2 (2): no j where nums[j] < 2
  dp = [1, 1, 1, 1, 1, 1, 1, 1]

i=3 (5): j=2, nums[2]=2 < 5, dp[3] = max(1, dp[2]+1) = 2
  dp = [1, 1, 1, 2, 1, 1, 1, 1]

i=4 (3): j=2, nums[2]=2 < 3, dp[4] = max(1, dp[2]+1) = 2
  dp = [1, 1, 1, 2, 2, 1, 1, 1]

i=5 (7): j=2, nums[2]=2 < 7, dp[5] = 2
         j=3, nums[3]=5 < 7, dp[5] = max(2, dp[3]+1) = 3
         j=4, nums[4]=3 < 7, dp[5] = max(3, dp[4]+1) = 3
  dp = [1, 1, 1, 2, 2, 3, 1, 1]

i=6 (101): picks up the best from all previous -> dp[6] = 4
  dp = [1, 1, 1, 2, 2, 3, 4, 1]

i=7 (18): j=5, nums[5]=7 < 18, dp[7] = max(1, dp[5]+1) = 4
  dp = [1, 1, 1, 2, 2, 3, 4, 4]

max(dp) = 4
```

---

## 1D DP vs 2D DP

**1D DP** (`dp[i]`): the state depends on one dimension.
- Climbing stairs, house robber, coin change, LIS
- The DP table is a single array

**2D DP** (`dp[i][j]`): the state depends on two dimensions.
- Longest common subsequence, knapsack, edit distance
- The DP table is a 2D grid

The dimension count matches how many "variables" change in the subproblem. For LCS, the subproblem depends on a position in string 1 AND a position in string 2 -- two variables, two dimensions.

---

## Where People Go Wrong

### 1. Not Identifying Overlapping Subproblems

If each subproblem is unique, DP does not help. Merge sort has subproblems but they do not overlap. DP would waste memory without saving time.

### 2. Wrong State Definition

If `dp[i]` represents the wrong thing, the recurrence will be wrong. Spend time getting the state definition right before writing code. Ask: "what does `dp[i]` mean in plain English?"

### 3. Wrong Recurrence

The recurrence must account for ALL ways to reach state `i`. Missing a case means wrong answers. Double-check by tracing through a small example.

### 4. Forgetting Base Cases

DP tables need initialization. `dp[0]` (and sometimes `dp[1]`) must be set correctly before the loop starts.

### 5. Top-Down vs Bottom-Up Confusion

Top-down: start big, recurse to small, cache results. Think "recursion plus memo."
Bottom-up: start small, loop to big, build the table. Think "for loop filling an array."

Both give the same answer. Top-down is easier to write from a recursive solution. Bottom-up avoids recursion overhead.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I've studied dynamic programming. Give me a challenging quiz: (1) Write a DP solution for the Edit Distance problem: given two strings, find the minimum number of operations (insert, delete, replace) to convert one to the other. Define the state, recurrence, and base cases. Implement it with type hints. (2) For the array [3, 1, 4, 1, 5, 9, 2, 6], what is the length of the longest increasing subsequence? Trace through the DP. (3) Convert this top-down solution to bottom-up: a function that counts the number of ways to make change for amount n using coins [1, 5, 10, 25]. (4) When does 1D DP become 2D DP? Give two examples of each."</div>
</div>

---

## Practice Exercises

1. Implement Fibonacci three ways: naive recursion, memoization, and tabulation. Time each one for n=35. See the difference.

2. Solve the coin change problem for coins `[1, 5, 10, 25]`, amount = `63`. How many coins are needed?

3. Solve the house robber problem for houses `[2, 7, 9, 3, 1]`. Which houses should be robbed?

4. Implement the longest common subsequence for `"AGGTAB"` and `"GXTXAYB"`. The answer should be 4 (`"GTAB"`).

5. Implement the 0/1 knapsack for weights `[1, 3, 4, 5]`, values `[1, 4, 5, 7]`, capacity `7`. The answer should be 9 (items with weights 3 and 4).

---

**Previous:** [[wiki:python-algo-recursion]] | **Next:** [[wiki:python-algo-greedy]]
