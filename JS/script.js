(function(){
    let doc = document,
        index = 1;

    let Slider = function(){
        this.box = doc.querySelector('.slide-container');
        this.slideBox = doc.querySelector('.slide');
        this.slides = doc.querySelectorAll('.slide-single');
        this.btn = doc.querySelectorAll('.btn');
        this.dots = doc.querySelectorAll('.dot');
        this.size = this.slideBox.clientWidth;

        this.draw();
        this.position();
        this.carousel();
        this.dotActivity();

    };

    Slider.prototype.draw = function() {
        for(let i = 0; i < this.slides.length; i++){
            this.slides[i].style.left = i*800 + 'px';
        }
    };

    Slider.prototype.position = function() {
        let size = this.size;
        this.slideBox.style.transform = 'translateX(' + (-index * size) + 'px)';
    };

    Slider.prototype.carousel = function(){
        let i, max = this.btn.length,
            that = this;
        for(i = 0; i < max; i++){
            that.btn[i].onclick = Slider[that.btn[i].id].bind(null, that); //Slider[that.btn[i].id].bind(null, that);
        }
    };

    Slider.prototype.activeDot = function(){
        for(dot of this.dots){
            dot.classList.remove('active');
        }
        this.dots[index-1].classList.add('active');
    };


    Slider.prototype.dotActivity = function() {
        let size = this.size;
        this.dots.forEach((item, indexDot) => {
            item.onclick = () => {
                let pos = 0;
                let currentPos = -(index)*size;
                let currentPosCopy = currentPos;
                let transformated = setInterval(() => {
                    for(let i = 0; i < this.dots.length; i++){
                        this.dots[i].onclick = null;
                    }
                    if(currentPosCopy == -(indexDot+1)*size){
                        index = indexDot+1;
                        this.dotActivity();
                        this.activeDot();
                        clearInterval(transformated);
                    }
                    else{
                        if(indexDot+1 < index){
                            currentPosCopy+=20;
                            this.slideBox.style.transform = 'translateX(' + (currentPosCopy) + 'px)';
                            currentPosCopy = currentPosCopy + pos;
                            
                        }
                        else{
                            currentPosCopy-=20;
                            this.slideBox.style.transform = 'translateX(' + (currentPosCopy) + 'px)';
                            currentPosCopy = currentPosCopy - pos;
                        }
                    }
                }, 1)
            }
        })
    };

    Slider.prev = function(box) {
        let size = box.size;
        let pos = 0;
        index <= 0 ? false : index--;
        let currentPos = -(index + 1)*size;
        let transformated = setInterval(() => {
            box.btn[0].onclick = null;
            if(pos == size){
                box.carousel();
                box.jump();
                box.activeDot();
                clearInterval(transformated);
            }
            else{
                pos+=10;
                box.slideBox.style.transform = 'translateX(' + (currentPos + pos) + 'px)';
            }
        }, 1);
    };

    Slider.next = function(box) {
        let max = box.slides.length;
        let size = box.size;
        let pos = 0;
        index >= max-1 ? false : index++;
        let currentPos = -(index - 1)*size;
        let transformated = setInterval(() => {
            box.btn[1].onclick = null;
            if(pos == size){
                box.carousel();
                box.jump();
                box.activeDot();
                clearInterval(transformated);
            }
            else{
                pos+=10;
                box.slideBox.style.transform = 'translateX(' + (currentPos - pos) + 'px)';
            }
        }, 1);
    };

    Slider.prototype.jump = function(){
        let that = this;
        let size = this.size;
        if(that.slides[index].id === "firstclone"){
            index = 1;
            that.slideBox.style.transform = 'translateX(' + (-index * size) + 'px)';
        }
        if(that.slides[index].id === "lastclone"){
            index = that.slides.length - 2;
            that.slideBox.style.transform = 'translateX(' + (-index * size) + 'px)';
        }
    }

    new Slider();

})();
