# Modules and Packages -- Reusing Code Across Files

## What Is a Module?

So far, all of your Python code has lived in one file. That works great for small programs. But imagine writing everything in one giant notebook -- your math homework, your science notes, your grocery list, your diary -- all in the same notebook with no separation. It would be a mess to find anything.

**A module is just a separate Python file that other files can use.** Instead of one giant notebook, you have separate notebooks for separate topics. Your math notes are in one notebook, your science notes in another. When you need a math formula while doing science homework, you can open the math notebook, find what you need, and use it.

That is exactly how modules work. You put related functions in one `.py` file, and then any other file can **import** those functions and use them.

![A flat vector illustration in a children's educational book style showing Byte the robot at a bookshelf organized with colorful labeled notebooks: one for math helpers, one for text tools, one for game utilities. Byte is pulling one notebook off the shelf to use it. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Your First Module

Let us make this concrete. You are going to create two files that work together.

**Step 1:** Create a file called `greetings.py` and put these functions in it:

```python
def say_hello(name):
    return "Hello, " + name + "!"

def say_goodbye(name):
    return "Goodbye, " + name + "! See you later!"

def say_good_morning(name):
    return "Good morning, " + name + "! Rise and shine!"
```

**Step 2:** Create a second file called `main.py` in the **same folder** and put this in it:

```python
import greetings

message1 = greetings.say_hello("Alice")
print(message1)

message2 = greetings.say_goodbye("Alice")
print(message2)

message3 = greetings.say_good_morning("Bob")
print(message3)
```

**Step 3:** Run `main.py`.

You should see:

```
Hello, Alice!
Goodbye, Alice! See you later!
Good morning, Bob! Rise and shine!
```

That is it. `greetings.py` is a module. You imported it into `main.py` and used its functions. Two files working together.

---

## Import Statements -- Borrowing from Another File

There are a few different ways to import things from a module.

### Way 1: Import the Whole Module

```python
import greetings

# You use the module name, then a dot, then the function name
message = greetings.say_hello("Alice")
```

This is like saying: "Bring me the whole greetings notebook." When you want to use something from it, you say which notebook it came from -- `greetings.say_hello`.

### Way 2: Import Specific Things

```python
from greetings import say_hello, say_goodbye

# Now you can use them directly, without the module name
message = say_hello("Alice")
farewell = say_goodbye("Alice")
```

This is like saying: "From the greetings notebook, just bring me the say_hello page and the say_goodbye page." You can use them directly without mentioning the notebook every time.

### Way 3: Give the Module a Shorter Name

```python
import greetings as gr

# Use the shorter name
message = gr.say_hello("Alice")
```

This is like giving a nickname to a friend with a long name. Instead of saying "greetings" every time, you just say "gr". This is handy when a module has a long name.

### The Wrong Way: Import Everything with *

```python
# DO NOT DO THIS
from greetings import *
```

This grabs *everything* from the module and dumps it into your file. The problem is that you cannot tell where things came from anymore. If two modules have a function with the same name, they will overwrite each other and cause confusing bugs. Stick with the other three ways.

---

## Creating Your Own Modules

You have actually already created a module in the example above! Any `.py` file is a module. There is no special setup required.

Here is a more practical example. Let us say you keep writing the same helper functions over and over. Put them in their own file:

**Create `math_helpers.py`:**

```python
def add(a, b):
    return a + b

def is_even(number):
    return number % 2 == 0

def average(numbers):
    if len(numbers) == 0:
        return 0
    total = 0
    index = 0
    while index < len(numbers):
        total = total + numbers[index]
        index = index + 1
    return total / len(numbers)
```

**Create `text_helpers.py`:**

```python
def shout(text):
    return text.upper() + "!!!"

def whisper(text):
    return text.lower() + "..."

def count_vowels(text):
    vowels = "aeiouAEIOU"
    count = 0
    index = 0
    while index < len(text):
        if text[index] in vowels:
            count = count + 1
        index = index + 1
    return count
```

**Create `main.py`:**

```python
from math_helpers import average, is_even
from text_helpers import shout, count_vowels

scores = [85, 92, 78, 95, 88]
avg = average(scores)
print("Average score: " + str(avg))
print(shout("python is great"))
print("Vowels in 'hello world': " + str(count_vowels("hello world")))
```

Run `main.py`. All three files work together, each doing its own job.

![A flat vector illustration in a children's educational book style showing Byte the robot at a workbench connecting three colorful puzzle pieces together, each piece representing a different Python file with function names visible as small icons on each piece. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Package?

A **package** is a folder full of modules. If a module is one notebook, a package is a whole shelf of notebooks grouped together.

To make a folder into a Python package, you put a special file called `__init__.py` inside it. This file can be empty -- it just tells Python "this folder is a package, not just a random folder."

Here is what a project with a package looks like:

```
my_project/
    main.py
    helpers/
        __init__.py
        math_helpers.py
        text_helpers.py
```

The `helpers` folder is a package because it contains `__init__.py`. Now in `main.py`, you import like this:

```python
from helpers.math_helpers import average
from helpers.text_helpers import shout

print(average([10, 20, 30]))
print(shout("it works"))
```

The dot between `helpers` and `math_helpers` means "inside the helpers folder, find the math_helpers file."

Packages help you keep things organized as your project grows. Instead of 20 files all in one folder, you can group related files into subfolders.

---

## The Standard Library -- Modules That Come with Python for Free

Here is something exciting: Python comes with a huge collection of modules that you can use right away without installing anything. This collection is called the **standard library**. It is like a built-in toolbox that comes with Python.

Think about when you buy a new phone. It comes with apps already installed -- a calculator, a clock, a camera. You do not have to go to the app store for those. The standard library is Python's pre-installed apps.

Here are some of the most useful ones:

### random -- Random Numbers and Choices

The `random` module lets you add randomness to your programs. Great for games, quizzes, or anything that needs to be unpredictable.

```python
import random

# Pick a random number between 1 and 10
number = random.randint(1, 10)
print("Random number: " + str(number))

# Pick a random item from a list
colors = ["red", "blue", "green", "yellow", "purple"]
picked = random.choice(colors)
print("Random color: " + picked)

# Shuffle a list into random order
cards = ["Ace", "King", "Queen", "Jack", "10"]
random.shuffle(cards)
print("Shuffled: " + str(cards))
```

### math -- Math Functions

The `math` module gives you useful math tools beyond basic addition and multiplication:

```python
import math

# Square root
print(math.sqrt(25))    # 5.0

# Round up and round down
print(math.ceil(4.2))   # 5 (round up)
print(math.floor(4.8))  # 4 (round down)

# The value of pi
print(math.pi)          # 3.141592653589793

# Power (same as **)
print(math.pow(2, 10))  # 1024.0
```

### os -- Working with Files and Folders

The `os` module lets you do things with your computer's file system -- check if files exist, list what is in a folder, and build file paths:

```python
import os

# Check if a file exists
if os.path.exists("hello.txt"):
    print("The file exists!")
else:
    print("The file does not exist.")

# Get the current working directory (where your program is running from)
current_folder = os.getcwd()
print("Running from: " + current_folder)

# List all files in the current folder
files = os.listdir(".")
index = 0
while index < len(files):
    print("  " + files[index])
    index = index + 1
```

### json -- Reading and Writing JSON

You already saw this in the file I/O lesson, but it is worth mentioning again since it is part of the standard library:

```python
import json

# Turn a dictionary into a JSON string
data = {"name": "Alice", "score": 100}
text = json.dumps(data, indent=2)
print(text)

# Turn a JSON string back into a dictionary
parsed = json.loads(text)
print(parsed["name"])   # Alice
```

![A flat vector illustration in a children's educational book style showing Byte the robot in front of a large open toolbox with four compartments, each containing a different colorful tool representing a module: a die for random, a protractor for math, a folder for os, and a label tag for json. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Installing Extra Packages with pip -- Like an App Store for Python

The standard library is great, but sometimes you need something it does not include. That is where **pip** comes in. pip is Python's package installer -- think of it like an app store for Python.

There are thousands of packages made by other programmers that you can download and use for free. Need to make a website? There is a package for that. Need to work with images? There is a package for that. Need to analyze data? There is a package for that.

### How to Use pip

You use pip from the command line (the terminal), not from inside a Python file:

```
pip install requests
```

This downloads and installs a package called `requests` (which is used for fetching data from the internet). After installing, you can import it just like any other module:

```python
import requests
```

Here are some common pip commands:

```
pip install requests          # Install a package
pip install requests==2.31.0  # Install a specific version
pip uninstall requests        # Remove a package
pip list                      # See everything that is installed
```

### requirements.txt -- Sharing Your Package List

When you share your project with someone else, they need to install the same packages you used. A `requirements.txt` file is a list of all the packages your project needs:

```
requests==2.31.0
flask==3.0.0
```

You can create one from your currently installed packages:

```
pip freeze > requirements.txt
```

And someone else can install everything from it:

```
pip install -r requirements.txt
```

---

## Virtual Environments -- Keeping Each Project's Packages Separate

Imagine you have two projects. Project A needs version 1 of a package, and Project B needs version 2 of the same package. If they share the same space, they will fight over which version to use.

**A virtual environment** gives each project its own private space for packages. Think of it like having **separate pencil cases for different classes**. Your art class pencil case has colored pencils and markers. Your math class pencil case has a calculator and a ruler. They do not mix.

### How to Create and Use a Virtual Environment

From the command line:

```
# Create a virtual environment (you only do this once per project)
python -m venv myenv

# Activate it (you do this every time you work on the project)
# On Mac or Linux:
source myenv/bin/activate

# On Windows:
myenv\Scripts\activate

# Now pip install only affects this environment
pip install requests

# When you are done working, deactivate it
deactivate
```

When a virtual environment is active, any packages you install with pip go into *that environment only*. Your other projects are not affected. This is how real Python developers work on every project. It keeps things clean and prevents package conflicts.

---

## The `if __name__ == "__main__":` Pattern

You will see this pattern in many Python files. It looks mysterious at first, but the idea is simple.

Every Python file has a hidden variable called `__name__`. When you **run** a file directly (like clicking "Run" or typing `python myfile.py`), Python sets `__name__` to `"__main__"`. When a file is **imported** by another file, Python sets `__name__` to the file's actual name.

This means you can have code that **only runs when the file is run directly**, not when it is imported.

**Create `greetings.py`:**

```python
def say_hello(name):
    return "Hello, " + name + "!"

def say_goodbye(name):
    return "Goodbye, " + name + "!"

if __name__ == "__main__":
    # This part only runs if you run greetings.py directly
    print(say_hello("World"))
    print(say_goodbye("World"))
    print("Testing complete!")
```

**If you run `greetings.py` directly:**

```
Hello, World!
Goodbye, World!
Testing complete!
```

**If you import it from `main.py`:**

```python
import greetings

print(greetings.say_hello("Alice"))
# The "Testing complete!" part does NOT run
```

Why is this useful? It lets a file serve double duty. When someone imports it, they just get the functions. When you run it directly, you can include test code or a demo that shows how the functions work.

Think of it like a cookbook. When you *use* the cookbook (import), you just want the recipes. But the author also included a "try these recipes yourself" section at the back -- that only applies if you are reading the book on its own (running directly).

### The Simple Rule

Just remember: the code inside `if __name__ == "__main__":` means **"only run this part if this is the main file being run."** If the file is being imported by some other file, skip this part.

---

## Putting It All Together -- A Mini Project

Let us build a small project that uses everything we have learned. We will create a number guessing game split across multiple files.

**Create `game_helpers.py`:**

```python
import random

def pick_secret_number(low, high):
    return random.randint(low, high)

def check_guess(guess, secret):
    if guess < secret:
        return "Too low!"
    elif guess > secret:
        return "Too high!"
    else:
        return "Correct!"

def get_guess(low, high):
    while True:
        user_input = input("Guess a number between " + str(low) + " and " + str(high) + ": ")
        try:
            guess = int(user_input)
            if guess < low or guess > high:
                print("Out of range. Try again.")
                continue
            return guess
        except ValueError:
            print("That is not a number. Try again.")

if __name__ == "__main__":
    # Quick test of the helper functions
    print(check_guess(5, 7))    # Too low!
    print(check_guess(9, 7))    # Too high!
    print(check_guess(7, 7))    # Correct!
    print("All tests passed!")
```

**Create `game.py`:**

```python
from game_helpers import pick_secret_number, check_guess, get_guess

def play_game():
    low = 1
    high = 20
    secret = pick_secret_number(low, high)
    attempts = 0

    print("I am thinking of a number between " + str(low) + " and " + str(high) + ".")
    print("Can you guess it?")

    while True:
        guess = get_guess(low, high)
        attempts = attempts + 1
        result = check_guess(guess, secret)
        print(result)

        if result == "Correct!":
            print("You got it in " + str(attempts) + " tries!")
            break

if __name__ == "__main__":
    play_game()
```

Run `game.py` and play the game! Notice how the code is organized:

- `game_helpers.py` contains the *tools* (picking numbers, checking guesses, getting input).
- `game.py` contains the *game logic* (the main loop that runs the game).
- Each file can be tested on its own thanks to `if __name__ == "__main__":`.

![A flat vector illustration in a children's educational book style showing Byte the robot playing a number guessing game on a computer screen, with thought bubbles showing numbers. Two colorful file icons are connected by arrows showing how the game module imports from the helpers module. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Practice Questions

Try to answer these on your own before looking at the answers at the bottom of the page.

**Question 1:** What is a module in Python?

**Question 2:** What is the difference between `import math` and `from math import sqrt`?

**Question 3:** You have a file called `helpers.py` with a function called `double(n)` that returns `n * 2`. Write the code for `main.py` that imports and uses this function to print the double of 5.

**Question 4:** What is a package? How is it different from a module?

**Question 5:** Name two modules from Python's standard library and explain what each one does.

**Question 6:** What does `pip install requests` do? Where does pip get the package from?

**Question 7:** What is a virtual environment and why should you use one?

**Question 8:** What does `if __name__ == "__main__":` do? Write a small module file that has a function called `triple(n)` that returns `n * 3`, and include a test section that only runs when the file is executed directly.

---

## Answers to Practice Questions

**Answer 1:** A module is a Python file (a `.py` file) that contains functions, variables, or other code that can be imported and used by other Python files. Instead of putting all your code in one file, you can split it into separate modules organized by topic.

**Answer 2:** `import math` imports the entire math module. You access its functions with the module name and a dot, like `math.sqrt(25)`. `from math import sqrt` imports just the `sqrt` function directly. You can use it without the module name, like `sqrt(25)`. Both do the same thing, but the first makes it clear where the function comes from, and the second is shorter to type.

**Answer 3:**

```python
from helpers import double

result = double(5)
print(result)   # 10
```

Or alternatively:

```python
import helpers

result = helpers.double(5)
print(result)   # 10
```

**Answer 4:** A module is a single Python file. A package is a folder that contains multiple modules (and a special `__init__.py` file that tells Python "this folder is a package"). A package lets you group related modules together, like having a folder full of notebooks instead of just one notebook.

**Answer 5:** (Any two of these are correct)

- `random` -- Generates random numbers and makes random choices. Useful for games, quizzes, and simulations.
- `math` -- Provides math functions like square root, rounding, pi, and powers.
- `os` -- Lets you work with your computer's file system: check if files exist, list folder contents, and build file paths.
- `json` -- Reads and writes JSON data, which is a popular format for storing and exchanging structured data.

**Answer 6:** `pip install requests` downloads a package called `requests` from PyPI (the Python Package Index), which is an online collection of thousands of free packages made by Python programmers around the world. It is like an app store for Python. After installing, you can `import requests` in your code.

**Answer 7:** A virtual environment is a private, isolated space for a project's packages. It is like having separate pencil cases for different classes. Without virtual environments, all your projects share the same packages. If Project A needs version 1 of a package and Project B needs version 2, they would conflict. Virtual environments prevent this by giving each project its own independent set of packages.

**Answer 8:** `if __name__ == "__main__":` means "only run this code if this file is being run directly." If the file is imported by another file, this section is skipped. It lets a file work both as a reusable module and as a standalone script.

```python
def triple(n):
    return n * 3

if __name__ == "__main__":
    # This only runs when you run this file directly
    print(triple(1))    # 3
    print(triple(5))    # 15
    print(triple(10))   # 30
    print("All tests passed!")
```

---

**Previous:** [[wiki:python-jr-file-io]] | **Next:** [[wiki:python-jr-classes]]
