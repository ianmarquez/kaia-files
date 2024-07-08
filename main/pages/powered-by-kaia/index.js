window.html2canvas = html2canvas;

function PoweredByKaia() {
  const cta = document.getElementById("export-partners-cta")
  const targetCanvas = document.querySelector('.partners-export-section')
  cta.onclick = () => {
    const origPaddingX = targetCanvas.style.paddingRight
    const origPaddingY = targetCanvas.style.paddingTop

    targetCanvas.style.paddingRight = '2.81rem'
    targetCanvas.style.paddingLeft = '2.81rem'
    targetCanvas.style.paddingTop = '5rem'
    targetCanvas.style.paddingBottom = '5rem'

    html2canvas(targetCanvas, {
      backgroundColor: 'black',
      useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
    }).then(canvas => {
      canvas.style.display = 'none'
      canvas.style.padding = '10px'
      document.body.appendChild(canvas)
      return canvas
    }).then(canvas => {
      const image = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.setAttribute('download', `partners-list-${new Date().toJSON()}.png`)
      a.setAttribute('href', image)
      a.click()
      canvas.remove()

      targetCanvas.style.paddingRight = origPaddingX
      targetCanvas.style.paddingLeft = origPaddingX
      targetCanvas.style.paddingTop = origPaddingY
      targetCanvas.style.paddingBottom = origPaddingY
    })
  }


}


$(window).on("load", PoweredByKaia)
