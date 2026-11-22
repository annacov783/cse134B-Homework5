const form_errors = [];

function validateName(fieldID) {
    const input = document.getElementById(fieldID);
    const state = input.validity;

    input.setCustomValidity("");

    if (state.valueMissing) {
        input.setCustomValidity("Error: Please enter a valid name (max 15 characters).");
    } else if (state.tooLong) {
        input.setCustomValidity("Error: Too many characters (max 15 characters).");
    } else if (state.tooShort) {
        input.setCustomValidity("Error: Too few characters (min 2 characters).");
    } 

    return displayError(input);
}

function validateEmail(fieldID) {
    const input = document.getElementById(fieldID);
    const state = input.validity;

    input.setCustomValidity("");

    if (state.valueMissing) {
        input.setCustomValidity("Error: Please enter a valid email (max 20 characters).");
    } else if (state.typeMismatch) {
        input.setCustomValidity("Error: Please enter a valid email with the form you@email");
    } else if (state.tooLong) {
        input.setCustomValidity("Error: Too many characters (max 20 characters).");
    } else if (state.tooShort) {
        input.setCustomValidity("Error: Too few characters (min 10 characters).");
    }

    return displayError(input);
}

function validateText(fieldID) {
    const textarea = document.getElementById(fieldID);
    const state = textarea.validity;

    textarea.setCustomValidity("");

    if (state.valueMissing) {
        textarea.setCustomValidity("Error: Please enter a valid comment (max 150 characters).");
    } else if (state.tooLong) {
        textarea.setCustomValidity("Error: Too many characters (max 150 characters).");
    } else if (state.tooShort) {
        textarea.setCustomValidity("Error: Too few characters (min 5 characters).");
    } 

    return displayError(textarea);
}

function displayError(input) {
    const errorElement = document.querySelector(
        `[data-error-for="${input.id}"]`
    );

    const isValid = input.validity.valid;

    errorElement.textContent = isValid
        ? ""
        : input.validationMessage;

    input.classList.toggle("invalid", !isValid);
    input.classList.toggle("valid", isValid);

    // Update form error array
    const existingIndex = form_errors.findIndex(
        error => error.field === input.id
    );

    if (!isValid) {
        const entry = {
            field: input.id,
            message: input.validationMessage
        };

        const exists = form_errors.some(error =>
            error.field === entry.field &&
            error.message === entry.message
        );

        if (!exists) {
            form_errors.push(entry);
        }
    }

    

    return isValid;
}

//listner for submit and invalid

document.querySelector("form").addEventListener("submit", (e) => {

    document.getElementById("form-errors").value =
        JSON.stringify(form_errors);
    console.log(document.getElementById("form-errors").value);
});


//Characters remaining
function charactersRemaining(fieldID) {
    const input = document.getElementById(fieldID);

    return input.maxLength - input.value.length;
}


// Create live character counter
function createCharacterCounter(fieldID) {
    const input = document.getElementById(fieldID);

    // Create counter element
    const counter = document.createElement("p");

    counter.classList.add("character-counter");

    // Insert counter after textarea
    input.insertAdjacentElement("afterend", counter);

    // Update counter
    function updateCounter() {
        counter.textContent =
            `${charactersRemaining(fieldID)} Characters Remaining.`;
    }

    // Initial count
    updateCounter();

    // Update as user types
    input.addEventListener("input", updateCounter);
}

// Initialize counter
createCharacterCounter("name");
createCharacterCounter("email");
createCharacterCounter("comments");






const fields = document.querySelectorAll(
    "#name, #email, #comments"
);

fields.forEach(field => {
    field.addEventListener("blur", () => {
        if (field.id === "name") validateName(field.id);
        if (field.id === "email") validateEmail(field.id);
        if (field.id === "comments") validateText(field.id);
    });
});

fields.forEach(field => {
    field.addEventListener("input", () => {
        if (field.classList.contains("invalid")) {
            if (field.id === "name") validateName(field.id);
            if (field.id === "email") validateEmail(field.id);
            if (field.id === "comments") validateText(field.id);
        }
    });
});





