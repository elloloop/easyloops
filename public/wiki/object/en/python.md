# Objects in Python

## Creating Objects

Create objects using class name followed by parentheses.

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

# Creating objects (instances)
dog1 = Dog("Buddy", "Golden Retriever")
dog2 = Dog("Max", "Labrador")
dog3 = Dog("Charlie", "Beagle")

print(dog1.name)    # Buddy
print(dog2.bark())  # Max says Woof!
```

## Object Attributes

Access and modify object attributes using dot notation.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)

# Access attributes
print(person.name)  # Alice
print(person.age)   # 30

# Modify attributes
person.age = 31
print(person.age)   # 31

# Add new attributes dynamically
person.city = "New York"
print(person.city)  # New York
```

## Object Methods

Call methods on objects.

```python
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, x):
        self.result += x
        return self

    def multiply(self, x):
        self.result *= x
        return self

    def get_result(self):
        return self.result

calc = Calculator()
calc.add(5).add(3).multiply(2)
print(calc.get_result())  # 16
```

## Object Identity

Use `id()` to get object's unique identifier and `is` to check identity.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = p1

# Identity - same object?
print(p1 is p2)   # False (different objects)
print(p1 is p3)   # True (same object)

# Check memory address
print(id(p1))     # e.g., 140234567890
print(id(p2))     # Different address
print(id(p3))     # Same as p1
```

## Object Equality

Use `==` for equality and implement `__eq__` for custom comparison.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return False
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)

print(p1 == p2)   # True (same values)
print(p1 is p2)   # False (different objects)
print(p1 == p3)   # False (different values)
```

## Object References

Understanding how object references work.

```python
class Box:
    def __init__(self, value):
        self.value = value

# Original object
box1 = Box(10)

# Reference to same object
box2 = box1

# Modify through box2
box2.value = 20

print(box1.value)  # 20 (both reference same object)
print(box2.value)  # 20

# Check they're the same object
print(box1 is box2)  # True
```

## Copying Objects

### Shallow Copy

```python
import copy

class Container:
    def __init__(self, items):
        self.items = items

original = Container([1, 2, 3])
shallow = copy.copy(original)

# Different container objects
print(original is shallow)  # False

# But same list inside
print(original.items is shallow.items)  # True

# Modifying list affects both
shallow.items.append(4)
print(original.items)  # [1, 2, 3, 4]
```

### Deep Copy

```python
import copy

original = Container([1, 2, 3])
deep = copy.deepcopy(original)

# Different container AND different list
print(original is deep)  # False
print(original.items is deep.items)  # False

# Modifying doesn't affect original
deep.items.append(4)
print(original.items)  # [1, 2, 3]
print(deep.items)      # [1, 2, 3, 4]
```

## Instance vs Class Attributes

```python
class Counter:
    # Class attribute (shared)
    total_count = 0

    def __init__(self, name):
        # Instance attribute (unique)
        self.name = name
        self.count = 0
        Counter.total_count += 1

c1 = Counter("Counter1")
c2 = Counter("Counter2")

c1.count = 5
c2.count = 10

print(c1.count)           # 5 (instance)
print(c2.count)           # 10 (instance)
print(Counter.total_count) # 2 (class, shared)
```

## Object String Representation

Implement `__str__` and `__repr__` for readable output.

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        # For print() and str()
        return f"{self.title} by {self.author}"

    def __repr__(self):
        # For debugging and repr()
        return f"Book('{self.title}', '{self.author}')"

book = Book("1984", "George Orwell")

print(str(book))   # 1984 by George Orwell
print(repr(book))  # Book('1984', 'George Orwell')
print(book)        # Uses __str__
```

## Checking Object Type

```python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()

# Check type
print(type(dog))              # <class 'Dog'>
print(type(dog).__name__)     # Dog

# Check instance
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(isinstance(dog, object))  # True (all objects inherit from object)
```

## Object Deletion

Delete object references with `del`.

```python
class Resource:
    def __init__(self, name):
        self.name = name
        print(f"{name} created")

    def __del__(self):
        print(f"{self.name} destroyed")

r1 = Resource("R1")
r2 = r1

del r1  # Removes reference, but object still exists
print(r2.name)  # R1 (still accessible)

del r2  # Now object is destroyed
# Output: R1 destroyed
```

## Everything is an Object

In Python, everything is an object!

```python
# Numbers are objects
x = 42
print(type(x))  # <class 'int'>
print(x.bit_length())  # Method on integer object

# Functions are objects
def greet():
    return "Hello"

print(type(greet))  # <class 'function'>

# Classes are objects
print(type(Dog))  # <class 'type'>
```

## Object Introspection

Inspect objects at runtime.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name}"

person = Person("Alice", 30)

# Get all attributes and methods
print(dir(person))

# Check if attribute exists
print(hasattr(person, 'name'))   # True
print(hasattr(person, 'email'))  # False

# Get attribute value
print(getattr(person, 'name'))   # Alice
print(getattr(person, 'email', 'N/A'))  # N/A (default)

# Set attribute
setattr(person, 'city', 'NYC')
print(person.city)  # NYC

# Get object's attributes as dict
print(vars(person))
# {'name': 'Alice', 'age': 30, 'city': 'NYC'}
```

## Object-Oriented Patterns

### Factory Pattern

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

def create_animal(animal_type, name):
    """Factory function"""
    if animal_type == "dog":
        return Dog(name)
    elif animal_type == "cat":
        return Cat(name)

pet1 = create_animal("dog", "Buddy")
pet2 = create_animal("cat", "Whiskers")

print(pet1.speak())  # Woof!
print(pet2.speak())  # Meow!
```

## Related Concepts

- [[wiki:class]] - Object blueprints
- [[wiki:constructor]] - Creating objects
- [[wiki:inheritance]] - Object hierarchies
- [[wiki:pointers]] - Object references
