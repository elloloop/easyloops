# The Type System -- Labels in Detail

## You Have Been Using Type Hints All Along

![A flat vector illustration in a children's educational book style showing Byte the robot in a tidy kitchen, carefully placing colorful labels on storage containers: FLOUR on a white container, SUGAR on a yellow container, RICE on a brown container. Each label has a small matching icon. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Every code example you have seen in these lessons has used type hints. Every single one. You have been writing things like `name: str` and `def greet(name: str) -> str:` since the very beginning. Now it is time to go deeper and understand everything type hints can do.

Type hints are like **labels on containers in a kitchen**. Imagine a kitchen where every container has a clear label: "FLOUR," "SUGAR," "SALT," "RICE." Without labels, you might grab the salt when you meant to grab the sugar -- and your cookies would turn out terrible. Labels help you grab the right thing every time.

Type hints do the same thing for your code. They label every piece of data so you (and your tools) always know what kind of information you are working with.

---

## Why Type Hints Matter

Type hints give you three big benefits:

1. **They catch mistakes before you run your code.** A tool called `mypy` reads your type hints and warns you when something does not match. You find bugs before anyone else does.
2. **They are documentation that stays accurate.** Comments can get outdated and wrong. Type hints are checked by tools, so they stay honest.
3. **They make your editor smarter.** Your code editor can suggest methods, show function signatures, and highlight mistakes -- because it knows what type everything is.

Here is the most important thing to remember: **type hints do not change how your code runs.** Python completely ignores them when executing your program. They are there for tools like `mypy` and for humans reading the code.

---

## Basic Type Hints Recap

Let's quickly review what you already know.

### Variables

```python
name: str = "Alice"
score: int = 95
temperature: float = 98.6
is_sunny: bool = True
nothing: None = None
```

The pattern is: `variable_name: type = value`.

### Functions

```python
def greet(name: str, excited: bool) -> str:
    if excited:
        return f"Hello, {name}!!!"
    return f"Hello, {name}."


message: str = greet("Alice", True)
print(message)  # Hello, Alice!!!
```

The pattern is: `def function_name(param: type) -> return_type:`.

The `-> str` means "this function gives back a string." If a function does not give anything back, use `-> None`:

```python
def say_hi(name: str) -> None:
    print(f"Hi, {name}!")
```

---

## Collection Type Hints

When you have a list, dictionary, or set, you also say what is **inside** the collection. This is like labeling a container "BOX OF CRAYONS" instead of just "BOX" -- the extra detail helps.

Open your editor. Type this. Run it.

```python
# A list of whole numbers
scores: list[int] = [90, 85, 92, 78]

# A list of strings
names: list[str] = ["Alice", "Bob", "Charlie"]

# A dictionary mapping strings to whole numbers
word_counts: dict[str, int] = {"hello": 5, "world": 3}

# A set of strings
tags: set[str] = {"python", "coding", "fun"}

# A tuple with specific types for each position
point: tuple[float, float] = (3.5, 7.2)
```

For dictionaries, you list two types separated by a comma: the key type and the value type. `dict[str, int]` means "the keys are strings and the values are whole numbers."

### Nested Collections

Collections can contain other collections:

```python
# A list of lists of whole numbers (like a grid)
grid: list[list[int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# A dictionary mapping names to lists of scores
grade_book: dict[str, list[int]] = {
    "Alice": [90, 85, 92],
    "Bob": [78, 88, 95],
}

# A list of tuples
pairs: list[tuple[str, int]] = [("Alice", 90), ("Bob", 85)]
```

---

## Optional Types: It Might Be Nothing

Sometimes a value might be there, or it might be `None` (nothing). You write this as `str | None`, which means "either a string or nothing."

Open your editor. Type this. Run it.

```python
def find_player(name: str) -> str | None:
    """Look up a player. Returns None if not found."""
    players: dict[str, str] = {
        "player1": "Alice",
        "player2": "Bob",
    }
    return players.get(name)


result: str | None = find_player("player1")
print(result)  # Alice

result = find_player("player99")
print(result)  # None
```

The `str | None` label tells anyone reading the code: "Be careful! This might give you `None` instead of a string. You should check before using it."

This is really helpful because it prevents mistakes like this:

```python
result: str | None = find_player("player99")
# result is None here!
# print(result.upper())  # This would CRASH because None has no .upper() method

# Safe way: check first
if result is not None:
    print(result.upper())  # Now we know result is definitely a string
```

---

## Union Types: It Could Be This or That

Sometimes a value can be one of several types. You write this with the `|` symbol, which means "or."

```python
def describe(value: int | str) -> str:
    """Describe a value that could be a number or text."""
    return f"The value is: {value}"


print(describe(42))       # The value is: 42
print(describe("hello"))  # The value is: hello
```

`int | str` means "this could be a whole number or a string." You can combine as many types as you need: `int | float | str` means "a whole number, a decimal number, or text."

---

![A flat vector illustration in a children's educational book style showing Byte the robot organizing a library bookshelf, placing books with colorful spine labels into the correct sections. Each shelf section has a clear category sign. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

## Type Aliases: Short Names for Long Types

Sometimes your type hints get really long and repetitive. You can create a short nickname for a complicated type. This is called a **type alias**.

```python
# Without a type alias -- this is hard to read
def get_grades(data: dict[str, list[int]]) -> dict[str, list[int]]:
    return data


# With a type alias -- much cleaner!
type GradeBook = dict[str, list[int]]


def get_grades(data: GradeBook) -> GradeBook:
    return data
```

The `type` keyword (available in Python 3.12 and newer) creates an alias. `GradeBook` is just a nickname for `dict[str, list[int]]`. They mean exactly the same thing, but the nickname is easier to read.

Here are more examples:

```python
type Coordinate = tuple[float, float]
type Matrix = list[list[float]]
type PlayerScores = dict[str, list[int]]

position: Coordinate = (5.5, 10.3)
grid: Matrix = [[1.0, 2.0], [3.0, 4.0]]
scores: PlayerScores = {"Alice": [90, 85], "Bob": [78, 92]}
```

Type aliases are especially helpful when you use the same complicated type in many places. Define the alias once, then use the short name everywhere.

---

## Callable: A Type Hint for Functions

Since functions are values (remember the recipe card idea from [[wiki:python-jr-decorators-closures]]?), they need type hints too. The type hint for a function is `Callable`.

```python
from typing import Callable


def apply_operation(a: int, b: int, operation: Callable[[int, int], int]) -> int:
    """Use a given operation on two numbers."""
    return operation(a, b)


def add(x: int, y: int) -> int:
    return x + y


def multiply(x: int, y: int) -> int:
    return x * y


print(apply_operation(3, 4, add))       # 7
print(apply_operation(3, 4, multiply))   # 12
```

`Callable[[int, int], int]` means: "a function that takes two `int` arguments and returns an `int`."

- The first part `[int, int]` lists the types of the arguments (what goes in).
- The second part `int` is the return type (what comes out).

Think of it as a label for a recipe card: "This recipe needs two cups of flour (`int, int`) and produces one loaf of bread (`int`)."

---

## Generics and TypeVar: Works with ANY Type

Sometimes you want to write a function that works with any type, as long as the input and output types match. For example, "give me the first item of any list" should return the same type as whatever is in the list.

```python
from typing import TypeVar

T = TypeVar("T")


def first(items: list[T]) -> T:
    """Return the first item from any list."""
    return items[0]


# When you pass a list of ints, T becomes int
number: int = first([10, 20, 30])
print(number)  # 10

# When you pass a list of strings, T becomes str
word: str = first(["hello", "world"])
print(word)  # hello
```

`T = TypeVar("T")` creates a placeholder type. When you call `first([10, 20, 30])`, your type checker figures out that `T` is `int`, so the return type is `int`. When you call `first(["hello", "world"])`, `T` becomes `str`.

Without `TypeVar`, you would have to use `Any`, which means "any type at all." But `Any` provides no safety -- the type checker cannot catch mistakes:

```python
from typing import Any

# With Any -- type checker cannot help you
def first_unsafe(items: list[Any]) -> Any:
    return items[0]

# With TypeVar -- type checker knows the return matches the input
def first_safe(items: list[T]) -> T:
    return items[0]
```

You do not need to use `TypeVar` often at this stage. Just know it exists for when you need a function that works with many different types while keeping everything connected.

---

## Dataclasses: A Shortcut for Simple Classes

You have learned how to write classes with `__init__` methods. For simple classes that mainly store data, Python has a shortcut called `dataclass` that writes the `__init__` for you.

Open your editor. Type this. Run it.

```python
from dataclasses import dataclass


@dataclass
class Pet:
    name: str
    species: str
    sound: str


@dataclass
class Player:
    username: str
    score: int
    level: int = 1  # Default value


buddy: Pet = Pet(name="Buddy", species="Dog", sound="Woof!")
print(buddy.name)     # Buddy
print(buddy.species)  # Dog
print(buddy.sound)    # Woof!
print(buddy)          # Pet(name='Buddy', species='Dog', sound='Woof!')

hero: Player = Player(username="StarKid", score=500)
print(hero.username)  # StarKid
print(hero.level)     # 1 (used the default)
```

Look at how much less code you need! Compare this to writing the class by hand:

```python
# Without dataclass -- you write everything yourself
class PetManual:
    def __init__(self, name: str, species: str, sound: str) -> None:
        self.name: str = name
        self.species: str = species
        self.sound: str = sound

    def __repr__(self) -> str:
        return f"PetManual(name={self.name!r}, species={self.species!r}, sound={self.sound!r})"


# With dataclass -- Python writes __init__ and __repr__ for you
@dataclass
class PetAuto:
    name: str
    species: str
    sound: str
```

The `@dataclass` decorator looks at the type hints you wrote and automatically creates the `__init__` method, the `__repr__` method (for printing), and even comparison methods. It saves you from writing repetitive code.

---

## Running mypy: Checking Your Type Hints

![A flat vector illustration in a children's educational book style showing Byte the robot looking at a checklist on a clipboard, with green checkmarks next to correct items and a red X next to one mistake. A magnifying glass hovers over the mistake. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

All these type hints are only useful if something actually checks them. That something is called **mypy**. It is a tool that reads your code, checks that all the types match up, and reports mistakes -- **without running your code**.

First, install it:

```
pip install mypy
```

Then create a file with a type mistake. Open your editor. Type this. Save it as `type_check_demo.py`.

```python
def add_numbers(a: int, b: int) -> int:
    return a + b


result: int = add_numbers(3, "five")  # Bug! "five" is not an int
print(result)
```

Now run mypy:

```
mypy type_check_demo.py
```

Output:

```
type_check_demo.py:5: error: Argument 2 to "add_numbers" has incompatible type "str"; expected "int"
```

mypy found the bug without running the code! If you had just run `python type_check_demo.py`, Python would crash at runtime with an error. mypy catches it earlier, before anyone sees the crash.

### mypy Is Smart About Checks

mypy understands `if` statements and can figure out when a type has been narrowed down:

```python
def process(name: str | None) -> str:
    # mypy knows name could be None here
    # name.upper()  # ERROR: None has no .upper() method

    if name is not None:
        # mypy knows name is definitely a str here
        return name.upper()  # This is fine!

    return "unknown"
```

After the `if name is not None` check, mypy knows that `name` must be a string (because you just ruled out `None`). This is called **type narrowing**.

---

## Type Hints Do Not Change How Code Runs

This is very important to understand. Type hints are **completely ignored** by Python when your code runs. They exist only for:

- `mypy` and other type-checking tools
- Your code editor (for suggestions and error highlighting)
- Humans reading the code

```python
# Python will run this WITHOUT any error, even though the types are wrong!
x: int = "this is actually a string"  # type: ignore
print(x)  # this is actually a string
```

Python does not enforce type hints at runtime. It is your job to run `mypy` to check them. Think of type hints as a safety net that you choose to use -- but you have to actively set it up by running `mypy`.

---

## Putting It All Together

Here is a complete example that uses many of the type features from this lesson.

Open your editor. Type this. Run it.

```python
from dataclasses import dataclass


@dataclass
class Student:
    name: str
    grades: list[int]

    @property
    def average(self) -> float:
        if len(self.grades) == 0:
            return 0.0
        return sum(self.grades) / len(self.grades)


type StudentList = list[Student]


def find_student(students: StudentList, name: str) -> Student | None:
    """Find a student by name. Returns None if not found."""
    student: Student
    for student in students:
        if student.name == name:
            return student
    return None


# Create some students
roster: StudentList = [
    Student(name="Alice", grades=[90, 85, 92]),
    Student(name="Bob", grades=[78, 88, 95]),
    Student(name="Charlie", grades=[60, 70, 65]),
]

# Use our typed functions
student: Student
for student in roster:
    print(f"{student.name}: average = {student.average:.1f}")

found: Student | None = find_student(roster, "Bob")
if found is not None:
    print(f"Found {found.name} with grades {found.grades}")
```

Every function has typed parameters and a typed return value. Every variable is labeled. The type alias `StudentList` keeps things readable. And `Student | None` makes it clear when a value might not exist.

---

## Common Mistakes

1. **Using `Any` everywhere.** `Any` tells the type checker "ignore this" -- it defeats the whole purpose of type hints. Only use `Any` when you truly cannot figure out the type. If you find yourself using `Any` a lot, your types need more thought.

2. **Ignoring mypy errors.** When mypy reports a problem, it is almost always a real bug or a type hint that needs fixing. Do not just silence it. Read the error, understand it, and fix it.

3. **Making types too complicated.** If a type hint is longer than the code it labels, create a type alias. `dict[str, list[tuple[int, str]]]` is hard to read. Give it a name like `type ScoreHistory = dict[str, list[tuple[int, str]]]`.

4. **Thinking type hints validate data at runtime.** Type hints do NOT check real data while your program runs. If you receive data from a file or from the internet, you still need to check it yourself in your code. Type hints only help tools like `mypy` check your logic before running.

5. **Forgetting to run mypy.** Writing type hints without running mypy is like putting labels on containers but never reading them. The labels only help if you actually look at them. Get in the habit of running `mypy your_file.py` regularly.

---

![A flat vector illustration in a children's educational book style showing Byte the robot standing proudly next to a large, colorful blueprint on an easel that shows a well-organized program with labeled components and arrows connecting them. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

## Practice Questions

Try answering these on your own before looking at the answers at the bottom of the page.

**1.** Name three benefits of using type hints.

**2.** Do type hints change how Python runs your code? Explain.

**3.** Add type hints to this function: `def calculate_area(width, height)` that takes two decimal numbers and returns a decimal number.

**4.** What does `str | None` mean? Why is it useful?

**5.** Write a function called `find_longest` that takes a `list[str]` and returns `str | None`. It should return the longest word, or `None` if the list is empty. Include full type hints.

**6.** What is a type alias? Write a type alias called `Scoreboard` for `dict[str, list[int]]` and use it in a function signature.

**7.** What does `Callable[[int, int], int]` mean? Break it down into plain language.

**8.** Create a `@dataclass` called `Book` with a `title` (string), `author` (string), and `pages` (whole number). Show how to create an instance of it.

**9.** What does mypy do? Does it run your code?

---

**Previous:** [[wiki:python-jr-decorators-closures]] | **Next:** [[wiki:python-jr-ds-arrays]]

---

## Answers to Practice Questions

**1.** Three benefits of type hints:
- They help catch mistakes before you run your code (by using a tool like mypy).
- They act as documentation that stays accurate -- unlike comments, type hints are checked by tools so they do not get outdated.
- They make your code editor smarter -- your editor can suggest methods, show function signatures, and highlight problems because it knows what type everything is.

**2.** No, type hints do not change how Python runs your code at all. Python completely ignores them at runtime. They are only used by tools like mypy (for checking types) and by your code editor (for suggestions and warnings). You could remove every type hint from your program and it would run exactly the same way.

**3.**

```python
def calculate_area(width: float, height: float) -> float:
    return width * height
```

**4.** `str | None` means "this value is either a string or `None` (nothing)." It is useful because it makes it clear that the value might not exist. This warns anyone reading the code to check for `None` before trying to use the value as a string. Without this label, you might accidentally try to do string operations on `None` and crash your program.

**5.**

```python
def find_longest(words: list[str]) -> str | None:
    """Return the longest word, or None if the list is empty."""
    if len(words) == 0:
        return None

    longest: str = words[0]
    word: str
    for word in words:
        if len(word) > len(longest):
            longest = word
    return longest
```

**6.** A type alias is a short nickname for a long or complicated type. It makes your code easier to read by replacing the full type with a meaningful name.

```python
type Scoreboard = dict[str, list[int]]


def print_scores(board: Scoreboard) -> None:
    name: str
    scores: list[int]
    for name, scores in board.items():
        print(f"{name}: {scores}")


my_board: Scoreboard = {"Alice": [90, 85], "Bob": [78, 92]}
print_scores(my_board)
```

**7.** `Callable[[int, int], int]` means "a function that takes two whole numbers as input and gives back one whole number." The `[int, int]` part describes what goes in (two integer arguments), and the final `int` describes what comes out (an integer return value). It is a label for a function, just like `str` is a label for text.

**8.**

```python
from dataclasses import dataclass


@dataclass
class Book:
    title: str
    author: str
    pages: int


my_book: Book = Book(title="The Python Quest", author="Byte", pages=320)
print(my_book.title)   # The Python Quest
print(my_book.author)  # Byte
print(my_book.pages)   # 320
print(my_book)          # Book(title='The Python Quest', author='Byte', pages=320)
```

**9.** mypy is a tool that reads your Python code, checks that all the type hints match up correctly, and reports any mistakes it finds. It does NOT run your code. It only analyzes the text of your program to look for type mismatches. For example, if a function expects an `int` but you pass a `str`, mypy will tell you about the problem without ever executing the program. You run it from the terminal with `mypy your_file.py`.
