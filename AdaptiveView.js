/*
адаптивная вьюшка отличается от адаптивного элемента тем, что базируется на самом верхнем адаптируемом элементе,
возможно даже корневом элементе вьюхи- и предполагается, что он один. В приципе этот класс можно переименовать в AdaptiveTree,
а AdaptiveElement в AdaptiveNode
*/
function AdaptiveView() {
    AdaptiveElement.call(this, $(this.selector).get(0));
}

AdaptiveView.prototype = Object.create(AdaptiveElement.prototype);




//AdaptiveView.prototype.validate();