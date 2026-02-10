# ML Math Roadmap

## The Complete Path

This page summarizes the correct order for learning the mathematics behind machine learning. Each topic builds on the previous one. Skipping steps creates gaps that compound.

---

## The Roadmap

```
Sets → Functions → Fields → Vector Spaces → Linear Maps → Matrices → ML
```

---

## 1. Sets and Notation

**What you learned:** What a set is, membership (∈), subsets (⊆), set operations (∪, ∩, \), Cartesian products (A × B).

**Why it matters:** Everything is built on sets. Functions are defined using sets. Vector spaces are sets with operations.

**Go to:** [[wiki:sets-and-notation]]

---

## 2. Functions (as Mathematical Objects)

**What you learned:** A function is `f: A → B` with domain, codomain, and rule. Functions are sets of ordered pairs with constraints. Codomain ≠ image.

**Why it matters:** Linear maps are functions. Probability distributions are functions. Loss functions are functions.

**Go to:** [[wiki:functions-math]]

---

## 3. Fields

**What you learned:** A field is `(F, +, ·)` satisfying 9 axioms. ℝ and ℚ are fields. ℤ is not. Multiplicative inverses are essential.

**Why it matters:** Scalars come from fields. "Vector space over F" means scalars are from field F.

**Go to:** [[wiki:fields]]

---

## 4. Vector Spaces

**What you learned:** A vector space is `(V, +, ·)` satisfying 8 axioms. Vectors can be tuples, polynomials, functions, or matrices. Geometry is not part of the definition.

**Why it matters:** This is the core structure of linear algebra, which is the core of ML math.

**Go to:** [[wiki:vector-spaces]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Foundations</div>
<div class="copy-prompt-text">Prompt: "I've studied sets, functions, fields, and vector spaces. Give me a 10-question cumulative quiz covering all four topics. Test whether I understand: (1) set membership vs subset, (2) functions as ordered pairs, (3) codomain vs image, (4) which number systems are fields, (5) the vector space axioms, (6) why geometry isn't part of a vector space. Mix conceptual and computational questions. Grade me and tell me which topics to revisit."</div>
</div>

---

## 5. Scalars vs Vectors

**What you learned:** Scalars come from a field, vectors come from a vector space. "Over F" determines which field provides the scalars. The field determines the dimension.

**Go to:** [[wiki:scalars-vs-vectors]]

---

## 6. Concrete Vector Spaces

**What you learned:** ℝⁿ is the set of ordered n-tuples. ℝ² is a vector space, not a field. ℂ is a field (has multiplication), ℝ² is not.

**Go to:** [[wiki:concrete-vector-spaces]]

---

## 7. Operations Are Functions

**What you learned:** Addition is `+: V × V → V`. Scalar multiplication is `·: F × V → V`. Axioms constrain these functions. Closure means the function is well-defined.

**Go to:** [[wiki:operations-as-functions]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Structure</div>
<div class="copy-prompt-text">Prompt: "I've studied scalars vs vectors, concrete vector spaces, and operations as functions. Quiz me with 8 questions: (1) identify scalars vs vectors in a given space, (2) explain why ℝ² is not a field, (3) compare ℂ and ℝ², (4) write operation type signatures, (5) explain closure as a function property, (6-8) true/false on structural properties. Grade me strictly."</div>
</div>

---

## 8. Linear Maps

**What you learned:** A linear map preserves addition and scalar multiplication. Two properties: additivity and homogeneity. Everything else is derived. T(0) = 0 is a consequence, not an axiom.

**Go to:** [[wiki:linear-maps]]

---

## 9. Matrices

**What you learned:** A matrix represents a linear map relative to chosen bases. Matrix multiplication = function composition. The same linear map has different matrices in different bases.

**Go to:** [[wiki:matrices]]

---

## 10. Inner Products, Norms, Geometry

**What you learned:** Geometry is added structure, not inherent. Inner products give angles and orthogonality. Norms give length. Not all norms come from inner products.

**Go to:** [[wiki:inner-products-norms-geometry]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Core ML Math</div>
<div class="copy-prompt-text">Prompt: "I've completed the core math roadmap through linear maps, matrices, and inner products. Give me a 15-question comprehensive exam. Test: (1) linear map properties, (2) matrix construction from linear maps, (3) matrix multiplication as composition, (4) basis dependence, (5) inner product axioms, (6) norm computation, (7) orthogonality, (8) the full hierarchy from sets to geometry. This should be challenging. Grade me and create a personalized study plan based on my errors."</div>
</div>

---

## What Comes Next: ML-Specific Math

Once you have the foundation above, you're ready for:

### Probability Theory

- Sample spaces (sets!)
- Events (subsets!)
- Probability measures (functions!)
- Random variables (functions from sample space to ℝ)
- Distributions, expectations, variance

### Optimization

- Gradients (linear maps from parameter space to ℝ!)
- Gradient descent
- Convexity
- Constrained optimization (Lagrange multipliers)

### Tensors

- Multilinear maps (generalization of linear maps)
- Tensor products
- Tensor decomposition

### Attention Mechanisms

- Query, Key, Value matrices (linear maps!)
- Softmax (function from ℝⁿ to probability simplex)
- Dot-product attention (inner products!)

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Final Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "I've completed the full ML math roadmap: sets → functions → fields → vector spaces → scalars vs vectors → concrete vector spaces → operations as functions → linear maps → matrices → inner products/norms/geometry. Give me a 20-question comprehensive final exam that tests the entire chain. Include connections between topics (e.g., how functions relate to linear maps, how fields relate to scalar multiplication). Grade me rigorously and identify any remaining gaps. This is my final assessment before moving to probability theory and optimization."</div>
</div>

---

## Study Tips

1. **Don't skip steps.** Each topic depends on all previous topics. If fields feel shaky, go back before trying vector spaces.

2. **Use the prompts.** Copy the quiz prompts at the end of each page and paste them into an AI assistant. Test yourself until you get 100%.

3. **Precision matters.** "A vector is an element of a vector space" is correct. "A vector is an arrow" is misleading. Get the language right.

4. **Draw connections.** Every topic reuses concepts from earlier topics. Functions appear everywhere. Sets appear everywhere. If you can see the connections, you understand the math.

5. **Double-click any word.** If you see a term you don't recognize on any page, double-click it to look it up or get an AI prompt to learn about it.
