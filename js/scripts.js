/*
4. Odtwarzacz filmów
Stwórz odtwarzacz filmów, który udostępni podstawowe funkcjonalności. Będą to możliwość odtwarzania, pauzowania, wyświetlania paska postępu (który umożliwi również przewijanie). Wyświetl również czas trwania całego filmu, a także aktualny czas postępu.
Porada: aby ułatwić sobie życie, jako pasek postępu wykorzystać możesz element <input> o type range: http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
*/


(function(){

    var videoPlayer = document.getElementById("videoPlayer"),
        video = document.getElementById("video"),
        playbackBar = document.getElementById("playbackBar"),
        playButton = document.getElementById("playButton"),
        currentTime = document.querySelector(".currentTime"),
        totalTime = document.querySelector(".totalTime");


    playbackBar.style.cursor = "pointer";

    /* PYTANIE 1: Jak można zrobić aby ten range (zmienna playbackBar) miał szerokość np. 80% szerokości wideo? 
    To poniżej nie działa dobrze (złe zdarzenie? choć próbowałam inne i nic to nie zmieniło) oraz nie jest to rozwiązanie responsywne (gdy ktoś zmieni rozmiar już wczytanej strony)
    Dokładniej co się dzieje:
    - przy niektórych wczytaniach strony działa czyli input nabiera większej szerokosc i w czasie odtwarzania suwak przechodzi po całym pasku,
    - a przy niektórych wczytaniach strony nie działa czyli tzn. input jest normalny, ale w czasie odtwarzania suwak przechodzi tylko po części pasku (tak jakby jakaś wewnętrzna składowa przeglądarkowego inputa związana z tym jaką trasę maksymalnie pokonuje suwak się skróciła. Dlatego też wtedy nie działa dobrze przesuwanie suwaka po tak krótkim fragmencie aby móc odtworzyć film w dalszym momencie).

    Poza tym gdy próbowałam przypisać szerokość w pliku css, to nie wpływało to na realną szerokość tego inputa typu range - dlaczego?
    */

    //video.onloadedmetadata = function(){
    //    playbackBar.style.width = 0.8*video.offsetWidth + "px";
    //}


    playButton.onclick = function(){

        var i = playButton.querySelector("i");

        
        // PYTANIE 3 do WERSJA 1: Dlaczego w tej wersji tekst w buttonie przy klikaniu się nie zmienia?
        // PYTANIE 4 do WERSJA 2: Co zrobić aby przy zmienie zawartosci buttona na nieco szerszą nie zwiększał on swojej wysokości, tylko szerokość?

        if(video.paused){
            video.play();

            // WERSJA 1:
            i.classList.remove("fa-play");
            i.classList.add("fa-pause");
            this.querySelector("span").textContent = "Pause";

            // WERSJA 2:
            // this.innerHTML = "<i class='fa fa-pause'></i>Pause</i>";

        }else{
            video.pause();

            // WERSJA 1:
            i.classList.remove("fa-pause");
            i.classList.add("fa-play");
            this.querySelector("span").textContent = "Play";        

            // WERSJA 2:
            // this.innerHTML = "<i class='fa fa-play'></i>Play</i>";
        }
    };


    video.addEventListener("durationchange", function(){
        playbackBar.min = 0;
        playbackBar.max = video.duration;
    }, false);

    video.addEventListener("timeupdate", function(e){
        playbackBar.value = e.target.currentTime;
    }, false);

    playbackBar.onchange = function(){
        video.currentTime = playbackBar.value;
    };


    formatTime = function(seconds) { 
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
        playButton.innerHTML = "<i class='fa fa-play'></i>Play</i>";
    }
   

    //PYTANIE 2 (być może podobna przyczyna co w pytaniu 1): Poniższe przypisanie długości trwania filmu nie zawsze działa dobrze przy każdym wczytaniu strony (złe zdarzenie?) tzn. czasem pisze 0:00 zamiast 0:12 a czasem jest ok - dlaczego? W tych samych momentach kiedy ten czas całkowity jest dobrze wczytany, to też input typu range przyjmuje wskazaną szerokość.
    video.addEventListener("durationchange", function(){
        totalTime.innerHTML = formatTime(video.duration);
    }, false);
    
    // video.addEventListener("canplay", function(){
    //     totalTime.innerHTML = formatTime(video.duration);
    // }, false);

})();
