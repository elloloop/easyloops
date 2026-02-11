# Constructors in Python

## What is a Constructor?

A constructor is a special method called `__init__` in Python that automatically runs when you create a new object from a class. It's like a setup manager that prepares your object with initial values and configurations.

## Key Concepts

### 1. The `__init__` Method

In Python, the constructor is always named `__init__` (with double underscores on both sides).

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Constructor is called automatically
person = Person("Alice", 25)
print(person.name)  # Output: Alice
print(person.age)   # Output: 25
```

### 2. The `self` Parameter

The first parameter of `__init__` is always `self`, which refers to the object being created.

```python
class Car:
    def __init__(self, brand, model):
        self.brand = brand  # self refers to the current object
        self.model = model
        self.mileage = 0    # Initialize with default value

car1 = Car("Toyota", "Camry")
car2 = Car("Honda", "Civic")

print(car1.brand)  # Toyota
print(car2.brand)  # Honda
```

### 3. Automatic Invocation

You never call `__init__` directly. Python calls it automatically when you create an object.

```python
class Book:
    def __init__(self, title):
        self.title = title
        print(f"Book '{title}' created!")

# __init__ is called automatically
book = Book("Python Guide")  # Output: Book 'Python Guide' created!
```

## Types of Constructors

### 1. Default Constructor (No Parameters)

```python
class Product:
    def __init__(self):
        self.name = "Unknown"
        self.price = 0.0
        self.stock = 0

product = Product()
print(product.name)   # Unknown
print(product.price)  # 0.0
print(product.stock)  # 0
```

### 2. Parameterized Constructor

```python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

product = Product("Laptop", 999.99, 10)
print(product.name)   # Laptop
print(product.price)  # 999.99
print(product.stock)  # 10
```

### 3. Constructor with Default Values

```python
class Product:
    def __init__(self, name="Unknown", price=0.0, stock=0):
        self.name = name
        self.price = price
        self.stock = stock

# Different ways to create objects
p1 = Product()                          # All defaults
p2 = Product("Mouse")                   # Partial
p3 = Product("Keyboard", 49.99)         # More specific
p4 = Product("Monitor", 299.99, 5)      # All values

print(p1.name, p1.price, p1.stock)  # Unknown 0.0 0
print(p2.name, p2.price, p2.stock)  # Mouse 0.0 0
print(p3.name, p3.price, p3.stock)  # Keyboard 49.99 0
print(p4.name, p4.price, p4.stock)  # Monitor 299.99 5
```

## Common Constructor Patterns

### 1. Input Validation

```python
class Student:
    def __init__(self, name, age, grade):
        # Validate name
        if not name or not isinstance(name, str):
            raise ValueError("Name must be a non-empty string")

        # Validate age
        if not isinstance(age, int) or age < 0:
            raise ValueError("Age must be a positive integer")

        # Validate grade
        if not isinstance(grade, (int, float)) or grade < 0 or grade > 100:
            raise ValueError("Grade must be between 0 and 100")

        self.name = name
        self.age = age
        self.grade = grade

# Valid creation
student = Student("Alice", 20, 95)

# Invalid creation
try:
    invalid = Student("", 20, 95)  # Empty name
except ValueError as e:
    print(f"Error: {e}")  # Error: Name must be a non-empty string
```

### 2. Computed Attributes

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        # Compute and store derived values
        self.area = width * height
        self.perimeter = 2 * (width + height)

rect = Rectangle(10, 5)
print(rect.width)      # 10
print(rect.height)     # 5
print(rect.area)       # 50
print(rect.perimeter)  # 30
```

### 3. Calling Parent Constructor

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Employee(Person):
    def __init__(self, name, age, employee_id, department):
        # Call parent constructor
        super().__init__(name, age)
        # Initialize Employee-specific attributes
        self.employee_id = employee_id
        self.department = department

emp = Employee("John", 30, "E001", "IT")
print(emp.name)          # John (from Person)
print(emp.age)           # 30 (from Person)
print(emp.employee_id)   # E001 (from Employee)
print(emp.department)    # IT (from Employee)
```

### 4. Type Conversion in Constructor

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = float(celsius)  # Convert to float
        self.fahrenheit = (celsius * 9/5) + 32
        self.kelvin = celsius + 273.15

temp = Temperature(25)  # Can pass int
print(temp.celsius)     # 25.0
print(temp.fahrenheit)  # 77.0
print(temp.kelvin)      # 298.15

temp2 = Temperature("30")  # Can pass string
print(temp2.celsius)    # 30.0
```

## Best Practices

### 1. Initialize All Attributes

```python
# Good - all attributes initialized
class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.is_active = True
        self.login_count = 0
        self.created_at = datetime.now()

# Avoid - some attributes not initialized
class User:
    def __init__(self, username):
        self.username = username
        # email, is_active not initialized - problematic!
```

### 2. Use Type Hints

```python
from typing import Optional
from datetime import datetime

class User:
    def __init__(self, username: str, email: str, age: Optional[int] = None):
        self.username: str = username
        self.email: str = email
        self.age: Optional[int] = age
        self.created_at: datetime = datetime.now()
```

### 3. Keep It Simple

```python
# Good - simple initialization
class Config:
    def __init__(self, host, port, debug=False):
        self.host = host
        self.port = port
        self.debug = debug

# Avoid - complex logic in constructor
class Config:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connect()        # Avoid I/O operations
        self.load_settings()  # Avoid heavy operations
        self.start_server()   # Avoid side effects
```

## Common Mistakes

### 1. Forgetting `self`

```python
# Wrong - missing self parameter
class User:
    def __init__(name, age):  # ERROR!
        self.name = name
        self.age = age

# Correct
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

### 2. Not Using `self` for Attributes

```python
# Wrong - not using self
class User:
    def __init__(self, name, age):
        name = name    # Just a local variable!
        age = age      # Just a local variable!

# Correct - use self
class User:
    def __init__(self, name, age):
        self.name = name  # Object attribute
        self.age = age    # Object attribute
```

### 3. Wrong Constructor Name

```python
# Wrong - incorrect name
class User:
    def init(self, name):  # Missing underscores!
        self.name = name

# Correct - proper name
class User:
    def __init__(self, name):
        self.name = name
```

## Practice Examples

### Example 1: Bank Account

```python
class BankAccount:
    def __init__(self, account_number, owner_name, initial_balance=0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")

        self.account_number = account_number
        self.owner_name = owner_name
        self.balance = initial_balance
        self.transaction_history = []

    def display_info(self):
        print(f"Account: {self.account_number}")
        print(f"Owner: {self.owner_name}")
        print(f"Balance: ${self.balance:.2f}")

# Create accounts
account1 = BankAccount("ACC001", "Alice")
account2 = BankAccount("ACC002", "Bob", 1000)

account1.display_info()
# Account: ACC001
# Owner: Alice
# Balance: $0.00

account2.display_info()
# Account: ACC002
# Owner: Bob
# Balance: $1000.00
```

### Example 2: Student with Validation

```python
class Student:
    def __init__(self, name, roll_number, subjects=None):
        # Validation
        if not name:
            raise ValueError("Name cannot be empty")
        if roll_number <= 0:
            raise ValueError("Roll number must be positive")

        # Initialization
        self.name = name
        self.roll_number = roll_number
        self.subjects = subjects if subjects else []
        self.grades = {}

    def add_grade(self, subject, grade):
        if subject not in self.subjects:
            self.subjects.append(subject)
        self.grades[subject] = grade

    def get_average(self):
        if not self.grades:
            return 0
        return sum(self.grades.values()) / len(self.grades)

# Create student
student = Student("Alice", 101, ["Math", "Science"])
student.add_grade("Math", 95)
student.add_grade("Science", 88)

print(f"Name: {student.name}")
print(f"Roll Number: {student.roll_number}")
print(f"Average Grade: {student.get_average():.2f}")
# Name: Alice
# Roll Number: 101
# Average Grade: 91.50
```

### Example 3: Shopping Cart

```python
class ShoppingCart:
    def __init__(self, customer_name):
        self.customer_name = customer_name
        self.items = []
        self.total = 0.0
        self.discount = 0.0

    def add_item(self, name, price, quantity=1):
        item = {
            'name': name,
            'price': price,
            'quantity': quantity,
            'subtotal': price * quantity
        }
        self.items.append(item)
        self.total += item['subtotal']

    def display_cart(self):
        print(f"\n{self.customer_name}'s Cart:")
        print("-" * 50)
        for item in self.items:
            print(f"{item['name']} x{item['quantity']} - ${item['subtotal']:.2f}")
        print("-" * 50)
        print(f"Total: ${self.total:.2f}")

# Create and use cart
cart = ShoppingCart("Alice")
cart.add_item("Laptop", 999.99)
cart.add_item("Mouse", 25.99, 2)
cart.add_item("Keyboard", 75.50)

cart.display_cart()
# Alice's Cart:
# --------------------------------------------------
# Laptop x1 - $999.99
# Mouse x2 - $51.98
# Keyboard x1 - $75.50
# --------------------------------------------------
# Total: $1127.47
```

## Summary

Python constructors (`__init__`) are essential for:

- Initializing object attributes when objects are created
- Validating input parameters before object creation
- Setting up default values for optional attributes
- Computing derived values from input parameters
- Preparing objects for use in your program

The `__init__` method is automatically called when you create an object, making it the perfect place to ensure your objects start with valid, predictable states.

## Related Topics

- [[wiki:classes]] - Learn about Python classes
- [[wiki:methods]] - Understand instance methods
- [[wiki:inheritance]] - How constructors work with inheritance
- [[question:01-python-constructor]] - Practice Python constructors
