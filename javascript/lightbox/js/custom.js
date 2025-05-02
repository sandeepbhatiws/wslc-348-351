const images = ['images/1.webp', 'images/2.webp', 'images/3.webp', 'images/4.webp', 'images/5.webp', 'images/6.webp', 'images/7.webp', 'images/8.webp', 'images/9.webp', 'images/10.webp', 'images/11.webp', 'images/12.webp'];

function displayImages(){

    var output = '';
    images.forEach((v,i) => {
        output += '<img class="image" src="'+ v +'"/>';
    })

    document.getElementById('gallery').innerHTML = output;
}

displayImages();


var allImages = document.querySelectorAll('.image');

allImages.forEach((v,i) => {
    v.addEventListener('click',(event) => {
        document.getElementById('lightbox').src = event.target.src;
        document.querySelector('.lightboxOuter').classList.remove('hide');
    });
})


document.querySelector('.close').addEventListener('click',() => {
    document.querySelector('.lightboxOuter').classList.add('hide');
});