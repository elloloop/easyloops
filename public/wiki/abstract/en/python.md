# Abstract Classes in Python

## What is an Abstract Class?

An abstract class in Python is a class that cannot be instantiated and serves as a blueprint for other classes. It's created using the `ABC` (Abstract Base Class) module and defines methods that must be implemented by subclasses.

## Using ABC Module

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

# Cannot instantiate
# animal = Animal()  # TypeError!

# Must inherit and implement
class Dog(Animal):
    def make_sound(self):
        return "Woof!"

dog = Dog()
print(dog.make_sound())  # Woof!
```

## Creating Abstract Classes

### Step 1: Import ABC and abstractmethod

```python
from abc import ABC, abstractmethod
```

### Step 2: Inherit from ABC

```python
class MyAbstractClass(ABC):
    pass
```

### Step 3: Use @abstractmethod Decorator

```python
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass
```

## Abstract vs Concrete Methods

```python
class Vehicle(ABC):
    def __init__(self, brand):
        self.brand = brand  # Concrete method (constructor)

    @abstractmethod
    def start_engine(self):
        """Abstract: Must implement"""
        pass

    def display_info(self):
        """Concrete: Can use directly"""
        return f"Brand: {self.brand}"

class Car(Vehicle):
    def start_engine(self):  # Must implement
        return "Car engine started"

car = Car("Toyota")
print(car.start_engine())   # Car engine started
print(car.display_info())   # Brand: Toyota
```

## Practical Examples

### Example 1: Payment Gateway

```python
from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount: float) -> bool:
        """Process payment"""
        pass

    @abstractmethod
    def refund(self, transaction_id: str) -> bool:
        """Refund transaction"""
        pass

    def log_transaction(self, message: str):
        """Concrete method - shared logging"""
        print(f"[Transaction Log] {message}")

class StripePayment(PaymentGateway):
    def process_payment(self, amount: float) -> bool:
        self.log_transaction(f"Processing ${amount} via Stripe")
        # Stripe API call
        return True

    def refund(self, transaction_id: str) -> bool:
        self.log_transaction(f"Refunding {transaction_id} via Stripe")
        # Stripe refund API call
        return True

class PayPalPayment(PaymentGateway):
    def process_payment(self, amount: float) -> bool:
        self.log_transaction(f"Processing ${amount} via PayPal")
        # PayPal API call
        return True

    def refund(self, transaction_id: str) -> bool:
        self.log_transaction(f"Refunding {transaction_id} via PayPal")
        # PayPal refund API call
        return True

# Usage
stripe = StripePayment()
stripe.process_payment(100.0)

paypal = PayPalPayment()
paypal.process_payment(50.0)
```

### Example 2: Database Connection

```python
from abc import ABC, abstractmethod

class Database(ABC):
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connected = False

    @abstractmethod
    def connect(self):
        """Connect to database"""
        pass

    @abstractmethod
    def disconnect(self):
        """Disconnect from database"""
        pass

    @abstractmethod
    def execute_query(self, query: str):
        """Execute SQL query"""
        pass

    def is_connected(self) -> bool:
        """Concrete method"""
        return self.connected

class PostgreSQL(Database):
    def connect(self):
        print(f"Connecting to PostgreSQL: {self.connection_string}")
        self.connected = True
        return "PostgreSQL connected"

    def disconnect(self):
        print("Disconnecting from PostgreSQL")
        self.connected = False
        return "PostgreSQL disconnected"

    def execute_query(self, query: str):
        if not self.connected:
            return "Not connected!"
        print(f"Executing PostgreSQL query: {query}")
        return []

class MongoDB(Database):
    def connect(self):
        print(f"Connecting to MongoDB: {self.connection_string}")
        self.connected = True
        return "MongoDB connected"

    def disconnect(self):
        print("Disconnecting from MongoDB")
        self.connected = False
        return "MongoDB disconnected"

    def execute_query(self, query: str):
        if not self.connected:
            return "Not connected!"
        print(f"Executing MongoDB query: {query}")
        return []

# Usage
postgres = PostgreSQL("postgresql://localhost/mydb")
postgres.connect()
postgres.execute_query("SELECT * FROM users")
postgres.disconnect()

mongo = MongoDB("mongodb://localhost/mydb")
mongo.connect()
mongo.execute_query("db.users.find()")
mongo.disconnect()
```

### Example 3: File Handler

```python
from abc import ABC, abstractmethod

class FileHandler(ABC):
    def __init__(self, filename: str):
        self.filename = filename

    @abstractmethod
    def read(self) -> str:
        """Read file content"""
        pass

    @abstractmethod
    def write(self, content: str):
        """Write content to file"""
        pass

    def get_extension(self) -> str:
        """Concrete method"""
        return self.filename.split('.')[-1]

class CSVHandler(FileHandler):
    def read(self) -> str:
        print(f"Reading CSV file: {self.filename}")
        # CSV reading logic
        return "CSV data"

    def write(self, content: str):
        print(f"Writing to CSV file: {self.filename}")
        # CSV writing logic

class JSONHandler(FileHandler):
    def read(self) -> str:
        print(f"Reading JSON file: {self.filename}")
        # JSON reading logic
        return '{"data": "value"}'

    def write(self, content: str):
        print(f"Writing to JSON file: {self.filename}")
        # JSON writing logic

# Usage
csv_handler = CSVHandler("data.csv")
csv_handler.read()
print(f"Extension: {csv_handler.get_extension()}")  # csv

json_handler = JSONHandler("data.json")
json_handler.write('{"name": "John"}')
print(f"Extension: {json_handler.get_extension()}")  # json
```

## Abstract Properties

```python
from abc import ABC, abstractmethod

class Product(ABC):
    @property
    @abstractmethod
    def price(self):
        """Abstract property"""
        pass

    @property
    @abstractmethod
    def name(self):
        """Abstract property"""
        pass

class Book(Product):
    def __init__(self, title, cost):
        self._title = title
        self._cost = cost

    @property
    def price(self):
        return self._cost

    @property
    def name(self):
        return self._title

book = Book("Python Guide", 29.99)
print(f"{book.name}: ${book.price}")
```

## Polymorphism with Abstract Classes

```python
from abc import ABC, abstractmethod
from typing import List

class Notification(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str):
        pass

class EmailNotification(Notification):
    def send(self, recipient: str, message: str):
        print(f"Email to {recipient}: {message}")

class SMSNotification(Notification):
    def send(self, recipient: str, message: str):
        print(f"SMS to {recipient}: {message}")

class PushNotification(Notification):
    def send(self, recipient: str, message: str):
        print(f"Push to {recipient}: {message}")

# Polymorphic function
def send_notification(notification: Notification, recipient: str, message: str):
    notification.send(recipient, message)

# Usage
notifications: List[Notification] = [
    EmailNotification(),
    SMSNotification(),
    PushNotification()
]

for notif in notifications:
    send_notification(notif, "user@example.com", "Hello!")
```

## Best Practices

### 1. Use Type Hints

```python
from abc import ABC, abstractmethod
from typing import List

class Repository(ABC):
    @abstractmethod
    def find_by_id(self, id: int) -> dict:
        pass

    @abstractmethod
    def find_all(self) -> List[dict]:
        pass
```

### 2. Provide Docstrings

```python
class DataProcessor(ABC):
    @abstractmethod
    def process(self, data: str) -> str:
        """
        Process the input data.

        Args:
            data: Input string to process

        Returns:
            Processed string
        """
        pass
```

### 3. Keep Abstract Methods Minimal

```python
# Good - minimal abstract methods
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, value: str):
        pass

    @abstractmethod
    def load(self, key: str) -> str:
        pass
```

## Common Errors

### Error 1: Missing Implementation

```python
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    # Missing area() - TypeError when instantiating!

# Fix: Implement all abstract methods
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height
```

### Error 2: Trying to Instantiate

```python
# Error
shape = Shape()  # TypeError: Can't instantiate abstract class

# Correct
rectangle = Rectangle(10, 5)
```

## Summary

Python abstract classes:

- **Use ABC module** for abstract base classes
- **@abstractmethod decorator** marks abstract methods
- **Cannot instantiate** abstract classes directly
- **Must implement** all abstract methods in subclasses
- **Mix abstract and concrete** methods
- **Support polymorphism** with consistent interfaces
- **Enforce contracts** across implementations

Abstract classes are perfect for defining interfaces that multiple related classes must follow!

## Related Topics

- [[wiki:inheritance]] - Class inheritance in Python
- [[wiki:polymorphism]] - Polymorphic behavior
- [[wiki:abc-module]] - Python ABC module details
- [[question:01-python-abstract]] - Practice abstract classes
