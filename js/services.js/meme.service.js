'use strict'

const STORAGE_KEY = 'memesDB'
const gDefaultLines = [{
    text: 'Enter text',
    size: null,
    align: 'center',
    borderColor: 'black',
    fillColor: 'white',
    height: null
},
{
    text: 'Enter text',
    size: null,
    align: 'center',
    borderColor: 'black',
    fillColor: 'white',
    height: null
}]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    url: null,
    lines: JSON.parse(JSON.stringify(gDefaultLines))
}

var gSavedMemes = getSavedMemes()

function setLineText(text) {
    getSelectedLine().text = text
}

function setInitialMeme(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0
    gMeme.lines = JSON.parse(JSON.stringify(gDefaultLines))
}

function setTextBorderColor(color) {
    getSelectedLine().borderColor = color
}

function setTextFillColor(color) {
    getSelectedLine().fillColor = color
}

function changeFontSize(isIncrease) {
    const selectedLine = getSelectedLine()
    if (isIncrease) selectedLine.size++
    else selectedLine.size--
}

function switchLines() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function alignLeft() {
    getSelectedLine().align = 'left'
}

function alignRight() {
    getSelectedLine().align = 'right'
}

function centerText() {
    getSelectedLine().align = 'center'
}

function addLine() {
    const newLine = _createNewLine()
    const linesLength = gMeme.lines.length
    let newLineIdx
    if (!linesLength) {
        gMeme.lines.push(newLine)
        newLineIdx = 0
    } else if (linesLength === 1 || linesLength === 2) {
        if (linesLength === 1 && gMeme.lines[0].height > 70) newLineIdx = 0
        else newLineIdx = 1
        gMeme.lines.splice(newLineIdx, 0, newLine)
    } else {
        newLineIdx = linesLength - 2
        gMeme.lines.splice(newLineIdx, 0, newLine)
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    gMeme.selectedLineIdx = newLineIdx
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    switchLines()
}

function setLineHeight(lineIdx, lineHeight) {
    const currLine = gMeme.lines[lineIdx]
    currLine.height = lineHeight
}

function moveLine(isUp) {
    const moveSpace = 15
    const selectedLine = getSelectedLine()
    if (isUp) selectedLine.height = selectedLine.height - moveSpace
    else selectedLine.height = selectedLine.height + moveSpace
}

function getMeme() {
    return gMeme
}

function saveMeme(url) {
    gMeme.url = url
    const memeToSave = JSON.parse(JSON.stringify(gMeme))
    gSavedMemes.push(memeToSave)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function setTextSize(defaultTextSize) {
    gMeme.lines.forEach(line => line.size = defaultTextSize)
}

function _createNewLine() {
    return {
        text: 'Enter text',
        size: null,
        align: 'center',
        borderColor: 'black',
        fillColor: 'white',
        height: null
    }
}

function getSavedMemes() {
    let savedMemes = loadFromStorage(STORAGE_KEY)
    if (!savedMemes || !savedMemes.length) savedMemes = []
    return savedMemes
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
