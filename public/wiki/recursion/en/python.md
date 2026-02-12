# Recursion in Python

## Basic Recursion in Python

Python fully supports recursion. A function can call itself to solve problems by breaking them into smaller subproblems.

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
# 5 * 4 * 3 * 2 * 1 = 120
```

### Countdown

```python
def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n - 1)

countdown(5)
# Output: 5, 4, 3, 2, 1, Blastoff!
```

### Sum of List

```python
def sum_list(numbers):
    # Base case: empty list
    if not numbers:
        return 0
    # Recursive case
    return numbers[0] + sum_list(numbers[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15
```

## Classic Recursive Problems

### Fibonacci Sequence

```python
def fibonacci(n):
    # Base cases
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(6))  # 8
# Sequence: 0, 1, 1, 2, 3, 5, 8
```

### Power Function

```python
def power(base, exp):
    # Base case
    if exp == 0:
        return 1
    # Recursive case
    return base * power(base, exp - 1)

print(power(2, 5))  # 32
```

### Palindrome Check

```python
def is_palindrome(s):
    # Base cases
    if len(s) <= 1:
        return True
    # Recursive case
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False
```

## Advanced Examples

### Binary Search

```python
def binary_search(arr, target, left, right):
    # Base case: not found
    if left > right:
        return -1

    mid = (left + right) // 2

    # Base case: found
    if arr[mid] == target:
        return mid
    # Recursive cases
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)

arr = [1, 3, 5, 7, 9, 11]
print(binary_search(arr, 7, 0, len(arr) - 1))  # 3
```

### Tree Traversal

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def inorder_traversal(node):
    if node is None:
        return

    inorder_traversal(node.left)
    print(node.value, end=' ')
    inorder_traversal(node.right)

# Create tree
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

inorder_traversal(root)  # 4 2 5 1 3
```

### Directory Traversal

```python
import os

def list_files(directory, indent=0):
    try:
        items = os.listdir(directory)
        for item in items:
            print('  ' * indent + item)
            path = os.path.join(directory, item)
            if os.path.isdir(path):
                list_files(path, indent + 1)
    except PermissionError:
        pass

list_files('.')
```

## Optimization: Memoization

Cache results to avoid redundant calculations:

```python
# Inefficient - recalculates same values
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n-1) + fib_slow(n-2)

# Efficient - with memoization
def fib_fast(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_fast(n-1, memo) + fib_fast(n-2, memo)
    return memo[n]

# Using @lru_cache decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cached(n):
    if n <= 1:
        return n
    return fib_cached(n-1) + fib_cached(n-2)

print(fib_cached(50))  # Fast even for large n
```

## Recursion Limit

Python has a default recursion limit:

```python
import sys

# Check limit
print(sys.getrecursionlimit())  # Default: 1000

# Increase limit (use carefully!)
sys.setrecursionlimit(2000)

# Better: convert to iteration for deep recursion
```

## Tail Recursion

While Python doesn't optimize tail recursion, it's still a good practice:

```python
# Regular recursion
def factorial_regular(n):
    if n <= 1:
        return 1
    return n * factorial_regular(n - 1)

# Tail recursive (with accumulator)
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)

print(factorial_tail(5))  # 120
```

## Common Patterns

### Divide and Conquer

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### Backtracking

```python
def permutations(arr):
    if len(arr) <= 1:
        return [arr]

    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for p in permutations(rest):
            result.append([arr[i]] + p)

    return result

print(permutations([1, 2, 3]))
# [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

## Related Concepts

- [[wiki:functions]] - Function basics
- [[wiki:algorithms]] - Recursive algorithms
- [[wiki:data-structures]] - Trees and graphs
