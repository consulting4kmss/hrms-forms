let form1Completed = false;
let form2Completed = false;

function loadForm1() {
    fetch('../form1/form1.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form1/form1.js');
            addForm1EventListeners();
        })
        .catch(error => console.error('Error loading Form 1:', error));
}

function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}

function addForm1EventListeners() {
    const form1SubmitButton = document.querySelector('.submit-btn');
    if (form1SubmitButton) {
        form1SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();  
            form1Completed = true;

            // const firstName = document.querySelector('input[name="firstName"]').value;
            // const lastName = document.querySelector('input[name="lastName"]').value;
            // const conditions = document.querySelector('input[name="conditions"]').value;
            // const email = document.querySelector('input[name="email"]').value;

            // console.log("Form 1 Submitted Data:");
            // console.log("First Name:", firstName);
            // console.log("Last Name:", lastName);
            // console.log("Known Medical Conditions:", conditions);
            // console.log("Email:", email);

            enableForm2();  
            showCheckmark('form1Tick');  
            showSuccessModal();  
        });
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
    if (!form1Completed) {
        return;  
    }

    fetch('../form2/form2.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form2/form2.js');
            addForm2EventListeners();  
        })
        .catch(error => console.error('Error loading Form 2:', error));
}

function addForm2EventListeners() {
    const form2SubmitButton = document.querySelector('.submit-btn');
    if (form2SubmitButton) {
        form2SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();  

           
            const height = document.querySelector('input[name="height"]').value;
            const conditions = document.querySelector('input[name="conditions"]').value;
            const contact = document.querySelector('input[name="contact"]').value;

            if (height && conditions && contact) {
                console.log("Form 2 Submitted Data:");
                console.log("Height:", height);
                console.log("Known Medical Conditions:", conditions);
                console.log("Emergency Contact:", contact);

                form2Completed = true;
                showCheckmark('form2Tick');  
                showSuccessModal();  
            } else {
                console.error("Some form fields are missing in Form 2!");
                return;
            }
        });
    }
}

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

