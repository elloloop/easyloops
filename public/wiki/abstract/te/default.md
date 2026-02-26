# Abstract Classes

## Abstract Class Ante Enti?

Abstract class ante oka class ni direct ga instantiate cheyalemu, daani nundi objects create cheyalemu. Idi other classes ki blueprint laga work chesthundi. Derived classes implement cheyalsina common interface define chesthundi.

## Key Concepts

### 1. Instantiate Cheyalemu

Abstract classes nundi direct ga objects create cheyalemu.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

# Idi error istundi
# animal = Animal()  # TypeError: Can't instantiate abstract class
```

### 2. Inherit Cheyali

Abstract classes ni concrete classes inherit cheyali.

```python
class Dog(Animal):
    def make_sound(self):
        return "Woof!"

class Cat(Animal):
    def make_sound(self):
        return "Meow!"

# Ippudu objects create cheyochu
dog = Dog()
cat = Cat()
print(dog.make_sound())  # Woof!
print(cat.make_sound())  # Meow!
```

### 3. Abstract Methods Untayi

Abstract methods declare chesuntayi kani implement cheyaru abstract class lo.

```python
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass
```

## Enduku Use Cheyali?

### 1. Interface Contract Enforce

All derived classes required methods implement cheyali ani ensure chesthundi.

```python
class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

    @abstractmethod
    def refund(self, transaction_id):
        pass

# All payment gateways ee methods implement cheyali
class StripeGateway(PaymentGateway):
    def process_payment(self, amount):
        return f"Stripe: Charging ${amount}"

    def refund(self, transaction_id):
        return f"Stripe: Refunding {transaction_id}"
```

### 2. Code Reusability

Related classes madhya common code share cheyyadam.

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
```

### 3. Polymorphism

Abstract classes ni types laga use chesi polymorphic behavior.

```python
def make_animal_sound(animal: Animal):
    print(animal.make_sound())

dog = Dog()
cat = Cat()

make_animal_sound(dog)  # Woof!
make_animal_sound(cat)  # Meow!
```

## Abstract vs Concrete Classes

| Aspect           | Abstract Class           | Concrete Class          |
| ---------------- | ------------------------ | ----------------------- |
| Instantiation    | Objects create cheyalemu | Objects create cheyochu |
| Purpose          | Blueprint/Template       | Actual implementation   |
| Abstract Methods | Abstract methods undochu | All methods implemented |
| Inheritance      | Inherit cheyali          | Inherit optional        |

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
        return f"Reading CSV: {self.filename}"

    def write(self, data):
        return f"Writing to CSV: {self.filename}"

class JSONProcessor(FileProcessor):
    def read(self):
        return f"Reading JSON: {self.filename}"

    def write(self, data):
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

1. **Consistency**: All subclasses same interface follow avthayi
2. **Maintainability**: Interface changes all implementations affect avthayi
3. **Documentation**: Abstract methods documentation laga work chesthayi
4. **Type Safety**: Abstract class ni type hint laga use cheyochu
5. **Polymorphism**: Different implementations, same interface

## Best Practices

### 1. Related Classes Ki Use Cheyali

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

### 2. Abstract Methods Focused Undali

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

### 3. Appropriate Ga Default Implementations Ivvali

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

### 1. @abstractmethod Decorator Marchipoyina

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

### 2. All Abstract Methods Implement Cheyaledu

```python
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    # area() implement cheyaledu - Error!

# Correct
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):  # Implemented
        return self.width * self.height
```

## Summary

Abstract classes powerful tools:

- **Interfaces define** chesthayi subclasses implement cheyali ani
- **Common code share** chesthayi related classes madhya
- **Consistency enforce** chesthayi implementations antha
- **Polymorphism support** chesthayi type safety tho
- **Requirements document** chesthayi abstract methods dwara

Related classes group ki common interface share ayithe abstract classes use cheyali.

## Related Topics

- [[wiki:inheritance]] - Class inheritance
- [[wiki:polymorphism]] - Polymorphic behavior
- [[wiki:interfaces]] - Interface concepts
- [[question:01-abstract-classes]] - Abstract classes practice
