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

    const fields = document.querySelectorAll(`#${formId} .form-page input, #${formId} .form-page select`);
    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress(formId);
            // toggleHighBpFields(formId);
            toggleFields(formId, toggleFieldsConfig);
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
            // toggleHighBpFields(formId); 
            toggleFields(formId, toggleFieldsConfig);
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
const toggleFieldsConfig = [
    {
        checkboxId: "visionYes",
        fieldsToShow: ["defectiveVisionYearInput","defectiveVisionExplanationInput"],
    },
    {
        checkboxId: "visionOtherYes",
        fieldsToShow: ["visionOtherYearInput","visionOtherExplanationInput"],
    },
    {
        checkboxId: "hearingYes",
        fieldsToShow: ["hearingLossYearInput","hearingLossExplanationInput"],
    },
    {
        checkboxId: "hearingotherYes",
        fieldsToShow: ["hearingOtherYearInput","hearingOtherExplanationInput"],
    },
    {
        checkboxId: "migrainesYes",
        fieldsToShow: ["migrainesYearInput","migrainesExplanationInput"],
    },
    {
        checkboxId: "headachesYes",
        fieldsToShow: ["headachesYearInput","headachesExplanationInput"],
    },
    {
        checkboxId: "tbiYes",
        fieldsToShow: ["tbiYearInput","tbiExplanationInput"],
    },
    {
        checkboxId: "thyroidYes",
        fieldsToShow: ["thyroidYearInput","thyroidExplanationInput"],
    },
    {
        checkboxId: "irregularHeartbeatYes",
        fieldsToShow: ["irregularHeartbeatYearInput","irregularHeartbeatExplanationInput"],
    },
    {
        checkboxId: "highBpYes",
        fieldsToShow: ["highBpYearInput", "highBpExplanationInput"],
    },
    {
        checkboxId: "heartDiseaseYes",
        fieldsToShow: ["heartDiseaseYearInput","heartDiseaseExplanationInput"],
    },
    {
        checkboxId: "heartFailureYes",
        fieldsToShow: ["heartFailureYearInput","heartFailureExplanationInput"],
    },
];
function toggleFields(formId, config) {
    config.forEach(({ checkboxId, fieldsToShow }) => {
        const checkbox = document.getElementById(checkboxId);

        fieldsToShow.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            if (checkbox && checkbox.checked) {
                fieldElement.style.display = 'block';
            } else {
                fieldElement.style.display = 'none';
            }
        });
    });

    updateProgress(formId); 
}
// function toggleHighBpFields(formId) {
//     if (highBpYes.checked) {
//         highBpYearInput.style.display = 'block';
//         highBpExplanationInput.style.display = 'block';
//     }
//     else {
//         highBpYearInput.style.display = 'none';
//         highBpExplanationInput.style.display = 'none';
//     }
//     totalFields = Array.from(document.querySelectorAll(`#${formId} .form-page input`))
//         .filter((field, index, self) => {
//             if (field.type === 'checkbox' || field.type === 'radio') {
//                 return self.findIndex(f => f.name === field.name) === index;
//             }
//             return true;
//         }).length;

//     if (highBpYearInput.style.display !== 'none') {
//         totalFields++;  
//     }
//     if (highBpExplanationInput.style.display !== 'none') {
//         totalFields++;  
//     }

//     updateProgress(formId);
// }



initializeForm('form1');
