def solve():
    # Read input values
    name = input().strip()
    age = int(input())
    height = float(input())
    language = input().strip()

    # Process values
    birth_year = 2024 - age
    height_cm = height * 100

    # Display formatted output
    print(f"Name (uppercase): {name.upper()}")
    print(f"Age: {age} years")
    print(f"Birth Year: {birth_year}")
    print(f"Height: {height}m ({height_cm}cm)")
    print(f"Favorite Language: {language}")
    print(f"Profile: {name}, {age} years old, {height}m tall, loves {language}")


if __name__ == "__main__":
    solve()
