# Object

## Object ante enti?

**Object** ante class yoka instance - class blueprint nundi create chesina concrete realization. Objects OOP lo fundamental building blocks, data (attributes) and behavior (methods) combine chesi single entity ga untayi.

## Key Concepts

### Instance

Object ante class yoka specific instance. Class blueprint aithe, object adi real thing.

```
Class: Dog (blueprint)
Objects: Buddy, Max, Charlie (actual dogs)
```

### State

Object yoka attributes yoka current values = state.

### Behavior

Methods define what object can do.

### Identity

Prathi object unique identity undi - different objects ni distinguish chesthundi.

## Object Lifecycle

1. **Creation**: Constructor use chesi create
2. **Usage**: Methods call, attributes access/modify
3. **Destruction**: No longer needed aithe destroy (garbage collection)

## Attributes

Object lo store chesina data.

```
car.color = "red"
car.speed = 100
car.year = 2023
```

- **Instance attributes**: Each object ki unique
- **Class attributes**: All objects share

## Methods

Object ki belong aina functions.

```
car.start()
car.accelerate(50)
car.stop()
```

## Identity vs Equality

- **Identity**: Same object in memory?
- **Equality**: Same values unda?

```
car1 == car2  // Values same?
car1 is car2  // Same object?
```

## Object Creation

```
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)
```

## Object References

Variables object references store chesthayi, objects kadu.

```
car1 = Car("Toyota")
car2 = car1  // Same object reference
```

## Best Practices

1. **Encapsulation**: Internal details private
2. **Single Responsibility**: One purpose
3. **Immutability**: Possible aithe immutable
4. **Meaningful Names**: Descriptive names
5. **Initialization**: Valid state lo initialize

---

_Note: Ee page inka development stage lo undi._
