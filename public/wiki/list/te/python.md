# Python Lo List

## List Declaration

Python lo list create cheyadam chala simple:

```python
# Empty list
my_list = []

# Integers tho list
numbers = [10, 20, 30, 40, 50]

# Floats tho list
prices = [19.99, 25.50, 12.75]

# Strings tho list
fruits = ["apple", "banana", "cherry"]

# Mixed types (Python lo idhi kuda allow chestundi)
mixed = [1, "hello", 3.14, True]
```

## For Loop Tho Iteration

Python lo list elements ni loop cheyyadam chala easy:

```python
# Method 1: Direct iteration
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Output:
# apple
# banana
# cherry

# Method 2: Index use chesi
numbers = [10, 20, 30]
for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")

# Output:
# Index 0: 10
# Index 1: 20
# Index 2: 30
```

## Python Lists Lo Primitive Types

```python
# Integer list
int_list = [1, 2, 3, 4, 5]
print(int_list)  # Output: [1, 2, 3, 4, 5]

# Float list
float_list = [1.1, 2.2, 3.3]
print(float_list)  # Output: [1.1, 2.2, 3.3]

# String list
string_list = ["hello", "world", "python"]
print(string_list)  # Output: ['hello', 'world', 'python']

# Boolean list
bool_list = [True, False, True]
print(bool_list)  # Output: [True, False, True]
```

## Python Lo Fixed Array Ledu

C leda Java lanti languages lo kaadu, Python lo size specify cheyyalsina avasaram ledu:

```python
# C lo: int arr[5];  (fixed size)
# Python lo:
my_list = []  # Size cheppaledu!

# Enni elements add chesina parvaaledu
my_list.append(1)
my_list.append(2)
my_list.append(3)
print(my_list)  # Output: [1, 2, 3]
```

## Lists References Store Chesthayi, Values Kaadu

**Mukhya Concept:** Python lists **references** (memory addresses) store chesthayi objects ki, actual values kaadu.

### Mutable Objects Example (Lists, Dictionaries)

```python
# List create chesthamu
inner_list = [1, 2, 3]

# Same list ni rendu sarlu add chesthamu
outer_list = [inner_list, inner_list]
print(outer_list)  # Output: [[1, 2, 3], [1, 2, 3]]

# Inner list modify chesthamu
inner_list.append(4)

# Outer_list lo rendu elements kuda change ayyayi!
print(outer_list)  # Output: [[1, 2, 3, 4], [1, 2, 3, 4]]
# Enduku? Endukante rendu positions SAME object ni reference chestunnai memory lo
```

### Immutable Objects Example (Integers, Strings)

```python
# Integer create chesthamu
num = 10

# List ki add chesthamu
my_list = [num, num]
print(my_list)  # Output: [10, 10]

# Variable change chesthamu
num = 20

# List marchipodu
print(my_list)  # Output: [10, 10]
# Enduku? List lo integer object 10 yoka references unnayi,
# variable num kaadu
```

### Practical Implication

```python
# Independent copies create cheyadam
original = [1, 2, 3]
reference = original        # Same reference!
copy = original.copy()      # Kotha object with same values

original.append(4)

print(original)   # Output: [1, 2, 3, 4]
print(reference)  # Output: [1, 2, 3, 4] - Change ayyindi!
print(copy)       # Output: [1, 2, 3] - Change avvaledu!
```

## Python List - Dynamic Array Laga

Python lists automatic ga grow ayyi shrink avtharu:

```python
# Empty list tho start chesthamu
dynamic_list = []
print(f"Initial: {dynamic_list}")  # Output: Initial: []

# Dynamically elements add chesthamu
dynamic_list.append(10)
print(f"10 add chesaka: {dynamic_list}")  # Output: 10 add chesaka: [10]

dynamic_list.append(20)
print(f"20 add chesaka: {dynamic_list}")  # Output: 20 add chesaka: [10, 20]

dynamic_list.append(30)
print(f"30 add chesaka: {dynamic_list}")  # Output: 30 add chesaka: [10, 20, 30]

# Elements remove cheyochu
dynamic_list.remove(20)
print(f"20 remove chesaka: {dynamic_list}")  # Output: 20 remove chesaka: [10, 30]
```

## Memory Ela Dynamically Grow Avthundi

Elements add chesthune unte, Python automatic ga memory manage chestundi:

```python
import sys

my_list = []
print(f"Empty list size: {sys.getsizeof(my_list)} bytes")

for i in range(10):
    my_list.append(i)
    print(f"{i} add chesaka: size = {sys.getsizeof(my_list)} bytes")

# Size okkokkasari kadhu, chunks lo perigindi ani gurthistharu
# Python frequent reallocations tagginchadaniki extra space allocate chestundi
```

## List - Infinite Array Laga (Memory Tho Limited)

Programming perspective nunchi lists infinite laga kanipistharu:

```python
# Elements add chesthune undochu
infinite_list = []

# 1000 elements add chesthamu
for i in range(1000):
    infinite_list.append(i)

print(f"List lo {len(infinite_list)} elements unnayi")  # Output: List lo 1000 elements unnayi

# Inkaa add cheyochu
for i in range(1000, 2000):
    infinite_list.append(i)

print(f"Ippudu list lo {len(infinite_list)} elements unnayi")  # Output: Ippudu list lo 2000 elements unnayi

# Limit anedi mana computer memory matrame
# RAM kanna peddhani list create cheyadaniki try chesthe MemoryError vasthundi
```

## Complete Example: DynamicList Implementation

Meere dynamic behavior ela implement chestharu ani chudandi:

```python
class DynamicList:
    def __init__(self):
        # Empty list tho start chesthamu
        self.items = []

    def add(self, value):
        """List ki element add chestundi"""
        self.items.append(value)

    def get(self, index):
        """Specific index lo unna element return chestundi"""
        if 0 <= index < len(self.items):
            return self.items[index]
        raise IndexError("Index range lo ledu")

    def remove(self, value):
        """Value first occurrence remove chestundi"""
        if value in self.items:
            self.items.remove(value)

    def size(self):
        """Current size return chestundi"""
        return len(self.items)

    def __str__(self):
        # List ni string laga print cheyadaniki
        return str(self.items)

# DynamicList instance create chesthamu
dl = DynamicList()

# Dynamically values add chesthamu
for i in range(5):
    dl.add(i)
    print(dl)   # Prathi step lo ela grow avthundo chupistundi

# Output:
# [0]
# [0, 1]
# [0, 1, 2]
# [0, 1, 2, 3]
# [0, 1, 2, 3, 4]

# Elements access chesthamu
print("Index 2 lo element:", dl.get(2))
# Output: Index 2 lo element: 2

# Element remove chesthamu
dl.remove(3)
print("3 remove chesaka:", dl)
# Output: 3 remove chesaka: [0, 1, 2, 4]

# Size check chesthamu
print("Current size:", dl.size())
# Output: Current size: 4
```

**Mukhya Lesson:** Python lo built-in list ippudippatike ee dynamic functionality antha istundi. Kaani idhi ela work chestundo artham cheskunte, Python data structures entha powerful o telustundi!
