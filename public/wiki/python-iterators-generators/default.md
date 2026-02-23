# Iterators and Generators — Processing Data Lazily

## The Problem: Data That Doesn't Fit

Imagine you have a file with 10 million lines. Or a database with a billion rows. You need to process each one, but you cannot load them all into memory at once. Your computer would run out of RAM and crash.

This is the problem that **lazy evaluation** solves. Instead of loading everything at once, you process one item at a time. You grab a value, do something with it, then grab the next one. The rest of the data stays where it is until you need it.

Python has a built-in system for this: **iterators** and **generators**.

---

## What Is an Iterator?

An iterator is an object that produces values **one at a time**. Think of it like a ticket dispenser. Each time you pull, you get the next ticket. You cannot go back to a previous ticket. You cannot peek ahead. You just get the next one.

Every time you use a `for` loop in Python, you are using an iterator behind the scenes. The loop asks for the next value, does something with it, asks for the next value, and repeats until there are no more values.

---

## The Iterator Protocol

Python defines a simple contract for iterators. Any object that follows this contract can be used in a `for` loop. The contract has two methods:

- `__iter__()` — Returns the iterator object itself. This tells Python "yes, I am iterable."
- `__next__()` — Returns the next value. When there are no more values, it raises `StopIteration`.

That's it. Two methods. Any object with these two methods is an iterator.

---

## Building an Iterator From Scratch

Open your editor. Type this. Run it.

```python
class CountUp:
    """An iterator that counts from 0 up to (but not including) limit."""

    def __init__(self, limit: int) -> None:
        self.current: int = 0
        self.limit: int = limit

    def __iter__(self) -> "CountUp":
        return self

    def __next__(self) -> int:
        if self.current >= self.limit:
            raise StopIteration
        value: int = self.current
        self.current += 1
        return value


counter: CountUp = CountUp(5)

i: int
for i in counter:
    print(i)
```

Output:

```
0
1
2
3
4
```

Walk through what happened:

1. The `for` loop called `__iter__()` on the `CountUp` object. It got back the same object.
2. The loop called `__next__()`. Got `0`. Printed it.
3. Called `__next__()` again. Got `1`. Printed it.
4. This continued until `__next__()` raised `StopIteration`.
5. The `for` loop caught `StopIteration` and stopped. You never see the exception — the loop handles it for you.

---

## StopIteration — How the Loop Knows to Stop

`StopIteration` is a special exception. It does not mean something went wrong. It means "there are no more values." The `for` loop expects this. When it catches `StopIteration`, it simply ends.

You can also use an iterator manually with `next()`. Open your editor. Type this. Run it.

```python
counter: CountUp = CountUp(3)

value_1: int = next(counter)
print(value_1)  # 0

value_2: int = next(counter)
print(value_2)  # 1

value_3: int = next(counter)
print(value_3)  # 2

# This will raise StopIteration:
# value_4: int = next(counter)
```

Uncomment that last line and run it again. You will see the `StopIteration` exception. This is normal — it is how Python communicates "no more items."

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about Python iterators and the iterator protocol. Quiz me: (1) What two methods must an object have to be an iterator? (2) What does __next__() do when there are no more values? (3) If I call next() on an exhausted iterator, what happens? (4) Write an iterator class called Countdown that counts from a given number down to 1. Include type hints on everything."</div>
</div>

---

## What Is a Generator?

Writing a full class with `__iter__` and `__next__` every time you want an iterator is a lot of work. Generators are the shortcut.

A generator is a **function** that uses the `yield` keyword instead of `return`. When you call a generator function, it does not run the function body. Instead, it gives you back a generator object — which is an iterator.

Each time you ask for the next value (with `next()` or a `for` loop), the function runs until it hits `yield`, produces that value, and then **pauses**. The next time you ask, it resumes right where it left off.

---

## Your First Generator

Open your editor. Type this. Run it.

```python
from typing import Generator


def count_up(limit: int) -> Generator[int, None, None]:
    """Yield numbers from 0 up to (but not including) limit."""
    current: int = 0
    while current < limit:
        yield current
        current += 1


number: int
for number in count_up(5):
    print(number)
```

Output:

```
0
1
2
3
4
```

This does the same thing as the `CountUp` class, but in far fewer lines. The `Generator[int, None, None]` type hint means: yields `int` values, accepts no sent values, and returns nothing.

---

## yield vs return

This is the key difference:

- `return` **terminates** the function. The function is done. Its local variables are gone.
- `yield` **pauses** the function. The function's state is frozen. Its local variables are preserved. Next time you ask for a value, it resumes from exactly where it paused.

Open your editor. Type this. Run it.

```python
from typing import Generator


def show_difference() -> Generator[str, None, None]:
    print("Before first yield")
    yield "first"
    print("Between yields")
    yield "second"
    print("After last yield")


gen: Generator[str, None, None] = show_difference()

print("Calling next() the first time:")
value_1: str = next(gen)
print(f"Got: {value_1}")

print("\nCalling next() the second time:")
value_2: str = next(gen)
print(f"Got: {value_2}")

print("\nCalling next() the third time:")
# next(gen)  # This would raise StopIteration and print "After last yield"
```

Output:

```
Calling next() the first time:
Before first yield
Got: first

Calling next() the second time:
Between yields
Got: second
```

Notice how the function pauses between yields. It does not run all at once. It runs only when you ask for the next value.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about generators and yield. Quiz me: (1) What is the difference between yield and return? (2) When does a generator function actually execute its body — when you call it or when you iterate? (3) Write a generator function called fibonacci that yields the first n Fibonacci numbers, using a while loop. Include full type hints. (4) What happens if a generator function has both yield and return statements?"</div>
</div>

---

## Generator Expressions

Just like list comprehensions create lists, generator expressions create generators. The syntax is the same but with parentheses instead of brackets.

Open your editor. Type this. Run it.

```python
from typing import Generator

# List comprehension — builds the entire list in memory
squares_list: list[int] = [x * 2 for x in range(10)]
print(squares_list)

# Generator expression — produces values one at a time
squares_gen: Generator[int, None, None] = (x * 2 for x in range(10))
print(squares_gen)  # <generator object ...>

# To get the values, iterate:
value: int
for value in squares_gen:
    print(value, end=" ")
print()
```

The generator expression `(x * 2 for x in range(10))` does not compute all 10 values up front. It computes each one only when asked.

---

## Why Generators Save Memory

This is the whole point. Compare these two approaches for summing a large range:

```python
# This creates a list of 10 million integers in memory
big_list: list[int] = [i for i in range(10_000_000)]
total_list: int = sum(big_list)

# This produces one integer at a time — almost no memory used
total_gen: int = sum(i for i in range(10_000_000))
```

The list version allocates memory for 10 million integers. The generator version only ever holds one integer at a time. Both give the same result.

For small data, it does not matter. For large data, generators are the difference between your program working and your program crashing.

---

## Practical Pattern: Reading Large Files Line by Line

Open your editor. Type this. Run it (create a test file first with a few lines of text).

```python
from typing import Generator


def read_lines(filepath: str) -> Generator[str, None, None]:
    """Yield lines from a file one at a time."""
    file = open(filepath, "r")
    try:
        line: str
        for line in file:
            yield line.strip()
    finally:
        file.close()


line: str
for line in read_lines("test.txt"):
    print(line)
```

This works on files of any size. Even a 50 GB log file. Because you only hold one line in memory at a time.

---

## Practical Pattern: Infinite Sequences

Generators can produce values forever. You just never raise `StopIteration`.

```python
from typing import Generator


def natural_numbers() -> Generator[int, None, None]:
    """Yield 1, 2, 3, 4, ... forever."""
    n: int = 1
    while True:
        yield n
        n += 1


# Use itertools.islice to take just the first 10
from itertools import islice

first_ten: list[int] = list(islice(natural_numbers(), 10))
print(first_ten)  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

You cannot make an infinite list. But you can make an infinite generator. You just have to be careful to stop asking for values at some point.

---

## Practical Pattern: Pipeline Processing

Generators can be chained together like pipes. Each stage processes one item at a time.

```python
from typing import Generator


def numbers(limit: int) -> Generator[int, None, None]:
    """Produce numbers from 0 to limit."""
    current: int = 0
    while current < limit:
        yield current
        current += 1


def doubled(source: Generator[int, None, None]) -> Generator[int, None, None]:
    """Double each value from the source."""
    value: int
    for value in source:
        yield value * 2


def only_big(source: Generator[int, None, None], threshold: int) -> Generator[int, None, None]:
    """Only pass through values above the threshold."""
    value: int
    for value in source:
        if value > threshold:
            yield value


# Chain them together:
pipeline: Generator[int, None, None] = only_big(doubled(numbers(10)), 10)

result: int
for result in pipeline:
    print(result)  # 12, 14, 16, 18
```

Each value flows through the entire pipeline before the next value starts. Nothing is stored in between.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on generator patterns: (1) What is the difference between [x for x in range(1000)] and (x for x in range(1000)) in terms of memory? (2) Write a generator that reads a file and yields only lines containing a specific search word. Include type hints. (3) Can a generator produce values forever? How? (4) Write a pipeline of two generators: one that yields squares of numbers, and one that filters to only keep values less than 50."</div>
</div>

---

## itertools Module Highlights

Python's `itertools` module has pre-built tools for working with iterators. Here are the most useful ones.

### chain — Combine multiple iterables

```python
from itertools import chain

letters: list[str] = ["a", "b", "c"]
numbers: list[int] = [1, 2, 3]

combined: chain[str | int] = chain(letters, numbers)

item: str | int
for item in combined:
    print(item)  # a, b, c, 1, 2, 3
```

### islice — Take a slice without loading everything

```python
from itertools import islice
from typing import Generator


def infinite_count() -> Generator[int, None, None]:
    n: int = 0
    while True:
        yield n
        n += 1


first_five: list[int] = list(islice(infinite_count(), 5))
print(first_five)  # [0, 1, 2, 3, 4]
```

### zip_longest — Zip with fill values

```python
from itertools import zip_longest

names: list[str] = ["Alice", "Bob", "Charlie"]
scores: list[int] = [90, 85]

pair: tuple[str | None, int | None]
for pair in zip_longest(names, scores, fillvalue=0):
    print(pair)
# ('Alice', 90)
# ('Bob', 85)
# ('Charlie', 0)
```

### product — Cartesian product

```python
from itertools import product

colors: list[str] = ["red", "blue"]
sizes: list[str] = ["S", "M", "L"]

combo: tuple[str, str]
for combo in product(colors, sizes):
    print(combo)
# ('red', 'S'), ('red', 'M'), ('red', 'L'), ('blue', 'S'), ...
```

---

## How for Loops Actually Work

Now you know the truth. A `for` loop in Python is just syntactic sugar for calling `__next__()` repeatedly.

```python
# This:
item: int
for item in [1, 2, 3]:
    print(item)

# Is essentially doing this:
iterator = iter([1, 2, 3])
while True:
    try:
        item = next(iterator)
        print(item)
    except StopIteration:
        break
```

The `iter()` function calls `__iter__()`. The `next()` function calls `__next__()`. The loop catches `StopIteration` and breaks. That is all a `for` loop does.

This means anything with `__iter__` and `__next__` works in a `for` loop. Lists, tuples, strings, files, generators, dictionaries, sets — they all follow the iterator protocol.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Comprehensive quiz on iterators and generators: (1) Rewrite a for loop as a while loop using iter() and next() — show both versions. (2) What is the iterator protocol? (3) Write an iterator class called EvenNumbers that yields even numbers up to a limit. (4) Write the same thing as a generator function. (5) Explain why generators save memory compared to lists. (6) Name two functions from itertools and explain what they do. Include type hints everywhere."</div>
</div>

---

## Where People Go Wrong

1. **Exhausting a generator and then trying to use it again.** Once a generator has produced all its values, it is done. You cannot reset it. You must create a new one.

```python
from typing import Generator

gen: Generator[int, None, None] = (x for x in range(3))
first_pass: list[int] = list(gen)   # [0, 1, 2]
second_pass: list[int] = list(gen)  # [] — empty! The generator is exhausted.
```

2. **Not understanding laziness.** A generator does not compute anything until you ask. If you call a generator function and never iterate over it, no work happens.

3. **Confusing generators with lists.** You cannot index a generator. You cannot get its length. You cannot iterate it twice. If you need any of these, convert to a list first — but only if the data fits in memory.

4. **Using `list()` on a huge generator.** The whole point of a generator is to avoid loading everything into memory. If you wrap it in `list()`, you lose that benefit.

---

**Previous:** [[wiki:python-special-methods]] | **Next:** [[wiki:python-comprehensions]]