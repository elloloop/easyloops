def solve():
    n = int(input())   # read the number
    
    if n <= MAX:
        print("Within limit")
    else:
        print("Exceeds limit")


if __name__ == "__main__":
    MAX = 100  
    solve()
