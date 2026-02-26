# Composition in Python

## Basic Composition

Instead of inheritance, use objects as attributes.

```python
# Composition approach
class Engine:
    def start(self):
        return "Engine started"

    def stop(self):
        return "Engine stopped"

class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A Engine

    def start(self):
        return self.engine.start()

    def stop(self):
        return self.engine.stop()

car = Car()
print(car.start())  # Engine started
print(car.stop())   # Engine stopped
```

## Multiple Components

Combine multiple objects for complex behavior.

```python
class Engine:
    def start(self):
        return "Engine running"

class Wheels:
    def __init__(self, count=4):
        self.count = count

    def rotate(self):
        return f"{self.count} wheels rotating"

class Stereo:
    def play(self):
        return "Music playing"

class Car:
    def __init__(self):
        self.engine = Engine()
        self.wheels = Wheels(4)
        self.stereo = Stereo()

    def drive(self):
        return f"{self.engine.start()}, {self.wheels.rotate()}"

    def relax(self):
        return self.stereo.play()

car = Car()
print(car.drive())  # Engine running, 4 wheels rotating
print(car.relax())  # Music playing
```

## Dependency Injection

Inject components via constructor for flexibility.

```python
class Engine:
    def start(self):
        return "Engine started"

class ElectricEngine:
    def start(self):
        return "Electric motor started (silent)"

class Car:
    def __init__(self, engine):
        self.engine = engine  # Injected dependency

    def start(self):
        return self.engine.start()

# Can use different engines
gas_car = Car(Engine())
electric_car = Car(ElectricEngine())

print(gas_car.start())      # Engine started
print(electric_car.start()) # Electric motor started (silent)
```

## Strategy Pattern

Change behavior at runtime by swapping components.

```python
class AttackStrategy:
    def execute(self):
        pass

class SwordAttack(AttackStrategy):
    def execute(self):
        return "Slash with sword! ⚔️"

class BowAttack(AttackStrategy):
    def execute(self):
        return "Shoot arrow! 🏹"

class MagicAttack(AttackStrategy):
    def execute(self):
        return "Cast fireball! 🔥"

class Player:
    def __init__(self, name):
        self.name = name
        self.attack_strategy = None

    def set_attack(self, strategy):
        self.attack_strategy = strategy

    def attack(self):
        if self.attack_strategy:
            return self.attack_strategy.execute()
        return "No weapon equipped"

# Usage
player = Player("Hero")

player.set_attack(SwordAttack())
print(player.attack())  # Slash with sword! ⚔️

player.set_attack(MagicAttack())
print(player.attack())  # Cast fireball! 🔥
```

## Interface-Based Composition

Use abstract base classes as interfaces.

```python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCard(PaymentMethod):
    def pay(self, amount):
        return f"Paid ${amount} with credit card"

class PayPal(PaymentMethod):
    def pay(self, amount):
        return f"Paid ${amount} via PayPal"

class Cryptocurrency(PaymentMethod):
    def pay(self, amount):
        return f"Paid ${amount} in Bitcoin"

class Checkout:
    def __init__(self, payment_method: PaymentMethod):
        self.payment = payment_method

    def process(self, amount):
        return self.payment.pay(amount)

# Can switch payment methods easily
checkout1 = Checkout(CreditCard())
checkout2 = Checkout(PayPal())

print(checkout1.process(100))  # Paid $100 with credit card
print(checkout2.process(50))   # Paid $50 via PayPal
```

## Real-World Example: Computer Builder

```python
class CPU:
    def __init__(self, model):
        self.model = model

    def info(self):
        return f"CPU: {self.model}"

class RAM:
    def __init__(self, size_gb):
        self.size = size_gb

    def info(self):
        return f"RAM: {self.size}GB"

class Storage:
    def __init__(self, size_gb, storage_type):
        self.size = size_gb
        self.type = storage_type

    def info(self):
        return f"Storage: {self.size}GB {self.type}"

class Computer:
    def __init__(self, cpu, ram, storage):
        self.cpu = cpu
        self.ram = ram
        self.storage = storage

    def specs(self):
        return f"""
Computer Specifications:
- {self.cpu.info()}
- {self.ram.info()}
- {self.storage.info()}
"""

# Build different computers
gaming_pc = Computer(
    CPU("Intel i9"),
    RAM(32),
    Storage(2000, "SSD")
)

office_pc = Computer(
    CPU("Intel i5"),
    RAM(8),
    Storage(500, "HDD")
)

print(gaming_pc.specs())
print(office_pc.specs())
```

## Composition with Multiple Levels

```python
class Battery:
    def __init__(self, capacity):
        self.capacity = capacity

    def charge_level(self):
        return f"{self.capacity}mAh battery"

class Screen:
    def __init__(self, size):
        self.size = size

    def display(self):
        return f"{self.size} inch display"

class Camera:
    def __init__(self, megapixels):
        self.mp = megapixels

    def take_photo(self):
        return f"Photo taken with {self.mp}MP camera"

class Phone:
    def __init__(self, battery, screen, camera):
        self.battery = battery
        self.screen = screen
        self.camera = camera

    def info(self):
        return f"""
Phone:
- {self.battery.charge_level()}
- {self.screen.display()}
- {self.camera.take_photo()}
"""

phone = Phone(
    Battery(4000),
    Screen(6.5),
    Camera(48)
)

print(phone.info())
```

## Mixin Pattern (Composition Alternative)

Use mixins to add functionality without strict inheritance.

```python
class JSONMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, message):
        print(f"[LOG] {message}")

class User(JSONMixin, LogMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def save(self):
        self.log(f"Saving user {self.name}")
        data = self.to_json()
        # Save to database...
        return data

user = User("Alice", "alice@example.com")
print(user.to_json())  # {"name": "Alice", "email": "alice@example.com"}
user.log("User created")  # [LOG] User created
```

## Testing with Composition

Easy to mock components for testing.

```python
class Database:
    def save(self, data):
        # Real database logic
        return "Saved to database"

class MockDatabase:
    def save(self, data):
        return "Saved to mock (testing)"

class UserService:
    def __init__(self, database):
        self.db = database

    def create_user(self, name):
        user_data = {"name": name}
        return self.db.save(user_data)

# Production
prod_service = UserService(Database())
print(prod_service.create_user("Alice"))

# Testing
test_service = UserService(MockDatabase())
print(test_service.create_user("Test User"))
```

## Aggregation vs Composition

```python
# Aggregation - parts can exist independently
class Student:
    def __init__(self, name):
        self.name = name

class University:
    def __init__(self):
        self.students = []  # Students can exist without university

    def enroll(self, student):
        self.students.append(student)

# Composition - parts cannot exist independently
class Room:
    def __init__(self, name):
        self.name = name

class House:
    def __init__(self):
        self.rooms = [  # Rooms are part of house
            Room("Kitchen"),
            Room("Bedroom")
        ]
```

## Related Concepts

- [[wiki:inheritance]] - Alternative approach
- [[wiki:class]] - Component building blocks
- [[wiki:dependency-injection]] - Injecting components
