let slides = document.querySelectorAll('.slide-single'),
    slider = [],
    btnprev = document.querySelector('.btn-prev'),
    btnnext = document.querySelector('.btn-next');

    console.log(slides);
for(let i=0; i < slides.length; i++){
    slider[i] = slides[i].src;
    slides[i].remove();
}
    let offset2 = 0;
let stepleft = 0;
let offsetleft = 0;

function draw(){
    let img = document.createElement('img');
    img.src = slider[stepleft];
    img.classList.add('slide-single');
    img.style.left = offsetleft*800 + 'px';
    document.querySelector('#slide').appendChild(img);
    if(stepleft + 1 == slider.length){
        stepleft = 0;
    }
    else{
        stepleft++;
    }
    offsetleft = 1;
}

function left(){
    document.onclick = null;
    let slides2 = document.querySelectorAll('.slide-single');
    console.log(slides2)
    for(let i = 0; i < slides2.length; i++){
        slides2[i].style.left = offset2*800 - 800 + 'px';
        offset2++;
    }
    setTimeout(function(){
        slides2[0].remove();
        draw();
        //btnprev.onclick = left;
        document.onclick = left;
    }, 1000);
}

function right(){
    let slides2 = document.querySelectorAll('.slide-single');
    console.log(slides2)
    let offset2 = 0;
    for(let i = 0; i < slides2.length; i++){
        slides2[i].style.left = -(offset2*800) + 800 + 'px';
        offset2++;
    }
    setTimeout(function(){
        //slides2[0].remove();
        drawright();
        //btnnext.onclick = right;
        document.onclick = right;
    }, 1000);
}
draw(); draw();
document.onclick = left;
