# Composition

## What is Composition?

**Composition** is a design principle where a class contains objects of other classes as members. Instead of inheriting behavior, a class delegates tasks to its contained objects. This represents a "HAS-A" relationship.

## HAS-A Relationship

Composition models "has-a" relationships between objects:

- Car HAS-A Engine
- Computer HAS-A Processor
- House HAS-A Kitchen
- Book HAS-A Author

## Key Concepts

### Object Composition

Building complex objects by combining simpler objects.

### Delegation

Forwarding method calls to contained objects.

### Loose Coupling

Components are independent and can be changed easily.

### Flexibility

Behavior can be changed at runtime by swapping components.

## Why Use Composition?

### 1. Flexibility

Components can be swapped or modified at runtime without changing the container class.

### 2. Reusability

Components can be reused in different contexts and combinations.

### 3. Maintainability

Changes to components don't affect other parts of the system.

### 4. Testing

Individual components can be tested independently and mocked easily.

### 5. Avoids Deep Hierarchies

Prevents complex inheritance chains that are hard to understand.

## Composition vs Inheritance

| Aspect       | Composition    | Inheritance              |
| ------------ | -------------- | ------------------------ |
| Relationship | HAS-A          | IS-A                     |
| Coupling     | Loose          | Tight                    |
| Flexibility  | High (runtime) | Low (compile-time)       |
| Reusability  | Mix and match  | Single hierarchy         |
| Testing      | Easy to mock   | Harder to isolate        |
| Changes      | Localized      | Ripple through hierarchy |

## When to Use Composition

### Prefer Composition When:

- Need to change behavior at runtime
- Want to reuse components in different contexts
- Relationship is "has-a" not "is-a"
- Need flexibility and loose coupling
- Want to avoid deep inheritance hierarchies

### Example Scenarios:

- Car has an Engine (not Car is an Engine)
- Computer has Components (not Computer is a Component)
- Player has Weapons (not Player is a Weapon)

## Types of Composition

### Aggregation (Weak Composition)

Components can exist independently of the container. Example: University HAS Students (students can exist without university).

### Composition (Strong Composition)

Components cannot exist without the container. Example: House HAS Rooms (rooms are part of the house).

## Design Patterns Using Composition

### Strategy Pattern

Encapsulate algorithms and make them interchangeable.

### Decorator Pattern

Add responsibilities to objects dynamically.

### Composite Pattern

Build tree structures of objects.

### Adapter Pattern

Make incompatible interfaces work together.

## Benefits

1. **Single Responsibility**: Each component has one job
2. **Open/Closed Principle**: Open for extension, closed for modification
3. **Dependency Injection**: Easy to inject dependencies
4. **Interface Segregation**: Use only needed interfaces
5. **Dynamic Behavior**: Change behavior at runtime

## Common Pitfalls

### 1. Over-Composition

Creating too many small objects can make code complex.

### 2. Indirection

Multiple levels of delegation can make code harder to follow.

### 3. Boilerplate

May require more initial setup code than inheritance.

## Best Practices

1. **Favor composition over inheritance** as a general rule
2. **Use interfaces** to define contracts between components
3. **Inject dependencies** via constructor or setters
4. **Keep components focused** on single responsibilities
5. **Document relationships** clearly

## Related Concepts

- [[wiki:inheritance]] - Alternative to composition
- [[wiki:class]] - Building blocks of composition
- [[wiki:dependency-injection]] - Providing components
- [[wiki:interfaces]] - Defining contracts
