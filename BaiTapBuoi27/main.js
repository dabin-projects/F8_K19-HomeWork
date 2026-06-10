import { renderTable, headers } from './utils/index.js';
import renderDialog from './renderDialog.js';

let customers = [];
let searchText = '';

const getCustomers = async () => {
    try {
        const response = await fetch('http://localhost:3000/customers');
        return await response.json();
    } catch (error) {
        console.error('get data failed', error);
        alert('get data failed');
        return [];
    }
};

const createCustomerId = (rows) => {
    const maxNumber = rows.reduce((max, customer) => {
        const match = String(customer.id ?? '').match(/(\d+)$/);
        const value = match ? Number(match[1]) : 0;
        return Math.max(max, value);
    }, 0);

    return `CUST-${String(maxNumber + 1).padStart(3, '0')}`;
};

const renderCustomers = () => {
    const panel = document.querySelector('.panel');
    const oldTable = panel.querySelector('.table-container');

    if (oldTable) {
        oldTable.remove();
    }

    const filteredCustomers = customers.filter((customer) => {
        const keyword = searchText.trim().toLowerCase();

        if (!keyword) {
            return true;
        }

        return Object.values(customer).some((value) =>
            String(value ?? '')
                .toLowerCase()
                .includes(keyword),
        );
    });

    panel.append(renderTable(headers, filteredCustomers, 'table-container'));
};

const handleAdd = async (newCustomer) => {
    console.log('handleAdd called', newCustomer);
    const payload = {
        ...newCustomer,
        id: createCustomerId(customers),
    };

    const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Create customer failed');
    }

    customers = await getCustomers();
    renderCustomers();
};

const handleUpdate = async (id, updatedCustomer) => {
    console.log('handleUpdate called', id, updatedCustomer);
    const response = await fetch(`http://localhost:3000/customers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...updatedCustomer,
            id,
        }),
    });

    if (!response.ok) {
        throw new Error('Update customer failed');
    }

    customers = await getCustomers();
    renderCustomers();
};

const handleDelete = async (id) => {
    const isConfirmed = confirm('Delete this customer?');

    if (!isConfirmed) {
        return;
    }

    const response = await fetch(`http://localhost:3000/customers/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Delete customer failed');
    }

    customers = await getCustomers();
    renderCustomers();
};

const openAddDialog = () => {
    renderDialog(null, false, handleAdd);
};

const openEditDialog = (id) => {
    const customer = customers.find((item) => item.id === id);

    if (!customer) {
        return;
    }

    renderDialog(customer, true, (nextData) => handleUpdate(id, nextData));
};

const init = async () => {
    const panel = document.querySelector('.panel');
    const searchInput = panel.querySelector('.search-input');
    const addButton = panel.querySelector('.btn-add');

    customers = await getCustomers();
    renderCustomers();

    searchInput.addEventListener('input', (event) => {
        searchText = event.target.value;
        renderCustomers();
    });

    addButton.addEventListener('click', openAddDialog);

    panel.addEventListener('click', (event) => {
        const actionButton = event.target.closest('[data-action]');

        if (!actionButton) {
            return;
        }

        const { action, id } = actionButton.dataset;

        if (action === 'edit') {
            openEditDialog(id);
        }

        if (action === 'delete') {
            handleDelete(id);
        }
    });
};

init();
