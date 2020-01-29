function MenuBar(parent = undefined) {
    AdaptiveFragment.call(this);
}

MenuBar.prototype.selector        = '.menu.bar';
MenuBar.prototype.adaptLogic      = function () { console.log('inside MenuBar.adaptLogic');};
MenuBar.prototype.child_fragment_types = [];