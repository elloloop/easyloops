def solve():
    a = int(input())
    b = int(input())

    print(f"{a} == {b}: {str(a == b).lower()}")
    print(f"{a} != {b}: {str(a != b).lower()}")
    print(f"{a} < {b}: {str(a < b).lower()}")
    print(f"{a} <= {b}: {str(a <= b).lower()}")
    print(f"{a} > {b}: {str(a > b).lower()}")
    print(f"{a} >= {b}: {str(a >= b).lower()}")
if __name__ == "__main__":
    solve()