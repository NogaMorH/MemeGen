'use strict'

var gKeyWordSearchCountMap = { funny: 10, baby: 6, politics: 2, love: 3 }
var gImgs = [
    {
        id: '1',
        url: 'img/1.jpg',
        keyWords: ['funny', 'politics']
    },
    {
        id: '2',
        url: 'img/2.jpg',
        keyWords: ['love']
    }]

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getImages() {
    return gImgs
}