'use strict'

renderGallery()

function renderGallery() {
    const elImagesContainer = document.querySelector('.images-container')
    const images = getImages()
    const imagesStr = images.map(img => `<img src="${img.url}" onclick="onImgSelect('${img.id}')" />`)
    elImagesContainer.innerHTML = imagesStr.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    openMemeEditor()
    renderMeme()
}

function openMemeEditor() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.hidden = true
    elMemeEditor.hidden = false
    resizeCanvas()
}