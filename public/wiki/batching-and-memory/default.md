# Batching and Memory

## Why This Comes After Neural Networks

You now understand how a neural network is trained: forward pass, compute loss, backward pass, update weights.

But in practice, datasets have millions of examples and models have billions of parameters. You cannot process everything at once.

Batching controls how many examples you process together. Memory determines how large a model you can train.

---

## Batching

### What a Batch Is

A batch is a subset of training examples processed together in one forward-backward pass.

- **Batch size:** the number of examples in the subset

### Training Loop with Batches

```
for each epoch:
    shuffle the dataset
    for each batch of size B:
        1. forward pass: compute y_hat for all B examples
        2. compute individual losses
        3. take the mean: L = (1/B) sum losses
        4. backward pass: compute gradient of mean loss
        5. update weights once
```

One pass through the entire dataset = one epoch.

### Why Not Use the Full Dataset?

Computing the gradient over all `N` examples is expensive. With batches:

- Each update uses only `B` examples
- More updates per epoch (N/B updates instead of 1)
- Each gradient estimate is noisy but unbiased

This is stochastic gradient descent (SGD), introduced in the optimization page.

---

## Batch Size Tradeoffs

### Small Batches (e.g., 1-32)

- Noisy gradient estimates
- More frequent updates
- Lower memory usage
- Can escape shallow local minima (noise helps exploration)

### Large Batches (e.g., 256-4096)

- More stable gradient estimates
- Fewer updates per epoch
- Higher memory usage
- Better hardware utilization (GPUs parallelize batch computation)

### The Practical Default

Most training uses batch sizes between 32 and 512. The exact value is tuned empirically.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 8 batching questions. Include: (1) computing how many gradient updates occur per epoch given dataset size and batch size, (2) explaining why we take the mean loss over a batch, (3) comparing small vs large batch tradeoffs, (4) explaining why the mini-batch gradient is an unbiased estimator, and (5) distinguishing between batch size, epoch, and iteration. Grade strictly."</div>
</div>

---

## Memory During Training

Training a neural network requires storing three things in memory:

### 1. Model Parameters

All weights and biases across all layers.

For a model with `P` parameters in float32 (4 bytes each):

```
parameter memory = P * 4 bytes
```

### 2. Activations (Forward Pass)

During the forward pass, every layer's output must be saved. Backpropagation needs these values to compute gradients.

Activation memory depends on:

- Batch size (more examples = more activations)
- Network depth (more layers = more stored tensors)
- Layer width (wider layers = larger tensors)

### 3. Gradients and Optimizer State

- One gradient value per parameter (same size as parameters)
- Optimizers like Adam store additional state (momentum, variance) — typically 2x parameter size

### Total Training Memory

Rough estimate for Adam optimizer:

```
training memory = parameters + activations + gradients + optimizer state
                ~ P*4 + activations + P*4 + P*8
                = P*16 + activations
```

For float32, training requires roughly 4x the memory of just storing the parameters.

---

## Large Model Example: 7B Parameters

A model with 7 billion parameters:

```
parameter memory = 7B * 4 bytes = 28 GB (float32)
```

Just the weights alone require 28 GB of VRAM.

With optimizer state and gradients:

```
training memory > 28 * 4 = 112 GB
```

Plus activations. This is why large models require multiple GPUs.

---

## Where Do the Parameters Come From?

A transformer layer with hidden size `d = 4096` contains:

- Self-attention: `Q, K, V` projection matrices, each `d x d` = 16M parameters per matrix
- Output projection: another `d x d` = 16M
- Feed-forward: two layers, typically `d x 4d` and `4d x d` = 2 * 67M = 134M
- Plus biases, layer norms, etc.

One transformer layer: roughly 200M parameters.

A 7B model has approximately 32-36 such layers, plus embeddings.

---

## Techniques for Reducing Memory

### Mixed Precision Training

Use float16 (2 bytes) instead of float32 for most operations. Halves memory for parameters and activations.

### Gradient Checkpointing

Instead of storing all activations, recompute them during the backward pass. Trades compute time for memory.

### Model Parallelism

Split the model across multiple GPUs. Each GPU holds a portion of the parameters.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me 10 questions on batching and memory in neural network training. Include: (1) computing parameter memory for a given model size, (2) explaining why activations must be stored during training but not inference, (3) estimating total training memory with Adam optimizer, (4) computing parameters in a transformer layer given hidden size, (5) explaining the tradeoffs of gradient checkpointing and mixed precision. Grade strictly."</div>
</div>

---

## Why This Matters for ML

- **Batch size is a hyperparameter that affects convergence.** It is not just an engineering detail.
- **Memory is the hard constraint on model scale.** You cannot train a model that does not fit in memory.
- **Understanding parameter counts demystifies large models.** A 7B model is 7 billion floating-point numbers being updated by gradient descent. That is all.
- **Practical ML requires thinking about hardware.** The math is necessary but not sufficient. Memory, compute, and data pipeline determine what you can actually train.

---

## Where People Go Wrong

### 1. Thinking batch size only affects speed

Batch size affects gradient noise, convergence behavior, and generalization. It is not just a speed knob.

### 2. Confusing inference memory with training memory

Inference only needs parameters and one set of activations. Training needs parameters, all activations (for backpropagation), gradients, and optimizer state.

### 3. Counting parameters wrong

A `d x d` matrix has `d^2` parameters, not `d`. A model with 100 layers does not have 100 parameters.

### 4. Assuming more VRAM is the only solution

Gradient checkpointing, mixed precision, and model parallelism can reduce memory requirements significantly before adding hardware.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "Give me a 12-question exam on batching and memory. Cover: batch training loops, SGD as mini-batch gradient descent, memory breakdown (parameters, activations, gradients, optimizer state), parameter counting for fully connected and transformer layers, large model memory estimation, and memory reduction techniques. Include at least 2 estimation problems for specific model sizes. Grade strictly and explain every mistake."</div>
</div>

---

**Previous:** [[wiki:neural-networks]] | **Next:** [[wiki:ml-math-roadmap]]
