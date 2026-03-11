# Câu hỏi phân tích

## Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?

Selector có độ ưu tiên cao nhất trong CSS là inline style.

Thứ tự độ ưu tiên của CSS từ cao xuống thấp:

- Inline style (style="")

- ID selector (#id)

- Class selector (.class)

- Tag selector (h1, p, div,...)

## Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?

Selector #main sẽ thắng.

Độ ưu tiên:

#main > .title > h1

ID selector có độ ưu tiên cao hơn class và tag, vì vậy màu được định nghĩa trong #main sẽ được áp dụng cuối cùng.

## Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?

Inline style sẽ thắng tất cả các selector khác.
-> màu hiển thị cuối là pink.

## Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?

- theme.css có thể override base.css vì file CSS được load sau sẽ ghi đè file load trước khi specificity bằng nhau.
  Trong project:

<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/theme.css">

=> theme.css nằm sau nên được áp dụng sau.

- Điều kiện để override thành công:

          Selector trong theme.css có specificity cao hơn, hoặc

          Selector có specificity bằng nhau nhưng được khai báo sau.

## Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao.

Cả hai phần tử đều có .title, nhưng nếu trong đó, 1 phần tử có thêm id="main". > thì màu của phần tử đó sẽ hiển thị theo màu của id #main (vì ID selector có mức độ ưu tiên cao hơn class)

## Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.

Phần tử có CSS phức tạp nhất trong project là:

<h2 class="title" id="special" style="color: black">
Danh sach don hang
</h2>

Các selector tác động:

- h2 (tag selector)

- .title (class selector)

- #special (id selector)

- style="color:black" (inline style)

So sánh độ ưu tiên:

inline > #special > .title > h2

Selector thắng cuối cùng là inline style.

Kết quả hiển thị cuối cùng: màu black.
