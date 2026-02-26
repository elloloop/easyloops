# Dependency Injection in Python: Code Ki "Freedom" Ivvadam

## Dependency Injection Ante Enti?

Dependency Injection (DI) ante oka design pattern. Class ki kavalsina dependencies ni class lopal create cheyyadam badulu, external nundi provide chestham. Idi code ni testable, flexible, and maintainable ga chesthundi.

**"Nenu naa weapons nenu teesukunta!"** – DI lekunda, **"Evaro istharemo chustham!"** – DI tho flexibility, **Baahubali** strategy laga!

---

## Without Dependency Injection

```python
class EmailService:
    def __init__(self):
        self.smtp = SMTPClient("smtp.gmail.com", 587)  # Lopal create

    def send(self, to, subject, body):
        self.smtp.send(to, subject, body)

# Problems: Test kashtam, inflexible, tightly coupled
```

**"Rigid plan fail avtundi!"** – Hard-coded dependencies tho flexibility ledu.

## With Dependency Injection

```python
class EmailService:
    def __init__(self, smtp_client):  # External ga inject
        self.smtp = smtp_client

    def send(self, to, subject, body):
        self.smtp.send(to, subject, body)

# Usage
smtp = SMTPClient("smtp.gmail.com", 587)
email_service = EmailService(smtp)  # Inject dependency
```

**"Flexibility power!"** – DI tho testing easy, implementation swap easy, **Srimanthudu** planning laga smart!

---

## Types of Dependency Injection

### 1. Constructor Injection (Recommended)

```python
class UserService:
    def __init__(self, database, cache):
        self.db = database
        self.cache = cache

    def get_user(self, user_id):
        # Cache check
        cached = self.cache.get(f"user:{user_id}")
        if cached:
            return cached

        # Database fetch
        user = self.db.query(f"SELECT * FROM users WHERE id={user_id}")
        self.cache.set(f"user:{user_id}", user)
        return user

# Dependencies inject
from redis import Redis
from sqlalchemy import create_engine

db = create_engine('postgresql://localhost/mydb')
cache = Redis(host='localhost', port=6379)
user_service = UserService(db, cache)
```

**"Setup mundhu, performance tarwata!"** – Constructor lo dependencies proper ga inject cheste service smooth ga run avtundi.

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
```

**"Step by step setup!"** – Setter injection tho gradual setup cheyochu.

---

## Testing with Dependency Injection

### Without DI - Test Kashtam

```python
class OrderService:
    def __init__(self):
        self.payment = StripePaymentGateway()  # Real payment!
        self.email = SMTPEmailService()        # Real emails!

    def place_order(self, order):
        self.payment.charge(order.total)  # Actually charges
        self.email.send(order.customer)   # Actually sends

# Testing lo problem - real charges and emails!
```

**"Test lo real action disaster!"** – Hard-coded dependencies tho testing lo real operations avthayi.

### With DI - Test Easy

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

**"Practice safe!"** – Mock dependencies use cheste testing safe and easy, **Jersey** practice laga perfect!

---

## Interface-Based Injection

```python
from abc import ABC, abstractmethod

# Interface define
class IPaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float) -> bool:
        pass

# Implementations
class StripePaymentGateway(IPaymentGateway):
    def charge(self, amount: float) -> bool:
        print(f"Charging ₹{amount} via Stripe")
        return True

class PayPalPaymentGateway(IPaymentGateway):
    def charge(self, amount: float) -> bool:
        print(f"Charging ₹{amount} via PayPal")
        return True

class MockPaymentGateway(IPaymentGateway):
    def charge(self, amount: float) -> bool:
        print(f"Mock charge: ₹{amount}")
        return True

# Service accepts any IPaymentGateway
class OrderService:
    def __init__(self, payment: IPaymentGateway):
        self.payment = payment

    def checkout(self, amount: float):
        return self.payment.charge(amount)

# Different implementations use
stripe_service = OrderService(StripePaymentGateway())
paypal_service = OrderService(PayPalPaymentGateway())
test_service = OrderService(MockPaymentGateway())
```

**"Options unte power!"** – Interface-based injection tho multiple implementations easy ga use cheyochu, **RRR** lanti powerful choices!

---

## Simple DI Container

```python
class DIContainer:
    def __init__(self):
        self._services = {}
        self._singletons = {}

    def register(self, name: str, factory, singleton=False):
        """Service ni factory function tho register"""
        self._services[name] = (factory, singleton)

    def get(self, name: str):
        """Service resolve"""
        if name not in self._services:
            raise ValueError(f"Service '{name}' not registered")

        factory, is_singleton = self._services[name]

        # Cached singleton return
        if is_singleton and name in self._singletons:
            return self._singletons[name]

        # New instance create
        instance = factory()

        # Singleton cache
        if is_singleton:
            self._singletons[name] = instance

        return instance

# Container setup
container = DIContainer()

# Services register
container.register('database', lambda: PostgreSQLDatabase(), singleton=True)
container.register('cache', lambda: RedisCache(), singleton=True)
container.register('user_service', lambda: UserService(
    container.get('database'),
    container.get('cache')
))

# Container use
user_service = container.get('user_service')
```

**"Central management easy!"** – DI container tho dependencies central ga manage cheyochu, **Pushpa** organization laga!

---

## Real-World Example: REST API

```python
from flask import Flask, jsonify, request
from abc import ABC, abstractmethod

# Service with DI
class UserService:
    def __init__(self, user_repo, email_service):
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

# Dependencies setup
user_repo = PostgresUserRepository("postgresql://localhost/myapp")
email_service = SendGridEmailService("api_key")
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

**"Production ready!"** – DI tho REST API clean and testable, professional setup!

---

## Best Practices

### 1. Type Hints Use Cheyali

```python
from typing import Protocol

class IDatabase(Protocol):
    def query(self, sql: str) -> list:
        ...

class UserService:
    def __init__(self, db: IDatabase):  # Type hint
        self.db = db
```

**"Clarity power!"** – Type hints tho code clarity untundi.

### 2. Constructor Injection Prefer Cheyali

```python
# Good - clear dependencies
def __init__(self, db, cache, logger):
    self.db = db
    self.cache = cache
    self.logger = logger
```

### 3. Dependencies Minimal Undali

```python
# Too many - refactor kavali
def __init__(self, dep1, dep2, dep3, dep4, dep5, dep6):
    pass  # Chala dependencies ante design problem
```

**"Simple is powerful!"** – Minimal dependencies tho code maintain cheyyadam easy, **Gentleman** laga clean!

---

## Summary

Python lo Dependency Injection:

- **Testability improve** - Mocking easy
- **Flexibility increase** - Decoupled code
- **Maintainability enhance** - Clear dependencies
- **Multiple implementations support** - Interfaces tho
- **Code reusability** - Different contexts lo

DI use cheyali when:

- Unit tests raasetappudu
- Large applications build chesetappudu
- Implementations swap cheyali ante
- SOLID principles follow chestappudu

**"DI = Flexibility + Testability + Power!"** – Dependency injection tho code powerful and professional, **KGF** empire building laga strong foundation!

## Related Topics

- [[wiki:testing]] - Unit testing with mocks
- [[wiki:abc]] - Abstract base classes
- [[wiki:solid-principles]] - Design principles
- [[question:01-python-di]] - Practice DI in Python
