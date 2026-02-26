# Memory Addresses and Pointers

## What are Memory Addresses?

A **memory address** is a unique identifier for a location in computer memory where data is stored. Think of it like a street address that tells you where a house is located - a memory address tells the computer where to find specific data.

## What are Pointers?

A **pointer** is a variable that stores a memory address. Instead of holding data directly, a pointer holds the location where data is stored. Pointers are fundamental to understanding how computers manage memory.

## Key Concepts

### 1. Memory Address

Every variable in your program is stored at a specific location in memory, identified by its address.

### 2. Reference vs Value

- **Value**: The actual data stored in a variable
- **Reference (Address)**: The location where the data is stored

### 3. Dereferencing

Accessing the value stored at a memory address is called **dereferencing**.

## Why Use Pointers and Addresses?

- **Efficiency**: Pass large data structures without copying
- **Dynamic Memory**: Allocate memory at runtime
- **Data Structures**: Build linked lists, trees, and graphs
- **Function Parameters**: Modify variables from within functions

## Memory Layout

```
Memory Address    Value
--------------    -----
0x1000           42
0x1004           "Hello"
0x1008           3.14
```

## Common Use Cases

### 1. Passing by Reference

Instead of copying data, pass the address to allow modifications.

### 2. Dynamic Data Structures

Create flexible structures that grow and shrink at runtime.

### 3. Memory Management

Explicitly control when memory is allocated and freed.

## Related Concepts

- [[wiki:variable]] - Variables and their storage
- [[wiki:functions]] - Passing arguments by reference
- [[wiki:data-types]] - Types and memory size
