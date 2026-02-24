# Algorithm Patterns -- Recognizing the Shape of a Problem

Here is a secret that expert coders know: most coding puzzles are *not* unique. They are variations of a small number of patterns. Once you learn to recognize the pattern, you already know how to solve the problem!

This page teaches you the most important patterns. For each one, you will learn: what it looks like, when to use it, and how to code it. Think of these patterns as tools in a toolbox -- the more tools you recognize, the faster you can build solutions.

You already know data structures, sorting, searching, recursion, dynamic programming, greedy algorithms, and graph algorithms. Now it is time to tie everything together with **pattern recognition**.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing in a colorful workshop with a toolbox. Each tool in the toolbox has a friendly label. The robot is reaching for a tool while looking at a puzzle on a workbench. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Two Pointers -- Two Markers Moving Through Data

### The Idea

Imagine two people standing in a long hallway. One starts at the left end, the other at the right end. They walk toward each other, and every time they take a step, they check something. This is the **two pointer** technique!

In code, you have two index variables (the "pointers") that move through a list. Sometimes they start at opposite ends and walk toward each other. Sometimes they both start at the beginning and one moves faster than the other.

### When to Use It

Look for these clues in a problem:

- The data is **sorted** (or you can sort it first).
- You need to find **a pair** of items that satisfy some condition.
- You need to **remove duplicates** from sorted data.
- You need to **compare elements** from both ends.

### Pattern 1: Pointers from Both Ends

Start one pointer at the beginning (`left = 0`) and one at the end (`right = len(arr) - 1`). Move them toward each other based on a condition.

### Example: Find Two Numbers That Add to a Target

Given a sorted list and a target sum, find two numbers that add up to the target.

```python
def two_sum_sorted(arr: list[int], target: int) -> list[int]:
    """Return indices of two numbers that sum to target in a sorted list."""
    left: int = 0
    right: int = len(arr) - 1

    while left < right:
        current_sum: int = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1      # sum is too small, move left pointer right
        else:
            right -= 1     # sum is too big, move right pointer left

    return []  # no pair found
```

### Trace

```
arr = [1, 3, 5, 7, 9, 11]   target = 12

left=0 (1), right=5 (11):  1 + 11 = 12.  Found it!  Return [0, 5].

Another example:
arr = [2, 4, 6, 8, 10]   target = 10

left=0 (2), right=4 (10):  2 + 10 = 12 > 10.  Move right.
left=0 (2), right=3 (8):   2 + 8  = 10.        Found it!  Return [0, 3].
```

**Why is this fast?** Without two pointers, you would check every pair -- that is O(n^2). With two pointers, you only scan through the list once -- O(n)!

### Pattern 2: Slow and Fast Pointers

Both pointers start at the beginning. One moves one step at a time ("slow"), and the other moves two steps ("fast"). This is useful for finding the middle of a linked list or detecting cycles.

```python
def remove_duplicates(arr: list[int]) -> int:
    """Remove duplicates from a sorted list in-place. Return new length."""
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

---

## Sliding Window -- A Moving View of Your Data

### The Idea

Imagine you are on a train, looking out the window. As the train moves, you see a different section of scenery through the window. The window is always the same size, but what you see through it changes as you slide along.

In code, the "window" is a section of a list defined by two indices (start and end). You slide the window along the list, updating your answer as you go.

### When to Use It

Look for these clues:

- Find the **maximum or minimum** of all sub-sections of a certain size.
- Find the **longest or shortest** sub-section that meets a condition.
- The problem involves **consecutive** elements.

### Fixed-Size Window

The window always stays the same size. You slide it one position at a time.

### Example: Maximum Sum of K Consecutive Items

```python
def max_sum_of_k(arr: list[int], k: int) -> int:
    """Find the maximum sum of k consecutive elements."""
    if len(arr) < k:
        return 0

    # calculate sum of first window
    window_sum: int = 0
    i: int = 0
    while i < k:
        window_sum += arr[i]
        i += 1

    max_sum: int = window_sum

    # slide the window: add the new element, remove the old one
    i = k
    while i < len(arr):
        window_sum += arr[i] - arr[i - k]
        if window_sum > max_sum:
            max_sum = window_sum
        i += 1

    return max_sum
```

### Trace

```
arr = [2, 1, 5, 1, 3, 2]   k = 3

First window [2, 1, 5]:  sum = 8.  max_sum = 8.

Slide: remove 2, add 1.  Window [1, 5, 1]:  sum = 7.  max_sum still 8.
Slide: remove 1, add 3.  Window [5, 1, 3]:  sum = 9.  max_sum = 9!
Slide: remove 5, add 2.  Window [1, 3, 2]:  sum = 6.  max_sum still 9.

Answer: 9
```

**Key insight:** Instead of recalculating the sum from scratch each time (which would be slow), you just add the new element and subtract the old one. This turns an O(n * k) approach into O(n)!

### Variable-Size Window

The window grows and shrinks. You expand it (move the right end) until some condition breaks, then shrink it (move the left end) until the condition is met again.

### Example: Smallest Section with Sum >= Target

```python
def min_length_subarray(arr: list[int], target: int) -> int:
    """Find the length of the smallest subarray with sum >= target."""
    left: int = 0
    current_sum: int = 0
    min_length: int = len(arr) + 1  # start with "impossible" length

    right: int = 0
    while right < len(arr):
        current_sum += arr[right]

        # shrink window from the left while sum is still >= target
        while current_sum >= target:
            window_size: int = right - left + 1
            if window_size < min_length:
                min_length = window_size
            current_sum -= arr[left]
            left += 1

        right += 1

    if min_length == len(arr) + 1:
        return 0  # no valid window found
    return min_length
```

**Time:** O(n). Each element is added and removed at most once.

![A flat vector illustration in a children's educational book style showing a colorful toy train with Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, riding in it. The train passes along a track with numbered blocks, and a transparent window frame highlights three consecutive blocks at a time. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Prefix Sum -- Pre-Calculate to Answer Questions Fast

### The Idea

Imagine a road trip passing through several cities. You write down the total distance from the start to *each* city. Now if someone asks "How far is it from City 3 to City 7?", you do not need to add up all the distances between them. You just subtract: distance_to_7 - distance_to_3. One subtraction instead of adding up many numbers!

A **prefix sum** is a list where each position stores the total of all elements from the beginning up to that point.

### When to Use It

- You need to calculate the **sum of a range** many times.
- The original data does not change between queries.
- The problem asks about **cumulative** values.

### Building a Prefix Sum

```python
def build_prefix_sum(arr: list[int]) -> list[int]:
    """Build a prefix sum array. prefix[i] = sum of arr[0..i-1]."""
    prefix: list[int] = [0] * (len(arr) + 1)
    i: int = 0
    while i < len(arr):
        prefix[i + 1] = prefix[i] + arr[i]
        i += 1
    return prefix


def range_sum(prefix: list[int], left: int, right: int) -> int:
    """Return sum of elements from index left to right (inclusive)."""
    return prefix[right + 1] - prefix[left]
```

### Trace

```
arr =    [3, 1, 4, 1, 5, 9]
prefix = [0, 3, 4, 8, 9, 14, 23]

Sum from index 1 to 4?
  prefix[5] - prefix[1] = 14 - 3 = 11
  Check: 1 + 4 + 1 + 5 = 11.  Correct!

Sum from index 0 to 2?
  prefix[3] - prefix[0] = 8 - 0 = 8
  Check: 3 + 1 + 4 = 8.  Correct!
```

**Without prefix sum:** Each range query takes O(n) (add up every element).
**With prefix sum:** Building it takes O(n), but each query is O(1) (just one subtraction!).

---

## Binary Search on the Answer -- Guess, Check, Narrow Down

### The Idea

Remember the number guessing game? "I'm thinking of a number between 1 and 100. Is it higher or lower?" You guess the middle, and based on the answer, you eliminate half the possibilities.

Now imagine this: instead of searching for a number *in a list*, you are searching for **the answer itself**. You guess an answer, check if it works, and narrow down based on whether you need a bigger or smaller answer.

### When to Use It

- The answer is a **number** and you know its possible range.
- You can write a function that checks "Is answer X possible?" (returns True or False).
- If answer X works, then all answers bigger than X also work (or vice versa). This "monotonic" property is key!

### Example: Minimum Capacity to Ship Packages in D Days

You have a list of package weights and need to ship them all in D days. Each day, packages are loaded in order until the ship is full, then a new day starts. What is the **smallest** ship capacity that lets you finish in D days?

```python
def can_ship_in_days(weights: list[int], capacity: int, days: int) -> bool:
    """Check if we can ship all packages within 'days' days given this capacity."""
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


def min_ship_capacity(weights: list[int], days: int) -> int:
    """Find the minimum ship capacity to ship all packages in 'days' days."""
    # smallest possible: must fit the heaviest single package
    left: int = max(weights)
    # largest possible: ship everything in one day
    right: int = 0
    i: int = 0
    while i < len(weights):
        right += weights[i]
        i += 1

    while left < right:
        mid: int = (left + right) // 2
        if can_ship_in_days(weights, mid, days):
            right = mid      # this capacity works, try smaller
        else:
            left = mid + 1   # too small, need more capacity

    return left
```

### Trace

```
weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]   days = 5

left = 10 (heaviest package), right = 55 (total of all)

mid = 32: can_ship_in_days? Yes (way too big). right = 32.
mid = 21: can_ship_in_days? Yes. right = 21.
mid = 15: can_ship_in_days? Yes. right = 15.
mid = 12: can_ship_in_days? No (needs 6 days). left = 13.
mid = 14: can_ship_in_days? No (needs 6 days). left = 15.

left == right == 15.  Answer: 15.
```

---

## Monotonic Stack -- A Stack That Stays in Order

### The Idea

Imagine a stack of plates, but with a special rule: every plate must be smaller than the one below it (or larger, depending on the version). When you try to add a new plate that violates the rule, you remove plates from the top until the rule is satisfied again.

A **monotonic stack** is a stack where elements are always in sorted order (either increasing or decreasing). When a new element comes in, you pop elements that break the order.

### When to Use It

- Find the **next greater element** (or next smaller element) for each item.
- Problems involving "looking back" at previous elements.
- Temperature problems: "How many days until a warmer day?"

### Example: Next Greater Element

For each element in a list, find the next element that is greater.

```python
def next_greater_element(arr: list[int]) -> list[int]:
    """For each element, find the next element that is greater.

    Returns a list where result[i] is the next greater element for arr[i],
    or -1 if there is none.
    """
    result: list[int] = [-1] * len(arr)
    stack: list[int] = []  # stores indices

    i: int = 0
    while i < len(arr):
        # pop elements smaller than current -- current is their "next greater"
        while len(stack) > 0 and arr[stack[-1]] < arr[i]:
            idx: int = stack.pop()
            result[idx] = arr[i]
        stack.append(i)
        i += 1

    return result
```

### Trace

```
arr = [4, 2, 1, 5, 3]

i=0: arr[0]=4. Stack empty. Push 0.           Stack: [0]
i=1: arr[1]=2. 2 < 4, no pop. Push 1.         Stack: [0, 1]
i=2: arr[2]=1. 1 < 2, no pop. Push 2.         Stack: [0, 1, 2]
i=3: arr[3]=5. 5 > 1, pop 2: result[2] = 5.
               5 > 2, pop 1: result[1] = 5.
               5 > 4, pop 0: result[0] = 5.
               Push 3.                         Stack: [3]
i=4: arr[4]=3. 3 < 5, no pop. Push 4.         Stack: [3, 4]

result = [5, 5, 5, -1, -1]
```

**Time:** O(n). Each element is pushed and popped at most once.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, organizing colorful numbered blocks on a stack, removing blocks that are too small when a bigger block arrives. A playful workshop setting with soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Interval Problems -- Merging Overlapping Ranges

### The Idea

Think about a daily schedule. You have several events, each with a start and end time. Some events overlap -- a meeting from 9:00-10:30 and another from 10:00-11:00. You want to merge all overlapping events into continuous blocks.

### When to Use It

- Problems involving **time ranges**, **schedules**, or **intervals**.
- Merging, inserting, or counting overlapping ranges.

### Step 1: Sort by Start Time

Always sort intervals by their start time first!

### Example: Merge Overlapping Intervals

```python
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """Merge all overlapping intervals."""
    if len(intervals) == 0:
        return []

    # sort by start time
    intervals.sort(key=lambda x: x[0])

    merged: list[list[int]] = [intervals[0]]

    i: int = 1
    while i < len(intervals):
        current: list[int] = intervals[i]
        last_merged: list[int] = merged[-1]

        if current[0] <= last_merged[1]:
            # overlapping! extend the end if needed
            if current[1] > last_merged[1]:
                last_merged[1] = current[1]
        else:
            # no overlap, start a new interval
            merged.append(current)
        i += 1

    return merged
```

### Trace

```
intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]

After sorting (already sorted): [[1, 3], [2, 6], [8, 10], [15, 18]]

merged starts as: [[1, 3]]

[2, 6]: 2 <= 3 (overlaps!). Extend to [1, 6].   merged: [[1, 6]]
[8, 10]: 8 > 6 (no overlap). Add new.            merged: [[1, 6], [8, 10]]
[15, 18]: 15 > 10 (no overlap). Add new.         merged: [[1, 6], [8, 10], [15, 18]]
```

**Time:** O(n log n) for sorting.

---

## Pattern Recognition Table -- Your Cheat Sheet

When you read a problem, look for these clues to figure out which pattern to use:

| Clue in the problem | Pattern to try |
|---|---|
| Sorted array + find a pair | **Two Pointers** |
| Find longest/shortest consecutive section | **Sliding Window** |
| Sum of a range (multiple queries) | **Prefix Sum** |
| "Minimize the maximum" or "maximize the minimum" | **Binary Search on Answer** |
| Next greater/smaller element | **Monotonic Stack** |
| Overlapping time ranges or schedules | **Interval Merging** |
| Explore all possibilities | **Backtracking** (from [[wiki:python-jr-algo-recursion]]) |
| Optimal sub-problems | **Dynamic Programming** (from [[wiki:python-jr-algo-dynamic-programming]]) |
| "Make the best choice right now" | **Greedy** (from [[wiki:python-jr-algo-greedy]]) |
| Shortest path with weights | **Dijkstra** (from [[wiki:python-jr-algo-graph]]) |
| Tasks with dependencies | **Topological Sort** (from [[wiki:python-jr-algo-graph]]) |

### Tips for Recognizing Patterns

1. **Read the problem twice.** The first time for understanding, the second time for clues.
2. **Look at the constraints.** If the array can have up to 100,000 elements, an O(n^2) solution is too slow. You need a pattern that gives O(n) or O(n log n).
3. **Think about what changes.** Does a window slide? Do two things converge? Is there a monotonic property?
4. **Start simple.** Can you solve it with brute force first? Then ask: "What pattern makes this faster?"

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing in front of a colorful chart on a wall that matches puzzle shapes to different tools. The robot is pointing at one of the matches with an excited expression. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practice Questions

Try these on your own before looking at the answers!

**Question 1:** Given a sorted list `[1, 2, 4, 6, 8, 10, 14]` and target sum 16, use the two-pointer technique to find two numbers that add up to 16. Show each step.

**Question 2:** Given the list `[3, 1, 2, 7, 4, 2, 1, 1, 5]` and k = 3, find the maximum sum of any 3 consecutive elements using a sliding window. Show each window.

**Question 3:** Build the prefix sum array for `[5, 2, 8, 1, 3]`. Then use it to find the sum from index 1 to index 3.

**Question 4:** Given temperatures `[73, 74, 75, 71, 69, 72, 76, 73]`, use a monotonic stack to find how many days until a warmer day for each day. Show the stack at each step.

**Question 5:** Merge these intervals: `[[1, 4], [0, 2], [3, 5], [7, 9], [8, 11]]`. Show your work.

**Question 6:** You need to split a list of positive numbers into sections so that no section has a sum greater than a limit. Find the **minimum** number of sections. Which pattern would you use, and why?

**Question 7:** A problem says: "Given a sorted array of unique numbers, find the pair with the smallest absolute difference." Which pattern fits best? Write the solution.

**Question 8:** Explain why the sliding window technique would NOT work on this problem: "Find the sub-section with the maximum sum" (when the list can contain negative numbers). What technique works instead?

---

## Answers to Practice Questions

**Answer 1:**

```
arr = [1, 2, 4, 6, 8, 10, 14]   target = 16

left=0 (1), right=6 (14): 1 + 14 = 15 < 16. Move left.
left=1 (2), right=6 (14): 2 + 14 = 16. Found it! Return [1, 6].
```

The two numbers are 2 and 14.

**Answer 2:**

```
arr = [3, 1, 2, 7, 4, 2, 1, 1, 5]   k = 3

Window [3, 1, 2]:  sum = 6.   max = 6.
Window [1, 2, 7]:  sum = 10.  max = 10.
Window [2, 7, 4]:  sum = 13.  max = 13.
Window [7, 4, 2]:  sum = 13.  max = 13.
Window [4, 2, 1]:  sum = 7.   max = 13.
Window [2, 1, 1]:  sum = 4.   max = 13.
Window [1, 1, 5]:  sum = 7.   max = 13.

Maximum sum of 3 consecutive elements: 13 (at [2, 7, 4] or [7, 4, 2]).
```

**Answer 3:**

```
arr    = [5, 2, 8, 1, 3]
prefix = [0, 5, 7, 15, 16, 19]

Sum from index 1 to 3:
  prefix[4] - prefix[1] = 16 - 5 = 11
  Check: 2 + 8 + 1 = 11.  Correct!
```

**Answer 4:**

This problem is often called "Daily Temperatures." For each day, find how many days you wait until a warmer temperature.

```
temps = [73, 74, 75, 71, 69, 72, 76, 73]

i=0 (73): Stack empty. Push 0.                    Stack: [0]
i=1 (74): 74 > 73, pop 0: result[0] = 1-0 = 1.
          Push 1.                                  Stack: [1]
i=2 (75): 75 > 74, pop 1: result[1] = 2-1 = 1.
          Push 2.                                  Stack: [2]
i=3 (71): 71 < 75, no pop. Push 3.                Stack: [2, 3]
i=4 (69): 69 < 71, no pop. Push 4.                Stack: [2, 3, 4]
i=5 (72): 72 > 69, pop 4: result[4] = 5-4 = 1.
          72 > 71, pop 3: result[3] = 5-3 = 2.
          72 < 75, stop. Push 5.                   Stack: [2, 5]
i=6 (76): 76 > 72, pop 5: result[5] = 6-5 = 1.
          76 > 75, pop 2: result[2] = 6-2 = 4.
          Push 6.                                  Stack: [6]
i=7 (73): 73 < 76, no pop. Push 7.                Stack: [6, 7]

Remaining in stack (index 6, 7) get result 0 (no warmer day).

result = [1, 1, 4, 2, 1, 1, 0, 0]
```

**Answer 5:**

```
Original intervals: [[1, 4], [0, 2], [3, 5], [7, 9], [8, 11]]

Step 1: Sort by start time: [[0, 2], [1, 4], [3, 5], [7, 9], [8, 11]]

merged starts as: [[0, 2]]

[1, 4]: 1 <= 2 (overlaps!). Extend to [0, 4].     merged: [[0, 4]]
[3, 5]: 3 <= 4 (overlaps!). Extend to [0, 5].     merged: [[0, 5]]
[7, 9]: 7 > 5 (no overlap). Add new.               merged: [[0, 5], [7, 9]]
[8, 11]: 8 <= 9 (overlaps!). Extend to [7, 11].    merged: [[0, 5], [7, 11]]

Result: [[0, 5], [7, 11]]
```

**Answer 6:** Use **binary search on the answer**. You are looking for the minimum number of sections. You can binary search on the *limit* (if the problem asks for it) or use a greedy approach: greedily fill each section as much as possible without exceeding the limit. Actually, for this specific problem (minimizing sections given a fixed limit), a **greedy/sliding approach** works best -- start a new section whenever adding the next number would exceed the limit. If the problem were reversed ("minimize the maximum section sum given exactly K sections"), then binary search on the answer is the right pattern.

**Answer 7:** The **two pointer** pattern fits perfectly. Since the array is sorted, the pair with the smallest absolute difference must be *adjacent* elements. You can scan through comparing each element with the next one:

```python
def smallest_diff_pair(arr: list[int]) -> list[int]:
    """Find pair with smallest absolute difference in a sorted array."""
    min_diff: int = arr[1] - arr[0]
    best_pair: list[int] = [arr[0], arr[1]]

    i: int = 1
    while i < len(arr) - 1:
        diff: int = arr[i + 1] - arr[i]
        if diff < min_diff:
            min_diff = diff
            best_pair = [arr[i], arr[i + 1]]
        i += 1

    return best_pair
```

This is a simplified two-pointer approach where the two pointers are always adjacent.

**Answer 8:** The sliding window technique assumes you can "shrink" the window when it gets too big. But with negative numbers, adding more elements might *decrease* the sum, and removing elements might *increase* it. The shrinking logic breaks.

Instead, use **Kadane's algorithm** (a form of dynamic programming). The idea: at each position, decide whether to extend the current section or start fresh. If the running sum becomes negative, starting fresh is always better.

```python
def max_subarray_sum(arr: list[int]) -> int:
    """Find the maximum sum of any contiguous sub-section."""
    current_sum: int = arr[0]
    max_sum: int = arr[0]

    i: int = 1
    while i < len(arr):
        if current_sum + arr[i] > arr[i]:
            current_sum = current_sum + arr[i]
        else:
            current_sum = arr[i]

        if current_sum > max_sum:
            max_sum = current_sum
        i += 1

    return max_sum
```

---

**Previous:** [[wiki:python-jr-algo-graph]] | **Next:** [[wiki:python-jr-leetcode-patterns]]
