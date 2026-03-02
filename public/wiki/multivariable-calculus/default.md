# Multivariable Calculus Foundations

## Why This Comes After Probability

You now have the full probability toolkit: sample spaces, conditional probability, random variables, expectation, variance, covariance, distributions.

But ML models have parameters. Training means adjusting those parameters to minimize a loss function. That requires knowing how a function changes when you change its inputs.

Multivariable calculus gives you that machinery: partial derivatives, gradients, and the chain rule.

---

## Partial Derivatives

For a function `f: R^n -> R`, the partial derivative with respect to `x_i` measures how `f` changes when you vary `x_i` alone, holding all other variables fixed.

Notation:

```
df/dx_i  or  f_{x_i}
```

### Example

Let `f(x, y) = x^2 y + 3y`.

```
df/dx = 2xy        (treat y as constant)
df/dy = x^2 + 3    (treat x as constant)
```

At the point `(2, 1)`:

```
df/dx = 2(2)(1) = 4
df/dy = 4 + 3 = 7
```

So increasing `x` slightly increases `f` by about 4 per unit. Increasing `y` increases `f` by about 7 per unit.

---

## The Gradient

The gradient collects all partial derivatives into a single vector:

```
nabla f = (df/dx_1, df/dx_2, ..., df/dx_n)
```

For `f: R^n -> R`, the gradient `nabla f` is a vector in `R^n`.

### Example

For `f(x, y) = x^2 y + 3y`:

```
nabla f = (2xy, x^2 + 3)
```

At `(2, 1)`:

```
nabla f = (4, 7)
```

---

## Direction of the Gradient

The gradient points in the direction of steepest increase of `f`.

- Moving in the direction of `nabla f` increases `f` fastest
- Moving in the direction of `-nabla f` decreases `f` fastest

This is why gradient descent uses `-nabla f`: to minimize loss, move opposite to the gradient.

---

## Directional Derivative

The directional derivative measures the rate of change of `f` in an arbitrary direction `u` (a unit vector):

```
D_u f = nabla f . u
```

This is the dot product of the gradient and the direction.

Special cases:

- `u` aligned with `nabla f`: maximum rate of increase
- `u` opposite to `nabla f`: maximum rate of decrease
- `u` perpendicular to `nabla f`: zero rate of change (you are moving along a level curve)

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 multivariable calculus questions. Include: (1) computing partial derivatives of polynomial and exponential functions, (2) evaluating gradients at specific points, (3) determining the direction of steepest descent, (4) computing directional derivatives, and (5) identifying when the directional derivative is zero. Grade strictly."</div>
</div>

---

## The Chain Rule

### Single Variable Review

For `y = f(g(x))`:

```
dy/dx = f'(g(x)) * g'(x)
```

### Multivariable Chain Rule

If `f` depends on variables that themselves depend on other variables, the chain rule computes the total derivative.

For `z = f(x, y)` where `x = x(t)` and `y = y(t)`:

```
dz/dt = (df/dx)(dx/dt) + (df/dy)(dy/dt)
```

More generally, for composed functions `f(g(x))` where `g: R^n -> R^m` and `f: R^m -> R`:

```
d(f . g)/dx_j = sum_i (df/dg_i)(dg_i/dx_j)
```

This is matrix multiplication. And this structure is exactly what backpropagation computes.

---

## The Jacobian Matrix

For a vector-valued function `F: R^n -> R^m`, the derivative is not a single number or vector. It is a matrix.

The Jacobian `J` is an `m x n` matrix:

```
J_{ij} = dF_i / dx_j
```

Row `i` contains the partial derivatives of the `i`-th output. Column `j` contains the effect of the `j`-th input on all outputs.

### Special Cases

- `f: R^n -> R` (scalar output): the Jacobian is a `1 x n` row vector, which is the gradient transposed
- `f: R -> R^m` (scalar input): the Jacobian is an `m x 1` column vector

### Composition = Matrix Multiplication

For `F = G . H` where `H: R^n -> R^k` and `G: R^k -> R^m`:

```
J_F = J_G * J_H
```

The Jacobian of a composition is the product of the Jacobians.

This is the mathematical foundation of backpropagation: each layer has a Jacobian, and the chain rule multiplies them together.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 questions on the chain rule and Jacobian matrices. Include: (1) applying the multivariable chain rule to a two-layer composition, (2) writing out a Jacobian for a function R^2 -> R^3, (3) verifying that the gradient is a special case of the Jacobian, (4) computing the Jacobian of a composition by matrix multiplication, and (5) explaining why backpropagation is the chain rule applied layer by layer. Grade strictly."</div>
</div>

---

## Why This Matters for ML

Every concept here maps directly to training neural networks:

- **Partial derivatives:** each weight gets its own gradient component
- **Gradient:** the full direction for updating all parameters at once
- **Steepest descent:** gradient descent moves in the direction of `-nabla L`
- **Chain rule:** backpropagation computes gradients layer by layer using the chain rule
- **Jacobian:** each layer's derivative is a Jacobian matrix; the full network gradient is their product

Without multivariable calculus, gradient descent is a recipe you follow. With it, you understand why it works.

---

## Where People Go Wrong

### 1. Computing partial derivatives incorrectly

When computing `df/dx`, every variable except `x` must be treated as a constant. `y` terms do not disappear; they become constant multipliers.

### 2. Confusing gradient direction with descent direction

The gradient points toward steepest increase. Descent moves in the opposite direction: `-nabla f`.

### 3. Forgetting that the Jacobian generalizes the gradient

The gradient is for `f: R^n -> R`. The Jacobian is for `F: R^n -> R^m`. They are not separate concepts; one is a special case of the other.

### 4. Treating the chain rule as simple multiplication

The multivariable chain rule involves sums of products (or matrix multiplication). It is not just "multiply the derivatives."

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 15-question exam on multivariable calculus for ML. Cover: partial derivatives, gradients, directional derivatives, the multivariable chain rule, Jacobian matrices, and the connection to backpropagation. Include at least 3 computation problems and 3 conceptual questions about why these tools matter for training neural networks. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:basic-distributions]] | **Next:** [[wiki:optimization-gradient-descent]]
