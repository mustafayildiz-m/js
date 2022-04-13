class GlobalAudio {
    id;
    state;
    path = STATIC_URL + '/js/star-mart-suite-text/mp3/';
    sound;
    has_audio_permission = false;

    constructor(audio) {
        this.sound = new Audio(this.path + audio);
        this.sound.loop = false;
        this.sound.volume = 0.07;
    }

    play() {
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    resume() {
        this.sound.play();
    }

    abort() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}