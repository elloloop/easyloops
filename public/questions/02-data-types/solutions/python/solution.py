def solve():
    int_num=int(input())
    float_num=float(input())
    string_str = input().strip()
    print(f"Integer: {int_num}")
    print(f"Integer to float: {float(int_num)}")
    print(f"Float: {float_num}")
    print(f"Float to integer: {int(float_num)}")
    print(f"String: {string_str}")
    print(f"String to integer: {int(string_str)}")


if __name__ == "__main__":
    solve()