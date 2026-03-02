# Logistic Regression

## Why This Comes After Linear Regression

Linear regression predicts continuous values. But many ML tasks require predicting categories: spam or not spam, disease or healthy, class A or class B.

Logistic regression modifies linear regression to output a probability between 0 and 1.

---

## The Model

Start with the same linear combination:

```
z = w * x + b
```

Then pass it through the sigmoid function:

```
sigma(z) = 1 / (1 + e^(-z))
```

So the full model is:

```
y_hat = sigma(w * x + b)
```

### Sigmoid Properties

- Output range: `(0, 1)` — always a valid probability
- `sigma(0) = 0.5`
- Large positive `z`: `sigma(z)` approaches 1
- Large negative `z`: `sigma(z)` approaches 0
- Monotonically increasing: larger `z` means higher probability

### Interpretation

`y_hat = P(class = 1 | x)`: the model's estimated probability that the input belongs to class 1.

Decision rule: predict class 1 if `y_hat > 0.5`, else class 0.

---

## The Loss: Binary Cross-Entropy

MSE is not ideal for probability outputs. Instead, logistic regression uses binary cross-entropy (BCE):

```
L(w, b) = -(1/N) sum_{i=1}^{N} [y_i log(y_hat_i) + (1 - y_i) log(1 - y_hat_i)]
```

Where `y_i in {0, 1}` is the true label and `y_hat_i` is the predicted probability.

### Why This Loss Works

When `y_i = 1`:

```
loss_i = -log(y_hat_i)
```

If `y_hat_i` is close to 1 (correct), loss is small. If `y_hat_i` is close to 0 (wrong), loss is huge.

When `y_i = 0`:

```
loss_i = -log(1 - y_hat_i)
```

If `y_hat_i` is close to 0 (correct), loss is small. If `y_hat_i` is close to 1 (wrong), loss is huge.

The loss heavily penalizes confident wrong predictions.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 logistic regression questions. Include: (1) computing sigmoid values by hand, (2) computing BCE loss for a small dataset, (3) explaining why MSE is not ideal for classification, (4) interpreting y_hat as a probability, and (5) explaining the decision boundary. Grade strictly."</div>
</div>

---

## Gradients of BCE

The gradient has a surprisingly clean form. For `y_hat = sigma(w*x + b)`:

```
dL/dw = (1/N) sum_{i=1}^{N} (y_hat_i - y_i) * x_i
dL/db = (1/N) sum_{i=1}^{N} (y_hat_i - y_i)
```

This looks almost identical to the linear regression gradient. The difference is that `y_hat_i` now passes through the sigmoid.

Training is the same gradient descent loop:

```
w := w - eta * dL/dw
b := b - eta * dL/db
```

---

## Still a Two-Parameter Model

For a single input feature, logistic regression has exactly two parameters: `w` and `b`.

The sigmoid adds nonlinearity but does not add parameters. It is a fixed function applied to the linear output.

---

## Connection to Conditional Probability

Logistic regression models `P(Y=1|X=x)` directly.

This connects to Bayes' theorem: under certain assumptions about the data distribution, the log-odds of `P(Y=1|X)` are linear in `X`. Logistic regression is the model that captures this structure.

---

## Why This Matters for ML

- **Classification is the most common ML task.** Logistic regression is the simplest classifier.
- **Cross-entropy is the standard classification loss.** It appears in neural networks, language models, and everywhere classification happens.
- **Sigmoid and softmax are everywhere.** Sigmoid handles two classes. Softmax (its multi-class generalization) appears in attention mechanisms and language model outputs.
- **Bridge to neural networks.** A neural network's final layer for classification is logistic regression applied to the last hidden layer's output.

---

## Where People Go Wrong

### 1. Calling it regression when it does classification

The name is historical. Logistic "regression" is a classification model.

### 2. Using MSE for classification

MSE creates flat gradients when predictions are confidently wrong. Cross-entropy does not have this problem.

### 3. Confusing the linear part with the model

The model is not `z = wx + b`. The model is `sigma(wx + b)`. The sigmoid is part of the model.

### 4. Forgetting that output is a probability

`y_hat = 0.7` means "70% chance of class 1." It is not a score or a distance.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 12-question exam on logistic regression. Cover: the sigmoid function, BCE loss, gradient computation, the decision boundary, why cross-entropy is preferred over MSE for classification, the connection to conditional probability, and the relationship between logistic regression and neural network output layers. Include at least 2 computation problems. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:linear-regression]] | **Next:** [[wiki:neural-networks]]
