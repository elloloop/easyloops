# Sorting -- Putting Things in Order

Welcome to algorithms! You have spent a lot of time building data structures -- the containers that hold your data. Now you are going to learn **algorithms** -- the step-by-step strategies for doing things with that data. And the very first algorithm topic is one of the most important: **sorting**.

Sorting means putting things in order. Smallest to largest. Alphabetical. Newest to oldest. You sort things every day without thinking about it: arranging books on a shelf, lining up from shortest to tallest, organizing a playlist by your favorite songs.

But here is the interesting question: *how* do you sort? There are many different strategies, and some are much faster than others. Studying sorting teaches you to think about how fast algorithms are -- a skill that will help you with every programming problem you ever face.

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a shelf of colorful books in random order, with one hand reaching to move a red book into its correct position among the others. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

**Mapped to:** [[wiki:python-algo-sorting]]

---

## Why Study Sorting?

You might wonder: "Python already has a sort button. Why do I need to learn how sorting works inside?"

Here is why:

1. **It teaches you to think about speed.** Some sorting methods take a million steps to sort 1,000 items. Others take only 10,000 steps. Learning sorting is how you start understanding why some code is fast and some is slow.
2. **Sorting ideas show up everywhere.** The "split, solve, combine" idea from merge sort appears in tons of other algorithms. The "pick a pivot and partition" idea from quick sort does too.
3. **Interview questions love sorting.** If you ever apply for a programming job, you will almost certainly be asked about sorting.
4. **Sorted data is powerful data.** Once your data is sorted, you can use binary search (which you will learn next) to find things incredibly fast.

---

## Simple Sorts -- Easy to Understand, Slow for Big Lists

These three sorting algorithms are the ones you learn first because they are easy to picture in your head. They all work, but they are slow when you have a lot of data. That is okay! Understanding them is what matters.

---

### Bubble Sort -- Bubbles Rising to the Surface

**The idea:** Walk through the list, compare each pair of neighbors. If they are in the wrong order, swap them. Keep doing this until the whole list is sorted.

**The analogy:** Imagine bubbles rising to the surface of water. The biggest values "bubble up" to the end of the list with each pass, just like big bubbles rise to the top faster.

Here is how it works on the list `[5, 3, 8, 1, 2]`:

```
Pass 1: Compare neighbors and swap if needed
  [5, 3, 8, 1, 2]  -->  compare 5 and 3, swap  -->  [3, 5, 8, 1, 2]
  [3, 5, 8, 1, 2]  -->  compare 5 and 8, fine   -->  [3, 5, 8, 1, 2]
  [3, 5, 8, 1, 2]  -->  compare 8 and 1, swap  -->  [3, 5, 1, 8, 2]
  [3, 5, 1, 8, 2]  -->  compare 8 and 2, swap  -->  [3, 5, 1, 2, 8]
  Now 8 is in its correct spot at the end!

Pass 2: Do it again (but 8 is already in place)
  [3, 5, 1, 2, 8]  -->  [3, 5, 1, 2, 8]  -->  [3, 1, 5, 2, 8]  -->  [3, 1, 2, 5, 8]
  Now 5 is in its correct spot too!

Pass 3: [1, 3, 2, 5, 8]  -->  [1, 2, 3, 5, 8]
Pass 4: [1, 2, 3, 5, 8]  -->  No swaps needed. Done!
```

### Bubble Sort Code

```python
def bubble_sort(items: list[int]) -> list[int]:
    n: int = len(items)
    for i in range(n):
        swapped: bool = False
        for j in range(0, n - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
                swapped = True
        if not swapped:
            break  # List is already sorted, stop early!
    return items
```

```python
print(bubble_sort([5, 3, 8, 1, 2]))  # [1, 2, 3, 5, 8]
```

Notice the `swapped` flag. If we go through a whole pass without swapping anything, the list must already be sorted, so we can stop early. That is a nice little optimization.

---

### Selection Sort -- Always Pick the Best Remaining

**The idea:** Find the smallest item in the whole list and put it in the first spot. Then find the smallest item in the remaining list and put it in the second spot. Keep going until everything is in place.

**The analogy:** Imagine you are picking teams for a game. Each round, you look at all the remaining players and pick the best one. First pick goes to position 1, second pick to position 2, and so on.

Here is how it works on `[5, 3, 8, 1, 2]`:

```
Step 1: Find the smallest in the whole list. It is 1. Swap it to position 0.
  [5, 3, 8, 1, 2]  -->  [1, 3, 8, 5, 2]

Step 2: Find the smallest from position 1 onward. It is 2. Swap it to position 1.
  [1, 3, 8, 5, 2]  -->  [1, 2, 8, 5, 3]

Step 3: Find the smallest from position 2 onward. It is 3. Swap it to position 2.
  [1, 2, 8, 5, 3]  -->  [1, 2, 3, 5, 8]

Step 4: Find the smallest from position 3 onward. It is 5. Already in place.
  [1, 2, 3, 5, 8]  -->  [1, 2, 3, 5, 8]

Done!
```

### Selection Sort Code

```python
def selection_sort(items: list[int]) -> list[int]:
    n: int = len(items)
    for i in range(n):
        min_index: int = i
        for j in range(i + 1, n):
            if items[j] < items[min_index]:
                min_index = j
        items[i], items[min_index] = items[min_index], items[i]
    return items
```

```python
print(selection_sort([5, 3, 8, 1, 2]))  # [1, 2, 3, 5, 8]
```

---

### Insertion Sort -- Sorting Cards in Your Hand

**The idea:** Go through the list one item at a time. For each item, slide it backward into the correct position in the part of the list you have already sorted.

**The analogy:** This is exactly how you sort playing cards in your hand. You pick up one card at a time and slide it into the right spot among the cards you are already holding.

Here is how it works on `[5, 3, 8, 1, 2]`:

```
Start: [5, 3, 8, 1, 2]
       Sorted part: [5]     Unsorted part: [3, 8, 1, 2]

Take 3: Where does 3 go in [5]? Before 5.
       [3, 5, 8, 1, 2]

Take 8: Where does 8 go in [3, 5]? After 5. Already in place.
       [3, 5, 8, 1, 2]

Take 1: Where does 1 go in [3, 5, 8]? Before 3.
       [1, 3, 5, 8, 2]

Take 2: Where does 2 go in [1, 3, 5, 8]? Between 1 and 3.
       [1, 2, 3, 5, 8]

Done!
```

### Insertion Sort Code

```python
def insertion_sort(items: list[int]) -> list[int]:
    for i in range(1, len(items)):
        key: int = items[i]
        j: int = i - 1
        while j >= 0 and items[j] > key:
            items[j + 1] = items[j]
            j -= 1
        items[j + 1] = key
    return items
```

```python
print(insertion_sort([5, 3, 8, 1, 2]))  # [1, 2, 3, 5, 8]
```

Insertion sort has a nice property: if the list is *already almost sorted*, it runs very fast. It only moves items that are out of place.

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a table sorting a hand of colorful playing cards, carefully sliding a green card with the number 4 between a blue card with 3 and a yellow card with 5. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

---

## Fast Sorts -- Clever Splitting Makes Things Faster

The simple sorts all have the same problem: they compare too many pairs. For a list of 1,000 items, they need around 1,000,000 comparisons. That is because they use two loops, each going through the data.

The fast sorts use a clever trick: they **split the problem in half** at each step. This means they need far fewer comparisons. For 1,000 items, they need only about 10,000 comparisons. That is 100 times faster!

---

### Merge Sort -- Split, Sort, Merge

**The idea:** Split the list in half. Sort each half (by splitting it in half again, and again, until you have lists of one item, which are already sorted). Then merge the two sorted halves back together.

**The analogy:** Imagine you have a messy deck of cards. Split it in half. Split each half in half. Keep splitting until each pile has just one card (one card is already "sorted"). Then start merging: take two single-card piles and combine them in order. Take two two-card piles and combine them in order. Keep merging until you have one big sorted pile.

```
Split:
[5, 3, 8, 1, 2, 7, 4, 6]
        /              \
[5, 3, 8, 1]      [2, 7, 4, 6]
   /      \          /      \
[5, 3]  [8, 1]    [2, 7]  [4, 6]
 / \     / \       / \     / \
[5] [3] [8] [1]  [2] [7] [4] [6]

Merge back together (in order):
[5] [3] [8] [1]  [2] [7] [4] [6]
 \ /     \ /       \ /     \ /
[3, 5]  [1, 8]   [2, 7]  [4, 6]
   \      /          \      /
[1, 3, 5, 8]      [2, 4, 6, 7]
        \              /
[1, 2, 3, 4, 5, 6, 7, 8]
```

### Merge Sort Code

```python
def merge_sort(items: list[int]) -> list[int]:
    if len(items) <= 1:
        return items

    mid: int = len(items) // 2
    left: list[int] = merge_sort(items[:mid])
    right: list[int] = merge_sort(items[mid:])

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

    # Add any remaining items
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

```python
print(merge_sort([5, 3, 8, 1, 2, 7, 4, 6]))
# [1, 2, 3, 4, 5, 6, 7, 8]
```

The `merge` function is the key piece. It takes two sorted lists and combines them into one sorted list by always picking the smaller of the two front items.

---

### Quick Sort -- Pick a Pivot and Partition

**The idea:** Pick one item as the "pivot." Move all items smaller than the pivot to the left and all items bigger to the right. Now the pivot is in its correct final position! Repeat this process for the left side and the right side.

**The analogy:** Imagine you are organizing a group of people by height. You pick one person as the reference. Everyone shorter goes to the left, everyone taller goes to the right. Then you do the same thing within each group, and within each sub-group, until everyone is in order.

```
Start: [5, 3, 8, 1, 2, 7, 4, 6]    Pivot = 5

Partition: items < 5 go left, items > 5 go right
[3, 1, 2, 4]  [5]  [8, 7, 6]

Repeat for each side:
[3, 1, 2, 4]  pivot = 3  -->  [1, 2]  [3]  [4]
[8, 7, 6]     pivot = 8  -->  [7, 6]  [8]  []

Keep going until each piece has 0 or 1 items:
[1, 2]  pivot = 1  -->  []  [1]  [2]
[7, 6]  pivot = 7  -->  [6]  [7]  []

Put it all together:
[1, 2, 3, 4, 5, 6, 7, 8]
```

### Quick Sort Code

```python
def quick_sort(items: list[int]) -> list[int]:
    if len(items) <= 1:
        return items

    pivot: int = items[0]
    left: list[int] = [x for x in items[1:] if x <= pivot]
    right: list[int] = [x for x in items[1:] if x > pivot]

    return quick_sort(left) + [pivot] + quick_sort(right)
```

```python
print(quick_sort([5, 3, 8, 1, 2, 7, 4, 6]))
# [1, 2, 3, 4, 5, 6, 7, 8]
```

Quick sort is often the fastest sorting algorithm in practice. It does have one weakness: if you always pick a bad pivot (like the smallest or largest item), it slows down to the speed of the simple sorts. But with a reasonable pivot, it is very fast.

---

## How Fast Is Each One? (Big-O)

When programmers talk about how fast an algorithm is, they use something called **Big-O notation**. You do not need to know all the math behind it. Here is the simple version:

Big-O tells you how the number of steps grows as your data gets bigger. It answers the question: "If I double the size of my list, how many more steps will the algorithm need?"

### Slow Sorts: O(n squared)

Bubble sort, selection sort, and insertion sort all have two loops going through the data. For a list of `n` items:

- The outer loop runs about `n` times
- The inner loop runs about `n` times for each outer loop
- Total steps: about `n` times `n` = `n` squared

**What this means in real numbers:**
- 10 items: about 100 steps
- 100 items: about 10,000 steps
- 1,000 items: about 1,000,000 steps
- 1,000,000 items: about 1,000,000,000,000 steps (way too slow!)

### Fast Sorts: O(n log n)

Merge sort and quick sort split the problem in half at each step. For a list of `n` items:

- They split the data about `log n` times (how many times can you split 1,000 in half? About 10 times.)
- At each level of splitting, they do about `n` work
- Total steps: about `n` times `log n`

**What this means in real numbers:**
- 10 items: about 33 steps
- 100 items: about 664 steps
- 1,000 items: about 9,966 steps
- 1,000,000 items: about 19,931,568 steps (very manageable!)

See the difference? For a million items, the slow sorts need a *trillion* steps while the fast sorts need about 20 million. That is 50,000 times faster.

```
Items       O(n^2)           O(n log n)
------      ----------       ----------
10          100              ~33
100         10,000           ~664
1,000       1,000,000        ~9,966
1,000,000   1,000,000,000    ~19,931,568
```

![A flat vector illustration in a children's educational book style showing Byte the robot pointing at two bar charts on a wall, one with bars growing very tall very fast labeled with a turtle icon, and one with bars growing slowly labeled with a rocket icon, comparing the speed of sorting methods. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

---

## Python's Built-In Sorting

In your actual programs (not practice exercises), you should almost always use Python's built-in sorting:

```python
# sorted() returns a new sorted list
numbers: list[int] = [5, 3, 8, 1, 2]
sorted_numbers: list[int] = sorted(numbers)
print(sorted_numbers)  # [1, 2, 3, 5, 8]
print(numbers)         # [5, 3, 8, 1, 2]  (original unchanged)

# .sort() sorts the list in place (changes the original)
numbers.sort()
print(numbers)         # [1, 2, 3, 5, 8]  (original changed)
```

Python's built-in sort uses an algorithm called **Timsort**, which is a clever combination of merge sort and insertion sort. It is O(n log n) and is extremely well-optimized. It is almost always faster than any sorting function you write by hand.

**Use `sorted()` or `.sort()` in real code.** Write sorting algorithms by hand to *learn*. Use the built-in ones to *build*.

You can also sort in reverse order:

```python
print(sorted([5, 3, 8, 1, 2], reverse=True))  # [8, 5, 3, 2, 1]
```

And sort by a custom rule using `key`:

```python
words: list[str] = ["banana", "apple", "cherry", "date"]
print(sorted(words, key=len))  # ['date', 'apple', 'banana', 'cherry']
```

This sorts by the length of each word instead of alphabetically.

---

## Stability -- Does Order Matter for Equal Items?

One more concept: a sorting algorithm is **stable** if items that are equal keep their original order.

Why does this matter? Imagine you have a list of students sorted by name, and you want to also sort them by grade. If your sort is stable, students with the same grade will still be in alphabetical order. If it is unstable, students with the same grade might get jumbled up.

**Stable sorts:** Bubble sort, insertion sort, merge sort, Python's Timsort

**Unstable sorts:** Selection sort, quick sort

In practice, this rarely matters for simple lists of numbers, but it becomes important when you are sorting more complex data.

---

## Quick Reference

| Algorithm | Speed (Big-O) | Stable? | How It Works |
|-----------|---------------|---------|--------------|
| Bubble sort | O(n squared) | Yes | Compare neighbors, swap, repeat |
| Selection sort | O(n squared) | No | Find smallest, put it next |
| Insertion sort | O(n squared) | Yes | Slide each item into its sorted spot |
| Merge sort | O(n log n) | Yes | Split in half, sort each, merge |
| Quick sort | O(n log n) average | No | Pick pivot, partition, repeat |
| Python's Timsort | O(n log n) | Yes | Built-in, fast, use this in real code |

---

## Practice Questions

Try to answer each question before looking at the answers at the bottom.

**1.** In your own words, explain how bubble sort works. Why is it called "bubble" sort?

**2.** You have the list `[4, 2, 7, 1, 3]`. Walk through the first pass of bubble sort. Show the list after each comparison.

**3.** What is the difference between O(n squared) and O(n log n)? If you have 1,000 items, approximately how many steps does each one take?

**4.** Why is merge sort faster than bubble sort? What is the "trick" that makes it faster?

**5.** You have a list of student records sorted by name, and you want to sort them by grade while keeping students with the same grade in alphabetical order. Do you need a stable or unstable sort?

**6.** What is the difference between `sorted(my_list)` and `my_list.sort()` in Python?

**7.** Which simple sort works best when the list is *almost* sorted already? Why?

**8.** You need to sort a list of 10 items. Does it matter much whether you use bubble sort or merge sort? What about a list of 1,000,000 items?

---

## What Comes Next

Now that you know how to put things in order, the next question is: how do you *find* things quickly? That is the topic of **searching**. You will learn why sorted data is so powerful -- because it lets you search with incredible speed.

**Next up:** [[wiki:python-jr-algo-searching]]

**Previous:** [[wiki:python-jr-ds-graphs]]

---

## Answers to Practice Questions

**1.** Bubble sort walks through the list and compares each pair of neighbors. If two neighbors are in the wrong order, it swaps them. It keeps making passes through the list until no more swaps are needed. It is called "bubble" sort because the biggest values gradually "bubble up" to the end of the list, like bubbles rising to the surface of water. After the first pass, the biggest value is at the end. After the second pass, the second biggest is in its place, and so on.

**2.**
```
Start:             [4, 2, 7, 1, 3]
Compare 4 and 2:   swap  -->  [2, 4, 7, 1, 3]
Compare 4 and 7:   fine  -->  [2, 4, 7, 1, 3]
Compare 7 and 1:   swap  -->  [2, 4, 1, 7, 3]
Compare 7 and 3:   swap  -->  [2, 4, 1, 3, 7]
```
After the first pass, 7 (the biggest) has bubbled to the end.

**3.** O(n squared) means the steps grow as the square of the number of items. O(n log n) means the steps grow as the number of items times the logarithm of the number of items. For 1,000 items: O(n squared) is about 1,000,000 steps, while O(n log n) is about 10,000 steps. That is a 100 times difference! The gap gets even bigger with more items.

**4.** Merge sort is faster because it splits the list in half at each step, which means it does not need to compare every pair. The simple sorts use two loops that each go through the whole list, leading to n times n comparisons. Merge sort's "trick" is divide and conquer: split the problem in half, solve each half, and merge the results. This splitting means it only needs about n times log(n) comparisons.

**5.** You need a **stable** sort. A stable sort keeps the original order for items that are equal. So students with the same grade will keep their alphabetical order (from the previous sort). Merge sort and Python's built-in sort are both stable. Selection sort and quick sort are not stable and might scramble the alphabetical order.

**6.** `sorted(my_list)` creates and returns a **new** sorted list, leaving the original list unchanged. `my_list.sort()` sorts the original list **in place** (changes it directly) and returns `None`. Use `sorted()` when you want to keep the original list. Use `.sort()` when you do not need the original order anymore.

**7.** **Insertion sort** works best on almost-sorted data. It goes through the list and only moves items that are out of place. If most items are already in the right spot, there is very little sliding to do, so it finishes quickly. Bubble sort with the early-stop optimization also works well on almost-sorted data, but insertion sort is generally a bit faster.

**8.** For 10 items, it barely matters. Both sorts will finish almost instantly because 10 squared (100) and 10 times log(10) (about 33) are both tiny numbers. For 1,000,000 items, it makes a huge difference. Bubble sort would need about 1,000,000,000,000 steps (way too slow -- it could take hours or days). Merge sort would need about 20,000,000 steps (fast -- probably under a second). For large data, you must use a fast sort.
