# Greedy Algorithms -- Making the Locally Optimal Choice

A greedy algorithm makes the best possible choice at each step, without looking ahead or reconsidering. It picks the locally optimal option and hopes that leads to the globally optimal solution.

Sometimes it works. Sometimes it does not. The key skill is knowing the difference.

Greedy algorithms are simpler and faster than dynamic programming. But they only work when the problem has a specific structure: when the locally best choice actually leads to the globally best answer.

Open your editor. Implement every algorithm in this section yourself.

---

## The Greedy Idea

At each step:
1. Look at your current options
2. Pick the best one
3. Never go back and change your mind

That is it. No recursion exploring all possibilities. No DP table remembering past decisions. Just pick the best thing right now and move on.

---

## Greedy vs Dynamic Programming

| Aspect | Greedy | Dynamic Programming |
|--------|--------|-------------------|
| Strategy | Pick the best choice now | Consider all choices |
| Looks back? | Never | Yes, uses cached subproblems |
| Speed | Usually faster | Slower but more thorough |
| Correctness | Only works for specific problems | Works for any problem with optimal substructure + overlapping subproblems |
| Proof needed? | Yes -- you must prove greedy works | The recurrence proves correctness |

Rule of thumb: try greedy first. If you can prove it works (or if it is a known greedy problem), use it. If greedy gives wrong answers, switch to DP.

---

## When Greedy Fails -- A Counterexample

Consider coin change with coins `[1, 3, 4]` and amount `6`.

Greedy strategy: always pick the largest coin that fits.
- Pick 4 (remaining: 2)
- Pick 1 (remaining: 1)
- Pick 1 (remaining: 0)
- Total: 3 coins

Optimal solution: pick 3 + 3 = 2 coins.

Greedy **fails** here. The locally best choice (biggest coin) does not lead to the globally best answer. This is why coin change requires DP.

However, greedy **does** work for US coins `[1, 5, 10, 25]`. The specific denominations have the property that greedy always finds the minimum. Not all coin systems have this property.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning greedy algorithms. (1) What is the greedy strategy in one sentence? (2) Give an example of a problem where greedy works and one where it fails. Explain why it fails. (3) For coin change with coins [1, 5, 10, 25] and amount 41, what does the greedy algorithm produce? Is it optimal? (4) For coins [1, 3, 4] and amount 6, what does greedy produce vs the optimal answer?"</div>
</div>

---

## Classic Greedy: Activity Selection (Interval Scheduling)

You have a set of activities, each with a start time and end time. You can only do one activity at a time. What is the maximum number of activities you can attend?

**Greedy strategy:** Always pick the activity that finishes earliest (and does not conflict with the last chosen activity).

Why this works: by finishing as early as possible, you leave the most room for future activities.

### Implementation

```python
def activity_selection(start: list[int], end: list[int]) -> list[int]:
    """Return indices of maximum non-overlapping activities."""
    n: int = len(start)

    # create list of (end_time, start_time, index) and sort by end time
    activities: list[tuple[int, int, int]] = []
    i: int = 0
    while i < n:
        activities.append((end[i], start[i], i))
        i += 1

    activities.sort()  # sort by end time (first element of tuple)

    selected: list[int] = [activities[0][2]]  # pick the first activity
    last_end: int = activities[0][0]

    i = 1
    while i < n:
        current_start: int = activities[i][1]
        if current_start >= last_end:
            selected.append(activities[i][2])
            last_end = activities[i][0]
        i += 1

    return selected
```

**Time complexity:** O(n log n) for sorting.
**Space complexity:** O(n).

### Trace

```
Activities: start = [1, 3, 0, 5, 8, 5]
            end   = [2, 4, 6, 7, 9, 9]

After sorting by end time:
  (end=2, start=1, idx=0)
  (end=4, start=3, idx=1)
  (end=6, start=0, idx=2)
  (end=7, start=5, idx=3)
  (end=9, start=8, idx=4)
  (end=9, start=5, idx=5)

Pick activity 0 (1-2). last_end = 2.
Activity 1 (3-4): start 3 >= 2? Yes. Pick it. last_end = 4.
Activity 2 (0-6): start 0 >= 4? No. Skip.
Activity 3 (5-7): start 5 >= 4? Yes. Pick it. last_end = 7.
Activity 4 (8-9): start 8 >= 7? Yes. Pick it. last_end = 9.
Activity 5 (5-9): start 5 >= 9? No. Skip.

Selected: [0, 1, 3, 4] -> 4 activities
```

---

## Classic Greedy: Fractional Knapsack

You have items with weights and values. Your knapsack has a weight limit. Unlike 0/1 knapsack, you can take fractions of items.

**Greedy strategy:** Sort by value-to-weight ratio (value per unit weight). Take as much as possible of the highest-ratio item, then the next, and so on.

Why this works: with fractions allowed, taking the most valuable stuff per unit weight is always optimal.

### Implementation

```python
def fractional_knapsack(weights: list[int], values: list[int], capacity: int) -> float:
    """Return maximum value that fits in the knapsack (fractions allowed)."""
    n: int = len(weights)

    # create (value/weight ratio, weight, value) tuples
    items: list[tuple[float, int, int]] = []
    i: int = 0
    while i < n:
        ratio: float = values[i] / weights[i]
        items.append((ratio, weights[i], values[i]))
        i += 1

    # sort by ratio descending
    items.sort(reverse=True)

    total_value: float = 0.0
    remaining: int = capacity

    i = 0
    while i < n and remaining > 0:
        ratio: float = items[i][0]
        weight: int = items[i][1]
        value: int = items[i][2]

        if weight <= remaining:
            # take the whole item
            total_value += value
            remaining -= weight
        else:
            # take a fraction
            fraction: float = remaining / weight
            total_value += value * fraction
            remaining = 0

        i += 1

    return total_value
```

**Time complexity:** O(n log n) for sorting.

### Why Greedy Fails for 0/1 Knapsack

In 0/1 knapsack, you cannot take fractions. So a high-ratio item might not fit, and you are stuck. Consider:
- Item A: weight 10, value 60, ratio 6.0
- Item B: weight 20, value 100, ratio 5.0
- Item C: weight 30, value 120, ratio 4.0
- Capacity: 50

Greedy takes A (10, 60) + B (20, 100) = weight 30, value 160, with 20 capacity left. C does not fit.
Optimal takes B (20, 100) + C (30, 120) = weight 50, value 220.

Greedy picks the wrong items because it cannot take fractions to fill the gap.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning greedy algorithms. (1) For the activity selection problem with activities [(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)], apply the greedy algorithm step by step. How many activities are selected? (2) Why does fractional knapsack work with greedy but 0/1 knapsack does not? (3) In activity selection, what happens if you sort by start time instead of end time? Does the greedy approach still work? Give a counterexample."</div>
</div>

---

## Classic Greedy: Jump Game

Given an array where each element represents the maximum jump length from that position, determine if you can reach the last index.

Example: `[2, 3, 1, 1, 4]` -> True (jump 1 to index 1, then 3 to the end).
Example: `[3, 2, 1, 0, 4]` -> False (stuck at index 3).

**Greedy strategy:** Track the farthest index you can reach. If you can reach or pass the end, return True.

```python
def can_jump(nums: list[int]) -> bool:
    farthest: int = 0
    i: int = 0
    while i < len(nums):
        if i > farthest:
            return False  # cannot reach this position
        farthest = max(farthest, i + nums[i])
        if farthest >= len(nums) - 1:
            return True
        i += 1
    return True
```

**Time:** O(n). **Space:** O(1).

### Trace

```
nums = [2, 3, 1, 1, 4]

i=0: farthest = max(0, 0+2) = 2
i=1: 1 <= 2, ok. farthest = max(2, 1+3) = 4. 4 >= 4? Yes! return True.
```

```
nums = [3, 2, 1, 0, 4]

i=0: farthest = max(0, 0+3) = 3
i=1: farthest = max(3, 1+2) = 3
i=2: farthest = max(3, 2+1) = 3
i=3: farthest = max(3, 3+0) = 3. 3 < 4.
i=4: 4 > 3? Yes! return False.
```

---

## Classic Greedy: Gas Station

There are `n` gas stations around a circular route. Station `i` has `gas[i]` fuel and it costs `cost[i]` fuel to travel to the next station. Find the starting station index where you can complete the full circle, or return -1.

**Greedy insight:** If the total gas >= total cost, a solution exists. Start at the station right after the point where your running tank would go most negative.

```python
def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    total_tank: int = 0
    current_tank: int = 0
    start: int = 0

    i: int = 0
    while i < len(gas):
        diff: int = gas[i] - cost[i]
        total_tank += diff
        current_tank += diff

        if current_tank < 0:
            # cannot start from any station before i+1
            start = i + 1
            current_tank = 0
        i += 1

    if total_tank < 0:
        return -1
    return start
```

**Time:** O(n). **Space:** O(1).

---

## Classic Greedy: Assign Cookies

You have children with greed factors `g[i]` (minimum cookie size they will accept) and cookies with sizes `s[j]`. Maximize the number of content children. Each child gets at most one cookie.

**Greedy strategy:** Sort both arrays. Give the smallest acceptable cookie to the least greedy child first.

```python
def find_content_children(g: list[int], s: list[int]) -> int:
    g.sort()
    s.sort()

    child: int = 0
    cookie: int = 0

    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            child += 1  # this child is content
        cookie += 1     # move to next cookie either way

    return child
```

**Time:** O(n log n + m log m). **Space:** O(1) (sorting in place).

---

## Classic Greedy: Meeting Rooms II

Given a list of meeting intervals, find the minimum number of conference rooms needed.

**Greedy strategy:** Sort by start time. Use a min-heap to track end times of ongoing meetings. If the earliest ending meeting ends before the current one starts, reuse that room.

```python
import heapq


def min_meeting_rooms(intervals: list[list[int]]) -> int:
    if len(intervals) == 0:
        return 0

    intervals.sort()  # sort by start time

    # min-heap of end times
    rooms: list[int] = []
    heapq.heappush(rooms, intervals[0][1])

    i: int = 1
    while i < len(intervals):
        if intervals[i][0] >= rooms[0]:
            heapq.heappop(rooms)  # reuse the room
        heapq.heappush(rooms, intervals[i][1])
        i += 1

    return len(rooms)
```

**Time:** O(n log n). **Space:** O(n).

### Trace

```
intervals = [[0,30], [5,10], [15,20]]
Sort by start: [[0,30], [5,10], [15,20]]

rooms = [30] (meeting 0-30)

Meeting [5,10]: start 5 < rooms[0]=30, need new room.
  rooms = [10, 30]

Meeting [15,20]: start 15 >= rooms[0]=10, reuse room.
  Pop 10, push 20. rooms = [20, 30]

Answer: 2 rooms
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning greedy algorithms. (1) For the jump game with array [3, 0, 2, 0, 1, 4], trace through the algorithm. Can you reach the end? (2) Write the assign cookies solution from scratch with type hints. Test with g = [1, 2, 3] and s = [1, 1]. How many children are content? (3) For meeting rooms with intervals [[1,5], [2,3], [4,6], [7,8]], how many rooms are needed? Trace through the algorithm step by step."</div>
</div>

---

## How to Prove a Greedy Algorithm Works

Greedy algorithms can be tricky because the greedy strategy is not always correct. There are two common ways to argue correctness:

### 1. Exchange Argument

Assume someone has an optimal solution that differs from the greedy solution. Show that you can swap one of their choices with the greedy choice without making the solution worse. Repeat until you have the greedy solution, proving it is at least as good as optimal.

### 2. "Greedy Stays Ahead"

Show that at every step, the greedy solution is at least as good as any other solution at that same step. If greedy is never behind, it cannot end up worse.

For interviews, you usually do not need a formal proof. But you should be able to explain **why** the greedy strategy works for the specific problem. "Because it seemed right" is not good enough.

---

## The Greedy Template

Most greedy algorithms follow this pattern:

```
1. Sort or organize the input (often by some criterion)
2. Initialize your solution
3. Iterate through the input:
   a. If the current element fits the greedy criterion, take it
   b. Otherwise, skip it
4. Return the solution
```

The key decision is: **what do you sort by?** In activity selection, sort by end time. In fractional knapsack, sort by value/weight ratio. In assign cookies, sort both arrays by size.

---

## Where People Go Wrong

### 1. Applying Greedy When DP Is Needed

The biggest mistake. Just because a greedy approach gives the right answer on your test case does not mean it works on all inputs. The coin change counterexample (`[1, 3, 4]`, amount 6) shows this.

Always ask: "Can I construct a case where greedy picks the wrong answer?"

### 2. Wrong Greedy Criterion

In activity selection, sorting by duration (shortest first) is wrong. Sorting by start time is wrong. Only sorting by end time works. Choosing the wrong criterion gives a valid-looking but incorrect algorithm.

### 3. Not Proving Correctness

For known problems (activity selection, Huffman coding), the proof is established. For a new problem, you need to convince yourself (or the interviewer) that greedy works. Try small counterexamples before committing.

### 4. Forgetting to Sort

Many greedy algorithms require sorted input. Skipping the sort gives wrong results.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I've studied greedy algorithms. Give me a comprehensive quiz: (1) For each of these problems, say whether greedy or DP is needed and why: coin change with arbitrary denominations, activity selection, 0/1 knapsack, fractional knapsack, jump game. (2) Write a greedy solution for this problem: given a string of digits, remove k digits to make the smallest possible number. For example, '1432219' with k=3 should give '1219'. Include type hints. (3) Explain the exchange argument for proving activity selection's correctness in your own words."</div>
</div>

---

## Practice Exercises

1. Implement the activity selection algorithm. Test with start = `[1, 3, 0, 5, 8, 5]`, end = `[2, 4, 6, 7, 9, 9]`.

2. Implement the fractional knapsack. Test with weights = `[10, 20, 30]`, values = `[60, 100, 120]`, capacity = 50.

3. Implement the jump game. Test with `[2, 3, 1, 1, 4]` (should return True) and `[3, 2, 1, 0, 4]` (should return False).

4. Implement the meeting rooms problem. Test with `[[0, 30], [5, 10], [15, 20]]` (should return 2).

5. Think about this: for the problem "make change for 36 cents using US coins [1, 5, 10, 25]," trace through the greedy algorithm. Then try with coins `[1, 15, 25]` and amount 30. Does greedy still work?

---

**Previous:** [[wiki:python-algo-dynamic-programming]] | **Next:** [[wiki:python-algo-graph]]
