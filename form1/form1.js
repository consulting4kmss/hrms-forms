function showForm(formId) {
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');

    form1.style.display = 'none';
    form2.style.display = 'none';

    if (formId === 'form1') {
        form1.style.display = 'block';
        updateProgress('form1'); 
    } else if (formId === 'form2') {
        form2.style.display = 'block';
        updateProgress('form2'); 
    }
}

function nextPage(formId, pageNumber) {
    const currentPage = document.querySelector(`#${formId}-page${pageNumber - 1}`);
    const nextPage = document.querySelector(`#${formId}-page${pageNumber}`);
    currentPage.style.display = 'none';
    nextPage.style.display = 'block';
    updatePageInfo(formId, pageNumber);
}

function previousPage(formId, pageNumber) {
    const currentPage = document.querySelector(`#${formId}-page${pageNumber + 1}`);
    const previousPage = document.querySelector(`#${formId}-page${pageNumber}`);
    currentPage.style.display = 'none';
    previousPage.style.display = 'block';

    updatePageInfo(formId, pageNumber);
}

function updatePageInfo(formId, pageNumber) {
    const totalPages = 3; 
    const currentPageText = document.getElementById('currentPageText');
    const progressBar = document.querySelector('.progress-bar');
    const percentageText = document.getElementById('currentPagePercentage');

    currentPageText.textContent = `Page ${pageNumber} of ${totalPages}`;

    updateProgress(formId, pageNumber);

    const fields = document.querySelectorAll(`#${formId} .form-page input`);
    const filledFields = Array.from(fields).filter(input => input.value).length;
    const percentage = (filledFields / fields.length) * 100;

    progressBar.style.width = percentage + '%';  
    percentageText.textContent = Math.round(percentage) + '%'; 
}

function updateProgress(formId, pageNumber = 1) {
    const form = document.getElementById(formId);
    const fields = form.querySelectorAll('input');
    let filledFields = 0;

    fields.forEach(field => {
        // Check if the field has a value (for text inputs)
        if (field.type === 'text' || field.type === 'email' || field.type === 'date') {
            if (field.value) {
                filledFields++;
            }
        }
        
        // Check if the checkbox is selected (for checkboxes)
        if (field.type === 'checkbox' && field.checked) {
            filledFields++;
        }
    });

    const totalFields = fields.length;
    const percentage = (filledFields / totalFields) * 100;

    const progressBar = form.querySelector('.progress-bar');
    progressBar.style.width = percentage + '%';

    const percentageText = document.getElementById('currentPagePercentage');
    percentageText.textContent = Math.round(percentage) + '%';
}
