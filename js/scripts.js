/*
4. Odtwarzacz filmów
Stwórz odtwarzacz filmów, który udostępni podstawowe funkcjonalności. Będą to możliwość odtwarzania, pauzowania, wyświetlania paska postępu (który umożliwi również przewijanie). Wyświetl również czas trwania całego filmu, a także aktualny czas postępu.
Porada: aby ułatwić sobie życie, jako pasek postępu wykorzystać możesz element <input> o type range: http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
*/


(function(){
    
    document.addEventListener("DOMContentLoaded", function() {


        var videoPlayer = document.getElementById("videoPlayer"),
            video = document.getElementById("video"),
            playbackBar = document.getElementById("playbackBar"),
            playButton = document.getElementById("playButton"),
            currentTime = document.querySelector(".currentTime"),
            totalTime = document.querySelector(".totalTime"),
            i = playButton.querySelector("i");

        playbackBar.style.cursor = "pointer";

        playButton.onclick = function(){

           if(video.paused){
                video.play();

                i.classList.remove("fa-play");
                i.classList.add("fa-pause");
                this.querySelector("span").textContent = "Pause";

            }else{
                video.pause();

                i.classList.remove("fa-pause");
                i.classList.add("fa-play");
                this.querySelector("span").textContent = "Play";        

            }
        };

        video.addEventListener("timeupdate", function(e){
            var percentPlayed = (e.target.currentTime / e.target.duration) * 100; 
            playbackBar.value = percentPlayed;             
            //playbackBar.value = e.target.currentTime;
        }, false);
        
         playbackBar.oninput = function(e) {
            var newTime = video.duration * parseInt(e.target.value) / 100;
            video.currentTime = newTime;

            console.log("całkowity czas: " + video.duration);
            console.log("pozycja suwaka: " + e.target.value);
            console.log("%c NOWY CZAS: " + newTime, 'color: red');

        };       

        playbackBar.onchange = function(){
            video.currentTime = playbackBar.value;
        };


        var formatTime = function(seconds) { 
            var seconds = Math.round(seconds), 
                minutes = Math.floor(seconds / 60),
                remainingSeconds = seconds - minutes * 60; 

            if(remainingSeconds == 0)
                remainingSeconds = "00";
            else if(remainingSeconds < 10)
                remainingSeconds = "0" + remainingSeconds;

            return minutes + ":" + remainingSeconds;
        }

        video.addEventListener("timeupdate", function(){         
            currentTime.innerHTML = formatTime(video.currentTime); 
        }, false); 

        video.onended = function() {
            i.classList.remove("fa-pause");
            i.classList.add("fa-play");
            playButton.querySelector("span").textContent = "Play";
        }

        video.addEventListener("canplay", function(){
            totalTime.innerHTML = formatTime(video.duration);
        }, false);
      
      
    }, false);    
})();
