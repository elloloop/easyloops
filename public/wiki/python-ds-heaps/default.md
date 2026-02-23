# Heaps and Priority Queues — Always Know the Extreme

You learned about Binary Search Trees in the previous section. A BST keeps all elements in sorted order, so you can find any value in O(log n). But what if you do not need full sorting? What if you only care about one thing: **what is the smallest (or largest) element right now?**

That is what a heap does. It answers the question "what is the minimum?" in O(1) time, and it lets you remove that minimum and get the next one in O(log n) time.

---

## The Problem Heaps Solve

Imagine you have a list of tasks with priorities. You always want to work on the highest-priority task first. You could:

1. **Keep an unsorted list.** Adding is fast (O(1)), but finding the minimum means scanning everything (O(n)).
2. **Keep a sorted list.** Finding the minimum is fast (O(1) — it is at the front), but inserting in the right place is O(n).
3. **Use a heap.** Adding is O(log n), finding the minimum is O(1), removing the minimum is O(log n). Best of both worlds.

---

## What Is a Heap?

A heap is a **complete binary tree** that satisfies the **heap property**.

**Complete binary tree** means: every level is fully filled, except possibly the last level, which is filled from left to right. No gaps.

```
Complete:          NOT complete:
      1                  1
     / \                / \
    3   5              3   5
   / \                /     \
  7   9              7       9    <-- gap (5 has no left child)
```

**Heap property** comes in two flavors:

- **Min-heap**: every parent is **less than or equal to** its children. The root is the minimum.
- **Max-heap**: every parent is **greater than or equal to** its children. The root is the maximum.

```
Min-heap:              Max-heap:
      1                    9
     / \                  / \
    3   5                7   5
   / \                  / \
  7   9                3   1
```

Important: a heap is NOT a BST. In a min-heap, the left child can be larger than the right child. The only rule is that parents are smaller than children.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between a heap and a BST? If I have a min-heap with root=2, left child=5, right child=3, is this valid? In a BST, would this be valid? Explain why."</div>
</div>

---

## Array Representation — The Clever Trick

Here is where heaps get elegant. Because a heap is a **complete** binary tree, you can store it in a **flat array** with no pointers needed.

The mapping is:

- The root is at index `0`
- For a node at index `i`:
  - Left child is at index `2 * i + 1`
  - Right child is at index `2 * i + 2`
  - Parent is at index `(i - 1) // 2`

```
Tree view:          Array view:
      1             [1, 3, 5, 7, 9]
     / \             0  1  2  3  4
    3   5
   / \
  7   9

Index 0 (value 1): children at 1 and 2 (values 3 and 5)
Index 1 (value 3): children at 3 and 4 (values 7 and 9)
Index 2 (value 5): children would be at 5 and 6 (don't exist)
```

No `TreeNode` class. No `left`/`right` pointers. Just an array and some index math. This is why heaps are so efficient in practice — they use less memory and have better cache performance than pointer-based trees.

---

## Implement a MinHeap from Scratch

Open your editor. Try to implement the `_bubble_up` and `_bubble_down` methods yourself before looking at the solution.

```python
from typing import Any


class MinHeap:
    """A min-heap implemented from scratch using an array."""

    def __init__(self) -> None:
        self._data: list[int] = []

    def __len__(self) -> int:
        return len(self._data)

    def is_empty(self) -> bool:
        return len(self._data) == 0

    def peek(self) -> int:
        """Return the minimum element without removing it. O(1)."""
        if self.is_empty():
            raise IndexError("Peek at empty heap")
        return self._data[0]

    def _parent_index(self, index: int) -> int:
        """Get the parent's index."""
        return (index - 1) // 2

    def _left_child_index(self, index: int) -> int:
        """Get the left child's index."""
        return 2 * index + 1

    def _right_child_index(self, index: int) -> int:
        """Get the right child's index."""
        return 2 * index + 2

    def _swap(self, i: int, j: int) -> None:
        """Swap two elements in the array."""
        self._data[i], self._data[j] = self._data[j], self._data[i]

    def _bubble_up(self, index: int) -> None:
        """Move an element up until the heap property is restored.

        After inserting at the bottom, the new element might be smaller
        than its parent. Keep swapping it up until it finds the right spot.
        """
        while index > 0:
            parent: int = self._parent_index(index)
            if self._data[index] < self._data[parent]:
                self._swap(index, parent)
                index = parent
            else:
                break

    def _bubble_down(self, index: int) -> None:
        """Move an element down until the heap property is restored.

        After extracting the min, we put the last element at the root.
        It is probably too big. Keep swapping it down with its smaller child.
        """
        size: int = len(self._data)
        while True:
            smallest: int = index
            left: int = self._left_child_index(index)
            right: int = self._right_child_index(index)

            if left < size and self._data[left] < self._data[smallest]:
                smallest = left
            if right < size and self._data[right] < self._data[smallest]:
                smallest = right

            if smallest != index:
                self._swap(index, smallest)
                index = smallest
            else:
                break

    def insert(self, value: int) -> None:
        """Insert a value into the heap. O(log n).

        Step 1: Add to the end of the array (maintains completeness).
        Step 2: Bubble up to restore the heap property.
        """
        self._data.append(value)
        self._bubble_up(len(self._data) - 1)

    def extract_min(self) -> int:
        """Remove and return the minimum element. O(log n).

        Step 1: Save the root (the minimum).
        Step 2: Move the last element to the root.
        Step 3: Bubble down to restore the heap property.
        """
        if self.is_empty():
            raise IndexError("Extract from empty heap")

        min_value: int = self._data[0]
        last_value: int = self._data.pop()

        if len(self._data) > 0:
            self._data[0] = last_value
            self._bubble_down(0)

        return min_value

    def display(self) -> str:
        """Show the internal array."""
        return str(self._data)
```

---

## Understanding Insert (Bubble Up)

When you insert a value, you add it to the end of the array (the bottom-right of the tree). Then you compare it with its parent. If it is smaller, swap them. Keep going until it is in the right place.

```
Insert 2 into this min-heap:

Before:     After adding 2:     After bubble up:
    1              1                 1
   / \            / \               / \
  3   5          3   5             2   5
 /              / \               / \
7              7   2             7   3

Array: [1,3,5,7] -> [1,3,5,7,2] -> [1,2,5,7,3]
```

Step by step:
1. Add 2 at index 4. Parent is at (4-1)//2 = 1 (value 3).
2. 2 < 3, so swap. Now 2 is at index 1, parent at (1-1)//2 = 0 (value 1).
3. 2 > 1, so stop. Heap property restored.

---

## Understanding Extract Min (Bubble Down)

When you remove the minimum (the root), you replace it with the last element in the array, then bubble that element down.

```
Extract min from:           Replace root:          After bubble down:
      1                         7                       3
     / \                       / \                     / \
    3   5                     3   5                   7   5
   / \                       /                       /
  7   9                     9                       9

Array: [1,3,5,7,9] -> [7,3,5,9] -> [3,7,5,9]
```

Step by step:
1. Save 1 (the min). Pop 9 from the end. Put 7 at index 0.
2. Compare 7 with children: left=3, right=5. Smallest child is 3.
3. 7 > 3, so swap. Now 7 is at index 1.
4. 7's children: left=9 (index 3). 7 < 9, so stop.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have a min-heap stored as array [2, 5, 8, 10, 7]. I insert the value 3. Show me the array after each step of the bubble-up process. Then extract the min and show me the array after each step of bubble-down."</div>
</div>

---

## Heapify — Building a Heap from an Array

If you have an existing array and want to turn it into a heap, you could insert each element one by one: O(n log n). But there is a faster way.

Start from the last non-leaf node and bubble down each one. This runs in **O(n)** time (not O(n log n) — the math works out because most nodes are near the bottom and barely need to move).

```python
def heapify(arr: list[int]) -> MinHeap:
    """Build a min-heap from an existing array. O(n)."""
    heap: MinHeap = MinHeap()
    heap._data = arr[:]  # Copy the array

    # Start from the last non-leaf node and bubble down each one
    last_non_leaf: int = (len(heap._data) // 2) - 1
    for i in range(last_non_leaf, -1, -1):
        heap._bubble_down(i)

    return heap
```

```python
arr: list[int] = [9, 7, 5, 3, 1]
heap: MinHeap = heapify(arr)
print(heap.display())  # [1, 3, 5, 9, 7]
```

---

## Try It Out

```python
h: MinHeap = MinHeap()
h.insert(5)
h.insert(3)
h.insert(8)
h.insert(1)
h.insert(10)

print(h.peek())          # 1
print(h.extract_min())   # 1
print(h.extract_min())   # 3
print(h.extract_min())   # 5
print(h.display())       # [8, 10]
```

Notice: extracting all elements in order gives you a sorted sequence. This is the basis of **heap sort**.

---

## Time Complexity Summary

| Operation | Time Complexity | Why |
|-----------|----------------|-----|
| peek (get min) | O(1) | The root is always the minimum |
| insert | O(log n) | Bubble up at most log n levels |
| extract_min | O(log n) | Bubble down at most log n levels |
| heapify (build) | O(n) | Bottom-up construction |
| search | O(n) | No ordering other than parent < children |

**In plain language:** The height of a complete binary tree with n nodes is log n. Bubble up and bubble down both travel at most from a leaf to the root (or vice versa), so they take at most log n steps.

---

## Python's heapq Module

Python has a built-in heap in the `heapq` module. It provides **min-heap** operations on a regular list:

```python
import heapq

data: list[int] = []
heapq.heappush(data, 5)
heapq.heappush(data, 3)
heapq.heappush(data, 8)
heapq.heappush(data, 1)

print(data)              # [1, 3, 8, 5] — internal heap order
print(heapq.heappop(data))  # 1
print(heapq.heappop(data))  # 3
```

**For a max-heap**, Python does not provide one. The standard trick is to negate your values:

```python
max_heap: list[int] = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -8)

largest: int = -heapq.heappop(max_heap)  # 8
print(largest)
```

Ugly, but it works. Now that you have built a heap from scratch, you understand why this trick works — negating reverses the ordering, so the "minimum" of the negated values is actually the maximum of the original values.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why does Python's heapq not have a max-heap? Show me how to use heapq to efficiently find the 3 largest elements in the list [4, 1, 9, 7, 3, 8, 2, 6, 5]. What is the time complexity of your approach?"</div>
</div>

---

## Priority Queue Using a Heap

A priority queue is an abstract concept: "give me the highest-priority item." A heap is the standard implementation.

```python
class PriorityQueue:
    """A priority queue implemented with a min-heap.
    Lower number = higher priority.
    """

    def __init__(self) -> None:
        self._heap: MinHeap = MinHeap()
        self._entries: list[tuple[int, str]] = []

    def enqueue(self, item: str, priority: int) -> None:
        """Add an item with a priority."""
        import heapq
        heapq.heappush(self._entries, (priority, item))

    def dequeue(self) -> str:
        """Remove and return the highest-priority item."""
        import heapq
        if len(self._entries) == 0:
            raise IndexError("Dequeue from empty priority queue")
        priority: int
        item: str
        priority, item = heapq.heappop(self._entries)
        return item

    def is_empty(self) -> bool:
        return len(self._entries) == 0
```

```python
pq: PriorityQueue = PriorityQueue()
pq.enqueue("low priority task", 3)
pq.enqueue("urgent task", 1)
pq.enqueue("medium task", 2)

print(pq.dequeue())  # "urgent task"
print(pq.dequeue())  # "medium task"
print(pq.dequeue())  # "low priority task"
```

---

## Common Interview Patterns

### Kth Largest Element

Use a min-heap of size k. The root is always the kth largest.

```python
import heapq


def find_kth_largest(nums: list[int], k: int) -> int:
    """Find the kth largest element using a min-heap of size k."""
    heap: list[int] = nums[:k]
    heapq.heapify(heap)

    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)

    return heap[0]
```

```python
print(find_kth_largest([3, 1, 5, 2, 4], 2))  # 4 (2nd largest)
```

### Top K Frequent Elements

```python
from collections import Counter


def top_k_frequent(nums: list[int], k: int) -> list[int]:
    """Find the k most frequent elements."""
    count: Counter[int] = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=lambda x: count[x])
```

### Find Median from Data Stream (Two Heaps)

This is a classic: maintain two heaps — a max-heap for the lower half and a min-heap for the upper half. The median is always accessible from the heap roots.

```python
class MedianFinder:
    """Find the median from a stream of numbers using two heaps."""

    def __init__(self) -> None:
        self._lower: list[int] = []   # Max-heap (negated values)
        self._upper: list[int] = []   # Min-heap

    def add_num(self, num: int) -> None:
        """Add a number to the data structure."""
        # Add to lower half (max-heap, so negate)
        heapq.heappush(self._lower, -num)

        # Ensure max of lower <= min of upper
        if (
            len(self._upper) > 0
            and (-self._lower[0]) > self._upper[0]
        ):
            val: int = -heapq.heappop(self._lower)
            heapq.heappush(self._upper, val)

        # Balance sizes: lower can have at most 1 more than upper
        if len(self._lower) > len(self._upper) + 1:
            val = -heapq.heappop(self._lower)
            heapq.heappush(self._upper, val)
        elif len(self._upper) > len(self._lower):
            val = heapq.heappop(self._upper)
            heapq.heappush(self._lower, -val)

    def find_median(self) -> float:
        """Return the current median."""
        if len(self._lower) > len(self._upper):
            return float(-self._lower[0])
        return (-self._lower[0] + self._upper[0]) / 2.0
```

```python
mf: MedianFinder = MedianFinder()
mf.add_num(1)
mf.add_num(5)
print(mf.find_median())  # 3.0
mf.add_num(3)
print(mf.find_median())  # 3.0
mf.add_num(8)
print(mf.find_median())  # 4.0
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain the two-heap approach for finding the running median. Why do we use a max-heap for the lower half and a min-heap for the upper half? What invariant must we maintain about the sizes of the two heaps? Walk through adding the numbers 5, 2, 8, 1, 4 one at a time."</div>
</div>

---

## Where People Go Wrong

**1. Heap vs BST confusion.** A heap does NOT keep all elements sorted. It only guarantees the root is the min (or max). You cannot do "find the 3rd smallest" efficiently without extracting elements.

**2. Forgetting 0-based indexing.** If your array is 0-indexed: left child = `2i + 1`, right child = `2i + 2`, parent = `(i - 1) // 2`. Some textbooks use 1-based indexing (left = `2i`, right = `2i + 1`). Pick one and be consistent.

**3. Max-heap with heapq.** Python's `heapq` is min-heap only. To use it as a max-heap, you must negate values on insert and negate again on extract. Forgetting to negate on extract is a common bug.

**4. Not checking bounds in bubble_down.** Before comparing with a child, check that the child index is within the array bounds. Otherwise you get an `IndexError`.

**5. Confusing heapify with repeated insert.** Heapify (building a heap from an array) is O(n). Inserting n elements one at a time is O(n log n). Use heapify when you have all elements upfront.

---

## Key Takeaways

1. A heap is a complete binary tree stored as an array.
2. Min-heap: parent is always smaller than children. Root is the minimum.
3. Insert: add to end, bubble up. O(log n).
4. Extract min: swap root with last, remove last, bubble down. O(log n).
5. Peek: just look at the root. O(1).
6. Heapify: build a heap from an array in O(n).
7. Python's `heapq` provides min-heap. Negate values for max-heap.
8. Priority queues are built on heaps.

---

**Previous:** [[wiki:python-ds-trees]] | **Next:** [[wiki:python-ds-hash-tables]]
