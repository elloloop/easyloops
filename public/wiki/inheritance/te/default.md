# Inheritance

## Inheritance ante enti?

**Inheritance** ante OOP lo key concept. New class (child/derived) existing class (parent/base) nundi properties and methods inherit cheskuntundi. Idi hierarchical relationship create chesthundi.

## Key Concepts

### Parent Class

Base class - common attributes and methods ikkada untayi.

### Child Class

Derived class - parent nundi inherit chesi, own features add cheyochu.

### "IS-A" Relationship

Inheritance "is-a" relationship ni represent chesthundi:

- Dog IS-A Animal
- Car IS-A Vehicle
- Circle IS-A Shape

## Enduku Use Cheyali?

1. **Code Reusability**: Common code okasari rasthe chalu
2. **Logical Hierarchy**: Real-world relationships model cheyochu
3. **Polymorphism**: Different classes ni uniformly treat cheyochu
4. **Maintainability**: Changes okka place lo cheste chalu

## Types

### Single Inheritance

Oka child, oka parent nundi.

```
Animal → Dog
```

### Multiple Inheritance

Oka child, multiple parents nundi.

```
Flyer + Swimmer → Duck
```

### Multilevel Inheritance

Multiple levels chain laga.

```
Animal → Mammal → Dog
```

## Method Overriding

Child classes parent methods ni override (replace) cheyochu.

```
Parent: speak() → "Some sound"
Dog: speak() → "Woof!"
Cat: speak() → "Meow!"
```

## Benefits

- Code reuse
- Clear hierarchies
- Extensibility
- Organization

## Pitfalls

1. **Deep Chains**: Too many levels - confusing
2. **Tight Coupling**: Parent changes affect children
3. **Wrong IS-A**: Composition better aite inheritance vadakandi

## Inheritance vs Composition

| Inheritance      | Composition       |
| ---------------- | ----------------- |
| IS-A             | HAS-A             |
| Tight coupling   | Loose coupling    |
| Car IS-A Vehicle | Car HAS-AN Engine |

## Best Practices

- Composition prefer cheyandi when possible
- Shallow hierarchies (2-3 levels max)
- True "is-a" relationships kosam matrame
- Abstract base classes use cheyandi

---

_Note: Ee page inka development stage lo undi._
