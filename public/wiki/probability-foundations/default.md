# Probability Foundations

## Why This Layer Comes Next

After linear maps and matrices, the next layer for ML is probability.

Why: training data is not a fixed object. It is sampled. Model behavior is evaluated over data distributions, not just single points.

This page keeps things intentionally simple:

- finite sample spaces
- discrete outcomes
- no measure-theory details yet

---

## Core Objects

### 1. Experiment

An experiment is a process with an uncertain outcome.

Examples:

- flip one coin
- roll one die
- show one random user an ad and observe click/no-click

### 2. Outcome

An outcome is one specific result of the experiment.

Examples:

- coin flip outcome: `H`
- die roll outcome: `4`
- ad example outcome: `click`

### 3. Sample Space

The sample space `Omega` is the set of all possible outcomes.

Examples:

- one coin: `Omega = {H, T}`
- one die: `Omega = {1, 2, 3, 4, 5, 6}`
- two coin flips: `Omega = {HH, HT, TH, TT}`

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on experiments, outcomes, and sample spaces. Give me 6 scenarios and ask me to write the sample space for each. Include one coin flip, two coin flips, one die roll, and one practical ML-style scenario like click/no-click. Check my answers strictly."</div>
</div>

---

## Events

An event is a subset of the sample space.

If `Omega = {1,2,3,4,5,6}` for a die, examples of events are:

- `A = {2,4,6}` (even number)
- `B = {5,6}` (value at least 5)
- `C = {1}` (value is exactly 1)

So an event is still a set. This is crucial structure.

---

## Probability on a Finite Sample Space

A probability assignment gives each outcome a number in `[0,1]` and must satisfy:

1. `P(omega) >= 0` for every outcome `omega`
2. `sum P(omega) = 1` over all outcomes
3. for disjoint events `A` and `B`, `P(A union B) = P(A) + P(B)`

For finite spaces:

- `P(A) = sum P(omega)` over `omega in A`

---

## Worked Examples

### Example 1: Fair Coin

`Omega = {H, T}`

- `P(H) = 0.5`
- `P(T) = 0.5`

Event `A = {H}`:

- `P(A) = 0.5`

### Example 2: Fair Die

`Omega = {1,2,3,4,5,6}`, each with probability `1/6`.

Event `A = {2,4,6}` (even):

- `P(A) = 1/6 + 1/6 + 1/6 = 1/2`

Event `B = {5,6}` (at least 5):

- `P(B) = 1/6 + 1/6 = 1/3`

### Example 3: Biased Coin

`Omega = {H, T}`

- `P(H) = 0.7`
- `P(T) = 0.3`

Event `A = {H}`:

- `P(A) = 0.7`

Same sample space as a fair coin, different probability assignment.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 probability-foundations questions on finite sample spaces. Include: computing event probabilities from outcome probabilities, checking whether a proposed probability assignment is valid, and identifying events as subsets of Omega. Use both fair and biased examples. Grade me with explanations."</div>
</div>

---

## Why This Matters for ML

In ML, randomness appears in:

- sampled training examples
- random mini-batches
- random initialization
- stochastic augmentations

Probability gives the language for all of this.

Next step: convert outcomes into numeric quantities with random variables.

---

## Where People Go Wrong

### 1. Treating events as outcomes

An event is a set of outcomes, not one outcome.

### 2. Forgetting total probability must be 1

If outcome probabilities do not sum to 1, it is not a valid model.

### 3. Mixing up sample space and probability assignment

`Omega` tells you what can happen. `P` tells you how likely each outcome is.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a comprehensive 12-question exam on probability foundations (finite/discrete only). Cover experiments, outcomes, sample spaces, events as subsets, valid probability assignments, event probability calculations, and practical ML examples. Grade strictly and explain mistakes."</div>
</div>

---

**Previous:** [[wiki:ml-math-roadmap]] | **Next:** [[wiki:random-variables]]
