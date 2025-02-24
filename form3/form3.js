var totalFields2 = 0;
var totalPages2 = 0;
let formCounter = 1;
let years = 0;
let totalYears = 0;
function nextPage2(pageNumber) {
    if (validatePage('form2', pageNumber - 1)) {
        if (pageNumber == 9) {
            initializeSignatureBox();
            clearSign();
            addForm2EventListeners();

        }
        if (pageNumber == 7) {
            addSectionListener();
            checkSections();
            validateEmploymentHistory();
        }
        if (pageNumber - 1 == 7) {
            reason = document.getElementById('employHistroy');
            if (totalYears >= 10 || reason.value) {
                collectFormData('form2', pageNumber - 1);
                const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
                const nextPage = document.querySelector(`#form2-page${pageNumber}`);
                currentPage.style.display = 'none';
                nextPage.style.display = 'block';
                updatePageInfo2('form2', pageNumber);
                caluclateTotalFeilds();


            }
        }
        else {
            collectFormData('form2', pageNumber - 1);
            const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
            const nextPage = document.querySelector(`#form2-page${pageNumber}`);
            currentPage.style.display = 'none';
            nextPage.style.display = 'block';
            updatePageInfo2('form2', pageNumber);
            caluclateTotalFeilds();
        }
    } else {
        showInvalidModal();
    }
}

function previousPage2(pageNumber) {
    const currentPage = document.querySelector(`#form2-page${pageNumber + 1}`);
    const previousPage = document.querySelector(`#form2-page${pageNumber}`);
    currentPage.style.display = 'none';
    previousPage.style.display = 'block';
    updatePageInfo2('form2', pageNumber);
    caluclateTotalFeilds();

}

function updatePageInfo2(formId, currentPage) {
    const currentPageText = document.getElementById('currentPageText2');
    const progressBar = document.getElementById('progressBar2');
    const percentageText = document.getElementById('currentPagePercentage2');

    const fields = document.querySelectorAll(`#${formId} .form-page2 input[required]`);
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
    const fields = form.querySelectorAll('.form-page2 input[required]');

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

            // toggleFields2(formId, toggleFieldsConfig2);
        });
    });
}
function maxDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]'); // Select all date inputs
    dateInputs.forEach(input => {
        input.setAttribute("max", today); // Set max attribute to today's date
    });
}

function initializeForm2(formId) {
    totalPages2 = document.querySelectorAll(`#${formId} .form-page2 `).length;
    console.log("Form 2 initialized");


    maxDate();

    caluclateTotalFeilds()

    updatePageInfo2(formId, 1);
    // toggleFields2(formId, toggleFieldsConfig2);


    const fields = document.querySelectorAll(`#${formId} .form-page2 input, #${formId} .form-page2 select`);

    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress2(formId);
        });
    });

    handleMutualExclusiveCheckboxes2(formId);

    updateProgress2(formId);
}

function caluclateTotalFeilds() {
    totalFields2 = Array.from(document.querySelectorAll(`#form2 .form-page2 input[required]`))
        .filter((field, index, self) => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return self.findIndex(f => f.name === field.name) === index;
            }
            return true;
        }).length;
    updateProgress2('form2');
}



// function validateAddressHistory() {
//     const container = document.getElementById('mainAddressContainer');
//     const forms = container.querySelectorAll('[id^="subAddressContainer"]');

//     let earliestStartDate = null;
//     let latestEndDate = null;

//  console.log("")
//     forms.forEach((form) => {
//         const startDateField = form.querySelector('[id^="addressFrom"]');
//         const endDateField = form.querySelector('[id^="addressTo"]');

//         const startDate = startDateField ? new Date(startDateField.value) : null;
//         const endDate = endDateField ? new Date(endDateField.value) : null;

//         if (startDate && !isNaN(startDate)) {
//             if (!earliestStartDate || startDate < earliestStartDate) {
//                 earliestStartDate = startDate;
//             }
//         }

//         if (endDate && !isNaN(endDate)) {
//             if (!latestEndDate || endDate > latestEndDate) {
//                 latestEndDate = endDate;
//             }
//         }
//     });

//     if (earliestStartDate && latestEndDate) {
//         totalYears = (latestEndDate - earliestStartDate) / (1000 * 60 * 60 * 24 * 365);

//         if (totalYears < 3) {
//             addAddressHistory();
//         } else{
//             removeHistoryElement(); 
//         }
//     } 

// }




// Main function to handle Yes/No selection
function handleAddressChange(radio) {
    const parentContainer = radio.closest('#addressSon'); // Current template container
    const addressSection = document.getElementById('addressSection');

    if (radio.value === 'yes') {
        // Clone the template
        addressCounter++;
        const newTemplate = parentContainer.cloneNode(true);

        // Update IDs, names, and attributes for uniqueness
        newTemplate.dataset.templateId = addressCounter;
        newTemplate.querySelectorAll('[id], [name], [for]').forEach(el => {
            if (el.id) el.id = el.id.replace(/\d+$/, addressCounter);
            if (el.name) el.name = el.name.replace(/\d+$/, addressCounter);
            if (el.htmlFor) el.htmlFor = el.htmlFor.replace(/\d+$/, addressCounter);
        });
        const label = newTemplate.querySelector('.question-label');
        if (label) {
            label.textContent = `Additional Address #${addressCounter}`;
        }
        // Reset inputs in the cloned template
        newTemplate.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(el => el.value = '');
        newTemplate.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
        newTemplate.querySelectorAll('select').forEach(el => el.value = '');


        addressSection.appendChild(newTemplate);
        maxDate();

        caluclateTotalFeilds();
    } else if (radio.value === 'no') {
        // Remove all templates with a higher data-template-id
        const currentTemplateId = parseInt(parentContainer.dataset.templateId, 10);
        document.querySelectorAll('#addressSon').forEach(el => {
            if (parseInt(el.dataset.templateId, 10) > currentTemplateId) {
                addressCounter--;
                console.log(addressCounter);
                el.remove();
                caluclateTotalFeilds();
            }
        });

        caluclateTotalFeilds();
    }
}


function validateAddressHistory() {
    const container = document.getElementById('mainAddressContainer');
    const forms = container.querySelectorAll('[id^="subAddressContainer"]');

    let earliestStartDate = null;
    let latestEndDate = null;
    let validContainerIndex = -1; // Index of the first container that reaches 3 years

    forms.forEach((form, index) => {
        const startDateField = form.querySelector('[id^="addressFrom"]');
        const endDateField = form.querySelector('[id^="addressTo"]');

        const startDate = startDateField ? new Date(startDateField.value) : null;
        const endDate = endDateField ? new Date(endDateField.value) : null;

        if (startDate && !isNaN(startDate)) {
            if (!earliestStartDate || startDate < earliestStartDate) {
                earliestStartDate = startDate;
            }
        }

        if (endDate && !isNaN(endDate)) {
            if (!latestEndDate || endDate > latestEndDate) {
                latestEndDate = endDate;
            }
        }

        // Calculate duration in years
        if (earliestStartDate && latestEndDate) {
            let totalYears = (latestEndDate - earliestStartDate) / (1000 * 60 * 60 * 24 * 365);
            
            if (totalYears >= 3 && validContainerIndex === -1) {
                validContainerIndex = index; // First container that completes 3 years
            }
        }
    });

    if (earliestStartDate && latestEndDate) {
        let totalYears = (latestEndDate - earliestStartDate) / (1000 * 60 * 60 * 24 * 365);

        if (totalYears < 3) {
            addAddressHistory(); // Add more address history if needed
        } else if (validContainerIndex !== -1) {
            removeExtraAddressHistory(validContainerIndex); // Remove unnecessary history
        }
    }
}


var addressCounter = 1; // Counter for unique IDs

// Main function to handle initial Yes/No for address history
function addAddressHistory() {
    
        const addressHistory = document.createElement('div');
        addressHistory.id = `subAddressContainer${addressCounter}`;
        addressHistory.innerHTML = `
            <div class="mt-3">
                <h4 class="just-color" style="border-bottom: 2px solid #8bafdf; width: 100%; padding-bottom: 5px;">
                    Address History Continued
                </h4>
            </div>
            <div>
                <h6 class="just-color">
                    <p class="question-label">List any prior address in the THREE (3) years preceding the date of this
                        application, include street, city, state, and zip (NO PO BOXES)
                    </p>
                </h6>
            </div>
            <div id="addressSection">
                <div id="addressSon" class="mt-2" data-template-id="${addressCounter}">
                    <div class="address-container">
                        <div class="form-row">
                            <div>
                                <label class="question-label">Additional Address #${addressCounter}</label>
                                <input required type="text" autocomplete="off" name="address${addressCounter}" id="additionalAddress${addressCounter}"
                                    class="form-control" maxlength="200" onchange="updateProgress2('form2')" placeholder="Enter Text">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col">
                                <label class="question-label">City</label>
                                <input required type="text" name="city${addressCounter}" maxlength="50" autocomplete="off" id="additionalCity${addressCounter}"
                                    oninput="validInput(this, /^[a-zA-Z ]*$/, 'Only Letters are allowed.')"
                                    class="form-control"  maxlength="50" onchange="updateProgress2('form2')" placeholder="Enter Text" />
                                <small class="error-message"></small>
                            </div>
                            <div class="col">
                                <label class="question-label">State</label>
                                <select required data-validate="text" name="additionalState${addressCounter}" id="additionalState${addressCounter}" class="state-feild"
                                    >
                                    <option value="">Select One</option>
                                    <option value="Alabama">Alabama</option>
                                    <option value="Alaska">Alaska</option>
                                    <option value="Arizona">Arizona</option>
                                    <option value="Arkansas">Arkansas</option>
                                    <option value="California">California</option>
                                    <option value="Colorado">Colorado</option>
                                    <option value="Connecticut">Connecticut</option>
                                    <option value="Delaware">Delaware</option>
                                    <option value="Florida">Florida</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Hawaii">Hawaii</option>
                                    <option value="Idaho">Idaho</option>
                                    <option value="Illinois">Illinois</option>
                                    <option value="Indiana">Indiana</option>
                                    <option value="Iowa">Iowa</option>
                                    <option value="Kansas">Kansas</option>
                                    <option value="Kentucky">Kentucky</option>
                                    <option value="Louisiana">Louisiana</option>
                                    <option value="Maine">Maine</option>
                                    <option value="Maryland">Maryland</option>
                                    <option value="Massachusetts">Massachusetts</option>
                                    <option value="Michigan">Michigan</option>
                                    <option value="Minnesota">Minnesota</option>
                                    <option value="Mississippi">Mississippi</option>
                                    <option value="Missouri">Missouri</option>
                                    <option value="Montana">Montana</option>
                                    <option value="Nebraska">Nebraska</option>
                                    <option value="Nevada">Nevada</option>
                                    <option value="New Hampshire">New Hampshire</option>
                                    <option value="New Jersey">New Jersey</option>
                                    <option value="New Mexico">New Mexico</option>
                                    <option value="New York">New York</option>
                                    <option value="North Carolina">North Carolina</option>
                                    <option value="North Dakota">North Dakota</option>
                                    <option value="Ohio">Ohio</option>
                                    <option value="Oklahoma">Oklahoma</option>
                                    <option value="Oregon">Oregon</option>
                                    <option value="Pennsylvania">Pennsylvania</option>
                                    <option value="Rhode Island">Rhode Island</option>
                                    <option value="South Carolina">South Carolina</option>
                                    <option value="South Dakota">South Dakota</option>
                                    <option value="Tennessee">Tennessee</option>
                                    <option value="Texas">Texas</option>
                                    <option value="Utah">Utah</option>
                                    <option value="Vermont">Vermont</option>
                                    <option value="Virginia">Virginia</option>
                                    <option value="Washington">Washington</option>
                                    <option value="West Virginia">West Virginia</option>
                                    <option value="Wisconsin">Wisconsin</option>
                                    <option value="Wyoming">Wyoming</option>
                                </select>
                            </div>
                            <div class="col">
                                <label class="question-label">Zip</label>
                                <input required type="text" name="zip${addressCounter}" id="additionalZip${addressCounter}" autocomplete="off" maxlength="9"
                                    class="form-control" onchange="updateProgress2('form2')"
                                    oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.')"
                                    placeholder="Enter Number" />
                                <small class="error-message"></small>
                            </div>
                        </div>
                        <div class="form-row">
                            <div>
                                <label class="question-label">From</label>
                                <input required type="date"  class="dab form-control" id="addressFrom${addressCounter}" name="from${addressCounter}"
                                    oninput="handleDateChange2(event)" onchange="validateAddressHistory()">
                                <small class="error-message"></small>
                            </div>
                            <div>
                                <label class="question-label">To</label>
                                <input required type="date"  class="dab form-control" id="addressTo${addressCounter}" name="to${addressCounter}"
                                    oninput="handleDateChange2(event)" onchange="validateAddressHistory()">
                                <small class="error-message"></small>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        `;
        const mainContainer = document.getElementById('mainAddressContainer');
        mainContainer.appendChild(addressHistory);
        maxDate();
        caluclateTotalFeilds();
        addressCounter++;
    
}

function removeExtraAddressHistory(validContainerIndex) {
    const container = document.getElementById('mainAddressContainer');
    const forms = Array.from(container.querySelectorAll('[id^="subAddressContainer"]'));

    for (let i = forms.length - 1; i > validContainerIndex; i--) {
        forms[i].remove();
    }
}


// function removeHistoryElement() {
    
//         const Element = document.getElementById('Address1');
//         if (Element) {
//             addressCounter = 1;
//             console.log(addressCounter);
//             Element.remove();
        

//         caluclateTotalFeilds();
//     }


// }



function recalculateAddressIds() {
    const addressElements = document.querySelectorAll('#addressSon');
    if (addressElements.length > 0) {
        // Get the highest data-template-id among the remaining elements
        addressCounter = Math.max(...Array.from(addressElements).map(el => parseInt(el.dataset.templateId, 10)));
    } else {
        addressCounter = 1; // Reset if no elements exist
    }

}

function licenseAccepted(value) {
    if (value == 'no') {
        if (document.getElementById('denyExplanation')) {
            document.getElementById('denyExplanation').remove();
            caluclateTotalFeilds();
        }
    }
}
function licenseDenied(value) {
    if (value == 'yes') {
        const licenseElement = document.createElement('div');
        licenseElement.id = 'denyExplanation';
        licenseElement.classList.add('col-12');
        licenseElement.classList.add('mt-3');
        licenseElement.innerHTML = `
                    <label class="question-label">Disclosure</label>
                    <textarea maxlength="250" required id="licenseDenyExplanation" rows="4" class="form-control mt-2 txtfeild "></textarea>
                `;
        const MainContainer = document.getElementById('licenseContainer');
        MainContainer.appendChild(licenseElement);
        maxDate();
        caluclateTotalFeilds();
    }

}

function licenseSuspended(value) {
    if (value == 'yes') {
        const suspendExplain = document.createElement('div');
        suspendExplain.id = 'suspendedExplanation';
        suspendExplain.classList.add('col-12', 'mt-3');

        suspendExplain.innerHTML = `
                    <label class="question-label">Disclosure</label>
                    <textarea maxlength="250" required id="licenseSuspendedExplanation" rows="4" class="form-control mt-2 txtfeild "></textarea>
              `
        document.getElementById('suspendContainer').appendChild(suspendExplain);
        maxDate();
        caluclateTotalFeilds();


    }

}
function licenseNotSuspended(value) {
    if (value == 'no') {
        suspendExplainBox = document.getElementById('suspendedExplanation');
        if (suspendExplainBox) {
            suspendExplainBox.remove();
            caluclateTotalFeilds();
        }
    }
}


function handleDateChange2(event) {
    const input = event.target;
    const selectedDate = new Date(input.value);
    const year = selectedDate.getFullYear();
    const errorField = input.nextElementSibling;
    const thisYear = new Date().getFullYear();
    // input.setAttribute("max", today);
    if (!input.value) {
        return false;
    }
    if (year > thisYear || year < 1900) {
        input.classList.add('highlight');
        errorField.style.display = 'block';
        errorField.textContent = 'Invalid date. Please enter a valid Year.';

        return false;
    } else {
        input.classList.remove('highlight');
        errorField.style.display = 'none';
        errorField.style.display = 'none';
        return true


    }
}

function formatDateToDDMMYYYY(date) {
    if (!(date instanceof Date) || isNaN(date)) return "";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function validateAndFormatPhoneNumber(input) {
    let rawValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    const errorField = input.nextElementSibling; // Select the small tag for error messages

    // Truncate to 10 digits if input exceeds 10 characters
    if (rawValue.length > 10) {
        rawValue = rawValue.substring(0, 10);
    }

    // Handle empty input (allows clearing)
    if (rawValue.length === 0) {
        input.value = '';
        input.classList.add('highlight');
        errorField.textContent = 'Phone number must be exactly 10 digits.';
        errorField.style.display = 'block';
        return false;
    }

    // Validate and show error for invalid length
    if (rawValue.length !== 10) {
        input.classList.add('highlight');
        errorField.textContent = 'Phone number must be exactly 10 digits.';
        errorField.style.display = 'block';
        input.value = formatPhoneNumber(rawValue); // Format partial input for better UX
        return false;
    }

    // Clear error message if input is valid
    errorField.textContent = '';
    errorField.style.display = 'none';
    input.classList.remove('highlight');
    // Format and set the phone number
    input.value = formatPhoneNumber(rawValue);
    return true;
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
    if (!(regex instanceof RegExp)) {
        console.error("Invalid regex provided to validInput:", regex);
        return;
    }

    const value = input.value;
    const errorField = input.nextElementSibling;
    let trimmedValue = value;
    // Trim invalid characters (force only allowed characters)
    if (errorMessage == "Only Letters are allowed.") {
        trimmedValue = value.match(regex) ? value : value.replace(/[^a-zA-Z]/g, '');

    } else if (errorMessage == "Only numbers are allowed.") {
        trimmedValue = value.match(regex) ? value : value.replace(/[^0-9]/g, '');

        trimmedValue = value.replace(/[^0-9]/g, '');
    }
    if (value !== trimmedValue) {
        input.value = trimmedValue;
        if (errorField) {
            errorField.style.display = 'block';
            errorField.textContent = errorMessage;
        } // Set corrected value
    } else {
        input.classList.remove('highlight');
        if (errorField) {
            errorField.style.display = 'none';
        }
    }

    if (!regex.test(trimmedValue)) {
        input.classList.add('highlight');
        if (errorField) {
            errorField.style.display = 'block';
            errorField.textContent = errorMessage;
        }
        return false;
    } else {
        input.classList.remove('highlight');
        if (errorField) {
            errorField.style.display = 'none';
        }
        return true;
    }
}


function validateAndFormatSSN(input) {
    let rawValue = input.value.replace(/\D/g, ''); // Remove all non-numeric characters
    const errorField = input.nextElementSibling; // Select the small tag for error messages

    // Truncate to 9 digits if input exceeds 9 characters
    if (rawValue.length > 9) {
        rawValue = rawValue.substring(0, 9);
    }

    // Handle empty input (allows clearing)
    if (rawValue.length === 0) {
        input.value = '';
        input.classList.add('highlight');
        errorField.textContent = 'SSN must be exactly 9 digits.'; // Clear error message
        errorField.style.display = 'block';
        return false;
    }

    // Validate and show error for invalid length (less than 9 digits)
    if (rawValue.length !== 9) {
        input.classList.add('highlight');
        errorField.textContent = 'SSN must be exactly 9 digits.';
        errorField.style.display = 'block';
        input.value = formatSSN(rawValue); // Format partial input for better UX
        return false;
    }

    // Clear error message if input is valid
    input.classList.remove('highlight');
    errorField.textContent = '';
    errorField.style.display = 'none';

    // Format and set the SSN
    input.value = formatSSN(rawValue);
    return true;
}

function formatSSN(value) {
    if (value.length <= 3) {
        return value; // First 3 digits
    } else if (value.length <= 5) {
        return `${value.substring(0, 3)}-${value.substring(3)}`; // First 3 digits + dash + next 2 digits
    } else {
        return `${value.substring(0, 3)}-${value.substring(3, 5)}-${value.substring(5)}`; // xxx-xx-xxxx format
    }
}




function validatePage(formId, pageNumber) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    const canvases = currentPage.querySelectorAll('canvas');
    let isValid = true;

    inputs.forEach(input => {
        // Skip hidden inputs
        const isHidden = getComputedStyle(input).display === 'none' || input.closest('[style*="display: none"]');
        if (isHidden) {
            return;
        }

        const validateInput = () => {
            if (input.type === 'checkbox' && input.required) {
                const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                let isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                const endDateField = document.getElementById('companySeparation');
                toggleEmploymentDates();
                if (endDateField.required && input.id === 'stillEmployee') {
                    console.log("endDateField", endDateField.required);
                    // isAnyChecked = Array.from(checkboxes)
                    //     .filter(checkbox => checkbox.id !== 'stillEmployee') // Exclude 'stillEmployee'
                    //     .some(checkbox => checkbox.checked); 
                    return;
                }

                if (!isAnyChecked) {

                    isValid = false;
                    checkboxes.forEach(checkbox => checkbox.classList.add('highlight-feedback'));
                } else {
                    checkboxes.forEach(checkbox => checkbox.classList.remove('highlight-feedback'));
                }
            } else if (input.type === 'radio') {
                const radios = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(radios).some(radio => radio.checked);
                if (!isAnyChecked) {
                    isValid = false;
                    radios.forEach(radio => radio.classList.add('highlight-feedback'));
                } else {
                    radios.forEach(radio => radio.classList.remove('highlight-feedback'));
                }
            } else if (input.required) {
                if (input.tagName === 'SELECT' && !input.value) {
                    isValid = false;
                    input.classList.add('highlight');
                } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('highlight');
                } else if (input.value.trim()) {
                    input.classList.remove('highlight');
                } else {
                    isValid = false;
                    input.classList.add('highlight');
                }
                if (input.name === "home" || input.name === "supervisorNo") {
                    const isPhoneValid = validateAndFormatPhoneNumber(input);
                    if (!isPhoneValid) {
                        console.log('inside phone number', input.id, input.name)
                        isValid = false;
                    }
                }
                if (input.name === "ssn") {
                    const isSSNValid = validateAndFormatSSN(input);
                    if (!isSSNValid) {
                        console.log('inside ssn', input.id, input.name)
                        isValid = false;
                    }
                }
                if (input.type === "date") {
                    const errorField = input.nextElementSibling;
                    if (!handleDateChange2({ target: input })) {
                        isValid = false;
                        errorField.textContent = "Invalid date. Please enter a valid Date.";
                        if (input.id === "companySeparation" || input.id === "companyStart") {
                            errorField.textContent = "Please enter a valid Date.";
                        }
                        input.classList.add('highlight');
                        errorField.style.display = 'block';
                    } else {
                        input.classList.remove('highlight');
                        errorField.textContent = "";
                        errorField.style.display = 'none';
                    }
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

    canvases.forEach(canvas => {
        const context = canvas.getContext('2d');
        const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const isCanvasEmpty = !pixelData.some(value => value !== 0);

        if (isCanvasEmpty) {
            isValid = false;
            canvas.classList.add('highlight');
        } else {
            canvas.classList.remove('highlight');
        }
    });

    //return true;
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

function collectFormData(formId, pageNumber) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);

    if (!currentPage) {
        console.error(`Page ${pageNumber} not found inside form ${formId}`);
        return {};
    }

    const inputs = currentPage.querySelectorAll('input, select, textarea');
    let data = {};

    inputs.forEach(input => {
        // Ignore hidden fields
        //if (input.offsetParent === null) return;

        if (input.type === 'radio') {
            if (input.checked) {
                data[input.name] = input.value;
            }
        } else if (input.type === 'checkbox') {
            if (!data[input.name]) data[input.name] = [];
            if (input.checked) {
                data[input.name].push(input.value);
            }
        } else {
            data[input.name] = input.value.trim();
        }
    });

    console.log("Collected Data:", JSON.stringify(data, null, 2)); // Print data in JSON format
    return data;
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
                        <input required type="date"  class="dab" name="applicantdob-${violationCount}" id="voilationDate-${violationCount}" oninput="handleDateChange2(event)" onchange="updateProgress2('form2')">
                         <small class="error-message"></small>
                    </div>
                    <div class="col-12 mt-3">
                        <label class="question-label">Offence</label>
                        <input required type="text" data-validate="text" name="offence-${violationCount}" autocomplete="off" class="form-control"  maxlength="200" id="voilationOffence-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="col-12 mt-3 mb-3">
                        <label class="question-label">Location</label>
                        <input required type="text" data-validate="text" name="voilationLocation-${violationCount}" autocomplete="off" class="form-control"  maxlength="200" id="voilationLocation-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="mt-3 mb-2">
                        <label class="question-label">Type Of Vehicle Operated</label>
                        <div class="form-check col-12 mt-2">
                            <input class="form-check-input box" type="radio" required id="offenceCommercial-${violationCount}" name="offenceVehicle-${violationCount}" value="Commercial" onchange="updateProgress2('form2')">
                            <label class="form-check-label" for="offenceCommercial-${violationCount}" class="label ms-3">Commercial</label>
                        </div>
                        <div class="form-check col-12 mt-2">
                            <input class="form-check-input box" type="radio" required id="offencePrivate-${violationCount}" name="offenceVehicle-${violationCount}" value="Private" onchange="updateProgress2('form2')">
                            <label class="form-check-label"  for="offencePrivate-${violationCount}" class="label ms-3">Private</label>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex flex-column mt-2">
                    <label class="question-label">Do you have additional traffic violations to add?</label>
                    <div class="form-check d-flex align-items-end">
                        <input class="form-check-input" type="radio" required value="no" id="violationNo-${violationCount}" name="trafficVoilation-${violationCount}" onchange="handleRadioChange(event)">
                        <label class="form-check-label label ms-4" for="violationNo-${violationCount}">No</label>
                    </div>
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="radio" required value="yes" id="violationYes-${violationCount}" name="trafficVoilation-${violationCount}" onchange="handleRadioChange(event)">
                        <label class="form-check-label ms-4" for="violationYes-${violationCount}">Yes</label>
                    </div>
                </div>
            </div>
        `;

        // Append the new section
        container.insertAdjacentHTML("beforeend", template);
        maxDate();
        caluclateTotalFeilds();
    } else if (event.target.value === "no") {
        const currentViolation = event.target.closest(".violation-detail");

        if (!currentViolation) {
            // This is the first set of "Yes/No" buttons outside the .violation-detail
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            violationCount = 0;
            caluclateTotalFeilds();
            return;
        }

        const currentViolationIndex = parseInt(currentViolation.dataset.index);

        // Remove all subsequent violations
        const allViolations = Array.from(container.children);
        allViolations.forEach(violation => {
            const violationIndex = parseInt(violation.dataset.index);
            if (violationIndex > currentViolationIndex) {
                container.removeChild(violation);
                caluclateTotalFeilds();
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
                        <input required type="date"  class="dab" name="accidentDate-${accidentCount}" id="accidentDate-${accidentCount}" oninput="handleDateChange2(event)" placeholder="MM/DD/YYYY" onchange="updateProgress2('form2')">
                         <small class="error-message"></small>
                    </div>

                    <div class="col-12 d-flex flex-column mt-4">
                        <div>
                            <label class="question-label">Fatalities or Personal Injuries</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" required value="no" id="fatalities-${accidentCount}" name="fatalities-${accidentCount}" onchange="updateProgress2('form2')">
                            <label class="form-check-label label ms-4" for="fatalities-${accidentCount}">Fatalities</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" required value="yes" id="injuries-${accidentCount}" name="fatalities-${accidentCount}" onchange="updateProgress2('form2')">
                            <label class="form-check-label ms-4" for="injuries-${accidentCount}">Personal Injuries</label>
                        </div>
                        <div class="col-12 mt-4">
                            <label class="question-label">Circumstances of Accident</label>
                            <textarea maxlength="250" required name="circumstances-${accidentCount}" id="accidentExplanation-${accidentCount}" rows="4" class="form-control mt-2 txtfeild"></textarea>
                        </div>
                        <div class="mb-3 mt-4">
                            <label class="question-label">Attachment (Optional)</label>
                            <input type="file" id="fileInput-${accidentCount}" class="form-control mt-2" />
                        </div>
                    </div>
                </div>
                    <div class="col-12 d-flex flex-column mt-2">
                        <label class="question-label">Do you have additional accidents to add?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" required value="no" id="accidentNo-${accidentCount}" name="additionalAccident-${accidentCount}" onchange="handleAccidentChange(event)">
                            <label class="form-check-label label ms-4" for="accidentNo-${accidentCount}">No</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" required value="yes" id="accidentYes-${accidentCount}" name="additionalAccident-${accidentCount}" onchange="handleAccidentChange(event)">
                            <label class="form-check-label ms-4" for="accidentYes-${accidentCount}">Yes</label>
                        </div>
                    </div>
            </div>
        `;

        // Append the new accident detail template
        container.insertAdjacentHTML("beforeend", template);
        maxDate();
        caluclateTotalFeilds();
    } else if (event.target.value === "no") {
        const currentAccident = event.target.closest(".accident-detail");

        if (!currentAccident) {
            // This is the first set of "Yes/No" buttons outside the .accident-detail
            while (container.firstChild) {
                container.removeChild(container.firstChild);
                caluclateTotalFeilds();
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
                caluclateTotalFeilds();
            }
        });

        // Update the accidentCount to match the remaining accidents
        accidentCount = currentAccidentIndex;
    }
}
//<------------------------------------------------------------------PAGE 6---------------------------------->

function militaryDriver(value) {
    if (value == 'yes') {
        const militaryElement = document.createElement('div');
        militaryElement.id = 'fmcsa';
        militaryElement.innerHTML = `
                <div class="address-container mt-4" id="section1">
                    <label class="question-label">Straight Truck (check all that apply)</label>
                    <div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox ">
                                <input class="form-check-input " type="checkbox" required id="truckVan" name="straightTruck"
                                    value="Van" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="truckVan">Van</label>
                            </div>
                        </div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="truckBox" name="straightTruck"
                                    value="Box" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="truckBox">Box</label>
                            </div>
                        </div>

                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox ">
                                <input class="form-check-input " type="checkbox" required id="truckFlat" name="straightTruck"
                                    value="Flat Bed" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="truckFlat">Flat Bed</label>
                            </div>
                        </div>

                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="truckBucket" name="straightTruck"
                                    value="Bucket or Auger" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="truckBucket">Bucket or Auger</label>
                            </div>
                        </div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="truckTanker" name="straightTruck"
                                    value="tanker" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="truckTanker">Tanker</label>
                            </div>
                        </div>

                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="otherService" name="straightTruck"
                                    value="Other Utility Service" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="otherService">Other Utility Service</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3 mb-3">
                        <div class="col">
                            <label class="question-label">From</label>

                            <input required type="date"  class="dab form-control " id="fromDateTruck" name="truckFrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateTruck" name="truckto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control"  maxlength="15" id="approxMilesTruck" name="truckmiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.')">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>

                <div class="address-container mt-4" id="section2">
                    <label class="question-label">Tractor & Semi-Trailer (check all that apply)</label>
                    <div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox ">
                                <input class="form-check-input " type="checkbox" required id="tractorBox" name="tractor"
                                    value="Box Trailer" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="tractorbox">Box trailer</label>
                            </div>
                        </div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="tractorFlat" name="tractor"
                                    value="Flat Trailer" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="tractorFlat">Flat trailer</label>
                            </div>
                        </div>

                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox ">
                                <input class="form-check-input " type="checkbox" required id="truckFlat" name="tractor"
                                    value="Tank trailer" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="truckFlat">Tank trailer</label>
                            </div>
                        </div>

                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="tractorBucket" name="tractor"
                                    value="Bucket or Auger" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="tractorBucket">Bucket or Auger</label>
                            </div>
                        </div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="tractorMulti" name="tractor"
                                    value="Multi-trailer" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="tractorMulti">Multi-trailer</label>
                            </div>
                        </div>

                    </div>

                    <div class="row mt-3 mb-3">
                        <div class="col">
                            <label class="question-label">From</label>

                            <input required type="date"  class="dab form-control " id="fromDateTractor" name="tractorFrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateTractor" name="tractorto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control" maxlength="15" id="approxMilesTractor" name="tractormiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.')" >
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>

                <div class="address-container mt-4" id="section3">
                    <label class="question-label">Bus or Passenger Van (check all that apply)</label>
                    <div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox ">
                                <input class="form-check-input " type="checkbox" required id="busHire" name="bus"
                                    value="8passengers" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="busHire">For hire ,greater than 8passengers</label>
                            </div>
                        </div>
                        <div class=" form-check col-12 mt-2">
                            <div class="checkbox">
                                <input class="form-check-input " type="checkbox" required id="busShuttle" name="bus"
                                    value="15passengers" onchange="updateProgress2('form2')">
                            </div>
                            <div class="label ms-3">
                                <label class="form-check-label"  for="busShuttle">Private or Shuttle ,greater thsn 15passengers</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3 mb-3">
                        <div class="col">
                            <label class="question-label">From</label>

                            <input required type="date"  class="dab form-control " id="fromDateBus" name="busFrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateBus" name="busto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="" class="form-control" id="approxMilesBus" name="busmiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.')">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>
                <div class="address-container mt-4" id="section4">

                    <div class="col-12 mt-2">
                        <label class="question-label">Other commercial motor vehicles (list)</label>
                        <textarea maxlength="250" required name="defectiveVisionExplanation" id="otherVehicles" rows="4"
                            class="form-control mt-2 txtfeild "></textarea>
                    </div>


                    <div class="row mt-3 mb-3">
                        <div class="col">
                            <label class="question-label">From</label>

                            <input required type="date"  class="dab form-control " id="fromDateOther" name="otherfrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateOther" name="otherto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="number" class="form-control" id="approxMilesOther" name="othermiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.')">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div> `
        document.getElementById('militaryDriving').appendChild(militaryElement);
        maxDate();
        addSectionListener();
        caluclateTotalFeilds();
    }
}
function notMilitaryDriver(value) {
    if (value == 'no') {
        militaryElement = document.getElementById('fmcsa');
        if (militaryElement) {
            militaryElement.remove();
            caluclateTotalFeilds();
        }


    }
}
function addSectionListener() {
    const sections = document.querySelectorAll("[id^='section']");
    sections.forEach(section => {
        const inputs = section.querySelectorAll("input,textarea");
        inputs.forEach(input => {
            input.addEventListener("input", checkSections);
        });
    });
}


function checkSections() {
    const sections = document.querySelectorAll("[id^='section']");
    let lastFilledSection = null;

    for (const section of sections) {
        const inputs = section.querySelectorAll("textarea");

        // Separate checkboxes and other input fields
        const checkboxes = Array.from(section.querySelectorAll("input[type='checkbox']")).filter(input => input.type === "checkbox");

        const dateFrom = section.querySelector("input[id*='fromDate']");
        const dateTo = section.querySelector("input[id*='toDate']");
        const milesInput = section.querySelector("input[id*='approxMiles']");
        console.log("after getting date feilds  ", section.id);
        dateFeilds = false;
        if ((dateFrom && dateTo) && (dateFrom.value && dateTo.value)) {
            dateFeilds = true;
            milesInput?.classList.remove('highlight');
            milesInput?.removeAttribute("required");
            dateFrom?.setAttribute("required", "true");
            dateTo?.setAttribute("required", "true");
        } else if (milesInput && milesInput.value) {
            dateFeilds = true;
            console.log("MilesInput");
            milesInput?.setAttribute("required", "true");
            dateFrom?.removeAttribute("required");
            dateTo?.removeAttribute("required");

        }


        const atLeastOneCheckboxChecked = checkboxes.length > 0 ? checkboxes.some(input => input.checked) : true;
        console.log("checkboxes ", checkboxes);
        if (section.id === 'section4') {
            const textInputs = [...inputs].filter(input => input.type !== "checkbox");
            const allTextFieldsFilled = textInputs.every(input => input.value.trim() !== "");

            if (allTextFieldsFilled && atLeastOneCheckboxChecked && dateFeilds) {
                lastFilledSection = section;
                console.log("Filled Section:", lastFilledSection.id);
                removeDateHighlight(dateFrom);
                removeDateHighlight(dateTo);
                break;
            } else {

                lastFilledSection = null;
            }

        } else if (atLeastOneCheckboxChecked && dateFeilds) {
            lastFilledSection = section;
            removeDateHighlight(dateFrom);
            removeDateHighlight(dateTo);
            break;

        } else {
            console.log("Entered in Else Block");
            lastFilledSection = null;


        }


    };

    // Ensure only ONE section is marked as filled and enforce "required" attributes accordingly
    sections.forEach(section => {
        let inputs = section.querySelectorAll("input, textarea");

        if (lastFilledSection && section.id !== lastFilledSection.id) {
            // Remove 'required' from other sections
            inputs.forEach(input => {
                input.removeAttribute("required");
                input.classList.remove('highlight');
                input.classList.remove('highlight-feedback');


                if (input.type === 'date') {
                    const errorField = input.nextElementSibling;
                    input.classList.remove('highlight');
                    errorField.textContent = "";
                    errorField.style.display = 'none';
                }
            });
        }
        else {
            if (lastFilledSection && section.id == lastFilledSection.id) {
                inputs = [...section.querySelectorAll("input, textarea")].filter(input => (input.type === "checkbox" || input.tagName === 'TEXTAREA'));
            }

            inputs.forEach(input => {
                if (!input.hasAttribute("required")) {
                    input.setAttribute("required", "true");
                }
            });
        }
    });
}

function removeDateHighlight(input) {

    const errorField = input.nextElementSibling;
    input.classList.remove('highlight');
    errorField.textContent = "";
    errorField.style.display = 'none';
};

// <------------------------------------------------------------------PAGE 7--------------------------------->


function addNewEmploymentForm() {
    formCounter++; // Increment the counter for new forms


    // Find the template form
    const template = document.getElementById('employmentForm_1');

    // Clone the form
    const newForm = template.cloneNode(true);

    // Remove dynamically generated unemployment sections before cloning
    const dynamicSections = newForm.querySelectorAll('[id^="unemployReason"],[id^="notApplicable"],[id^="checkDot"]');
    dynamicSections.forEach((section) => section.remove());




    // Update the ID of the cloned form
    newForm.id = `employmentForm_${formCounter}`;

    // Update IDs, names, and 'for' attributes for input, textarea, select, label, and div elements
    const elements = newForm.querySelectorAll('input, textarea, select, label, div');
    elements.forEach((element) => {
        if (element.id) {
            element.id = `${element.id}_${formCounter}`; // Update IDs
        }

        if (element.name) {
            element.name = `${element.name}_${formCounter}`; // Update names
        }

        if (element.tagName === "LABEL" && element.getAttribute("for")) {
            element.setAttribute("for", `${element.getAttribute("for")}_${formCounter}`); // Update 'for'
        }
    });

    // Clear values for inputs and textareas
    newForm.querySelectorAll('input, textarea').forEach((field) => {
        if (field.type !== "radio" && field.type !== "checkbox") {
            field.value = ''; // Clear text fields
        } else {
            field.checked = false; // Uncheck radios and checkboxes
        }
    });

    const container = document.getElementById('employmentFormsContainer');
    container.appendChild(newForm);
    maxDate();


    validateEmploymentHistory();
    caluclateTotalFeilds();
}



function clearAdditionalForms(currentFormId) {
    const container = document.getElementById('employmentFormsContainer');

    // Extract the form number from the current form's ID
    const currentFormNumber = parseInt(currentFormId.split('_')[1]);

    // Find all dynamically added forms
    const forms = container.querySelectorAll('[id^="employmentForm"]');

    // Loop through forms and delete those with a higher index
    forms.forEach((form) => {
        const formNumber = parseInt(form.id.split('_')[1]);

        if (formNumber > currentFormNumber) {
            form.remove();
            caluclateTotalFeilds();
        }
    });

    // Recalculate the formCounter to the maximum remaining form number
    const remainingForms = container.querySelectorAll('[id^="employmentForm"]');
    if (remainingForms.length > 0) {
        // Find the highest index among remaining forms
        formCounter = Math.max(
            ...Array.from(remainingForms).map((form) =>
                parseInt(form.id.split('_')[1])
            )
        );
    } else {
        // Reset to 1 if no forms remain
        formCounter = 1;
    }

    validateEmploymentHistory();
    caluclateTotalFeilds();

}

function addDotMode(presentId, value) {
    if (value == 'yes') {
        const dotNumber = parseInt((presentId.split('_')[1]));
        const dotMode = document.createElement('div');
        dotMode.classList.add('col-12', 'mt-3')
        dotMode.id = `checkDot${(dotNumber) ? ('_' + dotNumber) : ''}`;
        dotMode.innerHTML = `     <label class="question-label">Check the DotMode Below</label>
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox ">
                                            <input class="form-check-input box" type="radio" required id="dotFMCSA" name="dotMode"
                                                value="FMCSA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFMCSA">FMCSA</label>
                                        </div>
                                    </div>
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotPHMSA" name="dotMode"
                                                value="PHMSA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotPHMSA">PHMSA</label>
                                        </div>
                                    </div>
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox ">
                                            <input class="form-check-input box" type="radio" required id="dotFAA" name="dotMode"
                                                value="FAA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFAA">FAA</label>
                                        </div>
                                    </div>
    
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotFTA" name="dotMode"
                                                value="FTA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFTA">FTA</label>
                                        </div>
                                    </div>
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotFRA" name="dotMode"
                                                value="FRA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFRA">FRA</label>
                                        </div>
                                    </div>
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotUSCG" name="dotMode"
                                                value="USCG" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotUSCG">USCG</label>
                                        </div>
                                    </div>
                                    <div class="col-12 d-flex flex-column mt-3">
                                        <div>
                                            <p class="question-label">Your current Employer will be contacted before the end of
                                                the
                                                background investigation. Please indicate your preference as to when you would
                                                like
                                                the
                                                background investigator to contact your current employer.</p>
                                        </div>
                                        <div class="form-check" d-flex align-items-end>
                                            <input class="form-check-input" type="radio" required value="yes" id="verifyYes"
                                                name="verify" onchange="updateProgress2('form2')">
                                            <label class="form-check-label ms-4" for="verifyYes">
                                                By checking this box, I give my permission for my current employment to be
                                                verified
                                                immediately.
                                            </label>
                                        </div>
        
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="radio" required value="no" id="verifyNo" name="verify"
                                                onchange="updateProgress2('form2')">
                                            <label class="form-check-label ms-4" for="verifyNo">
                                                I would like the background investigator to wait until the very end of the
                                                investigation
                                                and
                                                would like them to notify me before contacting my current employer. I understand
                                                that by
                                                checking this box, the background investigation could be delayed as a result.
                                            </label>
                                        </div>
                                    </div>`
        document.getElementById(presentId).appendChild(dotMode);
        maxDate();
        caluclateTotalFeilds();

    }
}
function removeDotMode(presentId, value) {
    if (value == 'no') {
        removeNumber = parseInt(presentId.split('_')[1]);
        const removeDot = document.getElementById(`checkDot${(removeNumber) ? ('_' + removeNumber) : ''}`);
        if (removeDot) {
            removeDot.remove();
            caluclateTotalFeilds();
        }
        else {
        }
    }
}



function addUnemployment(presentId, value) {
    if (value == 'yes') {
        unemployNumber = parseInt(presentId.split('_')[1]);
        const unemploy = document.createElement('div');
        unemploy.id = `unemployReason${(unemployNumber) ? ('_' + unemployNumber) : ''}`;
        unemploy.innerHTML = `        <div class="form-row mt-3">
                                    <div>
                                        <label class="question-label">Unemployed From</label>

                                        <input required type="date"  class="dab form-control " id="unemployedFrom"
                                            name="unemployment" onchange="handleDateChange2(event)">
                                        <small class="error-message"></small>
                                    </div>
                                    <div>
                                        <label class="question-label"> Unemployed To</label>
                                        <input required type="date"  class="to form-control" id="unemployedTo "
                                            name="unemployment" onchange="handleDateChange2(event)">
                                        <small class="error-message"></small>
                                    </div>
                                </div>

                                <div class="col-12 mt-4">
                                    <label class="question-label">Reason for Unemployment</label>
                                    <textarea maxlength="250" required required name="unemploymentReason" id="unemployReason" placeholder="Enter Text"
                                        rows="4" class="form-control mt-2 txtfeild"></textarea>
                                </div>`
        document.getElementById(presentId).appendChild(unemploy);
        maxDate();
        caluclateTotalFeilds();
    }
}

function removeUnemployment(presentId, value) {
    if (value == 'no') {
        reasonNumber = parseInt((presentId.split('_')[1]));
        const reasonbox = document.getElementById(`unemployReason${(reasonNumber) ? ('_' + reasonNumber) : ''}`)
        if (reasonbox) {
            reasonbox.remove();
            caluclateTotalFeilds();
        }
    }
}



function validateEmploymentHistory() {
    const container = document.getElementById('employmentFormsContainer');
    const forms = container.querySelectorAll('[id^="employmentForm"]');
    const currentlyEmployed = document.getElementById('stillEmployee');

    let earliestStartDate = null;
    let latestEndDate = null;
    if (currentlyEmployed.checked) {
        latestEndDate = new Date();

    }

    forms.forEach((form) => {
        const startDateField = form.querySelector('[id^="companyStart"]');
        const endDateField = form.querySelector('[id^="companySeparation"]');

        const startDate = startDateField ? new Date(startDateField.value) : null;
        const endDate = endDateField ? new Date(endDateField.value) : null;

        if (startDate && !isNaN(startDate)) {
            if (!earliestStartDate || startDate < earliestStartDate) {
                earliestStartDate = startDate;
            }
        }

        if (endDate && !isNaN(endDate)) {
            if (!latestEndDate || endDate > latestEndDate) {
                latestEndDate = endDate;
            }
        }
    });

    if (earliestStartDate && latestEndDate) {
        totalYears = (latestEndDate - earliestStartDate) / (1000 * 60 * 60 * 24 * 365);

        if (totalYears < 10) {
            addEmploymentValidation();
        } else {
            removeEmploymentValidation();
        }
    } else {
        addEmploymentValidation();
    }
}

function toggleEmploymentDates() {
    const stillEmployeeCheckbox = document.getElementById('stillEmployee');
    // const startDateField = document.getElementById('companyStart');
    const endDateField = document.getElementById('companySeparation');
    const errorField = endDateField.nextElementSibling;

    if (stillEmployeeCheckbox.checked) {
        // const currentDate = new Date();
        // const startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 10));
        // startDateField.value = startDate.toISOString().split('T')[0];

        endDateField.value = '';
        endDateField.classList.remove('highlight');
        endDateField.removeAttribute("required");
        errorField.textContent = "";
        errorField.style.display = 'none';
    } else {
        // startDateField.value = '';
        // endDateField.value = '';
        errorField.textContent = "Please enter a valid date";
        endDateField.classList.add('highlight');
        errorField.style.display = 'block';
        endDateField.setAttribute("required", "true");
    }

    validateEmploymentHistory();
}

function addEmploymentValidation() {
    if (!(document.getElementById('reasonBox'))) {
        const reasonForm = document.createElement('div');
        reasonForm.classList.add('reasonDiv', 'mt-3');
        reasonForm.id = 'reasonBox';
        reasonForm.innerHTML = `                
                <div class="warnDiv">
                    <p class="warning">
                        you have not provided TEN (10) years of employment history please provide the reason below
                    </p>
                </div>
                <div class="col-12 mt-4">
                    <label class="question-label">Reason for not meeting the TEN (10) years of employment history
                        requirement.</label>
                    <textarea maxlength="250" required name="employHistoryReason" id="employHistroy" placeholder="Enter Text" rows="4"
                        class="form-control mt-2 txtfeild"></textarea>
                </div>`;
        const mainContainer = document.getElementById('histroyValidator');
        mainContainer.appendChild(reasonForm);
        maxDate();
        caluclateTotalFeilds();
    }
}

function removeEmploymentValidation() {
    const reasonBox = document.getElementById('reasonBox');
    if (reasonBox) {
        reasonBox.remove();
        caluclateTotalFeilds();
    }
}




var canvas, context;
var isDrawing = false;
var signatureData;


function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}



function initializeSignatureBox() {

    canvas = document.getElementById('signBox');

    if (!canvas) {
        console.error("Canvas element not found. Ensure it's visible in the DOM.");
        return;
    }

    context = canvas.getContext('2d');
    context.lineWidth = 0.3;
    context.lineCap = "round";
    context.strokeStyle = "white";


    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        context.beginPath();
        const pos = getMousePosition(event);
        context.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const pos = getMousePosition(event);
            context.lineTo(pos.x, pos.y);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
        saveSign();
    });

}


function clearSign() {
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            console.error("Signature box is not initialized.");
        }
    });
}

function saveSign() {
    if (canvas) {
        signatureData = canvas.toDataURL('image/png');

    } else {
        console.error("Signature box is not initialized.");
    }
}

function showInvalidModal() {
    const invalidModal = document.getElementById('invalidModal');
    const overlay = document.getElementById('overlay3');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('overlay3');
    const invalidModal = document.getElementById('invalidModal');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function addForm2EventListeners() {
    const form1SubmitButton = document.querySelector('.submit-btn');
    if (form1SubmitButton) {
        form1SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (validatePage('form2', 9)) {

                showCheckmark('form3Tick');
                showSuccessModal();
                form1Completed = true;
            }
            else {
                showInvalidModal();
                hideCheckmark('form3Tick');
            }
        });
    }
}

function showSuccessModal() {
    if (validatePage('form2', 9)) {
        const successModal = document.getElementById('successModal3');
        const overlay = document.getElementById('overlay3');
        if (successModal && overlay) {
            successModal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    else {
        showInvalidModal();
    }

}




function closeDialog() {
    const successModal = document.getElementById('successModal3');
    const overlay = document.getElementById('overlay3');
    if (successModal && overlay) {
        successModal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}



function showCheckmark(formId) {
    const checkmark = document.getElementById(formId);
    if (checkmark) {
        checkmark.classList.add('visible');
    }
}


function hideCheckmark(formId) {
    const checkmark = document.getElementById(formId);
    if (checkmark) {
        checkmark.classList.remove('visible');
    }
}

function loadForm4(id) {
    const modalContent = document.getElementById(id);
    const overlay = document.getElementById('overlay3');
    if (modalContent && overlay) {
        modalContent.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    fetch('../form4/form4.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form4/form4.js');
            loadStyleSheet("../form4/form4.css");
            removeStyleSheet('../form3/form3.css');
            document.body.style.overflow = 'auto';
            // addForm1EventListeners();
        })
        .catch(error => console.error('Error loading Form 1:', error));
}
function loadStyleSheet(href) {
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

// Function to remove a CSS file
function removeStyleSheet(href) {
    const link = document.querySelector(`link[href="${href}"]`);
    if (link) {
        link.parentNode.removeChild(link);
    }
}
function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}

initializeForm2('form2');