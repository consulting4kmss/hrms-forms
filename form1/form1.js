function drugTestPositive(value) {
    if (value == 'yes') {
        const affirmative = document.createElement('div');
        affirmative.classList.add('col-12','mt-3');
        affirmative.id = `affirmativeNotes`;
        affirmative.innerHTML = `<label class="question-label">Additional Notes if Affirmative</label>
                    <textarea required maxlength="250" name="affirmativeExplanation" id="defectiveVisionExplanation" rows="4"
                        class="form-control txtfeild "></textarea>`
        document.getElementById("drugTest").appendChild(affirmative);

    }
}
 function addChangeEvent() {
    console.log("Entered event Listener");
    // Select all input fields (including text, radio, and date)
    const inputs = document.querySelectorAll("input");

    // Add the onchange event to each input field
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            validateForm(false);
        });
    });
};

function drugTestNegative(value) {
    if (value == 'no') {
        const removeCertificate = document.getElementById(`affirmativeNotes`);
        if (removeCertificate) {
            removeCertificate.remove();
        }
    }
}

function handleDateChange(event) {
    const input = event.target;
    const selectedDate = new Date(input.value);
    const year = selectedDate.getFullYear();
    const errorField = input.nextElementSibling;
    const thisYear = new Date().getFullYear();
  
    if (year > thisYear || year < 1900) {
        input.classList.add('highlight');
        errorField.textContent = 'Invalid date. Please enter a valid Year.';
        errorField.style.display = 'block';

        return false;
    } else {
        input.classList.remove('highlight');
        errorField.style.display = 'none';
        errorField.textContent = '';
        return true


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

    canvas = document.getElementById('signBox1');

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
        context.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const pos = getMousePosition(event);
            context.lineTo(pos.x, pos.y);
            removeCanvasHighlight();
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
    clearSign() ;

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

function removeCanvasHighlight() {
    validateForm(false);
    canvas.classList.remove('highlight');
}

function saveSign() {
    if (canvas) {
        signatureData = canvas.toDataURL('image/png');
        console.log('sign Data', signatureData);
       // validateCanvases('form1', 1);

    } else {
        console.error("Signature box is not initialized.");
    }
}

function validateForm(bool) {
   // const form = document.getElementById(formId);
    const currentPage = document.getElementById(`firstForm-page1`);
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    const canvases = document.getElementById('signBox1');
    let isValid = true;

    inputs.forEach(input => {
        // Skip hidden inputs
        const isHidden = getComputedStyle(input).display === 'none' || input.closest('[style*="display: none"]');
        if (isHidden) {
            return;
        }

        const validateInput = () => {

          if (input.type === 'radio') {
                const radios = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(radios).some(radio => radio.checked);
                if (!isAnyChecked) {
                    isValid = false;
                    if(bool){
                    radios.forEach(radio => radio.classList.add('highlight-feedback'));
                    }
                } else{
                    radios.forEach(radio => radio.classList.remove('highlight-feedback'));
                }
            } else if (input.required) {
               if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
                    isValid = false;
                    if(bool){
                    input.classList.add('highlight');}
                } else if (input.value.trim()) {      
                    input.classList.remove('highlight');
                } else {
                    isValid = false;
                    if(bool){
                    input.classList.add('highlight');
                    }
                }
                if (input.type === "date" && bool) {
                    const errorField = input.nextElementSibling;
                    if (!handleDateChange2({ target: input })) {
                        isValid = false;
                        errorField.textContent = "Invalid date. Please enter a valid Date.";
                        if (input.id === "companySeparation" || input.id === "companyStart") {
                            errorField.textContent = "Please enter a valid Date.";
                        }
                        if(bool){
                        input.classList.add('highlight');
                        }
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
         // validateCanvases(formId, pageNumber);
            const context = canvases.getContext('2d');
            const pixelData = context.getImageData(0, 0, canvases.width, canvases.height).data;
            const isCanvasEmpty = !pixelData.some(value => value !== 0);
    
            if (isCanvasEmpty) {
                isValid = false;
                if(bool){
                canvases.classList.add('highlight');
                }
            } else {
                canvases.classList.remove('highlight');
            }
   

        };

        input.addEventListener('input', validateInput);

        validateInput();
    });

    const Element= document.getElementById('submit1').classList;
    if(isValid){
      Element.add('submit-valid');
      Element.remove('submit-btn');
    }else{
        Element.add('submit-btn');
        Element.remove('submit-valid');
    }

    //return true;
    return isValid;
}

// function validateCanvases(formId,pageNumber){
//     const form = document.getElementById(formId);
//     const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
//     const canvases = currentPage.querySelectorAll('canvas');
//     canvases.forEach(canvas => {
//         const context = canvas.getContext('2d');
//         const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
//         const isCanvasEmpty = !pixelData.some(value => value !== 0);

//         if (isCanvasEmpty) {
           
//             canvas.classList.add('highlight');
           
//         } else {
//             canvas.classList.remove('highlight');
          
//         }
//     });
// }

function Submission() {
    const valid = validateForm(true);
    if (valid) {
        showSuccessModal();
        collectFormData();

    } else {
        showInvalidModal();
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

function showSuccessModal() {
   const drugPositive= document.getElementById('affirmativeNotes');
   const overlay = document.getElementById('overlay1');
   const valid=validateForm(true);
    if(drugPositive && valid){
        console.log("getting the drug test positive value", drugPositive.value);
    const drugModal= document.getElementById('drugTestFailed');
    if(drugModal){
        drugModal.style.display='block';
        document.body.style.overflow = 'hidden';
        console.log('main division-   ',document.getElementById('main-division1'));
        document.getElementById('firstForm').style.display="none";
        document.getElementById('tabs1').style.display="none";


    }
    }
    else if (valid) {
        const successModal = document.getElementById('successModal1');
        if (successModal && overlay) {
            showCheckmark('form1Tick');
            successModal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    else {
        hideCheckmark('form1Tick');
        showInvalidModal();
    }

}

function showInvalidModal() {
    const invalidModal = document.getElementById('invalidModal1');
    const overlay = document.getElementById('overlay1');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
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

function closeDialog(id) {
    const modalContent = document.getElementById(id);
    const overlay = document.getElementById('overlay1');
    if (id=='thanksModal') {
        modalContent.style.display = 'none';
       document.body.style.overflow = 'auto';
    }else{
        if (modalContent && overlay) {
            modalContent.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        modalContent.style.display = 'none';
        overlay.style.display = 'none';
       document.body.style.overflow = 'auto';
    }
}
function loadForm2(id) {
    const modalContent = document.getElementById(id);
    const overlay = document.getElementById('overlay1');
    if (modalContent && overlay) {
        modalContent.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    fetch('../form2/form2.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            showCheckmark('form1Tick');
            loadScript('../form2/form2.js');
            loadStyleSheet("../form2/form2.css");
            removeStyleSheet('../form1/form1.css');
            removeScript('../form1/form1.js')
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

function removeScript(scriptUrl) {
    const script = document.querySelector(`script[src="${scriptUrl}"]`);
    if (script) {
        script.parentNode.removeChild(script);
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

function collectFormData() {
    const formData = new FormData();
    const form = document.getElementById("firstForm-page1");

    if (!form) {
        console.error("Form not found.");
        return;
    }

    // Collect all input, select, and textarea fields
    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach(field => {
        if (field.type === "radio" || field.type === "checkbox") {
            if (field.checked) {
                formData.append(field.name, field.value);
            }
        } else {
            formData.append(field.name, field.value);
        }
    });

    // Convert signature canvas to Blob and append
    const canvas = document.getElementById("signBox1");
    if (canvas) {
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

// function sendFormDataToAPI(formData) {
//     fetch("url", { // Replace with your API URL
//         method: "POST",
//         body: formData, // Sending multipart/form-data
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Success:", data);
//         alert("Form submitted successfully!");
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         alert("Failed to submit form.");
//     });
// }


initializeSignatureBox();
addChangeEvent();