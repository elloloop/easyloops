# Hello World -- Make the Computer Talk!

Welcome to your very first programming lesson! By the end of this page, you will have told a computer what to do, and watched it do it. Let's go!

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a desk with a computer screen that displays the words Hello World in a speech bubble, with confetti and stars around the screen to celebrate. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## What Is a Program?

A program is a set of instructions that tells a computer what to do, step by step.

Think of it like a **recipe**. A recipe tells a cook: "First, crack two eggs. Then, mix in flour. Then, bake for 20 minutes." The cook follows each step in order, and at the end, you get a cake.

A program works the same way. You write instructions like: "First, show this message on the screen. Then, add these two numbers. Then, show the answer." The computer follows each step in order, from top to bottom, and does exactly what you told it.

The computer is the cook. The program is the recipe. And you are the person writing the recipe.

Here is the most important thing to know: **the computer does exactly what you tell it to do.** Not what you meant to tell it. Not what you were thinking. Exactly what you typed. That is why being careful and precise matters.

---

## What Is Python?

You speak English (or another language) to talk to people. But computers do not understand English. They need instructions written in a special language they can follow.

**Python** is one of those special languages. It is called a **programming language**. There are many programming languages in the world (just like there are many human languages), but Python is one of the most popular and easiest to start with.

Why Python? Because it looks a lot like plain English. When you write `print("Hello!")`, you can pretty much guess what it does -- it prints "Hello!" on the screen. Not all programming languages are this easy to read.

---

## Installing Python

Before you can write Python programs, you need to install Python on your computer. Think of it like installing an app -- you need to download it before you can use it.

### Step 1: Download Python

Open your web browser and go to:

**[python.org/downloads](https://www.python.org/downloads/)**

Click the big button that says "Download Python 3.x" (the number after the 3 does not matter much, as long as it starts with 3).

### Step 2: Run the Installer

Find the file you downloaded and double-click it to start the installer.

**Very Important for Windows Users:** When the installer opens, you will see a checkbox at the bottom that says **"Add Python to PATH"**. Make sure you check this box! If you skip this step, your computer will not be able to find Python when you try to use it. It is like installing a new app but not putting it on your home screen.

Click "Install Now" and wait for it to finish.

### Step 3: Check That It Worked

Now you need to open the **terminal**. The terminal is a program where you type commands for your computer (instead of clicking buttons). Here is how to find it:

- **On Windows:** Press the Windows key, type "Command Prompt," and open it
- **On Mac:** Press Command + Space, type "Terminal," and open it
- **On Linux:** Look for "Terminal" in your applications

In the terminal, type this and press Enter:

```
python --version
```

You should see something like:

```
Python 3.12.1
```

If you see a number that starts with 3, you are all set!

> **Tip:** On some Mac or Linux computers, you might need to type `python3` instead of `python`. If `python` gives you an error, try `python3 --version` instead.

### Step 4: Get a Text Editor

You need a place to write your programs. You cannot use Microsoft Word or Google Docs because those add invisible formatting that breaks code. You need a **plain text editor**.

We recommend **VS Code** (Visual Studio Code). It is free and works on every computer:

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Download and install it
3. Open it up -- this is where you will write your programs!

Other options that work fine: Notepad++ (Windows), Sublime Text, or even the plain Notepad that comes with Windows. Just not Word or Google Docs.

---

## Your First Instruction: print()

Now for the exciting part. You are going to make the computer show a message on the screen.

Open your text editor (VS Code or whichever you chose). Create a new file and save it as `hello.py`. The `.py` at the end tells your computer "this is a Python program."

Now type this -- remember, type it yourself, do not copy and paste:

```python
print("Hello, world!")
```

Save the file (Ctrl+S on Windows, Command+S on Mac).

Now open your terminal, go to the folder where you saved the file, and type:

```
python hello.py
```

You should see:

```
Hello, world!
```

You just wrote and ran your first program! The computer read your instruction and did exactly what you asked -- it showed "Hello, world!" on the screen.

![A flat vector illustration in a children's educational book style showing Byte the robot jumping with excitement next to a large screen displaying Hello World, with colorful sparkles and a big checkmark. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

### What Just Happened? Let's Break It Down

Let's look at `print("Hello, world!")` piece by piece:

- **`print`** -- This is a **function**. A function is a named action -- like a button that does something specific. The `print` function's job is to show things on the screen. Think of it as the "display on screen" button.

- **`(` and `)`** -- The parentheses are like a basket. You put something inside them to give it to the `print` function. "Here, print this!"

- **`"Hello, world!"`** -- This is called a **string**. A string is just text -- letters, numbers, spaces, punctuation, anything between the quotes. The quotes tell Python: "This is text, not a command." Without the quotes, Python would think `Hello` is a command and get confused.

So the whole thing means: "Run the action called `print`, and give it the text `Hello, world!` to display on the screen."

---

## Running a Python File

Here is what happens step by step when you type `python hello.py` in the terminal:

1. You tell your computer: "Start Python and give it the file called hello.py"
2. Python opens the file and reads the instructions from **top to bottom**, one line at a time
3. It sees `print("Hello, world!")` and runs it -- showing the text on your screen
4. There are no more instructions, so the program ends

**Order matters!** Python always reads from the first line to the last line, just like you read a book from top to bottom. If you put instructions in the wrong order, things will happen in the wrong order.

---

## Common Mistakes (And How to Fix Them)

Everyone makes mistakes when they are starting. That is completely normal! Here are the most common ones and what they look like:

### Mistake 1: Forgetting the Quotes

```python
print(Hello, world!)
```

**What Python says:**
```
SyntaxError: invalid syntax
```

**What went wrong:** Without quotes, Python thinks `Hello` is a command or a name for something, not text. Python does not know any command called `Hello`, so it gets confused. Always put your text inside quotes.

**Fix:** `print("Hello, world!")`

### Mistake 2: Spelling print Wrong

```python
Print("Hello, world!")
```

**What Python says:**
```
NameError: name 'Print' is not defined
```

**What went wrong:** Python cares about capital letters and lowercase letters. `print` (all lowercase) and `Print` (with a capital P) are completely different words to Python. The function is called `print` -- all lowercase.

**Fix:** `print("Hello, world!")`

### Mistake 3: Mismatched Quotes

```python
print("Hello, world!')
```

**What Python says:**
```
SyntaxError: EOL while scanning string literal
```

**What went wrong:** You started with a double quote `"` but ended with a single quote `'`. They need to match! Either use two double quotes or two single quotes.

**Fix:** `print("Hello, world!")` or `print('Hello, world!')`

### Mistake 4: Forgetting the Parentheses

```python
print "Hello, world!"
```

**What Python says:**
```
SyntaxError: Missing parentheses in call to 'print'
```

**What went wrong:** In Python, you must put parentheses around the thing you want to print. This is how Python knows you are calling the `print` function.

**Fix:** `print("Hello, world!")`

### Mistake 5: Forgetting to Save

You change your code in the editor but forget to press Ctrl+S (or Command+S) before running it. When you run the file, it still shows the old output. Always save before you run!

### How to Read Error Messages

Error messages look scary at first, but they are actually **clues**. They are Python's way of telling you what went wrong and where. Here is how to read them:

- **The last line** tells you the type of error (like `SyntaxError` or `NameError`)
- **The lines above** show you where in your file the problem is
- **The message** often explains what Python expected versus what it found

Think of error messages as helpful hints, not as the computer being mean. Every programmer sees error messages every single day -- even experts!

**Try it now:** Open your editor and type each of the broken examples above on purpose. Run them. Read the error messages. Then fix them. Getting comfortable with errors now will make everything easier later.

---

## The REPL: Having a Conversation with Python

So far, you have been writing your code in a file and then running the file. There is another way to use Python: you can talk to it one line at a time, like having a conversation.

This is called the **REPL**. That stands for:

- **R**ead -- Python reads what you type
- **E**valuate -- Python figures out the answer
- **P**rint -- Python shows you the answer
- **L**oop -- Python goes back and waits for your next line

To start the REPL, open your terminal and just type:

```
python
```

You will see something like this:

```
Python 3.12.1 (main, Dec 7 2023, 20:45:44)
>>>
```

The `>>>` is Python's way of saying "I am ready. What do you want me to do?" This is called the **prompt**.

Try typing these one at a time:

```python
>>> print("Hello from the REPL!")
Hello from the REPL!
>>> 2 + 3
5
>>> "hello"
'hello'
```

Notice something cool: in the REPL, you can type a math problem like `2 + 3` and Python shows you the answer right away, without needing `print()`. This makes the REPL great for quick experiments.

To leave the REPL and go back to your normal terminal, type:

```python
>>> exit()
```

Or press Ctrl+D on Mac/Linux, or Ctrl+Z then Enter on Windows.

### When to Use the REPL vs. a File

- **Use the REPL** when you want to try something quick -- like testing one line, checking what something does, or using Python as a calculator
- **Use a file** when you are writing a real program with multiple lines that you want to save and run again later

Think of the REPL like a scratch pad and a file like a notebook. The scratch pad is for quick experiments. The notebook is for things you want to keep.

---

## Comments -- Leaving Notes for Yourself

Sometimes you want to leave a note in your code -- either for yourself or for someone else who reads it later. These notes are called **comments**.

A comment starts with the `#` symbol. Python completely ignores everything after `#` on that line. It is like writing in invisible ink that only humans can see.

```python
# This is a comment. Python skips this line completely.
print("This line runs!")  # This comment is at the end of a line
```

When you run this, you only see:

```
This line runs!
```

The comments are invisible to Python. They are just for you.

### Why Use Comments?

- To explain **why** you did something (not what -- the code already shows what)
- To leave reminders for yourself, like "TODO: fix this later"
- To temporarily turn off a line of code while testing

```python
# Greet the user when the program starts
print("Welcome to my program!")

# TODO: add a goodbye message at the end
```

### A Tip About Good Comments

A not-very-helpful comment just repeats what the code says:

```python
# Print hello world
print("Hello, world!")
```

A helpful comment explains why or gives context:

```python
# Start with a friendly greeting so the user knows the program is running
print("Hello, world!")
```

---

## Your First Multi-Line Program

Programs usually have more than one line. Python runs them in order, from top to bottom -- just like reading a book.

Create a new file called `about_me.py` and type this:

```python
# about_me.py -- My first multi-line program

print("=== About Me ===")
print("Name: Sam")
print("Favorite color: blue")
print("Favorite food: pizza")
print("=================")
```

Run it:

```
python about_me.py
```

You should see:

```
=== About Me ===
Name: Sam
Favorite color: blue
Favorite food: pizza
=================
```

Each `print()` shows its text on a new line. The computer runs the first line, then the second, then the third, all the way down. Order matters!

**Try it:** Change the information to be about you. Add more lines. Run it again.

### Printing Numbers

You can print numbers too -- and you do not need quotes around them:

```python
print(42)
print(3.14)
print(100 + 200)
```

Output:

```
42
3.14
300
```

When you put `100 + 200` inside `print()`, Python does the math first and then shows you the answer. The computer is also a calculator!

### Printing Several Things at Once

You can give `print()` multiple items separated by commas:

```python
print("My favorite number is", 7)
print("The answer to 10 + 20 is", 10 + 20)
```

Output:

```
My favorite number is 7
The answer to 10 + 20 is 30
```

Python automatically puts a space between items when you separate them with commas. This is a handy way to mix text and numbers.

---

## Empty print()

What happens if you call `print()` with nothing inside?

```python
print("Line one")
print()
print("Line three")
```

Output:

```
Line one

Line three
```

An empty `print()` just makes a blank line. This is useful for adding space between sections of output to make it easier to read.

---

## Exercises

These exercises are meant to be typed and run. Do not just read them. **Open your editor, type each one, and run it.**

### Exercise 1: Make the Computer Say Your Name

Create a file called `my_name.py`:

```python
print("Your name here")
```

Replace `"Your name here"` with your actual name. Run it. You just made the computer say your name!

### Exercise 2: Be a Calculator

Create a file called `calculator.py`:

```python
print(7)
print(7 + 3)
print(7 * 3)
print(7 - 3)
```

Before you run it, write down what you think each line will show. Then run it and check.

### Exercise 3: All About You

Write a program called `all_about_me.py` that prints at least 5 lines about you: your name, your city, your favorite food, your favorite animal, and your favorite number. Make it look nice with some `===` lines at the top and bottom.

### Exercise 4: Break Things on Purpose

This is an important exercise! Create a file and try each of these broken lines one at a time. Read the error message carefully for each one:

```python
# Try each one separately:

# 1. Missing quotes
print(hello)

# 2. Misspelled function name
prnt("hello")

# 3. Missing closing parenthesis
print("hello"

# 4. Mismatched quotes
print("hello')
```

For each one:
- What did the error message say?
- Can you figure out what Python is complaining about?
- How would you fix it?

### Exercise 5: Try the REPL

Open the Python REPL (type `python` in the terminal) and try these:

```python
>>> print("REPL test")
>>> 100 - 37
>>> "hello" + " " + "world"
>>> print("one", "two", "three")
```

What does `"hello" + " " + "world"` do? You just discovered that `+` can stick pieces of text together!

### Exercise 6: Comment Out

Create a file called `comments.py`:

```python
print("This will show up")
# print("This will NOT show up")
print("This will also show up")
```

Run it. Now remove the `#` from the second line and run it again. See the difference? The `#` turned that line into a comment, so Python skipped it.

![A flat vector illustration in a children's educational book style showing Byte the robot looking at a list of completed exercises with checkmarks, giving a thumbs up with one hand while the other holds a small flag. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Where People Get Stuck

Here are the traps that beginners fall into most often:

**1. Not actually typing the code.** Reading code is not the same as writing code. Your fingers need the practice. Even if you are looking at the example on the screen, type every character yourself.

**2. Getting scared of error messages.** Error messages are not the computer being mean -- they are clues! Read them carefully. The last line tells you what went wrong, and the lines above tell you where.

**3. Forgetting to save before running.** If you change your file but do not save it, running `python hello.py` will run the old version. Always press Ctrl+S (or Command+S) before running.

**4. Being in the wrong folder.** If the terminal says "file not found," you are probably not in the same folder as your `.py` file. Make sure you navigate to the right folder first.

**5. Mixing up the REPL and files.** In the REPL, you type one line at a time. In a file, you write many lines and run them all together. Do not type `>>>` in your file -- that is just the REPL prompt.

**6. Using a word processor.** Do not write Python in Microsoft Word or Google Docs. Those add invisible formatting that will break everything. Always use a plain text editor like VS Code.

---

## What You Learned

- A **program** is a set of instructions for the computer, like a recipe for a cook
- **Python** is a language the computer can follow
- `print()` shows text or numbers on the screen
- You run Python files by typing `python filename.py` in the terminal
- The **REPL** lets you talk to Python one line at a time -- great for experiments
- **Comments** (`#`) are notes that Python ignores -- they are for humans only
- **Error messages** are clues, not insults -- always read them
- Python reads your program from top to bottom, one line at a time

You wrote and ran your first program. That is a real achievement. The first step is always the hardest, and you just took it!

---

## Practice Questions

Try to answer these questions before looking at the answers at the bottom of the page.

**1.** What is a program? Explain it in your own words using the recipe example.

**2.** What will this code show on the screen?
```python
print("I love pizza")
print("I love tacos")
```

**3.** What is wrong with this code, and what will Python say?
```python
print(Hello there)
```

**4.** What will this code show on the screen?
```python
print(10 + 5)
print("10 + 5")
```

**5.** What does the REPL stand for, and when would you use it instead of a file?

**6.** What will this code show on the screen?
```python
print("First")
# print("Second")
print("Third")
```

**7.** You write a program, save it, and run it. Then you change the program but forget to save. What happens when you run it again?

**8.** What is the difference between `print("7")` and `print(7)`?

---

## Answers to Practice Questions

**1.** A program is a set of instructions that tells a computer what to do, step by step. It is like a recipe: the recipe tells a cook what to do (crack eggs, mix flour, bake), and the cook follows each step. A program tells the computer what to do (show text, add numbers, make decisions), and the computer follows each step from top to bottom.

**2.** It shows two lines:
```
I love pizza
I love tacos
```
Each `print()` puts its text on a new line, and Python runs them from top to bottom.

**3.** Python will give a `SyntaxError` because `Hello there` does not have quotes around it. Without quotes, Python thinks `Hello` and `there` are commands or names, not text. The fix is: `print("Hello there")`

**4.** The first line shows `15` because Python does the math (10 + 5 = 15) and displays the answer. The second line shows `10 + 5` because the quotes make it text -- Python just shows the characters exactly as they are, without doing any math.

**5.** REPL stands for Read, Evaluate, Print, Loop. You would use it for quick experiments, like testing one line of code, checking how something works, or using Python as a calculator. You would use a file for real programs with many lines that you want to save and run again.

**6.** It shows:
```
First
Third
```
The second line is a comment (it starts with `#`), so Python skips it completely. Only "First" and "Third" are displayed.

**7.** The computer runs the old, saved version of your program, not the new version with your changes. You will see the old output. Always save (Ctrl+S) before running!

**8.** Both show `7` on the screen, and they look the same. But `"7"` (with quotes) is text -- just the character "7." And `7` (without quotes) is a number you can do math with. This difference will matter a lot in the next lesson about values and types!

---

**Previous:** [[wiki:python-jr-roadmap]] | **Next:** [[wiki:python-jr-values-and-types]]
