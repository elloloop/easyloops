# Linked Lists -- A Completely Different Way to Store Things

In the last lesson, you learned how arrays store items side by side in memory, like houses on a street. That design is great for jumping to any position instantly, but it has a big weakness: inserting or deleting in the middle means everyone has to scoot over.

What if there were a completely different way to organize a collection? One where adding and removing items never requires scooting?

Welcome to **linked lists**.

![A flat vector illustration in a children's educational book style showing Byte the robot following a trail of colorful treasure chests in a garden, each chest connected to the next by a glowing arrow, like a treasure hunt path winding through flowers and bushes. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## The Treasure Hunt Idea

Imagine a treasure hunt. You start with the first clue. That clue has two things:

1. **A piece of treasure** (some data you care about)
2. **A map to the next clue** (directions to find the next one)

You follow the map to the second clue, which also has treasure and a map to the third clue. And so on, until you reach a clue that says "The End -- there is no next clue."

That is exactly how a linked list works. Each item in the list is called a **node**, and each node holds:

1. **Data** -- the actual value you are storing
2. **A reference to the next node** -- Python's version of "a map to the next clue"

The nodes do NOT need to sit next to each other in memory. They can be scattered all over the place. Each one just needs to know where the next one is.

```
[data: 10 | next] --> [data: 20 | next] --> [data: 30 | next] --> None
```

The very first node is called the **head**. The end of the list is marked by `None` (meaning "there is no next node").

---

## Building a Node

A node is simple. It just holds some data and a reference to the next node. Here it is as a Python class:

```python
from typing import Any


class Node:
    """A single node in a linked list."""

    def __init__(self, data: Any, next_node: "Node | None" = None) -> None:
        self.data: Any = data
        self.next: Node | None = next_node
```

That is it. A node knows two things: its data, and who comes next. Let us create a few nodes and link them by hand:

```python
node3: Node = Node(30)            # last node, next is None
node2: Node = Node(20, node3)     # points to node3
node1: Node = Node(10, node2)     # points to node2

# Now we have: 10 --> 20 --> 30 --> None
```

You can walk the chain by following the `next` references:

```python
current: Node | None = node1
while current is not None:
    print(current.data)
    current = current.next
# Prints: 10, 20, 30
```

This "walking the chain" is called **traversal**. You start at the head and follow the `next` pointers until you reach `None`.

---

## Why Linked Lists Exist

You might be wondering: "Why not just use an array?" Here is the key difference:

**In an array**, inserting a new item in the middle means scooting everything after it. If you have a million items and insert at position 0, that is a million scoots.

**In a linked list**, inserting a new item is just changing a couple of pointers. No scooting at all. If you are already at the right spot, inserting takes the same amount of time whether the list has 10 items or 10 million items.

The trade-off is that arrays let you jump to any position instantly (O(1)), but linked lists require you to walk the chain from the beginning (O(n)). Each structure is good at what the other is bad at.

---

## Building a LinkedList Class

Now let us build a complete linked list. We will add methods one at a time so you can understand each one.

```python
from typing import Any


class Node:
    """A single node in a linked list."""

    def __init__(self, data: Any, next_node: "Node | None" = None) -> None:
        self.data: Any = data
        self.next: Node | None = next_node


class LinkedList:
    """A singly linked list built from scratch."""

    def __init__(self) -> None:
        self.head: Node | None = None
        self._size: int = 0

    def __len__(self) -> int:
        """Return the number of nodes in the list."""
        return self._size
```

The list starts empty: the head is `None` and the size is 0.

---

## Prepend: Adding to the Front

Adding a new node to the front is the fastest operation in a linked list. You just create a new node and point it at the current head. Then the new node becomes the head.

```python
    def prepend(self, data: Any) -> None:
        """Add a new node to the front of the list."""
        new_node: Node = Node(data, self.head)
        self.head = new_node
        self._size += 1
```

Here is what happens step by step:

```
Before: head --> [20] --> [30] --> None

Step 1: Create new node [10], point its next to head ([20])
        [10] --> [20] --> [30] --> None

Step 2: Update head to point to new node
        head --> [10] --> [20] --> [30] --> None
```

That is it. Two steps, no matter how long the list is. This is O(1) -- constant time.

![A flat vector illustration in a children's educational book style showing Byte the robot attaching a new colorful link to the front of a chain of connected colorful blocks, with each block having a small arrow pointing to the next one. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Append: Adding to the End

Adding to the end is different. You have to walk the entire chain to find the last node, then attach the new node after it.

```python
    def append(self, data: Any) -> None:
        """Add a new node to the end of the list."""
        new_node: Node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            current: Node = self.head
            while current.next is not None:
                current = current.next
            current.next = new_node
        self._size += 1
```

The `while` loop walks to the last node (the one whose `next` is `None`). Then we point that node's `next` to the new node.

This is O(n) because we have to walk through every node to reach the end. If the list has 1000 nodes, that is 1000 steps.

---

## Display: Showing the Whole List

To see what is in the list, we walk the chain and collect all the data:

```python
    def display(self) -> str:
        """Show all the data in the list as a string."""
        parts: list[str] = []
        current: Node | None = self.head
        while current is not None:
            parts.append(str(current.data))
            current = current.next
        return " -> ".join(parts) + " -> None"
```

This prints something like: `10 -> 20 -> 30 -> None`

---

## Search: Finding an Item

To find an item, walk the chain and check each node's data:

```python
    def search(self, target: Any) -> bool:
        """Return True if the target value is in the list."""
        current: Node | None = self.head
        while current is not None:
            if current.data == target:
                return True
            current = current.next
        return False
```

In the worst case, the item is at the very end (or not in the list at all), and you walk through every node. This is O(n).

---

## Delete: Removing a Node

Deleting a node is where linked lists really shine compared to arrays. Instead of scooting items, you just **repoint the previous node to skip over the deleted one**.

```
Before deleting 20:
head --> [10] --> [20] --> [30] --> None

After deleting 20:
head --> [10] ---------> [30] --> None
```

Node 10 used to point to node 20. Now it points directly to node 30. Node 20 is simply skipped and Python cleans it up automatically.

But there is a catch: you need to know the **previous** node so you can change its `next` pointer. This means you have to keep track of both the current node and the one before it.

```python
    def delete(self, target: Any) -> bool:
        """Delete the first node with matching data. Returns True if found."""
        if self.head is None:
            return False

        # Special case: deleting the head
        if self.head.data == target:
            self.head = self.head.next
            self._size -= 1
            return True

        # Walk the chain, keeping track of the previous node
        previous: Node = self.head
        current: Node | None = self.head.next
        while current is not None:
            if current.data == target:
                previous.next = current.next  # skip over the node
                self._size -= 1
                return True
            previous = current
            current = current.next

        return False  # not found
```

Notice the special case at the top. If the node to delete is the head, we do not have a previous node to repoint. Instead, we just move the head to the second node.

---

## Try It Out

```python
ll: LinkedList = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.prepend(5)
print(ll.display())          # 5 -> 10 -> 20 -> 30 -> None
print(f"Length: {len(ll)}")   # Length: 4

print(ll.search(20))         # True
print(ll.search(99))         # False

ll.delete(20)
print(ll.display())          # 5 -> 10 -> 30 -> None

ll.delete(5)
print(ll.display())          # 10 -> 30 -> None
```

---

## Doubly Linked Lists

The linked list we just built is a **singly linked list** -- each node only knows about the next one. But what if each node also knew about the **previous** one?

That is a **doubly linked list**. Each node has three things:

1. **Data** -- the value
2. **Next** -- reference to the next node
3. **Prev** -- reference to the previous node

```
None <-- [10] <--> [20] <--> [30] --> None
```

Here is the updated Node class for a doubly linked list:

```python
class DNode:
    """A node for a doubly linked list."""

    def __init__(self, data: Any,
                 prev_node: "DNode | None" = None,
                 next_node: "DNode | None" = None) -> None:
        self.data: Any = data
        self.prev: DNode | None = prev_node
        self.next: DNode | None = next_node
```

**Why bother with two pointers?** Because it solves some problems:

- **Delete is easier.** In a singly linked list, you need to track the previous node while walking forward. In a doubly linked list, every node already knows its previous node.
- **You can walk backward.** Need to go from the last item to the first? No problem. In a singly linked list, you can only go forward.
- **Adding to the end can be fast.** If you keep a reference to the last node (called the **tail**), you can append in O(1) without walking the whole chain.

The trade-off is that each node uses more memory (storing two references instead of one), and the code for insert/delete is a bit more involved because you have to update pointers in both directions.

---

## Reversing a Linked List

Reversing a linked list is a classic exercise. The idea: walk through the list and flip every `next` pointer so it points backward instead of forward.

```
Before: head --> [10] --> [20] --> [30] --> None
After:  head --> [30] --> [20] --> [10] --> None
```

Here is the method:

```python
    def reverse(self) -> None:
        """Reverse the linked list in place."""
        previous: Node | None = None
        current: Node | None = self.head
        while current is not None:
            next_node: Node | None = current.next  # save the next node
            current.next = previous                 # flip the pointer
            previous = current                      # move previous forward
            current = next_node                     # move current forward
        self.head = previous
```

Let us trace through it:

```
Start:   prev=None, curr=[10]-->[20]-->[30]-->None

Step 1:  Save next=[20]
         Flip: [10]-->None
         Move: prev=[10], curr=[20]

Step 2:  Save next=[30]
         Flip: [20]-->[10]-->None
         Move: prev=[20], curr=[30]

Step 3:  Save next=None
         Flip: [30]-->[20]-->[10]-->None
         Move: prev=[30], curr=None

Done! Set head = prev = [30]
Result: head --> [30] --> [20] --> [10] --> None
```

The key insight: you need three variables (`previous`, `current`, `next_node`) because once you flip a pointer, you lose access to the rest of the chain if you did not save it first.

![A flat vector illustration in a children's educational book style showing Byte the robot turning around a chain of connected train cars on a turntable, with arrows showing the cars reversing direction one by one. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Linked List vs Array: The Full Comparison

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by position | O(1) -- instant math | O(n) -- must walk the chain |
| Insert at beginning | O(n) -- everyone scoots right | O(1) -- just repoint the head |
| Insert at end | Amortized O(1) for dynamic arrays | O(n) singly, O(1) with tail pointer |
| Insert in middle (already there) | O(n) -- must scoot | O(1) -- just repoint two nodes |
| Delete from beginning | O(n) -- everyone scoots left | O(1) -- just move the head |
| Delete from middle (already there) | O(n) -- must scoot | O(1) -- just skip the node |
| Search by value | O(n) -- check one by one | O(n) -- walk the chain |
| Memory usage | Compact, items side by side | Extra memory for next/prev pointers |

**The main trade-off:** Arrays are better when you need fast access by position. Linked lists are better when you need fast insert/delete and you are already at (or near) the right spot.

---

## The Complete LinkedList Class

Here is the full class with all the methods together, including `reverse`:

```python
from typing import Any


class Node:
    """A single node in a linked list."""

    def __init__(self, data: Any, next_node: "Node | None" = None) -> None:
        self.data: Any = data
        self.next: Node | None = next_node


class LinkedList:
    """A singly linked list built from scratch."""

    def __init__(self) -> None:
        self.head: Node | None = None
        self._size: int = 0

    def __len__(self) -> int:
        return self._size

    def prepend(self, data: Any) -> None:
        """Add a new node to the front. O(1)."""
        new_node: Node = Node(data, self.head)
        self.head = new_node
        self._size += 1

    def append(self, data: Any) -> None:
        """Add a new node to the end. O(n)."""
        new_node: Node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            current: Node = self.head
            while current.next is not None:
                current = current.next
            current.next = new_node
        self._size += 1

    def search(self, target: Any) -> bool:
        """Return True if the target value is in the list. O(n)."""
        current: Node | None = self.head
        while current is not None:
            if current.data == target:
                return True
            current = current.next
        return False

    def delete(self, target: Any) -> bool:
        """Delete the first node with matching data. O(n)."""
        if self.head is None:
            return False
        if self.head.data == target:
            self.head = self.head.next
            self._size -= 1
            return True
        previous: Node = self.head
        current: Node | None = self.head.next
        while current is not None:
            if current.data == target:
                previous.next = current.next
                self._size -= 1
                return True
            previous = current
            current = current.next
        return False

    def reverse(self) -> None:
        """Reverse the linked list in place. O(n)."""
        previous: Node | None = None
        current: Node | None = self.head
        while current is not None:
            next_node: Node | None = current.next
            current.next = previous
            previous = current
            current = next_node
        self.head = previous

    def display(self) -> str:
        """Show all data in the list."""
        parts: list[str] = []
        current: Node | None = self.head
        while current is not None:
            parts.append(str(current.data))
            current = current.next
        return " -> ".join(parts) + " -> None"
```

---

## Common Mistakes to Watch For

**1. Losing the chain.** If you change a `next` pointer before saving the rest of the chain, those nodes are gone forever. Always save `current.next` before changing it.

**2. Forgetting the head special case.** When deleting or inserting, the head node does not have a previous node. You must handle it separately.

**3. Infinite loops.** If you accidentally create a cycle (a node's `next` points back to an earlier node), your traversal will loop forever. Always make sure the last node's `next` is `None`.

**4. Off-by-one on size.** Make sure to update `self._size` every time you add or remove a node. Forgetting to do this means `len()` gives wrong answers.

---

## Practice Questions

Try to answer these yourself before looking at the answers at the bottom of the page.

**1.** What are the two things every node in a singly linked list stores?

**2.** You have a linked list: `head --> [5] --> [10] --> [15] --> None`. You call `prepend(1)`. Draw the list after this operation. How many steps did it take?

**3.** Using the same original list (`5 -> 10 -> 15`), you want to delete the node with data 10. Describe what pointer change needs to happen. Which node's `next` pointer changes, and what does it change to?

**4.** Why is accessing position 500 in a linked list slow, but accessing position 500 in an array is instant?

**5.** You have a singly linked list with 1000 nodes. You want to add a new node right after position 999 (the very end). How many nodes do you have to visit to get there? How could a doubly linked list with a tail pointer make this faster?

**6.** Trace through the `reverse` method on the list `head --> [A] --> [B] --> [C] --> None`. Show the values of `previous`, `current`, and `next_node` at each step.

**7.** Write a method called `get(self, index: int) -> Any` that returns the data at a given position in the linked list. It should raise an IndexError if the index is out of range. What is the time complexity?

**8.** What is the main advantage of a doubly linked list over a singly linked list? What is the disadvantage?

![A flat vector illustration in a children's educational book style showing Byte the robot standing at a crossroads with two paths, one made of a row of connected houses side by side labeled with numbers, and the other a winding trail of treasure chests connected by chains. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Answers to Practice Questions

**1.** Every node stores (a) its **data** (the value you are keeping) and (b) a **reference to the next node** (or `None` if it is the last node).

**2.**
```
After prepend(1):
head --> [1] --> [5] --> [10] --> [15] --> None
```
It took just 2 steps: create the new node pointing to the old head, then update the head. This is O(1) no matter how long the list is.

**3.** The node with data 5 currently points to the node with data 10. You change node 5's `next` pointer to point to the node with data 15 instead. This "skips over" node 10:
```
Before: [5] --> [10] --> [15] --> None
After:  [5] ------------> [15] --> None
```

**4.** In an array, every item is stored side by side in memory with no gaps. To find position 500, the computer does simple math: `start + 500 * slot_size`. One calculation, done. In a linked list, the items can be scattered anywhere in memory. The only way to reach position 500 is to start at the head and follow 500 `next` pointers, one at a time. That is 500 steps.

**5.** You have to visit all 1000 nodes to reach the end because in a singly linked list, you can only start from the head and walk forward. With a doubly linked list that keeps a `tail` pointer, you can go directly to the last node in O(1) and attach the new node right there. No walking needed.

**6.**
```
Start:   prev=None,  curr=[A],
Step 1:  next_node=[B], flip A.next=None,    prev=[A],  curr=[B]
Step 2:  next_node=[C], flip B.next=[A],     prev=[B],  curr=[C]
Step 3:  next_node=None, flip C.next=[B],    prev=[C],  curr=None
Done:    head = [C]

Result: head --> [C] --> [B] --> [A] --> None
```

**7.**
```python
def get(self, index: int) -> Any:
    """Return the data at the given position. O(n)."""
    if index < 0 or index >= self._size:
        raise IndexError(f"Index {index} out of range for size {self._size}")
    current: Node | None = self.head
    for i in range(index):
        current = current.next
    return current.data
```
The time complexity is O(n) in the worst case because you may need to walk through up to `n` nodes to reach the target position.

**8.** The main **advantage** of a doubly linked list is that each node knows both its next and its previous neighbor. This makes operations like deleting a node easier (you do not need to separately track the previous node), and it lets you walk backward through the list. The main **disadvantage** is that each node uses more memory because it stores two references instead of one, and the code for insert and delete is more involved because you must update pointers in both directions.

---

**Previous:** [[wiki:python-jr-ds-arrays]] | **Next:** [[wiki:python-jr-ds-stacks-queues]]
