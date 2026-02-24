# Graph Algorithms -- Finding Paths, Sorting Tasks, and Connecting Networks

You already know how to represent graphs (nodes and edges) and how to explore them with BFS and DFS. Now it is time to learn the powerful algorithms that _build on_ those traversals. These algorithms solve real problems: finding the fastest route between two cities, figuring out what order to do tasks that depend on each other, and connecting a network using the least amount of cable.

Every algorithm on this page uses ideas you have already learned -- queues, heaps, sorting, and graph traversal. You are ready for this!

![A flat vector illustration in a children's educational book style showing a colorful map with five small towns connected by roads of different lengths, with numbers on each road. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing at one town and looking at the map while holding a magnifying glass. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-01.png)

---

## Quick Review: BFS and DFS

Before we dive in, here is a quick reminder of the two traversals everything else is built on.

**BFS (Breadth-First Search)** explores level by level using a **queue**. It finds the shortest path in _unweighted_ graphs because it visits nodes in order of distance from the start.

**DFS (Depth-First Search)** explores as deep as possible before backtracking using a **stack** (or recursion). It is great for exploring all paths and detecting cycles.

**Both run in O(V + E) time**, where V is the number of vertices and E is the number of edges.

If any of this feels fuzzy, revisit [[wiki:python-jr-algo-searching]] before continuing.

---

## Dijkstra's Algorithm -- Shortest Path in Weighted Graphs

### The Problem

BFS finds shortest paths when every road has the same length. But what if roads have _different lengths_? Imagine a map where some roads are highways (fast) and some are dirt paths (slow). You want the _fastest_ route, not just the one with the fewest roads.

### The Analogy: GPS Navigation

Think about how a GPS finds the fastest route. It does not just count the number of roads -- it looks at how long each road takes. It always explores the _closest_ place it has not visited yet, then checks if it can find shorter routes through that place.

That is exactly what Dijkstra's algorithm does!

### The Key Idea

1. Start at your beginning node. Its distance is 0.
2. All other nodes start with a distance of infinity (we have not found a path yet).
3. Always pick the unvisited node with the **smallest known distance** (use a priority queue -- remember heaps!).
4. For each neighbor of that node, check: "Is the path through this node shorter than what I knew before?" If yes, update it. This is called **relaxation**.
5. Mark the node as visited and repeat.

### The Rule

Dijkstra's algorithm only works when all edge weights are **zero or positive**. No negative roads allowed! (We will learn about an algorithm that handles negative weights soon.)

### Full Implementation

```python
import heapq


def dijkstra(graph: dict[str, list[tuple[str, int]]], start: str) -> dict[str, int]:
    """Return shortest distances from start to all reachable nodes.

    graph format: {"A": [("B", 4), ("C", 1)]} means A->B costs 4, A->C costs 1.
    """
    distances: dict[str, int] = {start: 0}
    heap: list[tuple[int, str]] = [(0, start)]
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

### Step-by-Step Walkthrough

Let us trace through a small graph so you can see exactly how Dijkstra works.

```
Imagine five towns connected by roads:

    A --4--> B
    |        |
    1        1
    |        |
    v        v
    C --2--> B (shortcut!)
    |        |
    5        |
    |        |
    v        |
    D <------+

graph = {
    "A": [("B", 4), ("C", 1)],
    "B": [("D", 1)],
    "C": [("B", 2), ("D", 5)],
    "D": []
}

Start: A   Goal: find shortest distance to every town.

--- Step 1 ---
Pop (0, A). Visit A.
  Check neighbor B: 0 + 4 = 4.  distances[B] = 4.  Push (4, B).
  Check neighbor C: 0 + 1 = 1.  distances[C] = 1.  Push (1, C).
Heap: [(1, C), (4, B)]
Distances so far: {A: 0, B: 4, C: 1}

--- Step 2 ---
Pop (1, C). Visit C.  (C is closest unvisited!)
  Check neighbor B: 1 + 2 = 3.  3 < 4, so update!  distances[B] = 3.  Push (3, B).
  Check neighbor D: 1 + 5 = 6.  distances[D] = 6.  Push (6, D).
Heap: [(3, B), (4, B), (6, D)]
Distances so far: {A: 0, C: 1, B: 3, D: 6}

--- Step 3 ---
Pop (3, B). Visit B.
  Check neighbor D: 3 + 1 = 4.  4 < 6, so update!  distances[D] = 4.  Push (4, D).
Heap: [(4, B), (4, D), (6, D)]

--- Step 4 ---
Pop (4, B). B already visited. Skip!

--- Step 5 ---
Pop (4, D). Visit D. No neighbors.

--- Step 6 ---
Pop (6, D). D already visited. Skip!

Final distances: {A: 0, C: 1, B: 3, D: 4}
```

Notice how B's distance changed from 4 to 3 when we found a _shorter_ path through C. That is relaxation in action!

### Dijkstra with Path Reconstruction

Sometimes you want to know not just the distance, but the _actual path_.

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

**Time complexity:** O((V + E) log V) with a min-heap.

**Space complexity:** O(V).

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing at a crossroads with three colorful paths leading to different destinations. Each path has a sign showing a number (the distance). Byte is choosing the shortest path. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-02.png)

---

## Bellman-Ford -- When Roads Can Have Negative Weights

### Why Do We Need This?

Dijkstra works great, but it has one limitation: **all weights must be non-negative**. What if some edges have negative weights? This might sound strange, but it comes up -- for example, imagine a reward system where some paths _give you_ points instead of costing them.

Bellman-Ford handles negative weights. It is slower than Dijkstra but more flexible.

### The Key Idea

Repeat this simple step **V - 1 times** (where V is the number of vertices): go through _every_ edge and try to relax it (check if you found a shorter path). After V - 1 rounds, you are guaranteed to have found the shortest path to every node.

Why V - 1? Because the longest possible shortest path passes through at most V - 1 edges.

### Bonus: Detecting Negative Cycles

After V - 1 rounds, do one more round. If you can _still_ relax an edge, it means there is a **negative cycle** -- a loop where going around reduces the total distance forever. In that case, there is no meaningful "shortest path."

```python
def bellman_ford(vertices: list[str], edges: list[tuple[str, str, int]],
                 start: str) -> dict[str, int] | None:
    """Return shortest distances from start, or None if a negative cycle exists.

    edges format: [(from_node, to_node, weight), ...]
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

    # one more round to check for negative cycles
    e = 0
    while e < len(edges):
        u = edges[e][0]
        w = edges[e][1]
        weight = edges[e][2]
        if distances[u] != float("inf") and distances[u] + weight < distances[w]:
            return None  # negative cycle!
        e += 1

    return distances
```

**Time complexity:** O(V \* E) -- slower than Dijkstra.

**When to use it:** When your graph might have negative edge weights, or when you need to detect negative cycles.

---

## Topological Sort -- Ordering Tasks That Depend on Each Other

### The Problem

Imagine you are getting dressed in the morning. You cannot put on shoes before socks. You cannot put on a jacket before a shirt. Some things must happen in a specific order. But you have freedom for other things -- you could put on your hat at any point!

**Topological sort** takes a bunch of tasks with dependencies and finds an order where every task comes _after_ the things it depends on.

### Important Rule

Topological sort only works on **directed acyclic graphs** (DAGs). "Acyclic" means no cycles -- if task A depends on B and B depends on A, there is no valid order! That is a cycle.

### Kahn's Algorithm (BFS-Based)

This approach counts how many things each task depends on (its **in-degree**). Tasks with zero dependencies can go first. After "completing" a task, reduce the dependency count for everything that depended on it.

```python
from collections import deque


def topological_sort(graph: dict[str, list[str]],
                     all_nodes: list[str]) -> list[str]:
    """Return a valid task order using Kahn's algorithm.

    Returns empty list if a cycle is detected (no valid ordering exists).
    """
    # Step 1: count in-degrees (how many dependencies each node has)
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

    # Step 2: start with tasks that have no dependencies
    queue: deque[str] = deque()
    k: int = 0
    while k < len(all_nodes):
        if in_degree[all_nodes[k]] == 0:
            queue.append(all_nodes[k])
        k += 1

    result: list[str] = []

    # Step 3: process tasks one by one
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

    # Step 4: if we did not process all nodes, there was a cycle
    if len(result) != len(all_nodes):
        return []

    return result
```

### Getting Dressed: A Trace

```
Tasks and rules:
  - "underwear" before "pants"
  - "pants" before "shoes"
  - "socks" before "shoes"
  - "shirt" before "jacket"

graph = {
    "underwear": ["pants"],
    "pants": ["shoes"],
    "socks": ["shoes"],
    "shirt": ["jacket"],
    "shoes": [],
    "jacket": []
}
all_nodes = ["underwear", "pants", "socks", "shirt", "shoes", "jacket"]

In-degrees:
  underwear=0, pants=1, socks=0, shirt=0, shoes=2, jacket=1

Start queue: [underwear, socks, shirt]  (all with 0 dependencies)

Pop "underwear" -> result: [underwear]
  pants: in-degree 1 -> 0.  Add to queue!
Queue: [socks, shirt, pants]

Pop "socks" -> result: [underwear, socks]
  shoes: in-degree 2 -> 1.  Not 0 yet.
Queue: [shirt, pants]

Pop "shirt" -> result: [underwear, socks, shirt]
  jacket: in-degree 1 -> 0.  Add to queue!
Queue: [pants, jacket]

Pop "pants" -> result: [underwear, socks, shirt, pants]
  shoes: in-degree 1 -> 0.  Add to queue!
Queue: [jacket, shoes]

Pop "jacket" -> result: [underwear, socks, shirt, pants, jacket]
Pop "shoes" -> result: [underwear, socks, shirt, pants, jacket, shoes]

Valid order! Every item comes after its dependencies.
```

There can be _multiple_ valid topological orderings. For example, "shirt, socks, underwear, pants, jacket, shoes" would also work.

**Time complexity:** O(V + E).

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, looking at a checklist of getting-dressed steps connected by arrows showing which must come first. Items include colorful socks, shoes, shirt, and jacket arranged in dependency order. Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-03.png)

---

## Minimum Spanning Tree -- Connect Everything with Minimum Cost

### The Problem

Imagine you need to connect five houses to the internet using cables. You know the cost of running a cable between every pair of houses. You want to connect _all_ houses while spending the _least total money_ on cable.

A **minimum spanning tree (MST)** connects all nodes in a graph using the minimum total edge weight, using exactly V - 1 edges (where V is the number of nodes). No cycles!

### Kruskal's Algorithm: Sort and Pick

The idea is beautifully simple:

1. Sort all edges by weight (cheapest first).
2. Go through the edges one by one. Add an edge if it connects two parts that are not already connected. Skip it if it would create a cycle.
3. Stop when you have connected everything (V - 1 edges).

To check "would this create a cycle?" we use **Union-Find** (also called Disjoint Set Union), which you learned about in [[wiki:python-jr-ds-graphs]].

```python
class UnionFind:
    """Tracks which nodes are in the same connected group."""

    def __init__(self, n: int) -> None:
        self.parent: list[int] = list(range(n))
        self.rank: list[int] = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        root_x: int = self.find(x)
        root_y: int = self.find(y)
        if root_x == root_y:
            return False
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True


def kruskal(num_nodes: int,
            edges: list[tuple[int, int, int]]) -> list[tuple[int, int, int]]:
    """Return edges in the minimum spanning tree.

    edges format: [(node_a, node_b, weight), ...]
    """
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

### Cable Company Trace

```
Five houses (0, 1, 2, 3, 4) with these cable costs:

Edges (sorted by cost):
  (0, 1, 1)   cost 1
  (1, 3, 2)   cost 2
  (0, 2, 3)   cost 3
  (2, 4, 4)   cost 4
  (1, 2, 5)   cost 5
  (3, 4, 6)   cost 6

Kruskal picks edges from cheapest:

Edge (0,1,1): 0 and 1 not connected yet. ADD!   MST: [(0,1,1)]
Edge (1,3,2): 1 and 3 not connected yet. ADD!   MST: [(0,1,1), (1,3,2)]
Edge (0,2,3): 0 and 2 not connected yet. ADD!   MST: [(0,1,1), (1,3,2), (0,2,3)]
Edge (2,4,4): 2 and 4 not connected yet. ADD!   MST: [(0,1,1), (1,3,2), (0,2,3), (2,4,4)]

We now have 4 edges (V-1 = 5-1 = 4). Done!

Total cost: 1 + 2 + 3 + 4 = 10

Edge (1,2,5) would be skipped -- 1 and 2 are already connected (through 0).
Edge (3,4,6) would be skipped -- 3 and 4 are already connected.
```

**Time complexity:** O(E log E) for sorting the edges.

---

## Cycle Detection -- Checking for Loops

You already learned about cycles when studying graphs. Here is a quick recap of the two main approaches.

### Undirected Graphs: DFS with Parent Tracking

During DFS, if you find a neighbor that is already visited and is NOT the node you just came from (the parent), you have found a cycle.

```python
def has_cycle_undirected(graph: dict[int, list[int]], num_nodes: int) -> bool:
    """Return True if the undirected graph contains a cycle."""
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
                return True  # found a cycle!
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

### Directed Graphs: Three-Color DFS

Use three states for each node: **WHITE** (not visited), **GRAY** (currently being explored), **BLACK** (fully done). If you visit a GRAY node, you found a cycle -- it means you are going in a circle back to something you are still in the middle of exploring.

```python
def has_cycle_directed(graph: dict[int, list[int]], num_nodes: int) -> bool:
    """Return True if the directed graph contains a cycle."""
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
                return True  # cycle!
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

## When to Use Which Algorithm -- Your Decision Guide

Here is a handy guide for picking the right tool:

| I need to...                                   | Use this                  |
| ---------------------------------------------- | ------------------------- |
| Find shortest path, all edges same weight      | **BFS**                   |
| Find shortest path, different positive weights | **Dijkstra**              |
| Find shortest path, some negative weights      | **Bellman-Ford**          |
| Order tasks with dependencies                  | **Topological Sort**      |
| Connect all nodes with minimum total cost      | **MST (Kruskal's)**       |
| Check if a graph has loops                     | **Cycle Detection (DFS)** |
| Check if two nodes are in the same group       | **Union-Find**            |

### Quick Tips

- If the problem says "shortest" or "minimum cost path," think **Dijkstra** or **BFS**.
- If the problem says "order" or "schedule" or "prerequisites," think **Topological Sort**.
- If the problem says "connect all" with "minimum total," think **MST**.
- If the problem says "detect cycle" or "is it a DAG," think **Cycle Detection**.

![A flat vector illustration in a children's educational book style showing Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, standing in front of a colorful decision tree flowchart with friendly icons for each algorithm (a compass for Dijkstra, a checklist for topological sort, a network for MST). Soft pastel backgrounds, clean lines, warm and inviting, no text in image.](image-04.png)

---

## Practice Questions

Try these on your own before looking at the answers!

**Question 1:** You have this weighted graph. Use Dijkstra's algorithm to find the shortest distance from S to every other node. Show your work step by step.

```
S --(3)--> A
S --(7)--> B
A --(2)--> B
A --(4)--> C
B --(1)--> C
C --(5)--> D
B --(6)--> D
```

**Question 2:** Can Dijkstra's algorithm handle a graph where one edge has weight 0? What about weight -1? Explain why or why not.

**Question 3:** Given these course prerequisites, find a valid order to take the courses using topological sort. Show the in-degree table and trace through Kahn's algorithm.

```
Math101 -> Math201
Math101 -> CS101
CS101 -> CS201
Math201 -> CS201
CS201 -> CS301
```

**Question 4:** Use Kruskal's algorithm to find the minimum spanning tree of this graph. Show which edges you pick and which you skip, and explain why.

```
Edges: (A,B,3), (A,C,1), (B,C,7), (B,D,5), (C,D,2), (C,E,8), (D,E,4)
Nodes: A, B, C, D, E
```

**Question 5:** You have a directed graph. How would you check if it is a DAG (directed acyclic graph)? Describe two different approaches.

**Question 6:** If you need to find the shortest path in a graph with some negative edge weights, which algorithm should you use? What happens if you accidentally use Dijkstra instead?

**Question 7:** Explain the difference between BFS shortest path and Dijkstra shortest path. When would BFS give the wrong answer?

**Question 8:** In Kruskal's algorithm, why do we need Union-Find? What problem does it solve, and what would happen if we did not check for cycles?

---

## Answers to Practice Questions

**Answer 1:**

```
Start: S.  Distances: {S: 0}

Step 1: Visit S (distance 0).
  S -> A: 0 + 3 = 3.  distances[A] = 3.
  S -> B: 0 + 7 = 7.  distances[B] = 7.
  Heap: [(3, A), (7, B)]

Step 2: Visit A (distance 3, smallest in heap).
  A -> B: 3 + 2 = 5.  5 < 7, update!  distances[B] = 5.
  A -> C: 3 + 4 = 7.  distances[C] = 7.
  Heap: [(5, B), (7, B), (7, C)]

Step 3: Visit B (distance 5).
  B -> C: 5 + 1 = 6.  6 < 7, update!  distances[C] = 6.
  B -> D: 5 + 6 = 11. distances[D] = 11.
  Heap: [(6, C), (7, B), (7, C), (11, D)]

Step 4: Visit C (distance 6).
  C -> D: 6 + 5 = 11. 11 = 11, no update.
  Heap: [(7, B), (7, C), (11, D)]

Steps 5-6: Pop (7, B) and (7, C) -- already visited. Skip.

Step 7: Visit D (distance 11).

Final distances: {S: 0, A: 3, B: 5, C: 6, D: 11}
```

**Answer 2:** Weight 0 is perfectly fine -- Dijkstra requires _non-negative_ weights, and 0 is non-negative. Weight -1 would break Dijkstra. Here is why: Dijkstra assumes that once it visits a node, it has found the shortest path to that node. But a negative edge could create a shorter path that goes through an already-visited node. Dijkstra would miss this shorter path and give the wrong answer.

**Answer 3:**

```
In-degree table:
  Math101: 0  (no prerequisites)
  Math201: 1  (depends on Math101)
  CS101:   1  (depends on Math101)
  CS201:   2  (depends on CS101 and Math201)
  CS301:   1  (depends on CS201)

Queue starts with: [Math101]  (only one with in-degree 0)

Pop Math101 -> result: [Math101]
  Math201: in-degree 1 -> 0.  Add to queue.
  CS101:   in-degree 1 -> 0.  Add to queue.
Queue: [Math201, CS101]

Pop Math201 -> result: [Math101, Math201]
  CS201: in-degree 2 -> 1.  Not 0 yet.
Queue: [CS101]

Pop CS101 -> result: [Math101, Math201, CS101]
  CS201: in-degree 1 -> 0.  Add to queue!
Queue: [CS201]

Pop CS201 -> result: [Math101, Math201, CS101, CS201]
  CS301: in-degree 1 -> 0.  Add to queue!
Queue: [CS301]

Pop CS301 -> result: [Math101, Math201, CS101, CS201, CS301]

Valid order: Math101, Math201, CS101, CS201, CS301
(Note: Math101, CS101, Math201, CS201, CS301 is also valid!)
```

**Answer 4:**

```
Sort edges by weight: (A,C,1), (C,D,2), (A,B,3), (D,E,4), (B,D,5), (B,C,7), (C,E,8)

Edge (A,C,1): A and C not connected. ADD!       MST: [(A,C,1)]        Total: 1
Edge (C,D,2): C and D not connected. ADD!       MST: [(A,C,1),(C,D,2)]  Total: 3
Edge (A,B,3): A and B not connected. ADD!       MST: + (A,B,3)         Total: 6
Edge (D,E,4): D and E not connected. ADD!       MST: + (D,E,4)         Total: 10

4 edges for 5 nodes. Done!

Skipped: (B,D,5) -- B and D already connected through A-C-D.
Skipped: (B,C,7) -- B and C already connected through A.
Skipped: (C,E,8) -- C and E already connected through C-D-E.

MST total weight: 10
```

**Answer 5:** Two approaches to check if a directed graph is a DAG:

1. **Topological sort (Kahn's algorithm):** Run Kahn's algorithm. If the result contains fewer nodes than the total number of nodes, there is a cycle, so it is NOT a DAG.
2. **Three-color DFS:** Run DFS with the WHITE/GRAY/BLACK coloring. If you ever visit a GRAY node during exploration, you have found a cycle, so it is NOT a DAG.

**Answer 6:** Use **Bellman-Ford** for graphs with negative edge weights. If you accidentally use Dijkstra, it might give _wrong answers_. Dijkstra assumes that once it visits a node with the smallest distance, that distance is final. But a negative edge could make a shorter path through an already-visited node. Dijkstra would never go back and fix it.

**Answer 7:** BFS finds shortest paths when every edge has the same weight (or weight 1). It works by counting _hops_ (number of edges). If edges have _different_ weights, BFS would give the wrong answer because a path with fewer edges might have a larger total weight than a path with more edges. For example: A--(10)-->B vs A--(1)-->C--(1)-->B. BFS would say A->B is shortest (1 hop) but the actual shortest distance is A->C->B (cost 2 vs cost 10).

**Answer 8:** Union-Find solves the "would adding this edge create a cycle?" problem efficiently. When we consider adding an edge (u, v), we check if u and v are already in the same connected group. If they are, adding this edge would create a cycle, so we skip it. Without this check, we could accidentally create loops, and the result would not be a tree (it would have cycles and might not connect everything properly). Union-Find does this check in nearly O(1) time thanks to path compression and union by rank.

---

**Previous:** [[wiki:python-jr-algo-greedy]] | **Next:** [[wiki:python-jr-algo-patterns]]
