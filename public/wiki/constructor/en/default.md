# Constructor

## What is a Constructor?

A **constructor** is a special method that is automatically called when an object of a class is created. Its primary purpose is to initialize the object's attributes and perform any setup needed before the object is used.

## Key Characteristics

### 1. Automatic Execution

Called automatically when creating an object - no explicit call needed.

### 2. Same Name as Class

In many languages, the constructor has the same name as the class.

### 3. No Return Type

Constructors don't have a return type (not even void).

### 4. Initialization Purpose

Sets initial values for object attributes and performs setup.

## Why Use Constructors?

### 1. Initialize Attributes

Ensure all object attributes have valid initial values.

### 2. Enforce Constraints

Validate input and ensure objects start in a valid state.

### 3. Resource Allocation

Allocate memory, open files, establish connections.

### 4. Dependency Injection

Receive and store dependencies from outside.

## Types of Constructors

### Default Constructor

No parameters. Provides default initialization.

```
Person()  // No arguments
```

### Parameterized Constructor

Takes arguments to customize initialization.

```
Person(name, age)  // With arguments
```

### Copy Constructor

Creates a new object as a copy of an existing object.

```
Person(otherPerson)  // Copy from another
```

## Constructor Overloading

Multiple constructors with different parameters.

```
Person()                    // Default
Person(name)                // Name only
Person(name, age)           // Name and age
Person(name, age, email)    // All fields
```

## Constructor Chaining

One constructor calls another constructor.

## Access Modifiers

### Public Constructor

Anyone can create objects.

### Private Constructor

Prevents external object creation (Singleton pattern).

### Protected Constructor

Only subclasses can use it.

## Best Practices

### 1. Keep Constructors Simple

Avoid complex logic - constructors should initialize, not compute.

### 2. Validate Input

Check parameters to ensure valid object state.

### 3. Fail Fast

Throw exceptions for invalid input immediately.

### 4. Use Defaults Wisely

Provide sensible default values.

### 5. Avoid Side Effects

Don't perform I/O operations or network calls in constructors.

## Common Patterns

### Builder Pattern

For objects with many optional parameters.

### Factory Pattern

Centralize object creation logic.

### Singleton Pattern

Use private constructor to control instantiation.

## Constructor vs Factory Method

| Constructor          | Factory Method      |
| -------------------- | ------------------- |
| Language feature     | Design pattern      |
| Same class name      | Descriptive name    |
| Returns new instance | Can return existing |
| Limited flexibility  | More control        |

## Memory and Lifecycle

1. **Memory Allocation**: Space for object is allocated
2. **Constructor Execution**: Constructor initializes the object
3. **Object Ready**: Object is now usable
4. **Reference Returned**: Reference to object is returned

## Related Concepts

- [[wiki:class]] - Class basics
- [[wiki:destructor]] - Object cleanup
- [[wiki:initialization]] - Value initialization
- [[wiki:dependency-injection]] - Constructor injection
