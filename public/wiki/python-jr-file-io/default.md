# File I/O -- Reading and Writing Files

## Why Do Files Matter?

Here is something important about programs: **when your program stops, everything it was holding in memory disappears.** All your variables, all your lists, all your dictionaries -- gone. Every time you run the program again, it starts from scratch.

Think of it like a whiteboard. You can write all kinds of useful things on a whiteboard while you are working. But when you leave the room and someone erases it, everything is lost. That is what happens to your program's memory when it stops.

**Files are like a notebook.** You write things down in a notebook, close it, put it on a shelf, and come back the next day. Everything is still there. Files work the same way -- they live on your computer's hard drive and stay there even when your program is not running.

This is why files matter. If you want your program to *remember* anything -- saved games, settings, a list of favorite songs, homework answers -- you need to save it to a file.

![A flat vector illustration in a children's educational book style showing Byte the robot in a room with two surfaces: a whiteboard on the left labeled with sticky notes being erased by a cloth, and a sturdy notebook on the right that is closed with a bookmark. Byte is pointing at the notebook with a thumbs-up. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Opening Files with `with open()` -- The Safe Way

To work with a file in Python, you first need to **open** it. The best way to do this is with the `with open()` pattern:

```python
with open("hello.txt", "r") as file:
    content = file.read()
    print(content)
```

Let us break this down piece by piece:

- `open("hello.txt", "r")` -- Open a file called `hello.txt` for **r**eading.
- `as file` -- Give it a name (`file`) so you can use it inside the block.
- The indented lines below are where you work with the file.
- When the indented block ends, **Python automatically closes the file for you.**

That last part is the key. The `with` keyword is like automatically closing the door behind you when you walk through it. You never have to remember to close the file yourself -- Python handles it.

Why does this matter? Because an open file uses up resources on your computer. If you open lots of files and forget to close them, your program can run into trouble. The `with` pattern prevents this entirely.

### Try It Yourself

First, create a file called `hello.txt` using any text editor (like Notepad or TextEdit). Type a few lines in it, like:

```
Hello there!
This is my first file.
Python is fun.
```

Save it in the same folder as your Python program. Then run this:

```python
with open("hello.txt", "r") as file:
    content = file.read()
    print(content)
```

You should see the contents of your file printed on screen.

---

## Reading Files

There are a few different ways to read from a file, depending on what you need.

### read() -- Everything at Once

This reads the entire file into one big string:

```python
with open("hello.txt", "r") as file:
    content = file.read()
    print(content)
    print("The file has " + str(len(content)) + " characters.")
```

This works great for small files. But imagine a file with millions of lines -- loading all of that into memory at once could slow things down.

### Reading Line by Line

You can read one line at a time using `readline()`:

```python
with open("hello.txt", "r") as file:
    first_line = file.readline()
    second_line = file.readline()
    print("Line 1: " + first_line.strip())
    print("Line 2: " + second_line.strip())
```

Each time you call `readline()`, it gives you the next line and moves forward. The `.strip()` at the end removes the invisible newline character that sits at the end of each line.

### Reading All Lines into a List

For the most common task -- going through every line in a file -- you can read all lines and then loop through them:

```python
with open("hello.txt", "r") as file:
    lines = file.readlines()

print("This file has " + str(len(lines)) + " lines.")

index = 0
while index < len(lines):
    print(str(index + 1) + ": " + lines[index].strip())
    index = index + 1
```

### Processing a File Line by Line with a While Loop

This is a very common pattern for working with files. You read one line at a time inside a loop:

```python
with open("hello.txt", "r") as file:
    line = file.readline()
    while line:
        print(line.strip())
        line = file.readline()
```

How does this work? When `readline()` reaches the end of the file, it returns an empty string (`""`). An empty string counts as `False` in a while loop condition, so the loop stops.

---

## Writing Files

Reading is only half the story. You can also **write** data to files.

### Write Mode "w" -- Start Fresh (WARNING: This Erases Everything!)

```python
with open("output.txt", "w") as file:
    file.write("Line one\n")
    file.write("Line two\n")
    file.write("Line three\n")
```

The `"w"` stands for **write**. If the file does not exist, Python creates it. If the file *does* exist, **Python erases everything in it first** and starts with a blank file.

**This is the big danger of write mode.** Imagine you have a file with important notes, and you accidentally open it with `"w"`. All your notes are gone instantly -- before you even write anything new. Be very careful with `"w"` mode.

Notice the `\n` at the end of each line. That is the **newline character** -- it tells the file to start a new line. Without it, everything would end up on one giant line.

### Append Mode "a" -- Add to the End

If you want to **add** to an existing file without erasing it, use `"a"` for **append**:

```python
with open("log.txt", "a") as file:
    file.write("Something happened.\n")
    file.write("Something else happened.\n")
```

Every time you run this, the new lines get added to the end of the file. Nothing that was already there gets erased. This is perfect for things like logs or diaries where you keep adding entries.

![A flat vector illustration in a children's educational book style showing Byte the robot at a desk with two notebooks. The left notebook has a big eraser wiping it clean (labeled with a 'W' sticky note), and the right notebook shows new lines being added at the bottom while previous writing remains untouched (labeled with an 'A' sticky note). Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

### Try It Yourself

Type this program and run it. Then open `shopping.txt` to see the result:

```python
items = ["Milk", "Eggs", "Bread", "Butter", "Apples"]

with open("shopping.txt", "w") as file:
    index = 0
    while index < len(items):
        file.write(str(index + 1) + ". " + items[index] + "\n")
        index = index + 1

print("Shopping list saved!")

# Now read it back to prove it worked
with open("shopping.txt", "r") as file:
    content = file.read()
    print(content)
```

---

## File Paths -- Where the File Lives on Your Computer

When you open a file, you tell Python *where* to find it. This is called a **file path**.

### Same Folder as Your Program

If the file is in the same folder as your Python script, you just use the file name:

```python
with open("data.txt", "r") as file:
    content = file.read()
```

### A Folder Inside Your Current Folder

You can use a **relative path** to point to files in nearby folders:

```python
with open("data/scores.txt", "r") as file:
    content = file.read()
```

This means: "Look in the `data` folder, then find `scores.txt` inside it."

### The Full Address (Absolute Path)

You can also give the complete path from the very top of your computer's file system:

```python
# On Mac or Linux
with open("/home/user/projects/data.txt", "r") as file:
    content = file.read()

# On Windows
with open("C:/Users/user/projects/data.txt", "r") as file:
    content = file.read()
```

Think of relative paths like saying "the house next door" and absolute paths like giving the full street address. Both work, but relative paths are usually simpler when the file is nearby.

---

## Working with CSV Files -- Data in Rows and Columns

A **CSV file** (Comma-Separated Values) stores data in rows and columns, kind of like a spreadsheet. Each line is a row, and commas separate the columns.

Here is what a CSV file looks like inside:

```
name,subject,score
Alice,Math,92
Bob,Science,85
Charlie,Math,78
Diana,Science,95
```

The first line is usually the **header** -- it tells you what each column means.

### Reading a CSV File

You can read a CSV file by splitting each line on the commas:

```python
with open("students.csv", "r") as file:
    header_line = file.readline().strip()
    headers = header_line.split(",")
    print("Columns: " + str(headers))

    line = file.readline()
    while line:
        values = line.strip().split(",")
        student = {}
        index = 0
        while index < len(headers):
            student[headers[index]] = values[index]
            index = index + 1
        print(student["name"] + " got " + student["score"] + " in " + student["subject"])
        line = file.readline()
```

### Using Python's csv Module

Python has a built-in `csv` module that handles CSV files more reliably (it deals with tricky cases like commas inside quoted text):

```python
import csv

with open("students.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"] + " got " + row["score"] + " in " + row["subject"])
```

The `csv.DictReader` turns each row into a dictionary using the header line as the keys. This makes it very easy to access each column by name.

### Writing a CSV File

```python
import csv

students = [
    {"name": "Alice", "subject": "Math", "score": "92"},
    {"name": "Bob", "subject": "Science", "score": "85"},
]

with open("output.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "subject", "score"])
    writer.writeheader()
    index = 0
    while index < len(students):
        writer.writerow(students[index])
        index = index + 1

print("CSV file saved!")
```

The `newline=""` part prevents extra blank lines from appearing on some computers.

---

## Working with JSON Files -- Data with Labels

**JSON** (JavaScript Object Notation) is another very popular way to store data. If CSV is like a spreadsheet, JSON is like a form -- every piece of data has a label.

Here is what a JSON file looks like:

```json
{
    "name": "Alice",
    "favorite_color": "blue",
    "hobbies": ["reading", "swimming", "coding"],
    "pet": {
        "name": "Whiskers",
        "type": "cat"
    }
}
```

Notice anything familiar? It looks a lot like Python dictionaries and lists! That is one reason JSON is so popular -- it maps naturally to the data structures you already know.

### Reading a JSON File

Python has a built-in `json` module for this:

```python
import json

with open("profile.json", "r") as file:
    data = json.load(file)

print("Name: " + data["name"])
print("Color: " + data["favorite_color"])
print("First hobby: " + data["hobbies"][0])
print("Pet name: " + data["pet"]["name"])
```

The `json.load()` function reads the file and turns it into a Python dictionary (or list, depending on the JSON structure).

### Writing a JSON File

```python
import json

profile = {
    "name": "Bob",
    "favorite_color": "green",
    "hobbies": ["gaming", "cooking"],
    "score": 42
}

with open("profile.json", "w") as file:
    json.dump(profile, file, indent=4)

print("Profile saved!")
```

The `indent=4` part makes the file look nice and readable with proper spacing. Without it, everything goes on one line, which is hard for humans to read.

![A flat vector illustration in a children's educational book style showing Byte the robot looking at two open notebooks side by side. The left notebook shows data in a neat grid pattern like a spreadsheet (representing CSV), and the right notebook shows data with labels and nested sections like a form (representing JSON). Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Error Handling with Files -- What If the File Does Not Exist?

Files are one of the most common places where errors happen. The file might not exist. You might not have permission to read it. The folder might be wrong. Always wrap file operations in `try/except`:

```python
try:
    with open("settings.txt", "r") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("The file does not exist yet.")
```

### Loading Settings with a Default

A very common pattern is to try to load settings from a file, and use default values if the file is missing:

```python
import json

def load_settings(filename):
    defaults = {
        "color": "blue",
        "volume": 50,
        "difficulty": "normal"
    }

    try:
        with open(filename, "r") as file:
            settings = json.load(file)
            return settings
    except FileNotFoundError:
        print("No settings file found. Using defaults.")
        return defaults

settings = load_settings("settings.json")
print("Color: " + settings["color"])
print("Volume: " + str(settings["volume"]))
```

The first time someone runs this program, there is no settings file, so it uses the defaults. Later (once you add code to *save* settings), it loads from the file.

---

## Common Patterns

### Pattern 1: Reading Settings from a File

```python
import json

def load_game_data(filename):
    try:
        with open(filename, "r") as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        return {"high_score": 0, "level": 1, "player_name": "New Player"}

game = load_game_data("savegame.json")
print("Welcome back, " + game["player_name"] + "!")
print("Your high score is " + str(game["high_score"]))
```

### Pattern 2: Saving Data

```python
import json

def save_game_data(filename, data):
    with open(filename, "w") as file:
        json.dump(data, file, indent=4)
    print("Game saved!")

game = {"high_score": 150, "level": 5, "player_name": "Alice"}
save_game_data("savegame.json", game)
```

### Pattern 3: Processing a File Line by Line

```python
def count_words_in_file(filename):
    total_words = 0

    try:
        with open(filename, "r") as file:
            line = file.readline()
            while line:
                words = line.strip().split()
                total_words = total_words + len(words)
                line = file.readline()
    except FileNotFoundError:
        print("File not found: " + filename)
        return 0

    return total_words

count = count_words_in_file("story.txt")
print("The file has " + str(count) + " words.")
```

### Pattern 4: Appending to a Log File

```python
def add_diary_entry(filename, entry):
    with open(filename, "a") as file:
        file.write(entry + "\n")
    print("Entry added!")

add_diary_entry("diary.txt", "Today I learned about file I/O in Python.")
add_diary_entry("diary.txt", "I made a shopping list program!")
add_diary_entry("diary.txt", "Tomorrow I will learn about modules.")
```

Each time you run `add_diary_entry`, the new entry is added to the end of the file. Nothing is erased.

---

## Practice Questions

Try to answer these on your own before looking at the answers at the bottom of the page.

**Question 1:** Why do programs need files? What happens to variables when a program stops?

**Question 2:** What is the difference between `"w"` mode and `"a"` mode when opening a file for writing?

**Question 3:** What does this code do? What will `shopping.txt` contain after running it?

```python
items = ["Apples", "Bananas", "Cherries"]

with open("shopping.txt", "w") as file:
    index = 0
    while index < len(items):
        file.write(items[index] + "\n")
        index = index + 1
```

**Question 4:** Write a program that reads a file called `names.txt` (one name per line) and prints each name with a number in front of it, like:

```
1. Alice
2. Bob
3. Charlie
```

**Question 5:** What happens if you try to open a file that does not exist with `"r"` mode? How do you handle this safely?

**Question 6:** Write a program that saves a dictionary to a JSON file and then reads it back.

**Question 7:** What is wrong with this code?

```python
with open("important_data.txt", "w") as file:
    file.write("just a test\n")
```

**Question 8:** Write a function called `add_score` that takes a filename and a score (a number), and appends a line like "Score: 95" to the file. Then write a function called `read_scores` that reads the file and returns a list of all the scores as numbers.

![A flat vector illustration in a children's educational book style showing Byte the robot surrounded by colorful file folders and documents, organizing them into neat piles on a large desk. Some folders are labeled with small icons representing different file types. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Answers to Practice Questions

**Answer 1:** Programs need files because all variables and data in memory disappear when the program stops. Memory is like a whiteboard that gets erased. Files are like a notebook -- they save data to your computer's hard drive so it is still there the next time you run the program.

**Answer 2:** `"w"` (write) mode **erases everything** in the file and starts fresh. If the file already had 1000 lines of data, they are all gone. `"a"` (append) mode **adds to the end** of the file without erasing anything. Use `"a"` when you want to keep existing data and just add more.

**Answer 3:** It writes each item from the list to the file, one per line. After running, `shopping.txt` will contain:

```
Apples
Bananas
Cherries
```

**Answer 4:**

```python
try:
    with open("names.txt", "r") as file:
        lines = file.readlines()

    index = 0
    while index < len(lines):
        name = lines[index].strip()
        print(str(index + 1) + ". " + name)
        index = index + 1
except FileNotFoundError:
    print("The file names.txt was not found.")
```

**Answer 5:** Python raises a `FileNotFoundError` and the program crashes. To handle it safely, wrap it in a try/except:

```python
try:
    with open("missing_file.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("That file does not exist.")
```

**Answer 6:**

```python
import json

# Save a dictionary to a JSON file
my_data = {"name": "Alice", "score": 100, "level": 5}

with open("data.json", "w") as file:
    json.dump(my_data, file, indent=4)

print("Saved!")

# Read it back
with open("data.json", "r") as file:
    loaded_data = json.load(file)

print("Loaded: " + str(loaded_data))
print("Name: " + loaded_data["name"])
```

**Answer 7:** If `important_data.txt` already existed with important data in it, opening it with `"w"` mode **erases everything** in the file before writing "just a test". This could destroy valuable data. If you only wanted to add to the file, you should have used `"a"` mode instead. If you did intend to replace the file, the code is technically correct, but you should be very careful with `"w"` mode on files that might contain important data.

**Answer 8:**

```python
def add_score(filename, score):
    with open(filename, "a") as file:
        file.write("Score: " + str(score) + "\n")

def read_scores(filename):
    scores = []
    try:
        with open(filename, "r") as file:
            line = file.readline()
            while line:
                # Each line looks like "Score: 95"
                parts = line.strip().split(": ")
                if len(parts) == 2:
                    try:
                        number = int(parts[1])
                        scores.append(number)
                    except ValueError:
                        pass  # Skip lines that do not have a valid number
                line = file.readline()
    except FileNotFoundError:
        print("No scores file found yet.")
    return scores

# Test it
add_score("scores.txt", 95)
add_score("scores.txt", 87)
add_score("scores.txt", 100)

all_scores = read_scores("scores.txt")
print("All scores: " + str(all_scores))
```

---

**Previous:** [[wiki:python-jr-error-handling]] | **Next:** [[wiki:python-jr-modules]]
