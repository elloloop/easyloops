# Strings: Words, Sentences, and Text

You already know how to store text in variables using quotes. Now it's time to really understand **strings** — one of the most useful types in Python. Almost every program you'll ever write will work with text in some way!

![A flat vector illustration in a children's educational book style showing Byte the robot holding up a banner made of colorful letter blocks that spell out HELLO. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a String, Really?

You know a **word** is made of **letters**. In the same way, a **string** is made of **characters**.

A character can be a letter, a digit, a space, a punctuation mark — anything you can type on a keyboard.

```python
greeting = "Hello!"
```

This string has **6 characters**: `H`, `e`, `l`, `l`, `o`, `!`

Think of a string like a row of mailboxes on a street. Each mailbox holds one character, and each has a number (its **index**) starting from 0.

```
Index:    0   1   2   3   4   5
        +---+---+---+---+---+---+
        | H | e | l | l | o | ! |
        +---+---+---+---+---+---+
```

---

## Strings Are Sequences (Just Like Lists!)

Remember lists? A list is a sequence of items. A string is a sequence of characters. That means many things you learned with lists work with strings too!

```python
word = "Python"

# Length
print(len(word))       # 6

# Indexing
print(word[0])         # P
print(word[-1])        # n

# Checking membership
print("y" in word)     # True
print("z" in word)     # False
```

---

## Indexing and Slicing

Just like with lists, you can grab one character or a slice of characters.

### Indexing (One Character)

```python
name = "Byte"
print(name[0])    # B
print(name[1])    # y
print(name[-1])   # e  (last character)
print(name[-2])   # t  (second to last)
```

### Slicing (A Piece of the String)

The pattern is `string[start:stop]` — it gives you characters from `start` up to (but not including) `stop`.

```python
message = "Hello, World!"

print(message[0:5])    # Hello
print(message[7:12])   # World
print(message[:5])     # Hello      (from the beginning)
print(message[7:])     # World!     (to the end)
print(message[::2])    # Hlo ol!   (every 2nd character)
```

If you remember list slicing, this is the exact same thing. Strings are sequences!

---

## Strings Are Immutable

Here's an important rule: **you cannot change a character inside a string**. Strings are **immutable** (that means "unchangeable").

```python
word = "cat"
word[0] = "b"   # ERROR! You can't do this!
```

If you want to change something, you make a **new** string:

```python
word = "cat"
new_word = "b" + word[1:]   # Take everything except the first letter
print(new_word)             # bat
```

Think of it like a printed book. You can't erase a letter on page 42 — but you can print a new edition with the change.

![A flat vector illustration in a children's educational book style showing Byte the robot looking at two signs, one showing an old word and one showing a new word with an arrow between them to represent making a new string. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Useful String Methods

Strings come with built-in tools called **methods**. You use them with a dot: `my_string.method_name()`.

### Changing Case

```python
shout = "hello there"
print(shout.upper())      # HELLO THERE
print(shout.lower())      # hello there
print(shout.title())      # Hello There
print(shout.capitalize()) # Hello there
```

Remember: these don't change the original string. They give you a **new** string. (Because strings are immutable!)

### Stripping Extra Spaces

Sometimes text has extra spaces at the beginning or end. `.strip()` removes them.

```python
messy = "   hello   "
print(messy.strip())    # "hello"
print(messy.lstrip())   # "hello   "  (left side only)
print(messy.rstrip())   # "   hello"  (right side only)
```

This is super useful when reading input from users — they often add accidental spaces.

### Replacing Text

`.replace(old, new)` swaps every occurrence of `old` with `new`.

```python
sentence = "I like cats and cats like me"
print(sentence.replace("cats", "dogs"))
# I like dogs and dogs like me
```

### Splitting and Joining

These two are a powerful pair.

`.split()` is like **cutting a sentence into words**. It gives you a list.

```python
sentence = "the quick brown fox"
words = sentence.split()
print(words)   # ['the', 'quick', 'brown', 'fox']
```

You can split on any character:

```python
data = "red,green,blue"
colors = data.split(",")
print(colors)   # ['red', 'green', 'blue']
```

`.join()` is like **gluing words back together**. You call it on the "glue" string.

```python
words = ['the', 'quick', 'brown', 'fox']
sentence = " ".join(words)
print(sentence)   # the quick brown fox

# Use any glue you want
print("-".join(words))    # the-quick-brown-fox
print(", ".join(words))   # the, quick, brown, fox
```

Think of `.split()` as scissors and `.join()` as a glue stick.

---

## f-Strings and Formatting

You already know f-strings let you put variables inside text:

```python
name = "Byte"
print(f"Hello, {name}!")   # Hello, Byte!
```

But f-strings can do more! You can **format numbers** inside the curly braces.

### Decimal Places with `:.2f`

The `:.2f` format means "show as a decimal number with exactly 2 places after the dot."

```python
price = 9.99999
print(f"Total: ${price:.2f}")   # Total: $9.10
# Wait, let's be precise:
price = 19.5
print(f"Total: ${price:.2f}")   # Total: $19.50

pi = 3.14159265
print(f"Pi is about {pi:.2f}")  # Pi is about 3.14
print(f"Pi is about {pi:.4f}")  # Pi is about 3.1416
```

### Other Handy Formats

```python
big_number = 1000000
print(f"{big_number:,}")        # 1,000,000  (commas!)

percentage = 0.85
print(f"{percentage:.1%}")      # 85.0%

# Padding with spaces (useful for neat columns)
for item in ["apple", "pie", "cake"]:
    print(f"{item:>10}")  # right-aligned in 10 spaces
```

---

## Checking String Content

Python gives you methods to ask questions about what's inside a string.

```python
# Is it all digits?
print("12345".isdigit())     # True
print("123.45".isdigit())    # False (the dot isn't a digit)

# Is it all letters?
print("hello".isalpha())     # True
print("hello2".isalpha())    # False (2 is not a letter)

# Does it start or end with something?
filename = "report.pdf"
print(filename.startswith("report"))  # True
print(filename.endswith(".pdf"))      # True
print(filename.endswith(".txt"))      # False
```

These are great for **validation** — checking that the user typed something that makes sense.

```python
user_input = input("Enter your age: ")
if user_input.isdigit():
    age = int(user_input)
    print(f"You are {age} years old.")
else:
    print("That's not a valid number!")
```

![A flat vector illustration in a children's educational book style showing Byte the robot using a magnifying glass to inspect individual characters inside a long ribbon of text. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Looping Through Characters

Since a string is a sequence, you can loop through it character by character — just like looping through a list.

```python
word = "Byte"
for letter in word:
    print(letter)
```

Output:
```
B
y
t
e
```

You can also use `enumerate()` if you want the index too:

```python
word = "Byte"
for i, letter in enumerate(word):
    print(f"Index {i}: {letter}")
```

Output:
```
Index 0: B
Index 1: y
Index 2: t
Index 3: e
```

### Counting Characters

```python
message = "banana"
count = 0
for char in message:
    if char == "a":
        count += 1
print(f"There are {count} a's")   # There are 3 a's
```

Or the easy way:

```python
print("banana".count("a"))   # 3
```

---

## Escape Characters

Sometimes you need special characters that you can't just type normally. You use a **backslash** `\` to create them.

### `\n` — New Line

This moves to the next line, like pressing Enter.

```python
print("Line one\nLine two\nLine three")
```

Output:
```
Line one
Line two
Line three
```

### `\t` — Tab

This adds a big space (a tab), useful for lining things up.

```python
print("Name\tScore")
print("Byte\t95")
print("Pixel\t88")
```

Output:
```
Name    Score
Byte    95
Pixel   88
```

### Backslash Itself

To put an actual backslash in your string, use `\\`:

```python
print("The file is at C:\\Users\\Byte")
# The file is at C:\Users\Byte
```

### Quotes Inside Strings

```python
# Use the other type of quote
print("She said 'hello'")
print('She said "hello"')

# Or escape them
print("She said \"hello\"")
```

---

## Common String Patterns

### Reversing a String

Remember the slice trick with step `-1`? It works on strings too!

```python
word = "hello"
backwards = word[::-1]
print(backwards)   # olleh
```

### Checking for Palindromes

A **palindrome** is a word that reads the same forwards and backwards, like "racecar" or "level".

```python
def is_palindrome(text):
    cleaned = text.lower().strip()
    return cleaned == cleaned[::-1]

print(is_palindrome("racecar"))   # True
print(is_palindrome("hello"))     # False
print(is_palindrome("Level"))     # True (we lowered the case)
```

### Building a String Character by Character

```python
# Remove all vowels from a word
word = "programming"
result = ""
for char in word:
    if char not in "aeiou":
        result += char
print(result)   # prgrmmng
```

### Finding and Counting

```python
story = "the cat sat on the mat"

# Find position of first occurrence
print(story.find("cat"))     # 4
print(story.find("dog"))     # -1 (not found)

# Count occurrences
print(story.count("the"))    # 2
print(story.count("at"))     # 3
```

![A flat vector illustration in a children's educational book style showing Byte the robot arranging colorful letter tiles on a table, some forwards and some backwards, exploring palindromes. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Putting It All Together

Here's a small program that uses many string skills:

```python
# A simple word analyzer
word = input("Enter a word: ")

print(f"\nAnalyzing: '{word}'")
print(f"Length: {len(word)} characters")
print(f"Uppercase: {word.upper()}")
print(f"Lowercase: {word.lower()}")
print(f"Reversed: {word[::-1]}")

if word.lower() == word[::-1].lower():
    print("This is a palindrome!")

if word.isalpha():
    print("Contains only letters.")
elif word.isdigit():
    print("Contains only digits.")
else:
    print("Contains a mix of characters.")

# Count each character
print("\nCharacter counts:")
for char in sorted(set(word.lower())):
    print(f"  '{char}' appears {word.lower().count(char)} time(s)")
```

---

## Quick Reference

| What You Want                 | How To Do It                     |
|-------------------------------|----------------------------------|
| Length of string              | `len(s)`                         |
| Get one character             | `s[0]`, `s[-1]`                  |
| Get a slice                   | `s[1:4]`, `s[:3]`, `s[2:]`      |
| Reverse                       | `s[::-1]`                        |
| Uppercase / lowercase         | `s.upper()`, `s.lower()`        |
| Remove extra spaces           | `s.strip()`                      |
| Replace text                  | `s.replace("old", "new")`       |
| Split into a list             | `s.split()`, `s.split(",")`     |
| Join a list into a string     | `" ".join(my_list)`             |
| Check start/end               | `s.startswith("x")`, `s.endswith("x")` |
| Check content type            | `s.isdigit()`, `s.isalpha()`    |
| Count occurrences             | `s.count("x")`                  |
| Find position                 | `s.find("x")`                   |
| Format numbers in f-string    | `f"{val:.2f}"`, `f"{val:,}"`   |

---

## Practice Questions

Try these on your own before peeking at the answers!

**Question 1:** What does this code print?

```python
word = "Python"
print(word[1:4])
```

**Question 2:** What does this code print?

```python
sentence = "hello world"
print(sentence.replace("world", "there").upper())
```

**Question 3:** Write a line of code that takes the string `"apple,banana,cherry"` and turns it into the list `['apple', 'banana', 'cherry']`.

**Question 4:** Write a line of code that takes the list `['red', 'green', 'blue']` and turns it into the string `"red - green - blue"`.

**Question 5:** What does this code print?

```python
name = "  Byte  "
print(f">{name.strip()}<")
```

**Question 6:** Write a function called `count_vowels(text)` that returns how many vowels (a, e, i, o, u) are in a string. It should work regardless of uppercase or lowercase.

**Question 7:** What does this code print?

```python
word = "racecar"
print(word == word[::-1])
```

**Question 8:** What does `"hello\tworld\n"` look like when printed?

---

## Answers to Practice Questions

**Answer 1:**
```
yth
```
Slicing from index 1 up to (not including) index 4 gives characters at positions 1, 2, 3.

**Answer 2:**
```
HELLO THERE
```
First `.replace()` changes "world" to "there" giving "hello there", then `.upper()` makes it all caps.

**Answer 3:**
```python
fruits = "apple,banana,cherry".split(",")
```

**Answer 4:**
```python
result = " - ".join(['red', 'green', 'blue'])
```

**Answer 5:**
```
>Byte<
```
`.strip()` removes the spaces on both sides, and the `>` and `<` show exactly where the text starts and ends.

**Answer 6:**
```python
def count_vowels(text):
    count = 0
    for char in text.lower():
        if char in "aeiou":
            count += 1
    return count
```

**Answer 7:**
```
True
```
`"racecar"` reversed is still `"racecar"`, so they are equal. It's a palindrome!

**Answer 8:**
```
hello   world
```
The `\t` creates a tab (a wide gap), and `\n` creates a new line (so the cursor moves down). The output has "hello", then a tab space, then "world", then a blank line.

---

**Next up:** [[wiki:python-jr-tuples-and-unpacking]] — Learn about tuples, Python's "sealed" lists!

**Previous:** [[wiki:python-jr-sets]] | **Up:** [[wiki:python-jr-home]]
