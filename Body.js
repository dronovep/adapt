function Body(element) {
    AdaptiveFragment.call(this, element);
}

Body.prototype = Object.create(AdaptiveFragment.prototype);
Body.prototype.selector        = 'body';
Body.prototype.childtypes = [Panel];
Body.prototype.adaptation = {
    stepsize: 625,
    styleclasses: ['narrow', 'wide']
};