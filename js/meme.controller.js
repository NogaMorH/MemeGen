'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')

function openMemeEditor() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.hidden = true
    elMemeEditor.hidden = false
    elMemeEditor.classList.add('flex')
    resizeCanvas()
    renderMeme()
}

function closeMemeEditor() {
    console.log('close meme editor')
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.hidden = false
    elMemeEditor.hidden = true
    elMemeEditor.classList.remove('flex')
    console.log('elMemeEditor.hidden:', elMemeEditor.hidden)
}

function renderMeme() {
    // addListeners()
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    drawMeme(img.url, meme.lines)
}

// function addListeners() {
//     window.addEventListener('resize', resizeCanvas)
// }

function drawMeme(imgUrl, textLines) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        drawImg(img)
        drawTextLines(textLines)
    }
}

function drawImg(img) {
    gCtx.beginPath()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.closePath()
}

function drawTextLines(textLines) {
    const meme = getMeme()
    const font = new FontFace('impact', 'url(../../fonts/impact/impact.ttf)')
    font.load().then(() => {
        document.fonts.add(font)
        textLines.forEach((textLine, idx) => {
            const { text, size, align, color } = textLine
            const lineHeight = setLineHeight(idx)
            drawText(text, gElCanvas.width / 2, lineHeight, size, align, color)
            if (idx === meme.selectedLineIdx) highlightSelectedLine()
        })
    })
}

function drawText(text, x, y, fontSize = '50', textAlign = 'center', color = 'black') {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = textAlign
    gCtx.lineWidth = 2
    gCtx.font = `${fontSize}px impact, sans-serif`
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
    var textLineHeight
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

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
    renderMeme()
}

// function clearCanvas() {
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }

