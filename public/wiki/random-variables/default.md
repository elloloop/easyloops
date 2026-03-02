# Random Variables

## The Key Correction

A random variable is not "a variable that changes randomly."

A random variable is a function:

```
X: Omega -> R
```

It maps each outcome to a real number.

---

## Structure First

You already have:

- sample space `Omega`
- probability assignment `P`

Now add a function `X` from outcomes to numbers.

Randomness is in which `omega` occurs under `P`.
The function `X` itself is deterministic.

---

## Example 1: Coin Indicator

`Omega = {H, T}`

Define:

- `X(H) = 1`
- `X(T) = 0`

This is a valid random variable.

Interpretation: `X` indicates whether heads happened.

---

## Example 2: Die Value

`Omega = {1,2,3,4,5,6}`

Define:

- `X(omega) = omega`

So:

- `X(1)=1`, ..., `X(6)=6`

This is the usual "rolled number" random variable.

---

## Example 3: Same Outcome Space, Different Variables

Let `Omega = {1,2,3,4,5,6}` for one die.

Define two random variables:

- `X(omega) = omega` (actual rolled value)
- `Y(omega) = 1` if `omega` is even, else `0` (even-indicator)

Same experiment, different functions, different meanings.

---

## Distribution of a Random Variable

`P` is defined on outcomes in `Omega`.
`X` pushes that randomness to numeric values.

For discrete `X`:

```
P(X = x) = sum of P(omega) over all omega with X(omega) = x
```

### Quick example

Fair coin with `X(H)=1`, `X(T)=0`:

- `P(X=1)=0.5`
- `P(X=0)=0.5`

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 random-variable questions. Include: (1) decide whether a given mapping X:Omega->R is valid, (2) build a random variable for coin and die experiments, (3) compute P(X=x) from an outcome-level distribution, and (4) explain why randomness is in P, not in the function X itself. Grade strictly."</div>
</div>

---

## Why This Matters for ML

ML models consume numeric features and produce numeric outputs.

Random variables are how probability theory connects uncertain outcomes to numbers that models can optimize over.

Examples:

- `X`: model input feature
- `Y`: class label
- `L`: loss on one sampled example

---

## Where People Go Wrong

### 1. "Random variable" interpreted as a time-changing symbol

The correct object is a function `X: Omega -> R`.

### 2. Forgetting the domain

`X` is defined on outcomes, not on probabilities directly.

### 3. Confusing one experiment with one random variable

A single experiment can have many different random variables on it.

### 4. Thinking all random variables are identity maps

`X(omega)=omega` is only one possible choice.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 10-question exam on random variables (discrete setting). Cover the function definition X:Omega->R, constructing random variables from experiments, deriving P(X=x), and common misconceptions. Include at least 3 scenario-based ML examples. Grade and explain all mistakes."</div>
</div>

---

**Previous:** [[wiki:conditional-probability]] | **Next:** [[wiki:expectation]]
