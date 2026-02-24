# LeetCode Problem Patterns -- Recognizing and Solving

The biggest mistake people make with LeetCode is jumping straight into coding. They read the problem, panic, and start typing. Then they get stuck halfway through because they never had a plan.

Problem solving is a skill. Like any skill, it has a method. This page teaches you that method, and the patterns that show up again and again across hundreds of problems.

---

## The Six-Step Problem-Solving Method

Every single problem, from easy to hard, follows the same approach. Memorize these steps. Use them every time.

### Step 1: Understand the Problem

Read the problem statement. Then read it again. Ask yourself:

- What are the **inputs**? (types, sizes, constraints)
- What is the **output**? (type, format)
- What are the **constraints**? (array length up to 10^5? values can be negative?)
- Are there edge cases mentioned? (empty input, single element, duplicates)

```python
# Example: "Two Sum"
# Input: list of integers, a target integer
# Output: indices of two numbers that add up to target
# Constraints: exactly one solution exists, can't use same element twice
# Edge cases: negative numbers, zeros
```

### Step 2: Work Through Examples by Hand

Before writing any code, grab the example inputs and trace through them manually. Use paper or a whiteboard. This builds intuition for the solution.

```python
# Two Sum example:
# nums = [2, 7, 11, 15], target = 9
#
# Check pairs:
# 2 + 7 = 9  --> found it! indices [0, 1]
#
# Another example:
# nums = [3, 2, 4], target = 6
# 3 + 2 = 5 (no)
# 3 + 4 = 7 (no)
# 2 + 4 = 6 --> found it! indices [1, 2]
```

### Step 3: Identify the Pattern

This is where experience matters. Look at the clues in the problem and match them to known techniques. We will cover all the patterns below.

### Step 4: Code the Solution

Only now do you write code. You should already know the algorithm. Coding is just translating your plan into Python.

### Step 5: Test with Edge Cases

Run through your code with:
- The given examples
- Empty input
- Single element
- All same values
- Very large input (mentally check complexity)
- Negative numbers (if applicable)

### Step 6: Analyze Time and Space Complexity

State your Big O for both time and space. Interviewers always ask this.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm given a problem: find the longest substring without repeating characters. Walk me through the six-step method. What are the inputs, outputs, constraints? Work through the example 'abcabcbb' by hand before thinking about code."</div>
</div>

---

## The Pattern Recognition Guide

This is the most valuable section on this page. When you see certain clues in a problem, they point directly to specific techniques.

### "Sorted array" --> Binary Search or Two Pointers

If the array is sorted, you almost never need to scan the whole thing. Binary search cuts the search space in half each step. Two pointers let you scan from both ends.

```python
def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    """Two Sum II - Input Array Is Sorted."""
    left: int = 0
    right: int = len(numbers) - 1

    while left < right:
        current_sum: int = numbers[left] + numbers[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # need bigger sum, move left pointer right
        else:
            right -= 1  # need smaller sum, move right pointer left

    return []  # no solution found
```

### "All permutations/subsets" --> Backtracking

When a problem asks you to generate all possible combinations, subsets, or arrangements, backtracking is the way. You build solutions piece by piece and "backtrack" when a path does not work.

```python
def subsets(nums: list[int]) -> list[list[int]]:
    """Generate all subsets of a list."""
    result: list[list[int]] = []

    def backtrack(start: int, current: list[int]) -> None:
        result.append(current[:])  # copy the current subset
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # undo the choice (backtrack)

    backtrack(0, [])
    return result

# subsets([1, 2, 3]) returns:
# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

### "Optimal value / count ways" --> Dynamic Programming

If the problem asks for the minimum cost, maximum profit, or the number of ways to do something, and the problem has overlapping subproblems, use DP.

```python
def climb_stairs(n: int) -> int:
    """How many ways to climb n stairs, taking 1 or 2 steps at a time?"""
    if n <= 2:
        return n

    prev2: int = 1  # ways to reach step 1
    prev1: int = 2  # ways to reach step 2

    for i in range(3, n + 1):
        current: int = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

# climb_stairs(5) = 8
```

### "Shortest path" --> BFS or Dijkstra

BFS gives shortest path in unweighted graphs. Dijkstra handles weighted graphs with non-negative edges.

### "Connected components" --> DFS/BFS or Union-Find

If you need to find groups of connected elements (islands, friend circles, network clusters), use graph traversal or the Union-Find data structure.

### "Top K / Kth largest" --> Heap

When you need the K largest, K smallest, or Kth element, a heap gives you O(n log k) instead of O(n log n) for sorting.

```python
import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    """Find the kth largest element."""
    # Use a min-heap of size k
    min_heap: list[int] = nums[:k]
    heapq.heapify(min_heap)

    for num in nums[k:]:
        if num > min_heap[0]:
            heapq.heapreplace(min_heap, num)

    return min_heap[0]

# find_kth_largest([3, 2, 1, 5, 6, 4], 2) = 5
```

### "Subarray/substring" --> Sliding Window or Prefix Sum

When you need to find a contiguous subarray or substring with some property (maximum sum, specific length, no repeats), sliding window is your go-to.

```python
def max_subarray_sum(nums: list[int], k: int) -> int:
    """Find maximum sum of any subarray of length k."""
    if len(nums) < k:
        return 0

    window_sum: int = sum(nums[:k])
    max_sum: int = window_sum

    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # slide the window
        max_sum = max(max_sum, window_sum)

    return max_sum
```

### "Parentheses/nesting" --> Stack

Anything involving matching brackets, nested structures, or "most recent first" behavior screams stack.

```python
def is_valid_parentheses(s: str) -> bool:
    """Check if parentheses are balanced."""
    stack: list[str] = []
    matching: dict[str, str] = {")": "(", "]": "[", "}": "{"}

    for char in s:
        if char in "([{":
            stack.append(char)
        elif char in ")]}":
            if not stack or stack[-1] != matching[char]:
                return False
            stack.pop()

    return len(stack) == 0
```

### "Tree traversal" --> DFS (Recursive or Iterative)

Most tree problems use depth-first search. Choose between preorder, inorder, and postorder based on when you need to process the node.

### "Level-order" --> BFS with Queue

When you need to process a tree level by level, use BFS with a queue.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Match each problem description to its pattern: (1) Find the minimum number of coins to make a target amount. (2) Given a sorted array, find if a pair sums to target. (3) Find all possible letter combinations from phone digits. (4) Find the 3rd largest element in an array. (5) Check if a string of brackets is balanced. Give the pattern name and explain why."</div>
</div>

---

## Difficulty Progression

### Easy Problems: Master the Basics

These problems test one technique at a time. You should be able to solve them in 10-15 minutes.

**10 Must-Solve Easy Problems:**

| # | Problem | Pattern | Hint |
|---|---------|---------|------|
| 1 | Two Sum | Hash map | Store complement as you scan |
| 2 | Valid Parentheses | Stack | Push opens, match closes |
| 3 | Merge Two Sorted Lists | Two pointers | Compare heads, pick smaller |
| 4 | Best Time to Buy/Sell Stock | Sliding window (one pass) | Track minimum price so far |
| 5 | Valid Palindrome | Two pointers | Compare from both ends |
| 6 | Linked List Cycle | Fast/slow pointers | Fast moves 2, slow moves 1 |
| 7 | Maximum Subarray | Kadane's algorithm (DP) | Reset running sum if negative |
| 8 | Invert Binary Tree | DFS recursion | Swap left and right at each node |
| 9 | Contains Duplicate | Hash set | Add each number, check if seen |
| 10 | Valid Anagram | Counting | Count characters, compare counts |

Here is Two Sum fully worked out:

```python
def two_sum(nums: list[int], target: int) -> list[int]:
    """Find indices of two numbers that add up to target."""
    seen: dict[int, int] = {}  # value -> index

    for i, num in enumerate(nums):
        complement: int = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []  # problem guarantees a solution exists

# two_sum([2, 7, 11, 15], 9) returns [0, 1]
# Because 2 + 7 = 9
```

### Medium Problems: Combine Two Techniques

Medium problems usually require you to combine two ideas or apply a technique to a less obvious situation.

**10 Must-Solve Medium Problems:**

| # | Problem | Patterns Combined | Hint |
|---|---------|-------------------|------|
| 1 | LRU Cache | Hash map + Doubly linked list | O(1) get and put |
| 2 | Word Break | DP + String | dp[i] = can I form word ending at i? |
| 3 | Course Schedule | Graph + DFS (cycle detection) | Topological sort |
| 4 | 3Sum | Sorting + Two pointers | Fix one, two-pointer the rest |
| 5 | Longest Substring Without Repeating | Sliding window + Hash set | Shrink window on duplicate |
| 6 | Binary Tree Level Order | BFS + Queue | Process one level at a time |
| 7 | Number of Islands | Graph + DFS/BFS | Flood fill from each '1' |
| 8 | Coin Change | DP (bottom-up) | dp[amount] = min coins needed |
| 9 | Product of Array Except Self | Prefix/suffix products | Left pass then right pass |
| 10 | Validate BST | DFS + Range tracking | Each node has a valid range |

Here is Coin Change fully worked out:

```python
def coin_change(coins: list[int], amount: int) -> int:
    """Find minimum number of coins to make the amount."""
    # dp[i] = minimum coins needed to make amount i
    dp: list[float] = [float("inf")] * (amount + 1)
    dp[0] = 0  # 0 coins needed to make amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1

    return int(dp[amount]) if dp[amount] != float("inf") else -1

# coin_change([1, 5, 10, 25], 30) returns 2 (one 25 + one 5)
```

### Hard Problems: Complex Combinations

Hard problems often combine three or more techniques, or require clever insights that are not obvious.

**10 Must-Solve Hard Problems:**

| # | Problem | Key Insight |
|---|---------|-------------|
| 1 | Merge K Sorted Lists | Heap to track K minimums |
| 2 | Trapping Rain Water | Two pointers tracking max heights |
| 3 | Word Ladder II | BFS for shortest path + DFS for all paths |
| 4 | Median of Two Sorted Arrays | Binary search on partition |
| 5 | Sliding Window Maximum | Monotonic deque |
| 6 | Regular Expression Matching | 2D DP |
| 7 | Serialize/Deserialize Binary Tree | Preorder traversal + queue |
| 8 | Largest Rectangle in Histogram | Stack-based approach |
| 9 | Word Search II | Trie + Backtracking |
| 10 | Minimum Window Substring | Sliding window + character counting |

Do not start with hard problems. Master easy first. Then medium. Hard problems are combinations of techniques you already know.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Solve this step by step: given an array [2, 7, 11, 15] and target 9, find two numbers that add up to target. First try brute force (check all pairs). Then optimize using a hash map. Show both solutions with time complexity analysis. Explain why the hash map approach is better."</div>
</div>

---

## How to Handle Getting Stuck

Everyone gets stuck. The difference between a good problem solver and a frustrated one is what you do next.

### Strategy 1: Simplify the Problem

Cannot solve it for a general input? Solve it for the smallest possible input first.

```python
# Stuck on "find all paths in a graph"?
# Start with: what if the graph has only 2 nodes?
# Then: what about 3 nodes?
# Build up until you see the pattern.
```

### Strategy 2: Try Brute Force First

The brute force solution is almost always obvious. Write it. Get a working answer. Then ask: "Where is the wasted work? What am I recalculating?"

```python
# Brute force Two Sum: check every pair
def two_sum_brute(nums: list[int], target: int) -> list[int]:
    """O(n^2) brute force - check every pair."""
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# The wasted work: for each number, we scan the whole array
# to find its complement. A hash map remembers what we've seen.
```

### Strategy 3: Draw It Out

Draw the array, tree, or graph on paper. Trace through the algorithm step by step. Visual thinking unlocks solutions that staring at code never will.

### Strategy 4: Think About Data Structures

Ask: "What operation do I need to be fast?" Then pick the data structure that gives you that operation.

| I need fast... | Use... |
|----------------|--------|
| Lookup by key | Hash map |
| Min/max element | Heap |
| Last-in-first-out | Stack |
| First-in-first-out | Queue |
| Sorted insertion | BST or sorted list |
| Range queries | Prefix sum or segment tree |

---

## Time Management in Interviews

A coding interview is typically 45 minutes. Here is how to spend that time:

| Phase | Minutes | What to Do |
|-------|---------|------------|
| Understand the problem | 5 | Ask clarifying questions, state assumptions |
| Work examples by hand | 5 | Trace through 2-3 examples on the whiteboard |
| Discuss approach | 5 | Explain your plan before coding |
| Code the solution | 15-20 | Write clean, readable code |
| Test and debug | 5-10 | Walk through edge cases |
| Complexity analysis | 2-3 | State time and space Big O |

**Key rules:**
- Talk out loud. The interviewer wants to hear your thinking process.
- Ask clarifying questions before starting. "Can the input be empty?" "Are duplicates possible?"
- Start with brute force if you do not see the optimal approach. A working O(n^2) solution beats a broken O(n) solution.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm stuck on this problem: 'Given an array of integers, find the length of the longest consecutive sequence.' For example, [100, 4, 200, 1, 3, 2] should return 4 (the sequence 1,2,3,4). Walk me through the four strategies for getting unstuck. Start with brute force, then optimize."</div>
</div>

---

## Common Traps and Edge Cases

### Trap 1: Off-By-One Errors

The most common bug. Always ask: should this be `<` or `<=`? Should the range be `(0, n)` or `(0, n + 1)`?

```python
# WRONG: misses the last element
for i in range(len(nums) - 1):  # stops at second-to-last
    pass

# RIGHT: processes all elements
for i in range(len(nums)):  # goes to the last one
    pass
```

### Trap 2: Integer Overflow

Python handles big integers natively, so this is less of an issue than in Java or C++. But be aware of it in interviews.

### Trap 3: Modifying a Collection While Iterating

```python
# WRONG: modifying list while looping over it
numbers: list[int] = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # skips elements!

# RIGHT: create a new list
numbers = [num for num in numbers if num % 2 != 0]
```

### Trap 4: Not Handling Empty Input

```python
def find_max(nums: list[int]) -> int | None:
    """Always handle empty input."""
    if not nums:
        return None  # or raise an exception
    return max(nums)
```

### Trap 5: Forgetting to Return

```python
# WRONG: function does work but returns None
def search(nums: list[int], target: int) -> int:
    for i, num in enumerate(nums):
        if num == target:
            return i
    # forgot to return -1 for "not found"!

# RIGHT
def search(nums: list[int], target: int) -> int:
    for i, num in enumerate(nums):
        if num == target:
            return i
    return -1  # explicitly handle "not found"
```

---

## Where People Go Wrong

**Jumping to code too fast.** The first 10 minutes should be thinking, not typing. If you start coding without a plan, you will end up rewriting everything.

**Not testing edge cases.** Your solution works for the happy path but crashes on empty input, single element, or all duplicates. Always test the boundaries.

**Premature optimization.** Do not try to write the most efficient solution on your first attempt. Get a working brute force solution, then optimize. A correct O(n^2) solution is worth more than a broken O(n) one.

**Memorizing solutions instead of patterns.** There are thousands of LeetCode problems. You cannot memorize them all. Learn the 10-12 patterns on this page, and you can solve any problem that uses them.

**Giving up too fast.** If you are stuck for 5 minutes, that is normal. Try a different approach. Simplify the problem. But do not stare at the screen doing nothing. Always be making progress, even if it is small.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Here is a problem: given a string s, find the length of the longest palindromic substring. Use the six-step method: understand inputs/outputs, work through the example 'babad' by hand, identify the pattern (which technique applies?), code the solution, test edge cases, and analyze complexity."</div>
</div>

---

## Key Takeaways

1. Always follow the six-step method. Understanding before coding.
2. Learn to recognize the 10 core patterns. The clues are in the problem description.
3. Start with easy problems. Master one technique at a time before combining them.
4. When stuck, simplify. Brute force first, then optimize.
5. Test edge cases. Empty input, single element, duplicates, negative numbers.
6. Practice consistently. 2-3 problems per day beats 20 problems in one marathon session.

---

**Previous:** [[wiki:python-algo-patterns]] | **Next:** [[wiki:python-backend-http]]
