    function playSound(e){
    const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key=document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if(!audio) return; //stop the function from running all together
    audio.currentTime=0;
    audio.play();

    key.classList.add('playing');
    }
    
    function removeTransition(e){
        if(e.propertyName !=='transform') return;// skip it if it is not transform
        this.classList.remove('playing'); 

    }
    
    const keys=this.document.querySelectorAll('.key');
    keys.forEach(key=>key.addEventListener('transitionend',removeTransition));

    window.addEventListener('keydown',playSound);