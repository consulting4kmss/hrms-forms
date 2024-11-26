let totalFields = 0;
let totalPages = 0;

function initializeForm(formId) {
    totalPages = document.querySelectorAll(`#${formId} .form-page`).length;
    totalFields = document.querySelectorAll(`#${formId} .form-page input`).length;

    updatePageInfo(formId, 1);

    const fields = document.querySelectorAll(`#${formId} .form-page input`);
    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress(formId);
            toggleHighBpFields(); 
        });
    });
    document.getElementById('visionYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('visionNo').checked = false;
        }
        updateProgress(formId);
    });
    document.getElementById('visionNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('visionYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('otherYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('otherNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('otherNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('otherYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('hearingYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('hearingNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('hearingNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('hearingYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('hearingotherYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('hearingotherNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('hearingotherNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('hearingotherYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('migrainesYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('migrainesNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('migrainesNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('migrainesYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('headachesYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('headachesNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('headachesNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('headachesYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('tbiYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('tbiNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('tbiNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('tbiYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('thyroidYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('thyroidNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('thyroidNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('thyroidYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('irregularHeartbeatYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('irregularHeartbeatNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('irregularHeartbeatNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('irregularHeartbeatYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('highBpYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('highBpNo').checked = false; 
        }
        updateProgress(formId);
        toggleHighBpFields(); 
    });
    document.getElementById('highBpNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('highBpYes').checked = false; 
        }
        updateProgress(formId);
        toggleHighBpFields(); 
    });
    document.getElementById('heartDiseaseYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('heartDiseaseNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('heartDiseaseNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('heartDiseaseYes').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('heartFailureYes').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('heartFailureNo').checked = false; 
        }
        updateProgress(formId);
    });
    document.getElementById('heartFailureNo').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('heartFailureYes').checked = false; 
        }
        updateProgress(formId);
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
    const form = document.getElementById(formId);
    const fields = form.querySelectorAll('.form-page input');
    let filledFields = 0;

    fields.forEach(field => {
        if ((field.type === 'text' || field.type === 'email' || field.type === 'date') && field.value) {
            filledFields++;
        }
        if (field.type === 'checkbox' && field.checked) {
            filledFields++;
        }
    });

    const percentage = (filledFields / totalFields) * 100;

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = percentage + '%';

    const percentageText = document.getElementById('currentPagePercentage');
    percentageText.textContent = Math.round(percentage) + '%';
    
    percentageText.style.left = `${percentage}%`;  
}

function nextPage(pageNumber) {
    const form = document.getElementById('form1');
    const currentPage = form.querySelector(`#form1-page${pageNumber - 1}`);
    const nextPage = form.querySelector(`#form1-page${pageNumber}`);

    currentPage.style.display = 'none';
    nextPage.style.display = 'block';

    updatePageInfo('form1', pageNumber);
}

function previousPage(pageNumber) {
    const form = document.getElementById('form1');
    const currentPage = form.querySelector(`#form1-page${pageNumber + 1}`);
    const previousPage = form.querySelector(`#form1-page${pageNumber}`);

    currentPage.style.display = 'none';
    previousPage.style.display = 'block';

    updatePageInfo('form1', pageNumber);
}
function toggleHighBpFields() {
    if (highBpYes.checked) {
        highBpYearInput.style.display = 'block'; 
        highBpExplanationInput.style.display = 'block'; 
    } else if(highBpNo.checked) {
        highBpYearInput.style.display = 'none'; 
        highBpExplanationInput.style.display = 'none'; 
    }
    else{
        highBpYearInput.style.display = 'none'; 
        highBpExplanationInput.style.display = 'none';
    }
    updateProgress('form1');
}



initializeForm('form1');
