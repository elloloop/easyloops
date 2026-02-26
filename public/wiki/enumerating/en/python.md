# Enumerating Intervals in Python

## Python's Enumeration Patterns

Python primarily uses `[0, n)` pattern but supports all enumeration styles through different techniques.

## Pattern: [0, n) - Standard Python

Most common pattern in Python.

```python
n = 5

# Using range()
for i in range(n):
    print(i, end=' ')
# Output: 0 1 2 3 4

# Explicit notation
for i in range(0, n):  # Same as range(n)
    print(i, end=' ')
```

### With Arrays

```python
arr = ['a', 'b', 'c', 'd', 'e']

# Enumerate indices [0, n)
for i in range(len(arr)):
    print(f"{i}: {arr[i]}")

# Output:
# 0: a
# 1: b
# 2: c
# 3: d
# 4: e
```

### Using enumerate()

```python
fruits = ['apple', 'banana', 'cherry']

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: cherry
```

## Pattern: [1, n] - One-Based Enumeration

Start counting from 1 instead of 0.

```python
n = 5

# Method 1: range(1, n+1)
for i in range(1, n + 1):
    print(i, end=' ')
# Output: 1 2 3 4 5

# Method 2: enumerate with start parameter
items = ['first', 'second', 'third']
for index, item in enumerate(items, start=1):
    print(f"{index}: {item}")

# Output:
# 1: first
# 2: second
# 3: third
```

### Practical Example: Rankings

```python
scores = [95, 87, 92, 88, 90]
sorted_scores = sorted(scores, reverse=True)

for rank, score in enumerate(sorted_scores, start=1):
    print(f"Rank {rank}: {score} points")

# Output:
# Rank 1: 95 points
# Rank 2: 92 points
# Rank 3: 90 points
# Rank 4: 88 points
# Rank 5: 87 points
```

## Pattern: (n, 0] - Countdown to Zero

Count down from n-1 to 0 (inclusive).

```python
n = 5

# Method 1: range in reverse
for i in range(n - 1, -1, -1):
    print(i, end=' ')
# Output: 4 3 2 1 0

# Method 2: reversed() with range
for i in reversed(range(n)):
    print(i, end=' ')
# Output: 4 3 2 1 0
```

### Countdown Timer

```python
import time

def countdown(seconds):
    """Countdown from seconds-1 to 0"""
    for i in range(seconds - 1, -1, -1):
        print(f"{i} seconds remaining...")
        time.sleep(1)
    print("Time's up!")

countdown(5)
# 4 seconds remaining...
# 3 seconds remaining...
# 2 seconds remaining...
# 1 seconds remaining...
# 0 seconds remaining...
# Time's up!
```

### Reverse Array Processing

```python
arr = [10, 20, 30, 40, 50]

# Process in reverse order
for i in range(len(arr) - 1, -1, -1):
    print(f"Index {i}: {arr[i]}")

# Output:
# Index 4: 50
# Index 3: 40
# Index 2: 30
# Index 1: 20
# Index 0: 10
```

## Pattern: [n, 1] - Countdown Excluding Zero

Count down from n to 1 (excluding 0).

```python
n = 5

# range(n, 0, -1)
for i in range(n, 0, -1):
    print(i, end=' ')
# Output: 5 4 3 2 1
```

### Rocket Launch Countdown

```python
def launch_countdown(seconds):
    """Countdown from n to 1, then launch"""
    for i in range(seconds, 0, -1):
        print(f"{i}...")
    print("Liftoff! 🚀")

launch_countdown(5)
# 5...
# 4...
# 3...
# 2...
# 1...
# Liftoff! 🚀
```

### Priority Processing

```python
tasks = {
    5: "Critical - System crash",
    4: "High - Database backup",
    3: "Medium - Update docs",
    2: "Low - Refactor code",
    1: "Trivial - Fix typo"
}

# Process by priority (high to low)
for priority in range(5, 0, -1):
    if priority in tasks:
        print(f"Priority {priority}: {tasks[priority]}")
```

## Comparison Table

```python
n = 5

# [0, n)
print("[0, n):", list(range(n)))
# [0, n): [0, 1, 2, 3, 4]

# [1, n]
print("[1, n]:", list(range(1, n + 1)))
# [1, n]: [1, 2, 3, 4, 5]

# (n, 0]
print("(n, 0]:", list(range(n - 1, -1, -1)))
# (n, 0]: [4, 3, 2, 1, 0]

# [n, 1]
print("[n, 1]:", list(range(n, 0, -1)))
# [n, 1]: [5, 4, 3, 2, 1]
```

## Pattern Conversion

```python
def convert_pattern(n, pattern):
    """Generate sequence based on pattern"""
    patterns = {
        '[0,n)': range(n),
        '[1,n]': range(1, n + 1),
        '(n,0]': range(n - 1, -1, -1),
        '[n,1]': range(n, 0, -1)
    }
    return list(patterns.get(pattern, []))

print(convert_pattern(5, '[0,n)'))  # [0, 1, 2, 3, 4]
print(convert_pattern(5, '[1,n]'))  # [1, 2, 3, 4, 5]
print(convert_pattern(5, '(n,0]'))  # [4, 3, 2, 1, 0]
print(convert_pattern(5, '[n,1]'))  # [5, 4, 3, 2, 1]
```

## Advanced: Custom Enumerator

```python
class IntervalEnumerator:
    def __init__(self, n, pattern='[0,n)'):
        self.n = n
        self.pattern = pattern

    def __iter__(self):
        if self.pattern == '[0,n)':
            return iter(range(self.n))
        elif self.pattern == '[1,n]':
            return iter(range(1, self.n + 1))
        elif self.pattern == '(n,0]':
            return iter(range(self.n - 1, -1, -1))
        elif self.pattern == '[n,1]':
            return iter(range(self.n, 0, -1))
        else:
            raise ValueError(f"Unknown pattern: {self.pattern}")

# Usage
for i in IntervalEnumerator(5, '[0,n)'):
    print(i, end=' ')  # 0 1 2 3 4
```

## Common Use Cases

### Grid Iteration

```python
# [0, rows) × [0, cols)
rows, cols = 3, 4
for i in range(rows):
    for j in range(cols):
        print(f"({i},{j})", end=' ')
    print()
```

### Pagination

```python
def paginate(items, page_size):
    """Enumerate pages [1, n]"""
    n_pages = (len(items) + page_size - 1) // page_size
    for page in range(1, n_pages + 1):
        start = (page - 1) * page_size
        end = start + page_size
        yield page, items[start:end]

items = list(range(10))
for page_num, page_items in paginate(items, 3):
    print(f"Page {page_num}: {page_items}")
```

## Related Concepts

- [[wiki:interval-notation]] - Notation basics
- [[wiki:arrays]] - Array indexing
- [[wiki:loops]] - Iteration patterns
