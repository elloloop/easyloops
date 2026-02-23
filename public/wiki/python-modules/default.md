# Modules and Packages -- Organizing Larger Programs

## One File Isn't Enough

When you start programming, everything goes in one file. That works for small scripts. But as your program grows to hundreds or thousands of lines, one file becomes a mess. You can't find anything. Functions that don't relate to each other sit side by side. It's chaos.

**Modules** solve this. You split your code into multiple files, each focused on one topic. Then you **import** what you need where you need it.

---

## What is a Module?

A module is just a Python file. That's it.

If you have a file called `math_helpers.py`, that file is a module called `math_helpers`. Any functions, variables, or classes defined in it can be imported into other files.

Open your editor. Create a file called `greetings.py`:

```python
def say_hello(name: str) -> str:
    """Return a hello greeting."""
    return f"Hello, {name}!"

def say_goodbye(name: str) -> str:
    """Return a goodbye greeting."""
    return f"Goodbye, {name}!"

DEFAULT_GREETING: str = "Hey there"
```

Now create a second file called `main.py` in the same directory:

```python
import greetings

message: str = greetings.say_hello("Alice")
print(message)  # Hello, Alice!

farewell: str = greetings.say_goodbye("Alice")
print(farewell)  # Goodbye, Alice!

print(greetings.DEFAULT_GREETING)  # Hey there
```

Run `main.py`. It imports the `greetings` module and uses its functions. Two files working together.

---

## The import Statement

There are several ways to import:

### Import the whole module

```python
import math

result: float = math.sqrt(16)
print(result)  # 4.0

pi_value: float = math.pi
print(pi_value)  # 3.141592653589793
```

You access everything with `module_name.thing`.

### Import specific items

```python
from math import sqrt, pi

result: float = sqrt(16)    # no "math." prefix needed
print(result)  # 4.0
print(pi)      # 3.141592653589793
```

### Import with a nickname (alias)

```python
import datetime as dt

now: dt.datetime = dt.datetime.now()
print(now)
```

### Import everything (avoid this)

```python
from math import *    # imports everything from math

# BAD -- you don't know where "sqrt" came from
# BAD -- might overwrite your own variable names
# NEVER do this in real code
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about modules and the import statement. Quiz me: (1) What is the difference between 'import math' and 'from math import sqrt'? (2) Why is 'from module import *' bad practice? (3) Create two files -- a module with helper functions and a main file that imports them. Have me write the code, then check my imports and type hints."</div>
</div>

---

## Creating Your Own Modules

You already did this with `greetings.py`. Let's do a more practical example.

Create `validators.py`:

```python
def is_valid_email(email: str) -> bool:
    """Check if email has basic valid format."""
    if "@" not in email:
        return False
    parts: list[str] = email.split("@")
    if len(parts) != 2:
        return False
    domain: str = parts[1]
    return "." in domain

def is_valid_age(age: int) -> bool:
    """Check if age is reasonable."""
    return 0 < age < 150

def is_non_empty(text: str) -> bool:
    """Check if text is not empty or whitespace."""
    return len(text.strip()) > 0
```

Create `formatters.py`:

```python
def format_currency(amount: float, symbol: str = "$") -> str:
    """Format a number as currency."""
    return f"{symbol}{amount:,.2f}"

def format_name(first: str, last: str) -> str:
    """Format a name as 'Last, First'."""
    return f"{last.capitalize()}, {first.capitalize()}"

def format_phone(digits: str) -> str:
    """Format 10 digits as (xxx) xxx-xxxx."""
    if len(digits) != 10:
        return digits
    return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
```

Create `main.py`:

```python
from validators import is_valid_email, is_valid_age
from formatters import format_currency, format_name

# Validate user input
email: str = "alice@example.com"
age: int = 25

if is_valid_email(email) and is_valid_age(age):
    print(f"User: {format_name('alice', 'smith')}")
    print(f"Email: {email}")
    print(f"Salary: {format_currency(75000.0)}")
else:
    print("Invalid input")
```

Open your editor. Create all three files. Run `main.py`. See how modules let you organize related functions into separate files.

---

## What is a Package?

A **package** is a directory of modules. It groups related modules together.

To make a directory a package, you add a file called `__init__.py` inside it. This file can be empty -- its existence tells Python "this directory is a package."

```
my_project/
    main.py
    utils/
        __init__.py
        validators.py
        formatters.py
```

Now in `main.py`:

```python
from utils.validators import is_valid_email
from utils.formatters import format_currency

print(is_valid_email("test@example.com"))  # True
print(format_currency(42.5))               # $42.50
```

The `__init__.py` file can also define what gets imported when someone imports the package:

```python
# utils/__init__.py
from utils.validators import is_valid_email, is_valid_age
from utils.formatters import format_currency, format_name
```

Then users can do:

```python
from utils import is_valid_email, format_currency
```

---

## How Python Finds Modules

When you write `import something`, Python searches in this order:

1. **Current directory** -- the directory your script is in.
2. **PYTHONPATH** -- directories listed in the PYTHONPATH environment variable.
3. **Standard library** -- Python's built-in modules.
4. **Site-packages** -- third-party packages you installed with pip.

If Python can't find the module, you get a `ModuleNotFoundError`:

```python
import nonexistent_module
# ModuleNotFoundError: No module named 'nonexistent_module'
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about creating modules, packages, and how Python finds modules. Quiz me: (1) What file must be in a directory to make it a Python package? (2) Given a project structure, write the correct import statements, (3) In what order does Python search for modules? (4) Create a small package with two modules and a main file that uses both. Check my work."</div>
</div>

---

## Standard Library Highlights

Python comes with a huge standard library -- modules you can use without installing anything. Here are the ones you'll use most:

### os -- Operating system interaction

```python
import os

# Current working directory
cwd: str = os.getcwd()
print(f"Working directory: {cwd}")

# Check if a file exists
exists: bool = os.path.exists("data.txt")
print(f"data.txt exists: {exists}")

# List files in a directory
files: list[str] = os.listdir(".")
index: int = 0
while index < len(files):
    print(files[index])
    index += 1

# Join path parts (works on any OS)
path: str = os.path.join("data", "input", "file.txt")
print(path)  # data/input/file.txt
```

### sys -- System-specific parameters

```python
import sys

# Command line arguments
print(f"Script name: {sys.argv[0]}")
if len(sys.argv) > 1:
    print(f"First argument: {sys.argv[1]}")

# Python version
print(f"Python version: {sys.version}")

# Exit the program
# sys.exit(0)  # 0 means success
```

### json -- JSON encoding/decoding

```python
import json

# Python dict to JSON string
data: dict[str, object] = {"name": "Alice", "age": 25}
json_str: str = json.dumps(data, indent=2)
print(json_str)

# JSON string to Python dict
parsed: dict[str, object] = json.loads(json_str)
print(parsed["name"])  # Alice
```

### random -- Random numbers

```python
import random

# Random integer between 1 and 10
number: int = random.randint(1, 10)
print(f"Random number: {number}")

# Random choice from a list
colors: list[str] = ["red", "green", "blue", "yellow"]
picked: str = random.choice(colors)
print(f"Picked: {picked}")

# Shuffle a list in place
random.shuffle(colors)
print(f"Shuffled: {colors}")
```

### datetime -- Dates and times

```python
import datetime

# Current date and time
now: datetime.datetime = datetime.datetime.now()
print(f"Now: {now}")

# Create a specific date
birthday: datetime.date = datetime.date(1995, 6, 15)
print(f"Birthday: {birthday}")

# Time difference
today: datetime.date = datetime.date.today()
age_days: datetime.timedelta = today - birthday
print(f"Days old: {age_days.days}")
```

### collections -- Useful data structures

```python
from collections import Counter, defaultdict

# Counter -- count occurrences
words: list[str] = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_counts: Counter[str] = Counter(words)
print(word_counts)             # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(word_counts.most_common(2))  # [('apple', 3), ('banana', 2)]

# defaultdict -- dictionary with default values
scores: defaultdict[str, list[int]] = defaultdict(list)
scores["Alice"].append(90)
scores["Alice"].append(85)
scores["Bob"].append(78)
print(dict(scores))  # {'Alice': [90, 85], 'Bob': [78]}
```

### typing -- Type hint tools

```python
from typing import Optional, Union

def find_user(user_id: int) -> Optional[str]:
    """Return username or None if not found."""
    users: dict[int, str] = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

def process_input(value: Union[str, int]) -> str:
    """Accept string or int, return string."""
    return str(value)
```

---

## Third-Party Packages: pip

The standard library is huge, but sometimes you need something it doesn't have. That's where **pip** comes in. It installs packages from PyPI (Python Package Index), a repository of thousands of open-source packages.

```bash
# Install a package
pip install requests

# Install a specific version
pip install requests==2.31.0

# Upgrade a package
pip install --upgrade requests

# Uninstall a package
pip uninstall requests

# See what's installed
pip list
```

After installing, you import it like any other module:

```python
import requests

response = requests.get("https://api.github.com")
print(f"Status: {response.status_code}")
```

---

## Virtual Environments

Here's a problem: Project A needs version 1.0 of a library. Project B needs version 2.0. They can't both be installed at the same time.

**Virtual environments** solve this. Each project gets its own isolated set of packages.

```bash
# Create a virtual environment
python -m venv myenv

# Activate it (Linux/Mac)
source myenv/bin/activate

# Activate it (Windows)
myenv\Scripts\activate

# Now pip installs go into this environment only
pip install requests

# Deactivate when done
deactivate
```

When a virtual environment is active, `pip install` only affects that environment. Your other projects are untouched.

**Always use a virtual environment for every project.** It prevents version conflicts and keeps things clean.

---

## requirements.txt

When you share your project, others need to install the same packages. A `requirements.txt` file lists everything:

```
requests==2.31.0
flask==3.0.0
python-dotenv==1.0.0
```

Create it from your current environment:

```bash
pip freeze > requirements.txt
```

Install from it:

```bash
pip install -r requirements.txt
```

Open your editor. Try this workflow:

```bash
# Create a new project directory
mkdir my_project
cd my_project

# Create a virtual environment
python -m venv venv

# Activate it
source venv/bin/activate   # Linux/Mac
# venv\Scripts\activate    # Windows

# Install some packages
pip install requests

# Save requirements
pip freeze > requirements.txt

# Check what's in it
cat requirements.txt
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I just learned about the standard library, pip, virtual environments, and requirements.txt. Quiz me: (1) Which standard library module would you use to work with dates? To generate random numbers? To read JSON? (2) What is a virtual environment and why should you always use one? (3) Walk me through the steps to set up a new Python project with a virtual environment and install packages. (4) How do you share your project's dependencies with another developer? Check my answers."</div>
</div>

---

## Organizing a Project

Here's a typical project structure:

```
my_project/
    main.py
    config.py
    utils/
        __init__.py
        helpers.py
        validators.py
    data/
        __init__.py
        models.py
        database.py
    tests/
        __init__.py
        test_helpers.py
        test_models.py
    requirements.txt
```

Let's build a small version of this. Create this structure:

**`utils/__init__.py`** (can be empty or export key functions):

```python
from utils.helpers import format_currency
from utils.validators import is_valid_email
```

**`utils/helpers.py`**:

```python
def format_currency(amount: float) -> str:
    """Format number as USD currency."""
    return f"${amount:,.2f}"

def truncate(text: str, max_length: int = 50) -> str:
    """Truncate text to max_length, adding ... if needed."""
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + "..."
```

**`utils/validators.py`**:

```python
def is_valid_email(email: str) -> bool:
    """Basic email validation."""
    if "@" not in email:
        return False
    parts: list[str] = email.split("@")
    return len(parts) == 2 and "." in parts[1]

def is_positive_number(value: float) -> bool:
    """Check if a number is positive."""
    return value > 0
```

**`main.py`**:

```python
from utils import format_currency, is_valid_email
from utils.helpers import truncate

def main() -> None:
    """Main entry point of the application."""
    email: str = "alice@example.com"
    salary: float = 85000.0
    bio: str = "Alice is a software engineer who loves building things."

    if is_valid_email(email):
        print(f"Email: {email}")
        print(f"Salary: {format_currency(salary)}")
        print(f"Bio: {truncate(bio, 30)}")
    else:
        print("Invalid email!")

main()
```

---

## if \_\_name\_\_ == "\_\_main\_\_"

You'll see this pattern everywhere. Here's what it means.

Every Python file has a special variable called `__name__`. When you **run** a file directly, `__name__` is set to `"__main__"`. When a file is **imported**, `__name__` is set to the module's name.

```python
# greetings.py
def say_hello(name: str) -> str:
    return f"Hello, {name}!"

print(f"__name__ is: {__name__}")

if __name__ == "__main__":
    # This only runs if you run greetings.py directly
    print(say_hello("World"))
```

Run `greetings.py` directly:

```
__name__ is: __main__
Hello, World!
```

Import it from another file:

```python
# main.py
import greetings   # prints: __name__ is: greetings
# The "Hello, World!" does NOT print -- the if block was skipped
```

This pattern lets a file work both as a module (importable) and as a standalone script (runnable).

**Always use this pattern for your main files:**

```python
def main() -> None:
    """Main entry point."""
    print("Program starting...")
    # your code here

if __name__ == "__main__":
    main()
```

---

## Circular Imports and How to Avoid Them

A **circular import** happens when module A imports module B, and module B imports module A:

```python
# file_a.py
from file_b import helper_b    # imports file_b

def helper_a() -> str:
    return "from A"

# file_b.py
from file_a import helper_a    # imports file_a -- CIRCULAR!

def helper_b() -> str:
    return helper_a() + " and B"
```

This crashes with an `ImportError`. Python gets stuck in a loop.

**How to fix it:**

1. **Reorganize** -- move shared code into a third module that both can import.

```python
# shared.py
def helper_a() -> str:
    return "from A"

# file_a.py
from shared import helper_a

# file_b.py
from shared import helper_a

def helper_b() -> str:
    return helper_a() + " and B"
```

2. **Import inside the function** (last resort):

```python
# file_b.py
def helper_b() -> str:
    from file_a import helper_a   # import happens when function is called
    return helper_a() + " and B"
```

The best approach is to design your modules so imports go in one direction, like a tree. High-level modules import low-level modules, never the other way around.

---

## Relative vs Absolute Imports

Inside a package, you have two choices:

**Absolute imports** (recommended -- always clear):

```python
# Inside utils/formatters.py, importing from utils/validators.py
from utils.validators import is_valid_email
```

**Relative imports** (uses dots to mean "current package"):

```python
# Inside utils/formatters.py, importing from utils/validators.py
from .validators import is_valid_email    # . means "this package"
from ..data.models import User            # .. means "parent package"
```

Absolute imports are clearer and easier to understand. Use them unless you have a good reason not to.

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I finished learning about modules and packages. Comprehensive quiz: (1) Explain what 'if __name__ == \"__main__\"' does and why it matters, (2) Given a project structure, write all the import statements for the main file, (3) Describe what a circular import is and two ways to fix it, (4) Set up a project from scratch: create a package with two modules, a main file, and a requirements.txt. Walk me through the steps and check my work."</div>
</div>

---

## Where People Go Wrong

### 1. Circular imports

```python
# module_a.py imports module_b
# module_b.py imports module_a
# CRASH -- ImportError

# Fix: reorganize so imports flow in one direction
```

### 2. Forgetting \_\_init\_\_.py

```python
# Without __init__.py, Python doesn't recognize a directory as a package
my_package/
    helpers.py      # can't import this as a package module

# Fix: add __init__.py
my_package/
    __init__.py     # now it's a package
    helpers.py
```

Note: In Python 3.3+, packages work without `__init__.py` (namespace packages), but it's still best practice to include it.

### 3. Naming conflicts

```python
# WRONG -- you named your file "random.py"
# random.py
import random            # imports YOUR file, not Python's random module!
number: int = random.randint(1, 10)  # AttributeError

# Fix: never name your files the same as standard library modules
# Bad names: random.py, math.py, os.py, json.py, csv.py, email.py
```

This is an extremely common mistake. If something from the standard library "suddenly stops working," check if you have a file with the same name.

### 4. Not using virtual environments

```python
# You install packages globally
pip install requests==1.0

# Another project needs a different version
pip install requests==2.0    # breaks the first project!

# Fix: use virtual environments for every project
python -m venv venv
source venv/bin/activate
pip install requests==2.0    # only affects this project
```

### 5. Importing too much

```python
# WRONG -- imports everything, unclear what came from where
from utils import *
from helpers import *
from validators import *

result = format_name("Alice", "Smith")   # which module is this from?

# RIGHT -- explicit imports
from utils.formatters import format_name
from utils.validators import is_valid_email
```

---

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Final test on modules. Show me 5 common mistakes with modules and packages (naming conflicts, circular imports, missing __init__.py, no virtual environment, wildcard imports) and ask me to identify and fix each one. Then give me a mini-project: create a complete Python project with a package structure, virtual environment, and requirements.txt. Review my work for correctness."</div>
</div>

---

## Summary

- A **module** is a Python file. A **package** is a directory of modules with `__init__.py`.
- Use `import module` or `from module import function` to bring code into your file.
- **Never use `from module import *`** -- it makes code unclear.
- Python searches: current directory, PYTHONPATH, standard library, site-packages.
- Key standard library modules: `os`, `sys`, `json`, `csv`, `math`, `random`, `datetime`, `collections`, `typing`.
- Use **pip** to install third-party packages.
- **Always use virtual environments** (`python -m venv venv`) to isolate project dependencies.
- Use `requirements.txt` to share your project's dependencies.
- Use `if __name__ == "__main__":` so your files work as both modules and scripts.
- Avoid circular imports by making imports flow in one direction.
- Never name your files the same as standard library modules.

---

**Previous:** [[wiki:python-file-io]] | **Next:** [[wiki:python-classes]]
