function Panel(element) {
    AdaptiveFragment.call(this, element);
}

Panel.prototype = Object.create(AdaptiveFragment.prototype);
Panel.prototype.selector        = '.panel';
Panel.prototype.childtypes = [];
Panel.prototype.adaptation = {
    stepsize: 0,
    styleclasses: ['']
};