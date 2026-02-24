# Graph Algorithms -- Traversing and Optimizing Networks

You learned how to represent graphs in the data structures section. Now you learn the classic algorithms that operate on them. These algorithms solve real problems: finding the shortest route, scheduling tasks, detecting cycles, building minimum cost networks.

Most graph algorithms are built on two fundamental traversals: BFS (breadth-first search) and DFS (depth-first search). Everything else is a variation of these two.

Open your editor. Every algorithm in this section should be implemented and tested by you.

---

## BFS Review -- Level by Level

BFS explores a graph level by level, visiting all neighbors before moving to the next depth. It uses a **queue** (first in, first out).

BFS finds the **shortest path in unweighted graphs** because it visits nodes in order of their distance from the start.

**Time complexity:** O(V + E) where V = vertices, E = edges.
**Space complexity:** O(V) for the visited set and queue.

### Full Implementation

```python
from collections import deque


def bfs(graph: dict[str, list[str]], start: str) -> list[str]:
    """Return nodes in BFS order starting from start."""
    visited: set[str] = set()
    queue: deque[str] = deque()
    result: list[str] = []

    visited.add(start)
    queue.append(start)

    while len(queue) > 0:
        node: str = queue.popleft()
        result.append(node)

        i: int = 0
        while i < len(graph.get(node, [])):
            neighbor: str = graph[node][i]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
            i += 1

    return result
```

### BFS for Shortest Path (Unweighted)

```python
from collections import deque


def bfs_shortest_path(graph: dict[str, list[str]], start: str, end: str) -> list[str]:
    """Return the shortest path from start to end in an unweighted graph."""
    visited: set[str] = set()
    queue: deque[list[str]] = deque()

    visited.add(start)
    queue.append([start])

    while len(queue) > 0:
        path: list[str] = queue.popleft()
        node: str = path[-1]

        if node == end:
            return path

        i: int = 0
        while i < len(graph.get(node, [])):
            neighbor: str = graph[node][i]
            if neighbor not in visited:
                visited.add(neighbor)
                new_path: list[str] = path + [neighbor]
                queue.append(new_path)
            i += 1

    return []  # no path found
```

### Trace

```
graph = {"A": ["B", "C"], "B": ["D", "E"], "C": ["F"], "D": [], "E": ["F"], "F": []}

bfs(graph, "A"):

Queue: [A]  Visited: {A}
  Pop A -> visit A. Add B, C.
Queue: [B, C]  Visited: {A, B, C}
  Pop B -> visit B. Add D, E.
Queue: [C, D, E]  Visited: {A, B, C, D, E}
  Pop C -> visit C. Add F.
Queue: [D, E, F]  Visited: {A, B, C, D, E, F}
  Pop D -> visit D. No new neighbors.
  Pop E -> visit E. F already visited.
  Pop F -> visit F. No neighbors.

Result: [A, B, C, D, E, F]
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning graph algorithms. (1) Why does BFS find the shortest path in unweighted graphs? Explain in terms of the order nodes are visited. (2) For this graph: A->B, A->C, B->D, C->D, D->E, trace through BFS from A. What is the shortest path from A to E? (3) What data structure does BFS use and why? What would happen if you used a stack instead?"</div>
</div>

---

## DFS Review -- Go Deep First

DFS explores as far as possible along each branch before backtracking. It uses a **stack** (last in, first out) -- either explicitly or through recursion.

**Time complexity:** O(V + E).
**Space complexity:** O(V).

### Iterative Implementation (with explicit stack)

```python
def dfs_iterative(graph: dict[str, list[str]], start: str) -> list[str]:
    """Return nodes in DFS order starting from start."""
    visited: set[str] = set()
    stack: list[str] = [start]
    result: list[str] = []

    while len(stack) > 0:
        node: str = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        result.append(node)

        # add neighbors in reverse order so leftmost is processed first
        neighbors: list[str] = graph.get(node, [])
        i: int = len(neighbors) - 1
        while i >= 0:
            if neighbors[i] not in visited:
                stack.append(neighbors[i])
            i -= 1

    return result
```

### Recursive Implementation

```python
def dfs_recursive(graph: dict[str, list[str]], start: str,
                  visited: set[str] | None = None) -> list[str]:
    """Return nodes in DFS order starting from start."""
    if visited is None:
        visited = set()

    visited.add(start)
    result: list[str] = [start]

    i: int = 0
    while i < len(graph.get(start, [])):
        neighbor: str = graph[start][i]
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))
        i += 1

    return result
```

---

## Dijkstra's Algorithm -- Shortest Path with Weights

BFS finds shortest paths in unweighted graphs. For weighted graphs with non-negative edges, you need **Dijkstra's algorithm**.

The idea: always process the closest unvisited node. Use a min-heap (priority queue) to efficiently find the closest node.

**Time complexity:** O((V + E) log V) with a min-heap.
**Space complexity:** O(V) for distances and the heap.
**Requirement:** All edge weights must be non-negative.

### Full Implementation

```python
import heapq


def dijkstra(graph: dict[str, list[tuple[str, int]]], start: str) -> dict[str, int]:
    """Return shortest distances from start to all reachable nodes.

    graph format: {"A": [("B", 4), ("C", 1)]} means A->B costs 4, A->C costs 1.
    """
    distances: dict[str, int] = {start: 0}
    heap: list[tuple[int, str]] = [(0, start)]  # (distance, node)
    visited: set[str] = set()

    while len(heap) > 0:
        current_dist, current_node = heapq.heappop(heap)

        if current_node in visited:
            continue
        visited.add(current_node)

        i: int = 0
        neighbors: list[tuple[str, int]] = graph.get(current_node, [])
        while i < len(neighbors):
            neighbor: str = neighbors[i][0]
            weight: int = neighbors[i][1]
            new_dist: int = current_dist + weight

            if neighbor not in distances or new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))
            i += 1

    return distances
```

### Step-by-Step Trace

```
graph = {
    "A": [("B", 4), ("C", 1)],
    "B": [("D", 1)],
    "C": [("B", 2), ("D", 5)],
    "D": []
}

Start: A

Heap: [(0, A)]  Distances: {A: 0}

Step 1: Pop (0, A). Visit A.
  Neighbor B: 0 + 4 = 4. distances[B] = 4. Push (4, B).
  Neighbor C: 0 + 1 = 1. distances[C] = 1. Push (1, C).
  Heap: [(1, C), (4, B)]

Step 2: Pop (1, C). Visit C.
  Neighbor B: 1 + 2 = 3. 3 < 4, update. distances[B] = 3. Push (3, B).
  Neighbor D: 1 + 5 = 6. distances[D] = 6. Push (6, D).
  Heap: [(3, B), (4, B), (6, D)]

Step 3: Pop (3, B). Visit B.
  Neighbor D: 3 + 1 = 4. 4 < 6, update. distances[D] = 4. Push (4, D).
  Heap: [(4, B), (4, D), (6, D)]

Step 4: Pop (4, B). B already visited. Skip.

Step 5: Pop (4, D). Visit D. No neighbors.
  Heap: [(6, D)]

Step 6: Pop (6, D). D already visited. Skip.

Final distances: {A: 0, C: 1, B: 3, D: 4}
```

Notice how B's distance was updated from 4 to 3 when we found a shorter path through C. This is the "relaxation" step.

### Dijkstra with Path Reconstruction

```python
import heapq


def dijkstra_with_path(graph: dict[str, list[tuple[str, int]]],
                       start: str, end: str) -> tuple[int, list[str]]:
    """Return (shortest_distance, path) from start to end."""
    distances: dict[str, int] = {start: 0}
    previous: dict[str, str] = {}
    heap: list[tuple[int, str]] = [(0, start)]
    visited: set[str] = set()

    while len(heap) > 0:
        current_dist, current_node = heapq.heappop(heap)

        if current_node in visited:
            continue
        visited.add(current_node)

        if current_node == end:
            break

        i: int = 0
        neighbors: list[tuple[str, int]] = graph.get(current_node, [])
        while i < len(neighbors):
            neighbor: str = neighbors[i][0]
            weight: int = neighbors[i][1]
            new_dist: int = current_dist + weight

            if neighbor not in distances or new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                previous[neighbor] = current_node
                heapq.heappush(heap, (new_dist, neighbor))
            i += 1

    # reconstruct path
    if end not in distances:
        return -1, []

    path: list[str] = []
    node: str = end
    while node != start:
        path.append(node)
        node = previous[node]
    path.append(start)
    path.reverse()

    return distances[end], path
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning Dijkstra's algorithm. (1) Why can't Dijkstra handle negative edge weights? Give a specific example where it would fail. (2) For this graph: A->(B,3), A->(C,1), B->(D,2), C->(B,1), C->(D,6), trace through Dijkstra from A step by step, showing the heap and distances at each step. What is the shortest path from A to D? (3) What is the time complexity and why does the heap make it efficient?"</div>
</div>

---

## Bellman-Ford -- Handles Negative Weights

Bellman-Ford finds shortest paths even with negative edge weights. It also detects negative weight cycles.

The idea: relax all edges V-1 times. After V-1 rounds, all shortest paths are found (a shortest path has at most V-1 edges).

**Time complexity:** O(V * E) -- slower than Dijkstra.
**Space complexity:** O(V).

### Implementation

```python
def bellman_ford(vertices: list[str], edges: list[tuple[str, str, int]],
                 start: str) -> dict[str, int] | None:
    """Return shortest distances from start. Returns None if negative cycle exists.

    edges format: [(from, to, weight), ...]
    """
    distances: dict[str, int] = {}
    i: int = 0
    while i < len(vertices):
        distances[vertices[i]] = float("inf")
        i += 1
    distances[start] = 0

    # relax all edges V-1 times
    v: int = 0
    while v < len(vertices) - 1:
        e: int = 0
        while e < len(edges):
            u: str = edges[e][0]
            w: str = edges[e][1]
            weight: int = edges[e][2]

            if distances[u] != float("inf") and distances[u] + weight < distances[w]:
                distances[w] = distances[u] + weight
            e += 1
        v += 1

    # check for negative weight cycles
    e = 0
    while e < len(edges):
        u: str = edges[e][0]
        w: str = edges[e][1]
        weight: int = edges[e][2]

        if distances[u] != float("inf") and distances[u] + weight < distances[w]:
            return None  # negative cycle detected
        e += 1

    return distances
```

---

## Topological Sort -- Ordering Dependencies

A topological sort is an ordering of vertices in a directed acyclic graph (DAG) such that for every edge u -> v, u comes before v.

Use case: task scheduling where some tasks depend on others. Course prerequisites. Build system dependencies.

**Requirement:** The graph must be a DAG (no cycles).

### Using BFS (Kahn's Algorithm)

Start with nodes that have no incoming edges. Remove them and repeat.

```python
from collections import deque


def topological_sort_bfs(graph: dict[str, list[str]],
                         all_nodes: list[str]) -> list[str]:
    """Return topological order using Kahn's algorithm, or empty list if cycle exists."""
    # compute in-degrees
    in_degree: dict[str, int] = {}
    i: int = 0
    while i < len(all_nodes):
        in_degree[all_nodes[i]] = 0
        i += 1

    node_idx: int = 0
    while node_idx < len(all_nodes):
        node: str = all_nodes[node_idx]
        j: int = 0
        while j < len(graph.get(node, [])):
            neighbor: str = graph[node][j]
            in_degree[neighbor] = in_degree.get(neighbor, 0) + 1
            j += 1
        node_idx += 1

    # start with nodes that have in-degree 0
    queue: deque[str] = deque()
    k: int = 0
    while k < len(all_nodes):
        if in_degree[all_nodes[k]] == 0:
            queue.append(all_nodes[k])
        k += 1

    result: list[str] = []

    while len(queue) > 0:
        node = queue.popleft()
        result.append(node)

        j = 0
        while j < len(graph.get(node, [])):
            neighbor = graph[node][j]
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
            j += 1

    if len(result) != len(all_nodes):
        return []  # cycle detected

    return result
```

### Trace

```
Tasks: A depends on nothing, B depends on A, C depends on A, D depends on B and C.

graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
all_nodes = ["A", "B", "C", "D"]

In-degrees: A=0, B=1, C=1, D=2

Queue: [A] (only A has in-degree 0)

Pop A -> result: [A]
  Decrement B's in-degree: 1->0, add B to queue.
  Decrement C's in-degree: 1->0, add C to queue.
Queue: [B, C]

Pop B -> result: [A, B]
  Decrement D's in-degree: 2->1. Not 0 yet.
Queue: [C]

Pop C -> result: [A, B, C]
  Decrement D's in-degree: 1->0, add D to queue.
Queue: [D]

Pop D -> result: [A, B, C, D]

Topological order: [A, B, C, D]
```

### Using DFS

```python
def topological_sort_dfs(graph: dict[str, list[str]],
                         all_nodes: list[str]) -> list[str]:
    """Return topological order using DFS."""
    visited: set[str] = set()
    result: list[str] = []

    def dfs(node: str) -> None:
        visited.add(node)
        i: int = 0
        while i < len(graph.get(node, [])):
            neighbor: str = graph[node][i]
            if neighbor not in visited:
                dfs(neighbor)
            i += 1
        result.append(node)  # add AFTER visiting all descendants

    i: int = 0
    while i < len(all_nodes):
        if all_nodes[i] not in visited:
            dfs(all_nodes[i])
        i += 1

    result.reverse()  # reverse for correct order
    return result
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning topological sort. (1) Why does topological sort require a DAG? What happens if the graph has a cycle? (2) For this course prerequisite graph: Math101->Math201, Math101->CS101, CS101->CS201, Math201->CS201, CS201->CS301, find a topological order. Is there more than one valid order? (3) In Kahn's algorithm, how do you detect a cycle? (4) Give a real-world example where topological sort is useful."</div>
</div>

---

## Cycle Detection

### In Undirected Graphs (DFS with Parent Tracking)

If during DFS you find a neighbor that is already visited and is NOT the parent of the current node, there is a cycle.

```python
def has_cycle_undirected(graph: dict[int, list[int]], num_nodes: int) -> bool:
    """Detect cycle in an undirected graph."""
    visited: set[int] = set()

    def dfs(node: int, parent: int) -> bool:
        visited.add(node)
        i: int = 0
        while i < len(graph.get(node, [])):
            neighbor: int = graph[node][i]
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True  # cycle found
            i += 1
        return False

    node: int = 0
    while node < num_nodes:
        if node not in visited:
            if dfs(node, -1):
                return True
        node += 1

    return False
```

### In Directed Graphs (DFS with Three Colors)

Use three states: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). If you visit a GRAY node, you have found a cycle.

```python
def has_cycle_directed(graph: dict[int, list[int]], num_nodes: int) -> bool:
    """Detect cycle in a directed graph using three-color DFS."""
    WHITE: int = 0
    GRAY: int = 1
    BLACK: int = 2

    color: dict[int, int] = {}
    i: int = 0
    while i < num_nodes:
        color[i] = WHITE
        i += 1

    def dfs(node: int) -> bool:
        color[node] = GRAY

        j: int = 0
        while j < len(graph.get(node, [])):
            neighbor: int = graph[node][j]
            if color[neighbor] == GRAY:
                return True  # back edge -> cycle
            if color[neighbor] == WHITE:
                if dfs(neighbor):
                    return True
            j += 1

        color[node] = BLACK
        return False

    node: int = 0
    while node < num_nodes:
        if color[node] == WHITE:
            if dfs(node):
                return True
        node += 1

    return False
```

---

## Union-Find (Disjoint Set Union)

Union-Find efficiently tracks which elements belong to the same group. It supports two operations:
- **Find:** which group does element x belong to?
- **Union:** merge two groups together.

With path compression and union by rank, both operations run in nearly O(1) amortized time.

### Implementation

```python
class UnionFind:
    def __init__(self, n: int) -> None:
        self.parent: list[int] = list(range(n))
        self.rank: list[int] = [0] * n

    def find(self, x: int) -> int:
        """Find the root of x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Merge the groups containing x and y. Return True if they were different."""
        root_x: int = self.find(x)
        root_y: int = self.find(y)

        if root_x == root_y:
            return False  # already in the same group

        # union by rank: attach smaller tree under larger tree
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True

    def connected(self, x: int, y: int) -> bool:
        """Check if x and y are in the same group."""
        return self.find(x) == self.find(y)
```

**Time:** O(alpha(n)) per operation (nearly constant -- alpha is the inverse Ackermann function).

---

## Minimum Spanning Tree

A minimum spanning tree (MST) connects all vertices with the minimum total edge weight, using exactly V-1 edges.

### Kruskal's Algorithm (Sort Edges + Union-Find)

```python
def kruskal(num_nodes: int, edges: list[tuple[int, int, int]]) -> list[tuple[int, int, int]]:
    """Return edges in the MST. edges format: [(u, v, weight), ...]"""
    edges_sorted: list[tuple[int, int, int]] = sorted(edges, key=lambda e: e[2])
    uf: UnionFind = UnionFind(num_nodes)
    mst: list[tuple[int, int, int]] = []

    i: int = 0
    while i < len(edges_sorted) and len(mst) < num_nodes - 1:
        u: int = edges_sorted[i][0]
        v: int = edges_sorted[i][1]
        weight: int = edges_sorted[i][2]

        if uf.union(u, v):
            mst.append((u, v, weight))
        i += 1

    return mst
```

**Time:** O(E log E) for sorting.

### Prim's Algorithm (Greedy + Min-Heap)

```python
import heapq


def prim(graph: dict[int, list[tuple[int, int]]], start: int,
         num_nodes: int) -> list[tuple[int, int, int]]:
    """Return edges in the MST. graph format: {node: [(neighbor, weight), ...]}"""
    visited: set[int] = set()
    heap: list[tuple[int, int, int]] = []  # (weight, from_node, to_node)
    mst: list[tuple[int, int, int]] = []

    visited.add(start)
    i: int = 0
    while i < len(graph.get(start, [])):
        neighbor: int = graph[start][i][0]
        weight: int = graph[start][i][1]
        heapq.heappush(heap, (weight, start, neighbor))
        i += 1

    while len(heap) > 0 and len(mst) < num_nodes - 1:
        weight, u, v = heapq.heappop(heap)
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, weight))

        j: int = 0
        while j < len(graph.get(v, [])):
            neighbor = graph[v][j][0]
            w: int = graph[v][j][1]
            if neighbor not in visited:
                heapq.heappush(heap, (w, v, neighbor))
            j += 1

    return mst
```

**Time:** O(E log V).

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I'm learning graph algorithms. (1) For a graph with 5 nodes and edges (0,1,4), (0,2,1), (1,2,2), (1,3,5), (2,3,8), (2,4,10), (3,4,2), trace through Kruskal's algorithm step by step. Which edges are in the MST and what is the total weight? (2) When would you use Dijkstra vs Bellman-Ford? (3) Implement Union-Find from memory with path compression and union by rank. (4) What is the difference between Kruskal's and Prim's in terms of approach?"</div>
</div>

---

## Common Interview Patterns

### Word Ladder

Transform one word into another by changing one letter at a time. Each intermediate word must be in a dictionary. Find the shortest transformation. This is a BFS problem -- each word is a node, and words that differ by one letter are connected.

### Network Delay Time

Given a weighted directed graph, find the time it takes for a signal to reach all nodes from a starting node. This is Dijkstra -- find shortest distances to all nodes, then return the maximum.

### Cheapest Flights Within K Stops

Find the cheapest price from source to destination with at most K stops. This is a modified Bellman-Ford or BFS with pruning.

---

## Where People Go Wrong

### 1. Forgetting the Visited Set

Without tracking visited nodes, BFS and DFS can loop forever on graphs with cycles. Always use a visited set.

### 2. Wrong Priority Queue Usage

In Dijkstra, you must check if a node was already visited AFTER popping from the heap, not before pushing. Duplicate entries in the heap are fine -- just skip visited nodes when you pop them.

### 3. Negative Cycles

Dijkstra does not detect them. Bellman-Ford does -- if you can still relax edges after V-1 rounds, a negative cycle exists. Negative cycles make "shortest path" undefined because you can keep going around the cycle to reduce the distance forever.

### 4. Confusing BFS and DFS

BFS finds shortest paths in unweighted graphs. DFS does not. If you need shortest paths, use BFS (or Dijkstra for weighted graphs).

---

## Practice Exercises

1. Implement BFS and DFS for this graph: `{0: [1, 2], 1: [3], 2: [3, 4], 3: [5], 4: [5], 5: []}`. Start from node 0. Print the traversal order for each.

2. Implement Dijkstra and find the shortest path from A to E in this graph: A->(B,2), A->(C,4), B->(C,1), B->(D,7), C->(D,3), C->(E,5), D->(E,1).

3. Implement topological sort (Kahn's algorithm) for this task graph: task A before B, A before C, B before D, C before D, D before E.

4. Implement Union-Find and use Kruskal's to find the MST of the graph from exercise 2.

5. Write a cycle detection algorithm. Test it on a graph with a cycle and one without.

---

**Previous:** [[wiki:python-algo-greedy]] | **Next:** [[wiki:python-algo-patterns]]
