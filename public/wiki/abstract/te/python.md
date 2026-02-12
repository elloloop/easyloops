# Abstract Classes in Python: Code Ki "Blueprint" Ivvadam

## Abstract Class Ante Enti?

Abstract class ante Python lo oka class ni direct ga instantiate cheyalemu. Idi other classes ki blueprint laga work chesthundi. `ABC` (Abstract Base Class) module use chesi create chestham.

**"Plan clear ayithe, execution smooth!"** – Abstract class blueprint clear ga define chesthundi, **RRR** mission plan laga perfect!

---

## ABC Module Use Cheyadam

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

# Instantiate cheyalemu
# animal = Animal()  # TypeError!

# Inherit chesi implement cheyali
class Dog(Animal):
    def make_sound(self):
        return "Woof!"

dog = Dog()
print(dog.make_sound())  # Woof!
```

**"Rules follow cheyali!"** – Abstract class tho strict rules, implement cheyakapothe error, **Pushpa** discipline laga!

---

## Creating Abstract Classes

### Step 1: ABC and abstractmethod Import

```python
from abc import ABC, abstractmethod
```

### Step 2: ABC Nundi Inherit

```python
class MyAbstractClass(ABC):
    pass
```

### Step 3: @abstractmethod Decorator Use

```python
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass
```

**"Foundation strong ayithe building strong!"** – Abstract methods tho strong foundation, clear requirements!

---

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

**"Mix chesi balance!"** – Abstract and concrete methods rendu use chesi perfect balance, **Baahubali** strategy laga!

---

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
        self.log_transaction(f"Processing ₹{amount} via Stripe")
        # Stripe API call
        return True

    def refund(self, transaction_id: str) -> bool:
        self.log_transaction(f"Refunding {transaction_id} via Stripe")
        # Stripe refund API call
        return True

class PayPalPayment(PaymentGateway):
    def process_payment(self, amount: float) -> bool:
        self.log_transaction(f"Processing ₹{amount} via PayPal")
        # PayPal API call
        return True

    def refund(self, transaction_id: str) -> bool:
        self.log_transaction(f"Refunding {transaction_id} via PayPal")
        # PayPal refund API call
        return True

# Usage
stripe = StripePayment()
stripe.process_payment(5000.0)

paypal = PayPalPayment()
paypal.process_payment(2500.0)
```

**"Different implementations, same interface!"** – Abstract class tho consistency guarantee, **KGF** empire laga organized!

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

# Usage
postgres = PostgreSQL("postgresql://localhost/mydb")
postgres.connect()
postgres.execute_query("SELECT * FROM users")
postgres.disconnect()
```

**"Connection strong ayithe data flow smooth!"** – Database abstract class tho different databases easy ga handle, professional setup!

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
json_handler.write('{"name": "Ravi"}')
print(f"Extension: {json_handler.get_extension()}")  # json
```

**"Different formats, same interface!"** – File handler abstract class tho any format handle cheyochu, **Srimanthudu** versatility laga!

---

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

**"One interface, many forms!"** – Polymorphism tho flexibility power, **Avengers** team laga different powers, same goal!

---

## Best Practices

### 1. Type Hints Use Cheyali

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

**"Clarity is king!"** – Type hints tho code clear and professional.

### 2. Docstrings Provide Cheyali

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

**"Documentation saves time!"** – Docstrings tho understanding easy, **Jersey** dedication laga perfect!

### 3. Abstract Methods Minimal Undali

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

**"Keep it simple!"** – Too many abstract methods avoid, clean and focused, **Gentleman** laga!

---

## Common Errors

### Error 1: Missing Implementation

```python
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    # area() implement cheyaledu - TypeError!

# Fix: All abstract methods implement
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height
```

**"Incomplete work = Failure!"** – All abstract methods implement cheyali, lekapothe error pakka!

### Error 2: Trying to Instantiate

```python
# Error
shape = Shape()  # TypeError!

# Correct
rectangle = Rectangle(10, 5)
```

**"Rules break cheste punishment!"** – Abstract class instantiate cheyalemu, rules follow cheyali!

---

## Summary

Python abstract classes:

- **ABC module use** chesi abstract base classes create
- **@abstractmethod decorator** abstract methods mark chesthundi
- **Cannot instantiate** abstract classes direct ga
- **Must implement** all abstract methods subclasses lo
- **Mix abstract and concrete** methods
- **Support polymorphism** consistent interfaces tho
- **Enforce contracts** implementations antha

Abstract classes use cheyali when:

- Related classes ki common interface kavali
- Implementation details different kani interface same
- Contract enforce cheyali subclasses ki

**"Abstract class = Blueprint for success!"** – Abstract classes tho code organized, professional, and maintainable, **Maharshi** vision laga clear planning!

## Related Topics

- [[wiki:inheritance]] - Class inheritance in Python
- [[wiki:polymorphism]] - Polymorphic behavior
- [[wiki:abc-module]] - Python ABC module details
- [[question:01-python-abstract]] - Practice abstract classes
