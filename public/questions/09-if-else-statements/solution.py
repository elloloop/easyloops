def solve():
    num = int(input())

    # Print the number
    print(f"Number: {num}")

    # Determine sign
    if num > 0:
        sign = "positive"
    elif num < 0:
        sign = "negative"
    else:
        sign = "zero"

    print(f"Sign: {sign}")

    # Determine parity
    if num % 2 == 0:
        parity = "even"
    else:
        parity = "odd"

    print(f"Parity: {parity}")

    # Final classification
    print(f"Classification: {sign} {parity} number")


if __name__ == "__main__":
    solve()
