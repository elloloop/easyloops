# Python Programming Roadmap

## The Complete Path

This page is the master index for learning programming through Python. Not "learning Python" — learning to *program*, using Python as the vehicle. Each topic builds on the previous one. Skipping steps creates gaps that compound.

This roadmap is for people who struggle with academic patterns. No abstract theory dumps. You open your editor, you type code, you run it, you see what happens. Every single section expects you to have a terminal open.

---

## The Roadmap

```
Hello World → Values → Variables → Operators → Conditions → Loops
→ Lists → Dicts → Strings → Tuples
→ Functions → Error Handling → File I/O → Modules
→ Classes → Inheritance → Special Methods
→ Iterators → Comprehensions → Decorators → Type System
→ Data Structures → Algorithms → Problem Solving
→ Backend Systems
```

---

## Philosophy

Before you start, understand the approach:

1. **While loops first.** You will learn `while` loops and use them until iteration is second nature. Only then will you learn `for` loops as syntactic sugar. Most courses do this backwards and people never truly understand what looping *is*.

2. **Type hints always.** Every function you write will have type annotations from day one. `def add(a: int, b: int) -> int:` — not `def add(a, b):`. This is non-negotiable. It makes you think about what your code does before you run it.

3. **Type the code yourself.** Never copy-paste from these pages. Every example is meant to be typed character by character into your editor. Muscle memory matters. Reading code is not the same as writing code.

4. **Test immediately.** After every concept, open your editor and try it. Change things. Break things. See what error messages look like. The editor is your laboratory.

---

## Phase 1: Foundations (Learning to Think in Code)

This is where you learn what a program *is*. Not syntax trivia — the mental model. What does the computer actually do when it runs your code?

---

### 1. Hello World — Running Your First Program

**What you learn:** How to create a Python file, write a single line of code, and run it from the terminal. What a program actually is. What "execution" means.

**Why it matters:** Everything starts here. If you cannot run a program, nothing else matters. You need to see the feedback loop: write code, run code, see output. This loop is the foundation of all programming.

**Go to:** [[wiki:python-hello-world]]

---

### 2. Values and Types — Every Piece of Data Has a Type

**What you learn:** Integers, floats, strings, booleans. The `type()` function. Why `3` and `3.0` and `"3"` are completely different things to a computer. What `True` and `False` actually are.

**Why it matters:** Programs manipulate data. If you don't understand what kinds of data exist and how the computer distinguishes them, every bug you encounter will be a mystery. Types are the first thing you check when something goes wrong.

**Go to:** [[wiki:python-values-and-types]]

---

### 3. Variables and Memory — Naming Things So You Can Reuse Them

**What you learn:** Assignment with `=`. Variable naming rules. Reassignment. How variables are labels pointing to values in memory, not boxes containing values. The `id()` function.

**Why it matters:** Variables let you store intermediate results and build complex programs step by step. Misunderstanding how assignment works causes some of the most common bugs in programming. The mental model matters here.

**Go to:** [[wiki:python-variables-and-memory]]

---

### 4. Operators and Expressions — Combining Values to Produce New Values

**What you learn:** Arithmetic operators (`+`, `-`, `*`, `/`, `//`, `%`, `**`). Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`). Boolean operators (`and`, `or`, `not`). Operator precedence. What an expression is versus a statement.

**Why it matters:** Expressions are how you compute things. Every calculation, every condition, every decision your program makes is built from operators and expressions. Understanding precedence prevents bugs that are invisible when you read the code.

**Go to:** [[wiki:python-operators]]

---

### 5. Conditions and Branching — Making Decisions

**What you learn:** `if`, `elif`, `else`. Truthiness and falsiness. Nested conditions. Combining conditions with `and`, `or`, `not`. Why indentation matters in Python.

**Why it matters:** Programs that can't make decisions are just calculators. Branching is what turns a sequence of instructions into something that responds to its input. This is where programs start to feel intelligent.

**Go to:** [[wiki:python-conditions]]

---

### 6. Loops and Iteration — Repeating Things

**What you learn:** `while` loops first — the explicit, mechanical version where you control everything. Loop variables, loop conditions, infinite loops, `break` and `continue`. Only after you deeply understand `while` will you learn `for` loops as a convenient shorthand.

**Why it matters:** Loops are where programs get their power. A human can add 10 numbers. A loop can add 10 million. Understanding `while` first means you understand *what iteration actually is* — not just how to use a convenient syntax.

**Go to:** [[wiki:python-loops]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 1 — Foundations</div>
<div class="copy-prompt-text">Prompt: "I've studied the foundations of programming through Python: Hello World, values and types, variables and memory, operators and expressions, conditions and branching, and loops (while loops first, then for loops). Give me a 12-question quiz covering: (1) the difference between an expression and a statement, (2) why 3 and '3' are different, (3) how variable assignment works in memory, (4) operator precedence with boolean operators, (5) truthiness and falsiness rules, (6) converting a while loop to a for loop and explaining what changed, (7) identifying infinite loops, (8) tracing through a short program with variables, conditions, and a loop to predict the output. Mix conceptual and code-tracing questions. Grade me and tell me which topics to revisit."</div>
</div>

---

## Phase 2: Working with Data

Now that you can write programs that make decisions and repeat actions, you need ways to organize data. Single variables are not enough. You need collections.

---

### 7. Lists — Ordered Collections

**What you learn:** Creating lists, indexing, slicing, appending, inserting, removing. List mutability. Iterating over lists with `while` loops (then `for`). Nested lists. The `len()` function. Why lists are the workhorse data structure.

**Why it matters:** Almost every real program works with collections of data, not single values. Lists are the most fundamental collection. If you understand lists, you understand the concept of sequential data that applies to every programming language.

**Go to:** [[wiki:python-collections-lists]]

---

### 8. Dictionaries and Sets — Key-Value Pairs and Unique Collections

**What you learn:** Dictionaries: key-value pairs, lookup by key, adding and removing entries, iterating over keys/values/items. Sets: unique collections, membership testing, set operations. When to use a dict vs a list vs a set.

**Why it matters:** Not all data is sequential. Sometimes you need to look things up by name (dictionaries). Sometimes you need to track unique items (sets). Choosing the right data structure is one of the most important skills in programming.

**Go to:** [[wiki:python-collections-dicts-sets]]

---

### 9. Strings and Text — Working with Text

**What you learn:** String methods (`.split()`, `.join()`, `.strip()`, `.replace()`, `.find()`). String formatting with f-strings. Strings as sequences (indexing, slicing, iterating). Immutability. Encoding basics.

**Why it matters:** Text processing is everywhere — user input, file contents, web data, configuration. Strings are also your first encounter with an immutable sequence, which changes how you think about data transformation.

**Go to:** [[wiki:python-strings]]

---

### 10. Tuples and Unpacking — Immutable Sequences

**What you learn:** Creating tuples. Why tuples are immutable. Tuple unpacking (`a, b = (1, 2)`). Using tuples as dictionary keys. Returning multiple values from functions. Named tuples.

**Why it matters:** Tuples teach you that immutability is a feature, not a limitation. Unpacking is a pattern you'll use constantly. Understanding when to use a tuple vs a list is a design decision that shows up in every codebase.

**Go to:** [[wiki:python-tuples-and-unpacking]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 2 — Working with Data</div>
<div class="copy-prompt-text">Prompt: "I've studied Python collections: lists, dictionaries, sets, strings, and tuples. Give me a 12-question quiz covering: (1) list mutability vs string/tuple immutability, (2) when to use a dict vs a list vs a set, (3) dictionary key requirements (hashability), (4) string methods and f-string formatting, (5) tuple unpacking in assignments and function returns, (6) slicing with negative indices, (7) iterating over a dictionary's keys, values, and items, (8) a code-tracing question that builds a dictionary from a list using a while loop. Include at least 3 questions where I write code from scratch. Grade me strictly."</div>
</div>

---

## Phase 3: Organizing Code

Your programs are getting longer. You're repeating yourself. You need structure. This phase is about breaking programs into reusable, manageable pieces.

---

### 11. Functions and Scope — Reusable Blocks of Logic

**What you learn:** Defining functions with `def`. Parameters and arguments. Return values. Type hints on every function. Local vs global scope. Why scope exists. Pure functions vs functions with side effects. Default parameters.

**Why it matters:** Functions are the primary unit of code reuse and organization. Without functions, every program is a single long script that can't be tested, maintained, or understood. Type hints force you to think about what goes in and what comes out.

**Go to:** [[wiki:python-functions]]

---

### 12. Error Handling — When Things Go Wrong

**What you learn:** Exceptions: what they are, why they exist. `try`, `except`, `finally`. Common exception types (`ValueError`, `TypeError`, `KeyError`, `IndexError`). Raising exceptions. Writing defensive code. The difference between preventing errors and handling errors.

**Why it matters:** Programs crash. Inputs are invalid. Files don't exist. Networks fail. Handling errors gracefully is the difference between a program that's useful and a program that's fragile. Every professional codebase has error handling everywhere.

**Go to:** [[wiki:python-error-handling]]

---

### 13. File I/O — Reading and Writing Files

**What you learn:** Opening files with `open()`. Reading and writing text files. The `with` statement (context managers). Reading line by line. Working with file paths. CSV and JSON basics.

**Why it matters:** Programs that only live in memory are toys. Real programs read input from files, write output to files, and persist data. File I/O is your first encounter with the world outside your program.

**Go to:** [[wiki:python-file-io]]

---

### 14. Modules and Packages — Organizing Larger Programs

**What you learn:** `import` statements. Creating your own modules. The `__name__ == "__main__"` pattern. Standard library highlights. Installing packages with `pip`. Virtual environments.

**Why it matters:** Once your program spans multiple files, you need to understand how Python finds and loads code. Modules are how you share code between files, and packages are how you share code with the world.

**Go to:** [[wiki:python-modules]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 3 — Organizing Code</div>
<div class="copy-prompt-text">Prompt: "I've studied functions, error handling, file I/O, and modules in Python. Give me a 12-question quiz covering: (1) writing a function with proper type hints and a docstring, (2) local vs global scope — predict what a program prints, (3) when to use try/except vs if/else for validation, (4) which exception type gets raised in specific scenarios, (5) reading a file line by line and processing its contents, (6) the 'with' statement and why it matters, (7) how Python resolves imports, (8) the __name__ == '__main__' pattern. Include at least 4 questions where I write complete functions with type hints. Grade me and identify weak areas."</div>
</div>

---

## Phase 4: Object-Oriented Programming

You've been using types someone else created — `int`, `str`, `list`, `dict`. Now you create your own. This is where you learn to model real-world concepts in code.

---

### 15. Classes and Objects — Creating Your Own Types

**What you learn:** What a class is. What an object (instance) is. `__init__` and `self`. Instance attributes vs class attributes. Methods. Type hints on class methods. The relationship between classes and the types you've been using all along.

**Why it matters:** Classes let you bundle data and behavior together. Instead of passing five separate variables to every function, you create a type that holds all the related data and knows how to operate on itself. This is the foundation of large-scale program organization.

**Go to:** [[wiki:python-classes]]

---

### 16. Inheritance and Polymorphism — Reusing and Extending Types

**What you learn:** Base classes and derived classes. Method overriding. `super()`. When to use inheritance vs composition. Abstract base classes. Polymorphism — treating different types uniformly through a shared interface.

**Why it matters:** Inheritance lets you avoid duplicating code across similar types. Polymorphism lets you write code that works with any type that follows a contract, without knowing the specific type in advance. This is how large systems stay flexible.

**Go to:** [[wiki:python-inheritance]]

---

### 17. Special Methods — Making Your Types Behave Like Built-Ins

**What you learn:** `__repr__`, `__str__`, `__eq__`, `__lt__`, `__len__`, `__getitem__`, `__iter__`, `__add__`. The protocol system. How Python operators are actually method calls. Making your types work with `print()`, `len()`, `sorted()`, `in`, and `for`.

**Why it matters:** Special methods are what make Python feel consistent. When you implement them, your custom types integrate seamlessly with the language. Understanding them also deepens your understanding of how all built-in types work.

**Go to:** [[wiki:python-special-methods]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 4 — Object-Oriented Programming</div>
<div class="copy-prompt-text">Prompt: "I've studied classes, inheritance, polymorphism, and special methods in Python. Give me a 12-question quiz covering: (1) writing a class with __init__, type hints, and methods, (2) the difference between instance and class attributes, (3) when to use inheritance vs composition, (4) method resolution order with super(), (5) implementing __repr__ and __eq__ for a custom class, (6) making a class iterable with __iter__ and __next__, (7) operator overloading with special methods, (8) designing a small class hierarchy for a given scenario. At least 4 questions should require writing complete class definitions. Grade me rigorously."</div>
</div>

---

## Phase 5: Intermediate Python

You know how to program. Now you learn the tools that make Python code concise, expressive, and professional. These are the patterns you'll see in every serious Python codebase.

---

### 18. Iterators and Generators — Lazy Evaluation

**What you learn:** The iterator protocol (`__iter__`, `__next__`). How `for` loops actually work under the hood. Generator functions with `yield`. Generator expressions. Why lazy evaluation matters for large datasets. `itertools` basics.

**Why it matters:** Understanding iterators completes your understanding of loops. Generators let you process data that doesn't fit in memory. This is the bridge between "programming" and "engineering" — writing code that scales.

**Go to:** [[wiki:python-iterators-generators]]

---

### 19. Comprehensions — Concise Collection Building

**What you learn:** List comprehensions, dict comprehensions, set comprehensions. Conditional comprehensions. Nested comprehensions. When comprehensions help readability and when they hurt it.

**Why it matters:** Comprehensions are Python's signature feature for building collections concisely. They replace multi-line loops with single expressions. But they can also create unreadable one-liners if misused. Knowing when to use them is a judgment call.

**Go to:** [[wiki:python-comprehensions]]

---

### 20. Decorators and Closures — Functions That Modify Functions

**What you learn:** First-class functions. Functions as arguments. Closures — functions that remember their enclosing scope. Decorators — the `@` syntax. Writing your own decorators. Common decorators (`@property`, `@staticmethod`, `@classmethod`).

**Why it matters:** Decorators let you add behavior to functions without modifying them. They appear everywhere in frameworks, testing libraries, and web development. Understanding closures is prerequisite to understanding many advanced patterns.

**Go to:** [[wiki:python-decorators-closures]]

---

### 21. The Type System — Type Hints and Static Analysis

**What you learn:** Type annotations in depth. `Optional`, `Union`, `List[int]`, `Dict[str, int]`, `Tuple`, `Callable`. Generics. `TypeVar`. Running `mypy` for static analysis. Type hints as documentation. `dataclasses`.

**Why it matters:** You've been using type hints since day one. Now you understand the full system. Type hints catch bugs before you run the code. They serve as machine-readable documentation. Professional Python codebases use them extensively.

**Go to:** [[wiki:python-type-system]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 5 — Intermediate Python</div>
<div class="copy-prompt-text">Prompt: "I've studied iterators, generators, comprehensions, decorators, closures, and Python's type system. Give me a 15-question quiz covering: (1) implementing the iterator protocol manually, (2) writing a generator function with yield, (3) converting a loop to a list comprehension and deciding whether it improves readability, (4) explaining closures with variable capture, (5) writing a decorator that logs function calls, (6) type annotations with Optional, Union, and Callable, (7) when to use a generator vs a list comprehension, (8) using dataclasses with type hints, (9) tracing through a decorator to show execution order. At least 5 questions should require writing code. Grade me strictly — this is intermediate material."</div>
</div>

---

## Phase 6: Data Structures (Implement Them Yourself)

You've been using Python's built-in data structures. Now you build them from scratch. This phase is about understanding *how* data structures work internally, not just *that* they work. You will implement each one yourself.

Open your editor. Every data structure in this phase requires writing code.

---

### 22. Arrays and Dynamic Arrays

**What you learn:** What an array is at the memory level. Fixed-size arrays. How Python's `list` is actually a dynamic array. Implementing a dynamic array that resizes. Amortized O(1) append. The cost of inserting at the front vs the back.

**Why it matters:** If you don't understand how arrays work, you can't understand why some operations are fast and others are slow. Dynamic arrays are the most common data structure in all of computing.

**Go to:** [[wiki:python-ds-arrays]]

---

### 23. Linked Lists

**What you learn:** Nodes and pointers. Singly linked lists. Doubly linked lists. Insertion and deletion at any position. Traversal. Comparing linked lists to arrays — when each one wins.

**Why it matters:** Linked lists are your first encounter with pointer-based data structures. The node-and-reference pattern appears in trees, graphs, and many other structures. Understanding linked lists makes everything that follows easier.

**Go to:** [[wiki:python-ds-linked-lists]]

---

### 24. Stacks and Queues

**What you learn:** Stack: last-in-first-out (LIFO). Queue: first-in-first-out (FIFO). Implementing both from scratch using arrays and linked lists. Use cases: function call stacks, BFS queues, undo systems, parsing.

**Why it matters:** Stacks and queues are everywhere in computing. The function call stack is how your programs run. BFS uses a queue. Parsing expressions uses a stack. These are fundamental patterns.

**Go to:** [[wiki:python-ds-stacks-queues]]

---

### 25. Trees and Binary Search Trees

**What you learn:** Tree terminology (root, leaf, depth, height). Binary trees. Binary search trees (BSTs). Insertion, search, deletion. Tree traversals: inorder, preorder, postorder, level-order. Balanced vs unbalanced trees.

**Why it matters:** Trees are hierarchical data. File systems are trees. HTML is a tree. Database indexes are trees. BSTs give O(log n) search, which is the basis for efficient data retrieval.

**Go to:** [[wiki:python-ds-trees]]

---

### 26. Heaps and Priority Queues

**What you learn:** Binary heaps (min-heap and max-heap). The heap property. Implementing a heap with an array. Heapify, insert, extract-min/max. Priority queues. Python's `heapq` module.

**Why it matters:** Priority queues appear in scheduling, shortest-path algorithms, and many optimization problems. The heap is the standard implementation. Understanding heaps is prerequisite for several important algorithms.

**Go to:** [[wiki:python-ds-heaps]]

---

### 27. Hash Tables

**What you learn:** Hash functions. Collision resolution (chaining and open addressing). Load factors and resizing. Implementing a hash table from scratch. How Python's `dict` and `set` work internally. Why dictionary lookup is O(1).

**Why it matters:** Hash tables are arguably the most important data structure in practical programming. Every time you use a dictionary, you're using a hash table. Understanding them explains why some things are fast and others aren't.

**Go to:** [[wiki:python-ds-hash-tables]]

---

### 28. Graphs

**What you learn:** Vertices and edges. Directed vs undirected. Weighted vs unweighted. Adjacency list vs adjacency matrix representations. Building a graph class. When graphs appear in real problems.

**Why it matters:** Social networks, road maps, dependency systems, web links — graphs model relationships between things. Many of the most important algorithms in computer science operate on graphs.

**Go to:** [[wiki:python-ds-graphs]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 6 — Data Structures</div>
<div class="copy-prompt-text">Prompt: "I've implemented data structures from scratch in Python: dynamic arrays, linked lists, stacks, queues, binary search trees, heaps, hash tables, and graphs. Give me a 15-question quiz covering: (1) time complexity of operations on each structure, (2) choosing the right data structure for a given scenario, (3) implementing a method on a linked list (e.g., reverse), (4) BST insertion and deletion step-by-step, (5) heap operations and maintaining the heap property, (6) hash table collision resolution, (7) graph representations and tradeoffs, (8) tracing through a tree traversal algorithm. At least 5 questions should require writing implementation code with type hints. This should be challenging."</div>
</div>

---

## Phase 7: Algorithms

You have the data structures. Now you learn the classic algorithms that operate on them. This is where computer science meets programming.

---

### 29. Sorting Algorithms

**What you learn:** Bubble sort, selection sort, insertion sort (the simple ones). Merge sort, quicksort (the fast ones). Time complexity analysis. Space complexity. Stability. When to use Python's built-in `sorted()` vs implementing your own.

**Why it matters:** Sorting is the most-studied problem in computer science for a reason. It teaches you to analyze algorithms, compare tradeoffs, and understand divide-and-conquer. You won't implement sorting in production, but you need to understand it.

**Go to:** [[wiki:python-algo-sorting]]

---

### 30. Searching Algorithms

**What you learn:** Linear search. Binary search on sorted arrays. Binary search variations (first occurrence, last occurrence, insertion point). Searching in trees. When O(n) is acceptable and when O(log n) is necessary.

**Why it matters:** Searching is the other fundamental operation. Binary search is one of the most important algorithms ever invented — but only works on sorted data. Understanding the preconditions for an algorithm is a critical skill.

**Go to:** [[wiki:python-algo-searching]]

---

### 31. Recursion and Backtracking

**What you learn:** Recursive functions. Base cases and recursive cases. The call stack. Stack overflow. Memoization. Backtracking: systematically exploring possibilities and abandoning dead ends. Classic problems: N-queens, permutations, subsets.

**Why it matters:** Some problems are naturally recursive (trees, nested structures, divide-and-conquer). Backtracking solves constraint satisfaction problems. Understanding recursion is also prerequisite for dynamic programming.

**Go to:** [[wiki:python-algo-recursion]]

---

### 32. Dynamic Programming

**What you learn:** Overlapping subproblems. Optimal substructure. Top-down (memoization) vs bottom-up (tabulation). Classic problems: Fibonacci, longest common subsequence, knapsack, coin change. How to identify DP problems.

**Why it matters:** Dynamic programming is one of the hardest topics for beginners and one of the most common in technical interviews. It teaches you to see structure in problems and avoid redundant computation.

**Go to:** [[wiki:python-algo-dynamic-programming]]

---

### 33. Greedy Algorithms

**What you learn:** The greedy strategy: make the locally optimal choice at each step. When greedy works and when it doesn't. Proving correctness. Classic problems: activity selection, Huffman coding, fractional knapsack. Greedy vs dynamic programming.

**Why it matters:** Greedy algorithms are simpler and faster than DP when they work. Knowing when they apply — and when they fail — is an important problem-solving skill.

**Go to:** [[wiki:python-algo-greedy]]

---

### 34. Graph Algorithms

**What you learn:** BFS and DFS (traversal). Shortest path: Dijkstra's algorithm, Bellman-Ford. Minimum spanning trees: Prim's, Kruskal's. Topological sort. Connected components. Cycle detection.

**Why it matters:** Graph algorithms solve real-world problems: navigation, network routing, task scheduling, dependency resolution. BFS and DFS are the foundation — most graph algorithms are variations of these two traversals.

**Go to:** [[wiki:python-algo-graph]]

---

### 35. Common Algorithmic Patterns

**What you learn:** Two pointers. Sliding window. Fast and slow pointers. Merge intervals. Prefix sums. Monotonic stacks. Binary search on the answer. How to recognize which pattern applies to a problem.

**Why it matters:** Most algorithm problems are variations of a small number of patterns. Learning to recognize patterns is more valuable than memorizing solutions. This is the skill that makes technical interviews solvable.

**Go to:** [[wiki:python-algo-patterns]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 7 — Algorithms</div>
<div class="copy-prompt-text">Prompt: "I've studied sorting, searching, recursion, backtracking, dynamic programming, greedy algorithms, graph algorithms, and common algorithmic patterns in Python. Give me a 15-question quiz covering: (1) time and space complexity of sorting algorithms, (2) implementing binary search with edge cases, (3) writing a recursive solution and converting it to iterative, (4) identifying whether a problem needs DP or greedy, (5) tracing through Dijkstra's algorithm step-by-step, (6) applying the two-pointer or sliding-window pattern to a problem, (7) writing a DP solution with memoization and type hints, (8) BFS vs DFS and when to use each. At least 5 questions should require writing complete algorithm implementations. This is a challenging quiz — grade me strictly and identify weak patterns."</div>
</div>

---

## Phase 8: Problem Solving

You know the data structures. You know the algorithms. Now you put it all together and solve real problems under pressure.

---

### 36. LeetCode Problem Patterns

**What you learn:** How to approach algorithmic problems systematically. Pattern recognition across hundreds of problems. Time management. Reading problem constraints to determine the expected approach. Building a problem-solving framework: understand, plan, implement, test.

**Why it matters:** Technical interviews test problem solving, not memorization. This section ties everything from Phases 6 and 7 together into a practical skill. You learn to see a new problem and map it to a known pattern.

**Go to:** [[wiki:python-leetcode-patterns]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 8 — Problem Solving</div>
<div class="copy-prompt-text">Prompt: "Give me 5 LeetCode-style problems (medium difficulty). For each one: (1) present the problem, (2) let me identify the pattern and explain my approach, (3) let me write the solution in Python with type hints, (4) then grade my solution on correctness, time complexity, space complexity, and code quality. The problems should cover different patterns: one array problem, one tree problem, one graph problem, one DP problem, and one string problem. Be strict — point out edge cases I miss."</div>
</div>

---

## Phase 9: Building Backend Systems

You can write algorithms and data structures. Now you build things that run on the internet and serve real users. This is where programming meets engineering.

---

### 37. HTTP and the Web

**What you learn:** How the internet works: HTTP requests and responses, status codes, headers, methods (GET, POST, PUT, DELETE). URLs and routing. JSON as a data format. Making HTTP requests with Python.

**Why it matters:** Almost every modern application communicates over HTTP. Understanding the protocol is prerequisite to building web APIs, working with external services, and debugging network issues.

**Go to:** [[wiki:python-backend-http]]

---

### 38. Building APIs

**What you learn:** REST API design. Setting up a web framework (FastAPI or Flask). Defining routes. Request parsing and response formatting. Path parameters, query parameters, request bodies. Type validation with Pydantic. API documentation.

**Why it matters:** APIs are how programs talk to each other. Mobile apps, web frontends, and other services all consume APIs. Building clean, well-typed APIs is one of the most marketable programming skills.

**Go to:** [[wiki:python-backend-apis]]

---

### 39. Databases

**What you learn:** Relational databases and SQL basics (CREATE, INSERT, SELECT, UPDATE, DELETE, JOIN). Connecting Python to a database. ORMs. Database design and normalization. Migrations. NoSQL overview.

**Why it matters:** Programs need to persist data beyond a single execution. Databases are the standard solution. SQL is a separate language, but you'll use it from Python. Understanding data modeling is a fundamental engineering skill.

**Go to:** [[wiki:python-backend-databases]]

---

### 40. Authentication and Security

**What you learn:** Password hashing (never store plaintext). Sessions and tokens. JWT. OAuth basics. HTTPS. Input validation and sanitization. Common vulnerabilities (SQL injection, XSS). Security as a mindset, not a feature.

**Why it matters:** Every application with users needs authentication. Security mistakes can be catastrophic. You need to understand the principles even if you use a library, because misconfiguring a library is just as dangerous as rolling your own.

**Go to:** [[wiki:python-backend-auth]]

---

### 41. Testing

**What you learn:** Unit tests with `pytest`. Test structure: arrange, act, assert. Mocking external dependencies. Integration tests. Test coverage. Test-driven development (TDD). Writing testable code.

**Why it matters:** Code without tests is code that breaks silently. Tests are how you know your code works, and how you know your changes don't break existing functionality. Every professional codebase has tests. Every one.

**Go to:** [[wiki:python-backend-testing]]

---

### 42. Deployment

**What you learn:** Environment variables and configuration. Docker basics. CI/CD pipelines. Deploying to a cloud platform. Logging and monitoring. What happens after your code is "done."

**Why it matters:** Code that runs on your laptop isn't a product. Deployment is the bridge between "it works for me" and "it works for users." Understanding deployment changes how you write code — you think about configuration, logging, and failure modes from the start.

**Go to:** [[wiki:python-backend-deployment]]

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Checkpoint Quiz: Phase 9 — Backend Systems</div>
<div class="copy-prompt-text">Prompt: "I've studied building backend systems with Python: HTTP, APIs, databases, authentication, testing, and deployment. Give me a 15-question quiz covering: (1) HTTP methods and when to use each, (2) designing a REST API for a given resource, (3) writing a SQL query with a JOIN, (4) password hashing — why and how, (5) writing a unit test for a function with pytest, (6) JWT token flow for authentication, (7) what a Dockerfile does, (8) when to use an ORM vs raw SQL, (9) identifying a SQL injection vulnerability in code, (10) writing an API endpoint with proper type hints and validation. At least 5 questions should require writing code. Grade me and identify which backend topics need more practice."</div>
</div>

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Final Comprehensive Review</div>
<div class="copy-prompt-text">Prompt: "I've completed the full Python programming roadmap: foundations (values, variables, operators, conditions, loops) → data structures (lists, dicts, strings, tuples) → code organization (functions, error handling, file I/O, modules) → OOP (classes, inheritance, special methods) → intermediate Python (iterators, generators, comprehensions, decorators, type system) → data structures from scratch (arrays, linked lists, stacks, queues, trees, heaps, hash tables, graphs) → algorithms (sorting, searching, recursion, DP, greedy, graph algorithms, common patterns) → problem solving → backend systems (HTTP, APIs, databases, auth, testing, deployment). Give me a 25-question comprehensive final exam covering the entire roadmap. Test connections between topics: how functions relate to methods, how iterators underlie for loops, how hash tables underlie dictionaries, how type hints relate to function design. Include code-writing, code-tracing, system-design, and conceptual questions. Grade me rigorously and create a personalized study plan based on my weaknesses."</div>
</div>

---

## What Comes Next

This roadmap takes you from zero to building real backend systems. But programming is a deep field. Here's what lies beyond:

### Async Programming

- `async` and `await`
- Event loops and concurrency
- `asyncio` and asynchronous I/O
- When concurrency matters and when it doesn't

### Design Patterns

- Factory, strategy, observer, decorator (the GoF kind)
- Dependency injection
- Repository pattern
- When patterns help and when they're overengineering

### System Design

- Scaling beyond a single server
- Load balancing
- Caching strategies
- Message queues and event-driven architecture
- Microservices vs monoliths

### Distributed Systems

- CAP theorem
- Consistency models
- Distributed consensus
- Why distributed systems are fundamentally harder than single-machine programs

### DevOps and Infrastructure

- Infrastructure as code
- Container orchestration (Kubernetes)
- Monitoring, alerting, observability
- Incident response

### Machine Learning Engineering

- Using the math roadmap ([[wiki:ml-math-roadmap]]) alongside this one
- NumPy, pandas, scikit-learn
- Model training and evaluation
- ML system design

---

## Study Tips

1. **Type the code yourself.** Every single example. Never copy-paste. Reading code is not writing code. Your fingers need to learn the patterns. This is non-negotiable.

2. **While loops first.** When you reach the loops section, use `while` loops for everything until iteration is second nature. Only then learn `for` as a shorthand. You should be able to convert any `for` loop back to a `while` loop in your head.

3. **Type hints on every function.** From your very first function, write `def greet(name: str) -> str:` not `def greet(name):`. This habit makes you think about what your function does before you write the body. It catches bugs. It serves as documentation. No exceptions.

4. **Test in the editor immediately.** After reading about a concept, open your editor and try it. Don't just nod and move on. Change the examples. Break them on purpose. See what error messages look like. The terminal is where learning happens.

5. **Don't move on until quiz scores hit 100%.** Copy the checkpoint quiz prompts, paste them into an AI assistant, and take the quiz. If you score below 100%, go back and study the topics you missed. Moving on with gaps creates compounding confusion.

6. **Don't skip the data structures phase.** It's tempting to jump from Phase 5 to Phase 9 — from intermediate Python straight to building APIs. Resist that temptation. Implementing data structures from scratch builds the mental models that separate programmers from people who copy code from Stack Overflow.

7. **Build things between phases.** After Phase 3, build a command-line tool. After Phase 5, build a text-based game. After Phase 9, build a complete web application. The roadmap teaches concepts; projects teach integration.

8. **Read error messages.** Python's error messages are good. When your code crashes, read the entire traceback from bottom to top. The error type, the message, and the line number are all clues. Don't just google the error — understand it first.

9. **Draw connections.** Every topic reuses concepts from earlier topics. Functions return values (Phase 1). Methods are functions attached to classes (Phase 4). Decorators are functions that take functions (Phase 5). Special methods are what make operators work (Phase 4). If you see the connections, you understand programming.
