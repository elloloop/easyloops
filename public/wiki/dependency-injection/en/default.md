# Dependency Injection

## What is Dependency Injection?

Dependency Injection (DI) is a design pattern where objects receive their dependencies from external sources rather than creating them internally. Instead of a class creating the objects it needs, those objects are "injected" from outside.

## The Problem Without DI

```python
class EmailService:
    def __init__(self):
        self.smtp_server = SMTPServer("smtp.gmail.com", 587)  # Hard-coded dependency

    def send_email(self, to, subject, body):
        self.smtp_server.send(to, subject, body)

# Problems:
# - Hard to test (real SMTP server required)
# - Tightly coupled to SMTPServer
# - Cannot change implementation easily
# - Difficult to reuse with different servers
```

## The Solution With DI

```python
class EmailService:
    def __init__(self, smtp_server):
        self.smtp_server = smtp_server  # Dependency injected

    def send_email(self, to, subject, body):
        self.smtp_server.send(to, subject, body)

# Benefits:
# - Easy to test with mock server
# - Loosely coupled
# - Flexible implementation
# - Reusable with any SMTP server

# Usage
smtp = SMTPServer("smtp.gmail.com", 587)
email_service = EmailService(smtp)  # Inject dependency
```

## Types of Dependency Injection

### 1. Constructor Injection

Dependencies passed through the constructor (most common).

```python
class UserService:
    def __init__(self, database, cache):  # Constructor injection
        self.db = database
        self.cache = cache

    def get_user(self, user_id):
        # Try cache first
        user = self.cache.get(user_id)
        if not user:
            user = self.db.query(user_id)
            self.cache.set(user_id, user)
        return user

# Inject dependencies
db = Database()
cache = Redis()
service = UserService(db, cache)
```

### 2. Setter Injection

Dependencies set through setter methods.

```python
class ReportGenerator:
    def __init__(self):
        self.database = None
        self.formatter = None

    def set_database(self, database):  # Setter injection
        self.database = database

    def set_formatter(self, formatter):  # Setter injection
        self.formatter = formatter

    def generate(self):
        data = self.database.fetch()
        return self.formatter.format(data)

# Usage
report = ReportGenerator()
report.set_database(Database())
report.set_formatter(PDFFormatter())
```

### 3. Interface Injection

Dependencies implement specific interfaces (common in typed languages).

```python
from abc import ABC, abstractmethod

class IDatabase(ABC):
    @abstractmethod
    def query(self, sql):
        pass

class PostgreSQL(IDatabase):
    def query(self, sql):
        # PostgreSQL implementation
        return []

class MySQL(IDatabase):
    def query(self, sql):
        # MySQL implementation
        return []

class UserService:
    def __init__(self, database: IDatabase):  # Interface-based injection
        self.db = database

# Can inject any implementation
service1 = UserService(PostgreSQL())
service2 = UserService(MySQL())
```

## Benefits of Dependency Injection

### 1. Testability

```python
# Mock database for testing
class MockDatabase:
    def query(self, sql):
        return [{"id": 1, "name": "Test User"}]

# Easy to test with mock
service = UserService(MockDatabase())
user = service.get_user(1)
assert user["name"] == "Test User"
```

### 2. Flexibility

```python
# Easy to switch implementations
dev_service = UserService(SQLiteDatabase())
prod_service = UserService(PostgreSQLDatabase())
```

### 3. Loose Coupling

Classes depend on abstractions, not concrete implementations.

### 4. Reusability

Same class can be used with different dependencies.

### 5. Maintainability

Changes to dependencies don't affect dependent classes.

## DI Container (Advanced)

A DI Container manages object creation and dependency injection automatically.

```python
class DIContainer:
    def __init__(self):
        self._services = {}

    def register(self, name, service):
        self._services[name] = service

    def resolve(self, name):
        return self._services.get(name)

# Setup container
container = DIContainer()
container.register('database', PostgreSQLDatabase())
container.register('cache', RedisCache())

# Resolve dependencies
db = container.resolve('database')
cache = container.resolve('cache')
service = UserService(db, cache)
```

## Real-World Example

```python
# Without DI
class OrderProcessor:
    def __init__(self):
        self.payment = PayPalPayment()      # Hard-coded
        self.email = GmailService()         # Hard-coded
        self.inventory = MySQLInventory()   # Hard-coded

    def process_order(self, order):
        self.payment.charge(order.total)
        self.inventory.reduce(order.items)
        self.email.send_confirmation(order.customer)

# With DI
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

### 1. Inject Interfaces, Not Concrete Classes

```python
# Good - inject interface
class Service:
    def __init__(self, storage: IStorage):
        self.storage = storage

# Avoid - inject concrete class
class Service:
    def __init__(self, storage: MySQLStorage):
        self.storage = storage
```

### 2. Use Constructor Injection for Required Dependencies

```python
class Service:
    def __init__(self, required_dep):  # Required
        self.required = required_dep

    def set_optional(self, optional_dep):  # Optional
        self.optional = optional_dep
```

### 3. Keep Constructors Simple

```python
# Good
def __init__(self, database):
    self.db = database

# Avoid
def __init__(self, database):
    self.db = database
    self.db.connect()           # Side effects
    self.data = self.db.load()  # Complex logic
```

### 4. Avoid Service Locator Anti-Pattern

```python
# Anti-pattern (avoid)
class Service:
    def __init__(self):
        self.db = ServiceLocator.get('database')  # Hidden dependency

# Better - explicit injection
class Service:
    def __init__(self, database):  # Clear dependency
        self.db = database
```

## Common Pitfalls

### 1. Over-Injection

Too many dependencies indicate poor class design.

```python
# Too many dependencies - consider refactoring
def __init__(self, dep1, dep2, dep3, dep4, dep5, dep6):
    pass
```

### 2. Circular Dependencies

Class A depends on B, B depends on A.

**Solution**: Refactor to break the cycle or use interfaces.

### 3. Constructor Complexity

Constructors become too complex with many dependencies.

**Solution**: Use builder pattern or factory methods.

## Summary

Dependency Injection is a powerful pattern that:

- **Improves testability** by allowing mock dependencies
- **Increases flexibility** by decoupling components
- **Enhances maintainability** through clear dependencies
- **Promotes reusability** across different contexts
- **Supports SOLID principles** especially Dependency Inversion

Key principle: **Depend on abstractions, not concretions.**

## Related Topics

- [[wiki:dependency]] - Understanding dependencies
- [[wiki:solid-principles]] - SOLID design principles
- [[wiki:testing]] - Unit testing with DI
- [[question:01-dependency-injection]] - Practice DI concepts
