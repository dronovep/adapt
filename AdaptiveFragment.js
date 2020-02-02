function AdaptiveFragment(element) {

    var fragment = this;

    //Проверяем, что DOM элемент для конструирования адаптивного фрагмента передан
    if (element == undefined) {
        throw new DOMException('Не передан элемент, на основании которого делать адаптивный фрагмент');
    }

    this.element = element;                 //записываем элемент в объект
    this.childs = {};                       //формируем объект дочерних элементов данного элемента
    let jelement = $(this.element);

    //сразу вычисляем и сохраняем изначальный получившийся класс адаптива для элемента
    this.adaptclass = this.calculateAdaptationStyleFromWidth();
    if (this.adaptclass != '') {
        jelement.addClass(this.adaptclass);
    }

    for (let childtype of this.childtypes) {
        this.childs[childtype] = [];
        jelement.find(childtype.prototype.selector).each(function () {
            fragment.childs[childtype].push(new childtype(this));
        });
    }
}

AdaptiveFragment.prototype.selector          = undefined;
//AdaptiveFragment.prototype.adaptLogic      = undefined;
AdaptiveFragment.prototype.childtypes        = undefined;

AdaptiveFragment.prototype.adaptation        = {
    stepsize: undefined,
    stepstyles: undefined
};

AdaptiveFragment.prototype.adaptation = {
    stepsize: undefined,
    styleclasses: undefined
};

AdaptiveFragment.prototype.calculateAdaptationStyleFromWidth = function () {
    let index = Math.floor($(this.element).width() / this.adaptation.stepsize);
    if (index >= this.adaptation.styleclasses.length) {
        index = this.adaptation.styleclasses.length - 1;
    }
    return this.adaptation.styleclasses[index];
};

AdaptiveFragment.prototype.adapt = function () {

    let newadaptclass = this.calculateAdaptationStyleFromWidth();

    //если ширина изменилась настолько, что нужно снова адаптировать
    if (newadaptclass != this.adaptclass) {
        let jelement = $(this.element);

        jelement.removeClass(this.adaptclass);
        this.adaptclass = newadaptclass;
        jelement.addClass(this.adaptclass);
    }

    //адаптируем всех детей фрагмента
    for (let childtype of this.childtypes) {
        for (let child of this.childs[childtype]) {
            child.adapt();
        }
    }
}

