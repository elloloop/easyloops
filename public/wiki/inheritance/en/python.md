# Inheritance in Python

## Basic Inheritance Syntax

Python supports single and multiple inheritance with simple syntax.

### Simple Example

```python
# Parent class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

    def info(self):
        return f"I am {self.name}"

# Child class
class Dog(Animal):
    def speak(self):  # Override parent method
        return "Woof!"

# Usage
dog = Dog("Buddy")
print(dog.name)       # Buddy (inherited)
print(dog.speak())    # Woof! (overridden)
print(dog.info())     # I am Buddy (inherited)
```

## Using super()

Call parent class methods from child class.

```python
class Animal:
    def __init__(self, name):
        self.name = name
        self.age = 0

    def info(self):
        return f"{self.name}, age {self.age}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent __init__
        self.breed = breed

    def info(self):
        parent_info = super().info()  # Call parent method
        return f"{parent_info}, breed: {self.breed}"

dog = Dog("Buddy", "Golden Retriever")
print(dog.info())
# Buddy, age 0, breed: Golden Retriever
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

    def area(self):  # Override
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):  # Override
        return 3.14159 * self.radius ** 2

rect = Rectangle(5, 10)
circle = Circle(7)

print(rect.area())    # 50
print(circle.area())  # 153.938
```

## Multiple Inheritance

Python supports multiple parents.

```python
class Flyer:
    def fly(self):
        return "Flying in the sky"

class Swimmer:
    def swim(self):
        return "Swimming in water"

class Duck(Flyer, Swimmer):
    def quack(self):
        return "Quack!"

duck = Duck()
print(duck.fly())    # Flying in the sky
print(duck.swim())   # Swimming in water
print(duck.quack())  # Quack!
```

## Method Resolution Order (MRO)

Python determines which method to call using MRO.

```python
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.method())  # B (from left to right)

# View MRO
print(D.mro())
# [D, B, C, A, object]
```

## Checking Inheritance

```python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()

# isinstance() - check if object is instance of class
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(isinstance(dog, object))  # True (everything inherits from object)

# issubclass() - check if class is subclass
print(issubclass(Dog, Animal))  # True
print(issubclass(Animal, Dog))  # False
```

## Abstract Base Classes

Force children to implement certain methods.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# shape = Shape()  # Error! Can't instantiate abstract class
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
print(dog.breathe())  # Breathing (from LivingThing)
print(dog.move())     # Moving (from Animal)
print(dog.bark())     # Woof! (from Dog)
```

## Polymorphism with Inheritance

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

class Cow(Animal):
    def speak(self):
        return "Moo!"

# Polymorphic function
def make_speak(animal):
    print(animal.speak())

animals = [Dog(), Cat(), Cow()]

for animal in animals:
    make_speak(animal)

# Output:
# Woof!
# Meow!
# Moo!
```

## Real-World Example: Employee System

```python
class Employee:
    def __init__(self, name, emp_id):
        self.name = name
        self.emp_id = emp_id

    def get_details(self):
        return f"ID: {self.emp_id}, Name: {self.name}"

class Developer(Employee):
    def __init__(self, name, emp_id, programming_language):
        super().__init__(name, emp_id)
        self.programming_language = programming_language

    def get_details(self):
        base = super().get_details()
        return f"{base}, Language: {self.programming_language}"

class Manager(Employee):
    def __init__(self, name, emp_id, team_size):
        super().__init__(name, emp_id)
        self.team_size = team_size

    def get_details(self):
        base = super().get_details()
        return f"{base}, Team Size: {self.team_size}"

# Usage
dev = Developer("Alice", "E001", "Python")
mgr = Manager("Bob", "M001", 10)

print(dev.get_details())
# ID: E001, Name: Alice, Language: Python

print(mgr.get_details())
# ID: M001, Name: Bob, Team Size: 10
```

## Private vs Protected Attributes

```python
class Parent:
    def __init__(self):
        self.public = "Everyone can access"
        self._protected = "Children can access"
        self.__private = "Only Parent can access"

class Child(Parent):
    def access_attributes(self):
        print(self.public)      # OK
        print(self._protected)  # OK
        # print(self.__private) # Error!

child = Child()
print(child.public)      # OK
print(child._protected)  # OK (convention, not enforced)
# print(child.__private) # Error!
```

## Composition vs Inheritance

```python
# Inheritance (IS-A)
class Engine:
    def start(self):
        return "Engine started"

class Car(Engine):  # Car IS-AN Engine? No!
    pass

# Composition (HAS-A) - Better!
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS-AN Engine

    def start(self):
        return self.engine.start()

car = Car()
print(car.start())  # Engine started
```

## Related Concepts

- [[wiki:class]] - Class basics
- [[wiki:abstract]] - Abstract classes
- [[wiki:polymorphism]] - Polymorphic behavior
