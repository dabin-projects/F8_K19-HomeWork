const employees = [
    { id: 1, name: 'Alice', age: 23, status: 'working' },
    { id: 3, name: 'Bob', age: 25, status: 'working' },
    { id: 6, name: 'John', age: 27, status: 'working' },
    { id: 8, name: 'David', age: 23, status: 'quit_job' },
    { id: 10, name: 'Eve', age: 20, status: 'working' },
];

const products = [
    { id: 1, name: 'Phone', price: 1200 },
    { id: 2, name: 'Laptop', price: 3000 },
    { id: 3, name: 'Tab', price: 2000 },
    { id: 4, name: 'PC', price: 800 },
    { id: 5, name: 'Monitor', price: 1500 },
];

const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 3 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

// Create a map from productId -> product
function createProductMap(products) {
    const map = new Map();
    for (let p of products) {
        map.set(p.id, p);
    }
    return map;
}

// Create a map from employeeId -> employee
function createEmployeeMap(employees) {
    const map = new Map();
    for (let e of employees) {
        map.set(e.id, e);
    }
    return map;
}
// Create max function
function getBestSellingProduct(orders) {
    const quantityMap = {};
    let maxProductId = null;
    let maxQty = 0;

    for (let o of orders) {
        if (!quantityMap[o.productId]) quantityMap[o.productId] = 0;
        quantityMap[o.productId] += o.quantity;

        // update max
        if (quantityMap[o.productId] > maxQty) {
            maxQty = quantityMap[o.productId];
            maxProductId = o.productId;
        }
    }

    return { productId: maxProductId, quantity: maxQty };
}

// ------ Exercise 1: Find working employee -----------

function getWorkingEmployees(employees) {
    return employees.filter((e) => e.status === 'working');
}

// console.log(getWorkingEmployees(employees));

// -------- Exercise 2: Get Oldest Employee ----------
function getOldestEmployee(employees) {
    let oldest = employees[0];
    for (let e of employees) {
        if (e.age > oldest.age) {
            oldest = e;
        }
    }
    return oldest;
}

// console.log(getOldestEmployee(employees));

// -------- Exercise 3: Get Cheapest Product ----------
function getCheapestProduct(products) {
    let cheapest = products[0];
    for (let p of products) {
        if (p.price < cheapest.price) {
            cheapest = p;
        }
    }
    return cheapest;
}
// console.log(getCheapestProduct(products))

// -------- Exercise 4: Get Best selling Product ----------
function getBestSellingProduct(orders) {
    const quantityMap = {};
    let maxProductId = null;
    let maxQty = 0;

    for (let o of orders) {
        if (!quantityMap[o.productId]) quantityMap[o.productId] = 0;
        quantityMap[o.productId] += o.quantity;

        if (quantityMap[o.productId] > maxQty) {
            maxQty = quantityMap[o.productId];
            maxProductId = o.productId;
        }
    }

    return { productId: maxProductId, quantity: maxQty };
}

// console.log(getBestSellingProduct(orders));

// -------- Exercise 5: Get Top Revenue Product ----------

function getTopRevenueProduct(products, orders) {
    const productMap = createProductMap(products);
    const revenueMap = {};
    let maxProductId = null;
    let maxRevenue = 0;

    for (let o of orders) {
        const revenue = productMap.get(o.productId).price * o.quantity;
        if (!revenueMap[o.productId]) revenueMap[o.productId] = 0;
        revenueMap[o.productId] += revenue;

        if (revenueMap[o.productId] > maxRevenue) {
            maxRevenue = revenueMap[o.productId];
            maxProductId = o.productId;
        }
    }

    return { productId: maxProductId, revenue: maxRevenue };
}

// console.log(getTopRevenueProduct(products, orders));

// -------- Exercise 6: Get Top Seller By Quantity ----------

function getTopSellerByQuantity(orders) {
    const quantityMap = {};
    let topEmployeeId = null;
    let maxQty = 0;

    for (let o of orders) {
        if (!quantityMap[o.employeeId]) {
            quantityMap[o.employeeId] = 0;
        }
        quantityMap[o.employeeId] += o.quantity;

        if (quantityMap[o.employeeId] > maxQty) {
            maxQty = quantityMap[o.employeeId];
            topEmployeeId = o.employeeId;
        }
    }
    return { employeeId: topEmployeeId, quantity: maxQty };
}

// console.log(getTopSellerByQuantity(orders));

// -------- Exercise 7: Get Top Seller By Revenue ----------

function getTopSellerByRevenue(products, orders) {
    const productMap = createProductMap(products);
    const revenueMap = {};
    let topEmployeeId = null;
    let maxRevenue = 0;

    for (let o of orders) {
        const revenue = productMap.get(o.productId).price * o.quantity;

        if (!revenueMap[o.employeeId]) {
            revenueMap[o.employeeId] = 0;
        }
        revenueMap[o.employeeId] += revenue;

        if (revenueMap[o.employeeId] > maxRevenue) {
            maxRevenue = revenueMap[o.employeeId];
            topEmployeeId = o.employeeId;
        }
    }

    return { employeeId: topEmployeeId, revenue: maxRevenue };
}
// console.log (getTopSellerByRevenue(products, orders))

// -------- Exercise 8: Get Top Product Per Employee ----------

function getTopProductPerEmployee(products, orders) {
    const productMap = createProductMap(products);
    const result = {};

    for (let o of orders) {
        const revenue = productMap.get(o.productId).price * o.quantity;

        if (!result[o.employeeId]) {
            result[o.employeeId] = {};
        }

        if (!result[o.employeeId][o.productId]) {
            result[o.employeeId][o.productId] = 0;
        }

        result[o.employeeId][o.productId] += revenue;
    }

    const final = {};

    for (let empId in result) {
        let maxProductId = null;
        let maxRevenue = 0;

        for (let productId in result[empId]) {
            if (result[empId][productId] > maxRevenue) {
                maxRevenue = result[empId][productId];
                maxProductId = Number(productId);
            }
        }

        final[empId] = {
            productId: maxProductId,
            revenue: maxRevenue,
        };
    }

    return final;
}
console.log(getTopProductPerEmployee(products, orders));

// -------- Exercise 9: Get Employee Commission ----------

function calculateCommission(products, orders) {
    const productMap = createProductMap(products);
    const revenueMap = {};

    for (let o of orders) {
        const revenue = productMap.get(o.productId).price * o.quantity;

        if (!revenueMap[o.employeeId]) {
            revenueMap[o.employeeId] = 0;
        }
        revenueMap[o.employeeId] += revenue;
    }

    const commission = {};

    for (let empId in revenueMap) {
        commission[empId] = revenueMap[empId] * 0.03;
    }

    return commission;
}

// console.log(calculateCommission(products, orders));

// -------- Exercise 10: Sort Employees By Revenue ----------

function sortEmployeesByRevenue(employees, orders, products) {
    const productMap = createProductMap(products);

    // Calculate revenue for each employee -> total revenue
    const revenueMap = new Map();

    for (let o of orders) {
        const revenue = productMap.get(o.productId).price * o.quantity;

        // Accumulate revenue per employee
        if (revenueMap.has(o.employeeId)) {
            revenueMap.set(
                o.employeeId,
                revenueMap.get(o.employeeId) + revenue,
            );
        } else {
            revenueMap.set(o.employeeId, revenue);
        }
    }

    // Transform employees into result array with revenue
    const result = employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
        revenue: revenueMap.get(emp.id) || 0,
    }));

    // QuickSort (descending by revenue)
    function quickSort(arr) {
        if (arr.length <= 1) return arr;

        const pivot = arr[arr.length - 1];
        const left = []; // elements with higher revenue
        const right = []; // elements with lower or equal revenue

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].revenue > pivot.revenue) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        //  sort and combine
        return [...quickSort(left), pivot, ...quickSort(right)];
    }

    return quickSort(result);
}

// console.log(sortEmployeesByRevenue(employees, orders, products));
