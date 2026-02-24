# Arrays and Dynamic Arrays -- How Python Lists Really Work Inside

You have been using Python lists since Phase 2. You can create them, add items, remove items, and loop through them. But have you ever wondered what is actually happening inside the computer when you do all that? How does Python store your list? Why is grabbing an item by its position number so fast? Why does inserting at the beginning feel different from appending to the end?

In this lesson, you will look under the hood and understand how lists really work. Then you will build your own dynamic array from scratch.

![A flat vector illustration in a children's educational book style showing Byte the robot lifting up the lid of a giant colorful box to peek inside, revealing neatly organized numbered compartments with toys in each slot. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is an Array?

An array is the simplest way a computer stores a collection of items. The items sit **right next to each other** in the computer's memory, like houses on a street.

Imagine a street with houses:

```
Street address:   [100] [101] [102] [103] [104]
Who lives there:  [ 10 ] [ 20 ] [ 30 ] [ 40 ] [ 50 ]
House number:        0      1      2      3      4
```

Three important things about this street:

1. **Every house is the same size** -- they are built identically
2. **They are side by side** -- no gaps between them
3. **Each house has an address** -- you can go directly to any house if you know the number

This is exactly what an array looks like inside the computer's memory. Each "house" is a slot, each "address" is a memory location, and each "house number" is an index.

---

## Why Accessing list[5] Is Instant

Here is the magic of arrays. If you know where the street starts and how wide each house is, you can figure out the address of ANY house with simple math:

```
address = start_of_street + house_number * house_width
```

For example, if the street starts at address 100 and each house is 4 units wide:

```
House 0: 100 + 0 * 4 = 100
House 1: 100 + 1 * 4 = 104
House 3: 100 + 3 * 4 = 112
House 999: 100 + 999 * 4 = 4096
```

One multiplication and one addition. That is it. It does not matter if the street has 5 houses or 5 million houses -- finding any house takes the exact same amount of work.

This is what programmers call **O(1)**, which means "constant time." The number of steps stays the same no matter how big the array is. When you write `my_list[5]` in Python, it uses this exact math to jump straight to position 5. No searching needed.

---

## Fixed-Size Arrays vs Dynamic Arrays

There is a catch with the "houses on a street" idea. When you first build a street, you decide how many houses it has. What if the street is full and a new family wants to move in? You cannot just add a house at the end -- there might be a park or another street right there.

This is the problem with a **fixed-size array**. It has a set number of slots, and once those slots are full, it cannot grow.

But Python lists do not have this problem. You can keep calling `.append()` forever and the list just keeps growing. How does that work?

Python's list is a **dynamic array**. It looks like a regular array on the inside, but it has a clever trick for growing.

---

## How Growing Works

When a dynamic array is full and you need to add one more item, here is what happens:

1. Python creates a **brand new, bigger array** (usually about double the size)
2. It **copies every single item** from the old array to the new one
3. It **throws away** the old array
4. Now there is room to add the new item

Think of it like a bookshelf. You have a bookshelf with 4 shelves and all 4 are full. You want to add one more book. So you:

1. Buy a new bookshelf with 8 shelves
2. Move all your books from the old shelf to the new one
3. Get rid of the old shelf
4. Put your new book on one of the empty shelves

![A flat vector illustration in a children's educational book style showing Byte the robot carrying books from a small full bookshelf to a much bigger empty bookshelf, with a few books already placed on the new shelf. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

**Why double the size?** If you only added one extra slot each time, you would need to copy everything every single time you append. By doubling, the copies happen less and less often as the array grows. Most appends are super fast (just put the item in the next empty slot), and the occasional big copy gets "spread out" over many fast appends. This is what programmers call **amortized O(1)** -- it averages out to constant time.

---

## Size vs Capacity

To understand dynamic arrays, you need to know the difference between two numbers:

- **Size**: how many items you have actually stored
- **Capacity**: how many slots are available in total

Think of a parking lot. If the lot has 20 spaces and 12 cars are parked there:
- Capacity = 20 (total spaces)
- Size = 12 (spaces actually used)

Here is what happens when you keep appending, starting with a capacity of 1:

```
Append 10:  size=1, capacity=1  [10]           -- fits!
Append 20:  RESIZE to capacity 2, then add
            size=2, capacity=2  [10, 20]       -- fits now!
Append 30:  RESIZE to capacity 4, then add
            size=3, capacity=4  [10, 20, 30, _] -- one empty slot
Append 40:  size=4, capacity=4  [10, 20, 30, 40] -- fits!
Append 50:  RESIZE to capacity 8, then add
            size=5, capacity=8  [10, 20, 30, 40, 50, _, _, _]
```

Notice how the resizes happen less and less often. After the resize to 8, you can do 3 more appends before needing to resize again.

---

## Building a DynamicArray Class from Scratch

Now for the exciting part. You are going to build your own dynamic array, just like Python's list works inside. Open your editor and type this yourself -- every character!

We will use a plain Python list as our "raw memory," but we will only use it as a fixed block of slots. We will manage the growing ourselves.

```python
from typing import Any


class DynamicArray:
    """A dynamic array that grows automatically when full."""

    def __init__(self) -> None:
        self._size: int = 0           # how many items stored
        self._capacity: int = 1       # how many slots available
        self._data: list[Any] = [None] * self._capacity  # the raw storage

    def __len__(self) -> int:
        """Return the number of items stored."""
        return self._size

    def _resize(self, new_capacity: int) -> None:
        """Create a bigger array and copy everything over."""
        new_data: list[Any] = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity

    def append(self, value: Any) -> None:
        """Add an item to the end. Resize if needed."""
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        self._data[self._size] = value
        self._size += 1

    def get(self, index: int) -> Any:
        """Get the item at a position. Raises an error if out of bounds."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        return self._data[index]

    def set(self, index: int, value: Any) -> None:
        """Change the item at a position. Raises an error if out of bounds."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        self._data[index] = value

    def insert(self, index: int, value: Any) -> None:
        """Insert an item at a position. Everything after it scoots right."""
        if index < 0 or index > self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        # Scoot everyone from the end toward the insert point
        for i in range(self._size, index, -1):
            self._data[i] = self._data[i - 1]
        self._data[index] = value
        self._size += 1

    def delete(self, index: int) -> Any:
        """Remove the item at a position. Everything after it scoots left."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        removed: Any = self._data[index]
        # Scoot everyone left to fill the gap
        for i in range(index, self._size - 1):
            self._data[i] = self._data[i + 1]
        self._data[self._size - 1] = None  # clean up the last slot
        self._size -= 1
        return removed

    def search(self, value: Any) -> int:
        """Find the first position of a value, or -1 if not found."""
        for i in range(self._size):
            if self._data[i] == value:
                return i
        return -1

    def display(self) -> str:
        """Show the stored items as a string."""
        items: list[str] = []
        for i in range(self._size):
            items.append(str(self._data[i]))
        return "[" + ", ".join(items) + "]"
```

---

## Try It Out

Type this code after your class definition and run it:

```python
arr: DynamicArray = DynamicArray()
print(f"Start: size={len(arr)}, capacity={arr._capacity}")

arr.append(10)
arr.append(20)
arr.append(30)
print(arr.display())               # [10, 20, 30]
print(f"size={len(arr)}, capacity={arr._capacity}")  # size=3, capacity=4

print(arr.get(1))                   # 20

arr.insert(1, 15)
print(arr.display())               # [10, 15, 20, 30]

removed = arr.delete(2)
print(f"Removed: {removed}")        # Removed: 20
print(arr.display())               # [10, 15, 30]

print(arr.search(15))              # 1
print(arr.search(99))              # -1
```

Experiment with it! Try appending many items and watching the capacity grow. Try inserting at position 0 and see how the items shift.

---

## Understanding Insert: The Scooting Problem

When you insert an item in the middle of an array, every item after it needs to **scoot over one position** to make room. Let us trace through what happens:

```
Before insert(2, 99):
Position:  0    1    2    3    _
Data:     [10] [20] [30] [40] [  ]

Step 1: Scoot position 3 to position 4
Position:  0    1    2    3    4
Data:     [10] [20] [30] [40] [40]

Step 2: Scoot position 2 to position 3
Position:  0    1    2    3    4
Data:     [10] [20] [30] [30] [40]

Step 3: Put 99 in position 2
Position:  0    1    2    3    4
Data:     [10] [20] [99] [30] [40]
```

Notice we scoot from the end first, working backward. If we scooted forward, we would overwrite items before we moved them!

The more items that come after the insert point, the more scooting happens. Inserting at position 0 means EVERY item must scoot. That is why inserting at the beginning is slow.

---

## Understanding Delete: Scooting the Other Way

Deleting is the opposite. After you remove an item, there is a gap. Everyone after the gap scoots left to fill it:

```
Before delete(1):
Position:  0    1    2    3
Data:     [10] [20] [30] [40]

Step 1: Scoot position 2 to position 1
Data:     [10] [30] [30] [40]

Step 2: Scoot position 3 to position 2
Data:     [10] [30] [40] [40]

Step 3: Clean up last position
Data:     [10] [30] [40] [  ]
```

Again, the closer to the beginning you delete, the more scooting happens.

![A flat vector illustration in a children's educational book style showing Byte the robot in a line of colorful blocks on a shelf, pushing blocks to the right to make room for a new block in the middle, with arrows showing the direction of movement. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Why Some Operations Are Fast and Others Slow

Now you can understand exactly why each operation takes the time it does:

| Operation | Speed | Why |
|-----------|-------|-----|
| Access by index (`get`) | O(1) -- super fast | Just math: start + index * slot_size |
| Append to end | Amortized O(1) -- usually fast | Put it in the next empty slot (resize is rare) |
| Insert at position | O(n) -- slow for big arrays | Everyone after the spot must scoot right |
| Insert at beginning | O(n) -- slowest insert | EVERY item must scoot right |
| Delete at position | O(n) -- slow for big arrays | Everyone after the spot must scoot left |
| Delete from end | O(1) -- fast | Nothing to scoot |
| Search by value | O(n) -- slow for big arrays | Must check each item one by one |

**What does O(n) mean?** It means the time grows with the number of items. If you have 100 items, inserting at position 0 requires about 100 scoots. If you have a million items, it requires about a million scoots. The "n" stands for the number of items.

**What does O(1) mean?** It means the time stays the same no matter how many items you have. Accessing position 5 takes the same time whether the array has 10 items or 10 million items.

---

## When to Use Arrays (Python Lists)

Now that you know how arrays work, you can make smart choices about when to use them.

**Arrays are great when:**
- You need fast access by position (index)
- You mostly add and remove items from the end
- You need to go through all items in order
- You know roughly how many items you will have

**Arrays are NOT great when:**
- You frequently insert or delete from the beginning or middle
- You need to quickly find an item by its value (not its position)
- Your data naturally forms a chain where you follow links from one item to the next

In the next lesson, you will learn about **linked lists**, which solve the "scooting problem" in a completely different way.

---

## Common Mistakes to Watch For

**1. Off-by-one errors.** If your array has `size` items, the valid positions are 0 through `size - 1`. Not 0 through `size`. This is the most common bug in all of programming.

**2. Forgetting to check if the array is full.** Always check `size == capacity` before appending. If you skip this, you will try to put an item in a slot that does not exist.

**3. Mixing up size and capacity.** Someone asks "how many items do you have?" and you accidentally say the capacity. Now they think there are 8 items when there are only 3.

**4. Scooting in the wrong direction.** When inserting, you must scoot from the end backward toward the insert point. If you scoot forward, you overwrite items before saving them.

**5. Forgetting to update size.** You insert an item but forget to increase `self._size` by 1. Now your array thinks it has fewer items than it really does.

---

## Practice Questions

Try to answer these yourself before looking at the answers at the bottom of the page.

**1.** If an array starts at memory address 200 and each slot is 8 units wide, what is the address of the item at index 7? Show your math.

**2.** You have a DynamicArray with size=4 and capacity=4. You call `append(99)`. Walk through every step that happens. What are the size and capacity after the append is done?

**3.** You have a DynamicArray holding `[10, 20, 30, 40, 50]`. You call `insert(2, 99)`. Draw the array after the insert. How many items had to scoot?

**4.** You have a DynamicArray holding `[10, 20, 30, 40, 50]`. You call `delete(1)`. Draw the array after the delete. How many items had to scoot?

**5.** Why is `insert(0, value)` the slowest possible insert, but `append(value)` is the fastest?

**6.** In our DynamicArray class, the `_resize` method creates a new list and copies items one by one. Why can we not just make the existing list bigger?

**7.** Imagine you start with an empty DynamicArray (size=0, capacity=1) and call `append` 9 times. List every resize that happens along the way. After all 9 appends, what is the size and what is the capacity?

**8.** Write a new method called `pop` for the DynamicArray class that removes and returns the last item (like Python's built-in `list.pop()`). It should raise an IndexError if the array is empty.

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a giant chalkboard covered with colorful diagrams of arrays with numbered slots, arrows showing items moving, and a big question mark that Byte is pointing at with a pointer stick. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Answers to Practice Questions

**1.** Address = 200 + 7 * 8 = 200 + 56 = **256**. You take the starting address, add the index times the slot width.

**2.** Step by step:
- The array is full (size equals capacity, both are 4).
- `append` calls `_resize(8)` to double the capacity.
- `_resize` creates a new array with 8 slots and copies all 4 items over.
- Now the array has capacity 8 with 4 items.
- `append` puts 99 in position 4 (the next empty slot).
- `self._size` increases to 5.
- Final result: size=5, capacity=8.

**3.** Three items had to scoot (the items at positions 2, 3, and 4 all moved one position to the right):
```
Before: [10, 20, 30, 40, 50]
After:  [10, 20, 99, 30, 40, 50]
```

**4.** Three items had to scoot (the items at positions 2, 3, and 4 all moved one position to the left):
```
Before: [10, 20, 30, 40, 50]
After:  [10, 30, 40, 50]
```

**5.** `insert(0, value)` is the slowest because every single item in the array must scoot one position to the right to make room at the front. If there are 1000 items, that is 1000 scoots. `append(value)` is the fastest because you just put the item in the next empty slot at the end. Nobody needs to scoot at all (unless a resize happens, which is rare).

**6.** Because of how arrays work in memory. The items sit in a fixed block of slots that are right next to each other. There might be other data right after the last slot. You cannot just stretch the block -- you might run into something else. The only safe option is to create an entirely new block that is bigger and copy everything over.

**7.** Here is the step-by-step:
```
Append 1: size=1, cap=1 (fits)
Append 2: RESIZE to cap=2, then add. size=2, cap=2
Append 3: RESIZE to cap=4, then add. size=3, cap=4
Append 4: size=4, cap=4 (fits)
Append 5: RESIZE to cap=8, then add. size=5, cap=8
Append 6: size=6, cap=8 (fits)
Append 7: size=7, cap=8 (fits)
Append 8: size=8, cap=8 (fits)
Append 9: RESIZE to cap=16, then add. size=9, cap=16
```
Four resizes happened (to 2, 4, 8, and 16). Final size=9, capacity=16.

**8.**
```python
def pop(self) -> Any:
    """Remove and return the last item."""
    if self._size == 0:
        raise IndexError("Cannot pop from an empty array")
    self._size -= 1
    value: Any = self._data[self._size]
    self._data[self._size] = None  # clean up
    return value
```
This is O(1) because we just grab the last item and decrease the size by 1. No scooting needed.

---

**Previous:** [[wiki:python-jr-type-system]] | **Next:** [[wiki:python-jr-ds-linked-lists]]
