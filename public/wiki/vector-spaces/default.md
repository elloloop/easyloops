# Vector Spaces

## What is a Vector Space?

A **vector space** is a triple `(V, +, ·)` where:

- `V` is a **set** (the vectors)
- `+: V × V → V` is vector addition (a function!)
- `·: F × V → V` is scalar multiplication (also a function!)

And these operations satisfy 8 axioms (listed below).

### The Key Insight

A vector space is **just a set with two operations that follow rules**. That's it. There are no arrows, no geometry, no coordinates required. Those are optional extras.

---

## The Vector Space Axioms

For all `u, v, w ∈ V` and all `a, b ∈ F` (where F is a field):

### Addition axioms:

1. **Associativity:** `(u + v) + w = u + (v + w)`
2. **Commutativity:** `u + v = v + u`
3. **Identity:** There exists `0 ∈ V` such that `v + 0 = v`
4. **Inverses:** For every `v ∈ V`, there exists `-v ∈ V` such that `v + (-v) = 0`

### Scalar multiplication axioms:

5. **Compatibility:** `a · (b · v) = (a · b) · v`
6. **Identity:** `1 · v = v` (where 1 is the multiplicative identity of F)

### Distributivity:

7. `a · (u + v) = a · u + a · v`
8. `(a + b) · v = a · v + b · v`

Notice: **subtraction is not an axiom.** Subtraction is derived: `u - v` means `u + (-v)`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned the 8 vector space axioms. List the 8 axioms and quiz me on each one. Give me specific examples where I need to verify if a particular axiom holds for a given set and operations. Include at least one case where the set is NOT a vector space and I need to identify which axiom fails."</div>
</div>

---

## Examples of Vector Spaces

### ℝ² over ℝ

`V = ℝ² = {(x, y) : x, y ∈ ℝ}`

- Addition: `(x₁, y₁) + (x₂, y₂) = (x₁ + x₂, y₁ + y₂)`
- Scalar multiplication: `c · (x, y) = (cx, cy)`
- Zero vector: `(0, 0)`

### The set of all polynomials of degree ≤ n

`V = {a₀ + a₁x + ... + aₙxⁿ : aᵢ ∈ ℝ}`

This is a vector space over ℝ. The "vectors" are polynomials, not arrows.

### The set of all continuous functions on [0, 1]

`V = C([0, 1])` — all continuous functions from [0,1] to ℝ.

- Addition: `(f + g)(x) = f(x) + g(x)`
- Scalar multiplication: `(c · f)(x) = c · f(x)`
- Zero vector: the zero function `f(x) = 0`

This is a vector space. The "vectors" are functions.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 4 sets with defined operations and ask me to determine which are vector spaces. Include: (1) ℝ³ with standard operations, (2) the set of 2×2 matrices with matrix addition and scalar multiplication, (3) the set of polynomials of degree exactly 3, (4) the set of all functions f: ℝ → ℝ. For any that fail, I must identify the specific axiom that breaks."</div>
</div>

---

## Where People Go Wrong

### 1. Thinking vectors must be arrows

Vectors in a vector space can be:

- Tuples of numbers `(1, 2, 3)`
- Polynomials `3x² + 2x + 1`
- Functions `f(x) = sin(x)`
- Matrices
- Sequences

An "arrow" is just one geometric interpretation of vectors in ℝ² or ℝ³.

### 2. Thinking geometry is part of the definition

Length, angle, distance, dot product — **none** of these are part of the vector space definition. They require additional structure (inner products, norms), which is added later.

### 3. Forgetting that operations are part of the structure

The **same set** with **different operations** can be a vector space or not. The set matters, but the operations matter equally.

### 4. Confusing the zero vector with the number zero

The zero vector `0` in a vector space is an element of V. The number 0 is an element of the field F. They are different objects that happen to share the symbol.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 10-question exam on vector spaces. Include: (1) state the 8 axioms, (2) give examples of 'unusual' vector spaces where vectors are not arrows, (3) explain why geometry is not part of the definition, (4) check if specific sets with operations form vector spaces, (5) identify the difference between the zero vector and the number zero. Mix true/false and open-ended questions. Grade me strictly."</div>
</div>

---

**Previous:** [[wiki:fields]] | **Next:** [[wiki:scalars-vs-vectors]]
