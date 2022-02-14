import { AbstractGallery } from './AbstractGallery.js';
import { ImageGallery } from './ImageGallery.js';
import { PDFGallery } from './PDFGallery.js';
import { VideoGallery } from './VideoGallery.js';

/**
 * Class to represent a tab and its contents.
 */
class TabView {

    /**
     * Constructs a new TabView.
     * 
     * @param {HTMLButtonElement} tabButton the button associated with this TabView
     * @param {AbstractGallery} gallery the gallery to display
     */
    constructor(tabButton, gallery) {
        /** @type {HTMLButtonElement} */
        this.tabButton = tabButton;

        /** @type {AbstractGallery} */
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
    return new TabView(button, gallery);
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
    return new TabView(button, gallery);
}

/**
 * Sets up the Animations tab.
 * 
 * @returns {TabView} the Animations TabView
 */
function setupAnimationTab() {
    const gallery = new VideoGallery('Animation');
    gallery.buildGallery();
    document.body.appendChild(gallery.el);

    const button = document.getElementById('animations');
    return new TabView(button, gallery);
}

/**
 * Sets up the About Me tab.
 * 
 * @returns {TabView} the About Me TabView
 */
function setupAboutMeTab() {
    const gallery = new PDFGallery('About');
    gallery.buildGallery();
    document.body.appendChild(gallery.el);

    const button = document.getElementById('about-me');
    return new TabView(button, gallery);
}

/**
 * Initializes all tabs and activates the first.
 */
function init() {
    const tabView2dArt = setup2DArtTab();
    if (tabView2dArt) tabView2dArt.activate();

    const tabView3dRenders = setup3DRendersTab();
    const tabAnimations = setupAnimationTab();
    const tabAboutMe = setupAboutMeTab();

    const tabViews = [tabView2dArt, tabView3dRenders, tabAnimations, tabAboutMe];
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