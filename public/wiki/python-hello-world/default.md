# Hello World — Your First Program

You are about to write your first program. That might sound like a big deal, and it is — but it is also simpler than you think. Let's get into it.

## What Is a Program?

A program is a set of instructions that tells a computer what to do.

That's it. Nothing more mysterious than that. When you use a calculator app, someone wrote instructions like "when the user presses +, add these two numbers together." When you scroll through a website, someone wrote instructions like "load this text, put this image here, make this button blue."

You are going to learn how to write those instructions.

## What Is Python?

Python is a programming language — a specific way of writing instructions that a computer can understand and follow.

Computers don't understand English. They don't understand any human language. They understand very precise, structured commands. Python is one of many languages designed to let humans write those commands in a way that is readable to us but translatable for the machine.

Why Python? Because it reads close to English, it doesn't require a lot of ceremony to get started, and it is used everywhere — from web apps to data science to automation.

## Installing Python

Before you can run Python programs, you need Python installed on your computer.

1. Go to [python.org](https://www.python.org/downloads/)
2. Download the latest version (Python 3.x — never Python 2)
3. Run the installer
4. **Important on Windows**: Check the box that says "Add Python to PATH" during installation

To verify it worked, open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:

```
python --version
```

You should see something like `Python 3.12.1`. If you see that, you are ready.

> On some Mac/Linux systems you may need to type `python3` instead of `python`. If `python` gives you an error or shows Python 2, try `python3`.

## Your First Instruction: print()

Open a text editor (VS Code, Notepad++, or even plain Notepad — anything that saves plain text files). Create a new file called `hello.py`.

Type this:

```python
print("Hello, world!")
```

Save the file. Now open your terminal, navigate to the folder where you saved the file, and type:

```
python hello.py
```

You should see:

```
Hello, world!
```

Congratulations. You just gave the computer an instruction, and it followed it.

**Open your editor. Type this. Run it. Change the message to something else. Run it again.**

### What Just Happened?

Let's break it down piece by piece:

- `print` — This is a **function**. A function is a named action. The `print` function's job is to display text on your screen.
- `(` and `)` — The parentheses tell Python "here is what I want you to print."
- `"Hello, world!"` — This is a **string**. A string is text data. The quotes tell Python "treat this as text, not as code."

So `print("Hello, world!")` means: "Run the action called print, and give it the text Hello, world! to display."

## Running a Python File

Here is what happens step by step when you run `python hello.py`:

1. You tell your operating system: "Run the Python program and give it this file."
2. Python opens `hello.py` and reads the instructions from top to bottom.
3. It sees `print("Hello, world!")` and executes it — displaying the text on your screen.
4. There are no more instructions, so the program ends.

Python always reads from top to bottom, one line at a time. This matters. Order matters.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "I have a file called greet.py with the line print("Hi there"). What command do I type in my terminal to run it? What will appear on the screen?"</div>
</div>

## Common First Mistakes

You will make mistakes. Everyone does. Here are the ones almost every beginner hits:

### Forgetting the Quotes

```python
# This will cause an error
print(Hello, world!)
```

```
SyntaxError: invalid syntax
```

Python sees `Hello` and thinks it is a variable name (we will cover those soon). It does not know what `Hello` is. You need quotes to tell Python "this is text."

### Misspelling print

```python
# This will cause an error
Print("Hello, world!")
```

```
NameError: name 'Print' is not defined
```

Python is **case-sensitive**. `print` and `Print` are completely different words to Python. The function is called `print` — all lowercase.

### Wrong File Extension

If you save your file as `hello.txt` instead of `hello.py`, Python might still run it, but your text editor won't give you helpful color-coding (syntax highlighting), and some tools won't recognize it as a Python file. Always use `.py`.

### Mismatched Quotes

```python
# This will cause an error
print("Hello, world!')
```

If you start with a double quote `"`, you must end with a double quote `"`. Same for single quotes. Don't mix them.

**Open your editor. Try each of these broken examples. Read the error messages. Getting comfortable with errors now will save you a lot of stress later.**

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What is wrong with this code? print(hello) — Why does it produce an error instead of printing the word hello?"</div>
</div>

## The REPL: Interactive Mode

There are two ways to use Python:

1. **Write a file** and run it (what we just did)
2. **Use the REPL** — type commands one at a time and see results immediately

REPL stands for Read-Eval-Print Loop. It reads what you type, evaluates (runs) it, prints the result, and loops back to wait for more input.

To start the REPL, open your terminal and just type:

```
python
```

You will see something like:

```
Python 3.12.1 (main, Dec  7 2023, 20:45:44)
>>>
```

The `>>>` is the prompt. It means Python is waiting for your instruction. Try:

```python
>>> print("Hello from the REPL!")
Hello from the REPL!
>>> 2 + 3
5
>>> "hello"
'hello'
```

Notice that in the REPL, you can type an expression like `2 + 3` and it shows you the result directly without needing `print()`. This is great for experimenting.

To exit the REPL, type `exit()` or press `Ctrl+D` (Mac/Linux) or `Ctrl+Z then Enter` (Windows).

### When to Use Each

- **REPL**: Quick experiments, testing one line, checking how something works
- **Files**: Actual programs, anything more than a few lines, anything you want to save and run again

**Open your terminal. Start the REPL. Type `print("testing")`. Type `10 + 20`. Type `exit()`. Now you know both ways to run Python.**

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What does REPL stand for? Name one situation where you would use the REPL instead of writing a .py file."</div>
</div>

## Comments — Leaving Notes for Yourself

A comment is a line that Python completely ignores. It is a note for you (or anyone else reading your code).

```python
# This is a comment. Python skips this line entirely.
print("This line runs.")  # You can also put comments at the end of a line
```

Comments start with `#`. Everything after the `#` on that line is ignored.

### Why Use Comments?

- To explain **why** you did something (not what — the code shows what)
- To leave reminders for yourself
- To temporarily disable a line of code while testing

```python
# Display a greeting to the user
print("Welcome to my program!")

# TODO: add more features later
```

A common beginner mistake is writing comments that just repeat the code:

```python
# Print hello world
print("Hello, world!")  # This comment adds nothing useful
```

Better:

```python
# Greet the user when the program starts
print("Hello, world!")
```

## Your First Multi-Line Program

Programs usually have more than one line. Python runs them from top to bottom.

Create a new file called `about_me.py`:

```python
# about_me.py — My first multi-line program

print("=== About Me ===")
print("Name: Sam")
print("Age: 28")
print("Favorite color: blue")
print("=================")
```

Run it:

```
python about_me.py
```

Output:

```
=== About Me ===
Name: Sam
Age: 28
Favorite color: blue
=================
```

Every `print()` call puts its text on a new line. The program runs each line in order, top to bottom.

### Printing Numbers

You can also print numbers without quotes:

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

When you put `100 + 200` inside `print()`, Python calculates the result first, then prints it.

### Printing Multiple Things

You can give `print()` multiple items separated by commas:

```python
print("My age is", 28)
print("The sum of 10 and 20 is", 10 + 20)
```

Output:

```
My age is 28
The sum of 10 and 20 is 30
```

Python automatically puts a space between the items when you separate them with commas.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "What will this program output? Write it out before running it, then check yourself.

print('Line 1')
print('Line 2')
print('The answer is', 5 + 3)"</div>
</div>

## Exercises

These exercises are meant to be typed out and run. Do not just read them. **Open your editor. Type each one. Run it. See what happens.**

### Exercise 1: Print Your Name

Create a file called `my_name.py`:

```python
print("Your name goes here")
```

Replace the text with your actual name. Run it.

### Exercise 2: Print a Number

```python
print(7)
print(7 + 3)
print(7 * 3)
```

What do you think each line will print? Write down your guesses, then run it.

### Exercise 3: Multiple Lines

Write a program that prints your name, your city, and your favorite food on three separate lines.

```python
print("Alice")
print("Portland")
print("Tacos")
```

### Exercise 4: Learn From Errors

**This exercise is about breaking things on purpose.** Try each of these and read the error message carefully:

```python
# Try each one separately and read the error

# 1. Missing quotes
print(hello)

# 2. Misspelled function name
prnt("hello")

# 3. Missing parenthesis
print("hello"

# 4. Mismatched quotes
print("hello')
```

For each error:
- What did Python say?
- Can you figure out what it is complaining about?
- Fix it and run again.

Getting comfortable with error messages is one of the most important skills in programming. They are not insults — they are clues.

### Exercise 5: The REPL

Open the Python REPL and try:

```python
>>> print("REPL test")
>>> 100 - 37
>>> "hello" + " " + "world"
>>> print("one", "two", "three")
```

What does `"hello" + " " + "world"` do? You just discovered that `+` can combine text. We will cover this more in future lessons.

<div class="copy-prompt-container">
<div class="copy-prompt-label">Test Your Knowledge</div>
<div class="copy-prompt-text">Prompt: "Write a Python program from scratch (without looking at examples) that prints three lines: your favorite animal, a number, and a sentence that includes both text and a calculation using print() with commas."</div>
</div>

## Where People Go Wrong

Here are the most common traps beginners fall into with their first programs:

**1. Not actually typing the code.** Reading code is not the same as writing it. Your fingers need to learn the patterns. Type everything out yourself, even if you are copying from this page.

**2. Panicking at error messages.** Error messages look scary at first, but they are just Python telling you what went wrong. Read them. The last line usually tells you the type of error, and the lines above show you where in your file the problem is.

**3. Forgetting to save before running.** If you edit your file but forget to save it, running `python hello.py` will run the old version. Always save (Ctrl+S) before running.

**4. Being in the wrong directory.** If your terminal says "file not found," you are probably not in the same folder as your `.py` file. Use `cd` to navigate to the right folder, or use the full path: `python /path/to/hello.py`.

**5. Mixing up the REPL and files.** In the REPL, you type one command at a time. In a file, you write multiple commands and run them all at once. Don't try to type `>>>` in your file — that is just the REPL prompt.

**6. Using a word processor instead of a text editor.** Do not write Python in Microsoft Word or Google Docs. Those add invisible formatting characters that will break everything. Use a plain text editor like VS Code, Sublime Text, or even Notepad.

## What You Learned

- A program is a set of instructions for the computer
- Python is a language the computer can follow
- `print()` displays text or values on the screen
- You run Python files with `python filename.py`
- The REPL lets you experiment one line at a time
- Comments (`#`) are notes that Python ignores
- Error messages are clues, not insults — read them

You wrote and ran your first program. That is a real accomplishment. The first step is always the hardest, and you just took it.

---

**Previous:** [[wiki:python-roadmap]] | **Next:** [[wiki:python-values-and-types]]
