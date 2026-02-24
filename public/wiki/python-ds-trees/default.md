# Trees — Hierarchical Data

Every data structure you have built so far is **linear** — elements arranged one after another in a line. Arrays, linked lists, stacks, queues — all of them are sequences.

Trees break out of this. A tree organizes data in a **hierarchy** — like a family tree, a file system, or an organization chart. Each element can have multiple "children," and every child has exactly one "parent."

---

## What Is a Tree?

A tree is a collection of **nodes** connected by **edges**, with these rules:

1. There is exactly one **root** node (the top of the tree, no parent)
2. Every other node has exactly one parent
3. There are no cycles — you cannot follow edges and end up back where you started

```
        1           <-- root
       / \
      2   3         <-- children of 1
     / \   \
    4   5   6       <-- leaves (no children)
```

### Terminology

| Term | Meaning |
|------|---------|
| Root | The topmost node. No parent. |
| Leaf | A node with no children. |
| Parent | The node directly above another node. |
| Child | A node directly below another node. |
| Siblings | Nodes that share the same parent. |
| Height | The longest path from a node down to a leaf. |
| Depth | The distance from the root down to a node. |
| Subtree | Any node and all its descendants form a subtree. |

---

## Binary Trees

A **binary tree** is a tree where every node has **at most 2 children**: a left child and a right child.

This is the most important type of tree in programming. Almost every tree-based interview question involves binary trees.

```python
class TreeNode:
    """A node in a binary tree."""

    def __init__(self, value: int) -> None:
        self.value: int = value
        self.left: TreeNode | None = None
        self.right: TreeNode | None = None
```

That is it. A value, a left child, and a right child. Either child can be `None` (missing).

### Building a Tree by Hand

```python
#       10
#      /  \
#     5    15
#    / \     \
#   3   7    20

root: TreeNode = TreeNode(10)
root.left = TreeNode(5)
root.right = TreeNode(15)
root.left.left = TreeNode(3)
root.left.right = TreeNode(7)
root.right.right = TreeNode(20)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given this tree: root=10, left child=5, right child=15, 5 has children 3 and 7, 15 has right child 20. What is the height of the tree? What is the depth of node 7? Which nodes are leaves? Which node is the root?"</div>
</div>

---

## Tree Traversals

Traversal means visiting every node in the tree exactly once. There are four standard traversals, and you need to know all of them.

### In-Order Traversal (Left, Root, Right)

Visit the left subtree, then the current node, then the right subtree.

For a Binary Search Tree, in-order traversal gives you the elements in **sorted order**.

**Iterative implementation using a stack** (implement this first — it forces you to understand the mechanics):

```python
from typing import Any
from collections import deque


def inorder_iterative(root: TreeNode | None) -> list[int]:
    """In-order traversal using a stack. Left -> Root -> Right."""
    result: list[int] = []
    stack: list[TreeNode] = []
    current: TreeNode | None = root

    while current is not None or len(stack) > 0:
        # Go as far left as possible
        while current is not None:
            stack.append(current)
            current = current.left
        # Process the node
        current = stack.pop()
        result.append(current.value)
        # Move to the right subtree
        current = current.right

    return result
```

**Recursive implementation** (shorter, but understand the iterative version first):

```python
def inorder_recursive(root: TreeNode | None) -> list[int]:
    """In-order traversal using recursion."""
    if root is None:
        return []
    left: list[int] = inorder_recursive(root.left)
    middle: list[int] = [root.value]
    right: list[int] = inorder_recursive(root.right)
    return left + middle + right
```

### Pre-Order Traversal (Root, Left, Right)

Visit the current node first, then left subtree, then right subtree. Useful for copying a tree or serializing it.

```python
def preorder_iterative(root: TreeNode | None) -> list[int]:
    """Pre-order traversal using a stack. Root -> Left -> Right."""
    if root is None:
        return []
    result: list[int] = []
    stack: list[TreeNode] = [root]

    while len(stack) > 0:
        node: TreeNode = stack.pop()
        result.append(node.value)
        # Push right first so left is processed first (stack is LIFO)
        if node.right is not None:
            stack.append(node.right)
        if node.left is not None:
            stack.append(node.left)

    return result
```

### Post-Order Traversal (Left, Right, Root)

Visit left subtree, right subtree, then the current node. Useful for deleting a tree (delete children before parent).

```python
def postorder_recursive(root: TreeNode | None) -> list[int]:
    """Post-order traversal using recursion. Left -> Right -> Root."""
    if root is None:
        return []
    left: list[int] = postorder_recursive(root.left)
    right: list[int] = postorder_recursive(root.right)
    current: list[int] = [root.value]
    return left + right + current
```

### Level-Order Traversal (BFS)

Visit nodes level by level, left to right. Uses a **queue**, not a stack.

```python
def level_order(root: TreeNode | None) -> list[list[int]]:
    """Level-order traversal using BFS. Returns values grouped by level."""
    if root is None:
        return []
    result: list[list[int]] = []
    queue: deque[TreeNode] = deque([root])

    while len(queue) > 0:
        level_size: int = len(queue)
        level_values: list[int] = []

        for _ in range(level_size):
            node: TreeNode = queue.popleft()
            level_values.append(node.value)
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)

        result.append(level_values)

    return result
```

```python
# Using the tree:  10 -> [5, 15] -> [3, 7, 20]
print(level_order(root))  # [[10], [5, 15], [3, 7, 20]]
```

---

### Traversal Summary

```
        10
       /  \
      5    15
     / \     \
    3   7    20

In-order:    [3, 5, 7, 10, 15, 20]   (sorted!)
Pre-order:   [10, 5, 3, 7, 15, 20]   (root first)
Post-order:  [3, 7, 5, 20, 15, 10]   (root last)
Level-order: [[10], [5, 15], [3, 7, 20]]
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given a binary tree with root=1, left=2, right=3, 2 has children 4 and 5, 3 has children 6 and 7. Write out the in-order, pre-order, post-order, and level-order traversals. Then explain why in-order traversal gives sorted output for a Binary Search Tree."</div>
</div>

---

## Binary Search Tree (BST)

A BST is a binary tree with one extra rule: for every node, **all values in its left subtree are smaller**, and **all values in its right subtree are larger**.

```
        10
       /  \
      5    15      5 < 10 < 15   ✓
     / \     \
    3   7    20    3 < 5 < 7 ✓    15 < 20 ✓
```

This property makes searching very fast: at each node, you know whether to go left or right.

### Full BST Implementation

Open your editor. Implement each method yourself before looking at the code below.

```python
class BST:
    """A Binary Search Tree implemented from scratch."""

    def __init__(self) -> None:
        self.root: TreeNode | None = None

    def insert(self, value: int) -> None:
        """Insert a value into the BST."""
        if self.root is None:
            self.root = TreeNode(value)
            return

        current: TreeNode = self.root
        while True:
            if value < current.value:
                if current.left is None:
                    current.left = TreeNode(value)
                    return
                current = current.left
            elif value > current.value:
                if current.right is None:
                    current.right = TreeNode(value)
                    return
                current = current.right
            else:
                # Value already exists — do nothing (no duplicates)
                return

    def search(self, value: int) -> bool:
        """Search for a value. Return True if found."""
        current: TreeNode | None = self.root
        while current is not None:
            if value == current.value:
                return True
            elif value < current.value:
                current = current.left
            else:
                current = current.right
        return False

    def find_min(self, node: TreeNode) -> TreeNode:
        """Find the node with the minimum value in a subtree."""
        current: TreeNode = node
        while current.left is not None:
            current = current.left
        return current

    def delete(self, value: int) -> None:
        """Delete a value from the BST."""
        self.root = self._delete_recursive(self.root, value)

    def _delete_recursive(
        self, node: TreeNode | None, value: int
    ) -> TreeNode | None:
        """Recursively delete a node. Returns the updated subtree root."""
        if node is None:
            return None

        if value < node.value:
            node.left = self._delete_recursive(node.left, value)
        elif value > node.value:
            node.right = self._delete_recursive(node.right, value)
        else:
            # Found the node to delete. Three cases:

            # Case 1: Leaf node (no children)
            if node.left is None and node.right is None:
                return None

            # Case 2: One child
            if node.left is None:
                return node.right
            if node.right is None:
                return node.left

            # Case 3: Two children
            # Replace with the in-order successor (smallest in right subtree)
            successor: TreeNode = self.find_min(node.right)
            node.value = successor.value
            node.right = self._delete_recursive(node.right, successor.value)

        return node

    def inorder(self) -> list[int]:
        """Return all values in sorted order."""
        result: list[int] = []
        self._inorder_helper(self.root, result)
        return result

    def _inorder_helper(self, node: TreeNode | None, result: list[int]) -> None:
        if node is None:
            return
        self._inorder_helper(node.left, result)
        result.append(node.value)
        self._inorder_helper(node.right, result)
```

---

## Understanding BST Delete — The Hard Part

Deletion has three cases, and Case 3 trips up most people.

**Case 1: Deleting a leaf (no children).** Just remove it. Set the parent's pointer to `None`.

**Case 2: Deleting a node with one child.** Replace the node with its only child. The child takes its place.

**Case 3: Deleting a node with two children.** This is the tricky one. You cannot just remove the node — you would disconnect the tree. Instead:

1. Find the **in-order successor**: the smallest value in the right subtree
2. Copy that value into the node you want to delete
3. Delete the in-order successor (which has at most one child, so it falls into Case 1 or 2)

```
Delete 10:
        10               12
       /  \              /  \
      5    15    -->    5    15
     / \  /           / \  /
    3  7 12          3  7 (12 removed from here)
```

The in-order successor of 10 is 12 (smallest in the right subtree). Copy 12 into the root, then delete the original 12 node.

---

## Try It Out

```python
tree: BST = BST()
for v in [10, 5, 15, 3, 7, 12, 20]:
    tree.insert(v)

print(tree.inorder())     # [3, 5, 7, 10, 12, 15, 20]
print(tree.search(7))      # True
print(tree.search(99))     # False

tree.delete(5)
print(tree.inorder())     # [3, 7, 10, 12, 15, 20]
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Walk me through deleting the value 15 from a BST where 15 has two children: left=12 and right=20. Which node replaces 15? Show the tree before and after deletion."</div>
</div>

---

## BST Time Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

**Average case: O(log n).** At each step, you eliminate half the remaining nodes (go left or right). This is like binary search — if you have 1000 nodes, you need about 10 steps (log2(1000) ≈ 10).

**Worst case: O(n).** If you insert values in sorted order (1, 2, 3, 4, 5), the tree becomes a straight line — basically a linked list. Every operation must walk through all n nodes.

```
Balanced tree (good):     Degenerate tree (bad):
        4                  1
       / \                  \
      2   6                  2
     / \ / \                  \
    1  3 5  7                  3
                                \
                                 4
                                  \
                                   5
```

---

## Balanced Trees — Brief Introduction

To prevent the worst case, **self-balancing trees** automatically reorganize themselves to stay roughly balanced:

- **AVL Trees**: After every insert/delete, check if any node is "unbalanced" (left and right subtrees differ in height by more than 1). If so, rotate nodes to fix it.
- **Red-Black Trees**: Color each node red or black with specific rules that guarantee the tree stays approximately balanced.

Both guarantee O(log n) for all operations. Python's `sorted containers` library uses balanced trees. Java's `TreeMap` uses a Red-Black tree.

You do not need to implement these for most interviews, but you should know they exist and why.

---

## Common Interview Patterns

### Maximum Depth of a Binary Tree

```python
def max_depth(root: TreeNode | None) -> int:
    """Find the maximum depth (height) of a binary tree."""
    if root is None:
        return 0
    left_depth: int = max_depth(root.left)
    right_depth: int = max_depth(root.right)
    return 1 + max(left_depth, right_depth)
```

### Invert a Binary Tree

Swap every left and right child.

```python
def invert_tree(root: TreeNode | None) -> TreeNode | None:
    """Invert (mirror) a binary tree."""
    if root is None:
        return None
    root.left, root.right = root.right, root.left
    invert_tree(root.left)
    invert_tree(root.right)
    return root
```

### Validate a BST

Check that every node satisfies the BST property. The trick: each node must be within a valid range.

```python
def is_valid_bst(
    node: TreeNode | None,
    min_val: float = float("-inf"),
    max_val: float = float("inf"),
) -> bool:
    """Check if a binary tree is a valid BST."""
    if node is None:
        return True
    if node.value <= min_val or node.value >= max_val:
        return False
    return (
        is_valid_bst(node.left, min_val, node.value)
        and is_valid_bst(node.right, node.value, max_val)
    )
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me a coding challenge: implement a function that finds the lowest common ancestor of two nodes in a BST. For example, in a BST with values [6, 2, 8, 0, 4, 7, 9, 3, 5], the LCA of 2 and 8 is 6, and the LCA of 2 and 4 is 2. Use the BST property to solve it efficiently."</div>
</div>

---

## Where People Go Wrong

**1. Forgetting base cases in recursion.** Every recursive tree function must handle `if root is None`. Without this, you get `AttributeError` when you try to access `.left` or `.right` on `None`.

**2. Not understanding the BST property.** It is NOT just "left child < parent < right child." It is "ALL nodes in the left subtree < parent < ALL nodes in the right subtree." A common mistake is only checking immediate children.

**3. BST delete with two children.** The most complex operation in this section. Practice it on paper before coding. Draw the tree, find the successor, copy the value, delete the successor.

**4. Confusing height and depth.** Height goes down (root has the greatest height). Depth goes down from root (root has depth 0). They measure from opposite ends.

**5. Not considering the degenerate case.** If you insert [1, 2, 3, 4, 5] into a BST, you get a linked list. All operations become O(n). This is why balanced trees exist.

---

## Key Takeaways

1. A tree is a hierarchical structure with a root, and nodes that have children.
2. A binary tree has at most 2 children per node.
3. Four traversals: in-order, pre-order, post-order, level-order (BFS).
4. A BST orders elements: left subtree < root < right subtree.
5. BST operations are O(log n) on average, O(n) in the worst case.
6. BST deletion with two children uses the in-order successor.
7. Balanced trees (AVL, Red-Black) prevent the degenerate case.

---

**Previous:** [[wiki:python-ds-stacks-queues]] | **Next:** [[wiki:python-ds-heaps]]
