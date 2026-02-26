# Memory Addresses and References in Python

## Python's Memory Model

Python doesn't have traditional pointers like C or C++, but it uses **references** to manage objects in memory. Every variable in Python is a reference to an object.

## Getting Memory Addresses

You can view the memory address of an object using the `id()` function.

```python
x = 42
print(id(x))  # Output: 140736388654336 (address will vary)

name = "Alice"
print(id(name))  # Output: 2234567891234 (address will vary)
```

## References and Assignment

When you assign a variable to another, you're copying the reference, not the value.

```python
# Both variables reference the same object
a = [1, 2, 3]
b = a

print(id(a))  # Same address
print(id(b))  # Same address

# Modifying through one reference affects both
b.append(4)
print(a)  # Output: [1, 2, 3, 4]
```

## Mutable vs Immutable Objects

### Immutable Objects

Integers, strings, tuples cannot be changed. Reassignment creates new objects.

```python
x = 10
print(id(x))  # Address: 140736388654336

x = 20
print(id(x))  # Different address: 140736388654656
```

### Mutable Objects

Lists, dictionaries, sets can be modified in place.

```python
my_list = [1, 2, 3]
address_before = id(my_list)

my_list.append(4)
address_after = id(my_list)

print(address_before == address_after)  # True - same object
```

## Passing Arguments to Functions

Python uses **pass by object reference**.

```python
def modify_list(lst):
    lst.append(4)
    print(f"Inside function: {id(lst)}")

my_list = [1, 2, 3]
print(f"Before: {id(my_list)}")

modify_list(my_list)
print(f"After: {id(my_list)}")
print(my_list)  # Output: [1, 2, 3, 4]
```

## Creating Independent Copies

To avoid shared references, create copies:

```python
# Shallow copy
original = [1, 2, 3]
copy1 = original.copy()
copy2 = original[:]

# Deep copy (for nested structures)
import copy
nested = [[1, 2], [3, 4]]
deep_copy = copy.deepcopy(nested)
```

## The `is` Operator

Check if two variables reference the same object:

```python
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)  # True - same object
print(a is c)  # False - different objects
print(a == c)  # True - same values
```

## Memory Management

Python uses automatic garbage collection to free memory when objects are no longer referenced.

```python
import sys

x = [1, 2, 3]
print(sys.getrefcount(x))  # Shows reference count

# When reference count reaches 0, memory is freed
```

## Practical Example: Avoiding Unintended Sharing

```python
# Wrong: Default mutable argument
def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] - Unexpected!

# Correct: Use None as default
def add_item_correct(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(add_item_correct(1))  # [1]
print(add_item_correct(2))  # [2] - Expected!
```

## Related Concepts

- [[wiki:variable]] - Variable assignment
- [[wiki:functions]] - Function parameters
- [[wiki:data-types]] - Mutable vs immutable types
