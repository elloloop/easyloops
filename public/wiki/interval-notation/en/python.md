# Interval Notation in Python

## Representing Intervals in Python

Python doesn’t have a built-in “interval” data type, but you can represent and work with intervals using **tuples**, **conditions**, or **custom classes**.

---

## 1. Representing Intervals with Tuples

You can store intervals as tuples `(start, end)`.

```python
interval = (2, 5)  # represents (2, 5)

This represents all numbers between 2 and 5.

To check if a number x is in the interval:

def in_open_interval(x, a, b):
    return a < x < b

print(in_open_interval(3, 2, 5))  # True
print(in_open_interval(2, 2, 5))  # False

2. Handling Closed and Open Intervals

You can write functions for all interval types:

def in_interval(x, a, b, left_closed=False, right_closed=False):
    left_ok = x > a if not left_closed else x >= a
    right_ok = x < b if not right_closed else x <= b
    return left_ok and right_ok

print(in_interval(2, 2, 5))                 # False -> (2, 5)
print(in_interval(2, 2, 5, left_closed=True))  # True -> [2, 5)
print(in_interval(5, 2, 5, right_closed=True)) # True -> (2, 5]


3. Infinite Intervals

Represent infinity using float('inf') and float('-inf').

positive_infinity = float('inf')
negative_infinity = float('-inf')

# Example: x ≥ 3
def greater_than_or_equal(x, a):
    return x >= a

print(greater_than_or_equal(5, 3))  # True
print(greater_than_or_equal(2, 3))  # False

Or using an interval representation:
interval = (3, float('inf'))  # [3, ∞)

4. Combining Intervals

Use lists or sets to represent unions.
intervals = [(-float('inf'), 0), (0, float('inf'))]

def in_union(x, intervals):
    for a, b in intervals:
        if a < x < b:
            return True
    return False

print(in_union(-5, intervals))  # True
print(in_union(0, intervals))   # False

5. Visualizing Intervals

You can print intervals neatly:
def format_interval(a, b, left_closed=False, right_closed=False):
    left_symbol = "[" if left_closed else "("
    right_symbol = "]" if right_closed else ")"
    return f"{left_symbol}{a}, {b}{right_symbol}"

print(format_interval(2, 5))                   # (2, 5)
print(format_interval(2, 5, True, True))       # [2, 5]
print(format_interval(-float('inf'), 0, False, False))  # (-inf, 0)

6. Using SymPy for Interval Operations

The sympy library has a built-in Interval class for mathematical intervals.

from sympy import Interval

# Closed interval [2, 5]
A = Interval(2, 5)

# Open interval (3, 8)
B = Interval(3, 8, left_open=True, right_open=True)

# Union
union = A.union(B)

print("A:", A)
print("B:", B)
print("Union:", union)

Output:

A: [2, 5]
B: (3, 8)
Union: [2, 8)

Best Practices in Python

Use float('inf') for infinite intervals

Use tuples for lightweight storage

Use SymPy’s Interval for mathematical precision

Always test boundary cases (endpoints)

Related Concepts

[[wiki:inequalities]] – Inequality handling in Python

[[wiki:sympy-intervals]] – Advanced interval operations

[[wiki:function-domains]] – Function domain/range representation

```
