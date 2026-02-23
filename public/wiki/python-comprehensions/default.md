# Comprehensions — Concise Collection Building

## The Pattern

You will constantly do this in programming: take a collection of data, transform each item (or filter out some items), and put the results into a new collection. This pattern is so common that Python has a shorthand for it called a **comprehension**.

But before we learn the shorthand, you need to understand the long way. That way the shorthand actually makes sense.

---

## Building a List: The While Loop Way

The most explicit way to build a new list from existing data is with a `while` loop. You start with an empty list, walk through your data, and append each result.

Open your editor. Type this. Run it.

```python
squares: list[int] = []
i: int = 0
while i < 10:
    squares.append(i * i)
    i += 1

print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

This works perfectly. You can see every step: initialize, check condition, compute, append, increment. Nothing hidden.

---

## Building a List: The For Loop Way

A `for` loop removes the manual counter management. The pattern is cleaner.

Open your editor. Type this. Run it.

```python
squares: list[int] = []

i: int
for i in range(10):
    squares.append(i * i)

print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Same result. Less boilerplate. No `i += 1`, no `while i < 10`. The `for` loop handles all of that.

---

## Building a List: The Comprehension Way

A list comprehension squeezes the entire pattern — create list, loop, append — into a single line.

Open your editor. Type this. Run it.

```python
squares: list[int] = [i * i for i in range(10)]

print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Same result. One line. Read it like English: "a list of `i * i` for each `i` in `range(10)`."

The structure is always: `[expression for variable in iterable]`

- **expression** — what you want each item to become
- **variable** — the name for the current item
- **iterable** — the data source you are looping over

---

## Side-by-Side Comparison

Let's see all three approaches together for the same task: doubling each number.

```python
# While loop
doubled_while: list[int] = []
i: int = 0
while i < 5:
    doubled_while.append(i * 2)
    i += 1

# For loop
doubled_for: list[int] = []
n: int
for n in range(5):
    doubled_for.append(n * 2)

# Comprehension
doubled_comp: list[int] = [n * 2 for n in range(5)]

print(doubled_while)  # [0, 2, 4, 6, 8]
print(doubled_for)    # [0, 2, 4, 6, 8]
print(doubled_comp)   # [0, 2, 4, 6, 8]
```

All three produce the same result. The comprehension is just the shortest way to express this pattern.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned list comprehensions in Python. Quiz me: (1) What is the general structure of a list comprehension? (2) Convert this while loop into a comprehension: start with empty list, loop i from 0 to 7, append i * 3. (3) Convert this comprehension back into a for loop: [len(word) for word in ['hello', 'world', 'python']]. (4) Write a comprehension that creates a list of the first 10 cube numbers (n^3). Include type hints."</div>
</div>

---

## Comprehensions with Filtering

You can add an `if` clause to only include items that pass a condition.

Open your editor. Type this. Run it.

```python
# Only even numbers
evens: list[int] = [i for i in range(20) if i % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Only positive numbers from a mixed list
numbers: list[int] = [-5, 3, -1, 7, -2, 9, 0]
positives: list[int] = [n for n in numbers if n > 0]
print(positives)  # [3, 7, 9]
```

The structure with filtering: `[expression for variable in iterable if condition]`

Here is the same thing with a while loop, so you can see what the comprehension is doing:

```python
evens: list[int] = []
i: int = 0
while i < 20:
    if i % 2 == 0:
        evens.append(i)
    i += 1
```

The comprehension packs all of this into one line: `[i for i in range(20) if i % 2 == 0]`.

---

## Transforming and Filtering Together

You can both transform and filter in one comprehension.

Open your editor. Type this. Run it.

```python
# Squares of only the even numbers
words: list[str] = ["hello", "hi", "hey", "greetings", "yo", "salutations"]
long_upper: list[str] = [word.upper() for word in words if len(word) > 3]
print(long_upper)  # ['HELLO', 'GREETINGS', 'SALUTATIONS']

# Square only the positive numbers
values: list[int] = [-3, -1, 0, 2, 5, -4, 8]
positive_squares: list[int] = [v * v for v in values if v > 0]
print(positive_squares)  # [4, 25, 64]
```

Read it: "the square of `v`, for each `v` in `values`, but only if `v` is greater than 0."

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on comprehensions with filtering: (1) Write a comprehension that takes a list of strings and keeps only those with length >= 5, converting them to lowercase. (2) Write a comprehension that takes numbers 1-50 and keeps only those divisible by both 3 and 5. (3) Convert this comprehension into an explicit for loop with an if statement: [x ** 2 for x in range(10) if x % 3 == 0]. (4) What is the structure of a filtered list comprehension? Include type hints on all answers."</div>
</div>

---

## Dict Comprehensions

The same pattern works for dictionaries. Instead of square brackets, you use curly braces and specify both a key and a value.

Open your editor. Type this. Run it.

```python
# Map each number to its square
square_map: dict[int, int] = {i: i * i for i in range(10)}
print(square_map)
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81}

# Map each word to its length
words: list[str] = ["apple", "banana", "cherry"]
word_lengths: dict[str, int] = {word: len(word) for word in words}
print(word_lengths)
# {'apple': 5, 'banana': 6, 'cherry': 6}
```

The structure: `{key_expression: value_expression for variable in iterable}`

You can filter too:

```python
# Only include words longer than 5 characters
words: list[str] = ["hi", "hello", "greetings", "yo", "welcome"]
long_words: dict[str, int] = {w: len(w) for w in words if len(w) > 5}
print(long_words)  # {'greetings': 9, 'welcome': 7}
```

### Swapping Keys and Values

A common use case — flip a dictionary so keys become values and values become keys:

```python
original: dict[str, int] = {"alice": 1, "bob": 2, "charlie": 3}
flipped: dict[int, str] = {v: k for k, v in original.items()}
print(flipped)  # {1: 'alice', 2: 'bob', 3: 'charlie'}
```

---

## Set Comprehensions

Sets work the same way — curly braces but without the key-value pair. Duplicates are automatically removed.

Open your editor. Type this. Run it.

```python
# Get unique word lengths
words: list[str] = ["apple", "banana", "cherry", "date", "fig", "grape"]
unique_lengths: set[int] = {len(word) for word in words}
print(unique_lengths)  # {3, 4, 5, 6}

# Get unique first letters
first_letters: set[str] = {word[0] for word in words}
print(first_letters)  # {'a', 'b', 'c', 'd', 'f', 'g'}
```

The structure: `{expression for variable in iterable}`

Since it is a set, any duplicates are dropped. "apple" and "grape" both have length 5, but 5 only appears once in the set.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Quiz me on dict and set comprehensions: (1) Write a dict comprehension that maps each number from 1-5 to its cube. (2) Write a set comprehension that gets all unique vowels from a string. (3) Given a dict {'a': 1, 'b': 2, 'c': 3}, write a dict comprehension that doubles all values. (4) What is the difference between {x for x in data} and [x for x in data]? (5) Write a dict comprehension that filters a dict to only include entries where the value is greater than 10. Include type hints."</div>
</div>

---

## Nested Comprehensions

You can nest comprehensions to handle nested data. But be careful — this is where readability falls off a cliff.

Open your editor. Type this. Run it.

```python
# Flatten a list of lists
matrix: list[list[int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat: list[int] = [item for row in matrix for item in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Read the nested comprehension left to right: "for each `row` in `matrix`, for each `item` in `row`, give me `item`."

Here is the same thing as explicit loops:

```python
flat: list[int] = []
row: list[int]
for row in matrix:
    item: int
    for item in row:
        flat.append(item)
```

Another example — creating a multiplication table:

```python
table: list[list[int]] = [[i * j for j in range(1, 6)] for i in range(1, 6)]

row: list[int]
for row in table:
    print(row)
# [1, 2, 3, 4, 5]
# [2, 4, 6, 8, 10]
# [3, 6, 9, 12, 15]
# [4, 8, 12, 16, 20]
# [5, 10, 15, 20, 25]
```

### When Nested Comprehensions Become Unreadable

This is valid Python, but do not write code like this:

```python
# DON'T DO THIS — impossible to read
result: list[int] = [x + y for x in range(5) if x > 1 for y in range(5) if y > 2 if (x + y) % 2 == 0]
```

If your comprehension needs more than one `for` or one `if`, seriously consider using explicit loops instead. Your future self will thank you.

---

## When to Use Comprehensions vs Explicit Loops

Here is a simple decision guide:

**Use a comprehension when:**
- You are building a new collection from an existing one
- The transformation is simple — one expression
- The filter is simple — one condition
- You can read and understand it at a glance

**Use an explicit loop when:**
- The logic has multiple steps
- You need side effects (printing, writing to files, modifying external state)
- The comprehension would be longer than about 80 characters
- You need `break` or `continue`
- You cannot understand the comprehension at a glance

```python
# Good comprehension — simple and clear
names: list[str] = ["alice", "bob", "charlie"]
upper_names: list[str] = [name.upper() for name in names]

# Bad comprehension — too complex, use a loop instead
# result = [transform(x) for x in data if validate(x) for y in x.items() if check(y)]

# Better as an explicit loop:
result: list[str] = []
item: str
for item in data:
    if validate(item):
        sub_item: str
        for sub_item in item.items():
            if check(sub_item):
                result.append(transform(sub_item))
```

---

## Performance

Comprehensions are slightly faster than equivalent for loops. This is because Python can optimize the internal loop. But the difference is usually tiny — maybe 10-20% faster.

```python
import time

# Timing a for loop
start: float = time.time()
result_loop: list[int] = []
i: int
for i in range(1_000_000):
    result_loop.append(i * 2)
loop_time: float = time.time() - start

# Timing a comprehension
start = time.time()
result_comp: list[int] = [i * 2 for i in range(1_000_000)]
comp_time: float = time.time() - start

print(f"For loop: {loop_time:.4f}s")
print(f"Comprehension: {comp_time:.4f}s")
```

Open your editor. Type this. Run it. You will see the comprehension is faster, but not dramatically so.

**Readability matters more than performance in almost every case.** If a comprehension is harder to read, use a loop. The speed difference is not worth the confusion.

---

## Comprehension vs Generator Expression

Remember from the previous page: wrapping the expression in parentheses instead of brackets creates a generator, not a list.

```python
# List comprehension — creates entire list in memory
big_list: list[int] = [i * 2 for i in range(1_000_000)]

# Generator expression — produces values one at a time
big_gen = (i * 2 for i in range(1_000_000))

# If you just need to sum or find max, use a generator:
total: int = sum(i * 2 for i in range(1_000_000))
biggest: int = max(i * 2 for i in range(1_000_000))
```

When passing a generator expression directly to a function like `sum()` or `max()`, you do not need double parentheses. The function's own parentheses are enough.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Comprehensive quiz on comprehensions: (1) Write a list comprehension that takes a list of sentences and produces a list of word counts. (2) Write a dict comprehension from a list of tuples [('a', 1), ('b', 2)] into a dict. (3) Flatten this nested list with a comprehension: [[1, 2], [3, 4], [5, 6]]. (4) When should you NOT use a comprehension? Give two situations. (5) What is the difference between [x for x in data] and (x for x in data)? (6) Rewrite this comprehension as explicit loops: {word: len(word) for word in words if len(word) > 3}. Include type hints on everything."</div>
</div>

---

## Where People Go Wrong

1. **Overly complex comprehensions.** If a comprehension has multiple `for` clauses, multiple `if` clauses, or a complex expression, break it into an explicit loop. Code is read far more often than it is written.

2. **No type hints on the result.** Always annotate the variable holding the comprehension result. `squares: list[int] = [...]` tells the reader exactly what they are looking at.

3. **Using comprehensions for side effects.** Do not write `[print(x) for x in data]`. This creates a list of `None` values that you throw away. Use a regular loop for side effects:

```python
# Wrong — creates a useless list
[print(x) for x in data]

# Right — use a loop for side effects
item: int
for item in data:
    print(item)
```

4. **Forgetting that dict comprehensions need the colon.** `{x for x in data}` is a **set** comprehension. `{x: y for x, y in pairs}` is a **dict** comprehension. The colon makes the difference.

5. **Not knowing when to stop.** If you spend more than 30 seconds figuring out how to write a comprehension, that is a sign you should use an explicit loop instead.

---

**Previous:** [[wiki:python-iterators-generators]] | **Next:** [[wiki:python-decorators-closures]]