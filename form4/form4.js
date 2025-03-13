function addAttachment(value) {
    if (value == 'yes') {
        const attachCertificate = document.createElement('div');
        attachCertificate.classList.add('mb-3', 'mt-4');
        attachCertificate.id = `attachCertificate`;
        attachCertificate.innerHTML = ` <label class="question-label">Attach Certificate (The Exam has to be done within the last SIX(6) Months) </label>
                        <input required type="file" id="medicalCertificate" name="medicalCertificateData" class="form-control mt-2" oninput="validateForm('form4', 1,false)" />`
        document.getElementById("doneInSix").appendChild(attachCertificate);
        validateForm('form4', 1,false);

    }
}

function removeAttachment(value) {
    if (value == 'no') {
        const removeDot = document.getElementById(`attachCertificate`);
        if (removeDot) {
            removeDot.remove();
            validateForm('form4', 1,false);
        }
    }
}
function Submission() {
    const valid = validateForm('form4', 1,true);
    if (valid) {
        collectFormData();
        showThanksModal();

    } else {
        showInvalidModal();
    }
}



function validateForm(formId, pageNumber,bool) {
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

          if (input.type === 'radio') {
                const radios = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(radios).some(radio => radio.checked);
                if (!isAnyChecked) {
                    isValid = false;
                    if(bool){
                    radios.forEach(radio => radio.classList.add('highlight-feedback'));
                    }
                } else {
          
                    radios.forEach(radio => radio.classList.remove('highlight-feedback'));
                 
                }
            } else if (input.required) { 
                if (input.value.trim()) {
                    input.classList.remove('highlight');
                } else {
                    isValid = false;
                    if(bool){
                    input.classList.add('highlight');
                    }
                }
            } else {
                input.classList.remove('highlight');
            }

        };

        input.addEventListener('input', validateInput);

        validateInput();
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
        const btn=document.getElementById("submit4");
        if(isValid){
       btn.classList.remove("notValid-btn");
       btn.classList.add("valid-btn");
        }else{
            btn.classList.add("notValid-btn");
            btn.classList.remove("valid-btn");

        }
    }
    return isValid;
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

function showInvalidModal() {
    const invalidModal = document.getElementById('invalidModal');
    const overlay = document.getElementById('overlay');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function showThanksModal() {
        const successModal = document.getElementById('thanksModal');
        const page = document.getElementById('form4');
        const tabs= document.getElementById('tabs4');
        if (successModal && overlay) {
            showCheckmark('form4Tick');
            successModal.style.display = 'block';
            page.style.display = 'none';
            tabs.style.display = 'none';
            document.body.style.overflow = 'hidden';
        }
}


function closeDialog(id) {
    const modalContent = document.getElementById(id);
    const overlay = document.getElementById('overlay');
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
    const form = document.getElementById("form4-page1"); // Ensure correct form ID

    if (!form) {
        console.error("Form not found.");
        return;
    }

    // Collect all input, select, and textarea fields
    const fields = form.querySelectorAll("input, select, textarea");
    let filePromises = []; // Store promises for async file reading

    fields.forEach(field => {
        if (field.type === "radio" || field.type === "checkbox") {
            if (field.checked) {
                formData.append(field.name, field.value);
            }
        } else if (field.type === "file") {
            if (field.files.length > 0) {
                if(field.id){
                let filePromise = readDataAsURL(field.id).then(base64String => {
                    formData.append(field.name, base64String);
                }).catch(error => {
                    console.error("File conversion error:", error);
                });

                filePromises.push(filePromise); // Store the promise
            }
            }
        } else {
            formData.append(field.name, field.value);
        }
    });

    // Wait for all file conversions to complete using .then()
    Promise.all(filePromises)
        .then(() => {
            console.log("FormData before sending:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": ", pair[1]);
            }
            // Send to API
            // sendFormDataToAPI(formData);
        })
        .catch(error => {
            console.error("Error processing files:", error);
        });
}

function readDataAsURL(id) {
    return new Promise((resolve, reject) => {
        let fileInput = document.getElementById(id);
        if (!fileInput || fileInput.files.length === 0) {
            reject("Error: No file selected for " + id);
            return;
        }

        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file); // Convert file to Base64

        reader.onload = function () {
            resolve(reader.result); // Return Base64 string
        };

        reader.onerror = function (error) {
            reject("Error converting file: " + error);
        };
    });
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