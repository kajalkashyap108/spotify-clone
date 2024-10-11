console.log("Welcome to Spotify");

// Define songs array first
let songs = [
    { songName: "song1", filepath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "song2", filepath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "song3", filepath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "song4", filepath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "song5", filepath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "song6", filepath: "song/6.mp3", coverPath: "covers/6.jpg" },
];

// Initialize the variable
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filepath); // Use the first song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');

let gif = document.getElementById('gif');

// Handle play/pause click 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause(); // Corrected to pause()
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  const progressValue = myProgressBar.value;
  if (!isNaN(progressValue) && progressValue >= 0 && progressValue <= 100) {
      audioElement.currentTime = (progressValue / 100) * audioElement.duration;
  }
});



// Handle song end event
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length; // Move to the next song, loop back to first
    audioElement.src = songs[songIndex].filepath;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});
