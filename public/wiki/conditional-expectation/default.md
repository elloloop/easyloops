# Conditional Expectation

## Why This Comes After Expectation

You know how to compute `E[X]`: the weighted average over all outcomes.

But what if you know something about the situation? If you observe `Y=y`, the probability landscape changes (conditional probability), and so does the expected value of `X`.

Conditional expectation answers: given that `Y=y`, what is the expected value of `X`?

This is the mathematical object behind regression, prediction, and filtering in ML.

---

## Definition (Discrete Case)

For discrete random variables `X` and `Y`:

```
E[X | Y=y] = sum x * P(X=x | Y=y)
```

This is just expectation with conditional probabilities replacing unconditional ones.

For each value `y`, you get a number. As `y` varies, you get a function of `y`.

---

## Example 1: Die Roll with Even/Odd Information

Let `X` be the value of a fair die roll. Let `Y = 1` if even, `Y = 0` if odd.

Compute `E[X | Y=1]` (expected value given even):

- Even outcomes: `{2, 4, 6}`, each with conditional probability `1/3`

```
E[X | Y=1] = 2(1/3) + 4(1/3) + 6(1/3) = 4
```

Compute `E[X | Y=0]` (expected value given odd):

- Odd outcomes: `{1, 3, 5}`, each with conditional probability `1/3`

```
E[X | Y=0] = 1(1/3) + 3(1/3) + 5(1/3) = 3
```

Compare with the unconditional: `E[X] = 3.5`.

Knowing even/odd shifts the expected value up or down.

---

## Example 2: Joint Distribution Table

Suppose `X` takes values `{0, 1}` and `Y` takes values `{0, 1}` with joint distribution:

```
         Y=0    Y=1
X=0      0.3    0.1
X=1      0.2    0.4
```

First, marginals of `Y`:

- `P(Y=0) = 0.3 + 0.2 = 0.5`
- `P(Y=1) = 0.1 + 0.4 = 0.5`

Conditionals:

- `P(X=0 | Y=0) = 0.3/0.5 = 0.6`, `P(X=1 | Y=0) = 0.2/0.5 = 0.4`
- `P(X=0 | Y=1) = 0.1/0.5 = 0.2`, `P(X=1 | Y=1) = 0.4/0.5 = 0.8`

So:

```
E[X | Y=0] = 0(0.6) + 1(0.4) = 0.4
E[X | Y=1] = 0(0.2) + 1(0.8) = 0.8
```

Knowing `Y=1` makes `X=1` much more likely.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 conditional expectation questions in the discrete setting. Include: (1) computing E[X|Y=y] from a joint distribution table, (2) computing conditional probabilities first then the expectation, (3) a case where conditioning does not change the expected value, and (4) verifying the law of total expectation on a small example. Grade strictly."</div>
</div>

---

## E[X|Y] as a Random Variable

A subtle but important point: `E[X|Y]` (without fixing `y`) is itself a random variable.

It is a function of `Y`. Since `Y` is random, `E[X|Y]` is random.

From Example 1:

- `E[X|Y]` equals 4 when `Y=1` and 3 when `Y=0`
- Since `P(Y=1) = P(Y=0) = 1/2`, `E[X|Y]` takes value 4 or 3 each with probability `1/2`

This random variable represents your best prediction of `X` given `Y`.

---

## Law of Total Expectation

The most important identity:

```
E[X] = E[E[X|Y]]
```

The outer expectation is over `Y`:

```
E[X] = sum_y E[X|Y=y] * P(Y=y)
```

### Verification (Example 1)

```
E[E[X|Y]] = E[X|Y=1]*P(Y=1) + E[X|Y=0]*P(Y=0)
           = 4*(1/2) + 3*(1/2)
           = 3.5
           = E[X]
```

This is the conditional-expectation analog of the law of total probability.

It says: averaging your conditional predictions over all conditions recovers the unconditional expectation.

---

## Example 3: Two-Step Experiment

A bag has 3 red and 2 blue balls. Draw one ball. If red, roll a fair die. If blue, roll a loaded die where each face has probability: `P(k) = k/21` for `k=1,...,6`.

Let `X` = die value, `Y` = ball color (R or B).

Step 1: conditional expectations.

```
E[X | Y=R] = (1+2+3+4+5+6)/6 = 3.5
E[X | Y=B] = 1(1/21) + 2(2/21) + 3(3/21) + 4(4/21) + 5(5/21) + 6(6/21)
           = (1+4+9+16+25+36)/21
           = 91/21
           = 13/3
```

Step 2: law of total expectation.

```
E[X] = E[X|Y=R]*P(R) + E[X|Y=B]*P(B)
     = 3.5*(3/5) + (13/3)*(2/5)
     = 21/10 + 26/15
     = 63/30 + 52/30
     = 115/30
     = 23/6
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 questions on conditional expectation as a random variable and the law of total expectation. Include: (1) identifying E[X|Y] as a function of Y, (2) computing E[E[X|Y]] both ways and verifying equality, (3) a two-step experiment where you must condition on an intermediate variable, and (4) an ML-style example like expected loss conditioned on class label. Grade strictly."</div>
</div>

---

## Why This Matters for ML

Conditional expectation is the central object in supervised learning:

- **Regression:** the regression function `f(x) = E[Y|X=x]` is literally the conditional expectation of the target given features
- **Optimal prediction:** `E[Y|X]` minimizes mean squared error among all functions of `X`
- **Loss decomposition:** expected loss decomposes via the law of total expectation across classes, batches, or subgroups
- **Tower property:** in reinforcement learning, `E[E[reward | state, action] | state]` chains expectations across time steps
- **Bias-variance:** the bias-variance decomposition starts from `E[loss | X]`

If expectation is the language of averages, conditional expectation is the language of prediction.

---

## Where People Go Wrong

### 1. Treating E[X|Y=y] as a number vs E[X|Y] as a random variable

`E[X|Y=y]` is a number (for fixed `y`). `E[X|Y]` is a random variable (function of `Y`). These are different objects.

### 2. Forgetting to use conditional probabilities

`E[X|Y=y]` uses `P(X=x|Y=y)`, not `P(X=x)`. The weights change when you condition.

### 3. Confusing E[X|Y] with E[X]*E[Y]

Conditional expectation has nothing to do with multiplying expectations. That is a product rule for independent variables.

### 4. Thinking the law of total expectation is trivial

It is not. It says you can break a hard expectation into easier conditional pieces. This decomposition strategy is used throughout ML.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 12-question exam on conditional expectation. Cover: the definition E[X|Y=y], E[X|Y] as a random variable, the law of total expectation, two-step experiments, and the connection to regression. Include at least 2 joint distribution table problems and 2 ML scenarios. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:expectation]] | **Next:** [[wiki:variance]]
