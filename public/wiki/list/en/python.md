# List in Python

## List Declaration

In Python, creating a list is simple:

```python
# Empty list
my_list = []

# List with integers
numbers = [10, 20, 30, 40, 50]

# List with floats
prices = [19.99, 25.50, 12.75]

# List with strings
fruits = ["apple", "banana", "cherry"]

# Mixed types (Python allows this)
mixed = [1, "hello", 3.14, True]
```

## Iterating with For Loop

Python makes it easy to loop through list elements:

```python
# Method 1: Direct iteration
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Output:
# apple
# banana
# cherry

# Method 2: Using index
numbers = [10, 20, 30]
for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")

# Output:
# Index 0: 10
# Index 1: 20
# Index 2: 30
```

## Primitive Types in Python Lists

```python
# Integer list
int_list = [1, 2, 3, 4, 5]
print(int_list)  # Output: [1, 2, 3, 4, 5]

# Float list
float_list = [1.1, 2.2, 3.3]
print(float_list)  # Output: [1.1, 2.2, 3.3]

# String list
string_list = ["hello", "world", "python"]
print(string_list)  # Output: ['hello', 'world', 'python']

# Boolean list
bool_list = [True, False, True]
print(bool_list)  # Output: [True, False, True]
```

## Python Has No Fixed Array

Unlike C or Java, Python doesn't require you to specify the size:

```python
# In C: int arr[5];  (fixed size)
# In Python:
my_list = []  # No size specified!

# You can add as many elements as you want
my_list.append(1)
my_list.append(2)
my_list.append(3)
print(my_list)  # Output: [1, 2, 3]
```

## Lists Store References, Not Values

**Critical Concept:** Python lists store **references** (memory addresses) to objects, not the actual values themselves.

### Mutable Objects Example (Lists, Dictionaries)

```python
# Create a list
inner_list = [1, 2, 3]

# Add the same list twice
outer_list = [inner_list, inner_list]
print(outer_list)  # Output: [[1, 2, 3], [1, 2, 3]]

# Modify the inner list
inner_list.append(4)

# Both elements in outer_list change!
print(outer_list)  # Output: [[1, 2, 3, 4], [1, 2, 3, 4]]
# Why? Because both positions reference the SAME object in memory
```

### Immutable Objects Example (Integers, Strings)

```python
# Create an integer
num = 10

# Add it to a list
my_list = [num, num]
print(my_list)  # Output: [10, 10]

# Change the variable
num = 20

# The list remains unchanged
print(my_list)  # Output: [10, 10]
# Why? The list holds references to the integer object 10,
# not to the variable num
```

### Practical Implication

```python
# Creating independent copies
original = [1, 2, 3]
reference = original        # Same reference!
copy = original.copy()      # New object with same values

original.append(4)

print(original)   # Output: [1, 2, 3, 4]
print(reference)  # Output: [1, 2, 3, 4] - Changed!
print(copy)       # Output: [1, 2, 3] - Unchanged!
```

## Python List as Dynamic Array

Python lists automatically grow and shrink:

```python
# Start with empty list
dynamic_list = []
print(f"Initial: {dynamic_list}")  # Output: Initial: []

# Add elements dynamically
dynamic_list.append(10)
print(f"After adding 10: {dynamic_list}")  # Output: After adding 10: [10]

dynamic_list.append(20)
print(f"After adding 20: {dynamic_list}")  # Output: After adding 20: [10, 20]

dynamic_list.append(30)
print(f"After adding 30: {dynamic_list}")  # Output: After adding 30: [10, 20, 30]

# Remove elements
dynamic_list.remove(20)
print(f"After removing 20: {dynamic_list}")  # Output: After removing 20: [10, 30]
```

## How Memory Grows Dynamically

When you keep adding elements, Python manages memory automatically:

```python
import sys

my_list = []
print(f"Empty list size: {sys.getsizeof(my_list)} bytes")

for i in range(10):
    my_list.append(i)
    print(f"After adding {i}: size = {sys.getsizeof(my_list)} bytes")

# You'll notice the size increases in chunks, not one-by-one
# Python allocates extra space to reduce frequent reallocations
```

## List as Infinite Array (Limited by Memory)

From a programming perspective, lists seem infinite:

```python
# You can keep adding elements
infinite_list = []

# Add 1000 elements
for i in range(1000):
    infinite_list.append(i)

print(f"List has {len(infinite_list)} elements")  # Output: List has 1000 elements

# You can add even more
for i in range(1000, 2000):
    infinite_list.append(i)

print(f"Now list has {len(infinite_list)} elements")  # Output: Now list has 2000 elements

# The limit is only your computer's memory
# If you try to create a list larger than available RAM, you'll get a MemoryError
```

## Complete Example: DynamicList Implementation

Here's how you might implement dynamic behavior yourself:

```python
class DynamicList:
    def __init__(self):
        self.items = []

    def add(self, value):
        """Add an element to the list"""
        self.items.append(value)

    def get(self, index):
        """Get element at specific index"""
        if 0 <= index < len(self.items):
            return self.items[index]
        raise IndexError("Index out of range")

    def remove(self, value):
        """Remove first occurrence of value"""
        if value in self.items:
            self.items.remove(value)

    def size(self):
        """Return current size"""
        return len(self.items)

    def __str__(self):
        return str(self.items)

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

**Key Takeaway:** Python's built-in list already provides all this dynamic functionality, but understanding how it works helps you appreciate the power of Python's data structures!
