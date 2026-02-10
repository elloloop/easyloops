# Matrices

## Matrices Are Representations, Not Definitions

This is the most important thing to understand about matrices:

> A matrix **represents** a linear map. The linear map exists independently of the matrix.

A matrix is what you get when you choose **bases** for the domain and codomain and then write down the outputs of the linear map in terms of those bases.

---

## What is a Matrix?

An **m × n matrix** is a rectangular array of scalars with m rows and n columns:

```
A = | a₁₁  a₁₂  ...  a₁ₙ |
    | a₂₁  a₂₂  ...  a₂ₙ |
    | ...                  |
    | aₘ₁  aₘ₂  ...  aₘₙ |
```

Where each `aᵢⱼ ∈ F` (the field).

### Dimensions:

- m × n matrix maps from an n-dimensional space to an m-dimensional space
- `A: ℝⁿ → ℝᵐ` — notice the order! Columns match the input dimension.

---

## From Linear Map to Matrix

Given a linear map `T: V → W` with:

- Basis `{v₁, ..., vₙ}` for V
- Basis `{w₁, ..., wₘ}` for W

The matrix of T is constructed by:

1. Apply T to each basis vector of V
2. Write each output as a linear combination of the basis vectors of W
3. The coefficients form the columns of the matrix

**Example:**

`T: ℝ² → ℝ²` defined by `T(x, y) = (2x + y, x - 3y)`

Using the standard basis `{(1,0), (0,1)}`:

```
T(1, 0) = (2, 1)   → first column is [2, 1]
T(0, 1) = (1, -3)  → second column is [1, -3]
```

Matrix:

```
A = | 2   1 |
    | 1  -3 |
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning how matrices represent linear maps. Give me 3 linear maps T: ℝ² → ℝ² and ask me to find the matrix representation using the standard basis. Then give me 2 matrices and ask me to write out the corresponding linear map formula. After I answer, check my work step by step."</div>
</div>

---

## Matrix-Vector Multiplication

If A is the matrix of T and **x** is the coordinate vector of v (in the chosen basis), then:

```
T(v) = Ax
```

This is just applying the linear map. Matrix-vector multiplication is **not** a separate concept — it is literally the application of a linear map to a vector.

**Example:**

```
| 2   1 | | 3 |   | 2·3 + 1·(-1) |   | 5 |
| 1  -3 | |-1 | = | 1·3 + (-3)·(-1)| = | 6 |
```

This computes `T(3, -1) = (5, 6)`, which matches `T(x,y) = (2x+y, x-3y)` with `x=3, y=-1`.

---

## Matrix Multiplication = Function Composition

If `S: U → V` has matrix B and `T: V → W` has matrix A, then:

```
T ∘ S: U → W has matrix AB
```

Matrix multiplication represents **composition of linear maps**. This is why:

- Matrix multiplication is **not commutative**: `AB ≠ BA` in general (because function composition is not commutative)
- Matrix multiplication is **associative**: `(AB)C = A(BC)` (because function composition is associative)
- The identity matrix represents the identity function

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on matrices: (1) Multiply a 2×2 matrix by a vector in ℝ². (2) Given two 2×2 matrices, compute their product. (3) Verify that the product represents the composition of the two corresponding linear maps by checking on a specific vector. (4) Why is matrix multiplication not commutative? Give a concrete example. Grade my work."</div>
</div>

---

## Basis Dependence

The **same linear map** can be represented by **different matrices** depending on the chosen bases.

**Example:**

`T: ℝ² → ℝ²` defined by `T(x, y) = (x + y, x - y)`

Standard basis `{(1,0), (0,1)}`:

```
A = | 1   1 |
    | 1  -1 |
```

Different basis `{(1,1), (1,-1)}`:

```
A' = | 2  0 |
     | 0  2 |
```

Same linear map, different matrix. The linear map is the real object. The matrix is a coordinate representation.

---

## Where People Go Wrong

### 1. Thinking matrices ARE linear maps

A matrix is a representation. The linear map is the function. Different bases give different matrices for the same map.

### 2. Forgetting basis dependence

When someone gives you a matrix, they've implicitly chosen bases. Changing the bases changes the matrix. The linear map hasn't changed.

### 3. Thinking matrix multiplication is arbitrary

Matrix multiplication looks complex, but it's just function composition written in coordinates. The formula follows directly from composing two linear maps and writing the result in terms of bases.

### 4. Confusing dimensions

An m × n matrix maps from ℝⁿ to ℝᵐ. The **columns** match the input dimension, the **rows** match the output dimension. This is a common source of errors.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I need a thorough quiz on matrices. (1) A 3×2 matrix maps from ℝ? to ℝ? — fill in the blanks. (2) Given T(x,y) = (x-y, 2x, x+y), find the matrix. (3) True or false: every matrix uniquely determines a linear map. (4) True or false: every linear map uniquely determines a matrix. (5) Explain basis dependence with an example. (6) Why is matrix multiplication = function composition? Grade strictly."</div>
</div>

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 10-question comprehensive exam on matrices. Cover: constructing matrices from linear maps, matrix-vector multiplication, matrix multiplication as composition, basis dependence, dimension rules (m×n maps ℝⁿ→ℝᵐ), and the key distinction between a matrix and the linear map it represents. Include computation and conceptual questions. Grade me and create a study plan for weak areas."</div>
</div>

---

**Previous:** [[wiki:linear-maps]] | **Next:** [[wiki:inner-products-norms-geometry]]
