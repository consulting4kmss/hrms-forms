var totalFields = 0;
var totalPages = 0;
var signatureData = '';
var filledFields = 0;


const product = [
    {
      defectiveVision: 'no',
      eyesOther: 'yes',
      coe_pp_heq_state: 'California',
      coe_pp_heq_eyes_defectivevision_Year: '2022',
      dob: '1990-05-15',
      doa: '2024-03-01'
    }
  ];

function initializeForm(formId) {
    //showCheckmark('form1Tick');
    totalPages = document.querySelectorAll(`#${formId} .form-page`).length;

    
    caluclateTotalFeilds();
    updatePageInfo(formId, 1);
    const firstPage = document.querySelector(`#${formId}-page1`);
    const inputs = firstPage.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
         validatePage(formId,1,false);
        });
    });
    handleMutualExclusiveCheckboxes(formId);
    Initializefeilds(product);
    toggleFields(1, toggleFieldsConfig);
    toggleFields(2, toggleFieldsConfig);
    toggleFields(3, toggleFieldsConfig);
    toggleFields(4, toggleFieldsConfig);
    const fields = document.querySelectorAll(`#${formId} .form-page input, #${formId} .form-page select,#${formId} .form-page textarea,#${formId} .form-page canvas`);
    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress(formId);

        });
    });

    handleMutualExclusiveCheckboxes(formId);

    // updateProgress(formId);
   
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

           // toggleFields(formId, toggleFieldsConfig);
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

function updateProgress(formId) {

    caluclateFilledFeilds();

    const percentage = ((filledFields / totalFields) * 100);


    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${percentage}%`;

    const percentageText = document.getElementById('currentPagePercentage');
    percentageText.textContent = `${Math.round(percentage)}%`;
    const offset = Math.max(0, percentage - 7);
    percentageText.style.left = `${offset}%`;
}



function caluclateTotalFeilds() {
    const form = document.getElementById('form1');
    const fields = form.querySelectorAll('.form-page input, .form-page select, .form-page textarea,.form-page canvas');  // Include all input, select, and textarea fields

    totalFields = Array.from(fields)
        .filter((field, index, self) => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return self.findIndex(f => f.name === field.name) === index;
            }
            return true;
        })
        .filter(field => field.style.display !== 'none') // Only count fields that are visible (displayed)
        .filter(field => field.id !== 'midName' && field.id !== 'add2' && field.id !=='suffix')
        .length;

    updateProgress('form1');
}
function caluclateFilledFeilds() {
    filledFields = 0;
    const form = document.getElementById('form1');
    const fields = form.querySelectorAll('.form-page input, .form-page select, .form-page textarea,.form-page canvas');
    const processedGroups = new Set();

    fields.forEach(field => {
        if (window.getComputedStyle(field).display === 'none') {
            return;
        }
        if ((field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type === 'number' || field.type === 'decimal' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA' || field.id === 'weight' || field.id === 'height') && field.value.trim()) {
            if (field.id === 'midName' || field.id === 'add2'|| field.id==='suffix') {
              
                return;
            }
            filledFields++;

        } else if (field.tagName === 'CANVAS' && !isCanvasEmpty(field)) {
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
}
function validatePage(formId, pageNumber,bool) {
   console.log('FORMID , PAGENUMBER , BOOL ',formId, pageNumber, bool)
    const form = document.getElementById(formId);
    // if(form===null){
    //     console.log("formIsNull");
    //     return false;
    // }
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
    // if(currentPage===null){
    //     console.log("currentPageIsNull");
    //     return false;
    // }
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    const canvases = currentPage.querySelectorAll('canvas');
    let isValid = true;

    inputs.forEach(input => {
        const validateInput = () => {
            if (input.type === 'checkbox') {
                const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
                if (!isAnyChecked) {
                    isValid = false;
                    if(bool){
                    checkboxes.forEach(checkbox => checkbox.classList.add('highlight-feedback'));
                    }
                } else {
                    checkboxes.forEach(checkbox => checkbox.classList.remove('highlight-feedback'));
                }
                if (input.required && input.offsetParent !== null) {  
                    // **Check if the field is visible**
                    if (input.tagName === 'SELECT' && !input.value.trim()) {
                        isValid = false;
                        if(bool){
                        input.classList.add('highlight');
                        }
                    } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
                        isValid = false;
                        if(bool){
                        input.classList.add('highlight');
                        }
                    }
                }
            } else if (input.required && input.offsetParent !== null) {  
                // **Check if the field is visible**
                if (input.tagName === 'SELECT' && !input.value.trim()) {
                    isValid = false;
                    if(bool){
                    input.classList.add('highlight');
                    }
                } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
                    isValid = false;
                    if(bool){
                    input.classList.add('highlight');
                    }
                } else if (input.value.trim()) {
                    input.classList.remove('highlight');
                } else {
                    isValid = false;
                    if(bool){
                    input.classList.add('highlight');
                    }
                } if (input.name === "home" || input.name === "cell") {
                    const isPhoneValid = validateAndFormatPhoneNumber(input,bool);
                    if (!isPhoneValid) {
                      
                        isValid = false;
                    }
                } if (input.id === "weight") {

                    const result = validInput(input,/^\d{0,3}(\.\d{0,2})?$/, 'Only numbers with up to 2 decimals are allowed',bool);
                    if (!result) {
                        isValid = false;
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
    


    const inputsToValidate = document.querySelectorAll('[data-validate]');

    inputsToValidate.forEach((input) => {
        const rule = getValidationRule(input);
        if (rule) {
            const result = validInput(input, rule.regex, rule.errorMessage ,bool);
            if (!result) {
                isValid = false;
            }
        }
       
    });

    canvases.forEach(canvas => {
        const context = canvas.getContext('2d');
        const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const isCanvasEmpty = !pixelData.some(value => value !== 0);

        if (isCanvasEmpty) {
            isValid = false;
            if(bool){
            canvas.classList.add('highlight');
            }
        } else {
            canvas.classList.remove('highlight');
        }
    });
 if(!bool){
 const nextBtn=document.getElementById(`next${pageNumber}`)
    if(isValid){
        nextBtn.classList.remove('notValid-btn');
        nextBtn.classList.add('valid-btn');
    }else{
        nextBtn.classList.add('notValid-btn');
        nextBtn.classList.remove('valid-btn');
    }
}
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

function nextPage(formId, pageNumber) {
   

    if (validatePage(formId, pageNumber - 1,true)) {
   
    if (pageNumber == 4) {
    
        initializeSignatureBox();
        clearSign();
        addForm1EventListeners();
    }
    collectFormData(formId, pageNumber-1);
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber - 1}`);
    const nextPage = form.querySelector(`#${formId}-page${pageNumber}`);
    const inputs = nextPage.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
         validatePage(formId,pageNumber,false);
        });
        if(input.type==='checkbox'){
        input.addEventListener('change',()=>{
        toggleFields(pageNumber, toggleFieldsConfig);
        })
        }
    });
    
    currentPage.style.display = 'none';
    nextPage.style.display = 'block';

    updatePageInfo(formId, pageNumber);
    caluclateTotalFeilds();
     }
     else {
          showInvalidModal();
     }
}

function previousPage(formId, pageNumber) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber + 1}`);
    const previousPage = form.querySelector(`#${formId}-page${pageNumber}`);

    currentPage.style.display = 'none';
    previousPage.style.display = 'block';

    updatePageInfo(formId, pageNumber);
    caluclateTotalFeilds();
}
var toggleFieldsConfig = [
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
        checkboxId: "herniaYes",
        fieldsToShow: ["herniaYearInput", "herniaExplanationInput"],
    },
    {
        checkboxId: "cancerYes",
        fieldsToShow: ["cancerYearInput", "cancerExplanationInput"],
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
        checkboxId: "drugYes",
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
        fieldsToShow: ["tetanusYearInput"],
    },
    {
        checkboxId: "hepImmuneYes",
        fieldsToShow: ["hepImmuneYearInput"],
    },
    {
        checkboxId: "declineYes",
        fieldsToShow: ["declineExplanationInput"],
    },
    {
        checkboxId: "restrictYes",
        fieldsToShow: ["restrictExplanationInput"],
    },
    {
        checkboxId: "disabilityYes",
        fieldsToShow: ["disabilityExplanationInput"],
    },
    {
        checkboxId: "dutiesYes",
        fieldsToShow: ["dutiesExplanationInput"],
    },
    {
        checkboxId: "accommodationYes",
        fieldsToShow: ["accommodationExplanationInput"],
    }


];

function toggleFields(pageNumber, config) {
    config.forEach(({ checkboxId, fieldsToShow }) => {
        const checkbox = document.getElementById(checkboxId);

        fieldsToShow.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            const childElements = fieldElement.querySelectorAll('*');  // Select all child elements
            const inputs =fieldElement.querySelectorAll('select,textarea')
            if (checkbox && checkbox.checked) {
                fieldElement.style.display = 'block';  // Make the field visible
                // Make sure all child elements within this field are also displayed
                childElements.forEach(child => {
                    child.style.display = 'block';  // Ensure child elements are also visible
                });
                inputs.forEach(input=>{
                    input.addEventListener('input',()=>{
                        validatePage('form1',pageNumber,false);
                    })
                })
                // Set required attribute for the first child element (if needed)
                const firstChild = childElements[0];
                if (firstChild && firstChild.id) {
                    document.getElementById(firstChild.id).required = true;
                }
            } else {
                inputs.forEach(input=>{
                    input.removeEventListener('input',()=>{
                        validatePage('form1',pageNumber,false);
                    })
                })
                fieldElement.style.display = 'none';  // Hide the field
                // Hide all child elements when the parent is hidden
                childElements.forEach(child => {
                    child.style.display = 'none';  // Ensure child elements are also hidden
                    if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') {
                        child.value = ''; 
                    } else if (child.tagName === 'SELECT') {
                        child.selectedIndex = 0; // Reset dropdown selection
                    }
                });
                // Remove required attribute for the first child element
                const firstChild = childElements[0];
                if (firstChild && firstChild.id) {
                    document.getElementById(firstChild.id).required = false;
                }
            }
        });
    });
  
    caluclateTotalFeilds();
    caluclateFilledFeilds();
    validatePage('form1',pageNumber,false); // Recalculate total fields count
}

var canvas, context;
var isDrawing = false;


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

    canvas = document.getElementById('signatureBox2');

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
        removeCanvasHighlight();
        validatePage('form1',4,false);
        context.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const pos = getMousePosition(event);
            context.lineTo(pos.x, pos.y);
            removeCanvasHighlight();
            validatePage('form1',4,false);
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
function isCanvasEmpty(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0); // Returns true if all pixels are transparent
}


function saveSign() {
    if (canvas) {
        signatureData = canvas.toDataURL('image/png');

    } else {
        console.error("Signature box is not initialized.");
    }
    updateProgress('form1');
}

function removeCanvasHighlight() {
    canvas.classList.remove('highlight');
}

function clearSign() {
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            signatureData = '';
            updateProgress('form1');
        } else {
            console.error("Signature box is not initialized.");
        }
        validatePage('form1',4,false);
    });

}

function showInvalidModal() {
    const invalidModal = document.getElementById('invalidModal');
    const overlay = document.getElementById('overlay2');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
       document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('overlay2');
    const invalidModal = document.getElementById('invalidModal');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'none';
        overlay.style.display = 'none';
       document.body.style.overflow = 'auto';
    }
}


function addForm1EventListeners() {
    const form1SubmitButton = document.getElementById('next4');
    if (form1SubmitButton) {
        form1SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (validatePage('form1', 4,true)) {

              showCheckmark('form2Tick');
                showSuccessModal();
               collectFormData('form1', 4);
                form1Completed = true;
            }
            else {
                showInvalidModal();
                hideCheckmark('form2Tick');
            }
        });
    }
}

function showSuccessModal() {
    const successModal = document.getElementById('successModal2');
    const overlay = document.getElementById('overlay2');
    if (successModal && overlay) {
        showCheckmark('form2Tick');
        successModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}




function closeDialog() {
    const successModal = document.getElementById('successModal2');
    const overlay = document.getElementById('overlay2');
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



function validInput(input, regex, errorMessage,bool) {
    if (!(regex instanceof RegExp)) {
        console.error("Invalid regex provided to validInput:", regex);
        return;
    }

    const value = input.value;
    const errorField = input.nextElementSibling;

    if ((!regex.test(value) || !value)) {
        if(bool){
        input.classList.add('highlight');
        if (errorField) {
            errorField.style.display = 'block';
            errorField.textContent = errorMessage;
        }
    }

        // Ensure regex is properly defined before modifying input value
        try {
            input.value = value.replace(new RegExp(`[^${regex.source.slice(1, -1)}]`, 'g'), '');
        } catch (error) {
            console.error("Error processing regex:", error);
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



const today = new Date();
const formattedTodayForInput = today.toISOString().split('T')[0];
document.getElementById('dob').setAttribute('max', formattedTodayForInput);
document.getElementById('doa').setAttribute('max', formattedTodayForInput);


function handleDateChange(event) {
    const input = event.target;
    const selectedDate = new Date(input.value);
    const year = selectedDate.getFullYear();
    const errorField = input.nextElementSibling;
    if (year > 9999 || year < 1000) { 
        input.classList.add('highlight');        
        errorField.style.display = 'block';
        errorField.textContent = 'Invalid date. Please enter a valid Year.';
      
        return;
    }else{
        input.classList.remove('highlight');
        if(errorField){        
            errorField.style.display = 'none';
            errorField.style.display = 'none';
        }


    }
}

function formatDateToDDMMYYYY(date) {
    if (!(date instanceof Date) || isNaN(date)) return "";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function validateAndFormatPhoneNumber(input,bool) {
    const errorField = input.nextElementSibling;

     var rawValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    // Select the small tag for error messages

    // Truncate to 10 digits if input exceeds 10 characters
    if (bool && rawValue.length > 10) {
        rawValue = rawValue.substring(0, 10);
    }

    // Handle empty input (allows clearing)
    if (rawValue.length === 0) {
        if(bool){
        input.value = '';
        input.classList.add('highlight');
        errorField.textContent = 'Phone number must be exactly 10 digits.';
        errorField.style.display = 'block';
        }
        return false;
    }

    // Validate and show error for invalid length
    if (rawValue.length !== 10) {
        if(bool){
        input.classList.add('highlight');
        errorField.textContent = 'Phone number must be exactly 10 digits.';
        errorField.style.display = 'block';
        input.value = formatPhoneNumber(rawValue);
        } // Format partial input for better UX
        return false;
    }

    // Clear error message if input is valid
    errorField.textContent = '';
    errorField.style.display = 'none';
    input.classList.remove('highlight');
    // Format and set the phone number
    if(bool){
    input.value = formatPhoneNumber(rawValue);
    }
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


function loadForm3(id) {
    const modalContent = document.getElementById(id);
    const overlay = document.getElementById('overlay2');
    if (modalContent && overlay) {
        modalContent.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    fetch('../form3/form3.html')
        .then(response => response.text())
        .then(html => {
            
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form3/form3.js');
            loadStyleSheet("../form3/form3.css");
            removeStyleSheet('../form2/form2.css');
            // addForm1EventListeners();
            document.body.style.overflow = 'auto';
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


function collectFormData(formId,pageNumber) {
    const formData = new FormData();
   // const form = document.getElementById("firstForm-page1");


    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);

    if (!currentPage) {
        console.error("Page not found.");
        return;
    }
    const fields = currentPage.querySelectorAll('input, select, textarea');
    // Collect all input, select, and textarea fields
    //const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach(field => {
        if (window.getComputedStyle(field).display === 'none') {
            return;
        }
        if (field.type === "radio" || field.type === "checkbox") {
            if (field.checked) {
                formData.append(field.name, field.value);
            }
        } else {
            formData.append(field.name, field.value);
        }
    });


    // Convert signature canvas to Blob and append
    const canvas=document.getElementById("signatureBox2")
    //const canvas = document.getElementById("signBox1");
    if (canvas && pageNumber==4) {
        canvas.toBlob((blob) => {
            formData.append("signature", blob, "signature.png");

            //Properly display `FormData`
            console.log("FormData after adding signature:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": ", pair[1]); // Logs each key-value pair
            }

            // Send data to API
            //sendFormDataToAPI(formData);
        }, "image/png");
    } else {
        console.error("Signature canvas not found.");

        //Display `FormData` even if signature is missing
        console.log("FormData without signature:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }
       // sendFormDataToAPI(formData);
    }
}

function Initializefeilds(product){
    setCheckboxState("visionYes","visionNo",product[0].defectiveVision);
    setCheckboxState("visionOtherYes","visionOtherNo",product[0].eyesOther);

    // select 
    setSelected("selectState",states,product[0].coe_pp_heq_state );
    setSelected("selectState",years,product[0].coe_pp_heq_eyes_defectivevision_Year);
    
    setDates("dob",product[0].dob);//Date Of Birth
    setDates("doa",product[0].doa);//date Of Application


}

function setDates(id,val){
    const dateFeild=document.getElementById(id);
    dateFeild.value=val;

}

function setCheckboxState(id1,id2,value) {
    const checkbox = document.getElementById(id1);
    const checkbox2 = document.getElementById(id2);
    // If result.coe_pp_heq_eyes_defectivevision is 'no', check the checkbox
    if (value === 'no') {
        checkbox.checked = true;
        checkbox2.checked = false;
    } else if(value === 'yes') {
        checkbox2.checked = true;
        checkbox.checked = false;
    }else{
        checkbox2.checked = false;
        checkbox.checked = false;  
    }
    checkbox.dispatchEvent(new Event('change'));
    checkbox2.dispatchEvent(new Event('change'));
}
const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

const years=["2023","2022","2021","2020"];

function setSelected(id,dataSet,selectedItem){
    const selectElement = document.getElementById(id);

    dataSet.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      if(selectedItem){
      if (item === selectedItem) {
        option.selected = true;
      }}
      selectElement.appendChild(option);
    });
}






initializeForm('form1');
