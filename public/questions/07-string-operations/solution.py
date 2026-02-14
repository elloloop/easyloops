def solve():
    str1 = input().strip()
    str2 = input().strip()
    index = int(input())

    print(f"Concatenation: {str1} + {str2} = {str1 + str2}")
    print(f"Length of first string: {len(str1)}")
    print(f"Length of second string: {len(str2)}")
    print(f"Uppercase: {str1.upper()}")
    print(f"Lowercase: {str2.lower()}")
    print(f"Substring from index {index}: {str1[index:]}")

if __name__ == "__main__":
    solve()
