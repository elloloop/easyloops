# Dependency Injection

## Dependency Injection Ante Enti?

Dependency Injection (DI) ante oka design pattern. Class ki kavalsina dependencies ni class lopal create cheyyadam badulu, external ga provide chestham. Idi code ni testable, flexible, and maintainable ga chesthundi.

## DI Lekunda Problem

```python
class EmailService:
    def __init__(self):
        self.smtp = SMTPServer("smtp.gmail.com", 587)  # Lopal create chesindi

    def send_email(self, to, subject, body):
        self.smtp.send(to, subject, body)

# Problems:
# - Test cheyyadam kashtam (real SMTP server kavali)
# - Tightly coupled
# - Implementation change cheyyadam kashtam
# - Reuse cheyyadam kashtam
```

## DI Tho Solution

```python
class EmailService:
    def __init__(self, smtp_server):
        self.smtp = smtp_server  # External ga inject chesindi

    def send_email(self, to, subject, body):
        self.smtp.send(to, subject, body)

# Benefits:
# - Mock server tho test cheyyadam easy
# - Loosely coupled
# - Flexible implementation
# - Any SMTP server tho reuse cheyochu

# Usage
smtp = SMTPServer("smtp.gmail.com", 587)
email_service = EmailService(smtp)  # Dependency inject
```

## Dependency Injection Types

### 1. Constructor Injection

Constructor dwara dependencies pass chestham (most common).

```python
class UserService:
    def __init__(self, database, cache):  # Constructor injection
        self.db = database
        self.cache = cache

    def get_user(self, user_id):
        user = self.cache.get(user_id)
        if not user:
            user = self.db.query(user_id)
            self.cache.set(user_id, user)
        return user

# Dependencies inject
db = Database()
cache = Redis()
service = UserService(db, cache)
```

### 2. Setter Injection

Setter methods dwara dependencies set chestham.

```python
class ReportGenerator:
    def __init__(self):
        self.database = None
        self.formatter = None

    def set_database(self, database):  # Setter injection
        self.database = database

    def set_formatter(self, formatter):  # Setter injection
        self.formatter = formatter

# Usage
report = ReportGenerator()
report.set_database(Database())
report.set_formatter(PDFFormatter())
```

### 3. Interface Injection

Dependencies specific interfaces implement chesthayi.

```python
from abc import ABC, abstractmethod

class IDatabase(ABC):
    @abstractmethod
    def query(self, sql):
        pass

class PostgreSQL(IDatabase):
    def query(self, sql):
        return []

class MySQL(IDatabase):
    def query(self, sql):
        return []

class UserService:
    def __init__(self, database: IDatabase):  # Interface-based
        self.db = database

# Any implementation inject cheyochu
service1 = UserService(PostgreSQL())
service2 = UserService(MySQL())
```

## Dependency Injection Benefits

### 1. Testability

```python
# Mock database for testing
class MockDatabase:
    def query(self, sql):
        return [{"id": 1, "name": "Test User"}]

# Mock tho testing easy
service = UserService(MockDatabase())
user = service.get_user(1)
assert user["name"] == "Test User"
```

### 2. Flexibility

```python
# Implementations swap cheyyadam easy
dev_service = UserService(SQLiteDatabase())
prod_service = UserService(PostgreSQLDatabase())
```

### 3. Loose Coupling

Classes abstractions meeda depend, concrete implementations meeda kadu.

### 4. Reusability

Same class different dependencies tho use cheyochu.

### 5. Maintainability

Dependencies lo changes dependent classes affect cheyavu.

## Real-World Example

```python
# DI lekunda
class OrderProcessor:
    def __init__(self):
        self.payment = PayPalPayment()      # Hard-coded
        self.email = GmailService()         # Hard-coded
        self.inventory = MySQLInventory()   # Hard-coded

    def process_order(self, order):
        self.payment.charge(order.total)
        self.inventory.reduce(order.items)
        self.email.send_confirmation(order.customer)

# DI tho
class OrderProcessor:
    def __init__(self, payment, email, inventory):  # Injected
        self.payment = payment
        self.email = email
        self.inventory = inventory

    def process_order(self, order):
        self.payment.charge(order.total)
        self.inventory.reduce(order.items)
        self.email.send_confirmation(order.customer)

# Production setup
processor = OrderProcessor(
    payment=StripePayment(),
    email=SendGridService(),
    inventory=PostgreSQLInventory()
)

# Test setup
test_processor = OrderProcessor(
    payment=MockPayment(),
    email=MockEmail(),
    inventory=MockInventory()
)
```

## Best Practices

### 1. Interfaces Inject Cheyali

```python
# Good - interface inject
class Service:
    def __init__(self, storage: IStorage):
        self.storage = storage

# Avoid - concrete class inject
class Service:
    def __init__(self, storage: MySQLStorage):
        self.storage = storage
```

### 2. Required Dependencies Ki Constructor Use Cheyali

```python
class Service:
    def __init__(self, required_dep):  # Required
        self.required = required_dep

    def set_optional(self, optional_dep):  # Optional
        self.optional = optional_dep
```

### 3. Constructors Simple Ga Undali

```python
# Good
def __init__(self, database):
    self.db = database

# Avoid
def __init__(self, database):
    self.db = database
    self.db.connect()    # Side effects avoid
```

## Common Pitfalls

### 1. Over-Injection

Too many dependencies ante class design poor.

```python
# Chala dependencies - refactor cheyali
def __init__(self, dep1, dep2, dep3, dep4, dep5, dep6):
    pass
```

### 2. Circular Dependencies

Class A, B meeda depend, B, A meeda depend.

**Solution**: Code refactor cheyali or interfaces use cheyali.

## Summary

Dependency Injection powerful pattern:

- **Testability improve** chesthundi mock dependencies tho
- **Flexibility increase** chesthundi components decouple chesi
- **Maintainability enhance** chesthundi clear dependencies tho
- **Reusability promote** chesthundi different contexts lo
- **SOLID principles support** chesthundi

Key principle: **Abstractions meeda depend, concretions meeda kadu.**

## Related Topics

- [[wiki:dependency]] - Dependencies artham chesko
- [[wiki:solid-principles]] - SOLID design principles
- [[wiki:testing]] - DI tho unit testing
- [[question:01-dependency-injection]] - DI concepts practice cheyyi
