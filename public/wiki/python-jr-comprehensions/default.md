# Comprehensions -- Building Collections in One Line

## What Is a Comprehension?

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a conveyor belt in a toy factory, picking up plain wooden blocks from one bin and placing painted, decorated blocks into a new bin on the other side. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

You already know how to build a new list by going through items one at a time with a loop. You start with an empty list, loop through your items, maybe check a condition, and append each result. You have done this many times by now.

A **comprehension** is a shortcut for that whole pattern. Instead of writing three or four lines, you write it all in one line. Think of it like a sentence that says: **"Give me [this] for each [item] in [collection] if [condition]."**

But before you learn the shortcut, you need to see the long way side by side. That way, the shortcut makes total sense.

---

## The Long Way: Loop and Append

Let's say you have a list of numbers and you want to create a new list where every number is doubled. Here is how you would do it with a loop.

Open your editor. Type this. Run it.

```python
numbers: list[int] = [1, 2, 3, 4, 5]
doubled: list[int] = []

number: int
for number in numbers:
    doubled.append(number * 2)

print(doubled)  # [2, 4, 6, 8, 10]
```

Here is what happened step by step:

1. You started with an empty list called `doubled`.
2. You went through each `number` in the `numbers` list.
3. For each number, you multiplied it by 2 and added the result to `doubled`.
4. When the loop finished, `doubled` had all the new values.

This works perfectly. But it takes several lines for something pretty simple.

---

## The Shortcut: List Comprehension

A list comprehension does the exact same thing in one line.

Open your editor. Type this. Run it.

```python
numbers: list[int] = [1, 2, 3, 4, 5]
doubled: list[int] = [number * 2 for number in numbers]

print(doubled)  # [2, 4, 6, 8, 10]
```

Same result! Read it like a sentence: "A list of `number * 2` for each `number` in `numbers`."

The pattern is always:

```
[expression for variable in collection]
```

- **expression** -- what you want each item to become (like `number * 2`)
- **variable** -- the name you give to each item as you go through the collection
- **collection** -- the data you are looping through

---

## Walking Through It Step by Step

Let's slow down and see exactly what Python does when it reads `[number * 2 for number in numbers]` where `numbers` is `[1, 2, 3, 4, 5]`.

1. Python starts with `number = 1`. It calculates `1 * 2 = 2`. It puts `2` in the new list.
2. Next, `number = 2`. It calculates `2 * 2 = 4`. It puts `4` in the new list.
3. Next, `number = 3`. It calculates `3 * 2 = 6`. It puts `6` in the new list.
4. Next, `number = 4`. It calculates `4 * 2 = 8`. It puts `8` in the new list.
5. Next, `number = 5`. It calculates `5 * 2 = 10`. It puts `10` in the new list.
6. Done! The result is `[2, 4, 6, 8, 10]`.

It is the exact same steps as the loop version, just written more compactly.

---

## Side-by-Side Comparison

Here is another example so you can see both ways together. Let's make a list of the lengths of some words.

```python
words: list[str] = ["cat", "elephant", "dog", "butterfly"]

# The long way
lengths_long: list[int] = []
word: str
for word in words:
    lengths_long.append(len(word))

# The shortcut
lengths_short: list[int] = [len(word) for word in words]

print(lengths_long)   # [3, 8, 3, 9]
print(lengths_short)  # [3, 8, 3, 9]
```

Both produce the exact same result. The comprehension is just a shorter way to write the same idea.

---

## Filtering with If

![A flat vector illustration in a children's educational book style showing Byte the robot sorting colorful marbles on a table, putting the big ones into a special jar and leaving the small ones behind. A sign shows a simple rule: only big marbles allowed. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Sometimes you do not want every item. You only want items that pass a test. You can add an `if` at the end of a comprehension to filter.

Open your editor. Type this. Run it.

```python
numbers: list[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Only keep numbers bigger than 5
big_numbers: list[int] = [n for n in numbers if n > 5]

print(big_numbers)  # [6, 7, 8, 9, 10]
```

Read it like a sentence: "A list of `n` for each `n` in `numbers`, but only if `n` is greater than 5."

Here is the same thing written the long way:

```python
numbers: list[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

big_numbers: list[int] = []
n: int
for n in numbers:
    if n > 5:
        big_numbers.append(n)

print(big_numbers)  # [6, 7, 8, 9, 10]
```

The pattern with filtering:

```
[expression for variable in collection if condition]
```

---

## Transforming and Filtering Together

You can change items AND filter at the same time. Let's get the squares of only the even numbers.

Open your editor. Type this. Run it.

```python
numbers: list[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Square only the even numbers
even_squares: list[int] = [n * n for n in numbers if n % 2 == 0]

print(even_squares)  # [4, 16, 36, 64, 100]
```

Read it: "A list of `n * n` for each `n` in `numbers`, but only if `n` is even."

Here is another example -- take a list of words, keep only the long ones, and make them uppercase:

```python
words: list[str] = ["hi", "hello", "hey", "greetings", "yo", "welcome"]

long_upper: list[str] = [word.upper() for word in words if len(word) > 3]

print(long_upper)  # ['HELLO', 'GREETINGS', 'WELCOME']
```

---

## Dict Comprehensions

The same shortcut works for building dictionaries! Instead of square brackets `[]`, you use curly braces `{}` and you write both a key and a value separated by a colon.

Open your editor. Type this. Run it.

```python
names: list[str] = ["Alice", "Bob", "Charlie"]

# Map each name to its length
name_lengths: dict[str, int] = {name: len(name) for name in names}

print(name_lengths)  # {'Alice': 5, 'Bob': 3, 'Charlie': 7}
```

Read it: "A dictionary where each `name` maps to `len(name)`, for each `name` in `names`."

The pattern:

```
{key_expression: value_expression for variable in collection}
```

Here is the long way for comparison:

```python
names: list[str] = ["Alice", "Bob", "Charlie"]

name_lengths: dict[str, int] = {}
name: str
for name in names:
    name_lengths[name] = len(name)

print(name_lengths)  # {'Alice': 5, 'Bob': 3, 'Charlie': 7}
```

You can filter dict comprehensions too:

```python
scores: dict[str, int] = {"Alice": 92, "Bob": 67, "Charlie": 85, "Diana": 44}

# Only keep students who scored above 70
passing: dict[str, int] = {name: score for name, score in scores.items() if score > 70}

print(passing)  # {'Alice': 92, 'Charlie': 85}
```

---

## Set Comprehensions

Sets also get their own comprehension. It uses curly braces `{}` like a dictionary, but without the colon. And because it is a set, duplicates are automatically removed!

Open your editor. Type this. Run it.

```python
words: list[str] = ["apple", "banana", "cherry", "avocado", "blueberry", "apricot"]

# Get the unique first letters
first_letters: set[str] = {word[0] for word in words}

print(first_letters)  # {'a', 'b', 'c'}
```

Notice that "apple," "avocado," and "apricot" all start with "a," but "a" only appears once in the set. That is what sets do -- no duplicates.

Another example:

```python
numbers: list[int] = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

unique_squares: set[int] = {n * n for n in numbers}

print(unique_squares)  # {1, 4, 9, 16}
```

Even though the number 3 appears three times, `3 * 3 = 9` only shows up once in the set.

---

## When to Use Comprehensions and When NOT To

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a crossroads with two paths: one short and straight path labeled with a simple arrow, and one longer winding path with multiple turns. Byte is holding a map and thinking about which path to take. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Comprehensions are great, but they are not always the best choice. Here is a simple guide:

**Use a comprehension when:**
- You are building a new list, dict, or set from existing data
- The transformation is simple -- one calculation per item
- The filter is simple -- one yes/no check
- You can read and understand it right away

**Use a regular loop when:**
- The logic has multiple steps inside the loop
- You need to print things, write to files, or do other actions (not just building a collection)
- The comprehension would be really long and hard to read
- You need to use `break` or `continue`
- You spend more than a few seconds figuring out how to write it as a comprehension

```python
# GOOD comprehension -- simple and clear
names: list[str] = ["alice", "bob", "charlie"]
upper_names: list[str] = [name.upper() for name in names]

# BAD -- too complicated, use a regular loop instead
# result = [transform(x) for x in data if validate(x) for y in x.items() if check(y)]

# Better as a regular loop:
result: list[str] = []
item: str
for item in data:
    if validate(item):
        sub_item: str
        for sub_item in item.items():
            if check(sub_item):
                result.append(transform(sub_item))
```

If a comprehension makes you stop and think hard about what it does, that is a sign you should use a regular loop instead.

---

## Nested Comprehensions (Briefly)

You can put a comprehension inside another comprehension, but this can get confusing fast. Here is one useful example: flattening a list of lists into one flat list.

```python
matrix: list[list[int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

flat: list[int] = [item for row in matrix for item in row]

print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Read it left to right: "For each `row` in `matrix`, for each `item` in `row`, give me `item`."

Here is the same thing with regular loops:

```python
matrix: list[list[int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

flat: list[int] = []
row: list[int]
for row in matrix:
    item: int
    for item in row:
        flat.append(item)

print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Nested comprehensions can get really hard to read. If you need more than two `for` parts or multiple `if` parts, just use regular loops. Your future self will thank you.

---

## Comprehensions vs Generator Expressions

You learned about generators in the previous lesson ([[wiki:python-jr-iterators-generators]]). There is a close connection here.

- Square brackets `[]` make a **list** -- all items are created right away and stored in memory.
- Parentheses `()` make a **generator expression** -- items are created one at a time, only when needed.

```python
# List comprehension -- creates the entire list in memory
big_list: list[int] = [n * 2 for n in range(1000000)]

# Generator expression -- creates items one at a time
big_gen = (n * 2 for n in range(1000000))
```

If you only need to go through the items once (like adding them up), a generator expression saves memory because it does not build the whole list:

```python
# No need to build a giant list just to add things up
total: int = sum(n * 2 for n in range(1000000))

print(total)  # 999999000000
```

When you pass a generator expression directly into a function like `sum()`, you do not need extra parentheses. The function's own parentheses are enough.

---

## Common Mistakes

1. **Making comprehensions too complicated.** If your comprehension has multiple `for` parts, multiple `if` parts, or a long expression, break it into a regular loop. Code is read much more often than it is written.

2. **Forgetting type hints on the result.** Always label the variable that holds the comprehension result. `squares: list[int] = [...]` tells the reader exactly what they are looking at.

3. **Using comprehensions for actions instead of building collections.** Do not write `[print(x) for x in data]`. This creates a useless list of `None` values. Use a regular loop when you want to do something (like printing) rather than build something:

```python
# Wrong -- creates a useless list
[print(x) for x in data]

# Right -- use a loop for actions
item: int
for item in data:
    print(item)
```

4. **Mixing up set and dict comprehensions.** `{x for x in data}` makes a **set**. `{x: y for x, y in pairs}` makes a **dictionary**. The colon `:` is what makes it a dictionary.

---

![A flat vector illustration in a children's educational book style showing Byte the robot proudly displaying three colorful containers: a list shown as a numbered row of boxes, a dictionary shown as labeled drawers, and a set shown as a bag of unique colored gems. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

## Practice Questions

Try answering these on your own before looking at the answers at the bottom of the page.

**1.** What is the general pattern (structure) of a list comprehension?

**2.** Convert this loop into a list comprehension:

```python
result: list[int] = []
i: int
for i in range(8):
    result.append(i * 3)
```

**3.** Convert this comprehension back into a regular loop:

```python
lengths: list[int] = [len(word) for word in ["hello", "world", "python"]]
```

**4.** Write a list comprehension that takes a list of numbers from 1 to 20 and keeps only the ones divisible by 3. Include type hints.

**5.** Write a dict comprehension that takes a list of words `["cat", "elephant", "dog"]` and creates a dictionary mapping each word to its length. Include type hints.

**6.** What is the difference between `[x * 2 for x in numbers]` and `(x * 2 for x in numbers)`? When would you use each one?

**7.** Write a set comprehension that takes a list of words and collects all the unique last letters. Include type hints.

**8.** Look at this comprehension. Should it stay as a comprehension, or should it be rewritten as a regular loop? Explain why.

```python
result = [x + y for x in range(10) if x > 3 for y in range(10) if y < 7 if (x + y) % 2 == 0]
```

---

**Previous:** [[wiki:python-jr-iterators-generators]] | **Next:** [[wiki:python-jr-decorators-closures]]

---

## Answers to Practice Questions

**1.** The general pattern is: `[expression for variable in collection]`. With filtering, it becomes: `[expression for variable in collection if condition]`. The expression is what you want each item to become, the variable is the name for each item, and the collection is where the items come from.

**2.**

```python
result: list[int] = [i * 3 for i in range(8)]
```

**3.**

```python
words: list[str] = ["hello", "world", "python"]
lengths: list[int] = []
word: str
for word in words:
    lengths.append(len(word))
```

**4.**

```python
divisible_by_3: list[int] = [n for n in range(1, 21) if n % 3 == 0]
# Result: [3, 6, 9, 12, 15, 18]
```

**5.**

```python
words: list[str] = ["cat", "elephant", "dog"]
word_lengths: dict[str, int] = {word: len(word) for word in words}
# Result: {'cat': 3, 'elephant': 8, 'dog': 3}
```

**6.** Square brackets `[x * 2 for x in numbers]` create a **list** -- all the doubled numbers are calculated right away and stored in memory. Parentheses `(x * 2 for x in numbers)` create a **generator expression** -- the doubled numbers are calculated one at a time, only when you ask for them. Use a list when you need to access the items multiple times or check the length. Use a generator when you only need to go through the items once, especially if there are a lot of them (to save memory).

**7.**

```python
words: list[str] = ["apple", "banana", "cherry", "orange", "grape"]
last_letters: set[str] = {word[-1] for word in words}
# Result: {'e', 'a', 'y'}  (order may vary)
```

**8.** It should definitely be rewritten as a regular loop. It has two `for` parts and three `if` conditions, which makes it very hard to read and understand at a glance. Here it is as a loop:

```python
result: list[int] = []
x: int
for x in range(10):
    if x > 3:
        y: int
        for y in range(10):
            if y < 7:
                if (x + y) % 2 == 0:
                    result.append(x + y)
```

The loop version is longer, but you can follow each step clearly. When comprehensions get this complicated, they stop being a helpful shortcut and start being a confusing puzzle.
