# Neural Networks

## Why This Comes After Logistic Regression

Linear and logistic regression are single-layer models. They can only learn linear decision boundaries.

Neural networks stack multiple layers of transformations, allowing them to learn nonlinear relationships. But the training mechanism is the same: loss function, gradients, gradient descent.

The key addition is backpropagation: applying the chain rule layer by layer to compute gradients for all parameters.

---

## The Neuron

A single neuron computes:

```
output = activation(w . x + b)
```

Where:

- `x`: input vector (from previous layer or raw input)
- `w`: weight vector (one weight per input)
- `b`: bias (scalar)
- `w . x + b`: weighted sum (a linear operation)
- `activation`: a nonlinear function (sigmoid, ReLU, etc.)

A neuron is logistic regression if the activation is sigmoid. It is a linear unit if there is no activation.

---

## Layers

A layer is a collection of neurons that all receive the same input.

### Key Properties

- Neurons in the same layer do not communicate with each other
- Each neuron has its own weights and bias
- In a fully connected (dense) layer, every neuron receives the output of every neuron in the previous layer

### Layer as Matrix Operation

A fully connected layer with `d_in` inputs and `d_out` neurons:

```
z = W x + b
```

Where:

- `W` is a `d_out x d_in` weight matrix
- `b` is a `d_out` bias vector
- `x` is a `d_in` input vector
- `z` is a `d_out` output vector

Then apply activation element-wise:

```
h = activation(z)
```

This is a linear map (matrix multiplication) followed by a nonlinear function.

---

## Network Architecture

A neural network chains multiple layers:

```
input -> Layer 1 -> Layer 2 -> ... -> Layer L -> output
```

- **Input layer:** raw features (not trainable)
- **Hidden layers:** intermediate representations (trainable)
- **Output layer:** final prediction (trainable)

The output layer determines the task:

- Regression: no activation (or identity), MSE loss
- Binary classification: sigmoid activation, BCE loss
- Multi-class classification: softmax activation, cross-entropy loss

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 neural network architecture questions. Include: (1) describing what a single neuron computes, (2) writing the matrix equation for a fully connected layer, (3) counting the number of parameters in a given architecture, (4) explaining why neurons in the same layer don't communicate, and (5) choosing the right output activation and loss for different tasks. Grade strictly."</div>
</div>

---

## Why Nonlinearity Matters

Without activation functions, stacking layers is useless:

```
W_2 (W_1 x + b_1) + b_2 = (W_2 W_1) x + (W_2 b_1 + b_2)
```

This is just another linear map. No matter how many layers, the network collapses to a single linear layer.

Nonlinear activations break this. They allow the network to represent functions that linear models cannot.

### Common Activations

- **ReLU:** `max(0, z)` — simple, fast, default choice for hidden layers
- **Sigmoid:** `1/(1 + e^(-z))` — output layer for binary classification
- **Softmax:** normalizes a vector to a probability distribution — output layer for multi-class

---

## Backpropagation

Training a neural network means computing `dL/dtheta` for every parameter `theta` in every layer.

Backpropagation does this using the chain rule, working backward from the output:

### Step 1: Forward Pass

Compute the output layer by layer:

```
h_0 = x (input)
z_1 = W_1 h_0 + b_1
h_1 = activation(z_1)
z_2 = W_2 h_1 + b_2
h_2 = activation(z_2)
...
y_hat = final output
loss = L(y_hat, y)
```

### Step 2: Backward Pass

Apply the chain rule from output to input:

```
dL/dz_L = dL/dy_hat * dy_hat/dz_L
dL/dW_L = dL/dz_L * h_{L-1}^T
dL/db_L = dL/dz_L
dL/dh_{L-1} = W_L^T * dL/dz_L
```

Then repeat for layer `L-1`, `L-2`, etc.

Each weight gets its own gradient. The chain rule multiplies Jacobians backward through the network — exactly as described in the multivariable calculus page.

### Step 3: Update

Apply gradient descent to every parameter:

```
W_l := W_l - eta * dL/dW_l
b_l := b_l - eta * dL/db_l
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 backpropagation questions. Include: (1) tracing a forward pass through a 2-layer network with given weights, (2) computing dL/dz at the output layer, (3) applying the chain rule to get gradients for hidden layer weights, (4) explaining why activations must be stored during the forward pass, and (5) explaining why stacking linear layers without activation collapses to one layer. Grade strictly."</div>
</div>

---

## Why This Matters for ML

- **Neural networks are the foundation of modern ML.** Language models, image classifiers, speech recognition — all are neural networks.
- **Backpropagation is how they learn.** Without it, computing gradients for millions of parameters would be intractable.
- **Architecture choices encode assumptions.** Fully connected layers assume no spatial structure. Convolutional layers assume locality. Attention layers assume relevance scoring.
- **Everything connects back.** Neurons use linear algebra (matrix multiplication). Training uses calculus (chain rule). Loss functions use probability (cross-entropy, likelihood). The entire math roadmap converges here.

---

## Where People Go Wrong

### 1. Thinking neurons are biological

Artificial neurons are weighted sums plus activations. The biological analogy is loose.

### 2. Believing deeper always means better

More layers add parameters and complexity. Without enough data, deeper networks overfit.

### 3. Forgetting that backpropagation is just the chain rule

There is no special "backpropagation algorithm" separate from calculus. It is the chain rule applied systematically.

### 4. Ignoring the forward pass during backward

Backpropagation needs activations from the forward pass. This is why all intermediate values must be stored in memory.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 15-question exam on neural networks. Cover: neuron computation, layer matrix equations, parameter counting, why nonlinearity is essential, backpropagation mechanics (forward pass, backward pass, chain rule), choosing activations and loss functions for different tasks, and the connection to linear algebra and calculus. Include at least 3 problems where I trace values through a small network. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:logistic-regression]] | **Next:** [[wiki:batching-and-memory]]
