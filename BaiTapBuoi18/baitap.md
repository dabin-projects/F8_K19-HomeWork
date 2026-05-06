# Bài 1

<!-- const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = { ...student }

mentor.name = 'bang'
mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor) -->

# GIẢI THÍCH:

mentor.name = 'bang'
mentor.parent.name = 'bo bang'

## 1. KẾT QUẢ

student.name → không đổi ('hoang')
student.parent.name → bị đổi thành 'bo bang'

## 2. PHÂN TÍCH

Dòng "const mentor = { ...student }" -> shallow copy
name là kiểu nguyên thủy → copy giá trị → không liên quan nhau
parent là object → copy reference → dùng chung vùng nhớ

Vì vậy:
Khi sửa mentor.parent.name thì thực chất đang sửa cùng object với student.

# Bài 2

<!-- const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = JSON.parse(JSON.stringify(student))

mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor) -->

Đề bài có:
const mentor = JSON.parse(JSON.stringify(student))

mentor.parent.name = 'bo bang'

## Kết quả

student.parent.name → không bị ảnh hưởng

## Giải thích

Cách này tạo deep copy
Toàn bộ object được tạo mới, không còn reference chung

# Bài 3

<!-- const students = [
  { name: 'a' },
  { name: 'b' }
]

const newStudents = [...students]

newStudents[0].name = 'z'

console.log(students)
console.log(newStudents) -->

## Kết quả

Mảng students → không đổi (vẫn là mảng cũ)
Phần tử bên trong → bị đổi (students[0].name thành 'z')

## Giải thích

Spread với array cũng là shallow copy
Tạo mảng mới nhưng các phần tử vẫn là object cũ

Vì vậy, khi sửa object bên trong → ảnh hưởng cả hai mảng

# Bài 4

<!-- const user = {
  name: 'hoang',
  address: {
    city: 'HN',
    location: {
      lat: 123
    }
  }
}

const newUser = { ...user }

newUser.address.location.lat = 999

console.log(user.address.location.lat) -->

## Kết quả

console.log(user.address.location.lat) -> In ra: 999

## Giải thích

Object này có nhiều cấp: user > address > location > lat
Spread chỉ copy cấp đầu (lớp ngoài)
Còn bên trong thì

- address vẫn dùng chung
- location cũng dùng chung

Do đó khi sửa sâu bên trong (lat) thì user cũng bị ảnh hưởng
