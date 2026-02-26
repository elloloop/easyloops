# Python lo Objects

## Objects Create Cheyadam

Class name tho parentheses use chesi objects create.

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

# Creating objects
dog1 = Dog("Buddy", "Golden Retriever")
dog2 = Dog("Max", "Labrador")

print(dog1.name)    # Buddy
print(dog2.bark())  # Max says Woof!
```

## Object Attributes

Dot notation use chesi access and modify.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)

# Access
print(person.name)  # Alice

# Modify
person.age = 31

# New attribute add
person.city = "New York"
```

## Object Identity

`id()` use chesi unique identifier, `is` use chesi identity check.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = p1

# Identity check
print(p1 is p2)   # False (different objects)
print(p1 is p3)   # True (same object)

# Memory address
print(id(p1))     # Unique number
print(id(p3))     # Same as p1
```

## Object Equality

`==` use chesi values compare, `__eq__` implement chesi custom comparison.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)

print(p1 == p2)   # True (same values)
print(p1 is p2)   # False (different objects)
```

## Object References

```python
class Box:
    def __init__(self, value):
        self.value = value

box1 = Box(10)
box2 = box1  # Same object reference

box2.value = 20

print(box1.value)  # 20 (same object)
print(box1 is box2)  # True
```

## Copying Objects

### Shallow Copy

```python
import copy

original = Container([1, 2, 3])
shallow = copy.copy(original)

# Different objects, same inner list
shallow.items.append(4)
print(original.items)  # [1, 2, 3, 4]
```

### Deep Copy

```python
deep = copy.deepcopy(original)

# Completely independent
deep.items.append(5)
print(original.items)  # [1, 2, 3, 4] (no change)
```

## Instance vs Class Attributes

```python
class Counter:
    total_count = 0  # Class (shared)

    def __init__(self, name):
        self.name = name  # Instance (unique)
        Counter.total_count += 1

c1 = Counter("C1")
c2 = Counter("C2")

print(c1.name)            # C1 (unique)
print(Counter.total_count) # 2 (shared)
```

## String Representation

`__str__` and `__repr__` implement cheyandi.

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f"{self.title} by {self.author}"

    def __repr__(self):
        return f"Book('{self.title}', '{self.author}')"

book = Book("1984", "George Orwell")
print(book)  # 1984 by George Orwell
```

## Type Checking

```python
class Dog:
    pass

dog = Dog()

print(type(dog))              # <class 'Dog'>
print(isinstance(dog, Dog))   # True
```

## Everything is Object

Python lo everything object!

```python
# Numbers
x = 42
print(type(x))  # <class 'int'>

# Functions
def greet():
    pass
print(type(greet))  # <class 'function'>
```

## Object Introspection

Runtime lo objects inspect cheyochu.

```python
class Person:
    def __init__(self, name):
        self.name = name

person = Person("Alice")

# Check attribute exists
print(hasattr(person, 'name'))  # True

# Get attribute
print(getattr(person, 'name'))  # Alice

# Set attribute
setattr(person, 'age', 30)

# Get all attributes
print(vars(person))
# {'name': 'Alice', 'age': 30}
```

## Tips

- Objects class nundi create chesthayi
- `is` identity kosam, `==` equality kosam
- References share chesthayi, copies create cheyandi if needed
- `__str__` and `__repr__` implement cheyandi
- `isinstance()` type check kosam
- Python lo everything is object!

---

_Note: Ee page inka development stage lo undi._
