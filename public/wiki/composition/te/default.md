# Composition

## Composition ante enti?

**Composition** ante oka design principle. Class lo other classes yoke objects ni members ga include chestham. Inheritance badulu, contained objects ki tasks delegate chestham. Idi "HAS-A" relationship.

## HAS-A Relationship

Composition "has-a" relationships model chesthundi:

- Car HAS-A Engine
- Computer HAS-A Processor
- House HAS-A Kitchen
- Book HAS-A Author

## Key Concepts

- **Object Composition**: Simple objects combine chesi complex objects build
- **Delegation**: Method calls contained objects ki forward
- **Loose Coupling**: Components independent ga untayi
- **Flexibility**: Runtime lo behavior change cheyochu

## Enduku Use Cheyali?

1. **Flexibility**: Runtime lo components swap cheyochu
2. **Reusability**: Components different contexts lo reuse
3. **Maintainability**: Changes localized ga untayi
4. **Testing**: Individual components easy ga test cheyochu
5. **Avoids Deep Hierarchies**: Complex inheritance chains avoid

## Composition vs Inheritance

| Aspect         | Composition | Inheritance |
| -------------- | ----------- | ----------- |
| Relationship   | HAS-A       | IS-A        |
| Coupling       | Loose       | Tight       |
| Flexibility    | High        | Low         |
| Runtime change | Yes         | No          |
| Testing        | Easy        | Harder      |

## Epudu Use Cheyali?

### Composition prefer cheyandi when:

- Runtime lo behavior change kavali
- Components reuse cheyyali different contexts lo
- Relationship "has-a" undi (not "is-a")
- Flexibility kavali
- Deep inheritance avoid cheyali

### Examples:

- Car has Engine (Car is Engine kadu)
- Computer has Components
- Player has Weapons

## Types

### Aggregation (Weak)

Components independent ga exist avvachu.
Example: University HAS Students

### Composition (Strong)

Components container lekunda exist avvavu.
Example: House HAS Rooms

## Benefits

- Single responsibility
- Open/closed principle
- Easy dependency injection
- Dynamic behavior
- Better testability

## Pitfalls

1. **Over-Composition**: Too many small objects
2. **Indirection**: Multiple delegation levels
3. **Boilerplate**: More setup code

## Best Practices

- Composition over inheritance prefer cheyandi
- Interfaces use chesi contracts define
- Dependencies inject cheyandi
- Components focused ga unchandi
- Relationships document cheyandi

---

_Note: Ee page inka development stage lo undi._
