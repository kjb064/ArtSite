import { AbstractGallery } from "./AbstractGallery.js";

export class PDFGallery extends AbstractGallery {
    
    /**
     * Constructor.
     * 
     * @param {string} directory the directory containing the PDF to display
     */
    constructor(directory) {
        super(directory);

        this.el.classList.add('pdf-gallery');
    }

    /**
     * Builds the gallery, loaded with the PDF contained within the provided
     * directory.
     */
    async buildGallery() {
        const params = new URLSearchParams();
        params.append('directory', this.directory);
        const urlString = `./phpScripts/getResume.php?${params.toString()}`;
        const response = await fetch(urlString);
        if (response.ok) {
            /** @type {Array<string>} */
            const data = await response.json();
            // TODO don't want to have 'art' here and in PHP script... Return entire path from script?
            const path = 'art/' + this.directory + '/' + data[0];
            const pdfIframe = document.createElement('iframe');
            pdfIframe.classList.add('pdf-iframe');
            pdfIframe.src = path;
            this.el.appendChild(pdfIframe);
        }
    }
}