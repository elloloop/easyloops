# Decorators and Closures -- Adding Superpowers to Functions

## Functions Are Values Too

![A flat vector illustration in a children's educational book style showing Byte the robot holding a recipe card in one hand and handing a copy of the same recipe card to a smaller helper robot with the other hand. Several recipe cards are neatly stored in a filing cabinet drawer nearby. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Before you can understand decorators, you need to understand one big idea: **functions are values**, just like numbers and strings are values. You can store a function in a variable, pass it to another function, and even return it from a function.

Think of a function like a **recipe card**. The recipe card itself is a thing you can hold, hand to someone, or put in a drawer. Handing someone the recipe card is not the same as cooking the recipe -- you are just giving them the instructions.

Open your editor. Type this. Run it.

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"


# Store the function in a variable (like putting the recipe card in a drawer)
my_function = greet

# Call it using the new name
message: str = my_function("Alice")
print(message)  # Hello, Alice!

# Pass a function to another function (like handing the recipe card to a friend)
def call_twice(func, value: str) -> None:
    print(func(value))
    print(func(value))


call_twice(greet, "Bob")
# Hello, Bob!
# Hello, Bob!
```

Notice: when you write `greet` without parentheses, you are talking about the function itself (the recipe card). When you write `greet("Alice")` with parentheses, you are **calling** the function (actually cooking the recipe).

---

## What Is a Closure?

A **closure** is a function that lives inside another function and **remembers** the outer function's variables, even after the outer function has finished running.

Think of it like **writing a letter inside a room**. The letter mentions details about the room -- what color the walls are, what is on the desk. Even after you leave the room, the letter still "remembers" those details because you wrote them down.

Open your editor. Type this. Run it.

```python
from typing import Callable


def make_adder(amount: int) -> Callable[[int], int]:
    """Create a function that adds a specific amount to any number."""

    def adder(x: int) -> int:
        return x + amount  # 'amount' is remembered from make_adder

    return adder


add_five: Callable[[int], int] = make_adder(5)
add_ten: Callable[[int], int] = make_adder(10)

print(add_five(3))   # 8   (3 + 5)
print(add_five(20))  # 25  (20 + 5)
print(add_ten(3))    # 13  (3 + 10)
print(add_ten(7))    # 17  (7 + 10)
```

Here is what happened step by step:

1. `make_adder(5)` runs. Inside, it sets `amount = 5`. It creates a function called `adder` that uses `amount`. It returns `adder`.
2. `make_adder` is finished. Normally, its variable `amount` would disappear. But `adder` still needs `amount`, so Python keeps it alive.
3. When you call `add_five(3)`, the `adder` function runs. It still remembers that `amount` is `5`. So it returns `3 + 5 = 8`.
4. `make_adder(10)` does the same thing but with `amount = 10`. So `add_ten` always adds 10.

The inner function "closed over" the variable `amount`. That is where the name **closure** comes from.

---

## Why Closures Are Useful

Closures let you create **specialized functions** on the fly. Instead of passing the same extra information over and over, you bake it right into the function.

```python
from typing import Callable


def make_greeter(greeting: str) -> Callable[[str], str]:
    """Create a function that greets with a specific word."""

    def greeter(name: str) -> str:
        return f"{greeting}, {name}!"

    return greeter


say_hello: Callable[[str], str] = make_greeter("Hello")
say_howdy: Callable[[str], str] = make_greeter("Howdy")

print(say_hello("Alice"))  # Hello, Alice!
print(say_howdy("Bob"))    # Howdy, Bob!
```

You made two different greeting functions from one recipe. Each one remembers its own greeting word.

---

## What Is a Decorator?

![A flat vector illustration in a children's educational book style showing Byte the robot wrapping a small gift box with colorful wrapping paper and a bow. The unwrapped gift is visible on one side and the beautifully wrapped version is on the other side. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

A **decorator** is a function that wraps another function to add extra behavior. The original function stays the same -- the decorator just adds something around it.

Think of it like **gift wrapping**. The gift inside the box stays exactly the same. But the wrapping adds something extra on the outside -- pretty paper, a ribbon, a bow. The gift has not changed, but now it has something more.

Another way to think about it: **putting a phone in a case**. The phone still works exactly the same way. But the case adds protection, maybe a kickstand, maybe a card holder. The phone did not change -- the case just added extra features around it.

---

## Building a Decorator Step by Step

Let's build a decorator that announces when a function starts and when it finishes. We will do it the long way first, then learn the shortcut.

### Step 1: The Long Way

Open your editor. Type this. Run it.

```python
from typing import Any, Callable


def announce(func: Callable) -> Callable:
    """Wrap a function so it announces when it starts and finishes."""

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Starting {func.__name__}...")
        result: Any = func(*args, **kwargs)
        print(f"Finished {func.__name__}!")
        return result

    return wrapper


def greet(name: str) -> str:
    return f"Hello, {name}!"


# Manually wrap the function
greet = announce(greet)

message: str = greet("Alice")
print(message)
```

Output:

```
Starting greet...
Finished greet!
Hello, Alice!
```

What happened:

1. `announce(greet)` took the `greet` function and created a `wrapper` function around it.
2. The `wrapper` prints "Starting...", calls the original `greet`, prints "Finished!", and returns the result.
3. We replaced `greet` with the wrapped version: `greet = announce(greet)`.
4. Now when you call `greet("Alice")`, you are actually calling `wrapper("Alice")`, which calls the original `greet` inside.

### Step 2: The @ Shortcut

That `greet = announce(greet)` line is clunky. Python has a nicer way to write it: the `@` symbol. It does the exact same thing.

Open your editor. Type this. Run it.

```python
from typing import Any, Callable


def announce(func: Callable) -> Callable:
    """Wrap a function so it announces when it starts and finishes."""

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Starting {func.__name__}...")
        result: Any = func(*args, **kwargs)
        print(f"Finished {func.__name__}!")
        return result

    return wrapper


@announce
def greet(name: str) -> str:
    return f"Hello, {name}!"


@announce
def add(a: int, b: int) -> int:
    return a + b


print(greet("Alice"))
print(add(3, 5))
```

`@announce` above `def greet` is identical to writing `greet = announce(greet)` after the function. It is just cleaner and easier to read.

---

## Keeping the Original Name: @functools.wraps

There is a small problem with our decorator. After wrapping, the function loses its identity.

```python
print(greet.__name__)  # "wrapper" -- not "greet"!
```

Python thinks the function is called "wrapper" because that is what replaced `greet`. This can cause confusion when you are trying to figure out what your code is doing.

The fix is `@functools.wraps`. It copies the original function's name and description onto the wrapper.

Open your editor. Type this. Run it.

```python
import functools
from typing import Any, Callable


def announce(func: Callable) -> Callable:
    """Wrap a function so it announces when it starts and finishes."""

    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print(f"Starting {func.__name__}...")
        result: Any = func(*args, **kwargs)
        print(f"Finished {func.__name__}!")
        return result

    return wrapper


@announce
def greet(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"


print(greet.__name__)  # "greet" -- correct!
print(greet.__doc__)   # "Greet someone by name." -- preserved!
```

`@functools.wraps(func)` is a decorator on the wrapper function (yes, a decorator on a decorator -- it is decorators all the way down!). Always use it. There is no good reason to skip it.

---

## Practical Decorator: A Timer

One of the most useful decorators you can build measures how long a function takes to run. This is handy when you want to know which parts of your program are slow.

Open your editor. Type this. Run it.

```python
import functools
import time
from typing import Any, Callable


def timer(func: Callable) -> Callable:
    """Print how long the function takes to run."""

    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start: float = time.time()
        result: Any = func(*args, **kwargs)
        elapsed: float = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f} seconds")
        return result

    return wrapper


@timer
def slow_greeting() -> str:
    """Simulate a slow operation."""
    time.sleep(1)
    return "Finally done!"


message: str = slow_greeting()
print(message)
```

Output:

```
slow_greeting took 1.0011 seconds
Finally done!
```

The `timer` decorator wraps the function, records the time before and after it runs, and prints how long it took. The function itself has no idea it is being timed -- the decorator handles everything.

---

## Built-in Decorators You Already Know

![A flat vector illustration in a children's educational book style showing Byte the robot in front of a tool wall with three special tools hanging on hooks, each tool glowing with a different color. Byte is reaching for one of them with excitement. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Python comes with several decorators that you will use often. You may have seen some of these already.

### @property -- Make a Method Look Like a Simple Value

```python
class Circle:
    def __init__(self, radius: float) -> None:
        self._radius: float = radius

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2


c: Circle = Circle(5.0)
print(c.area)  # 78.53975 -- looks like a variable, but it calculates each time!
```

Without `@property`, you would have to write `c.area()` with parentheses. With it, you just write `c.area` and it looks like a regular attribute.

### @staticmethod -- A Method That Does Not Need `self`

```python
class MathTools:
    @staticmethod
    def add(a: int, b: int) -> int:
        return a + b


result: int = MathTools.add(3, 5)
print(result)  # 8
```

A static method is a function that lives inside a class but does not need access to the object (`self`) or the class itself.

### @classmethod -- A Method That Gets the Class

```python
class Pet:
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species

    @classmethod
    def create_dog(cls, name: str) -> "Pet":
        return cls(name, "Dog")


buddy: Pet = Pet.create_dog("Buddy")
print(buddy.name)     # Buddy
print(buddy.species)  # Dog
```

A class method gets the class itself as its first argument (called `cls`), not an object. It is useful for creating objects in different ways.

---

## Decorators with Arguments (Triple Nesting)

Sometimes you want the decorator itself to take settings. For example, a `repeat` decorator where you can say how many times to repeat. This adds one extra layer of nesting.

```python
import functools
from typing import Any, Callable


def repeat(times: int) -> Callable:
    """Decorator that runs a function multiple times."""

    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            result: Any = None
            i: int = 0
            while i < times:
                result = func(*args, **kwargs)
                i += 1
            return result
        return wrapper

    return decorator


@repeat(times=3)
def say_hello(name: str) -> None:
    print(f"Hello, {name}!")


say_hello("Alice")
```

Output:

```
Hello, Alice!
Hello, Alice!
Hello, Alice!
```

There are three layers here:

1. `repeat(times=3)` runs first. It returns `decorator`.
2. `decorator` receives the `say_hello` function. It returns `wrapper`.
3. `wrapper` is what actually runs when you call `say_hello`. It calls the original function 3 times.

The `@repeat(times=3)` syntax is the same as writing: `say_hello = repeat(times=3)(say_hello)`.

This triple nesting is the trickiest part of decorators. Do not worry if it takes a while to feel natural. Read through it slowly, and try building your own to practice.

---

## Common Mistakes

1. **Forgetting `@functools.wraps`.** Without it, the wrapped function loses its name and description. Always include it on your wrapper function.

2. **Confusing decoration time vs call time.** The decorator runs **once** when the function is defined. The wrapper runs **every time** the function is called. If you put a `print` in the decorator body (outside the wrapper), it prints once at definition time. If you put it inside the wrapper, it prints every time the function is called.

3. **Closures that all share the same variable.** This is a classic trap:

```python
from typing import Callable

functions: list[Callable[[], int]] = []
i: int = 0
while i < 5:
    functions.append(lambda: i)  # All lambdas share the SAME i
    i += 1

# They ALL return 5, not 0, 1, 2, 3, 4!
f: Callable[[], int]
for f in functions:
    print(f())  # 5, 5, 5, 5, 5
```

The fix is to capture the current value using a default argument:

```python
functions: list[Callable[[], int]] = []
i: int = 0
while i < 5:
    functions.append(lambda i=i: i)  # Captures current value of i
    i += 1

f: Callable[[], int]
for f in functions:
    print(f())  # 0, 1, 2, 3, 4
```

4. **Confusing decorator order.** When you stack decorators, they apply from bottom to top but run from top to bottom.

```python
@decorator_a
@decorator_b
def my_function() -> None:
    pass

# This is the same as:
# my_function = decorator_a(decorator_b(my_function))
```

`decorator_b` wraps first, then `decorator_a` wraps that result. When you call the function, `decorator_a`'s wrapper runs first, then `decorator_b`'s wrapper, then the original function.

---

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a function machine that has been decorated with colorful stickers, ribbons, and add-on gadgets. The machine has an input chute and an output chute. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

## Practice Questions

Try answering these on your own before looking at the answers at the bottom of the page.

**1.** What does it mean to say "functions are values"? Give an example of storing a function in a variable.

**2.** What is a closure? Explain it using the letter-in-a-room idea.

**3.** Write a closure called `make_multiplier` that takes a number and returns a function that multiplies any input by that number. Include type hints. Show how you would create a `triple` function from it.

**4.** What does a decorator do? Explain using the gift-wrapping idea.

**5.** What does `@my_decorator` above a function definition actually do behind the scenes? Write the equivalent code without the `@` syntax.

**6.** Why do we need `@functools.wraps`? What goes wrong without it?

**7.** Write a decorator called `shout` that makes any function's string return value uppercase. For example, if a function returns `"hello"`, the decorated version returns `"HELLO"`. Include type hints and `@functools.wraps`.

**8.** Name three built-in Python decorators and briefly describe what each one does.

---

**Previous:** [[wiki:python-jr-comprehensions]] | **Next:** [[wiki:python-jr-type-system]]

---

## Answers to Practice Questions

**1.** "Functions are values" means you can treat a function like any other piece of data. You can store it in a variable, pass it as an argument to another function, or return it from a function. Example:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

my_func = greet  # Stored the function in a variable
print(my_func("Alice"))  # Hello, Alice!
```

You are not calling `greet` here -- you are just putting the function itself (the recipe card) into `my_func`.

**2.** A closure is a function defined inside another function that remembers variables from the outer function, even after the outer function has finished. Using the letter idea: imagine you are sitting in a room that has blue walls and a red lamp. You write a letter that says "the walls are blue and the lamp is red." After you leave the room, the letter still "remembers" those details. A closure works the same way -- the inner function "remembers" the variables from the outer function, even after the outer function is done running.

**3.**

```python
from typing import Callable


def make_multiplier(factor: int) -> Callable[[int], int]:
    """Create a function that multiplies by a specific factor."""

    def multiplier(x: int) -> int:
        return x * factor

    return multiplier


triple: Callable[[int], int] = make_multiplier(3)
print(triple(5))   # 15
print(triple(10))  # 30
```

**4.** A decorator is a function that wraps another function to add extra behavior. Using the gift-wrapping idea: the gift (the original function) stays exactly the same inside the box. The wrapping paper and ribbon (the decorator) add something extra on the outside. When someone receives the gift, they see the wrapping first and then get to the gift. The decorator adds behavior that happens before or after the original function runs, but the original function itself does not change.

**5.** Writing `@my_decorator` above a function definition like this:

```python
@my_decorator
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

Is the same as writing:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

greet = my_decorator(greet)
```

The `@` syntax is just a cleaner shortcut.

**6.** `@functools.wraps(func)` copies the original function's name (`__name__`) and description (`__doc__`) onto the wrapper function. Without it, the wrapped function thinks its name is "wrapper" instead of the original name. This causes confusion when debugging, reading error messages, or using `help()` on the function.

**7.**

```python
import functools
from typing import Any, Callable


def shout(func: Callable) -> Callable:
    """Make a function's return value uppercase."""

    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> str:
        result: str = func(*args, **kwargs)
        return result.upper()

    return wrapper


@shout
def greet(name: str) -> str:
    return f"Hello, {name}!"


print(greet("Alice"))  # HELLO, ALICE!
```

**8.** Three built-in Python decorators:

- `@property` -- Makes a method act like a simple attribute. Instead of calling `object.area()`, you can just write `object.area`. It is useful for values that are calculated from other data.
- `@staticmethod` -- Creates a method inside a class that does not need access to the object (`self`) or the class. It is just a regular function that lives inside the class for organization.
- `@classmethod` -- Creates a method that receives the class itself (not an object) as its first argument. It is often used to create objects in different ways, like `Pet.create_dog("Buddy")`.
