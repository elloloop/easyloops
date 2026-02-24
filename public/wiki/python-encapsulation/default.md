# Encapsulation and Access Modifiers -- Controlling Access to Data

## The Problem: Anyone Can Break Your Object

You built a `BankAccount` class. It has a balance. It has methods to deposit and withdraw. Everything works.

Then someone writes this:

```python
account: BankAccount = BankAccount("Alice", 500.0)
account.balance = -99999.0  # Oops. No validation. No rules. Just chaos.
```

Nothing stopped them. They reached directly into the object and changed the balance to a negative number. Your careful `withdraw` method with its overdraft check? Bypassed completely.

This is the problem encapsulation solves.

---

## What Is Encapsulation?

Encapsulation means two things:

1. **Bundling data and behavior together.** The data (balance) and the methods that operate on it (deposit, withdraw) live in the same class. You already learned this when you learned classes.

2. **Controlling access to that data.** The outside world interacts with your object through its methods, not by touching its internal data directly.

Think of a vending machine. You put money in and press a button. You do not open the machine and grab a drink yourself. The machine controls how you interact with it. That is encapsulation.

---

## The Three P's: Public, Protected, Private

In many programming languages (Java, C++, C#), access control is enforced by the compiler with keywords: `public`, `private`, `protected`. Python does not have these keywords. Instead, Python uses **naming conventions** and trusts the programmer.

This is one of the most important things to understand about Python's approach to OOP.

---

### Public (No Underscore)

Any attribute or method with no underscore prefix is **public**. Anyone can read it, write it, and call it.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name    # Public
        self.age: int = age      # Public

    def bark(self) -> str:       # Public
        return f"{self.name} says Woof!"

rex: Dog = Dog("Rex", 5)
print(rex.name)     # Fine -- public access
rex.age = 6         # Fine -- public access
print(rex.bark())   # Fine -- public method
```

**When to use it:** For data and methods that are part of the class's intended interface. If other code is *supposed* to use it, make it public.

Most of your attributes and methods will be public. Python defaults to openness.

---

### Protected (Single Underscore `_`)

A single underscore prefix means: **"This is internal. You can access it, but you probably shouldn't."**

```python
class BankAccount:
    def __init__(self, owner: str, balance: float) -> None:
        self.owner: str = owner          # Public
        self._balance: float = balance   # Protected -- internal use

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> bool:
        if amount > self._balance:
            return False
        self._balance -= amount
        return True

    def get_balance(self) -> float:
        return self._balance
```

Open your editor. Type this. Run it.

```python
class BankAccount:
    def __init__(self, owner: str, balance: float) -> None:
        self.owner: str = owner
        self._balance: float = balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> bool:
        if amount > self._balance:
            return False
        self._balance -= amount
        return True

    def get_balance(self) -> float:
        return self._balance

account: BankAccount = BankAccount("Alice", 500.0)
print(account.get_balance())  # 500.0 -- using the public interface

# This works but you should not do it:
print(account._balance)       # 500.0 -- Python does not stop you
account._balance = -99999.0   # Python does not stop this either
print(account._balance)       # -99999.0 -- broken, but allowed
```

Python does **not** enforce the underscore convention. It is a signal to other programmers: "I am internal. Use the public methods instead." If you ignore the signal and things break, that is your fault.

**When to use it:** For internal state that methods need but outside code should not touch directly. Helper methods that support the public interface but are not meant to be called from outside.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between self.balance and self._balance? Does Python actually prevent access to self._balance from outside the class? Explain when you would choose one over the other."</div>
</div>

---

### Private (Double Underscore `__`)

A double underscore prefix triggers **name mangling**. Python actually renames the attribute to make it harder (but not impossible) to access from outside.

```python
class Secret:
    def __init__(self, code: str) -> None:
        self.__code: str = code   # Private -- name mangling

    def reveal(self) -> str:
        return self.__code        # Works inside the class

s: Secret = Secret("abc123")
print(s.reveal())     # abc123 -- using the public method
```

What happens if you try to access `__code` directly?

```python
# print(s.__code)    # AttributeError: 'Secret' object has no attribute '__code'
```

Python renamed it. The actual attribute name is `_Secret__code`:

```python
print(s._Secret__code)  # abc123 -- it works, but NEVER do this
```

Open your editor. Type this. Run it.

```python
class Credential:
    def __init__(self, username: str, password: str) -> None:
        self.username: str = username        # Public
        self.__password: str = password      # Private (name mangled)

    def check_password(self, attempt: str) -> bool:
        return self.__password == attempt

    def _hash_password(self) -> str:         # Protected helper
        return "*" * len(self.__password)

cred: Credential = Credential("alice", "s3cret")
print(cred.username)                  # alice -- public, fine
print(cred.check_password("s3cret"))  # True -- public method
print(cred.check_password("wrong"))   # False

# These show how Python's access control works:
# print(cred.__password)             # AttributeError!
# print(cred._Credential__password)  # Works but DO NOT do this

# Protected method -- works but signals "internal"
print(cred._hash_password())          # ******
```

**When to use it:** Rarely. Double underscores are mainly useful when you are worried about name collisions in inheritance chains. If a parent class has `__value` and a child class also has `__value`, name mangling keeps them separate.

```python
class Parent:
    def __init__(self) -> None:
        self.__x: int = 10    # Becomes _Parent__x

class Child(Parent):
    def __init__(self) -> None:
        super().__init__()
        self.__x: int = 20    # Becomes _Child__x -- different attribute!

c: Child = Child()
print(c._Parent__x)  # 10
print(c._Child__x)   # 20
```

For most cases, single underscore `_` is sufficient. Double underscore `__` is a specialized tool.

---

## The Three P's Compared

| Convention | Syntax | Meaning | Enforced? |
|---|---|---|---|
| **Public** | `self.name` | Part of the interface. Use freely. | N/A |
| **Protected** | `self._name` | Internal. Don't use from outside. | No -- convention only |
| **Private** | `self.__name` | Name-mangled. Hard to access from outside. | Partially -- renamed, not truly hidden |

In Java or C++, `private` means "the compiler will not let you access this." In Python, `__` means "Python will rename this to make accidental access unlikely." The philosophy is different.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Employee with a public name, a protected _salary, and a private __ssn (social security number). Add a public method get_masked_ssn() that returns the SSN with only the last four digits visible (e.g., '***-**-1234'). Show what happens when you try to access __ssn directly. Use type hints everywhere."</div>
</div>

---

## Python's Philosophy: "We're All Consenting Adults"

Python's approach to access control is fundamentally different from Java or C++. This is not a weakness -- it is a deliberate design choice.

The Python community saying is: **"We're all consenting adults here."**

This means:
- Python trusts you to follow conventions.
- If you see `_balance`, you know not to touch it.
- If you ignore the convention and things break, that is on you.
- The underscore is not a lock -- it is a "do not disturb" sign.

This approach has tradeoffs:

**Advantages:**
- Simpler language. No `public`/`private`/`protected` keywords to learn.
- Easier debugging. You can always inspect internal state when needed.
- More flexible. Testing can access internal state without special tricks.

**Disadvantages:**
- Nothing stops a careless programmer from breaking your object.
- Requires discipline and reading documentation.
- Can cause problems in very large teams where not everyone follows conventions.

In practice, the convention system works extremely well. The Python standard library, Django, Flask, FastAPI, and every major Python project use single underscore for internal state, and it works because programmers respect the convention.

---

## Using `@property` for Encapsulation

The `@property` decorator is Python's primary tool for proper encapsulation. It lets you control how attributes are read and written, while keeping the syntax clean.

Without `@property`, you would write getter/setter methods:

```python
# Java-style getters and setters -- do NOT do this in Python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius: float = celsius

    def get_celsius(self) -> float:
        return self._celsius

    def set_celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

# Ugly:
temp: Temperature = Temperature(100.0)
temp.set_celsius(50.0)    # Feels like Java, not Python
print(temp.get_celsius())  # 50.0
```

With `@property`, the same control looks natural:

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius: float = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9 / 5 + 32

# Clean:
temp: Temperature = Temperature(100.0)
temp.celsius = 50.0        # Looks like attribute access, but runs validation
print(temp.celsius)        # 50.0
print(temp.fahrenheit)     # 122.0
# temp.celsius = -300      # ValueError: Below absolute zero!
```

The user of the class writes `temp.celsius = 50.0` as if it were a normal attribute. Behind the scenes, the setter method runs and validates the input. That is encapsulation done right in Python.

### Read-Only Properties

If you define `@property` without a setter, the attribute becomes read-only:

```python
class Circle:
    def __init__(self, radius: float) -> None:
        self._radius: float = radius

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float) -> None:
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2

    @property
    def circumference(self) -> float:
        return 2 * 3.14159 * self._radius

c: Circle = Circle(5.0)
print(c.area)            # 78.53975 -- read-only computed property
print(c.circumference)   # 31.4159
# c.area = 100.0         # AttributeError: can't set attribute
```

`area` and `circumference` are **computed properties** -- they are calculated from the radius and cannot be set directly. This is a common encapsulation pattern.

---

Open your editor. Type this. Run it.

```python
class Student:
    def __init__(self, name: str, grades: list[float]) -> None:
        self._name: str = name
        self._grades: list[float] = list(grades)

    @property
    def name(self) -> str:
        return self._name

    @property
    def grades(self) -> list[float]:
        return list(self._grades)  # Return a copy! Not the original.

    def add_grade(self, grade: float) -> None:
        if not 0.0 <= grade <= 100.0:
            raise ValueError(f"Grade must be 0-100, got {grade}")
        self._grades.append(grade)

    @property
    def average(self) -> float:
        if not self._grades:
            return 0.0
        return sum(self._grades) / len(self._grades)

    @property
    def is_passing(self) -> bool:
        return self.average >= 60.0

s: Student = Student("Alice", [85.0, 92.0, 78.0])
print(s.name)         # Alice
print(s.grades)       # [85.0, 92.0, 78.0]
print(s.average)      # 85.0
print(s.is_passing)   # True

s.add_grade(95.0)
print(s.average)      # 87.5

# The grades property returns a copy:
stolen: list[float] = s.grades
stolen.append(0.0)           # Modifying the copy
print(s.grades)               # [85.0, 92.0, 78.0, 95.0] -- original unchanged!

# s.name = "Bob"             # AttributeError -- name is read-only
# s.add_grade(150.0)         # ValueError -- grade out of range
```

Notice the `grades` property returns `list(self._grades)` -- a copy. If it returned `self._grades` directly, outside code could modify the internal list by appending to it. Returning a copy is a defensive encapsulation technique.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Create a class called Password that stores a password internally using a protected attribute. Add a @property called strength that returns 'weak', 'medium', or 'strong' based on the password length (under 6, 6-12, over 12). Add a setter that rejects passwords shorter than 4 characters. Add a read-only property called masked that returns the password with all characters replaced by asterisks. Type-hint everything."</div>
</div>

---

## Practical Example: Inventory System

Open your editor. Type this. Run it.

```python
class Product:
    def __init__(self, name: str, price: float, quantity: int) -> None:
        self._name: str = name
        self._price: float = price
        self._quantity: int = quantity

    @property
    def name(self) -> str:
        return self._name

    @property
    def price(self) -> float:
        return self._price

    @price.setter
    def price(self, value: float) -> None:
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = round(value, 2)

    @property
    def quantity(self) -> int:
        return self._quantity

    @property
    def total_value(self) -> float:
        return self._price * self._quantity

    def restock(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Restock amount must be positive")
        self._quantity += amount

    def sell(self, amount: int) -> bool:
        if amount > self._quantity:
            return False
        self._quantity -= amount
        return True

    def __repr__(self) -> str:
        return f"Product('{self._name}', ${self._price:.2f}, qty={self._quantity})"


class Inventory:
    def __init__(self) -> None:
        self._products: dict[str, Product] = {}

    def add_product(self, product: Product) -> None:
        self._products[product.name] = product

    def get_product(self, name: str) -> Product | None:
        return self._products.get(name)

    @property
    def total_value(self) -> float:
        return sum(p.total_value for p in self._products.values())

    @property
    def product_count(self) -> int:
        return len(self._products)

    def display(self) -> None:
        print(f"Inventory ({self.product_count} products):")
        for product in self._products.values():
            print(f"  {product}")
        print(f"Total value: ${self.total_value:.2f}")


# Build an inventory
inv: Inventory = Inventory()
inv.add_product(Product("Widget", 9.99, 100))
inv.add_product(Product("Gadget", 24.99, 50))
inv.add_product(Product("Doohickey", 4.50, 200))

inv.display()
# Inventory (3 products):
#   Product('Widget', $9.99, qty=100)
#   Product('Gadget', $24.99, qty=50)
#   Product('Doohickey', $4.50, qty=200)
# Total value: $3148.50

widget: Product | None = inv.get_product("Widget")
if widget is not None:
    widget.sell(10)
    print(f"After selling 10: {widget}")  # Product('Widget', $9.99, qty=90)

# Try to set price to negative:
# widget.price = -5.0  # ValueError: Price cannot be negative
```

This example shows encapsulation in practice:
- Internal data (`_products`, `_price`, `_quantity`) is protected.
- Access goes through properties and methods that validate input.
- Computed properties (`total_value`) derive from internal state.
- The public interface is clean: `add_product`, `sell`, `restock`, `price`, `quantity`.

---

## Encapsulation vs Just Using Public Attributes

When you are starting out, it is tempting to ask: "Why not just use public attributes everywhere?"

For simple data containers, public attributes are fine:

```python
# This is perfectly fine for simple data
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y
```

Encapsulation becomes important when:
- **Validation is needed.** A price should not be negative. An age should not be 500.
- **State changes need coordination.** Changing one value should update another.
- **Internal representation might change.** You want to store temperature in Kelvin internally but expose Celsius and Fahrenheit.
- **You need to prevent misuse.** A balance should only change through deposit/withdraw, not direct assignment.

If none of these apply, keep it simple. Use public attributes. Do not wrap every attribute in a property for no reason.

---

## Where People Go Wrong

### Over-Encapsulating

```python
# BAD -- pointless encapsulation
class Point:
    def __init__(self, x: float, y: float) -> None:
        self._x: float = x
        self._y: float = y

    @property
    def x(self) -> float:
        return self._x

    @x.setter
    def x(self, value: float) -> None:
        self._x = value  # No validation, no logic -- just passing through!

    @property
    def y(self) -> float:
        return self._y

    @y.setter
    def y(self, value: float) -> None:
        self._y = value  # Same -- pointless

# GOOD -- just use public attributes
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y
```

If your property getter just returns the attribute and your setter just assigns it, you do not need a property. Use a plain attribute. You can always add a property later if you need validation -- Python makes this seamless.

### Using Double Underscore Everywhere

```python
# BAD -- double underscores everywhere for no reason
class Dog:
    def __init__(self, name: str) -> None:
        self.__name: str = name   # Why? Name mangling not needed here.

    def __bark(self) -> str:      # Why? This just makes subclassing harder.
        return "Woof!"

# GOOD -- single underscore is sufficient
class Dog:
    def __init__(self, name: str) -> None:
        self._name: str = name

    def _bark(self) -> str:
        return "Woof!"
```

Double underscores have a specific purpose: preventing name collisions in inheritance. If you are not dealing with that, single underscore is the right choice.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have a class called User with attributes name, email, and age. Should I make all of them private with properties? Or should some be public? Explain the encapsulation decision for each attribute, considering what validation might be needed."</div>
</div>

---

## Summary

- **Encapsulation** means bundling data with methods and controlling access to that data.
- Python uses **naming conventions**, not compiler-enforced keywords:
  - **Public** (`self.name`) -- part of the interface, use freely.
  - **Protected** (`self._name`) -- internal, don't use from outside.
  - **Private** (`self.__name`) -- name-mangled, used to avoid inheritance collisions.
- **`@property`** is Python's tool for controlled attribute access. Use it when you need validation, computed values, or read-only attributes.
- **"We're all consenting adults"** -- Python trusts programmers to respect conventions.
- Do not over-encapsulate. If a simple public attribute works, use it. Add properties only when you need validation or computed values.
- Use **single underscore** for most internal attributes. Reserve **double underscore** for preventing name collisions in inheritance hierarchies.

---

**Previous:** [[wiki:python-classes]] | **Next:** [[wiki:python-inheritance]]