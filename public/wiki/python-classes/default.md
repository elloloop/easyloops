# Classes and Objects -- Creating Your Own Types

## The Problem: Grouping Data and Behavior Together

Think about a bank account. It has data -- an owner name, a balance, an account number. It also has behavior -- you can deposit money, withdraw money, check the balance.

Right now, you might store that with separate variables and functions:

```python
account_owner: str = "Alice"
account_balance: float = 1000.0
account_number: str = "ACC-001"

def deposit(balance: float, amount: float) -> float:
    return balance + amount

def withdraw(balance: float, amount: float) -> float:
    return balance - amount
```

This works, but it falls apart fast. What if you have 50 accounts? You would need 50 sets of variables and you would have to pass the right balance to the right function every time. There is no connection between the data and the behavior.

Classes solve this. They let you bundle related data and behavior into one unit.

---

## What Is a Class?

A class is a blueprint for creating objects. It is a custom type that you define yourself.

Think of it like a cookie cutter. The cookie cutter is the class. Each cookie you stamp out is an object. Every cookie has the same shape (same structure), but each one can have different decorations (different data).

## What Is an Object?

An object is a specific thing made from a class blueprint. The technical word is "instance."

- `Dog` is a class (the blueprint).
- `my_dog` is an object (one specific dog made from that blueprint).

---

## Defining Your First Class

Open your editor. Type this. Run it.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age

    def bark(self) -> str:
        return f"{self.name} says Woof!"

# Create an object (an instance of Dog)
my_dog: Dog = Dog("Rex", 5)
print(my_dog.name)    # Rex
print(my_dog.age)     # 5
print(my_dog.bark())  # Rex says Woof!
```

Let us break down every piece.

---

## The `__init__` Method -- Setting Up a New Object

`__init__` is a special method that runs automatically when you create a new object. It sets up the object with its starting data.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age
```

When you write `Dog("Rex", 5)`, Python does two things:
1. Creates a new empty `Dog` object.
2. Calls `__init__` on that object, passing `"Rex"` as `name` and `5` as `age`.

Think of `__init__` as the setup instructions. Every time you build a new dog from the blueprint, these instructions run.

---

## `self` -- What It Is and Why Every Method Needs It

`self` is a reference to the specific object that is calling the method. It is how the object talks about itself.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name   # "this object's name"
        self.age: int = age     # "this object's age"

    def describe(self) -> str:
        return f"{self.name} is {self.age} years old"
```

When you write `my_dog.describe()`, Python secretly passes `my_dog` as `self`. So `self.name` becomes `my_dog.name`.

Every method in a class must have `self` as its first parameter. You do not pass it yourself -- Python does it automatically.

```python
rex: Dog = Dog("Rex", 5)
bella: Dog = Dog("Bella", 3)

print(rex.describe())    # Rex is 5 years old
print(bella.describe())  # Bella is 3 years old
```

Same method, different objects, different results. That is because `self` points to a different object each time.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have a class called Car with an __init__ that takes make and year. Write the class definition with type hints. Then create two Car objects and print their make. Explain what self refers to in each case."</div>
</div>

---

## Instance Variables vs Class Variables

Instance variables belong to one specific object. Class variables are shared by all objects of that class.

```python
class Dog:
    # Class variable -- shared by ALL dogs
    species: str = "Canis familiaris"

    def __init__(self, name: str, age: int) -> None:
        # Instance variables -- unique to EACH dog
        self.name: str = name
        self.age: int = age

rex: Dog = Dog("Rex", 5)
bella: Dog = Dog("Bella", 3)

# Instance variables are different
print(rex.name)      # Rex
print(bella.name)    # Bella

# Class variable is the same for both
print(rex.species)   # Canis familiaris
print(bella.species) # Canis familiaris
```

Use class variables for data that is the same across all instances. Use instance variables for data that differs between instances.

Open your editor. Type this. Run it.

```python
class Student:
    school: str = "Greenwood High"  # Same for all students

    def __init__(self, name: str, grade: int) -> None:
        self.name: str = name       # Different per student
        self.grade: int = grade     # Different per student

    def info(self) -> str:
        return f"{self.name}, Grade {self.grade}, {Student.school}"

alice: Student = Student("Alice", 10)
bob: Student = Student("Bob", 11)
print(alice.info())  # Alice, Grade 10, Greenwood High
print(bob.info())    # Bob, Grade 11, Greenwood High
```

---

## Methods -- Functions That Belong to a Class

A method is just a function defined inside a class. The difference from a regular function: it always gets `self` as its first argument, so it can access the object's data.

```python
class BankAccount:
    def __init__(self, owner: str, balance: float) -> None:
        self.owner: str = owner
        self.balance: float = balance

    def deposit(self, amount: float) -> None:
        self.balance += amount
        print(f"Deposited ${amount:.2f}. New balance: ${self.balance:.2f}")

    def withdraw(self, amount: float) -> bool:
        if amount > self.balance:
            print("Not enough funds!")
            return False
        self.balance -= amount
        print(f"Withdrew ${amount:.2f}. New balance: ${self.balance:.2f}")
        return True

    def get_balance(self) -> float:
        return self.balance
```

Open your editor. Type this. Run it.

```python
class BankAccount:
    def __init__(self, owner: str, balance: float) -> None:
        self.owner: str = owner
        self.balance: float = balance

    def deposit(self, amount: float) -> None:
        self.balance += amount

    def withdraw(self, amount: float) -> bool:
        if amount > self.balance:
            return False
        self.balance -= amount
        return True

    def get_balance(self) -> float:
        return self.balance

account: BankAccount = BankAccount("Alice", 500.0)
account.deposit(200.0)
print(account.get_balance())   # 700.0
account.withdraw(100.0)
print(account.get_balance())   # 600.0
print(account.withdraw(9999))  # False
```

---

## Creating Multiple Objects

One class, many objects. Each object has its own data.

```python
class Rectangle:
    def __init__(self, width: float, height: float) -> None:
        self.width: float = width
        self.height: float = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

r1: Rectangle = Rectangle(5.0, 3.0)
r2: Rectangle = Rectangle(10.0, 7.0)

print(r1.area())      # 15.0
print(r2.area())      # 70.0
print(r1.perimeter())  # 16.0
```

Changing one object does not affect another:

```python
r1.width = 100.0
print(r1.area())  # 300.0
print(r2.area())  # 70.0 -- unchanged
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Book with instance variables title (str), author (str), and pages (int). Add a method called is_long() that returns True if the book has more than 300 pages. Create three Book objects and test is_long() on each. Use type hints everywhere."</div>
</div>

---

## Type Hints with Classes

When you define a class, the class name itself becomes a type you can use in type hints.

```python
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

def distance_from_origin(point: Point) -> float:
    return (point.x ** 2 + point.y ** 2) ** 0.5

p: Point = Point(3.0, 4.0)
print(distance_from_origin(p))  # 5.0
```

You can use your class as a type for function parameters, return values, and variable annotations -- just like `str`, `int`, or `float`.

```python
def find_closest(points: list[Point], target: Point) -> Point:
    closest: Point = points[0]
    best_dist: float = float("inf")
    for p in points:
        dist: float = ((p.x - target.x) ** 2 + (p.y - target.y) ** 2) ** 0.5
        if dist < best_dist:
            best_dist = dist
            closest = p
    return closest
```

---

## Private by Convention: Underscores

Python does not have truly private attributes like some languages. Instead, it uses naming conventions.

**Single underscore `_`** -- "Hey, this is internal. Don't use it from outside."

```python
class User:
    def __init__(self, name: str, password: str) -> None:
        self.name: str = name
        self._password: str = password  # Convention: internal use only

    def check_password(self, attempt: str) -> bool:
        return self._password == attempt
```

**Double underscore `__`** -- Name mangling. Python actually renames it to make it harder to access from outside.

```python
class Secret:
    def __init__(self) -> None:
        self.__hidden: str = "you can't easily reach me"

s: Secret = Secret()
# print(s.__hidden)            # AttributeError!
# print(s._Secret__hidden)    # Works but don't do this
```

The rule: use single underscore for "please don't touch this." Double underscore is rarely needed.

---

## The `@property` Decorator -- Controlled Attribute Access

Sometimes you want to control what happens when someone reads or sets an attribute. The `@property` decorator lets you do this.

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius: float = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9 / 5 + 32
```

Open your editor. Type this. Run it.

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius: float = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9 / 5 + 32

temp: Temperature = Temperature(100.0)
print(temp.celsius)     # 100.0
print(temp.fahrenheit)  # 212.0
temp.celsius = 0.0
print(temp.fahrenheit)  # 32.0
# temp.celsius = -300   # ValueError!
```

Notice: you access `celsius` and `fahrenheit` like regular attributes (no parentheses), but behind the scenes, methods are running.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Circle with a private _radius attribute. Use @property to make radius readable and writable, but raise a ValueError if someone tries to set a negative radius. Add a read-only property called area. Type-hint everything."</div>
</div>

---

## `@staticmethod` and `@classmethod`

### Static Methods

A static method belongs to the class but does not need access to `self` or the class itself. It is just a regular function that lives inside the class for organization.

```python
class MathHelper:
    @staticmethod
    def is_even(number: int) -> bool:
        return number % 2 == 0

    @staticmethod
    def celsius_to_fahrenheit(celsius: float) -> float:
        return celsius * 9 / 5 + 32

# Call without creating an object
print(MathHelper.is_even(4))                  # True
print(MathHelper.celsius_to_fahrenheit(100))   # 212.0
```

### Class Methods

A class method gets the class itself (not an instance) as its first argument. Commonly used for alternative constructors.

```python
class Date:
    def __init__(self, year: int, month: int, day: int) -> None:
        self.year: int = year
        self.month: int = month
        self.day: int = day

    @classmethod
    def from_string(cls, date_string: str) -> "Date":
        year, month, day = map(int, date_string.split("-"))
        return cls(year, month, day)

    def display(self) -> str:
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

# Normal constructor
d1: Date = Date(2025, 6, 15)

# Alternative constructor using class method
d2: Date = Date.from_string("2025-12-25")

print(d1.display())  # 2025-06-15
print(d2.display())  # 2025-12-25
```

The key difference: `@staticmethod` gets no automatic arguments. `@classmethod` gets the class (`cls`) as its first argument.

---

## When to Use Classes vs Plain Functions

Not everything needs to be a class. Here is a simple guide:

**Use a class when:**
- You have data and behavior that belong together.
- You need multiple instances with the same structure but different data.
- You want to model a real-world thing (a user, an account, a product).

**Use a plain function when:**
- You are just transforming input to output.
- There is no state to keep track of.
- A single function does the job.

```python
# This does NOT need a class
class Adder:
    def add(self, a: int, b: int) -> int:
        return a + b

# Just use a function!
def add(a: int, b: int) -> int:
    return a + b
```

Do not wrap everything in a class just because you can. If a function works, use a function.

---

## Practical Example: Student Roster

Open your editor. Type this. Run it.

```python
class Student:
    def __init__(self, name: str, student_id: str) -> None:
        self.name: str = name
        self.student_id: str = student_id
        self.grades: list[float] = []

    def add_grade(self, grade: float) -> None:
        if 0.0 <= grade <= 100.0:
            self.grades.append(grade)
        else:
            print(f"Invalid grade: {grade}")

    def average(self) -> float:
        if not self.grades:
            return 0.0
        return sum(self.grades) / len(self.grades)

    def is_passing(self) -> bool:
        return self.average() >= 60.0

    def display(self) -> str:
        avg: float = self.average()
        status: str = "PASS" if self.is_passing() else "FAIL"
        return f"{self.name} ({self.student_id}) - Avg: {avg:.1f} [{status}]"


# Create students
alice: Student = Student("Alice", "S001")
bob: Student = Student("Bob", "S002")

# Add grades
alice.add_grade(95.0)
alice.add_grade(87.0)
alice.add_grade(92.0)

bob.add_grade(55.0)
bob.add_grade(62.0)
bob.add_grade(48.0)

# Display results
print(alice.display())  # Alice (S001) - Avg: 91.3 [PASS]
print(bob.display())    # Bob (S002) - Avg: 55.0 [FAIL]
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called ShoppingCart. It should have an owner name and a list of items (each item is a dict with 'name' and 'price'). Add methods to: add an item, remove an item by name, calculate the total, and display all items. Use type hints on everything. Create a cart, add 3 items, remove one, and print the total."</div>
</div>

---

## Where People Go Wrong

### Forgetting `self`

```python
# WRONG -- missing self
class Dog:
    def __init__(name: str) -> None:  # Where is self?
        name = name  # This does nothing useful

# RIGHT
class Dog:
    def __init__(self, name: str) -> None:
        self.name = name
```

### Confusing Class Variables and Instance Variables

```python
# DANGEROUS -- mutable class variable shared by all instances
class Team:
    members: list[str] = []  # Shared! Every Team shares this list!

    def add_member(self, name: str) -> None:
        self.members.append(name)

t1: Team = Team()
t2: Team = Team()
t1.add_member("Alice")
print(t2.members)  # ['Alice'] -- Surprise! t2 has Alice too!

# FIX -- use instance variable
class Team:
    def __init__(self) -> None:
        self.members: list[str] = []  # Each Team gets its own list

    def add_member(self, name: str) -> None:
        self.members.append(name)
```

### Overusing OOP

If you find yourself writing a class with no `__init__` and only static methods, you do not need a class. Use functions instead.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain the bug in this code: class Counter: count: int = 0; def increment(self) -> None: self.count += 1. What happens when you create two Counter objects and increment one of them? How would you fix it?"</div>
</div>

---

## Summary

- A **class** is a blueprint. An **object** is a specific thing made from that blueprint.
- `__init__` sets up new objects. `self` refers to the current object.
- **Instance variables** (`self.x`) belong to one object. **Class variables** are shared.
- **Methods** are functions inside a class that operate on the object's data.
- Use `@property` for controlled access. Use `_underscore` for private-by-convention.
- `@staticmethod` needs no instance. `@classmethod` gets the class as its first argument.
- Do not overuse classes. If a function works, use a function.

---

**Previous:** [[wiki:python-modules]] | **Next:** [[wiki:python-inheritance]]
