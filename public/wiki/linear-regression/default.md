# Linear Regression

## Why This Comes After Optimization

You now have gradient descent and loss functions. Linear regression is the simplest model that puts them together.

It is two parameters, one loss function, and gradient descent. Nothing else.

Every concept from the previous pages (gradient, partial derivatives, update rule) appears here in concrete form.

---

## The Model

```
y_hat = w * x + b
```

- `x`: input feature (a number)
- `w`: weight (learned parameter)
- `b`: bias (learned parameter)
- `y_hat`: predicted output

This is a function from `R -> R` with two trainable parameters.

For multiple features `x_1, ..., x_d`:

```
y_hat = w_1 * x_1 + w_2 * x_2 + ... + w_d * x_d + b
```

Which is a dot product plus bias:

```
y_hat = w . x + b
```

---

## The Loss: Mean Squared Error

Given `N` training examples `(x_i, y_i)`:

```
L(w, b) = (1/N) sum_{i=1}^{N} (y_hat_i - y_i)^2
```

Where `y_hat_i = w * x_i + b`.

This measures the average squared difference between predictions and targets.

---

## Gradients of MSE

For the single-feature case `y_hat = w * x + b`:

```
dL/dw = (2/N) sum_{i=1}^{N} (y_hat_i - y_i) * x_i
dL/db = (2/N) sum_{i=1}^{N} (y_hat_i - y_i)
```

Each partial derivative has a clear interpretation:

- `dL/dw`: how much the loss changes per unit change in `w`
- `dL/db`: how much the loss changes per unit change in `b`

---

## Training

Apply gradient descent:

```
w := w - eta * dL/dw
b := b - eta * dL/db
```

Repeat until the loss is small enough or stops decreasing.

After training, `w` and `b` have final values. The model is now a fixed function `y_hat = w * x + b` that you can use for new predictions.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 linear regression questions. Include: (1) writing the model equation from memory, (2) computing MSE loss for a small dataset, (3) computing the partial derivatives dL/dw and dL/db by hand, (4) performing one gradient descent update step, and (5) explaining what the final trained values of w and b represent geometrically. Grade strictly."</div>
</div>

---

## Why MSE Is Convex

The MSE loss for linear regression is a convex function of `(w, b)`.

This means:

- There is exactly one minimum
- Gradient descent will find it (with appropriate learning rate)
- No local minima traps

This is why linear regression is the ideal first model: it lets you focus on the mechanics of training without worrying about non-convexity.

---

## Connection to Conditional Expectation

The optimal prediction under MSE is `E[Y|X=x]`: the conditional expectation.

Linear regression assumes this conditional expectation is a linear function of `x`. When the assumption holds, linear regression recovers the true relationship.

This connects directly back to the probability track: conditional expectation is the best predictor, and linear regression is the simplest approximation to it.

---

## Why This Matters for ML

- **Simplest complete training pipeline.** Model, loss, gradient, update. Everything that happens in larger models is an elaboration of this.
- **MSE appears everywhere.** Regression losses, reconstruction losses, value function approximation.
- **Two parameters are enough to understand training.** If you can train linear regression by hand, you understand gradient descent.

---

## Where People Go Wrong

### 1. Confusing the model with the training process

`y_hat = wx + b` is the model. MSE is the loss. Gradient descent is the training algorithm. These are three separate things.

### 2. Forgetting that training produces fixed parameters

After training, `w` and `b` are constants. The model is deterministic.

### 3. Thinking more features always helps

More features mean more parameters. With too many features and too few examples, the model overfits.

### 4. Ignoring the linearity assumption

Linear regression assumes `E[Y|X]` is linear. If the true relationship is nonlinear, the model will be systematically wrong.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 12-question exam on linear regression. Cover: the model equation, MSE loss, gradient computation, gradient descent updates, convexity of MSE, the connection to conditional expectation, and the distinction between model, loss, and training algorithm. Include at least 2 problems where I compute gradients and update weights by hand on a tiny dataset. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:optimization-gradient-descent]] | **Next:** [[wiki:logistic-regression]]
