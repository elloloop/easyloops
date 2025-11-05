# Interval Notation

## What is Interval Notation?

**Interval notation** is a mathematical way of representing a range of numbers between two endpoints.  
It is used to describe subsets of the real number line, often in inequalities or function domains/ranges.

In interval notation:

- Parentheses `()` mean the endpoint is **not included** (open interval)
- Square brackets `[]` mean the endpoint **is included** (closed interval)

---

## Basic Syntax

| Interval Type        | Symbol | Meaning                                               | Example            |
| -------------------- | ------ | ----------------------------------------------------- | ------------------ |
| Open Interval        | (a, b) | All numbers **between a and b**, not including a or b | (2, 5) → 2 < x < 5 |
| Closed Interval      | [a, b] | All numbers **between a and b**, including a and b    | [2, 5] → 2 ≤ x ≤ 5 |
| Half-Open Interval   | (a, b] | Includes **b**, not a                                 | (2, 5] → 2 < x ≤ 5 |
| Half-Closed Interval | [a, b) | Includes **a**, not b                                 | [2, 5) → 2 ≤ x < 5 |

---

## Infinite Intervals

Infinity `∞` and negative infinity `-∞` are **never included**, so parentheses are always used.

| Type                       | Example | Meaning                                |
| -------------------------- | ------- | -------------------------------------- |
| Greater than a             | (a, ∞)  | All numbers greater than a             |
| Greater than or equal to a | [a, ∞)  | All numbers greater than or equal to a |
| Less than b                | (-∞, b) | All numbers less than b                |
| Less than or equal to b    | (-∞, b] | All numbers less than or equal to b    |

---

## Combining Intervals (Union)

You can combine intervals using the **union symbol** `∪`.

Example:
(-∞, 0) ∪ (0, ∞)

This represents all numbers **except 0** (since 0 is not included).

---

## Graphical Representation

On a number line:

- **Open circles (○)** → endpoint not included
- **Closed circles (●)** → endpoint included

Example:  
Interval [2, 5)

●──────○
2 5

---

## Converting Inequalities to Interval Notation

| Inequality | Interval Notation |
| ---------- | ----------------- |
| x > 3      | (3, ∞)            |
| x ≥ 3      | [3, ∞)            |
| x < 3      | (-∞, 3)           |
| x ≤ 3      | (-∞, 3]           |
| -2 ≤ x < 5 | [-2, 5)           |

---

## Special Cases

| Description      | Notation | Example               |
| ---------------- | -------- | --------------------- |
| Empty set        | ∅        | No values satisfy     |
| All real numbers | (-∞, ∞)  | Includes every number |

---

## Common Mistakes

1. **Using brackets with infinity**  
   ❌ `[3, ∞]` → invalid (∞ is not a real number)  
   ✅ `[3, ∞)`

2. **Forgetting which endpoint is included**  
   `(2, 5]` ≠ `[2, 5)`

3. **Mixing inequality and interval notation incorrectly**  
   Write either `x > 2` or `(2, ∞)`, not both together.

---

## Best Practices

- Always use parentheses with `∞` or `-∞`.
- For piecewise domains, use unions.
- Keep intervals **ordered**: smaller value first.
- Check inclusion carefully when converting from inequalities.

---

## Related Concepts

- [[wiki:inequalities]] – Representing inequalities
- [[wiki:number-line]] – Visualizing ranges
- [[wiki:function-domain]] – Domain and range in functions
