# Stacks and Queues — Order Matters

You have learned two ways to store a sequence of elements: arrays (fast access by index) and linked lists (fast insert/delete at the ends). Stacks and queues are not new data structures — they are **rules** for how you add and remove elements from a sequence.

The difference between a stack and a queue is one question: **which element comes out first?**

---

## Stacks — Last In, First Out (LIFO)

A stack is like a stack of plates. You put a plate on top, and you take a plate off the top. The last plate you added is the first one you remove.

```
Push 10:  [10]
Push 20:  [10, 20]
Push 30:  [10, 20, 30]   <-- top
Pop:      [10, 20]        returns 30
Pop:      [10]             returns 20
```

### Stack Operations

| Operation | What It Does | Time |
|-----------|-------------|------|
| push(value) | Add to the top | O(1) |
| pop() | Remove and return from the top | O(1) |
| peek() | Look at the top without removing | O(1) |
| is_empty() | Check if the stack has no elements | O(1) |

Every operation is O(1). That is what makes stacks useful.

---

## Implement a Stack Using a List

The simplest implementation. The end of the list is the "top" of the stack.

```python
from typing import Any


class Stack:
    """A stack implemented using a Python list."""

    def __init__(self) -> None:
        self._data: list[Any] = []

    def push(self, value: Any) -> None:
        """Add an element to the top of the stack."""
        self._data.append(value)

    def pop(self) -> Any:
        """Remove and return the top element."""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self._data.pop()

    def peek(self) -> Any:
        """Return the top element without removing it."""
        if self.is_empty():
            raise IndexError("Peek at empty stack")
        return self._data[-1]

    def is_empty(self) -> bool:
        """Check if the stack is empty."""
        return len(self._data) == 0

    def __len__(self) -> int:
        """Return the number of elements."""
        return len(self._data)
```

Why use the **end** of the list as the top? Because `list.append()` and `list.pop()` are both O(1). If you used the beginning, `list.insert(0, x)` and `list.pop(0)` are both O(n) because every element must shift.

---

## Implement a Stack Using a Linked List

You can also build a stack with a linked list. The head of the list is the top of the stack.

```python
class StackNode:
    """A node for the linked list stack."""

    def __init__(self, value: Any, next_node: "StackNode | None" = None) -> None:
        self.value: Any = value
        self.next: StackNode | None = next_node


class LinkedStack:
    """A stack implemented using a singly linked list."""

    def __init__(self) -> None:
        self._top: StackNode | None = None
        self._size: int = 0

    def push(self, value: Any) -> None:
        """Add to the top (head of linked list)."""
        new_node: StackNode = StackNode(value, self._top)
        self._top = new_node
        self._size += 1

    def pop(self) -> Any:
        """Remove and return from the top."""
        if self._top is None:
            raise IndexError("Pop from empty stack")
        value: Any = self._top.value
        self._top = self._top.next
        self._size -= 1
        return value

    def peek(self) -> Any:
        """Return the top element without removing it."""
        if self._top is None:
            raise IndexError("Peek at empty stack")
        return self._top.value

    def is_empty(self) -> bool:
        return self._size == 0

    def __len__(self) -> int:
        return self._size
```

Both implementations give O(1) for all operations. The list version is simpler. The linked list version never wastes memory on unused capacity.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I push the values 5, 10, 15, 20 onto a stack. Then I pop twice. What is left on the stack? What does peek return? Walk through each operation step by step."</div>
</div>

---

## Where Stacks Appear in Real Programming

**1. The function call stack.** When Python calls a function, it pushes a "frame" onto the call stack. When the function returns, it pops the frame. This is why you get a "stack overflow" from infinite recursion — the call stack runs out of space.

**2. Undo/Redo.** Every action gets pushed onto a stack. Undo = pop the last action. Redo = push it back.

**3. Expression evaluation.** Checking if parentheses are balanced, evaluating postfix expressions, and converting between infix/postfix all use stacks.

**4. Depth-First Search (DFS).** Exploring a maze or graph by going as deep as possible before backtracking. The stack tracks where you have been.

---

## Queues — First In, First Out (FIFO)

A queue is like a line at a store. The first person in line is the first person served. New people join at the back.

```
Enqueue 10:  [10]
Enqueue 20:  [10, 20]
Enqueue 30:  [10, 20, 30]
                ^         ^
              front      back
Dequeue:     [20, 30]      returns 10
Dequeue:     [30]           returns 20
```

### Queue Operations

| Operation | What It Does | Time |
|-----------|-------------|------|
| enqueue(value) | Add to the back | O(1) |
| dequeue() | Remove and return from the front | O(1) |
| peek() | Look at the front without removing | O(1) |
| is_empty() | Check if the queue has no elements | O(1) |

---

## Why NOT to Use a List for a Queue

This is a common mistake. If you use a Python list as a queue, `dequeue` requires removing from the front:

```python
# DON'T DO THIS
queue: list[int] = [10, 20, 30]
queue.append(40)      # O(1) — fine
queue.pop(0)          # O(n) — BAD! Shifts every element
```

`list.pop(0)` is O(n) because every element after index 0 must shift left. For a queue with a million elements, that is a million shifts for every single dequeue.

---

## Implement a Queue Using a Linked List

A linked list gives you O(1) at both ends (with a tail pointer).

```python
from typing import Any


class QueueNode:
    """A node for the linked list queue."""

    def __init__(self, value: Any, next_node: "QueueNode | None" = None) -> None:
        self.value: Any = value
        self.next: QueueNode | None = next_node


class Queue:
    """A queue implemented using a singly linked list."""

    def __init__(self) -> None:
        self._front: QueueNode | None = None
        self._back: QueueNode | None = None
        self._size: int = 0

    def enqueue(self, value: Any) -> None:
        """Add an element to the back of the queue."""
        new_node: QueueNode = QueueNode(value)
        if self._back is None:
            # Queue is empty
            self._front = new_node
            self._back = new_node
        else:
            self._back.next = new_node
            self._back = new_node
        self._size += 1

    def dequeue(self) -> Any:
        """Remove and return the front element."""
        if self._front is None:
            raise IndexError("Dequeue from empty queue")
        value: Any = self._front.value
        self._front = self._front.next
        if self._front is None:
            # Queue is now empty
            self._back = None
        self._size -= 1
        return value

    def peek(self) -> Any:
        """Return the front element without removing it."""
        if self._front is None:
            raise IndexError("Peek at empty queue")
        return self._front.value

    def is_empty(self) -> bool:
        return self._size == 0

    def __len__(self) -> int:
        return self._size
```

---

## Try It Out

```python
q: Queue = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
print(q.peek())       # 10
print(q.dequeue())    # 10
print(q.dequeue())    # 20
print(q.peek())       # 30
print(len(q))          # 1
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Why is using a Python list as a queue a bad idea? What is the time complexity of list.pop(0)? What data structure should you use instead, and why does it give O(1) for both enqueue and dequeue?"</div>
</div>

---

## Where Queues Appear in Real Programming

**1. Task scheduling.** Operating systems use queues to schedule processes. First task submitted, first task executed.

**2. Breadth-First Search (BFS).** Exploring a graph level by level. The queue tracks which nodes to visit next.

**3. Message queues.** Systems like RabbitMQ and Kafka process messages in order.

**4. Print queues.** Documents are printed in the order they were submitted.

---

## Deque — Double-Ended Queue

A deque (pronounced "deck") allows insertion and removal from **both ends** in O(1).

Python provides `collections.deque` which is implemented as a doubly linked list of fixed-size blocks:

```python
from collections import deque

d: deque[int] = deque()
d.append(10)       # Add to right
d.appendleft(5)    # Add to left
d.pop()            # Remove from right -> 10
d.popleft()        # Remove from left -> 5
```

A deque is both a stack and a queue. You can use it as either:

- **As a stack**: use `append()` and `pop()` (both work on the right end)
- **As a queue**: use `append()` and `popleft()` (add right, remove left)

This is what you should use in practice when you need a queue in Python. Do not use a plain list.

---

## Priority Queue — Brief Introduction

A regular queue is FIFO — first in, first out. A **priority queue** serves elements based on priority, not arrival order.

Think of an emergency room. A patient with a heart attack gets seen before someone with a sprained ankle, even if the ankle patient arrived first.

```python
# Brief preview — we will implement this fully in the Heaps section
# Python's heapq module provides a priority queue
import heapq

pq: list[tuple[int, str]] = []
heapq.heappush(pq, (3, "low priority task"))
heapq.heappush(pq, (1, "urgent task"))
heapq.heappush(pq, (2, "medium task"))

print(heapq.heappop(pq))  # (1, 'urgent task') — lowest number = highest priority
```

We will build a priority queue from scratch using a heap in [[wiki:python-ds-heaps]].

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between a stack, a queue, a deque, and a priority queue? For each one, describe the rule for which element comes out next, and give a real-world analogy."</div>
</div>

---

## Common Interview Patterns

### 1. Valid Parentheses (Stack)

Given a string of brackets `()[]{}`, determine if they are properly matched and nested.

```python
def is_valid_parentheses(s: str) -> bool:
    """Check if a string of brackets is valid."""
    stack: list[str] = []
    matching: dict[str, str] = {")": "(", "]": "[", "}": "{"}

    for char in s:
        if char in "([{":
            stack.append(char)
        elif char in ")]}":
            if len(stack) == 0:
                return False
            if stack[-1] != matching[char]:
                return False
            stack.pop()

    return len(stack) == 0
```

Why a stack? Because the most recently opened bracket must be closed first. That is LIFO.

```
Input: "([{}])"
Push (   stack: [(]
Push [   stack: [(, []
Push {   stack: [(, [, {]
See }    matches { -> pop.  stack: [(, []
See ]    matches [ -> pop.  stack: [(]
See )    matches ( -> pop.  stack: []
Empty stack -> valid!
```

### 2. Implement Queue Using Two Stacks

This is a classic interview question. The trick: use one stack for enqueue and another for dequeue.

```python
class QueueFromStacks:
    """A queue built from two stacks."""

    def __init__(self) -> None:
        self._in_stack: list[Any] = []
        self._out_stack: list[Any] = []

    def enqueue(self, value: Any) -> None:
        """Add to the back. O(1)."""
        self._in_stack.append(value)

    def dequeue(self) -> Any:
        """Remove from the front. Amortized O(1)."""
        if len(self._out_stack) == 0:
            # Transfer all elements from in_stack to out_stack
            # This reverses the order, so the oldest element is on top
            while len(self._in_stack) > 0:
                self._out_stack.append(self._in_stack.pop())
        if len(self._out_stack) == 0:
            raise IndexError("Dequeue from empty queue")
        return self._out_stack.pop()

    def is_empty(self) -> bool:
        return len(self._in_stack) == 0 and len(self._out_stack) == 0
```

Why does this work? When you move elements from one stack to another, they reverse order. So the first element pushed into `in_stack` ends up on top of `out_stack` — exactly what FIFO requires.

### 3. Next Greater Element (Monotonic Stack)

Given an array, find the next element that is greater than each element.

```python
def next_greater_element(nums: list[int]) -> list[int]:
    """For each element, find the next greater element to its right.
    Return -1 if no greater element exists."""
    result: list[int] = [-1] * len(nums)
    stack: list[int] = []  # Stack of indices

    for i in range(len(nums)):
        # While the current element is greater than the element
        # at the top of the stack, pop and record the answer
        while len(stack) > 0 and nums[i] > nums[stack[-1]]:
            idx: int = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result
```

```python
# Example
print(next_greater_element([4, 2, 6, 1, 3]))
# [6, 6, -1, 3, -1]
# 4's next greater: 6
# 2's next greater: 6
# 6 has no next greater: -1
# 1's next greater: 3
# 3 has no next greater: -1
```

This is called a **monotonic stack** because the stack always stays in decreasing order. Any time a bigger element comes along, we pop everything smaller.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a coding challenge: implement a MinStack — a stack that supports push, pop, peek, and also get_min, all in O(1) time. Hint: use two stacks — one for the actual values and one that tracks the current minimum at each level."</div>
</div>

---

## Where People Go Wrong

**1. Using a list as a queue.** `list.pop(0)` is O(n). Use `collections.deque` or a linked list instead.

**2. Stack overflow in recursion.** Python's default recursion limit is 1000. If your recursive function goes deeper than that, use an explicit stack with a while loop instead.

```python
# Instead of this (can overflow):
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Use this (no overflow risk):
def factorial_iterative(n: int) -> int:
    result: int = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

**3. Forgetting to check empty.** Calling `pop()` or `peek()` on an empty stack or queue should raise an error. If you forget the check, you get confusing crashes.

**4. Not updating both front and back in a queue.** When the last element is dequeued, both `_front` and `_back` must become `None`. Forgetting `_back` causes bugs on the next enqueue.

**5. Confusing which end is which.** In a stack, you push and pop from the same end. In a queue, you enqueue at one end and dequeue from the other. Mixing these up gives you the wrong data structure.

---

## Stack vs Queue — Quick Reference

| Feature | Stack | Queue |
|---------|-------|-------|
| Order | Last In, First Out (LIFO) | First In, First Out (FIFO) |
| Add | push (to top) | enqueue (to back) |
| Remove | pop (from top) | dequeue (from front) |
| Real-world analogy | Stack of plates | Line at a store |
| Used for | DFS, undo, parsing | BFS, scheduling, messaging |

---

## Key Takeaways

1. A stack is LIFO — last in, first out. Push and pop from the same end.
2. A queue is FIFO — first in, first out. Add at the back, remove from the front.
3. Both support O(1) add and remove operations.
4. Never use a Python list as a queue. Use `collections.deque` or a linked list.
5. Stacks are used for DFS, expression parsing, and undo operations.
6. Queues are used for BFS, task scheduling, and message processing.
7. A deque supports O(1) operations at both ends.

---

**Previous:** [[wiki:python-ds-linked-lists]] | **Next:** [[wiki:python-ds-trees]]
