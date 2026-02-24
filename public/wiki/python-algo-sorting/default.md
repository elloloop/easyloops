# Sorting Algorithms -- Putting Things in Order

Sorting is one of the most studied problems in computer science. Why? Because sorted data is useful data. You cannot do binary search on unsorted data. You cannot efficiently find duplicates without sorting. You cannot merge datasets cleanly without sorting.

In this section you will implement five sorting algorithms from scratch, understand when each one is the right choice, and learn why Python's built-in sort is almost always what you should use in production.

Open your editor. You will write every sorting algorithm yourself.

---

## Why Sorting Matters

Think about a phone book. If the names were in random order, finding someone would mean checking every single entry. Sorting makes the phone book usable.

Sorting enables:
- **Binary search** -- only works on sorted data (O(log n) instead of O(n))
- **Finding duplicates** -- sorted duplicates are adjacent, easy to spot
- **Merging datasets** -- two sorted lists can be merged in O(n)
- **Finding the median** -- sort first, then pick the middle element
- **Displaying data** -- users expect to see things in order

---

## Bubble Sort -- The Simplest Sort

The idea: walk through the list, compare adjacent elements, swap them if they are in the wrong order. Repeat until no swaps are needed.

It is called "bubble" sort because larger values "bubble up" to the end of the list with each pass.

**Time complexity:** O(n^2) -- two nested loops over the data.
**Space complexity:** O(1) -- sorts in place, no extra arrays.
**Stable:** Yes -- equal elements keep their original order.

### Implementation

```python
def bubble_sort(arr: list[int]) -> list[int]:
    n: int = len(arr)
    i: int = 0
    while i < n:
        swapped: bool = False
        j: int = 0
        while j < n - 1 - i:
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
            j += 1
        if not swapped:
            break  # already sorted, stop early
        i += 1
    return arr
```

### Step-by-Step Trace

Let us trace `bubble_sort([5, 3, 8, 1, 2])`:

```
Starting array: [5, 3, 8, 1, 2]

Pass i=0:
  j=0: compare 5 and 3 -> swap -> [3, 5, 8, 1, 2]
  j=1: compare 5 and 8 -> no swap
  j=2: compare 8 and 1 -> swap -> [3, 5, 1, 8, 2]
  j=3: compare 8 and 2 -> swap -> [3, 5, 1, 2, 8]
  (8 is now in its correct position)

Pass i=1:
  j=0: compare 3 and 5 -> no swap
  j=1: compare 5 and 1 -> swap -> [3, 1, 5, 2, 8]
  j=2: compare 5 and 2 -> swap -> [3, 1, 2, 5, 8]
  (5 is now in its correct position)

Pass i=2:
  j=0: compare 3 and 1 -> swap -> [1, 3, 2, 5, 8]
  j=1: compare 3 and 2 -> swap -> [1, 2, 3, 5, 8]
  (3 is now in its correct position)

Pass i=3:
  j=0: compare 1 and 2 -> no swap
  No swaps happened -> break early

Final: [1, 2, 3, 5, 8]
```

Open your editor. Implement bubble sort yourself without looking at the code above. Then test it with `[64, 34, 25, 12, 22, 11, 90]`.

---

## Selection Sort -- Find the Minimum Each Time

The idea: find the smallest element in the unsorted portion, swap it into the next position in the sorted portion.

**Time complexity:** O(n^2) -- always, even if already sorted.
**Space complexity:** O(1) -- sorts in place.
**Stable:** No -- swapping can change the relative order of equal elements.

### Implementation

```python
def selection_sort(arr: list[int]) -> list[int]:
    n: int = len(arr)
    i: int = 0
    while i < n:
        min_idx: int = i
        j: int = i + 1
        while j < n:
            if arr[j] < arr[min_idx]:
                min_idx = j
            j += 1
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        i += 1
    return arr
```

### Step-by-Step Trace

Trace `selection_sort([29, 10, 14, 37, 13])`:

```
Starting array: [29, 10, 14, 37, 13]

i=0: find min in [29, 10, 14, 37, 13] -> min is 10 at index 1
     swap arr[0] and arr[1] -> [10, 29, 14, 37, 13]

i=1: find min in [29, 14, 37, 13] -> min is 13 at index 4
     swap arr[1] and arr[4] -> [10, 13, 14, 37, 29]

i=2: find min in [14, 37, 29] -> min is 14 at index 2
     swap arr[2] and arr[2] -> [10, 13, 14, 37, 29] (no change)

i=3: find min in [37, 29] -> min is 29 at index 4
     swap arr[3] and arr[4] -> [10, 13, 14, 29, 37]

i=4: only one element left, already in place

Final: [10, 13, 14, 29, 37]
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning sorting algorithms. Explain the difference between bubble sort and selection sort. For the array [7, 2, 5, 1, 8, 3], trace through both algorithms step by step. How many swaps does each one make? Which one always makes fewer swaps and why?"</div>
</div>

---

## Insertion Sort -- Build the Sorted Portion One Element at a Time

The idea: take one element at a time and insert it into its correct position in the already-sorted portion on the left.

Think of sorting a hand of playing cards. You pick up one card at a time and slide it into the right spot among the cards you are already holding.

**Time complexity:** O(n^2) worst case, but O(n) when the array is already sorted or nearly sorted.
**Space complexity:** O(1) -- sorts in place.
**Stable:** Yes -- equal elements keep their original order.

This makes insertion sort surprisingly useful for small arrays and nearly-sorted data.

### Implementation

```python
def insertion_sort(arr: list[int]) -> list[int]:
    n: int = len(arr)
    i: int = 1
    while i < n:
        key: int = arr[i]
        j: int = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        i += 1
    return arr
```

### Step-by-Step Trace

Trace `insertion_sort([5, 2, 4, 6, 1, 3])`:

```
Starting: [5, 2, 4, 6, 1, 3]

i=1: key=2, compare with 5 -> shift 5 right -> insert 2 at position 0
     [2, 5, 4, 6, 1, 3]

i=2: key=4, compare with 5 -> shift 5 right
     compare with 2 -> 2 < 4, stop -> insert 4 at position 1
     [2, 4, 5, 6, 1, 3]

i=3: key=6, compare with 5 -> 5 < 6, stop -> insert 6 at position 3 (no shift)
     [2, 4, 5, 6, 1, 3]

i=4: key=1, compare with 6 -> shift, compare with 5 -> shift,
     compare with 4 -> shift, compare with 2 -> shift
     insert 1 at position 0
     [1, 2, 4, 5, 6, 3]

i=5: key=3, compare with 6 -> shift, compare with 5 -> shift,
     compare with 4 -> shift, compare with 2 -> 2 < 3, stop
     insert 3 at position 2
     [1, 2, 3, 4, 5, 6]
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why is insertion sort O(n) on already-sorted arrays but O(n^2) on reverse-sorted arrays? Trace through insertion sort on [1, 2, 3, 4, 5] and then on [5, 4, 3, 2, 1]. Count the number of comparisons and shifts in each case. Explain why this makes insertion sort a good choice for 'nearly sorted' data."</div>
</div>

---

## Merge Sort -- Divide and Conquer

This is where we jump from O(n^2) to O(n log n). The idea: split the array in half, sort each half recursively, then merge the two sorted halves together.

The key insight is the **merge step**: merging two already-sorted arrays into one sorted array takes O(n) time.

**Time complexity:** O(n log n) -- always, guaranteed.
**Space complexity:** O(n) -- needs extra space for the merge step.
**Stable:** Yes.

### Implementation

```python
def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    mid: int = len(arr) // 2
    left: list[int] = merge_sort(arr[:mid])
    right: list[int] = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left: list[int], right: list[int]) -> list[int]:
    result: list[int] = []
    i: int = 0
    j: int = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # one of the two halves might have leftovers
    while i < len(left):
        result.append(left[i])
        i += 1

    while j < len(right):
        result.append(right[j])
        j += 1

    return result
```

### Understanding the Merge Step

The merge step is the heart of merge sort. Two sorted halves go in, one sorted array comes out.

```
Merging [2, 5, 8] and [1, 3, 9]:

Step 1: compare 2 and 1 -> take 1   result: [1]
Step 2: compare 2 and 3 -> take 2   result: [1, 2]
Step 3: compare 5 and 3 -> take 3   result: [1, 2, 3]
Step 4: compare 5 and 9 -> take 5   result: [1, 2, 3, 5]
Step 5: compare 8 and 9 -> take 8   result: [1, 2, 3, 5, 8]
Step 6: right has 9 left  -> take 9  result: [1, 2, 3, 5, 8, 9]
```

### Full Trace

Trace `merge_sort([38, 27, 43, 3, 9, 82, 10])`:

```
Split: [38, 27, 43, 3] and [9, 82, 10]

Left side splits:
  [38, 27] and [43, 3]
  [38] and [27] -> merge -> [27, 38]
  [43] and [3]  -> merge -> [3, 43]
  merge [27, 38] and [3, 43] -> [3, 27, 38, 43]

Right side splits:
  [9, 82] and [10]
  [9] and [82] -> merge -> [9, 82]
  merge [9, 82] and [10] -> [9, 10, 82]

Final merge:
  [3, 27, 38, 43] and [9, 10, 82] -> [3, 9, 10, 27, 38, 43, 82]
```

Why O(n log n)? Each level of splitting divides the problem in half (log n levels). At each level, the total merge work is O(n). So: O(n) * O(log n) = O(n log n).

---

## Quick Sort -- Pick a Pivot and Partition

The idea: pick a "pivot" element, put everything smaller to its left and everything larger to its right. Now the pivot is in its final position. Recursively sort the left and right sides.

**Time complexity:** O(n log n) average, O(n^2) worst case (if you always pick the worst pivot).
**Space complexity:** O(log n) for the recursion stack.
**Stable:** No -- partitioning can change the relative order of equal elements.

### Implementation

```python
def quick_sort(arr: list[int], low: int, high: int) -> None:
    if low < high:
        pivot_idx: int = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)


def partition(arr: list[int], low: int, high: int) -> int:
    pivot: int = arr[high]  # choose last element as pivot
    i: int = low - 1        # i tracks the boundary of "smaller" elements

    j: int = low
    while j < high:
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
        j += 1

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

### Understanding the Partition Step

Partition is the heart of quick sort. It rearranges the array so that:
- Everything left of the pivot is smaller or equal
- Everything right of the pivot is larger
- The pivot is in its final sorted position

```
partition([3, 6, 8, 10, 1, 2, 1], low=0, high=6)
pivot = arr[6] = 1

j=0: arr[0]=3, 3 > 1, skip
j=1: arr[1]=6, 6 > 1, skip
j=2: arr[2]=8, 8 > 1, skip
j=3: arr[3]=10, 10 > 1, skip
j=4: arr[4]=1, 1 <= 1, i becomes 0, swap arr[0] and arr[4]
     -> [1, 6, 8, 10, 3, 2, 1]
j=5: arr[5]=2, 2 > 1, skip

Final: swap arr[i+1]=arr[1] with arr[high]=arr[6]
     -> [1, 1, 8, 10, 3, 2, 6]
     pivot index = 1
```

Now `1` is at index 1 -- its final position. Everything to its left (just `1`) is smaller or equal. Everything to its right is larger.

### Calling Quick Sort

```python
data: list[int] = [10, 7, 8, 9, 1, 5]
quick_sort(data, 0, len(data) - 1)
print(data)  # [1, 5, 7, 8, 9, 10]
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning merge sort and quick sort. Explain the difference between the divide step and the combine step in each algorithm. For merge sort, the hard work is in the merge (combine). For quick sort, the hard work is in the partition (divide). Trace through quick sort on the array [4, 7, 2, 6, 1, 3, 5] using the last element as pivot. Show every partition step."</div>
</div>

---

## Counting Sort -- When Your Data is Integers in a Known Range

All the sorts above compare elements. Counting sort does not compare. It counts how many times each value appears, then reconstructs the array.

**Time complexity:** O(n + k) where k is the range of input values.
**Space complexity:** O(k) for the counting array.
**Stable:** Yes (when implemented correctly).
**Limitation:** Only works for integers (or things you can map to integers). If k is very large, it wastes memory.

### Implementation

```python
def counting_sort(arr: list[int]) -> list[int]:
    if len(arr) == 0:
        return arr

    max_val: int = max(arr)
    min_val: int = min(arr)
    range_size: int = max_val - min_val + 1

    count: list[int] = [0] * range_size
    output: list[int] = [0] * len(arr)

    # count occurrences
    i: int = 0
    while i < len(arr):
        count[arr[i] - min_val] += 1
        i += 1

    # build cumulative count
    i = 1
    while i < range_size:
        count[i] += count[i - 1]
        i += 1

    # build output array (go backwards for stability)
    i = len(arr) - 1
    while i >= 0:
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
        i -= 1

    return output
```

### When Counting Sort Works

Counting sort is excellent when:
- Values are integers
- The range of values (k) is not much larger than the number of elements (n)
- Example: sorting exam scores (0-100) for 1000 students -- k=101, n=1000

Counting sort is bad when:
- Values are floats or strings
- The range is huge -- sorting ages (0-120) is fine, sorting account balances (0-1,000,000,000) wastes a billion slots of memory

---

## Comparison Table

| Algorithm      | Best Case   | Average     | Worst Case  | Space  | Stable |
|----------------|-------------|-------------|-------------|--------|--------|
| Bubble Sort    | O(n)        | O(n^2)      | O(n^2)      | O(1)   | Yes    |
| Selection Sort | O(n^2)      | O(n^2)      | O(n^2)      | O(1)   | No     |
| Insertion Sort | O(n)        | O(n^2)      | O(n^2)      | O(1)   | Yes    |
| Merge Sort     | O(n log n)  | O(n log n)  | O(n log n)  | O(n)   | Yes    |
| Quick Sort     | O(n log n)  | O(n log n)  | O(n^2)      | O(log n)| No    |
| Counting Sort  | O(n + k)    | O(n + k)    | O(n + k)    | O(k)   | Yes    |

In simple terms:
- **O(1)** means constant -- does not grow with input size
- **O(n)** means linear -- doubles when input doubles
- **O(n log n)** means slightly more than linear -- the sweet spot for sorting
- **O(n^2)** means quadratic -- 10x the input means 100x the work

---

## Stability -- What It Means and Why It Matters

A sorting algorithm is **stable** if elements with equal values keep their original relative order.

Example: sort students by grade.

```
Before: [("Alice", 90), ("Bob", 85), ("Charlie", 90), ("Diana", 85)]
```

Stable sort by grade:
```
[("Bob", 85), ("Diana", 85), ("Alice", 90), ("Charlie", 90)]
```
Bob comes before Diana because Bob was before Diana in the original list. Alice comes before Charlie for the same reason.

Unstable sort might give:
```
[("Diana", 85), ("Bob", 85), ("Charlie", 90), ("Alice", 90)]
```
The 85s and 90s might be in any order relative to each other.

Stability matters when you sort by multiple criteria. Sort by name first, then by grade. With a stable sort, students with the same grade stay in alphabetical order.

---

## Python's Built-In Sort -- TimSort

Python's `sorted()` and `.sort()` use **TimSort**, a hybrid of merge sort and insertion sort.

```python
numbers: list[int] = [5, 2, 8, 1, 9]

# sorted() returns a new list, original unchanged
sorted_numbers: list[int] = sorted(numbers)
print(sorted_numbers)  # [1, 2, 5, 8, 9]
print(numbers)         # [5, 2, 8, 1, 9] -- unchanged

# .sort() modifies the list in place, returns None
numbers.sort()
print(numbers)         # [1, 2, 5, 8, 9]
```

TimSort's properties:
- **Time:** O(n log n) worst case
- **Space:** O(n)
- **Stable:** Yes
- **Adaptive:** O(n) on already-sorted data

### Custom Sort Keys

```python
words: list[str] = ["banana", "apple", "cherry", "date"]

# sort by length
by_length: list[str] = sorted(words, key=lambda w: len(w))
print(by_length)  # ['date', 'apple', 'banana', 'cherry']

# sort in reverse
descending: list[int] = sorted([3, 1, 4, 1, 5], reverse=True)
print(descending)  # [5, 4, 3, 1, 1]
```

### When to Implement vs Use Built-In

**Almost always use the built-in.** Python's `sorted()` is faster than anything you will write in Python because it is implemented in C.

But you need to **understand** how sorting algorithms work because:
1. Interview questions will ask you to implement them
2. Understanding time complexity helps you choose the right approach
3. The concepts (divide-and-conquer, partitioning) appear in other algorithms
4. Some specialized situations need custom sorting (external sort for huge files)

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning sorting algorithms. Give me a quiz: (1) What is the time complexity of merge sort in the worst case? (2) Why is quick sort O(n^2) in the worst case and what causes it? (3) If I have a list of 1000 exam scores from 0 to 100, which sorting algorithm should I use and why? (4) I have a list of (name, age) tuples and I want to sort by age, keeping people with the same age in alphabetical order. Do I need a stable sort? Explain. (5) Write insertion sort from memory with type hints. (6) Trace through merge sort on [6, 3, 8, 1] showing every split and merge step."</div>
</div>

---

## Where People Go Wrong

1. **Choosing the wrong sort.** For production code, use `sorted()`. For interviews, know the tradeoffs. Bubble sort is never the right answer for large data.

2. **Not understanding stability.** If you are sorting objects with multiple fields and the order within equal groups matters, you need a stable sort. Python's built-in sort is stable.

3. **Off-by-one errors in partition.** Quick sort's partition function is easy to mess up. The boundary variable `i` starts at `low - 1`, not `low`. The final swap puts the pivot at `i + 1`. Get this wrong and your sort breaks silently on some inputs.

4. **Forgetting that quick sort's worst case is O(n^2).** If you always pick the first or last element as pivot and the data is already sorted, quick sort degrades to O(n^2). Randomized pivot selection helps avoid this.

5. **Thinking merge sort is always better than quick sort.** Merge sort guarantees O(n log n) but uses O(n) extra space. Quick sort is often faster in practice due to cache locality and uses less space. The best choice depends on the situation.

---

## Practice Exercises

1. Implement all five comparison sorts (bubble, selection, insertion, merge, quick) from scratch. Test each one with: `[5, 2, 8, 1, 9, 3]`, `[1, 2, 3, 4, 5]` (already sorted), `[5, 4, 3, 2, 1]` (reverse sorted), and `[1]` (single element).

2. Implement counting sort. Test it with exam scores: `[85, 92, 78, 85, 90, 78, 92, 85]`.

3. Write a function that sorts a list of tuples by the second element using Python's `sorted()` with a key function.

4. Measure the actual time difference: sort a list of 10,000 random numbers using your insertion sort vs Python's `sorted()`. Use `time.time()` to measure.

---

**Previous:** [[wiki:python-ds-graphs]] | **Next:** [[wiki:python-algo-searching]]
