# Greedy Algorithms -- Always Pick the Best Option Right Now

In [[wiki:python-jr-algo-dynamic-programming]], you learned how to solve optimization problems by carefully considering every possibility and remembering the results. Dynamic programming always finds the best answer, but it can be complex to set up.

What if there were a simpler approach? What if, at each step, you just picked **the best option available right now** without thinking about the future? That is the idea behind **greedy algorithms**.

Sometimes this simple strategy gives you the perfect answer. Sometimes it does not. The trick is knowing when you can trust it and when you cannot. This lesson will teach you exactly that.

![A flat vector illustration in a children's educational book style showing Byte the robot at a colorful buffet table with many plates of food, eagerly reaching for the biggest plate first. Other plates of different sizes are arranged on the table. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Greedy Algorithm?

A **greedy algorithm** makes the best possible choice at each step, hoping that these locally best choices add up to the globally best answer.

The key word is **locally**. A greedy algorithm looks at what is right in front of it and picks the best option **right now**, without looking ahead to see what happens later.

### Analogy 1: The Buffet

Imagine you are at a buffet and you can only carry one plate at a time. Your strategy: each trip, grab the plate with the **most food** on it. You do not think about what plates might be available on your next trip -- you just grab the biggest one you can see right now.

This greedy strategy might work great (you end up with lots of food!). But sometimes it backfires (maybe you grabbed a huge plate of something you do not like, and missed a smaller plate of your favorite dish).

### Analogy 2: Making Change with Coins

A cashier needs to give you 67 cents in change. They want to use as few coins as possible. The greedy strategy:

1. Pick the **biggest** coin that does not go over 67: a quarter (25 cents). Remaining: 42 cents.
2. Pick the biggest coin that fits: another quarter (25 cents). Remaining: 17 cents.
3. Pick the biggest coin that fits: a dime (10 cents). Remaining: 7 cents.
4. Pick the biggest coin that fits: a nickel (5 cents). Remaining: 2 cents.
5. Pick the biggest coin that fits: a penny (1 cent). Remaining: 1 cent.
6. Pick the biggest coin that fits: a penny (1 cent). Remaining: 0 cents. Done!

Result: 25 + 25 + 10 + 5 + 1 + 1 = 6 coins.

Is this the best possible? Yes! With standard US coins (quarters, dimes, nickels, pennies), the greedy approach always gives the fewest coins. Let's put this in code:

```python
def make_change_greedy(coins: list[int], amount: int) -> list[int]:
    coins_sorted: list[int] = sorted(coins, reverse=True)  # Biggest first
    result: list[int] = []

    remaining: int = amount
    for coin in coins_sorted:
        while remaining >= coin:
            result.append(coin)
            remaining = remaining - coin

    return result
```

```python
us_coins: list[int] = [25, 10, 5, 1]
print(make_change_greedy(us_coins, 67))
# [25, 25, 10, 5, 1, 1] -- 6 coins
```

Clean, simple, and fast. No tables, no memoization, no recursion. Just pick the biggest coin that fits, over and over.

---

## When Greedy Fails

Here is the catch: greedy does NOT always work.

### A Tricky Set of Coins

Imagine a country whose coins are worth 1, 3, and 4 cents. You need to make 6 cents.

**Greedy approach:** pick the biggest coin first.
1. Pick 4 (biggest that fits). Remaining: 2.
2. Pick 1. Remaining: 1.
3. Pick 1. Remaining: 0.

Greedy uses **3 coins**: 4 + 1 + 1.

**But wait!** There is a better answer: **3 + 3 = 2 coins!**

The greedy algorithm failed because picking the biggest coin first (4) locked us into a bad path. It could not see that picking a smaller coin (3) twice would lead to a better overall result.

```python
# Greedy gives the WRONG answer here
weird_coins: list[int] = [4, 3, 1]
print(make_change_greedy(weird_coins, 6))
# [4, 1, 1] -- 3 coins (WRONG! 3+3 = 2 coins is better)
```

This is the fundamental limitation of greedy algorithms. By always picking what looks best right now, they can miss better solutions that require making a "worse" choice now for a bigger payoff later.

Remember the coin change problem from [[wiki:python-jr-algo-dynamic-programming]]? Dynamic programming would correctly find that 3 + 3 = 2 coins, because it considers every possibility.

---

## Activity Selection -- Greedy at Its Best

Here is a problem where greedy shines. You have a list of activities, each with a start time and an end time. You want to attend **as many activities as possible**, but you cannot be in two places at once (activities cannot overlap).

### Analogy: After-School Activities

Imagine you have these after-school activities available:

| Activity | Start | End |
|----------|-------|-----|
| Art Club | 3:00 | 5:00 |
| Chess Club | 3:30 | 4:30 |
| Band Practice | 4:00 | 6:00 |
| Science Club | 5:00 | 6:30 |
| Coding Club | 6:00 | 7:00 |

You want to do as many as possible. Which should you pick?

### The Greedy Strategy

Here is the key insight: **always pick the activity that ends earliest**. Why? Because the sooner an activity ends, the more room it leaves for other activities after it.

1. Sort activities by their end time.
2. Pick the first one (it ends earliest).
3. Skip any activities that overlap with the one you just picked.
4. Pick the next available activity.
5. Repeat until no activities are left.

```python
def select_activities(
    activities: list[tuple[str, int, int]]
) -> list[str]:
    # Sort by end time (the third element in each tuple)
    sorted_acts: list[tuple[str, int, int]] = sorted(
        activities, key=lambda a: a[2]
    )

    selected: list[str] = []
    last_end: int = 0

    for name, start, end in sorted_acts:
        if start >= last_end:      # Does not overlap with the last one we picked
            selected.append(name)
            last_end = end

    return selected
```

```python
activities: list[tuple[str, int, int]] = [
    ("Art Club", 300, 500),
    ("Chess Club", 330, 430),
    ("Band Practice", 400, 600),
    ("Science Club", 500, 630),
    ("Coding Club", 600, 700),
]

print(select_activities(activities))
# ['Chess Club', 'Science Club', 'Coding Club']
```

Let's trace through it:

| Step | Sorted Activity | Start | End | Overlaps? | Pick it? | last_end |
|------|----------------|-------|-----|-----------|----------|----------|
| 1 | Chess Club | 3:30 | 4:30 | No (3:30 >= 0) | Yes | 4:30 |
| 2 | Art Club | 3:00 | 5:00 | Yes (3:00 < 4:30) | Skip | 4:30 |
| 3 | Band Practice | 4:00 | 6:00 | Yes (4:00 < 4:30) | Skip | 4:30 |
| 4 | Science Club | 5:00 | 6:30 | No (5:00 >= 4:30) | Yes | 6:30 |
| 5 | Coding Club | 6:00 | 7:00 | Yes (6:00 < 6:30) | Skip | 6:30 |

Wait, that only gives us 2 activities. Let me re-check... Actually, with the numeric encoding (using 430, 500, etc.), let's redo this properly:

```python
activities: list[tuple[str, float, float]] = [
    ("Art Club", 3.0, 5.0),
    ("Chess Club", 3.5, 4.5),
    ("Band Practice", 4.0, 6.0),
    ("Science Club", 5.0, 6.5),
    ("Coding Club", 6.5, 7.5),
]

print(select_activities(activities))
# ['Chess Club', 'Science Club', 'Coding Club']
```

Trace:

1. Chess Club ends at 4:30 (earliest end). Pick it.
2. Art Club starts at 3:00, which is before 4:30. Skip (overlaps).
3. Band Practice starts at 4:00, which is before 4:30. Skip (overlaps).
4. Science Club starts at 5:00, which is after 4:30. Pick it! Now last_end = 6:30.
5. Coding Club starts at 6:30, which equals 6:30. Pick it!

We fit **3 activities**: Chess Club, Science Club, and Coding Club. That is the maximum possible.

![A flat vector illustration in a children's educational book style showing a weekly schedule board with colorful time blocks, some highlighted and some crossed out, arranged to show non-overlapping activities. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

### Why Does Greedy Work Here?

By picking the activity that ends earliest, we leave the **maximum amount of time** for remaining activities. It is like packing small boxes into a shelf -- if you always place the one that takes up the least room first, you leave the most space for everything else.

This problem has a special property: the locally best choice (earliest ending time) always leads to the globally best answer. Not all problems have this property, which is why greedy does not always work.

---

## Jump Game -- Can You Reach the End?

Here is another problem where greedy works well. You have a list of numbers. Each number tells you the **maximum** number of steps you can jump forward from that position. Starting at position 0, can you reach the last position?

**Example:** `[2, 3, 1, 1, 4]`
- From position 0 (value 2): you can jump 1 or 2 steps forward.
- Jump to position 1 (value 3): you can jump 1, 2, or 3 steps forward.
- Jump to position 4: that is the last position! You made it!

**Example:** `[3, 2, 1, 0, 4]`
- From position 0 (value 3): jump up to 3 steps.
- No matter what you do, you end up at position 3 (value 0). You are stuck! You cannot reach position 4.

### The Greedy Strategy

Keep track of the **farthest position you can reach**. Walk through the list, and at each position, update the farthest point. If you ever find yourself at a position beyond the farthest point, you are stuck.

```python
def can_jump(nums: list[int]) -> bool:
    farthest: int = 0

    for i in range(len(nums)):
        if i > farthest:
            return False  # We cannot reach this position
        farthest = max(farthest, i + nums[i])

    return True
```

```python
print(can_jump([2, 3, 1, 1, 4]))  # True
print(can_jump([3, 2, 1, 0, 4]))  # False
```

Trace for `[2, 3, 1, 1, 4]`:

| Position i | Value | i + value | farthest so far | Can we be here? |
|-----------|-------|-----------|----------------|-----------------|
| 0 | 2 | 2 | 2 | Yes (0 <= 0) |
| 1 | 3 | 4 | 4 | Yes (1 <= 2) |
| 2 | 1 | 3 | 4 | Yes (2 <= 4) |
| 3 | 1 | 4 | 4 | Yes (3 <= 4) |
| 4 | 4 | 8 | 8 | Yes (4 <= 4) |

We reached the end! Return `True`.

Trace for `[3, 2, 1, 0, 4]`:

| Position i | Value | i + value | farthest so far | Can we be here? |
|-----------|-------|-----------|----------------|-----------------|
| 0 | 3 | 3 | 3 | Yes |
| 1 | 2 | 3 | 3 | Yes |
| 2 | 1 | 3 | 3 | Yes |
| 3 | 0 | 3 | 3 | Yes |
| 4 | 4 | 8 | -- | No! (4 > 3) |

At position 4, we check: is 4 <= 3 (our farthest)? No! We cannot reach position 4. Return `False`.

---

## Greedy vs Dynamic Programming

Now that you know both approaches, when should you use each one?

| | Greedy | Dynamic Programming |
|---|--------|-------------------|
| **Strategy** | Always pick the best local choice | Consider all possibilities, remember results |
| **Speed** | Usually very fast | Slower (but still efficient) |
| **Simplicity** | Simple to code | More complex |
| **Correctness** | Only works for certain problems | Always finds the optimal answer |
| **When to use** | When local best = global best | When greedy fails or you need a guarantee |

### The Rule of Thumb

1. **Try greedy first.** It is simpler and faster.
2. **Test it.** Can you think of a case where greedy gives the wrong answer?
3. **If greedy fails, use DP.** DP always finds the best answer because it considers everything.

**Example of this thinking:**

*Problem:* Fewest coins to make 6 cents with coins [1, 3, 4].

- *Try greedy:* Biggest first gives 4+1+1 = 3 coins.
- *Test it:* Hmm, 3+3 = 2 coins is better. Greedy failed!
- *Use DP instead:* DP correctly finds 2 coins.

*Problem:* Most activities without overlap.

- *Try greedy:* Pick earliest ending first. Gives 3 activities.
- *Test it:* Can we find a case where this gives the wrong answer? Nope! Mathematicians have proven this always works.
- *Stick with greedy!*

---

## How to Tell If Greedy Works (The Exchange Argument)

There is a way to convince yourself that a greedy approach is correct. It is called the **exchange argument**, and the basic idea is:

1. Assume someone found a better answer that did NOT use the greedy choice.
2. Show that you can **swap** their choice for the greedy choice and the answer stays just as good (or gets better).
3. If you can always make this swap, then greedy must be correct.

For the activity selection problem, it goes like this:

- Suppose someone skipped the earliest-ending activity and picked a later-ending one instead.
- We can swap their pick for the earlier-ending one. Since it ends sooner, it leaves at least as much room for the remaining activities.
- So the swapped solution is at least as good. This means picking the earliest-ending activity is never wrong.

You do not need to write formal proofs. Just use this as a thinking tool: "If I replaced someone's choice with my greedy choice, would things get worse?" If the answer is "no, things would stay the same or get better," then greedy works.

---

## A Greedy Pitfall: Largest Sum Path

Here is a quick example of greedy thinking gone wrong. You have a triangle of numbers and want to find the path from top to bottom with the **largest sum**, where at each step you can only go down-left or down-right.

```
    2
   3 4
  6 5 1
 1 8 2 3
```

**Greedy approach:** At each row, pick the bigger number.
- Start at 2.
- Pick 4 (bigger than 3). Sum = 6.
- Pick 5 (bigger than 1, but 6 is... wait, we can only go to 5 or 1 from 4). Sum = 11.
- Pick 8 (from 5, we can go to 8 or 2). Sum = 19.

**Greedy gives:** 2 + 4 + 5 + 8 = 19.

**But the best path is:** 2 + 3 + 6 + 8 = 19. Actually, both give 19 here! Let's try a different triangle:

```
    1
   2 3
  10 1 1
```

**Greedy:** 1 -> 3 -> 1 = 5.
**Optimal:** 1 -> 2 -> 10 = 13.

Greedy picked 3 because it looked bigger than 2, but that choice blocked us from reaching 10. This is a problem where you need DP, not greedy.

![A flat vector illustration in a children's educational book style showing two paths through a park, one short path leading to a small treasure chest and one longer winding path leading to a huge treasure chest. Byte the robot is at the fork, looking at both options. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Quick Summary

| Concept | What It Means |
|---------|---------------|
| Greedy algorithm | Always pick the best option available right now |
| Locally optimal | The best choice at this single step |
| Globally optimal | The best overall answer across all steps |
| Activity selection | Pick the activity that ends earliest to fit the most |
| Jump game | Track the farthest reachable position |
| Exchange argument | Prove greedy works by showing you can swap any other choice for the greedy choice without making things worse |

**The golden rule:** Greedy is fast and simple, but only correct for certain problems. When in doubt, verify it works or fall back to dynamic programming.

---

## Practice Questions

**1.** In your own words, what is the difference between a greedy algorithm and dynamic programming?

**2.** You have US coins: [25, 10, 5, 1]. Use the greedy algorithm to make 91 cents. How many coins do you use and which ones?

**3.** Now try the same problem with coins [1, 15, 25] and a target of 30 cents. What does greedy give? Is there a better answer?

**4.** You have these activities (start, end): A(1,3), B(2,5), C(4,7), D(6,8), E(5,9). Use the greedy activity selection algorithm to pick the most non-overlapping activities. Show your work step by step.

**5.** Given the list `[1, 2, 0, 1, 4]`, can you reach the end using the jump game algorithm? Trace through it step by step.

**6.** A problem says: "Find the path through a grid from top-left to bottom-right that has the maximum sum." At each step you can move right or down. Should you use greedy or DP? Explain why.

**7.** Write a greedy function that takes a list of item weights and a maximum capacity, and returns the number of items you can carry if you always pick the **lightest** item first. For example, with weights `[4, 2, 7, 1, 3]` and capacity 10, you would pick items weighing 1, 2, 3, and 4 (total 10, that is 4 items).

**8.** Think of a real-life situation where you use a greedy strategy. Does it always give the best result? Can you think of when it might fail?

---

## Answers to Practice Questions

**Answer 1:**

A **greedy algorithm** makes the best choice at each individual step without looking ahead. It is fast and simple but only gives the right answer for certain problems. **Dynamic programming** breaks the problem into smaller pieces, solves all of them, remembers the results, and finds the guaranteed best answer. DP is more work but never misses the optimal solution.

Think of it this way: greedy is like always turning toward your destination at every intersection (might lead you to a dead end). DP is like studying the whole map first and finding the best route (always works, but takes more effort).

**Answer 2:**

Coins [25, 10, 5, 1], target 91:

1. 25 fits in 91. Pick it. Remaining: 66.
2. 25 fits in 66. Pick it. Remaining: 41.
3. 25 fits in 41. Pick it. Remaining: 16.
4. 10 fits in 16. Pick it. Remaining: 6.
5. 5 fits in 6. Pick it. Remaining: 1.
6. 1 fits in 1. Pick it. Remaining: 0.

Total: **6 coins** (25, 25, 25, 10, 5, 1). This is optimal for US coins.

**Answer 3:**

Coins [1, 15, 25], target 30:

Greedy (biggest first):
1. 25 fits in 30. Pick it. Remaining: 5.
2. 15 does not fit in 5. Skip.
3. 1 fits in 5. Pick it. Remaining: 4.
4. 1 fits. Pick. Remaining: 3.
5. 1 fits. Pick. Remaining: 2.
6. 1 fits. Pick. Remaining: 1.
7. 1 fits. Pick. Remaining: 0.

Greedy uses **6 coins**: 25+1+1+1+1+1.

**Better answer:** 15+15 = **2 coins**! Greedy failed badly here because picking the 25 left a remainder that could only be filled with 1-cent coins. This is a problem that needs DP.

**Answer 4:**

First, sort by end time: A(1,3), B(2,5), C(4,7), D(6,8), E(5,9).

| Step | Activity | Start | End | Overlaps with last? | Pick? | last_end |
|------|----------|-------|-----|-------|------|----------|
| 1 | A | 1 | 3 | No (1 >= 0) | Yes | 3 |
| 2 | B | 2 | 5 | Yes (2 < 3) | Skip | 3 |
| 3 | C | 4 | 7 | No (4 >= 3) | Yes | 7 |
| 4 | D | 6 | 8 | Yes (6 < 7) | Skip | 7 |
| 5 | E | 5 | 9 | Yes (5 < 7) | Skip | 7 |

Selected: **A and C** (2 activities). That is the maximum number of non-overlapping activities from this set.

**Answer 5:**

List: `[1, 2, 0, 1, 4]`

| Position i | Value | i + value | farthest | Can we be here? |
|-----------|-------|-----------|----------|-----------------|
| 0 | 1 | 1 | 1 | Yes (0 <= 0) |
| 1 | 2 | 3 | 3 | Yes (1 <= 1) |
| 2 | 0 | 2 | 3 | Yes (2 <= 3) |
| 3 | 1 | 4 | 4 | Yes (3 <= 3) |
| 4 | 4 | 8 | 8 | Yes (4 <= 4) |

**Yes**, you can reach the end. Even though position 2 has a value of 0 (you could get stuck there), position 1 lets you jump past it to position 3.

**Answer 6:**

You should use **DP**, not greedy. In a grid, picking the bigger number at each step can lead you away from an even bigger payoff later. For example, going right might give you a bigger number now, but going down might lead to a row full of huge numbers. Greedy cannot see that far ahead. This problem has overlapping subproblems (many paths share the same cells) and optimal substructure, making it a perfect fit for DP.

**Answer 7:**

```python
def max_items(weights: list[int], capacity: int) -> int:
    sorted_weights: list[int] = sorted(weights)  # Lightest first
    total: int = 0
    count: int = 0

    for weight in sorted_weights:
        if total + weight <= capacity:
            total = total + weight
            count = count + 1
        else:
            break  # Cannot fit anything heavier either

    return count
```

```python
print(max_items([4, 2, 7, 1, 3], 10))  # 4 (pick 1+2+3+4=10)
print(max_items([5, 5, 5, 5], 12))     # 2 (pick 5+5=10, next would be 15)
```

Greedy works here because we want the **most items**, and lighter items leave the most room. Picking the lightest first always gives the most items.

**Answer 8:**

Many possible answers! Here is one:

**Greedy strategy:** When shopping, always buy the cheapest version of each item to save money.

**When it works:** For simple items like paper towels or sugar, the cheapest option is usually fine.

**When it fails:** Buying the cheapest shoes might mean they fall apart in a month and you have to buy new ones. Spending a little more on quality shoes that last two years would save money in the long run. The greedy "cheapest now" choice led to a worse overall result, just like how picking coin 4 for the amount 6 problem led to using more coins.

---

**Previous:** [[wiki:python-jr-algo-dynamic-programming]] | **Next:** [[wiki:python-jr-algo-graph]]
