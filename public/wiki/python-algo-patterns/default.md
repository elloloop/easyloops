# Common Algorithm Patterns -- Techniques That Solve Families of Problems

Most algorithm problems are not unique. They are variations of a small number of patterns. Once you recognize the pattern, you know the approach.

This section teaches you the most common patterns you will encounter. For each one: the concept, the template, and worked examples with full implementations.

Recognizing patterns is the most valuable algorithm skill. It is more useful than memorizing solutions to individual problems. When you see a new problem, you should think: "What pattern does this look like?"

Open your editor. Implement every example yourself.

---

## Two Pointers

The two-pointer technique uses two indices that move through a data structure (usually a sorted array) to find pairs or sub-arrays that satisfy a condition.

### Pattern 1: Two Pointers from Both Ends

Start with one pointer at the beginning and one at the end. Move them toward each other based on some condition.

**When to use:** Sorted arrays, finding pairs with a specific sum, palindrome checking.

### Example: Two Sum in a Sorted Array

Given a sorted array and a target sum, find two numbers that add up to the target.

```python
def two_sum_sorted(arr: list[int], target: int) -> list[int]:
    """Return indices of two numbers that sum to target. Array must be sorted."""
    left: int = 0
    right: int = len(arr) - 1

    while left < right:
        current_sum: int = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1      # need a larger sum
        else:
            right -= 1     # need a smaller sum

    return []  # no pair found
```

**Time:** O(n). **Space:** O(1).

### Trace

```
arr = [1, 3, 5, 7, 9, 11], target = 12

left=0, right=5: 1 + 11 = 12 -> found! return [0, 5]
```

```
arr = [1, 3, 5, 7, 9, 11], target = 8

left=0, right=5: 1 + 11 = 12 > 8 -> right = 4
left=0, right=4: 1 + 9 = 10 > 8 -> right = 3
left=0, right=3: 1 + 7 = 8 -> found! return [0, 3]
```

### Example: Container With Most Water

Given heights of vertical lines, find two lines that, together with the x-axis, form a container that holds the most water.

```python
def max_area(heights: list[int]) -> int:
    """Find the maximum water a container can hold."""
    left: int = 0
    right: int = len(heights) - 1
    best: int = 0

    while left < right:
        width: int = right - left
        height: int = min(heights[left], heights[right])
        area: int = width * height
        best = max(best, area)

        # move the shorter line inward (it limits the height)
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1

    return best
```

**Time:** O(n). **Space:** O(1).

### Example: Remove Duplicates from Sorted Array

Remove duplicates in-place and return the new length. Use a slow pointer for the write position and a fast pointer for reading.

```python
def remove_duplicates(arr: list[int]) -> int:
    """Remove duplicates in-place, return new length."""
    if len(arr) == 0:
        return 0

    slow: int = 0
    fast: int = 1

    while fast < len(arr):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
        fast += 1

    return slow + 1
```

**Time:** O(n). **Space:** O(1).

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning the two-pointer pattern. (1) For the sorted array [2, 3, 5, 8, 11, 15] and target 13, trace through the two-pointer approach step by step. (2) Why does the two-pointer technique require the array to be sorted for the two-sum problem? What would go wrong with an unsorted array? (3) In the container with most water problem, why do we move the shorter line inward? Prove that we never skip the optimal answer. (4) Write a function that checks if a string is a palindrome using two pointers. Include type hints."</div>
</div>

---

### Pattern 2: Fast and Slow Pointers

Two pointers that move at different speeds. The classic use: cycle detection in linked lists (Floyd's algorithm).

```python
class ListNode:
    def __init__(self, val: int = 0) -> None:
        self.val: int = val
        self.next: ListNode | None = None


def has_cycle(head: ListNode | None) -> bool:
    """Detect if a linked list has a cycle."""
    slow: ListNode | None = head
    fast: ListNode | None = head

    while fast is not None and fast.next is not None:
        slow = slow.next           # move 1 step
        fast = fast.next.next      # move 2 steps

        if slow == fast:
            return True

    return False


def find_middle(head: ListNode | None) -> ListNode | None:
    """Find the middle node of a linked list."""
    slow: ListNode | None = head
    fast: ListNode | None = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    return slow
```

Why it works for cycle detection: if there is a cycle, the fast pointer eventually laps the slow pointer, and they meet. If there is no cycle, the fast pointer reaches the end.

---

## Sliding Window

The sliding window technique maintains a "window" of elements as you slide through an array or string. Instead of recalculating everything for each position, you add the new element and remove the old one.

**When to use:** Subarray/substring problems, especially with constraints like "of size k" or "with at most k distinct elements."

### Fixed-Size Window

The window size stays constant. Slide it across the array.

```python
def max_sum_subarray(arr: list[int], k: int) -> int:
    """Find the maximum sum of any subarray of size k."""
    if len(arr) < k:
        return 0

    # compute sum of first window
    window_sum: int = 0
    i: int = 0
    while i < k:
        window_sum += arr[i]
        i += 1

    best: int = window_sum

    # slide the window
    i = k
    while i < len(arr):
        window_sum += arr[i]        # add new element
        window_sum -= arr[i - k]    # remove old element
        best = max(best, window_sum)
        i += 1

    return best
```

**Time:** O(n). **Space:** O(1).

### Trace

```
arr = [2, 1, 5, 1, 3, 2], k = 3

Initial window [2, 1, 5]: sum = 8, best = 8

i=3: add 1, remove 2 -> sum = 7. best = 8.
i=4: add 3, remove 1 -> sum = 9. best = 9.
i=5: add 2, remove 5 -> sum = 6. best = 9.

Answer: 9 (subarray [5, 1, 3])
```

### Variable-Size Window

The window grows or shrinks based on a condition.

### Template

```python
def min_subarray_len(arr: list[int], target: int) -> int:
    """Find the minimum length subarray with sum >= target."""
    left: int = 0
    window_sum: int = 0
    result: int = len(arr) + 1  # start with "impossible" value

    right: int = 0
    while right < len(arr):
        window_sum += arr[right]      # expand window

        while window_sum >= target:   # shrink window while condition holds
            result = min(result, right - left + 1)
            window_sum -= arr[left]
            left += 1

        right += 1

    if result == len(arr) + 1:
        return 0
    return result
```

**Time:** O(n) -- each element is added and removed at most once.
**Space:** O(1).

### Trace

```
arr = [2, 3, 1, 2, 4, 3], target = 7

right=0: sum=2
right=1: sum=5
right=2: sum=6
right=3: sum=8 >= 7 -> result=4, shrink: remove 2, sum=6. Stop.
right=4: sum=10 >= 7 -> result=3, shrink: remove 3, sum=7.
         still >= 7 -> result=2, shrink: remove 1, sum=6. Stop.
right=5: sum=9 >= 7 -> result=2, shrink: remove 2, sum=7.
         still >= 7 -> result=2, shrink: remove 4, sum=3. Stop.

Answer: 2 (subarray [4, 3])
```

### Example: Longest Substring Without Repeating Characters

```python
def length_of_longest_substring(s: str) -> int:
    """Find the length of the longest substring without repeating characters."""
    char_set: set[str] = set()
    left: int = 0
    result: int = 0

    right: int = 0
    while right < len(s):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        result = max(result, right - left + 1)
        right += 1

    return result
```

**Time:** O(n). **Space:** O(min(n, alphabet_size)).

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning the sliding window pattern. (1) For the array [1, 4, 2, 10, 2, 3, 1, 0, 20] and k=4, find the maximum sum subarray of size 4 using a sliding window. Show the window at each step. (2) For the string 'abcabcbb', trace through the longest substring without repeating characters algorithm. Show the set and window at each step. (3) What is the difference between a fixed-size and variable-size sliding window? When do you use each? (4) Why is the variable-size sliding window O(n) even though it has two nested while loops?"</div>
</div>

---

## Prefix Sum

A prefix sum array stores the running total. It lets you compute the sum of any subarray in O(1) time after O(n) preprocessing.

### Building a Prefix Sum

```python
def build_prefix_sum(arr: list[int]) -> list[int]:
    """Build prefix sum array. prefix[i] = sum of arr[0..i-1]."""
    prefix: list[int] = [0] * (len(arr) + 1)
    i: int = 0
    while i < len(arr):
        prefix[i + 1] = prefix[i] + arr[i]
        i += 1
    return prefix
```

### Range Sum Query

```python
def range_sum(prefix: list[int], left: int, right: int) -> int:
    """Sum of arr[left..right] in O(1)."""
    return prefix[right + 1] - prefix[left]
```

### Trace

```
arr = [3, 1, 4, 1, 5, 9]
prefix = [0, 3, 4, 8, 9, 14, 23]

Sum of arr[1..3] = prefix[4] - prefix[1] = 9 - 3 = 6
Check: arr[1] + arr[2] + arr[3] = 1 + 4 + 1 = 6. Correct!
```

### Example: Subarray Sum Equals K

Count the number of subarrays whose sum equals k.

```python
def subarray_sum(arr: list[int], k: int) -> int:
    """Count subarrays with sum equal to k."""
    count: int = 0
    current_sum: int = 0
    prefix_counts: dict[int, int] = {0: 1}  # sum 0 has occurred once

    i: int = 0
    while i < len(arr):
        current_sum += arr[i]

        # if current_sum - k exists as a previous prefix sum,
        # then there is a subarray summing to k
        if current_sum - k in prefix_counts:
            count += prefix_counts[current_sum - k]

        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
        i += 1

    return count
```

**Time:** O(n). **Space:** O(n).

Why this works: if `prefix[j] - prefix[i] == k`, then the subarray from `i` to `j` sums to `k`. We track how many times each prefix sum has appeared and check if `current_sum - k` was seen before.

---

## Binary Search on Answer

You learned this in the searching section, but it is a pattern worth repeating here because it shows up constantly.

**When to use:** The answer space is monotonic. If answer X works, then all answers >= X also work (or all answers <= X).

### Template

```python
def binary_search_on_answer(lo: int, hi: int) -> int:
    """Find the minimum answer where condition is satisfied."""
    while lo < hi:
        mid: int = (lo + hi) // 2
        if condition(mid):
            hi = mid        # mid works, try smaller
        else:
            lo = mid + 1    # mid does not work, try larger
    return lo


def condition(value: int) -> bool:
    """Check if the given value satisfies the problem's constraint."""
    # problem-specific logic here
    return True
```

The shape is always the same. Define the search range, write the condition function, binary search for the boundary.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning prefix sums and binary search on answer. (1) Build the prefix sum array for [5, 2, -1, 3, 6] and use it to find the sum of elements from index 1 to index 3. (2) For the subarray sum equals k problem with arr = [1, 1, 1] and k = 2, trace through the algorithm showing prefix_counts at each step. How many subarrays sum to 2? (3) A painter needs to paint n boards of lengths [10, 20, 30, 40]. Each painter paints consecutive boards. With 2 painters, what is the minimum time to finish (assuming all painters work at the same time)? Set up the binary search on answer."</div>
</div>

---

## Monotonic Stack

A monotonic stack maintains elements in increasing or decreasing order. When a new element violates the order, you pop elements until the order is restored.

**When to use:** "Next greater element," "next smaller element," histogram problems.

### Example: Next Greater Element

For each element in an array, find the next element to its right that is greater.

```python
def next_greater_element(arr: list[int]) -> list[int]:
    """For each element, find the next greater element to its right. -1 if none."""
    n: int = len(arr)
    result: list[int] = [-1] * n
    stack: list[int] = []  # stores indices

    i: int = 0
    while i < n:
        # pop elements that are smaller than current
        while len(stack) > 0 and arr[stack[-1]] < arr[i]:
            idx: int = stack.pop()
            result[idx] = arr[i]
        stack.append(i)
        i += 1

    return result
```

**Time:** O(n) -- each element is pushed and popped at most once.
**Space:** O(n).

### Trace

```
arr = [4, 5, 2, 10, 8]

i=0 (4): stack empty, push 0. stack: [0]
i=1 (5): arr[0]=4 < 5, pop 0, result[0]=5. Push 1. stack: [1]
i=2 (2): arr[1]=5 >= 2, no pop. Push 2. stack: [1, 2]
i=3 (10): arr[2]=2 < 10, pop 2, result[2]=10.
          arr[1]=5 < 10, pop 1, result[1]=10.
          Push 3. stack: [3]
i=4 (8): arr[3]=10 >= 8, no pop. Push 4. stack: [3, 4]

Result: [5, 10, 10, -1, -1]
```

### Example: Daily Temperatures

Given daily temperatures, find how many days you have to wait for a warmer temperature.

```python
def daily_temperatures(temperatures: list[int]) -> list[int]:
    """For each day, how many days until a warmer temperature?"""
    n: int = len(temperatures)
    result: list[int] = [0] * n
    stack: list[int] = []  # stores indices

    i: int = 0
    while i < n:
        while len(stack) > 0 and temperatures[stack[-1]] < temperatures[i]:
            prev_day: int = stack.pop()
            result[prev_day] = i - prev_day
        stack.append(i)
        i += 1

    return result
```

**Time:** O(n). **Space:** O(n).

---

## Interval Problems

Problems involving ranges or intervals (start, end) are a common category.

### Merge Intervals

Given a list of intervals, merge all overlapping intervals.

```python
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """Merge overlapping intervals."""
    if len(intervals) == 0:
        return []

    # sort by start time
    intervals.sort()

    merged: list[list[int]] = [intervals[0]]

    i: int = 1
    while i < len(intervals):
        current: list[int] = intervals[i]
        last: list[int] = merged[-1]

        if current[0] <= last[1]:
            # overlapping, merge
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)

        i += 1

    return merged
```

**Time:** O(n log n) for sorting. **Space:** O(n).

### Trace

```
intervals = [[1,3], [2,6], [8,10], [15,18]]
Sorted: [[1,3], [2,6], [8,10], [15,18]]

merged = [[1,3]]

[2,6]: 2 <= 3 (overlaps), merge -> [1,6]. merged = [[1,6]]
[8,10]: 8 > 6 (no overlap), add. merged = [[1,6], [8,10]]
[15,18]: 15 > 10 (no overlap), add. merged = [[1,6], [8,10], [15,18]]
```

### Insert Interval

Insert a new interval into a sorted list of non-overlapping intervals, merging if necessary.

```python
def insert_interval(intervals: list[list[int]],
                    new_interval: list[int]) -> list[list[int]]:
    """Insert and merge a new interval into sorted non-overlapping intervals."""
    result: list[list[int]] = []
    i: int = 0
    n: int = len(intervals)

    # add all intervals that come before new_interval
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1

    # merge overlapping intervals with new_interval
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)

    # add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1

    return result
```

**Time:** O(n). **Space:** O(n).

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning interval and monotonic stack patterns. (1) Merge these intervals: [[1,4], [0,4], [3,5], [7,9], [8,12]]. Show the steps. (2) For the daily temperatures [73, 74, 75, 71, 69, 72, 76, 73], trace through the monotonic stack algorithm step by step, showing the stack at each point. (3) Insert interval [4,8] into the sorted intervals [[1,2], [3,5], [6,7], [8,10], [12,16]]. Show the merging steps. (4) Why is the monotonic stack O(n) even though it has a while loop inside a while loop?"</div>
</div>

---

## Bit Manipulation (Brief)

Bit manipulation works directly on binary representations of numbers. It is fast and space-efficient but harder to read.

### Key Operations

```python
# AND: both bits must be 1
a: int = 5       # 0101
b: int = 3       # 0011
print(a & b)     # 0001 = 1

# OR: at least one bit must be 1
print(a | b)     # 0111 = 7

# XOR: bits must be different
print(a ^ b)     # 0110 = 6

# NOT: flip all bits (Python uses ~, which gives -(n+1))
print(~a)        # -6

# Left shift: multiply by 2
print(a << 1)    # 1010 = 10

# Right shift: divide by 2
print(a >> 1)    # 0010 = 2
```

### Classic: Single Number (XOR Trick)

Every element appears twice except one. Find it.

The key insight: `x ^ x = 0` and `x ^ 0 = x`. XOR all elements together and the duplicates cancel out.

```python
def single_number(nums: list[int]) -> int:
    """Find the element that appears only once. All others appear twice."""
    result: int = 0
    i: int = 0
    while i < len(nums):
        result ^= nums[i]
        i += 1
    return result
```

**Time:** O(n). **Space:** O(1).

```
nums = [4, 1, 2, 1, 2]

result = 0 ^ 4 = 4
result = 4 ^ 1 = 5
result = 5 ^ 2 = 7
result = 7 ^ 1 = 6  (1 ^ 1 cancels)
result = 6 ^ 2 = 4  (2 ^ 2 cancels)

Answer: 4
```

### Counting Set Bits

Count the number of 1-bits in an integer.

```python
def count_bits(n: int) -> int:
    """Count the number of 1-bits in n."""
    count: int = 0
    while n > 0:
        count += n & 1  # check last bit
        n >>= 1         # shift right
    return count
```

---

## Pattern Recognition Summary

When you see a problem, ask these questions:

| If the problem involves... | Consider this pattern |
|---|---|
| Sorted array, finding pairs | Two pointers |
| Linked list cycle or middle | Fast and slow pointers |
| Subarray/substring of fixed size | Fixed sliding window |
| Subarray/substring with a constraint | Variable sliding window |
| Range sum queries | Prefix sum |
| Finding answer in a monotonic space | Binary search on answer |
| "Next greater/smaller element" | Monotonic stack |
| Overlapping ranges | Interval merge |
| Elements appear in pairs except one | XOR / bit manipulation |
| Optimal solution from subproblems | DP |
| Locally optimal leads to global optimal | Greedy |
| Explore all possibilities | Backtracking |
| Shortest path in unweighted graph | BFS |
| Shortest path in weighted graph | Dijkstra |

---

## Where People Go Wrong

### 1. Wrong Window Update in Sliding Window

Forgetting to remove the element leaving the window or adding it at the wrong time. The window must be maintained correctly at every step.

### 2. Off-by-One in Binary Search

The most common bug in all of algorithms. Double check: is it `left <= right` or `left < right`? Is it `mid + 1` or `mid`?

### 3. Not Recognizing the Pattern

The hardest part is not implementing the pattern -- it is recognizing which pattern to use. Practice helps. After solving 50-100 problems, you start to see the shapes.

### 4. Applying a Pattern That Does Not Fit

Not every array problem is two pointers. Not every subarray problem is sliding window. Make sure the problem actually matches the pattern's requirements (e.g., two pointers usually requires sorted data).

### 5. Overcomplicating Solutions

Sometimes a simple approach works. Do not force a complex pattern when a straightforward solution is correct and efficient.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I've studied all the common algorithm patterns. Give me a challenging quiz: (1) For each of these problems, identify the pattern and explain your approach (do not implement yet): a) Find two numbers in a sorted array that sum to a target. b) Find the longest substring with at most 2 distinct characters. c) Given daily stock prices, find the span (how many consecutive previous days the price was lower or equal). d) Given a list of meeting intervals, find if a person can attend all meetings. (2) Now implement the solution to (b) with type hints. (3) Implement the stock span problem from (c) using a monotonic stack with type hints. (4) Write a function using prefix sums that finds the subarray with the largest sum (variant: return the actual subarray, not just the sum)."</div>
</div>

---

## Practice Exercises

1. Implement the two-sum problem for a sorted array. Test with `[2, 7, 11, 15]` and target `9`.

2. Implement the sliding window maximum sum of size k. Test with `[1, 4, 2, 10, 2, 3, 1, 0, 20]` and k=4.

3. Implement the longest substring without repeating characters. Test with `"abcabcbb"` (answer: 3) and `"bbbbb"` (answer: 1).

4. Build a prefix sum and answer range sum queries for `[1, 2, 3, 4, 5]`. Query: sum from index 1 to 3.

5. Implement the next greater element using a monotonic stack. Test with `[4, 5, 2, 10, 8]`.

6. Merge these intervals: `[[1,3], [2,6], [8,10], [15,18]]`.

7. Find the single number in `[2, 2, 1]` using XOR.

8. Challenge: given an array and a target sum, count the number of subarrays that sum to the target. Use the prefix sum with hash map approach.

---

**Previous:** [[wiki:python-algo-graph]] | **Next:** [[wiki:python-leetcode-patterns]]
