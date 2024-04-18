class Validator {
    constructor(config) {
        // Generiramo prazan objekt kojeg kasnije popunjavamo greškama.
        this.errors = {};
        this.elementsConfig = config;

        this.inputListener();
        this.generateErrorsObject();
    }

    inputListener() {
        let inputListener = this.elementsConfig;

        for(let field in inputListener) {
            const element = document.querySelector(`input[name="${field}"]`);
            element.addEventListener('input', this.validate.bind(this))
        }
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig) {
            this.errors[field] = [];
        }
    }

    validate(event) {
        let elementField = this.elementsConfig;
        let dynamicField = event.target;
        let fieldName = dynamicField.getAttribute('name');
        let fieldValue = dynamicField.value;

        this.errors[fieldName] = [];

        if(elementField[fieldName].required) {
            if(fieldValue === '' ){
                this.errors[fieldName].push('Polje je obavezno popuniti');
            };
        }

        if(elementField[fieldName].minlength) {
            if(fieldValue.length < elementField[fieldName].minlength) {
                this.errors[fieldName].push(`Polje mora imati minimalno ${elementField[fieldName].minlength} karaktera.`)
            }
        }

        if(elementField[fieldName].maxlength) {
            if(fieldValue.length > elementField[fieldName].maxlength) {
                this.errors[fieldName].push(`Polje može imati maksimalno ${elementField[fieldName].maxlength} karaktera`);
            }
        }

        if(elementField[fieldName].numbers) {
            if(isNaN(fieldValue)) {
                this.errors[fieldName].push('Unijeli ste pogrešan format za broj telefona (+381 00 123 456)')
            }
        }

        if(elementField[fieldName].plus) {
            if(!fieldValue.includes('+')) {
                this.errors[fieldName].push('Broj telefona mora započimati sa simbolom + (+381 00 123 456)')
            }
        }

        if(elementField[fieldName].email) {
            if(!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Neispravna email adresa.');
            }
        }

        if(elementField[fieldName].matching) {
            const matchingElement = document.querySelector(`input[name="${elementField[fieldName].matching}"]`);
            if(this.errors[fieldName].length === 0) {
                this.errors[fieldName] = [];
                this.errors[elementField[fieldName].matching] = [];
            }

            if(fieldValue !== matchingElement.value) {
                this.errors[fieldName].push('Lozinke se ne podudaraju');
            }
        }

        this.populateErrors(this.errors);
    }

    validateEmail(email) {
        if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    populateErrors(errors) {
        let unorderdList = document.querySelectorAll('ul');
        unorderdList.forEach(ul => {
            ul.remove();
        });

        for(let key of Object.keys(errors)) {
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => {
                let li = document.createElement('li');
                errorsElement.appendChild(li);
                li.innerText = error;
            })
        }
    }
}