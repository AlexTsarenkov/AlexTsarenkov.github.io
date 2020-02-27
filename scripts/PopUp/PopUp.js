class PopUp {
    handleSubmitDelegate;

    constructor(container, validator){
        this.container = container;
        this.element = undefined;
    }

    addPopUp(element){
        this.element = element;
        this.container.appendChild(element);
        this.container = element.parentNode;
    }

    removePopUp(){
        this.container.removeChild(this.element);
    }

    setSubmitDelegate(func){
        this.handleSubmitDelegate = func;
    }

}