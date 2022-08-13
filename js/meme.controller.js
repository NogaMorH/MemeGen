'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')
var gIsDownload = false

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
    if (gIsDownload) {
        drawImg(img)
        drawTextLines()
    } else {
        img.onload = () => {
            drawImg(img)
            drawTextLines()
        }
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
    meme.lines.forEach((textLine, idx) => {
        if (!textLine.height) updateLineHeight(idx)
        const { text, size, align, borderColor, fillColor } = textLine
        const { startX, startY } = getTextPosition(align, idx)
        drawText(text, startX, startY, size, align, borderColor, fillColor)
        if (idx === meme.selectedLineIdx && !gIsDownload) highlightSelectedLine()
    })
}
// )
// }

function getTextPosition(align, lineIdx) {
    const meme = getMeme()
    const currLine = meme.lines[lineIdx]
    const startY = currLine.height
    let startX
    if (align === 'center') startX = gElCanvas.width / 2
    else if (align === 'left') startX = 20
    else startX = startX = gElCanvas.width - 20
    return { startX, startY }
}

function drawText(text, x, y, fontSize, textAlign, borderColor, fillColor) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = textAlign
    gCtx.lineWidth = 2
    gCtx.font = `${fontSize}px impact, sans-serif`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = borderColor
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gCtx.closePath()
}

function highlightSelectedLine() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const lineHeight = selectedLine.height
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

function onSetLineText(text) {
    setLineText(text)
    renderMeme()
}

function onSetTextBorderColor(color) {
    setTextBorderColor(color)
    renderMeme()
}

function onSetTextFillColor(color) {
    setTextFillColor(color)
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
    const gMeme = getMeme()
    addLine()
    setTextSize(getDefaultTextSize())
    updateLineHeight(gMeme.selectedLineIdx)
    renderMeme()
    renderTextInput()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
    renderTextInput()
}

function updateLineHeight(lineIdx) {
    let lineHeight
    const lineSpace = 70
    const meme = getMeme()
    const linesLength = meme.lines.length
    if (lineIdx === 0) lineHeight = lineSpace
    else if (linesLength === 2) lineHeight = gElCanvas.height - lineSpace
    else {
        if (lineIdx === linesLength - 1) lineHeight = gElCanvas.height - lineSpace
        else lineHeight = gElCanvas.height / 2
    }
    setLineHeight(lineIdx, lineHeight)
}

function onLineUp() {
    // prevent drawing text out of the canvas
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const textHeight = selectedLine.size * 1.286
    if (selectedLine.height <= textHeight / 2) return
    moveLineUp()
    renderMeme()
}

function onLineDown() {
    // prevent drawing text out of the canvas
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const textHeight = selectedLine.size * 1.286
    if (selectedLine.height >= gElCanvas.height - (textHeight / 2)) return
    moveLineDown()
    renderMeme()
}

function onDownloadMeme() {
    gIsDownload = true
    renderMeme()
    changeDownloadLink()
    gIsDownload = false
    renderMeme()
}

function changeDownloadLink() {
    const elLink = document.querySelector('.download-link')
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}

function onSaveMeme() {
    saveMeme()
}

// function clearCanvas() {
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }

