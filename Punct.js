/*
Конкретный адаптивный элемент нашего примера - аля пункт меню,
 при определенной ширине он считается горизонтальным или вертикальным
*/
function Punct(element) {
    AdaptiveElement.call(this, element);
}

Punct.prototype = Object.create(AdaptiveElement.prototype);
Punct.prototype.selector        = '.punct';
Punct.prototype.childtypes = [];                              //у него нету дочерних адаптивных элементов
Punct.prototype.adaptation = {
    stepsize: 136,
    styleclasses: ['vertical', 'horizontal']
};


//AdaptiveView.prototype.validate();