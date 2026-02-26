# Arrays

## What are Arrays?

An **array** is a data structure that stores a collection of elements of the same type in contiguous memory locations. Arrays provide a way to store multiple values under a single variable name, accessed by their index position.

## Key Concepts

### 1. Fixed Size

Arrays typically have a fixed size determined at creation time.

### 2. Index-Based Access

Elements are accessed using numeric indices, usually starting at 0.

### 3. Contiguous Memory

Array elements are stored in adjacent memory locations, enabling fast access.

### 4. Same Type Elements

All elements in an array must be of the same data type.

## Basic Structure

```
Array: [10, 20, 30, 40, 50]
Index:   0   1   2   3   4

Memory Layout:
[10][20][30][40][50]
```

## Why Use Arrays?

- **Efficient Access**: Direct access to any element using index (O(1) time)
- **Memory Efficient**: Elements stored contiguously
- **Iteration**: Easy to loop through all elements
- **Multiple Values**: Store many related values together

## Common Operations

### 1. Declaration and Initialization

Creating an array and assigning initial values.

### 2. Access

Reading or modifying elements by index.

### 3. Traversal

Iterating through all elements.

### 4. Search

Finding an element in the array.

### 5. Insertion/Deletion

Adding or removing elements (varies by language).

## Array vs Other Data Structures

| Feature       | Array      | List              |
| ------------- | ---------- | ----------------- |
| Size          | Fixed      | Dynamic           |
| Access Time   | O(1)       | O(1)              |
| Insert/Delete | Expensive  | Easier            |
| Memory        | Contiguous | May be fragmented |

## Common Use Cases

### 1. Storing Collections

Store multiple related items (scores, names, prices).

### 2. Lookup Tables

Quick access to values using indices.

### 3. Buffers

Temporary storage for data processing.

### 4. Matrix Operations

Multi-dimensional arrays for mathematical computations.

## Time Complexity

- **Access**: O(1) - Direct index access
- **Search**: O(n) - Linear search through elements
- **Insert**: O(n) - May require shifting elements
- **Delete**: O(n) - May require shifting elements

## Related Concepts

- [[wiki:variable]] - Arrays as special variables
- [[wiki:data-types]] - Array element types
- [[wiki:pointers]] - Arrays and memory addresses
- [[wiki:functions]] - Passing arrays to functions
