const app = () => {
    const song =  document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');

    //Get the length of the ouline
    const outlineLength = outline.getTotalLength();
    
    //Duration
    const timeSelect = document.querySelectorAll('.time-select button');
    let standardDuration = 600;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //Play Sound
        play.addEventListener('click', () => {
            checkPlaying(song);
        });

    //select sound
        timeSelect.forEach(option => {
            option.addEventListener('click', function() {
                standardDuration = this.getAttribute('data-time');
                timeDisplay.textContent =  `${Math.floor(standardDuration / 60)}:${Math.floor(standardDuration % 60)}`;
            });
        });

    //Function specific to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    //animate player's Circle
    song.ontimeUpdate = () => {
        let currentTime = song.currentTime;
        let elapsed = standardDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / standardDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

    //animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= standardDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };
};


app();