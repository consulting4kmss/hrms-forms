var totalFields2 = 0;
var totalPages2 = 0;

function nextPage2(pageNumber) {
    // if (validatePage('form2', pageNumber - 1)) {
        const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
        const nextPage = document.querySelector(`#form2-page${pageNumber}`);
        currentPage.style.display = 'none';
        nextPage.style.display = 'block';
        updatePageInfo2('form2',pageNumber);
        updateProgress2('form2');
    // }else{
    //     console.log("Validation Failed");
    // }
}

function previousPage2(pageNumber) {
    const currentPage = document.querySelector(`#form2-page${pageNumber + 1}`);
    const previousPage = document.querySelector(`#form2-page${pageNumber}`);
    currentPage.style.display = 'none';
    previousPage.style.display = 'block';
    updatePageInfo2('form2', pageNumber);
    updateProgress2('form2');
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
        if ((field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type === 'number') && field.value.trim()) {
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
    const radios = document.querySelectorAll(`#${formId} input[type="radio"]`);

    const radioGroups = {};

    radios.forEach(radio => {
        const groupName = radio.name;

        if (!radioGroups[groupName]) {
            radioGroups[groupName] = [];
        }

        radioGroups[groupName].push(radio);

        radio.addEventListener('change', () => {
            radioGroups[groupName].forEach(otherCheckbox => {
                if (otherCheckbox !== radio && (otherCheckbox.type === radio.type)) {
                    otherCheckbox.checked = false;
                }
            });

            updateProgress2(formId);
      
            toggleFields2(formId, toggleFieldsConfig2);
        });
    });
}

function initializeForm2(formId) {
    totalPages2 = document.querySelectorAll(`#${formId} .form-page2 `).length;

    totalFields2 = Array.from(document.querySelectorAll(`#${formId} .form-page2 input`))
        .filter((field, index, self) => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return self.findIndex(f => f.name === field.name) === index;
            }
            return true;
        }).length;

    updatePageInfo2(formId,1);
    toggleFields2(formId, toggleFieldsConfig2);
    console.log("executing form2");

    const fields = document.querySelectorAll(`#${formId} .form-page2 input, #${formId} .form-page2 select`);
    console.log("printing Feilds ",fields);
    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress2(formId);
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
                document.getElementById(childIds[0]).style.display='block';
            }
            else {
                fieldElement.style.display = 'none';
                document.getElementById(childIds[0]).required = false;
                document.getElementById(childIds[0]).style.display='none';


            }
        });
    });

    updateProgress2(formId);
}

const toggleFieldsConfig2 = [
    {
        radioId: "addressYes",
        fieldsToShow: ["Address1"],
    },
    {
        radioId: "addressYes1",
        fieldsToShow: ["priorAdd"],
    },
    // {
    //     radioId:"voilationYes",
    //     fieldsToShow:["voilationDetail"]
    // },
    // {
    //     radioId:"voilationYes1",
    //     fieldsToShow:["voilationDetail1"]
    // },
    // {
    //     radioId:"accidentYes",
    //     fieldsToShow:["accident"]
    // },
    // { radioId:"accidentYes1",
    //   fieldsToShow:["accident1"],
    // },
    {
        radioId:"licenseDenyYes",
        fieldsToShow:["denyExplanation"],
    },
    {
        radioId:"licenseSuspendedYes",
        fieldsToShow:["suspendedExplanation"],
    },
    {
      radioId:"militaryYes",
      fieldsToShow:["fmcsa"]
    }

]



function validateAndFormatPhoneNumber(input) {
    const rawValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Handle empty input (allows clearing)
    if (rawValue.length === 0) {
        input.value = '';
        const errorField = input.nextElementSibling;
        errorField.textContent = '';
        errorField.style.display = 'none';
        return;
    }

    // Validate that only numbers are allowed
    if (rawValue.length > 10) {
        input.value = formatPhoneNumber(rawValue.substring(0, 10)); // Format first 10 digits only
        return;
    }

    // Format the phone number dynamically
    input.value = formatPhoneNumber(rawValue);
}

function formatPhoneNumber(value) {
    if (value.length <= 3) {
        return `(${value}`;
    } else if (value.length <= 6) {
        return `(${value.substring(0, 3)}) ${value.substring(3)}`;
    } else {
        return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    }
}




function validInput(input, regex, errorMessage) {
    const value = input.value;
    const errorField = input.nextElementSibling;

    if (!regex.test(value)) {
        // Add error styles and message
        input.classList.add('highlight');
        if (errorField) {
            errorField.style.display = 'block';
            errorField.textContent = errorMessage;
        }

        // Remove invalid characters
        input.value = value.replace(new RegExp(`[^${regex.source.slice(1, -1)}]`, 'g'), '');
        return false;
    } else {
        // Remove error styles and message
        input.classList.remove('highlight');
        if (errorField) {
            errorField.style.display = 'none';
        }
        return true;
    }
}


// function validatePage(formId, pageNumber) {

//     const form = document.getElementById(formId);
//     const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
//     const inputs = currentPage.querySelectorAll('input, select, textarea');
//     let isValid = true;

//     inputs.forEach(input => {
//         const validateInput = () => {
//             if (input.type === 'checkbox') {
//                 const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
//                 const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

//                 if (!isAnyChecked) {
//                     isValid = false;
//                     checkboxes.forEach(checkbox => checkbox.classList.add('highlight-feedback'));
//                 } else {
//                     checkboxes.forEach(checkbox => checkbox.classList.remove('highlight-feedback'));
//                 }
//                 console.log("Valid Function TYPE===CHECKBOX", isValid);
//             }else if(input.type==='radio'){
//                 const radios=currentPage.querySelectorAll(`input[name="${input.name}"]`);
//                 const isAnyChecked=Array.from(radios).some(radio=>radio.checked);
//                 if(!isAnyChecked){
//                     isValid=false;
//                     radios.forEach(radio=>radio.classList.add('highlight-feedback') );
//                 } else{
//                     radios.forEach(radio=>radio.classList.remove('highlight-feedback'));
//                 }
//                 console.log("Valid Function TYPE===RADIO",isValid);
//             } 
//             else if (input.required) {
//                 if (input.tagName === 'SELECT' && !input.value) {
//                     isValid = false;
//                     input.classList.add('highlight');
//                     console.log("Valid Function INPUT REQUIRED TAGNAME==SELECT", isValid);
//                 } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
//                     isValid = false;
//                     input.classList.add('highlight');
//                     console.log("Valid Function INPUT REQUIRED TAGNAME==TEXTAREA", isValid);
//                 } else if (input.value.trim()) {
//                     input.classList.remove('highlight');
//                     console.log("Valid Function INPUT.VALUE.TRIM", isValid);
//                 } else {
//                     isValid = false;
//                     console.log("DEFAULT IN INPUT.REQUIRED", isValid);
//                     input.classList.add('highlight');
//                 }

//             } else {
//                 input.classList.remove('highlight');
//             }
//         };


//         input.addEventListener('input', validateInput);
//         if (input.tagName === 'SELECT') {
//             input.addEventListener('change', validateInput);
//         }


//         validateInput();
//     });

//     console.log("Valid Function end", isValid);
//     return isValid;
// }



function validatePage(formId, pageNumber) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        // Skip hidden inputs
        const isHidden = getComputedStyle(input).display === 'none' || input.closest('[style*="display: none"]');
        if (isHidden) {
            console.log("input  is "+input+"     its display is ="+isHidden)
            return;
        }

        const validateInput = () => {
            if (input.type === 'checkbox') {
                const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

                if (!isAnyChecked) {
                    isValid = false;
                    checkboxes.forEach(checkbox => checkbox.classList.add('highlight-feedback'));
                } else {
                    checkboxes.forEach(checkbox => checkbox.classList.remove('highlight-feedback'));
                }
                console.log("Valid Function TYPE===CHECKBOX", isValid);
            } else if (input.type === 'radio') {
                const radios = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(radios).some(radio => radio.checked);
                if (!isAnyChecked) {
                    isValid = false;
                    radios.forEach(radio => radio.classList.add('highlight-feedback'));
                } else {
                    radios.forEach(radio => radio.classList.remove('highlight-feedback'));
                }
                console.log("Valid Function TYPE===RADIO", isValid);
            } else if (input.required) {
                if (input.tagName === 'SELECT' && !input.value) {
                    isValid = false;
                    input.classList.add('highlight');
                    console.log("Valid Function INPUT REQUIRED TAGNAME==SELECT", isValid);
                } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('highlight');
                    console.log("Valid Function INPUT REQUIRED TAGNAME==TEXTAREA", isValid);
                } else if (input.value.trim()) {
                    input.classList.remove('highlight');
                    console.log("Valid Function INPUT.VALUE.TRIM", isValid);
                } else {
                    isValid = false;
                    console.log("DEFAULT IN INPUT.REQUIRED", isValid);
                    input.classList.add('highlight');
                }
            } else {
                input.classList.remove('highlight');
            }
        };

        input.addEventListener('input', validateInput);
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', validateInput);
        }

        validateInput();
    });

    console.log("Valid Function end", isValid);
    return isValid;
}



function getValidationRule(input) {

    const rules = {
        text: {
            regex: /^[a-zA-Z\s]+$/,
            errorMessage: 'Only letters are allowed.',
        },
        number: {
            regex: /^[0-9]+$/,
            errorMessage: 'Only numbers are allowed.',
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Enter a valid email address.',
        },
    };


    const validationType = input.getAttribute('data-validate');
    return rules[validationType] || null;
}



let violationCount = 0;

function handleRadioChange(event) {
    const container = document.getElementById("violation-container");

    if (event.target.value === "yes") {
        // Increment the violation count
        violationCount++;

        // Create a unique ID for the new violation detail
        const violationId = `violationDetail-${violationCount}`;

        // Create the template for the new violation detail
        const template = `
            <div id="${violationId}" class="violation-detail" data-index="${violationCount}">
                <div class="address-container mt-3">
                    <div class="col-12">
                        <label class="question-label">Date of Conviction</label>
                        <input type="date" class="dab" name="applicantdob-${violationCount}" id="voilationDate-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="col-12 mt-3">
                        <label class="question-label">Offence</label>
                        <input type="text" data-validate="text" name="offence-${violationCount}" autocomplete="off" class="form-control" id="voilationOffence-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="col-12 mt-3 mb-3">
                        <label class="question-label">Location</label>
                        <input type="text" data-validate="text" name="voilationLocation-${violationCount}" autocomplete="off" class="form-control" id="voilationLocation-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="mt-3 mb-2">
                        <label class="question-label">Type Of Vehicle Operated</label>
                        <div class="form-check col-12 mt-2">
                            <input class="form-check-input box" type="radio" id="offenceCommercial-${violationCount}" name="offenceVehicle-${violationCount}" value="Commercial" onchange="updateProgress2('form2')">
                            <label for="offenceCommercial-${violationCount}" class="label ms-3">Commercial</label>
                        </div>
                        <div class="form-check col-12 mt-2">
                            <input class="form-check-input box" type="radio" id="offencePrivate-${violationCount}" name="offenceVehicle-${violationCount}" value="Private" onchange="updateProgress2('form2')">
                            <label for="offencePrivate-${violationCount}" class="label ms-3">Private</label>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex flex-column mt-2">
                    <label>Do you have additional traffic violations to add?</label>
                    <div class="form-check d-flex align-items-end">
                        <input class="form-check-input" type="radio" value="no" id="violationNo-${violationCount}" name="trafficVoilation-${violationCount}" onchange="handleRadioChange(event)">
                        <label class="form-check-label label ms-4" for="violationNo-${violationCount}">No</label>
                    </div>
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="radio" value="yes" id="violationYes-${violationCount}" name="trafficVoilation-${violationCount}" onchange="handleRadioChange(event)">
                        <label class="form-check-label ms-4" for="violationYes-${violationCount}">Yes</label>
                    </div>
                </div>
            </div>
        `;

        // Append the new section
        container.insertAdjacentHTML("beforeend", template);
    } else if (event.target.value === "no") {
        const currentViolation = event.target.closest(".violation-detail");

        if (!currentViolation) {
            // This is the first set of "Yes/No" buttons outside the .violation-detail
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            violationCount = 0;
            return;
        }

        const currentViolationIndex = parseInt(currentViolation.dataset.index);

        // Remove all subsequent violations
        const allViolations = Array.from(container.children);
        allViolations.forEach(violation => {
            const violationIndex = parseInt(violation.dataset.index);
            if (violationIndex > currentViolationIndex) {
                container.removeChild(violation);
            }
        });

        // Update the violationCount to match the remaining violations
        violationCount = currentViolationIndex;
    }
}


let accidentCount = 0;

function handleAccidentChange(event) {
    const container = document.getElementById("accident-container");

    if (event.target.value === "yes") {
        // Increment the accident count
        accidentCount++;

        // Create a unique ID for the new accident detail
        const accidentId = `accidentDetail-${accidentCount}`;

        // Create the template for the new accident detail
        const template = `
            <div id="${accidentId}" class="accident-detail" data-index="${accidentCount}">
                <div class="address-container mb-2 mt-3">
                    <div class="col-12">
                        <label class="question-label">Date of Accident</label>
                        <input type="date" class="dab" name="accidentDate-${accidentCount}" id="accidentDate-${accidentCount}" oninput="handleDateChange2(event)" placeholder="MM/DD/YYYY" onchange="updateProgress2('form2')">
                    </div>

                    <div class="col-12 d-flex flex-column mt-2">
                        <div>
                            <label class="question-label">Fatalities or Personal Injuries</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" value="no" id="fatalities-${accidentCount}" name="fatalities-${accidentCount}" onchange="updateProgress2('form2')">
                            <label class="form-check-label label ms-4" for="fatalities-${accidentCount}">Fatalities</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" value="yes" id="injuries-${accidentCount}" name="fatalities-${accidentCount}" onchange="updateProgress2('form2')">
                            <label class="form-check-label ms-4" for="injuries-${accidentCount}">Personal Injuries</label>
                        </div>
                        <div class="col-12 mt-2">
                            <label class="question-label">Circumstances of Accident</label>
                            <textarea name="circumstances-${accidentCount}" id="accidentExplanation-${accidentCount}" rows="4" class="form-control mt-2 txtfeild"></textarea>
                        </div>
                        <div class="mb-3 mt-3">
                            <label class="question-label">Attachment (Optional)</label>
                            <input type="file" id="fileInput-${accidentCount}" class="form-control mt-2" />
                        </div>
                    </div>
                </div>
                    <div class="col-12 d-flex flex-column mt-2">
                        <label class="question-label">Do you have additional accidents to add?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="no" id="accidentNo-${accidentCount}" name="additionalAccident-${accidentCount}" onchange="handleAccidentChange(event)">
                            <label class="form-check-label label ms-4" for="accidentNo-${accidentCount}">No</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" value="yes" id="accidentYes-${accidentCount}" name="additionalAccident-${accidentCount}" onchange="handleAccidentChange(event)">
                            <label class="form-check-label ms-4" for="accidentYes-${accidentCount}">Yes</label>
                        </div>
                    </div>
            </div>
        `;

        // Append the new accident detail template
        container.insertAdjacentHTML("beforeend", template);
    } else if (event.target.value === "no") {
        const currentAccident = event.target.closest(".accident-detail");

        if (!currentAccident) {
            // This is the first set of "Yes/No" buttons outside the .accident-detail
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            accidentCount = 0;
            return;
        }

        const currentAccidentIndex = parseInt(currentAccident.dataset.index);

        // Remove all subsequent accidents
        const allAccidents = Array.from(container.children);
        allAccidents.forEach(accident => {
            const accidentIndex = parseInt(accident.dataset.index);
            if (accidentIndex > currentAccidentIndex) {
                container.removeChild(accident);
            }
        });

        // Update the accidentCount to match the remaining accidents
        accidentCount = currentAccidentIndex;
    }
}


initializeForm2('form2');