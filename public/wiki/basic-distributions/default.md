# Basic Distributions for ML

## Why Distributions Matter

A random variable tells you how outcomes map to numbers.
A distribution tells you how likely those numbers are.

In ML, choosing a distribution is choosing a data/noise model.

---

## 1) Bernoulli Distribution

Use when outcome is binary (0/1).

```
X ~ Bernoulli(p)
P(X=1)=p, P(X=0)=1-p
```

Key moments:

- `E[X]=p`
- `Var(X)=p(1-p)`

ML examples:

- click vs no-click
- spam vs not spam
- token present vs absent

---

## 2) Binomial Distribution

Use when counting successes in `n` independent Bernoulli trials.

```
X ~ Binomial(n,p)
```

Interpretation:

- run `n` binary trials
- count number of 1s

Key moments:

- `E[X]=np`
- `Var(X)=np(1-p)`

ML examples:

- number of positive labels in a mini-batch
- number of correct predictions in `n` independent checks

---

## 3) Categorical Distribution

Use for one draw from `k` classes.

If classes are `1,...,k` with probabilities `p1,...,pk` and `sum pi = 1`:

```
P(X=i)=pi
```

ML examples:

- next-token class before sampling
- multi-class label generation
- softmax output interpreted as class probabilities

---

## 4) Discrete Uniform Distribution

All values in a finite set are equally likely.

Example:

- fair die on `{1,2,3,4,5,6}`

ML examples:

- random index sampling from a fixed range
- uniform random tie-breaking

---

## 5) Gaussian (Normal) Distribution (Preview)

This is the most common continuous distribution in ML.

Parameters:

- mean `mu`
- variance `sigma^2`

You can think of it as "bell-shaped noise around a center."

We are not doing continuous-density calculus here yet. For now, keep the role clear: many ML models assume approximately Gaussian noise in practice.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 15 concept-first questions on basic distributions for ML. Include Bernoulli, Binomial, Categorical, Discrete Uniform, and a conceptual Gaussian preview. Ask me to pick the right distribution for each scenario and justify the choice. Keep arithmetic light and reasoning heavy. Grade strictly."</div>
</div>

---

## Distribution Selection by Question Type

Ask these in order:

1. Is the outcome binary, multi-class, count, or continuous?
2. Is this one trial or many repeated trials?
3. If many trials, can independence be reasonably assumed?
4. Do I need a count (`Binomial`) or one class draw (`Categorical`)?

---

## Connection Back to Earlier Pages

- random variable gives numeric mapping
- expectation gives average behavior
- variance gives spread
- covariance/independence control interaction between variables

A distribution is the source object that makes all of those quantities computable.

---

## Easy-to-Understand View of What Comes Next

With this probability layer, you can now read core ML statements like:

- "minimize expected loss"
- "estimate gradients from random mini-batches"
- "reduce gradient variance"

Next math layer after this sequence is optimization.

---

## Where People Go Wrong

### 1. Using Bernoulli for counts

Bernoulli is one binary trial. Counts over many trials are Binomial.

### 2. Confusing Categorical with Binomial

Categorical = one draw over many classes.
Binomial = count of successes across repeated binary trials.

### 3. Treating Gaussian as "for everything" without assumptions

It is common, but still a modeling choice.

### 4. Skipping probability-model assumptions

Model quality depends on whether the chosen distribution is plausible for the data.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 20-question final exam for this probability block (random variables, expectation, variance, covariance/independence, and basic distributions). Emphasize structural understanding and model-selection reasoning for ML scenarios. Keep calculations short; make conceptual traps explicit. Grade and build a weakness-based study plan."</div>
</div>

---

**Previous:** [[wiki:covariance-and-independence]] | **Next:** [[wiki:multivariable-calculus]]
