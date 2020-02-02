function Punct(jelement) {
    AdaptiveFragment.call(this, jelement);
}

Punct.prototype = Object.create(AdaptiveFragment.prototype);
Punct.prototype.selector        = '.punct';
Punct.prototype.childtypes = [];
Punct.prototype.adaptation = {
    stepsize: 120,
    styleclasses: ['vertical', 'horizontal']
};