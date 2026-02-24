# Special Methods -- Secret Abilities for Your Objects

## What Are Special Methods?

You know how some things in Python just seem to work like magic? You write `len("hello")` and get `5`. You write `3 + 4` and get `7`. You write `print(something)` and it shows up on your screen.

None of that is actually magic. Behind the scenes, Python is calling **special methods** on those objects. And here is the exciting part: you can give YOUR objects the same abilities!

Special methods are methods with **double underscores on both sides**, like `__len__` or `__add__`. People sometimes call them "dunder methods" (short for "double underscore"). They are like **secret abilities** you can give your objects to make them work with Python's built-in features.

![A flat vector illustration in a children's educational book style showing Byte the robot opening a treasure chest filled with glowing scrolls, each scroll labeled with symbols like +, ==, and len. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

You have already seen one special method: `__init__`. Python calls it automatically when you create a new object. Now let's learn the others!

---

## `__repr__` and `__str__` -- How Your Object Introduces Itself

When you `print()` an object, Python needs to figure out what text to show. Without any special methods, you get something ugly and unhelpful:

```python
class Pet:
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species

my_pet: Pet = Pet("Buddy", "dog")
print(my_pet)  # <__main__.Pet object at 0x7f...>  -- what??
```

That jumble of letters and numbers is NOT useful. Let's fix it by adding `__str__` and `__repr__`.

Think of it like two ways your object can introduce itself:

- **`__str__`** is the **friendly introduction** -- what you would say to a friend. "Hi, I'm Buddy the dog!"
- **`__repr__`** is the **detailed introduction** -- what you would write on an official form. "Pet(name='Buddy', species='dog')"

```python
class Pet:
    def __init__(self, name: str, species: str) -> None:
        self.name: str = name
        self.species: str = species

    def __str__(self) -> str:
        return f"{self.name} the {self.species}"

    def __repr__(self) -> str:
        return f"Pet(name='{self.name}', species='{self.species}')"

my_pet: Pet = Pet("Buddy", "dog")
print(my_pet)        # Buddy the dog          -- uses __str__
print(repr(my_pet))  # Pet(name='Buddy', species='dog') -- uses __repr__
```

Here is a good rule: **always add `__repr__`**. If you do not add `__str__`, Python will use `__repr__` as a backup. But if you have neither, you get that ugly `<object at 0x...>` nonsense.

---

## `__eq__` -- Teaching Your Object to Compare with ==

By default, `==` checks if two variables point to the **exact same object in memory**, not if they have the same data:

```python
class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

p1: Point = Point(3, 4)
p2: Point = Point(3, 4)
print(p1 == p2)  # False!  They have the same numbers, but Python
                  # thinks they are different because they are
                  # different objects in memory.
```

That is frustrating. Two points at the same spot should be equal! Let's teach the object how to compare:

```python
class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __repr__(self) -> str:
        return f"Point({self.x}, {self.y})"

p1: Point = Point(3, 4)
p2: Point = Point(3, 4)
p3: Point = Point(1, 2)

print(p1 == p2)  # True!  Same x and y values
print(p1 == p3)  # False  Different values
```

The `isinstance` check is a safety net. If someone tries to compare a Point with something completely different (like a string), instead of crashing, it tells Python: "I do not know how to compare myself to that."

---

## `__lt__` and Comparison Methods -- Teaching < and >

You can also teach your objects to be compared with `<`, `>`, `<=`, and `>=`. This is especially useful because it makes `sorted()` work with your objects!

```python
class Student:
    def __init__(self, name: str, grade: int) -> None:
        self.name: str = name
        self.grade: int = grade

    def __lt__(self, other: "Student") -> bool:
        return self.grade < other.grade

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Student):
            return NotImplemented
        return self.grade == other.grade

    def __repr__(self) -> str:
        return f"Student('{self.name}', grade={self.grade})"

alice: Student = Student("Alice", 95)
bob: Student = Student("Bob", 87)
charlie: Student = Student("Charlie", 95)

print(bob < alice)      # True  (87 < 95)
print(alice == charlie)  # True  (both have 95)

# Sorting works automatically when you have __lt__!
students: list[Student] = [alice, bob, charlie]
students.sort()
print(students)  # [Student('Bob', grade=87), Student('Alice', grade=95), ...]
```

---

## `__len__` -- Making len() Work on Your Object

The `len()` function works on lists, strings, and dictionaries. You can make it work on your objects too!

```python
class Backpack:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __len__(self) -> int:
        return len(self._items)

    def __repr__(self) -> str:
        return f"Backpack({self._items})"

bag: Backpack = Backpack()
bag.add("notebook")
bag.add("pencil")
bag.add("lunchbox")

print(len(bag))  # 3  -- just like len() on a list!
```

---

## `__getitem__` -- Making Square Brackets Work

Want to use `my_object[0]` like you do with lists? Add `__getitem__`.

```python
class Bookshelf:
    def __init__(self) -> None:
        self._books: list[str] = []

    def add(self, book: str) -> None:
        self._books.append(book)

    def __getitem__(self, index: int) -> str:
        return self._books[index]

    def __len__(self) -> int:
        return len(self._books)

    def __repr__(self) -> str:
        return f"Bookshelf({self._books})"

shelf: Bookshelf = Bookshelf()
shelf.add("Harry Potter")
shelf.add("Charlotte's Web")
shelf.add("The Hobbit")

print(shelf[0])   # Harry Potter
print(shelf[2])   # The Hobbit
print(shelf[-1])  # The Hobbit  (negative indexing works too!)
```

![A flat vector illustration in a children's educational book style showing Byte the robot standing in front of a colorful bookshelf, reaching for a book with a numbered tag on its spine, with brackets [] floating in the air nearby. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## `__iter__` and `__next__` -- Making for Loops Work

This is one of the coolest special methods. You can make your object work in a `for` loop!

When you write `for item in something`, Python calls `__iter__` to start the loop, and then calls `__next__` over and over to get each item. When there are no more items, `__next__` raises `StopIteration` and the loop ends.

```python
class Countdown:
    def __init__(self, start: int) -> None:
        self.start: int = start
        self._current: int = start

    def __iter__(self) -> "Countdown":
        self._current = self.start
        return self

    def __next__(self) -> int:
        if self._current < 0:
            raise StopIteration
        value: int = self._current
        self._current -= 1
        return value

countdown: Countdown = Countdown(5)
for number in countdown:
    print(number)
# 5
# 4
# 3
# 2
# 1
# 0
```

You will learn much more about iterators in [[wiki:python-jr-iterators-generators]]. For now, just know that `__iter__` and `__next__` are the special methods that make `for` loops work.

---

## `__add__` -- Making + Work with Your Objects

You know how `3 + 4` gives you `7` and `"hello" + " world"` gives you `"hello world"`? You can make `+` work with your objects too!

```python
class Wallet:
    def __init__(self, amount: float) -> None:
        self.amount: float = amount

    def __add__(self, other: "Wallet") -> "Wallet":
        return Wallet(self.amount + other.amount)

    def __repr__(self) -> str:
        return f"Wallet(${self.amount:.2f})"

wallet1: Wallet = Wallet(20.00)
wallet2: Wallet = Wallet(15.50)
combined: Wallet = wallet1 + wallet2

print(combined)  # Wallet($35.50)
```

---

## `__contains__` -- Making "in" Work with Your Object

The `in` keyword checks if something is inside a collection. You can make it work with your own objects:

```python
class Toybox:
    def __init__(self) -> None:
        self._toys: list[str] = []

    def add(self, toy: str) -> None:
        self._toys.append(toy)

    def __contains__(self, toy: str) -> bool:
        return toy in self._toys

    def __repr__(self) -> str:
        return f"Toybox({self._toys})"

box: Toybox = Toybox()
box.add("teddy bear")
box.add("toy car")
box.add("building blocks")

print("teddy bear" in box)    # True
print("doll" in box)           # False
print("toy car" in box)        # True
```

---

## Context Managers: `__enter__` and `__exit__` (A Quick Look)

You might have seen the `with` keyword before, like `with open("file.txt") as f:`. The `with` statement uses two special methods: `__enter__` and `__exit__`.

`__enter__` runs at the start of the `with` block. `__exit__` runs at the end, even if something goes wrong. This is perfect when you need to clean something up when you are done.

```python
class GameSession:
    def __init__(self, player_name: str) -> None:
        self.player_name: str = player_name

    def __enter__(self) -> "GameSession":
        print(f"{self.player_name} started a game session!")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        print(f"{self.player_name}'s game session ended. Progress saved!")
        return False

with GameSession("Byte") as session:
    print("Playing the game...")
    print("Collecting coins...")
    print("Defeating the boss!")

# Output:
# Byte started a game session!
# Playing the game...
# Collecting coins...
# Defeating the boss!
# Byte's game session ended. Progress saved!
```

The `__exit__` method always runs -- even if something crashes inside the `with` block. That is what makes it so useful for cleanup.

---

## Practical Example: A Deck of Cards

Let's build something cool that uses many of these special methods together. A deck of cards that supports `len()`, indexing with `[]`, iteration with `for`, and the `in` keyword.

Open your editor. Type this. Run it.

```python
class Card:
    def __init__(self, rank: str, suit: str) -> None:
        self.rank: str = rank
        self.suit: str = suit

    def __repr__(self) -> str:
        return f"{self.rank} of {self.suit}"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Card):
            return NotImplemented
        return self.rank == other.rank and self.suit == other.suit


class Deck:
    def __init__(self) -> None:
        suits: list[str] = ["Hearts", "Diamonds", "Clubs", "Spades"]
        ranks: list[str] = [
            "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "Jack", "Queen", "King", "Ace",
        ]
        self._cards: list[Card] = []
        for suit in suits:
            for rank in ranks:
                self._cards.append(Card(rank, suit))

    def __len__(self) -> int:
        return len(self._cards)

    def __getitem__(self, index: int) -> Card:
        return self._cards[index]

    def __contains__(self, card: Card) -> bool:
        return card in self._cards

    def __iter__(self):
        return iter(self._cards)

    def __repr__(self) -> str:
        return f"Deck({len(self._cards)} cards)"


deck: Deck = Deck()

# len() works!
print(f"Cards in deck: {len(deck)}")   # Cards in deck: 52

# Square brackets work!
print(f"First card: {deck[0]}")        # First card: 2 of Hearts
print(f"Last card: {deck[-1]}")        # Last card: Ace of Spades

# "in" works!
ace_of_spades: Card = Card("Ace", "Spades")
print(f"Ace of Spades in deck? {ace_of_spades in deck}")  # True

joker: Card = Card("Joker", "None")
print(f"Joker in deck? {joker in deck}")  # False

# for loops work!
print("\nFirst 5 cards:")
count: int = 0
for card in deck:
    if count >= 5:
        break
    print(f"  {card}")
    count += 1
# First 5 cards:
#   2 of Hearts
#   3 of Hearts
#   4 of Hearts
#   5 of Hearts
#   6 of Hearts
```

![A flat vector illustration in a children's educational book style showing Byte the robot happily fanning out a hand of colorful playing cards, with card suit symbols floating around. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

That is a LOT of power from just a few special methods! Your `Deck` class now works like a built-in Python type.

---

## Quick Reference Table

Here are the most useful special methods and what they do:

| When you write... | Python calls... | What it does |
|---|---|---|
| `print(obj)` | `__str__` | Friendly text version |
| `repr(obj)` | `__repr__` | Detailed text version |
| `obj1 == obj2` | `__eq__` | Check if equal |
| `obj1 < obj2` | `__lt__` | Check if less than |
| `len(obj)` | `__len__` | Get the length |
| `obj[index]` | `__getitem__` | Get item by position |
| `obj1 + obj2` | `__add__` | Add objects together |
| `item in obj` | `__contains__` | Check if item is inside |
| `for x in obj` | `__iter__` / `__next__` | Loop through items |
| `with obj` | `__enter__` / `__exit__` | Setup and cleanup |

---

## Summary

Let's review what you learned:

- **Special methods** (dunder methods) are secret abilities you give your objects. They have double underscores on both sides, like `__len__`.
- **`__str__`** is the friendly introduction (for users). **`__repr__`** is the detailed one (for developers). Always define at least `__repr__`.
- **`__eq__`** teaches your object how to compare with `==`. Without it, Python only checks if two variables are the exact same object.
- **`__lt__`** teaches your object to compare with `<`, which also makes sorting work.
- **`__len__`** makes `len()` work on your object.
- **`__getitem__`** makes square bracket indexing `[]` work on your object.
- **`__iter__`** and **`__next__`** make your object work with `for` loops.
- **`__add__`** makes the `+` operator work with your objects.
- **`__contains__`** makes the `in` keyword work with your object.
- **`__enter__`** and **`__exit__`** make your object work with `with` statements.
- Only add special methods that make clear sense for your type.

---

## Practice Questions

**Question 1:** What are special methods? Why do they have double underscores on both sides? Name three special methods and explain what each one does.

**Question 2:** What is the difference between `__str__` and `__repr__`? If you could only add one, which should you choose and why?

**Question 3:** Write a class called `ScoreBoard` with a list of scores (integers). Give it `__len__` (returns how many scores), `__getitem__` (lets you access scores by index), and `__repr__` (shows the scoreboard). Test each one.

**Question 4:** Write a class called `CoinJar` that stores an amount of money. Give it `__add__` so you can add two coin jars together. Give it `__eq__` so two coin jars with the same amount are equal. Give it `__str__` to display the amount nicely.

**Question 5:** Why does this code print `False` even though both points have the same values? How would you fix it?

```python
class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

p1: Point = Point(5, 10)
p2: Point = Point(5, 10)
print(p1 == p2)  # False
```

**Question 6:** Write a class called `Playlist` that holds a list of song names. Give it these abilities:
- `len()` returns the number of songs
- `playlist[0]` returns the first song
- `"song name" in playlist` checks if a song is in the playlist
- `for song in playlist` loops through all songs
- `print(playlist)` shows a nice description

**Question 7:** Look at the quick reference table. Which special method would you use if you wanted to make `my_object - other_object` work (subtraction)? What would it be called? (Hint: follow the pattern of `__add__`.)

---

## Answers to Practice Questions

**Answer 1:** Special methods are methods you add to your classes that let them work with Python's built-in features like `print()`, `len()`, `+`, `==`, and `for` loops. They have double underscores on both sides because that is Python's naming convention for these built-in hook methods -- it prevents them from clashing with your own method names. Three examples: `__len__` lets `len()` work on your object, `__eq__` lets `==` compare your objects by value, and `__str__` controls what shows up when you `print()` your object.

**Answer 2:** `__str__` gives a friendly, human-readable version ("Buddy the dog"), while `__repr__` gives a detailed, developer-focused version ("Pet(name='Buddy', species='dog')"). If you can only add one, choose `__repr__`, because Python will use `__repr__` as a backup when `__str__` is missing. This way, `print()` still shows something useful.

**Answer 3:**

```python
class ScoreBoard:
    def __init__(self) -> None:
        self._scores: list[int] = []

    def add_score(self, score: int) -> None:
        self._scores.append(score)

    def __len__(self) -> int:
        return len(self._scores)

    def __getitem__(self, index: int) -> int:
        return self._scores[index]

    def __repr__(self) -> str:
        return f"ScoreBoard({self._scores})"

board: ScoreBoard = ScoreBoard()
board.add_score(100)
board.add_score(85)
board.add_score(92)

print(len(board))     # 3
print(board[0])       # 100
print(board[-1])      # 92
print(repr(board))    # ScoreBoard([100, 85, 92])
```

**Answer 4:**

```python
class CoinJar:
    def __init__(self, amount: float) -> None:
        self.amount: float = amount

    def __add__(self, other: "CoinJar") -> "CoinJar":
        return CoinJar(self.amount + other.amount)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, CoinJar):
            return NotImplemented
        return self.amount == other.amount

    def __str__(self) -> str:
        return f"Coin jar with ${self.amount:.2f}"

jar1: CoinJar = CoinJar(3.50)
jar2: CoinJar = CoinJar(2.25)
jar3: CoinJar = jar1 + jar2

print(jar3)            # Coin jar with $5.75
print(jar1 == jar2)    # False
print(jar1 == CoinJar(3.50))  # True
```

**Answer 5:** It prints `False` because, by default, `==` checks if two variables are the **same object in memory**, not whether they have the same values. Even though `p1` and `p2` both have `x=5` and `y=10`, they are two separate objects. To fix it, add an `__eq__` method:

```python
class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x: int = x
        self.y: int = y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1: Point = Point(5, 10)
p2: Point = Point(5, 10)
print(p1 == p2)  # True
```

**Answer 6:**

```python
class Playlist:
    def __init__(self, name: str) -> None:
        self.name: str = name
        self._songs: list[str] = []

    def add(self, song: str) -> None:
        self._songs.append(song)

    def __len__(self) -> int:
        return len(self._songs)

    def __getitem__(self, index: int) -> str:
        return self._songs[index]

    def __contains__(self, song: str) -> bool:
        return song in self._songs

    def __iter__(self):
        return iter(self._songs)

    def __str__(self) -> str:
        return f"Playlist '{self.name}' with {len(self._songs)} songs"

playlist: Playlist = Playlist("My Favorites")
playlist.add("Happy Song")
playlist.add("Dance Tune")
playlist.add("Chill Vibes")

print(len(playlist))               # 3
print(playlist[0])                  # Happy Song
print("Dance Tune" in playlist)    # True
print("Rock Anthem" in playlist)   # False
print(playlist)                     # Playlist 'My Favorites' with 3 songs

for song in playlist:
    print(f"  Playing: {song}")
```

**Answer 7:** The subtraction special method would be called `__sub__`. Following the pattern: `__add__` handles `+`, so `__sub__` handles `-`. You would write it like this:

```python
def __sub__(self, other: "MyClass") -> "MyClass":
    # subtraction logic here
```

---

**Previous:** [[wiki:python-jr-abstraction]] | **Next:** [[wiki:python-jr-iterators-generators]]
