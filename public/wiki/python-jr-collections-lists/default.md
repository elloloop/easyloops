# Lists -- Keeping a Group of Things Together

Up until now, every variable you have used holds just **one** thing: one number, one piece of text, one True/False value. But what if you need to keep track of a whole bunch of things? That is where **collections** come in.

A **collection** is a variable that holds many items instead of just one. Think of it this way:

- A single variable is like **one toy** sitting on your desk.
- A collection is like a **toy box** full of toys.

The most common collection in Python is the **list**. This page teaches you everything you need to know about lists.

![A flat vector illustration in a children's educational book style showing a toy box overflowing with colorful toys like teddy bears, cars, and building blocks. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Creating a List

A list is written with **square brackets** `[ ]` and the items inside are separated by **commas**:

```python
my_toys: list[str] = ["teddy", "car", "blocks"]
```

Let's break that down:
- `my_toys` -- the name of the variable.
- `list[str]` -- this tells Python "this is a list, and every item inside is a string (text)."
- `["teddy", "car", "blocks"]` -- the actual list with three items.

You can make lists of any type:

```python
# A list of whole numbers
scores: list[int] = [95, 87, 100, 73, 88]

# A list of decimal numbers
prices: list[float] = [2.99, 5.50, 1.25]

# A list of True/False values
answers: list[bool] = [True, False, True, True]

# An empty list (nothing in it yet)
empty: list[str] = []
```

---

## Accessing Items by Position (Index)

Every item in a list has a **position number**, called an **index**. Here is the important part: **positions start at 0, not 1!**

Think of an apartment building where the ground floor is floor 0:

| Index | Item     |
|-------|----------|
| 0     | "teddy"  |
| 1     | "car"    |
| 2     | "blocks" |

To get an item, put the index in square brackets after the list name:

```python
my_toys: list[str] = ["teddy", "car", "blocks"]

print(my_toys[0])  # teddy
print(my_toys[1])  # car
print(my_toys[2])  # blocks
```

If you try to use an index that does not exist, Python gives you an error:

```python
print(my_toys[5])  # ERROR! There is no item at position 5.
```

### Why Does It Start at 0?

This confuses almost everyone at first. Just remember: the first item is at position 0, the second item is at position 1, and so on. The position is always **one less** than what you might expect.

If a list has 3 items, the valid positions are 0, 1, and 2.

---

## Negative Indexing -- Counting from the End

Python has a neat trick: you can use **negative numbers** to count from the end of the list.

- `-1` means the **last** item.
- `-2` means the **second to last** item.
- `-3` means the **third to last** item.

```python
colors: list[str] = ["red", "green", "blue", "yellow"]

print(colors[-1])  # yellow (last)
print(colors[-2])  # blue (second to last)
print(colors[-3])  # green (third to last)
```

This is very handy when you want the last item and you don't know (or don't want to count) how many items are in the list.

---

## `len()` -- How Many Items?

The `len()` function (short for "length") tells you how many items are in a list:

```python
fruits: list[str] = ["apple", "banana", "cherry", "date"]
print(len(fruits))  # 4
```

An empty list has a length of 0:

```python
empty: list[int] = []
print(len(empty))  # 0
```

**Careful:** If a list has 4 items, the last valid index is 3 (because we start counting at 0). The last valid index is always `len(my_list) - 1`.

---

## Changing Items -- Lists Are Mutable

**Mutable** means "can be changed." Lists are mutable -- you can rearrange your toy box whenever you want!

To change an item, just assign a new value to that position:

```python
my_toys: list[str] = ["teddy", "car", "blocks"]
print(my_toys)  # ["teddy", "car", "blocks"]

my_toys[1] = "puzzle"
print(my_toys)  # ["teddy", "puzzle", "blocks"]
```

We replaced the item at position 1 ("car") with "puzzle".

![A flat vector illustration in a children's educational book style showing numbered shelves in a bookcase with items being swapped and rearranged. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Adding Items

### `append()` -- Add to the End

The `append()` method adds a new item to the **end** of the list:

```python
pets: list[str] = ["cat", "dog"]
pets.append("hamster")
print(pets)  # ["cat", "dog", "hamster"]
```

### `insert()` -- Add at a Specific Position

The `insert()` method lets you choose **where** to put the new item. You give it the position number and the item:

```python
pets: list[str] = ["cat", "dog", "hamster"]
pets.insert(1, "fish")
print(pets)  # ["cat", "fish", "dog", "hamster"]
```

The `"fish"` was inserted at position 1, and everything after it shifted over to make room.

---

## Removing Items

### `remove()` -- Remove by Value

If you know the **value** of the item you want to get rid of, use `remove()`:

```python
pets: list[str] = ["cat", "fish", "dog", "hamster"]
pets.remove("fish")
print(pets)  # ["cat", "dog", "hamster"]
```

If the value is not in the list, Python gives you an error. If there are duplicates, `remove()` only removes the **first** one it finds.

### `pop()` -- Remove by Position

If you know the **position** of the item, use `pop()`. It removes the item AND gives it back to you:

```python
pets: list[str] = ["cat", "dog", "hamster"]
removed: str = pets.pop(1)
print(removed)  # dog
print(pets)     # ["cat", "hamster"]
```

If you call `pop()` with no number, it removes the **last** item:

```python
pets: list[str] = ["cat", "dog", "hamster"]
last: str = pets.pop()
print(last)  # hamster
print(pets)  # ["cat", "dog"]
```

---

## Slicing -- Grabbing a Section

**Slicing** lets you grab a piece of a list. You use the format `my_list[start:stop]`:

```python
letters: list[str] = ["a", "b", "c", "d", "e"]

print(letters[1:3])   # ["b", "c"]
print(letters[0:2])   # ["a", "b"]
print(letters[2:5])   # ["c", "d", "e"]
```

Just like `range()`, the **start** is included but the **stop** is NOT. So `letters[1:3]` gives you positions 1 and 2 (but not 3).

### Handy Shortcuts

```python
letters: list[str] = ["a", "b", "c", "d", "e"]

# From the beginning up to position 3
print(letters[:3])    # ["a", "b", "c"]

# From position 2 to the end
print(letters[2:])    # ["c", "d", "e"]

# A copy of the entire list
print(letters[:])     # ["a", "b", "c", "d", "e"]
```

---

## Looping Through Lists

You learned about loops in [[wiki:python-jr-loops]]. Loops and lists go together perfectly!

### Using a `for` Loop (Most Common)

```python
fruits: list[str] = ["apple", "banana", "cherry"]

for fruit in fruits:
    print("I like " + fruit)
```

Output:
```
I like apple
I like banana
I like cherry
```

### Using a `while` Loop

```python
fruits: list[str] = ["apple", "banana", "cherry"]
i: int = 0

while i < len(fruits):
    print("I like " + fruits[i])
    i = i + 1
```

This gives the same output. The `for` version is simpler, but the `while` version is useful when you need more control over the index.

### Using `enumerate()` to Get Position and Value

```python
fruits: list[str] = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(str(index) + ". " + fruit)
```

Output:
```
0. apple
1. banana
2. cherry
```

---

## Sorting

### `sort()` -- Sort the List Itself

The `sort()` method rearranges the list in order. It **changes** the original list:

```python
numbers: list[int] = [5, 2, 8, 1, 9]
numbers.sort()
print(numbers)  # [1, 2, 5, 8, 9]
```

For text, it sorts alphabetically:

```python
names: list[str] = ["Charlie", "Alice", "Bob"]
names.sort()
print(names)  # ["Alice", "Bob", "Charlie"]
```

To sort in reverse (biggest to smallest, or Z to A):

```python
numbers: list[int] = [5, 2, 8, 1, 9]
numbers.sort(reverse=True)
print(numbers)  # [9, 8, 5, 2, 1]
```

### `sorted()` -- Get a New Sorted List

If you want to keep the original list unchanged, use the `sorted()` function instead. It gives you a **new** sorted list:

```python
original: list[int] = [5, 2, 8, 1, 9]
ordered: list[int] = sorted(original)
print(original)  # [5, 2, 8, 1, 9] (unchanged!)
print(ordered)   # [1, 2, 5, 8, 9] (new sorted list)
```

---

## Copying Lists -- Watch Out for This Trap!

Here is a trap that catches almost everyone the first time. Look at this code:

```python
a: list[int] = [1, 2, 3]
b = a
b.append(4)

print(a)  # [1, 2, 3, 4]  -- Wait, we only changed b!
print(b)  # [1, 2, 3, 4]
```

When you write `b = a`, you are NOT making a copy. You are giving the **same** list a second name. Both `a` and `b` point to the exact same list in memory. Changing one changes the other.

Think of it like this: you and your friend both have a key to the same locker. If your friend puts something in the locker, you will see it too.

### How to Actually Make a Copy

Use slicing to make a real copy:

```python
a: list[int] = [1, 2, 3]
b: list[int] = a[:]       # This makes a copy!
b.append(4)

print(a)  # [1, 2, 3]     -- a is unchanged!
print(b)  # [1, 2, 3, 4]  -- only b has the extra item
```

You can also use the `list()` function:

```python
a: list[int] = [1, 2, 3]
b: list[int] = list(a)    # Also makes a copy
```

![A flat vector illustration in a children's educational book style showing two lockers side by side, one being a true copy and one sharing a connection string to the same locker. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Building Lists in Loops

A very common pattern is to start with an **empty list** and add items to it inside a loop.

### Example: Collecting Even Numbers

```python
even_numbers: list[int] = []

for num in range(1, 21):
    if num % 2 == 0:
        even_numbers.append(num)

print(even_numbers)  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

Remember from [[wiki:python-jr-operators]]: the `%` operator gives you the remainder after division. If `num % 2 == 0`, the number is even.

### Example: Doubling Every Number

```python
originals: list[int] = [3, 7, 11, 2]
doubled: list[int] = []

for num in originals:
    doubled.append(num * 2)

print(doubled)  # [6, 14, 22, 4]
```

---

## Common Patterns

### Finding the Biggest Item

```python
temperatures: list[int] = [72, 85, 63, 91, 78]
biggest: int = temperatures[0]  # Start by assuming the first one is the biggest

for temp in temperatures:
    if temp > biggest:
        biggest = temp

print("Hottest: " + str(biggest))  # Hottest: 91
```

We start by assuming the first item is the biggest. Then we check every item -- if we find a bigger one, we update `biggest`.

### Filtering (Keeping Only Some Items)

```python
ages: list[int] = [5, 12, 17, 8, 21, 15, 3]
teenagers: list[int] = []

for age in ages:
    if age >= 13 and age <= 19:
        teenagers.append(age)

print(teenagers)  # [17, 15]
```

### Transforming (Changing Every Item)

```python
names: list[str] = ["alice", "bob", "charlie"]
upper_names: list[str] = []

for name in names:
    upper_names.append(name.upper())

print(upper_names)  # ["ALICE", "BOB", "CHARLIE"]
```

The `.upper()` method turns text into all capital letters.

---

## Quick Summary

| Operation             | Code                            | What it does                        |
|-----------------------|---------------------------------|-------------------------------------|
| Create                | `x: list[int] = [1, 2, 3]`     | Make a new list                     |
| Access                | `x[0]`                         | Get item at position 0              |
| Last item             | `x[-1]`                        | Get the last item                   |
| Length                | `len(x)`                       | How many items                      |
| Change                | `x[0] = 99`                    | Replace item at position 0          |
| Add to end            | `x.append(4)`                  | Add 4 to the end                    |
| Insert                | `x.insert(1, 99)`              | Put 99 at position 1                |
| Remove by value       | `x.remove(2)`                  | Remove the first 2 found            |
| Remove by position    | `x.pop(1)`                     | Remove and return item at position 1|
| Slice                 | `x[1:3]`                       | Get items from position 1 to 2      |
| Sort                  | `x.sort()`                     | Sort the list (changes it)          |
| Sorted copy           | `sorted(x)`                    | Get a new sorted list               |
| Copy                  | `x[:]` or `list(x)`            | Make a real copy                    |
| Loop                  | `for item in x:`               | Go through each item                |

---

## Practice Questions

**1.** Given this list:

```python
animals: list[str] = ["cat", "dog", "fish", "bird", "hamster"]
```

What does each of these print?
- `animals[0]`
- `animals[3]`
- `animals[-1]`
- `animals[-2]`
- `len(animals)`

**2.** Write code that creates a list of your 4 favorite foods and then prints each one on its own line using a `for` loop.

**3.** What is wrong with this code?

```python
colors: list[str] = ["red", "blue", "green"]
print(colors[3])
```

**4.** Write code that starts with the list `[10, 20, 30, 40, 50]` and:
- Changes the item at position 2 to `99`
- Adds `60` to the end
- Removes `20` from the list
- Prints the final list

**5.** What will `a` and `b` look like after this code runs? Explain why.

```python
a: list[int] = [1, 2, 3]
b = a
b[0] = 99
```

**6.** Write code that takes the list `[4, 7, 2, 9, 1, 5, 8]` and builds a new list containing only the numbers greater than 5. Print the new list.

**7.** Write code that takes the list `[3, 1, 4, 1, 5, 9, 2, 6]` and finds the smallest number in it using a loop. Do NOT use the built-in `min()` function -- write the loop yourself.

**8.** What does this slicing produce?

```python
letters: list[str] = ["a", "b", "c", "d", "e", "f"]
print(letters[2:5])
print(letters[:3])
print(letters[4:])
```

---

## Answers to Practice Questions

**Answer 1:**
- `animals[0]` prints `cat`
- `animals[3]` prints `bird`
- `animals[-1]` prints `hamster` (last item)
- `animals[-2]` prints `bird` (second to last)
- `len(animals)` prints `5`

**Answer 2:**
```python
foods: list[str] = ["pizza", "tacos", "pasta", "ice cream"]

for food in foods:
    print(food)
```

**Answer 3:**
The list has 3 items, so the valid positions are 0, 1, and 2. Position 3 does not exist! This will cause an `IndexError`. To get the last item, use `colors[2]` or `colors[-1]`.

**Answer 4:**
```python
numbers: list[int] = [10, 20, 30, 40, 50]
numbers[2] = 99
numbers.append(60)
numbers.remove(20)
print(numbers)  # [10, 99, 40, 50, 60]
```

**Answer 5:**
Both `a` and `b` will be `[99, 2, 3]`. When you write `b = a`, you do not make a copy -- both names point to the same list. Changing `b[0]` also changes `a[0]` because they are the same list. To avoid this, use `b = a[:]` to make a real copy.

**Answer 6:**
```python
numbers: list[int] = [4, 7, 2, 9, 1, 5, 8]
big_numbers: list[int] = []

for num in numbers:
    if num > 5:
        big_numbers.append(num)

print(big_numbers)  # [7, 9, 8]
```

**Answer 7:**
```python
numbers: list[int] = [3, 1, 4, 1, 5, 9, 2, 6]
smallest: int = numbers[0]

for num in numbers:
    if num < smallest:
        smallest = num

print("Smallest: " + str(smallest))  # Smallest: 1
```

**Answer 8:**
- `letters[2:5]` prints `["c", "d", "e"]` (positions 2, 3, 4)
- `letters[:3]` prints `["a", "b", "c"]` (from start up to position 2)
- `letters[4:]` prints `["e", "f"]` (from position 4 to the end)

---

![A flat vector illustration in a children's educational book style showing a neatly organized shelf with labeled containers holding sorted items. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

**Previous:** [[wiki:python-jr-loops]] | **Next:** [[wiki:python-jr-collections-dicts-sets]]
