class ProfileEditPopUp extends PopUp {

    constructor(container, validator) {
        super(container);
        this.validator = validator;
    }

    show(){
       this.addPopUp(this.getTemplate());
       this.setInitialValues();
       this.setEventListeners();
       this.setValidatorFields();
    }

    getTemplate() {
        const template = `<div class="popup popup_is-opened">
      <div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close">
        <h3 class="popup__title">Редактировать профиль</h3>
        <form class="popup__form" name="profileEdit" novalidate>
            <input type="text" name="name" id="name" class="popup__input popup__input_type_name" placeholder="Имя">
            <label class="popup__invalid" for="name"></label>
            <input type="text" name="about" id="about" class="popup__input" placeholder="О себе" minlength="2" maxlength="30">
            <label class="popup__invalid" for="about"></label>
            <button type class="button popup__button button_valid">Сохранить</button>
        </form>
      </div>
    </div>`

      return new DOMParser().parseFromString(template, 'text/html').body.firstChild;
    }

    setInitialValues(){
        document.forms.profileEdit.elements.name.value = this.container.querySelector('.user-info__name').textContent;
        document.forms.profileEdit.elements.about.value = this.container.querySelector('.user-info__job').textContent;
    }

    setEventListeners(){
        this.element.querySelector('.popup__close').addEventListener('click', this.removePopUp.bind(this));
        document.forms.profileEdit.addEventListener('submit', this.handleSubmit.bind(this));
    }

    setValidatorFields(){
        const name = document.forms.profileEdit.elements.name;
        const about = document.forms.profileEdit.elements.about;
        const button = this.element.querySelector('.popup__button');

        this.validator.refresh();
        this.validator.setValidator(name, this.validator.validatorTypes.name, false);    
        this.validator.setValidator(about, this.validator.validatorTypes.text, false); 
        this.validator.addButtonToRender(button);
    }

    setButtonStateLoading(){
        this.element.querySelector('.popup__button').innerText  = 'Загрузка...';
    }

    setButtonStateNormal(){
        this.element.querySelector('.popup__button').innerText  = 'Cохранить';
    }

    handleSubmit(){
        event.preventDefault();
        this.handleSubmitDelegate(document.forms.profileEdit.elements.name.value, document.forms.profileEdit.elements.about.value);
        this.removePopUp();     
    }
}