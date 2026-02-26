# Interval Notation in Python

## Python Range Objects

Python's `range()` function uses interval-like notation but with specific rules:

```python
# range(start, stop) is like [start, stop)
# Includes start, excludes stop

range(1, 5)  # Like [1, 5) → 1, 2, 3, 4
range(0, 10) # Like [0, 10) → 0, 1, 2, ..., 9
```

## Implementing Interval Checks

### Simple Range Check

```python
def in_interval(x, start, end, include_start=True, include_end=True):
    """
    Check if x is in interval notation.

    [start, end] → include_start=True, include_end=True
    (start, end) → include_start=False, include_end=False
    [start, end) → include_start=True, include_end=False
    (start, end] → include_start=False, include_end=True
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
print(in_interval(5, 1, 10))  # True - [1, 10]
print(in_interval(1, 1, 10, include_start=False))  # False - (1, 10]
print(in_interval(10, 1, 10, include_end=False))  # False - [1, 10)
```

### Interval Class

```python
class Interval:
    def __init__(self, start, end, include_start=True, include_end=True):
        self.start = start
        self.end = end
        self.include_start = include_start
        self.include_end = include_end

    def contains(self, x):
        """Check if x is in this interval"""
        left_ok = (x >= self.start) if self.include_start else (x > self.start)
        right_ok = (x <= self.end) if self.include_end else (x < self.end)
        return left_ok and right_ok

    def __str__(self):
        """String representation in interval notation"""
        left = '[' if self.include_start else '('
        right = ']' if self.include_end else ')'
        return f"{left}{self.start}, {self.end}{right}"

    def __contains__(self, x):
        """Allow 'x in interval' syntax"""
        return self.contains(x)

# Usage
interval = Interval(1, 10, include_start=True, include_end=False)
print(interval)  # [1, 10)
print(5 in interval)  # True
print(10 in interval)  # False
print(1 in interval)  # True
```

## Slicing and Ranges

### List Slicing as Intervals

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Python slicing is [start, end)
print(numbers[1:5])    # [1, 2, 3, 4] → like [1, 5)
print(numbers[0:3])    # [0, 1, 2] → like [0, 3)
print(numbers[:5])     # [0, 1, 2, 3, 4] → like [0, 5)
print(numbers[5:])     # [5, 6, 7, 8, 9] → like [5, ∞)
```

### Custom Range with Endpoints

```python
def inclusive_range(start, end):
    """Range that includes both endpoints [start, end]"""
    return range(start, end + 1)

# Compare
print(list(range(1, 5)))           # [1, 2, 3, 4] - [1, 5)
print(list(inclusive_range(1, 5))) # [1, 2, 3, 4, 5] - [1, 5]
```

## Validation Using Intervals

### Age Validation

```python
def validate_age(age):
    """Valid age is [0, 120]"""
    interval = Interval(0, 120)
    if age not in interval:
        raise ValueError(f"Age must be in {interval}")
    return True

try:
    validate_age(25)   # OK
    validate_age(-5)   # Raises ValueError
except ValueError as e:
    print(e)
```

### Temperature Validation

```python
def validate_celsius(temp):
    """Valid temperature: (-273.15, ∞)"""
    if temp <= -273.15:
        raise ValueError("Temperature cannot be below absolute zero")
    return True

def validate_percentage(value):
    """Valid percentage: [0, 100]"""
    if not (0 <= value <= 100):
        raise ValueError("Percentage must be between 0 and 100")
    return True
```

## NumPy Interval Operations

```python
import numpy as np

# Create array
x = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Filter by interval
closed = x[(x >= 3) & (x <= 7)]        # [3, 7] → [3, 4, 5, 6, 7]
open = x[(x > 3) & (x < 7)]            # (3, 7) → [4, 5, 6]
half_open = x[(x >= 3) & (x < 7)]      # [3, 7) → [3, 4, 5, 6]
```

## Interval Arithmetic

```python
class Interval:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __add__(self, other):
        """Add two intervals"""
        return Interval(
            self.start + other.start,
            self.end + other.end
        )

    def __mul__(self, scalar):
        """Multiply interval by scalar"""
        a = self.start * scalar
        b = self.end * scalar
        return Interval(min(a, b), max(a, b))

    def __str__(self):
        return f"[{self.start}, {self.end}]"

# Usage
i1 = Interval(1, 3)
i2 = Interval(2, 4)
print(i1 + i2)  # [3, 7]
print(i1 * 2)   # [2, 6]
```

## Time Intervals

```python
from datetime import datetime, timedelta

class TimeInterval:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def contains(self, time):
        """Check if time is in interval [start, end]"""
        return self.start <= time <= self.end

    def duration(self):
        """Get duration of interval"""
        return self.end - self.start

# Usage
start = datetime(2024, 1, 1, 9, 0)   # 9 AM
end = datetime(2024, 1, 1, 17, 0)    # 5 PM

business_hours = TimeInterval(start, end)
current_time = datetime(2024, 1, 1, 14, 30)

if current_time in business_hours:
    print("Within business hours")
```

## Practical Examples

### Grade Ranges

```python
def get_letter_grade(score):
    """Map score to letter grade using intervals"""
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

### Price Tiers

```python
def get_discount(quantity):
    """Discount based on quantity intervals"""
    if quantity in Interval(1, 10):
        return 0.0
    elif quantity in Interval(11, 50):
        return 0.1
    elif quantity in Interval(51, 100):
        return 0.15
    else:  # [101, ∞)
        return 0.2
```

## Related Concepts

- [[wiki:arrays]] - Index ranges and slicing
- [[wiki:functions]] - Domain and range validation
- [[wiki:data-types]] - Numeric constraints
