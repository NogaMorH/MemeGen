'use strict'

var gMeme = {
    selectedImgId: '1',
    selectedLineIdx: 0,
    lines: [{
        text: 'Enter text here1',
        size: null,
        align: 'center',
        color: 'black',
        height: null
    },
    {
        text: 'Enter text here3',
        size: null,
        align: 'center',
        color: 'black',
        height: null
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
    const newLine = _createNewLine()
    const linesLength = gMeme.lines.length
    let newLineIdx
    if (!linesLength) {
        gMeme.lines.push(newLine)
        newLineIdx = 0
    } else if (linesLength === 1 || linesLength === 2) {
        newLineIdx = 1
        gMeme.lines.splice(newLineIdx, 0, newLine)
    } else {
        newLineIdx = linesLength - 2
        gMeme.lines.splice(newLineIdx, 0, newLine)
    }
    gMeme.selectedLineIdx = newLineIdx
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    switchLines()
}

function setLineHeight(lineIdx, lineHeight) {
    const currLine = gMeme.lines[lineIdx]
    console.log('currLine:', currLine)
    currLine.height = lineHeight
}

function moveLineUp() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.height--
}

function moveLineDown() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.height++
}

function getMeme() {
    return gMeme
}

function setTextSize(defaultTextSize) {
    gMeme.lines.forEach(line => line.size = defaultTextSize)
}

function _createNewLine() {
    return {
        text: 'Enter text here2',
        size: null,
        align: 'center',
        color: 'black',
        height: null
    }
}
