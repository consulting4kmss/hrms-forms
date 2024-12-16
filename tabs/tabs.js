let form1Completed = false;
let form2Completed = false;

function loadForm1() {
    fetch('../form3/form3.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form3/form3.js');
            // addForm1EventListeners();
        })
        .catch(error => console.error('Error loading Form 1:', error));
}

function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}



function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'block';
    }
}


function closeModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
}



function enableForm2() {
    const form2Link = document.getElementById('form2Link');
    form2Link.classList.remove('unclickable');  
    form2Link.setAttribute('onclick', 'loadForm2()');  
    form2Link.style.pointerEvents = 'auto';  
    loadForm2();  
}

function loadForm2() {
    // if (!form1Completed) {
    //     return;  
    // }

    fetch('../form2/form2.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form2/form2.js');
            // addForm2EventListeners();  
        })
        .catch(error => console.error('Error loading Form 2:', error));
}

// function addForm2EventListeners() {
//     const form2SubmitButton = document.querySelector('.submit-btn');
//     if (form2SubmitButton) {
//         form2SubmitButton.addEventListener('click', function (event) {
//             event.preventDefault();  

           
//             const height = document.querySelector('input[name="height"]').value;
//             const conditions = document.querySelector('input[name="conditions"]').value;
//             const contact = document.querySelector('input[name="contact"]').value;

//             if (height && conditions && contact) {
                

//                 form2Completed = true;
//                 showCheckmark('form2Tick');  
//                 showSuccessModal();  
//             } else {
//                 console.error("Some form fields are missing in Form 2!");
//                 return;
//             }
//         });
//     }
// }

function showCheckmark(formId) {
    const checkmark = document.getElementById(formId);
    if (checkmark) {
        checkmark.classList.add('visible'); 
    }
}

function nextPage(pageNumber) {
    const pages = document.querySelectorAll('.form-page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(`form2-page${pageNumber}`).style.display = 'block'; 
}

function previousPage(pageNumber) {
    const pages = document.querySelectorAll('.form-page');
    pages.forEach(page => page.style.display = 'none'); 
    document.getElementById(`form2-page${pageNumber}`).style.display = 'block';  
}

function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'block';  
}

function closeModal() {
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';  
}



