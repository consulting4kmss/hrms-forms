var totalFields2=0;
var totalPages2=0;

function nextPage2(pageNumber) {
    const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
    const nextPage = document.querySelector(`#form2-page${pageNumber}`);
    currentPage.style.display = 'none';
    nextPage.style.display = 'block';
}

function previousPage2(pageNumber) {
    const currentPage = document.querySelector(`#form2-page${pageNumber + 1}`);
    const previousPage = document.querySelector(`#form2-page${pageNumber}`);
    currentPage.style.display = 'none';
    previousPage.style.display = 'block';
}


function updatePageInfo2(formId, currentPage) {
    const currentPageText = document.getElementById('currentPageText2');
    const progressBar = document.getElementById('progressBar2');
    const percentageText = document.getElementById('currentPagePercentage2');

    const fields = document.querySelectorAll(`#${formId} .form-page2 input`);
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

    currentPageText.textContent = `Page ${currentPage} of ${totalPages2}`;
    progressBar.style.width = percentage + '%';
    percentageText.textContent = Math.round(percentage) + '%';

    percentageText.style.left = `${percentage}%`;
}

function updateProgress2(formId) {
    const form = document.getElementById(formId);
    const fields = form.querySelectorAll('.form-page2 input');
    let filledFields = 0;
    const processedGroups = new Set();

    fields.forEach(field => {
        if ((field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type ==='number') && field.value.trim()) {
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
   
    const percentage = ((filledFields / totalFields2) * 100);
    console.log("Total Fields:", totalFields2);
    console.log("Filled Fields:", filledFields);
    console.log("Percentage:", percentage);

    const progressBar = document.querySelector('.progress-bar2');
    progressBar.style.width = `${percentage}%`;

    const percentageText = document.getElementById('currentPagePercentage2');
    percentageText.textContent = `${Math.round(percentage)}%`;
    const offset = Math.max(0, percentage - 7);
    percentageText.style.left = `${offset}%`;
}

function handleMutualExclusiveCheckboxes2(formId) {
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

            updateProgress2(formId);
            // toggleHighBpFields(formId); 
            toggleFields2(formId, toggleFieldsConfig2);
        });
    });
}

function initializeForm2(formId) {
    totalPages2 = document.querySelectorAll(`#${formId} .form-page2 `).length;

    totalFields2= Array.from(document.querySelectorAll(`#${formId} .form-page2 input`))
        .filter((field, index, self) => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return self.findIndex(f => f.name === field.name) === index;
            }
            return true;
        }).length;

    updatePageInfo2(formId, 1);

    const fields = document.querySelectorAll(`#${formId} .form-page2 input, #${formId} .form-page2 select`);
    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress2(formId);
            // toggleHighBpFields(formId);
            toggleFields2(formId, toggleFieldsConfig2);
        });
    });

    handleMutualExclusiveCheckboxes2(formId);

    updateProgress2(formId);
}
// function handleDateChange2(event) {
//     console.log('entered into date 2');
//     const selectedDate = new Date(event.target.value);

//     if (!isNaN(selectedDate)) { // Ensure the date is valid
//         const formattedDate = formatDateToDDMMYYYY2(selectedDate);
//         const dateOutput = event.target.nextElementSibling; // Assuming the output is next to the input
//         if (dateOutput) {
//             dateOutput.textContent = `Selected Date: ${formattedDate}`;
//         }
//     }
// }

// function formatDateToDDMMYYYY2(date) {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
// }

function handleDateChange2(event) {
    console.log('Entered into date 2');
    const selectedDate = new Date(event.target.value);

    if (!isNaN(selectedDate)) { // Ensure the date is valid
        const formattedDate = formatDateToDDMMYYYY2(selectedDate);

        // Display formatted date in a sibling element
        const errorMessage = event.target.nextElementSibling; // Assuming <small> follows the input
        if (errorMessage) {
            errorMessage.textContent = `Selected Date: ${formattedDate}`;
        }
    }
}

function formatDateToDDMMYYYY2(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

toggleFieldsConfig2 =[
    {
        radioId: "addressYes",
        fieldsToShow: ["Address1"],
    },

]

function toggleFields2(formId, config) {
    config.forEach(({ radioId, fieldsToShow }) => {
        const radiobut = document.getElementById(radioId);

        fieldsToShow.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            const childElements = fieldElement.querySelectorAll('*');
            const childIds = Array.from(childElements)
                .filter(element => element.id)
                .map(element => element.id);

            if (radiobut && radiobut.checked) {
                fieldElement.style.display = 'block';
                document.getElementById(childIds[0]).required = true;
            }
            else {
                fieldElement.style.display = 'none';
                document.getElementById(childIds[0]).required = false;


            }
        });
    });

    updateProgress(formId);
}

initializeForm2('form2');