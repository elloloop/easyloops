# Trees -- Data That Branches Out

![A flat vector illustration in a children's educational book style showing Byte the robot standing next to a large upside-down tree diagram made of colorful connected circles, pointing at the top circle labeled as the root. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

So far, every data structure you have built -- arrays, linked lists, stacks, queues -- arranges data in a **line**. One thing comes after another, like beads on a string.

Trees are different. A tree lets data **branch out**. One piece of data can connect to two, three, or even more pieces below it. It looks like a tree growing downward -- or, more accurately, like an upside-down tree with the root at the top and the leaves at the bottom.

You have actually been using trees your whole life without knowing it!

---

## Trees Are Everywhere

### Your Computer's Folders

Think about how files are organized on a computer. You might have a folder called **Documents**. Inside Documents, there is a folder called **Photos**. Inside Photos, there is a folder called **Vacation**. That is a tree!

```
Documents
├── Photos
│   ├── Vacation
│   └── Birthday
├── Homework
│   ├── Math
│   └── Science
└── Games
```

**Documents** is at the top. It branches out into **Photos**, **Homework**, and **Games**. Then Photos branches out further into **Vacation** and **Birthday**. Each folder can contain more folders inside it -- branching out again and again.

### A Family Tree

Another example you probably know is a family tree. A grandparent is at the top, their children are below them, and their grandchildren are below that. Each person can have several children, and each child can have their own children.

```
        Grandma
        /     \
      Mom      Uncle
     /   \       \
   You  Sister  Cousin
```

This is exactly how a tree data structure works -- one thing at the top, connected to things below it, which connect to more things below them.

---

## Tree Vocabulary

Before we start building trees in Python, let us learn the words programmers use when talking about trees. There are just a few important ones.

| Word | What It Means |
|------|---------------|
| **Node** | Each circle in the tree. It holds a piece of data. |
| **Root** | The very top node. It has no parent -- it is the starting point. |
| **Leaf** | A node at the bottom that has no children below it. |
| **Parent** | A node that has other nodes connected below it. |
| **Child** | A node that is connected below another node. |
| **Siblings** | Nodes that share the same parent (like brothers and sisters). |
| **Height** | The longest path from a node all the way down to a leaf. |
| **Depth** | How far down a node is from the root (the root has depth 0). |

Here is a picture to show all of these:

```
        10          <-- root (depth 0, height 2)
       /  \
      5    15       <-- children of 10, siblings (depth 1)
     / \     \
    3   7    20     <-- leaves (depth 2, height 0)
```

In this tree:
- **10** is the root (the top node, no parent)
- **5** and **15** are children of 10 (and siblings of each other)
- **3**, **7**, and **20** are leaves (no children below them)
- The height of the whole tree is 2 (the longest path from root to leaf has 2 steps)
- Node **7** has depth 2 (it is 2 steps down from the root)

---

## What Is a Binary Tree?

A **binary tree** is a special kind of tree where each node has **at most 2 children** -- a left child and a right child. "Binary" means "two," so each node can branch into at most two directions.

This is the most common type of tree in programming. Almost everything we will do in this lesson uses binary trees.

![A flat vector illustration in a children's educational book style showing Byte the robot drawing a binary tree on a whiteboard, with each node shown as a colorful circle connected by lines, the left and right branches clearly visible. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

### Building a TreeNode in Python

Each node in a binary tree needs three things:
1. The **data** it holds (a number, for our examples)
2. A **left** child (or `None` if there is no left child)
3. A **right** child (or `None` if there is no right child)

```python
class TreeNode:
    """A single node in a binary tree."""

    def __init__(self, data: int) -> None:
        self.data: int = data
        self.left: TreeNode | None = None
        self.right: TreeNode | None = None
```

That is it! A tree node is surprisingly simple. It just holds a value and knows about its two possible children.

### Building a Tree by Hand

Let us create a small tree by connecting nodes together:

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

We start at the root (10) and attach children to it. Then we attach children to those children. Step by step, we build the whole tree.

---

## Binary Search Tree (BST) -- The Organized Tree

A regular binary tree can have its numbers in any order. A **Binary Search Tree** follows one special rule that makes it incredibly useful:

> **For every node: everything in the left subtree is smaller, and everything in the right subtree is bigger.**

```
        10
       /  \
      5    15      5 < 10 < 15  ✓
     / \     \
    3   7    20    3 < 5 < 7 ✓    15 < 20 ✓
```

Every single number on the left side of 10 (which includes 5, 3, and 7) is smaller than 10. Every number on the right side (15 and 20) is bigger than 10. And this rule applies to every node -- not just the root.

### Why Is This Useful?

Think about a guessing game. Someone picks a number between 1 and 100, and you have to guess it. After each guess, they tell you "higher" or "lower."

If they pick 73:
- You guess 50. "Higher!" (now you know it is between 51 and 100)
- You guess 75. "Lower!" (now you know it is between 51 and 74)
- You guess 62. "Higher!" (now you know it is between 63 and 74)

Each guess **cuts the possibilities in half**. That is exactly how a BST works! When you search for a number, you compare it with the current node. If it is smaller, go left. If it is bigger, go right. You cut the remaining tree in half with every step.

This makes searching **really fast**. In a list of 1000 items, you might need to check all 1000. In a BST with 1000 items, you only need about 10 steps!

---

## Building a BST Class

Now let us build a complete Binary Search Tree with the ability to insert, search, and delete values.

```python
class BST:
    """A Binary Search Tree."""

    def __init__(self) -> None:
        self.root: TreeNode | None = None

    def insert(self, value: int) -> None:
        """Add a value to the tree in the correct position."""
        if self.root is None:
            self.root = TreeNode(value)
            return

        current: TreeNode = self.root
        while True:
            if value < current.data:
                # Value is smaller, go left
                if current.left is None:
                    current.left = TreeNode(value)
                    return
                current = current.left
            elif value > current.data:
                # Value is bigger, go right
                if current.right is None:
                    current.right = TreeNode(value)
                    return
                current = current.right
            else:
                # Value already exists, do nothing
                return

    def search(self, value: int) -> bool:
        """Look for a value in the tree. Return True if found."""
        current: TreeNode | None = self.root
        while current is not None:
            if value == current.data:
                return True
            elif value < current.data:
                current = current.left
            else:
                current = current.right
        return False

    def find_min(self, node: TreeNode) -> TreeNode:
        """Find the node with the smallest value starting from a given node."""
        current: TreeNode = node
        while current.left is not None:
            current = current.left
        return current

    def delete(self, value: int) -> None:
        """Remove a value from the tree."""
        self.root = self._delete_helper(self.root, value)

    def _delete_helper(
        self, node: TreeNode | None, value: int
    ) -> TreeNode | None:
        """Remove a value and return the updated subtree."""
        if node is None:
            return None

        if value < node.data:
            node.left = self._delete_helper(node.left, value)
        elif value > node.data:
            node.right = self._delete_helper(node.right, value)
        else:
            # We found the node to delete! Three possible situations:

            # Situation 1: The node is a leaf (no children). Just remove it.
            if node.left is None and node.right is None:
                return None

            # Situation 2: The node has one child. Replace it with that child.
            if node.left is None:
                return node.right
            if node.right is None:
                return node.left

            # Situation 3: The node has two children.
            # Find the smallest value in the right subtree (the next bigger number).
            # Copy that value here, then delete the original.
            successor: TreeNode = self.find_min(node.right)
            node.data = successor.data
            node.right = self._delete_helper(node.right, successor.data)

        return node
```

### Let Us Try It Out

```python
tree: BST = BST()
for number in [10, 5, 15, 3, 7, 12, 20]:
    tree.insert(number)

# The tree now looks like:
#        10
#       /  \
#      5    15
#     / \  /  \
#    3  7 12  20

print(tree.search(7))    # True -- 7 is in the tree
print(tree.search(99))   # False -- 99 is not in the tree

tree.delete(5)
print(tree.search(5))    # False -- 5 has been removed
```

---

## Tree Traversals -- Four Ways to Visit Every Node

Sometimes you need to visit every node in a tree. But unlike a list (where you just go from start to end), a tree branches in multiple directions. There are four standard ways to walk through a tree, and each one visits the nodes in a different order.

![A flat vector illustration in a children's educational book style showing Byte the robot following different colored arrow paths through a tree structure, with four different colored paths showing the four different traversal orders. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

We will use this tree for all our examples:

```
        10
       /  \
      5    15
     / \     \
    3   7    20
```

### 1. In-Order Traversal (Left, Current, Right)

Visit everything on the left first, then the current node, then everything on the right.

For a BST, this gives you the numbers in **sorted order** -- smallest to biggest!

```python
def in_order(node: TreeNode | None) -> list[int]:
    """Visit left, then current, then right."""
    if node is None:
        return []
    left_values: list[int] = in_order(node.left)
    current_value: list[int] = [node.data]
    right_values: list[int] = in_order(node.right)
    return left_values + current_value + right_values
```

```python
print(in_order(root))  # [3, 5, 7, 10, 15, 20] -- sorted!
```

### 2. Pre-Order Traversal (Current, Left, Right)

Visit the current node first, then everything on the left, then everything on the right.

This is useful when you want to copy a tree -- you process the parent before its children.

```python
def pre_order(node: TreeNode | None) -> list[int]:
    """Visit current, then left, then right."""
    if node is None:
        return []
    current_value: list[int] = [node.data]
    left_values: list[int] = pre_order(node.left)
    right_values: list[int] = pre_order(node.right)
    return current_value + left_values + right_values
```

```python
print(pre_order(root))  # [10, 5, 3, 7, 15, 20] -- root first
```

### 3. Post-Order Traversal (Left, Right, Current)

Visit everything on the left, then everything on the right, then the current node last.

This is useful when you want to delete a tree -- you delete children before their parent.

```python
def post_order(node: TreeNode | None) -> list[int]:
    """Visit left, then right, then current."""
    if node is None:
        return []
    left_values: list[int] = post_order(node.left)
    right_values: list[int] = post_order(node.right)
    current_value: list[int] = [node.data]
    return left_values + right_values + current_value
```

```python
print(post_order(root))  # [3, 7, 5, 20, 15, 10] -- root last
```

### 4. Level-Order Traversal (Layer by Layer)

Visit all nodes on the first level, then all nodes on the second level, then the third, and so on. This uses a **queue** -- remember queues from the last lesson?

```python
from collections import deque

def level_order(node: TreeNode | None) -> list[list[int]]:
    """Visit nodes level by level, left to right."""
    if node is None:
        return []

    result: list[list[int]] = []
    queue: deque[TreeNode] = deque([node])

    while len(queue) > 0:
        level_size: int = len(queue)
        current_level: list[int] = []

        for _ in range(level_size):
            current_node: TreeNode = queue.popleft()
            current_level.append(current_node.data)

            if current_node.left is not None:
                queue.append(current_node.left)
            if current_node.right is not None:
                queue.append(current_node.right)

        result.append(current_level)

    return result
```

```python
print(level_order(root))  # [[10], [5, 15], [3, 7, 20]]
```

### Traversal Summary

```
        10
       /  \
      5    15
     / \     \
    3   7    20

In-order:    [3, 5, 7, 10, 15, 20]        (sorted!)
Pre-order:   [10, 5, 3, 7, 15, 20]        (root first)
Post-order:  [3, 7, 5, 20, 15, 10]        (root last)
Level-order: [[10], [5, 15], [3, 7, 20]]  (layer by layer)
```

---

## Finding the Maximum Depth

A very common tree problem is finding how deep (or tall) a tree is. The **maximum depth** is the number of steps from the root to the farthest leaf.

The trick is to think about it step by step: the depth of a tree is 1 (for the current node) plus the depth of whichever child is deeper.

```python
def max_depth(node: TreeNode | None) -> int:
    """Find the maximum depth of a binary tree."""
    if node is None:
        return 0
    left_depth: int = max_depth(node.left)
    right_depth: int = max_depth(node.right)
    return 1 + max(left_depth, right_depth)
```

```python
print(max_depth(root))  # 3 (root -> 5 -> 3 is 3 levels)
```

This is an example of **recursion** -- the function calls itself on smaller parts of the tree. Each call handles one node, and the answers bubble back up to give you the final result.

---

## Practice Questions

Try to answer each question on your own before looking at the answers at the bottom of this page.

**Question 1.** Look at this tree:

```
        8
       / \
      4   12
     / \    \
    2   6   14
```

What is the root? Which nodes are leaves? What is the depth of node 6? What is the height of the whole tree?

**Question 2.** Is the tree in Question 1 a valid Binary Search Tree? Explain why or why not by checking the BST rule for each node.

**Question 3.** You insert the values 20, 10, 30, 5, 15 into an empty BST (in that order). Draw the tree that results.

**Question 4.** Using the tree from Question 1, write out the results of all four traversals:
- In-order
- Pre-order
- Post-order
- Level-order

**Question 5.** If you have a BST with 1000 nodes that is nicely balanced, about how many steps does it take to search for a value? What if the tree is completely lopsided (like a straight line)?

**Question 6.** Write a function called `count_nodes` that counts the total number of nodes in a binary tree. It should work like this:

```python
print(count_nodes(root))  # prints the total number of nodes
```

Hint: An empty tree has 0 nodes. A non-empty tree has 1 (the current node) plus all the nodes in the left subtree plus all the nodes in the right subtree.

**Question 7.** Explain in your own words why deleting a node with two children from a BST is trickier than deleting a leaf or a node with one child. What strategy do we use to handle it?

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a desk with a notebook, thinking about tree diagrams shown in thought bubbles above its head. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Key Takeaways

1. A **tree** organizes data in a hierarchy -- one root at the top, branching out into children below.
2. A **binary tree** allows each node to have at most two children (left and right).
3. A **Binary Search Tree** keeps things organized: left is smaller, right is bigger. This makes searching fast.
4. There are **four ways to traverse** a tree: in-order, pre-order, post-order, and level-order.
5. **In-order traversal** of a BST gives you the values in sorted order.
6. **Level-order traversal** uses a queue to visit nodes layer by layer.
7. Many tree problems use **recursion** -- solving a big tree problem by solving smaller sub-tree problems.

---

**Previous:** [[wiki:python-jr-ds-stacks-queues]] | **Next:** [[wiki:python-jr-ds-heaps]]

---

## Answers to Practice Questions

**Answer 1.** The root is **8** (the topmost node). The leaves are **2**, **6**, and **14** (they have no children). The depth of node 6 is **2** (it takes 2 steps to get from the root down to 6: root 8 -> 4 -> 6). The height of the whole tree is **2** (the longest path from root to any leaf is 2 steps).

**Answer 2.** Yes, it is a valid BST. Let us check every node:
- **8** (root): Everything on the left (4, 2, 6) is smaller than 8. Everything on the right (12, 14) is bigger than 8. Valid.
- **4**: Its left child is 2 (smaller than 4) and its right child is 6 (bigger than 4). Valid.
- **12**: It has no left child, and its right child is 14 (bigger than 12). Valid.
- **2**, **6**, **14**: These are leaves with no children, so the BST rule is automatically satisfied.

**Answer 3.** Inserting 20, 10, 30, 5, 15 in that order:

```
        20
       /  \
     10    30
    /  \
   5   15
```

First 20 becomes the root. Then 10 is smaller, so it goes left. 30 is bigger, so it goes right. 5 is smaller than 20 and smaller than 10, so it goes to the left of 10. 15 is smaller than 20 but bigger than 10, so it goes to the right of 10.

**Answer 4.** For the tree in Question 1:

```
        8
       / \
      4   12
     / \    \
    2   6   14
```

- **In-order** (left, current, right): [2, 4, 6, 8, 12, 14] -- notice it is sorted!
- **Pre-order** (current, left, right): [8, 4, 2, 6, 12, 14]
- **Post-order** (left, right, current): [2, 6, 4, 14, 12, 8]
- **Level-order** (layer by layer): [[8], [4, 12], [2, 6, 14]]

**Answer 5.** With a nicely balanced BST of 1000 nodes, searching takes about **10 steps** (because log2(1000) is roughly 10). Each step cuts the remaining possibilities in half. But if the tree is completely lopsided (a straight line), it could take up to **1000 steps** -- you would have to walk through every single node, just like searching through a list.

**Answer 6.**

```python
def count_nodes(node: TreeNode | None) -> int:
    """Count the total number of nodes in a binary tree."""
    if node is None:
        return 0
    left_count: int = count_nodes(node.left)
    right_count: int = count_nodes(node.right)
    return 1 + left_count + right_count
```

This works just like `max_depth`, but instead of finding the deepest path, we add up all the nodes. An empty tree has 0 nodes. A non-empty tree has 1 (itself) plus all the nodes in its left subtree plus all the nodes in its right subtree.

**Answer 7.** Deleting a leaf is easy -- you just remove it. Deleting a node with one child is also straightforward -- you replace the deleted node with its only child. But deleting a node with **two children** is tricky because you cannot just remove it -- that would disconnect part of the tree. You would have two subtrees floating with no parent.

The strategy is to find the **in-order successor** -- the smallest value in the right subtree (the next number that would come after the deleted node in sorted order). You copy that successor's value into the node you want to delete, and then you delete the successor node instead. The successor is guaranteed to have at most one child, so deleting it falls back into the easy cases.
