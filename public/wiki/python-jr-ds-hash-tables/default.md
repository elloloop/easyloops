# Hash Tables -- The Secret Behind Dictionaries

![A flat vector illustration in a children's educational book style showing Byte the robot standing in front of a large colorful filing cabinet with labeled drawers, placing a card into the correct drawer instantly while other cards wait nearby. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

You have been using Python dictionaries since Phase 2. You know how to store things by name and look them up instantly:

```python
phone_book: dict[str, str] = {
    "Mom": "555-1234",
    "Dad": "555-5678",
    "Grandma": "555-9999",
}
print(phone_book["Mom"])  # 555-1234 -- found instantly!
```

But have you ever wondered **how** the dictionary finds "Mom" so fast? If you had a million entries, it would still find "Mom" almost instantly. How is that possible?

The answer is a **hash table** -- and that is exactly what Python's `dict` is under the hood. In this lesson, you will build one from scratch and finally understand the magic.

---

## The Problem: Finding Things by Name

Think about looking up a word in a real paper dictionary. You do not start at page 1 and read every single word until you find it. That would take forever! Instead, you use the first letter to jump to roughly the right section, and then you narrow it down from there.

Now imagine something even better: a magical filing system where you say a name, and it **instantly** tells you exactly which drawer to look in. No searching, no scanning, no guessing. You go straight to the right spot.

That is what a hash table does.

### Why Not Just Use a List?

In a list, finding something means checking one item at a time. If you have a list of 1000 names, you might need to check all 1000 before finding the right one. That is slow!

In an array, you can jump to any position instantly -- but only if you know the **position number**. If you want to find "Mom," what position number is that? There is no obvious answer.

A hash table solves this by turning the name **into** a position number. The name "Mom" gets converted into a number like 7, and then the data is stored at position 7. When you want to look up "Mom" later, you convert the name to 7 again and go straight to position 7. Instant!

---

## What Is a Hash Function?

A **hash function** is the tool that converts a key (like a name) into a position number. Think of it as a magical translator that takes any word and turns it into a number.

```
"Mom"    --> hash function --> 7
"Dad"    --> hash function --> 3
"Grandma" --> hash function --> 11
```

Here is a simple hash function in Python. It adds up all the character values in a word and then uses the remainder when dividing by the table size:

```python
def simple_hash(key: str, table_size: int) -> int:
    """Turn a string into a position number."""
    total: int = 0
    for character in key:
        total += ord(character)  # ord() turns a letter into its number code
    return total % table_size    # % keeps the result within the table size
```

```python
print(simple_hash("Mom", 16))      # some number between 0 and 15
print(simple_hash("Dad", 16))      # a different number (hopefully!)
print(simple_hash("Grandma", 16))  # another different number
```

A good hash function has three important qualities:
1. **Same input, same output**: "Mom" must always give the same number. Every single time.
2. **Spreads things out**: Different keys should give different numbers as much as possible.
3. **Fast**: Computing the number should be quick.

Python has a built-in hash function called `hash()` that is much better than our simple one, but the idea is the same.

---

## What About Collisions?

Here is a problem. Our table might have 16 slots, but there are millions of possible names. Eventually, two different names will get the same position number. This is called a **collision**.

```
"Mom"   --> hash function --> 7
"Tom"   --> hash function --> 7   <-- Uh oh! Same position!
```

It is like two people being assigned to the same seat on a bus. We need a plan for handling this.

![A flat vector illustration in a children's educational book style showing Byte the robot looking at two colorful cards that both have arrows pointing to the same drawer in a filing cabinet, scratching its head while thinking of a solution. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

### Solution 1: Chaining

The most common solution is **chaining**. Instead of each slot holding just one item, each slot holds a **list** of items. If two keys get the same position, they both go into the same list.

```
Position 0: []
Position 1: []
Position 2: []
Position 3: [("Dad", "555-5678")]
Position 4: []
Position 5: []
Position 6: []
Position 7: [("Mom", "555-1234"), ("Tom", "555-4321")]  <-- both here!
...
```

When you look up "Mom," you:
1. Hash "Mom" to get position 7
2. Go to position 7
3. Look through the short list there to find the entry with the key "Mom"

If the hash function is good, each list is very short (usually just 0 or 1 items), so this is still very fast.

### Solution 2: Open Addressing

Another approach: if the slot is taken, just look at the **next** slot. And if that is taken, the next one after that. Keep going until you find an empty spot.

```
"Mom" hashes to 7 --> position 7 is empty --> store "Mom" at 7
"Tom" hashes to 7 --> position 7 is taken --> try 8 --> empty! --> store "Tom" at 8
```

This is simpler but can cause crowding when many items cluster together. We will use chaining for our implementation because it is easier to understand.

---

## Load Factor: How Full Is the Table?

The **load factor** measures how full your hash table is:

```
load factor = number of items / number of slots
```

If you have 12 items in a table with 16 slots, the load factor is 12/16 = 0.75 (75% full).

Why does this matter? As the table gets more full, collisions happen more often. More collisions mean longer lists at each position, which means slower lookups.

The common rule is: **when the load factor reaches 0.75 (75%), double the table size and move everything into the new, bigger table.** This is called **resizing**. You have to recalculate every item's position (because the position depends on the table size), but it keeps things fast.

---

## Building a HashTable Class from Scratch

Here it is -- your very own hash table! Type this out yourself and study how each method works.

```python
class HashTable:
    """A hash table with chaining for handling collisions."""

    def __init__(self, capacity: int = 16) -> None:
        self._capacity: int = capacity
        self._size: int = 0
        # Create a list of empty lists (the "buckets")
        self._buckets: list[list[tuple[str, str]]] = [
            [] for _ in range(capacity)
        ]

    def __len__(self) -> int:
        return self._size

    def _hash(self, key: str) -> int:
        """Turn a key into a bucket position."""
        return hash(key) % self._capacity

    def put(self, key: str, value: str) -> None:
        """Store a key-value pair. Updates the value if the key already exists."""
        index: int = self._hash(key)
        bucket: list[tuple[str, str]] = self._buckets[index]

        # Check if the key already exists -- if so, update it
        for i in range(len(bucket)):
            if bucket[i][0] == key:
                bucket[i] = (key, value)
                return

        # Key does not exist yet -- add it
        bucket.append((key, value))
        self._size += 1

        # Resize if the table is getting too full
        if self._size / self._capacity > 0.75:
            self._resize()

    def get(self, key: str) -> str:
        """Look up a value by its key. Raises KeyError if not found."""
        index: int = self._hash(key)
        bucket: list[tuple[str, str]] = self._buckets[index]

        for stored_key, stored_value in bucket:
            if stored_key == key:
                return stored_value

        raise KeyError(f"Key not found: {key}")

    def delete(self, key: str) -> None:
        """Remove a key-value pair. Raises KeyError if not found."""
        index: int = self._hash(key)
        bucket: list[tuple[str, str]] = self._buckets[index]

        for i in range(len(bucket)):
            if bucket[i][0] == key:
                bucket.pop(i)
                self._size -= 1
                return

        raise KeyError(f"Key not found: {key}")

    def contains(self, key: str) -> bool:
        """Check if a key exists in the table."""
        index: int = self._hash(key)
        bucket: list[tuple[str, str]] = self._buckets[index]

        for stored_key, _ in bucket:
            if stored_key == key:
                return True
        return False

    def _resize(self) -> None:
        """Double the table size and re-file everything."""
        old_buckets: list[list[tuple[str, str]]] = self._buckets
        self._capacity *= 2
        self._buckets = [[] for _ in range(self._capacity)]
        self._size = 0

        for bucket in old_buckets:
            for key, value in bucket:
                self.put(key, value)
```

### Let Us Try It Out

```python
phone_book: HashTable = HashTable()
phone_book.put("Mom", "555-1234")
phone_book.put("Dad", "555-5678")
phone_book.put("Grandma", "555-9999")

print(phone_book.get("Mom"))        # 555-1234
print(phone_book.get("Grandma"))    # 555-9999
print(phone_book.contains("Dad"))   # True
print(phone_book.contains("Uncle")) # False
print(len(phone_book))              # 3

# Update an existing entry
phone_book.put("Mom", "555-0000")
print(phone_book.get("Mom"))        # 555-0000 (updated!)

# Delete an entry
phone_book.delete("Dad")
print(phone_book.contains("Dad"))   # False
print(len(phone_book))              # 2
```

---

## Why Hash Table Lookup Is So Fast

Let us compare finding something by name in different data structures:

| Data Structure | How It Searches | Speed |
|---|---|---|
| List | Check every item one by one | Slow (checks up to every item) |
| Sorted list | Jump to the middle, go left or right | Faster (cuts in half each step) |
| BST | Start at root, go left or right | Faster (cuts in half each step) |
| **Hash table** | **Calculate position, go straight there** | **Almost instant!** |

A hash table does not search at all. It calculates exactly where the item should be and goes directly there. It is like the difference between searching every house on a street for your friend versus knowing their exact address and going straight to their door.

On average, hash table operations (put, get, delete) take the same amount of time whether you have 10 items or 10 million items. That is incredibly powerful.

---

## Why Dictionary Keys Must Be Immutable

![A flat vector illustration in a children's educational book style showing Byte the robot holding a key-shaped object that is solid and unchanging on the left, next to a key-shaped object that is wobbly and shifting on the right with a red X over it. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Here is something you might have noticed: you can use strings, numbers, and tuples as dictionary keys, but you **cannot** use lists.

```python
# These work fine:
d: dict[str, int] = {"hello": 1}       # string key -- OK
d2: dict[int, str] = {42: "answer"}     # number key -- OK
d3: dict[tuple[int, int], str] = {(1, 2): "point"}  # tuple key -- OK

# This does NOT work:
# d4: dict[list[int], str] = {[1, 2]: "nope"}  # TypeError!
```

Why? Because the hash function turns a key into a position number. If you stored something at position 7, you need the key to always hash to 7 when you look it up later.

But what if the key could change? If you used a list `[1, 2]` as a key and it hashed to position 7, then later you changed the list to `[1, 2, 3]`, it might hash to position 12 instead. Now the hash table looks at position 12 and does not find your data -- even though it is still sitting at position 7! The data is lost in the wrong drawer.

That is why dictionary keys must be **immutable** (unchangeable). Strings, numbers, and tuples cannot be changed after they are created, so their hash values are always the same. Lists can be changed, so they cannot be keys.

---

## Python's dict and set Are Hash Tables

Now you understand what happens behind the scenes:

```python
# When you use a dict:
grades: dict[str, int] = {}
grades["Alice"] = 95    # Hashes "Alice" to a position, stores 95 there
grades["Bob"] = 87      # Hashes "Bob" to a position, stores 87 there
print(grades["Alice"])   # Hashes "Alice", goes to that position, finds 95
```

And `set` is just a hash table that stores keys without values:

```python
# When you use a set:
seen: set[str] = set()
seen.add("Alice")       # Hashes "Alice", stores it at that position
seen.add("Bob")         # Hashes "Bob", stores it at that position
print("Alice" in seen)  # Hashes "Alice", checks that position -- True!
print("Carol" in seen)  # Hashes "Carol", checks that position -- False!
```

This is why checking `"Alice" in seen` is almost instant for sets and dicts, but checking `"Alice" in my_list` is slow for lists. The list has to check every item one by one. The set goes straight to the right position.

---

## Common Patterns: Counting with Dicts

One of the most common uses of hash tables is **counting things**. How many times does each word appear in a sentence? How many of each item are in a list?

```python
def count_items(items: list[str]) -> dict[str, int]:
    """Count how many times each item appears."""
    counts: dict[str, int] = {}
    for item in items:
        if item in counts:
            counts[item] += 1
        else:
            counts[item] = 1
    return counts
```

```python
fruits: list[str] = ["apple", "banana", "apple", "cherry", "banana", "apple"]
print(count_items(fruits))
# {"apple": 3, "banana": 2, "cherry": 1}
```

### The Two-Sum Problem

Here is a famous problem: given a list of numbers and a target, find two numbers that add up to the target.

Without a hash table, you would check every possible pair -- very slow. With a hash table, you can solve it in one pass through the list!

```python
def two_sum(numbers: list[int], target: int) -> list[int]:
    """Find two positions whose values add up to the target."""
    seen: dict[int, int] = {}  # value -> position

    for i in range(len(numbers)):
        complement: int = target - numbers[i]
        if complement in seen:
            return [seen[complement], i]
        seen[numbers[i]] = i

    return []  # no solution found
```

```python
print(two_sum([2, 7, 11, 15], 9))   # [0, 1] because 2 + 7 = 9
print(two_sum([3, 4, 5, 6], 11))    # [2, 3] because 5 + 6 = 11
```

The idea: for each number, you calculate what other number you would need (the "complement"). Then you check if you have already seen that complement. Checking "have I seen this?" is instant with a hash table!

---

## Practice Questions

Try to answer each question on your own before looking at the answers at the bottom of this page.

**Question 1.** In your own words, explain what a hash function does. Why is it important that the same key always produces the same hash value?

**Question 2.** You have a hash table with 8 slots. Two keys, "cat" and "dog," both hash to position 3. Draw what the hash table looks like if we use chaining to handle the collision.

**Question 3.** What is the load factor of a hash table with 12 items and 16 slots? What should happen when the load factor gets too high?

**Question 4.** Why can you use a string as a dictionary key but not a list? What would go wrong if you could use a list as a key and then changed the list?

**Question 5.** Walk through what happens step by step when you run this code on your HashTable class:

```python
ht: HashTable = HashTable(capacity=4)
ht.put("apple", "red")
ht.put("banana", "yellow")
ht.put("cherry", "red")
print(ht.get("banana"))
```

What happens internally when `put` is called? What happens when `get` is called?

**Question 6.** Write a function called `first_unique` that takes a string and returns the first character that appears only once. For example, `first_unique("aabccbd")` should return `"d"`. Use a dictionary to count characters.

**Question 7.** Explain why checking `5 in my_set` is much faster than `5 in my_list` when both contain the same million numbers. What does each one do internally?

---

## Key Takeaways

1. A **hash table** turns keys into position numbers using a hash function, so you can find things almost instantly.
2. Python's **dict** and **set** are both hash tables under the hood.
3. When two keys get the same position (a **collision**), we handle it with chaining (a list at each position) or open addressing (trying the next position).
4. The **load factor** measures how full the table is. When it gets too high, the table doubles in size and everything gets repositioned.
5. Hash table operations (put, get, delete) are almost instant on average, no matter how many items are stored.
6. Dictionary keys must be **immutable** (unchangeable) so their hash value never changes.
7. Hash tables power many common patterns: counting items, finding pairs, checking for duplicates, and much more.

---

**Previous:** [[wiki:python-jr-ds-heaps]] | **Next:** [[wiki:python-jr-ds-graphs]]

---

## Answers to Practice Questions

**Answer 1.** A hash function takes a key (like a word or a number) and turns it into a position number that tells you where to store or find data in the table. It is important that the same key always produces the same hash value because you need to be able to find the data again later. If "Mom" hashed to position 7 when you stored it but hashed to position 12 when you looked it up, you would never find the data. The hash function must be consistent -- same input, same output, every time.

**Answer 2.** With chaining, the hash table looks like this:

```
Position 0: []
Position 1: []
Position 2: []
Position 3: [("cat", <cat's value>), ("dog", <dog's value>)]
Position 4: []
Position 5: []
Position 6: []
Position 7: []
```

Both "cat" and "dog" are stored in the same position (3) as a list of pairs. When you look up "cat," you hash it to get position 3, then look through the list at position 3 to find the entry with the key "cat."

**Answer 3.** The load factor is 12 / 16 = **0.75** (or 75%). When the load factor gets too high (typically 0.75 or above), the hash table should **resize** -- it doubles the number of slots and repositions every item. This is necessary because a high load factor means more collisions, which makes lookups slower. After resizing, the load factor drops (12 / 32 = 0.375), and operations speed up again.

**Answer 4.** Strings are **immutable** -- once created, they cannot be changed. This means "Mom" will always hash to the same position number, so you can always find data stored under that key.

Lists are **mutable** -- you can add, remove, or change items. If you used `[1, 2]` as a key and it hashed to position 7, your data would be stored at position 7. But if you then changed the list to `[1, 2, 3]`, it would now hash to a different position (say, position 12). When you try to look up the data, the hash table goes to position 12, finds nothing there, and reports the key does not exist -- even though the data is still sitting at position 7. The data is effectively lost.

**Answer 5.** Here is what happens step by step:

1. `HashTable(capacity=4)` creates a table with 4 empty buckets: `[[], [], [], []]`.
2. `put("apple", "red")`: Hash "apple" to get a position (let us say 2). Bucket 2 is empty, so add `("apple", "red")` to it. Size is now 1. Load factor is 1/4 = 0.25, so no resize needed.
3. `put("banana", "yellow")`: Hash "banana" to get a position (let us say 0). Bucket 0 is empty, so add `("banana", "yellow")`. Size is 2. Load factor is 2/4 = 0.5, still fine.
4. `put("cherry", "red")`: Hash "cherry" to get a position (let us say 3). Add `("cherry", "red")`. Size is 3. Load factor is 3/4 = 0.75. This exceeds our threshold, so the table **resizes**: it creates 8 buckets, and all three items get rehashed into new positions.
5. `get("banana")`: Hash "banana" to get its position in the (now resized) table. Go to that bucket. Look through the list there and find the entry with key "banana." Return "yellow."

**Answer 6.**

```python
def first_unique(text: str) -> str:
    """Find the first character that appears only once."""
    # Step 1: Count every character
    counts: dict[str, int] = {}
    for char in text:
        if char in counts:
            counts[char] += 1
        else:
            counts[char] = 1

    # Step 2: Find the first character with a count of 1
    for char in text:
        if counts[char] == 1:
            return char

    return ""  # no unique character found
```

```python
print(first_unique("aabccbd"))  # "d"
print(first_unique("aabb"))     # "" (no unique characters)
```

The first loop counts how many times each character appears (using a dict as a hash table). The second loop goes through the string in order and finds the first character whose count is exactly 1.

**Answer 7.** When you check `5 in my_set`, Python calculates the hash of 5 to get a position number, goes directly to that position in the hash table, and checks if 5 is there. This takes the same amount of time whether the set has 10 items or 10 million items -- it is almost instant.

When you check `5 in my_list`, Python has to start at the beginning of the list and check each item one by one: is the first item 5? No. Is the second item 5? No. It keeps going until it either finds 5 or reaches the end of the list. With a million items, it might need to check all million of them. That is why lists are slow for this kind of lookup, and sets (which are hash tables) are fast.
