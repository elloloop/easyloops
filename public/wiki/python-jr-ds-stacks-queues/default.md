# Stacks and Queues -- Two Simple Structures That Are Everywhere

You have now built two data structures from scratch: dynamic arrays and linked lists. Those are general-purpose -- you can access, insert, and delete anywhere. But sometimes, you want a structure that is intentionally limited. One that only lets you add and remove items in a very specific way.

Why would you want limits? Because limits make things simple, fast, and hard to use wrong.

In this lesson, you will learn two of the most useful structures in all of computer science: **stacks** and **queues**. They show up everywhere, from the Undo button to web servers handling requests.

![A flat vector illustration in a children's educational book style showing Byte the robot in a kitchen with two setups: on the left, a tall stack of colorful plates on a counter, and on the right, a line of colorful toy figures waiting at a ticket booth. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Part 1: Stacks -- Last In, First Out

### The Stack of Plates

Imagine a stack of plates at a buffet. When someone washes a plate, they put it on **top** of the stack. When someone needs a plate, they take one from the **top** of the stack.

The last plate placed on the stack is the first plate taken off. This is called **Last In, First Out**, or **LIFO**.

You can only do two things with a stack of plates:

- **Put a plate on top** (push)
- **Take a plate off the top** (pop)

You cannot pull a plate out of the middle. You cannot take one from the bottom. Only the top.

### Another Way to Think About It: The Undo Button

Every time you type something in a document, that action goes onto a stack. When you press Undo, it removes the most recent action from the top of the stack and reverses it. Press Undo again, and the next most recent action comes off.

```
You type "H"        Stack: [H]
You type "e"        Stack: [H, e]
You type "x"        Stack: [H, e, x]     <-- oops, wrong letter!
You press Undo      Stack: [H, e]        <-- "x" is removed
You type "l"        Stack: [H, e, l]
```

The most recent action is always on top, and Undo always removes from the top. That is a stack.

---

### Stack Operations

A stack has three main operations:

| Operation | What It Does |
|-----------|-------------|
| **push(item)** | Add an item to the top of the stack |
| **pop()** | Remove and return the item from the top |
| **peek()** | Look at the top item without removing it |

All three are **O(1)** -- constant time, no matter how many items are in the stack.

---

### Building a Stack Class

Since a stack only adds and removes from one end, a Python list is perfect for the job. The end of the list is the "top" of our stack.

```python
from typing import Any


class Stack:
    """A stack: Last In, First Out (LIFO)."""

    def __init__(self) -> None:
        self._items: list[Any] = []

    def push(self, item: Any) -> None:
        """Add an item to the top of the stack."""
        self._items.append(item)

    def pop(self) -> Any:
        """Remove and return the top item. Raises error if empty."""
        if self.is_empty():
            raise IndexError("Cannot pop from an empty stack")
        return self._items.pop()

    def peek(self) -> Any:
        """Return the top item without removing it. Raises error if empty."""
        if self.is_empty():
            raise IndexError("Cannot peek at an empty stack")
        return self._items[-1]

    def is_empty(self) -> bool:
        """Return True if the stack has no items."""
        return len(self._items) == 0

    def size(self) -> int:
        """Return the number of items in the stack."""
        return len(self._items)

    def display(self) -> str:
        """Show the stack from bottom to top."""
        return "Bottom -> " + " -> ".join(str(x) for x in self._items) + " -> Top"
```

Notice how simple this is. We are using a Python list internally, but we only expose `push`, `pop`, and `peek`. The user of our Stack class cannot access items in the middle -- and that is the whole point.

**Why use `list.append()` and `list.pop()`?** Because these operate on the **end** of the list, and for Python lists (which are dynamic arrays), operations at the end are O(1). This means our stack operations are all O(1).

---

### Try It Out

```python
stack: Stack = Stack()
stack.push("wash dishes")
stack.push("write report")
stack.push("read email")
print(stack.display())    # Bottom -> wash dishes -> write report -> read email -> Top

print(stack.peek())       # read email (most recent, still on the stack)
print(stack.pop())        # read email (removed from stack)
print(stack.pop())        # write report
print(stack.display())    # Bottom -> wash dishes -> Top
```

---

### Real Uses of Stacks

Stacks are used everywhere in programming:

**1. The Undo button.** Every action is pushed onto a stack. Undo pops the most recent action. Redo pushes it back on.

**2. The Back button in a web browser.** Every page you visit is pushed onto a stack. When you press Back, the current page is popped off and you see the previous one.

**3. Function calls in Python.** When Python runs your code and calls a function, that function goes onto a "call stack." When the function finishes, it comes off the stack and Python returns to where it left off. If function A calls function B, and B calls function C, the stack looks like: `[A, B, C]`. C finishes first, then B, then A. Last in, first out.

**4. Checking matching brackets.** When you write code with brackets like `({[]})`, a stack can verify that every opening bracket has a matching closing bracket.

---

### Exercise: Valid Parentheses

This is one of the most popular programming exercises in the world. The problem: given a string of brackets like `"({[]})"`, determine if every opening bracket has a correct matching closing bracket.

The rules:
- `(` must be closed by `)`
- `{` must be closed by `}`
- `[` must be closed by `]`
- They must close in the right order: `"([)]"` is NOT valid, but `"([{}])"` IS valid

The strategy: use a stack. Walk through each character. When you see an opening bracket, push it. When you see a closing bracket, pop the top of the stack and check if it matches.

```python
def is_valid_parentheses(text: str) -> bool:
    """Check if all brackets in the text are properly matched."""
    stack: Stack = Stack()
    matching: dict[str, str] = {")": "(", "}": "{", "]": "["}

    for char in text:
        if char in "({[":
            stack.push(char)
        elif char in ")}]":
            if stack.is_empty():
                return False  # closing bracket with nothing to match
            top: str = stack.pop()
            if top != matching[char]:
                return False  # wrong type of bracket
    return stack.is_empty()  # True if all brackets were matched
```

Let us trace through `"({[]})"`:

```
char '(':  push '('           Stack: ['(']
char '{':  push '{'           Stack: ['(', '{']
char '[':  push '['           Stack: ['(', '{', '[']
char ']':  pop '[', matches!  Stack: ['(', '{']
char '}':  pop '{', matches!  Stack: ['(']
char ')':  pop '(', matches!  Stack: []
End: stack is empty, so return True
```

Now trace through `"([)]"`:

```
char '(':  push '('           Stack: ['(']
char '[':  push '['           Stack: ['(', '[']
char ')':  pop '[', but ')' needs '(', not '['. Mismatch! Return False
```

Try it:

```python
print(is_valid_parentheses("({[]})"))   # True
print(is_valid_parentheses("([)]"))     # False
print(is_valid_parentheses("(("))       # False (stack not empty at end)
print(is_valid_parentheses(""))         # True (nothing to mismatch)
```

![A flat vector illustration in a children's educational book style showing Byte the robot sorting matching pairs of colorful puzzle pieces, with opening brackets on one side and closing brackets on the other, connecting them with glowing lines. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Part 2: Queues -- First In, First Out

### The Movie Theater Line

Imagine a line at a movie theater. The first person who gets in line is the first person who gets to buy a ticket. New people join at the **back** of the line. People leave from the **front** of the line.

This is called **First In, First Out**, or **FIFO**. It is the complete opposite of a stack.

```
Front of line                         Back of line
[Alice] [Bob] [Charlie] [Diana]  <-- Diana just joined
  ^
  Alice gets served next
```

---

### Queue Operations

A queue has two main operations:

| Operation | What It Does |
|-----------|-------------|
| **enqueue(item)** | Add an item to the back of the line |
| **dequeue()** | Remove and return the item from the front of the line |

You can also **peek** at the front item without removing it.

---

### Building a Queue Class (The Simple Way)

The most straightforward way to build a queue is with a Python list:

```python
from typing import Any


class SimpleQueue:
    """A queue: First In, First Out (FIFO). Simple but not efficient."""

    def __init__(self) -> None:
        self._items: list[Any] = []

    def enqueue(self, item: Any) -> None:
        """Add an item to the back of the queue."""
        self._items.append(item)

    def dequeue(self) -> Any:
        """Remove and return the front item. Raises error if empty."""
        if self.is_empty():
            raise IndexError("Cannot dequeue from an empty queue")
        return self._items.pop(0)

    def peek(self) -> Any:
        """Return the front item without removing it."""
        if self.is_empty():
            raise IndexError("Cannot peek at an empty queue")
        return self._items[0]

    def is_empty(self) -> bool:
        """Return True if the queue has no items."""
        return len(self._items) == 0

    def size(self) -> int:
        """Return the number of items in the queue."""
        return len(self._items)

    def display(self) -> str:
        """Show the queue from front to back."""
        return "Front -> " + " -> ".join(str(x) for x in self._items) + " -> Back"
```

This works, but there is a **performance problem**. Can you spot it?

---

### The Problem with list.pop(0)

Look at the `dequeue` method. It calls `self._items.pop(0)`, which removes the item at position 0.

Remember from the arrays lesson: removing from the front of an array means **every other item has to scoot left**. If your queue has 1000 items, that is 999 scoots just to remove the front item.

```
Before pop(0):  [Alice, Bob, Charlie, Diana]
After pop(0):   [Bob, Charlie, Diana]
                 ^^^  ^^^^^^^^  ^^^^^  -- everyone scooted left
```

This makes `dequeue` an O(n) operation. For a stack, both `push` and `pop` were O(1). For this simple queue, `enqueue` is O(1) but `dequeue` is O(n). That is not great.

---

### The Solution: collections.deque

Python provides a built-in data structure called `deque` (pronounced "deck") in the `collections` module. A deque is a **double-ended queue** -- it is designed to be fast at adding and removing from BOTH ends.

Under the hood, a deque is built differently from a regular list. Instead of one big array, it uses a chain of small arrays. This means removing from the front does NOT require scooting.

Here is a better queue using `deque`:

```python
from collections import deque
from typing import Any


class Queue:
    """A queue: First In, First Out (FIFO). Uses deque for efficiency."""

    def __init__(self) -> None:
        self._items: deque[Any] = deque()

    def enqueue(self, item: Any) -> None:
        """Add an item to the back of the queue. O(1)."""
        self._items.append(item)

    def dequeue(self) -> Any:
        """Remove and return the front item. O(1)."""
        if self.is_empty():
            raise IndexError("Cannot dequeue from an empty queue")
        return self._items.popleft()

    def peek(self) -> Any:
        """Return the front item without removing it. O(1)."""
        if self.is_empty():
            raise IndexError("Cannot peek at an empty queue")
        return self._items[0]

    def is_empty(self) -> bool:
        """Return True if the queue has no items."""
        return len(self._items) == 0

    def size(self) -> int:
        """Return the number of items in the queue."""
        return len(self._items)

    def display(self) -> str:
        """Show the queue from front to back."""
        return "Front -> " + " -> ".join(str(x) for x in self._items) + " -> Back"
```

The key difference: instead of `self._items.pop(0)` (which is O(n)), we use `self._items.popleft()` (which is O(1)). Now both `enqueue` and `dequeue` are O(1).

---

### Try It Out

```python
q: Queue = Queue()
q.enqueue("Alice")
q.enqueue("Bob")
q.enqueue("Charlie")
print(q.display())       # Front -> Alice -> Bob -> Charlie -> Back

print(q.peek())          # Alice (first in line)
print(q.dequeue())       # Alice (served and removed)
print(q.dequeue())       # Bob
print(q.display())       # Front -> Charlie -> Back
```

---

### Real Uses of Queues

**1. Print queue.** When you send multiple documents to a printer, they go into a queue. The first document sent is the first one printed.

**2. Message systems.** When a chat app receives messages, they go into a queue so they are processed in the order they arrived.

**3. Web servers.** When many people visit a website at the same time, their requests go into a queue. The server handles them one by one, first come first served.

**4. Breadth-first search.** When searching through a maze or a network, a queue keeps track of which paths to explore next. You explore paths in the order you discovered them. You will learn about this in a later lesson on graph algorithms.

---

## Stacks vs Queues: Side by Side

| Feature | Stack | Queue |
|---------|-------|-------|
| Order | Last In, First Out (LIFO) | First In, First Out (FIFO) |
| Add item | push (to the top) | enqueue (to the back) |
| Remove item | pop (from the top) | dequeue (from the front) |
| Real-world example | Stack of plates | Line at a movie theater |
| Common use | Undo button, bracket matching | Print queue, message systems |
| Add speed | O(1) | O(1) |
| Remove speed | O(1) | O(1) with deque, O(n) with plain list |

The choice is simple: if you want the most recent item first, use a stack. If you want the oldest item first, use a queue.

---

## Bonus: Building a Queue with Two Stacks

Here is a clever trick that gets asked in interviews. Can you build a queue using only stacks?

The idea: use two stacks. One is for enqueuing (the "in" stack), and one is for dequeuing (the "out" stack). When you need to dequeue but the "out" stack is empty, flip everything from the "in" stack to the "out" stack. Flipping reverses the order, which is exactly what you need to turn LIFO into FIFO.

```python
class QueueFromStacks:
    """A queue built using two stacks."""

    def __init__(self) -> None:
        self._in_stack: Stack = Stack()
        self._out_stack: Stack = Stack()

    def enqueue(self, item: Any) -> None:
        """Add an item to the back of the queue."""
        self._in_stack.push(item)

    def dequeue(self) -> Any:
        """Remove and return the front item."""
        if self._out_stack.is_empty():
            if self._in_stack.is_empty():
                raise IndexError("Cannot dequeue from an empty queue")
            # Move everything from in_stack to out_stack (reverses order)
            while not self._in_stack.is_empty():
                self._out_stack.push(self._in_stack.pop())
        return self._out_stack.pop()
```

Let us trace through it:

```
enqueue("Alice")   in_stack: [Alice]        out_stack: []
enqueue("Bob")     in_stack: [Alice, Bob]   out_stack: []
dequeue()          out_stack is empty, so move everything over:
                   in_stack: []             out_stack: [Bob, Alice]
                   Pop from out_stack: returns "Alice"
                   in_stack: []             out_stack: [Bob]
dequeue()          out_stack not empty, just pop:
                   returns "Bob"
```

First in, first out -- using only stacks!

![A flat vector illustration in a children's educational book style showing Byte the robot with two buckets of colorful balls, pouring balls from one bucket into another to reverse their order, with numbered balls showing the sequence changing. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Common Mistakes to Watch For

**1. Using a plain list for a queue.** `list.pop(0)` works but is O(n). For anything more than a small number of items, use `collections.deque` and `popleft()` instead.

**2. Not checking for empty.** Calling `pop()` on an empty stack or `dequeue()` on an empty queue will cause errors. Always check `is_empty()` first, or include a check in the method itself.

**3. Confusing push/pop with enqueue/dequeue.** Stacks use push/pop. Queues use enqueue/dequeue. Mixing up the names suggests you might be mixing up the structures.

**4. Adding and removing from the wrong end.** A stack adds and removes from the same end (the top). A queue adds to one end (back) and removes from the other (front). Getting this backward breaks the whole structure.

---

## Practice Questions

Try to answer these yourself before looking at the answers at the bottom of the page.

**1.** You push these items onto a stack in order: A, B, C, D. Then you pop twice. What two items come off, and in what order? What is left on the stack?

**2.** You enqueue these items into a queue in order: A, B, C, D. Then you dequeue twice. What two items come off, and in what order? What is left in the queue?

**3.** Explain in your own words why a stack is called "Last In, First Out" and a queue is called "First In, First Out."

**4.** Run the valid parentheses checker on the string `"{[}]"`. Trace through each character and show what happens on the stack. Is this string valid?

**5.** Why is `list.pop(0)` slow for queues, but `list.pop()` (no argument) is fast for stacks? What is different about removing from the front vs the end of a list?

**6.** Name two real-world examples of a stack and two real-world examples of a queue that were NOT mentioned in this lesson.

**7.** Write a function called `reverse_string(text: str) -> str` that uses a Stack to reverse a string. For example, `reverse_string("hello")` should return `"olleh"`. (Push each character onto the stack, then pop them all off.)

**8.** In the "Queue from Two Stacks" section, why does moving items from the in_stack to the out_stack reverse their order? Think about what happens when you pour items from one stack into another.

---

## Answers to Practice Questions

**1.** The first pop returns **D** (last item pushed), the second pop returns **C**. The stack now contains: `[A, B]` (A is at the bottom, B is on top). Remember, a stack always removes the most recently added item.

**2.** The first dequeue returns **A** (first item enqueued), the second dequeue returns **B**. The queue now contains: `Front -> [C, D] -> Back`. Remember, a queue always removes the item that has been waiting the longest.

**3.** A stack is "Last In, First Out" because the item you added most recently is always the one that comes off first -- like the top plate on a stack of plates. A queue is "First In, First Out" because the item that has been waiting the longest is the one that comes off first -- like the person at the front of a line who has been waiting the longest.

**4.** Tracing `"{[}]"`:
```
char '{':  push '{'           Stack: ['{']
char '[':  push '['           Stack: ['{', '[']
char '}':  pop '[', but '}' needs '{', not '['. Mismatch! Return False
```
The string is **NOT valid**. The `}` tries to close a `{`, but the top of the stack is `[`, which means the `[` was never properly closed first.

**5.** `list.pop()` removes from the end, which is O(1) because nothing else needs to move. `list.pop(0)` removes from the front, which is O(n) because every remaining item must scoot left by one position to fill the gap. This is because Python lists are dynamic arrays, and items are stored side by side in memory.

**6.** Stack examples: (a) A pile of books on a desk -- you put books on top and take from the top. (b) Nested folders on a computer -- you open folder after folder, and when you press "up" or "back," you return to the most recently opened folder first.

Queue examples: (a) Cars going through a drive-through -- the car that arrives first gets served first. (b) A playlist of songs -- the songs play in the order they were added.

(Any reasonable examples are correct as long as stacks follow LIFO order and queues follow FIFO order.)

**7.**
```python
def reverse_string(text: str) -> str:
    """Reverse a string using a stack."""
    stack: Stack = Stack()
    for char in text:
        stack.push(char)
    result: str = ""
    while not stack.is_empty():
        result += stack.pop()
    return result

print(reverse_string("hello"))  # olleh
```
We push each character onto the stack left to right. Then we pop them off. Since a stack reverses order (last in, first out), the characters come out in reverse.

**8.** When you pop items from the in_stack, they come off in reverse order (last in, first out). When you immediately push each one onto the out_stack, it reverses them again. But here is the trick: reversing a reversed sequence gives you the original order. The first item you put into the in_stack ends up at the top of the out_stack after the transfer, so it is the first item to come out when you pop from the out_stack. That is exactly FIFO behavior.

Think of it like pouring a stack of colored blocks from one tube into another. The block that was at the bottom of the first tube ends up at the top of the second tube.

---

**Previous:** [[wiki:python-jr-ds-linked-lists]] | **Next:** [[wiki:python-jr-ds-trees]]
