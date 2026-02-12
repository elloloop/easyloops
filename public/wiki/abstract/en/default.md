# Abstract Classes

## What is an Abstract Class?

An abstract class is a class that cannot be instantiated directly and serves as a blueprint for other classes. It defines a common interface that derived classes must implement, ensuring consistency across related classes.

## Key Concepts

### 1. Cannot Be Instantiated

Abstract classes cannot create objects directly.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

# This will raise an error
# animal = Animal()  # TypeError: Can't instantiate abstract class
```

### 2. Must Be Inherited

Abstract classes are meant to be inherited by concrete classes.

```python
class Dog(Animal):
    def make_sound(self):
        return "Woof!"

class Cat(Animal):
    def make_sound(self):
        return "Meow!"

# Now we can create instances
dog = Dog()
cat = Cat()
print(dog.make_sound())  # Woof!
print(cat.make_sound())  # Meow!
```

### 3. Contains Abstract Methods

Abstract methods are declared but not implemented in the abstract class.

```python
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass
```

## Why Use Abstract Classes?

### 1. Enforce Interface Contract

Ensure all derived classes implement required methods.

```python
class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

    @abstractmethod
    def refund(self, transaction_id):
        pass

# All payment gateways must implement these methods
class StripeGateway(PaymentGateway):
    def process_payment(self, amount):
        # Stripe implementation
        return f"Stripe: Charging ${amount}"

    def refund(self, transaction_id):
        # Stripe refund
        return f"Stripe: Refunding {transaction_id}"
```

### 2. Code Reusability

Share common code among related classes.

```python
class Vehicle(ABC):
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    @abstractmethod
    def start_engine(self):
        pass

    def display_info(self):  # Concrete method
        return f"{self.brand} {self.model}"

class Car(Vehicle):
    def start_engine(self):
        return "Car engine started"

class Motorcycle(Vehicle):
    def start_engine(self):
        return "Motorcycle engine started"
```

### 3. Polymorphism

Use abstract classes as types for polymorphic behavior.

```python
def make_animal_sound(animal: Animal):
    print(animal.make_sound())

dog = Dog()
cat = Cat()

make_animal_sound(dog)  # Woof!
make_animal_sound(cat)  # Meow!
```

## Abstract vs Concrete Classes

| Aspect           | Abstract Class            | Concrete Class              |
| ---------------- | ------------------------- | --------------------------- |
| Instantiation    | Cannot create objects     | Can create objects          |
| Purpose          | Blueprint/Template        | Actual implementation       |
| Abstract Methods | Can have abstract methods | All methods implemented     |
| Inheritance      | Must be inherited         | Can be inherited (optional) |

## Abstract Methods vs Concrete Methods

Abstract classes can have both abstract and concrete methods.

```python
class Database(ABC):
    def __init__(self, connection_string):
        self.connection_string = connection_string

    @abstractmethod
    def connect(self):
        """Abstract: Must be implemented by subclasses"""
        pass

    @abstractmethod
    def disconnect(self):
        """Abstract: Must be implemented by subclasses"""
        pass

    def log(self, message):
        """Concrete: Shared by all subclasses"""
        print(f"[DB Log] {message}")

class PostgreSQL(Database):
    def connect(self):
        self.log(f"Connecting to PostgreSQL: {self.connection_string}")
        return "Connected to PostgreSQL"

    def disconnect(self):
        self.log("Disconnecting from PostgreSQL")
        return "Disconnected"
```

## Real-World Examples

### Example 1: File Processor

```python
class FileProcessor(ABC):
    def __init__(self, filename):
        self.filename = filename

    @abstractmethod
    def read(self):
        pass

    @abstractmethod
    def write(self, data):
        pass

    def get_extension(self):
        return self.filename.split('.')[-1]

class CSVProcessor(FileProcessor):
    def read(self):
        # CSV reading logic
        return f"Reading CSV: {self.filename}"

    def write(self, data):
        # CSV writing logic
        return f"Writing to CSV: {self.filename}"

class JSONProcessor(FileProcessor):
    def read(self):
        # JSON reading logic
        return f"Reading JSON: {self.filename}"

    def write(self, data):
        # JSON writing logic
        return f"Writing to JSON: {self.filename}"
```

### Example 2: Notification System

```python
class NotificationService(ABC):
    @abstractmethod
    def send(self, recipient, message):
        pass

    @abstractmethod
    def validate_recipient(self, recipient):
        pass

class EmailNotification(NotificationService):
    def send(self, recipient, message):
        if self.validate_recipient(recipient):
            return f"Email sent to {recipient}: {message}"
        return "Invalid email"

    def validate_recipient(self, recipient):
        return "@" in recipient

class SMSNotification(NotificationService):
    def send(self, recipient, message):
        if self.validate_recipient(recipient):
            return f"SMS sent to {recipient}: {message}"
        return "Invalid phone number"

    def validate_recipient(self, recipient):
        return recipient.isdigit() and len(recipient) == 10
```

## Benefits

1. **Consistency**: Ensures all subclasses follow the same interface
2. **Maintainability**: Changes to interface affect all implementations
3. **Documentation**: Abstract methods serve as documentation
4. **Type Safety**: Can use abstract class as type hint
5. **Polymorphism**: Different implementations, same interface

## Best Practices

### 1. Use Abstract Classes for Related Classes

```python
# Good - related classes
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    pass

class Circle(Shape):
    pass
```

### 2. Keep Abstract Methods Focused

```python
# Good - focused methods
class DataSource(ABC):
    @abstractmethod
    def fetch_data(self):
        pass

    @abstractmethod
    def save_data(self, data):
        pass
```

### 3. Provide Default Implementations When Appropriate

```python
class Logger(ABC):
    def format_message(self, message):
        # Default implementation
        return f"[{datetime.now()}] {message}"

    @abstractmethod
    def log(self, message):
        pass
```

## Common Mistakes

### 1. Forgetting @abstractmethod Decorator

```python
# Wrong
class Shape(ABC):
    def area(self):  # Missing @abstractmethod
        pass

# Correct
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
```

### 2. Not Implementing All Abstract Methods

```python
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    # Missing area() implementation - Error!

# Correct
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):  # Implemented
        return self.width * self.height
```

## Summary

Abstract classes are powerful tools for:

- **Defining interfaces** that subclasses must implement
- **Sharing common code** among related classes
- **Enforcing consistency** across implementations
- **Supporting polymorphism** with type safety
- **Documenting requirements** through abstract methods

Use abstract classes when you have a group of related classes that share a common interface but have different implementations.

## Related Topics

- [[wiki:inheritance]] - Class inheritance
- [[wiki:polymorphism]] - Polymorphic behavior
- [[wiki:interfaces]] - Interface concepts
- [[question:01-abstract-classes]] - Practice abstract classes
