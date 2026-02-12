# Dependencies in Programming

## Dependency Ante Enti?

Dependency ante mana program ki kavalsina external code, library, or module. Mana code external functionality meeda rely ayithe, adi dependency create chesthundi. Everything mana own ga raayadam badulu, ready-made solutions use chestham.

## Dependency Types

### 1. External Dependencies

External sources nundi install chese libraries and packages.

```python
# Python - external dependencies
import requests  # HTTP library
import pandas    # Data analysis library
import numpy     # Numerical computing library
```

```go
// Go - external dependencies
import (
    "github.com/gin-gonic/gin"
    "github.com/lib/pq"
)
```

### 2. Internal Dependencies

Mana own project lo unna modules okati inkothi depend ayithe.

```python
# Python - internal dependencies
from utils.database import connect_db
from models.user import User
from services.auth import authenticate
```

### 3. Runtime Dependencies

Program run ayye time lo kavalsina libraries.

### 4. Development Dependencies

Development time lo matrame kavalsina tools (testing, linting, building).

## Dependency Management

### Package Managers

Different languages ki different package managers:

- **Python**: pip, conda
- **JavaScript/Node.js**: npm, yarn
- **Go**: go modules
- **Java**: Maven, Gradle

### Dependency Files

```python
# Python - requirements.txt
requests==2.28.0
pandas>=1.5.0
numpy~=1.24.0
```

```json
// JavaScript - package.json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  }
}
```

## Version Management

### Semantic Versioning (SemVer)

Version format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

```python
# Version specifiers
requests==2.28.0    # Exact version
requests>=2.28.0    # Minimum version
requests~=2.28.0    # Compatible version
```

## Dependency Injection

Dependency injection ante dependencies ni class lopal create cheyyadam badulu, external ga provide cheyadam.

### Without Dependency Injection

```python
class UserService:
    def __init__(self):
        self.db = Database()  # Lopal create chesthundi

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")
```

### With Dependency Injection

```python
class UserService:
    def __init__(self, database):
        self.db = database  # External ga inject chesindi

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")

# Usage
db = Database()
service = UserService(db)  # Dependency inject chesindi
```

## Common Dependency Issues

### 1. Dependency Hell

Different packages nundi conflicting version requirements.

**Solution**: Virtual environments and lock files use cheyali.

### 2. Circular Dependencies

Module A, Module B meeda depend, Module B, Module A meeda depend.

**Solution**: Code structure refactor cheyali or dependency injection use cheyali.

### 3. Missing Dependencies

Required packages install cheyaledu.

**Solution**: Proper dependency files maintain cheyali.

### 4. Version Conflicts

Code lo different parts ki same library ki different versions kavali.

**Solution**: Compatible version ranges use cheyali.

## Best Practices

### 1. Virtual Environments Use Cheyali

```bash
# Python
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Dependencies install
pip install -r requirements.txt
```

### 2. Dependency Versions Lock Cheyali

```python
# Lock file generate
pip freeze > requirements.txt
```

### 3. Minimum Dependencies Use Cheyali

Necessary dependencies matrame include cheyali:

- Security vulnerabilities tagginchali
- Build time kammi avthundi
- Package size chinnadi untundi

### 4. Regular Updates

Dependencies ni update cheyadam important:

- Security patches kosam
- Bug fixes kosam
- Performance improvements kosam

### 5. Dependencies Document Cheyali

Clear ga document cheyali:

- Each dependency emi chesthundo
- Enduku kavalo
- Version constraints

## Dependency Injection Benefits

1. **Testability**: Tests lo dependencies mock cheyyadam easy
2. **Flexibility**: Implementations swap cheyyadam easy
3. **Reusability**: Components reusable ga untayi
4. **Maintainability**: Code structure clear ga untundi
5. **Loose Coupling**: Components less dependent

## Summary

Dependencies modern software development lo essential:

- **External packages** ready-made functionality isthayi
- **Proper management** conflicts and issues prevent chesthundi
- **Dependency injection** code quality improve chesthundi
- **Version control** stability ensure chesthundi
- **Best practices** healthy projects maintain chesthayi

Dependencies artham cheskunte maintainable, scalable applications build cheyyadam easy.

## Related Topics

- [[wiki:modules]] - Code modules gurinchi nerchuko
- [[wiki:packages]] - Packages artham chesko
- [[wiki:version-control]] - Code versions manage cheyyadam
- [[question:01-dependency-basics]] - Dependency management practice cheyyi
