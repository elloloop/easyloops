# Pointers in Python

## Python's Approach to Pointers

Python doesn't have explicit pointers like C or C++. Instead, Python uses **object references** which provide similar functionality in a safer, more abstract way.

## Everything is a Reference

In Python, all variables are references to objects. When you assign a variable, you're creating a reference, not copying the value.

```python
# Both variables reference the same list object
list1 = [1, 2, 3]
list2 = list1

print(id(list1))  # Same memory address
print(id(list2))  # Same memory address

list2.append(4)
print(list1)  # [1, 2, 3, 4] - modified through list2
```

## Simulating Pointer Behavior

### 1. Using Lists as Pointers

Lists can hold references to objects, acting like pointers.

```python
x = 10
pointer = [x]  # "Pointer" to x

# To "dereference"
value = pointer[0]
print(value)  # 10
```

### 2. Using Dictionaries

```python
data = {'value': 42}

def modify(data_ref):
    data_ref['value'] = 100

modify(data)
print(data['value'])  # 100
```

### 3. Using Classes

```python
class Pointer:
    def __init__(self, value):
        self.value = value

ptr = Pointer(42)
print(ptr.value)  # "Dereference"

ptr.value = 100  # Modify through "pointer"
print(ptr.value)  # 100
```

## ctypes Module for Real Pointers

Python's `ctypes` module provides C-compatible pointers for low-level operations.

```python
import ctypes

# Create a pointer to an integer
x = ctypes.c_int(42)
ptr = ctypes.pointer(x)

print(ptr.contents)  # c_int(42)
print(ptr.contents.value)  # 42

# Modify through pointer
ptr.contents = ctypes.c_int(100)
print(x.value)  # 100
```

## Reference vs Copy

### Shallow Copy

```python
import copy

original = [1, [2, 3]]
shallow = copy.copy(original)

shallow[1].append(4)
print(original)  # [1, [2, 3, 4]] - inner list shared
```

### Deep Copy

```python
import copy

original = [1, [2, 3]]
deep = copy.deepcopy(original)

deep[1].append(4)
print(original)  # [1, [2, 3]] - independent copy
```

## Passing References to Functions

```python
def modify_list(lst):
    """Modifies the original list"""
    lst.append(4)

def replace_list(lst):
    """Only modifies local reference"""
    lst = [10, 20, 30]  # New object, doesn't affect caller

my_list = [1, 2, 3]

modify_list(my_list)
print(my_list)  # [1, 2, 3, 4]

replace_list(my_list)
print(my_list)  # [1, 2, 3, 4] - unchanged
```

## Checking Reference Identity

```python
a = [1, 2, 3]
b = a
c = a[:]  # Creates a new list

# Identity check
print(a is b)  # True - same object
print(a is c)  # False - different objects

# Value equality
print(a == c)  # True - same values
```

## Memory Address Inspection

```python
import sys

x = [1, 2, 3]
print(f"Address: {id(x)}")
print(f"Reference count: {sys.getrefcount(x)}")

y = x
print(f"Reference count after assignment: {sys.getrefcount(x)}")
```

## Common Pitfalls

### Mutable Default Arguments

```python
# Wrong
def append_to(element, to=[]):
    to.append(element)
    return to

print(append_to(1))  # [1]
print(append_to(2))  # [1, 2] - unexpected!

# Correct
def append_to(element, to=None):
    if to is None:
        to = []
    to.append(element)
    return to
```

### Unintended Aliasing

```python
matrix = [[0] * 3] * 3  # Wrong!
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]

# Correct
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
```

## Weakref Module

Python's `weakref` module creates references that don't prevent garbage collection.

```python
import weakref

class MyClass:
    pass

obj = MyClass()
weak_ref = weakref.ref(obj)

print(weak_ref())  # <__main__.MyClass object at ...>

del obj
print(weak_ref())  # None - object was garbage collected
```

## Related Concepts

- [[wiki:address-pointers]] - Memory addresses in Python
- [[wiki:variable]] - Variable assignment
- [[wiki:functions]] - Function parameters
- [[wiki:data-types]] - Mutable vs immutable
