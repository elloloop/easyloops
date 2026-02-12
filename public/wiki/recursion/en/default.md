# Recursion

## What is Recursion?

**Recursion** is a programming technique where a function calls itself to solve a problem. It breaks down a complex problem into smaller, similar subproblems until reaching a simple base case.

## Key Components

### 1. Base Case

The stopping condition that prevents infinite recursion. Without it, the function would call itself forever.

### 2. Recursive Case

The part where the function calls itself with a modified input, moving closer to the base case.

### 3. Progress Toward Base Case

Each recursive call must make progress toward the base case.

## Basic Structure

```
function recursive_function(input):
    if base_case_condition:
        return base_case_result
    else:
        return recursive_function(modified_input)
```

## How Recursion Works

### Call Stack

Each function call is added to the call stack. When the base case is reached, calls are resolved in reverse order (LIFO - Last In, First Out).

```
factorial(3)
  → 3 * factorial(2)
      → 2 * factorial(1)
          → 1 * factorial(0)
              → 1 (base case)
          → 1
      → 2
  → 6
```

## When to Use Recursion

Recursion is ideal for problems that can be broken into similar subproblems:

- **Tree/Graph Traversal**: Navigating hierarchical structures
- **Divide and Conquer**: Merge sort, quick sort
- **Backtracking**: Solving puzzles, finding paths
- **Mathematical Sequences**: Fibonacci, factorials
- **Nested Structures**: JSON parsing, file systems

## Advantages

1. **Elegant Code**: Often simpler and cleaner than iterative solutions
2. **Natural Fit**: Matches the problem structure for some algorithms
3. **Less Code**: Can reduce code complexity

## Disadvantages

1. **Memory Usage**: Each call uses stack space
2. **Performance**: Function call overhead
3. **Stack Overflow**: Too many recursive calls can crash the program
4. **Harder to Debug**: Can be difficult to trace execution

## Recursion vs Iteration

| Aspect      | Recursion              | Iteration           |
| ----------- | ---------------------- | ------------------- |
| Code        | Often simpler          | Can be more complex |
| Memory      | Uses call stack        | Uses less memory    |
| Performance | Function call overhead | Generally faster    |
| Termination | Base case              | Loop condition      |

## Common Pitfalls

### 1. Missing Base Case

Results in infinite recursion and stack overflow.

### 2. Incorrect Base Case

Function never reaches it or reaches it incorrectly.

### 3. Not Making Progress

Recursive calls don't move toward the base case.

### 4. Excessive Recursion Depth

Too many recursive calls exhaust stack memory.

## Optimization Techniques

### Tail Recursion

When the recursive call is the last operation, some compilers can optimize it.

### Memoization

Cache results of function calls to avoid redundant calculations.

### Convert to Iteration

For simple cases, iterative solutions may be more efficient.

## Related Concepts

- [[wiki:functions]] - Function basics
- [[wiki:stack]] - Call stack mechanism
- [[wiki:algorithms]] - Recursive algorithms
- [[wiki:data-structures]] - Recursive data structures
