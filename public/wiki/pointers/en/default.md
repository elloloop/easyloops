# Pointers

## What are Pointers?

A **pointer** is a variable that stores the memory address of another variable. Pointers are a powerful feature in programming that allow direct memory manipulation and efficient data handling.

## Basic Concept

Instead of holding a value directly, a pointer holds the location (address) where a value is stored in memory.

```
Variable: x = 42
Memory Address: 0x1000

Pointer: ptr → 0x1000 (points to x)
```

## Why Use Pointers?

- **Efficiency**: Pass large data without copying
- **Dynamic Memory**: Allocate and manage memory at runtime
- **Data Structures**: Build linked lists, trees, graphs
- **Function Modification**: Allow functions to modify caller's variables
- **Low-level Control**: Direct hardware and memory access

## Key Operations

### 1. Declaration

Declare a pointer variable to hold an address.

### 2. Address-of Operator

Get the memory address of a variable.

### 3. Dereference Operator

Access the value at the memory address.

### 4. Null Pointer

A pointer that doesn't point to any valid memory location.

## Common Use Cases

### Dynamic Memory Allocation

Allocate memory during program execution based on runtime needs.

### Arrays and Strings

Efficiently work with collections of data.

### Function Arguments

Pass addresses to allow functions to modify original data.

### Data Structures

Implement linked lists, trees, and graphs where nodes reference each other.

## Pointer Arithmetic

Pointers can be incremented or decremented to traverse memory:

- Moving to the next element in an array
- Navigating through data structures

## Safety Considerations

- **Null Pointer Dereferencing**: Accessing a null pointer causes crashes
- **Dangling Pointers**: Pointers to freed memory
- **Memory Leaks**: Forgetting to free allocated memory
- **Buffer Overflows**: Writing beyond allocated memory

## Related Concepts

- [[wiki:address-pointers]] - Memory addresses fundamentals
- [[wiki:variable]] - Variable storage
- [[wiki:data-types]] - Type sizes and memory
- [[wiki:functions]] - Passing by reference
