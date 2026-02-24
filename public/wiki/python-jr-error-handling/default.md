# Error Handling -- When Things Go Wrong

## Programs Can Go Wrong (And That Is OK!)

Imagine you are following a recipe that says "add milk" -- but you open the fridge and there is no milk. The recipe did not do anything *wrong*. The instructions were perfectly clear. The problem is that something unexpected happened in the real world.

Programs work the same way. You can write perfectly good code, and it can still run into trouble. Maybe someone types a word where you expected a number. Maybe you try to open a file that does not exist. Maybe you try to divide by zero.

This is completely normal. **Good programmers do not write code that never fails. They write code that handles failure gracefully** -- like a cook who checks the fridge *before* starting the recipe.

![A flat vector illustration in a children's educational book style showing Byte the robot looking at a recipe book with a confused expression, standing in a colorful kitchen. An open fridge behind Byte is empty where the milk should be. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Two Kinds of Errors

There are two different ways things can go wrong in Python, and they happen at different times.

### Syntax Errors -- You Typed It Wrong

A **syntax error** is like a spelling mistake or a grammar mistake. Python reads your code before it runs it, and if the structure does not make sense, Python stops right away.

```python
# Syntax error -- missing colon at the end
def greet(name)
    print("Hello " + name)

# Syntax error -- mismatched parentheses
print("Hello"
```

These are the easiest errors to fix. Python tells you exactly which line has the problem. You just need to look at what you typed and correct it -- like fixing a typo in a text message before you send it.

### Exceptions -- Something Went Wrong While Running

An **exception** is different. Your code is typed correctly -- Python understands it just fine -- but something goes wrong *while the program is running*.

```python
# This is typed perfectly, but it crashes when it runs
number = int("abc")   # Python cannot turn "abc" into a number!
```

Think of it this way: "Go to the store and buy bananas" is a perfectly clear instruction (no syntax error). But if the store is closed, you run into a problem while *following* the instruction (an exception).

---

## Common Exceptions (Problems You Will See Often)

Here are the most common exceptions. Learning to recognize them by name will save you a lot of time.

### TypeError -- Wrong Kind of Thing

You tried to do something with the wrong *type* of value. It is like trying to plug a fork into an electrical outlet -- it is the wrong shape entirely.

```python
result = "5" + 3   # You cannot add a string and a number together
```

### ValueError -- Right Kind, Wrong Value

You gave the right *type* of thing, but the specific value does not work. It is like putting the right kind of battery in a toy, but putting it in backwards.

```python
number = int("abc")   # "abc" is a string, which is the right type
                       # but "abc" is not a number, so the value is wrong
```

### KeyError -- Key Not Found in a Dictionary

You asked a dictionary for a key that does not exist. It is like looking for "banana" in a phone book -- phone books do not list fruit.

```python
pet_ages = {"cat": 5, "dog": 3}
print(pet_ages["fish"])   # There is no "fish" key in this dictionary
```

### IndexError -- Position Does Not Exist in a List

You asked for a position in a list that is not there. It is like asking for seat number 50 in a room that only has 10 seats.

```python
colors = ["red", "green", "blue"]
print(colors[10])   # There are only 3 items (positions 0, 1, 2)
```

### ZeroDivisionError -- Cannot Divide by Zero

You tried to divide a number by zero. This is not allowed in math, and Python will not allow it either.

```python
result = 10 / 0   # Nope!
```

![A flat vector illustration in a children's educational book style showing Byte the robot at a chalkboard with five sections, each showing a different common error with a simple icon: a mismatched puzzle piece for TypeError, a backwards battery for ValueError, a missing key for KeyError, an empty chair for IndexError, and a zero with a line through it for ZeroDivisionError. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

Try typing each of these examples into your editor, one at a time. Run them. Read the error messages Python gives you. Getting comfortable with these messages is one of the most useful things you can do.

---

## try/except -- "Try This, and If Something Goes Wrong, Do This Instead"

Here is the big idea: you can tell Python to **try** something, and if it goes wrong, do something else instead of crashing.

Think of it like this: *Try to open the front door. If it is locked, go around and use the back door.* Either way, you get inside.

```python
user_input = input("Enter a number: ")

try:
    number = int(user_input)
    print("You entered: " + str(number))
except ValueError:
    print("That is not a valid number.")
```

Here is what happens, step by step:

1. Python runs the code inside the `try` block.
2. If everything works, the `except` block is **skipped entirely**.
3. If a `ValueError` happens, Python **jumps** to the `except` block instead of crashing.
4. Either way, the program keeps running after the try/except.

Type this into your editor. Run it. Enter a real number like `42` and see what happens. Then run it again and enter something like `pizza` to see the other path.

### A Helpful Pattern: Keep Asking Until It Works

You can combine `try/except` with a `while` loop to keep asking the user until they give you a good answer:

```python
while True:
    user_input = input("Enter a whole number: ")
    try:
        number = int(user_input)
        break   # If we get here, it worked! Exit the loop.
    except ValueError:
        print("That is not a whole number. Try again.")

print("You entered: " + str(number))
```

This loop runs forever (`while True`) -- but the `break` statement exits it as soon as the user enters a valid number. If they enter something invalid, the `except` block runs and the loop goes around again.

---

## Catching Specific Errors

Different problems need different solutions. You would not put a bandage on a headache, and you would not take headache medicine for a cut. Error handling works the same way.

You can have **multiple except blocks**, one for each kind of error:

```python
def safe_divide(a_text, b_text):
    try:
        a = float(a_text)
        b = float(b_text)
        result = a / b
        return "Result: " + str(result)
    except ValueError:
        return "Error: Please enter valid numbers."
    except ZeroDivisionError:
        return "Error: You cannot divide by zero."

print(safe_divide("10", "3"))     # Result: 3.333...
print(safe_divide("abc", "3"))    # Error: Please enter valid numbers.
print(safe_divide("10", "0"))     # Error: You cannot divide by zero.
```

Python checks each `except` block from top to bottom and uses the **first one that matches**.

**Important rule:** Always name the specific error you expect. Do not just write `except:` by itself with no error name. That catches *everything*, including bugs you need to know about. It is like wearing earplugs to avoid hearing bad news -- you also miss the fire alarm.

```python
# BAD -- catches everything, hides real bugs
try:
    number = int(user_input)
except:
    print("Something went wrong")

# GOOD -- catches exactly what you expect
try:
    number = int(user_input)
except ValueError:
    print("That is not a valid number.")
```

---

## The else Clause -- "If Nothing Went Wrong, Do This"

You can add an `else` block after your `except` blocks. The `else` block runs **only if no error happened**.

```python
user_input = input("Enter a number: ")

try:
    number = int(user_input)
except ValueError:
    print("That is not a valid number.")
else:
    # This only runs if int() worked successfully
    doubled = number * 2
    print("Double your number is: " + str(doubled))
```

Why use `else` instead of just putting the code inside `try`? Because the code in `else` is only for the success path. If something goes wrong in the `else` block, you do *not* want it caught by the `except` above. It keeps things tidy and separate.

---

## The finally Clause -- "Do This No Matter What"

The `finally` block runs **no matter what** -- whether the code worked perfectly, or whether an error happened.

Think of it like cleaning up after cooking. Whether your recipe turned out great or was a disaster, you still need to wash the dishes.

```python
print("Starting...")

try:
    number = int("abc")
except ValueError:
    print("Could not convert to a number.")
finally:
    print("This always runs, no matter what!")

print("Program continues.")
```

If you run this, you will see:

```
Starting...
Could not convert to a number.
This always runs, no matter what!
Program continues.
```

The `finally` block is especially useful when you need to clean something up -- like closing a file or disconnecting from something. You will see this more in the file I/O lesson.

---

## Putting It All Together

Here is the full pattern with all four parts:

```python
try:
    # Try to do something that might fail
    number = int(input("Enter a number: "))
except ValueError:
    # Handle the error if it happens
    print("That was not a valid number.")
except ZeroDivisionError:
    # Handle a different error
    print("Cannot divide by zero.")
else:
    # Only runs if NO error happened
    print("Success! You entered: " + str(number))
finally:
    # ALWAYS runs, no matter what
    print("Thank you for using the program.")
```

You do not always need all four parts. Most of the time you just need `try` and `except`. But it is good to know the full set.

![A flat vector illustration in a children's educational book style showing Byte the robot following a flowchart with four colorful boxes connected by arrows: a blue 'try' box, a red 'except' box branching off to the side, a green 'else' box continuing forward, and a yellow 'finally' box at the bottom that all paths lead to. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Raising Exceptions -- Telling Python Something Is Wrong on Purpose

So far, we have been *catching* errors that Python creates. But you can also *create your own errors* on purpose using the `raise` keyword.

Why would you do this? Because sometimes *you* know something is wrong, even if Python does not.

```python
def set_score(score):
    if score < 0:
        raise ValueError("Score cannot be negative")
    if score > 100:
        raise ValueError("Score cannot be more than 100")
    return "Score set to " + str(score)

# This works fine
print(set_score(85))

# This raises an error on purpose
try:
    print(set_score(-5))
except ValueError as e:
    print("Error: " + str(e))   # Error: Score cannot be negative
```

The `raise` keyword is your way of saying: "Stop! Something is wrong with the data I was given."

The `as e` part captures the error so you can read its message. Think of `e` as a little note attached to the error that explains what went wrong.

---

## Reading Error Messages -- They Are Clues, Not Punishments!

When your program crashes, Python gives you a **traceback**. This can look scary at first, but it is actually a treasure map that leads you straight to the problem.

Here is an example:

```
Traceback (most recent call last):
  File "main.py", line 8, in <module>
    result = double_number("hello")
  File "main.py", line 3, in double_number
    return int(text) * 2
ValueError: invalid literal for int() with base 10: 'hello'
```

Read it **from the bottom up**:

1. **Bottom line:** The actual error -- `ValueError` -- and a message explaining what went wrong.
2. **Lines above:** The trail of code that led to the error. Each line shows the file name, the line number, and the function name.
3. **The bottom of the trail** (just above the error) is where the problem actually happened.
4. **The top of the trail** is where your code started the chain of calls.

Think of it like a detective following footprints. The footprints start at the top and lead to the scene of the crime at the bottom.

**Error messages are your friends.** They tell you exactly what went wrong and exactly where. The more you practice reading them, the faster you will fix problems.

---

## Common Patterns

### Pattern 1: Validation Loop

This pattern keeps asking until the user gives a valid answer. It combines `while True`, `try/except`, and `break`:

```python
def get_number_between(low, high):
    while True:
        user_input = input("Enter a number between " + str(low) + " and " + str(high) + ": ")
        try:
            number = int(user_input)
        except ValueError:
            print("That is not a number. Try again.")
            continue

        if number < low or number > high:
            print("Out of range. Try again.")
            continue

        return number

chosen = get_number_between(1, 10)
print("You chose: " + str(chosen))
```

### Pattern 2: Safe Dictionary Access

When you look up a key that might not exist in a dictionary, you can catch the `KeyError`:

```python
def get_pet_age(pets, pet_name):
    try:
        age = pets[pet_name]
        return pet_name + " is " + str(age) + " years old."
    except KeyError:
        return "I do not have information about " + pet_name + "."

my_pets = {"cat": 5, "dog": 3, "hamster": 1}
print(get_pet_age(my_pets, "cat"))      # cat is 5 years old.
print(get_pet_age(my_pets, "fish"))     # I do not have information about fish.
```

### Pattern 3: Safe List Access

Similar idea for lists, catching `IndexError`:

```python
def get_item_at(items, position):
    try:
        return items[position]
    except IndexError:
        return "There is no item at position " + str(position) + "."

fruits = ["apple", "banana", "cherry"]
print(get_item_at(fruits, 1))    # banana
print(get_item_at(fruits, 10))   # There is no item at position 10.
```

---

## Practice Questions

Try to answer these on your own before looking at the answers at the bottom of the page.

**Question 1:** What is the difference between a syntax error and an exception?

**Question 2:** What kind of exception happens when you run this code?

```python
colors = ["red", "green", "blue"]
print(colors[5])
```

**Question 3:** What does this code print if the user enters "pizza"?

```python
try:
    number = int(input("Enter a number: "))
    print("Your number is: " + str(number))
except ValueError:
    print("That is not a number!")
finally:
    print("All done!")
```

**Question 4:** What is wrong with this code? How would you fix it?

```python
try:
    result = 10 / 0
except:
    print("Something went wrong")
```

**Question 5:** Write a function called `safe_divide` that takes two numbers. It should return the result of dividing the first by the second. If the second number is zero, it should raise a `ValueError` with the message "Cannot divide by zero".

**Question 6:** What does the `else` block do in a try/except/else? When does it run?

**Question 7:** What does this code print?

```python
try:
    number = int("42")
except ValueError:
    print("A")
else:
    print("B")
finally:
    print("C")
```

**Question 8:** Write a validation loop that keeps asking the user for a color until they enter either "red", "green", or "blue". Use try/except if needed, and print a helpful message if they enter something else.

![A flat vector illustration in a children's educational book style showing Byte the robot sitting at a desk with a pencil, working through practice problems on a sheet of paper, with a small stack of completed pages nearby. Features Byte, a small friendly blue robot with round glowing yellow eyes and a smiling face, in a colorful workshop with soft pastel backgrounds. Clean lines, warm and inviting, no text in image.](image-placeholder.png)

---

## Answers to Practice Questions

**Answer 1:** A syntax error is a mistake in how you typed the code -- like a spelling or grammar mistake. Python catches it *before* the program runs. An exception happens *while* the program is running, when the code runs into a problem it cannot handle (like dividing by zero or converting "abc" to a number).

**Answer 2:** `IndexError`. The list has only 3 items (at positions 0, 1, and 2), but you asked for position 5, which does not exist.

**Answer 3:** If the user enters "pizza", it prints:

```
That is not a number!
All done!
```

The `int("pizza")` causes a `ValueError`, so Python jumps to the `except` block and prints "That is not a number!". Then the `finally` block runs no matter what, so it prints "All done!".

**Answer 4:** The problem is that `except:` has no specific error named. It catches *every* error, including bugs you would want to know about. The fix is to catch the specific error you expect:

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
```

**Answer 5:**

```python
def safe_divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Test it
try:
    print(safe_divide(10, 3))    # 3.333...
    print(safe_divide(10, 0))    # Raises ValueError
except ValueError as e:
    print("Error: " + str(e))    # Error: Cannot divide by zero
```

**Answer 6:** The `else` block runs **only when no exception happened** in the `try` block. If the `try` block runs successfully without any errors, the `else` block runs. If an exception occurs, the `else` block is skipped.

**Answer 7:** It prints:

```
B
C
```

`int("42")` works fine (no error), so the `except` block is skipped. The `else` block runs because nothing went wrong, printing "B". The `finally` block always runs, printing "C".

**Answer 8:**

```python
valid_colors = ["red", "green", "blue"]

while True:
    color = input("Enter a color (red, green, or blue): ")
    if color in valid_colors:
        break
    print("That is not one of the choices. Try again.")

print("You chose: " + color)
```

Note: This example does not need try/except because there is no operation that could raise an exception -- we are just checking if the input matches one of the allowed values. Not every validation loop needs error handling! Use try/except when something could *crash*, and use regular `if` checks when you are just checking values.

---

**Previous:** [[wiki:python-jr-functions]] | **Next:** [[wiki:python-jr-file-io]]
