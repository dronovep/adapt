/*
AdaptiveElement - центральный базовый класс, для построения адаптивного дизайна, вся логика адаптива -
изменение стилей вследствие изменения ширины - описана здесь, создание классов - наследников будет носить уже
чисто декларативный характер
 */
function AdaptiveElement(element) {

    //Проверяем, что DOM элемент для конструирования адаптивного фрагмента передан
    if (element == undefined) {
        throw new DOMException('Не передан элемент, на основании которого делать адаптивный фрагмент');
    }

    this.element = element;                 //записываем элемент в объект
    let jelement = $(this.element);

    //сразу вычисляем и сохраняем изначальный получившийся класс адаптива для элемента
    this.adaptclass = this.calculateAdaptationStyleFromWidth();
    if (this.adaptclass != undefined) {
        jelement.addClass(this.adaptclass);
    }

    //создаем все дочерние адаптивные элементы - объект вида:  тип дочернего элемента - массив этих элементов
    this.childs = {};
    var adaptive = this;   //сохраняем this в переменную, для последующего использования внутри коллбэков (у них свой this)
    for (let childtype of this.childtypes) {
        this.childs[childtype] = [];
        jelement.find(childtype.prototype.selector).each(function () {
            adaptive.childs[childtype].push(new childtype(this));
        });
    }
}

//У базового класса декларативные определена только логика и стрктура, фактические свойства будут у классов - наследников
AdaptiveElement.prototype.selector          = undefined;           //селектор, по кторому можно найти все адаптивные элементы данного вида
AdaptiveElement.prototype.childtypes        = undefined;           //список типов дочерних адаптивных элементов

AdaptiveElement.prototype.adaptation = {                           //данные для адаптирования
    stepsize: undefined,                                              //величина шага адаптации (в пикселях)
    styleclasses: undefined                                           //список классов стилей (индекс в массиве и величина шага взаимосвязаны)
};

/*
Получение класса стилей на основе текущей ширины элемента. Можно было бы сделать проверку попадания ширины в конкретный отрезок с помощью какого-то коллбэка
и тогда отрезки можно было бы сделать разного размера, но это более сложный и дорогой код. Как по мне, идея с выделением целой части
более изящна и быстродейственна, а если нужно имитировать отрезки разных размеров - просто подбирается нужная величина шага
(по сути, длины всех воображаемых отрезков должны быть кратны ей) и правильно проставляются классы стилей в массив (возможно с дубликатами)
 */
AdaptiveElement.prototype.calculateAdaptationStyleFromWidth = function () {
    let index = Math.floor($(this.element).width() / this.adaptation.stepsize);
    if (index >= this.adaptation.styleclasses.length) {
        index = this.adaptation.styleclasses.length - 1;
    }
    return this.adaptation.styleclasses[index];
};

/*
Общая функция адаптирования элемента - меняем (если нужно) класс адаптации элемента, но обязательно адаптируем детей
так как даже если класс адаптивности этого элемента не изменился, с изменением ширины этого элемента, могла поменяться ширина и детей
 */
AdaptiveElement.prototype.adapt = function () {

    let newadaptclass = this.calculateAdaptationStyleFromWidth();

    //если ширина изменилась настолько, что нужно снова адаптировать
    if (newadaptclass != this.adaptclass) {
        let jelement = $(this.element);

        jelement.removeClass(this.adaptclass);
        this.adaptclass = newadaptclass;
        jelement.addClass(this.adaptclass);
    }

    //адаптируем всех детей элемента
    for (let childtype of this.childtypes) {
        for (let child of this.childs[childtype]) {
            child.adapt();
        }
    }
}


/*
ToDo: по хорошему еще нужно создать функцию - валидатор, которую мы бы запускали в конце файла определения конкретного адаптивного элемента
дабы проверить себя, правильно ли мы декларировали элемент, ничего ли не забыли
AdaptiveElement.prototype.validate = function () {};
*/