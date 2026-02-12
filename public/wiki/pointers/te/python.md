# Python lo Pointers

## Python's Approach

Python lo C language laga direct pointers undavu. Badalu ga **object references** use chestaru - idi safer and easy.

## Everything is a Reference

Python lo anni variables object references ye. Variable assign chesnapudu, reference copy avutundi, value kadu.

```python
# Rendu variables okate list object ni reference chestunnayi
list1 = [1, 2, 3]
list2 = list1

print(id(list1))  # Same address
print(id(list2))  # Same address

list2.append(4)
print(list1)  # [1, 2, 3, 4] - list2 dwara modify ayyindi
```

## Mutable vs Immutable

### Immutable Objects

Integers, strings, tuples change avvavu.

```python
x = 10
print(id(x))  # Address: 140736388654336

x = 20  # New object create ayyindi
print(id(x))  # Different address
```

### Mutable Objects

Lists, dictionaries, sets modify cheyochu.

```python
my_list = [1, 2, 3]
address_before = id(my_list)

my_list.append(4)
address_after = id(my_list)

print(address_before == address_after)  # True - same object
```

## Copy vs Reference

```python
import copy

# Shallow copy
shallow = copy.copy(original)

# Deep copy
deep = copy.deepcopy(original)
```

---

_Note: Ee page inka development stage lo undi._
