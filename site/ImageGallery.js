/** 
 * @typedef ImageFile
 * @property {string} fileName
 * @property {string} caption
 */

/**
 * @typedef FocusedImage
 * @property {HTMLImageElement} imageElement
 * @property {number} imageIndex
 */


export class ImageGallery {

    /**
     * 
     * @param {Array<ImageFile>} imageFiles 
     */
    constructor(imageFiles) {
        /** @type {HTMLDivElement} */
        this.el = document.createElement('div');
        this.el.classList.add('gallery');

        /** @type {FocusedImage} */
        this.fullImage = {
            imageElement: document.createElement('img')
        }

        /** @type {HTMLDivElement} */
        this.fullImageView = this.buildFullImageView();

        /** @type {Array<ImageFile>} */
        this.imageFiles = imageFiles;

        /** @type {Array<HTMLImageElement>} */
        this.imageElements = [];
    }

    async buildGallery() {
        for (let image of this.imageFiles) {
            const source = await this.getImageSource(image);
            if (source) {                    
                const imageContainer = this.buildImage(source, image.caption);
                this.el.appendChild(imageContainer);
            }
        }
    }

    /**
     * @param {string} imageSource
     * @param {string} imageCaption
     * @returns {HTMLDivElement}
     */
    buildImage(imageSource, imageCaption) {
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        let imageElement = document.createElement('img');
        imageElement.src = imageSource;
        this.imageElements.push(imageElement);
        imageContainer.appendChild(imageElement);

        let captionDiv = document.createElement('div');
        captionDiv.classList.add('image-caption');
        captionDiv.textContent = imageCaption;
        imageContainer.appendChild(captionDiv);

        imageContainer.addEventListener('click', () => {
            this.fullImage.imageElement.src = imageElement.src;
            this.fullImage.imageIndex = this.imageElements.indexOf(imageElement);
            document.body.appendChild(this.fullImageView);
        });
        return imageContainer;
    }

    /**
     * @param {ImageFile} imageFile
     */
    async getImageSource(imageFile) {
        const params = new URLSearchParams();
        params.append('fileName', imageFile.fileName);

        // TODO encoding required (test with images that include underscore and space in file name)
        const urlString = `./phpScripts/getImages.php?${params.toString()}`;
        const response = await fetch(urlString);
        if (response.ok) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
        return null;
    }

    show() {
        this.el.classList.add('show');
    }

    hide() {
        this.el.classList.remove('show');
    }

    /**
     * @returns {HTMLDivElement}
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

    removeFullImageView() {
        document.body.removeChild(this.fullImageView);
    }
}