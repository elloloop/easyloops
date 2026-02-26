# Python lo Interval Notation

## Python Range

Python lo `range()` function interval laga work chesthundi:

```python
# range(start, stop) → [start, stop) laga
# Start include, stop exclude

range(1, 5)   # 1, 2, 3, 4 (5 ledu)
range(0, 10)  # 0, 1, 2, ..., 9 (10 ledu)
```

## Interval Check Implementation

```python
def in_interval(x, start, end, include_start=True, include_end=True):
    """
    x interval lo unda check cheyyadam

    [start, end] → rendu True
    (start, end) → rendu False
    [start, end) → start True, end False
    """
    if include_start:
        left_ok = x >= start
    else:
        left_ok = x > start

    if include_end:
        right_ok = x <= end
    else:
        right_ok = x < end

    return left_ok and right_ok

# Usage
print(in_interval(5, 1, 10))  # True
print(in_interval(10, 1, 10, include_end=False))  # False
```

## Interval Class

```python
class Interval:
    def __init__(self, start, end, include_start=True, include_end=True):
        self.start = start
        self.end = end
        self.include_start = include_start
        self.include_end = include_end

    def contains(self, x):
        left_ok = (x >= self.start) if self.include_start else (x > self.start)
        right_ok = (x <= self.end) if self.include_end else (x < self.end)
        return left_ok and right_ok

    def __str__(self):
        left = '[' if self.include_start else '('
        right = ']' if self.include_end else ')'
        return f"{left}{self.start}, {self.end}{right}"

    def __contains__(self, x):
        return self.contains(x)

# Usage
interval = Interval(1, 10, include_end=False)
print(interval)  # [1, 10)
print(5 in interval)   # True
print(10 in interval)  # False
```

## List Slicing

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Python slicing [start, end) laga work chesthundi
numbers[1:5]   # [1, 2, 3, 4] → [1, 5) laga
numbers[:5]    # [0, 1, 2, 3, 4] → [0, 5) laga
numbers[5:]    # [5, 6, 7, 8, 9] → [5, ∞) laga
```

## Validation Examples

### Age Validation

```python
def validate_age(age):
    """Age [0, 120] lo undali"""
    if not (0 <= age <= 120):
        raise ValueError("Invalid age")
    return True
```

### Temperature Check

```python
def validate_celsius(temp):
    """Temperature (-273.15, ∞) lo undali"""
    if temp <= -273.15:
        raise ValueError("Below absolute zero!")
    return True
```

### Percentage

```python
def validate_percentage(value):
    """Percentage [0, 100] lo undali"""
    if not (0 <= value <= 100):
        raise ValueError("Must be 0-100")
    return True
```

## NumPy lo Intervals

```python
import numpy as np

x = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Filter by interval
closed = x[(x >= 3) & (x <= 7)]     # [3, 7]
open = x[(x > 3) & (x < 7)]         # (3, 7)
half_open = x[(x >= 3) & (x < 7)]   # [3, 7)
```

## Practical Examples

### Grade Calculation

```python
def get_grade(score):
    """Score based on intervals"""
    if 90 <= score <= 100:
        return 'A'
    elif 80 <= score < 90:
        return 'B'
    elif 70 <= score < 80:
        return 'C'
    elif 60 <= score < 70:
        return 'D'
    else:
        return 'F'
```

### Discount Tiers

```python
def get_discount(quantity):
    """Quantity based discounts"""
    if 1 <= quantity <= 10:
        return 0.0
    elif 11 <= quantity <= 50:
        return 0.1
    elif 51 <= quantity <= 100:
        return 0.15
    else:  # 101+
        return 0.2
```

## Tips

- Python slicing always `[start, stop)` format
- Validation kosam intervals chaala useful
- NumPy tho large data filter cheyyadam easy
- Class create chesi reusable ga cheyochu

---

_Note: Ee page inka development stage lo undi._
