
def spaceinto(a):
    firsthalf = ''
    secondjalf = ''

    index = 0
    for i in a:
        if i == ' ':
            firsthalf = a[:index]
            secondjalf = a[index + 1:]
            firsthalf += "%20"
            a = firsthalf + secondjalf
            print(a)
            index += 3
        else:
            index += 1
    return a
