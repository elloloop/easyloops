# Covariance and Independence

## Why This Page Exists

People often mix up these three ideas:

- dependence
- covariance
- independence

They are related, but not equivalent.

---

## Covariance

Definition:

```
Cov(X,Y) = E[(X-E[X])(Y-E[Y])]
```

Equivalent form:

```
Cov(X,Y) = E[XY] - E[X]E[Y]
```

Interpretation:

- positive covariance: they tend to move together
- negative covariance: they tend to move opposite
- zero covariance: no linear relationship (not the same as independence)

---

## Independence (Discrete Form)

`X` and `Y` are independent if for all values `x, y`:

```
P(X=x, Y=y) = P(X=x)P(Y=y)
```

Equivalent structural statement:

- joint distribution factorizes into marginals

---

## Key Implications You Must Keep Straight

Always true:

```
E[X+Y] = E[X] + E[Y]
```

If independent:

```
E[XY] = E[X]E[Y]
Cov(X,Y)=0
```

Variance identity:

```
Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y)
```

So if independent, then:

```
Var(X+Y)=Var(X)+Var(Y)
```

---

## Example 1: Independent Variables

Flip two independent fair coins.

Let:

- `X=1` if first coin is heads, else `0`
- `Y=1` if second coin is heads, else `0`

Then:

- `P(X=1,Y=1)=1/4`
- `P(X=1)P(Y=1)=1/2 * 1/2 = 1/4`

This factorization holds for all `(x,y)` pairs, so `X` and `Y` are independent.

Hence `Cov(X,Y)=0`.

---

## Example 2: Dependent but Zero Covariance

Let `X` take values `-1, 0, 1` each with probability `1/3`.
Define:

```
Y = X^2
```

Then:

- `E[X]=0`
- `E[Y]=E[X^2]=2/3`
- `E[XY]=E[X^3]=0`

So:

```
Cov(X,Y)=E[XY]-E[X]E[Y]=0-0*(2/3)=0
```

But they are not independent, because `Y` is determined by `X`.

For instance:

- if `X=0`, then `Y=0` with probability 1
- but marginally `P(Y=0)=1/3`

So covariance zero does not imply independence.

---

## What This Means for Variance of Sums

From the identity:

```
Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y)
```

You get equality `Var(X+Y)=Var(X)+Var(Y)` whenever `Cov(X,Y)=0`.

That includes independent cases, and some dependent cases.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 12 covariance/independence questions. Test: (1) covariance definition and equivalent formula, (2) independence factorization checks from small joint tables, (3) which implications are one-way vs two-way, and (4) when variance of a sum reduces to a simple sum. Include at least one dependent-but-zero-covariance example."</div>
</div>

---

## Why This Matters for ML

In ML we often reason about:

- correlations between features
- covariance in gradient noise
- simplifying assumptions that treat terms as independent or uncorrelated

You need to know exactly which assumption is being used.

---

## Where People Go Wrong

### 1. Assuming zero covariance means independence

False in general.

### 2. Assuming variance additivity always holds

It requires `Cov(X,Y)=0`.

### 3. Mixing up dependence with causation

Dependence is distributional structure, not a causal statement.

### 4. Forgetting that expectation linearity is unconditional

`E[X+Y]=E[X]+E[Y]` does not need independence.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Create a strict 15-question exam on covariance and independence for a beginner moving toward ML. Include proof-style true/false items, tiny joint-distribution tables, and conceptual traps (independence vs zero covariance, linearity of expectation, variance of sums). Grade and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:variance]] | **Next:** [[wiki:basic-distributions]]
