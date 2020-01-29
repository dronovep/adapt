function AdaptiveFragment(parent= undefined) {

    var fragment = this;
    this.adapt = AdaptiveFragment.prototype.adapt;

    if (this.selector != undefined) {
        if (parent != undefined) {
            this.jelements = $(parent).find(this.selector);
        } else {
            this.jelements = $(this.selector);
        }

        this.jelements.each(function (element) {
            for (let child_fragment_type of fragment.child_fragment_types) {
                this.child_fragments[child_fragment_type] = new child_fragment_type();
            }
        });
    } else {
        throw new DOMException('Отсутствует селектор => неверно реализован адаптивный фрагмент', 'Адаптивный фрагмент: нет селектора');
    }
}

AdaptiveFragment.prototype.selector        = undefined;
AdaptiveFragment.prototype.adaptLogic      = undefined;
AdaptiveFragment.prototype.child_fragment_types = [];


AdaptiveFragment.prototype.adapt = function () {

    var fragment = this;
    this.jelements.each(function (element) {
        fragment.adaptLogic.call(element);
    });

    for (let child_fragment of this.child_fragment_types) {
        child_fragment.adapt();
    }
}

