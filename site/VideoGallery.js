import { AbstractGallery } from "./AbstractGallery.js";
import { MediaViewer } from "./MediaViewer.js";

/**
 * Class to display videos obtained from the directory provided.
 */
export class VideoGallery extends AbstractGallery {

    constructor(directory) {
        super(directory);

        this.el.classList.add('video-gallery');

        /** @type {Array<HTMLVideoElement>} */
        this.videoElements = [];

        /** @type {MediaViewer} */
        this.mediaViewer;
    }

    /**
     * @override
     */
    async buildGallery() {
        const params = new URLSearchParams();
        params.append('directory', this.directory);
        const urlString = `./phpScripts/getVideos.php?${params.toString()}`;
        const response = await fetch(urlString);
        if (response.ok) {
            /** @type {Array<string>} */
            const videoFiles = await response.json();
            if (videoFiles.length == 0) throw new Error("No videos were found in directory");

            for (let videoSrc of videoFiles) {
                let videoElement = document.createElement('video');
                videoElement.src = videoSrc;
                videoElement.controls = true;
                videoElement.autoplay = true;
                videoElement.muted = true;
                this.videoElements.push(videoElement);
            }
            this.mediaViewer = new MediaViewer(this.videoElements);
            this.el.appendChild(this.mediaViewer.el);
        }
    }

}