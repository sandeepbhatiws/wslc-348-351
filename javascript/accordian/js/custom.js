
var questions = document.querySelectorAll('.question');

questions.forEach((element,index) => {
    element.addEventListener('click',(event) => {
        event.target.nextElementSibling.classList.toggle('hide');

        var close = event.target.children[0].innerText;

        if(close == '-'){
            event.target.children[0].innerText = '+';
        } else {
            event.target.children[0].innerText = '-';
        }

        questions.forEach((elem,i) => {
            if(element != elem){
                elem.nextElementSibling.classList.add('hide');
                elem.children[0].innerText = '+';
            }
        });
    });
})