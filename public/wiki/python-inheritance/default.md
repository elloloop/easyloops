# Inheritance and Polymorphism -- Reusing and Extending Types

## The Problem: Types That Share Behavior

Imagine you are building a program with different kinds of employees -- managers, engineers, interns. They all have a name, a salary, and a method to display their info. But each type also has unique behavior: managers have a team, engineers have a specialty, interns have an end date.

You could copy-paste the shared code into each class. But that means if you fix a bug in one place, you have to fix it in three places. That is a maintenance nightmare.

Inheritance solves this. You write the shared code once in a parent class, then each child class reuses that code and adds its own unique pieces.

---

## What Is Inheritance?

Inheritance means creating a new class based on an existing one. The new class gets everything the existing class has -- all its methods and attributes -- for free.

- The existing class is called the **parent class** (or base class or superclass).
- The new class is called the **child class** (or derived class or subclass).

Think of it this way: "A Dog is an Animal." The Dog class inherits from the Animal class. Every dog has everything an animal has, plus dog-specific things.

---

## Basic Inheritance

Open your editor. Type this. Run it.

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name} says Meow!"

dog: Dog = Dog("Rex")
cat: Cat = Cat("Whiskers")

print(dog.speak())   # Rex says Woof!
print(cat.speak())   # Whiskers says Meow!
print(dog.name)      # Rex -- inherited from Animal
```

Notice: `Dog` and `Cat` never define `__init__` or `self.name`. They get those from `Animal` automatically. That is inheritance -- the child gets everything the parent has.

The syntax is simple: `class ChildClass(ParentClass):`.

---

## `super()` -- Calling the Parent's Methods

When a child class needs to do everything the parent does, plus something extra, use `super()` to call the parent's method.

```python
class Animal:
    def __init__(self, name: str, sound: str) -> None:
        self.name: str = name
        self.sound: str = sound

class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name, "Woof")  # Call Animal's __init__
        self.breed: str = breed          # Add dog-specific data

    def info(self) -> str:
        return f"{self.name} is a {self.breed} that says {self.sound}"

rex: Dog = Dog("Rex", "German Shepherd")
print(rex.info())  # Rex is a German Shepherd that says Woof
```

`super().__init__(name, "Woof")` says: "Run the parent's `__init__` method first, so `self.name` and `self.sound` get set up. Then I will add my own stuff."

Without `super()`, the child would skip the parent's setup entirely, and `self.name` and `self.sound` would not exist.

Open your editor. Type this. Run it.

```python
class Employee:
    def __init__(self, name: str, salary: float) -> None:
        self.name: str = name
        self.salary: float = salary

    def display(self) -> str:
        return f"{self.name} - ${self.salary:,.2f}/year"

class Manager(Employee):
    def __init__(self, name: str, salary: float, team_size: int) -> None:
        super().__init__(name, salary)
        self.team_size: int = team_size

    def display(self) -> str:
        base: str = super().display()
        return f"{base} (manages {self.team_size} people)"

class Engineer(Employee):
    def __init__(self, name: str, salary: float, language: str) -> None:
        super().__init__(name, salary)
        self.language: str = language

    def display(self) -> str:
        base: str = super().display()
        return f"{base} (codes in {self.language})"

mgr: Manager = Manager("Alice", 120000.0, 8)
eng: Engineer = Engineer("Bob", 95000.0, "Python")

print(mgr.display())  # Alice - $120,000.00/year (manages 8 people)
print(eng.display())   # Bob - $95,000.00/year (codes in Python)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a parent class Vehicle with name and speed attributes. Create two child classes: Car (adds num_doors) and Motorcycle (adds has_sidecar as a bool). Each child should call super().__init__() and have a describe() method. Use type hints everywhere."</div>
</div>

---

## Method Overriding -- Replacing Parent Behavior

When a child class defines a method with the same name as the parent, the child's version replaces the parent's version. This is called **overriding**.

```python
class Shape:
    def area(self) -> float:
        return 0.0

    def description(self) -> str:
        return f"Shape with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

class Square(Shape):
    def __init__(self, side: float) -> None:
        self.side: float = side

    def area(self) -> float:
        return self.side ** 2

c: Circle = Circle(5.0)
s: Square = Square(4.0)

print(c.description())  # Shape with area 78.54
print(s.description())  # Shape with area 16.00
```

Notice something powerful: `description()` is defined in `Shape`, and it calls `self.area()`. When a `Circle` calls `description()`, `self.area()` runs the `Circle` version. When a `Square` calls it, `self.area()` runs the `Square` version. The parent's method automatically uses the child's override.

---

## Adding New Methods in Child Classes

Children can have methods the parent does not have.

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says Woof!"

    def fetch(self, item: str) -> str:
        return f"{self.name} fetches the {item}!"

dog: Dog = Dog("Rex")
print(dog.speak())          # Rex says Woof!
print(dog.fetch("ball"))    # Rex fetches the ball!

# animal: Animal = Animal("Generic")
# animal.fetch("ball")  # Error! Animal has no fetch method
```

The child has everything the parent has, plus its own extras. The parent does not gain the child's methods.

---

## `isinstance()` and `issubclass()` -- Checking Types

`isinstance()` checks if an object is an instance of a class (or any of its parents).

```python
class Animal:
    pass

class Dog(Animal):
    pass

rex: Dog = Dog()

print(isinstance(rex, Dog))     # True -- rex is a Dog
print(isinstance(rex, Animal))  # True -- rex is also an Animal
print(isinstance(rex, str))     # False -- rex is not a string
```

`issubclass()` checks if one class is a child of another.

```python
print(issubclass(Dog, Animal))  # True -- Dog inherits from Animal
print(issubclass(Animal, Dog))  # False -- Animal does not inherit from Dog
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "If Dog inherits from Animal, and rex is a Dog, explain why isinstance(rex, Animal) returns True. Then explain the difference between isinstance() and issubclass()."</div>
</div>

---

## What Is Polymorphism?

Polymorphism means "many forms." In programming, it means you can treat different types the same way, and each type responds in its own way.

Here is the idea: you write a function that takes an `Animal` and calls `.speak()`. You do not care what kind of animal it is. Dogs bark, cats meow, snakes hiss -- but your function just calls `.speak()` and the right thing happens.

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name}: Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name}: Meow!"

class Snake(Animal):
    def speak(self) -> str:
        return f"{self.name}: Hiss!"

def make_all_speak(animals: list[Animal]) -> None:
    for animal in animals:
        print(animal.speak())

# Different types, same interface
pets: list[Animal] = [Dog("Rex"), Cat("Whiskers"), Snake("Slinky")]
make_all_speak(pets)
# Rex: Woof!
# Whiskers: Meow!
# Slinky: Hiss!
```

`make_all_speak` does not know or care about the specific type. It just calls `.speak()`. Each object responds in its own way. That is polymorphism.

This is powerful because you can add new animal types later without changing `make_all_speak` at all.

---

## Abstract Base Classes -- Enforcing a Contract

Sometimes you want to say: "Every child class MUST implement these methods." An abstract base class (ABC) lets you enforce that rule.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

    def describe(self) -> str:
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"
```

Now if you try to create a child class that does not implement `area()` or `perimeter()`, Python raises an error.

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

    def describe(self) -> str:
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, width: float, height: float) -> None:
        self.width: float = width
        self.height: float = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# shape = Shape()  # TypeError! Can't create an abstract class

c: Circle = Circle(5.0)
r: Rectangle = Rectangle(4.0, 6.0)

print(c.describe())  # Area: 78.54, Perimeter: 31.42
print(r.describe())  # Area: 24.00, Perimeter: 20.00
```

You cannot create a `Shape()` directly -- it is abstract. You can only create concrete children that implement all the abstract methods.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create an abstract base class called PaymentMethod with an abstract method process_payment(amount: float) -> bool. Then create two concrete classes: CreditCard and BankTransfer, each implementing process_payment differently. Write a function that takes a list of PaymentMethod objects and processes a payment with each one."</div>
</div>

---

## Composition vs Inheritance -- "Has-a" vs "Is-a"

There are two ways to reuse code between classes.

**Inheritance** (is-a): A Dog IS an Animal. The Dog class inherits from Animal.

**Composition** (has-a): A Car HAS an Engine. The Car class contains an Engine object.

```python
# Inheritance -- "is-a"
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

class Dog(Animal):  # Dog IS an Animal
    pass

# Composition -- "has-a"
class Engine:
    def __init__(self, horsepower: int) -> None:
        self.horsepower: int = horsepower

    def start(self) -> str:
        return f"Engine ({self.horsepower}hp) started"

class Car:
    def __init__(self, make: str, engine: Engine) -> None:
        self.make: str = make
        self.engine: Engine = engine  # Car HAS an Engine

    def start(self) -> str:
        return f"{self.make}: {self.engine.start()}"

engine: Engine = Engine(200)
car: Car = Car("Toyota", engine)
print(car.start())  # Toyota: Engine (200hp) started
```

**When to use which:**

- Use inheritance when the child truly IS a type of the parent. A Dog IS an Animal.
- Use composition when one thing HAS or USES another thing. A Car HAS an Engine.
- When in doubt, **prefer composition.** It is more flexible and easier to change later.

```python
# Composition is often better than inheritance
class Logger:
    def log(self, message: str) -> None:
        print(f"[LOG] {message}")

class Database:
    def __init__(self, logger: Logger) -> None:
        self.logger: Logger = logger  # HAS a logger

    def save(self, data: str) -> None:
        self.logger.log(f"Saving: {data}")
        print(f"Data saved: {data}")

# Better than: class Database(Logger) -- a database is NOT a logger
```

---

## Multiple Inheritance -- Brief Warning

Python allows a class to inherit from more than one parent. This is called multiple inheritance.

```python
class Swimmer:
    def swim(self) -> str:
        return "Swimming!"

class Flyer:
    def fly(self) -> str:
        return "Flying!"

class Duck(Swimmer, Flyer):
    def quack(self) -> str:
        return "Quack!"

duck: Duck = Duck()
print(duck.swim())   # Swimming!
print(duck.fly())    # Flying!
print(duck.quack())  # Quack!
```

This looks nice, but it gets complicated fast. When two parents have the same method, which one does the child use? Python has a system called the **Method Resolution Order (MRO)** that decides, but it can be confusing.

```python
# Check the MRO
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Swimmer'>, <class 'Flyer'>, <class 'object'>)
```

**Rule of thumb:** Avoid multiple inheritance in most cases. Use composition instead. If you must use it, keep it simple and be aware of the MRO.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "You need a class called SmartHome that uses logging, has sensors, and controls lights. Should SmartHome inherit from Logger, SensorSystem, and LightController? Or should it use composition? Explain your reasoning and write the code using the better approach, with type hints."</div>
</div>

---

## Practical Example: Employee Hierarchy

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, name: str, employee_id: str, base_salary: float) -> None:
        self.name: str = name
        self.employee_id: str = employee_id
        self.base_salary: float = base_salary

    @abstractmethod
    def calculate_pay(self) -> float:
        pass

    def display(self) -> str:
        pay: float = self.calculate_pay()
        return f"{self.name} ({self.employee_id}) - Pay: ${pay:,.2f}"

class FullTimeEmployee(Employee):
    def __init__(self, name: str, employee_id: str, base_salary: float,
                 bonus: float) -> None:
        super().__init__(name, employee_id, base_salary)
        self.bonus: float = bonus

    def calculate_pay(self) -> float:
        return self.base_salary + self.bonus

class PartTimeEmployee(Employee):
    def __init__(self, name: str, employee_id: str, hourly_rate: float,
                 hours_worked: float) -> None:
        super().__init__(name, employee_id, hourly_rate)
        self.hours_worked: float = hours_worked

    def calculate_pay(self) -> float:
        return self.base_salary * self.hours_worked

class Contractor(Employee):
    def __init__(self, name: str, employee_id: str, project_fee: float) -> None:
        super().__init__(name, employee_id, project_fee)

    def calculate_pay(self) -> float:
        return self.base_salary


def print_payroll(employees: list[Employee]) -> None:
    total: float = 0.0
    for emp in employees:
        print(emp.display())
        total += emp.calculate_pay()
    print(f"\nTotal payroll: ${total:,.2f}")


staff: list[Employee] = [
    FullTimeEmployee("Alice", "FT-001", 80000.0, 5000.0),
    PartTimeEmployee("Bob", "PT-001", 25.0, 80.0),
    Contractor("Charlie", "CT-001", 15000.0),
]

print_payroll(staff)
# Alice (FT-001) - Pay: $85,000.00
# Bob (PT-001) - Pay: $2,000.00
# Charlie (CT-001) - Pay: $15,000.00
#
# Total payroll: $102,000.00
```

This uses inheritance, abstract methods, and polymorphism together. The `print_payroll` function does not care what kind of employee each object is. It just calls `display()` and `calculate_pay()`, and each type does the right thing.

---

## Where People Go Wrong

### Deep Inheritance Trees

```python
# BAD -- too many levels
class Animal:
    pass
class Mammal(Animal):
    pass
class DomesticMammal(Mammal):
    pass
class Pet(DomesticMammal):
    pass
class Dog(Pet):
    pass
```

Keep your inheritance shallow. One or two levels is usually enough.

### Using Inheritance When Composition Is Better

```python
# BAD -- a car is not an engine
class Engine:
    def start(self) -> str:
        return "Vroom"

class Car(Engine):  # Wrong! A car is not an engine.
    pass

# GOOD -- a car has an engine
class Car:
    def __init__(self, engine: Engine) -> None:
        self.engine: Engine = engine
```

### Forgetting `super()`

```python
# BAD -- parent's __init__ never runs
class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        # Forgot super().__init__(name)!
        self.breed = breed

rex: Dog = Dog("Rex", "Lab")
# print(rex.name)  # AttributeError! name was never set
```

Always call `super().__init__()` if the parent has an `__init__` you need.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Look at this code: class A has method greet() that returns 'Hello from A'. Class B(A) overrides greet() to return 'Hello from B'. Class C(B) does not override greet(). What does C().greet() return? Explain the chain Python follows to find the method."</div>
</div>

---

## Summary

- **Inheritance** lets a child class reuse code from a parent class. The child IS a type of the parent.
- **`super()`** calls the parent's method. Always use it in `__init__` to set up inherited data.
- **Method overriding** lets a child replace the parent's behavior with its own version.
- **Polymorphism** means different types respond to the same method call in their own way.
- **Abstract base classes** enforce that children must implement certain methods.
- **Composition** (has-a) is often better than inheritance (is-a). Prefer it when in doubt.
- **Multiple inheritance** exists but keep it simple or avoid it.

---

**Previous:** [[wiki:python-classes]] | **Next:** [[wiki:python-special-methods]]
