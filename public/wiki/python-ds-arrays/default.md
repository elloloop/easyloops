# Arrays and Dynamic Arrays — The Foundation of Everything

Every data structure you will ever learn is built on top of arrays, or exists because arrays have a weakness. Before you can understand linked lists, trees, hash tables, or graphs, you need to understand arrays at a deep level. Not just "how to use a list in Python" — but how arrays actually work in memory.

---

## What Is an Array?

An array is a fixed block of contiguous memory. "Contiguous" means the elements sit right next to each other in memory, with no gaps.

Think of it like a row of mailboxes at an apartment building. Each mailbox is the same size, they are numbered sequentially, and you can go directly to any mailbox if you know its number.

```
Memory addresses:  [100] [104] [108] [112] [116]
Values stored:     [ 10 ] [ 20 ] [ 30 ] [ 40 ] [ 50 ]
Index:                0      1      2      3      4
```

Three key properties of an array:

1. **Fixed size** — you decide how many slots when you create it
2. **Same-size elements** — each slot is the same number of bytes
3. **Contiguous** — no gaps between elements

---

## Why Array Access Is O(1)

This is the most important thing to understand about arrays.

If the array starts at memory address `100`, and each element takes `4` bytes, then the element at index `3` lives at:

```
address = base_address + index * element_size
address = 100 + 3 * 4
address = 112
```

One multiplication, one addition. That is it. No matter if your array has 10 elements or 10 million elements, finding any element by index takes the same amount of work.

This is what O(1) means: **constant time**. The number of steps does not grow with the size of the array.

---

## The Problem with Fixed-Size Arrays

What happens when your array is full and you need to add one more element? You cannot just extend it — there might be other data sitting right after your array in memory.

```
[your array: 10, 20, 30, 40, 50] [someone else's data] [more stuff]
```

You have no room to grow. This is the fundamental limitation of a fixed-size array.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain why array access is O(1). If an array starts at memory address 200, each element is 8 bytes, and I want index 5 — what address do I go to? Show the formula."</div>
</div>

---

## Dynamic Arrays — Growing When You Need To

A dynamic array solves the fixed-size problem. When the array fills up, it:

1. Creates a new, bigger array (usually double the size)
2. Copies all the old elements into the new array
3. Throws away the old array
4. Now you have room to add more elements

This is exactly how Python's `list` works under the hood.

**Why double the size?** If you only added one extra slot each time, you would need to copy everything every single time you append. By doubling, the copies happen less and less frequently as the array grows. This gives you **amortized O(1)** append — meaning it is O(1) on average, even though occasionally one append triggers a big copy.

Here is the intuition: if you double from 8 to 16, you do 8 copies. But now you can do 8 more appends before the next resize. So you "spread" those 8 copies across 8 future appends — roughly 1 extra copy per append on average.

---

## Implement a DynamicArray from Scratch

Open your editor. Try to implement this yourself before looking at the solution below.

The idea: use a plain Python list as your "raw memory." Track two numbers: the actual number of elements stored (`size`) and the total slots available (`capacity`).

```python
from typing import Any


class DynamicArray:
    """A dynamic array that grows automatically when full."""

    def __init__(self) -> None:
        self._size: int = 0
        self._capacity: int = 1
        self._data: list[Any] = [None] * self._capacity

    def __len__(self) -> int:
        """Return the number of elements stored."""
        return self._size

    def _resize(self, new_capacity: int) -> None:
        """Create a bigger array and copy all elements over."""
        new_data: list[Any] = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity

    def append(self, value: Any) -> None:
        """Add an element to the end. Resize if needed."""
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        self._data[self._size] = value
        self._size += 1

    def get(self, index: int) -> Any:
        """Get element at index. Raise error if out of bounds."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        return self._data[index]

    def set(self, index: int, value: Any) -> None:
        """Set element at index. Raise error if out of bounds."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        self._data[index] = value

    def insert(self, index: int, value: Any) -> None:
        """Insert value at index, shifting everything after it right."""
        if index < 0 or index > self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        # Shift elements right, starting from the end
        for i in range(self._size, index, -1):
            self._data[i] = self._data[i - 1]
        self._data[index] = value
        self._size += 1

    def delete(self, index: int) -> Any:
        """Remove element at index, shifting everything after it left."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        removed: Any = self._data[index]
        # Shift elements left
        for i in range(index, self._size - 1):
            self._data[i] = self._data[i + 1]
        self._data[self._size - 1] = None
        self._size -= 1
        return removed

    def search(self, value: Any) -> int:
        """Return the index of the first occurrence, or -1 if not found."""
        for i in range(self._size):
            if self._data[i] == value:
                return i
        return -1

    def display(self) -> str:
        """Show the array contents."""
        elements: list[str] = []
        for i in range(self._size):
            elements.append(str(self._data[i]))
        return "[" + ", ".join(elements) + "]"
```

---

## Try It Out

```python
arr: DynamicArray = DynamicArray()
arr.append(10)
arr.append(20)
arr.append(30)
print(arr.display())     # [10, 20, 30]
print(len(arr))           # 3
print(arr.get(1))         # 20

arr.insert(1, 15)
print(arr.display())     # [10, 15, 20, 30]

arr.delete(2)
print(arr.display())     # [10, 15, 30]

print(arr.search(15))    # 1
print(arr.search(99))    # -1
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I built a DynamicArray class. Walk me through what happens internally when I call append 5 times, starting with capacity 1. Show the size and capacity after each append. When does a resize happen?"</div>
</div>

---

## Size vs Capacity — A Common Source of Confusion

These two numbers mean completely different things:

- **Size**: how many elements you have actually stored
- **Capacity**: how many slots are available in the underlying array

```
After 3 appends with initial capacity 1:

Append 1: size=1, capacity=1 (fits exactly)
Append 2: RESIZE to capacity 2, then add. size=2, capacity=2
Append 3: RESIZE to capacity 4, then add. size=3, capacity=4

Internal array: [val1, val2, val3, None]
                                   ^^^^ empty slot (capacity exists, but no element stored)
```

The user of your DynamicArray should never see those `None` slots. That is why `__len__` returns `self._size`, not `self._capacity`.

---

## Time Complexity Summary

| Operation | Time Complexity | Why |
|-----------|----------------|-----|
| Access by index | O(1) | Direct calculation: base + index * size |
| Append | Amortized O(1) | Usually O(1), occasionally O(n) for resize |
| Insert at position | O(n) | Must shift elements right |
| Delete at position | O(n) | Must shift elements left |
| Search by value | O(n) | Must check each element one by one |
| Get length | O(1) | We track size as a variable |

**In plain language:**

- "O(1)" means it takes the same time whether you have 10 items or 10 million
- "O(n)" means the time grows directly with the number of items — 10 million items takes roughly 10 million steps
- "Amortized O(1)" means it averages out to constant time, even though rare operations are expensive

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why is inserting at position 0 of a dynamic array O(n)? Why is appending to the end amortized O(1)? Explain the difference in simple terms."</div>
</div>

---

## When to Use Arrays

Use arrays (Python lists) when:

- You need **fast access by position** (index)
- You mostly **add/remove from the end**
- You need to iterate through all elements in order
- You know the approximate size ahead of time

Do NOT use arrays when:

- You frequently insert/delete from the beginning or middle
- You need fast lookup by value (use a hash table instead)
- You need to maintain sorted order with frequent inserts (use a BST or heap)

---

## Where People Go Wrong

**1. Off-by-one errors.** The most common bug in all of programming. If your array has `size` elements, valid indices are `0` to `size - 1`. Not `0` to `size`.

**2. Not handling resize.** Forgetting to check if the array is full before appending. Your implementation must check `size == capacity` before every append.

**3. Confusing size and capacity.** The user asks "how many elements?" and you return capacity. Now they think there are 16 elements when there are only 5.

**4. Shifting in the wrong direction.** When inserting, you must shift from the end toward the insert point (right to left). If you shift left to right, you overwrite elements before moving them.

**5. Forgetting to update size.** You insert or delete an element but forget to increment or decrement `self._size`.

---

## LeetCode Connection

Now that you understand arrays, these classic problems will make sense:

- **Two Sum** — search through an array for two values that add up to a target (O(n) with a hash map, O(n^2) brute force with nested loops)
- **Best Time to Buy and Sell Stock** — scan through an array tracking the minimum so far
- **Contains Duplicate** — check if any value appears more than once (O(n) with a set)
- **Merge Sorted Array** — combine two sorted arrays into one
- **Remove Duplicates from Sorted Array** — modify an array in place

Each of these requires you to understand array access patterns, iteration, and how shifting works.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a coding challenge: implement a method called `pop` for the DynamicArray class that removes and returns the last element. It should also shrink the capacity by half when size drops below capacity / 4. Explain why we shrink at 1/4 and not 1/2."</div>
</div>

---

## Key Takeaways

1. An array is a contiguous block of memory with O(1) access by index.
2. A dynamic array grows automatically by doubling its capacity when full.
3. Append is amortized O(1). Insert and delete in the middle are O(n).
4. Size is how many elements you have. Capacity is how much room you have.
5. Python's `list` is a dynamic array. Now you know how it works inside.

---

**Previous:** [[wiki:python-type-system]] | **Next:** [[wiki:python-ds-linked-lists]]
