// let totalFields = 0;
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
    const percentage =((filledFields / totalFields) * 100);
    console.log("Total Fields:", totalFields);
    console.log("Filled Fields:", filledFields);
    console.log("Percentage:", percentage);

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${percentage}%`;

    const percentageText = document.getElementById('currentPagePercentage');
    percentageText.textContent = `${Math.round(percentage)}%`;
    const offset = Math.max(0, percentage - 5);
    percentageText.style.left = `${offset}%`;
}


function validatePage(formId, pageNumber) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#form1-page${pageNumber}`);
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    let isValid = true;

    // Loop through all inputs
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
            const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if (!isAnyChecked) {
                isValid = false;
                // checkboxes.forEach(checkbox => checkbox.classList.add('is-invalid')); // Highlight all related checkboxes
            } else {
                checkboxes.forEach(checkbox => checkbox.classList.remove('is-invalid')); // Remove invalid styling
            }
        } else if (input.required && !input.value.trim()) {
            isValid = false;
            // input.classList.add('is-invalid'); // Highlight invalid fields
        } else {
            input.classList.remove('is-invalid'); // Remove invalid styling
        }
    });

    return isValid;
}



function nextPage(pageNumber) {
    console.log("pageNumber:  ",pageNumber);
    if(pageNumber==4){
        initializeSignatureBox();
        clearSign();
    }
if(validatePage('form1', pageNumber - 1)){
    const form = document.getElementById('form1');
    const currentPage = form.querySelector(`#form1-page${pageNumber - 1}`);
    const nextPage = form.querySelector(`#form1-page${pageNumber}`);

    currentPage.style.display = 'none';
    nextPage.style.display = 'block';

    updatePageInfo('form1', pageNumber);
    updateProgress('form1');
 }
// else{
//     alert('Please complete all required fields before proceeding.');
// }
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
    {
        checkboxId: "asthmaYes",
        fieldsToShow: ["asthmaYearInput","asthmaExplanationInput"],
    },
    {
        checkboxId: "copdYes",
        fieldsToShow: ["copdYearInput","copdExplanationInput"],
    },
    {
        checkboxId: "tuberYes",
        fieldsToShow: ["tuberYearInput","tuberExplanationInput"],
    },
    {
        checkboxId: "kneeYes",
        fieldsToShow: ["kneeYearInput","kneeExplanationInput"], 
    },
    {
        checkboxId: "shoulderYes",
        fieldsToShow: ["shoulderYearInput","shoulderExplanationInput"],
    },
    {
        checkboxId: "elbowYes",
        fieldsToShow: ["elbowYearInput","elbowExplanationInput"],
    },
    {
        checkboxId: "spineYes",
        fieldsToShow: ["spineYearInput","spineExplanationInput"],
    },
    {
        checkboxId: "wristYes",
        fieldsToShow: ["wristYearInput","wristExplanationInput"],
    },
    {
        checkboxId: "arthritisYes",
        fieldsToShow: ["arthritisYearInput","arthritisExplanationInput"],
    },
    {
        checkboxId: "anemiaYes",
        fieldsToShow: ["anemiaYearInput","anemiaExplanationInput"],
    },
    {
        checkboxId: "sickleYes",
        fieldsToShow: ["sickleYearInput","sickleExplanationInput"],
    },
    ,
    {
        checkboxId: "otherBloodYes",
        fieldsToShow: ["otherBloodYearInput","otherBloodExplanationInput"],
    },
    {
        checkboxId: "diabetesYes",
        fieldsToShow: ["diabetesYearInput","diabetesExplanationInput"],
    },
    {
        checkboxId: "seizureYes",
        fieldsToShow: ["seizureYearInput","seizureExplanationInput"],
    },
    {
        checkboxId: "faintingYes",
        fieldsToShow: ["faintingYearInput","faintingExplanationInput"],
    },
    {
        checkboxId: "depressionYes",
        fieldsToShow: ["depressionYearInput","depressionExplanationInput"],
    },
    {
        checkboxId: "anxietyYes",
        fieldsToShow: ["anxietyYearInput","anxietyExplanationInput"],
    },
    {
        checkboxId: "bipolarYes",
        fieldsToShow: ["bipolarYearInput","bipolarExplanationInput"],
    },
    {
        checkboxId: "substanceYes",
        fieldsToShow: ["substanceYearInput","substanceExplanationInput"],
    },
    {
        checkboxId: "crohnYes",
        fieldsToShow: ["crohnYearInput","crohnExplanationInput"],
    },
    {
        checkboxId: "colitisYes",
        fieldsToShow: ["colitisYearInput","colitisExplanationInput"],
    },
    {
        checkboxId:"hepatisYes",
        fieldsToShow: ["hepatisYearInput","hepatisExplanationInput"],
    },
    {
        checkboxId:"cirrhosisYes",
        fieldsToShow: ["cirrhosisYearInput","cirrhosisExplanationInput"],
    },
    {
        checkboxId:"kidneyYes",
        fieldsToShow: ["kidneyYearInput","kidneyExplanationInput"],
    },
    {
        checkboxId:"skinYes",
        fieldsToShow: ["skinYearInput","skinExplanationInput"],
    },
    {
        checkboxId:"Yes",
        fieldsToShow: ["drugYearInput","drugExplanationInput"],
    },
    {
        checkboxId:"otherAlergyYes",
        fieldsToShow: ["otherAlergyYearInput","otherAlergyExplanationInput"],
    },
    {
        checkboxId:"otherHealthYes",
        fieldsToShow: ["otherHealthYearInput","otherHealthExplanationInput"],
    },
    {
        checkboxId:"tetanusYes",
        fieldsToShow: ["tetanusYearInput","tetanusExplanationInput"],
    },
    {
        checkboxId:"hepImmuneYes",
        fieldsToShow: ["hepImmuneYearInput","hepImmuneExplanationInput"],
    },
    {
        checkboxId:"declineYes",
        fieldsToShow: ["declineYearInput","declineExplanationInput"],
    },
    {
        checkboxId:"restrictYes",
        fieldsToShow: ["restrictYearInput","restrictExplanationInput"],
    },
    {
        checkboxId:"disabilityYes",
        fieldsToShow: ["disabilityYearInput","disabilityExplanationInput"],
    }, 
    {
        checkboxId:"dutiesYes",
        fieldsToShow: ["dutiesYearInput","dutiesExplanationInput"],
    }   
    
    
];

function toggleFields(formId, config) {
    config.forEach(({ checkboxId, fieldsToShow }) => {
        const checkbox = document.getElementById(checkboxId);

        fieldsToShow.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            if (checkbox && checkbox.checked) {
                fieldElement.style.display = 'block';
                fieldElement.setAttribute('required', 'required');
            } else {
                fieldElement.style.display = 'none';
                fieldElement.removeAttribute('required');
            }
        });
    });

    updateProgress(formId); 
}



let canvas, context;
let isDrawing = false;

// Function to get accurate mouse position
function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect(); // Get the canvas's bounding box
    const scaleX = canvas.width / rect.width;   // Horizontal scaling factor
    const scaleY = canvas.height / rect.height; // Vertical scaling factor
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



initializeForm('form1');



// function toggleHighBpFields(formId) {  colitis
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



