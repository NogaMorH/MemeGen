'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')

function openMemeEditor() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.hidden = true
    elMemeEditor.hidden = false
    elMemeEditor.classList.add('flex')
    initMeme()
}

function initMeme() {
    resizeCanvas()
    addListeners()
    setTextSize(getDefaultTextSize())
    renderMeme()
    renderTextInput()
}

function onCloseMemeEditor() {
    closeMemeEditor()
}

function closeMemeEditor() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    elGallery.hidden = false
    elMemeEditor.hidden = true
    elMemeEditor.classList.remove('flex')
}

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    drawMeme(img.url)
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function drawMeme(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        drawImg(img)
        drawTextLines()
    }
}

function drawImg(img) {
    gCtx.beginPath()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.closePath()
}

function drawTextLines() {
    const meme = getMeme()
    // const font = new FontFace('alumni', 'url(../fonts/alumni/AlumniSansCollegiateOne-Regular.ttf)')
    // font.load().then(() => {
    //     document.fonts.add(font)
    // const nums = [1, 2, 3]
    console.log('meme.lines:', meme.lines)
    meme.lines.forEach((textLine, idx) => {
        console.log('idx:', idx)
        const { text, size, align, color } = textLine
        const { startX, startY } = getTextPosition(align, idx)
        drawText(text, startX, startY, size, align, color)
        if (idx === meme.selectedLineIdx) highlightSelectedLine()
    })
}
// )
// }

function getTextPosition(align, lineIdx) {
    const startY = setLineHeight(lineIdx)
    let startX
    if (align === 'center') startX = gElCanvas.width / 2
    else if (align === 'left') startX = 20
    else startX = startX = gElCanvas.width - 20
    return { startX, startY }
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
    const textWidth = textMeasured.width
    const textHeight = selectedLine.size * 1.286
    const textPosition = getTextPosition(selectedLine.align, meme.selectedLineIdx)
    let borderStartX
    if (selectedLine.align === 'center') borderStartX = gElCanvas.width / 2 - (textWidth / 2) - 10
    else if (selectedLine.align === 'left') borderStartX = textPosition.startX - 10
    else borderStartX = gElCanvas.width - textWidth - 30
    const borderStartY = lineHeight - (textHeight / 2)
    drawTextBoxBorder(borderStartX, borderStartY, textWidth + 20, textHeight)
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
    const meme = getMeme()
    const lineSpace = 70
    var textLineHeight
    if (meme.lines.length === 1) textLineHeight = lineSpace
    else if (meme.lines.length === 2) {
        if (lineIdx === 0) textLineHeight = lineSpace
        else textLineHeight = gElCanvas.height - lineSpace
    } else {
        if (lineIdx === 0) textLineHeight = 70
        else if (lineIdx === meme.lines.length - 1) textLineHeight = gElCanvas.height - lineSpace
        else textLineHeight = gElCanvas.height / 2
    }
    return textLineHeight
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
    renderTextInput()
}

function onAlignLeft() {
    alignLeft()
    renderMeme()
}

function onAlignRight() {
    alignRight()
    renderMeme()
}

function onCenterText() {
    centerText()
    renderMeme()
}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
}

function renderTextInput() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const elTextInput = document.querySelector('input[name="text-line-input"]')
    elTextInput.value = selectedLine.text
}

function getDefaultTextSize() {
    let defaultTextSize
    if (gElCanvas.width > 450) defaultTextSize = 50
    else if (gElCanvas.width > 250) defaultTextSize = 40
    else defaultTextSize = 30
    return defaultTextSize
}

function onAddLine() {
    addLine()
    setTextSize(getDefaultTextSize())
    renderMeme()
}
// function clearCanvas() {
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }

