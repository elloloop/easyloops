# Searching -- Finding What You Need

You have a collection of data and you need to find something in it. Maybe you need to find a name in a contact list, a word in a dictionary, or a score in a leaderboard. How fast can you do it?

The answer depends on one thing: **is your data sorted?**

If your data is not sorted, you have no choice but to check every single item. That is slow. But if your data *is* sorted, you can use one of the most powerful tricks in all of computer science: **binary search**. It lets you find an item among a million entries in about 20 steps. That is not a typo. Twenty steps for a million items.

This is why sorting matters so much. Sorted data unlocks incredibly fast searching.

![A flat vector illustration in a children's educational book style showing Byte the robot in a large colorful library, using a magnifying glass to search through a long row of neatly organized books on a shelf, with some books glowing to indicate they are being checked. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

**Mapped to:** [[wiki:python-algo-searching]]

---

## Linear Search -- Check Every Item

The simplest way to find something: start at the beginning and check every item, one by one, until you find it or reach the end.

**The analogy:** Imagine you are looking for a specific book on a messy bookshelf where nothing is in order. You have no choice but to start at one end and check every single book until you find the one you want. If the book you want happens to be last, you have to check every book on the shelf.

### How Linear Search Works

```
Looking for 7 in [3, 8, 1, 7, 5, 2]

Check 3... nope
Check 8... nope
Check 1... nope
Check 7... found it! At position 3.
```

### Linear Search Code

```python
def linear_search(items: list[int], target: int) -> int:
    """Return the index of target, or -1 if not found."""
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1
```

```python
numbers: list[int] = [3, 8, 1, 7, 5, 2]
print(linear_search(numbers, 7))    # 3  (found at index 3)
print(linear_search(numbers, 9))    # -1 (not found)
```

### How Fast Is Linear Search?

Linear search is **O(n)** -- in the worst case, you check every single item. If you have 100 items, you might need 100 checks. If you have 1,000,000 items, you might need 1,000,000 checks.

That is fine for small collections. But for big ones? We can do much, much better -- if the data is sorted.

---

## Binary Search -- The Guessing Game

Binary search is one of the most important algorithms you will ever learn. It only works on **sorted** data, but when it works, it is unbelievably fast.

**The analogy:** You know the number guessing game? "I am thinking of a number between 1 and 100." The smartest strategy is:

- Guess 50. "Too low."
- Guess 75. "Too high."
- Guess 62. "Too low."
- Guess 68. "Too high."
- Guess 65. "Correct!"

Each guess cuts the possibilities in **half**. You started with 100 possibilities, then 50, then 25, then 12, then 6... After just 7 guesses, you can always find the number. That is binary search!

### How Binary Search Works

You need three pointers:
- `left` -- the start of the range you are searching
- `right` -- the end of the range you are searching
- `mid` -- the middle of the range

At each step:
1. Calculate the middle position: `mid = (left + right) // 2`
2. Check the middle item:
   - If it is your target, you found it!
   - If your target is **bigger**, it must be in the right half. Move `left` to `mid + 1`.
   - If your target is **smaller**, it must be in the left half. Move `right` to `mid - 1`.
3. Repeat until you find the target or `left` passes `right` (meaning it is not there).

Let us search for 7 in the sorted list `[1, 2, 3, 5, 7, 8, 9, 11, 14]`:

```
Step 1: left=0, right=8, mid=4
        items[4] = 7  -->  Found it!
```

That was lucky -- it was right in the middle. Let us try searching for 11:

```
Step 1: left=0, right=8, mid=4
        items[4] = 7  -->  11 > 7, so search the right half
        left = 5

Step 2: left=5, right=8, mid=6
        items[6] = 9  -->  11 > 9, so search the right half
        left = 7

Step 3: left=7, right=8, mid=7
        items[7] = 11  -->  Found it!
```

Only 3 steps to search through 9 items! And it gets even more impressive with bigger data.

![A flat vector illustration in a children's educational book style showing Byte the robot playing a guessing game with a row of numbered cards laid out on a table, pointing at the middle card while some cards on the left are faded out to show they have been eliminated. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Implementing Binary Search

Here is the code. Pay attention to the details -- binary search is famous for having small bugs if you get the details wrong.

```python
def binary_search(items: list[int], target: int) -> int:
    """Return the index of target, or -1 if not found.
    items must be sorted in ascending order."""
    left: int = 0
    right: int = len(items) - 1

    while left <= right:
        mid: int = (left + right) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1     # Target is in the right half
        else:
            right = mid - 1    # Target is in the left half

    return -1  # Target is not in the list
```

```python
sorted_numbers: list[int] = [1, 2, 3, 5, 7, 8, 9, 11, 14]
print(binary_search(sorted_numbers, 7))     # 4
print(binary_search(sorted_numbers, 11))    # 7
print(binary_search(sorted_numbers, 6))     # -1 (not found)
```

### The Tricky Parts

Binary search is simple in concept but has some common pitfalls:

**1. Use `<=` not `<` in the while loop.** The condition is `while left <= right`. If you use `<` instead of `<=`, you will miss checking the case where `left` equals `right` (which is when there is exactly one item left to check). That one-item case might be your target!

**2. Update `left` and `right` carefully.** When the middle item is too small, you set `left = mid + 1` (not `left = mid`). When the middle item is too big, you set `right = mid - 1` (not `right = mid`). If you use `mid` instead of `mid + 1` or `mid - 1`, you might get stuck in an infinite loop because the range never shrinks.

**3. The data must be sorted.** Binary search on unsorted data gives garbage results. Always make sure your data is sorted first.

---

## How Fast Is Binary Search?

Binary search is **O(log n)**. Each step cuts the remaining items in half.

Here is what that means in real numbers:

```
Items         Steps needed (worst case)
---------     -------------------------
10            ~4 steps
100           ~7 steps
1,000         ~10 steps
1,000,000     ~20 steps
1,000,000,000 ~30 steps
```

Read that last line again. **One billion items, only 30 steps.** That is the power of cutting in half each time.

Compare that to linear search:

```
Items           Linear Search    Binary Search
---------       -------------    -------------
10              10 steps         4 steps
100             100 steps        7 steps
1,000           1,000 steps      10 steps
1,000,000       1,000,000 steps  20 steps
```

For a million items, binary search is 50,000 times faster than linear search. But remember: binary search only works on sorted data. If your data is not sorted, you either need to sort it first or use linear search.

---

## Binary Search Variations

The basic binary search finds *any* occurrence of the target. But sometimes you need to find the *first* occurrence, or the *last* occurrence, or the position where a value *would go* if you were to insert it. These are all variations of the same idea.

### Find First Occurrence (Leftmost)

If the list has duplicates, the basic binary search might find any of them. What if you want the *first* one?

```python
def find_first(items: list[int], target: int) -> int:
    """Return the index of the first occurrence of target, or -1."""
    left: int = 0
    right: int = len(items) - 1
    result: int = -1

    while left <= right:
        mid: int = (left + right) // 2

        if items[mid] == target:
            result = mid        # Found one, but keep looking left
            right = mid - 1     # for an earlier occurrence
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result
```

```python
data: list[int] = [1, 3, 3, 3, 5, 7, 9]
print(find_first(data, 3))   # 1  (first occurrence at index 1)
```

The trick: when you find the target, you do not stop. You record the position and keep searching the *left* half for an even earlier occurrence.

### Find Last Occurrence (Rightmost)

Same idea, but search right instead of left after finding the target:

```python
def find_last(items: list[int], target: int) -> int:
    """Return the index of the last occurrence of target, or -1."""
    left: int = 0
    right: int = len(items) - 1
    result: int = -1

    while left <= right:
        mid: int = (left + right) // 2

        if items[mid] == target:
            result = mid        # Found one, but keep looking right
            left = mid + 1      # for a later occurrence
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result
```

```python
print(find_last(data, 3))   # 3  (last occurrence at index 3)
```

### Find Insertion Point

Where would a value go if you inserted it into the sorted list?

```python
def find_insertion_point(items: list[int], target: int) -> int:
    """Return the index where target should be inserted to keep the list sorted."""
    left: int = 0
    right: int = len(items)

    while left < right:
        mid: int = (left + right) // 2

        if items[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left
```

```python
data2: list[int] = [1, 3, 5, 7, 9]
print(find_insertion_point(data2, 6))   # 3  (6 would go at index 3, between 5 and 7)
print(find_insertion_point(data2, 5))   # 2  (5 would go at index 2, before the existing 5)
```

---

## Searching in a Binary Search Tree

Remember binary search trees (BSTs) from your data structures lessons? A BST is basically binary search built into a tree shape. Each node has a value. Everything in the left subtree is smaller. Everything in the right subtree is bigger.

Searching a BST works exactly like binary search:

```python
class TreeNode:
    def __init__(self, value: int) -> None:
        self.value: int = value
        self.left: TreeNode | None = None
        self.right: TreeNode | None = None


def search_bst(node: TreeNode | None, target: int) -> bool:
    if node is None:
        return False

    if target == node.value:
        return True
    elif target < node.value:
        return search_bst(node.left, target)    # Go left
    else:
        return search_bst(node.right, target)   # Go right
```

At each node, you decide: go left or go right. Each step eliminates half the tree, just like binary search eliminates half the list. If the tree is balanced, searching is O(log n).

![A flat vector illustration in a children's educational book style showing Byte the robot following a path down a colorful tree diagram, with each branch point showing a left arrow and a right arrow, and eliminated branches grayed out to show the search narrowing down. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Python's bisect Module

Python has binary search built in through the `bisect` module. You do not need to write binary search from scratch in real code (but you should know how it works!).

```python
import bisect

sorted_list: list[int] = [1, 3, 5, 7, 9, 11, 13]

# Find where to insert a value to keep the list sorted
position: int = bisect.bisect_left(sorted_list, 7)
print(position)  # 3  (7 is at index 3)

# bisect_left gives the leftmost position
# bisect_right gives the rightmost position (after any duplicates)
data3: list[int] = [1, 3, 3, 3, 5, 7]
print(bisect.bisect_left(data3, 3))    # 1  (first 3 is at index 1)
print(bisect.bisect_right(data3, 3))   # 4  (insert after all 3s, at index 4)

# Insert while keeping the list sorted
bisect.insort(sorted_list, 6)
print(sorted_list)  # [1, 3, 5, 6, 7, 9, 11, 13]
```

`bisect_left` is like our `find_first` / `find_insertion_point` functions. `bisect_right` is like `find_last` but gives the position *after* the last occurrence.

---

## When to Use Which

Here is the simple rule:

| Situation | Method | Speed |
|-----------|--------|-------|
| Data is **unsorted** and you search **once** | Linear search | O(n) |
| Data is **unsorted** and you search **many times** | Sort it first, then binary search | O(n log n) to sort + O(log n) per search |
| Data is **already sorted** | Binary search | O(log n) |
| Data is in a **balanced BST** | Tree search | O(log n) |
| Data is in a **hash table** (dictionary) | Hash lookup | O(1) average |

Notice that hash tables (dictionaries) are even faster than binary search for simple lookups -- O(1) on average! But binary search has advantages: it works on sorted data without extra memory, and the variations (find first, find last, find insertion point) are very useful for problems where you need more than just "is this value here?"

---

## Putting It All Together

Here is a complete example showing when you would use each search:

```python
import bisect

def demo_searching() -> None:
    # Unsorted data: use linear search
    unsorted_scores: list[int] = [85, 92, 78, 95, 88, 76, 91]
    target_score: int = 95

    # Linear search -- check every item
    for i in range(len(unsorted_scores)):
        if unsorted_scores[i] == target_score:
            print(f"Found {target_score} at index {i} (linear search)")
            break

    # Sorted data: use binary search
    sorted_scores: list[int] = sorted(unsorted_scores)
    print(f"Sorted: {sorted_scores}")

    index: int = binary_search(sorted_scores, target_score)
    print(f"Found {target_score} at index {index} (binary search)")

    # Find where a new score would be inserted
    new_score: int = 90
    insert_pos: int = bisect.bisect_left(sorted_scores, new_score)
    print(f"Score {new_score} would be inserted at index {insert_pos}")

    # Dictionary: fastest for simple lookups
    score_lookup: dict[str, int] = {
        "Alice": 95,
        "Bob": 88,
        "Charlie": 92
    }
    print(f"Alice's score: {score_lookup['Alice']}")  # O(1) lookup

demo_searching()
```

---

## Quick Reference

| Algorithm | Speed | Sorted Data Required? | Best For |
|-----------|-------|-----------------------|----------|
| Linear search | O(n) | No | Small or unsorted data |
| Binary search | O(log n) | Yes | Large sorted data |
| BST search | O(log n) | Tree must be balanced | Dynamic data with inserts/deletes |
| Hash lookup | O(1) average | No (uses hash table) | Simple "is it here?" lookups |
| `bisect` module | O(log n) | Yes | Production Python code |

---

## Practice Questions

Try to answer each question before looking at the answers at the bottom.

**1.** You have a phone book with 10,000 names, sorted alphabetically. About how many steps would binary search need to find a name? About how many steps would linear search need in the worst case?

**2.** Why does binary search not work on unsorted data? What would go wrong?

**3.** You have the sorted list `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]` and you are searching for 23 using binary search. Walk through each step, showing the values of `left`, `right`, and `mid`.

**4.** What is the difference between `find_first` and the basic binary search when the list has duplicate values?

**5.** You search a sorted list of 1,000,000 items using binary search and do not find your target. How many comparisons did binary search make before giving up?

**6.** You have unsorted data with 50 items and you need to search for one value. Should you sort the data first and use binary search, or just use linear search? What if you needed to search for 1,000 different values in the same data?

**7.** In the binary search code, what happens if you accidentally use `while left < right` instead of `while left <= right`?

**8.** What does Python's `bisect.bisect_left` function do, and when would you use it?

---

## What Comes Next

You now have two powerful tools: sorting (putting things in order) and searching (finding things fast). Next, you will learn **recursion** -- the mind-bending technique where a function calls itself. Recursion is the key behind merge sort, quick sort, tree traversals, and many more algorithms.

**Next up:** [[wiki:python-jr-algo-recursion]]

**Previous:** [[wiki:python-jr-algo-sorting]]

---

## Answers to Practice Questions

**1.** Binary search on 10,000 sorted names would need about **14 steps** (because log base 2 of 10,000 is about 13.3). Linear search in the worst case would need **10,000 steps** (checking every single name). Binary search is about 700 times faster here.

**2.** Binary search works by looking at the middle item and deciding whether the target is in the left half or the right half. This decision relies on the data being sorted. If the data is unsorted, the middle item tells you nothing about where the target might be. You might eliminate the half that actually contains your target, and the search would give a wrong answer (saying the item is not there when it actually is).

**3.**
```
Start: left=0, right=9

Step 1: mid = (0 + 9) // 2 = 4
        items[4] = 16
        23 > 16, so search right half
        left = 5

Step 2: mid = (5 + 9) // 2 = 7
        items[7] = 56
        23 < 56, so search left half
        right = 6

Step 3: mid = (5 + 6) // 2 = 5
        items[5] = 23
        Found it! Return 5.
```
Binary search found 23 in just 3 steps out of 10 items.

**4.** The basic binary search finds *any* occurrence of the target and immediately returns it. If the list is `[1, 3, 3, 3, 5]` and you search for 3, basic binary search might return index 1, 2, or 3 -- whichever it hits first (likely 2, the middle one). `find_first` keeps searching to the *left* after finding a match, so it guarantees you get the very first (leftmost) occurrence, which is index 1.

**5.** Binary search on 1,000,000 items makes about **20 comparisons** before concluding the target is not there (because log base 2 of 1,000,000 is about 19.9). Even when the item is not found, binary search is extremely fast. It checks only 20 items out of a million.

**6.** For a single search on 50 items, just use **linear search**. Linear search takes at most 50 steps. Sorting the data first would take about 50 times log(50) = about 282 steps, plus the binary search steps. That is way more work than just checking 50 items.

But if you need to search for 1,000 different values, the math changes. Linear search for 1,000 queries: 1,000 times 50 = 50,000 steps total. Sorting once (about 282 steps) plus 1,000 binary searches (about 6 steps each = 6,000 steps): about 6,282 steps total. **Sort first, then binary search** wins by a huge margin when you search many times.

**7.** You would miss checking the last remaining item. When `left` equals `right`, there is exactly one item left to check, and it might be your target. Using `<` instead of `<=` would skip that check, so binary search would sometimes say "not found" when the target is actually there. This is one of the most common binary search bugs.

**8.** `bisect.bisect_left` takes a sorted list and a target value, and returns the index where the target should be inserted to keep the list sorted. If the target already exists in the list, it returns the index of the *leftmost* occurrence (the position just before the first copy). You would use it when you need to find where a value belongs in sorted data, such as maintaining a sorted leaderboard or finding the rank of a score.
