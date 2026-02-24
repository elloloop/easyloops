# Graphs — Networks of Connections

Every data structure you have built so far has a specific shape. Arrays are linear. Trees are hierarchical with one parent per node. But what about data where anything can connect to anything? Friendships on social media. Roads between cities. Dependencies between tasks. Links between web pages.

That is what graphs are for. A graph is the most general data structure for representing **relationships** between things.

---

## What Is a Graph?

A graph is a collection of:

- **Vertices** (also called nodes) — the things
- **Edges** — the connections between things

```
    A --- B
    |     |
    C --- D --- E
```

This graph has 5 vertices (A, B, C, D, E) and 5 edges (A-B, A-C, B-D, C-D, D-E).

Unlike a tree, there is no "root." Any vertex can connect to any other vertex. Vertices can have any number of connections. There can even be cycles (A -> B -> D -> C -> A).

---

## Types of Graphs

### Directed vs Undirected

**Undirected**: edges go both ways. If A connects to B, then B connects to A. Like friendships — if Alice is friends with Bob, Bob is friends with Alice.

```
A --- B       A is connected to B, and B is connected to A
```

**Directed**: edges have a direction. A points to B does NOT mean B points to A. Like following on Twitter — Alice can follow Bob without Bob following Alice.

```
A --> B       A points to B, but B does NOT point to A
```

### Weighted vs Unweighted

**Unweighted**: all edges are equal. There is a connection, or there is not.

**Weighted**: each edge has a number (weight/cost). Used for distances, costs, or capacities.

```
A --5-- B     The edge from A to B has weight 5
  \    /
   3  2
    \ /
     C
```

### Cyclic vs Acyclic

**Cyclic**: contains at least one cycle (you can follow edges and return to where you started).

**Acyclic**: no cycles. A tree is a connected acyclic graph. A **DAG** (Directed Acyclic Graph) is common in task scheduling — you cannot have circular dependencies.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Give me an example of each: (1) an undirected unweighted graph, (2) a directed unweighted graph, (3) a directed weighted graph. For each one, name a real-world scenario it models. What makes a tree a special case of a graph?"</div>
</div>

---

## How to Represent a Graph in Code

There are three common ways to store a graph. Each has tradeoffs.

### 1. Adjacency List (Most Common)

For each vertex, store a list of its neighbors. In Python, use a dictionary.

```python
# Undirected graph
graph: dict[str, list[str]] = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D"],
}
```

This says: A is connected to B and C. B is connected to A and D. And so on. For an undirected graph, if A lists B as a neighbor, B must also list A.

**Memory**: O(V + E) where V is vertices and E is edges.
**Check if edge exists**: O(degree) — scan the neighbor list.
**Best for**: most real-world graphs, which are **sparse** (few edges relative to vertices).

### 2. Adjacency Matrix

A 2D array where `matrix[i][j] = 1` means there is an edge from vertex i to vertex j.

```python
#       A  B  C  D  E
# A  [  0, 1, 1, 0, 0 ]
# B  [  1, 0, 0, 1, 0 ]
# C  [  1, 0, 0, 1, 0 ]
# D  [  0, 1, 1, 0, 1 ]
# E  [  0, 0, 0, 1, 0 ]

matrix: list[list[int]] = [
    [0, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0],
]
```

**Memory**: O(V^2) — always, even if there are few edges.
**Check if edge exists**: O(1) — just look up `matrix[i][j]`.
**Best for**: **dense** graphs (many edges) or when you need fast edge lookup.

### 3. Edge List

Just a list of all edges. Simple but limited.

```python
edges: list[tuple[str, str]] = [
    ("A", "B"),
    ("A", "C"),
    ("B", "D"),
    ("C", "D"),
    ("D", "E"),
]
```

**Memory**: O(E).
**Check if edge exists**: O(E) — scan the entire list.
**Best for**: algorithms that process all edges (like Kruskal's MST).

---

### When to Use Which

| Situation | Best Representation |
|-----------|-------------------|
| Most problems (sparse graph) | Adjacency list |
| Dense graph, need fast edge check | Adjacency matrix |
| Just need to iterate over edges | Edge list |
| Grid problems (2D board) | Implicit graph (matrix) |

For interviews, **adjacency list** is the default choice. Use it unless you have a specific reason not to.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "A social network has 1 million users and each user has about 200 friends. Should you use an adjacency list or adjacency matrix? How much memory would each use? What about a small network of 10 users where everyone knows everyone?"</div>
</div>

---

## Implement a Graph Class from Scratch

Open your editor. Implement each method yourself before looking at the solution.

```python
class Graph:
    """An undirected, unweighted graph using an adjacency list."""

    def __init__(self) -> None:
        self._adjacency_list: dict[str, list[str]] = {}

    def add_vertex(self, vertex: str) -> None:
        """Add a vertex to the graph."""
        if vertex not in self._adjacency_list:
            self._adjacency_list[vertex] = []

    def add_edge(self, vertex1: str, vertex2: str) -> None:
        """Add an undirected edge between two vertices."""
        # Add vertices if they don't exist
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)

        # Add each vertex to the other's neighbor list
        if vertex2 not in self._adjacency_list[vertex1]:
            self._adjacency_list[vertex1].append(vertex2)
        if vertex1 not in self._adjacency_list[vertex2]:
            self._adjacency_list[vertex2].append(vertex1)

    def remove_edge(self, vertex1: str, vertex2: str) -> None:
        """Remove the edge between two vertices."""
        if vertex1 in self._adjacency_list and vertex2 in self._adjacency_list:
            if vertex2 in self._adjacency_list[vertex1]:
                self._adjacency_list[vertex1].remove(vertex2)
            if vertex1 in self._adjacency_list[vertex2]:
                self._adjacency_list[vertex2].remove(vertex1)

    def remove_vertex(self, vertex: str) -> None:
        """Remove a vertex and all its edges."""
        if vertex not in self._adjacency_list:
            return

        # Remove this vertex from all neighbor lists
        for neighbor in self._adjacency_list[vertex]:
            self._adjacency_list[neighbor].remove(vertex)

        # Remove the vertex itself
        del self._adjacency_list[vertex]

    def get_neighbors(self, vertex: str) -> list[str]:
        """Get all neighbors of a vertex."""
        if vertex not in self._adjacency_list:
            return []
        return self._adjacency_list[vertex]

    def has_edge(self, vertex1: str, vertex2: str) -> bool:
        """Check if an edge exists between two vertices."""
        if vertex1 not in self._adjacency_list:
            return False
        return vertex2 in self._adjacency_list[vertex1]

    def get_vertices(self) -> list[str]:
        """Return all vertices."""
        return list(self._adjacency_list.keys())

    def display(self) -> str:
        """Show the adjacency list."""
        lines: list[str] = []
        for vertex, neighbors in self._adjacency_list.items():
            lines.append(f"  {vertex}: {neighbors}")
        return "{\n" + "\n".join(lines) + "\n}"
```

---

## Try It Out

```python
g: Graph = Graph()
g.add_edge("A", "B")
g.add_edge("A", "C")
g.add_edge("B", "D")
g.add_edge("C", "D")
g.add_edge("D", "E")

print(g.display())
# {
#   A: ['B', 'C']
#   B: ['A', 'D']
#   C: ['A', 'D']
#   D: ['B', 'C', 'E']
#   E: ['D']
# }

print(g.get_neighbors("D"))    # ['B', 'C', 'E']
print(g.has_edge("A", "D"))    # False
print(g.has_edge("A", "B"))    # True

g.remove_edge("A", "B")
print(g.has_edge("A", "B"))    # False
```

---

## Graph Traversals

Just like tree traversals, graph traversals visit every vertex. But graphs can have cycles, so you **must track which vertices you have already visited**. Otherwise you loop forever.

### Breadth-First Search (BFS)

BFS explores the graph **level by level**. It visits all vertices at distance 1, then distance 2, then distance 3, and so on. Uses a **queue**.

```python
from collections import deque


def bfs(graph: dict[str, list[str]], start: str) -> list[str]:
    """Breadth-first search from a starting vertex."""
    visited: set[str] = set()
    queue: deque[str] = deque([start])
    visited.add(start)
    order: list[str] = []

    while len(queue) > 0:
        vertex: str = queue.popleft()
        order.append(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order
```

```python
graph: dict[str, list[str]] = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D"],
}

print(bfs(graph, "A"))  # ['A', 'B', 'C', 'D', 'E']
```

**How it works:**

1. Start at A. Queue: [A]. Visited: {A}.
2. Process A. Neighbors B, C not visited. Queue: [B, C]. Visited: {A, B, C}.
3. Process B. Neighbor D not visited. Queue: [C, D]. Visited: {A, B, C, D}.
4. Process C. All neighbors already visited. Queue: [D].
5. Process D. Neighbor E not visited. Queue: [E]. Visited: {A, B, C, D, E}.
6. Process E. All neighbors already visited. Queue: []. Done.

BFS is great for finding the **shortest path** in an unweighted graph.

---

### Depth-First Search (DFS)

DFS explores as **deep as possible** before backtracking. Uses a **stack** (or recursion, which uses the call stack).

**Iterative DFS with an explicit stack** (implement this first):

```python
def dfs(graph: dict[str, list[str]], start: str) -> list[str]:
    """Depth-first search using an explicit stack."""
    visited: set[str] = set()
    stack: list[str] = [start]
    order: list[str] = []

    while len(stack) > 0:
        vertex: str = stack.pop()
        if vertex in visited:
            continue
        visited.add(vertex)
        order.append(vertex)

        # Add neighbors to stack (reversed so we visit in order)
        for neighbor in reversed(graph[vertex]):
            if neighbor not in visited:
                stack.append(neighbor)

    return order
```

```python
print(dfs(graph, "A"))  # ['A', 'B', 'D', 'C', 'E'] (order may vary)
```

**Recursive DFS** (shorter but uses call stack):

```python
def dfs_recursive(
    graph: dict[str, list[str]],
    vertex: str,
    visited: set[str] | None = None,
) -> list[str]:
    """Depth-first search using recursion."""
    if visited is None:
        visited = set()

    visited.add(vertex)
    order: list[str] = [vertex]

    for neighbor in graph[vertex]:
        if neighbor not in visited:
            order.extend(dfs_recursive(graph, neighbor, visited))

    return order
```

---

### BFS vs DFS — When to Use Which

| Feature | BFS | DFS |
|---------|-----|-----|
| Data structure | Queue | Stack |
| Explores | Level by level | As deep as possible |
| Finds shortest path | Yes (unweighted) | No |
| Memory usage | More (stores entire frontier) | Less (stores single path) |
| Use for | Shortest path, nearest neighbor | Cycle detection, topological sort |

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given a graph with vertices A-F where edges are: A-B, A-C, B-D, C-E, D-F, E-F. Trace through both BFS and DFS starting from A. Show the queue/stack contents and the visited set at each step. Which traversal finds the shortest path from A to F?"</div>
</div>

---

## Directed Graphs

In a directed graph, edges have a direction. An edge from A to B does not imply an edge from B to A.

```python
class DiGraph:
    """A directed graph using an adjacency list."""

    def __init__(self) -> None:
        self._adjacency_list: dict[str, list[str]] = {}

    def add_vertex(self, vertex: str) -> None:
        if vertex not in self._adjacency_list:
            self._adjacency_list[vertex] = []

    def add_edge(self, source: str, destination: str) -> None:
        """Add a directed edge from source to destination."""
        self.add_vertex(source)
        self.add_vertex(destination)
        if destination not in self._adjacency_list[source]:
            self._adjacency_list[source].append(destination)
        # Note: we do NOT add source to destination's list

    def get_neighbors(self, vertex: str) -> list[str]:
        if vertex not in self._adjacency_list:
            return []
        return self._adjacency_list[vertex]

    def has_edge(self, source: str, destination: str) -> bool:
        if source not in self._adjacency_list:
            return False
        return destination in self._adjacency_list[source]
```

The only difference from the undirected graph: `add_edge` only adds in one direction.

---

## Weighted Graphs

For weighted graphs, store the weight alongside each neighbor.

```python
class WeightedGraph:
    """A weighted undirected graph."""

    def __init__(self) -> None:
        self._adjacency_list: dict[str, list[tuple[str, int]]] = {}

    def add_vertex(self, vertex: str) -> None:
        if vertex not in self._adjacency_list:
            self._adjacency_list[vertex] = []

    def add_edge(self, vertex1: str, vertex2: str, weight: int) -> None:
        """Add a weighted undirected edge."""
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self._adjacency_list[vertex1].append((vertex2, weight))
        self._adjacency_list[vertex2].append((vertex1, weight))

    def get_neighbors(self, vertex: str) -> list[tuple[str, int]]:
        if vertex not in self._adjacency_list:
            return []
        return self._adjacency_list[vertex]
```

```python
wg: WeightedGraph = WeightedGraph()
wg.add_edge("A", "B", 5)
wg.add_edge("A", "C", 3)
wg.add_edge("B", "C", 2)

print(wg.get_neighbors("A"))  # [('B', 5), ('C', 3)]
```

---

## Common Graph Concepts

**Degree**: the number of edges connected to a vertex. In a directed graph, there is **in-degree** (edges coming in) and **out-degree** (edges going out).

**Path**: a sequence of vertices where each consecutive pair is connected by an edge. Example: A -> B -> D -> E.

**Cycle**: a path that starts and ends at the same vertex. Example: A -> B -> D -> C -> A.

**Connected components**: groups of vertices where every vertex is reachable from every other vertex in the group. An undirected graph can have multiple disconnected components.

```python
def find_connected_components(graph: dict[str, list[str]]) -> list[list[str]]:
    """Find all connected components using BFS."""
    visited: set[str] = set()
    components: list[list[str]] = []

    for vertex in graph:
        if vertex not in visited:
            # BFS to find all vertices in this component
            component: list[str] = []
            queue: deque[str] = deque([vertex])
            visited.add(vertex)

            while len(queue) > 0:
                current: str = queue.popleft()
                component.append(current)
                for neighbor in graph[current]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)

            components.append(component)

    return components
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is the difference between a connected component and a path? Given a graph with edges A-B, B-C, D-E (notice D-E is disconnected from A-B-C), how many connected components are there? Write out which vertices belong to each component."</div>
</div>

---

## Common Interview Patterns

### Number of Islands (Grid as Graph)

A grid of 1s and 0s. Connected groups of 1s form "islands." Count them.

```python
def num_islands(grid: list[list[str]]) -> int:
    """Count the number of islands in a grid. BFS approach."""
    if len(grid) == 0:
        return 0

    rows: int = len(grid)
    cols: int = len(grid[0])
    count: int = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                # BFS to mark all connected land as visited
                queue: deque[tuple[int, int]] = deque([(r, c)])
                grid[r][c] = "0"  # Mark as visited

                while len(queue) > 0:
                    row: int
                    col: int
                    row, col = queue.popleft()
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr: int = row + dr
                        nc: int = col + dc
                        if (
                            0 <= nr < rows
                            and 0 <= nc < cols
                            and grid[nr][nc] == "1"
                        ):
                            grid[nr][nc] = "0"
                            queue.append((nr, nc))

    return count
```

The key insight: a 2D grid IS a graph. Each cell is a vertex. Each cell is connected to its 4 neighbors (up, down, left, right). Finding islands = finding connected components.

### Cycle Detection (Course Schedule)

Given a list of courses and prerequisites, determine if it is possible to finish all courses (no circular dependencies).

```python
def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    """Check if all courses can be finished (no cycles in directed graph)."""
    # Build adjacency list
    graph: dict[int, list[int]] = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # Track state: 0=unvisited, 1=in current path, 2=completed
    state: list[int] = [0] * num_courses

    def has_cycle(vertex: int) -> bool:
        if state[vertex] == 1:
            return True   # Found a cycle
        if state[vertex] == 2:
            return False  # Already fully explored

        state[vertex] = 1  # Mark as "in current path"
        for neighbor in graph[vertex]:
            if has_cycle(neighbor):
                return True
        state[vertex] = 2  # Mark as "completed"
        return False

    for course in range(num_courses):
        if has_cycle(course):
            return False
    return True
```

```python
print(can_finish(4, [[1, 0], [2, 1], [3, 2]]))  # True: 0->1->2->3
print(can_finish(2, [[0, 1], [1, 0]]))            # False: 0->1->0 (cycle)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Explain how a 2D grid is secretly a graph. If I have a 3x3 grid, how many vertices and edges does the corresponding graph have? What are the neighbors of the center cell? Why is BFS on a grid the same as BFS on a graph?"</div>
</div>

---

## Where People Go Wrong

**1. Forgetting the visited set.** Without tracking visited vertices, BFS and DFS loop forever on graphs with cycles. EVERY graph traversal needs a visited set. Trees do not have this problem because trees have no cycles.

**2. Directed vs undirected confusion.** In an undirected graph, adding edge A-B means adding A to B's list AND B to A's list. In a directed graph, only one direction. Mixing these up gives wrong results.

**3. Adjacency matrix vs list choice.** Using a matrix for a sparse graph wastes enormous memory. A social network with 1 million users and 200 friends each: matrix = 10^12 entries, list = 2 * 10^8 entries.

**4. Not handling disconnected graphs.** BFS/DFS from a single vertex only reaches vertices in the same connected component. To visit ALL vertices, you must start BFS/DFS from every unvisited vertex.

**5. Off-by-one in grid problems.** When checking neighbors in a grid, always verify bounds: `0 <= row < rows and 0 <= col < cols`. Forgetting this gives `IndexError`.

**6. Modifying the graph during traversal.** If you add or remove edges while iterating over neighbors, you get unpredictable behavior. Work on a copy or use a separate data structure for changes.

---

## Comprehensive Review: All Data Structures

You have now built every fundamental data structure from scratch. Here is a summary to tie it all together.

| Data Structure | Access | Insert | Delete | Search | Best For |
|----------------|--------|--------|--------|--------|----------|
| Array | O(1) by index | O(n) middle, O(1) end | O(n) middle, O(1) end | O(n) | Random access, iteration |
| Linked List | O(n) | O(1) at ends | O(1) with reference | O(n) | Frequent insert/delete at ends |
| Stack | O(1) top only | O(1) push | O(1) pop | O(n) | LIFO: undo, DFS, parsing |
| Queue | O(1) front only | O(1) enqueue | O(1) dequeue | O(n) | FIFO: BFS, scheduling |
| BST | O(log n) avg | O(log n) avg | O(log n) avg | O(log n) avg | Sorted data, range queries |
| Heap | O(1) min/max | O(log n) | O(log n) extract | O(n) | Priority queue, kth element |
| Hash Table | N/A | O(1) avg | O(1) avg | O(1) avg by key | Fast lookup by key |
| Graph | Depends | O(1) edge | O(degree) | O(V + E) traversal | Relationships, networks |

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I am going to describe 7 real-world scenarios. For each one, tell me which data structure is the best choice and why:
1. Browser back/forward buttons
2. Finding the shortest route between two cities
3. Checking if a username already exists (millions of users)
4. Processing customer support tickets in order
5. Autocomplete suggestions (sorted list of words)
6. Task scheduler that always runs the highest-priority task
7. Storing a playlist of songs where you frequently add and remove from the middle

For each answer, state the data structure, its time complexity for the key operation, and why the alternatives are worse."</div>
</div>

---

## Key Takeaways

1. A graph is vertices connected by edges. The most general data structure for relationships.
2. Directed graphs have one-way edges. Undirected graphs have two-way edges.
3. Adjacency list is the default representation. Use it unless you have a reason not to.
4. BFS uses a queue and finds shortest paths. DFS uses a stack and goes deep first.
5. Always use a visited set in graph traversals to avoid infinite loops.
6. Grids are graphs in disguise. Each cell connects to its neighbors.
7. You have now built arrays, linked lists, stacks, queues, trees, heaps, hash tables, and graphs from scratch. You understand how they work, not just how to use them.

---

**Previous:** [[wiki:python-ds-hash-tables]] | **Next:** [[wiki:python-algo-sorting]]
