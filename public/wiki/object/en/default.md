# Object

## What is an Object?

An **object** is an instance of a class - a concrete realization of the blueprint defined by a class. Objects are the fundamental building blocks of object-oriented programming, combining data (attributes) and behavior (methods) into a single entity.

## Key Concepts

### Instance

An object is a specific instance of a class. While a class is the blueprint, an object is the actual thing built from that blueprint.

```
Class: Dog (blueprint)
Objects: Buddy, Max, Charlie (actual dogs)
```

### State

The current values of an object's attributes define its state.

### Behavior

Methods define what an object can do.

### Identity

Each object has a unique identity that distinguishes it from other objects, even if they have the same state.

## Object Lifecycle

### 1. Creation

Object is created using the class constructor.

### 2. Usage

Object's methods are called, attributes are accessed and modified.

### 3. Destruction

Object is destroyed when no longer needed (garbage collection).

## Attributes (Properties)

Data stored in an object.

```
car.color = "red"
car.speed = 100
car.year = 2023
```

### Types:

- **Instance attributes**: Unique to each object
- **Class attributes**: Shared by all objects of the class

## Methods (Behaviors)

Functions that belong to an object.

```
car.start()
car.accelerate(50)
car.stop()
```

## Object Identity vs Equality

### Identity (Same Object)

Two references point to the exact same object in memory.

### Equality (Same Values)

Two different objects have the same attribute values.

```
car1 == car2  // Equality (same values?)
car1 is car2  // Identity (same object?)
```

## Creating Objects

```
// Using constructor
Person person1 = new Person("Alice", 30)
Person person2 = new Person("Bob", 25)
```

## Object References

Variables store references (pointers) to objects, not the objects themselves.

```
car1 = Car("Toyota")
car2 = car1  // Both reference same object
```

## Multiple Objects

Create multiple independent instances from one class.

```
dog1 = Dog("Buddy", "Golden Retriever")
dog2 = Dog("Max", "Labrador")
dog3 = Dog("Charlie", "Beagle")
```

Each has its own state but shares methods.

## Object Relationships

### Association

Objects work together but are independent.

### Aggregation

Objects contain other objects (but can exist independently).

### Composition

Objects contain other objects (cannot exist independently).

## Object Best Practices

### 1. Encapsulation

Keep internal details private, expose through methods.

### 2. Single Responsibility

Each object should have one clear purpose.

### 3. Immutability

Consider making objects immutable when possible.

### 4. Meaningful Names

Give objects descriptive names.

### 5. Initialization

Always initialize objects to valid states.

## Common Operations

### Access Attributes

```
value = object.attribute
```

### Modify Attributes

```
object.attribute = newValue
```

### Call Methods

```
result = object.method(arguments)
```

### Compare Objects

```
if object1 == object2
```

### Copy Objects

```
newObject = object.copy()
```

## Related Concepts

- [[wiki:class]] - Object blueprint
- [[wiki:constructor]] - Object creation
- [[wiki:inheritance]] - Object hierarchies
- [[wiki:composition]] - Objects containing objects
- [[wiki:encapsulation]] - Hiding object internals
