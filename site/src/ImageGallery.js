import { AbstractGallery } from "./AbstractGallery.js";

/**
 * @typedef FocusedImage
 * @property {HTMLImageElement} imageElement
 * @property {number} imageIndex
 */

/**
 * Class to display images, loaded from the directory provided, in a 
 * grid-like view.
 */
export class ImageGallery extends AbstractGallery {

    /**
     * Constructor.
     * 
     * @param {!string} imageDirectory the directory containing the files to display
     */
    constructor(imageDirectory) {
        super(imageDirectory);

        this.el.classList.add('image-gallery');

        /** @type {FocusedImage} */
        this.fullImage = {
            imageElement: document.createElement('img'),
            imageIndex: -1
        }

        /** @type {HTMLDivElement} */
        this.fullImageView = this.buildFullImageView();

        /** @type {Array<HTMLImageElement>} */
        this.imageElements = [];
    }

    /**
     * Builds the image gallery, loaded with the files contained within the 
     * provided image directory.
     * 
     * @override
     */
    async buildGallery() {
        const params = new URLSearchParams();
        params.append('directory', this.directory);
        const urlString = `./src/phpScripts/getImages.php?${params.toString()}`;
        const response = await fetch(urlString);
        if (response.ok) {
            const imageFiles = await response.json();
            // TODO check data is what's expected (not null, etc.)
            if (imageFiles) {
                for (let image of imageFiles) {              
                    const imageContainer = this.buildImage(image);
                    this.el.appendChild(imageContainer);
                }
            }
        }
    }

    /**
     * Creates an image element whose source is the file with the given name. 
     * The image is wrapped in a div, which is then returned.
     * 
     * @private
     * @param {string} imageSrc the image source
     * @returns {HTMLDivElement} the image container
     */
    buildImage(imageSrc) {
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        let imageElement = document.createElement('img');
        imageElement.src = imageSrc; 
        this.imageElements.push(imageElement);
        imageContainer.appendChild(imageElement);

        imageContainer.addEventListener('click', () => {
            this.fullImage.imageElement.src = imageElement.src;
            this.fullImage.imageIndex = this.imageElements.indexOf(imageElement);
            document.body.appendChild(this.fullImageView);
        });
        return imageContainer;
    }

    /**
     * Builds the full image view div, including the close button and the 
     * left and right arrow buttons to change the image that is displayed 
     * within the div.
     * 
     * @private
     * @returns {HTMLDivElement} the full image view div
     */
    buildFullImageView() {
        const fullView = document.createElement('div');
        fullView.classList.add('full-image-view');
        fullView.appendChild(this.fullImage.imageElement);

        const closeButton = document.createElement('button');
        closeButton.id = 'full-image-close-button';
        closeButton.classList.add('full-image-button');
        closeButton.textContent = 'X';
        fullView.appendChild(closeButton);

        const leftArrow = document.createElement('button');
        leftArrow.id = 'left-arrow';
        leftArrow.classList.add('full-image-button');
        leftArrow.textContent = '<';
        leftArrow.addEventListener('click', (event) => {
            event.stopPropagation();

            // Set the previous image in the array as the focused image.
            // If the current image is the first in the array, loop back to the last.
            const index = this.fullImage.imageIndex;
            let newIndex = index !== 0 ? index - 1 : this.imageElements.length - 1;
            let element = this.imageElements[newIndex];

            this.fullImage.imageElement.src = element.src;
            this.fullImage.imageIndex = newIndex;
        });
        fullView.appendChild(leftArrow);

        const rightArrow = document.createElement('button');
        rightArrow.id = 'right-arrow';
        rightArrow.classList.add('full-image-button');
        rightArrow.textContent = '>';
        rightArrow.addEventListener('click', (event) => {
            event.stopPropagation();

            // Set the next image in the array as the focused image.
            // If the current image is the last in the array, loop back to 0.
            const index = this.fullImage.imageIndex;
            let newIndex = index !== this.imageElements.length - 1 ? index + 1 : 0;
            let element = this.imageElements[newIndex];

            this.fullImage.imageElement.src = element.src;
            this.fullImage.imageIndex = newIndex;
        });
        fullView.appendChild(rightArrow);

        // Hide the view if clicking outside the image
        fullView.addEventListener('click', (event) => {
            // TODO remove check for arrows here and cancel event bubbling when handling click for those
            if (event.target !== this.fullImage.imageElement &&
                event.target !== rightArrow && 
                event.target !== leftArrow) {
                this.removeFullImageView();
            }
        });
        return fullView;
    }

    /**
     * Removes the full image view div from the document.
     * 
     * @private
     */
    removeFullImageView() {
        document.body.removeChild(this.fullImageView);
    }
}