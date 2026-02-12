# Dependencies in Python: Mana Code Ki "Support System"

## Dependency Ante Enti?

Dependency ante external code (library, package, module) mana Python program ki kavalsindi. Everything scratch nundi raayadam badulu, already unna tested solutions use chestham.

**"Team work makes dream work!"** – Dependencies tho mana code powerful ga untundi, **Avengers** lanti team strength!

---

## Installing Dependencies

### Using pip

```bash
# Single package install
pip install requests

# Specific version install
pip install requests==2.28.0

# Requirements file nundi install
pip install -r requirements.txt

# Package upgrade
pip install --upgrade requests
```

**"Ready-made weapons use chey!"** – pip tho dependencies quickly install cheyochu, **Baahubali** ki weapons laga!

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
# All installed packages save
pip freeze > requirements.txt

# File nundi install
pip install -r requirements.txt
```

**"List clear ga undali!"** – requirements.txt tho project dependencies track cheyochu.

## Virtual Environments

### Why Use?

- Project dependencies isolate cheyyadam
- Version conflicts avoid cheyyadam
- System Python clean ga undadam
- Project reproduction easy

### Creating Virtual Environment

```bash
# Virtual environment create
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Deactivate
deactivate
```

**"Separate territory, separate rules!"** – Virtual environment tho each project ki own space, **KGF** territory laga!

## Importing Dependencies

```python
# Entire module import
import requests
response = requests.get('https://api.example.com')

# Specific function import
from math import sqrt
result = sqrt(16)

# Alias tho import
import pandas as pd
df = pd.DataFrame()

# Multiple items import
from datetime import datetime, timedelta
```

**"Right tool for right job!"** – Import statements tho correct dependencies use chestham.

## Dependency Injection

### Without Dependency Injection

```python
class EmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"  # Hard-coded

    def send_email(self, to, message):
        pass

# Test cheyyadam kastam, inflexible
service = EmailService()
```

**"Rigid plan fail avtundi!"** – Hard-coded dependencies tho flexibility ledu.

### With Dependency Injection

```python
class EmailService:
    def __init__(self, smtp_server, port=587):
        self.smtp_server = smtp_server  # Injected
        self.port = port

    def send_email(self, to, message):
        pass

# Flexible and testable
service = EmailService("smtp.gmail.com")
test_service = EmailService("localhost", 2525)  # Testing kosam
```

**"Flexible plan success guarantee!"** – Dependency injection tho testing easy, flexibility untundi, **Srimanthudu** planning laga!

## Common Python Dependencies

### Web Development

```python
flask==2.3.0        # Web framework
django==4.2.0       # Full-stack framework
requests==2.28.0    # HTTP client
```

### Data Science

```python
numpy==1.24.0       # Numerical computing
pandas==1.5.0       # Data manipulation
matplotlib==3.7.0   # Plotting
```

### Testing

```python
pytest==7.4.0       # Testing framework
coverage==7.2.0     # Code coverage
```

## Dependency Injection Example

```python
# database.py
class Database:
    def __init__(self, connection_string):
        self.connection_string = connection_string

    def query(self, sql):
        return []

# user_service.py
class UserService:
    def __init__(self, database):
        self.db = database  # Dependency injected

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id={user_id}")

# main.py
# Dependencies create
db = Database("postgresql://localhost/myapp")

# Service lo inject
user_service = UserService(db)

# Service use
user = user_service.get_user(123)
```

**"Proper setup, smooth execution!"** – Dependency injection tho code organized ga untundi.

## Testing with Dependency Injection

```python
# test_user_service.py
class MockDatabase:
    def query(self, sql):
        # Fake data for testing
        return [{"id": 123, "name": "Test User"}]

def test_get_user():
    # Mock database use chesi test
    mock_db = MockDatabase()
    service = UserService(mock_db)

    user = service.get_user(123)
    assert user[0]["name"] == "Test User"
```

**"Practice lo perfect!"** – Mock dependencies tho testing easy, **Jersey** practice laga!

## Common Issues & Solutions

### Issue 1: Module Not Found

```python
# Error
ModuleNotFoundError: No module named 'requests'

# Solution
pip install requests
```

**"Weapon lekunte fight cheyalemu!"** – Dependencies install cheyali.

### Issue 2: Version Conflict

```python
# Error: Package A needs lib==1.0, Package B needs lib==2.0

# Solution
pip install "lib>=1.0,<3.0"
```

**"Balance important!"** – Compatible versions find cheyali.

### Issue 3: Outdated Dependencies

```bash
# Outdated packages check
pip list --outdated

# Specific package update
pip install --upgrade requests
```

**"Update lo power!"** – Regular updates tho security and performance improve.

## Best Practices

### 1. Always Virtual Environments

```bash
# Each project ki create
python -m venv venv
```

**"Own space, own rules!"** – Virtual environment tho conflicts avoid.

### 2. Pin Versions in Production

```python
# Good for production
flask==2.3.0
sqlalchemy==2.0.15

# Avoid
flask  # Version specify cheyaledu
```

**"Clarity is power!"** – Exact versions tho stability untundi.

### 3. Use Dependency Injection

```python
# Testing easy
class Service:
    def __init__(self, dependency):
        self.dep = dependency
```

**"Flexibility = Success!"** – Dependency injection tho code strong, **Pushpa** lanti smart planning!

### 4. Document Dependencies

```python
# requirements.txt with comments
requests==2.28.0    # HTTP client for API calls
pandas==1.5.0       # Data processing
flask==2.3.0        # Web framework
```

**"Documentation saves time!"** – Comments tho clarity untundi.

## Summary

Python dependencies help you:

- **Reuse code** reinventing the wheel avoid
- **Save time** tested libraries tho
- **Build faster** powerful tools tho
- **Collaborate** standard packages tho

Proper dependency management ensures:

- Reproducible builds
- Stable applications
- Easy collaboration
- Smooth deployments

**"Right dependencies = Strong foundation!"** – Dependencies tho mana code foundation strong, **RRR** lanti massive success kosam ready!

## Related Topics

- [[wiki:modules]] - Python modules and imports
- [[wiki:pip]] - Package installer
- [[wiki:virtual-environments]] - Project isolation
- [[question:01-python-dependencies]] - Practice dependency management
