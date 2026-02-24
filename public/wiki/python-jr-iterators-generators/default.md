# Iterators and Generators -- One Thing at a Time

## What Is an Iterator?

Imagine a vending machine with ten different snacks. Every time you press the button, it gives you the next snack. First press: chips. Second press: candy. Third press: water. It remembers where it left off and gives you the next one each time.

That is exactly what an **iterator** is in Python. An iterator is something that **gives you items one at a time**. It keeps track of where it is, and each time you ask for the next item, it hands it over and moves forward.

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a colorful vending machine, pressing a button and catching a snack that pops out, with numbers 1, 2, 3 floating next to each snack slot. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Here is another way to think about it. Imagine a bookmark in a book. You are reading one page at a time. The bookmark remembers your place. Each time you sit down to read, you pick up right where you left off. You do not need to start from the beginning every time. That bookmark is like an iterator -- it tracks your position and moves forward.

---

## How for Loops REALLY Work

Here is a big secret about Python. Every time you write a `for` loop, you are using an iterator without even knowing it!

When you write:

```python
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)
```

Python is actually doing something like this behind the scenes:

```python
my_list: list[str] = ["apple", "banana", "cherry"]
iterator = iter(my_list)       # Step 1: Get an iterator from the list

while True:
    try:
        fruit: str = next(iterator)  # Step 2: Ask for the next item
        print(fruit)
    except StopIteration:       # Step 3: When there are no more items, stop
        break
```

Here is what happens step by step:

1. Python calls `iter()` on the list. This gives back an iterator -- an object that knows how to go through the list one item at a time.
2. Python calls `next()` on the iterator. This gives the first item: `"apple"`.
3. Python calls `next()` again. Gets `"banana"`.
4. Python calls `next()` again. Gets `"cherry"`.
5. Python calls `next()` one more time. There are no more items, so the iterator raises `StopIteration`.
6. The loop catches `StopIteration` and stops.

That is all a `for` loop does! It is just calling `next()` over and over until it gets `StopIteration`. Lists, strings, dictionaries, and everything else you loop over all follow this same system.

---

## The Iterator Protocol

The system that makes all of this work is called the **iterator protocol**. It has just two rules:

1. **`__iter__()`** -- Returns the iterator object. This tells Python "yes, you can iterate over me."
2. **`__next__()`** -- Returns the next item. When there are no more items, it raises `StopIteration`.

That is it. Any object that follows these two rules can be used in a `for` loop. Two methods -- that is the whole contract.

---

## Building a Simple Iterator Class

Let's build our own iterator from scratch. We will make a `Countdown` object that counts down from a number to zero.

Open your editor. Type this. Run it.

```python
class Countdown:
    def __init__(self, start: int) -> None:
        self.start: int = start
        self._current: int = start

    def __iter__(self) -> "Countdown":
        self._current = self.start  # Reset to the beginning
        return self

    def __next__(self) -> int:
        if self._current < 0:
            raise StopIteration
        value: int = self._current
        self._current -= 1
        return value

countdown: Countdown = Countdown(5)
for number in countdown:
    print(number)
```

Output:

```
5
4
3
2
1
0
```

Let's walk through what happened:

1. The `for` loop called `__iter__()` on the `Countdown` object. It got back the same object (with `_current` reset to 5).
2. The loop called `__next__()`. Got `5`. Printed it.
3. Called `__next__()` again. Got `4`. Printed it.
4. This kept going: `3`, `2`, `1`, `0`.
5. Called `__next__()` one more time. Since `_current` was now `-1` (less than 0), it raised `StopIteration`.
6. The `for` loop caught `StopIteration` and stopped. You never see the error -- the loop handles it for you.

---

You can also use the `next()` function to step through an iterator manually:

```python
countdown: Countdown = Countdown(3)
iterator: Countdown = iter(countdown)

print(next(iterator))  # 3
print(next(iterator))  # 2
print(next(iterator))  # 1
print(next(iterator))  # 0
# print(next(iterator))  # This would raise StopIteration!
```

---

![A flat vector illustration in a children's educational book style showing Byte the robot reading a book with a big colorful bookmark sticking out, and an arrow showing the bookmark moving from one page to the next. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

## What Is a Generator?

Writing a whole class with `__iter__` and `__next__` every time you want an iterator is a lot of work. Python has a shortcut called **generators** that makes it much easier.

A generator is a **special, easy way to make an iterator using the `yield` keyword**. Instead of writing a class with two special methods, you write a regular function that uses `yield` instead of `return`.

Here is the key idea: **`yield` is like "here is one item, I will pause and give you the next one when you ask."** The function remembers where it stopped and picks up right there next time.

---

## Generator Functions vs Regular Functions

Let's compare a regular function to a generator function:

```python
# Regular function -- returns everything at once
def get_numbers_list(limit: int) -> list[int]:
    result: list[int] = []
    current: int = 0
    while current < limit:
        result.append(current)
        current += 1
    return result

# Generator function -- yields one item at a time
def get_numbers_generator(limit: int):
    current: int = 0
    while current < limit:
        yield current
        current += 1
```

The regular function builds the entire list in memory and returns it all at once. The generator function produces one number at a time and pauses between each one.

Open your editor. Type this. Run it.

```python
def count_up(limit: int):
    print("Starting the generator!")
    current: int = 0
    while current < limit:
        print(f"  About to yield {current}")
        yield current
        print(f"  Resumed after yielding {current}")
        current += 1
    print("Generator is done!")

print("Creating the generator...")
gen = count_up(3)
print("Generator created, but nothing has run yet!")

print("\nAsking for first value:")
value1: int = next(gen)
print(f"Got: {value1}")

print("\nAsking for second value:")
value2: int = next(gen)
print(f"Got: {value2}")

print("\nAsking for third value:")
value3: int = next(gen)
print(f"Got: {value3}")
```

Run it and watch the output carefully. You will see that each `next()` call runs the function up to the next `yield`, then pauses.

Notice something important: when you call `count_up(3)`, the function does NOT run. It creates a generator object and waits. The function body only runs when you start asking for values with `next()` or a `for` loop.

Each time Python hits `yield`, the function **pauses** and gives you that value. Next time you ask, it **resumes** right where it left off. The function remembers all its local variables and its position.

---

## Your First Useful Generator: Countdown

Remember the `Countdown` class we built earlier with `__iter__` and `__next__`? Here is the same thing as a generator:

```python
def countdown(start: int):
    current: int = start
    while current >= 0:
        yield current
        current -= 1

for number in countdown(5):
    print(number)
# 5
# 4
# 3
# 2
# 1
# 0
```

That is SO much simpler! No class, no `__iter__`, no `__next__`, no `StopIteration`. Just `yield`. The generator handles all of that for you automatically.

---

## Practical Example: Fibonacci Generator

The Fibonacci sequence is a famous number pattern where each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

Here is a generator that produces Fibonacci numbers:

Open your editor. Type this. Run it.

```python
def fibonacci(count: int):
    a: int = 0
    b: int = 1
    numbers_yielded: int = 0
    while numbers_yielded < count:
        yield a
        a, b = b, a + b
        numbers_yielded += 1

print("First 10 Fibonacci numbers:")
for number in fibonacci(10):
    print(number)
```

Output:

```
First 10 Fibonacci numbers:
0
1
1
2
3
5
8
13
21
34
```

The generator remembers `a`, `b`, and `numbers_yielded` between each `yield`. Every time you ask for the next number, it calculates it and pauses again.

---

## Why Generators Are Useful -- Saving Memory

Here is a really important question: why not just use a list?

Imagine a chef at a restaurant. There are two ways the chef could work:

**Way 1 (the list way):** The chef makes ALL 100 plates of food at once, puts them all on a giant table, and then the waiters start delivering them. You need a HUGE table to hold 100 plates.

**Way 2 (the generator way):** The chef makes ONE plate at a time. When a waiter asks for the next plate, the chef makes it. No giant table needed -- just one plate at a time.

![A flat vector illustration in a children's educational book style showing two scenes side by side: on the left, a huge table overflowing with plates of food, and on the right, Byte the robot chef handing one plate at a time to a waiter. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Generators work like the second chef. They create items one at a time and do not store everything in memory. This matters a LOT when you have a huge amount of data.

```python
# The list way -- creates ALL 10 million numbers in memory at once
big_list: list[int] = [i for i in range(10_000_000)]
total_from_list: int = sum(big_list)

# The generator way -- creates one number at a time, almost no memory used
total_from_gen: int = sum(i for i in range(10_000_000))
```

Both give the exact same answer. But the list version needs to hold 10 million numbers in memory at once. The generator version only ever holds ONE number at a time. For small amounts of data, it does not matter. For huge amounts of data, generators can be the difference between your program working and your program crashing.

---

## Generator Expressions -- A Shortcut

You know how list comprehensions are a shortcut for building lists? Generator expressions are the same idea but for generators. The only difference is you use **parentheses** instead of **square brackets**.

```python
# List comprehension -- square brackets -- builds entire list in memory
squares_list: list[int] = [x * x for x in range(10)]
print(squares_list)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression -- parentheses -- produces values one at a time
squares_gen = (x * x for x in range(10))
print(squares_gen)    # <generator object ...>

# To get the values, iterate:
for square in squares_gen:
    print(square, end=" ")
print()
# 0 1 4 9 16 25 36 49 64 81
```

Generator expressions are sometimes called "lazy" because they do not compute anything until you ask. A list comprehension does all the work upfront. A generator expression waits and does the work only when you need each value.

You can use generator expressions directly inside functions like `sum()`, `max()`, and `min()`:

```python
# Sum of squares from 1 to 100
total: int = sum(x * x for x in range(1, 101))
print(total)  # 338350

# Largest even number under 50
biggest: int = max(x for x in range(50) if x % 2 == 0)
print(biggest)  # 48
```

---

## Generators Can Run Forever

One cool thing about generators: they can produce values forever! You just never stop the loop inside them.

```python
def counting_forever(start: int = 1):
    current: int = start
    while True:
        yield current
        current += 1

# Be careful! Don't loop over this without a way to stop!
counter = counting_forever()
print(next(counter))  # 1
print(next(counter))  # 2
print(next(counter))  # 3
print(next(counter))  # 4
# This could go on forever...
```

You cannot make an infinite list -- your computer would run out of memory. But you can make an infinite generator because it only creates one value at a time.

Just make sure you always have a way to stop! You can use `break` in a `for` loop or only call `next()` a certain number of times.

```python
def counting_forever(start: int = 1):
    current: int = start
    while True:
        yield current
        current += 1

# Safe: using break to stop after 5 numbers
for number in counting_forever():
    if number > 5:
        break
    print(number)
# 1
# 2
# 3
# 4
# 5
```

---

## Important Things to Remember

### Generators Are One-Use Only

Once a generator has produced all its values, it is done. You cannot rewind it. You cannot use it again. You have to create a new one.

```python
def simple_gen():
    yield 1
    yield 2
    yield 3

gen = simple_gen()
first_time: list[int] = list(gen)   # [1, 2, 3]
second_time: list[int] = list(gen)  # []  -- empty! The generator is used up.

# To go again, make a new one:
gen2 = simple_gen()
third_time: list[int] = list(gen2)  # [1, 2, 3]
```

### Generators Are Lazy

A generator does not compute anything until you ask for it. If you call a generator function and never iterate over it, no work happens at all.

```python
def noisy_generator():
    print("This only prints when you iterate!")
    yield 1
    yield 2

gen = noisy_generator()
# Nothing printed yet! The function body has not run.

first: int = next(gen)  # NOW it prints "This only prints when you iterate!"
```

### You Cannot Index a Generator

Lists let you grab any item with `my_list[5]`. Generators do not support that. They can only go forward, one item at a time.

```python
gen = (x for x in range(10))
# gen[5]  -- This would cause a TypeError!

# If you need indexing, convert to a list first:
my_list: list[int] = list(gen)
print(my_list[5])  # 5
```

But be careful -- converting a huge generator to a list puts everything in memory, which defeats the purpose of using a generator.

---

## Putting It All Together

Let's build a number pipeline using generators. Each generator takes values from the previous one, processes them, and passes them along.

Open your editor. Type this. Run it.

```python
def numbers(limit: int):
    """Produce numbers from 1 to limit."""
    current: int = 1
    while current <= limit:
        yield current
        current += 1

def doubled(source):
    """Double each value from the source."""
    for value in source:
        yield value * 2

def only_big(source, threshold: int):
    """Only pass through values above the threshold."""
    for value in source:
        if value > threshold:
            yield value

# Chain them together like a pipeline:
# numbers(10) produces: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
# doubled makes them:   2, 4, 6, 8, 10, 12, 14, 16, 18, 20
# only_big(threshold=12) keeps: 14, 16, 18, 20

pipeline = only_big(doubled(numbers(10)), 12)

for result in pipeline:
    print(result)
# 14
# 16
# 18
# 20
```

Each value flows through the entire pipeline before the next value even starts. Nothing is stored in between. This is incredibly memory-efficient!

---

![A flat vector illustration in a children's educational book style showing Byte the robot watching colorful numbered balls travel through a series of connected tubes and funnels, with some balls getting larger in one tube and some falling through a filter in another. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

## Summary

Let's review what you learned:

- **An iterator** gives you items one at a time. Like a vending machine or a bookmark.
- **`for` loops use iterators** under the hood. They call `__iter__()` and then `__next__()` over and over until they get `StopIteration`.
- **The iterator protocol** has two methods: `__iter__()` returns the iterator, `__next__()` returns the next value or raises `StopIteration`.
- **A generator** is an easy way to make an iterator using the `yield` keyword.
- **`yield`** pauses the function and gives you one value. The function remembers where it stopped and picks up there next time.
- **Generator functions vs regular functions:** Regular functions return everything at once. Generator functions yield one thing at a time and pause.
- **Generators save memory** because they do not create everything at once. Like a chef making one plate at a time instead of all plates at once.
- **Generator expressions** are like list comprehensions but with parentheses instead of square brackets. They are lazy -- they only compute values when asked.
- **Generators are one-use only.** Once exhausted, you need to create a new one.

---

## Practice Questions

**Question 1:** What is an iterator? Explain it using your own example (not the vending machine or bookmark).

**Question 2:** What are the two methods in the iterator protocol? What does each one do?

**Question 3:** Rewrite this `for` loop as a `while` loop using `iter()` and `next()`:

```python
for letter in "hello":
    print(letter)
```

**Question 4:** What is the difference between `yield` and `return`? What happens to a function's local variables when it uses `yield` vs `return`?

**Question 5:** Write a generator function called `even_numbers` that takes a `limit` and yields all even numbers from 2 up to (and including) that limit. Test it with a `for` loop.

**Question 6:** Why are generators useful for large amounts of data? Explain using the chef analogy or your own example.

**Question 7:** What is the difference between `[x * 2 for x in range(1000)]` and `(x * 2 for x in range(1000))`? When would you choose one over the other?

**Question 8:** Write an iterator class (not a generator) called `RepeatWord` that takes a word and a count, and yields that word `count` times. For example, `RepeatWord("hello", 3)` should produce `"hello"`, `"hello"`, `"hello"`. Include `__iter__` and `__next__`.

---

## Answers to Practice Questions

**Answer 1:** An iterator is something that gives you items one at a time and remembers its position. For example, imagine a playlist on your phone. Each time you tap "next song," it plays the next track. It remembers which song you are on and moves forward. You do not have to listen to all songs at once -- you get them one by one. That is how an iterator works. (Any reasonable analogy that shows one-at-a-time delivery and remembering position counts.)

**Answer 2:** The two methods are `__iter__()` and `__next__()`. `__iter__()` returns the iterator object itself -- it tells Python "you can iterate over me." `__next__()` returns the next item in the sequence. When there are no more items, `__next__()` raises `StopIteration` to signal that iteration is complete.

**Answer 3:**

```python
text: str = "hello"
iterator = iter(text)

while True:
    try:
        letter: str = next(iterator)
        print(letter)
    except StopIteration:
        break
```

**Answer 4:** `return` ends the function completely. All local variables are thrown away, and the function is done. `yield` pauses the function temporarily. All local variables are saved, and the function's position is remembered. Next time you ask for a value, the function resumes right where it left off with all its variables intact.

**Answer 5:**

```python
def even_numbers(limit: int):
    current: int = 2
    while current <= limit:
        yield current
        current += 2

for number in even_numbers(10):
    print(number)
# 2
# 4
# 6
# 8
# 10
```

**Answer 6:** Generators are useful for large data because they only create one item at a time, so they barely use any memory. Think of it like a library. A list is like photocopying every book in the library and bringing all the copies to your desk. A generator is like checking out one book at a time, reading it, returning it, and then getting the next one. You do not need a huge desk (memory) because you only have one book at a time. For millions of items, this difference matters -- a list might crash your program, but a generator handles it with ease.

**Answer 7:** `[x * 2 for x in range(1000)]` is a list comprehension that creates a list of 1000 numbers in memory all at once. `(x * 2 for x in range(1000))` is a generator expression that creates numbers one at a time and barely uses any memory. Choose the list comprehension when you need to access items by index, loop through them multiple times, or the data is small. Choose the generator expression when you are processing large amounts of data and only need to go through it once, or when you are passing it directly to a function like `sum()` or `max()`.

**Answer 8:**

```python
class RepeatWord:
    def __init__(self, word: str, count: int) -> None:
        self.word: str = word
        self.count: int = count
        self._times_yielded: int = 0

    def __iter__(self) -> "RepeatWord":
        self._times_yielded = 0
        return self

    def __next__(self) -> str:
        if self._times_yielded >= self.count:
            raise StopIteration
        self._times_yielded += 1
        return self.word

repeater: RepeatWord = RepeatWord("hello", 3)
for word in repeater:
    print(word)
# hello
# hello
# hello
```

---

**Previous:** [[wiki:python-jr-special-methods]] | **Next:** [[wiki:python-jr-comprehensions]]
