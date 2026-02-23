# File I/O -- Reading and Writing Files

## Why Files?

Everything your program does happens in memory. When the program stops, that memory is gone. All your variables, all your data -- vanished.

Files let you **persist** data. Save it to disk so it survives after your program ends. The next time you run your program, you can read that data back.

Every real program works with files: configuration files, log files, data files, user files. This is a fundamental skill.

---

## Opening Files: The with Statement

The **only correct way** to open files in Python is with the `with` statement:

```python
with open("data.txt", "r") as file:
    content: str = file.read()
    print(content)
```

What happens here:
1. `open("data.txt", "r")` opens the file for reading.
2. `as file` gives it a name you can use.
3. The indented block is where you work with the file.
4. When the block ends, **Python automatically closes the file.**

This is called a **context manager**. It guarantees the file gets closed, even if an error happens. Never open files without `with`.

Open your editor. Create a file called `hello.txt` with some text in it (just use your text editor or file manager). Then type this and run it:

```python
with open("hello.txt", "r") as file:
    content: str = file.read()
    print(content)
```

---

## File Modes

The second argument to `open()` is the **mode**. It controls what you can do with the file:

| Mode | Meaning | Creates file? | Erases existing? |
|------|---------|--------------|-----------------|
| `"r"` | Read only | No | No |
| `"w"` | Write only | Yes | **YES -- DANGER** |
| `"a"` | Append (add to end) | Yes | No |
| `"r+"` | Read and write | No | No |
| `"rb"` | Read binary | No | No |
| `"wb"` | Write binary | Yes | **YES** |

**The big danger:** `"w"` mode **destroys everything** in the file and starts fresh. If you meant to add data, use `"a"` instead.

```python
# THIS ERASES the file and writes fresh
with open("output.txt", "w") as file:
    file.write("This replaces everything.\n")

# THIS ADDS to the end of the file
with open("output.txt", "a") as file:
    file.write("This is added at the end.\n")
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about opening files with the 'with' statement and file modes (r, w, a, rb, wb). Quiz me: (1) What happens if you open a file with 'w' mode that already has data in it? (2) Why is the 'with' statement better than calling open() and close() separately? (3) Which mode should you use to add a new line to an existing log file? (4) What happens if you try to open a file with 'r' mode and it doesn't exist? Check my answers."</div>
</div>

---

## Reading Files

There are three ways to read from a file:

### read() -- Read the whole file at once

```python
with open("data.txt", "r") as file:
    content: str = file.read()
    print(content)
```

Good for small files. For huge files, this loads everything into memory at once.

### readline() -- Read one line at a time

```python
with open("data.txt", "r") as file:
    first_line: str = file.readline()
    second_line: str = file.readline()
    print(f"Line 1: {first_line.strip()}")
    print(f"Line 2: {second_line.strip()}")
```

Each call to `readline()` moves forward one line. The `.strip()` removes the newline character at the end.

### readlines() -- Read all lines into a list

```python
with open("data.txt", "r") as file:
    lines: list[str] = file.readlines()
    print(f"File has {len(lines)} lines")
    print(f"First line: {lines[0].strip()}")
```

---

## Iterating Through Lines

For most real work, you want to process a file line by line. Here's the while loop approach first:

### While loop (explicit control)

```python
with open("data.txt", "r") as file:
    line: str = file.readline()
    while line:
        print(line.strip())
        line = file.readline()
```

How this works:
1. Read the first line.
2. `while line:` checks if we got anything (empty string means end of file).
3. Process the line.
4. Read the next line.
5. Repeat.

### For loop (alternative -- more common for files)

```python
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
```

The for loop version is shorter and what most Python programmers use. The file object itself is iterable -- Python reads one line at a time automatically.

Open your editor. Create a file called `names.txt` with these contents:

```
Alice
Bob
Charlie
Diana
```

Then run this:

```python
with open("names.txt", "r") as file:
    line_number: int = 1
    line: str = file.readline()
    while line:
        print(f"{line_number}: {line.strip()}")
        line_number += 1
        line = file.readline()
```

---

## Writing Files

### write() -- Write a string

```python
with open("output.txt", "w") as file:
    file.write("Line one\n")
    file.write("Line two\n")
    file.write("Line three\n")
```

Important: `write()` does **not** add a newline automatically. You must include `\n` yourself.

### writelines() -- Write a list of strings

```python
lines: list[str] = ["Alice\n", "Bob\n", "Charlie\n"]

with open("output.txt", "w") as file:
    file.writelines(lines)
```

Again, you need the `\n` in each string. `writelines()` does not add newlines for you.

Open your editor. Type this. Run it. Then open `shopping.txt` to verify:

```python
items: list[str] = ["Milk", "Eggs", "Bread", "Butter"]

with open("shopping.txt", "w") as file:
    index: int = 0
    while index < len(items):
        file.write(f"{index + 1}. {items[index]}\n")
        index += 1

print("Shopping list saved!")

# Read it back to verify
with open("shopping.txt", "r") as file:
    content: str = file.read()
    print(content)
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about reading files (read, readline, readlines) and writing files (write, writelines). Give me exercises: (1) Write a program that reads a file and counts how many lines it has using a while loop, (2) Write a program that takes a list of names and writes them to a file with line numbers, (3) Write a program that reads a file, converts each line to uppercase, and writes the result to a new file. Check my code for correctness and type hints."</div>
</div>

---

## The Danger of "w" Mode

This needs its own section because it catches people off guard:

```python
# Suppose important_data.txt contains 1000 lines of valuable data

# THIS DESTROYS ALL 1000 LINES instantly
with open("important_data.txt", "w") as file:
    file.write("Oops.\n")

# important_data.txt now has exactly one line: "Oops."
```

The moment you open a file with `"w"`, its contents are gone. Before you even write anything.

**If you want to add to an existing file, use `"a"` (append):**

```python
with open("log.txt", "a") as file:
    file.write("New log entry\n")
```

**If you want to be safe, check if the file exists first:**

```python
import os

filename: str = "important_data.txt"
if os.path.exists(filename):
    print(f"WARNING: {filename} already exists!")
    response: str = input("Overwrite? (yes/no): ")
    if response.lower() != "yes":
        print("Cancelled.")
    else:
        with open(filename, "w") as file:
            file.write("New content\n")
else:
    with open(filename, "w") as file:
        file.write("New content\n")
```

---

## File Paths: Relative vs Absolute

When you open a file, you give it a **path**. There are two kinds:

**Relative path** -- relative to where your program is running:

```python
# Same directory as your script
with open("data.txt", "r") as file:
    pass

# A subdirectory
with open("data/input.txt", "r") as file:
    pass
```

**Absolute path** -- the full path from the root:

```python
# Linux/Mac
with open("/home/user/projects/data.txt", "r") as file:
    pass

# Windows
with open("C:/Users/user/projects/data.txt", "r") as file:
    pass
```

For portability, use the `os.path` module or `pathlib`:

```python
import os

# Build paths that work on any operating system
data_dir: str = os.path.join("data", "input")
file_path: str = os.path.join(data_dir, "records.txt")
print(file_path)  # data/input/records.txt (or data\input\records.txt on Windows)
```

---

## Working with CSV Files

CSV (Comma-Separated Values) files are everywhere. Let's parse one manually first, then use the `csv` module.

### Manual parsing

Create a file called `students.csv`:

```
name,age,grade
Alice,20,A
Bob,22,B
Charlie,21,A
Diana,23,C
```

```python
def read_csv_manual(filename: str) -> list[dict[str, str]]:
    """Read a CSV file and return a list of dictionaries."""
    records: list[dict[str, str]] = []

    with open(filename, "r") as file:
        header_line: str = file.readline().strip()
        headers: list[str] = header_line.split(",")

        line: str = file.readline()
        while line:
            values: list[str] = line.strip().split(",")
            record: dict[str, str] = {}
            index: int = 0
            while index < len(headers):
                record[headers[index]] = values[index]
                index += 1
            records.append(record)
            line = file.readline()

    return records

students: list[dict[str, str]] = read_csv_manual("students.csv")
index: int = 0
while index < len(students):
    print(students[index])
    index += 1
```

### Using the csv module (easier and handles edge cases)

```python
import csv

def read_csv_proper(filename: str) -> list[dict[str, str]]:
    """Read a CSV file using the csv module."""
    records: list[dict[str, str]] = []

    with open(filename, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            records.append(dict(row))

    return records

students: list[dict[str, str]] = read_csv_proper("students.csv")
for student in students:
    print(f"{student['name']} got a {student['grade']}")
```

### Writing CSV files

```python
import csv

students: list[dict[str, str]] = [
    {"name": "Alice", "age": "20", "grade": "A"},
    {"name": "Bob", "age": "22", "grade": "B"},
]

with open("output.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age", "grade"])
    writer.writeheader()
    index: int = 0
    while index < len(students):
        writer.writerow(students[index])
        index += 1
```

Note the `newline=""` argument. Without it, you might get extra blank lines on Windows.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about file paths and working with CSV files (both manual parsing and the csv module). Give me exercises: (1) Write a program that reads a CSV file of products (name, price, quantity) and calculates the total inventory value, (2) Write a program that reads one CSV and writes a filtered version to a new CSV (only rows where price > 10), (3) Explain the difference between relative and absolute file paths. Check my code."</div>
</div>

---

## Working with JSON Files

JSON (JavaScript Object Notation) is the standard format for data exchange. Python makes it easy with the `json` module.

### Reading JSON

Create a file called `config.json`:

```json
{
    "app_name": "MyApp",
    "version": "1.0",
    "debug": true,
    "max_users": 100
}
```

```python
import json

def load_config(filename: str) -> dict[str, object]:
    """Load a JSON configuration file."""
    with open(filename, "r") as file:
        config: dict[str, object] = json.load(file)
    return config

config: dict[str, object] = load_config("config.json")
print(f"App: {config['app_name']}")
print(f"Version: {config['version']}")
print(f"Debug: {config['debug']}")
```

### Writing JSON

```python
import json

user_data: dict[str, object] = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding", "hiking"],
    "active": True,
}

with open("user.json", "w") as file:
    json.dump(user_data, file, indent=4)

print("User data saved!")
```

The `indent=4` makes the JSON file human-readable with nice formatting. Without it, everything goes on one line.

### JSON strings (no files)

Sometimes you work with JSON as strings, not files:

```python
import json

# Convert dictionary to JSON string
data: dict[str, str] = {"name": "Bob", "city": "NYC"}
json_string: str = json.dumps(data)
print(json_string)  # {"name": "Bob", "city": "NYC"}

# Convert JSON string to dictionary
parsed: dict[str, str] = json.loads(json_string)
print(parsed["name"])  # Bob
```

Note the `s` at the end: `json.dumps` (dump to **s**tring) and `json.loads` (load from **s**tring).

---

## Error Handling with Files

Files are one of the most common places errors happen. Always handle them:

```python
def safe_read_file(filename: str) -> str | None:
    """Read a file safely, returning None if it doesn't exist."""
    try:
        with open(filename, "r") as file:
            content: str = file.read()
            return content
    except FileNotFoundError:
        print(f"File not found: {filename}")
        return None
    except PermissionError:
        print(f"Permission denied: {filename}")
        return None

# Using it
content: str | None = safe_read_file("data.txt")
if content is not None:
    print(f"File has {len(content)} characters")
else:
    print("Could not read file")
```

### Checking before opening

```python
import os

def file_info(filename: str) -> None:
    """Print information about a file."""
    if not os.path.exists(filename):
        print(f"{filename} does not exist")
        return

    if not os.path.isfile(filename):
        print(f"{filename} is not a file (maybe a directory?)")
        return

    size: int = os.path.getsize(filename)
    print(f"{filename}: {size} bytes")
```

---

## Common Patterns

### Reading a Configuration File

```python
import json

def load_settings(filename: str) -> dict[str, object]:
    """Load settings, returning defaults if file doesn't exist."""
    defaults: dict[str, object] = {
        "theme": "light",
        "font_size": 14,
        "auto_save": True,
    }

    try:
        with open(filename, "r") as file:
            settings: dict[str, object] = json.load(file)
            return settings
    except FileNotFoundError:
        print("Settings file not found. Using defaults.")
        return defaults
    except json.JSONDecodeError:
        print("Settings file is corrupted. Using defaults.")
        return defaults

settings: dict[str, object] = load_settings("settings.json")
print(f"Theme: {settings['theme']}")
```

### Simple Logging

```python
import datetime

def log_message(filename: str, message: str) -> None:
    """Append a timestamped message to a log file."""
    timestamp: str = datetime.datetime.now().isoformat()
    log_entry: str = f"[{timestamp}] {message}\n"

    with open(filename, "a") as file:
        file.write(log_entry)

log_message("app.log", "Application started")
log_message("app.log", "User logged in")
log_message("app.log", "Processing complete")
```

### Processing a Data File

```python
def process_scores(input_file: str, output_file: str) -> None:
    """Read scores, calculate stats, write results."""
    scores: list[float] = []

    with open(input_file, "r") as file:
        line: str = file.readline()
        while line:
            line = line.strip()
            if line:
                try:
                    score: float = float(line)
                    scores.append(score)
                except ValueError:
                    print(f"Skipping invalid line: {line}")
            line = file.readline()

    if len(scores) == 0:
        print("No valid scores found.")
        return

    total: float = sum(scores)
    average: float = total / len(scores)
    highest: float = max(scores)
    lowest: float = min(scores)

    with open(output_file, "w") as file:
        file.write(f"Total scores: {len(scores)}\n")
        file.write(f"Average: {average:.2f}\n")
        file.write(f"Highest: {highest:.2f}\n")
        file.write(f"Lowest: {lowest:.2f}\n")

    print(f"Results written to {output_file}")
```

---

## Encoding: UTF-8 and Why It Matters

Text files use **encoding** to convert characters to bytes. The standard today is **UTF-8**. It handles all languages, emojis, and special characters.

```python
# Always specify encoding to avoid surprises
with open("data.txt", "r", encoding="utf-8") as file:
    content: str = file.read()

with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello! Bonjour! Hola!\n")
```

If you don't specify encoding, Python uses your system's default, which varies between operating systems. This causes bugs when your code runs on a different machine. Always specify `encoding="utf-8"`.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about JSON files, error handling with files, common file patterns, and encoding. Give me a project-style exercise: Write a simple contact book program that (1) stores contacts in a JSON file, (2) can add a new contact (name, phone, email), (3) can list all contacts, (4) handles the case where the file doesn't exist yet. The program should use type hints, the 'with' statement, and proper error handling. Review my solution."</div>
</div>

---

## Where People Go Wrong

### 1. Forgetting to close files (solved by with)

```python
# WRONG -- if an error happens, the file stays open
file = open("data.txt", "r")
content: str = file.read()
file.close()   # might never run if read() crashes

# RIGHT -- with statement handles closing automatically
with open("data.txt", "r") as file:
    content: str = file.read()
```

### 2. Wrong mode

```python
# WRONG -- opened for reading, trying to write
with open("data.txt", "r") as file:
    file.write("Hello")  # io.UnsupportedOperation

# WRONG -- meant to append but used "w", erasing everything
with open("log.txt", "w") as file:  # all old logs: GONE
    file.write("New entry\n")
```

### 3. Encoding issues

```python
# WRONG -- no encoding specified, behaves differently on different systems
with open("data.txt", "r") as file:
    content: str = file.read()

# RIGHT -- explicit encoding
with open("data.txt", "r", encoding="utf-8") as file:
    content: str = file.read()
```

### 4. Not handling missing files

```python
# WRONG -- crashes if file doesn't exist
with open("config.txt", "r") as file:
    config: str = file.read()

# RIGHT -- handle the error
try:
    with open("config.txt", "r", encoding="utf-8") as file:
        config: str = file.read()
except FileNotFoundError:
    print("Config file not found. Using defaults.")
    config = ""
```

### 5. Reading huge files into memory

```python
# WRONG for large files -- loads entire file into memory
with open("huge_file.txt", "r") as file:
    all_data: str = file.read()   # might use gigabytes of RAM

# RIGHT -- process line by line
with open("huge_file.txt", "r", encoding="utf-8") as file:
    line: str = file.readline()
    while line:
        process_line(line)
        line = file.readline()
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I finished learning about File I/O. Give me a comprehensive test: (1) Show me 5 code snippets with file-handling bugs and ask me to find and fix each one, (2) Write a program that reads a CSV file, processes the data, and outputs a JSON summary file, (3) Explain why you should always use the 'with' statement and specify encoding='utf-8'. Grade my answers."</div>
</div>

---

## Summary

- Use the `with` statement to open files. **Always.** It handles closing for you.
- Modes: `"r"` to read, `"w"` to write (overwrites!), `"a"` to append.
- Read with `read()`, `readline()`, or `readlines()`. Iterate with a while loop or for loop.
- Write with `write()` or `writelines()`. Remember to add `\n` yourself.
- **`"w"` mode erases everything.** Double-check before using it.
- Use the `csv` module for CSV files and `json` module for JSON files.
- Always handle `FileNotFoundError` and other file-related exceptions.
- Always specify `encoding="utf-8"` for text files.
- For large files, read line by line instead of loading everything into memory.

---

**Previous:** [[wiki:python-error-handling]] | **Next:** [[wiki:python-modules]]
