class CardList {
    constructor(container, card) {
        this.card = card;
        this.cards = [];
        this.container = container;
    }

    addCard(name, link, likes, id) {
        const card = this.card.create(name, link, likes, id)
        this.cards.push(card);
        this.container.appendChild(card);
    }

    
    render() {
        this.card.container = this.container;
        for (let card of this.cards) {
            this.container.appendChild(card);
        }
    }
}