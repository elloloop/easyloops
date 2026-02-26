# Class

## What is a Class?

A **class** is a blueprint or template for creating objects in object-oriented programming. It defines the structure (attributes) and behavior (methods) that objects created from the class will have. Think of a class as a cookie cutter and objects as the cookies made from it.

## Key Concepts

### Blueprint for Objects

A class defines what data and operations an object will have, but doesn't create the object itself.

### Encapsulation

Classes bundle data (attributes) and operations (methods) into a single unit.

### Abstraction

Classes hide complex implementation details and expose only what's necessary.

### Reusability

Once defined, a class can be used to create multiple objects with the same structure.

## Class Components

### Attributes (Properties/Fields)

Variables that hold data for each object.

```
Car class attributes:
- color
- brand
- year
- speed
```

### Methods (Functions)

Operations that objects can perform.

```
Car class methods:
- start()
- accelerate()
- brake()
- stop()
```

### Constructor

Special method called when creating new objects to initialize attributes.

## Class vs Object

| Class        | Object              |
| ------------ | ------------------- |
| Blueprint    | Instance            |
| Definition   | Realization         |
| Created once | Created many times  |
| Example: Dog | Example: Buddy, Max |

Think of it this way:

- **Class**: Recipe for chocolate chip cookies
- **Object**: Actual cookies you bake from the recipe

## Why Use Classes?

### 1. Organization

Group related data and behavior together logically.

### 2. Reusability

Define once, create many objects with the same structure.

### 3. Modularity

Separate concerns into distinct, manageable units.

### 4. Maintainability

Changes to the class affect all objects uniformly.

### 5. Real-World Modeling

Map real-world entities to code structures naturally.

## Access Modifiers

Control who can access class members:

- **Public**: Accessible from anywhere
- **Private**: Only accessible within the class
- **Protected**: Accessible within class and subclasses

## Class Relationships

### Inheritance

One class extends another (IS-A relationship).

```
Animal → Dog
Vehicle → Car
```

### Composition

One class contains another (HAS-A relationship).

```
Car HAS-A Engine
House HAS-A Kitchen
```

### Association

Classes interact but are independent.

```
Student ↔ Course
Doctor ↔ Patient
```

## Static vs Instance Members

### Instance Members

Belong to each object. Different for every instance.

### Static Members

Belong to the class itself. Shared by all instances.

```
Instance: dog1.name, dog2.name (different)
Static: Dog.species (same for all dogs)
```

## Best Practices

### 1. Single Responsibility

Each class should have one clear purpose.

### 2. Meaningful Names

Use clear, descriptive class names (PascalCase).

### 3. Encapsulation

Keep data private, provide public methods for access.

### 4. Cohesion

Keep related things together in one class.

### 5. Loose Coupling

Minimize dependencies between classes.

## Common Class Patterns

### Data Class

Holds data with minimal behavior.

### Service Class

Provides operations, little to no data.

### Utility Class

Static methods only, no instances created.

### Abstract Class

Cannot be instantiated, serves as base for other classes.

## Related Concepts

- [[wiki:object]] - Instances of classes
- [[wiki:constructor]] - Object initialization
- [[wiki:inheritance]] - Class hierarchies
- [[wiki:composition]] - Class relationships
- [[wiki:encapsulation]] - Data hiding
