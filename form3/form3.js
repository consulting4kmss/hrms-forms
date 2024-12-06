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
    const percentage = ((filledFields / totalFields) * 100);
    console.log("Total Fields:", totalFields);
    console.log("Filled Fields:", filledFields);
    console.log("Percentage:", percentage);

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${percentage}%`;

    const percentageText = document.getElementById('currentPagePercentage');
    percentageText.textContent = `${Math.round(percentage)}%`;
    const offset = Math.max(0, percentage - 7);
    percentageText.style.left = `${offset}%`;
}


// function validatePage(formId, pageNumber) {
//     const form = document.getElementById(formId);
//     const currentPage = form.querySelector(`#form1-page${pageNumber}`);
//     const inputs = currentPage.querySelectorAll('input, select, textarea');
//     const canvases = currentPage.querySelectorAll('canvas');
//     let isValid = true;

//     // Handle input, select, and textarea validation
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
//             } else if (input.required) {
//                 if (input.tagName === 'SELECT' && !input.value) {
//                     isValid = false;
//                     input.classList.add('highlight');
//                 } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
//                     isValid = false;
//                     input.classList.add('highlight');
//                 } else if (input.value.trim()) {
//                     input.classList.remove('highlight');
//                 } else {
//                     isValid = false;
//                     input.classList.add('highlight');
//                 }
//             } else {
//                 input.classList.remove('highlight');
//             }
//         };

//         // Attach dynamic validation
//         input.addEventListener('input', validateInput);
//         if (input.tagName === 'SELECT') {
//             input.addEventListener('change', validateInput);
//         }

//         // Initial validation
//         validateInput();
//     });
//       if(validInput()){
//         isValid = false;
//       }
//       else{
//         isValid=true;
//       }
//     // Handle canvas validation separately
//     canvases.forEach(canvas => {
//         const validateCanvas = () => {
//             console.log("entered into canvas");
//             const context = canvas.getContext('2d');
//             const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
//             const isCanvasEmpty = !pixelData.some(value => value !== 0);

//             if (isCanvasEmpty) {
//                 isValid = false;
//                 canvas.classList.add('highlight');
//             } else {
//                 canvas.classList.remove('highlight');
//             }
//         };

//         // Attach event listener for canvas interaction
//         canvas.addEventListener('mouseup', validateCanvas);
//         canvas.addEventListener('touchend', validateCanvas);

//         // Initial validation
//         validateCanvas();
//     });

//     return isValid;
// }

// function validatePage(formId, pageNumber) {
//     const form = document.getElementById(formId);
//     const currentPage = form.querySelector(`#form1-page${pageNumber}`);
//     const inputs = currentPage.querySelectorAll('input, select, textarea');
//     const canvases = currentPage.querySelectorAll('canvas');
//     let isValid = true;

//     // Validation rules
//     const validationRules = {
//         text: { regex: /^[a-zA-Z\s]*$/, errorMessage: 'Only letters are allowed' },
//         number: { regex: /^[0-9]*$/, errorMessage: 'Only numbers are allowed' }
//         // email: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, errorMessage: 'Enter a valid email' },
//         // Add more rules as needed
//     };

//     // Handle input, select, and textarea validation
//     inputs.forEach(input => {
//         const validateInput = () => {
//             const type = input.getAttribute('data-validate') || input.type;
//             const rule = validationRules[type];

//             if (rule && !validInput(input, rule.regex, rule.errorMessage)) {
//                 isValid = false;
//             } else if (input.required && input.tagName === 'SELECT' && !input.value) {
//                 isValid = false;
//                 input.classList.add('highlight');
//             } else if (input.required && input.tagName === 'TEXTAREA' && !input.value.trim()) {
//                 isValid = false;
//                 input.classList.add('highlight');
//             } else if (input.required && input.value.trim()) {
//                 input.classList.remove('highlight');
//             }
//         };

//         // Attach dynamic validation
//         input.addEventListener('input', validateInput);
//         if (input.tagName === 'SELECT') {
//             input.addEventListener('change', validateInput);
//         }

//         // Initial validation
   //     validateInput();
//     });

//     // Handle canvas validation separately
//     canvases.forEach(canvas => {
//         const validateCanvas = () => {
//             const context = canvas.getContext('2d');
//             const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
//             const isCanvasEmpty = !pixelData.some(value => value !== 0);

//             if (isCanvasEmpty) {
//                 isValid = false;
//                 canvas.classList.add('highlight');
//             } else {
//                 canvas.classList.remove('highlight');
//             }
//         };

//         // Attach event listener for canvas interaction
//         canvas.addEventListener('mouseup', validateCanvas);
//         canvas.addEventListener('touchend', validateCanvas);

//         // Initial validation
//         validateCanvas();
//     });

//     return isValid;
// }

// function validInput(input, regex, errorMessage) {
//     const value = input.value;
//     const errorField = input.nextElementSibling;

//     if (!regex.test(value)) {
//         // Add error styles and message
//         input.classList.add('highlight');
//         if (errorField) {
//             errorField.style.display = 'block';
//             errorField.textContent = errorMessage;
//         }

//         // Remove invalid characters
//         input.value = value.replace(new RegExp(`[^${regex.source.slice(1, -1)}]`, 'g'), '');
//         return false;
//     } else {
//         // Remove error styles and message
//         input.classList.remove('highlight');
//         if (errorField) {
//             errorField.style.display = 'none';
//         }
//         return true;
//     }
// }


function validatePage(formId, pageNumber) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#form1-page${pageNumber}`);
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    const canvases = currentPage.querySelectorAll('canvas');
    let isValid = true;

    // Validation rules
    const validationRules = {
        text: { regex: /^[a-zA-Z\s]*$/, errorMessage: 'Only letters are allowed' },
        number: { regex: /^[0-9]*$/, errorMessage: 'Only numbers are allowed' }
        // Add more rules as needed
    };

    // Handle input, select, and textarea validation
    inputs.forEach(input => {
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
        
                // Attach dynamic validation
                input.addEventListener('input', validateInput);
                if (input.tagName === 'SELECT') {
                    input.addEventListener('change', validateInput);
                }
        
                // Initial validation
                validateInput();
            });



    const inputsToValidate = document.querySelectorAll('[data-validate]');

    inputsToValidate.forEach((input) => {
        const rule = getValidationRule(input); // Function to get validation rule dynamically (defined below)
        if (rule) {
            const result = validInput(input, rule.regex, rule.errorMessage);
            if (!result) {
                isValid = false; // If any validation fails, set isValid to false
            }
        }
    });
    // Handle canvas validation separately
    canvases.forEach(canvas => {
        const context = canvas.getContext('2d');
        const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const isCanvasEmpty = !pixelData.some(value => value !== 0);

        if (isCanvasEmpty) {
            isValid = false; // If any canvas is empty, set isValid to false
            canvas.classList.add('highlight');
        } else {
            canvas.classList.remove('highlight');
        }
    });

    return isValid; // Return the final result
}

function getValidationRule(input) {
    // Example validation rules
    const rules = {
        text: {
            regex: /^[a-zA-Z\s]+$/, // Only letters and spaces
            errorMessage: 'Only letters are allowed.',
        },
        number: {
            regex: /^[0-9]+$/, // Only numbers
            errorMessage: 'Only numbers are allowed.',
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
            errorMessage: 'Enter a valid email address.',
        },
    };

    // Retrieve the rule based on the `data-validate` attribute
    const validationType = input.getAttribute('data-validate');
    return rules[validationType] || null; // Return null if no matching rule
}

function nextPage(pageNumber) {

    if (validatePage('form1', pageNumber - 1)) {
        console.log("pageNumber:  ", pageNumber);
        if (pageNumber == 4) {
            console
            initializeSignatureBox();
            clearSign();
            addForm1EventListeners();
        }
        const form = document.getElementById('form1');
        const currentPage = form.querySelector(`#form1-page${pageNumber - 1}`);
        const nextPage = form.querySelector(`#form1-page${pageNumber}`);

        currentPage.style.display = 'none';
        nextPage.style.display = 'block';

        updatePageInfo('form1', pageNumber);
        updateProgress('form1');
    }
    else {
        //alert('Please complete all required fields before proceeding.');
        showInvalidModal();
    }
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
        fieldsToShow: ["defectiveVisionYearInput", "defectiveVisionExplanationInput"],
    },
    {
        checkboxId: "visionOtherYes",
        fieldsToShow: ["visionOtherYearInput", "visionOtherExplanationInput"],
    },
    {
        checkboxId: "hearingYes",
        fieldsToShow: ["hearingLossYearInput", "hearingLossExplanationInput"],
    },
    {
        checkboxId: "hearingotherYes",
        fieldsToShow: ["hearingOtherYearInput", "hearingOtherExplanationInput"],
    },
    {
        checkboxId: "migrainesYes",
        fieldsToShow: ["migrainesYearInput", "migrainesExplanationInput"],
    },
    {
        checkboxId: "headachesYes",
        fieldsToShow: ["headachesYearInput", "headachesExplanationInput"],
    },
    {
        checkboxId: "tbiYes",
        fieldsToShow: ["tbiYearInput", "tbiExplanationInput"],
    },
    {
        checkboxId: "thyroidYes",
        fieldsToShow: ["thyroidYearInput", "thyroidExplanationInput"],
    },
    {
        checkboxId: "irregularHeartbeatYes",
        fieldsToShow: ["irregularHeartbeatYearInput", "irregularHeartbeatExplanationInput"],
    },
    {
        checkboxId: "highBpYes",
        fieldsToShow: ["highBpYearInput", "highBpExplanationInput"],
    },
    {
        checkboxId: "heartDiseaseYes",
        fieldsToShow: ["heartDiseaseYearInput", "heartDiseaseExplanationInput"],
    },
    {
        checkboxId: "heartFailureYes",
        fieldsToShow: ["heartFailureYearInput", "heartFailureExplanationInput"],
    },
    {
        checkboxId: "asthmaYes",
        fieldsToShow: ["asthmaYearInput", "asthmaExplanationInput"],
    },
    {
        checkboxId: "copdYes",
        fieldsToShow: ["copdYearInput", "copdExplanationInput"],
    },
    {
        checkboxId: "tuberYes",
        fieldsToShow: ["tuberYearInput", "tuberExplanationInput"],
    },
    {
        checkboxId: "kneeYes",
        fieldsToShow: ["kneeYearInput", "kneeExplanationInput"],
    },
    {
        checkboxId: "shoulderYes",
        fieldsToShow: ["shoulderYearInput", "shoulderExplanationInput"],
    },
    {
        checkboxId: "elbowYes",
        fieldsToShow: ["elbowYearInput", "elbowExplanationInput"],
    },
    {
        checkboxId: "spineYes",
        fieldsToShow: ["spineYearInput", "spineExplanationInput"],
    },
    {
        checkboxId: "wristYes",
        fieldsToShow: ["wristYearInput", "wristExplanationInput"],
    },
    {
        checkboxId: "arthritisYes",
        fieldsToShow: ["arthritisYearInput", "arthritisExplanationInput"],
    },
    {
        checkboxId: "anemiaYes",
        fieldsToShow: ["anemiaYearInput", "anemiaExplanationInput"],
    },
    {
        checkboxId: "sickleYes",
        fieldsToShow: ["sickleYearInput", "sickleExplanationInput"],
    },
    ,
    {
        checkboxId: "otherBloodYes",
        fieldsToShow: ["otherBloodYearInput", "otherBloodExplanationInput"],
    },
    {
        checkboxId: "diabetesYes",
        fieldsToShow: ["diabetesYearInput", "diabetesExplanationInput"],
    },
    {
        checkboxId: "seizureYes",
        fieldsToShow: ["seizureYearInput", "seizureExplanationInput"],
    },
    {
        checkboxId: "faintingYes",
        fieldsToShow: ["faintingYearInput", "faintingExplanationInput"],
    },
    {
        checkboxId: "depressionYes",
        fieldsToShow: ["depressionYearInput", "depressionExplanationInput"],
    },
    {
        checkboxId: "anxietyYes",
        fieldsToShow: ["anxietyYearInput", "anxietyExplanationInput"],
    },
    {
        checkboxId: "bipolarYes",
        fieldsToShow: ["bipolarYearInput", "bipolarExplanationInput"],
    },
    {
        checkboxId: "substanceYes",
        fieldsToShow: ["substanceYearInput", "substanceExplanationInput"],
    },
    {
        checkboxId: "crohnYes",
        fieldsToShow: ["crohnYearInput", "crohnExplanationInput"],
    },
    {
        checkboxId: "colitisYes",
        fieldsToShow: ["colitisYearInput", "colitisExplanationInput"],
    },
    {
        checkboxId: "hepatisYes",
        fieldsToShow: ["hepatisYearInput", "hepatisExplanationInput"],
    },
    {
        checkboxId: "cirrhosisYes",
        fieldsToShow: ["cirrhosisYearInput", "cirrhosisExplanationInput"],
    },
    {
        checkboxId: "kidneyYes",
        fieldsToShow: ["kidneyYearInput", "kidneyExplanationInput"],
    },
    {
        checkboxId: "skinYes",
        fieldsToShow: ["skinYearInput", "skinExplanationInput"],
    },
    {
        checkboxId: "Yes",
        fieldsToShow: ["drugYearInput", "drugExplanationInput"],
    },
    {
        checkboxId: "otherAlergyYes",
        fieldsToShow: ["otherAlergyYearInput", "otherAlergyExplanationInput"],
    },
    {
        checkboxId: "otherHealthYes",
        fieldsToShow: ["otherHealthYearInput", "otherHealthExplanationInput"],
    },
    {
        checkboxId: "tetanusYes",
        fieldsToShow: ["tetanusYearInput", "tetanusExplanationInput"],
    },
    {
        checkboxId: "hepImmuneYes",
        fieldsToShow: ["hepImmuneYearInput", "hepImmuneExplanationInput"],
    },
    {
        checkboxId: "declineYes",
        fieldsToShow: ["declineYearInput", "declineExplanationInput"],
    },
    {
        checkboxId: "restrictYes",
        fieldsToShow: ["restrictYearInput", "restrictExplanationInput"],
    },
    {
        checkboxId: "disabilityYes",
        fieldsToShow: ["disabilityYearInput", "disabilityExplanationInput"],
    },
    {
        checkboxId: "dutiesYes",
        fieldsToShow: ["dutiesYearInput", "dutiesExplanationInput"],
    }


];

function toggleFields(formId, config) {
    config.forEach(({ checkboxId, fieldsToShow }) => {
        const checkbox = document.getElementById(checkboxId);

        fieldsToShow.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            const childElements = fieldElement.querySelectorAll('*');
            const childIds = Array.from(childElements)
                .filter(element => element.id)
                .map(element => element.id);

            if (checkbox && checkbox.checked) {
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



let canvas, context;
let isDrawing = false;


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
    // Dynamically fetch the canvas and context
    canvas = document.getElementById('signatureBox');

    if (!canvas) {
        console.error("Canvas element not found. Ensure it's visible in the DOM.");
        return;
    }

    context = canvas.getContext('2d');
    context.lineWidth = 0.3; // Adjust for a thinner line
    context.lineCap = "round"; // Smooth line ends
    context.strokeStyle = "white"; // Set the line color to white

    // Attach event listeners
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
    });

    console.log("Signature box initialized with white color and thin line.");
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


// function showInvalidModal() {
//     const invalidModal = document.getElementById('invalidModal');
//     const overlay = document.getElementById('overlay');
//     if (invalidModal && overlay) {
//         invalidModal.style.display = 'block';
//         overlay.style.display = 'block';
//         document.body.style.overflow = 'hidden'; // Disable scrolling
//     }
// }

// function closeModal() {
//     const overlay = document.getElementById('overlay');
//     const invalidModal = document.getElementById('invalidModal');
//     console.log("Closing modal. Overlay:", overlay, "InvalidModal:", invalidModal);
//     if (invalidModal && overlay) {
//         invalidModal.style.display = 'none';
//         overlay.style.display = 'none';
//         document.body.style.overflow = 'auto'; // Restore scrolling
//     }
// }



// Function to clear the signature
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
function addForm1EventListeners() {
    const form1SubmitButton = document.querySelector('.submit-btn');
    if (form1SubmitButton) {
        form1SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (validatePage('form1', 4)) {

                showCheckmark('form1Tick');
                showSuccessModal();
            }
            else {
                showInvalidModal();
            }
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

// function showSuccessModal() {
//     const successModal = document.getElementById('successModal');
//     const overlay = document.getElementById('overlay');

//     if (successModal && overlay) {
//         successModal.style.display = 'block';
//         overlay.style.display = 'block';
//     }
// }


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

// function closeDialog() {
//     const successModal = document.getElementById('successModal');
//     const overlay = document.getElementById('overlay');

//     if (successModal && overlay) {
//         successModal.style.display = 'none';
//         overlay.style.display = 'none';
//     }
// }

function showCheckmark(formId) {
    const checkmark = document.getElementById(formId);
    if (checkmark) {
        checkmark.classList.add('visible');
    }
}





// Save the signature

// document.getElementById('saveButton').addEventListener('click', () => {
//     if (canvas) {
//         const signatureData = canvas.toDataURL('image/png');
//         console.log('Signature saved:', signatureData);
//         // You can send `signatureData` to a server or save it locally
//     } else {
//         console.error("Signature box is not initialized.");
//     }
// });


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

function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Set min date for input in yyyy-mm-dd format
const today = new Date();
const formattedTodayForInput = today.toISOString().split('T')[0]; // yyyy-mm-dd format
document.getElementById('dob').setAttribute('max', formattedTodayForInput);
document.getElementById('doa').setAttribute('max', formattedTodayForInput);

// Display formatted date (dd-mm-yyyy) on change
function handleDateChange(event) {
    const selectedDate = new Date(event.target.value);
    const formattedDate = formatDateToDDMMYYYY(selectedDate);
    document.getElementById('formattedDate').textContent = `Selected Date: ${formattedDate}`;
}


initializeForm('form1');
