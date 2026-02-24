# Hash Tables — O(1) Lookup

Every data structure so far has a weakness when it comes to finding things by **value**:

- Array: search is O(n) — you check every element
- Linked list: search is O(n) — you walk every node
- BST: search is O(log n) — better, but still not instant
- Heap: search is O(n) — the heap order does not help for arbitrary lookup

What if you could look up any value in O(1) — constant time, regardless of how many elements you have? That is what a hash table does.

Python's `dict` is a hash table. Python's `set` is a hash table without values. You use them every day. Now you will build one from scratch and understand how they actually work.

---

## The Core Idea

An array gives you O(1) access **by index**. A hash table gives you O(1) access **by key**. It does this by converting keys into array indices.

```
Key "alice" -> hash function -> index 3
Key "bob"   -> hash function -> index 7
Key "carol" -> hash function -> index 1

Internal array:
[0: empty] [1: carol=90] [2: empty] [3: alice=85] ... [7: bob=92]
```

The **hash function** is the magic ingredient. It takes any key (a string, a number, a tuple) and turns it into an array index.

---

## What Is a Hash Function?

A hash function takes input of any size and produces a fixed-size integer output. For a hash table, we then take that integer modulo the array size to get a valid index.

```python
# Simplified example
def simple_hash(key: str, array_size: int) -> int:
    """Convert a string key to an array index."""
    total: int = 0
    for char in key:
        total += ord(char)  # ord() gives the Unicode number for a character
    return total % array_size
```

```python
print(simple_hash("alice", 16))  # some index between 0 and 15
print(simple_hash("bob", 16))    # some different index (hopefully)
```

A good hash function has three properties:

1. **Deterministic**: the same key always produces the same hash
2. **Uniform distribution**: keys spread evenly across the array (no clustering)
3. **Fast**: computing the hash should be O(1) or close to it

Python's built-in `hash()` function is a good hash function. Our simple one above is not great (anagrams like "abc" and "cab" produce the same hash), but it demonstrates the idea.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain what a hash function does in simple terms. Why must it be deterministic? What happens if two different keys produce the same hash value? What is this situation called?"</div>
</div>

---

## The Collision Problem

Here is the catch: your array has a limited number of slots (say 16), but there are infinite possible keys. Eventually, two different keys will hash to the same index. This is called a **collision**.

```
hash("alice") % 16 = 3
hash("david") % 16 = 3   <-- collision! Both want index 3
```

Collisions are inevitable. The question is how to handle them. There are two main approaches.

---

## Collision Handling: Chaining

Each slot in the array holds a **list** (or linked list) of all key-value pairs that hash to that index.

```
Index 0: []
Index 1: [("carol", 90)]
Index 2: []
Index 3: [("alice", 85), ("david", 78)]  <-- both here, stored as a list
Index 4: []
...
```

When you look up a key:
1. Hash the key to get the index
2. Go to that index
3. Search through the list at that index for the matching key

If the hash function distributes keys well, each list is short (usually 0 or 1 elements), so lookup is still O(1) on average.

---

## Collision Handling: Open Addressing

Instead of storing a list at each index, you look for the **next open slot** in the array.

**Linear probing**: if index 3 is taken, try 4, then 5, then 6, until you find an empty slot.

```
hash("alice") = 3 -> slot 3 is empty -> store at 3
hash("david") = 3 -> slot 3 is taken -> try 4 -> empty -> store at 4
```

This keeps everything in the flat array (no extra lists), but it creates **clustering** — groups of filled slots that slow down operations.

We will implement chaining because it is simpler to understand and implement correctly.

---

## Implement a HashTable from Scratch

Open your editor. Implement the `put`, `get`, and `delete` methods yourself before looking at the solution.

```python
from typing import Any


class HashTable:
    """A hash table with chaining for collision resolution."""

    def __init__(self, capacity: int = 16) -> None:
        self._capacity: int = capacity
        self._size: int = 0
        self._buckets: list[list[tuple[str, Any]]] = [
            [] for _ in range(capacity)
        ]

    def __len__(self) -> int:
        return self._size

    def _hash(self, key: str) -> int:
        """Compute the bucket index for a key."""
        return hash(key) % self._capacity

    def put(self, key: str, value: Any) -> None:
        """Insert or update a key-value pair."""
        index: int = self._hash(key)
        bucket: list[tuple[str, Any]] = self._buckets[index]

        # Check if key already exists — if so, update it
        for i in range(len(bucket)):
            if bucket[i][0] == key:
                bucket[i] = (key, value)
                return

        # Key does not exist — add it
        bucket.append((key, value))
        self._size += 1

        # Resize if load factor exceeds 0.75
        if self._size / self._capacity > 0.75:
            self._resize()

    def get(self, key: str) -> Any:
        """Get the value for a key. Raise KeyError if not found."""
        index: int = self._hash(key)
        bucket: list[tuple[str, Any]] = self._buckets[index]

        for stored_key, stored_value in bucket:
            if stored_key == key:
                return stored_value

        raise KeyError(f"Key not found: {key}")

    def delete(self, key: str) -> None:
        """Remove a key-value pair. Raise KeyError if not found."""
        index: int = self._hash(key)
        bucket: list[tuple[str, Any]] = self._buckets[index]

        for i in range(len(bucket)):
            if bucket[i][0] == key:
                bucket.pop(i)
                self._size -= 1
                return

        raise KeyError(f"Key not found: {key}")

    def contains(self, key: str) -> bool:
        """Check if a key exists in the hash table."""
        index: int = self._hash(key)
        bucket: list[tuple[str, Any]] = self._buckets[index]

        for stored_key, _ in bucket:
            if stored_key == key:
                return True
        return False

    def keys(self) -> list[str]:
        """Return all keys in the hash table."""
        result: list[str] = []
        for bucket in self._buckets:
            for key, _ in bucket:
                result.append(key)
        return result

    def values(self) -> list[Any]:
        """Return all values in the hash table."""
        result: list[Any] = []
        for bucket in self._buckets:
            for _, value in bucket:
                result.append(value)
        return result

    def _resize(self) -> None:
        """Double the capacity and rehash all elements."""
        old_buckets: list[list[tuple[str, Any]]] = self._buckets
        self._capacity *= 2
        self._buckets = [[] for _ in range(self._capacity)]
        self._size = 0

        for bucket in old_buckets:
            for key, value in bucket:
                self.put(key, value)

    def display(self) -> str:
        """Show the internal structure of the hash table."""
        lines: list[str] = []
        for i, bucket in enumerate(self._buckets):
            if len(bucket) > 0:
                pairs: list[str] = [f"{k}: {v}" for k, v in bucket]
                lines.append(f"  [{i}]: {', '.join(pairs)}")
        return "{\n" + "\n".join(lines) + "\n}"
```

---

## Try It Out

```python
ht: HashTable = HashTable()
ht.put("alice", 85)
ht.put("bob", 92)
ht.put("carol", 78)
ht.put("alice", 90)     # Update alice's value

print(ht.get("alice"))   # 90
print(ht.get("bob"))     # 92
print(ht.contains("carol"))  # True
print(ht.contains("dave"))   # False
print(len(ht))            # 3

ht.delete("bob")
print(len(ht))            # 2
print(ht.keys())          # ["alice", "carol"] (order may vary)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Walk me through what happens when I call put('alice', 85) on an empty hash table with capacity 16. Then show what happens when I call put('alice', 90) — how does the update work? Finally, show what get('alice') does internally."</div>
</div>

---

## Load Factor and Resizing

The **load factor** is the ratio of elements to buckets:

```
load_factor = size / capacity
```

As the load factor increases, collisions become more frequent, and performance degrades. A load factor of 0.75 is a common threshold — when 75% of buckets have at least one element, double the capacity.

**Resizing is expensive**: you must create a new, bigger array and **rehash every element** (because the hash depends on the array size via the modulo operation). But like dynamic array resizing, it happens rarely enough that the amortized cost is O(1) per operation.

```
Before resize: capacity=4, size=3, load_factor=0.75
Buckets: [0: ("a",1)] [1: ("b",2)] [2: empty] [3: ("c",3)]

After resize: capacity=8, size=3, load_factor=0.375
All elements rehashed — they may end up in different buckets!
Buckets: [0: empty] [1: ("a",1)] [2: empty] [3: ("b",2)] ... [7: ("c",3)]
```

---

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| put (insert/update) | O(1) | O(n) |
| get (lookup) | O(1) | O(n) |
| delete | O(1) | O(n) |
| contains | O(1) | O(n) |

**Average case: O(1).** With a good hash function and a reasonable load factor, each bucket has 0 or 1 elements. You hash the key, go to the bucket, and the answer is right there.

**Worst case: O(n).** If every key hashes to the same index (terrible hash function or adversarial input), all elements end up in one bucket — essentially a linked list. Lookup becomes O(n).

In practice, with Python's built-in `hash()` and automatic resizing, you almost always get O(1).

---

## Python's dict IS a Hash Table

Now you understand what happens when you write:

```python
grades: dict[str, int] = {}
grades["alice"] = 85     # Hashes "alice", stores at that bucket
grades["bob"] = 92       # Hashes "bob", stores at that bucket
print(grades["alice"])    # Hashes "alice", looks up that bucket -> 85
```

Python's `dict` uses open addressing with a more sophisticated probing strategy than simple linear probing. It also has automatic resizing, a fast hash function, and optimizations for common patterns.

## Python's set IS a Hash Table Without Values

A set stores only keys, no values. It uses the same hashing mechanism:

```python
seen: set[int] = set()
seen.add(5)           # Hash 5, store at that bucket
seen.add(10)          # Hash 10, store at that bucket
print(5 in seen)      # Hash 5, check that bucket -> True
print(99 in seen)     # Hash 99, check that bucket -> False
```

This is why `in` is O(1) for sets and dicts but O(n) for lists. The list must check every element. The set goes straight to the right bucket.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why is checking 'x in my_set' O(1) but checking 'x in my_list' O(n)? Explain what happens internally for each one. Also explain why the keys of a dict (or elements of a set) must be immutable."</div>
</div>

---

## Why Keys Must Be Hashable (Immutable)

For a hash table to work, the hash of a key must NEVER change after the key is stored. If it did, the key would be in the wrong bucket and you could never find it again.

```python
# This works — strings and tuples are immutable
d: dict[str, int] = {"hello": 1}
s: set[tuple[int, int]] = {(1, 2), (3, 4)}

# This does NOT work — lists are mutable
d2: dict[list[int], int] = {[1, 2]: 5}   # TypeError: unhashable type: 'list'
```

If you could use a list as a dictionary key and then modify the list, the hash would change. The hash table would look in the wrong bucket and report that the key does not exist — even though it is still there, just in the wrong place.

That is why Python requires dictionary keys and set elements to be **hashable**, which in practice means **immutable**: strings, numbers, tuples (of hashable elements), and frozen sets.

---

## Common Interview Patterns

### Two Sum (Hash Map)

The most famous interview question. Given an array of numbers and a target, find two numbers that add up to the target.

```python
def two_sum(nums: list[int], target: int) -> list[int]:
    """Find indices of two numbers that add up to target. O(n)."""
    seen: dict[int, int] = {}  # value -> index

    for i, num in enumerate(nums):
        complement: int = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []  # No solution found
```

Without a hash table, this is O(n^2) — you check every pair. With a hash table, it is O(n) — for each number, you check if its complement exists in O(1).

### Group Anagrams

Group strings that are anagrams of each other.

```python
def group_anagrams(strs: list[str]) -> list[list[str]]:
    """Group strings that are anagrams. O(n * k) where k is max string length."""
    groups: dict[str, list[str]] = {}

    for s in strs:
        # Sort the characters — anagrams produce the same sorted string
        key: str = "".join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)

    return list(groups.values())
```

```python
print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

### Longest Consecutive Sequence

Find the longest sequence of consecutive integers in an unsorted array.

```python
def longest_consecutive(nums: list[int]) -> int:
    """Find the length of the longest consecutive sequence. O(n)."""
    num_set: set[int] = set(nums)
    longest: int = 0

    for num in num_set:
        # Only start counting from the beginning of a sequence
        if num - 1 not in num_set:
            current: int = num
            length: int = 1
            while current + 1 in num_set:
                current += 1
                length += 1
            longest = max(longest, length)

    return longest
```

```python
print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4 (sequence: 1,2,3,4)
```

The key insight: by checking `num - 1 not in num_set`, you only start counting from the beginning of a sequence. This ensures each element is visited at most twice, giving O(n) total.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a coding challenge: implement a function that finds the first non-repeating character in a string. For example, in 'aabccbd', the first non-repeating character is 'd'. Use a hash table for O(n) time complexity. Show both the approach using a dict and explain why order matters."</div>
</div>

---

## Where People Go Wrong

**1. Using mutable objects as keys.** Lists and dicts cannot be dictionary keys or set elements. Use tuples instead of lists if you need a hashable sequence.

**2. Ignoring hash collisions.** If you build your own hash table and do not handle collisions, two keys that hash to the same index will overwrite each other. Always implement chaining or open addressing.

**3. Not resizing.** As the load factor grows, performance degrades from O(1) toward O(n). Your hash table should resize when the load factor exceeds a threshold (typically 0.75).

**4. Assuming dict preserves insertion order everywhere.** Python 3.7+ guarantees that `dict` preserves insertion order. But this is a Python-specific behavior. In other languages (and in the abstract concept of a hash table), order is not guaranteed.

**5. Forgetting that hash table operations can be O(n) worst case.** While O(1) average is the headline number, adversarial inputs or a bad hash function can degrade everything to O(n). This matters in security-sensitive contexts.

---

## Key Takeaways

1. A hash table converts keys to array indices using a hash function.
2. Collisions are handled by chaining (lists at each bucket) or open addressing (probing).
3. Average time for insert, lookup, and delete is O(1).
4. Resizing is necessary when the load factor gets too high.
5. Python's `dict` is a hash table. Python's `set` is a hash table without values.
6. Keys must be hashable (immutable) so their hash never changes.
7. Hash tables power the O(n) solution for Two Sum and many other interview problems.

---

**Previous:** [[wiki:python-ds-heaps]] | **Next:** [[wiki:python-ds-graphs]]
