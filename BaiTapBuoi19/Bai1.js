const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 },
];
const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ],
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 },
        ],
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 },
        ],
    },
];

function getTopProduct(products, orders) {
    // 1. Tạo Map để tra cứu giá sản phẩm nhanh hơn (O(1))
    const priceMap = new Map(products.map((p) => [p.id, p.price]));

    // 2. Tính tổng doanh thu cho từng sản phẩm

    //   Tạo object để lưu tổng doanh thu theo productID
    const revenueMap = {};

    //   Duyệt qua từng orders
    orders.forEach((order) => {
        // Duyệt qua từng sản phẩm trong order đó
        order.items.forEach((item) => {
            const price = priceMap.get(item.productId);
            const revenue = item.quantity * price;

            //   Nếu sản phẩm chưa có trong revenueMap thì khởi tạo = 0
            if (!revenueMap[item.productId]) {
                revenueMap[item.productId] = 0;
            }
            // Cộng dồn doanh thu
            revenueMap[item.productId] += revenue;
        });
    });

    // 3. Tìm productId có doanh thu lớn nhất
    let maxRevenue = 0;
    let topProductId = null;

    for (const productId in revenueMap) {
        if (revenueMap[productId] > maxRevenue) {
            maxRevenue = revenueMap[productId];
            topProductId = parseInt(productId);
        }
    }

    // 4. Trả về thông tin sản phẩm tìm được
    const topProduct = products.find((p) => p.id === topProductId);
    return {
        ...topProduct,
        totalRevenue: maxRevenue,
    };
}

const result = getTopProduct(products, orders);
console.log('Sản phẩm có doanh thu cao nhất:', result);
