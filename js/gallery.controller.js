'use strict'

function initGallery() {
    closeMemeEditor()
    renderGallery()
}

function renderGallery() {
    const elImagesContainer = document.querySelector('.images-container')
    const images = getImages()
    const imagesStr = images.map(img => `<img src="${img.url}" onclick="onImgSelect('${img.id}')" />`)
    elImagesContainer.innerHTML = imagesStr.join('')
}

function onImgSelect(imgId) {
    setInitialMeme(imgId)
    openMemeEditor()
}

function onOpenMenu() {
    document.body.classList.add('menu-opened')
}

function onCloseMenu() {
    document.body.classList.remove('menu-opened')
}

function onOpenSavedMemes() {
    onCloseMemeEditor()
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elImagesContainer = document.querySelector('.images-container')
    const strHtmls = savedMemes.map((savedMeme) => {
        return `<img src="${savedMeme.url}" />`
    })
    elImagesContainer.innerHTML = strHtmls.join('')
}

function onOpenGallery() {
    closeMemeEditor()
    onCloseMenu()
    initGallery()
}

