class AddCardPopUp extends PopUp {
    
    

    constructor(container, validator) {
        super(container);
        this.validator = validator;
    }

    show(){
       this.addPopUp(this.getTemplate());
       this.setEventListeners();
       this.setValidatorFields();
    }

    getTemplate() {
        const template = `<div class="popup popup_is-opened">
        <div class="popup__content">
          <img src="./images/close.svg" alt="" class="popup__close">
          <h3 class="popup__title">Новое место</h3>
          <form class="popup__form" name="addCard" novalidate>
              <input type="text" name="name" id="cardName" class="popup__input popup__input_type_name" placeholder="Название" minlength="2" maxlength="30">
              <label class="popup__invalid popup__invalid_is-opened" for="cardName">Это поле обязательно для заполнения</label>
              <input type="url" name="link" id="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку" >
              <label class="popup__invalid popup__invalid_is-opened" for="link">Это поле обязательно для заполнения</label>
              <button type class="button popup__button" disabled>+</button>
          </form>
        </div>
      </div>`

      return new DOMParser().parseFromString(template, 'text/html').body.firstChild;
    }

    setButtonStateLoading(){
        this.element.querySelector('.popup__button').innerText  = 'Загрузка...';
    }

    setButtonStateNormal(){
        this.element.querySelector('.popup__button').innerText  = '+';
    }

    setEventListeners(){
        this.element.querySelector('.popup__close').addEventListener('click', this.removePopUp.bind(this));
        document.forms.addCard.addEventListener('submit', this.handleSubmit.bind(this));
    }

    setValidatorFields(){
        const name = document.forms.addCard.elements.name;
        const link = document.forms.addCard.elements.link;
        const button = this.element.querySelector('.popup__button');

        this.validator.refresh();

        this.validator.setValidator(name, this.validator.validatorTypes.text, true);    
        this.validator.setValidator(link, this.validator.validatorTypes.link, true); 
        this.validator.addButtonToRender(button);
    }

 
    handleSubmit(){
        event.preventDefault();
        this.handleSubmitDelegate(document.forms.addCard.elements.cardName.value, document.forms.addCard.elements.link.value);
        this.removePopUp();     
    }
}