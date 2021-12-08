import { ImageGallery } from './ImageGallery.js';

class TabView {
    /**
     * 
     * @param {HTMLButtonElement} tabButton
     * @param {ImageGallery} gallery
     */
    constructor(tabButton, gallery) {
        /** @type {HTMLButtonElement} */
        this.tabButton = tabButton;

        /** @type {ImageGallery} */
        this.gallery = gallery;

        /** @type {boolean} */
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
        this.tabButton.classList.add('active');
        this.gallery.show();
    }

    deactivate() {
        this.isActive = false;
        this.tabButton.classList.remove('active');
        this.gallery.hide();
    }
}

/** 
 * @returns {Promise<TabView>} 
 */
async function setup2DArtTab() {
    const response = await fetch('./2DArt.json');
    if (response.ok) {
        const data = await response.json();
        const gallery = new ImageGallery(data.images);
        gallery.buildGallery();
        document.body.appendChild(gallery.el);
        
        const button = document.getElementById('2d-art');
        const tabView = new TabView(button, gallery);
        return tabView;
    }
    return null;
}

async function init() {
    const tabView2dArt = await setup2DArtTab();
    if (tabView2dArt) tabView2dArt.activate();
}

window.addEventListener('DOMContentLoaded', () => {
    init();
});