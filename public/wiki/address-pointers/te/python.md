# Python lo Memory Addresses and References

Python lo memory addresses and references ela work avtayo ikkada chudandi.

## Memory Address chusukovali ante

`id()` function use chesi memory address chudochu.

```python
x = 42
print(id(x))  # Memory address chupistundi
```

## Reference Assignment

```python
a = [1, 2, 3]
b = a  # Rendu okate object ni point chestunnayi

print(id(a))  # Same address
print(id(b))  # Same address
```

## Mutable vs Immutable Objects

- **Immutable**: Integers, strings, tuples - change avvavu
- **Mutable**: Lists, dictionaries - modify cheyochu

---

_Note: Ee page inka development stage lo undi._
