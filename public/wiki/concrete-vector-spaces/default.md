# Concrete Vector Spaces

## ℝⁿ — The Workhorse

The most common vector space in machine learning is `ℝⁿ`:

```
ℝⁿ = {(x₁, x₂, ..., xₙ) : xᵢ ∈ ℝ}
```

This is the set of all **ordered n-tuples** of real numbers.

### Key Facts:

- Elements of ℝⁿ are **tuples**, not numbers
- `(1, 2, 3)` is a single element (vector) of ℝ³
- ℝⁿ is a vector space over ℝ
- Dimension of ℝⁿ = n

### Operations:

```
Addition: (x₁, ..., xₙ) + (y₁, ..., yₙ) = (x₁ + y₁, ..., xₙ + yₙ)
Scalar mult: c · (x₁, ..., xₙ) = (cx₁, ..., cxₙ)
Zero vector: (0, 0, ..., 0)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on ℝⁿ as a vector space. (1) Compute (1,2,3) + (4,5,6) in ℝ³. (2) Compute 3 · (2, -1) in ℝ². (3) What is the zero vector in ℝ⁴? (4) True or false: ℝ² is a subset of ℝ³. (5) True or false: (1, 2) and (1, 2, 0) are the same vector. Explain each answer."</div>
</div>

---

## ℝ² is NOT a Field

This is a common point of confusion.

`ℝ²` is a **vector space**, not a field. Why?

- There is no natural multiplication `ℝ² × ℝ² → ℝ²` that satisfies the field axioms
- Specifically: `(1, 0) · (0, 1) = ?` There's no standard answer that makes ℝ² a field
- You can add vectors in ℝ², but you cannot multiply two vectors in ℝ² and get another vector (in a field-compatible way)

ℝ² has **two operations with the field ℝ**: vector addition and scalar multiplication. But it doesn't have the **two operations within itself** that a field requires.

---

## ℂ as a Field vs ℝ² as a Vector Space

The complex numbers ℂ and ℝ² look similar but are fundamentally different:

| Property           | ℂ                                   | ℝ²                                 |
| ------------------ | ----------------------------------- | ---------------------------------- |
| Elements           | `a + bi`                            | `(a, b)`                           |
| Addition           | `(a+bi) + (c+di) = (a+c) + (b+d)i`  | `(a,b) + (c,d) = (a+c, b+d)`       |
| Multiplication     | `(a+bi)(c+di) = (ac-bd) + (ad+bc)i` | Not defined (as a field operation) |
| Is a field?        | Yes                                 | No                                 |
| Is a vector space? | Yes (over ℝ or over ℂ)              | Yes (over ℝ)                       |

ℂ has a **multiplication** that makes it a field. ℝ² does not.

### The critical insight:

ℂ and ℝ² are **isomorphic as vector spaces** (they have the same addition structure). But ℂ has extra structure (field multiplication) that ℝ² lacks.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on the difference between ℂ and ℝ². (1) Why is ℂ a field but ℝ² is not? (2) Compute (2+3i)(1-i) in ℂ. (3) Can you compute (2,3)·(1,-1) in ℝ² as a field multiplication? Why or why not? (4) In what sense are ℂ and ℝ² 'the same'? (5) In what sense are they different? Be strict in grading."</div>
</div>

---

## Other Concrete Vector Spaces

### ℝᵐˣⁿ — Space of Matrices

The set of all m × n real matrices forms a vector space:

- Addition: add corresponding entries
- Scalar multiplication: multiply every entry by the scalar
- Zero vector: the zero matrix

### Pₙ(ℝ) — Polynomials of degree ≤ n

A polynomial `a₀ + a₁x + ... + aₙxⁿ` is a vector. This space has dimension n+1.

### C([a,b]) — Continuous functions

The set of all continuous functions on an interval forms an **infinite-dimensional** vector space.

---

## Where People Go Wrong

1. **Saying "ℝ² is a vector."** ℝ² is a _set_ (a vector space). Elements of ℝ² are vectors. The space is not a vector.

2. **Confusing the set with its elements.** `(1, 2)` is an element of ℝ². It is not ℝ² itself.

3. **Confusing ℂ with ℝ².** They share addition structure but ℂ is a field (has multiplication). ℝ² is not.

4. **Thinking ℝ¹ and ℝ are different.** They're isomorphic. The tuple `(x)` is just the number `x`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me an 8-question exam on concrete vector spaces. Cover: ℝⁿ operations, why ℝ² is not a field, the difference between ℂ and ℝ², other examples like polynomial spaces and matrix spaces, and common misconceptions like confusing a space with its elements. Grade me and identify weak areas."</div>
</div>

---

**Previous:** [[wiki:scalars-vs-vectors]] | **Next:** [[wiki:operations-as-functions]]
