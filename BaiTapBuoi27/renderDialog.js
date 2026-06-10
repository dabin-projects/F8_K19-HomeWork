const FIELD_DEFS = [
    {
        key: 'companyName',
        label: 'Company Name *',
        type: 'text',
        fullWidth: true,
        placeholder: 'e.g. Cty TNHH F8',
        required: true,
    },
    {
        key: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'contact@example.com',
    },
    {
        key: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '0987 654 321',
    },
    {
        key: 'taxId',
        label: 'Tax ID (Mã số thuế)',
        type: 'text',
        fullWidth: true,
        placeholder: '018381123412',
    },
    {
        key: 'address',
        label: 'Physical Address',
        type: 'text',
        fullWidth: true,
        placeholder: 'Enter full address...',
    },
    {
        key: 'status',
        label: 'Status',
        type: 'text',
        fullWidth: true,
        placeholder: 'Active / Inactive',
    },
];

const renderField = (field, data, isEdit) => {
    const group = document.createElement('div');
    group.className = `form-group${field.fullWidth ? ' full-width' : ''}`;

    const label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = field.label;

    const input = document.createElement('input');
    input.className = 'form-input';
    input.type = field.type;
    input.name = field.key;
    input.placeholder = field.placeholder ?? '';
    input.value = isEdit ? (data?.[field.key] ?? '') : '';

    group.append(label, input);
    return group;
};

const renderDialog = (
    data = null,
    isEdit = false,
    onSaveCallback = async () => {},
) => {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'popup-backdrop';
    backdrop.setAttribute('aria-label', 'Close dialog');

    const content = document.createElement('div');
    content.className = 'panel popup-content';

    const header = document.createElement('div');
    header.className = 'panel-header';
    header.style.borderBottom = 'none';
    header.style.paddingBottom = '0';

    const title = document.createElement('h2');
    title.className = 'panel-title';
    title.textContent = isEdit ? 'Edit Customer' : 'Add New Customer';

    header.append(title);

    const body = document.createElement('div');
    body.className = 'popup-body';

    const form = document.createElement('form');
    form.className = 'form-grid';

    for (const field of FIELD_DEFS) {
        form.append(renderField(field, data, isEdit));
    }

    body.append(form);

    const footer = document.createElement('div');
    footer.className = 'popup-footer';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'btn btn-cancel';
    cancelButton.textContent = 'Cancel';

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.className = 'btn btn-save';
    saveButton.textContent = isEdit ? 'Update Customer' : 'Save Customer';

    footer.append(cancelButton, saveButton);
    content.append(header, body, footer);
    overlay.append(backdrop, content);

    const closeDialog = () => overlay.remove();

    backdrop.addEventListener('click', closeDialog);
    cancelButton.addEventListener('click', closeDialog);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const nextData = Object.fromEntries(formData.entries());

        if (!nextData.companyName.trim()) {
            alert('Company Name is required');
            return;
        }

        console.log(
            'renderDialog submit data',
            nextData,
            'isEdit',
            isEdit,
            'id',
            data?.id,
        );

        await onSaveCallback({
            ...(data?.id ? { id: data.id } : {}),
            ...nextData,
        });

        closeDialog();
    });

    saveButton.addEventListener('click', (e) => {
        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        } else {
            form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
    });

    document.body.append(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        content.style.opacity = '1';
        content.style.transform = 'scale(1) translateY(0)';
    });

    return overlay;
};

export default renderDialog;
