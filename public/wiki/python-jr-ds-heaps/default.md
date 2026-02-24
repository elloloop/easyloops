# Heaps -- The Tree That Always Knows the Smallest

![A flat vector illustration in a children's educational book style showing Byte the robot organizing a pyramid of colorful numbered blocks, with the smallest number at the very top of the pyramid and bigger numbers toward the bottom. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

In the last lesson, you learned about trees -- data that branches out. You built a Binary Search Tree that keeps everything in sorted order so you can search quickly.

But what if you do not need everything sorted? What if you only ever need to answer one question: **"What is the smallest item right now?"**

That is exactly what a heap does. A heap is a special kind of tree that always keeps the smallest (or biggest) item right at the top, ready for you to grab instantly.

---

## What Is a Heap?

Imagine organizing people by height to make a human pyramid. The **shortest person** stands at the very top of the pyramid. Everyone below them is taller. And everyone below those people is even taller (or the same height).

That is a **min-heap** -- a tree where every parent is **smaller than or equal to** its children. The smallest value sits at the very top (the root), and everything below it is bigger.

```
Min-heap (smallest on top):
        1
       / \
      3    5
     / \
    7    9

1 is smaller than 3 and 5    ✓
3 is smaller than 7 and 9    ✓
```

There is also a **max-heap**, which is the opposite -- the **biggest** value sits at the top, and everything below is smaller.

```
Max-heap (biggest on top):
        9
       / \
      7    5
     / \
    3    1

9 is bigger than 7 and 5    ✓
7 is bigger than 3 and 1    ✓
```

### The Heap Rule

The rule is simple:

- **Min-heap**: Every parent must be **smaller than or equal to** both its children.
- **Max-heap**: Every parent must be **bigger than or equal to** both its children.

That is it! Notice this is different from a Binary Search Tree. In a BST, the left child must be smaller and the right child must be bigger. In a heap, we do not care about left versus right -- we only care that the parent is smaller (or bigger) than both children.

---

## The Clever Trick: Stored in a List!

Here is the really cool part. Even though a heap looks like a tree, you can store it in a regular **Python list**. No `TreeNode` class needed!

The trick is a simple formula that tells you where to find each node's parent and children:

| You are at position... | Formula | What it finds |
|---|---|---|
| `i` | `(i - 1) // 2` | The parent |
| `i` | `2 * i + 1` | The left child |
| `i` | `2 * i + 2` | The right child |

Let us see how the tree maps to a list:

```
Tree view:             List view:
        1              [1, 3, 5, 7, 9]
       / \              0  1  2  3  4
      3    5
     / \
    7    9
```

- Position 0 holds **1** (the root). Its children are at positions 1 and 2.
- Position 1 holds **3**. Its parent is at position (1-1)//2 = 0. Its children are at 3 and 4.
- Position 2 holds **5**. Its parent is at position (2-1)//2 = 0. No children (positions 5 and 6 do not exist).

![A flat vector illustration in a children's educational book style showing Byte the robot connecting a tree diagram on the left to a row of numbered boxes on the right with colorful arrows, demonstrating how a tree maps to a flat list. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

This is a really clever trick! We get all the benefits of a tree structure without needing any pointers or node objects. Just a plain list and some math.

---

## How Heap Operations Work

A heap needs to do two main things: add new items and remove the smallest item. Both operations have a special trick to keep the heap rule from breaking.

### Insert: Add at the End, Bubble UP

When you add a new value:

1. **Put it at the end of the list** (the bottom of the tree)
2. **Bubble it up**: Compare it with its parent. If it is smaller than its parent, swap them. Keep going until it finds the right spot.

```
Insert 2 into this min-heap:

Step 1: Add 2 at the end
        1                  1
       / \                / \
      3    5     -->     3    5
     /                  / \
    7                  7    2

List: [1, 3, 5, 7]  -->  [1, 3, 5, 7, 2]

Step 2: Bubble up -- compare 2 with parent (3)
2 < 3, so swap!
        1                  1
       / \                / \
      3    5     -->     2    5
     / \                / \
    7    2             7    3

List: [1, 3, 5, 7, 2]  -->  [1, 2, 5, 7, 3]

Step 3: Compare 2 with parent (1)
2 > 1, so stop. The heap rule is restored!
```

### Extract Min: Remove the Top, Bubble DOWN

When you remove the smallest item (the root):

1. **Save the root value** (that is the answer)
2. **Move the last item to the root** (to fill the gap)
3. **Bubble it down**: Compare it with its children. If it is bigger than the smaller child, swap with that child. Keep going until it finds the right spot.

```
Extract min from this heap:

Step 1: Save 1 (the min). Move last item (9) to root.
        1                  9
       / \                / \
      3    5     -->     3    5
     / \                /
    7    9             7

List: [1, 3, 5, 7, 9]  -->  [9, 3, 5, 7]

Step 2: Bubble down -- compare 9 with children (3 and 5)
Smaller child is 3. 9 > 3, so swap!
        9                  3
       / \                / \
      3    5     -->     9    5
     /                  /
    7                  7

List: [9, 3, 5, 7]  -->  [3, 9, 5, 7]

Step 3: Compare 9 with child (7)
9 > 7, so swap!
        3                  3
       / \                / \
      9    5     -->     7    5
     /                  /
    7                  9

List: [3, 9, 5, 7]  -->  [3, 7, 5, 9]

Done! The heap rule is restored.
```

### Peek: Just Look at Position 0

The smallest item is always at the top, which means position 0 in the list. Peeking is instant -- just return `self._data[0]`.

---

## Building a MinHeap Class from Scratch

Now let us put it all together in Python. Type this out yourself!

```python
class MinHeap:
    """A min-heap where the smallest value is always at the top."""

    def __init__(self) -> None:
        self._data: list[int] = []

    def __len__(self) -> int:
        return len(self._data)

    def is_empty(self) -> bool:
        """Check if the heap has no items."""
        return len(self._data) == 0

    def peek(self) -> int:
        """Look at the smallest item without removing it."""
        if self.is_empty():
            raise IndexError("Cannot peek at an empty heap")
        return self._data[0]

    def _parent_index(self, index: int) -> int:
        """Find the parent's position."""
        return (index - 1) // 2

    def _left_child_index(self, index: int) -> int:
        """Find the left child's position."""
        return 2 * index + 1

    def _right_child_index(self, index: int) -> int:
        """Find the right child's position."""
        return 2 * index + 2

    def _swap(self, i: int, j: int) -> None:
        """Swap two items in the list."""
        self._data[i], self._data[j] = self._data[j], self._data[i]

    def _bubble_up(self, index: int) -> None:
        """Move an item up until the heap rule is restored."""
        while index > 0:
            parent: int = self._parent_index(index)
            if self._data[index] < self._data[parent]:
                self._swap(index, parent)
                index = parent
            else:
                break

    def _bubble_down(self, index: int) -> None:
        """Move an item down until the heap rule is restored."""
        size: int = len(self._data)
        while True:
            smallest: int = index
            left: int = self._left_child_index(index)
            right: int = self._right_child_index(index)

            # Check if left child is smaller
            if left < size and self._data[left] < self._data[smallest]:
                smallest = left

            # Check if right child is even smaller
            if right < size and self._data[right] < self._data[smallest]:
                smallest = right

            # If a child was smaller, swap and continue
            if smallest != index:
                self._swap(index, smallest)
                index = smallest
            else:
                break

    def insert(self, value: int) -> None:
        """Add a value to the heap."""
        self._data.append(value)
        self._bubble_up(len(self._data) - 1)

    def extract_min(self) -> int:
        """Remove and return the smallest value."""
        if self.is_empty():
            raise IndexError("Cannot extract from an empty heap")

        min_value: int = self._data[0]
        last_value: int = self._data.pop()

        if len(self._data) > 0:
            self._data[0] = last_value
            self._bubble_down(0)

        return min_value
```

### Let Us Try It Out

```python
heap: MinHeap = MinHeap()
heap.insert(5)
heap.insert(3)
heap.insert(8)
heap.insert(1)
heap.insert(10)

print(heap.peek())          # 1 -- the smallest item
print(heap.extract_min())   # 1 -- removes and returns the smallest
print(heap.extract_min())   # 3 -- now this is the smallest
print(heap.extract_min())   # 5
print(heap.extract_min())   # 8
print(heap.extract_min())   # 10
```

Notice something cool? If you keep extracting the minimum, you get all the values in sorted order! This is actually the idea behind a sorting method called **heap sort**.

---

## Priority Queue -- The Real-World Use of Heaps

![A flat vector illustration in a children's educational book style showing Byte the robot in a hospital-like waiting room, organizing colorful patient cards by urgency level, with the most urgent card moving to the front of the line. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

A **priority queue** is like a regular queue (first in, first out), but with a twist: instead of always serving whoever arrived first, it serves whoever has the **highest priority**.

Think about a hospital emergency room. If someone comes in with a paper cut and then someone comes in with a broken arm, the broken arm gets treated first -- even though they arrived second. The most urgent patient always goes first.

A heap is the perfect way to build a priority queue! The highest-priority item is always at the top.

```python
import heapq


class PriorityQueue:
    """A priority queue where lower numbers mean higher priority."""

    def __init__(self) -> None:
        self._entries: list[tuple[int, str]] = []

    def enqueue(self, item: str, priority: int) -> None:
        """Add an item with a priority (lower number = more urgent)."""
        heapq.heappush(self._entries, (priority, item))

    def dequeue(self) -> str:
        """Remove and return the most urgent item."""
        if len(self._entries) == 0:
            raise IndexError("Cannot dequeue from an empty priority queue")
        priority: int
        item: str
        priority, item = heapq.heappop(self._entries)
        return item

    def is_empty(self) -> bool:
        """Check if the priority queue is empty."""
        return len(self._entries) == 0
```

```python
er: PriorityQueue = PriorityQueue()
er.enqueue("paper cut", 5)          # low priority
er.enqueue("broken arm", 2)         # medium priority
er.enqueue("stopped breathing", 1)  # highest priority
er.enqueue("headache", 4)           # low-ish priority

print(er.dequeue())  # "stopped breathing" -- most urgent first
print(er.dequeue())  # "broken arm"
print(er.dequeue())  # "headache"
print(er.dequeue())  # "paper cut" -- least urgent last
```

---

## Python's heapq Module -- The Built-In Heap

Python comes with a built-in heap module called `heapq`. It works directly on regular Python lists and gives you min-heap behavior.

```python
import heapq

data: list[int] = []
heapq.heappush(data, 5)
heapq.heappush(data, 3)
heapq.heappush(data, 8)
heapq.heappush(data, 1)

print(data)                 # [1, 3, 8, 5] -- internal heap order
print(heapq.heappop(data))  # 1 -- pops the smallest
print(heapq.heappop(data))  # 3
```

You can also turn an existing list into a heap:

```python
numbers: list[int] = [9, 7, 5, 3, 1]
heapq.heapify(numbers)
print(numbers)  # [1, 3, 5, 9, 7] -- rearranged into heap order
```

Now that you have built a heap from scratch, you understand exactly what `heapq` is doing under the hood. It is using the same bubble-up and bubble-down tricks you just learned!

---

## Finding the Kth Largest Element

Here is a practical problem: given a list of numbers, find the 3rd largest (or kth largest) number.

The clever trick is to use a min-heap that only holds k items. As you go through the numbers, you keep the k largest ones in the heap. The smallest of those k items (the heap's root) is your answer!

```python
import heapq


def find_kth_largest(numbers: list[int], k: int) -> int:
    """Find the kth largest number in a list."""
    # Start with the first k numbers
    heap: list[int] = numbers[:k]
    heapq.heapify(heap)

    # Go through the rest of the numbers
    for num in numbers[k:]:
        if num > heap[0]:
            # This number is bigger than the smallest in our heap.
            # Swap it in!
            heapq.heapreplace(heap, num)

    # The root of the heap is the kth largest
    return heap[0]
```

```python
scores: list[int] = [45, 92, 67, 23, 88, 75, 31, 99, 54]
print(find_kth_largest(scores, 1))  # 99 (the 1st largest)
print(find_kth_largest(scores, 3))  # 88 (the 3rd largest)
```

---

## How Fast Is a Heap?

| What you do | How fast | Why |
|---|---|---|
| Peek (look at the smallest) | Instant | It is always at position 0 |
| Insert (add a value) | Fast | Bubble up through at most log n levels |
| Extract min (remove smallest) | Fast | Bubble down through at most log n levels |
| Search (find a specific value) | Slow | No shortcut -- must check everywhere |

"log n" means that if you have 1000 items, it takes only about 10 steps. If you have a million items, it takes only about 20 steps. The heap is very efficient for what it does -- keeping track of the smallest (or biggest) item.

---

## Practice Questions

Try to answer each question on your own before looking at the answers at the bottom of this page.

**Question 1.** What is the difference between a min-heap and a max-heap? Which value sits at the root in each one?

**Question 2.** Given this min-heap stored as a list: `[2, 5, 8, 10, 7]`

Draw the tree that this list represents. Use the formulas to figure out which nodes are parents and children.

**Question 3.** Starting with an empty min-heap, insert the values 6, 4, 8, 2, 5 one at a time. Show the list after each insert.

**Question 4.** You have this min-heap: `[1, 3, 5, 7, 9]`. You call `extract_min()`. Walk through each step: what value is returned, what happens to the list, and what does the bubble-down process look like?

**Question 5.** Why can a heap be stored in a plain list without needing a TreeNode class? What property of the heap makes this possible?

**Question 6.** A regular queue serves people in the order they arrived (first in, first out). A priority queue serves the most urgent person first. Give two real-life examples (not from programming) where a priority queue would be more useful than a regular queue.

**Question 7.** Write a function called `heap_sort` that takes a list of numbers and returns a new list with the numbers in sorted order, using a heap. Hint: insert all numbers into a MinHeap, then extract them one by one.

![A flat vector illustration in a children's educational book style showing Byte the robot celebrating next to a perfectly organized pyramid of numbered blocks, with the number 1 at the top glowing brightly. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Key Takeaways

1. A **heap** is a tree where every parent is smaller (min-heap) or bigger (max-heap) than its children.
2. The smallest value in a min-heap is always at the **root** (position 0).
3. Heaps are stored as **plain lists** using a clever formula for parent and child positions.
4. **Insert** adds to the end and bubbles up. **Extract min** removes the top and bubbles down.
5. **Peek** is instant -- just look at position 0.
6. A **priority queue** uses a heap to always serve the most urgent item first.
7. Python's **heapq** module gives you built-in heap operations on regular lists.

---

**Previous:** [[wiki:python-jr-ds-trees]] | **Next:** [[wiki:python-jr-ds-hash-tables]]

---

## Answers to Practice Questions

**Answer 1.** A **min-heap** keeps the smallest value at the root. Every parent is smaller than or equal to its children. A **max-heap** keeps the biggest value at the root. Every parent is bigger than or equal to its children. In a min-heap, the root holds the minimum; in a max-heap, the root holds the maximum.

**Answer 2.** The list `[2, 5, 8, 10, 7]` represents this tree:

```
        2
       / \
      5    8
     / \
   10    7
```

Here is how to figure it out:
- Position 0: **2** is the root.
- Position 1: **5** is the left child of position 0 (2*0+1 = 1).
- Position 2: **8** is the right child of position 0 (2*0+2 = 2).
- Position 3: **10** is the left child of position 1 (2*1+1 = 3).
- Position 4: **7** is the right child of position 1 (2*1+2 = 4).

You can verify the heap rule: 2 < 5, 2 < 8, 5 < 10, 5 < 7. All parents are smaller than their children.

**Answer 3.** Starting with an empty heap, inserting 6, 4, 8, 2, 5:

1. Insert **6**: List is `[6]`. Only one item, nothing to bubble.
2. Insert **4**: List becomes `[6, 4]`. Compare 4 with parent 6. 4 < 6, so swap. List is `[4, 6]`.
3. Insert **8**: List becomes `[4, 6, 8]`. Compare 8 with parent 4. 8 > 4, so stop. List stays `[4, 6, 8]`.
4. Insert **2**: List becomes `[4, 6, 8, 2]`. Compare 2 with parent 6 (at position 1). 2 < 6, swap. List is `[4, 2, 8, 6]`. Compare 2 with parent 4 (at position 0). 2 < 4, swap. List is `[2, 4, 8, 6]`.
5. Insert **5**: List becomes `[2, 4, 8, 6, 5]`. Compare 5 with parent 4 (at position 1). 5 > 4, so stop. Final list: `[2, 4, 8, 6, 5]`.

**Answer 4.** Starting heap: `[1, 3, 5, 7, 9]`

1. **Save the min**: 1 is returned.
2. **Pop the last item** (9) and **place it at the root**: List becomes `[9, 3, 5, 7]`.
3. **Bubble down**: Compare 9 with its children (3 at position 1, and 5 at position 2). The smaller child is 3. Since 9 > 3, swap them. List becomes `[3, 9, 5, 7]`.
4. Now 9 is at position 1. Its only child is 7 (at position 3). Since 9 > 7, swap. List becomes `[3, 7, 5, 9]`.
5. Now 9 is at position 3 with no children. Done! The heap rule is restored.

The function returns **1**, and the heap is now `[3, 7, 5, 9]`.

**Answer 5.** A heap can be stored in a plain list because it is a **complete binary tree** -- every level is fully filled (except possibly the last, which is filled from left to right). This means there are no gaps, so the positions of nodes follow a predictable pattern. The parent-child relationships can be calculated using simple math formulas instead of needing pointers. A regular binary tree might have gaps (a node might have a right child but no left child), which would waste space in a list.

**Answer 6.** Two real-life examples of priority queues:

1. **A fire department receiving emergency calls.** A house fire would be treated as higher priority than a cat stuck in a tree, even if the cat call came in first. The most dangerous situation gets responded to first.

2. **An airline boarding process.** Passengers who need extra time board first, then first class, then business class, then economy. It is not strictly "first in line boards first" -- priority matters.

**Answer 7.**

```python
def heap_sort(numbers: list[int]) -> list[int]:
    """Sort a list of numbers using a heap."""
    heap: MinHeap = MinHeap()
    for num in numbers:
        heap.insert(num)

    sorted_list: list[int] = []
    while not heap.is_empty():
        sorted_list.append(heap.extract_min())

    return sorted_list
```

```python
print(heap_sort([8, 3, 1, 5, 9, 2]))  # [1, 2, 3, 5, 8, 9]
```

This works because each `extract_min` always gives you the next smallest value. By extracting all of them, you build up a sorted list from smallest to biggest.
