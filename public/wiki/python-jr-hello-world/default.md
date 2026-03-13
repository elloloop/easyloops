# Hello World -- Make the Computer Talk!

Welcome to your very first programming lesson! By the end of this page, you will have told a computer what to do, and watched it do it. Let's go!

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a desk with a computer screen that displays the words Hello World in a speech bubble, with confetti and stars around the screen to celebrate. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-01.png)

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

## How to Use the Code Editor on This Page

Good news: **you do not need to install anything!** Every code example on this page has a built-in editor. Here is how to use it:

1. Find a code example below (it will have a green **"▶ Try it!"** button)
2. Click the **"▶ Try it!"** button -- the code will open in an editor you can type in
3. Click **"▶ Run"** to make the computer run your code
4. See the output appear right below the editor
5. Change the code and click **"▶ Run"** again to try your changes
6. Click **"Reset"** to go back to the original code, or **"Close"** to close the editor

That is it! No downloading, no installing, no terminal. Just click, type, and run.

---

## Your First Instruction: print()

Now for the exciting part. You are going to make the computer show a message on the screen.

Click the **"▶ Try it!"** button below and then click **"▶ Run"**:

```python
print("Hello, world!")
```

You just wrote and ran your first program! The computer read your instruction and did exactly what you asked -- it showed "Hello, world!" on the screen.

![A flat vector illustration in a children's educational book style showing Byte the robot jumping with excitement next to a large screen displaying Hello World, with colorful sparkles and a big checkmark. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-02.png)

### What Just Happened? Let's Break It Down

Let's look at `print("Hello, world!")` piece by piece:

- **`print`** -- This is a **function**. A function is a named action -- like a button that does something specific. The `print` function's job is to show things on the screen. Think of it as the "display on screen" button.

- **`(` and `)`** -- The parentheses are like a basket. You put something inside them to give it to the `print` function. "Here, print this!"

- **`"Hello, world!"`** -- This is called a **string**. A string is just text -- letters, numbers, spaces, punctuation, anything between the quotes. The quotes tell Python: "This is text, not a command." Without the quotes, Python would think `Hello` is a command and get confused.

So the whole thing means: "Run the action called `print`, and give it the text `Hello, world!` to display on the screen."

---

## How Python Runs Your Code

Here is what happens step by step when Python runs your code:

1. Python reads the instructions from **top to bottom**, one line at a time
2. It sees `print("Hello, world!")` and runs it -- showing the text on your screen
3. There are no more instructions, so the program ends

**Order matters!** Python always reads from the first line to the last line, just like you read a book from top to bottom. If you put instructions in the wrong order, things will happen in the wrong order.

---

## Common Mistakes (And How to Fix Them)

Everyone makes mistakes when they are starting. That is completely normal! Here are the most common ones and what they look like.

**Try running each of these broken examples** -- click "▶ Try it!" and then "▶ Run" to see what happens. Then fix them!

### Mistake 1: Forgetting the Quotes

```python
print(Hello, world!)
```

**What Python says:** `SyntaxError: invalid syntax`

**What went wrong:** Without quotes, Python thinks `Hello` is a command or a name for something, not text. Python does not know any command called `Hello`, so it gets confused. Always put your text inside quotes.

**Fix:** Change it to `print("Hello, world!")`

### Mistake 2: Spelling print Wrong

```python
Print("Hello, world!")
```

**What Python says:** `NameError: name 'Print' is not defined`

**What went wrong:** Python cares about capital letters and lowercase letters. `print` (all lowercase) and `Print` (with a capital P) are completely different words to Python. The function is called `print` -- all lowercase.

**Fix:** Change it to `print("Hello, world!")`

### Mistake 3: Mismatched Quotes

```python
print("Hello, world!')
```

**What Python says:** `SyntaxError: EOL while scanning string literal`

**What went wrong:** You started with a double quote `"` but ended with a single quote `'`. They need to match! Either use two double quotes or two single quotes.

**Fix:** Change it to `print("Hello, world!")` or `print('Hello, world!')`

### Mistake 4: Forgetting the Parentheses

```python
print "Hello, world!"
```

**What Python says:** `SyntaxError: Missing parentheses in call to 'print'`

**What went wrong:** In Python, you must put parentheses around the thing you want to print. This is how Python knows you are calling the `print` function.

**Fix:** Change it to `print("Hello, world!")`

### How to Read Error Messages

Error messages look scary at first, but they are actually **clues**. They are Python's way of telling you what went wrong and where. Here is how to read them:

- **The last line** tells you the type of error (like `SyntaxError` or `NameError`)
- **The lines above** show you where in your file the problem is
- **The message** often explains what Python expected versus what it found

Think of error messages as helpful hints, not as the computer being mean. Every programmer sees error messages every single day -- even experts!

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

Try running this program, and then change it to be about you!

```python
# about_me.py -- My first multi-line program

print("=== About Me ===")
print("Name: Sam")
print("Favorite color: blue")
print("Favorite food: pizza")
print("=================")
```

Each `print()` shows its text on a new line. The computer runs the first line, then the second, then the third, all the way down. Order matters!

**Try it:** Change the information to be about you. Add more lines. Click Run again.

### Printing Numbers

You can print numbers too -- and you do not need quotes around them:

```python
print(42)
print(3.14)
print(100 + 200)
```

When you put `100 + 200` inside `print()`, Python does the math first and then shows you the answer. The computer is also a calculator!

### Printing Several Things at Once

You can give `print()` multiple items separated by commas:

```python
print("My favorite number is", 7)
print("The answer to 10 + 20 is", 10 + 20)
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

An empty `print()` just makes a blank line. This is useful for adding space between sections of output to make it easier to read.

---

## Exercises

These exercises are meant to be typed and run. **Click "▶ Try it!" on each one, change the code, and click "▶ Run".**

### Exercise 1: Make the Computer Say Your Name

Click "▶ Try it!" and replace the text with your actual name. Then click "▶ Run". You just made the computer say your name!

```python
print("Your name here")
```

### Exercise 2: Be a Calculator

Before you run this, write down what you think each line will show. Then click "▶ Try it!" and "▶ Run" to check:

```python
print(7)
print(7 + 3)
print(7 * 3)
print(7 - 3)
```

### Exercise 3: All About You

Click "▶ Try it!" and change this program to be all about you. Add more lines. Make it look nice!

```python
print("=== All About Me ===")
print("Name: (your name)")
print("City: (your city)")
print("Favorite food: (your food)")
print("Favorite animal: (your animal)")
print("Favorite number:", 0)
print("=====================")
```

### Exercise 4: Break Things on Purpose

This is an important exercise! Click "▶ Try it!" and run each broken line one at a time. Read the error message carefully for each one. Then fix it!

```python
# Try each one separately (remove the # at the start to test it):

# 1. Missing quotes
# print(hello)

# 2. Misspelled function name
# prnt("hello")

# 3. Missing closing parenthesis
# print("hello"

# 4. Mismatched quotes
# print("hello')
```

For each one:

- What did the error message say?
- Can you figure out what Python is complaining about?
- How would you fix it?

### Exercise 5: Try Some Math

Python can do all kinds of math. Try changing the numbers and see what happens!

```python
print("Addition:", 100 + 200)
print("Subtraction:", 100 - 37)
print("Multiplication:", 6 * 7)
print("Text joining:", "hello" + " " + "world")
print("One", "two", "three")
```

What does `"hello" + " " + "world"` do? You just discovered that `+` can stick pieces of text together!

### Exercise 6: Comment Out

Run this code. Then remove the `#` from the second line and run it again. See the difference? The `#` turned that line into a comment, so Python skipped it.

```python
print("This will show up")
# print("This will NOT show up")
print("This will also show up")
```

![A flat vector illustration in a children's educational book style showing Byte the robot looking at a list of completed exercises with checkmarks, giving a thumbs up with one hand while the other holds a small flag. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-03.png)

---

## Where People Get Stuck

Here are the traps that beginners fall into most often:

**1. Not actually typing the code.** Reading code is not the same as writing code. Your fingers need the practice. Even if you are looking at the example on the screen, type every character yourself in the editor.

**2. Getting scared of error messages.** Error messages are not the computer being mean -- they are clues! Read them carefully. The last line tells you what went wrong, and the lines above tell you where.

**3. Mixing up text and code.** Remember: quotes make text. Without quotes, Python thinks you are giving it a command or a name.

---

## What You Learned

- A **program** is a set of instructions for the computer, like a recipe for a cook
- **Python** is a language the computer can follow
- `print()` shows text or numbers on the screen
- You can run Python code right here on this page -- just click **"▶ Try it!"**
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

**5.** What will this code show on the screen?

```python
print("First")
# print("Second")
print("Third")
```

**6.** You change your code and click Run. But you see the old output. What might have happened?

**7.** What is the difference between `print("7")` and `print(7)`?

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

**5.** It shows:

```
First
Third
```

The second line is a comment (it starts with `#`), so Python skips it completely. Only "First" and "Third" are displayed.

**6.** You might have forgotten to click "▶ Run" after making your changes. Always click Run again after editing your code!

**7.** Both show `7` on the screen, and they look the same. But `"7"` (with quotes) is text -- just the character "7." And `7` (without quotes) is a number you can do math with. This difference will matter a lot in the next lesson about values and types!

---

**Previous:** [[wiki:python-jr-roadmap]] | **Next:** [[wiki:python-jr-values-and-types]]
