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
            validateEmploymentHistory();
        }
        if (pageNumber - 1 == 7) {
            if (totalYears >= 10) {
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

function initializeForm2(formId) {
    totalPages2 = document.querySelectorAll(`#${formId} .form-page2 `).length;

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



let addressCounter = 1; // Counter for unique IDs

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

        // Reset inputs in the cloned template
        newTemplate.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(el => el.value = '');
        newTemplate.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
        newTemplate.querySelectorAll('select').forEach(el => el.value = '');

        // Append the new template
        addressCounter++;
        console.log(addressCounter);
        addressSection.appendChild(newTemplate);
    
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

// Main function to handle initial Yes/No for address history
function addressHistory(value) {
    if (value === 'yes') {
        const addressHistory = document.createElement('div');
        addressHistory.id = `Address1`;
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
                                    class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col">
                                <label class="question-label">City</label>
                                <input required type="text" name="city${addressCounter}" maxlength="50" autocomplete="off" id="additionalCity${addressCounter}"
                                    oninput="validInput(this, /^[a-zA-Z ]*$/, 'Only letters are allowed')"
                                    class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text" />
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
                                <input required type="number" name="zip${addressCounter}" id="additionalZip${addressCounter}" autocomplete="off" maxlength="6"
                                    class="form-control" onchange="updateProgress2('form2')"
                                    oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed')"
                                    placeholder="Enter Number" />
                                <small class="error-message"></small>
                            </div>
                        </div>
                        <div class="form-row">
                            <div>
                                <label class="question-label">From</label>
                                <input required type="date" class="dab form-control" id="additionalFrom${addressCounter}" name="from${addressCounter}"
                                    onchange="handleDateChange2(event)">
                                <small class="error-message"></small>
                            </div>
                            <div>
                                <label class="question-label">To</label>
                                <input required type="date" class="dab form-control" id="additionalTo${addressCounter}" name="to${addressCounter}"
                                    onchange="handleDateChange2(event)">
                                <small class="error-message"></small>
                            </div>
                        </div>

                    </div>
                                            <div class="mt-3">
                            <h6 class="just-color">
                                <p class="question-label">Did you have additional prior address to add?</p>
                            </h6>
                            <div class="col-12 d-flex flex-column mt-2">
                                <div class="form-check" d-flex align-items-end>
                                    <input class="form-check-input" type="radio" required value="no" id="addressNo${addressCounter}" name="Adress${addressCounter}"
                                        onchange="handleAddressChange(this)">
                                    <label class="form-check-label label ms-4" for="addressNo${addressCounter}">
                                        No
                                    </label>
                                </div>
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="radio" required value="yes" id="addressYes${addressCounter}" name="Adress${addressCounter}"
                                        onchange="handleAddressChange(this)">
                                    <label class="form-check-label ms-4" for="addressYes${addressCounter}">
                                        Yes
                                    </label>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        `;
        const mainContainer = document.getElementById('mainAddressContainer');
        mainContainer.appendChild(addressHistory);
        caluclateTotalFeilds();
    }
}

function removeHistoryElement(value) {
    if (value == 'no') {
        const Element = document.getElementById('Address1');
        if (Element) {
            addressCounter=1;
               console.log(addressCounter);
            Element.remove();
        }
  
        caluclateTotalFeilds();
    }


}

// function recalculateAddressIds() {
//     const addressElements = document.querySelectorAll('#addressSon');
//     if (addressElements.length > 0) {
//         // Get the highest data-template-id among the remaining elements
//         addressCounter = Math.max(...Array.from(addressElements).map(el => parseInt(el.dataset.templateId, 10)));
//     } else {
//         addressCounter = 1; // Reset if no elements exist
//     }

// }

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
                    <textarea required id="licenseDenyExplanation" rows="4" class="form-control mt-2 txtfeild "></textarea>
                `;
        const MainContainer = document.getElementById('licenseContainer');
        MainContainer.appendChild(licenseElement);
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
                    <textarea required id="licenseSuspendedExplanation" rows="4" class="form-control mt-2 txtfeild "></textarea>
              `
        document.getElementById('suspendContainer').appendChild(suspendExplain);
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

// function toggleFields2(formId, config) {
//     config.forEach(({ radioId, fieldsToShow }) => {
//         const radiobut = document.getElementById(radioId);

//         fieldsToShow.forEach(fieldId => {
//             const fieldElement = document.getElementById(fieldId);
//             const childElements = fieldElement.querySelectorAll('*');
//             const childIds = Array.from(childElements)
//                 .filter(element => element.id)
//                 .map(element => element.id);



//             if (radiobut && radiobut.checked) {
//                 fieldElement.style.display = 'block';
//                 document.getElementById(childIds[0]).required = true;
//                 document.getElementById(childIds[0]).style.display = 'block';
//             }
//             else {
//                 fieldElement.style.display = 'none';
//                 document.getElementById(childIds[0]).required = false;
//                 document.getElementById(childIds[0]).style.display = 'none';


//             }
//         });
//     });

//     updateProgress2(formId);
// }



// const toggleFieldsConfig2 = [

//     {
//         radioId: "militaryYes",
//         fieldsToShow: ["fmcsa"]
//     }

// ]





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
        errorField.textContent = ''; // Clear error message
        errorField.style.display = 'none';
        return;
    }

    // Validate and show error for invalid length
    if (rawValue.length !== 10) {
        errorField.textContent = 'Phone number must be exactly 10 digits.';
        errorField.style.display = 'block';
        input.value = formatPhoneNumber(rawValue); // Format partial input for better UX
        return;
    }

    // Clear error message if input is valid
    errorField.textContent = '';
    errorField.style.display = 'none';

    // Format and set the phone number
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
        errorField.textContent = ''; // Clear error message
        errorField.style.display = 'none';
        return;
    }

    // Validate and show error for invalid length (less than 9 digits)
    if (rawValue.length !== 9) {
        errorField.textContent = 'SSN must be exactly 9 digits.';
        errorField.style.display = 'block';
        input.value = formatSSN(rawValue); // Format partial input for better UX
        return;
    }

    // Clear error message if input is valid
    errorField.textContent = '';
    errorField.style.display = 'none';

    // Format and set the SSN
    input.value = formatSSN(rawValue);
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



// function validatePage(formId, pageNumber) {

//     const form = document.getElementById(formId);
//     const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
//     const inputs = currentPage.querySelectorAll('input, select, textarea');
//     const canvases = currentPage.querySelectorAll('canvas');
//     let isValid = true;


//     const validationRules = {
//         text: { regex: /^[a-zA-Z\s]*$/, errorMessage: 'Only letters are allowed' },
//         number: { regex: /^[0-9]*$/, errorMessage: 'Only numbers are allowed' }

//     };


//     inputs.forEach(input => {
//     const validateInput = () => {
//                     if (input.type === 'checkbox') {
//                         const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
//                         const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

//                         if (!isAnyChecked) {
//                             isValid = false;
//                             checkboxes.forEach(checkbox => checkbox.classList.add('highlight-feedback'));
//                         } else {
//                             checkboxes.forEach(checkbox => checkbox.classList.remove('highlight-feedback'));
//                         }
//                     } else if (input.required) {
//                         if (input.tagName === 'SELECT' && !input.value) {
//                             isValid = false;
//                             input.classList.add('highlight');
//                         } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
//                             isValid = false;
//                             input.classList.add('highlight');
//                         } else if (input.value.trim()) {
//                             input.classList.remove('highlight');
//                         } else {
//                             isValid = false;
//                             input.classList.add('highlight');
//                         }
//                     } else {
//                         input.classList.remove('highlight');
//                     }
//                 };


//                 input.addEventListener('input', validateInput);
//                 if (input.tagName === 'SELECT') {
//                     input.addEventListener('change', validateInput);
//                 }


//                 validateInput();
//             });




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
            if (input.type === 'checkbox') {
                const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

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
                        <input required type="date" class="dab" name="applicantdob-${violationCount}" id="voilationDate-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="col-12 mt-3">
                        <label class="question-label">Offence</label>
                        <input required type="text" data-validate="text" name="offence-${violationCount}" autocomplete="off" class="form-control" id="voilationOffence-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="col-12 mt-3 mb-3">
                        <label class="question-label">Location</label>
                        <input required type="text" data-validate="text" name="voilationLocation-${violationCount}" autocomplete="off" class="form-control" id="voilationLocation-${violationCount}" onchange="updateProgress2('form2')">
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
                        <input required type="date" class="dab" name="accidentDate-${accidentCount}" id="accidentDate-${accidentCount}" oninput="handleDateChange2(event)" placeholder="MM/DD/YYYY" onchange="updateProgress2('form2')">
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
                            <textarea required name="circumstances-${accidentCount}" id="accidentExplanation-${accidentCount}" rows="4" class="form-control mt-2 txtfeild"></textarea>
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
                <div class="address-container mt-4">
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

                            <input required type="date" class="dab form-control " id="truckFrom" name="truckFrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date" class="form-control" id="truckTo" name="truckto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control" id="truckMiles " name="truckmiles"
                                placeholder="Enter number" onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>

                <div class="address-container mt-4">
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

                            <input required type="date" class="dab form-control " id="tractorFrom" name="tractorFrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date" class="form-control" id="tractorTo" name="tractorto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control" id="tractorMiles " name="tractormiles"
                                placeholder="Enter number" onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>

                <div class="address-container mt-4">
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

                            <input required type="date" class="dab form-control " id="busFrom" name="busFrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date" class="form-control" id="busTo" name="busto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control" id="busMiles " name="busmiles"
                                placeholder="Enter number" onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>
                <div class="address-container mt-4">

                    <div class="col-12 mt-2">
                        <label class="question-label">Other commercial motor vehicles (list)</label>
                        <textarea required name="defectiveVisionExplanation" id="otherVehicles" rows="4"
                            class="form-control mt-2 txtfeild "></textarea>
                    </div>


                    <div class="row mt-3 mb-3">
                        <div class="col">
                            <label class="question-label">From</label>

                            <input required type="date" class="dab form-control " id="otherFrom" name="otherfrom"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date" class="form-control" id="otherTo" name="otherto"
                                onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control" id="otherMiles " name="othermiles"
                                placeholder="Enter number" onchange="handleDateChange2(event)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div> `
        document.getElementById('militaryDriving').appendChild(militaryElement);
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

                                        <input required type="date" class="dab form-control " id="unemployedFrom"
                                            name="unemployment" onchange="handleDateChange2(event)">
                                        <small class="error-message"></small>
                                    </div>
                                    <div>
                                        <label class="question-label"> Unemployed To</label>
                                        <input required type="date" class="to form-control" id="unemployedTo "
                                            name="unemployment" onchange="handleDateChange2(event)">
                                        <small class="error-message"></small>
                                    </div>
                                </div>

                                <div class="col-12 mt-4">
                                    <label class="question-label">Reason for Unemployment</label>
                                    <textarea required required name="unemploymentReason" id="unemployReason" placeholder="Enter Text"
                                        rows="4" class="form-control mt-2 txtfeild"></textarea>
                                </div>`
        document.getElementById(presentId).appendChild(unemploy);
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

// function validateEmploymentHistory() {
//     const container = document.getElementById('employmentFormsContainer');
//     const forms = container.querySelectorAll('[id^="employmentForm"]');

//     let earliestStartDate = null;
//     let latestEndDate = null;

//     forms.forEach((form) => {
//         const startDateField = form.querySelector('[id^="companyStart"]');
//         const endDateField = form.querySelector('[id^="companySeparation"]');

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
//         console.log(`Total Employment History: ${totalYears} years`);

//         if (totalYears < 10) {
//             addEmploymentValidation();
//         } else {
//             removeEmploymentValidation();
//         }
//     } else {
//         console.log("Start date or end date is missing.");
//         addEmploymentValidation();
//     }
// }

// function addEmploymentValidation() {
//     console.log("entered in addEmploymentValidation");
//     if (!(document.getElementById('reasonBox'))) {
//         const reasonForm = document.createElement('div');
//         reasonForm.classList.add('reasonDiv', 'mt-3');
//         reasonForm.id = 'reasonBox';
//         reasonForm.innerHTML = `                
//                 <div class="warnDiv">
//                     <p class="warning">
//                         you have not provided TEN (10) years of employment history please provide the reason below
//                     </p>
//                 </div>
//                 <div class="col-12 mt-4">
//                     <label class="question-label">Reason for not meeting the TEN (10) years of employment history
//                         requirement.</label>
//                     <textarea required name="employHistoryReason" id="employHistroy" placeholder="Enter Text" rows="4"
//                         class="form-control mt-2 txtfeild"></textarea>
//                 </div>`
//         const mainContainer = document.getElementById('histroyValidator');
//         mainContainer.appendChild(reasonForm);
//         caluclateTotalFeilds();
//     }

// }

// function removeEmploymentValidation() {
//     console.log("Removing reason box for sufficient employment history.");
//     const reasonBox = document.getElementById('reasonBox');
//     if (reasonBox) {
//         reasonBox.remove();
//         caluclateTotalFeilds();
//     }
// }




function validateEmploymentHistory() {
    const container = document.getElementById('employmentFormsContainer');
    const forms = container.querySelectorAll('[id^="employmentForm"]');

    let earliestStartDate = null;
    let latestEndDate = null;

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
    const startDateField = document.getElementById('companyStart');
    const endDateField = document.getElementById('companySeparation');

    if (stillEmployeeCheckbox.checked) {
        const currentDate = new Date();
        // const startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 10));
        // startDateField.value = startDate.toISOString().split('T')[0];

        endDateField.value = new Date().toISOString().split('T')[0];
        endDateField.required = false;
    } else {
        startDateField.value = '';
        endDateField.value = '';
        endDateField.required = true;
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
                    <textarea required name="employHistoryReason" id="employHistroy" placeholder="Enter Text" rows="4"
                        class="form-control mt-2 txtfeild"></textarea>
                </div>`;
        const mainContainer = document.getElementById('histroyValidator');
        mainContainer.appendChild(reasonForm);
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
    const overlay = document.getElementById('overlay');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('overlay');
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
            // if (validatePage('form2', 9)) {

            showCheckmark('form2Tick');
            showSuccessModal();
            form1Completed = true;
            // }
            // else {
            //     showInvalidModal();
            //     hideCheckmark('form2Tick');
            // }
        });
    }
}

function showSuccessModal() {
    if (validatePage('form2', 9)) {
        const successModal = document.getElementById('successModal');
        const overlay = document.getElementById('overlay');
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
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('overlay');
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



initializeForm2('form2');