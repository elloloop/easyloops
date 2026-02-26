# Interval Notation

## Interval notation ante enti?

**Interval notation** ante mathematical shorthand. Numbers yoka range ni represent cheyadaniki use chestham. Two endpoints madhya unna numbers antha ee interval lo untayi.

## Symbols

### Brackets [ ]

**Square brackets** endpoint ni **include** chesthayi.

- `[a, b]` - a and b rendu include
- a ≤ x ≤ b

### Parentheses ( )

**Parentheses** endpoint ni **exclude** chesthayi.

- `(a, b)` - a and b rendu exclude
- a < x < b

### Mixed

Renditini mix cheyochu:

- `[a, b)` - a include, b exclude
- `(a, b]` - a exclude, b include

## Examples

| Notation | Meaning   | Numbers             |
| -------- | --------- | ------------------- |
| `[1, 5]` | 1 ≤ x ≤ 5 | 1, 2, 3, 4, 5 anni  |
| `(1, 5)` | 1 < x < 5 | 2, 3, 4 (1, 5 levu) |
| `[1, 5)` | 1 ≤ x < 5 | 1, 2, 3, 4 (5 ledu) |
| `(1, 5]` | 1 < x ≤ 5 | 2, 3, 4, 5 (1 ledu) |

## Infinity

`∞` (infinity) unbounded intervals kosam. Infinity tho always parentheses use cheyali.

- `[0, ∞)` - Anni non-negative numbers
- `(-∞, 0)` - Anni negative numbers
- `(-∞, ∞)` - Anni real numbers

## Programming lo Use

### Range Validation

```
Age: [0, 120]
Temperature: [-273.15, ∞)
Percentage: [0, 100]
```

### Array Indices

```
Python slicing: [start, end)
Valid indices: [0, length)
```

## Visual Representation

```
[1, 5]  ●━━━━━━━━━━●   (rendu include)
(1, 5)  ○━━━━━━━━━━○   (rendu exclude)
[1, 5)  ●━━━━━━━━━━○   (left include, right exclude)

● = included
○ = excluded
```

## Common Mistakes

1. Infinity tho brackets: `[0, ∞]` ❌ → `[0, ∞)` ✓
2. Wrong order: `[5, 1]` ❌ → `[1, 5]` ✓
3. Array notation confusion: Math lo `[1, 5]` ≠ Code lo `[1, 5]`

---

_Note: Ee page inka development stage lo undi._
