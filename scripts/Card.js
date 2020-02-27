class Card {
    constructor(fullsizePopUp){
        this.container = undefined;
        this.fullsize = fullsizePopUp;
    }

     getTemplate(cardName, cardLink){
        const template = `<div class="place-card">
                                <div class="place-card__image" style="background: url(${cardLink})">
                                    <button class="place-card__delete-icon"></button>
                                </div>
                                <div class="place-card__description">
                                    <h3 class="place-card__name">${cardName}</h3>
                                    <div class="place-card__like-container">
                                        <button class="place-card__like-icon"></button>
                                        <p class="place-card__like-counter">0</p>
                                    </div>
                                </div>
                            </div>`
     return new DOMParser().parseFromString(template, 'text/html').body.firstChild;
     }

    create(name, link, likes, id) {
        const element = this.getTemplate(name, link);
        element.addEventListener('click', this.action.bind(this));
        element.querySelector('.place-card__like-counter').textContent = likes;
        element.id = id;
        return element;
    }

    action(event) {
        //лайк
        if (event.target.classList.contains('place-card__like-icon')) {
            this.like(event);
        }
        //удаление
        if (event.target.classList.contains('place-card__delete-icon')) {
            this.remove(event);
        }

        //открыть полный размер
        if (event.target.classList.contains('place-card__image')) {
            this.fullSizeShow(event);
        }
    }

    remove(event) {
        this.container.removeChild(event.target.closest('.place-card'));
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    fullSizeShow(event) {
        const link = this.getLink(event.target);
        this.fullsize.show(link);
    }

    getLink(object){
        return object.style.backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    }

}