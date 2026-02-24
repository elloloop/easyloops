# Classes and Objects -- Making Your Own Types

## You Already Know Types -- Now Make Your Own!

You have been using types like `int`, `str`, `list`, and `dict` for a while now. Python made those for you. But what if you want to describe something Python does not have a type for -- like a pet, a spaceship, or a trading card?

That is what classes are for. They let YOU create brand-new types. Once you make one, you can use it just like the built-in types you already know.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing at a colorful workbench with cookie cutters and freshly cut cookies of different shapes. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Class?

A class is a **blueprint** -- a set of instructions for making something.

Think about cookie cutters. A cookie cutter is not a cookie. It is a shape that tells you how to make cookies. Every cookie you press out of it has the same shape, but each one can have different frosting, sprinkles, or colors.

- The **cookie cutter** is the class (the blueprint).
- Each **cookie** you make is an object (a real thing built from the blueprint).

Here is another way to think about it: a class is like a blueprint for a house. The blueprint describes what every house should have -- walls, doors, windows, a roof. But the blueprint is not a house! You use it to *build* houses. Each house you build can have a different color, different furniture, and different people living inside.

---

## What Is an Object?

An object is a **real thing** made from a class blueprint. The fancy word for it is **instance**.

- `Dog` is a class (the blueprint for dogs).
- `my_dog` is an object (one specific dog made from that blueprint).

You can make as many objects as you want from one class, just like you can stamp out dozens of cookies from one cookie cutter.

---

## Your First Class

Open your editor. Type this. Run it.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age

    def bark(self) -> str:
        return f"{self.name} says Woof!"

# Make an object (one specific dog)
my_dog: Dog = Dog("Buddy", 4)
print(my_dog.name)    # Buddy
print(my_dog.age)     # 4
print(my_dog.bark())  # Buddy says Woof!
```

That might look like a lot, so let us break it down piece by piece.

---

## `__init__` -- The Setup Instructions

When you build a new piece of furniture from a kit, the first thing you do is follow the setup instructions. `__init__` is exactly that -- setup instructions that run **automatically** every time you create a new object.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age
```

When you write `Dog("Buddy", 4)`, Python does two things:

1. Creates a brand-new empty `Dog` object.
2. Runs `__init__` on that object, passing `"Buddy"` as `name` and `4` as `age`.

You never call `__init__` yourself. Python calls it for you every time you make a new object.

The double underscores around `init` (like `__init__`) are Python's way of marking special methods. You will sometimes hear them called "dunder methods" (short for "double underscore").

---

## `self` -- "This Particular Object"

Here is the trickiest part for beginners. Every method inside a class needs `self` as its first parameter. But what is it?

`self` means **"this particular object."** When a cookie talks about itself -- "MY frosting is pink, MY sprinkles are rainbow" -- that is `self`.

```python
class Dog:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name   # THIS dog's name
        self.age: int = age     # THIS dog's age

    def describe(self) -> str:
        return f"{self.name} is {self.age} years old"
```

When you write `my_dog.describe()`, Python secretly passes `my_dog` as `self`. So `self.name` becomes `my_dog.name`.

You never type `self` when you *call* the method -- Python fills it in automatically:

```python
buddy: Dog = Dog("Buddy", 4)
rex: Dog = Dog("Rex", 7)

print(buddy.describe())  # Buddy is 4 years old
print(rex.describe())    # Rex is 7 years old
```

Same method, different objects, different results. That is because `self` points to a different dog each time.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, pointing at two toy dogs on a table -- one with a name tag reading "Buddy" and the other "Rex." Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Instance Variables -- Each Object's Own Data

Instance variables are the pieces of data that belong to **one specific object**. Each cookie can have different frosting -- each object can have different data.

```python
class Cat:
    def __init__(self, name: str, color: str) -> None:
        self.name: str = name    # This cat's name
        self.color: str = color  # This cat's color

whiskers: Cat = Cat("Whiskers", "orange")
shadow: Cat = Cat("Shadow", "black")

print(whiskers.color)  # orange
print(shadow.color)    # black
```

Changing one object does not affect the other:

```python
whiskers.color = "white"
print(whiskers.color)  # white
print(shadow.color)    # black -- still the same!
```

---

## Methods -- Things the Object Can Do

A method is a function that lives inside a class. It is something the object **can do**. The difference from a regular function: it always gets `self` as its first parameter, so it can read and change the object's data.

Open your editor. Type this. Run it.

```python
class Counter:
    def __init__(self, start: int = 0) -> None:
        self.count: int = start

    def click(self) -> None:
        self.count += 1

    def reset(self) -> None:
        self.count = 0

    def show(self) -> str:
        return f"Count is: {self.count}"

my_counter: Counter = Counter()
my_counter.click()
my_counter.click()
my_counter.click()
print(my_counter.show())  # Count is: 3

my_counter.reset()
print(my_counter.show())  # Count is: 0
```

Notice how `click`, `reset`, and `show` all use `self.count`. That is how methods work with the object's data.

---

## Creating Multiple Objects from One Class

One class, many objects. Each object has its own separate data. This is one of the most useful things about classes!

```python
class Rectangle:
    def __init__(self, width: float, height: float) -> None:
        self.width: float = width
        self.height: float = height

    def area(self) -> float:
        return self.width * self.height

    def describe(self) -> str:
        return f"Rectangle: {self.width} x {self.height}, area = {self.area()}"

small: Rectangle = Rectangle(3.0, 2.0)
big: Rectangle = Rectangle(10.0, 8.0)

print(small.describe())  # Rectangle: 3.0 x 2.0, area = 6.0
print(big.describe())    # Rectangle: 10.0 x 8.0, area = 80.0
```

You can even put objects in a list and loop through them -- just like any other type.

---

## Type Hints with Classes

When you define a class, the class name becomes a type you can use in type hints -- just like `str`, `int`, or `float`.

```python
class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

def distance_between(p1: Point, p2: Point) -> float:
    dx: float = p1.x - p2.x
    dy: float = p1.y - p2.y
    return (dx ** 2 + dy ** 2) ** 0.5

a: Point = Point(0.0, 0.0)
b: Point = Point(3.0, 4.0)
print(distance_between(a, b))  # 5.0
```

You can use your class as the type for variables, function parameters, return values, and even inside lists like `list[Point]`.

---

## Class Variables vs Instance Variables

You already know instance variables -- they belong to one specific object. **Class variables** are different. They are shared by ALL objects made from that class.

```python
class Dog:
    # Class variable -- shared by ALL dogs
    species: str = "Canis familiaris"

    def __init__(self, name: str, breed: str) -> None:
        # Instance variables -- unique to EACH dog
        self.name: str = name
        self.breed: str = breed

buddy: Dog = Dog("Buddy", "Golden Retriever")
rex: Dog = Dog("Rex", "German Shepherd")

# Instance variables are different for each dog
print(buddy.name)     # Buddy
print(rex.name)       # Rex

# Class variable is the same for ALL dogs
print(buddy.species)  # Canis familiaris
print(rex.species)    # Canis familiaris
```

Use class variables for things that are the same across every object. Use instance variables for things that change from object to object.

**Watch out:** If you put a list as a class variable, ALL objects share the same list. Always put lists and other mutable data in `__init__` as instance variables so each object gets its own copy.

---

## `@property` -- A Method That Looks Like a Variable

Sometimes you want something that *looks* like a variable when you use it, but actually runs some code behind the scenes. The `@property` decorator does exactly that.

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
            raise ValueError("Radius cannot be negative!")
        self._radius = value

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2
```

Open your editor. Type this. Run it.

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
            raise ValueError("Radius cannot be negative!")
        self._radius = value

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2

c: Circle = Circle(5.0)
print(c.radius)  # 5.0  -- looks like a variable, runs a method
print(c.area)    # 78.53975

c.radius = 10.0
print(c.area)    # 314.159

# c.radius = -3  # ValueError: Radius cannot be negative!
# c.area = 50    # Error! area is read-only (no setter)
```

Notice you write `c.radius` and `c.area` without parentheses, as if they were plain variables. But behind the scenes, methods are running. The `area` property has no setter, so you cannot change it directly -- it is **read-only**.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, looking through a magnifying glass at a colorful circle diagram with measurements. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practical Example: Build a Pet Class

Let us put everything together and build something fun. This `Pet` class has a name, a species, and a list of tricks the pet can learn.

Open your editor. Type this. Run it.

```python
class Pet:
    # Class variable -- how many pets have been created
    total_pets: int = 0

    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species
        self.tricks: list[str] = []
        Pet.total_pets += 1

    def learn_trick(self, trick: str) -> None:
        if trick in self.tricks:
            print(f"{self.name} already knows {trick}!")
        else:
            self.tricks.append(trick)
            print(f"{self.name} learned {trick}!")

    def show_tricks(self) -> str:
        if not self.tricks:
            return f"{self.name} hasn't learned any tricks yet."
        trick_list: str = ", ".join(self.tricks)
        return f"{self.name} knows: {trick_list}"

    @property
    def num_tricks(self) -> int:
        return len(self.tricks)

    def describe(self) -> str:
        return f"{self.name} the {self.species} ({self.num_tricks} tricks)"


# Create some pets
buddy: Pet = Pet("Buddy", "Dog")
mittens: Pet = Pet("Mittens", "Cat")
polly: Pet = Pet("Polly", "Parrot")

# Teach them tricks
buddy.learn_trick("sit")        # Buddy learned sit!
buddy.learn_trick("shake")      # Buddy learned shake!
buddy.learn_trick("roll over")  # Buddy learned roll over!
buddy.learn_trick("sit")        # Buddy already knows sit!

mittens.learn_trick("jump")     # Mittens learned jump!

# Check them out
print(buddy.describe())         # Buddy the Dog (3 tricks)
print(mittens.describe())       # Mittens the Cat (1 tricks)
print(polly.describe())         # Polly the Parrot (0 tricks)

print(buddy.show_tricks())      # Buddy knows: sit, shake, roll over
print(polly.show_tricks())      # Polly hasn't learned any tricks yet.

# Class variable tracks total
print(f"Total pets created: {Pet.total_pets}")  # Total pets created: 3
```

This example uses everything: `__init__` for setup, `self` for each pet's data, instance variables (`name`, `tricks`), a class variable (`total_pets`), methods (`learn_trick`, `show_tricks`), and a `@property` (`num_tricks`).

---

## Where Beginners Get Tripped Up

### Forgetting `self` or `self.`

```python
# WRONG -- missing self parameter
class Dog:
    def __init__(name: str) -> None:
        name = name  # Does nothing useful!

# ALSO WRONG -- has self, but forgot self. on the variable
class Dog:
    def __init__(self, name: str) -> None:
        name = name  # Assigns the parameter to itself!

# RIGHT
class Dog:
    def __init__(self, name: str) -> None:
        self.name = name  # THIS stores it on the object
```

### Forgetting parentheses when creating an object

```python
# WRONG -- this gives you the class itself, not an object
my_dog = Dog
print(type(my_dog))  # <class 'type'> -- oops!

# RIGHT -- parentheses create an object
my_dog = Dog("Buddy", 4)
print(type(my_dog))  # <class '__main__.Dog'> -- correct!
```

---

## Summary

- A **class** is a blueprint for making things. An **object** is a real thing built from that blueprint.
- **`__init__`** is the setup method that runs when you create a new object.
- **`self`** means "this particular object" -- it is how the object refers to its own data.
- **Instance variables** (`self.name`) belong to one specific object. Each object gets its own.
- **Class variables** are shared by all objects of that class.
- **Methods** are functions that live inside a class and work with the object's data.
- **`@property`** makes a method that looks and feels like a variable.
- You can create as many objects as you want from a single class.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, proudly showing off three toy pets -- a dog, a cat, and a parrot -- each with little name tags. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practice Questions

**Question 1:** What is the difference between a class and an object? Use the cookie cutter analogy to explain.

**Question 2:** What does `__init__` do, and when does it run? Do you ever call it yourself?

**Question 3:** Look at this code. What will it print?

```python
class Cat:
    def __init__(self, name: str) -> None:
        self.name: str = name
        self.lives: int = 9

    def lose_life(self) -> None:
        self.lives -= 1

whiskers: Cat = Cat("Whiskers")
shadow: Cat = Cat("Shadow")
whiskers.lose_life()
whiskers.lose_life()

print(whiskers.lives)
print(shadow.lives)
```

**Question 4:** What is wrong with this class? Fix it.

```python
class Book:
    def __init__(self, title: str) -> None:
        title = title

    def show(self) -> str:
        return self.title
```

**Question 5:** Create a class called `ScoreTracker` that keeps track of game scores. It should:
- Start with an empty list of scores
- Have a method `add_score(score: int)` that adds a score to the list
- Have a `@property` called `best_score` that returns the highest score (or 0 if no scores yet)
- Have a `@property` called `average` that returns the average score (or 0.0 if no scores yet)
- Use type hints everywhere

**Question 6:** What is the difference between a class variable and an instance variable? Write a class called `Student` that has a class variable `school` set to `"Python Academy"` and instance variables for `name` and `grade`. Show that changing one student's name does not change another student's name, but all students share the same school.

**Question 7:** Write a complete `TreasureChest` class that has:
- Instance variables for `owner` (str) and `items` (list of str)
- A method `add_item(item: str)` that adds an item
- A method `remove_item(item: str)` that removes an item if it exists (and prints a message if it does not)
- A `@property` called `num_items` that returns how many items are in the chest
- A `describe()` method that returns a nicely formatted string

Create two treasure chests, add items to both, remove one item, and print descriptions.

---

## Answers to Practice Questions

**Answer 1:** A class is a blueprint or template -- like a cookie cutter. An object is a real thing made from that blueprint -- like a cookie. The cookie cutter (class) describes the shape, but it is not a cookie itself. You use it to stamp out many cookies (objects). Each cookie has the same shape but can have different decorations (different data).

**Answer 2:** `__init__` is the setup method. It runs **automatically** every time you create a new object. You never call it yourself -- Python calls it for you. When you write `Dog("Buddy", 4)`, Python creates a new empty Dog and then calls `__init__` on it, passing in `"Buddy"` and `4`. Its job is to set up the starting data for the new object.

**Answer 3:** It prints:

```
7
9
```

`whiskers.lose_life()` is called twice, so `whiskers.lives` goes from 9 to 8 to 7. But `shadow` is a completely separate object. Its `lives` was never changed, so it is still 9.

**Answer 4:** The problem is the line `title = title`. This assigns the parameter to itself and does nothing. It should be `self.title = title`. Without `self.`, the data is not stored on the object, so `self.title` in the `show` method would cause an error.

```python
class Book:
    def __init__(self, title: str) -> None:
        self.title: str = title  # Fixed: added self.

    def show(self) -> str:
        return self.title
```

**Answer 5:**

```python
class ScoreTracker:
    def __init__(self) -> None:
        self.scores: list[int] = []

    def add_score(self, score: int) -> None:
        self.scores.append(score)

    @property
    def best_score(self) -> int:
        if not self.scores:
            return 0
        return max(self.scores)

    @property
    def average(self) -> float:
        if not self.scores:
            return 0.0
        return sum(self.scores) / len(self.scores)

tracker: ScoreTracker = ScoreTracker()
tracker.add_score(85)
tracker.add_score(92)
tracker.add_score(78)
print(tracker.best_score)  # 92
print(tracker.average)     # 85.0
```

**Answer 6:** A class variable is shared by ALL objects of that class. An instance variable belongs to one specific object.

```python
class Student:
    school: str = "Python Academy"  # Class variable -- shared

    def __init__(self, name: str, grade: int) -> None:
        self.name: str = name    # Instance variable -- unique
        self.grade: int = grade  # Instance variable -- unique

alice: Student = Student("Alice", 5)
bob: Student = Student("Bob", 6)

# Instance variables are separate
print(alice.name)  # Alice
print(bob.name)    # Bob

alice.name = "Alicia"
print(alice.name)  # Alicia
print(bob.name)    # Bob -- unchanged!

# Class variable is shared
print(alice.school)  # Python Academy
print(bob.school)    # Python Academy
```

**Answer 7:**

```python
class TreasureChest:
    def __init__(self, owner: str) -> None:
        self.owner: str = owner
        self.items: list[str] = []

    def add_item(self, item: str) -> None:
        self.items.append(item)

    def remove_item(self, item: str) -> None:
        if item in self.items:
            self.items.remove(item)
        else:
            print(f"{item} is not in {self.owner}'s chest!")

    @property
    def num_items(self) -> int:
        return len(self.items)

    def describe(self) -> str:
        if not self.items:
            return f"{self.owner}'s chest is empty."
        item_list: str = ", ".join(self.items)
        return f"{self.owner}'s chest ({self.num_items} items): {item_list}"

chest1: TreasureChest = TreasureChest("Captain Byte")
chest2: TreasureChest = TreasureChest("Pirate Pixel")

chest1.add_item("gold coins")
chest1.add_item("ruby")
chest1.add_item("map")

chest2.add_item("silver sword")
chest2.add_item("emerald")

chest1.remove_item("ruby")
chest1.remove_item("diamond")  # diamond is not in Captain Byte's chest!

print(chest1.describe())  # Captain Byte's chest (2 items): gold coins, map
print(chest2.describe())  # Pirate Pixel's chest (2 items): silver sword, emerald
```

---

**Previous:** [[wiki:python-jr-modules]] | **Next:** [[wiki:python-jr-encapsulation]]
