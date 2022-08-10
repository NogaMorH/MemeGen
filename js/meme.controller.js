'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')

renderMeme()

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    drawMeme(img.url, meme.lines)
}

function drawMeme(imgUrl, textLines) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        drawImg(img)
        highlightSelectedLine()
        drawTextLines(textLines)
    }
}

function drawImg(img) {
    gCtx.beginPath()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.closePath()
}

function drawTextLines(textLines) {
    textLines.forEach((textLine, idx) => {
        const { text, size, align, color } = textLine
        const lineHeight = setLineHeight(idx)
        drawText(text, gElCanvas.width / 2, lineHeight, size, align, color)
    })
}

function drawText(text, x, y, fontSize = '40', textAlign = 'center', color = 'black') {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = textAlign
    gCtx.lineWidth = 2
    gCtx.font = `${fontSize}px Impact`
    gCtx.fillStyle = 'white'
    gCtx.fillText(text, x, y)
    gCtx.strokeStyle = `${color}`
    gCtx.strokeText(text, x, y)
    gCtx.closePath()
}

function highlightSelectedLine() {
    const meme = getMeme()
    const lineHeight = setLineHeight(meme.selectedLineIdx)
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const textMeasured = gCtx.measureText(`${selectedLine.text}`)
    const textBoxWidth = textMeasured.width
    const textBoxHeight = selectedLine.size * 1.286
    const startX = gElCanvas.width / 2 - (textBoxWidth / 2)
    const startY = lineHeight - (textBoxHeight / 2)
    drawTextBoxBorder(startX - 10, startY, textBoxWidth + 20, textBoxHeight)
}

function drawTextBoxBorder(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height)
    gCtx.strokeStyle = '#ffff4f'
    gCtx.lineWidth = 1
    gCtx.stroke()
    gCtx.closePath()
}

function setLineHeight(lineIdx) {
    let textLineHeight
    if (lineIdx === 0) return textLineHeight = 50
    else if (lineIdx === 1) return textLineHeight = gElCanvas.height - 50
    else return textLineHeight = gElCanvas.height / 2
}

function onSetLineText(text) {
    setLineText(text)
    renderMeme()
}

function onSetTextColor(color) {
    setTextColor(color)
    renderMeme()
}

function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}

function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}

function onSwitchLine() {
    switchLines()
    renderMeme()
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const elTextInput = document.querySelector('input[name="text-line-input"]')
    elTextInput.value = selectedLine.text
}


