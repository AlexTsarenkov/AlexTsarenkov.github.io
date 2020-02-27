class FormValidator {

    validatorTypes = {
        text: 'text',
        link: 'link',
        name: 'name',
    };

    constructor(words) {
        this.elementsToValidate = [];
        this.buttonsToRender = [];
        this.words = words;
    }


    addButtonToRender(button) {
        this.buttonsToRender.push(button);
    }

    setValidator(field, type, isInvalid) {
        switch (type) {
            case this.validatorTypes.name:
                field.addEventListener('input', this.validateName.bind(this));
                break;
            case this.validatorTypes.link:
                field.addEventListener('input', this.validateLink.bind(this))
                break;

            case this.validatorTypes.text:
                field.addEventListener('input', this.validateText.bind(this));
                break;
        }

        if (isInvalid === true) {
            field.setCustomValidity('Invalid by default');
        }

        this.elementsToValidate.push(field);
    }

    validateName(event) {
        if (event.target.value.length === 0) {
            this.setCustomMessage(event.target, this.words.ru.fieldObligatory)
        } else {
            this.setCustomMessage(event.target, "")
        }

        this.renderValidityMessages(event.target);
    }

    validateText(event) {
        if (event.target.value.length === 0) {
            this.setCustomMessage(event.target, this.words.ru.fieldObligatory)
        }

        if (event.target.validity.tooShort) {
            this.setCustomMessage(event.target, this.words.ru.invalidLength)
        }

        if (!event.target.validity.tooShort && event.target.value.length !== 0) {
            this.setCustomMessage(event.target, "")
        }

        this.renderValidityMessages(event.target);

    }

    validateLink(event) {
        if (event.target.value.length === 0) {
            this.setCustomMessage(event.target, this.words.ru.fieldObligatory)
        }

        if (event.target.validity.typeMismatch) {
            this.setCustomMessage(event.target, this.words.ru.invalidTypeLink);
        }

        if (!event.target.validity.typeMismatch && event.target.value.length !== 0) {
            this.setCustomMessage(event.target, "");
        }
        this.renderValidityMessages(event.target);
    }

    setCustomMessage(element, message) {
        const label = this.getLabelForElement(element); 
        label.textContent = message;
        element.setCustomValidity(message);
    }


    renderValidityMessages(element) {
        const label = this.getLabelForElement(element);
        if (!element.validity.valid) {
            if (!label.classList.contains("popup__invalid_is-opened")) {
                label.classList.add("popup__invalid_is-opened");
            }
        } else {
            if (label.classList.contains("popup__invalid_is-opened")) {
                label.classList.remove("popup__invalid_is-opened");
            }
        }

        this.render()
    }

    refresh(){
        this.elementsToValidate = [];
        this.buttonsToRender = [];
    }

    render() {
        if (this.elementsToValidate.every(element => element.validity.valid)) {
            for (let button of this.buttonsToRender) {
                button.removeAttribute('disabled', '');
                button.classList.add('button_valid');
            }
        } else {
            for (let button of this.buttonsToRender) {
                button.setAttribute('disabled', '');
                button.classList.remove('button_valid');
            }
        }
    }

    getLabelForElement(element){
        return Array.from(element.labels).find(element => element !== undefined);
    }
}