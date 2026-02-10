# Linear Maps

## The Core of ML Math

Linear maps are the single most important concept in the mathematics of machine learning. Neural networks, attention mechanisms, PCA, SVD — all built on linear maps.

---

## Definition

A **linear map** (also called a linear transformation) is a function `T: V → W` between two vector spaces that preserves the vector space operations.

Formally, T must satisfy exactly two properties:

### 1. Additivity (preserves addition)

```
T(u + v) = T(u) + T(v)    for all u, v ∈ V
```

### 2. Homogeneity (preserves scalar multiplication)

```
T(cv) = cT(v)    for all c ∈ F, v ∈ V
```

That's it. **Two properties.** Everything else about linear maps is derived from these.

---

## What These Properties Mean

### Additivity

If you add two vectors first and then apply T, you get the same result as applying T to each vector and then adding the results.

```
T(u + v) = T(u) + T(v)
```

Note: the `+` on the left is addition in V. The `+` on the right is addition in W. These could be different operations (recall: operations are functions).

### Homogeneity

If you scale a vector first and then apply T, you get the same result as applying T first and then scaling.

```
T(cv) = cT(v)
```

### Combined (Equivalent) Form

Both properties can be combined into one:

```
T(au + bv) = aT(u) + bT(v)    for all a, b ∈ F, u, v ∈ V
```

This says: T preserves **linear combinations**.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning about linear maps. Give me 5 functions and ask me to determine which are linear maps by checking additivity and homogeneity. Include: (1) T(x,y) = (2x, 3y), (2) T(x,y) = (x+1, y), (3) T(x,y) = (x², y), (4) T(x,y) = (x+y, x-y), (5) T(x,y,z) = (x+y, z). For each, I need to show my work checking both properties."</div>
</div>

---

## Consequences of Linearity

From just additivity and homogeneity, we can derive:

### T(0) = 0

```
T(0) = T(0 · v) = 0 · T(v) = 0
```

Every linear map sends the zero vector to the zero vector. If `T(0) ≠ 0`, the map is **not linear**.

### T(-v) = -T(v)

```
T(-v) = T((-1) · v) = (-1) · T(v) = -T(v)
```

### T preserves linear combinations

```
T(c₁v₁ + c₂v₂ + ... + cₙvₙ) = c₁T(v₁) + c₂T(v₂) + ... + cₙT(vₙ)
```

This is the fundamental property. A linear map is completely determined by what it does to a basis.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on consequences of linearity: (1) Prove that T(0) = 0 for any linear map. (2) If T(1,0) = (3,1) and T(0,1) = (2,-1), what is T(4,5)? Show work using linearity. (3) A map satisfies T(0,0) = (1,1). Is it linear? Why? (4) True or false: if T(0) = 0, the map must be linear. Explain each answer."</div>
</div>

---

## Examples

### Linear:

- `T(x, y) = (2x + y, x - 3y)` — preserves both properties
- `T(x, y, z) = (x + z, y)` — projection is linear
- The zero map: `T(v) = 0` for all v — trivially linear
- The identity map: `T(v) = v` — trivially linear
- Differentiation: `D(f) = f'` on the space of polynomials — linear!

### Not linear:

- `T(x, y) = (x + 1, y)` — fails because `T(0,0) = (1, 0) ≠ (0, 0)`
- `T(x) = x²` — fails homogeneity: `T(2x) = 4x² ≠ 2x² = 2T(x)`
- `T(x) = |x|` — fails additivity: `T(-1 + 1) = 0 ≠ 2 = T(-1) + T(1)` (for ℝ)
- `T(x, y) = (xy, 0)` — fails additivity

---

## Where People Go Wrong

### 1. Thinking "linear = straight line"

`T(x) = 3x + 2` is NOT a linear map (it's an **affine** map). Linear maps must send 0 to 0. "Linear" in mathematics means something precise: preserves addition and scalar multiplication.

### 2. Not checking properties formally

"It looks linear" is not a proof. You must verify:

- `T(u + v) = T(u) + T(v)` for **all** u, v
- `T(cv) = cT(v)` for **all** c, v

One counterexample disproves linearity.

### 3. Jumping to matrices too early

A linear map is a function between vector spaces. A matrix is a representation of a linear map. Understanding the function first, then the matrix representation, is the correct order.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a challenging 8-question exam on linear maps. Include: (1) determine if 3 given functions are linear with proof, (2) compute a linear map's output given its values on a basis, (3) prove T(0)=0 from the definition, (4) explain why T(x) = 2x + 1 is not linear, (5) explain what 'preserves linear combinations' means precisely, (6-8) true/false on linear map properties. Grade me harshly and explain mistakes."</div>
</div>

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "I want a comprehensive review of linear maps. Ask me 10 questions that cover: the definition (additivity + homogeneity), checking if functions are linear, consequences like T(0)=0, computing outputs from basis values, the difference between linear and affine, and why linear maps matter for ML. Grade strictly and create a study plan for any concepts I get wrong."</div>
</div>

---

**Previous:** [[wiki:operations-as-functions]] | **Next:** [[wiki:matrices]]
