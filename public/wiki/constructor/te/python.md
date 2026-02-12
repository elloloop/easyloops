# Python lo Constructor

## **init** Method

Python lo `__init__()` constructor ga work chesthundi.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(person.name)  # Alice
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

Optional parameters ki default values.

```python
class Student:
    def __init__(self, name, grade="A", age=18):
        self.name = name
        self.grade = grade
        self.age = age

s1 = Student("Alice")              # Defaults use
s2 = Student("Bob", "B")           # Custom grade
s3 = Student("Charlie", age=19)    # Named param

print(s1.grade)  # A (default)
```

## self Parameter

`self` current instance ni refer chesthundi.

```python
class Counter:
    def __init__(self, start=0):
        self.count = start

    def increment(self):
        self.count += 1

c1 = Counter()
c2 = Counter(10)

c1.increment()
print(c1.count)  # 1
print(c2.count)  # 10
```

## Validation

Constructor lo input validate cheyochu.

```python
class BankAccount:
    def __init__(self, number, balance):
        if balance < 0:
            raise ValueError("Balance cannot be negative")

        self.account_number = number
        self.balance = balance

# Valid
acc1 = BankAccount("1234567890", 1000)

# Invalid - raises error
try:
    acc2 = BankAccount("123", -500)
except ValueError as e:
    print(f"Error: {e}")
```

## Private Attributes

`_` or `__` prefix tho private attributes.

```python
class User:
    def __init__(self, username, password):
        self.username = username       # Public
        self._email = None             # Protected
        self.__password = password     # Private

user = User("alice", "secret")
print(user.username)      # OK
# print(user.__password)  # Error!
```

## Class vs Instance Variables

```python
class Dog:
    species = "Canis familiaris"  # Class variable (shared)

    def __init__(self, name, age):
        self.name = name  # Instance variable (unique)
        self.age = age

dog1 = Dog("Buddy", 5)
dog2 = Dog("Max", 3)

print(dog1.species)  # Canis familiaris (shared)
print(dog1.name)     # Buddy (unique)
```

## Inheritance tho Constructor

Parent constructor call cheyadaniki `super()`.

```python
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Dog")  # Parent call
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)     # Buddy
print(dog.species)  # Dog
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
        """String nundi create '2023-12-25'"""
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)

    def __str__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

# Different ways
d1 = Date(2023, 12, 25)
d2 = Date.from_string("2023-12-25")

print(d1)  # 2023-12-25
```

## Builder Pattern

Complex objects kosam method chaining.

```python
class Pizza:
    def __init__(self):
        self.size = None
        self.toppings = []

    def set_size(self, size):
        self.size = size
        return self  # Chaining kosam

    def add_topping(self, topping):
        self.toppings.append(topping)
        return self

# Method chaining
pizza = Pizza().set_size("large").add_topping("cheese").add_topping("pepperoni")
```

## Singleton Pattern

Only one instance create cheyadam.

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

s1 = Singleton()
s2 = Singleton()

print(s1 is s2)  # True - same instance
```

## Tips

- `__init__()` Python lo constructor
- `self` parameter mandatory
- Default parameters use chesi flexibility
- Validation constructor lo cheyandi
- `super()` tho parent constructor call
- Factory methods alternate constructors kosam
- Builder pattern complex objects kosam

---

_Note: Ee page inka development stage lo undi._
