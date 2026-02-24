# Puzzle Solving Mastery -- Putting Everything Together

You have come a long way! You know data structures (lists, stacks, queues, trees, graphs, hash tables, heaps). You know algorithms (sorting, searching, recursion, dynamic programming, greedy, graph algorithms). You know patterns (two pointers, sliding window, prefix sum, and more).

Now it is time to put it **all** together. This page teaches you a *method* -- a step-by-step way to approach any coding puzzle, no matter how tricky it looks at first. You will also practice with fully worked examples so you can see the method in action.

The biggest mistake people make with coding puzzles is jumping straight into writing code. They read the problem, panic, and start typing. Then they get stuck halfway through because they never had a plan.

Solving puzzles is a skill. Like any skill, it has a method. Learn the method, practice it, and you will become a coding expert.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, sitting at a colorful desk with a pencil and paper, thinking about a puzzle. Above the robot's head is a thought bubble showing the steps: read, draw, plan, code. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The Six-Step Method

Use these six steps for **every single puzzle**. Even if the problem looks easy, go through the steps. Building good habits on easy problems means you will not freeze on hard ones.

### Step 1: UNDERSTAND

Read the problem carefully. Then read it again. Ask yourself:

- What are the **inputs**? (What data am I given? What types? What size?)
- What is the **output**? (What exactly do I need to return?)
- What are the **constraints**? (How big can the input be? Can numbers be negative? Are there duplicates?)
- What are the **edge cases**? (What if the input is empty? What if there is only one element?)

Do not touch your keyboard yet! Make sure you truly understand what is being asked.

### Step 2: EXAMPLES

Work through examples **by hand** -- on paper, or in your head. Take the sample inputs and manually figure out the answer. This builds intuition for how the solution should work.

If the problem only gives one example, make up more. Try small inputs, weird inputs, and edge cases.

### Step 3: PATTERN

Ask yourself: "What technique does this remind me of?" Look for clues:

- Is the data sorted? Maybe **two pointers** or **binary search**.
- Am I looking for combinations or permutations? Maybe **backtracking**.
- Does the problem have overlapping sub-problems? Maybe **dynamic programming**.
- Am I looking for the shortest path? Maybe **BFS** or **Dijkstra**.
- Am I looking for connected groups? Maybe **Union-Find** or **DFS**.

(See the full pattern-matching guide below!)

### Step 4: PLAN

Describe your approach in **plain words** before writing any code. Write out the steps your solution will take, like giving directions to a friend. If you cannot explain it in words, you are not ready to code it.

### Step 5: CODE

Now write the solution. Follow your plan step by step. Use clear variable names. Add comments if the logic is tricky.

### Step 6: TEST

Check your solution:

- Does it work on the given examples?
- Does it work on edge cases? (empty input, one element, very large input)
- Does it handle weird situations? (all elements the same, negative numbers, zeros)
- Is it fast enough given the constraints?

---

## Pattern-Matching Guide

When you read a puzzle, look for these clues to identify the right technique:

| Clue in the problem | Technique to try |
|---|---|
| "Sorted array" or "sorted list" | **Two Pointers** or **Binary Search** |
| "Find a pair that..." | **Two Pointers** (if sorted) or **Hash Table** |
| "All combinations" or "all subsets" | **Backtracking** |
| "Minimum cost" or "maximum value" with choices | **Dynamic Programming** or **Greedy** |
| "Shortest path" | **BFS** (unweighted) or **Dijkstra** (weighted) |
| "Connected groups" or "number of islands" | **Union-Find** or **DFS** |
| "Consecutive sub-section" | **Sliding Window** |
| "Sum of a range" | **Prefix Sum** |
| "Next greater/smaller" | **Monotonic Stack** |
| "Valid parentheses" or "matching brackets" | **Stack** |
| "Overlapping intervals" | **Sort + Merge** |
| "Top K" or "Kth largest" | **Heap** |
| "Tasks with dependencies" | **Topological Sort** |

This is not a rigid rule -- sometimes multiple patterns fit, and you need to think about which is best. But this table gives you a strong starting point.

---

## Worked Puzzle 1: Two Sum

**Problem:** Given a list of numbers and a target, find two numbers that add up to the target. Return their indices.

### Step 1: UNDERSTAND

- Input: a list of integers, a target integer.
- Output: indices of two numbers that add up to target.
- Constraints: exactly one solution exists, cannot use the same element twice.

### Step 2: EXAMPLES

```
nums = [2, 7, 11, 15], target = 9
2 + 7 = 9. Return [0, 1].

nums = [3, 2, 4], target = 6
3 + 2 = 5 (no), 3 + 4 = 7 (no), 2 + 4 = 6 (yes!). Return [1, 2].
```

### Step 3: PATTERN

We need to find a pair. If the list were sorted, we could use two pointers. But we need the *original* indices, and sorting would change them. Instead, use a **hash table** -- for each number, check if "target minus this number" is already in the table.

### Step 4: PLAN

1. Create an empty dictionary (hash table).
2. Go through each number.
3. Calculate what number we need: `need = target - current_number`.
4. If `need` is in the dictionary, return both indices.
5. Otherwise, add the current number and its index to the dictionary.

### Step 5: CODE

```python
def two_sum(nums: list[int], target: int) -> list[int]:
    """Return indices of two numbers that add up to target."""
    seen: dict[int, int] = {}  # number -> index

    i: int = 0
    while i < len(nums):
        need: int = target - nums[i]
        if need in seen:
            return [seen[need], i]
        seen[nums[i]] = i
        i += 1

    return []
```

### Step 6: TEST

```
nums = [2, 7, 11, 15], target = 9

i=0: need = 9-2 = 7. 7 not in seen. seen = {2: 0}.
i=1: need = 9-7 = 2. 2 IS in seen (index 0). Return [0, 1]. Correct!

Edge case: nums = [3, 3], target = 6
i=0: need = 3. Not in seen. seen = {3: 0}.
i=1: need = 3. IS in seen (index 0). Return [0, 1]. Correct!
```

**Time:** O(n). **Space:** O(n) for the hash table.

---

## Worked Puzzle 2: Valid Brackets

**Problem:** Given a string containing only `(`, `)`, `{`, `}`, `[`, `]`, determine if the brackets are valid. Every opening bracket must have a matching closing bracket in the correct order.

### Step 1: UNDERSTAND

- Input: a string of bracket characters.
- Output: True or False.
- Valid: `"()[]{}"`, `"([])"`. Invalid: `"(]"`, `"([)]"`, `"("`.

### Step 2: EXAMPLES

```
"()" -> True.  Opening ( matched by closing ).
"{[]}" -> True.  { opens, [ opens, ] closes [, } closes {.
"(]" -> False.  ( opened but ] does not match.
"" -> True.  Empty string is valid (nothing to mismatch).
```

### Step 3: PATTERN

"Matching brackets" screams **stack**! Push opening brackets onto the stack. When you see a closing bracket, pop from the stack and check if it matches.

### Step 4: PLAN

1. Create an empty stack and a mapping of closing-to-opening brackets.
2. Go through each character.
3. If it is an opening bracket, push it onto the stack.
4. If it is a closing bracket, pop from the stack and check if they match.
5. At the end, the stack should be empty.

### Step 5: CODE

```python
def is_valid_brackets(s: str) -> bool:
    """Return True if all brackets are properly matched."""
    matching: dict[str, str] = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    i: int = 0
    while i < len(s):
        char: str = s[i]

        if char in matching:
            # closing bracket
            if len(stack) == 0:
                return False
            top: str = stack.pop()
            if top != matching[char]:
                return False
        else:
            # opening bracket
            stack.append(char)
        i += 1

    return len(stack) == 0
```

### Step 6: TEST

```
s = "{[]}"

i=0 '{': opening. Push. Stack: ['{']
i=1 '[': opening. Push. Stack: ['{', '[']
i=2 ']': closing. Pop '['. matching[']'] = '['. Match! Stack: ['{']
i=3 '}': closing. Pop '{'. matching['}'] = '{'. Match! Stack: []

Stack empty. Return True. Correct!

s = "([)]"
i=0 '(': Push. Stack: ['(']
i=1 '[': Push. Stack: ['(', '[']
i=2 ')': Pop '['. matching[')'] = '('. '[' != '('. Return False. Correct!
```

**Time:** O(n). **Space:** O(n) for the stack.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, sorting colorful bracket-shaped blocks into matching pairs. A stack of blocks sits nearby. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Worked Puzzle 3: Best Time to Buy and Sell

**Problem:** You have a list of prices for a stock on different days. Find the maximum profit you can make by buying on one day and selling on a later day. If no profit is possible, return 0.

### Step 1: UNDERSTAND

- Input: list of prices (integers).
- Output: maximum profit (integer, at least 0).
- Buy must happen BEFORE sell.

### Step 2: EXAMPLES

```
prices = [7, 1, 5, 3, 6, 4]
Buy at 1 (day 1), sell at 6 (day 4). Profit = 5.

prices = [7, 6, 4, 3, 1]
Prices only go down. No profit possible. Return 0.
```

### Step 3: PATTERN

We need to find the minimum price so far and the maximum profit from selling at the current price. This is a **one-pass** technique -- track the running minimum.

### Step 4: PLAN

1. Track the minimum price seen so far (start with the first price).
2. For each day, calculate the profit if we sold today.
3. Update the maximum profit and minimum price.

### Step 5: CODE

```python
def max_profit(prices: list[int]) -> int:
    """Return the maximum profit from one buy-sell transaction."""
    if len(prices) < 2:
        return 0

    min_price: int = prices[0]
    best_profit: int = 0

    i: int = 1
    while i < len(prices):
        profit: int = prices[i] - min_price
        if profit > best_profit:
            best_profit = profit
        if prices[i] < min_price:
            min_price = prices[i]
        i += 1

    return best_profit
```

### Step 6: TEST

```
prices = [7, 1, 5, 3, 6, 4]

i=1: price=1, profit=1-7=-6, best=0, min_price=1
i=2: price=5, profit=5-1=4,  best=4, min_price=1
i=3: price=3, profit=3-1=2,  best=4, min_price=1
i=4: price=6, profit=6-1=5,  best=5, min_price=1
i=5: price=4, profit=4-1=3,  best=5, min_price=1

Return 5. Correct!

Edge case: prices = [5]
len < 2, return 0. Correct!
```

**Time:** O(n). **Space:** O(1).

---

## Worked Puzzle 4: Palindrome Check

**Problem:** Check if a string is a palindrome (reads the same forwards and backwards), considering only letters and digits and ignoring upper/lower case.

### Step 1: UNDERSTAND

- Input: a string (may contain spaces, punctuation, mixed case).
- Output: True if it is a palindrome, False otherwise.
- "A man, a plan, a canal: Panama" is a palindrome (ignore spaces and punctuation).

### Step 2: EXAMPLES

```
"racecar" -> True
"hello" -> False
"A man, a plan, a canal: Panama" -> True (after removing non-letters and lowering case: "amanaplanacanalpanama")
"" -> True (empty string is a palindrome)
```

### Step 3: PATTERN

**Two pointers!** Start one pointer at the beginning and one at the end. Move them toward each other, skipping non-letter characters, and compare.

### Step 4: PLAN

1. Set left to 0 and right to the last index.
2. While left < right:
   - Skip non-alphanumeric characters from both ends.
   - Compare characters (case-insensitive).
   - If they do not match, return False.
3. Return True.

### Step 5: CODE

```python
def is_palindrome(s: str) -> bool:
    """Return True if the string is a palindrome (letters and digits only)."""
    left: int = 0
    right: int = len(s) - 1

    while left < right:
        # skip non-alphanumeric characters
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True
```

### Step 6: TEST

```
s = "A man, a plan, a canal: Panama"

left=0 'A', right=29 'a': 'a' == 'a'. Match!
left=1 ' ', skip. left=2 'm', right=28 'm': match!
... (continues matching through the string)

All characters match. Return True. Correct!

s = "hello"
left=0 'h', right=4 'o': 'h' != 'o'. Return False. Correct!

s = ""
left=0, right=-1. left < right is False. Return True. Correct!
```

**Time:** O(n). **Space:** O(1).

---

## Worked Puzzle 5: Reverse a Linked List

**Problem:** Given the head of a singly linked list, reverse it and return the new head.

### Step 1: UNDERSTAND

- Input: head node of a linked list.
- Output: head of the reversed list.
- `1 -> 2 -> 3 -> 4 -> None` becomes `4 -> 3 -> 2 -> 1 -> None`.

### Step 2: EXAMPLES

```
1 -> 2 -> 3 -> None
becomes
3 -> 2 -> 1 -> None

Single node: 5 -> None stays as 5 -> None.
Empty list: None stays as None.
```

### Step 3: PATTERN

This is a classic **pointer manipulation** problem. We flip each arrow one by one using three pointers: previous, current, and next.

### Step 4: PLAN

1. Start with `previous = None` and `current = head`.
2. While current is not None:
   - Save the next node.
   - Point current's next to previous (flip the arrow!).
   - Move previous and current forward.
3. Return previous (the new head).

### Step 5: CODE

```python
class ListNode:
    def __init__(self, val: int = 0, next_node: "ListNode | None" = None) -> None:
        self.val: int = val
        self.next: ListNode | None = next_node


def reverse_linked_list(head: ListNode | None) -> ListNode | None:
    """Reverse a singly linked list and return the new head."""
    previous: ListNode | None = None
    current: ListNode | None = head

    while current is not None:
        next_node: ListNode | None = current.next  # save next
        current.next = previous                     # flip the arrow
        previous = current                          # move previous forward
        current = next_node                         # move current forward

    return previous
```

### Step 6: TEST

```
List: 1 -> 2 -> 3 -> None

Step 1: previous=None, current=1
  next_node=2. Flip: 1->None. previous=1, current=2.
  State: None <- 1   2 -> 3 -> None

Step 2: previous=1, current=2
  next_node=3. Flip: 2->1. previous=2, current=3.
  State: None <- 1 <- 2   3 -> None

Step 3: previous=2, current=3
  next_node=None. Flip: 3->2. previous=3, current=None.
  State: None <- 1 <- 2 <- 3

current is None. Return previous (node 3).
Result: 3 -> 2 -> 1 -> None. Correct!
```

**Time:** O(n). **Space:** O(1).

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, reversing a chain of colorful linked train cars on a track, flipping the direction of each connector arrow one by one. A playful workshop setting with soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Challenge Puzzles -- Try These on Your Own!

Use the six-step method for each one. Do not jump into code -- understand, try examples, identify the pattern, and plan first!

**Challenge 1: Merge Two Sorted Lists**
You have two sorted linked lists. Merge them into one sorted linked list and return the head.
Example: `1->3->5` and `2->4->6` becomes `1->2->3->4->5->6`.

**Challenge 2: Maximum Depth of a Binary Tree**
Given the root of a binary tree, find its maximum depth (the longest path from root to any leaf node).
Example: a tree with root 1, children 2 and 3, where 2 has child 4, has depth 3.

**Challenge 3: Climbing Stairs**
You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?
Example: n=3 gives 3 ways (1+1+1, 1+2, 2+1).

**Challenge 4: Contains Duplicate**
Given a list of integers, return True if any value appears more than once.
Example: `[1, 2, 3, 1]` returns True. `[1, 2, 3, 4]` returns False.

**Challenge 5: Invert a Binary Tree**
Given a binary tree, swap every left child with its right child (mirror the tree).
Example: a tree with root 1, left child 2 (with children 4, 5), right child 3 (with children 6, 7) becomes root 1, left child 3 (with children 7, 6), right child 2 (with children 5, 4).

---

## Getting Unstuck -- Strategies When You Are Stuck

Everyone gets stuck. Even expert programmers get stuck. The difference is that experts have strategies for getting unstuck. Here are yours:

### Strategy 1: Simplify the Problem

If the full problem is overwhelming, solve a simpler version first:

- Can you solve it for a tiny input (a list with 2 or 3 elements)?
- Can you solve it without one of the constraints?
- Can you solve it with brute force first, then optimize?

### Strategy 2: Solve a Smaller Version by Hand

Grab a pencil and paper. Work through a small example step by step. Write down exactly what you do at each step. Often, the algorithm you use by hand IS the algorithm you need to code.

### Strategy 3: Draw It Out

Many problems become much clearer when you draw them:

- Lists and arrays: draw boxes with numbers.
- Linked lists: draw circles with arrows.
- Trees: draw the tree structure.
- Graphs: draw nodes and edges.
- DP tables: draw the grid and fill it in.

### Strategy 4: Think About What Data Structure Helps

Ask: "What operation do I need to do fast?"

- Need fast lookup? **Hash table**.
- Need to process in order? **Queue** or **stack**.
- Need the minimum/maximum quickly? **Heap**.
- Need sorted data? **Binary search tree** or **sorted list**.

### Strategy 5: Work Backwards

Sometimes it helps to start from the desired output and think backwards. "If I need this answer, what would I need to know at the previous step? And the step before that?"

### Strategy 6: Explain It Out Loud

Talk through the problem as if you are explaining it to a friend. Say what you know, what you are trying to find, and what is confusing you. Often, just putting the problem into words helps you see the solution. This is sometimes called "rubber duck debugging" -- you can even explain it to a rubber duck on your desk!

---

## Practice Questions

Try these on your own before looking at the answers!

**Question 1:** Walk through the six-step method for this problem: "Given a list of integers, find the two numbers that are closest together (smallest absolute difference). Return them as a pair."

**Question 2:** You see this problem: "Given a string, find the length of the longest substring without repeating characters." Which pattern would you use? Describe your plan in plain words.

**Question 3:** You see this problem: "Given a list of meeting time intervals, find the minimum number of meeting rooms needed." Which pattern fits, and what is the key insight?

**Question 4:** A problem says "Given a binary tree, check if it is symmetric (a mirror of itself)." Describe your approach using the six-step method.

**Question 5:** You are stuck on a problem about finding all paths in a graph. Which "getting unstuck" strategy would help most, and what would you do specifically?

**Question 6:** A problem asks: "Given a list of integers and a target, find the number of pairs that sum to the target." The list is NOT sorted. What pattern would you use, and why?

**Question 7:** For the challenge puzzle "Climbing Stairs" above, what pattern does it match? (Think carefully -- there is a very famous sequence hiding in this problem!)

**Question 8:** Explain why "understand the problem" (Step 1) is the most important step. Give an example of what could go wrong if you skip it.

---

## Answers to Practice Questions

**Answer 1:**

**UNDERSTAND:** Input is a list of integers (at least 2 elements). Output is a pair of numbers with the smallest absolute difference.

**EXAMPLES:** `[4, 1, 7, 3]` -- differences: |4-1|=3, |4-7|=3, |4-3|=1, |1-7|=6, |1-3|=2, |7-3|=4. Closest pair: (4, 3) with difference 1.

**PATTERN:** If we sort the list first, the closest pair must be adjacent! This turns it from checking all pairs O(n^2) into a simple scan O(n log n).

**PLAN:** Sort the list. Scan through comparing each element to the next. Track the pair with the smallest difference.

**CODE:**
```python
def closest_pair(nums: list[int]) -> list[int]:
    nums_sorted: list[int] = sorted(nums)
    min_diff: int = nums_sorted[1] - nums_sorted[0]
    best: list[int] = [nums_sorted[0], nums_sorted[1]]
    i: int = 1
    while i < len(nums_sorted) - 1:
        diff: int = nums_sorted[i + 1] - nums_sorted[i]
        if diff < min_diff:
            min_diff = diff
            best = [nums_sorted[i], nums_sorted[i + 1]]
        i += 1
    return best
```

**TEST:** `[4, 1, 7, 3]` sorted is `[1, 3, 4, 7]`. Differences: 2, 1, 3. Smallest is 1 between 3 and 4. Return [3, 4]. Correct!

**Answer 2:** Use the **sliding window** pattern (variable-size window). Plan: use a set to track characters in the current window. Expand the right end one character at a time. If the new character is already in the set, shrink from the left (removing characters from the set) until there are no duplicates. Track the maximum window size seen.

**Answer 3:** This is an **interval** problem. The key insight: sort meetings by start time, then use a **min-heap** to track end times of ongoing meetings. For each new meeting, if its start time is after the earliest ending meeting, that room is freed (pop from heap). Otherwise, you need a new room. The size of the heap at its largest is the answer.

**Answer 4:**

**UNDERSTAND:** Input is the root of a binary tree. Output is True/False -- is the tree a mirror image of itself?

**EXAMPLES:** A tree with root 1, left child 2, right child 2, where left-2 has left child 3 and right child 4, and right-2 has left child 4 and right child 3. This IS symmetric.

**PATTERN:** This is a **tree traversal** problem. We need to compare the left subtree with the right subtree, but mirrored.

**PLAN:** Write a helper function that takes two nodes and checks if they are mirrors. Two nodes are mirrors if: (1) both are None, or (2) they have the same value AND the left child of one mirrors the right child of the other.

**CODE:**
```python
def is_symmetric(root) -> bool:
    def is_mirror(left, right) -> bool:
        if left is None and right is None:
            return True
        if left is None or right is None:
            return False
        return (left.val == right.val
                and is_mirror(left.left, right.right)
                and is_mirror(left.right, right.left))

    if root is None:
        return True
    return is_mirror(root.left, root.right)
```

**Answer 5:** **Draw it out** (Strategy 3) would help most. Specifically: draw the graph with its nodes and edges on paper. Then manually trace all possible paths from the starting node, drawing each path in a different color. This will help you see the pattern of how paths branch and how you need to explore them (likely using DFS with backtracking -- add a node to your current path, explore further, then remove it and try the next option).

**Answer 6:** Use a **hash table** pattern. Since the list is not sorted, two pointers would require sorting first (and we might lose index information). Instead, use a dictionary to count how many times each number appears. For each number x, check how many times (target - x) appears. Be careful not to double-count pairs, and handle the special case where x equals target - x.

```python
def count_pairs(nums: list[int], target: int) -> int:
    count: dict[int, int] = {}
    i: int = 0
    while i < len(nums):
        count[nums[i]] = count.get(nums[i], 0) + 1
        i += 1

    pairs: int = 0
    seen: set[int] = set()
    for num in count:
        complement: int = target - num
        if complement in count and complement not in seen:
            if num == complement:
                pairs += count[num] * (count[num] - 1) // 2
            else:
                pairs += count[num] * count[complement]
            seen.add(num)

    return pairs
```

**Answer 7:** Climbing Stairs matches **dynamic programming**! The number of ways to reach step n equals the number of ways to reach step n-1 (then take 1 step) plus the number of ways to reach step n-2 (then take 2 steps). This gives: `ways(n) = ways(n-1) + ways(n-2)`. That is the **Fibonacci sequence**! ways(1) = 1, ways(2) = 2, ways(3) = 3, ways(4) = 5, ways(5) = 8, and so on.

```python
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2: int = 1  # ways(1)
    prev1: int = 2  # ways(2)
    step: int = 3
    while step <= n:
        current: int = prev1 + prev2
        prev2 = prev1
        prev1 = current
        step += 1
    return prev1
```

**Answer 8:** Step 1 is the most important because if you misunderstand the problem, everything else falls apart -- you will write a perfect solution to the *wrong* problem.

Example: A problem says "Return the indices of two numbers that add up to the target." If you skip careful reading and write a solution that returns the *numbers* instead of the *indices*, your entire solution is wrong even though the logic is correct. Or if the problem says "cannot use the same element twice" and you miss that constraint, your solution might return `[0, 0]` (using the same element twice) which would be wrong.

Another example: if a problem says numbers can be negative and you assume they are positive, your solution might break on inputs like `[-1, -2, -3]`. Always read the constraints carefully!

---

**Previous:** [[wiki:python-jr-algo-patterns]] | **Next:** [[wiki:python-jr-roadmap]]
