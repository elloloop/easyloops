# Dependencies in Programming

## What is a Dependency?

A dependency is a piece of code, library, or module that your program needs to function properly. When your code relies on external functionality, you create a dependency on that external code.

## Types of Dependencies

### 1. External Dependencies

Libraries and packages installed from external sources.

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

Modules within your own project that depend on each other.

```python
# Python - internal dependencies
from utils.database import connect_db
from models.user import User
from services.auth import authenticate
```

### 3. Runtime Dependencies

Libraries required when the program runs.

### 4. Development Dependencies

Tools needed only during development (testing, linting, building).

## Dependency Management

### Package Managers

Different languages use different package managers:

- **Python**: pip, conda
- **JavaScript/Node.js**: npm, yarn
- **Go**: go modules
- **Java**: Maven, Gradle
- **Ruby**: gem

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
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
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
requests>=2.0,<3.0  # Range
```

## Dependency Injection

A design pattern where dependencies are provided to a class rather than created inside it.

### Without Dependency Injection

```python
class UserService:
    def __init__(self):
        self.db = Database()  # Creates dependency internally

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")
```

### With Dependency Injection

```python
class UserService:
    def __init__(self, database):
        self.db = database  # Dependency injected

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")

# Usage
db = Database()
service = UserService(db)  # Inject dependency
```

## Common Dependency Issues

### 1. Dependency Hell

Conflicting version requirements from different packages.

**Solution**: Use virtual environments and lock files.

### 2. Circular Dependencies

Module A depends on Module B, and Module B depends on Module A.

**Solution**: Refactor code structure or use dependency injection.

### 3. Missing Dependencies

Required packages not installed.

**Solution**: Maintain proper dependency files and documentation.

### 4. Version Conflicts

Different parts of code requiring different versions of the same library.

**Solution**: Use compatible version ranges and test thoroughly.

## Best Practices

### 1. Use Virtual Environments

```bash
# Python
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

### 2. Lock Dependency Versions

```python
# Generate lock file
pip freeze > requirements.txt

# Or use pipenv/poetry for automatic locking
pipenv lock
poetry lock
```

### 3. Minimize Dependencies

Only include necessary dependencies to reduce:

- Security vulnerabilities
- Build time
- Package size
- Maintenance burden

### 4. Regular Updates

Keep dependencies updated for:

- Security patches
- Bug fixes
- Performance improvements
- New features

### 5. Document Dependencies

Clearly document:

- What each dependency does
- Why it's needed
- Version constraints

## Dependency Injection Benefits

1. **Testability**: Easy to mock dependencies in tests
2. **Flexibility**: Easy to swap implementations
3. **Reusability**: Components become more reusable
4. **Maintainability**: Clearer code structure
5. **Loose Coupling**: Components less dependent on each other

## Example: Complete Dependency Setup

```python
# requirements.txt
flask==2.3.0
sqlalchemy==2.0.0
pytest==7.4.0

# app.py
from flask import Flask
from database import Database
from services.user_service import UserService

class Application:
    def __init__(self, database):
        self.db = database
        self.user_service = UserService(database)

    def run(self):
        # Application logic
        pass

# main.py
if __name__ == "__main__":
    # Create dependencies
    db = Database("postgresql://localhost/mydb")

    # Inject dependencies
    app = Application(db)
    app.run()
```

## Summary

Dependencies are essential parts of modern software development:

- **External packages** provide ready-made functionality
- **Proper management** prevents conflicts and issues
- **Dependency injection** improves code quality
- **Version control** ensures stability
- **Best practices** maintain healthy projects

Understanding dependencies helps build maintainable, scalable applications.

## Related Topics

- [[wiki:modules]] - Learn about code modules
- [[wiki:packages]] - Understanding packages
- [[wiki:version-control]] - Managing code versions
- [[question:01-dependency-basics]] - Practice dependency management
