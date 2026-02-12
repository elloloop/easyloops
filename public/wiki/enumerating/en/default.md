# Enumerating Intervals

## What is Enumeration?

**Enumeration** means listing or iterating through elements in a specific order. In programming, we enumerate ranges, arrays, and collections following different patterns based on interval notation.

## Common Enumeration Patterns

### [0, n) - Zero-Based Half-Open

**Most common in programming**. Start at 0, end before n.

```
[0, n) → 0, 1, 2, ..., n-1

Example: [0, 5) → 0, 1, 2, 3, 4
```

**Use cases:**

- Array/list indexing (most languages)
- Loop iteration in C, Python, JavaScript
- Standard library ranges

**Why popular?**

- Matches zero-based indexing
- Length equals n (convenient for array.length)
- Excludes endpoint (prevents off-by-one errors)

### [1, n] - One-Based Closed

Start at 1, include n.

```
[1, n] → 1, 2, 3, ..., n

Example: [1, 5] → 1, 2, 3, 4, 5
```

**Use cases:**

- Mathematical sequences
- Human-readable counting
- Databases (some SQL dialects)
- MATLAB, Fortran, Lua (1-based indexing)

**Why used?**

- Natural counting (humans start at 1)
- Mathematical notation alignment
- Clear boundaries (both included)

### (n, 0] - Reverse Countdown

Start below n, count down to 0 (inclusive).

```
(n, 0] → n-1, n-2, ..., 1, 0

Example: (5, 0] → 4, 3, 2, 1, 0
```

**Use cases:**

- Countdown timers
- Reverse iteration
- Stack popping
- Undo operations

**Why needed?**

- Natural countdown from n-1 to 0
- Useful for processing in reverse order
- Matches decreasing priority/importance

### [n, 1] - Reverse One-Based

Start at n, count down to 1 (inclusive).

```
[n, 1] → n, n-1, ..., 2, 1

Example: [5, 1] → 5, 4, 3, 2, 1
```

**Use cases:**

- Mathematical sequences (reverse)
- Priority queues (high to low)
- Ranking systems
- Countdown (excluding zero)

**Why useful?**

- Stops before zero (avoids zero handling)
- Clear range for positive integers
- Natural for rankings and levels

## Pattern Comparison

| Pattern  | Start | End | Count | Example         |
| -------- | ----- | --- | ----- | --------------- |
| `[0, n)` | 0     | n-1 | n     | 0,1,2,3,4 (n=5) |
| `[1, n]` | 1     | n   | n     | 1,2,3,4,5 (n=5) |
| `(n, 0]` | n-1   | 0   | n     | 4,3,2,1,0 (n=5) |
| `[n, 1]` | n     | 1   | n     | 5,4,3,2,1 (n=5) |

## Choosing the Right Pattern

### Use [0, n) when:

- Working with arrays/lists
- Standard library functions
- Zero-based languages (C, Python, JavaScript)

### Use [1, n] when:

- Human-readable output
- Mathematical problems
- Natural counting scenarios

### Use (n, 0] when:

- Countdown including zero
- Reverse array processing
- Decrement to zero

### Use [n, 1] when:

- Countdown excluding zero
- Rankings/levels
- Positive-only iterations

## Off-by-One Errors

Understanding interval notation prevents common errors:

```
// Error-prone: mixing notations
for i in range [1, n):    // Confusing!
    array[i]              // Skips index 0

// Clear: consistent notation
for i in range [0, n):    // Standard
    array[i]              // Correct indexing
```

## Conversion Between Patterns

```
[0, n) ↔ [1, n]:  Add/subtract 1 from indices
(n, 0] ↔ [n, 1]:  Include/exclude zero
Forward ↔ Reverse: Reverse iteration direction
```

## Related Concepts

- [[wiki:interval-notation]] - Mathematical notation
- [[wiki:arrays]] - Zero-based indexing
- [[wiki:functions]] - Iteration and ranges
- [[wiki:loops]] - Loop patterns
