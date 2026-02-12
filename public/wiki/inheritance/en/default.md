# Inheritance

## What is Inheritance?

**Inheritance** is a fundamental concept in object-oriented programming where a new class (child/derived class) inherits properties and methods from an existing class (parent/base class). This creates a hierarchical relationship between classes.

## Key Concepts

### Parent Class (Base/Super Class)

The class being inherited from. Contains common attributes and methods.

### Child Class (Derived/Sub Class)

The class that inherits. Gains access to parent's members and can add its own.

### "IS-A" Relationship

Inheritance represents an "is-a" relationship:

- Dog IS-A Animal
- Car IS-A Vehicle
- Circle IS-A Shape

## Why Use Inheritance?

### 1. Code Reusability

Write common code once in the parent class, reuse in all children.

### 2. Logical Hierarchy

Models real-world relationships and taxonomies.

### 3. Polymorphism

Different classes can be treated uniformly through their common parent.

### 4. Maintainability

Changes to shared behavior only need to be made in one place.

## Types of Inheritance

### Single Inheritance

One child inherits from one parent.

```
Animal
  ↓
 Dog
```

### Multiple Inheritance

One child inherits from multiple parents (not supported in all languages).

```
Flyer   Swimmer
   ↘     ↙
     Duck
```

### Multilevel Inheritance

Chain of inheritance across multiple levels.

```
Animal
  ↓
Mammal
  ↓
 Dog
```

### Hierarchical Inheritance

Multiple children inherit from one parent.

```
    Animal
   ↙  ↓  ↘
Dog  Cat  Bird
```

### Hybrid Inheritance

Combination of multiple inheritance types.

## Method Overriding

Child classes can override (replace) parent methods with their own implementation.

```
Parent:
  speak() → "Some sound"

Child (Dog):
  speak() → "Woof!"

Child (Cat):
  speak() → "Meow!"
```

## Access Modifiers

Control what children can access from parent:

- **Public**: Accessible to everyone
- **Protected**: Accessible to class and children
- **Private**: Only accessible within the class

## Super/Base Class Access

Children can call parent methods using special keywords (super, base, parent).

## Benefits

1. **DRY Principle**: Don't Repeat Yourself
2. **Extensibility**: Easy to add new child classes
3. **Abstraction**: Hide complexity in parent classes
4. **Organization**: Clear class hierarchies

## Common Pitfalls

### 1. Deep Inheritance Chains

Too many levels make code hard to understand.

### 2. Tight Coupling

Changes to parent affect all children.

### 3. Fragile Base Class Problem

Parent modifications can break child classes.

### 4. Improper "IS-A" Relationships

Misuse of inheritance when composition is better.

## Inheritance vs Composition

| Inheritance               | Composition                |
| ------------------------- | -------------------------- |
| "IS-A" relationship       | "HAS-A" relationship       |
| Tight coupling            | Loose coupling             |
| Static at compile time    | Flexible at runtime        |
| Example: Car IS-A Vehicle | Example: Car HAS-AN Engine |

**When to use:**

- Inheritance: True hierarchical relationship
- Composition: Need flexibility or multiple behaviors

## Best Practices

1. **Favor composition over inheritance** when possible
2. **Keep hierarchies shallow** (prefer 2-3 levels max)
3. **Use inheritance for "is-a" relationships only**
4. **Make parent classes abstract** if they shouldn't be instantiated
5. **Override methods meaningfully**, not arbitrarily

## Related Concepts

- [[wiki:class]] - Class basics
- [[wiki:polymorphism]] - Using inheritance for polymorphism
- [[wiki:abstract]] - Abstract base classes
- [[wiki:encapsulation]] - Access control
