//Конкретный пример адаптивной вьюхи, именно в нашем примере это body html документа (ну то есть наша вью - целая веб-страница)
function Body() {
    AdaptiveView.call(this);
}

Body.prototype = Object.create(AdaptiveView.prototype);
Body.prototype.selector        = 'body';
Body.prototype.childtypes = [Panel];
Body.prototype.adaptation = {
    stepsize: 625,
    styleclasses: ['narrow', 'wide']
};



//AdaptiveView.prototype.validate();