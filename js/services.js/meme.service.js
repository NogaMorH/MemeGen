'use strict'

var gMeme = {
    selectedImgId: '1',
    selectedLineIdx: 0,
    lines: [{
        text: 'Enter text here',
        size: 50,
        align: 'center',
        color: 'red'
    },
    {
        text: 'I am Trump',
        size: 50,
        align: 'center',
        color: 'blue'
    }]
}

function setLineText(text) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.text = text
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setTextColor(color) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.color = color
}

function increaseFontSize() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.size++
}

function decreaseFontSize() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.size--
}

function switchLines() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function getMeme() {
    return gMeme
}

