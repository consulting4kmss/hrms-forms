var totalFields2 = 0;
var totalPages2 = 0;
let formCounter=1;
let years=0;
let totalYears=0; 
function nextPage2(pageNumber) {
    // if (validatePage('form2', pageNumber - 1)) {
       if(pageNumber==9){
            initializeSignatureBox();
            clearSign();
            addForm2EventListeners();

       }
       if(pageNumber==7){
        validateEmploymentHistory();
       }
       if(pageNumber-1==7){
        if(totalYears>=10){
        const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
        const nextPage = document.querySelector(`#form2-page${pageNumber}`);
        currentPage.style.display = 'none';
        nextPage.style.display = 'block';
        updatePageInfo2('form2',pageNumber);
        updateProgress2('form2');}
       }
       else{
        const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
        const nextPage = document.querySelector(`#form2-page${pageNumber}`);
        currentPage.style.display = 'none';
        nextPage.style.display = 'block';
        updatePageInfo2('form2',pageNumber);
        updateProgress2('form2');}
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


// function addressHistory(value){
//     if(value=='yes'){
//         const addressHistory=document.createElement('div');
//         addressHistory.id='Address1';
//         addressHistory.innerHTML=`
//                 <div class="mt-3">
//                     <h4 class="just-color" style="border-bottom: 2px solid #8bafdf; width: 100%; padding-bottom: 5px;">
//                         Address History Continued
//                     </h4>
//                 </div>

//                 <div>
//                     <h6 class="just-color">
//                         <p class="question-label">List any prior address in the THREE (3) years preceding the date of
//                             this
//                             application, include
//                             street, city, state, and zip (NO PO BOXES)
//                         </p>
//                     </h6>
//                 </div>
//              <div id="addressSection">
//                 <div  id="addressSon" class="mt-2">
//                     <div class="address-container">
//                         <div class="form-row ">
//                             <div>
//                                 <label class="question-label">Additional Address #1</label>
//                                 <input type="text" autocomplete="off" name="address1" id="additionalAddress1"
//                                     class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text">
//                             </div>
//                         </div>

//                         <div class="form-row">
//                             <div class="col">
//                                 <label class="question-label">City</label>
//                                 <!-- <input required type="text" data-validate="text" autocomplete="off" name="city" onchange="updateProgress2('form2')"> -->
//                                 <input type="text" name="city" maxlength="50" autocomplete="off" id="additionalCity1"
//                                     oninput="validInput(this, /^[a-zA-Z ]*$/, 'Only letters are allowed')"
//                                     class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text" />
//                                 <small class="error-message"></small>
//                             </div>
//                             <div class="col">
//                                 <label class="question-label">State</label>
//                                 <select name="additionalState1" id="additionalState1" class="form-control state-feild"
//                                     placeholder="Select One">
//                                     <option value="state1"></option>
//                                     <option value="state2"></option>
//                                     <option value="state3"></option>=
//                                 </select>
//                             </div>
//                             <div class="col">
//                                 <label class="question-label">Zip</label>
//                                 <input type="number" name="zip" id="additionalZip1" autocomplete="off" maxlength="6"
//                                     class="form-control" onchange="updateProgress2('form2')"
//                                     oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed')"
//                                     placeholder="Enter Number" />
//                                 <small class="error-message"></small>
//                             </div>
//                         </div>
//                         <div class="form-row">
//                             <div>
//                                 <label class="question-label">From</label>

//                                 <input type="date" class="dab form-control" id="additionalFrom1" name="dob"
//                                     onchange="handleDateChange2(event)">
//                                 <small class="error-message"></small>
//                             </div>
//                             <div>
//                                 <label class="question-label">To</label>
//                                 <input type="date" class="dab form-control " id="additionalTo1" name="dob"
//                                     onchange="handleDateChange2(event)">
//                                 <small class="error-message"></small>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="mt-3" id="additionalAddressFeilds1">
//                         <h6 class="just-color">
//                             <p class="question-label">Did you have additional prior address to add</p>
//                         </h6>
//                     </div>
//                     <div class="col-12 d-flex flex-column mt-2">
//                         <div class="form-check" d-flex align-items-end>
//                             <input class="form-check-input" type="radio" value="no" id="addressNo1" name="Adress1"
//                                 onchange="handleAddressChange(this)">
//                             <label class="form-check-label label ms-4" for="addressNo1">
//                                 No
//                             </label>
//                         </div>

//                         <div class="form-check mt-2">
//                             <input class="form-check-input" type="radio" value="yes" id="addressYes1" name="Adress1"
//                                 onchange="handleAddressChange(this)">
//                             <label class="form-check-label ms-4" for="addressYes1">
//                                 Yes
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//               </div>
//             `
//                     const mainContainer=document.getElementById('mainAddressContainer');
//                     mainContainer.appendChild(addressHistory);

//     }

// }


// let addressCounter = 1; // Counter for unique IDs

// // Handle Yes/No selection
// function handleAddressChange(radio) {
//     const parentContainer = radio.closest('#addressSon');
//     const addressSection = document.getElementById('addressSection');

//     if (radio.value === 'yes') {
//         // Clone the template
//         addressCounter++;
//         const newTemplate = parentContainer.cloneNode(true);

//         // Update IDs and names to make them unique
//         newTemplate.dataset.templateId = addressCounter;
//         newTemplate.querySelectorAll('input, select, label, div').forEach(el => {
//             if (el.id) el.id = el.id.replace(/\d+$/, addressCounter);
//             if (el.name) el.name = el.name.replace(/\d+$/, addressCounter);
//             if (el.htmlFor) el.htmlFor = el.htmlFor.replace(/\d+$/, addressCounter);
//         });

//         // Reset inputs in the cloned template
//         newTemplate.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(el => el.value = '');
//         newTemplate.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
//         newTemplate.querySelectorAll('select').forEach(el => el.value = '');

//         // Append to address section
//         addressSection.appendChild(newTemplate);
//     } else if (radio.value === 'no') {
//         // Remove all templates added after the current one
//         const currentTemplateId = parentContainer.dataset.templateId;
//         document.querySelectorAll('#addressSon').forEach(el => {
//             if (el.dataset.templateId > currentTemplateId) el.remove();
//         });
//     }
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
        addressSection.appendChild(newTemplate);
    } else if (radio.value === 'no') {
        // Remove all templates with a higher data-template-id
        const currentTemplateId = parseInt(parentContainer.dataset.templateId, 10);
        document.querySelectorAll('#addressSon').forEach(el => {
            if (parseInt(el.dataset.templateId, 10) > currentTemplateId) {
                el.remove();
            }
        });
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
                                <input type="text" autocomplete="off" name="address${addressCounter}" id="additionalAddress${addressCounter}"
                                    class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col">
                                <label class="question-label">City</label>
                                <input type="text" name="city${addressCounter}" maxlength="50" autocomplete="off" id="additionalCity${addressCounter}"
                                    oninput="validInput(this, /^[a-zA-Z ]*$/, 'Only letters are allowed')"
                                    class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text" />
                                <small class="error-message"></small>
                            </div>
                            <div class="col">
                                <label class="question-label">State</label>
                                <select name="additionalState${addressCounter}" id="additionalState${addressCounter}" class="form-control state-feild"
                                    placeholder="Select One">
                                    <option value="state1"></option>
                                    <option value="state2"></option>
                                    <option value="state3"></option>
                                </select>
                            </div>
                            <div class="col">
                                <label class="question-label">Zip</label>
                                <input type="number" name="zip${addressCounter}" id="additionalZip${addressCounter}" autocomplete="off" maxlength="6"
                                    class="form-control" onchange="updateProgress2('form2')"
                                    oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed')"
                                    placeholder="Enter Number" />
                                <small class="error-message"></small>
                            </div>
                        </div>
                        <div class="form-row">
                            <div>
                                <label class="question-label">From</label>
                                <input type="date" class="dab form-control" id="additionalFrom${addressCounter}" name="from${addressCounter}"
                                    onchange="handleDateChange2(event)">
                                <small class="error-message"></small>
                            </div>
                            <div>
                                <label class="question-label">To</label>
                                <input type="date" class="dab form-control" id="additionalTo${addressCounter}" name="to${addressCounter}"
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
                                    <input class="form-check-input" type="radio" value="no" id="addressNo${addressCounter}" name="Adress${addressCounter}"
                                        onchange="handleAddressChange(this)">
                                    <label class="form-check-label label ms-4" for="addressNo${addressCounter}">
                                        No
                                    </label>
                                </div>
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="radio" value="yes" id="addressYes${addressCounter}" name="Adress${addressCounter}"
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
    }
}

function removeHistoryElement(value){
    if(value=='no'){
        document.getElementById('Address1').remove();
    }

}


const priorAddress=`<div class="address-container mt-2" id="priorAdd" style="display:block">
<div class="form-row ">
    <div>
        <label class="question-label">Additional Address #2</label>
        <input type="text" autocomplete="off" name="additionalAddress2" class="form-control"
            id="additionalAddress2" onchange="updateProgress2('form2')" placeholder="Enter Text">
    </div>
</div>

<div class="form-row">
    <div class="col">
        <label class="question-label">City</label>
        <!-- <input required type="text" data-validate="text" autocomplete="off" name="city" onchange="updateProgress2('form2')"> -->
        <input type="text" name="city" maxlength="50" autocomplete="off" id="additionalCity2"
            oninput="validInput(this, /^[a-zA-Z ]*$/, 'Only letters are allowed')"
            class="form-control" onchange="updateProgress2('form2')" placeholder="Enter Text" />
        <small class="error-message"></small>
    </div>
    <div class="col">
        <label class="question-label">State</label>
        <select name="addressState" id="additionalState2" class="form-control state-feild"
            placeholder="Select One">
            <option value="state1"></option>
            <option value="state2"></option>
            <option value="state3"></option>=
        </select>
    </div>
    <div class="col">
        <label class="question-label">Zip</label>
        <input type="number" name="zip" autocomplete="off" maxlength="6" class="form-control"
            onchange="updateProgress2('form2')" id="additionalZip2"
            oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed')"
            placeholder="Enter Number" />
        <small class="error-message"></small>
    </div>
</div>
<div class="form-row">
    <div>
        <label class="question-label">From</label>

        <input type="date" class="dab form-control" id="additionalFrom2" name="dob"
            onchange="handleDateChange2(event)">
        <small class="error-message"></small>
    </div>
    <div>
        <label class="question-label">To</label>
        <input type="date" class="dab form-control " id="additionalTo2" name="dob"
            onchange="handleDateChange2(event)">
        <small class="error-message"></small>
    </div>
</div>
</div>`

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
    // {
    //     radioId: "addressYes",
    //     fieldsToShow: ["Address1"],
    // },
    // {
    //     radioId: "addressYes1",
    //     fieldsToShow: ["priorAdd"],
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
                    <label class="question-label">Do you have additional traffic violations to add?</label>
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

                    <div class="col-12 d-flex flex-column mt-4">
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
                        <div class="col-12 mt-4">
                            <label class="question-label">Circumstances of Accident</label>
                            <textarea name="circumstances-${accidentCount}" id="accidentExplanation-${accidentCount}" rows="4" class="form-control mt-2 txtfeild"></textarea>
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

    console.log("Signature box initialized with white color and thin line.");
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

    function saveSign(){
    if (canvas) {
        signatureData = canvas.toDataURL('image/png');
        console.log('Signature saved:', signatureData);
       
    } else {
        console.error("Signature box is not initialized.");
    }
}

function showInvalidModal() {
    const invalidModal = document.getElementById('invalidModal');
    const overlay=document.getElementById('overlay');
    if (invalidModal && overlay){
    invalidModal.style.display = 'block';
    overlay.style.display='block';
    document.body.style.overflow='hidden';
    }
}

function closeModal() {
    const overlay=document.getElementById('overlay');
    console.log("printing overlay", overlay);
    const invalidModal = document.getElementById('invalidModal');
   if( invalidModal && overlay){
    invalidModal.style.display = 'none';
    overlay.style.display='none';
    document.body.style.overflow='auto';
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
                form1Completed=true;
            // }
            // else {
            //     showInvalidModal();
            //     hideCheckmark('form2Tick');
            // }
        });
    }
}

function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    const overlay =document.getElementById('overlay');
    if (successModal && overlay) {
        successModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow='hidden';
    }
}




function closeDialog() {
    console.log("entered into console.log");
    const successModal = document.getElementById('successModal');
    const overlay=document.getElementById('overlay');
    if (successModal && overlay) {
        successModal.style.display = 'none';
        overlay.style.display='none';
        document.body.style.overflow='auto';
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




// function addNewEmploymentForm() {
//     formCounter++; // Increment the counter for new forms

//     // Find the template form
//     const template = document.getElementById('employmentForm_1');

//     // Clone the form
//     const newForm = template.cloneNode(true);

//     // Update the ID of the cloned form
//     newForm.id = `employmentForm_${formCounter}`;
//     console.log("new Form Id",newForm.id);

//     // Update IDs, names, and 'for' attributes
//     const inputs = newForm.querySelectorAll('input, textarea, select, label');
//     inputs.forEach((input) => {
//         if (input.id) {
//             input.id = `${input.id}_${formCounter}`;
//         }

//         if (input.name) {
//             input.name = `${input.name}_${formCounter}`;
//         }

//         if (input.tagName === "LABEL" && input.getAttribute("for")) {
//             input.setAttribute("for", `${input.getAttribute("for")}_${formCounter}`);
//         }
//     });

//     // Clear values for inputs and textareas
//     newForm.querySelectorAll('input, textarea').forEach((field) => {
//         if (field.type !== "radio" && field.type !== "checkbox") {
//             field.value = '';
//         } else {
//             field.checked = false; // Uncheck radios and checkboxes
//         }
//     });

//     // Append the new form to the container
//     const container = document.getElementById('employmentFormsContainer');
//     container.appendChild(newForm);
// }


// function addNewEmploymentForm() {
//     formCounter++; // Increment the counter for new forms

//     // Find the template form
//     const template = document.getElementById('employmentForm_1');

//     // Clone the form
//     const newForm = template.cloneNode(true);

//     // Update the ID of the cloned form
//     newForm.id = `employmentForm_${formCounter}`;
//     console.log("New Form ID:", newForm.id);

//     // Update IDs, names, and 'for' attributes for input, textarea, select, label, and div elements
//     const elements = newForm.querySelectorAll('input, textarea, select, label, div');
//     elements.forEach((element) => {
//         if (element.id) {
//             element.id = `${element.id}_${formCounter}`; // Update IDs
//         }

//         if (element.name) {
//             element.name = `${element.name}_${formCounter}`; // Update names
//         }

//         if (element.tagName === "LABEL" && element.getAttribute("for")) {
//             element.setAttribute("for", `${element.getAttribute("for")}_${formCounter}`); // Update 'for'
//         }
//     });

//     // Clear values for inputs and textareas
//     newForm.querySelectorAll('input, textarea').forEach((field) => {
//         if (field.type !== "radio" && field.type !== "checkbox") {
//             field.value = ''; // Clear text fields
//         } else {
//             field.checked = false; // Uncheck radios and checkboxes
//         }
//     });

//     // Append the new form to the container
//     const container = document.getElementById('employmentFormsContainer');
//     container.appendChild(newForm);
// }

function addNewEmploymentForm() {
    formCounter++; // Increment the counter for new forms


    // Find the template form
    const template = document.getElementById('employmentForm_1');

    // Clone the form
    const newForm = template.cloneNode(true);

    // Remove dynamically generated unemployment sections before cloning
    const dynamicSections = newForm.querySelectorAll('[id^="unemployReason"]'); // Target dynamic unemployment IDs
    dynamicSections.forEach((section) => section.remove());

    // Update the ID of the cloned form
    newForm.id = `employmentForm_${formCounter}`;
    console.log("New Form ID:", newForm.id);

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
console.log('formNumber is',formCounter);
    // Append the new form to the container
    const container = document.getElementById('employmentFormsContainer');
    container.appendChild(newForm);
    // separationElement=document.getElementById(`companySeparation${(formCounter==1)?'':(`_${formCounter-1}`)}`);
    // console.log(`companySeparation${(formCounter==1)?'':(`_${formCounter-1}`)}`);
    // if(separationElement){
    //     caluclateHistory(`companySeparation${(formCounter==1)?'':(`_${formCounter-1}`)}`);
    // }
    // else{
    //    console.log('Element DoesNOT Exis=t'); 
    // }

    validateEmploymentHistory();
}






// function clearAdditionalForms(currentFormId) {
//     const container = document.getElementById('employmentFormsContainer');
// console.log("present form Id",currentFormId);
//     // Extract the form number from the current form's ID
//     const currentFormNumber = parseInt(currentFormId.split('_')[1]);

//     // Find all dynamically added forms
//     const forms = container.querySelectorAll('[id^="employmentForm"]');

//     // Loop through forms and delete those with a higher index
//     forms.forEach((form) => {
//         const formNumber = parseInt(form.id.split('_')[1]);

//         if (formNumber > currentFormNumber) {
//             form.remove();}
         
//     });

//     // Update the form counter to reflect remaining forms
//    formCounter = currentFormNumber + 1;
//     console.log("formNumber: ",formCounter);
// }


function clearAdditionalForms(currentFormId) {
    const container = document.getElementById('employmentFormsContainer');
    console.log("present form Id", currentFormId);

    // Extract the form number from the current form's ID
    const currentFormNumber = parseInt(currentFormId.split('_')[1]);

    // Find all dynamically added forms
    const forms = container.querySelectorAll('[id^="employmentForm"]');

    // Loop through forms and delete those with a higher index
    forms.forEach((form) => {
        const formNumber = parseInt(form.id.split('_')[1]);

        if (formNumber > currentFormNumber) {
            form.remove();
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

    console.log("Updated formCounter: ", formCounter);
    validateEmploymentHistory();
    
}


function addUnemployment(presentId ,value){
    if(value=='yes'){
unemployNumber=parseInt((presentId.split('_')[1]));
    const unemploy=document.createElement('div');
    unemploy.id=`unemployReason${presentId==''?'1':('_' + unemployNumber)}`;
    unemploy.innerHTML=`        <div class="form-row mt-3">
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
                                    <textarea name="unemploymentReason" id="unemployReason" placeholder="Enter Text"
                                        rows="4" class="form-control mt-2 txtfeild"></textarea>
                                </div>`
console.log("unemployNumber",unemployNumber);
document.getElementById(presentId).appendChild(unemploy);}

}

function removeUnemployment(presentId ,value){
    if(value=='no'){
       reasonNumber=parseInt((presentId.split('_')[1])); 
       const reasonbox=document.getElementById(`unemployReason_${reasonNumber}`)
       if(reasonbox){
        reasonbox.remove();
       }   
    }
}

// function startDate(id){
//     if(id=='companyStart'){
// let startDate=document.getElementById('companyStart').value
// if(startDate){
//     startYear=new Date(startDate).getFullYear();
// }
// else{
// console.log("StartDate",startDate);
// console.log("StartYear",startYear);
// return;

// }
// }else{
//     return;
// }
// }

// function caluclateHistory(id){
//     console.log("entered in caluclateHistory");
    
// //    sepNumber=(id=='companySeparation')?1 :parseInt((id.split('_')[1])); 
//     let endDate=document.getElementById(id).value;
//     if(endDate){
//         endYear=new Date(endDate).getFullYear();
//         years=endYear-startYear;
//         console.log('years',years);
//     }
//     else{
//         console.log('endDate',endDate);
//     }
//     if(years<10){
//         console
//         addEmploymentValidation();
//         return;
//     }
//     else{
//     const reasonbx=document.getElementById('reasonBox');
//     if(reasonbx){
//     reasonbx.remove();
//     return;}
//     else {
//         return;
//     }
    
// }


// }

function addEmploymentValidation(){
    console.log("entered in addEmploymentValidation");
    if(!(document.getElementById('reasonBox'))){
    const reasonForm=document.createElement('div');
            reasonForm.classList.add('reasonDiv','mt-3');
            reasonForm.id='reasonBox';
            reasonForm.innerHTML=`                
                <div class="warnDiv">
                    <p class="warning">
                        you have not provided TEN (10) years of employment history please provide the reason below
                    </p>
                </div>
                <div class="col-12 mt-4">
                    <label class="question-label">Reason for not meeting the TEN (10) years of employment history
                        requirement.</label>
                    <textarea name="employHistoryReason" id="employHistroy" placeholder="Enter Text" rows="4"
                        class="form-control mt-2 txtfeild"></textarea>
                </div>`
            const mainContainer = document.getElementById('histroyValidator');
            mainContainer.appendChild(reasonForm);
    }

}


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
        console.log(`Total Employment History: ${totalYears} years`);

        if (totalYears < 10) {
            addEmploymentValidation();
        } else {
            removeEmploymentValidation();
        }
    } else {
        console.log("Start date or end date is missing.");
        addEmploymentValidation();
    }
}

// function addEmploymentValidation() {
//     console.log("Adding reason box for insufficient employment history.");
//     if (!document.getElementById('reasonBox')) {
//         const reasonForm = document.createElement('div');
//         reasonForm.classList.add('reasonDiv', 'mt-3');
//         reasonForm.id = 'reasonBox';
//         reasonForm.innerHTML = `
//             <div class="warnDiv">
//                 <p class="warning">
//                     You have not provided TEN (10) years of employment history. Please provide the reason below.
//                 </p>
//             </div>
//             <div class="col-12 mt-4">
//                 <label class="question-label">Reason for not meeting the TEN (10) years of employment history requirement.</label>
//                 <textarea name="employHistoryReason" id="employHistroy" placeholder="Enter Text" rows="4"
//                     class="form-control mt-2 txtfeild"></textarea>
//             </div>`;
//         const mainContainer = document.getElementById('histroyValidator');
//         mainContainer.appendChild(reasonForm);
//     }
// }

function removeEmploymentValidation() {
    console.log("Removing reason box for sufficient employment history.");
    const reasonBox = document.getElementById('reasonBox');
    if (reasonBox) {
        reasonBox.remove();
    }
}




initializeForm2('form2');