// Bài 1
function findSecondLargest(arr) {
  let max = -Infinity;
  let secondMax = -Infinity;

  for (let num of arr) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax && num < max) {
      secondMax = num;
    }
  }

  return secondMax;
}

const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
console.log(findSecondLargest(numbers)); // 8



// Bài 2

const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

// Step 1: Gộp mảng
const merged = [...classA, ...classB];

// Step 2: Lọc trùng
const unique = [...new Set(merged)];

// Step 3: Sắp xếp bằng QuickSort
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const midIndex = Math.floor(arr.length / 2);
  const pivot = arr[midIndex];

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === midIndex) continue;

    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const result = quickSort(unique);

console.log(result);

