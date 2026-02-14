def solve():
    PI = 3.14159
    radius_input = input().strip()
    radius = float(radius_input)
    
    circumference = 2 * PI * radius
    area = PI * radius * radius

    print("Radius:", radius_input)
    print("PI constant:", f"{PI:.5f}")
    print("Circumference:", f"{circumference:.4f}")
    print("Area:", f"{area:.5f}")


if __name__ == "__main__":
    solve()
