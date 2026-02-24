# Linked Lists — Chains of Nodes

In the previous section, you learned that arrays give you O(1) access by index. That is their superpower. But arrays have a weakness: inserting or deleting in the middle is O(n) because you must shift every element after the insert/delete point.

Linked lists solve this problem with a completely different approach to storing data.

---

## What Is a Linked List?

A linked list is a sequence of **nodes**. Each node holds two things:

1. A **value** (the actual data)
2. A **reference** (pointer) to the **next node**

The nodes do NOT need to be next to each other in memory. They can be scattered anywhere. The only thing connecting them is that each node knows where the next one is.

```
[10 | ->] --> [20 | ->] --> [30 | ->] --> [40 | None]
 head                                      tail
```

Think of it like a scavenger hunt. Each clue tells you where to find the next clue. You cannot jump directly to clue number 5 — you have to follow the chain from the beginning.

---

## Why Linked Lists Exist

Arrays are bad at inserting in the middle because they must shift elements. Linked lists are good at it because you just redirect pointers:

**Inserting 25 between 20 and 30 in a linked list:**

Before: `[20 | ->] --> [30 | ->]`

After: `[20 | ->] --> [25 | ->] --> [30 | ->]`

No shifting. Just change two pointers. That is O(1) if you already have a reference to the node.

---

## The Node Class

This is the building block. Every linked list is made of nodes.

```python
class Node:
    """A single node in a linked list."""

    def __init__(self, value: int, next_node: "Node | None" = None) -> None:
        self.value: int = value
        self.next: Node | None = next_node
```

That is it. A value and a pointer to the next node. If `self.next` is `None`, this node is the last one in the chain.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the fundamental difference between how arrays and linked lists store data in memory? Why does this difference make insertion O(n) for arrays but O(1) for linked lists (when you have a reference to the insertion point)?"</div>
</div>

---

## Singly Linked List — Full Implementation

Open your editor. Try to implement each method yourself before looking at the solution.

```python
class Node:
    """A single node in a singly linked list."""

    def __init__(self, value: int, next_node: "Node | None" = None) -> None:
        self.value: int = value
        self.next: Node | None = next_node


class SinglyLinkedList:
    """A singly linked list implemented from scratch."""

    def __init__(self) -> None:
        self.head: Node | None = None
        self.tail: Node | None = None
        self._size: int = 0

    def __len__(self) -> int:
        """Return the number of nodes."""
        return self._size

    def is_empty(self) -> bool:
        """Check if the list has no nodes."""
        return self._size == 0

    def append(self, value: int) -> None:
        """Add a node to the end of the list."""
        new_node: Node = Node(value)
        if self.tail is None:
            # List is empty — new node is both head and tail
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self._size += 1

    def prepend(self, value: int) -> None:
        """Add a node to the beginning of the list."""
        new_node: Node = Node(value, self.head)
        self.head = new_node
        if self.tail is None:
            # List was empty
            self.tail = new_node
        self._size += 1

    def delete(self, value: int) -> bool:
        """Delete the first node with this value. Return True if found."""
        if self.head is None:
            return False

        # Special case: deleting the head
        if self.head.value == value:
            self.head = self.head.next
            if self.head is None:
                # List is now empty
                self.tail = None
            self._size -= 1
            return True

        # Walk through the list looking for the value
        current: Node = self.head
        while current.next is not None:
            if current.next.value == value:
                # Found it — skip over the node
                if current.next == self.tail:
                    self.tail = current
                current.next = current.next.next
                self._size -= 1
                return True
            current = current.next

        return False

    def search(self, value: int) -> bool:
        """Check if a value exists in the list."""
        current: Node | None = self.head
        while current is not None:
            if current.value == value:
                return True
            current = current.next
        return False

    def get(self, index: int) -> int:
        """Get the value at a specific index. O(n) operation."""
        if index < 0 or index >= self._size:
            raise IndexError(f"Index {index} out of range for size {self._size}")
        current: Node | None = self.head
        for _ in range(index):
            assert current is not None
            current = current.next
        assert current is not None
        return current.value

    def display(self) -> str:
        """Show the list as a string."""
        parts: list[str] = []
        current: Node | None = self.head
        while current is not None:
            parts.append(str(current.value))
            current = current.next
        return " -> ".join(parts)
```

---

## Try It Out

```python
ll: SinglyLinkedList = SinglyLinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.prepend(5)
print(ll.display())      # 5 -> 10 -> 20 -> 30
print(len(ll))            # 4
print(ll.search(20))      # True
print(ll.search(99))      # False

ll.delete(20)
print(ll.display())      # 5 -> 10 -> 30

print(ll.get(1))          # 10
```

---

## Traversal — The Core Pattern

The most important pattern in linked lists is **traversal**: walking through the list node by node.

```python
current: Node | None = self.head
while current is not None:
    # Do something with current.value
    print(current.value)
    current = current.next
```

This pattern appears everywhere. Searching, printing, counting, reversing — they all start with this loop. Burn it into your memory.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Walk me through the delete method step by step. What happens when you delete the head node? What happens when you delete the tail node? What happens when the value is not in the list? Why do we need to track the previous node?"</div>
</div>

---

## Doubly Linked List

A singly linked list only goes forward. You cannot go backward. A doubly linked list fixes this by adding a `prev` pointer to each node.

```python
class DNode:
    """A node in a doubly linked list."""

    def __init__(
        self,
        value: int,
        prev_node: "DNode | None" = None,
        next_node: "DNode | None" = None,
    ) -> None:
        self.value: int = value
        self.prev: DNode | None = prev_node
        self.next: DNode | None = next_node


class DoublyLinkedList:
    """A doubly linked list implemented from scratch."""

    def __init__(self) -> None:
        self.head: DNode | None = None
        self.tail: DNode | None = None
        self._size: int = 0

    def __len__(self) -> int:
        return self._size

    def append(self, value: int) -> None:
        """Add to the end."""
        new_node: DNode = DNode(value)
        if self.tail is None:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self._size += 1

    def prepend(self, value: int) -> None:
        """Add to the beginning."""
        new_node: DNode = DNode(value)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self._size += 1

    def delete_node(self, node: DNode) -> None:
        """Delete a specific node. O(1) because we have the node."""
        if node.prev is not None:
            node.prev.next = node.next
        else:
            self.head = node.next

        if node.next is not None:
            node.next.prev = node.prev
        else:
            self.tail = node.prev

        self._size -= 1

    def display_forward(self) -> str:
        """Show list from head to tail."""
        parts: list[str] = []
        current: DNode | None = self.head
        while current is not None:
            parts.append(str(current.value))
            current = current.next
        return " <-> ".join(parts)

    def display_backward(self) -> str:
        """Show list from tail to head."""
        parts: list[str] = []
        current: DNode | None = self.tail
        while current is not None:
            parts.append(str(current.value))
            current = current.prev
        return " <-> ".join(parts)
```

The big advantage of a doubly linked list: if you have a reference to any node, you can delete it in O(1). In a singly linked list, you need the **previous** node to delete, which means you might have to traverse to find it.

---

## Array vs Linked List — When to Use Which

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Insert at beginning | O(n) | O(1) |
| Insert at end | Amortized O(1) | O(1) with tail pointer |
| Insert in middle | O(n) | O(1) if you have the node |
| Delete from beginning | O(n) | O(1) |
| Delete from end | O(1) | O(1) doubly, O(n) singly |
| Search by value | O(n) | O(n) |
| Memory usage | Less (no pointers) | More (extra pointer per node) |

**Use arrays when** you need fast random access and mostly work with the end of the list.

**Use linked lists when** you frequently insert/delete at the beginning or middle, and you do not need random access.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have 10,000 elements. I need to frequently insert new elements at the beginning. Should I use an array or a linked list? What about if I need to frequently access the 5000th element? Explain the tradeoffs."</div>
</div>

---

## Common Interview Patterns

These are the patterns that show up repeatedly in coding interviews. You should implement each one from scratch.

### 1. Reverse a Linked List

The most classic linked list question. Walk through the list and flip every pointer.

```python
def reverse_list(head: Node | None) -> Node | None:
    """Reverse a singly linked list in place."""
    prev: Node | None = None
    current: Node | None = head
    while current is not None:
        next_node: Node | None = current.next  # Save next
        current.next = prev                     # Flip the pointer
        prev = current                          # Move prev forward
        current = next_node                     # Move current forward
    return prev  # prev is now the new head
```

Walk through this with a small example: `1 -> 2 -> 3 -> None`

- Step 1: prev=None, current=1. Flip: 1->None. Move: prev=1, current=2
- Step 2: prev=1, current=2. Flip: 2->1. Move: prev=2, current=3
- Step 3: prev=2, current=3. Flip: 3->2. Move: prev=3, current=None
- Done. Return prev=3. Chain: 3->2->1->None

### 2. Detect a Cycle (Floyd's Algorithm)

Use two pointers: one moves one step at a time (slow), the other moves two steps (fast). If there is a cycle, they will eventually meet.

```python
def has_cycle(head: Node | None) -> bool:
    """Detect if a linked list has a cycle."""
    slow: Node | None = head
    fast: Node | None = head
    while fast is not None and fast.next is not None:
        slow = slow.next             # type: ignore[union-attr]
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

Why does this work? If there is no cycle, `fast` reaches `None` and we return `False`. If there is a cycle, `fast` eventually laps `slow` inside the cycle — like two runners on a circular track.

### 3. Find the Middle Node

Same slow/fast pointer idea. When fast reaches the end, slow is at the middle.

```python
def find_middle(head: Node | None) -> Node | None:
    """Find the middle node of a linked list."""
    slow: Node | None = head
    fast: Node | None = head
    while fast is not None and fast.next is not None:
        slow = slow.next             # type: ignore[union-attr]
        fast = fast.next.next
    return slow
```

### 4. Merge Two Sorted Lists

Given two sorted linked lists, combine them into one sorted list.

```python
def merge_sorted(
    head1: Node | None, head2: Node | None
) -> Node | None:
    """Merge two sorted linked lists into one sorted list."""
    dummy: Node = Node(0)
    current: Node = dummy

    while head1 is not None and head2 is not None:
        if head1.value <= head2.value:
            current.next = head1
            head1 = head1.next
        else:
            current.next = head2
            head2 = head2.next
        current = current.next  # type: ignore[assignment]

    # Attach whichever list still has nodes
    if head1 is not None:
        current.next = head1
    else:
        current.next = head2

    return dummy.next
```

The **dummy node** trick: create a fake node at the start so you do not have to handle the "first node" as a special case. The real result starts at `dummy.next`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a coding challenge: implement a function that removes all nodes with a given value from a singly linked list. For example, removing 3 from 1 -> 3 -> 5 -> 3 -> 7 should give 1 -> 5 -> 7. Handle the case where the head itself needs to be removed."</div>
</div>

---

## Where People Go Wrong

**1. Losing references.** When you change `current.next`, the old next node is gone forever — unless you saved a reference to it first. Always save references before changing pointers.

```python
# WRONG — you just lost the rest of the list
current.next = new_node

# RIGHT — save the reference first
saved: Node | None = current.next
current.next = new_node
new_node.next = saved
```

**2. Not handling the empty list.** Every method must check `if self.head is None` at the beginning. If you forget, you will get `AttributeError: 'NoneType' object has no attribute 'value'`.

**3. Forgetting to update the tail.** When you delete the last node, the tail pointer still points to the deleted node. You must update it to point to the new last node.

**4. Off-by-one in traversal.** When you need the node **before** a certain position, your loop condition is different than when you need the node **at** that position.

**5. Infinite loops.** If you forget to advance `current = current.next` in your while loop, it runs forever. If you create a cycle by accident, traversal never ends.

---

## Key Takeaways

1. A linked list is a chain of nodes, each pointing to the next.
2. Insertion and deletion are O(1) if you have a reference to the right node.
3. Access by index is O(n) — you must walk from the head.
4. Doubly linked lists add a `prev` pointer, enabling O(1) delete from any node.
5. The slow/fast pointer technique solves many linked list problems.
6. Always save references before changing pointers.

---

**Previous:** [[wiki:python-ds-arrays]] | **Next:** [[wiki:python-ds-stacks-queues]]
