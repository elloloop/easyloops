# Constructors in Python

## The **init** Method

Python uses `__init__()` as the constructor method.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Creating objects
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

print(person1.name)  # Alice
print(person2.age)   # 25
```

## Basic Constructor

```python
class Car:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

    def info(self):
        return f"{self.year} {self.brand} {self.model}"

car = Car("Toyota", "Camry", 2023)
print(car.info())  # 2023 Toyota Camry
```

## Default Parameters

Provide default values for optional parameters.

```python
class Student:
    def __init__(self, name, grade="A", age=18):
        self.name = name
        self.grade = grade
        self.age = age

# Different ways to create
s1 = Student("Alice")                    # Uses defaults
s2 = Student("Bob", "B")                 # Custom grade
s3 = Student("Charlie", "C", 20)         # All custom
s4 = Student("Diana", age=19)            # Named parameter

print(s1.grade)  # A (default)
print(s2.grade)  # B
print(s4.age)    # 19
```

## The self Parameter

`self` refers to the instance being created.

```python
class Counter:
    def __init__(self, start=0):
        self.count = start  # Instance variable

    def increment(self):
        self.count += 1

    def get_count(self):
        return self.count

c1 = Counter()
c2 = Counter(10)

c1.increment()
print(c1.get_count())  # 1
print(c2.get_count())  # 10
```

## Validation in Constructor

```python
class BankAccount:
    def __init__(self, account_number, initial_balance):
        if initial_balance < 0:
            raise ValueError("Balance cannot be negative")

        if len(account_number) != 10:
            raise ValueError("Account number must be 10 digits")

        self.account_number = account_number
        self.balance = initial_balance

# Valid
account1 = BankAccount("1234567890", 1000)

# Invalid - raises exception
try:
    account2 = BankAccount("123", -500)
except ValueError as e:
    print(f"Error: {e}")
```

## Private Attributes

Use `_` or `__` prefix for private attributes.

```python
class User:
    def __init__(self, username, password):
        self.username = username      # Public
        self._email = None            # Protected (convention)
        self.__password = password    # Private (name mangling)

    def check_password(self, password):
        return self.__password == password

user = User("alice", "secret123")
print(user.username)           # OK
# print(user.__password)       # Error!
print(user.check_password("secret123"))  # True
```

## Class Variables vs Instance Variables

```python
class Dog:
    # Class variable (shared by all instances)
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance variables (unique to each instance)
        self.name = name
        self.age = age

dog1 = Dog("Buddy", 5)
dog2 = Dog("Max", 3)

print(dog1.species)  # Canis familiaris (shared)
print(dog2.species)  # Canis familiaris (shared)

print(dog1.name)     # Buddy (unique)
print(dog2.name)     # Max (unique)
```

## Constructor with Composition

```python
class Address:
    def __init__(self, street, city, zipcode):
        self.street = street
        self.city = city
        self.zipcode = zipcode

class Employee:
    def __init__(self, name, address):
        self.name = name
        self.address = address  # Composition

    def full_address(self):
        return f"{self.address.street}, {self.address.city} {self.address.zipcode}"

addr = Address("123 Main St", "New York", "10001")
emp = Employee("Alice", addr)
print(emp.full_address())
# 123 Main St, New York 10001
```

## Inheritance and Constructors

Call parent constructor with `super()`.

```python
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Dog")  # Call parent constructor
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)     # Buddy
print(dog.species)  # Dog
print(dog.breed)    # Golden Retriever
```

## Factory Methods

Alternative constructors using class methods.

```python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_string):
        """Create Date from string like '2023-12-25'"""
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        """Create Date with today's date"""
        import datetime
        today = datetime.date.today()
        return cls(today.year, today.month, today.day)

    def __str__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

# Different ways to create
d1 = Date(2023, 12, 25)
d2 = Date.from_string("2023-12-25")
d3 = Date.today()

print(d1)  # 2023-12-25
print(d2)  # 2023-12-25
```

## Builder Pattern

For complex objects with many parameters.

```python
class Pizza:
    def __init__(self):
        self.size = None
        self.cheese = False
        self.pepperoni = False
        self.mushrooms = False

    def set_size(self, size):
        self.size = size
        return self  # Return self for chaining

    def add_cheese(self):
        self.cheese = True
        return self

    def add_pepperoni(self):
        self.pepperoni = True
        return self

    def add_mushrooms(self):
        self.mushrooms = True
        return self

    def __str__(self):
        toppings = []
        if self.cheese: toppings.append("cheese")
        if self.pepperoni: toppings.append("pepperoni")
        if self.mushrooms: toppings.append("mushrooms")
        return f"{self.size} pizza with {', '.join(toppings)}"

# Build pizza with method chaining
pizza = Pizza().set_size("large").add_cheese().add_pepperoni()
print(pizza)
# large pizza with cheese, pepperoni
```

## Singleton Pattern

Private constructor to ensure only one instance.

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.initialized = True
            self.value = 0

s1 = Singleton()
s2 = Singleton()

print(s1 is s2)  # True - same instance

s1.value = 42
print(s2.value)  # 42 - shared state
```

## **new** vs **init**

`__new__` creates the instance, `__init__` initializes it.

```python
class Point:
    def __new__(cls, x, y):
        print("Creating instance")
        instance = super().__new__(cls)
        return instance

    def __init__(self, x, y):
        print("Initializing instance")
        self.x = x
        self.y = y

p = Point(1, 2)
# Output:
# Creating instance
# Initializing instance
```

## Immutable Objects

Use `__new__` for immutable types.

```python
class ImmutablePoint:
    def __new__(cls, x, y):
        instance = super().__new__(cls)
        instance._x = x
        instance._y = y
        return instance

    @property
    def x(self):
        return self._x

    @property
    def y(self):
        return self._y

p = ImmutablePoint(1, 2)
print(p.x, p.y)  # 1 2
# p.x = 5  # Error! Can't set attribute
```

## Related Concepts

- [[wiki:class]] - Class basics
- [[wiki:inheritance]] - Calling parent constructors
- [[wiki:composition]] - Constructor injection
