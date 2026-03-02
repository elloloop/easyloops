# Conditional Probability

## Why This Comes After Probability Foundations

You now have sample spaces, events, and probability assignments.

But so far, every probability is computed over the full sample space. In practice, you often know something has happened and want to update your beliefs.

Conditional probability answers: given that event `B` occurred, what is the probability of event `A`?

This is the mechanism behind Bayesian inference, which is the backbone of how ML models learn from data.

---

## Definition

For events `A` and `B` with `P(B) > 0`:

```
P(A|B) = P(A intersection B) / P(B)
```

Read `P(A|B)` as "the probability of A given B."

---

## What This Means Structurally

Conditioning on `B` restricts the sample space.

Instead of computing over all of `Omega`, you compute only over outcomes in `B`, and renormalize so probabilities sum to 1.

The denominator `P(B)` is the renormalization factor.

---

## Worked Examples

### Example 1: Fair Die

`Omega = {1,2,3,4,5,6}`, each with probability `1/6`.

Let:

- `A = {2,4,6}` (even)
- `B = {4,5,6}` (at least 4)

Then:

- `A intersection B = {4,6}`
- `P(A intersection B) = 2/6 = 1/3`
- `P(B) = 3/6 = 1/2`

So:

```
P(A|B) = (1/3) / (1/2) = 2/3
```

Given the roll is at least 4, there is a 2/3 chance it is even.

Compare with `P(A) = 1/2`. Knowing `B` changed the probability of `A`.

### Example 2: Two Coin Flips

`Omega = {HH, HT, TH, TT}`, each with probability `1/4`.

Let:

- `A = {HH}` (both heads)
- `B = {HH, HT, TH}` (at least one head)

Then:

- `A intersection B = {HH}`
- `P(A intersection B) = 1/4`
- `P(B) = 3/4`

So:

```
P(A|B) = (1/4) / (3/4) = 1/3
```

Given at least one head, the chance both are heads is 1/3, not 1/2.

### Example 3: Medical Test (ML-Style)

A disease affects 1% of users. A test has:

- `P(positive | disease) = 0.95` (sensitivity)
- `P(positive | no disease) = 0.05` (false positive rate)

What is `P(disease | positive)`?

We will solve this with Bayes' theorem below.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 conditional probability questions using finite sample spaces. Include: (1) computing P(A|B) from event definitions on dice and coins, (2) verifying that P(A|B) differs from P(B|A), (3) a case where conditioning does not change the probability, and (4) one ML-style scenario like spam detection. Grade me strictly."</div>
</div>

---

## The Multiplication Rule

Rearranging the definition:

```
P(A intersection B) = P(A|B) * P(B)
```

This is useful when you know the conditional probability but want the joint probability.

By symmetry:

```
P(A intersection B) = P(B|A) * P(A)
```

---

## Law of Total Probability

If events `B_1, B_2, ..., B_n` partition `Omega` (they are disjoint and cover everything), then for any event `A`:

```
P(A) = P(A|B_1)P(B_1) + P(A|B_2)P(B_2) + ... + P(A|B_n)P(B_n)
```

This breaks a hard probability into easier conditional pieces.

### Example

From the medical test:

- `P(disease) = 0.01`, `P(no disease) = 0.99`
- `P(positive | disease) = 0.95`
- `P(positive | no disease) = 0.05`

So:

```
P(positive) = 0.95 * 0.01 + 0.05 * 0.99
            = 0.0095 + 0.0495
            = 0.059
```

About 5.9% of all users test positive.

---

## Bayes' Theorem

Combining the multiplication rule with total probability:

```
P(B|A) = P(A|B) * P(B) / P(A)
```

This flips the direction of conditioning. You know `P(A|B)` and want `P(B|A)`.

### Solving Example 3

```
P(disease | positive) = P(positive | disease) * P(disease) / P(positive)
                      = 0.95 * 0.01 / 0.059
                      = 0.0095 / 0.059
                      = 0.161
```

Even with a positive test, there is only a 16.1% chance of disease. The low base rate (1%) dominates.

This is the base rate fallacy. It is one of the most common probability errors.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 questions on the multiplication rule, law of total probability, and Bayes' theorem. Include: (1) computing joint probabilities from conditionals, (2) applying total probability with a two-part partition, (3) a full Bayes' theorem calculation with a base rate trap, and (4) one ML scenario like spam filtering or anomaly detection. Grade strictly and explain the base rate fallacy if I fall for it."</div>
</div>

---

## Why This Matters for ML

Conditional probability is everywhere in ML:

- **Classification:** `P(class | features)` is literally what a classifier computes
- **Bayesian inference:** updating model beliefs from `P(theta)` to `P(theta | data)` using Bayes' theorem
- **Language models:** next-token prediction is `P(next token | previous tokens)`
- **Naive Bayes:** assumes features are conditionally independent given the class
- **Loss functions:** cross-entropy loss is derived from conditional log-likelihood

The entire path from data to trained model runs through conditional probability.

---

## Where People Go Wrong

### 1. Confusing P(A|B) with P(B|A)

`P(disease | positive)` is not `P(positive | disease)`. Bayes' theorem exists precisely because these are different.

### 2. Ignoring the base rate

A 95%-accurate test on a 1%-prevalence disease still produces mostly false positives. Always account for `P(B)` in the denominator.

### 3. Treating conditional probability as multiplication

`P(A|B)` is not `P(A) * P(B)`. That product gives `P(A intersection B)` only when `A` and `B` are independent.

### 4. Forgetting that conditioning restricts the sample space

`P(A|B)` is not a new probability on the original `Omega`. It is a probability on the restricted space `B`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a comprehensive 12-question exam on conditional probability. Cover: the definition P(A|B), the multiplication rule, law of total probability, Bayes' theorem, base rate fallacy, and the distinction between P(A|B) and P(B|A). Include at least 2 ML-style scenarios (classification, spam filtering, or medical testing). Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:probability-foundations]] | **Next:** [[wiki:random-variables]]
