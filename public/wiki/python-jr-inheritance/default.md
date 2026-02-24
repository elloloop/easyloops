# Inheritance -- Sharing Code Between Related Classes

## The Problem: Writing the Same Code Over and Over

Imagine you are building a program with different kinds of animals -- dogs, cats, and parrots. They all have a name. They all have a method called `describe()`. They all can `eat()`. But each one makes a different sound.

You could write three completely separate classes:

```python
class Dog:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def describe(self) -> str:
        return f"{self.name} the Dog"

    def eat(self) -> str:
        return f"{self.name} is eating."

    def speak(self) -> str:
        return f"{self.name} says Woof!"

class Cat:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def describe(self) -> str:
        return f"{self.name} the Cat"

    def eat(self) -> str:
        return f"{self.name} is eating."

    def speak(self) -> str:
        return f"{self.name} says Meow!"
```

See the problem? The `__init__` is the same. The `eat` method is the same. You copied and pasted most of the code. Now if you find a bug in `eat`, you have to fix it in every single class. What if you have ten animal types? Twenty?

There has to be a better way. And there is -- it is called **inheritance**.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing between a toy dog and a toy cat. Above them is a shared label connecting them both to a larger toy animal figure. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is Inheritance?

Inheritance means a **child class gets everything from a parent class**, plus can add its own stuff.

Think of it like a family recipe book. Your family has a basic cookie recipe that everyone uses (the parent). But you add chocolate chips to yours, your sibling adds sprinkles to theirs. You both *inherited* the base recipe, but each of you added your own twist.

Or think about it this way: dogs and cats are different, but they are both pets. Instead of writing all the "pet stuff" twice, you write it once in a `Pet` class, and let `Dog` and `Cat` inherit it.

- The class that shares its code is called the **parent class** (also called the base class).
- The class that receives the code is called the **child class** (also called the subclass).

A child class gets **everything** the parent has -- all its methods and all its variables. Then the child can add new things or change things it inherited.

---

## Basic Syntax

Here is how you write it. The child class puts the parent class name in parentheses:

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def eat(self) -> str:
        return f"{self.name} is eating."

    def speak(self) -> str:
        return "..."

class Dog(Animal):       # Dog inherits from Animal
    def speak(self) -> str:
        return f"{self.name} says Woof!"

class Cat(Animal):       # Cat inherits from Animal
    def speak(self) -> str:
        return f"{self.name} says Meow!"
```

Open your editor. Type this. Run it.

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def eat(self) -> str:
        return f"{self.name} is eating."

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name} says Meow!"

rex: Dog = Dog("Rex")
whiskers: Cat = Cat("Whiskers")

print(rex.speak())      # Rex says Woof!
print(whiskers.speak())  # Whiskers says Meow!
print(rex.eat())         # Rex is eating.
print(whiskers.eat())    # Whiskers is eating.
print(rex.name)          # Rex
```

Notice something important: `Dog` and `Cat` never define `__init__` or `eat`. They get those from `Animal` automatically. That is inheritance -- the child gets everything the parent has, for free.

The only thing they changed was `speak`. Each animal has its own version.

---

## `super()` -- Calling the Parent's Version

Sometimes the child class wants to do **everything the parent does, PLUS something extra**. That is what `super()` is for. It lets the child call the parent's version of a method.

Think of it like this: "I will do what my parent does, PLUS this extra thing on top."

```python
class Animal:
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species

class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name, "Dog")  # Call Animal's __init__
        self.breed: str = breed        # Add something extra

    def describe(self) -> str:
        return f"{self.name} is a {self.breed} ({self.species})"
```

Open your editor. Type this. Run it.

```python
class Animal:
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species

    def describe(self) -> str:
        return f"{self.name} the {self.species}"

class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name, "Dog")
        self.breed: str = breed

    def describe(self) -> str:
        parent_description: str = super().describe()
        return f"{parent_description} (Breed: {self.breed})"

class Cat(Animal):
    def __init__(self, name: str, indoor: bool) -> None:
        super().__init__(name, "Cat")
        self.indoor: bool = indoor

    def describe(self) -> str:
        parent_description: str = super().describe()
        location: str = "indoor" if self.indoor else "outdoor"
        return f"{parent_description} ({location})"

rex: Dog = Dog("Rex", "Labrador")
mittens: Cat = Cat("Mittens", True)

print(rex.describe())      # Rex the Dog (Breed: Labrador)
print(mittens.describe())  # Mittens the Cat (indoor)
```

`super().__init__(name, "Dog")` says: "Run the parent's `__init__` first, so `self.name` and `self.species` get set up. Then I will add my own stuff (`self.breed`)."

Without `super()`, the parent's setup would never run, and `self.name` and `self.species` would not exist.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, looking at a family tree diagram on a whiteboard with a general "Animal" at the top branching down to "Dog" and "Cat" below, each with their own special features listed. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Method Overriding -- Doing Things Differently

When a child class creates a method with the **same name** as the parent's method, the child's version **replaces** the parent's version. This is called **overriding**.

You already saw this with `speak()` above. The parent `Animal` has `speak()` that returns `"..."`. The child `Dog` overrides it to return `"Woof!"`.

```python
class Shape:
    def area(self) -> float:
        return 0.0

    def describe(self) -> str:
        return f"This shape has an area of {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def area(self) -> float:      # Overrides Shape's area
        return 3.14159 * self.radius ** 2

class Square(Shape):
    def __init__(self, side: float) -> None:
        self.side: float = side

    def area(self) -> float:      # Overrides Shape's area
        return self.side ** 2
```

Open your editor. Type this. Run it.

```python
class Shape:
    def area(self) -> float:
        return 0.0

    def describe(self) -> str:
        return f"This shape has an area of {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

class Square(Shape):
    def __init__(self, side: float) -> None:
        self.side: float = side

    def area(self) -> float:
        return self.side ** 2

c: Circle = Circle(5.0)
s: Square = Square(4.0)

print(c.describe())  # This shape has an area of 78.54
print(s.describe())  # This shape has an area of 16.00
```

Notice something cool: `describe()` is defined in `Shape`, and it calls `self.area()`. When a `Circle` calls `describe()`, `self.area()` runs the **Circle's** version. When a `Square` calls it, `self.area()` runs the **Square's** version. The parent method automatically uses the child's override!

---

## `isinstance()` -- Checking What Type Something Is

`isinstance()` lets you check whether an object was made from a particular class. It also checks parent classes!

```python
class Animal:
    pass

class Dog(Animal):
    pass

rex: Dog = Dog()

print(isinstance(rex, Dog))     # True -- rex IS a Dog
print(isinstance(rex, Animal))  # True -- rex IS ALSO an Animal
print(isinstance(rex, str))     # False -- rex is NOT a string
```

Why does `isinstance(rex, Animal)` return `True`? Because `Dog` inherits from `Animal`. A dog IS an animal. So any Dog object is also an Animal object.

This is useful when you have a mix of different types and need to check which one you are dealing with:

```python
class Cat(Animal):
    pass

pets: list[Animal] = [Dog(), Cat(), Dog(), Cat()]

dog_count: int = 0
for pet in pets:
    if isinstance(pet, Dog):
        dog_count += 1

print(f"There are {dog_count} dogs.")  # There are 2 dogs.
```

---

## What Is Polymorphism?

Polymorphism is a big word, but the idea is simple: **different types that can be used the same way**.

Think of a TV remote. It works the same way whether your TV is a Samsung or an LG. You press the power button and the TV turns on. The button is the same for you, but internally each TV brand does things differently.

In code, polymorphism means you can write a function that works with a parent type, and it automatically works with ALL child types:

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name}: Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name}: Meow!"

class Parrot(Animal):
    def speak(self) -> str:
        return f"{self.name}: Squawk!"

def make_all_speak(animals: list[Animal]) -> None:
    for animal in animals:
        print(animal.speak())
```

Open your editor. Type this. Run it.

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name}: Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name}: Meow!"

class Parrot(Animal):
    def speak(self) -> str:
        return f"{self.name}: Squawk!"

def make_all_speak(animals: list[Animal]) -> None:
    for animal in animals:
        print(animal.speak())

pets: list[Animal] = [
    Dog("Rex"),
    Cat("Whiskers"),
    Parrot("Polly"),
    Dog("Buddy"),
]

make_all_speak(pets)
# Rex: Woof!
# Whiskers: Meow!
# Polly: Squawk!
# Buddy: Woof!
```

The `make_all_speak` function does not know or care what specific type of animal each object is. It just calls `.speak()`, and each animal responds in its own way. That is polymorphism -- same interface, different behavior.

The best part: you can add a new animal type later (like `Snake`) without changing `make_all_speak` at all. The function keeps working because all animals share the same `speak()` method.

---

## Inheritance vs Composition -- IS-A vs HAS-A

There are two ways to build classes from other classes. Knowing when to use which one is an important skill.

**Inheritance** (IS-A): "A dog IS A animal." Use inheritance when the child truly is a type of the parent.

**Composition** (HAS-A): "A car HAS A engine." Use composition when one thing contains or uses another thing.

```python
# Inheritance -- IS-A
class Animal:
    def __init__(self, name: str) -> None:
        self.name: str = name

class Dog(Animal):     # A Dog IS AN Animal
    pass

# Composition -- HAS-A
class Engine:
    def __init__(self, horsepower: int) -> None:
        self.horsepower: int = horsepower

    def start(self) -> str:
        return f"Engine ({self.horsepower}hp) started!"

class Car:
    def __init__(self, make: str, engine: Engine) -> None:
        self.make: str = make
        self.engine: Engine = engine  # A Car HAS AN Engine

    def start(self) -> str:
        return f"{self.make}: {self.engine.start()}"
```

Open your editor. Type this. Run it.

```python
class Engine:
    def __init__(self, horsepower: int) -> None:
        self.horsepower: int = horsepower

    def start(self) -> str:
        return f"Engine ({self.horsepower}hp) started!"

class Car:
    def __init__(self, make: str, engine: Engine) -> None:
        self.make: str = make
        self.engine: Engine = engine

    def start(self) -> str:
        return f"{self.make}: {self.engine.start()}"

my_engine: Engine = Engine(200)
my_car: Car = Car("Toyota", my_engine)
print(my_car.start())  # Toyota: Engine (200hp) started!
```

**How to decide:** Ask yourself:
- "Is a [child] a type of [parent]?" -- Use inheritance. A dog IS an animal.
- "Does a [thing] have a [part]?" -- Use composition. A car HAS an engine.

A car is NOT an engine. That would be weird! So do not write `class Car(Engine)`. Instead, give the car an engine as an attribute.

**When you are not sure, prefer composition.** It is more flexible and easier to change later.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, comparing two diagrams on a whiteboard: one showing a family tree arrow labeled "is a" and another showing a box containing a smaller box labeled "has a." Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Abstract Base Classes -- "You MUST Fill In These Parts"

Sometimes you want to create a parent class that says: "Every child MUST have these methods." You do not want anyone to forget to write them.

An **abstract base class** (ABC) is a blueprint that *requires* child classes to fill in certain methods. If a child forgets, Python gives an error.

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

    def describe(self) -> str:
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius: float = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, width: float, height: float) -> None:
        self.width: float = width
        self.height: float = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# shape = Shape()  # TypeError! You cannot create an abstract class directly.

c: Circle = Circle(5.0)
r: Rectangle = Rectangle(4.0, 6.0)

print(c.describe())  # Area: 78.54, Perimeter: 31.42
print(r.describe())  # Area: 24.00, Perimeter: 20.00
```

The `@abstractmethod` decorator marks a method as "you MUST write your own version." The `ABC` in `Shape(ABC)` tells Python this is an abstract class.

Two important things:

1. You **cannot** create a `Shape()` directly. It is abstract -- only meant to be inherited from.
2. If a child class **forgets** to define `area()` or `perimeter()`, Python gives a `TypeError`. It is like a checklist that makes sure every child fills in all required pieces.

---

## Practical Example: Animal Hierarchy with `speak()`

Let us put everything together and build something complete.

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species
        self._energy: int = 100

    @abstractmethod
    def speak(self) -> str:
        pass

    def eat(self, food: str) -> str:
        self._energy = min(100, self._energy + 20)
        return f"{self.name} eats {food}. Energy: {self._energy}"

    def play(self) -> str:
        self._energy = max(0, self._energy - 30)
        return f"{self.name} plays! Energy: {self._energy}"

    @property
    def energy(self) -> int:
        return self._energy

    def describe(self) -> str:
        return f"{self.name} the {self.species} (Energy: {self._energy})"


class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name, "Dog")
        self.breed: str = breed
        self.tricks: list[str] = []

    def speak(self) -> str:
        return f"{self.name} says: Woof! Woof!"

    def learn_trick(self, trick: str) -> str:
        self.tricks.append(trick)
        return f"{self.name} learned {trick}!"

    def describe(self) -> str:
        base: str = super().describe()
        trick_count: int = len(self.tricks)
        return f"{base} - {self.breed}, {trick_count} tricks"


class Cat(Animal):
    def __init__(self, name: str, indoor: bool = True) -> None:
        super().__init__(name, "Cat")
        self.indoor: bool = indoor

    def speak(self) -> str:
        return f"{self.name} says: Meow!"

    def purr(self) -> str:
        return f"{self.name} purrs softly..."

    def describe(self) -> str:
        base: str = super().describe()
        location: str = "indoor" if self.indoor else "outdoor"
        return f"{base} - {location} cat"


class Parrot(Animal):
    def __init__(self, name: str, color: str) -> None:
        super().__init__(name, "Parrot")
        self.color: str = color
        self._words: list[str] = []

    def speak(self) -> str:
        if self._words:
            return f"{self.name} says: {self._words[-1]}!"
        return f"{self.name} says: Squawk!"

    def teach_word(self, word: str) -> str:
        self._words.append(word)
        return f"{self.name} learned to say '{word}'!"

    def describe(self) -> str:
        base: str = super().describe()
        return f"{base} - {self.color}, knows {len(self._words)} words"


# Create our animals
rex: Dog = Dog("Rex", "Golden Retriever")
mittens: Cat = Cat("Mittens", True)
polly: Parrot = Parrot("Polly", "green")

# Teach them things
print(rex.learn_trick("sit"))           # Rex learned sit!
print(rex.learn_trick("shake"))         # Rex learned shake!
print(polly.teach_word("hello"))        # Polly learned to say 'hello'!
print(polly.teach_word("good morning")) # Polly learned to say 'good morning'!

# Everyone speaks
pets: list[Animal] = [rex, mittens, polly]
print()
for pet in pets:
    print(pet.speak())
# Rex says: Woof! Woof!
# Mittens says: Meow!
# Polly says: good morning!

# Play and eat
print()
print(rex.play())               # Rex plays! Energy: 70
print(rex.play())               # Rex plays! Energy: 40
print(rex.eat("dog biscuit"))   # Rex eats dog biscuit. Energy: 60

# Describe everyone
print()
for pet in pets:
    print(pet.describe())
# Rex the Dog (Energy: 60) - Golden Retriever, 2 tricks
# Mittens the Cat (Energy: 100) - indoor cat
# Polly the Parrot (Energy: 100) - green, knows 2 words

# isinstance checks
print()
print(isinstance(rex, Dog))     # True
print(isinstance(rex, Animal))  # True -- a Dog IS an Animal
print(isinstance(mittens, Dog)) # False -- a Cat is NOT a Dog
```

This example shows everything working together:

- **Inheritance:** `Dog`, `Cat`, and `Parrot` all inherit from `Animal`.
- **`super()`:** Each child calls `super().__init__()` to set up the shared data.
- **Method overriding:** Each child has its own version of `speak()` and `describe()`.
- **Polymorphism:** The loop `for pet in pets` works with all animal types using the same interface.
- **Abstract class:** `Animal` is abstract, so you cannot create a plain `Animal()`.
- **Encapsulation:** Energy is protected with `_energy` and exposed as a read-only property.
- **Composition ideas:** Dogs have a tricks list, parrots have a words list -- these are "has-a" relationships within the inheritance structure.

---

## Where Beginners Get Tripped Up

### Forgetting `super().__init__()`

```python
# WRONG -- parent's setup never runs
class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        # Forgot to call super().__init__()!
        self.breed = breed

rex: Dog = Dog("Rex", "Lab")
# print(rex.name)  # Error! name was never set up
```

Always call `super().__init__()` when the parent has an `__init__` you need.

### Using Inheritance When Composition Is Better

```python
# WRONG -- a car is NOT an engine
class Engine:
    def start(self) -> str:
        return "Vroom"

class Car(Engine):  # This says "a car IS an engine" -- that is wrong!
    pass

# RIGHT -- a car HAS an engine
class Car:
    def __init__(self, engine: Engine) -> None:
        self.engine: Engine = engine  # HAS-A relationship
```

Ask yourself: "Is a [child] really a type of [parent]?" If not, use composition.

### Making the Inheritance Chain Too Deep

```python
# TOO DEEP -- this gets confusing fast
class LivingThing:
    pass
class Animal(LivingThing):
    pass
class Mammal(Animal):
    pass
class DomesticMammal(Mammal):
    pass
class Pet(DomesticMammal):
    pass
class Dog(Pet):
    pass
```

Keep it simple. One or two levels of inheritance is usually plenty.

---

## Summary

- **Inheritance** lets a child class reuse code from a parent class. Write shared code once, use it many times.
- **Syntax:** `class Dog(Animal):` means Dog inherits from Animal.
- **`super()`** calls the parent's version of a method. Use it in `__init__` to make sure the parent sets up its data.
- **Method overriding** lets a child replace the parent's behavior with its own version.
- **`isinstance()`** checks if an object is a particular type (including parent types).
- **Polymorphism** means different types that can be used the same way. Same method call, different behavior.
- **Inheritance vs composition:** Use "IS-A" (inheritance) when a child truly is a type of parent. Use "HAS-A" (composition) when one thing contains another. When in doubt, prefer composition.
- **Abstract base classes** force child classes to fill in required methods. Use `ABC` and `@abstractmethod`.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing next to a family of toy animals -- a parent animal figure at the top with arrows pointing down to a dog, a cat, and a parrot, each with unique accessories. Features a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practice Questions

**Question 1:** What is inheritance, and what problem does it solve? Use the analogy of dogs and cats both being pets to explain.

**Question 2:** What does `super()` do? What happens if you forget to call `super().__init__()` in a child class?

**Question 3:** Look at this code. What will it print?

```python
class Vehicle:
    def __init__(self, name: str) -> None:
        self.name: str = name

    def move(self) -> str:
        return f"{self.name} is moving."

class Boat(Vehicle):
    def move(self) -> str:
        return f"{self.name} is sailing on the water."

class Airplane(Vehicle):
    def move(self) -> str:
        return f"{self.name} is flying through the sky."

things: list[Vehicle] = [Vehicle("Bike"), Boat("Titanic"), Airplane("Boeing")]
for thing in things:
    print(thing.move())
```

**Question 4:** What is the difference between inheritance and composition? For each of these, say whether you should use inheritance (IS-A) or composition (HAS-A):
- A `Bicycle` and a `Motorcycle` sharing code
- A `Computer` that uses a `Keyboard`
- A `Square` being a type of `Shape`
- A `Library` that contains `Book` objects

**Question 5:** Create a parent class `Instrument` with a `name` attribute and an abstract method `play()` that returns a string. Then create two child classes: `Guitar` (play returns "strumming") and `Drum` (play returns "banging"). Write a function `concert(instruments: list[Instrument])` that calls `play()` on each one. This should use `ABC` and `@abstractmethod`.

**Question 6:** What is polymorphism? Explain using the TV remote analogy, and then show how the code in Question 5 demonstrates polymorphism.

**Question 7:** Build a complete mini-system:
- A parent class `GameCharacter` with `name` (str), `_hp` (int), and `_attack_power` (int). Add methods `take_damage(amount: int)`, a `@property` for `is_alive`, and `describe()`.
- A child class `Warrior` that adds `_armor` (int). When a warrior takes damage, the armor reduces it (damage - armor, minimum 0).
- A child class `Wizard` that adds `_mana` (int) and a method `cast_spell()` that costs 20 mana and does double attack power damage.
- Use `super()`, method overriding, type hints, and encapsulation.

Create a warrior and a wizard and have them interact.

---

## Answers to Practice Questions

**Answer 1:** Inheritance lets a child class get all the code from a parent class for free, then add or change things. It solves the problem of writing the same code over and over. For example, dogs and cats are different, but they are both pets. Without inheritance, you would write the same `name`, `eat()`, and `describe()` code in both the Dog class and the Cat class. With inheritance, you write the shared "pet stuff" once in a Pet class, and let Dog and Cat inherit it. Then each one only needs to add its own unique things (like `bark()` for Dog or `purr()` for Cat).

**Answer 2:** `super()` calls the parent's version of a method. It is most commonly used in `__init__` to run the parent's setup code before adding the child's own data. If you forget to call `super().__init__()`, the parent's setup never runs. That means any variables the parent creates (like `self.name`) will not exist, and you will get an `AttributeError` when you try to use them.

**Answer 3:** It prints:

```
Bike is moving.
Titanic is sailing on the water.
Boeing is flying through the sky.
```

`Vehicle` uses the default `move()`. `Boat` overrides `move()` to say "sailing on the water." `Airplane` overrides `move()` to say "flying through the sky." This is polymorphism -- the same `thing.move()` call produces different results depending on the type.

**Answer 4:**
- `Bicycle` and `Motorcycle` -- **Inheritance (IS-A).** Both are types of vehicles. They share a lot of code.
- `Computer` and `Keyboard` -- **Composition (HAS-A).** A computer HAS a keyboard. A computer is NOT a keyboard.
- `Square` and `Shape` -- **Inheritance (IS-A).** A square IS a shape.
- `Library` and `Book` -- **Composition (HAS-A).** A library HAS books. A library is NOT a book.

**Answer 5:**

```python
from abc import ABC, abstractmethod

class Instrument(ABC):
    def __init__(self, name: str) -> None:
        self.name: str = name

    @abstractmethod
    def play(self) -> str:
        pass

class Guitar(Instrument):
    def play(self) -> str:
        return f"{self.name}: *strumming*"

class Drum(Instrument):
    def play(self) -> str:
        return f"{self.name}: *banging*"

def concert(instruments: list[Instrument]) -> None:
    for instrument in instruments:
        print(instrument.play())

band: list[Instrument] = [
    Guitar("Acoustic Guitar"),
    Drum("Snare Drum"),
    Guitar("Electric Guitar"),
]
concert(band)
# Acoustic Guitar: *strumming*
# Snare Drum: *banging*
# Electric Guitar: *strumming*
```

**Answer 6:** Polymorphism means "different types that can be used the same way." The TV remote analogy: a TV remote works the same way no matter what brand your TV is. You press the power button, and the TV turns on. The button is the same, but internally Samsung and LG handle it differently. In the code from Question 5, the `concert()` function is like the remote. It just calls `play()` on each instrument. It does not care whether the instrument is a Guitar or a Drum. Each instrument responds in its own way -- guitars strum and drums bang. Same method call, different behavior. That is polymorphism.

**Answer 7:**

```python
class GameCharacter:
    def __init__(self, name: str, hp: int, attack_power: int) -> None:
        self.name: str = name
        self._hp: int = hp
        self._attack_power: int = attack_power

    def take_damage(self, amount: int) -> str:
        self._hp = max(0, self._hp - amount)
        if self.is_alive:
            return f"{self.name} takes {amount} damage! HP: {self._hp}"
        return f"{self.name} takes {amount} damage and is defeated!"

    @property
    def is_alive(self) -> bool:
        return self._hp > 0

    @property
    def hp(self) -> int:
        return self._hp

    def describe(self) -> str:
        status: str = "alive" if self.is_alive else "defeated"
        return f"{self.name} - HP: {self._hp}, ATK: {self._attack_power} ({status})"


class Warrior(GameCharacter):
    def __init__(self, name: str, hp: int, attack_power: int, armor: int) -> None:
        super().__init__(name, hp, attack_power)
        self._armor: int = armor

    def take_damage(self, amount: int) -> str:
        reduced: int = max(0, amount - self._armor)
        blocked: int = amount - reduced
        result: str = super().take_damage(reduced)
        return f"{result} (Armor blocked {blocked})"

    def describe(self) -> str:
        base: str = super().describe()
        return f"{base} [Warrior, Armor: {self._armor}]"


class Wizard(GameCharacter):
    def __init__(self, name: str, hp: int, attack_power: int, mana: int) -> None:
        super().__init__(name, hp, attack_power)
        self._mana: int = mana

    def cast_spell(self) -> str:
        if self._mana < 20:
            return f"{self.name} does not have enough mana to cast a spell!"
        self._mana -= 20
        damage: int = self._attack_power * 2
        return f"{self.name} casts a spell for {damage} damage! Mana: {self._mana}"

    @property
    def mana(self) -> int:
        return self._mana

    def describe(self) -> str:
        base: str = super().describe()
        return f"{base} [Wizard, Mana: {self._mana}]"


# Create characters
knight: Warrior = Warrior("Sir Steel", 120, 15, 8)
mage: Wizard = Wizard("Mystara", 80, 25, 60)

print(knight.describe())
# Sir Steel - HP: 120, ATK: 15 (alive) [Warrior, Armor: 8]
print(mage.describe())
# Mystara - HP: 80, ATK: 25 (alive) [Wizard, Mana: 60]

# Wizard casts spells
print(mage.cast_spell())  # Mystara casts a spell for 50 damage! Mana: 40

# Warrior takes damage (armor helps)
print(knight.take_damage(20))
# Sir Steel takes 12 damage! HP: 108 (Armor blocked 8)

# Wizard takes damage (no armor)
print(mage.take_damage(20))
# Mystara takes 20 damage! HP: 60

print()
print(knight.describe())
print(mage.describe())
```

---

**Previous:** [[wiki:python-jr-encapsulation]] | **Next:** [[wiki:python-jr-special-methods]]
