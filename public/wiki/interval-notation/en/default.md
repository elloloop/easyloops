# Interval Notation

## What is Interval Notation?

**Interval notation** is a mathematical shorthand for representing a range of numbers between two endpoints. It's commonly used to describe domains, ranges, and constraints in mathematics and programming.

## Notation Symbols

### Brackets [ ]

**Square brackets** indicate that the endpoint is **included** (closed interval).

- `[a, b]` - includes both a and b
- All numbers x where: a ≤ x ≤ b

### Parentheses ( )

**Parentheses** indicate that the endpoint is **excluded** (open interval).

- `(a, b)` - excludes both a and b
- All numbers x where: a < x < b

### Mixed Notation

You can mix brackets and parentheses:

- `[a, b)` - includes a, excludes b (a ≤ x < b)
- `(a, b]` - excludes a, includes b (a < x ≤ b)

## Examples

| Interval Notation | Meaning   | Number Line                   |
| ----------------- | --------- | ----------------------------- |
| `[1, 5]`          | 1 ≤ x ≤ 5 | Includes 1, 2, 3, 4, 5        |
| `(1, 5)`          | 1 < x < 5 | Includes 2, 3, 4 (not 1 or 5) |
| `[1, 5)`          | 1 ≤ x < 5 | Includes 1, 2, 3, 4 (not 5)   |
| `(1, 5]`          | 1 < x ≤ 5 | Includes 2, 3, 4, 5 (not 1)   |

## Infinity

Use `∞` (infinity) or `-∞` (negative infinity) for unbounded intervals. Always use parentheses with infinity (never brackets).

- `[0, ∞)` - All non-negative numbers (x ≥ 0)
- `(-∞, 0)` - All negative numbers (x < 0)
- `(-∞, ∞)` - All real numbers

## Union of Intervals

Use `∪` (union) to combine multiple intervals:

- `[1, 3] ∪ [5, 7]` - Numbers from 1 to 3 OR 5 to 7
- `(-∞, 0) ∪ (0, ∞)` - All numbers except 0

## Programming Applications

### Range Validation

```
Valid age: [0, 120]
Temperature (Celsius): [-273.15, ∞)
Percentage: [0, 100]
Probability: [0, 1]
```

### Index Bounds

```
Array indices: [0, length)
String slicing: [start, end)
```

### Time Intervals

```
Business hours: [9, 17]  (9 AM to 5 PM)
Valid year: [1900, 2100]
```

## Set Builder Notation Comparison

| Interval | Set Builder        | Description     |
| -------- | ------------------ | --------------- |
| `[a, b]` | `{x \| a ≤ x ≤ b}` | Closed interval |
| `(a, b)` | `{x \| a < x < b}` | Open interval   |
| `[a, ∞)` | `{x \| x ≥ a}`     | Unbounded above |

## Visual Representation

```
[1, 5]  ●━━━━━━━━━━●
        1          5

(1, 5)  ○━━━━━━━━━━○
        1          5

[1, 5)  ●━━━━━━━━━━○
        1          5

(1, 5]  ○━━━━━━━━━━●
        1          5

● = included (closed)
○ = excluded (open)
```

## Common Mistakes

1. **Using brackets with infinity**: `[0, ∞]` ❌ Should be `[0, ∞)` ✓
2. **Wrong order**: `[5, 1]` ❌ Should be `[1, 5]` ✓
3. **Confusing with array notation**: `[1, 5]` in math ≠ `[1, 5]` in code

## Related Concepts

- [[wiki:data-types]] - Numeric ranges
- [[wiki:arrays]] - Index ranges
- [[wiki:functions]] - Domain and range
- [[wiki:variable]] - Value constraints
