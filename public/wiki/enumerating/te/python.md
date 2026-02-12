# Python lo Enumerating

## Python Enumeration Patterns

Python lo anni patterns support chesthundi. Different techniques tho implement cheyochu.

## Pattern: [0, n) - Standard

Python lo default pattern idi.

```python
n = 5

# range() use chesi
for i in range(n):
    print(i, end=' ')
# Output: 0 1 2 3 4

# Arrays tho
arr = ['a', 'b', 'c', 'd', 'e']
for i in range(len(arr)):
    print(f"{i}: {arr[i]}")
```

### enumerate() Function

```python
fruits = ['apple', 'banana', 'cherry']

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: cherry
```

## Pattern: [1, n] - One-Based

1 nundi count cheyadam.

```python
n = 5

# Method 1: range(1, n+1)
for i in range(1, n + 1):
    print(i, end=' ')
# Output: 1 2 3 4 5

# Method 2: enumerate with start
items = ['first', 'second', 'third']
for index, item in enumerate(items, start=1):
    print(f"{index}: {item}")

# Output:
# 1: first
# 2: second
# 3: third
```

### Rankings Example

```python
scores = [95, 87, 92, 88, 90]
sorted_scores = sorted(scores, reverse=True)

for rank, score in enumerate(sorted_scores, start=1):
    print(f"Rank {rank}: {score}")
```

## Pattern: (n, 0] - Countdown to Zero

n-1 nundi 0 varaku reverse.

```python
n = 5

# Method 1: range in reverse
for i in range(n - 1, -1, -1):
    print(i, end=' ')
# Output: 4 3 2 1 0

# Method 2: reversed()
for i in reversed(range(n)):
    print(i, end=' ')
# Output: 4 3 2 1 0
```

### Countdown Timer

```python
def countdown(seconds):
    for i in range(seconds - 1, -1, -1):
        print(f"{i} seconds...")
    print("Time's up!")

countdown(5)
# 4 seconds...
# 3 seconds...
# 2 seconds...
# 1 seconds...
# 0 seconds...
# Time's up!
```

## Pattern: [n, 1] - Excluding Zero

n nundi 1 varaku (0 ledu).

```python
n = 5

# range(n, 0, -1)
for i in range(n, 0, -1):
    print(i, end=' ')
# Output: 5 4 3 2 1
```

### Launch Countdown

```python
def launch_countdown(seconds):
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

## All Patterns Comparison

```python
n = 5

# [0, n)
print(list(range(n)))
# [0, 1, 2, 3, 4]

# [1, n]
print(list(range(1, n + 1)))
# [1, 2, 3, 4, 5]

# (n, 0]
print(list(range(n - 1, -1, -1)))
# [4, 3, 2, 1, 0]

# [n, 1]
print(list(range(n, 0, -1)))
# [5, 4, 3, 2, 1]
```

## Helper Function

```python
def get_range(n, pattern):
    """Pattern based range return chesthundi"""
    if pattern == '[0,n)':
        return range(n)
    elif pattern == '[1,n]':
        return range(1, n + 1)
    elif pattern == '(n,0]':
        return range(n - 1, -1, -1)
    elif pattern == '[n,1]':
        return range(n, 0, -1)

print(list(get_range(5, '[0,n)')))  # [0, 1, 2, 3, 4]
print(list(get_range(5, '[n,1]')))  # [5, 4, 3, 2, 1]
```

## Common Use Cases

### Grid Iteration

```python
rows, cols = 3, 4
for i in range(rows):
    for j in range(cols):
        print(f"({i},{j})", end=' ')
    print()
```

### Page Numbers

```python
# Pages 1 to n (human readable)
total_pages = 5
for page in range(1, total_pages + 1):
    print(f"Page {page}")
```

### Reverse Processing

```python
arr = [10, 20, 30, 40, 50]

# Last to first
for i in range(len(arr) - 1, -1, -1):
    print(arr[i])
```

## Tips

- `range(n)` → [0, n) default
- `range(1, n+1)` → [1, n] kosam
- `range(n-1, -1, -1)` → (n, 0] reverse
- `range(n, 0, -1)` → [n, 1] countdown
- `enumerate()` tho index + value rendu easy ga dosthayi

---

_Note: Ee page inka development stage lo undi._
