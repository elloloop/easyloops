# Enumerating Intervals

## Enumeration ante enti?

**Enumeration** ante elements ni specific order lo list cheyadam or iterate cheyadam. Programming lo different patterns follow chesi ranges and collections enumerate chestham.

## Common Patterns

### [0, n) - Zero-Based

**Programming lo chaala common**. 0 nundi start, n ki mundu aaguthundi.

```
[0, n) → 0, 1, 2, ..., n-1
Example: [0, 5) → 0, 1, 2, 3, 4
```

**Enduku popular?**

- Array indexing match avtundi
- Length = n (easy calculation)
- Off-by-one errors thagguthayi

### [1, n] - One-Based

1 nundi start, n include.

```
[1, n] → 1, 2, 3, ..., n
Example: [1, 5] → 1, 2, 3, 4, 5
```

**Enduku use chestaru?**

- Natural counting (humans 1 nundi count chesthaaru)
- Mathematical problems ki better
- Rankings lo clear

### (n, 0] - Reverse Countdown

n-1 nundi 0 varaku (0 include).

```
(n, 0] → n-1, n-2, ..., 1, 0
Example: (5, 0] → 4, 3, 2, 1, 0
```

**Use cases:**

- Countdown timers
- Reverse processing
- Stack operations

### [n, 1] - Reverse Excluding Zero

n nundi 1 varaku (0 exclude).

```
[n, 1] → n, n-1, ..., 2, 1
Example: [5, 1] → 5, 4, 3, 2, 1
```

**Enduku useful?**

- Zero avoid cheyyali aithe
- Rankings (high to low)
- Priority queues

## Pattern Comparison

| Pattern  | Start | End | Count | Example (n=5) |
| -------- | ----- | --- | ----- | ------------- |
| `[0, n)` | 0     | n-1 | n     | 0,1,2,3,4     |
| `[1, n]` | 1     | n   | n     | 1,2,3,4,5     |
| `(n, 0]` | n-1   | 0   | n     | 4,3,2,1,0     |
| `[n, 1]` | n     | 1   | n     | 5,4,3,2,1     |

## Epudu Em Use Cheyali

### [0, n) use cheyandi when:

- Arrays/lists tho work chestunnapudu
- Standard programming languages
- Zero-based indexing

### [1, n] use cheyandi when:

- Human readable output kavali
- Mathematical sequences
- Natural counting

### (n, 0] use cheyandi when:

- Countdown to zero
- Reverse iteration tho 0 include
- Decrement operations

### [n, 1] use cheyandi when:

- Countdown excluding zero
- Rankings/levels
- Positive numbers matrame

## Off-by-One Errors

Interval notation artham cheskunte errors avoid avuthayi:

```
// Wrong - mixed notation
for i in [1, n):
    array[i]  // Index 0 skip ayyindi!

// Correct - consistent
for i in [0, n):
    array[i]  // Antha correct
```

---

_Note: Ee page inka development stage lo undi._
