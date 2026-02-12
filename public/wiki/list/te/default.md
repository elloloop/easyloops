# List

## List Enti?

**List** anedi oka basic data structure. Idhi chala elements ni oka specific order lo store chestundi. Related data ni group chesi, prathi element ni daani position (index) tho access cheyochu.

## Array Enti?

**Array** anedi oka data structure. Idhi same type unna elements ni contiguous memory lo store chestundi. Index positions use chesi elements ni fast ga access cheyochu.

## Array - Contiguous Memory Location

Arrays elements ni **contiguous memory locations** lo store chestundi. Ante prathi element daani pakkane vundhi memory lo. Idhi manchidi endukante:

- Index tho element ni chala fast ga access cheyochu
- Memory efficient ga use avthundi
- Memory layout predict cheyochu

### Array Types

Arrays different types of data store cheyochu:

**Integer Array:**

- Whole numbers store chestundi: `[10, 20, 30, 40]`

**Float Array:**

- Decimal numbers store chestundi: `[1.5, 2.7, 3.14, 4.0]`

**String Array:**

- Text values store chestundi: `["hello", "world", "example"]`

## Array Declaration

Traditional programming languages lo arrays ni fixed size tho declare chestharu:

```
int arr[5];        // 5 integers array
float prices[3];   // 3 floats array
string names[4];   // 4 strings array
```

## For Loop Tho Iteration

Arrays ni for loops tho traverse chestharu:

```
for (i = 0; i < length; i++) {
    arr[i] ni access chestharu
}
```

## Primitive Types

**Primitive types** anevi programming language lo built-in ga unna basic data types:

- **int**: whole numbers (1, 2, 100)
- **float**: decimal numbers (3.14, 2.5)
- **string**: text data ("hello")
- **boolean**: true/false values

## Python Lo Arrays

**Python lo traditional fixed-size arrays levu** (C, Java lanti languages lo unnattu). Daniki bajayiga Python **list** anede data type istundi.

## Python List - Dynamic Array Laga

Python **list** oka **dynamic array** laga work chestundi:

- Create cheseppudu size fix cheyyalsina avasaram ledu
- Elements add chesthe automatically peddhadi avthundi
- Elements remove chesthe automatically chinnadi avthundi
- Different types of elements kuda store cheyochu

## Lists References Store Chesthayi, Values Kaadu

**Important Concept:** Python lists actual values store cheyyavu—**references** (memory addresses) store chesthayi objects ki.

### Idhi Enti Ante:

**Mutable objects ki** (lists, dictionaries, custom objects):

- List lo object yoka reference untundi memory lo
- Object change aithe, aa change list dwara kuda kanipistundi
- Multiple variables same object ni reference cheyochu

**Immutable objects ki** (integers, strings, tuples):

- List lo references untayi, kaani objects modify avvavu kabatti values laga behave chesthayi
- Value change chesthe kotha object create avthundi mariyu reference update avthundi

### Practical Example:

```python
# Mutable object example (list)
inner_list = [1, 2, 3]
outer_list = [inner_list, inner_list]
# Rendu positions SAME list object ni reference chestunnai

inner_list.append(4)
# Ippudu outer_list: [[1, 2, 3, 4], [1, 2, 3, 4]]
# Rendu elements kuda change ayyayi endukante same object ni reference chestunnai

# Immutable object example (integer)
x = 10
my_list = [x, x]
x = 20
# my_list inka: [10, 10]
# List lo integer object 10 yoka references unnayi, variable x kaadu
```

## Dynamic Memory Growth

Python list ki elements add chesthe:

1. Space unte, element add avthundi
2. Space full aithe, Python peddhani memory block allocate chestundi
3. Existing elements kotha location ki copy avtharu
4. Kotha element add avthundi
5. Paatha memory free avthundi

Ee process automatic ga jaruguthundi. Mana involvement avasaram ledu.

## List - Infinite Array Laga

Python lists **infinite arrays** laga behave chesthayi programmer ki:

- Size upfront cheppakapoina elements add cheskovachu
- List automatic ga grow avthundi
- **Kaani**, lists computer lo unna memory tho limited
- Memory antha aipoyina program fail avthundi

**Mukhya Point:** Lists unlimited growth la convenience isthayi, kaani physical memory tho limit avthundi.

## Complete Example: DynamicList Implementation

Dynamic behavior ela work chestundo complete implementation chudandi:

```python
class DynamicList:
    def __init__(self):
        # Empty list tho start chesthamu
        self.data = []

    def add(self, value):
        """List ki kotha value add chestundi dynamically"""
        self.data.append(value)

    def remove(self, value):
        """Value unte remove chestundi"""
        if value in self.data:
            self.data.remove(value)

    def get(self, index):
        """Specific index lo unna value return chestundi"""
        if 0 <= index < len(self.data):
            return self.data[index]
        else:
            raise IndexError("Index range lo ledu")

    def size(self):
        """Current size return chestundi"""
        return len(self.data)

    def __str__(self):
        """List ni string laga chupistundi"""
        return str(self.data)

# DynamicList instance create chesthamu
dl = DynamicList()

# Dynamically values add chesthamu
for i in range(5):
    dl.add(i)
    print(dl)   # Prathi step lo growth chupistundi

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
