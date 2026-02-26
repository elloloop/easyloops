# Python lo Classes

## Class Define Cheyadam

`class` keyword use chesi class define.

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

# Objects create
dog1 = Dog("Buddy", "Golden Retriever")
dog2 = Dog("Max", "Labrador")

print(dog1.bark())  # Buddy says Woof!
```

## **init** Method

Constructor - object create aina ventane call.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

person = Person("Alice", 30)
print(person.greet())  # Hello, I'm Alice
```

## self Parameter

Current instance ni refer chesthundi.

```python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1  # self use chesi access

counter = Counter()
counter.increment()
print(counter.count)  # 1
```

## Instance vs Class Attributes

```python
class Dog:
    species = "Canis familiaris"  # Class (shared)

    def __init__(self, name):
        self.name = name  # Instance (unique)

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.name)     # Buddy (unique)
print(dog1.species)  # Canis familiaris (shared)
```

## Instance Methods

Instance data tho work chesthayi.

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

rect = Rectangle(5, 10)
print(rect.area())  # 50
```

## Class Methods

Class level operations.

```python
class Circle:
    @classmethod
    def from_diameter(cls, diameter):
        return cls(diameter / 2)

circle = Circle.from_diameter(10)
```

## Static Methods

Instance or class data avasaram ledu.

```python
class MathUtils:
    @staticmethod
    def add(x, y):
        return x + y

print(MathUtils.add(5, 3))  # 8
```

## Private Attributes

`_` or `__` prefix.

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Protected
        self.__id = 123          # Private

    def get_balance(self):
        return self._balance

account = BankAccount(1000)
print(account.get_balance())  # 1000
```

## Properties

Getters/setters tho control.

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        self._celsius = value

temp = Temperature(25)
print(temp.celsius)  # 25
temp.celsius = 30    # Setter call
```

## String Representation

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name}, {self.age} years"

person = Person("Alice", 30)
print(person)  # Alice, 30 years
```

## Tips

- `class` keyword use chesi define
- `__init__` constructor ga
- `self` current instance kosam mandatory
- Class attributes shared, instance unique
- `@classmethod` class methods kosam
- `@staticmethod` independent methods kosam
- `_` protected, `__` private convention
- `@property` getters/setters kosam

---

_Note: Ee page inka development stage lo undi._
