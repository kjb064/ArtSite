import { ImageGallery } from './ImageGallery.js';

/**
 * Class to represent a tab and its contents.
 */
class TabView {

    /**
     * Constructs a new TabView.
     * 
     * @param {HTMLButtonElement} tabButton the button associated with this TabView
     * @param {ImageGallery} gallery the image gallery to display
     */
    constructor(tabButton, gallery) {
        /** @type {HTMLButtonElement} */
        this.tabButton = tabButton;

        /** @type {ImageGallery} */
        this.gallery = gallery;

        /** @type {boolean} */
        this.isActive = false;
    }

    /**
     * Activates this TabView and displays its contents.
     */
    activate() {
        this.isActive = true;
        this.tabButton.classList.add('active');
        this.gallery.show();
    }

    /**
     * Deactivates this TabView and hides its contents.
     */
    deactivate() {
        this.isActive = false;
        this.tabButton.classList.remove('active');
        this.gallery.hide();
    }
}

/** 
 * Sets up the 2D Art tab.
 * 
 * @returns {TabView} the 2D Art TabView
 */
function setup2DArtTab() {
    const gallery = new ImageGallery('2DArt');
    gallery.buildGallery();
    document.body.appendChild(gallery.el);
    
    const button = document.getElementById('2d-art');
    const tabView = new TabView(button, gallery);
    return tabView;
}

/** 
 * Sets up the 3D Renders tab.
 * 
 * @returns {TabView} the 3D Renders TabView
 */
function setup3DRendersTab() {
    const gallery = new ImageGallery('3DRenders');
    gallery.buildGallery();
    document.body.appendChild(gallery.el);
    
    const button = document.getElementById('3d-renders');
    const tabView = new TabView(button, gallery);
    return tabView;
}

/**
 * Initializes all tabs and activates the first.
 */
function init() {
    const tabView2dArt = setup2DArtTab();
    if (tabView2dArt) tabView2dArt.activate();

    const tabView3dRenders = setup3DRendersTab();

    const tabViews = [tabView2dArt, tabView3dRenders];
    tabViews.forEach((tabView) => {
        tabView.tabButton.addEventListener("click", () => {
            if (!tabView.isActive) {
                tabViews.forEach((item) => item.deactivate());
                tabView.activate();
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    init();
});