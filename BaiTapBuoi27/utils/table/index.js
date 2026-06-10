const renderTable = (headers, rows, className = null) => {
    const div = document.createElement('div');

    if (className) div.className = className;

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');

    for (const header of headers) {
        const th = document.createElement('th');
        th.innerText = header.text;
        headerRow.append(th);
    }
    const actionC = document.createElement('th');
    actionC.innerText = 'Action';
    headerRow.append(actionC);
    thead.append(headerRow);

    for (const row of rows ?? []) {
        const tr = document.createElement('tr');

        for (const header of headers) {
            const td = document.createElement('td');
            td.innerText = row[header.key];
            tr.append(td);
        }

        const action = document.createElement('td');
        action.className = 'actions';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'action-icon';
        editButton.title = 'Edit';
        editButton.dataset.action = 'edit';
        editButton.dataset.id = row.id;
        editButton.textContent = '✎';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'action-icon delete';
        deleteButton.title = 'Delete';
        deleteButton.dataset.action = 'delete';
        deleteButton.dataset.id = row.id;
        deleteButton.textContent = '🗑';

        action.append(editButton, deleteButton);

        tr.append(action);

        tbody.append(tr);
    }

    table.append(thead);
    table.append(tbody);
    div.append(table);

    return div;
};

export { renderTable };
