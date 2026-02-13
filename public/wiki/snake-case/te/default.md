# snake_case Naming Convention

## What is snake_case?

snake*case ante programming lo naming style, words ni underscores (*) tho separate chesi, anni letters lowercase lo untayi. Idi names ni clear ga, easy ga read cheyadaniki help chestadi. For example, user_name laga rastharu, so "Jayadev " laga store cheyochu. Name snake laga kanipistadi, underscores valla words segments laga separate ayyi untayi. Python, Ruby lanti languages lo idi standard, code ni clean and consistent ga cheyadaniki use avtundi.

"snake_case tho names petu, life lo kuda style maintain chey!"

## Basic Rules

### 1. Use Underscores to Separate Words

snake*case lo words ni underscores (*) tho separate cheyali, spaces or hyphens vadakudadu.

```python
# Correct
first_name = "Jahnavi"
user_age = 25
is_valid = True

# Incorrect
firstname = "Jahnavi"      # Should be first_name
first-name = "Jahnavi"     # Should be first_name
firstName = "Jahnavi"      # Should be first_name
```

"Underscores tho words divide chey, mission laga clear ga undali !"

### 2. Use Lowercase Letters

snake_case lo anni letters lowercase lo undali, except constants which use UPPER_SNAKE_CASE.

```python
# Correct
user_name = "Arun"
email_address = "arun@example.com"
is_logged_in = True

# Incorrect
User_Name = "Arun"      # Should be user_name
USER_NAME = "Arun"      # Should be user_name (unless it's a constant)
```

"Lowercase tho names rasi, village laga simple ga undali !"

## Common Use Cases

### 1. Variable Names

```python
# Good examples
first_name = "Krishna"
last_name = "Mohan"
email_address = "krishna@example.com"
phone_number = "123-456-7890"
is_logged_in = True
has_permission = False
total_score = 100
average_rating = 4.5
```

"Variables ni snake_case lo petu, plan laga perfect ga execute chey !"

### 2. Function Names

```python
def get_user_info():
    pass

def calculate_total_price():
    pass

def is_valid_email(email):
    pass

def send_notification_message():
    pass
```

"Functions ni snake_case lo rasu, family laga sync lo undali !"

### 3. Method Names

```python
class User:
    def get_user_name(self):
        return self.name

    def set_user_name(self, name):
        self.name = name

    def is_valid_user(self):
        return self.age >= 18
```

"Methods ni snake_case lo petu, mission laga smooth ga run chey !"

## When to Use snake_case

### 1. Python Conventions

Python lo snake_case standard naming convention (PEP 8 guidelines).

```python
# Variables
user_name = "Jayadev"
is_active = True

# Functions
def get_user_info():
    pass

# Methods
def calculate_total():
    pass
```

"Python lo snake_case use chey, war laga code strong undali !"

### 2. Ruby Conventions

Ruby lo kuda snake_case common ga use avtundi for variables and methods.

```ruby
# Variables
user_name = "Jayadev"
is_active = true

# Methods
def get_user_info
end

def calculate_total
end
```

"Ruby lo snake_case petu, race laga fast and clear undali !"

### 3. Database Column Names

Database column names ki snake_case popular, because underscores clear ga columns ni separate chestayi.

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email_address VARCHAR(100),
    is_active BOOLEAN
);
```

"Database lo snake_case use chey, twist laga clear ga manage chey!"

## Comparison with Other Conventions

### snake_case vs camelCase

```python
# snake_case (Python, Ruby)
first_name = "John"
last_name = "Doe"
is_user_active = True

# camelCase (JavaScript, Java, C#)
firstName = "John"
lastName = "Doe"
isUserActive = True
```

"snake_case vs camelCase, action laga choose chey!"

### snake_case vs kebab-case

```python
# snake_case
user_name = "John"
email_address = "john@example.com"

# kebab-case (URLs, CSS classes)
user-name = "John"  # Not valid Python
email-address = "john@example.com"  # Not valid Python
```

"snake_case tho code chey, Rocky laga solid ga undali !"

## Special Cases

### 1. Constants (UPPER_SNAKE_CASE)

Constants ni UPPER_SNAKE_CASE lo rastharu, anni letters uppercase lo, underscores tho separate chestharu.

```python
# Constants
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30
API_BASE_URL = "https://api.example.com"
PI = 3.14159
```

"Constants ni UPPER_SNAKE_CASE lo petu, beat laga fixed ga undali !"

### 2. Class Names (PascalCase)

Class names ki snake_case vaddu, PascalCase use chestham.

```python
# Correct
class UserInfo:
    pass

class DatabaseConnection:
    pass

# Incorrect
class user_info:  # Should be UserInfo
    pass
```

"Classes ki PascalCase use chey, village laga unique ga undali !"

### 3. Module Names

Module names kuda snake_case lo rastharu.

```python
# File: user_management.py
class UserManager:
    pass

# File: database_connection.py
class DatabaseConnection:
    pass
```

"Modules ni snake_case lo rasu, game laga organized undali !"

## Best Practices

### 1. Be Descriptive

```python
# Good
user_first_name = "Tarun"
total_item_count = 10
is_email_valid = True

# Avoid
fn = "Tarun"           # Too short
cnt = 10              # Abbreviation
valid = True          # Too vague
```

### 2. Be Consistent

```python
# Consistent snake_case
user_name = "Sowjanya"
user_age = 25
user_email = "sowjanya@example.com"
is_user_active = True

# Inconsistent (don't mix conventions)
userName = "Sowjanya"     # camelCase
user_age = 25         # snake_case
userEmail = "sowjanya@example.com"  # camelCase
```

"Consistency maintain chey, fly laga flow lo undali!"

### 3. Handle Acronyms

```python
# Good
user_id = "12345"
api_url = "https://api.example.com"
http_request = "GET"

# Also acceptable
userID = "12345"      # But not recommended in Python
apiURL = "https://api.example.com"
httpREQUEST = "GET"
```

"Acronyms ni clear ga petu, thaggedhe ledu !"

## Common Mistakes to Avoid

### 1. Using Spaces

```python
# Wrong
first name = "Jahnavi"
user name = "jahnavi"

# Correct
first_name = "Jahnavi"
user_name = "jahnavi"
```

"Spaces vaddu, code lo kuda discipline undali!"

### 2. Using Hyphens

```python
# Wrong
first-name = "Sandeep"
user-name = "sandeep"

# Correct
first_name = "Sandeep"
user_name = "sandeep"
```

"Hyphens vaddu, system laga rules follow chey!"

### 3. Inconsistent Underscores

```python
# Wrong
first_name = "Satya"
lastname = "Jahnavi"      # Should be last_name
full_name = "Satya Jahnavi"
emailaddress = "satya@example.com"  # Should be email_address

# Correct
first_name = "Satya"
last_name = "Jahnavi"
full_name = "Satya Jahnavi"
email_address = "satya@example.com"
```

"Underscores consistent ga petu, village laga code clean undali !"

## Language-Specific Guidelines

### Python (PEP 8)

```python
# Variables and functions
user_name = "John"
is_user_active = True

def get_user_info():
    return {"name": user_name, "active": is_user_active}

# Classes (use PascalCase)
class UserInfo:
    def __init__(self, name):
        self.user_name = name
```

"PEP 8 follow chey, mission laga code perfect undali !"

### Ruby

```ruby
# Variables and methods
user_name = "John"
is_user_active = true

def get_user_info
  { name: user_name, active: is_user_active }
end

# Classes (use PascalCase)
class UserInfo
  def initialize(name)
    @user_name = name
  end
end
```

"Ruby lo snake_case rasu, race lo kuda style undali !"

### PHP

```php
// Variables and functions
$user_name = "Arun";
$is_user_active = true;

function get_user_info() {
    return ["name" => $user_name, "active" => $is_user_active];
}

// Classes (use PascalCase)
class UserInfo {
    private $user_name;

    public function __construct($name) {
        $this->user_name = $name;
    }
}
```

"PHP lo snake_case use chey, action laga code fast undali !"

## Related Concepts

- [[wiki:camelcase]] - Alternative naming convention
- [[wiki:conventions]] - Programming conventions and standards
- [[wiki:variable]] - Variable naming and usage
- [[wiki:functions]] - Function naming conventions
