# Operations Are Functions

## The Critical Shift

This is a conceptual breakthrough that separates surface-level understanding from real fluency.

**Every operation in algebra is a function.** When we write `u + v`, we are applying a function. When we write `c · v`, we are applying a function. This is not metaphorical — it is literal.

---

## Addition is a Function

Vector addition `+` in a vector space V is:

```
+: V × V → V
```

This means: addition takes an element from `V × V` (an ordered pair of vectors) and returns an element of V.

- Input: `(u, v)` — a pair of vectors
- Output: `u + v` — a single vector
- Domain: `V × V`
- Codomain: `V`

The notation `u + v` is just shorthand for `+(u, v)`.

---

## Scalar Multiplication is a Function

Scalar multiplication `·` is:

```
·: F × V → V
```

This means: scalar multiplication takes a pair `(c, v)` where c is from the field and v is from the vector space, and returns a vector.

- Input: `(c, v)` — a scalar-vector pair
- Output: `c · v` — a single vector
- Domain: `F × V`
- Codomain: `V`

Notice: the domain is `F × V`, not `V × V`. The first argument must be a scalar. The second must be a vector.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning that vector addition and scalar multiplication are formally functions. Quiz me: (1) What is the domain and codomain of vector addition in ℝ³? (2) What is the domain and codomain of scalar multiplication in ℝ³ over ℝ? (3) Write 3·(1,2) using function notation instead of infix notation. (4) Why does it matter that we think of operations as functions? After I answer, explain any mistakes."</div>
</div>

---

## Field Operations are Also Functions

In a field `(F, +, ·)`:

- Field addition: `+: F × F → F`
- Field multiplication: `·: F × F → F`

These are distinct from the vector space operations! In a vector space over ℝ:

| Operation             | Type Signature | What it does           |
| --------------------- | -------------- | ---------------------- |
| Field addition        | `ℝ × ℝ → ℝ`    | Adds two scalars       |
| Field multiplication  | `ℝ × ℝ → ℝ`    | Multiplies two scalars |
| Vector addition       | `V × V → V`    | Adds two vectors       |
| Scalar multiplication | `ℝ × V → V`    | Scales a vector        |

Four distinct functions, each with a precise type.

---

## Why This Matters

### 1. Axioms constrain functions

The vector space axioms are **constraints on these functions**. When we say `a · (u + v) = a · u + a · v`, we are saying: the scalar multiplication function distributes over the addition function. This is a relationship between two specific functions.

### 2. Checking whether something is a vector space

To verify that a set V with operations is a vector space, you must:

1. Verify `+` is actually a function `V × V → V` (closure!)
2. Verify `·` is actually a function `F × V → V` (closure!)
3. Check all 8 axioms

The closure conditions (1 and 2) are often forgotten. If `+` can produce something outside V, then `+` is not a function `V × V → V`, and you don't have a vector space.

### 3. This is the foundation for linear maps

A linear map is a function `T: V → W` that respects the operations. The formal statement is:

- `T(u + v) = T(u) + T(v)`
- `T(cv) = cT(v)`

These are statements about function composition. If you don't see operations as functions, you can't see what these equations are actually saying.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on operations as functions. (1) List all four operation-functions in a vector space V over ℝ with their type signatures. (2) Why is 'closure' really just saying that the operation is a well-defined function? (3) Give an example where a set fails to be a vector space because an operation is not closed. (4) Explain how the distributive axiom is a relationship between two functions. Grade me strictly."</div>
</div>

---

## Where People Go Wrong

1. **Treating operations as syntax, not structure.** When you write `u + v`, you're not just performing a calculation — you're applying a function with a specific domain and codomain.

2. **Missing that axioms constrain functions.** The axioms aren't arbitrary rules. They're specific requirements on how these functions behave.

3. **Forgetting closure.** The most basic requirement — that the operation produces an element still in the set — is often overlooked.

4. **Confusing operations across different structures.** Addition in ℝ, addition in ℝ³, and addition in a polynomial space are three different functions. They happen to share the same symbol.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a comprehensive quiz on operations as functions. Cover: (1) writing operation type signatures, (2) explaining closure as a function property, (3) distinguishing between field operations and vector space operations, (4) how axioms constrain functions, (5) why this perspective is needed for understanding linear maps. Include at least 6 questions. Grade and explain."</div>
</div>

---

**Previous:** [[wiki:concrete-vector-spaces]] | **Next:** [[wiki:linear-maps]]
