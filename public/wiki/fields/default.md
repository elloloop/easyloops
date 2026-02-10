# Fields

## Why Fields Matter

This is the **first real blocker** for most people studying math for ML. Many engineers skip this topic entirely and then struggle with vector spaces, linear algebra, and optimization.

A field is the answer to: _"What kind of numbers can I use as scalars?"_

---

## What is a Field?

A **field** is a set `F` together with two operations (`+` and `·`) that satisfy specific axioms.

Formally: `(F, +, ·)` where:

- `F` is a set
- `+: F × F → F` (addition)
- `·: F × F → F` (multiplication)

Both operations are **functions** (recall the previous topic — these are precise mathematical functions).

---

## The Field Axioms

### Addition axioms:

1. **Associativity:** `(a + b) + c = a + (b + c)`
2. **Commutativity:** `a + b = b + a`
3. **Identity:** There exists `0 ∈ F` such that `a + 0 = a`
4. **Inverses:** For every `a ∈ F`, there exists `-a ∈ F` such that `a + (-a) = 0`

### Multiplication axioms:

5. **Associativity:** `(a · b) · c = a · (b · c)`
6. **Commutativity:** `a · b = b · a`
7. **Identity:** There exists `1 ∈ F` (with `1 ≠ 0`) such that `a · 1 = a`
8. **Inverses:** For every `a ∈ F` with `a ≠ 0`, there exists `a⁻¹ ∈ F` such that `a · a⁻¹ = 1`

### Distributivity:

9. `a · (b + c) = a · b + a · c`

That's it. Nine axioms, two operations, one set.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned the 9 field axioms. Give me a set with two operations and ask me to check each axiom one by one to determine if it forms a field. Start with something simple like ({0, 1}, +, ·) with addition and multiplication modulo 2. Walk me through it step by step, then ask me to try one on my own."</div>
</div>

---

## Examples

### ℝ (Real Numbers) — IS a field

The real numbers with standard addition and multiplication satisfy all nine axioms. Every nonzero real number has a multiplicative inverse (1/a).

### ℚ (Rational Numbers) — IS a field

Same reasoning. Every nonzero rational p/q has inverse q/p, which is also rational.

### ℂ (Complex Numbers) — IS a field

Complex numbers `a + bi` with complex addition and multiplication satisfy all axioms. The inverse of `a + bi` is `(a - bi)/(a² + b²)`.

### ℤ (Integers) — NOT a field

The integers fail axiom 8. The number 2 has no multiplicative inverse in ℤ: there is no integer `n` such that `2 · n = 1`.

This is the most common source of confusion. People assume "numbers = field." They don't.

### ℝ \ {0} (nonzero reals) — NOT a field

This set is not closed under addition: `3 + (-3) = 0`, but `0` is not in `ℝ \ {0}`. So addition doesn't even produce valid outputs. The additive identity is missing.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 5 sets-with-operations and ask me to determine which ones are fields and which are not. Include: (1) ℤ with standard operations, (2) ℚ with standard operations, (3) {0, 1} with mod-2 arithmetic, (4) ℝ \ {0} with standard operations, and (5) a surprise example. For each, I need to identify which specific axiom fails if it's not a field."</div>
</div>

---

## Why Multiplicative Inverses Matter

The multiplicative inverse requirement (axiom 8) is what separates fields from other algebraic structures.

- Without inverses, you cannot **divide**
- Without division, you cannot **solve equations** like `ax = b` for `x`
- Without solving equations, linear algebra doesn't work

When we say a vector space is "over a field F," we mean: the scalars come from F, and we can divide by any nonzero scalar. This is essential for concepts like:

- Normalizing vectors
- Computing matrix inverses
- Solving systems of equations
- Gradient descent (dividing by learning rate)

---

## Where People Go Wrong

1. **Never learning what a field is.** Many linear algebra courses skip this entirely and just say "use real numbers." This creates confusion later when you encounter complex numbers, finite fields, or abstract algebra.

2. **Assuming "numbers = field."** The integers are NOT a field. A set of numbers is not automatically a field.

3. **Missing why inverses are required.** Without multiplicative inverses, most of linear algebra breaks down.

4. **Confusing the field with the vector space.** The field provides the scalars. The vector space provides the vectors. These are different objects.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Test me on fields with a 8-question exam. Include: (1) state all 9 field axioms from memory, (2) prove ℤ is not a field by identifying the failing axiom, (3) explain why ℝ\{0} is not a field, (4) verify ℚ is a field, (5) explain why multiplicative inverses matter for linear algebra, (6-8) three true/false questions about field properties. Grade me strictly and explain any mistakes."</div>
</div>

---

**Previous:** [[wiki:functions-math]] | **Next:** [[wiki:vector-spaces]]
