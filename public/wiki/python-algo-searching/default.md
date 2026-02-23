# Searching Algorithms -- Finding What You Need

Searching is the other fundamental operation in computing. You have data. You need to find something in it. How fast can you do it?

The answer depends entirely on whether your data is organized. Searching unsorted data is slow. Searching sorted data is fast. That is why sorting matters.

In this section you will implement linear search and binary search, understand their tradeoffs, and learn the binary search pattern that shows up in dozens of problems beyond just "find this number in an array."

Open your editor. Every algorithm here should be typed and tested by you.

---

## Linear Search -- Check Every Element

The simplest possible search. Start at the beginning, check each element, stop when you find it or reach the end.

**Time complexity:** O(n) -- you might have to check every element.
**Space complexity:** O(1) -- no extra data structures.

### When to Use Linear Search

- The data is unsorted
- The dataset is small (under a few hundred elements)
- You only need to search once (sorting first would cost more than linear search)

### Implementation

```python
def linear_search(arr: list[int], target: int) -> int:
    """Return the index of target, or -1 if not found."""
    i: int = 0
    while i < len(arr):
        if arr[i] == target:
            return i
        i += 1
    return -1
```

### Trace

```
linear_search([4, 2, 7, 1, 9, 3], target=7)

i=0: arr[0]=4, not 7
i=1: arr[1]=2, not 7
i=2: arr[2]=7, found it! return 2
```

```
linear_search([4, 2, 7, 1, 9, 3], target=5)

i=0: arr[0]=4, not 5
i=1: arr[1]=2, not 5
i=2: arr[2]=7, not 5
i=3: arr[3]=1, not 5
i=4: arr[4]=9, not 5
i=5: arr[5]=3, not 5
i=6: i >= len(arr), stop -> return -1
```

Linear search always works, but it is slow for large datasets. If you have a million elements and the target is not there, you check all million.

---

## Binary Search -- Divide the Search Space in Half

Binary search is one of the most important algorithms ever invented. The idea: if the data is sorted, you can eliminate half of the remaining elements with every comparison.

**Time complexity:** O(log n) -- each step cuts the search space in half.
**Space complexity:** O(1) for iterative, O(log n) for recursive.
**Requirement:** The data MUST be sorted.

### What O(log n) Actually Means

With 1,000,000 elements:
- Linear search: up to 1,000,000 comparisons
- Binary search: up to 20 comparisons (because log2(1,000,000) is about 20)

That is the power of halving. Each step eliminates half the remaining data.

### The Pattern: left, right, mid

Every binary search uses three variables:
- `left` -- the start of the current search range
- `right` -- the end of the current search range
- `mid` -- the middle element, calculated as `(left + right) // 2`

### Iterative Implementation (Preferred)

```python
def binary_search(arr: list[int], target: int) -> int:
    """Return the index of target in sorted arr, or -1 if not found."""
    left: int = 0
    right: int = len(arr) - 1

    while left <= right:
        mid: int = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1   # target is in the right half
        else:
            right = mid - 1  # target is in the left half

    return -1
```

### Step-by-Step Trace

Let us trace `binary_search([1, 3, 5, 7, 9, 11, 13, 15], target=7)`:

```
Starting: arr = [1, 3, 5, 7, 9, 11, 13, 15]
          left=0, right=7

Step 1: mid = (0 + 7) // 2 = 3
        arr[3] = 7
        7 == 7 -> found! return 3
```

That was fast. Let us try `target=11`:

```
Starting: arr = [1, 3, 5, 7, 9, 11, 13, 15]
          left=0, right=7

Step 1: mid = (0 + 7) // 2 = 3
        arr[3] = 7
        7 < 11 -> target is in the right half
        left = 4

Step 2: mid = (4 + 7) // 2 = 5
        arr[5] = 11
        11 == 11 -> found! return 5
```

Now `target=6` (not in the array):

```
Starting: arr = [1, 3, 5, 7, 9, 11, 13, 15]
          left=0, right=7

Step 1: mid = 3, arr[3]=7, 7 > 6 -> right = 2

Step 2: mid = 1, arr[1]=3, 3 < 6 -> left = 2

Step 3: mid = 2, arr[2]=5, 5 < 6 -> left = 3

Step 4: left=3 > right=2 -> loop ends -> return -1
```

The search space shrank from 8 elements to 4 to 2 to 1 to 0. Three comparisons instead of eight.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning binary search. For the sorted array [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], trace through binary search step by step for target=14 and target=5. Show left, right, and mid at each step. How many comparisons does each search take? How many would linear search take for the same targets?"</div>
</div>

---

## Recursive Binary Search

The same idea expressed recursively. Less common in practice but important to understand.

```python
def binary_search_recursive(arr: list[int], target: int, left: int, right: int) -> int:
    """Return the index of target in sorted arr, or -1 if not found."""
    if left > right:
        return -1

    mid: int = (left + right) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

Calling it:

```python
data: list[int] = [1, 3, 5, 7, 9, 11]
result: int = binary_search_recursive(data, 7, 0, len(data) - 1)
print(result)  # 3
```

The iterative version is preferred because it does not use the call stack and cannot cause a stack overflow.

---

## Finding the Insertion Point

Sometimes you do not need to find an exact match. You need to find WHERE to insert a value to keep the array sorted. This is what `bisect_left` and `bisect_right` do.

### bisect_left: Find the Leftmost Position

```python
def bisect_left(arr: list[int], target: int) -> int:
    """Return the index where target should be inserted (left of existing)."""
    left: int = 0
    right: int = len(arr)

    while left < right:
        mid: int = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left
```

### bisect_right: Find the Rightmost Position

```python
def bisect_right(arr: list[int], target: int) -> int:
    """Return the index after any existing values equal to target."""
    left: int = 0
    right: int = len(arr)

    while left < right:
        mid: int = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid

    return left
```

### Difference Between the Two

```
arr = [1, 3, 5, 5, 5, 7, 9]

bisect_left(arr, 5)  -> 2  (index of the FIRST 5)
bisect_right(arr, 5) -> 5  (index AFTER the LAST 5)
```

This lets you find the first and last occurrence of a value:

```python
def find_first_occurrence(arr: list[int], target: int) -> int:
    """Return index of first occurrence of target, or -1 if not found."""
    idx: int = bisect_left(arr, target)
    if idx < len(arr) and arr[idx] == target:
        return idx
    return -1


def find_last_occurrence(arr: list[int], target: int) -> int:
    """Return index of last occurrence of target, or -1 if not found."""
    idx: int = bisect_right(arr, target) - 1
    if idx >= 0 and arr[idx] == target:
        return idx
    return -1
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "For the sorted array [1, 2, 2, 2, 3, 4, 5], what does bisect_left return for target=2? What does bisect_right return for target=2? How would you use these to count how many times 2 appears in the array? Write the code."</div>
</div>

---

## Binary Search Variants

Binary search is not just "find a number in a sorted array." The core idea -- eliminate half the search space each step -- applies to many problems.

### Search in a Rotated Sorted Array

A sorted array that has been rotated: `[4, 5, 6, 7, 0, 1, 2]`. The array was `[0, 1, 2, 4, 5, 6, 7]` before rotation.

```python
def search_rotated(arr: list[int], target: int) -> int:
    """Find target in a rotated sorted array. Return index or -1."""
    left: int = 0
    right: int = len(arr) - 1

    while left <= right:
        mid: int = (left + right) // 2

        if arr[mid] == target:
            return mid

        # left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1
```

The key insight: even in a rotated array, at least one half is always sorted. Check if the target falls in the sorted half. If yes, search there. If no, search the other half.

### Search for a Peak Element

A peak element is an element that is greater than its neighbors. Find any peak.

```python
def find_peak(arr: list[int]) -> int:
    """Return the index of any peak element."""
    left: int = 0
    right: int = len(arr) - 1

    while left < right:
        mid: int = (left + right) // 2

        if arr[mid] < arr[mid + 1]:
            left = mid + 1   # peak is to the right
        else:
            right = mid       # peak is at mid or to the left

    return left
```

### Search in a 2D Matrix

A 2D matrix where each row is sorted and the first element of each row is greater than the last element of the previous row. Treat it as a flat sorted array.

```python
def search_matrix(matrix: list[list[int]], target: int) -> bool:
    """Search for target in a sorted 2D matrix."""
    if not matrix or not matrix[0]:
        return False

    rows: int = len(matrix)
    cols: int = len(matrix[0])
    left: int = 0
    right: int = rows * cols - 1

    while left <= right:
        mid: int = (left + right) // 2
        row: int = mid // cols
        col: int = mid % cols
        value: int = matrix[row][col]

        if value == target:
            return True
        elif value < target:
            left = mid + 1
        else:
            right = mid - 1

    return False
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning binary search variants. (1) For the rotated sorted array [6, 7, 8, 1, 2, 3, 4, 5], trace through the search algorithm for target=3. Show left, right, and mid at each step. How do you determine which half is sorted? (2) For the array [1, 3, 5, 4, 2], find a peak element using binary search. Trace the steps. (3) Search for 14 in this 2D matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]]. Show how you convert 2D coordinates to a flat index. (4) Why can binary search find a peak element in O(log n) even though the array is not sorted?"</div>
</div>

---

## Binary Search on Answer

This is the most powerful application of binary search. Instead of searching for a value in an array, you search for the answer to a problem.

The key requirement: the answer space must be **monotonic**. If answer X works, then all answers greater than X also work (or vice versa).

### Example: Minimum Capacity to Ship Packages

You have packages with weights `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. You need to ship them in order within `days=5` days. What is the minimum ship capacity?

The answer is somewhere between `max(weights)` (you must fit the heaviest package) and `sum(weights)` (ship everything in one day).

```python
def ship_within_days(weights: list[int], days: int) -> int:
    """Find minimum ship capacity to deliver all packages within given days."""

    def can_ship(capacity: int) -> bool:
        """Check if all packages can be shipped within the day limit."""
        current_load: int = 0
        days_needed: int = 1
        i: int = 0
        while i < len(weights):
            if current_load + weights[i] > capacity:
                days_needed += 1
                current_load = 0
            current_load += weights[i]
            i += 1
        return days_needed <= days

    left: int = max(weights)
    right: int = sum(weights)

    while left < right:
        mid: int = (left + right) // 2
        if can_ship(mid):
            right = mid       # try a smaller capacity
        else:
            left = mid + 1    # need more capacity

    return left
```

### Example: Koko Eating Bananas

Koko has piles of bananas `[3, 6, 7, 11]` and `h=8` hours. She eats at speed `k` bananas per hour (one pile at a time, rounds up). Find the minimum `k`.

```python
import math


def min_eating_speed(piles: list[int], h: int) -> int:
    """Find minimum eating speed to finish all piles within h hours."""

    def can_finish(speed: int) -> bool:
        hours_needed: int = 0
        i: int = 0
        while i < len(piles):
            hours_needed += math.ceil(piles[i] / speed)
            i += 1
        return hours_needed <= h

    left: int = 1
    right: int = max(piles)

    while left < right:
        mid: int = (left + right) // 2
        if can_finish(mid):
            right = mid
        else:
            left = mid + 1

    return left
```

The pattern is always the same:
1. Define the search space (minimum possible answer to maximum possible answer)
2. Write a function that checks "is this answer good enough?"
3. Binary search for the smallest (or largest) good-enough answer

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning binary search on answer. A farmer has fields producing [5, 10, 15, 20] tons of crops. He has 3 trucks. Each truck has the same capacity. He must load fields in order (no splitting). What is the minimum truck capacity so that all crops fit in 3 trucks? Set up the binary search: what is left? What is right? Write the can_load function and the full binary search solution with type hints."</div>
</div>

---

## Python's bisect Module

Python has a built-in module for binary search operations on sorted lists:

```python
import bisect

arr: list[int] = [1, 3, 5, 7, 9, 11]

# find insertion point (left side of duplicates)
pos: int = bisect.bisect_left(arr, 5)
print(pos)  # 2

# find insertion point (right side of duplicates)
pos = bisect.bisect_right(arr, 5)
print(pos)  # 3

# insert and keep sorted
bisect.insort(arr, 6)
print(arr)  # [1, 3, 5, 6, 7, 9, 11]
```

Use `bisect` in production code. Implement binary search yourself for learning and interviews.

---

## Where People Go Wrong

### 1. Off-by-One Errors

The most common bug in binary search. Ask yourself:
- Should it be `while left <= right` or `while left < right`?
- Should it be `right = mid` or `right = mid - 1`?

Rule of thumb: if searching for an exact value, use `left <= right` and `mid +/- 1`. If searching for a boundary (bisect), use `left < right` and `right = mid`.

### 2. Infinite Loops

If you write `left = mid` instead of `left = mid + 1`, and `mid` equals `left`, the loop never progresses. Always ensure the search space shrinks.

### 3. Wrong Mid Calculation

In some languages, `(left + right) / 2` can overflow for large values. In Python this is not a problem because Python handles big integers. But in other languages, use `left + (right - left) // 2`.

### 4. Forgetting That Binary Search Requires Sorted Data

Binary search on unsorted data gives wrong results silently. No error, just wrong answers.

### 5. Using Binary Search When Linear Search is Fine

If your array has 20 elements, linear search is perfectly fine and simpler to write correctly. Binary search shines on large datasets.

---

## Practice Exercises

1. Implement binary search iteratively. Test with `[1, 3, 5, 7, 9, 11, 13]` for targets 7, 1, 13, 6, and 0.

2. Implement `find_first_occurrence` and `find_last_occurrence`. Test with `[1, 2, 2, 2, 3, 4, 4, 5]` for targets 2 and 4.

3. Implement search in a rotated sorted array. Test with `[4, 5, 6, 7, 0, 1, 2]` for targets 0, 3, and 5.

4. Solve the shipping packages problem: weights `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, days = 5. The answer should be 15.

5. Open your editor. Write a function that uses binary search to find the square root of a number (integer part only). For example, `sqrt(16) = 4` and `sqrt(20) = 4`.

---

**Previous:** [[wiki:python-algo-sorting]] | **Next:** [[wiki:python-algo-recursion]]
