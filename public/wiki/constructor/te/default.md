# Constructors in Programming

## Constructor Ante Enti?

Constructor ante oka special method. Object create chesappudu automatic ga call avthundi. Idi oka blueprint initialization tool laga work chesthundi. Object ki initial values and configurations set cheyadaniki use avthundi.

## Key Concepts

### 1. Constructor Purpose

Constructor chala important purposes serve chesthundi:

- Object properties ki default or provided values tho initialize chesthundi
- Object ki kavalsina resources allocate chesthundi
- Initial object state set up chesthundi
- Object creation rules and validation enforce chesthundi

### 2. Constructor Characteristics

```python
# Python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Object create chesthe constructor call avthundi
user = User("Alice", 25)
```

```go
// Go
type User struct {
    Name string
    Age  int
}

// Constructor function
func NewUser(name string, age int) *User {
    return &User{
        Name: name,
        Age:  age,
    }
}

// Object create cheyadam
user := NewUser("Alice", 25)
```

### 3. Automatic Invocation

New object create chesappudu constructors automatic ga call avthayi. Regular methods laga explicitly call cheyalsina avasaram ledu.

```python
# Constructor automatic ga call avthundi
user = User("Alice", 25)  # __init__ invoke avthundi
```

## Constructor Types

### 1. Default Constructor

Parameters lekunda unna constructor, objects ni default values tho initialize chesthundi.

```python
# Python - default constructor
class Product:
    def __init__(self):
        self.name = "Unknown"
        self.price = 0.0
        self.stock = 0

product = Product()  # Default values use avthundi
```

### 2. Parameterized Constructor

Parameters accept chesi objects ni specific values tho initialize chese constructor.

```python
# Python - parameterized constructor
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

product = Product("Laptop", 999.99, 10)
```

### 3. Default Parameters Tho Constructor

Parameters tho or lekunda work chese flexible constructor.

```python
# Python - default parameters tho constructor
class Product:
    def __init__(self, name="Unknown", price=0.0, stock=0):
        self.name = name
        self.price = price
        self.stock = stock

# Different ways lo objects create cheyochu
product1 = Product()  # All defaults
product2 = Product("Laptop")  # Partial defaults
product3 = Product("Laptop", 999.99, 10)  # All specified
```

## Common Constructor Patterns

### 1. Constructor Lo Validation

```python
# Python - validation
class User:
    def __init__(self, name, age):
        if not name:
            raise ValueError("Name cannot be empty")
        if age < 0:
            raise ValueError("Age cannot be negative")

        self.name = name
        self.age = age
```

### 2. Resource Initialization

```python
# Python - resource initialization
class FileHandler:
    def __init__(self, filename):
        self.filename = filename
        self.file = open(filename, 'r')
        self.line_count = 0

    def __del__(self):
        if hasattr(self, 'file'):
            self.file.close()
```

### 3. Dependency Injection

```python
# Python - dependency injection
class EmailService:
    def __init__(self, smtp_server, port):
        self.smtp_server = smtp_server
        self.port = port

    def send_email(self, to, subject, body):
        # Implementation
        pass

# Construction time lo dependencies inject chestham
service = EmailService("smtp.gmail.com", 587)
```

## Constructor Best Practices

### 1. Constructors Simple Ga Undali

Constructors initialization focus cheyali, complex logic vaddu.

```python
# Good - simple initialization
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.created_at = datetime.now()

# Avoid - constructor lo complex logic
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.send_welcome_email()  # Side effects avoid cheyali
        self.update_database()     # I/O operations avoid cheyali
```

### 2. Input Parameters Validate Cheyali

Object integrity ensure cheyadaniki constructor parameters validate cheyali.

```python
# Python - input validation
class BankAccount:
    def __init__(self, account_number, initial_balance):
        if not account_number:
            raise ValueError("Account number is required")
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")

        self.account_number = account_number
        self.balance = initial_balance
```

### 3. Meaningful Default Values Use Cheyali

Optional parameters ki sensible defaults ivvali.

```python
# Python - meaningful defaults
class Configuration:
    def __init__(self, host="localhost", port=8080, timeout=30):
        self.host = host
        self.port = port
        self.timeout = timeout
```

### 4. All Attributes Initialize Cheyali

Constructor lo object attributes antha initialize undali.

```python
# Good - all attributes initialized
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height
        self.perimeter = 2 * (width + height)

# Avoid - uninitialized attributes
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        # area and perimeter initialize cheyyaledu
```

## Common Mistakes to Avoid

### 1. Parent Constructor Call Cheyyadam Marchipoyina

```python
# Wrong - parent constructor call cheyaledu
class Employee(Person):
    def __init__(self, name, age, employee_id):
        self.employee_id = employee_id
        # Person attributes initialize cheyyaledu

# Correct - parent constructor call chesindi
class Employee(Person):
    def __init__(self, name, age, employee_id):
        super().__init__(name, age)  # Parent constructor call
        self.employee_id = employee_id
```

### 2. Constructor Name Mistakes

```python
# Wrong - incorrect constructor name
class User:
    def init(self, name):  # Underscores miss ayindi
        self.name = name

# Correct constructor name
class User:
    def __init__(self, name):  # Correct: __init__
        self.name = name
```

### 3. 'self' Parameter Use Cheyaledu

```python
# Wrong - self parameter miss ayindi
class User:
    def __init__(name, age):  # 'self' ledu
        self.name = name
        self.age = age

# Correct - self parameter tho
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

## Constructor vs Regular Methods

| Aspect         | Constructor                   | Regular Method                |
| -------------- | ----------------------------- | ----------------------------- |
| Purpose        | Objects initialize chesthundi | Operations perform chesthundi |
| Invocation     | Object creation lo automatic  | Manual ga call cheyali        |
| Name           | Python lo `__init__`          | Any valid name                |
| Return Value   | None (implicit)               | Any value return cheyochu     |
| Call Frequency | Object ki once                | Multiple times as needed      |

## Practice Examples

### Example 1: Basic Constructor

```python
# Simple class tho constructor
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def display_info(self):
        print(f"Title: {self.title}")
        print(f"Author: {self.author}")
        print(f"Pages: {self.pages}")

# Object create chesi use chestham
book = Book("Python Programming", "John Doe", 350)
book.display_info()
```

### Example 2: Validation Tho Constructor

```python
# Validation tho constructor
class Student:
    def __init__(self, name, roll_number, grade):
        if not name:
            raise ValueError("Name is required")
        if roll_number <= 0:
            raise ValueError("Roll number must be positive")
        if grade < 0 or grade > 100:
            raise ValueError("Grade must be between 0 and 100")

        self.name = name
        self.roll_number = roll_number
        self.grade = grade

# Valid object creation
student = Student("Alice", 101, 95)

# Invalid object creation
try:
    invalid_student = Student("", 101, 95)
except ValueError as e:
    print(f"Error: {e}")
```

### Example 3: Default Parameters Tho Constructor

```python
# Flexible constructor
class Car:
    def __init__(self, brand, model, year=2024, color="White"):
        self.brand = brand
        self.model = model
        self.year = year
        self.color = color

    def display(self):
        print(f"{self.year} {self.brand} {self.model} - {self.color}")

# Different ways lo cars create cheyochu
car1 = Car("Toyota", "Camry")  # Default year and color use avthayi
car2 = Car("Honda", "Civic", 2023)  # Default color use avthundi
car3 = Car("Ford", "Mustang", 2023, "Red")  # All specified

car1.display()  # 2024 Toyota Camry - White
car2.display()  # 2023 Honda Civic - White
car3.display()  # 2023 Ford Mustang - Red
```

## Summary

Constructors ante object-oriented programming lo essential components. Ivi program lo different tasks perform cheyadaniki help chesthundi:

- Objects create ayinappudu automatic ga initialize chesthundi
- Proper values tho initial object state set up chesthundi
- Object integrity ensure cheyadaniki input validate chesthundi
- Object ki kavalsina resources prepare chesthundi
- Creation rules and constraints enforce chesthundi

Constructors ni artham chesukunte well-designed, maintainable object-oriented programs create cheyyadam easy avthundi. Ivi objects valid, predictable states tho start avvadam ki clean, consistent way provide chesthundi.

## Related Topics

- [[wiki:classes]] - Classes and object-oriented programming gurinchi nerchuko
- [[wiki:inheritance]] - Inheritance tho constructors ela work chesthayo
- [[wiki:methods]] - Constructors and methods madhya difference
- [[question:01-constructor-basics]] - Constructor implementation practice cheyyi
