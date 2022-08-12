'use strict'


function init() {
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
    setImg(imgId)
    openMemeEditor()
}

function onOpenMenu() {
    document.body.classList.add('menu-opened')
}

function onCloseMenu() {
    document.body.classList.remove('menu-opened')
}


