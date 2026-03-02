# Expectation

## What Expectation Is

In the discrete setting, expectation is a weighted average.

For a random variable `X` on finite `Omega`:

```
E[X] = sum X(omega) P(omega)
```

Equivalent value-based form:

```
E[X] = sum x P(X = x)
```

Both say the same thing.

---

## Example 1: Coin Indicator

Let `X(H)=1`, `X(T)=0`, with `P(H)=0.5`, `P(T)=0.5`.

Then:

```
E[X] = 1*0.5 + 0*0.5 = 0.5
```

Interpretation: long-run fraction of heads.

---

## Example 2: Fair Die Value

`X(omega)=omega` for `omega in {1,2,3,4,5,6}`, each with probability `1/6`.

```
E[X] = (1+2+3+4+5+6)/6 = 3.5
```

Expected value can be non-integer even when outcomes are integers.

---

## Example 3: Non-Uniform Distribution

Suppose `Omega = {1,2,3}` and:

- `P(1)=0.2`, `P(2)=0.3`, `P(3)=0.5`
- `X(1)=5`, `X(2)=7`, `X(3)=9`

Then:

```
E[X] = 5(0.2) + 7(0.3) + 9(0.5) = 7.6
```

---

## Linearity of Expectation (Critical)

For random variables `X, Y` and scalar `a`:

```
E[X + Y] = E[X] + E[Y]
E[aX] = aE[X]
E[aX + b] = aE[X] + b
```

This is always true whenever expectations exist.

No independence assumption is required for linearity.

---

## Independence: What It Is and What It Is Not Used For

Independence is relevant for products, not sums.

If `X` and `Y` are independent, then:

```
E[XY] = E[X]E[Y]
```

But:

```
E[X + Y] = E[X] + E[Y]
```

holds even when `X` and `Y` are dependent.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 expectation questions in discrete probability. Include weighted-average computations, value-form vs outcome-form expectation, linearity of expectation, and whether independence is needed in each statement. Use conceptual questions, not only arithmetic. Grade strictly."</div>
</div>

---

## Expectation of Transformed Variables

You will need this immediately for variance.

If `g` is a numeric function:

```
E[g(X)] = sum g(X(omega)) P(omega)
```

or equivalently

```
E[g(X)] = sum g(x) P(X=x)
```

Special case you will use next:

```
E[X^2]
```

---

## Why This Matters for ML

Many ML objectives are expectations:

- expected loss
- expected risk
- expected gradient estimates in stochastic training

Linearity is the reason we can decompose sums of losses cleanly.

---

## Where People Go Wrong

### 1. Treating expectation as "most likely value"

Expectation is an average, not necessarily the mode.

### 2. Assuming linearity needs independence

It does not.

### 3. Mixing up `E[X^2]` and `(E[X])^2`

They are generally different.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a rigorous 12-question exam on expectation. Cover discrete definitions, transformed expectations, linearity, and the distinction between E[X^2] and (E[X])^2. Include at least 4 conceptual true/false statements that test independence confusion. Grade and explain."</div>
</div>

---

**Previous:** [[wiki:random-variables]] | **Next:** [[wiki:conditional-expectation]]
