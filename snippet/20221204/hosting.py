def callA(a, b):
    return callB(a, b)

def callB(a, b):
    return a - b

print(callA(3, 2))