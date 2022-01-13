/**
 * A viewer for a list of media that gives focus to one media item 
 * at a time and which can be navigated via arrow buttons. 
 */
export class MediaViewer {

    /**
     * Constructor.
     * 
     * @param {Array<HTMLImageElement | HTMLVideoElement>} media to display in the viewer
     */
    constructor(media) {
        /** @type {Array<HTMLImageElement | HTMLVideoElement>} */
        this.media = media;

        /** @type {number} */
        this.currentIndex = 0;

        /** @type {HTMLDivElement} */
        this.el = this.createViewer();
    }

    /**
     * Creates the MediaViewer's visuals.
     * 
     * @returns the div containing the MediaViewer
     */
    createViewer() {
        const viewer = document.createElement('div');
        viewer.classList.add('media-viewer');

        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-container');
        mediaContainer.appendChild(this.media[this.currentIndex]);

        const counterDiv = document.createElement('div');
        counterDiv.classList.add('counter');

        const currentCounter = document.createElement('span');
        currentCounter.textContent = this.currentIndex + 1;

        const totalCounter = document.createElement('span');
        totalCounter.textContent = this.media.length;
        counterDiv.append(currentCounter, " / ", totalCounter);
        mediaContainer.appendChild(counterDiv);

        const leftButton = document.createElement('button');
        leftButton.classList.add('media-left');
        leftButton.textContent = '<';
        leftButton.addEventListener('click', (event) => {
            event.stopPropagation();

            let currentElement = this.media[this.currentIndex];
            this.currentIndex = this.currentIndex == 0 ? this.media.length - 1 : this.currentIndex - 1;
            mediaContainer.replaceChild(this.media[this.currentIndex], currentElement);

            currentCounter.textContent = this.currentIndex + 1;
        });
        viewer.appendChild(leftButton);

        viewer.appendChild(mediaContainer);

        const rightButton = document.createElement('button');
        rightButton.textContent = '>';
        rightButton.classList.add('media-right');
        rightButton.addEventListener('click', (event) => {
            event.stopPropagation();

            let currentElement = this.media[this.currentIndex];
            this.currentIndex = this.currentIndex == this.media.length - 1 ? 0 : this.currentIndex + 1;
            mediaContainer.replaceChild(this.media[this.currentIndex], currentElement);

            currentCounter.textContent = this.currentIndex + 1;
        });
        viewer.appendChild(rightButton);

        return viewer;
    }
}