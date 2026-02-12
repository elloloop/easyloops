# Classes in Python

## Defining a Class

Use the `class` keyword to define a class.

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

    def info(self):
        return f"{self.name} is a {self.breed}"

# Creating objects
dog1 = Dog("Buddy", "Golden Retriever")
dog2 = Dog("Max", "Labrador")

print(dog1.bark())  # Buddy says Woof!
print(dog2.info())  # Max is a Labrador
```

## The **init** Method (Constructor)

`__init__` is called automatically when creating an object.

```python
class Person:
    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

person = Person("Alice", 30)
print(person.greet())  # Hello, I'm Alice
```

## The self Parameter

`self` refers to the current instance of the class.

```python
class Counter:
    def __init__(self):
        self.count = 0  # self.count is instance attribute

    def increment(self):
        self.count += 1  # Access using self

    def get_count(self):
        return self.count

counter = Counter()
counter.increment()
counter.increment()
print(counter.get_count())  # 2
```

## Instance Attributes vs Class Attributes

```python
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance attributes (unique to each instance)
        self.name = name
        self.age = age

dog1 = Dog("Buddy", 5)
dog2 = Dog("Max", 3)

# Instance attributes (different)
print(dog1.name)  # Buddy
print(dog2.name)  # Max

# Class attribute (same for all)
print(dog1.species)  # Canis familiaris
print(dog2.species)  # Canis familiaris
print(Dog.species)  # Canis familiaris

# Modifying class attribute
Dog.species = "Canis lupus familiaris"
print(dog1.species)  # Canis lupus familiaris
print(dog2.species)  # Canis lupus familiaris
```

## Instance Methods

Methods that operate on instance data.

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

    def is_square(self):
        return self.width == self.height

rect = Rectangle(5, 10)
print(rect.area())       # 50
print(rect.perimeter())  # 30
print(rect.is_square())  # False
```

## Class Methods

Methods that operate on the class, not instances.

```python
class Circle:
    pi = 3.14159

    def __init__(self, radius):
        self.radius = radius

    @classmethod
    def from_diameter(cls, diameter):
        return cls(diameter / 2)

    def area(self):
        return Circle.pi * self.radius ** 2

# Create from radius
c1 = Circle(5)
print(c1.area())  # 78.53975

# Create from diameter using class method
c2 = Circle.from_diameter(10)
print(c2.area())  # 78.53975
```

## Static Methods

Methods that don't access instance or class data.

```python
class MathUtils:
    @staticmethod
    def add(x, y):
        return x + y

    @staticmethod
    def multiply(x, y):
        return x * y

# Call without creating instance
print(MathUtils.add(5, 3))       # 8
print(MathUtils.multiply(4, 7))  # 28
```

## Private Attributes

Use `_` or `__` prefix for private attributes.

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance       # Protected (convention)
        self.__account_id = 12345     # Private (name mangling)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def get_balance(self):
        return self._balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # 1500

# Can still access _ attributes (convention not enforced)
print(account._balance)  # 1500

# __ attributes are name-mangled
# print(account.__account_id)  # AttributeError
```

## Properties

Control access to attributes using getters/setters.

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0

temp.celsius = 30
print(temp.celsius)     # 30
```

## String Representation

Define how objects are displayed.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        # For print() and str()
        return f"{self.name}, {self.age} years old"

    def __repr__(self):
        # For debugging and repr()
        return f"Person('{self.name}', {self.age})"

person = Person("Alice", 30)
print(person)        # Alice, 30 years old
print(repr(person))  # Person('Alice', 30)
```

## Real-World Example: Shopping Cart

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, product, quantity=1):
        self.items.append({
            'product': product,
            'quantity': quantity
        })

    def remove_item(self, product_name):
        self.items = [
            item for item in self.items
            if item['product'].name != product_name
        ]

    def get_total(self):
        total = 0
        for item in self.items:
            total += item['product'].price * item['quantity']
        return total

    def display_cart(self):
        print("Shopping Cart:")
        for item in self.items:
            product = item['product']
            quantity = item['quantity']
            print(f"- {product.name}: ${product.price} x {quantity}")
        print(f"Total: ${self.get_total()}")

# Usage
cart = ShoppingCart()
cart.add_item(Product("Laptop", 999), 1)
cart.add_item(Product("Mouse", 25), 2)
cart.display_cart()

# Output:
# Shopping Cart:
# - Laptop: $999 x 1
# - Mouse: $25 x 2
# Total: $1049
```

## Related Concepts

- [[wiki:object]] - Class instances
- [[wiki:constructor]] - **init** method
- [[wiki:inheritance]] - Class hierarchies
- [[wiki:composition]] - Class relationships
