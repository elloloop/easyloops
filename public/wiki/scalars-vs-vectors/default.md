# Scalars vs Vectors

## The Distinction

This is simpler than people make it, but getting it wrong creates persistent confusion.

- **Scalars** come from a **field** `F`
- **Vectors** come from a **vector space** `V`
- "Vector space over F" means: the scalars are elements of F

They are elements of **different sets** that interact through scalar multiplication.

---

## What "Over a Field" Means

When we write "V is a vector space over F," we mean:

- The vectors live in V
- The scalars live in F
- Scalar multiplication is a function `· : F × V → V`
- The scalar 1 (from F) acts as the identity: `1 · v = v`

**Examples:**

- `ℝ³` is a vector space **over ℝ** — scalars are real numbers, vectors are triples
- `ℂ²` is a vector space **over ℂ** — scalars are complex numbers, vectors are pairs of complex numbers
- `ℂ` is a vector space **over ℝ** — scalars are real numbers, vectors are complex numbers (yes, this works!)

That last example is important: the **same set** can be a vector space over different fields, and the choice of field changes the structure.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning the distinction between scalars and vectors. Quiz me: (1) If V is a vector space over ℝ, what set do the scalars come from? (2) Can ℂ be a vector space over ℝ? Explain. (3) In ℝ³ over ℝ, is the number 5 a scalar, a vector, or both? (4) In ℂ² over ℂ, is (1+i, 2) a scalar or a vector? After I answer, correct any confusion."</div>
</div>

---

## Where People Go Wrong

### 1. Mixing scalars and vectors

You cannot add a scalar to a vector. The operation `3 + (1, 2, 3)` is **undefined** in a vector space. Addition is `V × V → V`, and `3 ∈ F`, not `3 ∈ V`.

### 2. Not understanding what "over a field" means

"Over ℝ" and "over ℂ" are not just labels. They determine what operations are available:

- `ℝ²` over ℝ has dimension 2
- `ℝ²` viewed as a module over ℤ is a different structure entirely
- `ℂ` over ℝ has dimension 2 (basis: {1, i})
- `ℂ` over ℂ has dimension 1 (basis: {1})

The field determines the dimension.

### 3. Thinking "scalar = number" always

In a finite field like `F₂ = {0, 1}` with mod-2 arithmetic, the scalars are just 0 and 1. They're still called scalars.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 5 questions on scalars vs vectors. Include: (1) identify which elements are scalars and which are vectors in a given vector space, (2) explain why you can't add a scalar to a vector, (3) explain why the dimension of ℂ changes depending on whether it's over ℝ or over ℂ, (4) a true/false about scalars always being real numbers, (5) what 'over a field' means in precise terms. Grade me."</div>
</div>

---

## Why This Matters

When you encounter terms like:

- "scalar multiplication" in neural networks
- "weight vectors" in ML
- "learning rate" (a scalar from ℝ)
- "gradient" (a vector in parameter space)

The scalar/vector distinction tells you exactly what type of object you're working with and what operations are legal.

---

**Previous:** [[wiki:vector-spaces]] | **Next:** [[wiki:concrete-vector-spaces]]
