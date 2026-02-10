# Inner Products, Norms, and Geometry

## Key Idea

Geometry in a vector space is **optional, not fundamental**. A vector space has addition and scalar multiplication — nothing else. To get concepts like "length," "angle," and "distance," you must add **extra structure**.

---

## Inner Products

An **inner product** on a real vector space V is a function:

```
⟨·, ·⟩: V × V → ℝ
```

satisfying:

1. **Symmetry:** `⟨u, v⟩ = ⟨v, u⟩`
2. **Linearity in the first argument:** `⟨au + bv, w⟩ = a⟨u, w⟩ + b⟨v, w⟩`
3. **Positive definiteness:** `⟨v, v⟩ ≥ 0`, and `⟨v, v⟩ = 0` if and only if `v = 0`

A vector space with an inner product is called an **inner product space**.

### The Dot Product

The standard inner product on ℝⁿ is the **dot product**:

```
⟨(x₁,...,xₙ), (y₁,...,yₙ)⟩ = x₁y₁ + x₂y₂ + ... + xₙyₙ
```

This is the most common inner product, but it's not the only one.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on inner products. (1) Compute the dot product of (1,2,3) and (4,-1,2). (2) Verify each inner product axiom for the standard dot product on ℝ². (3) True or false: every vector space has a dot product. (4) Can you define a different inner product on ℝ² besides the standard dot product? Give an example. Explain each answer."</div>
</div>

---

## Norms (Length)

A **norm** on a vector space V is a function:

```
‖·‖: V → ℝ
```

satisfying:

1. **Non-negativity:** `‖v‖ ≥ 0`, and `‖v‖ = 0` iff `v = 0`
2. **Homogeneity:** `‖cv‖ = |c| · ‖v‖`
3. **Triangle inequality:** `‖u + v‖ ≤ ‖u‖ + ‖v‖`

### Norms from Inner Products

Every inner product **induces** a norm:

```
‖v‖ = √⟨v, v⟩
```

For the standard dot product on ℝⁿ, this gives the **Euclidean norm**:

```
‖(x₁,...,xₙ)‖ = √(x₁² + x₂² + ... + xₙ²)
```

### Other norms (no inner product needed)

Not every norm comes from an inner product:

- **L¹ norm:** `‖(x₁,...,xₙ)‖₁ = |x₁| + |x₂| + ... + |xₙ|`
- **L∞ norm:** `‖(x₁,...,xₙ)‖∞ = max(|x₁|, |x₂|, ..., |xₙ|)`

These are valid norms but don't come from any inner product.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on norms: (1) Compute the Euclidean norm of (3, 4). (2) Compute the L¹ norm and L∞ norm of (1, -3, 2). (3) Verify that the Euclidean norm satisfies all three norm axioms. (4) True or false: every norm comes from an inner product. (5) How is a norm derived from an inner product? Show the formula. Grade me."</div>
</div>

---

## Distance and Geometry

Once you have a norm, you can define **distance**:

```
d(u, v) = ‖u - v‖
```

Once you have an inner product, you can define **angles**:

```
cos(θ) = ⟨u, v⟩ / (‖u‖ · ‖v‖)
```

And **orthogonality** (perpendicularity):

```
u ⊥ v  ⟺  ⟨u, v⟩ = 0
```

### The hierarchy:

```
Vector Space (just +, ·)
    ↓ add inner product
Inner Product Space (now have angles, orthogonality)
    ↓ derive norm
Normed Space (now have length)
    ↓ derive distance
Metric Space (now have distance)
```

Each level adds structure. You don't get the lower levels for free — they must be explicitly added or derived.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on geometry in vector spaces: (1) Are (1,2) and (2,-1) orthogonal in ℝ² with the standard inner product? Show work. (2) Compute the distance between (1,0,0) and (0,1,1) using the Euclidean norm. (3) Compute the angle between (1,0) and (1,1) in ℝ². (4) Explain the hierarchy: vector space → inner product space → normed space → metric space. Grade me."</div>
</div>

---

## Relevance to ML

In machine learning, geometry is everywhere — but it's always **added structure**, not inherent:

| ML Concept                 | Mathematical Structure            |
| -------------------------- | --------------------------------- |
| Cosine similarity          | Inner product → angle             |
| L2 regularization          | Euclidean norm                    |
| L1 regularization          | L¹ norm                           |
| Distance metrics           | Norm-induced distance             |
| Orthogonal weight matrices | Inner product → orthogonality     |
| PCA                        | Inner product space → projections |

Understanding that geometry is optional helps you understand **why** different ML methods choose different norms and inner products.

---

## Where People Go Wrong

1. **Learning geometry first.** Most people learn vectors as "arrows with direction and magnitude" and then try to understand abstract vector spaces. The correct order is: set → operations → axioms → optional geometry.

2. **Assuming all vector spaces have dot products.** The space of continuous functions is a vector space. It doesn't have a standard dot product (though you can define inner products on it).

3. **Confusing the norm with the inner product.** Every inner product gives a norm, but not every norm comes from an inner product. L¹ and L∞ norms are not induced by any inner product.

4. **Thinking "orthogonal" is a geometric word.** Orthogonality is defined by the inner product: `⟨u,v⟩ = 0`. It generalizes far beyond right angles in ℝ².

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 10-question exam covering inner products, norms, and geometry. Include: (1) inner product axioms and computation, (2) norm computation (Euclidean, L¹, L∞), (3) deriving norms from inner products, (4) distance and angle calculation, (5) orthogonality checks, (6) the hierarchy of vector space → inner product space → normed space, (7) why geometry is optional, (8-10) ML applications. Grade strictly and identify weak areas."</div>
</div>

---

**Previous:** [[wiki:matrices]] | **Next:** [[wiki:ml-math-roadmap]]
