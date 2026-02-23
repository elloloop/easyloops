# Probability Theory

## Why Probability Theory?

You've built the full chain: sets, functions, fields, vector spaces, linear maps, matrices, inner products. Now it's time to add **uncertainty**.

Machine learning is fundamentally about making predictions from data, and data is uncertain. Probability theory is the mathematical framework for reasoning about uncertainty — and it's built entirely on the concepts you already know.

- A **sample space** is a set
- An **event** is a subset
- A **probability measure** is a function
- A **random variable** is a function

If those definitions feel familiar, that's the point. Everything connects back.

---

## Sample Spaces

A **sample space** `S` (also written `\u03A9`) is the set of all possible outcomes of an experiment or process.

**Examples:**

- Coin flip: `S = {H, T}`
- Die roll: `S = {1, 2, 3, 4, 5, 6}`
- Two coin flips: `S = {HH, HT, TH, TT}`
- Temperature tomorrow: `S = \u211D` (any real number)

### Key Facts:

- The sample space is **just a set** — nothing more
- It must contain **every** possible outcome
- The outcomes must be **mutually exclusive** — exactly one outcome occurs
- The sample space can be finite, countably infinite, or uncountably infinite

### Discrete vs Continuous

- **Discrete:** finite or countably infinite outcomes (dice, coins, counting)
- **Continuous:** uncountably infinite outcomes (measurements, time, real-valued quantities)

This distinction matters because it determines whether we use **sums** or **integrals** to compute probabilities.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about sample spaces. Give me 5 experiments and ask me to write the sample space for each. Include: (1) rolling two dice, (2) drawing a card from a deck, (3) measuring someone's height, (4) counting the number of emails received in a day, (5) flipping a coin until you get heads. After I answer, explain whether each is discrete or continuous and correct any errors."</div>
</div>

---

## Events

An **event** is a **subset** of the sample space.

If `S = {1, 2, 3, 4, 5, 6}` (die roll):

- `A = {2, 4, 6}` — the event "roll an even number"
- `B = {1, 2, 3}` — the event "roll 3 or less"
- `S` itself — the **certain event** (something always happens)
- `\u2205` — the **impossible event** (nothing happens)

### Set Operations on Events

Since events are sets, all set operations apply — and they have probabilistic meanings:

| Set Operation  | Notation  | Probabilistic Meaning     |
| -------------- | --------- | ------------------------- |
| Union          | `A \u222A B`   | A or B (or both) occurs   |
| Intersection   | `A \u2229 B`   | Both A and B occur        |
| Complement     | `A\u1d9c` or `S \ A` | A does not occur    |
| Set difference | `A \ B`   | A occurs but B does not   |

**Example:**

With `A = {2, 4, 6}` and `B = {1, 2, 3}`:

- `A \u222A B = {1, 2, 3, 4, 6}`
- `A \u2229 B = {2}`
- `A\u1d9c = {1, 3, 5}`

### Mutually Exclusive Events

Events A and B are **mutually exclusive** (disjoint) if `A \u2229 B = \u2205`. They cannot both happen.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on events as subsets. Given S = {1, 2, 3, 4, 5, 6} for a die roll: (1) Write the event 'roll greater than 4' as a set. (2) If A = {1,3,5} and B = {2,3,4}, compute A \u222A B, A \u2229 B, and A\u1d9c. (3) Are A and B mutually exclusive? Why? (4) What event does \u2205 represent? (5) What event does S represent? Grade me and explain."</div>
</div>

---

## Probability Measures

A **probability measure** is a function:

```
P: \ud835\udcab(S) \u2192 [0, 1]
```

where `\ud835\udcab(S)` is the **power set** of S (the set of all subsets of S — i.e., the set of all events).

P must satisfy three axioms:

### Axiom 1: Non-negativity

```
P(A) \u2265 0 for every event A
```

### Axiom 2: Normalization

```
P(S) = 1
```

The probability that *something* happens is 1.

### Axiom 3: Countable Additivity

For any countable collection of **mutually exclusive** events `A\u2081, A\u2082, A\u2083, ...`:

```
P(A\u2081 \u222A A\u2082 \u222A A\u2083 \u222A ...) = P(A\u2081) + P(A\u2082) + P(A\u2083) + ...
```

If events can't overlap, the probability of their union is the sum of their individual probabilities.

### Key Insight

That's all probability is. Three axioms, one function, one set. Everything else — Bayes' theorem, conditional probability, distributions — is derived from these three axioms.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I learned the 3 axioms of probability (Kolmogorov axioms). Quiz me: (1) State all three axioms precisely. (2) For a fair die, verify that P({1}) = 1/6 is consistent with the axioms. (3) If P(A) = 0.3 and P(B) = 0.5, and A and B are mutually exclusive, what is P(A \u222A B)? (4) What is P(\u2205) and why? Derive it from the axioms. (5) Why must P(A) \u2264 1? Derive it from the axioms. Grade me strictly."</div>
</div>

---

## Consequences of the Axioms

From just three axioms, we can derive:

### Complement Rule

```
P(A\u1d9c) = 1 - P(A)
```

**Proof:** S = A \u222A A\u1d9c, and A and A\u1d9c are mutually exclusive. By axiom 3: P(S) = P(A) + P(A\u1d9c). By axiom 2: 1 = P(A) + P(A\u1d9c).

### Inclusion-Exclusion

```
P(A \u222A B) = P(A) + P(B) - P(A \u2229 B)
```

We subtract `P(A \u2229 B)` because it gets counted twice — once in P(A) and once in P(B).

### Monotonicity

If `A \u2286 B`, then `P(A) \u2264 P(B)`.

### Probability of the Empty Set

```
P(\u2205) = 0
```

---

## Random Variables

A **random variable** is a function:

```
X: S \u2192 \u211D
```

It takes an outcome from the sample space and assigns it a real number.

### Key Insight

A random variable is **not** a variable. It is a **function**. The name is historical and misleading.

**Example:**

Roll two dice. Let X = sum of the dice.

- S = {(1,1), (1,2), ..., (6,6)} — 36 outcomes
- X((1,1)) = 2
- X((3,4)) = 7
- X((6,6)) = 12

X maps each outcome (an element of S) to a number. It is a function `X: S \u2192 \u211D`.

### Events from Random Variables

We write `{X = 5}` as shorthand for `{s \u2208 S : X(s) = 5}`. This is a **subset** of S — an event. So `P(X = 5)` means `P({s \u2208 S : X(s) = 5})`.

Similarly:

- `{X \u2264 3}` means `{s \u2208 S : X(s) \u2264 3}` — an event
- `{X > 0}` means `{s \u2208 S : X(s) > 0}` — an event

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I learned that a random variable is a function X: S \u2192 \u211D. Quiz me: (1) For flipping two coins with S = {HH, HT, TH, TT}, define X = number of heads and list all values X takes. (2) Compute the set {X = 1} as a subset of S. (3) If all outcomes are equally likely, compute P(X = 1). (4) True or false: a random variable is a variable. Explain. (5) Why is P(X = 5) really P of a set? Grade me."</div>
</div>

---

## Probability Distributions

A **probability distribution** describes how probabilities are assigned across the values of a random variable.

### Discrete Distributions

For a discrete random variable, the **probability mass function** (PMF) is:

```
p(x) = P(X = x)
```

Properties:

- `p(x) \u2265 0` for all x
- `\u2211 p(x) = 1` (sum over all possible values)

**Example — Fair die:**

```
p(1) = p(2) = p(3) = p(4) = p(5) = p(6) = 1/6
```

### Continuous Distributions

For a continuous random variable, the **probability density function** (PDF) is `f(x)` where:

```
P(a \u2264 X \u2264 b) = \u222b\u2090\u1d47 f(x) dx
```

Properties:

- `f(x) \u2265 0` for all x
- `\u222b f(x) dx = 1` (integral over all values)

### Critical Distinction

For continuous distributions, `P(X = x) = 0` for any specific value x. Probabilities are only defined over **intervals**. This surprises many people but follows directly from how integrals work.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on probability distributions. (1) Write the PMF for a fair coin flip where X = 1 for heads and X = 0 for tails. (2) Verify that the PMF satisfies both properties. (3) For a continuous random variable, why is P(X = 3.5) = 0? (4) True or false: a PDF value f(x) represents the probability at x. (5) What is the difference between a PMF and a PDF? Grade me."</div>
</div>

---

## Expected Value (Mean)

The **expected value** of a random variable is the probability-weighted average of its values.

### Discrete:

```
E[X] = \u2211 x \u00b7 P(X = x)
```

### Continuous:

```
E[X] = \u222b x \u00b7 f(x) dx
```

**Example — Fair die:**

```
E[X] = 1\u00b7(1/6) + 2\u00b7(1/6) + 3\u00b7(1/6) + 4\u00b7(1/6) + 5\u00b7(1/6) + 6\u00b7(1/6) = 21/6 = 3.5
```

### Linearity of Expectation

For any random variables X and Y, and constants a, b:

```
E[aX + b] = aE[X] + b
E[X + Y] = E[X] + E[Y]
```

This holds **regardless** of whether X and Y are independent. This is one of the most powerful and frequently used properties in probability and ML.

---

## Variance

**Variance** measures how spread out a random variable's values are around its mean.

```
Var(X) = E[(X - E[X])\u00b2]
```

Equivalent formula (often easier to compute):

```
Var(X) = E[X\u00b2] - (E[X])\u00b2
```

### Standard Deviation

```
\u03c3(X) = \u221a(Var(X))
```

The standard deviation has the same units as X, making it more interpretable than variance.

### Properties:

- `Var(X) \u2265 0` always
- `Var(aX + b) = a\u00b2 Var(X)` — shifting by b doesn't change spread; scaling by a scales variance by a\u00b2
- If X and Y are **independent**: `Var(X + Y) = Var(X) + Var(Y)`

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on expected value and variance. (1) Compute E[X] for X = number of heads in 2 fair coin flips. (2) Compute Var(X) for the same random variable. (3) If E[X] = 5 and Var(X) = 2, what is E[3X + 1] and Var(3X + 1)? (4) Why does linearity of expectation NOT require independence? (5) Why does Var(X + Y) = Var(X) + Var(Y) require independence? Grade me and explain."</div>
</div>

---

## Conditional Probability

The **conditional probability** of A given B is:

```
P(A | B) = P(A \u2229 B) / P(B)    (provided P(B) > 0)
```

This is the probability of A occurring, given that we know B has occurred.

### Intuition

When we condition on B, we are **shrinking the sample space** from S to B. We then ask: what fraction of B does A occupy?

### The Chain Rule

From the definition:

```
P(A \u2229 B) = P(A | B) \u00b7 P(B) = P(B | A) \u00b7 P(A)
```

---

## Bayes' Theorem

Rearranging the chain rule gives **Bayes' theorem**:

```
P(A | B) = P(B | A) \u00b7 P(A) / P(B)
```

### The Terms:

| Term       | Name            | Meaning                             |
| ---------- | --------------- | ----------------------------------- |
| `P(A \| B)` | Posterior       | Updated belief about A after seeing B |
| `P(B \| A)` | Likelihood      | How likely is B if A is true        |
| `P(A)`     | Prior           | Initial belief about A              |
| `P(B)`     | Evidence        | Overall probability of B            |

### Why Bayes' Theorem Matters for ML

- **Bayesian inference** updates model beliefs given data
- **Naive Bayes classifiers** apply Bayes' theorem directly
- **MAP estimation** finds the most probable parameters given data
- The entire framework of **posterior \u221d likelihood \u00d7 prior** comes from this single equation

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on conditional probability and Bayes' theorem. (1) A bag has 3 red and 2 blue balls. You draw one without looking. Given that it's red, what's P(red)? Now draw a second ball without replacement. What's P(second is blue | first is red)? (2) A medical test has 99% sensitivity and 95% specificity. The disease prevalence is 1%. Use Bayes' theorem to compute the probability of having the disease given a positive test. (3) Name each term in Bayes' theorem. Grade me."</div>
</div>

---

## Independence

Two events A and B are **independent** if:

```
P(A \u2229 B) = P(A) \u00b7 P(B)
```

Equivalently: `P(A | B) = P(A)` — knowing B gives no information about A.

### Common Mistake

**Mutually exclusive \u2260 independent.** These are completely different concepts.

- **Mutually exclusive:** `A \u2229 B = \u2205` — they cannot both happen
- **Independent:** knowing one happened doesn't change the probability of the other

If A and B are mutually exclusive and both have nonzero probability, they are **not** independent. If A happened, you know B didn't — so `P(B | A) = 0 \u2260 P(B)`.

---

## Where People Go Wrong

1. **Not realizing probability is built on sets.** Every probability concept uses sets and functions. If your set theory is weak, probability will feel arbitrary.

2. **Thinking a random variable is a variable.** It's a function from the sample space to \u211D. The word "variable" is misleading.

3. **Confusing P(X = x) in discrete vs continuous.** In discrete: P(X = x) > 0 is typical. In continuous: P(X = x) = 0 always. Use intervals and densities instead.

4. **Confusing mutually exclusive with independent.** Mutually exclusive events that have nonzero probability are always **dependent**, not independent.

5. **Applying variance addition without checking independence.** `Var(X + Y) = Var(X) + Var(Y)` only when X and Y are independent. Linearity of expectation, on the other hand, always holds.

6. **Misusing Bayes' theorem.** The hardest part is correctly identifying the prior, likelihood, and evidence. Most errors come from swapping P(A|B) and P(B|A).

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 15-question comprehensive exam on probability theory. Cover: (1) sample spaces as sets, (2) events as subsets, (3) the three probability axioms, (4) deriving the complement rule from axioms, (5) random variables as functions, (6) PMF vs PDF, (7) expected value computation, (8) linearity of expectation, (9) variance computation and properties, (10) conditional probability, (11) Bayes' theorem with a real-world problem, (12) independence vs mutual exclusivity, (13) why P(X = x) = 0 for continuous distributions, (14-15) connections to earlier topics (sets, functions, fields). Grade me rigorously and identify which concepts need review."</div>
</div>

---

**Previous:** [[wiki:inner-products-norms-geometry]] | **Next:** [[wiki:ml-math-roadmap]]
