/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const sizeArrange=player.querySelector('.player__fullsize')

/* Build out functions */
function togglePlay() {
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
}
function updateButton() {
  // console.log("Button is updated.");
  if (video.paused) {
    toggle.textContent = '►'; // toggle button to show the play icon
  } else {
    toggle.textContent = '❚❚'; //  to show the pause icon
  }

}

function skip() {
  // console.log("skipped");
  const skipAmount = parseFloat(this.dataset.skip); 
  video.currentTime += skipAmount; 
}
function handleRangeUpdate() {
   console.log(this.value);
  // video[this.name]=this.value;
}
function handleProgress(){
  const percent=(video.currentTime/video.duration)*100;
  progressBar.style.flexBasis=`${percent}%`;
}

function scrub(e){
  const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
  video.currentTime=scrubTime;
}
function handleSize() {
  if (!document.fullscreenElement) {
    player.requestFullscreen(); // Enter fullscreen mode
    sizeArrange.innerHTML = '<i class="bi bi-arrows-angle-contract original-size"></i>'; 
    sizeArrange.setAttribute('title', 'Exit Full Screen'); 
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); // Exit fullscreen mode
      sizeArrange.innerHTML = '<i class="bi bi-arrows-angle-expand full-size"></i>';
      sizeArrange.setAttribute('title', 'Full Screen');
    
    }
  }
}
function handleKeydown(event) {
  if (event.key === 'f' || event.key === 'F') {
    handleSize();
  }
}
function togglePlaySpaceBar(e){
  if(e.keyCode===32){
    togglePlay();
  }
}

/* Hook up the event listeners */
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));

let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>mousedown && scrub(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);


//challenge will be fullscreen with click and f key
//and space bar to play and stop

sizeArrange.addEventListener('click',handleSize);
document.addEventListener('keydown', handleKeydown);
document.addEventListener('keydown', togglePlaySpaceBar);
