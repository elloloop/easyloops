# camelCase Naming Convention

## What is camelCase?

camelCase ante programming lo naming style, words ni spaces or underscores vadakunda combine chesi, first word lowercase lo, next words capital letter tho start avtayi. Idi names ni clear ga, easy ga read cheyadaniki help chestadi. For example, userName laga rastharu, so "Jayadev" laga store cheyochu. Name camel laga kanipistadi, capital letters valla humps laga form avtayi.

"camelCase tho names petu, style tho code ni rock chey!"

## Basic Rules

### 1. Start with Lowercase

First word aina lowercase lo start avvali.

```python
# Correct
firstName = "Krishna"
userAge = 28
isValid = True

# Incorrect
FirstName = "Krishna"  # Should be firstName
UserAge = 28        # Should be userAge
```

"Lowercase tho start chey, race laga speed ga undali!"

### 2. Capitalize Subsequent Words

Next words aina capital letter tho start avvali.

```python
# Correct
firstName = "Krishna"
lastName = "Mohan"
fullName = "Krishna Mohan"
isUserActive = True
hasValidEmail = True

# Incorrect
firstname = "Krishna"      # Should be firstName
lastname = "Mohan"        # Should be lastName
fullname = "Krishna Mohan"   # Should be fullName
```

## Common Use Cases

### 1. Variable Names

```python
# Good examples
userName = "Krishna"
emailAddress = "krishna@example.com"
phoneNumber = "123-456-7890"
isLoggedIn = True
hasPermission = False
totalScore = 100
averageRating = 4.5
```

### 2. Function Names

```python
def getUserInfo():
    pass

def calculateTotalPrice():
    pass

def isValidEmail(email):
    pass

def sendNotificationMessage():
    pass
```

"Functions ni camelCase lo rasu, team laga sync lo undali!"

### 3. Method Names

```python
class User:
    def getUserName(self):
        return self.name

    def setUserName(self, name):
        self.name = name

    def isValidUser(self):
        return self.age >= 18
```

"Methods ni camelCase lo petu, mission laga smooth ga run chey!"

## When to Use camelCase

### 1. Variables and Functions

- Local variables
- Function parameters
- Function names
- Method names

"Variables and functions ki camelCase use chey, flow laga smooth undali!"

### 2. Object-Oriented Programming

- Method names
- Property names
- Instance variables

"OOP lo camelCase use chey, structure laga strong undali!"

### 3. JavaScript/Java/C# Conventions

```javascript
// JavaScript
let userName = 'John';
let isUserActive = true;

function getUserInfo() {
  return { name: userName, active: isUserActive };
}
```

```java
// Java
String userName = "John";
boolean isUserActive = true;

public String getUserName() {
    return userName;
}
```

"JavaScript, Java, C# lo camelCase petu, race laga fast and clear undali!"

## Comparison with Other Conventions

### camelCase vs snake_case

```python
# camelCase (common in JavaScript, Java, C#)
firstName = "John"
lastName = "Doe"
isUserActive = True

# snake_case (common in Python, Ruby)
first_name = "John"
last_name = "Doe"
is_user_active = True
```

"camelCase vs snake_case, action laga choose chey!"

### camelCase vs PascalCase

```python
# camelCase (variables, functions)
userName = "John"
getUserInfo = lambda: "info"

# PascalCase (classes, types)
class UserInfo:
    pass

class DatabaseConnection:
    pass
```

"camelCase for variables, PascalCase for classes, game laga organized undali!"

## Best Practices

### 1. Be Descriptive

```python
# Good
userFirstName = "Tarun"
totalItemCount = 10
isEmailValid = True

# Avoid
fn = "Tarun"           # Too short
cnt = 10              # Abbreviation
valid = True          # Too vague
```

"Descriptive names use chey, story laga clear ga undali!"

### 2. Be Consistent

```python
#  Consistent camelCase
userName = "Sowjanya"
userAge = 25
userEmail = "sowjanya@example.com"
isUserActive = true

#  Inconsistent (don't mix conventions)
user_name = "Sowjanya"     // snake_case
userAge = 25              // camelCase
user_email = "sowjanya@example.com"  // snake_case
```

"Consistency maintain chey, fly laga flow lo undali!"

### 3. Handle Acronyms

```python
# Good
userId = "12345"
userURL = "https://example.com"
apiKey = "abc123"
httpRequest = "GET"

# Also acceptable
userID = "12345"
userUrl = "https://example.com"
apiKEY = "abc123"
httpREQUEST = "GET"
```

"Acronyms ni clear ga petu, thaggedhe ledu!"

## Common Mistakes to Avoid

### 1. Starting with Uppercase

```python
# Wrong
FirstName = "Jahnavi"
UserName = "Jahnavi"
IsValid = True

# Correct
firstName = "Jahnavi"
userName = "Jahnavi"
isValid = True
```

### 2. Using Spaces or Underscores

```python
# Wrong
first name = "Jahnavi"
first_name = "Jahnavi"
user name = "jahnavi"

# Correct
firstName = "Jahnavi"
userName = "jahnavi"
```

"Spaces or underscores vaddu, camel laga clean ga undali!"

### 3. Inconsistent Capitalization

```python
#  Wrong
firstName = "Satya"
lastname = "Jahnavi"      // Should be lastName
fullName = "Satya Jahnavi"
emailaddress = "satya@example.com"  // Should be emailAddress

#  Correct
firstName = "Satya"
lastName = "Jahnavi"
fullName = "Satya Jahnavi"
emailAddress = "satya@example.com"
```

"Capitalization consistent ga petu, code laga neat ga undali!"

## Language-Specific Guidelines

### JavaScript

```javascript
// Variables and functions
let userName = 'Arun';
let isUserActive = true;

function getUserInfo() {
  return { name: userName, active: isUserActive };
}

// Classes (use PascalCase)
class UserInfo {
  constructor(name) {
    this.userName = name;
  }
}
```

### Java

```java
// Variables and methods
String userName = "Arun";
boolean isUserActive = true;

public String getUserName() {
    return userName;
}

// Classes (use PascalCase)
public class UserInfo {
    private String userName;
}
```

"Java lo camelCase petu, system laga strong undali!"

### C#

```csharp
// Variables and methods
string userName = "Jayadev";
bool isUserActive = true;

public string GetUserName() {
    return userName;
}

// Classes (use PascalCase)
public class UserInfo {
    private string userName;
}
```

"C# lo camelCase use chey, mission laga perfect undali!"

## Related Concepts

- [[wiki:snake-case]] - Alternative naming convention
- [[wiki:conventions]] - Programming conventions and standards
- [[wiki:variable]] - Variable naming and usage
- [[wiki:functions]] - Function naming conventions
