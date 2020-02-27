class CardFullsizePopUp extends PopUp {
    constructor(container) {
        super(container);
    }

    show(link){
        this.addPopUp(this.getTemplate(link));
        this.setEventListeners();
     }

    getTemplate(link) {
        const template = `<div class="image-popup image-popup_is-opened">
        <div class="image-popup__wrapper">
          <img src='${link}' alt ='что то пошло не так' class="image-popup__image">
          <img src="./images/close.svg" alt="" class="popup__close">
        </div>
      </div>`

      return new DOMParser().parseFromString(template, 'text/html').body.firstChild;
    }

    setEventListeners(){
        this.element.querySelector('.popup__close').addEventListener('click', this.removePopUp.bind(this));
    }
}