# Graphs -- Connecting Things Together Like a Map

You have built arrays, linked lists, stacks, queues, trees, heaps, and hash tables. Every one of those structures has a particular shape. Arrays are straight lines. Trees branch out from one root. But what happens when anything can connect to anything else?

Think about a map of cities. Each city can have roads going to many other cities, and those roads can go in all kinds of directions. There is no single "starting city" that everything branches from. That is not a tree -- that is a **graph**.

Graphs are everywhere. Social networks (people connected by friendships), the internet (web pages connected by links), maps (cities connected by roads), and even family trees (which are really graphs when you think about cousins and in-laws). Whenever you need to represent **relationships** between things, a graph is the tool you reach for.

![A flat vector illustration in a children's educational book style showing Byte the robot standing in front of a giant colorful map with five cartoon cities connected by winding roads, each city a different bright color with small houses and trees. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

**Mapped to:** [[wiki:python-ds-graphs]]

---

## What Is a Graph?

A graph is a collection of two things:

- **Vertices** (also called **nodes**) -- the dots. Each vertex represents a thing.
- **Edges** -- the lines connecting the dots. Each edge represents a relationship between two things.

Here is a tiny graph with 5 vertices and 5 edges:

```
    A --- B
    |     |
    C --- D --- E
```

The vertices are A, B, C, D, and E. The edges are A-B, A-C, B-D, C-D, and D-E.

**The city-and-road analogy:** Imagine five cities on a map. Each city is a vertex. Each road between two cities is an edge. City A has roads going to cities B and C. City D is a busy hub with roads going to B, C, and E. City E is a quiet town with only one road (to D).

**The social network analogy:** Picture five people. Each person is a vertex. A line between two people means they are friends. Person A is friends with B and C. Person D is friends with B, C, and E. Person E only has one friend (D).

Unlike a tree, there is no "root" vertex. Any vertex can connect to any other vertex. Vertices can have any number of connections. And notice something interesting: you can travel from A to B to D to C and back to A -- that is a loop! Trees never have loops, but graphs can.

---

## Graph Vocabulary

Before you write any code, you need to know the words people use when talking about graphs. There are only a few, and they all make sense once you see them.

### Vertex and Edge

A **vertex** is a dot. An **edge** is a connection between two dots. Some people say "node" instead of "vertex," and that is fine -- they mean the same thing.

### Directed vs Undirected

An **undirected** graph is like a two-way street. If there is an edge between A and B, you can travel from A to B *and* from B to A. Friendships work this way: if you are my friend, I am your friend too.

A **directed** graph is like a one-way street. An edge from A to B does not mean there is an edge from B to A. Think about following someone on social media: you can follow someone without them following you back. We draw directed edges with arrows:

```
Undirected:   A --- B       (two-way road)
Directed:     A --> B       (one-way street)
```

### Weighted vs Unweighted

An **unweighted** graph just says "these two vertices are connected." All edges are the same.

A **weighted** graph puts a number on each edge. That number is called the **weight**. Think about a map where each road has a distance: the road from A to B is 10 miles, the road from B to D is 25 miles. Those distances are the weights.

```
Unweighted:   A --- B           (just connected)
Weighted:     A --10-- B        (connected with distance 10)
```

### Neighbors

The **neighbors** of a vertex are all the vertices it is directly connected to. In our example above, the neighbors of D are B, C, and E.

### Degree

The **degree** of a vertex is how many edges it has. Vertex D has degree 3 (three edges). Vertex E has degree 1 (one edge).

---

## Two Ways to Store a Graph

When you build a graph in code, you need a way to remember which vertices are connected. There are two main approaches.

### Adjacency List (The One You Will Use Most)

Each vertex keeps a list of its neighbors. This is like each city keeping a phone book of all the cities it has direct roads to.

```
A: [B, C]
B: [A, D]
C: [A, D]
D: [B, C, E]
E: [D]
```

This is clean, easy to read, and works great when your graph does not have edges between *every* pair of vertices (which is most graphs in real life).

### Adjacency Matrix (The Grid Approach)

You make a grid (a 2D array) where rows and columns are vertices. If row A, column B has a 1, that means there is an edge from A to B. If it has a 0, there is no edge.

```
    A  B  C  D  E
A [ 0, 1, 1, 0, 0 ]
B [ 1, 0, 0, 1, 0 ]
C [ 1, 0, 0, 1, 0 ]
D [ 0, 1, 1, 0, 1 ]
E [ 0, 0, 0, 1, 0 ]
```

This works, but it uses more memory -- especially when most vertices are *not* connected to each other. For a graph with 1,000 vertices but only 2,000 edges, the adjacency list stores 2,000 entries, while the matrix stores 1,000,000 entries (mostly zeros). That is a lot of wasted space.

**Rule of thumb:** Use an adjacency list unless you have a special reason to use a matrix.

---

## Building a Graph Class

Let us build a graph using an adjacency list. We will use a dictionary where each key is a vertex and each value is the list of that vertex's neighbors.

```python
class Graph:
    def __init__(self) -> None:
        self.adjacency_list: dict[str, list[str]] = {}

    def add_vertex(self, vertex: str) -> None:
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1: str, vertex2: str) -> None:
        # For an undirected graph, add the connection both ways
        if vertex1 not in self.adjacency_list:
            self.add_vertex(vertex1)
        if vertex2 not in self.adjacency_list:
            self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append(vertex2)
        self.adjacency_list[vertex2].append(vertex1)

    def get_neighbors(self, vertex: str) -> list[str]:
        return self.adjacency_list.get(vertex, [])

    def __str__(self) -> str:
        result: str = ""
        for vertex in self.adjacency_list:
            neighbors: list[str] = self.adjacency_list[vertex]
            result += f"{vertex}: {neighbors}\n"
        return result
```

Try it out:

```python
g: Graph = Graph()
g.add_edge("A", "B")
g.add_edge("A", "C")
g.add_edge("B", "D")
g.add_edge("C", "D")
g.add_edge("D", "E")
print(g)
```

This prints:

```
A: ['B', 'C']
B: ['A', 'D']
C: ['A', 'D']
D: ['B', 'C', 'E']
E: ['D']
```

That matches our picture from earlier.

![A flat vector illustration in a children's educational book style showing Byte the robot drawing a graph on a whiteboard with colorful dots labeled A through E connected by bright lines, using a marker in one hand and pointing with the other. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## BFS -- Breadth-First Search

Now that you can build a graph, you need to explore it. Breadth-First Search (BFS) explores a graph **layer by layer**, like ripples spreading out from a stone dropped into a pond.

You start at one vertex. First you visit all of its neighbors (layer 1). Then you visit all of *their* neighbors that you have not visited yet (layer 2). Then layer 3, and so on.

**The key idea:** BFS uses a **queue**. Remember queues from your earlier lessons? First in, first out -- just like a line at a store. You add vertices to the back of the queue when you discover them, and you take vertices from the front when you are ready to visit them.

Here is how BFS works step by step on our example graph, starting from vertex A:

1. Start at A. Put A in the queue. Mark A as visited.
2. Take A from the queue. Look at A's neighbors: B and C. Put B and C in the queue. Mark them as visited.
3. Take B from the queue (it was first in line). Look at B's neighbors: A and D. A is already visited, so skip it. Put D in the queue.
4. Take C from the queue. C's neighbors: A (visited) and D (visited). Nothing new.
5. Take D from the queue. D's neighbors: B (visited), C (visited), E (new!). Put E in the queue.
6. Take E from the queue. E's neighbor: D (visited). Nothing new.
7. Queue is empty. Done!

**Visit order:** A, B, C, D, E -- layer by layer.

### BFS Code

```python
from collections import deque

def bfs(graph: Graph, start: str) -> list[str]:
    visited: set[str] = set()
    queue: deque[str] = deque()
    order: list[str] = []

    visited.add(start)
    queue.append(start)

    while len(queue) > 0:
        current: str = queue.popleft()
        order.append(current)

        for neighbor in graph.get_neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order
```

```python
print(bfs(g, "A"))   # ['A', 'B', 'C', 'D', 'E']
```

### Why BFS Is Useful

BFS is great for finding the **shortest path** in an unweighted graph. Because it explores layer by layer, the first time it reaches a vertex is always by the shortest route (fewest edges). If you want to find the fewest number of roads between two cities (when all roads are the same length), BFS is your tool.

---

## DFS -- Depth-First Search

Depth-First Search (DFS) takes the opposite approach from BFS. Instead of exploring layer by layer, DFS goes **as deep as possible** down one path before backtracking and trying another path.

Think of it like exploring a maze. You pick a path and follow it all the way to a dead end. Then you back up to the last fork and try a different path. You keep going until you have explored every tunnel.

**The key idea:** DFS uses a **stack** (or recursion, which uses the call stack behind the scenes). Remember stacks? Last in, first out -- like a stack of plates.

Here is DFS starting from vertex A:

1. Start at A. Push A onto the stack. Mark A as visited.
2. Pop A. Visit it. Push A's unvisited neighbors (B, C) onto the stack.
3. Pop C (last in, first out). Visit it. Push C's unvisited neighbors (D).
4. Pop D. Visit it. Push D's unvisited neighbors (E). (B is still on the stack but we will get to it.)
5. Pop E. Visit it. No unvisited neighbors.
6. Pop B. Visit it. No unvisited neighbors (A and D are already visited).
7. Stack is empty. Done!

**Visit order:** A, C, D, E, B -- deep before wide.

### DFS Code (Using a Stack)

```python
def dfs(graph: Graph, start: str) -> list[str]:
    visited: set[str] = set()
    stack: list[str] = []
    order: list[str] = []

    visited.add(start)
    stack.append(start)

    while len(stack) > 0:
        current: str = stack.pop()
        order.append(current)

        for neighbor in graph.get_neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                stack.append(neighbor)

    return order
```

```python
print(dfs(g, "A"))   # ['A', 'C', 'D', 'E', 'B']
```

### DFS Code (Using Recursion)

You can also write DFS using recursion. The function calls itself for each unvisited neighbor, and the computer's call stack acts as the stack:

```python
def dfs_recursive(graph: Graph, vertex: str, visited: set[str] | None = None) -> list[str]:
    if visited is None:
        visited = set()

    visited.add(vertex)
    order: list[str] = [vertex]

    for neighbor in graph.get_neighbors(vertex):
        if neighbor not in visited:
            order.extend(dfs_recursive(graph, neighbor, visited))

    return order
```

```python
print(dfs_recursive(g, "A"))   # ['A', 'B', 'D', 'C', 'E']
```

Notice the visit order might be slightly different depending on the order neighbors are stored, but it still goes deep before wide.

### When to Use DFS

DFS is great when you want to **explore all possible paths**, check if two vertices are connected, or detect cycles. It is also the building block for many advanced graph algorithms.

![A flat vector illustration in a children's educational book style showing Byte the robot standing at the entrance of a colorful maze, with one path highlighted in yellow going deep into the maze and another path highlighted in blue spreading out in concentric rings from the entrance. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Connected Components

Sometimes a graph is not all one piece. Imagine two groups of islands where there are bridges between islands in each group, but no bridge connecting the two groups. Each group is called a **connected component**.

```
Group 1:      Group 2:
A --- B       X --- Y
|             |
C             Z
```

Vertices A, B, and C are connected to each other. Vertices X, Y, and Z are connected to each other. But there is no edge between the two groups. This graph has **two connected components**.

You can find all connected components by running BFS or DFS from every unvisited vertex:

```python
def find_connected_components(graph: Graph) -> list[list[str]]:
    visited: set[str] = set()
    components: list[list[str]] = []

    for vertex in graph.adjacency_list:
        if vertex not in visited:
            # Run BFS from this vertex to find its entire component
            component: list[str] = []
            queue: deque[str] = deque()
            visited.add(vertex)
            queue.append(vertex)

            while len(queue) > 0:
                current: str = queue.popleft()
                component.append(current)
                for neighbor in graph.get_neighbors(current):
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)

            components.append(component)

    return components
```

```python
g2: Graph = Graph()
g2.add_edge("A", "B")
g2.add_edge("A", "C")
g2.add_edge("X", "Y")
g2.add_edge("X", "Z")

print(find_connected_components(g2))
# [['A', 'B', 'C'], ['X', 'Y', 'Z']]
```

---

## Cycle Detection

A **cycle** is a path that starts and ends at the same vertex. In our first example, A-B-D-C-A is a cycle. Trees never have cycles, but graphs often do.

Why does cycle detection matter? Think about task dependencies. If Task A depends on Task B, and Task B depends on Task C, and Task C depends on Task A -- that is a cycle, and it means the tasks can never be completed! Detecting cycles helps you find these impossible situations.

Here is how to detect a cycle in an undirected graph using DFS:

```python
def has_cycle(graph: Graph) -> bool:
    visited: set[str] = set()

    def dfs_check(vertex: str, parent: str | None) -> bool:
        visited.add(vertex)
        for neighbor in graph.get_neighbors(vertex):
            if neighbor not in visited:
                if dfs_check(neighbor, vertex):
                    return True
            elif neighbor != parent:
                # We found a visited vertex that is not the one we just came from
                # That means there is a cycle!
                return True
        return False

    for vertex in graph.adjacency_list:
        if vertex not in visited:
            if dfs_check(vertex, None):
                return True

    return False
```

```python
# Our original graph has a cycle (A-B-D-C-A)
print(has_cycle(g))    # True

# A simple chain has no cycle
chain: Graph = Graph()
chain.add_edge("A", "B")
chain.add_edge("B", "C")
print(has_cycle(chain))  # False
```

The trick is keeping track of the **parent** -- the vertex you just came from. If you find a neighbor that is already visited and it is *not* your parent, then you have found a cycle.

---

## Graphs in Real Life

Graphs are one of the most useful data structures because relationships between things are everywhere:

- **Maps and navigation:** Cities are vertices, roads are edges. GPS apps use graph algorithms to find the shortest route.
- **Social networks:** People are vertices, friendships (or follows) are edges. Finding "friends of friends" is a graph traversal.
- **The internet:** Web pages are vertices, links between pages are edges. Search engines use graph algorithms to decide which pages are important.
- **Family trees:** People are vertices, family relationships are edges.
- **Video games:** Rooms in a dungeon are vertices, doorways are edges. Finding a path through a level is a graph search.
- **Airline routes:** Airports are vertices, flights are edges with weights (flight times or prices).

Every time you use a map app, scroll through social media suggestions, or play a game with a maze, graphs are working behind the scenes.

![A flat vector illustration in a children's educational book style showing Byte the robot surrounded by floating examples of graphs: a small city map with roads, a web of cartoon friends connected by lines, and a game dungeon map with rooms and doorways, all in bright cheerful colors. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Quick Reference

| Term | Meaning |
|------|---------|
| Vertex (node) | A dot in the graph -- represents a thing |
| Edge | A connection between two vertices |
| Directed | Edges are one-way (arrows) |
| Undirected | Edges are two-way |
| Weighted | Edges have numbers (distances, costs) |
| Unweighted | All edges are the same |
| Neighbors | Vertices directly connected to a given vertex |
| Degree | Number of edges a vertex has |
| Adjacency list | Each vertex stores a list of its neighbors |
| Adjacency matrix | A grid showing which vertices are connected |
| BFS | Explore layer by layer (uses a queue) |
| DFS | Go deep, then backtrack (uses a stack) |
| Connected component | A group of vertices that are all reachable from each other |
| Cycle | A path that loops back to where it started |

---

## Practice Questions

Try to answer each question before looking at the answers at the bottom.

**1.** In a graph representing a social network, what are the vertices and what are the edges?

**2.** What is the difference between a directed graph and an undirected graph? Give a real-life example of each.

**3.** Look at this graph:

```
    1 --- 2
    |     |
    3 --- 4 --- 5
```

Write out the adjacency list for this graph.

**4.** What data structure does BFS use, and what data structure does DFS use? Why does this difference matter?

**5.** You want to find the fewest number of flights between two airports. Should you use BFS or DFS? Explain why.

**6.** Look at this graph:

```
    A --- B       X --- Y
    |
    C
```

How many connected components does this graph have? List the vertices in each component.

**7.** Does this graph have a cycle? Explain how you can tell.

```
    A --- B
    |     |
    C --- D
```

**8.** You have a graph with 1,000 vertices but only 50 edges. Would you use an adjacency list or an adjacency matrix? Why?

---

## What Comes Next

You have learned the last major data structure -- and it is one of the most powerful. You can now represent almost any kind of relationship in code. Next, you will start learning **algorithms**: step-by-step strategies for solving problems. The first one is **sorting** -- putting things in order.

**Next up:** [[wiki:python-jr-algo-sorting]]

**Previous:** [[wiki:python-jr-ds-hash-tables]]

---

## Answers to Practice Questions

**1.** The vertices are the people. The edges are the friendships (or connections) between people. If Alice and Bob are friends, there is an edge between the "Alice" vertex and the "Bob" vertex.

**2.** A directed graph has one-way edges (you can go from A to B but not necessarily from B to A). A real-life example is following someone on social media: you can follow someone without them following you back. An undirected graph has two-way edges (if A connects to B, then B connects to A too). A real-life example is a friendship: if you are someone's friend, they are your friend too.

**3.**
```
1: [2, 3]
2: [1, 4]
3: [1, 4]
4: [2, 3, 5]
5: [4]
```

**4.** BFS uses a **queue** (first in, first out). DFS uses a **stack** (last in, first out). This matters because the queue makes BFS explore layer by layer (closest vertices first), while the stack makes DFS dive as deep as possible before backtracking. BFS finds the shortest path; DFS explores all paths.

**5.** You should use BFS. Because BFS explores layer by layer, the first time it reaches a vertex is always via the shortest path (fewest edges). So if you BFS from your starting airport, the first time you reach the destination airport, you have found the fewest number of flights. DFS might find a path, but it could be a very long roundabout route.

**6.** There are **two** connected components. Component 1 contains vertices A, B, and C (they are all connected to each other). Component 2 contains vertices X and Y (they are connected to each other, but not to anyone in component 1).

**7.** Yes, this graph has a cycle. You can travel A to B to D to C and back to A, forming the cycle A-B-D-C-A. You can tell because there is more than one path between some pairs of vertices (for example, you can get from A to D by going A-B-D or by going A-C-D), which only happens when there is a cycle.

**8.** You should use an adjacency list. With 1,000 vertices and only 50 edges, the adjacency list stores just 50 entries (one per edge, with each edge appearing in two neighbor lists). An adjacency matrix would store 1,000 times 1,000 = 1,000,000 entries, with most of them being zero. The adjacency list is far more efficient here.
