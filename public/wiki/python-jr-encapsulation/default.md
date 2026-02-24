# Encapsulation -- Keeping Your Object's Data Safe

## The Problem: What If Someone Breaks Your Object?

You built a nice `BankAccount` class. It has a balance. It has methods to deposit and withdraw money. Your `withdraw` method even checks that you cannot take out more money than you have. Everything works perfectly.

Then someone writes this:

```python
account: BankAccount = BankAccount("Alice", 500.0)
account.balance = -99999.0  # Uh oh. No rules. No checking. Just broken.
```

Nobody stopped them. They reached right into the object and changed the balance to a negative number. Your careful `withdraw` method that checked for enough money? Completely skipped.

Think about a piggy bank. If anyone could just reach inside and grab coins whenever they want, what is the point of having a piggy bank at all? There should be rules: you put money in through the slot, and you have to shake it or open a plug to get money out.

That is what encapsulation is all about -- putting rules around how people interact with your object's data.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing guard next to a colorful piggy bank with a coin slot on top. A small sign reads a checkmark for the slot and an X for reaching inside. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is Encapsulation?

Encapsulation means **keeping data safe inside the object with rules for how to use it**.

It has two parts:

1. **Bundling data and behavior together.** The data (like a balance) and the methods that work with it (like deposit and withdraw) live in the same class. You already learned this when you learned about classes!

2. **Controlling access to that data.** Instead of letting anyone change the data directly, you make them go through methods that check for mistakes.

Think of a vending machine. You do not open the machine and grab a drink. You put in money, press a button, and the machine decides whether to give you a drink. The machine controls how you interact with it. That is encapsulation.

---

## Three Levels of Access in Python

Python gives you three ways to signal how "open" or "protected" a piece of data is. They all use underscores at the beginning of the name.

---

### Public (No Underscore) -- Anyone Can Use It

Any variable or method with no underscore at the start is **public**. Anyone can read it, change it, and use it.

```python
class Pet:
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name        # Public
        self.species: str = species  # Public

    def greet(self) -> str:          # Public
        return f"Hi, I'm {self.name} the {self.species}!"

buddy: Pet = Pet("Buddy", "Dog")
print(buddy.name)      # Buddy -- totally fine
buddy.name = "Max"     # Also fine -- public means open
print(buddy.greet())   # Hi, I'm Max the Dog!
```

**When to use it:** For data and methods that are *meant* to be used by anyone. If other code is supposed to use it, keep it public.

Most of your variables and methods will be public. That is normal.

---

### Protected (Single Underscore `_`) -- "Please Don't Touch"

A single underscore at the start is like a polite sign on a door that says **"Staff Only."** You *can* still open the door -- Python will not stop you -- but the sign tells you that you probably should not.

Open your editor. Type this. Run it.

```python
class BankAccount:
    def __init__(self, owner: str, balance: float) -> None:
        self.owner: str = owner          # Public
        self._balance: float = balance   # Protected -- please use methods instead

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("You must deposit a positive amount!")
        self._balance += amount

    def withdraw(self, amount: float) -> bool:
        if amount > self._balance:
            return False
        self._balance -= amount
        return True

    def get_balance(self) -> float:
        return self._balance

account: BankAccount = BankAccount("Alice", 500.0)
print(account.get_balance())  # 500.0 -- the right way

# This WORKS but you should not do it:
print(account._balance)       # 500.0 -- Python does not stop you
account._balance = -99999.0   # Python lets you, but you are breaking the rules
```

Python does **not** block you from using `_balance`. The underscore is a signal, not a lock. It says: "Use the public methods instead. If you ignore this and things break, that is on you."

**When to use it:** For data that methods inside the class need, but code outside the class should not touch directly.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing next to three doors of different colors -- a green open door labeled with a checkmark, a yellow door with a small caution triangle, and a red door with a padlock. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

### Private (Double Underscore `__`) -- Python Scrambles the Name

A double underscore at the start does something special. Python actually **renames** the variable behind the scenes to make it harder (but not impossible) to reach from outside the class. This is called **name mangling**.

Open your editor. Type this. Run it.

```python
class SecretDiary:
    def __init__(self, owner: str) -> None:
        self.owner: str = owner
        self.__entries: list[str] = []  # Private -- name mangled!

    def write(self, entry: str) -> None:
        self.__entries.append(entry)

    def read_latest(self) -> str:
        if not self.__entries:
            return "The diary is empty."
        return self.__entries[-1]

diary: SecretDiary = SecretDiary("Byte")
diary.write("Today I learned about encapsulation!")
print(diary.read_latest())  # Today I learned about encapsulation!

# This does NOT work:
# print(diary.__entries)  # AttributeError!

# Python renamed it to _SecretDiary__entries
# You COULD access it, but you really should not:
# print(diary._SecretDiary__entries)  # Works but DO NOT do this
```

Python renamed `__entries` to `_SecretDiary__entries`. This makes it unlikely that someone will accidentally mess with it. But it is not a true lock -- someone who really wanted to could still get to it.

**When to use it:** Honestly, not very often. Double underscore is mostly useful in advanced situations when you have a parent class and a child class that might accidentally use the same variable name. For most code, single underscore `_` is enough.

---

## Python's Way: "We Trust Each Other"

Many programming languages have strict locks on data. Python is different. Python's approach is based on **conventions** (agreements), not locks. The community saying is: **"We are all responsible programmers here."**

If you see `_balance`, you know not to touch it directly. If you ignore the underscore and things break, that is on you. The underscore is not a wall -- it is a "please keep out" sign. This works really well in practice because programmers respect the conventions.

---

## The Three Levels Compared

| Convention | How It Looks | What It Means | Does Python Block Access? |
|---|---|---|---|
| **Public** | `self.name` | Part of the interface. Use it freely. | Not applicable |
| **Protected** | `self._name` | Internal. Please use methods instead. | No -- just a convention |
| **Private** | `self.__name` | Scrambled name. Hard to find from outside. | Partially -- renamed, but not truly hidden |

---

## Using `@property` to Control Access

You learned about `@property` in the classes lesson. Now you will see why it is so useful for encapsulation. Properties give you two things:

- **A getter** (reading the data) -- like a window to look at the data.
- **A setter** (changing the data) -- like a door with a guard who checks what you are bringing in.

### Getter and Setter Together

The **getter** (`@property`) lets you look at the data. The **setter** (`@name.setter`) lets you change it -- but only if it passes the guard's check.

Open your editor. Type this. Run it.

```python
class PlayerHealth:
    def __init__(self, max_hp: int) -> None:
        self._max_hp: int = max_hp
        self._current_hp: int = max_hp

    @property
    def hp(self) -> int:
        return self._current_hp

    @hp.setter
    def hp(self, value: int) -> None:
        if value < 0:
            self._current_hp = 0  # Can't go below zero
        elif value > self._max_hp:
            self._current_hp = self._max_hp  # Can't go above max
        else:
            self._current_hp = value

    @property
    def max_hp(self) -> int:
        return self._max_hp

    @property
    def is_alive(self) -> bool:
        return self._current_hp > 0

    @property
    def health_bar(self) -> str:
        filled: int = int(self._current_hp / self._max_hp * 10)
        empty: int = 10 - filled
        return f"[{'#' * filled}{'.' * empty}] {self._current_hp}/{self._max_hp}"

hero: PlayerHealth = PlayerHealth(100)
print(hero.health_bar)   # [##########] 100/100

hero.hp = 65
print(hero.health_bar)   # [######....] 65/100

hero.hp = -20            # Tries to go negative
print(hero.health_bar)   # [..........] 0/100
print(hero.is_alive)     # False

hero.hp = 9999           # Tries to go above max
print(hero.health_bar)   # [##########] 100/100
```

Notice how the setter **protects** the data. You cannot set HP below 0 or above the maximum. The setter acts as a guard that keeps the data in a safe range.

---

### Read-Only Properties (Window but No Door)

Sometimes you want data that can be **read** but never **changed** from outside. That is a read-only property -- a window with no door.

You make one by creating a `@property` but **not** creating a setter for it.

```python
class Triangle:
    def __init__(self, base: float, height: float) -> None:
        self._base: float = base
        self._height: float = height

    @property
    def base(self) -> float:
        return self._base

    @property
    def height(self) -> float:
        return self._height

    @property
    def area(self) -> float:
        return 0.5 * self._base * self._height

t: Triangle = Triangle(6.0, 4.0)
print(t.area)   # 12.0
# t.area = 50   # Error! area is read-only -- there is no setter
```

The `area` property is computed from `base` and `height`. It makes no sense to set the area directly, so we do not provide a setter. It is read-only.

---

## Practical Example: BankAccount with Balance Protection

Let us build a proper `BankAccount` that protects its balance from being changed in bad ways.

Open your editor. Type this. Run it.

```python
class BankAccount:
    def __init__(self, owner: str, starting_balance: float = 0.0) -> None:
        self.owner: str = owner
        self._balance: float = starting_balance
        self._transactions: list[str] = []

    @property
    def balance(self) -> float:
        """Read-only -- you can look at the balance, but you
        cannot change it directly. Use deposit() or withdraw()."""
        return self._balance

    @property
    def transaction_count(self) -> int:
        return len(self._transactions)

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive!")
        self._balance += amount
        self._transactions.append(f"Deposited ${amount:.2f}")

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive!")
        if amount > self._balance:
            self._transactions.append(f"FAILED withdrawal of ${amount:.2f}")
            return False
        self._balance -= amount
        self._transactions.append(f"Withdrew ${amount:.2f}")
        return True

    def show_history(self) -> None:
        print(f"--- {self.owner}'s Account History ---")
        if not self._transactions:
            print("  No transactions yet.")
        for entry in self._transactions:
            print(f"  {entry}")
        print(f"  Current balance: ${self._balance:.2f}")
        print()


# Try it out
account: BankAccount = BankAccount("Byte", 100.0)

account.deposit(50.0)
account.deposit(25.0)
account.withdraw(30.0)
account.withdraw(999.0)  # This will fail -- not enough money

print(f"Balance: ${account.balance:.2f}")  # Balance: $145.00

account.show_history()
# --- Byte's Account History ---
#   Deposited $50.00
#   Deposited $25.00
#   Withdrew $30.00
#   FAILED withdrawal of $999.00
#   Current balance: $145.00

# These are protected:
# account.balance = 1000000  # Error! balance is read-only
# account._balance = 1000000  # Works but breaks the rules -- do not do this!
```

This is encapsulation in action:

- `balance` is a **read-only property**. You can check it, but you cannot change it directly.
- `deposit()` and `withdraw()` are the **only proper ways** to change the balance.
- Both methods **validate** the input (no negative amounts, no overdrawing).
- A **transaction history** tracks everything that happens.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, acting as a friendly bank teller behind a small counter, handing a receipt to a happy child character. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## When to Use What -- Keep It Simple

Here is a quick guide for when to use each level:

**Use public** (no underscore) when:
- The data is part of how people are *supposed* to use your object.
- There are no rules about what values it can have.
- Example: a pet's `name`, a rectangle's `width`.

**Use protected** (single underscore `_`) when:
- The data is internal and should be changed through methods.
- You want to signal "please use the methods, not this directly."
- Example: a bank account's `_balance`, a game character's `_hp`.

**Use private** (double underscore `__`) when:
- You really want to make it hard to access from outside.
- You are building something complex with parent and child classes that might have name conflicts.
- This is rare -- most of the time, single underscore is enough.

**A good rule:** Start with public. If you find you need validation or protection, switch to a single underscore with a `@property`. You almost never need double underscore.

---

## Where Beginners Get Tripped Up

### Over-Protecting Everything

```python
# OVERKILL -- pointless protection
class Point:
    def __init__(self, x: float, y: float) -> None:
        self._x: float = x
        self._y: float = y

    @property
    def x(self) -> float:
        return self._x

    @x.setter
    def x(self, value: float) -> None:
        self._x = value  # No checking, no rules -- so why bother?

# BETTER -- just use public attributes
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y
```

If your getter just returns the value and your setter just saves it without checking anything, you do not need a property at all. Just use a plain public attribute.

### Using Double Underscores Everywhere

```python
# TOO MUCH -- double underscores are rarely needed
class Dog:
    def __init__(self, name: str) -> None:
        self.__name: str = name  # Why? Single underscore is fine.

# BETTER
class Dog:
    def __init__(self, name: str) -> None:
        self._name: str = name
```

Double underscores make things harder to work with. Use single underscore unless you have a specific reason for double.

---

## Summary

- **Encapsulation** means keeping data safe inside the object and providing rules for how to interact with it.
- Python has three levels, all based on naming conventions:
  - **Public** (`self.name`) -- use freely, no restrictions.
  - **Protected** (`self._name`) -- a polite "please don't touch" sign.
  - **Private** (`self.__name`) -- Python scrambles the name to make it harder to reach.
- Python's philosophy is **trust and conventions**, not locks. The underscores are signals, not walls.
- **`@property`** is how you control access in Python:
  - **Getter** -- a window to look at the data.
  - **Setter** -- a door with a guard who checks what you are bringing in.
- **Read-only properties** (getter with no setter) let you see data but not change it.
- Keep it simple: start with public attributes. Add protection only when you need validation.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, giving a thumbs up next to a neat row of labeled containers -- one open, one with a soft lid, and one locked. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practice Questions

**Question 1:** What is encapsulation, and why is it useful? Use the piggy bank analogy to explain.

**Question 2:** What is the difference between `self.name`, `self._name`, and `self.__name`? Does Python truly block access to any of them?

**Question 3:** Look at this code. What is wrong with it, and how would you fix it?

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self.celsius: float = celsius

temp: Temperature = Temperature(25.0)
temp.celsius = -500.0  # This should not be allowed!
```

**Question 4:** What is the difference between a getter and a setter in `@property`? What happens if you create a `@property` getter but no setter?

**Question 5:** Create a class called `GradeBook` that:
- Stores a student's `name` (public) and a list of `_grades` (protected)
- Has a method `add_grade(grade: float)` that only accepts grades between 0 and 100
- Has a read-only `@property` called `average` that returns the average grade (or 0.0 if no grades)
- Has a read-only `@property` called `letter_grade` that returns "A" (90+), "B" (80+), "C" (70+), "D" (60+), or "F" (below 60)
- Uses type hints everywhere

**Question 6:** Why does Python use conventions (underscore signals) instead of strict locks like some other programming languages? Name one advantage of Python's approach.

**Question 7:** Build a `Thermostat` class that:
- Has a protected `_temperature` (float) and a protected `_min_temp` and `_max_temp` (both floats, set in `__init__`)
- Has a `@property` called `temperature` with a getter and setter
- The setter should refuse temperatures below `_min_temp` or above `_max_temp`
- Has a read-only `@property` called `is_comfortable` that returns `True` if the temperature is between 18.0 and 24.0
- Use type hints everywhere

Create a thermostat with min 10.0 and max 35.0. Try setting it to valid and invalid temperatures.

---

## Answers to Practice Questions

**Answer 1:** Encapsulation means keeping data safe inside an object and setting up rules for how to use it. Think of a piggy bank: you do not want anyone to just reach in and grab coins whenever they want. Instead, there is a slot to put money in (like a deposit method) and you have to open it in a controlled way to take money out (like a withdraw method). This keeps your savings safe. Similarly, encapsulation protects an object's data by making people use methods instead of changing the data directly.

**Answer 2:**
- `self.name` is **public**. Anyone can read it and change it.
- `self._name` is **protected** (single underscore). It is a polite signal saying "please don't use this directly." But Python does NOT block access -- you can still read and change it.
- `self.__name` is **private** (double underscore). Python scrambles the name (renames it to `_ClassName__name`) so it is harder to find from outside. But it is still not truly blocked -- someone who knows the mangled name can access it.

Python does not truly block access to any of them. It is all based on conventions and trust.

**Answer 3:** The problem is that `celsius` is a plain public attribute with no protection. Someone can set it to -500.0, which is below absolute zero (-273.15) and is physically impossible. The fix is to use a protected `_celsius` with a `@property` and a setter that validates the value:

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
            raise ValueError("Temperature cannot be below absolute zero!")
        self._celsius = value

temp: Temperature = Temperature(25.0)
# temp.celsius = -500.0  # ValueError! The setter blocks this.
temp.celsius = 30.0       # This works fine.
```

**Answer 4:** A **getter** (`@property`) is like a window -- it lets you *look at* the data. A **setter** (`@name.setter`) is like a door with a guard -- it lets you *change* the data, but the guard checks what you are putting in to make sure it is valid. If you create a getter but no setter, the property becomes **read-only**. You can look at the value, but trying to change it gives an error.

**Answer 5:**

```python
class GradeBook:
    def __init__(self, name: str) -> None:
        self.name: str = name
        self._grades: list[float] = []

    def add_grade(self, grade: float) -> None:
        if not 0.0 <= grade <= 100.0:
            raise ValueError(f"Grade must be between 0 and 100, got {grade}")
        self._grades.append(grade)

    @property
    def average(self) -> float:
        if not self._grades:
            return 0.0
        return sum(self._grades) / len(self._grades)

    @property
    def letter_grade(self) -> str:
        avg: float = self.average
        if avg >= 90:
            return "A"
        elif avg >= 80:
            return "B"
        elif avg >= 70:
            return "C"
        elif avg >= 60:
            return "D"
        else:
            return "F"

student: GradeBook = GradeBook("Byte")
student.add_grade(95.0)
student.add_grade(87.0)
student.add_grade(92.0)
print(student.average)       # 91.33333333333333
print(student.letter_grade)  # A
```

**Answer 6:** Python uses conventions instead of strict locks because the Python community believes in trusting programmers. One advantage is **easier debugging**: when something goes wrong, you can always inspect the internal state of an object to figure out what happened. With strict locks, you sometimes cannot see what is going on inside, making bugs harder to track down. Another advantage is **simpler code** -- you do not need extra keywords like `public`, `private`, and `protected`.

**Answer 7:**

```python
class Thermostat:
    def __init__(self, starting_temp: float, min_temp: float, max_temp: float) -> None:
        self._min_temp: float = min_temp
        self._max_temp: float = max_temp
        self._temperature: float = starting_temp

    @property
    def temperature(self) -> float:
        return self._temperature

    @temperature.setter
    def temperature(self, value: float) -> None:
        if value < self._min_temp:
            raise ValueError(f"Temperature cannot be below {self._min_temp}!")
        if value > self._max_temp:
            raise ValueError(f"Temperature cannot be above {self._max_temp}!")
        self._temperature = value

    @property
    def is_comfortable(self) -> bool:
        return 18.0 <= self._temperature <= 24.0

thermo: Thermostat = Thermostat(20.0, 10.0, 35.0)
print(thermo.temperature)     # 20.0
print(thermo.is_comfortable)  # True

thermo.temperature = 30.0
print(thermo.is_comfortable)  # False

thermo.temperature = 22.0
print(thermo.is_comfortable)  # True

# thermo.temperature = 5.0   # ValueError: Temperature cannot be below 10.0!
# thermo.temperature = 40.0  # ValueError: Temperature cannot be above 35.0!
```

---

**Previous:** [[wiki:python-jr-classes]] | **Next:** [[wiki:python-jr-inheritance]]
