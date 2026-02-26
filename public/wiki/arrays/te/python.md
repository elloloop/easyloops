# Python lo Arrays

## Lists - Python's Arrays

Python lo traditional arrays laga separate data structure ledu. Badalu ga **lists** use chestham - ivi chaala flexible and powerful.

## Lists Create Cheyadam

```python
# Empty list
empty = []

# Elements tho list
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]

# Mixed types kuda allow (Python specific)
mixed = [1, "hello", 3.14, True]

# List comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
```

## Elements Access Cheyadam

```python
fruits = ["apple", "banana", "cherry", "date"]

# Positive indexing (0 nundi start)
print(fruits[0])   # apple
print(fruits[2])   # cherry

# Negative indexing (end nundi)
print(fruits[-1])  # date
print(fruits[-2])  # cherry

# Slicing
print(fruits[1:3])   # ['banana', 'cherry']
print(fruits[:2])    # ['apple', 'banana']
print(fruits[2:])    # ['cherry', 'date']
```

## Lists Modify Cheyadam

```python
numbers = [1, 2, 3, 4, 5]

# Element change
numbers[0] = 10

# End lo add
numbers.append(6)

# Specific position lo insert
numbers.insert(1, 15)

# Value dwara remove
numbers.remove(15)

# Index dwara delete
del numbers[0]

# Pop (remove and return)
last = numbers.pop()
```

## Common List Methods

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Length
len(numbers)  # 8

# Sort
numbers.sort()

# Reverse
numbers.reverse()

# Count occurrences
numbers.count(1)  # 2

# Find index
numbers.index(5)  # position return chesthundi
```

## Iteration

```python
fruits = ["apple", "banana", "cherry"]

# Simple loop
for fruit in fruits:
    print(fruit)

# Index tho
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# List comprehension
uppercase = [fruit.upper() for fruit in fruits]
```

## 2D Lists (Matrix)

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access
print(matrix[0][0])  # 1
print(matrix[1][2])  # 6
```

## NumPy Arrays

Scientific computing kosam NumPy use chestham:

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

# Operations
print(arr * 2)      # [2, 4, 6, 8, 10]
print(arr + 10)     # [11, 12, 13, 14, 15]
print(np.sum(arr))  # 15
```

## Common Patterns

### Filtering

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
```

### Mapping

```python
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
```

## Performance Tips

- List comprehension loops kante fast
- `extend()` repeated `append()` kante better
- Large data kosam NumPy arrays use cheyandi

---

_Note: Ee page inka development stage lo undi._
