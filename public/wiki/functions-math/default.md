# Functions (as Mathematical Objects)

## What is a Function?

A **function** `f: A → B` is a rule that assigns to **each** element of set `A` **exactly one** element of set `B`.

The full definition of a function has **three parts**:

1. **Domain** (`A`) — the set of inputs
2. **Codomain** (`B`) — the set of _possible_ outputs
3. **Rule** — how each input maps to an output

All three parts are essential. Change any one of them and you have a **different function**, even if the rule looks the same.

---

## Functions as Sets of Ordered Pairs

Formally, a function `f: A → B` is a subset of the Cartesian product `A × B` such that:

- **Every** element of A appears exactly once as a first component
- Each pair `(a, b)` means `f(a) = b`

**Example:**

```
A = {1, 2, 3}, B = {x, y}
f = {(1, x), (2, y), (3, x)}
```

This is a valid function because every element of A (1, 2, 3) has exactly one output.

**Not a function:**

```
g = {(1, x), (1, y), (2, x)}
```

This fails because 1 maps to both x and y — a function cannot have two outputs for the same input.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned that a function f: A → B is a subset of A × B where every element of A appears exactly once as a first component. Give me 4 subsets of some A × B and ask me to determine which are valid functions and which are not, and why. Include one where an element of A is missing and one where an element has two outputs."</div>
</div>

---

## Codomain vs Image (Range)

This distinction trips up almost everyone.

- **Codomain**: the set B in `f: A → B` — the set of _allowed_ outputs
- **Image (Range)**: the set of values that actually get hit — `{f(a) : a ∈ A}`

**Example:**

```
f: ℝ → ℝ defined by f(x) = x²
```

- Codomain = `ℝ` (all real numbers are allowed outputs)
- Image = `[0, ∞)` (only non-negative numbers actually appear as outputs)

The image is always a **subset** of the codomain: `Image(f) ⊆ B`.

### Why this matters

Two functions can have the same rule and domain but different codomains, making them **different functions**:

- `f: ℝ → ℝ` where `f(x) = x²` — not surjective
- `g: ℝ → [0,∞)` where `g(x) = x²` — surjective (onto)

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on codomain vs image. Give me 3 functions with explicit domain and codomain. For each, ask me to identify the image and whether the function is surjective (onto). Then ask me: if two functions have the same rule and domain but different codomains, are they the same function? Explain why."</div>
</div>

---

## Injective, Surjective, Bijective

### Injective (One-to-One)

Different inputs always give different outputs.

`f(a₁) = f(a₂) implies a₁ = a₂`

### Surjective (Onto)

Every element in the codomain is actually hit.

`Image(f) = B`

### Bijective

Both injective and surjective. A perfect pairing between A and B — every element of A maps to a unique element of B, and every element of B is covered.

---

## Where People Go Wrong

1. **Treating functions as "just code."** A mathematical function is a precise triple: (domain, codomain, rule). In programming, a function is a procedure — it can have side effects, take no arguments, return nothing. Mathematical functions cannot.

2. **Ignoring the codomain.** "f(x) = x²" is incomplete without specifying domain and codomain. `f: ℝ → ℝ` and `f: ℤ → ℤ` are different functions.

3. **Assuming the range determines the function.** The range (image) is a consequence of the function — it does not define the function.

4. **Confusing "function" with "formula."** The function `f: {1,2,3} → {a,b}` defined by `f = {(1,a), (2,b), (3,a)}` has no formula. It's still a perfectly valid function.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a 5-question quiz on functions as mathematical objects. Include questions about: (1) identifying valid functions from sets of ordered pairs, (2) the difference between codomain and image, (3) whether two functions with the same formula but different codomains are equal, (4) injective/surjective classification, (5) why a programming function is not the same as a mathematical function. Grade me and explain what I got wrong."</div>
</div>

---

## Why This Matters for ML

This definition of functions matters because:

- **Linear maps** are functions between vector spaces with specific properties
- **Probability distributions** are functions from events to [0,1]
- **Loss functions** are functions from parameter spaces to ℝ
- **Activation functions** are functions from ℝ to ℝ (or ℝⁿ to ℝⁿ)

If you don't have functions down precisely, linear algebra and probability theory will be confusing.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a comprehensive 8-question test on mathematical functions. Cover: domain/codomain/image distinction, functions as ordered pairs, injective/surjective/bijective classification, and why the formal definition matters for later topics like linear maps. Mix conceptual and computational questions. After I answer, give me a score and tell me exactly which concepts to revisit."</div>
</div>

---

**Previous:** [[wiki:sets-and-notation]] | **Next:** [[wiki:fields]]
