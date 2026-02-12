# Dependency Injection in Python

## What is Dependency Injection?

Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources instead of creating them itself. This makes code more testable, flexible, and maintainable.

## Without Dependency Injection

```python
class EmailService:
    def __init__(self):
        self.smtp = SMTPClient("smtp.gmail.com", 587)  # Created internally

    def send(self, to, subject, body):
        self.smtp.send(to, subject, body)

# Problems: Hard to test, tightly coupled, inflexible
```

## With Dependency Injection

```python
class EmailService:
    def __init__(self, smtp_client):  # Dependency injected
        self.smtp = smtp_client

    def send(self, to, subject, body):
        self.smtp.send(to, subject, body)

# Usage
smtp = SMTPClient("smtp.gmail.com", 587)
email_service = EmailService(smtp)  # Inject dependency
```

## Types of Dependency Injection in Python

### 1. Constructor Injection (Recommended)

```python
class UserService:
    def __init__(self, database, cache):
        self.db = database
        self.cache = cache

    def get_user(self, user_id):
        # Check cache first
        cached_user = self.cache.get(f"user:{user_id}")
        if cached_user:
            return cached_user

        # Fetch from database
        user = self.db.query(f"SELECT * FROM users WHERE id={user_id}")
        self.cache.set(f"user:{user_id}", user)
        return user

# Inject dependencies
from redis import Redis
from sqlalchemy import create_engine

db = create_engine('postgresql://localhost/mydb')
cache = Redis(host='localhost', port=6379)
user_service = UserService(db, cache)
```

### 2. Setter Injection

```python
class ReportGenerator:
    def __init__(self):
        self._database = None
        self._formatter = None

    def set_database(self, database):
        self._database = database

    def set_formatter(self, formatter):
        self._formatter = formatter

    def generate(self):
        if not self._database or not self._formatter:
            raise ValueError("Database and formatter required")

        data = self._database.fetch_data()
        return self._formatter.format(data)

# Usage
report = ReportGenerator()
report.set_database(PostgresDB())
report.set_formatter(PDFFormatter())
result = report.generate()
```

### 3. Property Injection

```python
class DataProcessor:
    def __init__(self):
        self._logger = None

    @property
    def logger(self):
        return self._logger

    @logger.setter
    def logger(self, logger):
        self._logger = logger

    def process(self, data):
        if self._logger:
            self._logger.info(f"Processing {len(data)} items")
        # Process data

# Usage
processor = DataProcessor()
processor.logger = FileLogger('app.log')
```

## Testing with Dependency Injection

### Without DI - Hard to Test

```python
class OrderService:
    def __init__(self):
        self.payment = StripePaymentGateway()  # Real payment!
        self.email = SMTPEmailService()        # Real emails!

    def place_order(self, order):
        self.payment.charge(order.total)  # Actually charges money
        self.email.send(order.customer)   # Actually sends email

# Testing is problematic - will make real charges and send real emails!
```

### With DI - Easy to Test

```python
class OrderService:
    def __init__(self, payment_gateway, email_service):
        self.payment = payment_gateway
        self.email = email_service

    def place_order(self, order):
        self.payment.charge(order.total)
        self.email.send(order.customer)

# Mock implementations for testing
class MockPaymentGateway:
    def __init__(self):
        self.charged_amount = 0

    def charge(self, amount):
        self.charged_amount = amount
        return True

class MockEmailService:
    def __init__(self):
        self.sent_to = []

    def send(self, recipient):
        self.sent_to.append(recipient)

# Test with mocks
def test_place_order():
    mock_payment = MockPaymentGateway()
    mock_email = MockEmailService()
    service = OrderService(mock_payment, mock_email)

    order = Order(customer="test@example.com", total=100.0)
    service.place_order(order)

    assert mock_payment.charged_amount == 100.0
    assert "test@example.com" in mock_email.sent_to
```

## Interface-Based Injection with ABC

```python
from abc import ABC, abstractmethod

# Define interface
class IPaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float) -> bool:
        pass

# Implementations
class StripePaymentGateway(IPaymentGateway):
    def charge(self, amount: float) -> bool:
        # Stripe-specific logic
        print(f"Charging ${amount} via Stripe")
        return True

class PayPalPaymentGateway(IPaymentGateway):
    def charge(self, amount: float) -> bool:
        # PayPal-specific logic
        print(f"Charging ${amount} via PayPal")
        return True

class MockPaymentGateway(IPaymentGateway):
    def charge(self, amount: float) -> bool:
        print(f"Mock charge: ${amount}")
        return True

# Service accepts any IPaymentGateway
class OrderService:
    def __init__(self, payment: IPaymentGateway):
        self.payment = payment

    def checkout(self, amount: float):
        return self.payment.charge(amount)

# Use different implementations
stripe_service = OrderService(StripePaymentGateway())
paypal_service = OrderService(PayPalPaymentGateway())
test_service = OrderService(MockPaymentGateway())
```

## Simple DI Container

```python
class DIContainer:
    def __init__(self):
        self._services = {}
        self._singletons = {}

    def register(self, name: str, factory, singleton=False):
        """Register a service with its factory function"""
        self._services[name] = (factory, singleton)

    def get(self, name: str):
        """Resolve a service"""
        if name not in self._services:
            raise ValueError(f"Service '{name}' not registered")

        factory, is_singleton = self._services[name]

        # Return cached singleton if exists
        if is_singleton and name in self._singletons:
            return self._singletons[name]

        # Create new instance
        instance = factory()

        # Cache if singleton
        if is_singleton:
            self._singletons[name] = instance

        return instance

# Setup container
container = DIContainer()

# Register services
container.register('database', lambda: PostgreSQLDatabase(), singleton=True)
container.register('cache', lambda: RedisCache(), singleton=True)
container.register('user_service', lambda: UserService(
    container.get('database'),
    container.get('cache')
))

# Use container
user_service = container.get('user_service')
```

## Real-World Example: REST API

```python
from flask import Flask, jsonify, request
from abc import ABC, abstractmethod

# Interfaces
class IUserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: int):
        pass

    @abstractmethod
    def save(self, user):
        pass

class IEmailService(ABC):
    @abstractmethod
    def send_welcome_email(self, user):
        pass

# Implementations
class PostgresUserRepository(IUserRepository):
    def __init__(self, connection_string):
        self.conn = connection_string

    def find_by_id(self, user_id: int):
        # Database query
        return {"id": user_id, "name": "John Doe"}

    def save(self, user):
        # Save to database
        return user

class SendGridEmailService(IEmailService):
    def __init__(self, api_key):
        self.api_key = api_key

    def send_welcome_email(self, user):
        print(f"Sending welcome email to {user.get('email')}")

# Service layer
class UserService:
    def __init__(self, user_repo: IUserRepository, email_service: IEmailService):
        self.user_repo = user_repo
        self.email_service = email_service

    def create_user(self, user_data):
        user = self.user_repo.save(user_data)
        self.email_service.send_welcome_email(user)
        return user

    def get_user(self, user_id):
        return self.user_repo.find_by_id(user_id)

# Flask app with DI
app = Flask(__name__)

# Setup dependencies
user_repo = PostgresUserRepository("postgresql://localhost/myapp")
email_service = SendGridEmailService("api_key_here")
user_service = UserService(user_repo, email_service)

@app.route('/users/<int:user_id>')
def get_user(user_id):
    user = user_service.get_user(user_id)
    return jsonify(user)

@app.route('/users', methods=['POST'])
def create_user():
    user_data = request.json
    user = user_service.create_user(user_data)
    return jsonify(user), 201
```

## Best Practices

### 1. Use Type Hints

```python
from typing import Protocol

class IDatabase(Protocol):
    def query(self, sql: str) -> list:
        ...

class UserService:
    def __init__(self, db: IDatabase):  # Type hint
        self.db = db
```

### 2. Prefer Constructor Injection

```python
# Good - clear dependencies
def __init__(self, db, cache, logger):
    self.db = db
    self.cache = cache
    self.logger = logger
```

### 3. Keep Dependencies Minimal

```python
# Too many dependencies - refactor needed
def __init__(self, dep1, dep2, dep3, dep4, dep5, dep6):
    pass  # Consider breaking into smaller classes
```

### 4. Use Default Arguments for Optional Dependencies

```python
def __init__(self, database, logger=None):
    self.db = database
    self.logger = logger or NullLogger()  # Default logger
```

## Summary

Dependency Injection in Python:

- **Improves testability** with easy mocking
- **Increases flexibility** by decoupling code
- **Enhances maintainability** with clear dependencies
- **Supports multiple implementations** of interfaces
- **Makes code reusable** across contexts

Use DI when:

- Writing unit tests
- Building large applications
- Need to swap implementations
- Following SOLID principles

## Related Topics

- [[wiki:testing]] - Unit testing with mocks
- [[wiki:abc]] - Abstract base classes
- [[wiki:solid-principles]] - Design principles
- [[question:01-python-di]] - Practice DI in Python
