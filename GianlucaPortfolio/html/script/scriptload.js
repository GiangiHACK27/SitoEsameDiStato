var image = document.querySelector("#image");
var counter = document.querySelector("#counter");
var startBlur = 30;
var startCount = 0;
 
function unblur() {
  if (startBlur <= 0) {
    clearInterval(stopUnblur);
    counter.innerText = "100%";
    //counter.classList.add("fadeout");
    return;
  }
  startBlur -= 1;
  startCount += 10/3;
  image.style.filter = "blur(" + startBlur + "px)";
  counter.innerText = parseInt(startCount) + "%";
  counter.style.opacity = parseInt(0.1*startCount) ;
}
var stopUnblur = setInterval(unblur, 100);