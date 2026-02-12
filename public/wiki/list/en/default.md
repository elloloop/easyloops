# List

## What is a List?

A **list** is a fundamental data structure that stores a collection of elements in a specific order. Lists allow you to group related data together and access each element by its position (index).

## What is an Array?

An **array** is a data structure that stores elements of the same type in a contiguous block of memory. Arrays provide fast access to elements using index positions.

## Array as Contiguous Memory Location

Arrays store elements in **contiguous memory locations**, meaning all elements are placed next to each other in memory. This arrangement allows for:

- Fast access to any element using its index
- Efficient memory usage
- Predictable memory layout

### Array Types

Arrays can store different types of data:

**Array of Integers:**

- Stores whole numbers: `[10, 20, 30, 40]`

**Array of Floats:**

- Stores decimal numbers: `[1.5, 2.7, 3.14, 4.0]`

**Array of Strings:**

- Stores text values: `["hello", "world", "example"]`

## Array Declaration

In traditional programming languages, arrays are declared with a fixed size:

```
int arr[5];        // Array of 5 integers
float prices[3];   // Array of 3 floats
string names[4];   // Array of 4 strings
```

## Iterating with For Loop

Arrays are commonly traversed using for loops:

```
for (i = 0; i < length; i++) {
    access arr[i]
}
```

## Primitive Types

**Primitive types** are the basic data types built into a programming language:

- **int**: whole numbers (1, 2, 100)
- **float**: decimal numbers (3.14, 2.5)
- **string**: text data ("hello")
- **boolean**: true/false values

## Python and Arrays

**Python does not have true fixed-size arrays** like traditional languages (C, Java). Instead, Python provides the **list** data type.

## Python List as Dynamic Array

Python's **list** behave# Create an instance of DynamicList

```python
dl = DynamicList()
```

# Dynamically add values

```python
for i in range(5):
    dl.add(i)
    print(dl)   # Shows growth step by step
```

# Access elements

```python

print("Element at index 2:", dl.get(2))

# Remove an element
dl.remove(3)
print("After removing 3:", dl)

# Check size
print("Current size:", dl.size())s like a **dynamic array**:
- No fixed size at creation
- Automatically grows when elements are added
- Automatically shrinks when elements are removed
- Can store different types of elements

## Lists Store References, Not Values
```

**Important:** Python lists don't store the actual values—they store **references** (memory addresses) to objects.

### What This Means:

**For mutable objects** (lists, dictionaries, custom objects):

- The list holds a reference to the object in memory
- If the object changes, the change is visible through the list
- Multiple variables can reference the same object

**For immutable objects** (integers, strings, tuples):

- The list still holds references, but since the objects cannot be modified, it behaves like storing values
- Changing the value means creating a new object and updating the reference

### Practical Impact:

```python
# Example with mutable object (list)
inner_list = [1, 2, 3]
outer_list = [inner_list, inner_list]
# Both positions reference the SAME list object

inner_list.append(4)
# Now outer_list shows: [[1, 2, 3, 4], [1, 2, 3, 4]]
# Both elements changed because they reference the same object

# Example with immutable object (integer)
x = 10
my_list = [x, x]
x = 20
# my_list still shows: [10, 10]
# The list holds references to the integer object 10, not to variable x
```

## Dynamic Memory Growth

When you add elements to a Python list:

1. If space is available, the element is added
2. If space is full, Python allocates a larger memory block
3. Existing elements are copied to the new location
4. The new element is added
5. The old memory is freed

This process is automatic and transparent to the programmer.

## List as Infinite Array

Python lists behave like **infinite arrays** from a programmer's perspective:

- You can keep adding elements without declaring size upfront
- The list grows automatically as needed
- **However**, lists are limited by available system memory
- If memory is exhausted, the program will fail

**Key Insight:** Lists provide the convenience of unlimited growth while being constrained by physical memory limits.

## Complete Example: DynamicList Implementation

Here's a complete implementation showing how dynamic behavior works:

```python
class DynamicList:
    def __init__(self):
        # Start with an empty list
        self.data = []

    def add(self, value):
        """Add a new value to the list dynamically"""
        self.data.append(value)

    def remove(self, value):
        """Remove a value if it exists"""
        if value in self.data:
            self.data.remove(value)

    def get(self, index):
        """Get value at a specific index"""
        if 0 <= index < len(self.data):
            return self.data[index]
        else:
            raise IndexError("Index out of range")

    def size(self):
        """Return current size of the list"""
        return len(self.data)

    def __str__(self):
        """String representation of the list"""
        return str(self.data)

# Create an instance of DynamicList
dl = DynamicList()

# Dynamically add values
for i in range(5):
    dl.add(i)
    print(dl)   # Shows growth step by step

# Output:
# [0]
# [0, 1]
# [0, 1, 2]
# [0, 1, 2, 3]
# [0, 1, 2, 3, 4]

# Access elements
print("Element at index 2:", dl.get(2))
# Output: Element at index 2: 2

# Remove an element
dl.remove(3)
print("After removing 3:", dl)
# Output: After removing 3: [0, 1, 2, 4]

# Check size
print("Current size:", dl.size())
# Output: Current size: 4
```
