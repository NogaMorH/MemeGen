'use strict'

var gMeme = {
    selectedImgId: '1',
    selectedLineIdx: 0,
    lines: [{
        text: 'Enter text here1',
        size: null,
        align: 'center',
        color: 'black'
    },
    {
        text: 'Enter text here3',
        size: null,
        align: 'center',
        color: 'black'
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

function alignLeft() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.align = 'left'
}

function alignRight() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.align = 'right'
}

function centerText() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.align = 'center'
}

function addLine() {
    const newLine = {
        text: 'Enter text here2',
        size: null,
        align: 'center',
        color: 'black'
    }
    console.log('gMeme.lines.length:', gMeme.lines.length)
    gMeme.lines.splice(gMeme.lines.length - 1, 0, newLine)
    console.log('gMeme.lines:', gMeme.lines)
}

function getMeme() {
    return gMeme
}

function setTextSize(defaultTextSize) {
    gMeme.lines.forEach(line => line.size = defaultTextSize)
}
