var totalFields2 = 0;
var totalPages2 = 0;
let formCounter = 1;
let totalYears = 0;
function nextPage2(pageNumber) {
    if (validatePage('form2', pageNumber - 1, true)) {
        if (pageNumber == 9) {
            initializeSignatureBox();
            clearSign();
            addForm2EventListeners();

        }
        if (pageNumber - 1 == 7) {
            reason = document.getElementById('employHistroy');
            if (totalYears >= 10 || reason.value) {
                collectFormData('form2', pageNumber - 1);
                const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
                const nextPage = document.querySelector(`#form2-page${pageNumber}`);
                currentPage.style.display = 'none';
                nextPage.style.display = 'block';
                updatePageInfo2('form2', pageNumber);
                caluclateTotalFeilds();


            }
        }
        if (pageNumber - 1 == 1) {
            if (validateAddressHistory()) {
                collectFormData('form2', pageNumber - 1);
                const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
                const nextPage = document.querySelector(`#form2-page${pageNumber}`);
                const inputs = nextPage.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', () => {
                        validatePage('form2', pageNumber, false)
                    })
                })
                currentPage.style.display = 'none';
                nextPage.style.display = 'block';
                updatePageInfo2('form2', pageNumber);
                caluclateTotalFeilds();
            }else{ showInvalidDates()}
        }
        else {
            //         const form = document.getElementById(formId);
            // const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
            // if(pageNumber-1==4){
            //     collectAccidentData();
            // }else{
            collectFormData('form2', pageNumber - 1);
            //}
            const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
            const nextPage = document.querySelector(`#form2-page${pageNumber}`);
            const inputs = nextPage.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    validatePage('form2', pageNumber, false)
                })
            })
            
            currentPage.style.display = 'none';
            nextPage.style.display = 'block';
            updatePageInfo2('form2', pageNumber);
            caluclateTotalFeilds();
            if (pageNumber == 7) {
                addSectionListener();
                checkSections();
                validateEmploymentHistory();
            }
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
function maxDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]'); // Select all date inputs
    dateInputs.forEach(input => {
        if(input.id=="dlxpiry" || input.id=="preDlExpiry"){
            return
        }
        input.setAttribute("max", today); // Set max attribute to today's date
    });

    addressTo.addEventListener("click", function (event) {
        const addressTo = document.getElementById("addressTo");
        if (addressTo) {

            addressTo.value = today;
        }
    });


}

function initializeForm2(formId) {
    totalPages2 = document.querySelectorAll(`#${formId} .form-page2 `).length;
    maxDate();

    caluclateTotalFeilds()

    updatePageInfo2(formId, 1);
    // toggleFields2(formId, toggleFieldsConfig2);


    const fields = document.querySelectorAll(`#${formId} .form-page2 input, #${formId} .form-page2 select`);

    fields.forEach(field => {
        field.addEventListener('change', () => {
            updateProgress2(formId);
        });
    });
    const nextPage = document.querySelector(`#form2-page1`);
    const inputs = nextPage.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validatePage('form2', 1, false);
        })
    })

  
    handleMutualExclusiveCheckboxes2(formId);
    updateProgress2(formId);
    const initialAddresssHistory = 'yes'
    populateSavedAddresses(savedAddresses, initialAddresssHistory);
    initializePage2(DataForm2);
    const initialVoilation = 'yes';
    populateViolationData(savedViolations, initialVoilation);
    const initialAccident = 'yes';
    populateAccidentData(savedAccidents, initialAccident);
    populateLicenseData(savedLicenseData);
    militaryDriverData(savedMilitaryDrivingData);
    initializeEmploymentForm(savedEmploy);
    checkSections();
    setTimeout(() => {
       //validatePage('form2',5, false);
        validatePage('form2',1, false);
        validatePage('form2',2, false);
        validatePage('form2',3, false);
        validatePage('form2',4, false);
        validatePage('form2',6, false);
        validatePage('form2',7, false);
        validatePage('form2',8, false);
        validatePage('form2',9, false);
    }, 200);

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


function validateAddressHistory() {

    function getEDTDate(dateStr, mode = "start") {
        let utcDate = new Date(dateStr + "T12:00:00Z");

        let edtDateStr = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(utcDate);

        let [month, day, year] = edtDateStr.split("/");

        if (mode === "start") {
            return new Date(Number(year), Number(month) - 1, 1, 0, 0, 0, 0);
        } else {
            return new Date(Number(year), Number(month), 0, 0, 0, 0, 0);
        }
    }

    function getMonthDifference(start, end) {
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }

    let today = getEDTDate(new Date().toISOString().split("T")[0], "end");
    let threeYearsAgo = new Date(today.getFullYear() - 3, today.getMonth(), 1);

    let addressPeriods = [];
    let totalMonths = 0;

    document.querySelectorAll("#mainAddressContainer, #addressSon").forEach(container => {
        let fromInput = container.querySelector('[id^="addressFrom"]');
        let toInput = container.querySelector('[id^="addressTo"]');

        if (fromInput?.value && toInput?.value) {
            let fromDate = getEDTDate(fromInput.value, "start");
            let toDate = getEDTDate(toInput.value, "end");

            if (fromDate <= toDate) {
                totalMonths += getMonthDifference(fromDate, toDate) + 1;
                addressPeriods.push({ from: fromDate, to: toDate });
            }
        }
    });

    if (addressPeriods.length === 1) {
        let period = addressPeriods[0];
        if (period.from <= threeYearsAgo && period.to >= today) {
            return true;
        }
    }
    console.log("TOTAL MONTHS ", totalMonths);
    if (totalMonths >= 36) {
        addressPeriods.sort((a, b) => a.from - b.from);

        let coveredUntil = null;

        for (let period of addressPeriods) {
            if (coveredUntil === null) {
                if (period.from > threeYearsAgo) {
                  //  showInvalidDates();
                    console.log("period.from >= threeYearsAgo ", period.from > threeYearsAgo);
                    console.log("period.from  ", period.from, " threeYearsAgo ", threeYearsAgo);
                    return false;
                }
            } else {
                let monthGap = getMonthDifference(coveredUntil, period.from);
                if (monthGap > 1) {
                  //  showInvalidDates();
                    console.log("monthGap > 1", monthGap);
                    return false;
                }
            }
            coveredUntil = new Date(period.to.getFullYear(), period.to.getMonth() + 1, 1); // move to next month
        }

        if (getMonthDifference(threeYearsAgo, coveredUntil) >= 36) {
            return true;
        }
    }

   // showInvalidDates();
    return false;
}



var addressCounter = 1; // Counter for unique IDs

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
        const label = newTemplate.querySelector('.question-label');
        if (label) {
            label.textContent = `Additional Address #${addressCounter}`;
        }
        // Reset inputs in the cloned template
        newTemplate.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(el => el.value = '');
        newTemplate.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
        newTemplate.querySelectorAll('select').forEach(el => el.value = '');


        addressSection.appendChild(newTemplate);
        maxDate();

        caluclateTotalFeilds();
    } else if (radio.value === 'no') {
        // Remove all templates with a higher data-template-id
        const currentTemplateId = parseInt(parentContainer.dataset.templateId, 10);
        document.querySelectorAll('#addressSon').forEach(el => {
            if (parseInt(el.dataset.templateId, 10) > currentTemplateId) {
                addressCounter--;
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
                <p class="mainHeading" style="border-bottom: 2px solid #8bafdf; width: 100%; padding-bottom: 5px;">
                    Address History Continued
                </p>
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
                                    class="form-control" maxlength="200" onchange="updateProgress2('form2')" placeholder="Enter Text">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col">
                                <label class="question-label">City</label>
                                <input required type="text" name="city${addressCounter}" maxlength="50" autocomplete="off" id="additionalCity${addressCounter}"
                                    oninput="validInput(this, /^[a-zA-Z ]*$/, 'Only Letters are allowed.',true)"
                                    class="form-control"  maxlength="50" onchange="updateProgress2('form2')" placeholder="Enter Text" />
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
                                <input required type="text" name="zip${addressCounter}" id="additionalZip${addressCounter}" autocomplete="off" maxlength="9"
                                    class="form-control" onchange="updateProgress2('form2')"
                                    oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.',true)"
                                    placeholder="Enter Number" />
                                <small class="error-message"></small>
                            </div>
                        </div>
                        <div class="form-row">
                            <div>
                                <label class="question-label">From</label>
                                <input required type="date"  class="dab form-control" id="addressFrom${addressCounter}" name="from${addressCounter}"
                                    onchange="handleDateChange2(event,true)">
                                <small class="error-message"></small>
                            </div>
                            <div>
                                <label class="question-label">To</label>
                                <input required type="date"  class="dab form-control" id="addressTo${addressCounter}" name="to${addressCounter}"
                                    onchange="handleDateChange2(event,true)">
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
        maxDate();
        caluclateTotalFeilds();
        validatePage('form2', 1, false);
        addNextButtonListner(addressHistory.id, 1);
    }
}

function removeHistoryElement(value) {
    if (value == 'no') {
        const Element = document.getElementById('Address1');
        if (Element) {
            addressCounter = 1;
            Element.remove();
        }
        validatePage('form2', 1, false);
        caluclateTotalFeilds();
    }




}


function recalculateAddressIds() {
    const addressElements = document.querySelectorAll('#addressSon');
    if (addressElements.length > 0) {
        // Get the highest data-template-id among the remaining elements
        addressCounter = Math.max(...Array.from(addressElements).map(el => parseInt(el.dataset.templateId, 10)));
    } else {
        addressCounter = 1; // Reset if no elements exist
    }

}



const savedAddresses = [
    {
        address: "123 Main St",
        city: "New York",
        state: "New York",
        zip: "10001",
        from: "2022-01-01",
        to: "2022-12-31",
        historyAddress: "yes"
    },
    {
        address: "456 Broadway",
        city: "Los Angeles",
        state: "California",
        zip: "90001",
        from: "2021-01-01",
        to: "2021-12-31",
        historyAddress: "yes"
    },
    {
        address: "789 Sunset Blvd",
        city: "Chicago",
        state: "Illinois",
        zip: "60007",
        from: "2020-01-01",
        to: "2020-12-31",
        historyAddress: "no"
    }
];

function populateSavedAddresses(savedAddresses, initialAddressHistory) {
    if (!savedAddresses || savedAddresses.length === 0) return;

    // Check if any historyAddress is "yes"
    const hasHistory = savedAddresses.some(data => data.historyAddress === "yes");

    if (hasHistory) {
        addressHistory('yes'); // Trigger only once to add the first history section
    }
    if (initialAddressHistory == 'yes') {
        const AddressYes = document.getElementById('addressYes');
        AddressYes.checked = true;


     // To match with addressCounter

            savedAddresses.forEach((data, index) => {
                if (index > 0) {
                    // Simulate clicking "yes" to add more address forms
                    const lastYesRadio = document.querySelector(`#addressYes${index}`);
                    if (lastYesRadio) {
                        lastYesRadio.checked = true;
                        handleAddressChange(lastYesRadio);
                    }
                }

                // Fill the current address form
                document.getElementById(`additionalAddress${index + 1}`).value = data.address;
                document.getElementById(`additionalCity${index + 1}`).value = data.city;
                document.getElementById(`additionalState${index + 1}`).value = data.state;
                document.getElementById(`additionalZip${index + 1}`).value = data.zip;
                document.getElementById(`addressFrom${index + 1}`).value = data.from;
                document.getElementById(`addressTo${index + 1}`).value = data.to;

                const isLast = index === savedAddresses.length - 1;
                const nextRadioId = isLast ? `addressNo${index + 1}` : `addressYes${index + 1}`;
                const nextRadio = document.getElementById(nextRadioId);
                if (nextRadio) nextRadio.checked = true;
            });
     
    } else {
        const AddressNo = document.getElementById('addressNo');
        AddressNo.checked = true
    }
}

const DataForm2={
    "current_dl_state": "California",
    "current_dl_number": "D123456789012345",
    "current_dl_expiry": "2026-12-31",
    "previous_dl_state": "Arizona",
    "previous_dl_number": "A987654321098765",
    "previous_dl_expiry": "2024-06-30",
    "current_dl_type": "Commercial: CDL A,B or C",
    "current_dl_endorsements": "Other"
  }
function initializePage2(data){
 const currentState = document.getElementById("dlState");
 const stateValue = data.current_dl_state;
 
 // Loop through options to set selected attribute
 [...currentState.options].forEach(option => {
   if (option.value === stateValue) {
     option.selected = true;
   }
 });


 currentDlNumber=document.getElementById("currentDlNumber");
 currentDlNumber.value=data.current_dl_number;

 currentDlExpiry=document.getElementById("dlxpiry");
 currentDlExpiry.value=data.current_dl_expiry;

 previousDlState=document.getElementById("preDlState");
 previousDlStateValue=data.previous_dl_state;

 [...previousDlState.options].forEach(option => {
    if (option.value === previousDlStateValue) {
      option.selected = true;
    }
  });

 previousDlNumber=document.getElementById("preDlNumber");
 previousDlNumber.value=data.previous_dl_number;

 previousExpiry=document.getElementById("preDlExpiry");
 previousExpiry.value=data.previous_dl_expiry;

 previousDlNumber=document.getElementById(data.current_dl_type);
 previousDlNumber.checked=true;

 previousDlNumber=document.getElementById(data.current_dl_endorsements);
 previousDlNumber.checked=true;
};

function licenseAccepted(value) {
    if (value == 'no') {
        if (document.getElementById('denyExplanation')) {
            document.getElementById('denyExplanation').remove();
            validatePage('form2', 5, false);
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
                    <textarea maxlength="250" required id="licenseDenyExplanation" name="licenseDenyExplanation" rows="4" class="form-control mt-2 txtfeild "></textarea>
                `;
        const MainContainer = document.getElementById('licenseContainer');
        MainContainer.appendChild(licenseElement);
        maxDate();
        caluclateTotalFeilds();
        validatePage('form2', 5, false);
        addNextButtonListner('licenseContainer', 5);

    }

}

function licenseSuspended(value) {
    if (value == 'yes') {
        const suspendExplain = document.createElement('div');
        suspendExplain.id = 'suspendedExplanation';
        suspendExplain.classList.add('col-12', 'mt-3');

        suspendExplain.innerHTML = `
                    <label class="question-label">Disclosure</label>
                    <textarea maxlength="250" required id="licenseSuspendedExplanation"  name="licenseSuspendedExplanation" rows="4" class="form-control mt-2 txtfeild "></textarea>
              `
        document.getElementById('suspendContainer').appendChild(suspendExplain);
        maxDate();
        caluclateTotalFeilds();
        validatePage('form2', 5, false);
        addNextButtonListner('suspendContainer', 5);


    }

}
function licenseNotSuspended(value) {
    if (value == 'no') {
        suspendExplainBox = document.getElementById('suspendedExplanation');
        if (suspendExplainBox) {
            suspendExplainBox.remove();
            validatePage('form2', 5, false);
            caluclateTotalFeilds();
        }
    }
}

const savedLicenseData = {
    licenseDeny: "yes",
    licenseDenyExplanation: "I was once denied due to expired documentation.",
    licenseSuspended: "yes",
    licenseSuspendedExplanation: "My license was suspended for a month due to speeding."
};

function populateLicenseData(data) {
    if (data.licenseDeny === "yes") {
        document.getElementById("licenseDenyYes").checked = true;
        licenseDenied("yes");

            const denyInput = document.getElementById("licenseDenyExplanation");
            if (denyInput) denyInput.value = data.licenseDenyExplanation;
    } else if (data.licenseDeny === "no") {
        document.getElementById("licenseDenyNo").checked = true;
        licenseAccepted("no");
    }

    if (data.licenseSuspended === "yes") {
        document.getElementById("licenseSuspendedYes").checked = true;
        licenseSuspended("yes");
            const suspendInput = document.getElementById("licenseSuspendedExplanation");
            if (suspendInput) suspendInput.value = data.licenseSuspendedExplanation;
    } else if (data.licenseSuspended === "no") {
        document.getElementById("licenseSuspendedNo").checked = true;
        licenseNotSuspended("no");
    }
    validatePage('form2', 5, false);
}


function handleDateChange2(event, bool) {
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
        if(input.id=="dl")
        if (bool) {
            input.classList.add('highlight');
            errorField.style.display = 'block';
            errorField.textContent = 'Invalid date. Please enter a valid Year.';
        }
        if((input.id=="dlxpiry" || input.id=="preDlExpiry") && year > 1900){
            input.classList.remove('highlight');
            errorField.style.display = 'none';
            errorField.style.display = 'none';
            return true
        }
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

function validateAndFormatPhoneNumber(input, bool) {
    let rawValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    const errorField = input.nextElementSibling; // Select the small tag for error messages

    // Truncate to 10 digits if input exceeds 10 characters
    if (rawValue.length > 10) {
        rawValue = rawValue.substring(0, 10);
    }

    // Handle empty input (allows clearing)
    if (rawValue.length === 0) {
        input.value = '';
        if (bool) {
            input.classList.add('highlight');
            errorField.textContent = 'Phone number must be exactly 10 digits.';
            errorField.style.display = 'block';
        }
        return false;
    }

    // Validate and show error for invalid length
    if (rawValue.length !== 10) {
        if (bool) {
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
    input.value = formatPhoneNumber(rawValue);
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
        if (bool) {
            input.classList.add('highlight');
            if (errorField) {
                errorField.style.display = 'block';
                errorField.textContent = errorMessage;
            }
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


function validateAndFormatSSN(input, bool) {
    let rawValue = input.value.replace(/\D/g, ''); // Remove all non-numeric characters
    const errorField = input.nextElementSibling; // Select the small tag for error messages

    // Truncate to 9 digits if input exceeds 9 characters
    if (rawValue.length > 9) {
        rawValue = rawValue.substring(0, 9);
    }

    // Handle empty input (allows clearing)
    if (rawValue.length === 0) {
        input.value = '';
        if (bool) {
            input.classList.add('highlight');
            errorField.textContent = 'SSN must be exactly 9 digits.'; // Clear error message
            errorField.style.display = 'block';
        }
        return false;
    }

    // Validate and show error for invalid length (less than 9 digits)
    if (rawValue.length !== 9) {
        if (bool) {
            input.classList.add('highlight');
            errorField.textContent = 'SSN must be exactly 9 digits.';
            errorField.style.display = 'block';
            input.value = formatSSN(rawValue); // Format partial input for better UX
        }
        return false;
    }

    // Clear error message if input is valid
    input.classList.remove('highlight');
    errorField.textContent = '';
    errorField.style.display = 'none';

    // Format and set the SSN
    input.value = formatSSN(rawValue);
    return true;
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




function validatePage(formId, pageNumber, bool) {
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);
    const inputs = currentPage.querySelectorAll('input, select, textarea');
    const canvases = currentPage.querySelectorAll('canvas');
    let isValid = true;

    inputs.forEach(input => {
        //Skip hidden inputs  

        // const isHidden = getComputedStyle(input).display === 'none'|| input.closest('[style*="display: none"]') ;
        // if (isHidden) {
        //     return;
        // }

        const validateInput = () => {
            if (input.type === 'checkbox' && input.required) {
                const checkboxes = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                let isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                const endDateField = document.getElementById('companySeparation');
                // toggleEmploymentDates();
                if (endDateField.required && input.id === 'stillEmployee') {
                    // isAnyChecked = Array.from(checkboxes)
                    //     .filter(checkbox => checkbox.id !== 'stillEmployee') // Exclude 'stillEmployee'
                    //     .some(checkbox => checkbox.checked); 
                    return;
                }

                if (!isAnyChecked) {

                    isValid = false;
                    if (bool) {
                        checkboxes.forEach(checkbox => checkbox.classList.add('highlight-feedback'));
                    }
                } else {
                    checkboxes.forEach(checkbox => checkbox.classList.remove('highlight-feedback'));
                }
            } else if (input.type === 'radio') {
                const radios = currentPage.querySelectorAll(`input[name="${input.name}"]`);
                const isAnyChecked = Array.from(radios).some(radio => radio.checked);
                if (!isAnyChecked) {
                    isValid = false;
                    if (bool) {
                        radios.forEach(radio => radio.classList.add('highlight-feedback'));
                    }
                } else {
                    radios.forEach(radio => radio.classList.remove('highlight-feedback'));
                }
            } else if (input.required) {
                if (input.tagName === 'SELECT' && !input.value) {
                    isValid = false;
                    if (bool) {
                        input.classList.add('highlight');
                    }
                } else if (input.tagName === 'TEXTAREA' && !input.value.trim()) {
                    isValid = false;
                    if (bool) {
                        input.classList.add('highlight');
                    }
                } else if (input.value.trim()) {
                    input.classList.remove('highlight');
                } else {
                    isValid = false;
                    if (bool) {
                        input.classList.add('highlight');
                    }
                }
                if (input.name === "home" || input.name === "supervisorNo") {
                    const isPhoneValid = validateAndFormatPhoneNumber(input, bool);
                    if (!isPhoneValid) {
                        isValid = false;
                    }
                }
                if (input.name === "ssn") {
                    const isSSNValid = validateAndFormatSSN(input, bool);
                    if (!isSSNValid) {
                        isValid = false;
                    }
                }
                if (input.type === "date") {
                    const errorField = input.nextElementSibling;
                    if (!handleDateChange2({ target: input }, bool)) {
                        isValid = false;
                        errorField.textContent = "Invalid date. Please enter a valid Date.";
                        if (input.id === "companySeparation" || input.id === "companyStart") {
                            errorField.textContent = "Please enter a valid Date.";
                        }
                        if (bool) {
                            input.classList.add('highlight');
                            errorField.style.display = 'block';
                        }
                    } else {
                        input.classList.remove('highlight');
                        errorField.textContent = "";
                        errorField.style.display = 'none';
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

    canvases.forEach(canvas => {
        const context = canvas.getContext('2d');
        const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const isCanvasEmpty = !pixelData.some(value => value !== 0);

        if (isCanvasEmpty) {
            isValid = false;
            if (bool) {
                canvas.classList.add('highlight');
            }
        } else {
            canvas.classList.remove('highlight');
        }
    });
    if(!bool && pageNumber==1 && !validateAddressHistory()){
        isValid=false;
    }
    if (!bool) {
        const nextBtn = document.getElementById(`next${pageNumber}`)
        if (isValid) {
            nextBtn.classList.remove('notValid-btn');
            nextBtn.classList.add('valid-btn');
        } else {
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


async function collectFormData(formId, pageNumber) {
    const formData = new FormData();
    const form = document.getElementById(formId);
    const currentPage = form.querySelector(`#${formId}-page${pageNumber}`);

    if (!currentPage) {
        console.error("Form not found.");
        return;
    }

    // Collect all input, select, and textarea fields
    const fields = currentPage.querySelectorAll("input, select, textarea");

    for (const field of fields) {
        if (field.type === "radio" || field.type === "checkbox") {
            if (field.checked) {
                formData.append(field.name, field.value);
            }
        } else if (field.type === "file") {
            if (field.files.length > 0) {
                if (field.id) {
                    let fileDataObject = {};
                    //JSON Object to store file data
                    let i = 1;
                    for (const file of field.files) {
                        try {
                            const base64String = await readFileAsBase64(file);
                            fileDataObject[field.name + "_" + i] = base64String; //Store as key-value pair
                        } catch (error) {
                            console.error("File conversion error:", error);
                        }
                        i++;
                    }

                    // Store the JSON object under a single key in FormData
                    formData.append(field.name, JSON.stringify(fileDataObject));
                }
            }
        } else {
            formData.append(field.name, field.value);
        }
    }

    console.log("FormData before sending:");
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
    }

    return formData;
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file); // Convert file to Base64

        reader.onload = function () {
            resolve(reader.result.split(",")[1]); // Return Base64 content only (excluding prefix)
        };

        reader.onerror = function (error) {
            reject("Error converting file: " + error);
        };
    });
}


let violationCount = 0;

function handleRadioChange(event) {
    const container = document.getElementById("violation-container");

    if (event.target.value === "yes") {
        // Increment the violation count
        violationCount++;

        // Create a unique ID for the new violation detail
        const violationId = `violationDetail_${violationCount}`;

        // Create the template for the new violation detail
        const template = `
            <div id="${violationId}" class="violation-detail" data-index="${violationCount}">
                <div class="address-container mt-3">
                    <div class="col-12">
                        <label class="question-label">Date of Conviction</label>
                        <input required type="date"  class="dab" name="date-of-conviction_${violationCount}" id="voilationDate-${violationCount}" oninput="handleDateChange2(event,true)" onchange="updateProgress2('form2')">
                         <small class="error-message"></small>
                    </div>
                    <div class="col-12 mt-3">
                        <label class="question-label">Offence</label>
                        <input required type="text" data-validate="text" name="offence_${violationCount}" autocomplete="off" class="form-control"  maxlength="200" id="voilationOffence-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="col-12 mt-3 mb-3">
                        <label class="question-label">Location</label>
                        <input required type="text" data-validate="text" name="voilationLocation_${violationCount}" autocomplete="off" class="form-control"  maxlength="200" id="voilationLocation-${violationCount}" onchange="updateProgress2('form2')">
                    </div>
                    <div class="mt-3 mb-2">
                        <label class="question-label">Type Of Vehicle Operated</label>
                        <div class="form-check col-12 mt-2">
                            <input class="form-check-input box" type="radio"  name="offenceVehicle_${violationCount}" required id="offenceCommercial_${violationCount}" value="Commercial" onchange="updateProgress2('form2')"/>
                            <label class="form-check-label" for="offenceCommercial_${violationCount}" class="label ms-3">Commercial</label>
                        </div>
                        <div class="form-check col-12 mt-2">
                            <input class="form-check-input box" type="radio" name="offenceVehicle_${violationCount}" required id="offencePrivate_${violationCount}"  value="Private" onchange="updateProgress2('form2')"/>
                            <label class="form-check-label"  for="offencePrivate_${violationCount}" class="label ms-3">Private</label>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex flex-column mt-2">
                    <label class="question-label">Do you have additional traffic violations to add?</label>
                    <div class="form-check d-flex align-items-end">
                        <input class="form-check-input" type="radio" required value="no" id="violationNo_${violationCount}" name="trafficVoilation_${violationCount}" onchange="handleRadioChange(event)">
                        <label class="form-check-label label ms-4" for="violationNo_${violationCount}">No</label>
                    </div>
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="radio" name="trafficVoilation_${violationCount}" required value="yes" id="violationYes_${violationCount}"  onchange="handleRadioChange(event)">
                        <label class="form-check-label ms-4" for="violationYes_${violationCount}">Yes</label>
                    </div>
                </div>
            </div>
        `;

        // Append the new section
        container.insertAdjacentHTML("beforeend", template);
        maxDate();
        caluclateTotalFeilds();
        validatePage('form2', 3, false);
        addNextButtonListner("violation-container", 3);
    } else if (event.target.value === "no") {
        const currentViolation = event.target.closest(".violation-detail");

        if (!currentViolation) {
            // This is the first set of "Yes/No" buttons outside the .violation-detail
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            violationCount = 0;
            caluclateTotalFeilds();
            validatePage('form2', 3, false);
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
        validatePage('form2', 3, false);
    }
}


const savedViolations = [
    {
        date: "2022-04-15",
        offence: "Speeding",
        location: "New York",
        vehicleType: "Commercial",
        trafficViolation: "yes"
    },
    {
        date: "2023-01-10",
        offence: "Running Red Light",
        location: "Los Angeles",
        vehicleType: "Private",
        trafficViolation: "yes"
    },
    {
        date: "2023-09-05",
        offence: "Illegal Lane Change",
        location: "Chicago",
        vehicleType: "Commercial",
        trafficViolation: "no"
    }
];



function populateViolationData(savedViolations, initialVoilation) {
    if (!savedViolations || savedViolations.length === 0) return;

    // Automatically select "Yes" to display violation section
    const yesRadio = document.getElementById("voilationYes");
    const noRadio = document.getElementById("voilationNo");
    if (initialVoilation == 'yes') {
        if (yesRadio) {
            yesRadio.checked = true;
            handleRadioChange({ target: yesRadio });
        }


     
            savedViolations.forEach((violation, index) => {

                if (index > 0) {
                    const addMoreRadio = document.querySelector(`#violationYes_${index}`);
                    if (addMoreRadio) {
                        addMoreRadio.checked = true;
                        handleRadioChange({ target: addMoreRadio });
                    }
                }


                document.getElementById(`voilationDate-${index + 1}`).value = violation.date;
                document.getElementById(`voilationOffence-${index + 1}`).value = violation.offence;
                document.getElementById(`voilationLocation-${index + 1}`).value = violation.location;

                const vehicleRadioId = violation.vehicleType === "Commercial"
                    ? `offenceCommercial_${index + 1}`
                    : `offencePrivate_${index + 1}`;

                const vehicleRadio = document.getElementById(vehicleRadioId);
                if (vehicleRadio) {
                    vehicleRadio.checked = true;
                }


                const isLast = index === savedViolations.length - 1;
                const nextRadioId = isLast ? `violationNo_${index + 1}` : `violationYes_${index + 1}`;
                const nextRadio = document.getElementById(nextRadioId);
                if (nextRadio) nextRadio.checked = true;
        
            });
       
    }
    else {
        noRadio.checked = true;
    }
}




function addNextButtonListner(id, pageNumber) {
    const Element = document.getElementById(id);
    inputFeilds = Element.querySelectorAll('input, select, textarea');
    inputFeilds.forEach(input => {
        input.addEventListener('input', () => {
            validatePage('form2', pageNumber, false);
        })
    })

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
                        <input required type="date"  class="dab" name="accidentDate-${accidentCount}" id="accidentDate-${accidentCount}" oninput="handleDateChange2(event,true)" placeholder="MM/DD/YYYY" onchange="updateProgress2('form2')">
                         <small class="error-message"></small>
                    </div>

                    <div class="col-12 d-flex flex-column mt-4">
                        <div>
                            <label class="question-label">Fatalities or Personal Injuries</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" required value="Fatalities" id="fatalities-${accidentCount}" name="fatalities-${accidentCount}" onchange="updateProgress2('form2')">
                            <label class="form-check-label label ms-4" for="fatalities-${accidentCount}">Fatalities</label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" required value=">Personal Injuries" id="injuries-${accidentCount}" name="fatalities-${accidentCount}" onchange="updateProgress2('form2')">
                            <label class="form-check-label ms-4" for="injuries-${accidentCount}">Personal Injuries</label>
                        </div>
                        <div class="col-12 mt-4">
                            <label class="question-label">Circumstances of Accident</label>
                            <textarea maxlength="250" required name="circumstances-${accidentCount}" id="accidentExplanation-${accidentCount}" rows="4" class="form-control mt-2 txtfeild"></textarea>
                        </div>
                        <div class="mb-3 mt-4">
                            <label class="question-label">Attachment (Optional)</label>
                            <input type="file"  id="fileInput-${accidentCount}" name="Attachment_${accidentCount}" multiple class="form-control mt-2" />
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
        maxDate();
        caluclateTotalFeilds();
        validatePage('form2', 4, false);
        addNextButtonListner("accident-container", 4);
    } else if (event.target.value === "no") {
        const currentAccident = event.target.closest(".accident-detail");

        if (!currentAccident) {
            // This is the first set of "Yes/No" buttons outside the .accident-detail
            while (container.firstChild) {
                container.removeChild(container.firstChild);
                caluclateTotalFeilds();
            }
            accidentCount = 0;
            validatePage('form2', 4, false);
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
    validatePage('form2', 4, false);
}




const savedAccidents = [
    {
        date: "2022-03-10",
        fatalityType: "Fatalities",
        circumstances: "Hit by another vehicle on the highway",
        additionalAccident: 'yes'
    },
    {
        date: "2023-05-21",
        fatalityType: "Personal Injuries",
        circumstances: "Rear-ended at a red light",
        additionalAccident: 'yes'
    },
    {
        date: "2023-12-01",
        fatalityType: "Personal Injuries",
        circumstances: "Skidded due to rain and hit a pole",
        additionalAccident: 'yes'
    }
];

function populateAccidentData(savedAccidents, initialAccident) {
    const yesRadio = document.getElementById("accidentYes");
    const noRadio = document.getElementById("accidentNo");

    if (!savedAccidents || savedAccidents.length === 0) {
        noRadio.checked = true;
        return;
    }

    if (initialAccident === "yes" && yesRadio) {
        yesRadio.checked = true;
        handleAccidentChange({ target: yesRadio });


            savedAccidents.forEach((accident, index) => {
                if (index > 0) {
                    const addMoreRadio = document.getElementById(`accidentYes-${index}`);
                    if (addMoreRadio) {
                        addMoreRadio.checked = true;
                        handleAccidentChange({ target: addMoreRadio });
                    }
                }

                document.getElementById(`accidentDate-${index + 1}`).value = accident.date;

                const fatalityRadioId = accident.fatalityType === "Fatalities"
                    ? `fatalities-${index + 1}`
                    : `injuries-${index + 1}`;
                const fatalityRadio = document.getElementById(fatalityRadioId);
                if (fatalityRadio) fatalityRadio.checked = true;

                document.getElementById(`accidentExplanation-${index + 1}`).value = accident.circumstances;

                // Select "No" for further accidents if this is the last one
                const isLast = index === savedAccidents.length - 1;
                const nextRadioId = isLast ? `accidentNo-${index + 1}` : `accidentYes-${index + 1}`;
                const nextRadio = document.getElementById(nextRadioId);
                if (nextRadio) nextRadio.checked = true;
            });
      // Wait for DOM render
    } else {
        noRadio.checked = true;
    }
}


function validateFileCount(input) {
    if (input.files.length > 3) {
        alert("You can only upload a maximum of 3 files.");

        // Create a new FileList containing only the first 3 files
        let fileList = Array.from(input.files).slice(0, 3);

        // Create a DataTransfer object to hold the valid files
        let dataTransfer = new DataTransfer();
        fileList.forEach(file => dataTransfer.items.add(file));

        // Set the input's files to the modified list (without exceeding 3)
        input.files = dataTransfer.files;
    }
}
//<------------------------------------------------------------------PAGE 6---------------------------------->

function militaryDriver(value) {
    if (value == 'yes') {
        const militaryElement = document.createElement('div');
        militaryElement.id = 'fmcsa';
        militaryElement.innerHTML = `
                <div class="address-container mt-4" id="section1">
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

                            <input required type="date"  class="dab form-control " id="fromDateTruck" name="truckFrom"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateTruck" name="truckto"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control"  maxlength="15" id="approxMilesTruck" name="truckmiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.',true)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>

                <div class="address-container mt-4" id="section2">
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

                            <input required type="date"  class="dab form-control " id="fromDateTractor" name="tractorFrom"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateTractor" name="tractorto"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="text" class="form-control" maxlength="15" id="approxMilesTractor" name="tractormiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.',true)" >
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>

                <div class="address-container mt-4" id="section3">
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

                            <input required type="date"  class="dab form-control " id="fromDateBus" name="busFrom"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateBus" name="busto"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="" class="form-control" id="approxMilesBus" name="busmiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.',true)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div>
                <div class="address-container mt-4" id="section4">

                    <div class="col-12 mt-2">
                        <label class="question-label">Other commercial motor vehicles (list)</label>
                        <textarea maxlength="250" required name="otherVehicles" id="otherVehicle" rows="4"
                            class="form-control mt-2 txtfeild "></textarea>
                    </div>


                    <div class="row mt-3 mb-3">
                        <div class="col">
                            <label class="question-label">From</label>

                            <input required type="date"  class="dab form-control " id="fromDateOther" name="otherfrom"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="col">
                            <label class="question-label">To</label>
                            <input required type="date"  class="form-control" id="toDateOther" name="otherto"
                                onchange="handleDateChange2(event,true)">
                            <small class="error-message"></small>
                        </div>
                        <div class="or">
                            <p class="orText">OR</p>
                        </div>
                        <div class="col-5">
                            <label class="question-label">Approximate Number of Miles</label>
                            <input required type="number" class="form-control" id="approxMilesOther" name="othermiles"
                                placeholder="Enter number"  oninput="validInput(this, /^[0-9]*$/, 'Only numbers are allowed.',true)">
                            <small class="error-message"></small>
                        </div>
                    </div>
                </div> `
        document.getElementById('militaryDriving').appendChild(militaryElement);
        maxDate();
        addSectionListener();
        validatePage('form2', 6, false);
        addNextButtonListner("militaryDriving", 6);
        caluclateTotalFeilds();
    }
}
function notMilitaryDriver(value) {
    if (value == 'no') {
        militaryElement = document.getElementById('fmcsa');
        if (militaryElement) {
            militaryElement.remove();
            caluclateTotalFeilds();
            validatePage('form2', 6, false);
        }


    }
}
function addSectionListener() {
    const sections = document.querySelectorAll("[id^='section']");
    sections.forEach(section => {
        const inputs = section.querySelectorAll("input,textarea");
        inputs.forEach(input => {
            input.addEventListener("input", checkSections);
        });
    });
}


function checkSections() {
    const sections = document.querySelectorAll("[id^='section']");
    let lastFilledSection = null;

    for (const section of sections) {
        const inputs = section.querySelectorAll("textarea");

        // Separate checkboxes and other input fields
        const checkboxes = Array.from(section.querySelectorAll("input[type='checkbox']")).filter(input => input.type === "checkbox");

        const dateFrom = section.querySelector("input[id*='fromDate']");
        const dateTo = section.querySelector("input[id*='toDate']");
        const milesInput = section.querySelector("input[id*='approxMiles']");
        dateFeilds = false;
        if ((dateFrom && dateTo) && (dateFrom.value && dateTo.value)) {
            dateFeilds = true;
            milesInput?.classList.remove('highlight');
            milesInput?.removeAttribute("required");
            dateFrom?.setAttribute("required", "true");
            dateTo?.setAttribute("required", "true");
        } else if (milesInput && milesInput.value) {
            dateFeilds = true;
            milesInput?.setAttribute("required", "true");
            dateFrom?.removeAttribute("required");
            dateTo?.removeAttribute("required");

        }


        const atLeastOneCheckboxChecked = checkboxes.length > 0 ? checkboxes.some(input => input.checked) : true;
        if (section.id === 'section4') {
            const textInputs = [...inputs].filter(input => input.type !== "checkbox");
            const allTextFieldsFilled = textInputs.every(input => input.value.trim() !== "");

            if (allTextFieldsFilled && atLeastOneCheckboxChecked && dateFeilds) {
                lastFilledSection = section;
                removeDateHighlight(dateFrom);
                removeDateHighlight(dateTo);
                break;
            } else {

                lastFilledSection = null;
            }

        } else if (atLeastOneCheckboxChecked && dateFeilds) {
            lastFilledSection = section;
            removeDateHighlight(dateFrom);
            removeDateHighlight(dateTo);
            break;

        } else {
            lastFilledSection = null;


        }


    };

    // Ensure only ONE section is marked as filled and enforce "required" attributes accordingly
    sections.forEach(section => {
        let inputs = section.querySelectorAll("input, textarea");

        if (lastFilledSection && section.id !== lastFilledSection.id) {
            // Remove 'required' from other sections
            inputs.forEach(input => {
                input.removeAttribute("required");
                input.classList.remove('highlight');
                input.classList.remove('highlight-feedback');


                if (input.type === 'date') {
                    const errorField = input.nextElementSibling;
                    input.classList.remove('highlight');
                    errorField.textContent = "";
                    errorField.style.display = 'none';
                }
            });
        }
        else {
            if (lastFilledSection && section.id == lastFilledSection.id) {
                inputs = [...section.querySelectorAll("input, textarea")].filter(input => (input.type === "checkbox" || input.tagName === 'TEXTAREA'));
            }

            inputs.forEach(input => {
                if (!input.hasAttribute("required")) {
                    input.setAttribute("required", "true");
                }
            });
        }
    });
}

function removeDateHighlight(input) {

    const errorField = input.nextElementSibling;
    input.classList.remove('highlight');
    errorField.textContent = "";
    errorField.style.display = 'none';
};


const savedMilitaryDrivingData = {
    militaryDriving: "yes",
    straightTruck: ["Van", "Box"],
    truckMiles: "12000",

};

function militaryDriverData(data) {
    if (!data || data.length === 0) return;
    if (data.militaryDriving === "yes") {
        // Select YES radio and trigger change handler
        document.getElementById("militaryYes").checked = true;
        militaryDriver("yes");

        // Give some time for militaryDriver to render content
      
            // Straight Truck
            data.straightTruck?.forEach(val => {
                const el = [...document.getElementsByName("straightTruck")].find(e => e.value === val);
                if (el) el.checked = true;
            });
            data.truckFrom != null ? document.getElementById("fromDateTruck").value = data.truckFrom : "";
            data.truckTo != null ? document.getElementById("toDateTruck").value = data.truckTo : "";
            data.truckMiles != null ? document.getElementById("approxMilesTruck").value = data.truckMiles : "";

            // Tractor & Semi
            data.tractor?.forEach(val => {
                const el = [...document.getElementsByName("tractor")].find(e => e.value === val);
                if (el) el.checked = true;
            });
            data.tractorFrom != null ? document.getElementById("fromDateTractor").value = data.tractorFrom : "";
            data.tractorTo != null ? document.getElementById("toDateTractor").value = data.tractorTo : "";
            data.tractorMiles != null ? document.getElementById("approxMilesTractor").value = data.tractorMiles : "";

            // Bus
            data.bus?.forEach(val => {
                const el = [...document.getElementsByName("bus")].find(e => e.value === val);
                if (el) el.checked = true;
            });
            data.busFrom != null ? document.getElementById("fromDateBus").value = data.busFrom : "";
            data.busTo != null ? document.getElementById("toDateBus").value = data.busTo : "";
            data.busMiles != null ? document.getElementById("approxMilesBus").value = data.busMiles : "";

            //Other
            data.otherVehicle != null ? document.getElementById("otherVehicle").value = data.otherVehicle : "";
            data.fromDateOther != null ? document.getElementById("fromDateOther").value = data.fromDateOther : "";
            data.toDateOther != null ? document.getElementById("toDateOther").value = data.toDateOther : "";
            data.othermiles != null ? document.getElementById("approxMilesOther").value = data.othermiles : "";
       // Wait briefly to ensure DOM is updated
    } else {
        document.getElementById("militaryNo").checked = true;
        notMilitaryDriver("no");
    }
};


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

    const container = document.getElementById('employmentsContainer');
    container.appendChild(newForm);
    maxDate();


    validateEmploymentHistory();
    caluclateTotalFeilds();
    addNextButtonListner(`employmentForm_${formCounter}`, 7);
    validatePage('form2', 7, false);
}



function clearAdditionalForms(currentFormId) {
    const container = document.getElementById('employmentsContainer');

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
    validatePage('form2', 7, false);
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
                                            <input class="form-check-input box" type="radio" required id="dotFMCSA${(dotNumber) ? ('_' + dotNumber) : ''}" name="dotMode${(dotNumber) ? ('_' + dotNumber) : ''}"
                                                value="FMCSA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFMCSA">FMCSA</label>
                                        </div>
                                    </div>
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotPHMSA${(dotNumber) ? ('_' + dotNumber) : ''}" name="dotMode${(dotNumber) ? ('_' + dotNumber) : ''}"
                                                value="PHMSA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotPHMSA">PHMSA</label>
                                        </div>
                                    </div>
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox ">
                                            <input class="form-check-input box" type="radio" required id="dotFAA${(dotNumber) ? ('_' + dotNumber) : ''}" name="dotMode${(dotNumber) ? ('_' + dotNumber) : ''}"
                                                value="FAA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFAA">FAA</label>
                                        </div>
                                    </div>
    
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotFTA${(dotNumber) ? ('_' + dotNumber) : ''}" name="dotMode${(dotNumber) ? ('_' + dotNumber) : ''}"
                                                value="FTA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFTA">FTA</label>
                                        </div>
                                    </div>
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotFRA${(dotNumber) ? ('_' + dotNumber) : ''}" name="dotMode${(dotNumber) ? ('_' + dotNumber) : ''}"
                                                value="FRA" onchange="updateProgress2('form2')">
                                        </div>
                                        <div class="label ms-3">
                                            <label class="form-check-label" for="dotFRA">FRA</label>
                                        </div>
                                    </div>
    
                                    <div class=" form-check col-12 mt-2">
                                        <div class="checkbox">
                                            <input class="form-check-input box" type="radio" required id="dotUSCG${(dotNumber) ? ('_' + dotNumber) : ''}" name="dotMode${(dotNumber) ? ('_' + dotNumber) : ''}"
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
                                            <input class="form-check-input" type="radio" required value="yes" id="verifyyes${(dotNumber) ? ('_' + dotNumber) : ''}"
                                                name="verify${(dotNumber) ? ('_' + dotNumber) : ''}" onchange="updateProgress2('form2')">
                                            <label class="form-check-label ms-4" for="verifyYes">
                                                By checking this box, I give my permission for my current employment to be
                                                verified
                                                immediately.
                                            </label>
                                        </div>
        
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="radio" required value="no" id="verifyno${(dotNumber) ? ('_' + dotNumber) : ''}" name="verify${(dotNumber) ? ('_' + dotNumber) : ''}"
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
        validatePage('form2', 7, false);
        addNextButtonListner(presentId, 7);
        maxDate();
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
            validatePage('form2', 7, false);
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

                                        <input required type="date"  class="dab form-control " id="unemployedFrom${(unemployNumber) ? ('_' + unemployNumber) : ''}"
                                            name="unemploymentFrom${(unemployNumber) ? ('_' + unemployNumber) : ''}" onchange="handleDateChange2(event,true)">
                                        <small class="error-message"></small>
                                    </div>
                                    <div>
                                        <label class="question-label"> Unemployed To</label>
                                        <input required type="date"  class="to form-control" id="unemployedTo${(unemployNumber) ? ('_' + unemployNumber) : ''}"
                                            name="unemploymentTo${(unemployNumber) ? ('_' + unemployNumber) : ''}" onchange="handleDateChange2(event,true)">
                                        <small class="error-message"></small>
                                    </div>
                                </div>

                                <div class="col-12 mt-4">
                                    <label class="question-label">Reason for Unemployment</label>
                                    <textarea maxlength="250" required name="unemploymentReason${(unemployNumber) ? ('_' + unemployNumber) : ''}" id="unemploymentReason${(unemployNumber) ? ('_' + unemployNumber) : ''}"
                                        rows="4" class="form-control mt-2 txtfeild"></textarea>
                                </div>`
        document.getElementById(presentId).appendChild(unemploy);
        maxDate();
        caluclateTotalFeilds();
        validatePage('form2', 7, false);
        addNextButtonListner(presentId, 7);
    }
}

function removeUnemployment(presentId, value) {
    if (value == 'no') {
        reasonNumber = parseInt((presentId.split('_')[1]));
        const reasonbox = document.getElementById(`unemployReason${(reasonNumber) ? ('_' + reasonNumber) : ''}`)
        if (reasonbox) {
            reasonbox.remove();
            caluclateTotalFeilds();
            validatePage('form2', 7, false);
        }
    }
}

function validateEmploymentHistory() {
    let totalDays = 0; // Store total address days
    const currentlyEmployed = document.getElementById('stillEmployee');
    document.querySelectorAll('[id^="employmentForm"]').forEach(container => {
        let startDateField = container.querySelector('[id^="companyStart"]');
        let endDateField = container.querySelector('[id^="companySeparation"]');
        console.log("startDateField?.value&& endDateField.value ", startDateField?.value, endDateField.value);
        if (startDateField?.value && endDateField?.value) {
            let startDate = new Date(startDateField.value);
            let endDate = new Date(endDateField.value);
            if (currentlyEmployed && currentlyEmployed.checked && container.id == "employmentForm_1") {
                endDate = new Date();
            }
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            console.log("startDate", startDate);
            console.log("endDate", endDate);
            if (startDate <= endDate) {
                console.log("endDate - startDate", endDate - startDate);
                console.log("(endDate - startDate) / (1000 * 60 * 60 * 24) ", (endDate - startDate) / (1000 * 60 * 60 * 24));
                totalDays += (endDate - startDate) / (1000 * 60 * 60 * 24); // Convert to days
            }
        }
    });

    totalYears = totalDays / 365; // Convert total days to years
    console.log("total Days ", totalDays);
    console.log("total Years ", totalYears);
    if (totalYears < 10) {
        addEmploymentValidation();
    }
    else {
        removeEmploymentValidation();
    }
}

function toggleEmploymentDates() {
    const stillEmployeeCheckbox = document.getElementById('stillEmployee');
    // const startDateField = document.getElementById('companyStart');
    const endDateField = document.getElementById('companySeparation');
    const errorField = endDateField.nextElementSibling;

    if (stillEmployeeCheckbox.checked) {
        const currentDate = new Date();
        // const startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 10));
        // startDateField.value = startDate.toISOString().split('T')[0];

        endDateField.value = currentDate.toISOString().split('T')[0];;
        endDateField.classList.remove('highlight');
        endDateField.removeAttribute("required");
        errorField.textContent = "";
        errorField.style.display = 'none';
    } else {
        // startDateField.value = '';
        endDateField.value = '';
        errorField.textContent = "Please enter a valid date";
        endDateField.classList.add('highlight');
        errorField.style.display = 'block';
        endDateField.setAttribute("required", "true");
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
                    <textarea maxlength="250" required name="employHistoryReason" id="employHistroy" placeholder="Enter Text" rows="4"
                        class="form-control mt-2 txtfeild"></textarea>
                </div>`;
        const mainContainer = document.getElementById('histroyValidator');
        mainContainer.appendChild(reasonForm);
        maxDate();
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



const savedEmploy = [
    {
        currentCompany: "Google",
        companyType: "IT",
        companyAddress: "1600 Amphitheatre Parkway",
        companyCity: "Mountain View",
        companyState: "California",
        companyZip: "94043",
        startDate: "2020-01-01",
        separationDate: "2022-01-01",
        stillEmployee: "",
        supervisor: "John Doe",
        supervisorNo: "(123) 456-7890",
        leaveReason: "Pursued better opportunity",
        federalCarrier: "yes",
        sensitive: "yes",
        dotMode: "PHMSA",
        verify: "yes",
        unemployment: "yes",
        unemployedFrom: "2023-01-01",
        unemployedTo: "2023-05-03",
        unemployedReason: "Jagan",
        additional: "yes"

    },
    {
        currentCompany: "Amazon",
        companyType: "E-Commerce",
        companyAddress: "410 Terry Ave N",
        companyCity: "Seattle",
        companyState: "Washington",
        companyZip: "98109",
        startDate: "2015-01-01",
        separationDate: "2017-12-31",
        stillEmployee: "currentlyEmployee",
        supervisor: "Jane Smith",
        supervisorNo: "(321) 654-0987",
        leaveReason: "Relocated",
        federalCarrier: "no",
        sensitive: "yes",
        dotMode: "FAA",
        verify: "no",
        unemployment: "yes",
        unemployedFrom: "2021-02-01",
        unemployedTo: "2022-01-26",
        unemployedReason: "Weak economics",
        additional: "yes"
    },
    {
        currentCompany: "Microsoft",
        companyType: "Tech",
        companyAddress: "1 Microsoft Way",
        companyCity: "Redmond",
        companyState: "Washington",
        companyZip: "98052",
        startDate: "2010-05-01",
        separationDate: "2014-12-31",
        stillEmployee: false,
        supervisor: "Bill Gates",
        supervisorNo: "(555) 123-4567",
        leaveReason: "Career Change",
        federalCarrier: "no",
        sensitive: "yes",
        dotMode: "FTA",
        verify: "yes",
        unemployment: "yes",
        unemployedFrom: "2022-09-16",
        unemployedTo: "2022-01-26",
        unemployedReason: "dirty Govt",
        additional: "no",
        employhistroyReason: "High Inflation"
    }
];

function initializeEmploymentForm(savedEmploymentData) {

    if (!savedEmploymentData || savedEmploymentData.length === 0) {
        return;
    }

    addNewEmploymentForm();
    const additionalForm = document.getElementById("additionalYes");
    if (additionalForm) additionalForm.checked = true;
    savedEmploymentData.forEach((data, index) => {

        data.currentCompany ? document.getElementById(`companyName${"_" + (index + 2)}`).value = data.currentCompany : "";
        data.companyType ? document.getElementById(`companyType${"_" + (index + 2)}`).value = data.companyType : "";
        data.companyAddress ? document.getElementById(`companyAddress${"_" + (index + 2)}`).value = data.companyAddress : "";
        data.companyCity ? document.getElementById(`companyCity${"_" + (index + 2)}`).value = data.companyCity : "";
        data.companyState ? document.getElementById(`companyState${"_" + (index + 2)}`).value = data.companyState : "";
        data.companyZip ? document.getElementById(`companyZip${"_" + (index + 2)}`).value = data.companyZip : "";
        data.startDate ? document.getElementById(`companyStart${"_" + (index + 2)}`).value = data.startDate : "";
        data.separationDate ? document.getElementById(`companySeparation${"_" + (index + 2)}`).value = data.separationDate : "";
        data.supervisor ? document.getElementById(`supervisorName${"_" + (index + 2)}`).value = data.supervisor : "";
        data.supervisorNo ? document.getElementById(`supervisorPhone${"_" + (index + 2)}`).value = data.supervisorNo : "";
        data.leaveReason ? document.getElementById(`leavingReason${"_" + (index + 2)}`).value = data.leaveReason : "";
        // Set currently employed checkbox federalMotorNo  unemployReason_2

        //  if (index==0){
        // const stillEmp =   document.getElementById(`stillEmployee$${"_"+(index+1)}`);
        // data.stillEmployee=="currentlyEmployee"?stillEmp.checked = data.stillEmployee:"";}

        // Set radio buttons unemployReason
        const fedCarrierYes = document.getElementById(`federalMotorYes${"_" + (index + 2)}`);
        const fedCarrierNo = document.getElementById(`federalMotorNo${"_" + (index + 2)}`);
        if (data.federalCarrier && data.federalCarrier == 'yes') {
            fedCarrierYes.checked = true;
        } else if (data.federalCarrier && data.federalCarrier == 'no') {
            fedCarrierNo.checked = true;
        }

        const sensitiveYes = document.getElementById(`sensitiveYes${"_" + (index + 2)}`);
        const sensitiveNo = document.getElementById(`sensitiveNo${"_" + (index + 2)}`);
        if (data.sensitive == "yes") {
            sensitiveYes.checked = true;
            addDotMode(sensitiveYes.closest('[id^=dotDiv]').id, "yes");
            const dotNumber = "_" + (index + 2);
            const dotRadioId = `dot${data.dotMode}${dotNumber}`;
            console.log("dotmode Id ", `dot${data.dotMode}${dotNumber}`);
            const dotRadio = document.getElementById(dotRadioId);
            const verifyElement = document.getElementById(`verify${data.verify}${dotNumber}`);

            if (dotRadio) {
                dotRadio.checked = true;
                verifyElement.checked = true;

            }

        } else {
            sensitiveNo.checked = true;
        }

        const unemploymentNo = document.getElementById(`unemploymentNo${"_" + (index + 2)}`);
        const unemploymentYes = document.getElementById(`unemploymentYes${"_" + (index + 2)}`);
        if (data.unemployment && data.unemployment == "yes") {
            unemploymentYes.checked = true;
            const unemployDiv = unemploymentYes.closest('[id^=unemployDiv]');
            if (unemployDiv) {
                addUnemployment(unemployDiv.id, "yes"); // Trigger it manually here
            }

            const unemployedFrom = document.getElementById(`unemployedFrom${"_" + (index + 2)}`);

            unemployedFrom.value = data.unemployedFrom;
            const unemployedTo = document.getElementById(`unemployedTo${"_" + (index + 2)}`);

            unemployedTo.value = data.unemployedTo;
            const unemployReason = document.getElementById(`unemploymentReason${"_" + (index + 2)}`);
            if (unemployReason == null) {
                console.log("reasonbox is null");
            } else {
                console.log(unemployReason);
            }
            unemployReason.value = data.unemployedReason;

        } else if (data.unemployment && data.unemployment == "yes") {
            unemploymentNo.checked = true;
        }
        const isLast = index === savedEmploymentData.length - 1;
        const nextRadioId = isLast ? `additionalNo${"_" + (index + 2)}` : `additionalYes${"_" + (index + 2)}`;
        const nextRadio = document.getElementById(nextRadioId);
        if (nextRadio) nextRadio.checked = true;
        if (!isLast) {
            addNewEmploymentForm();
        }



    });
};



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
        removeCanvasHighlight();
        validatePage('form2', 9, false);
        context.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const pos = getMousePosition(event);
            removeCanvasHighlight();
            validatePage('form2', 9, false);
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
function removeCanvasHighlight() {
    canvas.classList.remove('highlight');
}

function clearSign() {
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            console.error("Signature box is not initialized.");
        }
        validatePage('form2', 9, false);
    });
}

function saveSign() {
    if (canvas) {
        signatureData = canvas.toDataURL('image/png');
        console.log('sign Data', signatureData);
    } else {
        console.error("Signature box is not initialized.");
    }
}

function showInvalidModal() {
    const invalidModal = document.getElementById('invalidModal');
    const overlay = document.getElementById('overlay3');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function showInvalidDates() {
    const invalidModal = document.getElementById('invalidDates');
    const overlay = document.getElementById('overlay3');
    if (invalidModal && overlay) {
        invalidModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const invalidDates = document.getElementById('invalidDates');
    const overlay = document.getElementById('overlay3');
    const invalidModal = document.getElementById('invalidModal');
    if (invalidModal && overlay || invalidDates) {
        invalidDates.style.display = 'none';
        invalidModal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function addForm2EventListeners() {
    const form1SubmitButton = document.getElementById('next9');
    if (form1SubmitButton) {
        form1SubmitButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (validatePage('form2', 9, true)) {

                showCheckmark('form3Tick');
                showSuccessModal();
                form1Completed = true;
            }
            else {
                showInvalidModal();
                hideCheckmark('form3Tick');
            }
        });
    }
}

function showSuccessModal() {
    if (validatePage('form2', 9, true)) {
        const successModal = document.getElementById('successModal3');
        const overlay = document.getElementById('overlay3');
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
    const successModal = document.getElementById('successModal3');
    const overlay = document.getElementById('overlay3');
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

function loadForm4(id) {
    const modalContent = document.getElementById(id);
    const overlay = document.getElementById('overlay3');
    if (modalContent && overlay) {
        modalContent.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    fetch('../form4/form4.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            loadScript('../form4/form4.js');
            loadStyleSheet("../form4/form4.css");
            removeStyleSheet('../form3/form3.css');
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

initializeForm2('form2');