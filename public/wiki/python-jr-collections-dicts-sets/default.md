# Dictionaries and Sets -- Looking Things Up and Keeping Things Unique

In [[wiki:python-jr-collections-lists]] you learned about lists -- a collection where you look things up by **position number** (index). But sometimes, numbers are not the best way to find things. Sometimes you want to look things up by **name**.

Think about the contacts list on your phone. You do not think "I want contact number 47." You think "I want **Mom's** number." You look up the **name**, and you get the **phone number** back.

That is exactly what a **dictionary** does in Python!

Later on this page, you will also learn about **sets** -- a collection where every item is unique (no duplicates allowed).

![A flat vector illustration in a children's educational book style showing a phone contacts list with names on one side and phone numbers on the other side, connected by arrows. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The Problem: Looking Things Up by Name

Imagine you have three friends and their favorite colors:

- Alice likes blue
- Bob likes green
- Charlie likes red

You could store this in two lists:

```python
names: list[str] = ["Alice", "Bob", "Charlie"]
colors: list[str] = ["blue", "green", "red"]
```

To find Bob's favorite color, you would need to:
1. Find Bob's position in the `names` list (position 1).
2. Use that position to get the matching color from the `colors` list (`colors[1]`).

That works, but it is clumsy and easy to mess up. What if the lists get out of sync? A dictionary solves this problem beautifully.

---

## Creating a Dictionary

A dictionary is written with **curly braces** `{ }` and contains **key-value pairs** separated by commas. Each pair uses a **colon** `:` between the key and the value:

```python
favorite_colors: dict[str, str] = {
    "Alice": "blue",
    "Bob": "green",
    "Charlie": "red",
}
```

Let's break that down:
- `favorite_colors` -- the name of the variable.
- `dict[str, str]` -- this tells Python "this is a dictionary where the keys are strings and the values are also strings."
- `"Alice": "blue"` -- this is one **key-value pair**. `"Alice"` is the **key** (like a label), and `"blue"` is the **value** (the information attached to that label).

Think of a real dictionary (the book kind). You look up a **word** (the key) and get its **definition** (the value).

Here are more examples:

```python
# Keys are strings, values are integers
ages: dict[str, int] = {
    "Alice": 10,
    "Bob": 12,
    "Charlie": 11,
}

# Keys are strings, values are floats
prices: dict[str, float] = {
    "apple": 0.99,
    "banana": 0.59,
    "cherry": 3.49,
}

# An empty dictionary
empty: dict[str, str] = {}
```

---

## Accessing Values

To get a value from a dictionary, put the **key** in square brackets:

```python
favorite_colors: dict[str, str] = {
    "Alice": "blue",
    "Bob": "green",
    "Charlie": "red",
}

print(favorite_colors["Alice"])    # blue
print(favorite_colors["Charlie"])  # red
```

This is like saying: "Look up Alice in the dictionary and tell me her favorite color."

### What If the Key Does Not Exist?

If you try to look up a key that is not in the dictionary, Python gives you an error:

```python
print(favorite_colors["Diana"])  # ERROR! KeyError: 'Diana'
```

### The Safe Way: `.get()`

The `.get()` method lets you look up a key without crashing. If the key does not exist, it gives you a **default value** instead:

```python
color: str = favorite_colors.get("Diana", "unknown")
print(color)  # unknown
```

The second part, `"unknown"`, is what you get back if `"Diana"` is not in the dictionary. If you do not provide a default, `.get()` returns `None` (Python's way of saying "nothing").

```python
color = favorite_colors.get("Diana")
print(color)  # None
```

---

## Adding and Changing Values

To **add** a new key-value pair, just assign to a key that does not exist yet:

```python
favorite_colors: dict[str, str] = {
    "Alice": "blue",
    "Bob": "green",
}

# Add a new entry
favorite_colors["Diana"] = "purple"
print(favorite_colors)
# {"Alice": "blue", "Bob": "green", "Diana": "purple"}
```

To **change** an existing value, assign to a key that already exists:

```python
# Change Bob's favorite color
favorite_colors["Bob"] = "yellow"
print(favorite_colors["Bob"])  # yellow
```

The syntax is the same for adding and changing! If the key already exists, the old value is replaced. If it does not exist, a new pair is created.

![A flat vector illustration in a children's educational book style showing a filing cabinet with labeled drawers being opened and items placed inside or swapped out. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Removing Values

### `del` -- Delete by Key

```python
ages: dict[str, int] = {"Alice": 10, "Bob": 12, "Charlie": 11}

del ages["Bob"]
print(ages)  # {"Alice": 10, "Charlie": 11}
```

### `pop()` -- Remove and Get the Value Back

Just like with lists, `pop()` removes an item and gives you the value:

```python
ages: dict[str, int] = {"Alice": 10, "Bob": 12, "Charlie": 11}

bobs_age: int = ages.pop("Bob")
print(bobs_age)  # 12
print(ages)      # {"Alice": 10, "Charlie": 11}
```

You can also give `pop()` a default value in case the key does not exist:

```python
result: int = ages.pop("Diana", 0)
print(result)  # 0 (Diana was not in the dictionary, so we get the default)
```

---

## Checking If a Key Exists

Before looking something up, you might want to check if the key is in the dictionary. Use the `in` keyword:

```python
favorite_colors: dict[str, str] = {
    "Alice": "blue",
    "Bob": "green",
}

if "Alice" in favorite_colors:
    print("Alice's color is " + favorite_colors["Alice"])

if "Diana" in favorite_colors:
    print("Diana's color is " + favorite_colors["Diana"])
else:
    print("Diana is not in the dictionary.")
```

Output:
```
Alice's color is blue
Diana is not in the dictionary.
```

The `in` keyword checks the **keys**, not the values. So `"Alice" in favorite_colors` is `True`, but `"blue" in favorite_colors` is `False` (because `"blue"` is a value, not a key).

---

## Looping Through Dictionaries

You learned about loops in [[wiki:python-jr-loops]]. There are several ways to loop through a dictionary.

### Looping Through Keys

```python
ages: dict[str, int] = {"Alice": 10, "Bob": 12, "Charlie": 11}

for name in ages:
    print(name)
```

Output:
```
Alice
Bob
Charlie
```

By default, a `for` loop over a dictionary gives you the **keys**. You can also be explicit with `.keys()`:

```python
for name in ages.keys():
    print(name)
```

### Looping Through Values

```python
for age in ages.values():
    print(age)
```

Output:
```
10
12
11
```

### Looping Through Both Keys and Values

This is the most useful one. Use `.items()` to get both the key and the value:

```python
for name, age in ages.items():
    print(name + " is " + str(age) + " years old")
```

Output:
```
Alice is 10 years old
Bob is 12 years old
Charlie is 11 years old
```

Each time through the loop, `name` gets the key and `age` gets the value.

---

## Common Dictionary Patterns

### Counting Things

One of the most common uses of dictionaries is counting how many times something appears:

```python
votes: list[str] = ["cat", "dog", "cat", "fish", "dog", "cat", "dog", "dog"]
count: dict[str, int] = {}

for animal in votes:
    if animal in count:
        count[animal] = count[animal] + 1
    else:
        count[animal] = 1

print(count)  # {"cat": 3, "dog": 4, "fish": 1}
```

We start with an empty dictionary. For each vote, we check if the animal is already in the dictionary. If yes, add 1 to its count. If no, start its count at 1.

### Grouping Things

Group items into categories:

```python
words: list[str] = ["apple", "ant", "banana", "avocado", "blueberry"]
groups: dict[str, list[str]] = {}

for word in words:
    first_letter: str = word[0]
    if first_letter not in groups:
        groups[first_letter] = []
    groups[first_letter].append(word)

print(groups)
# {"a": ["apple", "ant", "avocado"], "b": ["banana", "blueberry"]}
```

Here the keys are letters and the values are lists! We group words by their first letter.

---

## Sets -- A Collection with No Duplicates

Now let's learn about **sets**. A set is like a list, but with one big rule: **every item must be unique -- no duplicates allowed!**

Think of a stamp collection. You would not put two identical stamps in your collection. If you already have a stamp, you skip it. That is how a set works.

### Creating a Set

A set is written with curly braces `{ }` (just like a dictionary, but without the colons):

```python
my_stamps: set[str] = {"rose", "eagle", "flag", "moon"}
print(my_stamps)
```

If you try to create a set with duplicates, Python automatically removes them:

```python
numbers: set[int] = {1, 2, 3, 2, 1, 4, 3}
print(numbers)  # {1, 2, 3, 4}
```

The duplicates are gone! Only unique values remain.

**Important:** To create an empty set, you must use `set()`, NOT `{}`. Curly braces with nothing inside create an empty *dictionary*, not an empty set:

```python
empty_set: set[str] = set()      # Correct: empty set
empty_dict: dict[str, str] = {}  # This is an empty dictionary
```

### Sets Have No Order

Unlike lists, sets do not have positions. You cannot do `my_set[0]` to get the first item. Items in a set have no fixed order.

![A flat vector illustration in a children's educational book style showing a stamp album with unique stamps of different designs, with a duplicate stamp being turned away at the entrance. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Adding and Removing Set Items

### Adding with `.add()`

```python
colors: set[str] = {"red", "blue"}
colors.add("green")
print(colors)  # {"red", "blue", "green"}

# Adding something that already exists does nothing
colors.add("red")
print(colors)  # {"red", "blue", "green"} (no change)
```

### Removing with `.remove()` and `.discard()`

```python
colors: set[str] = {"red", "blue", "green"}

colors.remove("blue")
print(colors)  # {"red", "green"}
```

If you try to `.remove()` something that is not in the set, you get an error. Use `.discard()` instead for a safe removal (it does nothing if the item is not there):

```python
colors.discard("yellow")  # No error even though "yellow" is not in the set
```

---

## Set Operations -- Combining and Comparing

This is where sets really shine. You can compare and combine sets in powerful ways.

Let's say you have two groups of friends:

```python
soccer_players: set[str] = {"Alice", "Bob", "Charlie", "Diana"}
chess_players: set[str] = {"Charlie", "Diana", "Eve", "Frank"}
```

### Union -- Everyone in Either Group (Combine Both)

"Who plays soccer OR chess (or both)?"

```python
all_players: set[str] = soccer_players | chess_players
print(all_players)
# {"Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"}
```

The `|` symbol means "union" (combine everything, but no duplicates). Charlie and Diana appear in both groups, but they show up only once in the union.

### Intersection -- Only People in BOTH Groups

"Who plays BOTH soccer AND chess?"

```python
both: set[str] = soccer_players & chess_players
print(both)
# {"Charlie", "Diana"}
```

The `&` symbol means "intersection" (only what they have in common).

### Difference -- In One Group but Not the Other

"Who plays soccer but NOT chess?"

```python
soccer_only: set[str] = soccer_players - chess_players
print(soccer_only)
# {"Alice", "Bob"}
```

The `-` symbol means "difference" (take away the ones that are also in the other group).

And the other direction:

```python
chess_only: set[str] = chess_players - soccer_players
print(chess_only)
# {"Eve", "Frank"}
```

### Quick Reference

| Operation      | Symbol | Meaning                           | Example Result         |
|---------------|--------|-----------------------------------|------------------------|
| Union         | `\|`   | Everything from both              | All 6 players          |
| Intersection  | `&`    | Only what is in both              | Charlie, Diana         |
| Difference    | `-`    | In first but not in second        | Alice, Bob             |

---

## Looping Through Sets

You can use a `for` loop to go through every item in a set, just like a list:

```python
fruits: set[str] = {"apple", "banana", "cherry"}

for fruit in fruits:
    print(fruit)
```

Remember: the order might not be what you expect, because sets do not keep items in any particular order.

---

## When to Use List vs. Dict vs. Set

Here is a simple guide to help you choose:

| Use a...       | When you need...                                        | Example                          |
|----------------|--------------------------------------------------------|----------------------------------|
| **List**       | An ordered collection where items can repeat            | A shopping list, a list of scores|
| **Dictionary** | To look things up by name (key-value pairs)             | A phone book, word definitions   |
| **Set**        | A collection where every item must be unique            | Unique visitors, unique tags     |

### Think of It This Way

- **List** = A line of people. They are in order. The same person can be in line twice.
- **Dictionary** = A phone book. You look up a name and get a number. Each name appears only once.
- **Set** = A guest list at a party. Each person can only be on the list once.

```python
# List: ordered, allows duplicates
shopping: list[str] = ["milk", "eggs", "milk", "bread"]

# Dict: look up by key, each key is unique
phone_book: dict[str, str] = {
    "Mom": "555-1234",
    "Dad": "555-5678",
}

# Set: unique items only, no order
visited_pages: set[str] = {"home", "about", "contact"}
```

---

## Quick Summary

### Dictionaries

| Operation           | Code                             | What it does                     |
|---------------------|----------------------------------|----------------------------------|
| Create              | `d: dict[str, int] = {"a": 1}`  | Make a new dictionary            |
| Access              | `d["a"]`                        | Get value for key "a"            |
| Safe access         | `d.get("a", 0)`                 | Get value or default if missing  |
| Add / Change        | `d["b"] = 2`                    | Add or update a key-value pair   |
| Remove              | `del d["a"]`                    | Remove key "a"                   |
| Remove and get      | `d.pop("a")`                    | Remove and return the value      |
| Check key           | `"a" in d`                      | True if "a" is a key             |
| Loop keys           | `for k in d:`                   | Go through each key              |
| Loop values         | `for v in d.values():`          | Go through each value            |
| Loop both           | `for k, v in d.items():`        | Go through keys and values       |

### Sets

| Operation           | Code                             | What it does                     |
|---------------------|----------------------------------|----------------------------------|
| Create              | `s: set[int] = {1, 2, 3}`      | Make a new set                   |
| Empty set           | `s: set[int] = set()`          | Make an empty set                |
| Add                 | `s.add(4)`                      | Add an item                      |
| Remove              | `s.remove(2)`                   | Remove an item (error if missing)|
| Safe remove         | `s.discard(2)`                  | Remove if present (no error)     |
| Union               | `a \| b`                        | Everything from both             |
| Intersection        | `a & b`                         | Only what is in both             |
| Difference          | `a - b`                         | In `a` but not in `b`           |
| Check membership    | `4 in s`                        | True if 4 is in the set          |

---

## Practice Questions

**1.** Create a dictionary called `pet_names` that maps these pets to their names:
- "dog" maps to "Buddy"
- "cat" maps to "Whiskers"
- "fish" maps to "Nemo"

Then print the name of the cat.

**2.** What is the difference between `my_dict["key"]` and `my_dict.get("key", "default")`? When would you use one over the other?

**3.** Given this dictionary:

```python
scores: dict[str, int] = {"Alice": 95, "Bob": 87, "Charlie": 92}
```

Write a loop that prints each person's name and score in this format:
```
Alice scored 95
Bob scored 87
Charlie scored 92
```

**4.** Write code that takes this list of words and counts how many times each word appears using a dictionary:

```python
words: list[str] = ["the", "cat", "sat", "on", "the", "mat", "the", "cat"]
```

The result should be: `{"the": 3, "cat": 2, "sat": 1, "on": 1, "mat": 1}`

**5.** Given these two sets:

```python
group_a: set[str] = {"Alice", "Bob", "Charlie", "Diana"}
group_b: set[str] = {"Charlie", "Diana", "Eve"}
```

Write code that prints:
- All people in either group (union)
- People in both groups (intersection)
- People only in group A (difference)

**6.** Which collection type (list, dictionary, or set) would you use for each of these? Explain why.
- The names of students in a class, where you need to keep track of the order they signed up.
- A collection of all the unique words used in a book.
- A way to look up a student's grade by their name.

**7.** What will this code print?

```python
inventory: dict[str, int] = {"apples": 5, "bananas": 3}
inventory["oranges"] = 7
inventory["apples"] = inventory["apples"] - 2
del inventory["bananas"]
print(inventory)
```

**8.** Write code that creates a set from the list `[1, 2, 2, 3, 3, 3, 4, 4, 4, 4]` and prints it. How many items will be in the set?

---

## Answers to Practice Questions

**Answer 1:**
```python
pet_names: dict[str, str] = {
    "dog": "Buddy",
    "cat": "Whiskers",
    "fish": "Nemo",
}
print(pet_names["cat"])  # Whiskers
```

**Answer 2:**
`my_dict["key"]` will crash with a `KeyError` if the key does not exist. `my_dict.get("key", "default")` will safely return `"default"` instead of crashing. Use `.get()` when you are not sure if the key exists. Use `[]` when you are certain the key exists and want to be alerted if it does not.

**Answer 3:**
```python
scores: dict[str, int] = {"Alice": 95, "Bob": 87, "Charlie": 92}

for name, score in scores.items():
    print(name + " scored " + str(score))
```

**Answer 4:**
```python
words: list[str] = ["the", "cat", "sat", "on", "the", "mat", "the", "cat"]
word_count: dict[str, int] = {}

for word in words:
    if word in word_count:
        word_count[word] = word_count[word] + 1
    else:
        word_count[word] = 1

print(word_count)
# {"the": 3, "cat": 2, "sat": 1, "on": 1, "mat": 1}
```

**Answer 5:**
```python
group_a: set[str] = {"Alice", "Bob", "Charlie", "Diana"}
group_b: set[str] = {"Charlie", "Diana", "Eve"}

# Union: all people
print(group_a | group_b)
# {"Alice", "Bob", "Charlie", "Diana", "Eve"}

# Intersection: in both groups
print(group_a & group_b)
# {"Charlie", "Diana"}

# Difference: only in group A
print(group_a - group_b)
# {"Alice", "Bob"}
```

**Answer 6:**
- **Student sign-up order:** Use a **list** because you need to keep the order they signed up. Lists are ordered.
- **Unique words in a book:** Use a **set** because you only want each word once (no duplicates), and you do not need to look up anything by name.
- **Student grades by name:** Use a **dictionary** because you want to look up a grade using the student's name as the key.

**Answer 7:**
```
{"apples": 3, "oranges": 7}
```
We added oranges (7), changed apples from 5 to 3 (subtracted 2), and deleted bananas.

**Answer 8:**
```python
numbers: set[int] = set([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
print(numbers)  # {1, 2, 3, 4}
```
The set will have **4** items. All duplicates are automatically removed, leaving only the unique values: 1, 2, 3, and 4.

---

![A flat vector illustration in a children's educational book style showing three different containers side by side representing list, dictionary, and set collections. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

**Previous:** [[wiki:python-jr-collections-lists]] | **Next:** [[wiki:python-jr-tuples-and-unpacking]]
