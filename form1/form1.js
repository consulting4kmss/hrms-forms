let totalFields = 0;
let totalPages = 0;

function initializeForm(formId) {
    totalPages = document.querySelectorAll(`#${formId} .form-page`).length;

    totalFields = Array.from(document.querySelectorAll(`#${formId} .form-page input`))
        .filter((field, index, self) => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return self.findIndex(f => f.name === field.name) === index;
            }
            return true;
        }).length;

    updatePageInfo(formId, 1);

    const fields = document.querySelectorAll(`#${formId} .form-page input`);
    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress(formId);
            toggleHighBpFields(formId);
        });
    });

    handleMutualExclusiveCheckboxes(formId);

    updateProgress(formId);
}
function handleMutualExclusiveCheckboxes(formId) {
    const checkboxes = document.querySelectorAll(`#${formId} input[type="checkbox"], #${formId} input[type="radio"]`);

    const checkboxGroups = {};

    checkboxes.forEach(checkbox => {
        const groupName = checkbox.name;

        if (!checkboxGroups[groupName]) {
            checkboxGroups[groupName] = [];
        }

        checkboxGroups[groupName].push(checkbox);

        checkbox.addEventListener('change', () => {
            checkboxGroups[groupName].forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox && (otherCheckbox.type === checkbox.type)) {
                    otherCheckbox.checked = false;
                }
            });

            updateProgress(formId); 
            toggleHighBpFields(formId);
        });
    });
}


function updatePageInfo(formId, currentPage) {
    const currentPageText = document.getElementById('currentPageText');
    const progressBar = document.getElementById('progressBar');
    const percentageText = document.getElementById('currentPagePercentage');

    const fields = document.querySelectorAll(`#${formId} .form-page input`);
    let filledFields = 0;

    fields.forEach(field => {
        if ((field.type === 'text' || field.type === 'email' || field.type === 'date') && field.value) {
            filledFields++;
        }
        if (field.type === 'checkbox' && field.checked) {
            filledFields++;
        }
    });

    const percentage = (filledFields / fields.length) * 100;

    currentPageText.textContent = `Page ${currentPage} of ${totalPages}`;
    progressBar.style.width = percentage + '%';
    percentageText.textContent = Math.round(percentage) + '%';

    percentageText.style.left = `${percentage}%`;
}
function convertDateToFormat(inputId) {
    const dateInput = document.getElementById(inputId);
    if (!dateInput) {
        console.error(`Element with id "${inputId}" not found.`);
        return;
    }

    const selectedDate = new Date(dateInput.value);
    if (!dateInput.value) return;

    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    dateInput.value = formattedDate;
    updateProgress('form1');
}


function updateProgress(formId) {
    const form = document.getElementById(formId);
    const fields = form.querySelectorAll('.form-page input');
    let filledFields = 0;
    const processedGroups = new Set();

    fields.forEach(field => {
        if ((field.type === 'text' || field.type === 'email' || field.type === 'date') && field.value.trim()) {
            filledFields++;
        }
        if ((field.type === 'checkbox' || field.type === 'radio') && field.checked) {
            const groupName = field.name;
            if (groupName && !processedGroups.has(groupName)) {
                filledFields++;
                processedGroups.add(groupName);
            }
        }
    });
    // const highBpYearInput = document.getElementById('highBpYear');
    // const highBpExplanationInput = document.getElementById('highBpExplanation');
    // if (highBpYearInput && highBpYearInput.style.display !== 'none') {
    //     console.log("Captured highBpYear:", highBpYearInput.value);
    // }
    // if (highBpExplanationInput && highBpExplanationInput.style.display !== 'none') {
    //     console.log("Captured highBpExplanation:", highBpExplanationInput.value);
    // }

    const percentage = (filledFields / totalFields) * 100;
    console.log("Total Fields:", totalFields);
    console.log("Filled Fields:", filledFields);
    console.log("Percentage:", percentage);

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${percentage}%`;

    const percentageText = document.getElementById('currentPagePercentage');
    percentageText.textContent = `${Math.round(percentage)}%`;
    percentageText.style.left = `${percentage}%`;
}



function nextPage(pageNumber) {
    const form = document.getElementById('form1');
    const currentPage = form.querySelector(`#form1-page${pageNumber - 1}`);
    const nextPage = form.querySelector(`#form1-page${pageNumber}`);

    currentPage.style.display = 'none';
    nextPage.style.display = 'block';

    updatePageInfo('form1', pageNumber);
    updateProgress('form1');
}

function previousPage(pageNumber) {
    const form = document.getElementById('form1');
    const currentPage = form.querySelector(`#form1-page${pageNumber + 1}`);
    const previousPage = form.querySelector(`#form1-page${pageNumber}`);

    currentPage.style.display = 'none';
    previousPage.style.display = 'block';

    updatePageInfo('form1', pageNumber);
    updateProgress('form1');
}
function toggleHighBpFields(formId) {
    if (highBpYes.checked) {
        highBpYearInput.style.display = 'block';
        highBpExplanationInput.style.display = 'block';
    }
    else {
        highBpYearInput.style.display = 'none';
        highBpExplanationInput.style.display = 'none';
    }
    // totalFields = Array.from(document.querySelectorAll(`#${formId} .form-page input`))
    //     .filter((field, index, self) => {
    //         if (field.type === 'checkbox' || field.type === 'radio') {
    //             return self.findIndex(f => f.name === field.name) === index;
    //         }
    //         return true;
    //     }).length;

    // if (highBpYearInput.style.display !== 'none') {
    //     totalFields++;  
    // }
    // if (highBpExplanationInput.style.display !== 'none') {
    //     totalFields++;  
    // }

    updateProgress(formId);
}



initializeForm('form1');
