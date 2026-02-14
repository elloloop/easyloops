def solve():
    score = int(input())

    # Print the score
    print(f"Score: {score}")

    # Determine grade and performance
    if score >= 90:
        grade = "A"
        performance = "Excellent"
    elif score >= 80:
        grade = "B"
        performance = "Good"
    elif score >= 70:
        grade = "C"
        performance = "Average"
    elif score >= 60:
        grade = "D"
        performance = "Poor"
    else:
        grade = "F"
        performance = "Fail"

    print(f"Grade: {grade}")
    print(f"Performance: {performance}")

    # Determine pass or fail
    if score >= 60:
        status = "Pass"
    else:
        status = "Fail"

    print(f"Status: {status}")


if __name__ == "__main__":
    solve()
