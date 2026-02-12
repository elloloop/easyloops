# Python lo Recursion

## Basic Recursion

Python lo recursion full ga supported. Function thane thanani call chesi problems solve cheyochu.

## Simple Examples

### Factorial

```python
def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

### Countdown

```python
def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n - 1)

countdown(5)  # 5, 4, 3, 2, 1, Blastoff!
```

### List Sum

```python
def sum_list(numbers):
    if not numbers:  # Empty list - base case
        return 0
    return numbers[0] + sum_list(numbers[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15
```

## Classic Problems

### Fibonacci

```python
def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(6))  # 8
# Sequence: 0, 1, 1, 2, 3, 5, 8
```

### Power Function

```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 5))  # 32
```

### Palindrome Check

```python
def is_palindrome(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])

print(is_palindrome("racecar"))  # True
```

## Advanced Examples

### Binary Search

```python
def binary_search(arr, target, left, right):
    if left > right:
        return -1  # Not found

    mid = (left + right) // 2

    if arr[mid] == target:
        return mid  # Found
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)
```

### Tree Traversal

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def inorder(node):
    if node is None:
        return
    inorder(node.left)
    print(node.value)
    inorder(node.right)
```

## Memoization - Optimization

Same calculations repeat avvakunda cache use cheyochu:

```python
# Slow - redundant calculations
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n-1) + fib_slow(n-2)

# Fast - memoization tho
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_fast(n):
    if n <= 1:
        return n
    return fib_fast(n-1) + fib_fast(n-2)

print(fib_fast(50))  # Chala fast
```

## Recursion Limit

Python lo default recursion limit undi:

```python
import sys

print(sys.getrecursionlimit())  # 1000

# Increase cheyochu (careful!)
sys.setrecursionlimit(2000)
```

## Tail Recursion

Accumulator use chesi tail recursive ga rayochu:

```python
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, n * acc)

print(factorial_tail(5))  # 120
```

## Common Patterns

### Divide and Conquer

Merge sort lanti algorithms.

### Backtracking

Permutations, combinations find cheyadam.

### Tree/Graph Problems

Recursive traversal natural ga fit avtundi.

## Tips

- Always base case add cheyandi
- Stack overflow avoid cheyadaniki memoization use cheyandi
- Deep recursion ki iteration consider cheyandi
- Debug cheyyadaniki print statements add cheyochu

---

_Note: Ee page inka development stage lo undi._
