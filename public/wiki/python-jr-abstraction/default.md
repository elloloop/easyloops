# Abstraction -- Showing Only What Matters

## What Is Abstraction?

Have you ever used a TV remote? You pick it up, press the "volume up" button, and the TV gets louder. Simple, right?

But think about what is actually happening inside the TV. There are circuit boards, transistors, tiny electrical signals, wires, and all kinds of complicated electronics doing the work. You do not need to know about any of that. You just press the button and it works.

That is **abstraction**. Abstraction means **hiding the complicated parts and showing only the simple stuff that matters**.

![A flat vector illustration in a children's educational book style showing a small friendly blue robot named Byte pressing a big red button on a TV remote while a TV screen lights up in the background. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

Here is another example. Think about a vending machine. You walk up to it, put in some money, press a button, and out comes a snack. You do not need to know about the gears, motors, and conveyor belts inside. The vending machine **abstracts** all that away and gives you a simple way to interact with it: money in, button press, snack out.

Programming uses the same idea. When you write `len("hello")`, you get `5`. You do not need to know how Python counts the letters. Someone hid all the complicated counting logic and gave you a simple tool to use: just call `len()`.

---

## Abstraction vs Encapsulation

You already learned about encapsulation in [[wiki:python-jr-encapsulation]]. Abstraction sounds similar, so let's make sure you understand the difference.

**Encapsulation** is about **keeping data safe**. It answers: "How do I stop someone from accidentally breaking my object's insides?"

**Abstraction** is about **hiding complexity**. It answers: "How do I make something easy to use without the user needing to understand how it works inside?"

Think of it this way:

- **Encapsulation** is the lock on a diary. It keeps people from reading your private pages.
- **Abstraction** is the table of contents. It lets people find what they need without reading every single page.

They work together, but they solve different problems.

```python
class VendingMachine:
    def __init__(self) -> None:
        self._money_inserted: float = 0.0     # Encapsulation: private data
        self._snacks: dict[str, int] = {       # Encapsulation: private data
            "chips": 5,
            "candy": 3,
            "water": 7,
        }

    def insert_money(self, amount: float) -> None:   # Abstraction: simple interface
        self._money_inserted += amount

    def buy_snack(self, snack_name: str) -> str:      # Abstraction: simple interface
        if snack_name not in self._snacks:
            return "That snack is not available."
        if self._snacks[snack_name] <= 0:
            return "Sorry, that snack is sold out."
        if self._money_inserted < 1.00:
            return "Please insert more money."
        self._snacks[snack_name] -= 1
        self._money_inserted -= 1.00
        return f"Here is your {snack_name}!"

machine: VendingMachine = VendingMachine()
machine.insert_money(2.00)
print(machine.buy_snack("chips"))  # Here is your chips!
```

The person using the vending machine just calls `insert_money()` and `buy_snack()`. They do not touch `_money_inserted` or `_snacks` directly. That is encapsulation AND abstraction working together.

---

## Abstract Base Classes -- The Template Idea

Now here is where things get really interesting.

Imagine you are designing vehicles. You know that every vehicle in the world must be able to do two things: **start** and **stop**. Cars do it one way, bicycles do it a completely different way, and boats do it yet another way. But they ALL must be able to start and stop.

An **Abstract Base Class** (ABC for short) is like a template that says: "Every version of this thing MUST have these abilities." It does not say HOW to do them -- it just says you MUST have them.

![A flat vector illustration in a children's educational book style showing Byte the robot looking at a big blueprint pinned to a wall, with outlines of a car, bicycle, and boat on it, each with a checkmark next to the words start and stop. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

In Python, you make an Abstract Base Class by importing from the `abc` module:

```python
from abc import ABC, abstractmethod
```

Here is what those two things mean:

- **ABC** -- You put this in the parentheses of your class to say "this class is a template, not a real thing you can create."
- **@abstractmethod** -- You put this above a method to say "every child class MUST fill this in."

Let's see it in action:

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self) -> str:
        pass

    @abstractmethod
    def stop(self) -> str:
        pass
```

This `Vehicle` class is a template. It says every vehicle must have `start()` and `stop()`, but it does not say how they work. The `pass` means "nothing here yet -- the children will fill this in."

---

## Abstract Methods -- The Child MUST Fill Them In

An abstract method is a method that the parent class declares but **does not fill in**. The child class **must** provide its own version. If the child forgets, Python will refuse to create that object.

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self) -> str:
        pass

    @abstractmethod
    def stop(self) -> str:
        pass

class Car(Vehicle):
    def start(self) -> str:
        return "Turn the key, engine roars to life!"

    def stop(self) -> str:
        return "Press the brake, turn off the engine."

class Bicycle(Vehicle):
    def start(self) -> str:
        return "Push off the ground and start pedaling!"

    def stop(self) -> str:
        return "Squeeze the brakes and put your foot down."

my_car: Car = Car()
my_bike: Bicycle = Bicycle()

print(my_car.start())   # Turn the key, engine roars to life!
print(my_car.stop())    # Press the brake, turn off the engine.
print(my_bike.start())  # Push off the ground and start pedaling!
print(my_bike.stop())   # Squeeze the brakes and put your foot down.
```

Now watch what happens if you try to create a `Vehicle` directly:

```python
# This will cause an error!
# v: Vehicle = Vehicle()
# TypeError: Can't instantiate abstract class Vehicle
```

Python says: "No way! Vehicle is just a template. You cannot create a plain Vehicle. You have to create a specific kind of vehicle like Car or Bicycle."

And watch what happens if a child forgets to fill in an abstract method:

```python
class Skateboard(Vehicle):
    def start(self) -> str:
        return "Push off and roll!"
    # Oops -- forgot to write stop()!

# This will cause an error!
# my_board: Skateboard = Skateboard()
# TypeError: Can't instantiate abstract class Skateboard
```

Python catches the mistake immediately. That is one of the best things about abstract classes -- they make sure nobody forgets to fill in the required parts.

---

## Mixing Abstract and Regular Methods

An abstract class can have a mix of abstract methods (that children must fill in) and regular methods (that all children share). The regular methods can even USE the abstract methods.

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, name: str) -> None:
        self.name: str = name

    @abstractmethod
    def start(self) -> str:
        pass

    @abstractmethod
    def stop(self) -> str:
        pass

    def test_drive(self) -> None:
        print(f"Testing the {self.name}...")
        print(self.start())
        print("Driving around!")
        print(self.stop())
        print("Test drive complete!")

class Car(Vehicle):
    def start(self) -> str:
        return "Vroom! Engine started."

    def stop(self) -> str:
        return "Engine off."

class Bicycle(Vehicle):
    def start(self) -> str:
        return "Pedaling away!"

    def stop(self) -> str:
        return "Brakes squeezed, stopped."

my_car: Car = Car("Family Car")
my_car.test_drive()
# Testing the Family Car...
# Vroom! Engine started.
# Driving around!
# Engine off.
# Test drive complete!
```

The `test_drive()` method is shared by ALL vehicles. It calls `start()` and `stop()`, which are abstract. Each child fills in those methods differently, but they all get `test_drive()` for free. That is really powerful.

---

## Practical Example: Shape Hierarchy

Here is one of the most classic examples. Every shape has an area and a perimeter, but each shape calculates them differently.

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

class Triangle(Shape):
    def __init__(self, side_a: float, side_b: float, side_c: float) -> None:
        self.side_a: float = side_a
        self.side_b: float = side_b
        self.side_c: float = side_c

    def area(self) -> float:
        s: float = (self.side_a + self.side_b + self.side_c) / 2
        return (s * (s - self.side_a) * (s - self.side_b) * (s - self.side_c)) ** 0.5

    def perimeter(self) -> float:
        return self.side_a + self.side_b + self.side_c


my_circle: Circle = Circle(5.0)
my_rectangle: Rectangle = Rectangle(4.0, 6.0)
my_triangle: Triangle = Triangle(3.0, 4.0, 5.0)

print(my_circle.describe())     # Area: 78.54, Perimeter: 31.42
print(my_rectangle.describe())  # Area: 24.00, Perimeter: 20.00
print(my_triangle.describe())   # Area: 6.00, Perimeter: 12.00
```

Notice how `describe()` is written once in `Shape` and works for every shape. Each shape just fills in its own `area()` and `perimeter()`.

The coolest part? You can write a function that works with ANY shape:

```python
def total_area(shapes: list[Shape]) -> float:
    total: float = 0.0
    for shape in shapes:
        total += shape.area()
    return total

all_shapes: list[Shape] = [
    Circle(5.0),
    Rectangle(4.0, 6.0),
    Triangle(3.0, 4.0, 5.0),
]
print(f"Total area: {total_area(all_shapes):.2f}")  # Total area: 108.54
```

If you add a new shape tomorrow (like a Pentagon), the `total_area` function will work with it without any changes. That is the power of abstraction.

---

## Protocols -- "If It Can Quack, It's a Duck"

There is another way to do abstraction in Python called **Protocols**. Instead of saying "you MUST inherit from this class," a Protocol says "anything that can do X counts as Y."

Think of it like this. Imagine you are looking for a duck. Instead of checking if something has a "duck membership card" (that would be like inheriting from a Duck class), you just check: "Can it quack? Can it waddle? Then it counts as a duck!"

This idea is called **duck typing**: if it walks like a duck and quacks like a duck, it is a duck.

![A flat vector illustration in a children's educational book style showing Byte the robot with a clipboard, looking at a line of animals -- a real duck, a toy duck, and a robot duck -- all quacking with speech bubbles. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

```python
from typing import Protocol

class CanSpeak(Protocol):
    def speak(self) -> str:
        ...

class Dog:
    def speak(self) -> str:
        return "Woof!"

class Cat:
    def speak(self) -> str:
        return "Meow!"

class RubberDuck:
    def speak(self) -> str:
        return "Squeak!"

def make_it_speak(thing: CanSpeak) -> None:
    print(thing.speak())

make_it_speak(Dog())         # Woof!
make_it_speak(Cat())         # Meow!
make_it_speak(RubberDuck())  # Squeak!
```

Notice that `Dog`, `Cat`, and `RubberDuck` do NOT inherit from `CanSpeak`. They do not even know it exists! But they all have a `speak()` method, so they all count.

**When to use which:**

- Use **ABC** when you want to say: "You MUST be part of this family and follow these rules."
- Use **Protocol** when you want to say: "I do not care who you are, as long as you can do this thing."

---

## When Should You Create Abstractions?

Here is an important rule: **only create an abstract class when you have more than one version of something**.

If you only have one kind of shape, you do not need a `Shape` abstract class. If you only have one kind of vehicle, you do not need a `Vehicle` abstract class. Abstraction is useful when you have **multiple versions** that share the same abilities but do them differently.

```python
# This is UNNECESSARY -- there is only one calculator
from abc import ABC, abstractmethod

class Calculator(ABC):
    @abstractmethod
    def add(self, a: float, b: float) -> float:
        pass

class BasicCalculator(Calculator):
    def add(self, a: float, b: float) -> float:
        return a + b

# Just do this instead:
class Calculator:
    def add(self, a: float, b: float) -> float:
        return a + b
```

Keep it simple. Only add abstraction when it actually helps.

---

## Putting It All Together

Let's build a music player system that can play from different sources.

Open your editor. Type this. Run it.

```python
from abc import ABC, abstractmethod

class MusicPlayer(ABC):
    @abstractmethod
    def play(self, song_name: str) -> str:
        pass

    @abstractmethod
    def pause(self) -> str:
        pass

    @abstractmethod
    def skip(self) -> str:
        pass

    def play_playlist(self, songs: list[str]) -> None:
        for song in songs:
            print(self.play(song))
        print("Playlist finished!")

class CDPlayer(MusicPlayer):
    def play(self, song_name: str) -> str:
        return f"[CD] Now playing: {song_name}"

    def pause(self) -> str:
        return "[CD] Paused the disc."

    def skip(self) -> str:
        return "[CD] Skipping to next track on disc."

class StreamingPlayer(MusicPlayer):
    def play(self, song_name: str) -> str:
        return f"[Streaming] Buffering... Now playing: {song_name}"

    def pause(self) -> str:
        return "[Streaming] Stream paused."

    def skip(self) -> str:
        return "[Streaming] Loading next song from the internet..."

my_songs: list[str] = ["Happy Song", "Dance Tune", "Sleepy Melody"]

cd: CDPlayer = CDPlayer()
cd.play_playlist(my_songs)

print()

streaming: StreamingPlayer = StreamingPlayer()
streaming.play_playlist(my_songs)
```

Each player works completely differently inside, but they all share the same `play_playlist()` method. That is abstraction at work.

---

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a desk with three music players in front of him -- a CD player, a laptop for streaming, and a vinyl record player -- all connected by a single set of headphones. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-04.png)

## Summary

Let's review what you learned:

- **Abstraction** means hiding complicated parts and showing only what matters. Like a TV remote or a vending machine.
- **Abstraction vs encapsulation**: Encapsulation keeps data safe. Abstraction hides complexity behind a simple interface. They work together.
- **Abstract Base Classes (ABCs)** are templates that say "every version of this MUST have these abilities." You create them with `from abc import ABC, abstractmethod`.
- **Abstract methods** are methods that the parent declares but does not fill in. The child MUST fill them in, or Python will refuse to create the object.
- **Protocols** are another way to do abstraction. They say "anything that can do X counts as Y" -- like saying anything that can quack is a duck.
- **When to create abstractions**: Only when you have multiple versions of something. Do not create an abstract class if there is only one version.

---

## Practice Questions

**Question 1:** What is abstraction? Explain it using your own example (not the TV remote or vending machine).

**Question 2:** What is the difference between abstraction and encapsulation? Give one example of each.

**Question 3:** What happens if you try to create an object directly from an abstract class? What happens if a child class forgets to fill in an abstract method?

**Question 4:** Look at this code. What is wrong with it?

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self) -> str:
        pass

    @abstractmethod
    def move(self) -> str:
        pass

class Fish(Animal):
    def speak(self) -> str:
        return "Blub blub!"
```

**Question 5:** Write an abstract class called `Appliance` with two abstract methods: `turn_on()` and `turn_off()`. Both should return a `str`. Then create two child classes: `Toaster` and `Fan`, each with their own versions of those methods. Add a regular method called `test()` that calls both `turn_on()` and `turn_off()` and prints the results.

**Question 6:** What is a Protocol? How is it different from an ABC? When would you use a Protocol instead of an ABC?

**Question 7:** Why should you NOT create an abstract class when you only have one version of something? What should you do instead?

**Question 8:** Write a Protocol called `CanFly` that requires a `fly()` method returning a `str`. Then write three classes -- `Eagle`, `Airplane`, and `Kite` -- that all have a `fly()` method but do NOT inherit from `CanFly`. Write a function that takes a `CanFly` and calls its `fly()` method.

---

## Answers to Practice Questions

**Answer 1:** Abstraction is hiding the complicated parts and showing only what matters. For example, when you use a microwave, you press some buttons and your food heats up. You do not need to understand how microwaves work, or how the turntable motor spins, or how the timer circuit works. The microwave abstracts all of that and gives you a simple interface: put food in, set time, press start. (Any reasonable analogy that shows hiding complexity counts.)

**Answer 2:** Encapsulation is about keeping data safe -- like how a bank account class uses `_balance` to prevent someone from setting the balance to a negative number directly. Abstraction is about hiding complexity -- like how calling `account.deposit(50)` is simple to use, but behind the scenes it might validate the amount, update the balance, log the transaction, and send a notification. Encapsulation protects data; abstraction simplifies how you interact with something.

**Answer 3:** If you try to create an object directly from an abstract class, Python raises a `TypeError` saying it cannot instantiate an abstract class. If a child class forgets to fill in an abstract method, you also get a `TypeError` when you try to create that child -- Python tells you which abstract methods are still missing.

**Answer 4:** `Fish` only fills in `speak()` but forgets to fill in `move()`. The `Animal` abstract class requires both `speak()` and `move()`, so trying to create a `Fish()` would cause a `TypeError`. The fix is to add a `move()` method to `Fish`:

```python
class Fish(Animal):
    def speak(self) -> str:
        return "Blub blub!"

    def move(self) -> str:
        return "Swim swim!"
```

**Answer 5:**

```python
from abc import ABC, abstractmethod

class Appliance(ABC):
    @abstractmethod
    def turn_on(self) -> str:
        pass

    @abstractmethod
    def turn_off(self) -> str:
        pass

    def test(self) -> None:
        print(self.turn_on())
        print(self.turn_off())

class Toaster(Appliance):
    def turn_on(self) -> str:
        return "Toaster glowing orange and heating up!"

    def turn_off(self) -> str:
        return "Toast pops up! Toaster cooling down."

class Fan(Appliance):
    def turn_on(self) -> str:
        return "Fan blades spinning, nice breeze!"

    def turn_off(self) -> str:
        return "Fan slowly stops spinning."

my_toaster: Toaster = Toaster()
my_toaster.test()

my_fan: Fan = Fan()
my_fan.test()
```

**Answer 6:** A Protocol says "anything that can do X counts as Y." Unlike an ABC, classes do not need to inherit from a Protocol. They just need to have the right methods. You would use a Protocol when you want to accept any class that happens to have the right abilities, no matter where it comes from. Use an ABC when you want to force classes to officially be part of a family and follow specific rules.

**Answer 7:** Creating an abstract class for only one version adds complexity for no benefit. You would have a template class AND a single child class, when you could just have one regular class that does the job. Only create abstractions when you genuinely have multiple versions of something that need to share the same interface.

**Answer 8:**

```python
from typing import Protocol

class CanFly(Protocol):
    def fly(self) -> str:
        ...

class Eagle:
    def fly(self) -> str:
        return "Soaring high on the wind!"

class Airplane:
    def fly(self) -> str:
        return "Engines roaring down the runway, lifting off!"

class Kite:
    def fly(self) -> str:
        return "Catching the breeze, dancing in the sky!"

def watch_it_fly(flyer: CanFly) -> None:
    print(flyer.fly())

watch_it_fly(Eagle())     # Soaring high on the wind!
watch_it_fly(Airplane())  # Engines roaring down the runway, lifting off!
watch_it_fly(Kite())      # Catching the breeze, dancing in the sky!
```

---

**Previous:** [[wiki:python-jr-inheritance]] | **Next:** [[wiki:python-jr-special-methods]]
