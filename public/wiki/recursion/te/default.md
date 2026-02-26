# Recursion

## Recursion ante enti?

**Recursion** ante oka programming technique. Function thane thanani call cheskuntundi problem solve cheyadaniki. Big problem ni small similar subproblems ga break chesi, base case varaku simplify chestham.

## Key Components

### 1. Base Case

Stopping condition - idi lekunda infinite recursion avtundi. Program crash avthundi.

### 2. Recursive Case

Function thane thanani call chesukune part. Modified input tho base case vaipu move avtundi.

### 3. Progress

Prathi recursive call base case ki closer ga vellali.

## Basic Structure

```
function recursive_function(input):
    if base_case:
        return result
    else:
        return recursive_function(modified_input)
```

## Call Stack Ela Work Chesthundo

Prathi function call stack lo add avtundi. Base case reach ayyaka, reverse order lo resolve avthayi (LIFO).

```
factorial(3)
  → 3 * factorial(2)
      → 2 * factorial(1)
          → 1 * factorial(0)
              → 1 (base case)
```

## Enduku Use Cheyali?

Recursion ee problems ki best:

- **Tree/Graph Traversal**: Hierarchical structures navigate cheyadam
- **Divide and Conquer**: Sorting algorithms
- **Backtracking**: Puzzles solve cheyadam
- **Mathematical Sequences**: Fibonacci, factorials
- **Nested Structures**: Files, folders process cheyadam

## Advantages

1. **Clean Code**: Iteration kante simple and elegant
2. **Natural Solution**: Konni problems ki naturally fit avtundi
3. **Less Code**: Code complexity thagguthundi

## Disadvantages

1. **Memory Usage**: Stack space ekkuva use avtundi
2. **Performance**: Function call overhead
3. **Stack Overflow**: Too many calls ante crash
4. **Debugging**: Trace cheyadam kashtam

## Common Mistakes

1. **Base Case Missing**: Infinite loop, crash
2. **Wrong Base Case**: Never reach avvadu
3. **No Progress**: Base case vaipu move avvadu
4. **Too Deep**: Stack overflow

## Optimization

### Memoization

Results cache chesi redundant calculations avoid cheyochu.

### Tail Recursion

Last operation recursive call aithe better (Python lo auto-optimize avvadu kani).

---

_Note: Ee page inka development stage lo undi._
