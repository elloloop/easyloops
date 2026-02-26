# Python lo Inheritance

## Basic Syntax

Python lo inheritance chala simple.

```python
# Parent class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

# Child class
class Dog(Animal):
    def speak(self):  # Override
        return "Woof!"

dog = Dog("Buddy")
print(dog.name)    # Buddy (inherited)
print(dog.speak()) # Woof! (overridden)
```

## super() Function

Parent class methods call cheyadaniki.

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Parent __init__ call
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)   # Buddy
print(dog.breed)  # Golden Retriever
```

## Method Overriding

```python
class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):  # Override chesindi
        return self.width * self.height

rect = Rectangle(5, 10)
print(rect.area())  # 50
```

## Multiple Inheritance

Multiple parents nundi inherit cheyochu.

```python
class Flyer:
    def fly(self):
        return "Flying"

class Swimmer:
    def swim(self):
        return "Swimming"

class Duck(Flyer, Swimmer):
    def quack(self):
        return "Quack!"

duck = Duck()
print(duck.fly())    # Flying
print(duck.swim())   # Swimming
print(duck.quack())  # Quack!
```

## Checking Inheritance

```python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()

# isinstance() - object instance check
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True

# issubclass() - class relationship check
print(issubclass(Dog, Animal))  # True
```

## Abstract Base Classes

Children implement cheyali ani force chesthayi.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.width = w
        self.height = h

    def area(self):
        return self.width * self.height

# shape = Shape()  # Error!
rect = Rectangle(5, 10)  # OK
```

## Multilevel Inheritance

```python
class LivingThing:
    def breathe(self):
        return "Breathing"

class Animal(LivingThing):
    def move(self):
        return "Moving"

class Dog(Animal):
    def bark(self):
        return "Woof!"

dog = Dog()
print(dog.breathe())  # Breathing
print(dog.move())     # Moving
print(dog.bark())     # Woof!
```

## Polymorphism Example

```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

def make_speak(animal):
    print(animal.speak())

animals = [Dog(), Cat()]
for animal in animals:
    make_speak(animal)

# Output: Woof! Meow!
```

## Real Example: Employee System

```python
class Employee:
    def __init__(self, name, emp_id):
        self.name = name
        self.emp_id = emp_id

    def details(self):
        return f"{self.emp_id}: {self.name}"

class Developer(Employee):
    def __init__(self, name, emp_id, lang):
        super().__init__(name, emp_id)
        self.language = lang

    def details(self):
        base = super().details()
        return f"{base}, Lang: {self.language}"

dev = Developer("Alice", "E001", "Python")
print(dev.details())
# E001: Alice, Lang: Python
```

## Access Levels

```python
class Parent:
    def __init__(self):
        self.public = "Anyone"
        self._protected = "Children OK"
        self.__private = "Only Parent"

class Child(Parent):
    def test(self):
        print(self.public)      # OK
        print(self._protected)  # OK
        # print(self.__private) # Error!
```

## Composition vs Inheritance

```python
# Bad - Inheritance
class Car(Engine):  # Car IS-AN Engine? No!
    pass

# Good - Composition
class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS-AN Engine

    def start(self):
        return self.engine.start()
```

## Tips

- `super()` use chesi parent methods access cheyandi
- Multiple inheritance MRO (left to right) follow avtundi
- Abstract classes force implementation
- Composition over inheritance prefer cheyandi
- isinstance() and issubclass() tho check cheyandi

---

_Note: Ee page inka development stage lo undi._
