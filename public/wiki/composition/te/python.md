# Python lo Composition

## Basic Composition

Inheritance badulu objects ni attributes ga use cheyochu.

```python
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A Engine

    def start(self):
        return self.engine.start()

car = Car()
print(car.start())  # Engine started
```

## Multiple Components

Multiple objects combine chesi complex behavior.

```python
class Engine:
    def start(self):
        return "Engine running"

class Wheels:
    def rotate(self):
        return "Wheels rotating"

class Stereo:
    def play(self):
        return "Music playing"

class Car:
    def __init__(self):
        self.engine = Engine()
        self.wheels = Wheels()
        self.stereo = Stereo()

    def drive(self):
        return f"{self.engine.start()}, {self.wheels.rotate()}"

car = Car()
print(car.drive())  # Engine running, Wheels rotating
```

## Dependency Injection

Constructor dwara components inject cheyochu.

```python
class Engine:
    def start(self):
        return "Gas engine"

class ElectricEngine:
    def start(self):
        return "Electric motor (silent)"

class Car:
    def __init__(self, engine):
        self.engine = engine  # Injected

    def start(self):
        return self.engine.start()

# Different engines tho
gas_car = Car(Engine())
electric_car = Car(ElectricEngine())

print(gas_car.start())      # Gas engine
print(electric_car.start()) # Electric motor (silent)
```

## Strategy Pattern

Runtime lo behavior change cheyyadam.

```python
class SwordAttack:
    def execute(self):
        return "Slash! ⚔️"

class BowAttack:
    def execute(self):
        return "Arrow! 🏹"

class MagicAttack:
    def execute(self):
        return "Fireball! 🔥"

class Player:
    def __init__(self, name):
        self.name = name
        self.weapon = None

    def equip(self, weapon):
        self.weapon = weapon

    def attack(self):
        if self.weapon:
            return self.weapon.execute()
        return "No weapon"

player = Player("Hero")

player.equip(SwordAttack())
print(player.attack())  # Slash! ⚔️

player.equip(MagicAttack())
print(player.attack())  # Fireball! 🔥
```

## Real Example: Computer Builder

```python
class CPU:
    def __init__(self, model):
        self.model = model

class RAM:
    def __init__(self, size):
        self.size = size

class Storage:
    def __init__(self, size, type):
        self.size = size
        self.type = type

class Computer:
    def __init__(self, cpu, ram, storage):
        self.cpu = cpu
        self.ram = ram
        self.storage = storage

    def specs(self):
        return f"CPU: {self.cpu.model}, RAM: {self.ram.size}GB"

# Different computers build cheyochu
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
```

## Payment System Example

```python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCard(PaymentMethod):
    def pay(self, amount):
        return f"${amount} - Credit card"

class PayPal(PaymentMethod):
    def pay(self, amount):
        return f"${amount} - PayPal"

class Checkout:
    def __init__(self, payment):
        self.payment = payment

    def process(self, amount):
        return self.payment.pay(amount)

# Easy ga switch cheyochu
checkout1 = Checkout(CreditCard())
checkout2 = Checkout(PayPal())

print(checkout1.process(100))
print(checkout2.process(50))
```

## Testing Made Easy

```python
class Database:
    def save(self, data):
        return "Real DB save"

class MockDatabase:
    def save(self, data):
        return "Mock save (testing)"

class UserService:
    def __init__(self, db):
        self.db = db

    def create_user(self, name):
        return self.db.save({"name": name})

# Production
prod = UserService(Database())

# Testing
test = UserService(MockDatabase())
```

## Aggregation vs Composition

```python
# Aggregation - independent existence
class Student:
    def __init__(self, name):
        self.name = name

class University:
    def __init__(self):
        self.students = []  # Can exist separately

# Composition - dependent
class Room:
    def __init__(self, name):
        self.name = name

class House:
    def __init__(self):
        self.rooms = [  # Part of house
            Room("Kitchen"),
            Room("Bedroom")
        ]
```

## Tips

- Composition over inheritance prefer cheyandi
- Dependency injection use chesi flexibility penchandi
- Components focused and single-purpose undali
- Testing kosam mock objects easy
- Runtime lo behavior change cheyochu

---

_Note: Ee page inka development stage lo undi._
