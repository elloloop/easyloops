# Dependencies in Python

## What is a Dependency?

A dependency is external code (library, package, module) that your Python program needs to function. Instead of writing everything from scratch, you use existing, tested solutions.

## Installing Dependencies

### Using pip

```bash
# Install a single package
pip install requests

# Install specific version
pip install requests==2.28.0

# Install from requirements file
pip install -r requirements.txt

# Upgrade a package
pip install --upgrade requests

# Uninstall a package
pip uninstall requests
```

## Managing Dependencies

### requirements.txt

```python
# requirements.txt - production dependencies
flask==2.3.0
sqlalchemy>=2.0.0
requests~=2.28.0
pandas>=1.5.0,<2.0.0
```

### Creating requirements.txt

```bash
# Save all installed packages
pip freeze > requirements.txt

# Install from file
pip install -r requirements.txt
```

## Virtual Environments

### Why Use Virtual Environments?

- Isolate project dependencies
- Avoid version conflicts
- Maintain clean system Python
- Easy project reproduction

### Creating Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Deactivate
deactivate
```

## Importing Dependencies

### Basic Import

```python
# Import entire module
import requests
response = requests.get('https://api.example.com')

# Import specific function
from math import sqrt
result = sqrt(16)

# Import with alias
import pandas as pd
df = pd.DataFrame()

# Import multiple items
from datetime import datetime, timedelta
```

## Dependency Injection

### Without Dependency Injection

```python
class EmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"  # Hard-coded
        self.port = 587

    def send_email(self, to, message):
        # Send email logic
        pass

# Hard to test, inflexible
service = EmailService()
```

### With Dependency Injection

```python
class EmailService:
    def __init__(self, smtp_server, port=587):
        self.smtp_server = smtp_server  # Injected
        self.port = port

    def send_email(self, to, message):
        # Send email logic
        pass

# Flexible and testable
service = EmailService("smtp.gmail.com")
test_service = EmailService("localhost", 2525)  # For testing
```

## Common Python Dependencies

### Web Development

```python
flask==2.3.0        # Web framework
django==4.2.0       # Full-stack framework
fastapi==0.100.0    # Modern API framework
requests==2.28.0    # HTTP client
```

### Data Science

```python
numpy==1.24.0       # Numerical computing
pandas==1.5.0       # Data manipulation
matplotlib==3.7.0   # Plotting
scikit-learn==1.2.0 # Machine learning
```

### Testing

```python
pytest==7.4.0       # Testing framework
unittest-mock       # Mocking library
coverage==7.2.0     # Code coverage
```

## Version Specifiers

```python
# Exact version
package==1.2.3

# Minimum version
package>=1.2.3

# Compatible release (1.2.x)
package~=1.2.3

# Range
package>=1.2.0,<2.0.0

# Latest version (not recommended for production)
package
```

## Dependency Injection Example

```python
# database.py
class Database:
    def __init__(self, connection_string):
        self.connection_string = connection_string

    def query(self, sql):
        # Execute query
        return []

# user_service.py
class UserService:
    def __init__(self, database):
        self.db = database  # Dependency injected

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")

    def create_user(self, name, email):
        return self.db.query(f"INSERT INTO users VALUES ('{name}', '{email}')")

# main.py
# Create dependencies
db = Database("postgresql://localhost/myapp")

# Inject into service
user_service = UserService(db)

# Use service
user = user_service.get_user(123)
```

## Testing with Dependency Injection

```python
# test_user_service.py
class MockDatabase:
    def query(self, sql):
        # Return fake data for testing
        return [{"id": 123, "name": "Test User"}]

def test_get_user():
    # Use mock database for testing
    mock_db = MockDatabase()
    service = UserService(mock_db)

    user = service.get_user(123)
    assert user[0]["name"] == "Test User"
```

## Common Issues & Solutions

### Issue 1: Module Not Found

```python
# Error
ModuleNotFoundError: No module named 'requests'

# Solution
pip install requests
```

### Issue 2: Version Conflict

```python
# Error: Package A needs lib==1.0, Package B needs lib==2.0

# Solution: Use virtual environment and compatible versions
pip install "lib>=1.0,<3.0"
```

### Issue 3: Outdated Dependencies

```bash
# Check outdated packages
pip list --outdated

# Update specific package
pip install --upgrade requests

# Update all packages (use with caution)
pip install --upgrade -r requirements.txt
```

## Best Practices

### 1. Always Use Virtual Environments

```bash
# Create for each project
python -m venv venv
```

### 2. Pin Versions in Production

```python
# Good for production
flask==2.3.0
sqlalchemy==2.0.15

# Avoid in production
flask  # No version specified
sqlalchemy>=2.0.0  # Too loose
```

### 3. Separate Dev Dependencies

```python
# requirements.txt (production)
flask==2.3.0
sqlalchemy==2.0.15

# requirements-dev.txt (development)
-r requirements.txt
pytest==7.4.0
black==23.0.0
flake8==6.0.0
```

### 4. Use Dependency Injection

```python
# Makes testing easy
class Service:
    def __init__(self, dependency):
        self.dep = dependency
```

### 5. Document Why Dependencies Exist

```python
# requirements.txt with comments
requests==2.28.0    # HTTP client for API calls
pandas==1.5.0       # Data processing in analytics module
flask==2.3.0        # Web framework for REST API
```

## Advanced: Using poetry

```bash
# Install poetry
pip install poetry

# Create new project
poetry new myproject

# Add dependency
poetry add requests

# Add dev dependency
poetry add --dev pytest

# Install dependencies
poetry install

# Run in virtual environment
poetry run python app.py
```

## Summary

Python dependencies help you:

- **Reuse code** instead of reinventing the wheel
- **Save time** with tested, maintained libraries
- **Build faster** with powerful tools
- **Collaborate** using standard packages

Proper dependency management ensures:

- Reproducible builds
- Stable applications
- Easy collaboration
- Smooth deployments

## Related Topics

- [[wiki:modules]] - Python modules and imports
- [[wiki:pip]] - Package installer for Python
- [[wiki:virtual-environments]] - Isolation for projects
- [[question:01-python-dependencies]] - Practice dependency management
