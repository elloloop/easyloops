# Variance

## What Variance Measures

Variance measures spread around the expectation.

Definition:

```
Var(X) = E[(X - E[X])^2]
```

Equivalent computational form:

```
Var(X) = E[X^2] - (E[X])^2
```

The second form is often easier to compute.

---

## Example 1: Bernoulli-Type Variable

Let `X` be 1 with probability `p` and 0 with probability `1-p`.

Then:

- `E[X] = p`
- `E[X^2] = p` (because `X^2 = X` for 0/1 values)

So:

```
Var(X) = p - p^2 = p(1-p)
```

---

## Example 2: Custom Discrete Variable

Use the same setup:

- `X(1)=5`, `X(2)=7`, `X(3)=9`
- `P(1)=0.2`, `P(2)=0.3`, `P(3)=0.5`

You already have:

- `E[X]=7.6`

Compute second moment:

```
E[X^2] = 25(0.2) + 49(0.3) + 81(0.5) = 60.2
```

Then:

```
Var(X) = 60.2 - (7.6)^2 = 60.2 - 57.76 = 2.44
```

---

## Example 3: Constant Random Variable

If `X=c` always, then all outcomes are exactly at the mean.

So:

```
Var(X)=0
```

This is a useful sanity check.

---

## Variance of Sums

General rule:

```
Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y)
```

Special case (independent `X, Y`):

```
Var(X+Y) = Var(X) + Var(Y)
```

Important: independence is sufficient, not necessary. The sum rule also holds whenever `Cov(X,Y)=0`.

---

## Scaling and Shifting

For constants `a, b`:

```
Var(aX + b) = a^2 Var(X)
```

So:

- adding a constant does not change variance
- scaling by `a` multiplies variance by `a^2`

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a 12-question quiz on variance. Include: (1) compute variance from both formulas, (2) interpret variance conceptually, (3) apply Var(aX+b)=a^2Var(X), (4) decide when Var(X+Y)=Var(X)+Var(Y) is valid, and (5) identify mistakes like confusing E[X^2] with (E[X])^2. Grade strictly."</div>
</div>

---

## Why This Matters for ML

Variance appears in:

- noisy gradient estimates
- uncertainty in model outputs
- bias-variance tradeoffs

Understanding spread is necessary before talking about stable optimization.

---

## Where People Go Wrong

### 1. Thinking variance is the same as expectation

Expectation is center. Variance is spread.

### 2. Forgetting the square

Variance is about squared deviation, not raw deviation.

### 3. Assuming sum-variance rule without conditions

You need either independence or zero covariance.

### 4. Believing variance can be negative

Variance is always nonnegative.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a rigorous variance exam with 10 conceptual questions and 6 computation questions. Cover both formulas, variance of sums, covariance term, and scaling/shifting behavior. Emphasize structural understanding over arithmetic drill. Grade and explain."</div>
</div>

---

**Previous:** [[wiki:conditional-expectation]] | **Next:** [[wiki:covariance-and-independence]]
