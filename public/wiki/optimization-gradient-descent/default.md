# Optimization and Gradient Descent

## Why This Comes After Multivariable Calculus

You now have gradients, the chain rule, and Jacobians. You know how a function changes when its inputs change.

Optimization asks: given a loss function `L(theta)`, how do you find the parameters `theta` that minimize it?

The answer is gradient descent: repeatedly move in the direction of `-nabla L`.

---

## Parameters (theta)

In ML, `theta` represents all trainable parameters of a model:

- In linear regression: `theta = (w, b)`
- In a neural network: `theta` includes all weights and biases across all layers

`theta` is a vector in `R^n` where `n` is the total number of parameters.

---

## Loss Functions

A loss function maps parameters to a scalar measuring how bad the model is:

```
L: R^n -> R
```

`L(theta)` takes a parameter vector and returns a single number.

Training means finding:

```
theta* = argmin_theta L(theta)
```

The parameters that minimize the loss.

---

## The Gradient of the Loss

Since `L: R^n -> R`, its gradient is:

```
nabla L(theta) = (dL/dtheta_1, dL/dtheta_2, ..., dL/dtheta_n)
```

Each component tells you how the loss changes when you adjust one parameter.

---

## Gradient Descent

The update rule:

```
theta_new = theta_old - eta * nabla L(theta_old)
```

Where `eta` (eta) is the learning rate, a positive scalar chosen as a hyperparameter.

### What This Does

1. Compute `nabla L(theta)` at the current parameters
2. Move in the direction of steepest decrease (`-nabla L`)
3. Scale the step by `eta`
4. Repeat

Each weight gets updated using its own partial derivative:

```
theta_i := theta_i - eta * dL/dtheta_i
```

---

## Learning Rate

The learning rate `eta` controls step size:

- Too large: overshoots the minimum, loss diverges
- Too small: converges extremely slowly
- Just right: steady decrease toward minimum

Choosing `eta` is one of the most important practical decisions in training.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 questions on gradient descent. Include: (1) writing the update rule from memory, (2) computing one gradient descent step for a simple 2-parameter function, (3) explaining what happens when the learning rate is too large or too small, (4) why each parameter gets its own partial derivative, and (5) the difference between parameters and hyperparameters. Grade strictly."</div>
</div>

---

## Convexity

A function `f` is convex if for all `x, y` and `t in [0,1]`:

```
f(tx + (1-t)y) <= t f(x) + (1-t) f(y)
```

Geometrically: the line segment between any two points on the graph lies above the graph.

### Why Convexity Matters

- Convex functions have a single global minimum (no local minima traps)
- Gradient descent on convex functions is guaranteed to converge
- Linear regression loss (MSE) is convex
- Neural network loss is not convex (multiple local minima exist)

In practice, gradient descent works well on neural networks despite non-convexity. But understanding convexity tells you when you have guarantees and when you do not.

---

## Stochastic Gradient Descent (SGD)

Computing `nabla L` over the entire dataset is expensive. Instead:

1. Sample a random subset (mini-batch) of training examples
2. Compute the gradient on that subset
3. Update parameters

The gradient estimate is noisy but unbiased: on average, it points in the right direction.

This connects back to probability: the mini-batch gradient is a random variable whose expectation equals the full gradient.

---

## Why This Matters for ML

- **Every ML model is trained by optimization.** Understanding gradient descent means understanding training.
- **Loss function choice determines what the model learns.** Different losses encode different goals.
- **Learning rate is the most common source of training failure.** Too high and nothing works. Too low and nothing finishes.
- **SGD introduces randomness.** Mini-batch sampling makes the gradient a random variable, connecting optimization directly to probability theory.

---

## Where People Go Wrong

### 1. Confusing loss function with model

The model computes predictions. The loss function measures how bad those predictions are. They are different objects.

### 2. Thinking gradient descent finds the global minimum

Only guaranteed for convex functions. For neural networks, it finds a local minimum (which is often good enough).

### 3. Treating all parameters as one number

Each parameter has its own partial derivative and its own update. The gradient is a vector, not a scalar.

### 4. Forgetting that learning rate is not learned

The learning rate is a hyperparameter set by the engineer, not a parameter learned by the model.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 12-question exam on optimization and gradient descent for ML. Cover: the update rule, learning rate effects, convexity, the difference between gradient descent and SGD, loss functions as functions from parameter space to R, and why each weight gets its own gradient component. Include at least 2 computation problems with simple functions. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:multivariable-calculus]] | **Next:** [[wiki:linear-regression]]
