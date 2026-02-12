# Arrays in Python

## Python's Approach to Arrays

Python doesn't have traditional arrays like C or Java. Instead, Python provides **lists** which are more flexible and powerful. For true arrays with fixed types, Python offers the `array` module and NumPy arrays.

## Lists (Python's Array Alternative)

Lists are the most common way to work with collections in Python.

### Creating Lists

```python
# Empty list
empty = []

# List with elements
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hello", 3.14, True]  # Can mix types

# List comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
```

### Accessing Elements

```python
fruits = ["apple", "banana", "cherry", "date"]

# Positive indexing (0-based)
print(fruits[0])   # apple
print(fruits[2])   # cherry

# Negative indexing (from end)
print(fruits[-1])  # date
print(fruits[-2])  # cherry

# Slicing
print(fruits[1:3])    # ['banana', 'cherry']
print(fruits[:2])     # ['apple', 'banana']
print(fruits[2:])     # ['cherry', 'date']
print(fruits[::2])    # ['apple', 'cherry'] - every 2nd element
```

### Modifying Lists

```python
numbers = [1, 2, 3, 4, 5]

# Change element
numbers[0] = 10
print(numbers)  # [10, 2, 3, 4, 5]

# Append (add to end)
numbers.append(6)
print(numbers)  # [10, 2, 3, 4, 5, 6]

# Insert at specific position
numbers.insert(1, 15)
print(numbers)  # [10, 15, 2, 3, 4, 5, 6]

# Remove by value
numbers.remove(15)
print(numbers)  # [10, 2, 3, 4, 5, 6]

# Remove by index
del numbers[0]
print(numbers)  # [2, 3, 4, 5, 6]

# Pop (remove and return)
last = numbers.pop()
print(last)      # 6
print(numbers)   # [2, 3, 4, 5]
```

### Iterating Through Lists

```python
fruits = ["apple", "banana", "cherry"]

# Simple iteration
for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# List comprehension
uppercase = [fruit.upper() for fruit in fruits]
```

## Built-in Array Module

For type-constrained arrays:

```python
import array

# Create typed array
numbers = array.array('i', [1, 2, 3, 4, 5])  # 'i' = integer

# Operations
numbers.append(6)
print(numbers[0])
print(len(numbers))

# More efficient than lists for numeric data
```

## NumPy Arrays

For scientific computing and multi-dimensional arrays:

```python
import numpy as np

# Create array
arr = np.array([1, 2, 3, 4, 5])

# Multi-dimensional array
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])

# Array operations
print(arr * 2)      # [2, 4, 6, 8, 10]
print(arr + 10)     # [11, 12, 13, 14, 15]
print(np.sum(arr))  # 15
print(np.mean(arr)) # 3.0
```

## Common List Methods

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Length
print(len(numbers))  # 8

# Sort
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Reverse
numbers.reverse()
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]

# Count occurrences
print(numbers.count(1))  # 2

# Find index
print(numbers.index(5))  # 2

# Clear all
numbers.clear()
print(numbers)  # []
```

## Multi-Dimensional Lists

```python
# 2D list (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access elements
print(matrix[0][0])  # 1
print(matrix[1][2])  # 6

# Iterate
for row in matrix:
    for element in row:
        print(element, end=' ')
    print()
```

## List Copying

```python
original = [1, 2, 3]

# Shallow copy
copy1 = original.copy()
copy2 = original[:]
copy3 = list(original)

# Deep copy (for nested lists)
import copy
nested = [[1, 2], [3, 4]]
deep_copy = copy.deepcopy(nested)
```

## Common Patterns

### Filtering

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get even numbers
evens = [x for x in numbers if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]
```

### Mapping

```python
numbers = [1, 2, 3, 4, 5]

# Square all numbers
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]
```

### Reducing

```python
numbers = [1, 2, 3, 4, 5]

# Sum all numbers
total = sum(numbers)
print(total)  # 15

# Product
from functools import reduce
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120
```

## Performance Tips

```python
# Use list comprehension instead of loops
# Fast
squares = [x**2 for x in range(1000)]

# Slower
squares = []
for x in range(1000):
    squares.append(x**2)

# Use extend instead of repeated append
# Fast
numbers.extend([1, 2, 3])

# Slower
for num in [1, 2, 3]:
    numbers.append(num)
```

## Related Concepts

- [[wiki:variable]] - Storing lists in variables
- [[wiki:functions]] - Passing lists to functions
- [[wiki:data-types]] - List as a data type
- [[wiki:pointers]] - Lists and references
