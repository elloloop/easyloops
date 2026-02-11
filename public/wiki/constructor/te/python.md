# Constructors in Python: Mana Object Ki "Foundation" Vesedi

## Constructor Ante Enti?

Constructor ante Python lo oka special method, daani peru `__init__`. Object create chesappudu idi automatic ga run avthundi. Idi oka setup manager laga work chesthundi, mana object ki initial values and configurations tho prepare chesthundi.

Ila choodu, mana **RRR** movie lo, "Ram Charan and NTR friendship start ayinapudu first introductions, understanding - adi laga constructor kuda object creation time lo setup chesthundi!"

---

## Key Concepts

### 1. `__init__` Method

Python lo constructor name always `__init__` (rendu underscores, both sides).

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Constructor automatic ga call avthundi
person = Person("Raju", 25)
print(person.name)  # Output: Raju
print(person.age)   # Output: 25
```

**"Setup perfect ayithe, journey smooth!"** – Constructor tho object setup perfect ayithe, program smooth ga run avthundi.

---

### 2. `self` Parameter

`__init__` lo first parameter always `self`, idi current object ni refer chesthundi.

```python
class Car:
    def __init__(self, brand, model):
        self.brand = brand  # self ante current object
        self.model = model
        self.mileage = 0    # Default value tho initialize

car1 = Car("Maruti", "Swift")
car2 = Car("Hyundai", "Creta")

print(car1.brand)  # Maruti
print(car2.brand)  # Hyundai
```

**"Naa identity nenu fix chesukunta!"** – Each object `self` use chesi daani own identity set up chesthundi.

---

### 3. Automatic Invocation

`__init__` ni direct ga call cheyakoodadu. Python automatic ga object create chesappudu call chesthundi.

```python
class Book:
    def __init__(self, title):
        self.title = title
        print(f"Book '{title}' create ayindi!")

# __init__ automatic ga call avthundi
book = Book("Python Magic")  # Output: Book 'Python Magic' create ayindi!
```

**"Entry grand ga undali!"** – Object create ayinappudu constructor automatic ga welcome chesthundi!

---

## Constructor Types

### 1. Default Constructor (Parameters Lekunda)

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

**"Basic setup ready!"** – Default constructor basic values tho object ready chesthundi.

### 2. Parameterized Constructor

```python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

product = Product("Laptop", 45000, 10)
print(product.name)   # Laptop
print(product.price)  # 45000
print(product.stock)  # 10
```

**"Custom setup, custom power!"** – Parameters tho constructor specific values tho object create chesthundi.

### 3. Default Values Tho Constructor

```python
class Product:
    def __init__(self, name="Unknown", price=0.0, stock=0):
        self.name = name
        self.price = price
        self.stock = stock

# Different ways lo objects create cheyochu
p1 = Product()                          # All defaults
p2 = Product("Mouse")                   # Partial
p3 = Product("Keyboard", 1500)          # More specific
p4 = Product("Monitor", 12000, 5)       # All values

print(p1.name, p1.price, p1.stock)  # Unknown 0.0 0
print(p2.name, p2.price, p2.stock)  # Mouse 0.0 0
print(p3.name, p3.price, p3.stock)  # Keyboard 1500 0
print(p4.name, p4.price, p4.stock)  # Monitor 12000 5
```

**"Flexibility eh winning formula!"** – Default values tho constructor flexible ga different situations handle chesthundi.

---

## Common Constructor Patterns

### 1. Input Validation

```python
class Student:
    def __init__(self, name, age, grade):
        # Name validate chesthundi
        if not name or not isinstance(name, str):
            raise ValueError("Name must be a non-empty string")

        # Age validate chesthundi
        if not isinstance(age, int) or age < 0:
            raise ValueError("Age must be a positive integer")

        # Grade validate chesthundi
        if not isinstance(grade, (int, float)) or grade < 0 or grade > 100:
            raise ValueError("Grade must be between 0 and 100")

        self.name = name
        self.age = age
        self.grade = grade

# Valid creation
student = Student("Vijay", 18, 95)

# Invalid creation
try:
    invalid = Student("", 18, 95)  # Empty name
except ValueError as e:
    print(f"Error: {e}")  # Error: Name must be a non-empty string
```

**"Check lekunda entry ledu!"** – Validation tho constructor wrong data entry ni block chesthundi, **Pushpa** lanti strong security!

### 2. Computed Attributes

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        # Derived values compute chesi store chesthundi
        self.area = width * height
        self.perimeter = 2 * (width + height)

rect = Rectangle(10, 5)
print(rect.width)      # 10
print(rect.height)     # 5
print(rect.area)       # 50
print(rect.perimeter)  # 30
```

**"Smart work, not hard work!"** – Constructor derived values already calculate chesi ready chesthundi.

### 3. Parent Constructor Call Cheyadam

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Employee(Person):
    def __init__(self, name, age, employee_id, department):
        # Parent constructor call
        super().__init__(name, age)
        # Employee-specific attributes initialize
        self.employee_id = employee_id
        self.department = department

emp = Employee("Kiran", 30, "E001", "IT")
print(emp.name)          # Kiran (Person nundi)
print(emp.age)           # 30 (Person nundi)
print(emp.employee_id)   # E001 (Employee nundi)
print(emp.department)    # IT (Employee nundi)
```

**"Naanna property nadi, naa property nadi!"** – Inheritance lo parent constructor call chesi parent properties inherit chesukuntam, **Baahubali** legacy laga!

### 4. Type Conversion in Constructor

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = float(celsius)  # Float ki convert chesthundi
        self.fahrenheit = (celsius * 9/5) + 32
        self.kelvin = celsius + 273.15

temp = Temperature(25)  # Int pass cheyochu
print(temp.celsius)     # 25.0
print(temp.fahrenheit)  # 77.0
print(temp.kelvin)      # 298.15

temp2 = Temperature("30")  # String pass cheyochu
print(temp2.celsius)    # 30.0
```

**"Adjust ayyi survive chey!"** – Type conversion tho constructor flexible ga different inputs handle chesthundi.

---

## Best Practices

### 1. All Attributes Initialize Cheyali

```python
# Good - all attributes initialized
class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.is_active = True
        self.login_count = 0
        self.created_at = datetime.now()

# Avoid - some attributes initialize cheyaledu
class User:
    def __init__(self, username):
        self.username = username
        # email, is_active initialize cheyaledu - problematic!
```

**"Complete setup, complete success!"** – All attributes initialize cheste later errors ravu, **KGF** lanti complete planning!

### 2. Type Hints Use Cheyali

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

**"Clarity power!"** – Type hints tho code clarity untundi, reading easy avthundi.

### 3. Simple Ga Undali

```python
# Good - simple initialization
class Config:
    def __init__(self, host, port, debug=False):
        self.host = host
        self.port = port
        self.debug = debug

# Avoid - constructor lo complex logic
class Config:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connect()        # I/O operations avoid cheyali
        self.load_settings()  # Heavy operations avoid cheyali
        self.start_server()   # Side effects avoid cheyali
```

**"Keep it simple, keep it safe!"** – Constructor simple ga unte debugging easy, **Gentleman** lanti clean approach!

---

## Common Mistakes

### 1. `self` Marchipoyina

```python
# Wrong - self parameter miss ayindi
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

**"Plan lo gap unte, execution fail!"** – `self` miss ayithe program crash pakka!

### 2. `self` Attributes Ki Use Cheyaledu

```python
# Wrong - self use cheyaledu
class User:
    def __init__(self, name, age):
        name = name    # Just local variable!
        age = age      # Just local variable!

# Correct - self use chesindi
class User:
    def __init__(self, name, age):
        self.name = name  # Object attribute
        self.age = age    # Object attribute
```

**"Identity clear cheyyali!"** – `self` use cheste attributes object ki belong avtayi, clarity untundi.

### 3. Wrong Constructor Name

```python
# Wrong - name incorrect
class User:
    def init(self, name):  # Underscores miss!
        self.name = name

# Correct - proper name
class User:
    def __init__(self, name):
        self.name = name
```

**"Rules follow cheyyali!"** – Constructor name `__init__` undali, **Maharshi** lanti discipline!

---

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
        print(f"Balance: ₹{self.balance:.2f}")

# Accounts create chestham
account1 = BankAccount("ACC001", "Ravi")
account2 = BankAccount("ACC002", "Priya", 5000)

account1.display_info()
# Account: ACC001
# Owner: Ravi
# Balance: ₹0.00

account2.display_info()
# Account: ACC002
# Owner: Priya
# Balance: ₹5000.00
```

**"Foundation strong ayithe, building strong!"** – Bank account constructor tho strong foundation set chesthundi.

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

# Student create chestham
student = Student("Deepika", 101, ["Math", "Science"])
student.add_grade("Math", 95)
student.add_grade("Science", 88)

print(f"Name: {student.name}")
print(f"Roll Number: {student.roll_number}")
print(f"Average Grade: {student.get_average():.2f}")
# Name: Deepika
# Roll Number: 101
# Average Grade: 91.50
```

**"Quality check important!"** – Validation tho student object quality maintain chesthundi, **Jersey** lanti dedication!

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
            print(f"{item['name']} x{item['quantity']} - ₹{item['subtotal']:.2f}")
        print("-" * 50)
        print(f"Total: ₹{self.total:.2f}")

# Cart create chesi use chestham
cart = ShoppingCart("Sanjay")
cart.add_item("Laptop", 45000)
cart.add_item("Mouse", 500, 2)
cart.add_item("Keyboard", 1500)

cart.display_cart()
# Sanjay's Cart:
# --------------------------------------------------
# Laptop x1 - ₹45000.00
# Mouse x2 - ₹1000.00
# Keyboard x1 - ₹1500.00
# --------------------------------------------------
# Total: ₹47500.00
```

**"Shopping experience smooth!"** – Constructor tho cart setup perfect, shopping journey easy!

---

## Summary

Python constructors (`__init__`) programming lo very essential:

- Objects create ayinappudu attributes initialize chesthundi
- Object creation mundu input parameters validate chesthundi
- Optional attributes ki default values set chesthundi
- Input parameters nundi derived values compute chesthundi
- Objects use cheyadaniki properly prepare chesthundi

`__init__` method object create chesappudu automatic ga call avthundi, so idi objects ki valid, predictable states ivvadam ki perfect place!

**"Foundation perfect ayithe, building unshakeable!"** – Constructors tho object foundation perfect ga build cheste, program lo strength untundi, **Ala Vaikunthapurramuloo** family foundation laga!

## Related Topics

- [[wiki:classes]] - Python classes gurinchi nerchuko
- [[wiki:methods]] - Instance methods artham chesko
- [[wiki:inheritance]] - Inheritance tho constructors ela work chesthayo
- [[question:01-python-constructor]] - Python constructors practice cheyyi
