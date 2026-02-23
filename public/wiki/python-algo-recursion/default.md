# Recursion and Backtracking -- Solving Problems by Breaking Them Down

Recursion is a function that calls itself. That sounds strange until you realize that many problems have a natural recursive structure: a problem can be broken into smaller versions of the same problem.

Trees are recursive -- every subtree is also a tree. File systems are recursive -- every folder can contain other folders. Mathematical formulas are recursive -- factorial of n uses factorial of n-1.

In this section you will learn how recursion works, when to use it, and how to solve problems using backtracking -- a technique built on recursion that systematically explores all possible solutions.

Open your editor. Every example here should be typed and tested.

---

## What Is Recursion?

A recursive function is a function that calls itself. Every recursive function has two parts:

1. **Base case** -- the condition where the function stops calling itself and returns a value directly
2. **Recursive case** -- the function calls itself with a smaller or simpler input

If you forget the base case, the function calls itself forever until Python crashes with a `RecursionError` (stack overflow).

### Example: Factorial

The factorial of n is: `n! = n * (n-1) * (n-2) * ... * 1`

Recursive definition:
- `0! = 1` (base case)
- `n! = n * (n-1)!` (recursive case)

```python
def factorial(n: int) -> int:
    if n == 0:
        return 1                    # base case
    return n * factorial(n - 1)     # recursive case
```

**Time complexity:** O(n) -- one call per number from n down to 0.
**Space complexity:** O(n) -- n frames on the call stack.

### Tracing the Calls

```
factorial(4)
  -> 4 * factorial(3)
       -> 3 * factorial(2)
            -> 2 * factorial(1)
                 -> 1 * factorial(0)
                      -> returns 1       (base case)
                 -> returns 1 * 1 = 1
            -> returns 2 * 1 = 2
       -> returns 3 * 2 = 6
  -> returns 4 * 6 = 24
```

Each call waits for the next one to finish before it can compute its result. The calls stack up, then unwind.

---

## Example: Fibonacci

The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

Each number is the sum of the previous two:
- `fib(0) = 0` (base case)
- `fib(1) = 1` (base case)
- `fib(n) = fib(n-1) + fib(n-2)` (recursive case)

```python
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

**Time complexity:** O(2^n) -- extremely slow! Each call branches into two more calls.
**Space complexity:** O(n) -- the maximum depth of the call stack.

### Tracing the Call Tree

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1) -> 1
│   │   │   └── fib(0) -> 0
│   │   └── fib(1) -> 1
│   └── fib(2)
│       ├── fib(1) -> 1
│       └── fib(0) -> 0
└── fib(3)
    ├── fib(2)
    │   ├── fib(1) -> 1
    │   └── fib(0) -> 0
    └── fib(1) -> 1
```

Notice that `fib(3)` is computed twice, `fib(2)` is computed three times. This is wasteful. We will fix this with memoization in the Dynamic Programming section.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning recursion. (1) What are the two required parts of every recursive function? (2) Trace through factorial(5) showing every call and return value. (3) Why is the naive recursive Fibonacci O(2^n)? Draw the call tree for fib(4) and count how many total function calls happen. (4) What happens if you write a recursive function with no base case?"</div>
</div>

---

## Example: Sum of a List

You can sum a list recursively: the sum of a list is the first element plus the sum of the rest of the list.

```python
def recursive_sum(arr: list[int]) -> int:
    if len(arr) == 0:
        return 0                              # base case: empty list
    return arr[0] + recursive_sum(arr[1:])    # first + sum of rest
```

Trace `recursive_sum([3, 1, 4, 1, 5])`:

```
recursive_sum([3, 1, 4, 1, 5])
  -> 3 + recursive_sum([1, 4, 1, 5])
       -> 1 + recursive_sum([4, 1, 5])
            -> 4 + recursive_sum([1, 5])
                 -> 1 + recursive_sum([5])
                      -> 5 + recursive_sum([])
                           -> returns 0
                      -> returns 5
                 -> returns 6
            -> returns 10
       -> returns 11
  -> returns 14
```

---

## How Recursion Works: The Call Stack

When a function calls another function (or itself), the current function's state is saved on the **call stack**. Each saved state is called a **stack frame**.

```
When factorial(4) calls factorial(3):

Call Stack:
  [factorial(4), n=4, waiting for factorial(3)]  <- bottom
  [factorial(3), n=3, waiting for factorial(2)]  <- current
```

Each frame remembers its local variables and where to resume when the called function returns.

### Stack Overflow

Python has a default recursion limit of 1000. If your recursion goes deeper than that, Python raises a `RecursionError`.

```python
def infinite_recursion(n: int) -> int:
    return infinite_recursion(n + 1)  # no base case!

# infinite_recursion(0)  -> RecursionError: maximum recursion depth exceeded
```

Even with a base case, if the input is too large, you can hit the limit:

```python
# factorial(1500) would crash with default recursion limit
```

This is one reason why iterative solutions are sometimes preferred.

---

## Converting Recursion to Iteration

Any recursive function can be rewritten as an iterative one using an explicit stack (or simple variables).

### Factorial: Recursive vs Iterative

```python
# recursive
def factorial_recursive(n: int) -> int:
    if n == 0:
        return 1
    return n * factorial_recursive(n - 1)


# iterative
def factorial_iterative(n: int) -> int:
    result: int = 1
    i: int = 1
    while i <= n:
        result *= i
        i += 1
    return result
```

### Fibonacci: Recursive vs Iterative

```python
# recursive (slow, O(2^n))
def fib_recursive(n: int) -> int:
    if n <= 1:
        return n
    return fib_recursive(n - 1) + fib_recursive(n - 2)


# iterative (fast, O(n))
def fib_iterative(n: int) -> int:
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

### When Recursion is Better

- **Trees and nested structures** -- recursion matches the natural structure
- **Divide-and-conquer** -- merge sort, quick sort
- **Backtracking** -- exploring all possibilities
- **When the code is much clearer** -- sometimes a 3-line recursive solution beats a 15-line iterative one

### When Iteration is Better

- **Simple loops** -- summing a list, counting elements
- **Deep recursion** -- when the depth would exceed Python's limit
- **Performance** -- function call overhead adds up

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning recursion vs iteration. (1) Convert this recursive function to iterative: a function that computes the sum of digits of a number (e.g., sum_digits(1234) = 10). (2) Why does recursive Fibonacci have O(2^n) time but iterative Fibonacci has O(n) time? (3) Give an example of a problem where recursion is clearly better than iteration. (4) What is a stack frame and what information does it store?"</div>
</div>

---

## Backtracking -- Try, Fail, Undo, Try Again

Backtracking is a technique for solving problems where you need to explore multiple possibilities. The idea:

1. Make a choice
2. Explore what happens with that choice (recurse)
3. If it leads to a dead end, **undo** the choice (backtrack)
4. Try the next choice

Think of it like navigating a maze. At each fork, you pick a direction. If you hit a dead end, you go back to the fork and try a different direction.

### The Backtracking Template

```python
def backtrack(state: list[int], choices: list[int], results: list[list[int]]) -> None:
    if is_solution(state):
        results.append(state[:])    # save a COPY of the current state
        return

    i: int = 0
    while i < len(choices):
        choice: int = choices[i]
        if is_valid(choice, state):
            state.append(choice)        # MAKE the choice
            backtrack(state, choices, results)  # EXPLORE
            state.pop()                 # UNDO the choice
        i += 1
```

The three steps -- make, explore, undo -- are the heart of backtracking. The `state.pop()` line is what makes it "backtracking." You undo the choice so you can try a different one.

---

## Classic Backtracking: Generate All Permutations

A permutation is every possible ordering of a set of elements. For `[1, 2, 3]`, the permutations are:
`[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`

```python
def permutations(nums: list[int]) -> list[list[int]]:
    results: list[list[int]] = []

    def backtrack(current: list[int], remaining: list[int]) -> None:
        if len(remaining) == 0:
            results.append(current[:])
            return

        i: int = 0
        while i < len(remaining):
            current.append(remaining[i])
            # remaining without the chosen element
            next_remaining: list[int] = remaining[:i] + remaining[i + 1:]
            backtrack(current, next_remaining)
            current.pop()  # UNDO
            i += 1

    backtrack([], nums)
    return results
```

Trace for `[1, 2, 3]`:

```
backtrack([], [1,2,3])
  choose 1: backtrack([1], [2,3])
    choose 2: backtrack([1,2], [3])
      choose 3: backtrack([1,2,3], []) -> save [1,2,3]
      undo 3
    undo 2
    choose 3: backtrack([1,3], [2])
      choose 2: backtrack([1,3,2], []) -> save [1,3,2]
      undo 2
    undo 3
  undo 1
  choose 2: backtrack([2], [1,3])
    ... (continues for all orderings)
```

**Time complexity:** O(n! * n) -- there are n! permutations and copying each takes O(n).
**Space complexity:** O(n) for the recursion depth.

---

## Classic Backtracking: Generate All Subsets

A subset is any selection of elements (including the empty set and the full set). For `[1, 2, 3]`, the subsets are:
`[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]`

```python
def subsets(nums: list[int]) -> list[list[int]]:
    results: list[list[int]] = []

    def backtrack(start: int, current: list[int]) -> None:
        results.append(current[:])  # every state is a valid subset

        i: int = start
        while i < len(nums):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # UNDO
            i += 1

    backtrack(0, [])
    return results
```

The key difference from permutations: we use a `start` index to avoid generating the same subset in different orders. `[1, 2]` and `[2, 1]` are the same subset, so we only go forward.

**Time complexity:** O(2^n * n) -- there are 2^n subsets.

---

## Classic Backtracking: N-Queens Problem

Place n queens on an n x n chessboard so that no two queens attack each other (same row, column, or diagonal).

```python
def solve_n_queens(n: int) -> list[list[str]]:
    results: list[list[str]] = []
    board: list[int] = []  # board[i] = column position of queen in row i

    def is_valid(row: int, col: int) -> bool:
        r: int = 0
        while r < row:
            # same column or same diagonal
            if board[r] == col or abs(board[r] - col) == abs(r - row):
                return False
            r += 1
        return True

    def backtrack(row: int) -> None:
        if row == n:
            # build the board representation
            solution: list[str] = []
            r: int = 0
            while r < n:
                line: str = "." * board[r] + "Q" + "." * (n - board[r] - 1)
                solution.append(line)
                r += 1
            results.append(solution)
            return

        col: int = 0
        while col < n:
            if is_valid(row, col):
                board.append(col)       # MAKE choice
                backtrack(row + 1)      # EXPLORE
                board.pop()             # UNDO
            col += 1

    backtrack(0)
    return results
```

For n=4, one solution looks like:

```
. Q . .
. . . Q
Q . . .
. . Q .
```

**Time complexity:** O(n!) approximately -- we try n columns in the first row, n-1 in the second (roughly), and so on.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning backtracking. (1) What are the three steps in every backtracking algorithm? (2) Why is state.pop() critical -- what happens if you forget it? (3) For the set [1, 2, 3], trace through the subsets algorithm showing the state at each step and which subsets get added. (4) In the N-Queens problem, why do we only need to check rows above the current row for conflicts?"</div>
</div>

---

## Classic Backtracking: Word Search in a Grid

Given a 2D grid of characters and a word, determine if the word exists in the grid by following adjacent cells (up, down, left, right).

```python
def word_search(board: list[list[str]], word: str) -> bool:

    def backtrack(row: int, col: int, idx: int) -> bool:
        if idx == len(word):
            return True  # found the complete word

        if (row < 0 or row >= len(board) or
            col < 0 or col >= len(board[0]) or
            board[row][col] != word[idx]):
            return False

        # save the character and mark as visited
        temp: str = board[row][col]
        board[row][col] = "#"

        # explore all four directions
        found: bool = (backtrack(row + 1, col, idx + 1) or
                       backtrack(row - 1, col, idx + 1) or
                       backtrack(row, col + 1, idx + 1) or
                       backtrack(row, col - 1, idx + 1))

        board[row][col] = temp  # UNDO (restore the character)
        return found

    row: int = 0
    while row < len(board):
        col: int = 0
        while col < len(board[0]):
            if backtrack(row, col, 0):
                return True
            col += 1
        row += 1

    return False
```

Notice the backtracking: we mark a cell as visited by changing it to `"#"`, then restore it after exploring. This lets us use the same cell in different paths.

---

## Memoization Preview

Look back at the Fibonacci call tree. `fib(3)` was computed twice. `fib(2)` was computed three times. What if we could remember the result after computing it once?

```python
def fib_memo(n: int, memo: dict[int, int] | None = None) -> int:
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]
```

Now `fib_memo(5)` computes each value exactly once: O(n) instead of O(2^n).

This is the bridge to Dynamic Programming, which we cover in the next section. Memoization turns an exponential recursive solution into a polynomial one by caching results.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I've learned recursion and backtracking. Give me a quiz: (1) Write a recursive function to reverse a string without using slicing or built-in reverse. Include type hints. (2) Write a backtracking function that generates all combinations of n pairs of balanced parentheses. For n=3, the output should include '((()))', '(()())', etc. (3) For the word search problem, why do we need to restore the cell after exploring? What bug would occur if we did not? (4) What is the time complexity of generating all permutations of n elements and why?"</div>
</div>

---

## Where People Go Wrong

### 1. No Base Case

Every recursive function needs a base case. Without it, the function calls itself forever:

```python
def bad_countdown(n: int) -> None:
    print(n)
    bad_countdown(n - 1)  # never stops!
```

Fix: add `if n <= 0: return`.

### 2. Wrong Base Case

The base case needs to be reachable and correct:

```python
def bad_factorial(n: int) -> int:
    if n == 1:
        return 1
    return n * bad_factorial(n - 1)

# bad_factorial(0) -> infinite recursion because 0 never equals 1
```

Fix: use `if n == 0` or `if n <= 1`.

### 3. Not Undoing Choices in Backtracking

Forgetting `state.pop()` means each recursive branch corrupts the state for all other branches. The algorithm produces wrong results or crashes.

### 4. Modifying the Input Without Restoring It

In the word search, if you mark a cell as visited but never restore it, subsequent searches on the same grid will skip cells they should not skip.

### 5. Stack Overflow on Deep Recursion

Python's default recursion limit is 1000. For problems that recurse deeply (large inputs), consider:
- Converting to iteration with an explicit stack
- Using `sys.setrecursionlimit()` (use cautiously)
- Rethinking the approach (maybe DP is better)

---

## Practice Exercises

1. Write a recursive function `power(base: int, exp: int) -> int` that computes `base^exp` without using `**`. Trace through `power(2, 5)`.

2. Write a recursive function `is_palindrome(s: str) -> bool` that checks if a string is a palindrome by comparing the first and last characters and recursing on the middle.

3. Implement the subsets function from scratch. Test it with `[1, 2, 3]` and verify you get all 8 subsets.

4. Implement the permutations function from scratch. Test it with `[1, 2, 3]` and verify you get all 6 permutations.

5. Solve the N-Queens problem for n=4. Print all solutions as grids.

---

**Previous:** [[wiki:python-algo-searching]] | **Next:** [[wiki:python-algo-dynamic-programming]]
