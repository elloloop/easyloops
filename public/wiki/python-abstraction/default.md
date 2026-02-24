# Abstraction -- Hiding Complexity, Showing What Matters

## The Problem: Too Much Detail

You use `len("hello")` and get `5`. You do not think about how Python counts the characters. You do not care whether it walks through each character one by one or reads a stored length value. You just call `len()` and get a number.

That is abstraction. Someone hid the complexity and gave you a simple interface.

Now imagine building a payment system. You have credit cards, bank transfers, and digital wallets. Each one works completely differently behind the scenes -- different APIs, different protocols, different error handling. But the rest of your code should not care about those details. It should just call `process_payment(amount)` and get a result.

Abstraction lets you define *what* something does without specifying *how* it does it.

---

## What Is Abstraction?

Abstraction means **exposing only the essential features of something while hiding the implementation details**.

You interact with abstractions every day:
- **A car's steering wheel.** You turn it. You do not think about the rack and pinion mechanism.
- **A TV remote.** You press volume up. You do not think about the infrared signal encoding.
- **A Python dictionary.** You write `d["key"]`. You do not think about hash functions and collision resolution.

In programming, abstraction means defining **what** operations an object supports without dictating **how** those operations are implemented.

---

## Abstraction vs Encapsulation

These two are often confused. They are related but different.

**Encapsulation** is about **protecting data** -- controlling who can access what. It answers: "How do I prevent people from breaking my object's internal state?"

**Abstraction** is about **simplifying interfaces** -- hiding complexity. It answers: "How do I let people use my object without knowing how it works inside?"

```python
class BankAccount:
    def __init__(self, owner: str, balance: float) -> None:
        self._balance: float = balance    # Encapsulation: protecting internal data
        self.owner: str = owner

    def deposit(self, amount: float) -> None:   # Abstraction: simple interface
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self._log_transaction("deposit", amount)  # Hidden detail

    def _log_transaction(self, kind: str, amount: float) -> None:
        pass  # Encapsulation: hidden helper method
```

- `_balance` is encapsulation -- protecting the data.
- `deposit(amount)` is abstraction -- a simple interface that hides the logging, validation, and state management.

Both work together, but they are solving different problems.

---

## Abstract Base Classes -- Defining a Contract

Python's primary tool for abstraction is the **Abstract Base Class (ABC)**. An ABC defines methods that child classes **must** implement. You cannot create an instance of the ABC itself -- it is a blueprint only.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass
```

`Shape` says: "Any shape must be able to compute its area and perimeter." It does not say *how*. Each concrete shape (circle, rectangle, triangle) decides that for itself.

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

# shape = Shape()  # TypeError: Can't instantiate abstract class

c: Circle = Circle(5.0)
r: Rectangle = Rectangle(4.0, 6.0)

print(c.describe())  # Area: 78.54, Perimeter: 31.42
print(r.describe())  # Area: 24.00, Perimeter: 20.00
```

Key things to notice:
1. `Shape` cannot be instantiated. It is abstract.
2. `Circle` and `Rectangle` must implement both `area()` and `perimeter()`. If they skip one, Python raises a `TypeError`.
3. `describe()` is a **concrete method** on the ABC. It uses the abstract methods but does not need to be overridden.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create an abstract class called Animal with abstract methods speak() -> str and move() -> str. Add a concrete method describe() that calls both. Then create Dog and Fish classes that implement the abstract methods differently. Show that you cannot create an Animal directly."</div>
</div>

---

## Why Use Abstract Classes?

You might wonder: "Why not just write the child classes and skip the abstract parent?"

Abstract classes give you three things:

### 1. Enforced Contracts

Without an ABC, forgetting to implement a method is a silent bug:

```python
# Without ABC -- silent bug
class Shape:
    def area(self) -> float:
        return 0.0

class Triangle(Shape):
    def __init__(self, base: float, height: float) -> None:
        self.base: float = base
        self.height: float = height
    # Oops -- forgot to override area()!

t: Triangle = Triangle(3.0, 4.0)
print(t.area())  # 0.0 -- wrong answer, no error
```

With an ABC, the error is caught immediately:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Triangle(Shape):
    def __init__(self, base: float, height: float) -> None:
        self.base: float = base
        self.height: float = height
    # Forgot to implement area()!

# t = Triangle(3.0, 4.0)  # TypeError: Can't instantiate abstract class
```

### 2. Shared Behavior

An ABC can provide concrete methods that all children share:

```python
from abc import ABC, abstractmethod

class Exporter(ABC):
    @abstractmethod
    def format_data(self, data: list[dict[str, str]]) -> str:
        pass

    def export(self, data: list[dict[str, str]], filename: str) -> None:
        formatted: str = self.format_data(data)
        with open(filename, "w") as f:
            f.write(formatted)
        print(f"Exported to {filename}")
```

`export()` is shared by all exporters. Only `format_data()` differs between CSV, JSON, XML, etc.

### 3. Type Safety

ABCs let you write functions that accept "any shape" or "any exporter":

```python
def total_area(shapes: list[Shape]) -> float:
    return sum(s.area() for s in shapes)
```

This function works with any current or future shape. You can add a `Pentagon` class next year, and `total_area` will work without changes.

---

## Abstract Properties

You can also make properties abstract:

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @property
    @abstractmethod
    def fuel_type(self) -> str:
        pass

    @property
    @abstractmethod
    def max_speed(self) -> float:
        pass

    def describe(self) -> str:
        return f"Vehicle: {self.fuel_type}, max {self.max_speed:.0f} km/h"

class Car(Vehicle):
    @property
    def fuel_type(self) -> str:
        return "Gasoline"

    @property
    def max_speed(self) -> float:
        return 200.0

class Bicycle(Vehicle):
    @property
    def fuel_type(self) -> str:
        return "Human power"

    @property
    def max_speed(self) -> float:
        return 40.0

car: Car = Car()
bike: Bicycle = Bicycle()
print(car.describe())   # Vehicle: Gasoline, max 200 km/h
print(bike.describe())  # Vehicle: Human power, max 40 km/h
```

---

## Protocols -- Structural Abstraction (Python 3.8+)

ABCs enforce contracts through inheritance. Python also supports another style of abstraction called **structural subtyping** through `Protocol`.

With a Protocol, you do not need to inherit from anything. If your class has the right methods, it satisfies the protocol. This is sometimes called **duck typing made explicit**: "If it walks like a duck and quacks like a duck, it is a duck."

```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> str:
        ...

class Circle:
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def draw(self) -> str:
        return f"Drawing circle with radius {self.radius}"

class Square:
    def __init__(self, side: float) -> None:
        self.side: float = side

    def draw(self) -> str:
        return f"Drawing square with side {self.side}"

def render(shape: Drawable) -> None:
    print(shape.draw())

# Neither Circle nor Square inherits from Drawable.
# But both have a draw() method, so they satisfy the Protocol.
render(Circle(5.0))   # Drawing circle with radius 5.0
render(Square(3.0))   # Drawing square with side 3.0
```

**When to use Protocol vs ABC:**
- Use **ABC** when you want to enforce that classes explicitly opt in to a contract.
- Use **Protocol** when you want to accept any class that happens to have the right methods, regardless of its inheritance tree.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between an ABC and a Protocol in Python? When would you choose one over the other? Write an example where a Protocol makes more sense than an ABC, and explain why."</div>
</div>

---

## Practical Example: Notification System

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class Notifier(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str) -> bool:
        pass

    def send_bulk(self, recipients: list[str], message: str) -> dict[str, bool]:
        results: dict[str, bool] = {}
        for recipient in recipients:
            results[recipient] = self.send(recipient, message)
        return results

class EmailNotifier(Notifier):
    def __init__(self, smtp_server: str) -> None:
        self._server: str = smtp_server

    def send(self, recipient: str, message: str) -> bool:
        print(f"[Email via {self._server}] To: {recipient} - {message}")
        return True

class SMSNotifier(Notifier):
    def __init__(self, api_key: str) -> None:
        self._api_key: str = api_key

    def send(self, recipient: str, message: str) -> bool:
        print(f"[SMS] To: {recipient} - {message}")
        return True

class PushNotifier(Notifier):
    def send(self, recipient: str, message: str) -> bool:
        print(f"[Push] To: {recipient} - {message}")
        return True


def alert_all(notifiers: list[Notifier], message: str) -> None:
    for notifier in notifiers:
        notifier.send_bulk(["alice", "bob"], message)


# Each notifier works completely differently internally.
# But alert_all does not care. It just calls send_bulk().
notifiers: list[Notifier] = [
    EmailNotifier("smtp.example.com"),
    SMSNotifier("key-123"),
    PushNotifier(),
]

alert_all(notifiers, "Server is down!")
# [Email via smtp.example.com] To: alice - Server is down!
# [Email via smtp.example.com] To: bob - Server is down!
# [SMS] To: alice - Server is down!
# [SMS] To: bob - Server is down!
# [Push] To: alice - Server is down!
# [Push] To: bob - Server is down!
```

This is abstraction at work:
- `Notifier` defines **what** a notifier does: `send()` and `send_bulk()`.
- Each subclass defines **how** it sends notifications.
- `alert_all()` does not know or care about SMTP servers, API keys, or push protocols. It works with the abstraction.
- Adding a new notifier (Slack, Discord, carrier pigeon) requires zero changes to `alert_all()`.

---

## Practical Example: Data Storage Abstraction

```python
from abc import ABC, abstractmethod

class DataStore(ABC):
    @abstractmethod
    def save(self, key: str, value: str) -> None:
        pass

    @abstractmethod
    def load(self, key: str) -> str | None:
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        pass

    def exists(self, key: str) -> bool:
        return self.load(key) is not None

class MemoryStore(DataStore):
    def __init__(self) -> None:
        self._data: dict[str, str] = {}

    def save(self, key: str, value: str) -> None:
        self._data[key] = value

    def load(self, key: str) -> str | None:
        return self._data.get(key)

    def delete(self, key: str) -> bool:
        if key in self._data:
            del self._data[key]
            return True
        return False

class FileStore(DataStore):
    def __init__(self, directory: str) -> None:
        self._dir: str = directory

    def save(self, key: str, value: str) -> None:
        print(f"[File] Saving {key} to {self._dir}/{key}.txt")

    def load(self, key: str) -> str | None:
        print(f"[File] Loading {key} from {self._dir}/{key}.txt")
        return None  # Simplified

    def delete(self, key: str) -> bool:
        print(f"[File] Deleting {self._dir}/{key}.txt")
        return True


def backup_user_data(store: DataStore, user_id: str, data: str) -> None:
    store.save(f"user-{user_id}", data)
    if store.exists(f"user-{user_id}"):
        print(f"Backup confirmed for user {user_id}")


# Same function works with any storage backend
memory: MemoryStore = MemoryStore()
backup_user_data(memory, "001", "Alice's data")
# Backup confirmed for user 001

files: FileStore = FileStore("/backups")
backup_user_data(files, "001", "Alice's data")
# [File] Saving user-001 to /backups/user-001.txt
# [File] Loading user-001 from /backups/user-001.txt
```

Tomorrow you might add a `RedisStore` or a `PostgresStore`. The `backup_user_data` function does not change. That is the power of abstraction.

---

## Levels of Abstraction

Good code is organized in layers of abstraction. Each layer hides the details of the layer below.

```
High level:    order.place()
                  ↓
Mid level:     inventory.reserve(items)
               payment.charge(total)
               shipping.schedule(address)
                  ↓
Low level:     SQL queries, API calls, socket connections
```

You should be able to read the high-level code and understand *what* happens without knowing *how* each piece works.

```python
# High-level code reads like English
def place_order(order: Order, payment: PaymentMethod, store: DataStore) -> bool:
    if not order.validate():
        return False
    if not payment.charge(order.total):
        return False
    store.save(order.order_id, order.to_json())
    return True
```

This function is easy to read because each piece is an abstraction. You do not see SQL, HTTP requests, or byte manipulation. Those details live inside the objects.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create an abstract class called Logger with abstract methods log_info(message: str), log_warning(message: str), and log_error(message: str). Add a concrete method log(level: str, message: str) that calls the right method based on the level string. Then create ConsoleLogger and FileLogger concrete classes. Write a function that takes a Logger and logs several messages at different levels. Type-hint everything."</div>
</div>

---

## Where People Go Wrong

### Making Everything Abstract

```python
# BAD -- abstract for no reason
from abc import ABC, abstractmethod

class Calculator(ABC):
    @abstractmethod
    def add(self, a: float, b: float) -> float:
        pass

class BasicCalculator(Calculator):
    def add(self, a: float, b: float) -> float:
        return a + b

# There will only ever be one kind of calculator.
# The ABC adds complexity for no benefit.

# GOOD -- just a regular class
class Calculator:
    def add(self, a: float, b: float) -> float:
        return a + b
```

Abstraction makes sense when you have (or expect) **multiple implementations**. If there is only one implementation, skip the ABC.

### Leaky Abstractions

```python
# BAD -- the abstraction leaks implementation details
class DataStore(ABC):
    @abstractmethod
    def execute_sql(self, query: str) -> list[dict]:  # SQL-specific!
        pass

# What if someone wants a file-based store? It does not use SQL.
# The abstraction assumed a specific implementation.

# GOOD -- implementation-agnostic
class DataStore(ABC):
    @abstractmethod
    def save(self, key: str, value: str) -> None:
        pass

    @abstractmethod
    def load(self, key: str) -> str | None:
        pass
```

A good abstraction does not reveal what is behind it. If your abstract method names mention specific technologies (SQL, HTTP, JSON files), the abstraction is leaking.

---

## Summary

- **Abstraction** means hiding complexity and exposing only what matters.
- **Abstract Base Classes (ABCs)** define contracts: methods that child classes must implement.
- **`@abstractmethod`** marks methods that have no implementation in the base class.
- ABCs cannot be instantiated directly. They exist only as blueprints.
- ABCs provide **enforced contracts**, **shared behavior**, and **type safety**.
- **Protocols** offer structural abstraction -- no inheritance required, just matching methods.
- Abstraction and encapsulation work together but solve different problems.
- Do not create ABCs when there is only one implementation. Keep it simple.
- Good abstractions do not leak implementation details.

---

**Previous:** [[wiki:python-inheritance]] | **Next:** [[wiki:python-special-methods]]