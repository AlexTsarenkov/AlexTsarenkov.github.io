export default class PopUp {
    

    constructor(container, validator){
        this.container = container;
        this.element = undefined;
        this.handleSubmitDelegate = function(){};
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