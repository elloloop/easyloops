# Strings and Text -- Working with Words

Programs work with text all the time. User names, messages, file paths, search queries, email addresses -- all of these are text. In programming, a piece of text is called a **string**. You have already used strings in previous sections, but now we go deep. Strings are one of the most common data types you will ever work with.

## Strings Are Sequences of Characters

A string is a sequence of characters in a specific order. Each character has an index, just like elements in a list.

```python
word: str = "hello"
# index:     0 1 2 3 4

print(word[0])  # h
print(word[1])  # e
print(word[4])  # o
```

The length of a string is the number of characters:

```python
message: str = "hello"
print(len(message))  # 5
```

## Creating Strings

You can use single quotes, double quotes, or triple quotes:

```python
# Single quotes
name: str = 'Alice'

# Double quotes (most common)
greeting: str = "Hello, world!"

# Triple quotes (for multi-line text)
paragraph: str = """This is a long
piece of text that
spans multiple lines."""

# Triple single quotes also work
another: str = '''Also
multiple
lines.'''
```

Single and double quotes do the same thing. Pick one style and stick with it. Most Python programmers use double quotes.

When your string contains a quote character, use the other kind:

```python
sentence: str = "It's a beautiful day"     # use double to hold single
quote: str = 'She said "hello"'            # use single to hold double
```

Open your editor. Type this. Run it.

```python
first: str = "Hello"
second: str = "World"
combined: str = first + " " + second
print(combined)
print(len(combined))
```

You should see `Hello World` and `11`.

## Strings Are Immutable

This is the most important thing to understand about strings: **you cannot change a string after you create it**. Strings are immutable.

```python
word: str = "hello"
# word[0] = "H"  # TypeError: 'str' object does not support item assignment
```

If you want to change a string, you create a new one:

```python
word: str = "hello"
new_word: str = "H" + word[1:]
print(new_word)  # Hello
```

Every string method that seems to "change" the string actually returns a brand new string. The original stays the same.

```python
name: str = "alice"
upper_name: str = name.upper()
print(name)        # alice  (unchanged!)
print(upper_name)  # ALICE  (new string)
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "If I write `word: str = 'hello'` and then `word.upper()`, does `word` change? What do I need to do to keep the uppercase version?"</div>
</div>

## String Indexing and Slicing

Strings work exactly like lists when it comes to indexing and slicing.

```python
text: str = "programming"
#            0123456789...

# Indexing
print(text[0])    # p
print(text[3])    # g
print(text[-1])   # g (last character)
print(text[-2])   # n (second to last)

# Slicing
print(text[0:4])   # prog
print(text[:4])    # prog
print(text[4:])    # ramming
print(text[2:7])   # ogra m
print(text[::-1])  # gnimmargorp (reversed)
```

Open your editor. Type this. Run it.

```python
word: str = "Python"
print(word[0:3])
print(word[3:6])
print(word[::-1])
```

You should see `Pyt`, `hon`, and `nohtyP`.

## Common String Methods

### Changing Case

```python
name: str = "alice smith"

print(name.upper())       # ALICE SMITH
print(name.lower())       # alice smith
print(name.title())       # Alice Smith
print(name.capitalize())  # Alice smith
```

### Stripping Whitespace

User input often has extra spaces. `strip()` removes them from both ends:

```python
raw_input: str = "   hello world   "
clean: str = raw_input.strip()
print(f"'{clean}'")  # 'hello world'

# Only strip left or right side:
print(f"'{raw_input.lstrip()}'")  # 'hello world   '
print(f"'{raw_input.rstrip()}'")  # '   hello world'
```

### Splitting and Joining

`split()` breaks a string into a list. `join()` does the reverse.

```python
sentence: str = "the quick brown fox"
words: list[str] = sentence.split()
print(words)  # ["the", "quick", "brown", "fox"]

# Split on a specific character:
data: str = "alice,bob,charlie"
names: list[str] = data.split(",")
print(names)  # ["alice", "bob", "charlie"]

# Join a list back into a string:
joined: str = " ".join(words)
print(joined)  # "the quick brown fox"

dash_joined: str = "-".join(names)
print(dash_joined)  # "alice-bob-charlie"
```

Open your editor. Type this. Run it.

```python
csv_line: str = "red,green,blue,yellow"
colors: list[str] = csv_line.split(",")
print(colors)

result: str = " | ".join(colors)
print(result)
```

### Replacing Text

```python
message: str = "I like cats and cats are great"
new_message: str = message.replace("cats", "dogs")
print(new_message)  # I like dogs and dogs are great

# Replace only the first occurrence:
once: str = message.replace("cats", "dogs", 1)
print(once)  # I like dogs and cats are great
```

### Finding Text

```python
sentence: str = "the quick brown fox jumps"

# find() returns the index of the first match, or -1 if not found
pos: int = sentence.find("quick")
print(pos)  # 4

not_found: int = sentence.find("slow")
print(not_found)  # -1

# startswith() and endswith() return True or False
print(sentence.startswith("the"))    # True
print(sentence.endswith("jumps"))    # True
print(sentence.startswith("quick"))  # False
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Given `text: str = '  Hello, World!  '`, what does `text.strip().lower().replace('world', 'python')` give you? Work through each step."</div>
</div>

## String Formatting with f-strings

F-strings are the modern way to build strings with variables inside them. Put `f` before the opening quote, and put variables inside curly braces `{}`.

```python
name: str = "Alice"
age: int = 30
message: str = f"My name is {name} and I am {age} years old."
print(message)  # My name is Alice and I am 30 years old.
```

You can put any expression inside the curly braces:

```python
x: int = 10
y: int = 20
print(f"{x} + {y} = {x + y}")  # 10 + 20 = 30

price: float = 19.99
tax: float = 0.08
print(f"Total: ${price * (1 + tax):.2f}")  # Total: $21.59
```

The `:.2f` part is a format specifier. It means "show 2 decimal places for a float."

### Common Format Specifiers

```python
pi: float = 3.14159265

print(f"{pi:.2f}")    # 3.14     (2 decimal places)
print(f"{pi:.4f}")    # 3.1416   (4 decimal places)

big_number: int = 1000000
print(f"{big_number:,}")  # 1,000,000  (commas as separators)

percentage: float = 0.856
print(f"{percentage:.1%}")  # 85.6%  (as a percentage)

text: str = "hi"
print(f"{text:>10}")  # "        hi"  (right-aligned, 10 chars wide)
print(f"{text:<10}")  # "hi        "  (left-aligned)
print(f"{text:^10}")  # "    hi    "  (centered)
```

### Old Formatting (Brief Mention)

You might see older code using `.format()` or `%`:

```python
# .format() style (Python 2.6+)
msg: str = "Hello, {}! You are {} years old.".format("Alice", 30)

# % style (very old)
msg = "Hello, %s! You are %d years old." % ("Alice", 30)
```

Both work, but f-strings are clearer and faster. Use f-strings in new code.

Open your editor. Type this. Run it.

```python
item: str = "Widget"
quantity: int = 42
price: float = 9.99
total: float = quantity * price

print(f"Item: {item}")
print(f"Quantity: {quantity}")
print(f"Price: ${price:.2f}")
print(f"Total: ${total:.2f}")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write an f-string that prints a person's name, age, and height (in meters with 1 decimal place). Example output: 'Alice is 30 years old and 1.7m tall.'"</div>
</div>

## Checking String Content

Python gives you methods to check what kind of characters are in a string:

```python
print("123".isdigit())     # True  (all digits)
print("12.3".isdigit())    # False (dot is not a digit)
print("abc".isalpha())     # True  (all letters)
print("abc123".isalnum())  # True  (letters and/or digits)
print("   ".isspace())     # True  (all whitespace)
print("Hello".isupper())   # False
print("HELLO".isupper())   # True
print("hello".islower())   # True
```

These are useful for validating input:

```python
user_input: str = input("Enter your age: ")

if user_input.isdigit():
    age: int = int(user_input)
    print(f"You are {age} years old")
else:
    print("That is not a valid number")
```

## Iterating Through Characters

### While Loop First

```python
word: str = "hello"

i: int = 0
while i < len(word):
    print(f"Index {i}: {word[i]}")
    i += 1
```

Output:
```
Index 0: h
Index 1: e
Index 2: l
Index 3: l
Index 4: o
```

### For Loop

```python
word: str = "hello"

for char in word:
    print(char)
```

Same output, less code. The for loop gives you each character one at a time.

### Practical Example: Counting Vowels

```python
text: str = "programming is fun"
vowels: str = "aeiou"
count: int = 0

i: int = 0
while i < len(text):
    if text[i].lower() in vowels:
        count += 1
    i += 1

print(f"Vowels: {count}")  # Vowels: 5
```

With a for loop:

```python
text: str = "programming is fun"
vowels: str = "aeiou"
count: int = 0

for char in text:
    if char.lower() in vowels:
        count += 1

print(f"Vowels: {count}")  # Vowels: 5
```

Open your editor. Type this. Run it.

```python
sentence: str = "The Quick Brown Fox"
uppercase_count: int = 0
lowercase_count: int = 0

for char in sentence:
    if char.isupper():
        uppercase_count += 1
    elif char.islower():
        lowercase_count += 1

print(f"Uppercase: {uppercase_count}")
print(f"Lowercase: {lowercase_count}")
```

## Converting Between Strings and Other Types

```python
# Number to string
age: int = 25
age_str: str = str(age)
print(age_str)        # "25"
print(type(age_str))  # <class 'str'>

# String to number
price_str: str = "19.99"
price: float = float(price_str)
print(price)          # 19.99

count_str: str = "42"
count: int = int(count_str)
print(count)          # 42

# String to list of characters
word: str = "hello"
chars: list[str] = list(word)
print(chars)  # ["h", "e", "l", "l", "o"]

# List of characters back to string
joined: str = "".join(chars)
print(joined)  # "hello"
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write code that takes `mixed: str = 'abc123def456'` and extracts all the digits into one string and all the letters into another. Use a for loop to check each character."</div>
</div>

## Escape Characters

Some characters cannot be typed directly in a string. You use a backslash `\` to represent them:

```python
# Newline -- starts a new line
print("Line 1\nLine 2\nLine 3")

# Tab -- inserts a tab space
print("Name\tAge\tCity")
print("Alice\t30\tNew York")

# Backslash -- prints an actual backslash
print("C:\\Users\\Alice\\Documents")

# Quote inside the same type of quotes
print("She said \"hello\"")
print('It\'s fine')
```

Open your editor. Type this. Run it.

```python
header: str = "Name\tScore\tGrade"
row1: str = "Alice\t92\tA"
row2: str = "Bob\t85\tB"

print(header)
print(row1)
print(row2)
```

## String Comparison

Strings can be compared with `==`, `!=`, `<`, `>`, etc. Comparison is case-sensitive.

```python
print("hello" == "hello")  # True
print("hello" == "Hello")  # False (different case)
print("hello" != "world")  # True

# Alphabetical comparison (based on Unicode values)
print("apple" < "banana")  # True (a comes before b)
print("cat" > "car")       # True (t comes after r)
```

When comparing user input, always normalize the case first:

```python
answer: str = input("Enter yes or no: ")
if answer.lower() == "yes":
    print("You said yes!")
```

## Common Patterns

### Parsing Input

```python
line: str = "Alice,30,New York"
parts: list[str] = line.split(",")

name: str = parts[0]
age: int = int(parts[1])
city: str = parts[2]

print(f"{name} is {age} and lives in {city}")
```

### Building Strings

When you need to build a string piece by piece, use a list and join at the end. This is faster than adding strings with `+`.

```python
# Slow way (creates many intermediate strings):
result: str = ""
i: int = 0
while i < 5:
    result += str(i) + " "
    i += 1

# Fast way (build a list, join once):
parts: list[str] = []
i = 0
while i < 5:
    parts.append(str(i))
    i += 1
result = " ".join(parts)
print(result)  # 0 1 2 3 4
```

### Validating Input

```python
def is_valid_username(username: str) -> bool:
    if len(username) < 3:
        return False
    if len(username) > 20:
        return False
    if not username[0].isalpha():
        return False
    for char in username:
        if not char.isalnum() and char != "_":
            return False
    return True

print(is_valid_username("alice_99"))   # True
print(is_valid_username("ab"))         # False (too short)
print(is_valid_username("9alice"))     # False (starts with digit)
print(is_valid_username("no spaces"))  # False (contains space)
```

### Reversing a String

```python
original: str = "hello"
reversed_str: str = original[::-1]
print(reversed_str)  # olleh
```

### Checking for Palindromes

A palindrome reads the same forwards and backwards:

```python
def is_palindrome(text: str) -> bool:
    cleaned: str = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

print(is_palindrome("racecar"))        # True
print(is_palindrome("hello"))          # False
print(is_palindrome("A man a plan a canal Panama".replace(" ", "")))  # True
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a function `count_words(text: str) -> int` that counts the number of words in a string. Words are separated by spaces. Handle the case where the string might have extra spaces at the beginning or end."</div>
</div>

## Where People Go Wrong

### Forgetting Strings Are Immutable

```python
name: str = "alice"
name.upper()       # This does nothing to name!
print(name)        # alice (still lowercase)

# You need to reassign:
name = name.upper()
print(name)        # ALICE
```

### Off-by-One in Slicing

Remember: the end index is excluded.

```python
text: str = "hello"
print(text[0:3])  # hel (not hell)
# To get "hell" you need text[0:4]
```

### Forgetting the f-Prefix

```python
name: str = "Alice"
# WRONG -- prints the literal text {name}
print("Hello, {name}")

# RIGHT -- the f makes it an f-string
print(f"Hello, {name}")
```

### Comparing Without Normalizing Case

```python
user_input: str = "Yes"

# WRONG -- fails for "yes", "YES", "yEs", etc.
if user_input == "yes":
    print("OK")

# RIGHT
if user_input.lower() == "yes":
    print("OK")
```

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a program that takes a sentence `text: str = 'Hello World Python Programming'` and: 1) prints it in all lowercase, 2) counts how many words start with a capital letter, 3) replaces all spaces with underscores, 4) prints the sentence reversed."</div>
</div>

## Summary

- Strings are sequences of characters, created with quotes.
- Strings are **immutable** -- methods return new strings, they do not modify the original.
- Indexing and slicing work the same as lists: `text[0]`, `text[1:4]`, `text[::-1]`.
- Key methods: `upper()`, `lower()`, `strip()`, `split()`, `join()`, `replace()`, `find()`.
- Use f-strings for formatting: `f"Hello, {name}!"`.
- Use `.isdigit()`, `.isalpha()`, etc. to check content.
- When comparing strings, normalize case with `.lower()` first.

---

**Previous:** [[wiki:python-collections-dicts-sets]] | **Next:** [[wiki:python-tuples-and-unpacking]]
