def solve():
    integer_val = int(input())
    string_val = input().strip()
    boolean_input = input().strip()
    float_val = float(input())
    char_val = input().strip()
    new_integer_val = int(input())
    late_init_input = input().strip()

    # Correct boolean handling
    boolean_val = "true" if boolean_input == "true" else "false"
    
    print(f"Integer variable: {integer_val}")
    print(f"String variable: {string_val}")
    print(f"Boolean variable: {boolean_val}")
    print(f"Float variable: {float_val}")
    print(f"Character variable: {char_val}")

    integer_val = new_integer_val
    print(f"Updated integer variable: {integer_val}")

    late_initialized_var = None
    late_initialized_var = late_init_input
    print(f"Late-initialized variable: {late_initialized_var}")


if __name__ == "__main__":
    solve()
