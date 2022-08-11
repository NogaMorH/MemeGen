'use strict'

var gKeyWordSearchCountMap = { funny: 10, baby: 6, politics: 2, cute: 3, cat: 7, man: 1, happy: 8 }
var gImgs = []

_createImages()

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getImages() {
    return gImgs
}

function _createImages() {
    gImgs.push(_createImg('img/1.jpg', ['funny', 'politics', 'man']))
    gImgs.push(_createImg('img/2.jpg', ['cute']))
    gImgs.push(_createImg('img/3.jpg', ['cute', 'baby']))
    gImgs.push(_createImg('img/4.jpg', ['cat']))
    gImgs.push(_createImg('img/5.jpg', ['baby', 'happy']))
    gImgs.push(_createImg('img/6.jpg', ['funny', 'man']))
    gImgs.push(_createImg('img/7.jpg', ['funny', 'baby']))
    gImgs.push(_createImg('img/8.jpg', ['funny', 'man']))
    gImgs.push(_createImg('img/9.jpg', ['cute', 'baby', 'happy']))
    gImgs.push(_createImg('img/10.jpg', ['funny', 'politics', 'happy', 'man']))
    gImgs.push(_createImg('img/11.jpg', ['man']))
    gImgs.push(_createImg('img/12.jpg', ['funny', 'man']))
    gImgs.push(_createImg('img/13.jpg', ['happy', 'man']))
    gImgs.push(_createImg('img/14.jpg', ['man']))
    gImgs.push(_createImg('img/15.jpg', ['man']))
    gImgs.push(_createImg('img/16.jpg', ['man', 'happy']))
    gImgs.push(_createImg('img/17.jpg', ['man', 'politics']))
    gImgs.push(_createImg('img/18.jpg', ['happy']))
}

function _createImg(url, keyWords) {
    return {
        id: makeId(),
        url,
        keyWords
    }
}