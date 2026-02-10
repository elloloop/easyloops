# Sets and Notation

## What is a Set?

A **set** is a collection of distinct objects, considered as a single entity. The objects inside a set are called **elements** or **members**.

Sets are the foundation of all modern mathematics. Every structure you will encounter — functions, vector spaces, fields — is built on sets.

### Key Point

A set can contain _anything_: numbers, letters, other sets, functions, matrices, or even abstract symbols. Sets are **not** limited to numbers.

**Examples:**

- `A = {1, 2, 3}` — a set of three numbers
- `B = {a, b, c}` — a set of three letters
- `C = { {1,2}, {3,4} }` — a set whose elements are themselves sets
- The empty set `∅ = {}` — contains no elements

---

## Membership: x ∈ A

The symbol `∈` means "is an element of."

- `3 ∈ {1, 2, 3}` — true
- `4 ∈ {1, 2, 3}` — false (written `4 ∉ {1, 2, 3}`)

Membership is a **binary question**: an element is either in the set or it is not. There is no "partially in."

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about sets and membership (∈). Quiz me with 5 true/false questions about whether specific elements belong to given sets. Include at least one set that contains non-numeric elements and one that contains other sets. After I answer, explain any I got wrong."</div>
</div>

---

## Subsets: ⊂ and ⊆

A set `A` is a **subset** of `B` (written `A ⊆ B`) if every element of `A` is also an element of `B`.

- `{1, 2} ⊆ {1, 2, 3}` — true
- `{1, 4} ⊆ {1, 2, 3}` — false (because `4 ∉ {1, 2, 3}`)

**⊂ vs ⊆:**

- `A ⊆ B` means A is a subset of B (A could equal B)
- `A ⊂ B` means A is a **proper** subset of B (A is inside B but A ≠ B)

**Critical distinction:** `∈` and `⊆` are completely different operations.

- `1 ∈ {1, 2, 3}` — element membership
- `{1} ⊆ {1, 2, 3}` — set containment

`1` is not the same as `{1}`. The number 1 is an element. The set `{1}` is a set containing one element.

---

## Set Operations

### Union: A ∪ B

Everything in A, or in B, or in both.

`{1, 2} ∪ {2, 3} = {1, 2, 3}`

### Intersection: A ∩ B

Everything in both A and B.

`{1, 2, 3} ∩ {2, 3, 4} = {2, 3}`

### Set Difference: A \ B

Everything in A that is **not** in B.

`{1, 2, 3} \ {2} = {1, 3}`

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on subsets and set operations. Give me 5 problems involving ⊆, ⊂, ∪, ∩, and \. Make sure to include one problem that tests whether I confuse ∈ (membership) with ⊆ (subset). After I answer, correct me and explain the difference if I got confused."</div>
</div>

---

## Cartesian Product: A × B

The **Cartesian product** of sets A and B is the set of all ordered pairs `(a, b)` where `a ∈ A` and `b ∈ B`.

`{1, 2} × {x, y} = {(1,x), (1,y), (2,x), (2,y)}`

### Key Facts:

- The result is a set of **ordered pairs**, not individual elements
- `A × B ≠ B × A` in general (order matters in pairs)
- `|A × B| = |A| · |B|` (the size is the product of the sizes)

### Common Mistake

The Cartesian product does **not** imply any mapping or function between A and B. It is just the set of all possible pairings. A function from A to B will be a specific _subset_ of `A × B` (with extra constraints).

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I learned about Cartesian products. Give me 3 exercises: (1) compute a Cartesian product of two small sets, (2) determine the size of a Cartesian product without listing all pairs, (3) a true/false question about whether Cartesian product implies a function. Explain each answer thoroughly."</div>
</div>

---

## Where People Go Wrong

1. **Thinking sets only contain numbers.** Sets can contain anything — functions, other sets, symbols, matrices.

2. **Confusing ∈ and ⊆.** `3 ∈ {1,2,3}` is true. `3 ⊆ {1,2,3}` is meaningless (3 is not a set). `{3} ⊆ {1,2,3}` is true.

3. **Thinking Cartesian product implies a mapping.** `A × B` is just all possible pairs. A function picks specific pairs with constraints.

4. **Forgetting the empty set.** `∅` is a subset of every set. `∅ ⊆ A` is always true, for any set A.

---

## Why This Matters

If sets are shaky, everything that follows will be confusing:

- **Functions** are defined using sets
- **Vector spaces** are sets with operations
- **Fields** are sets with two operations
- **Probability spaces** are sets with measures

Master sets before moving on.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 10-question quiz covering all of sets and notation: membership (∈), subsets (⊂, ⊆), union, intersection, set difference, Cartesian products, and the empty set. Mix true/false, computation, and conceptual questions. Grade me after and identify which concepts I need to review."</div>
</div>

---

**Next topic:** [[wiki:functions-math]]
