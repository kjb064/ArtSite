export class AbstractGallery {

    /**
     * Constructor.
     * 
     * @param {string} directory the directory on the server containing the media to display in the gallery
     */
    constructor(directory) {
        /** @type {HTMLDivElement} */
        this.el = document.createElement('div');
        this.el.classList.add('gallery');

        /** @type {string} */
        this.directory = directory;
    }
    
    /**
     * Builds the gallery, loaded with the appropriate media obtained from
     * the provided directory.
     */
    async buildGallery() {
        throw new Error('buildGallery() must be overridden in child class');
    }

    /**
     * Displays this gallery.
     */
    show() {
        this.el.classList.add('show');
    }
    
    /**
     * Hides this gallery.
     */
    hide() {
        this.el.classList.remove('show');
    }
}