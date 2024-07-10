window.html2canvas = html2canvas;

function PoweredByKaia() {
  const cta = document.getElementById("export-partners-cta")
  const targetCanvas = document.querySelector('.partners-export-section')
  const backgroundBlocks = gsap.utils.toArray('.background-export-div')

  const listWells = gsap.utils.toArray('.partner-export-well')
  console.log(listWells)

  listWells.map(well => {
    const emptyDiv = well.querySelector('.w-dyn-empty')
    if (emptyDiv) {
      well.style.display = 'none'
    }
  })

  function onClick() {
    const origPaddingX = targetCanvas.style.paddingRight
    const origPaddingY = targetCanvas.style.paddingTop
    const origDisplay = backgroundBlocks[0].style.display

    targetCanvas.style.paddingRight = '2.81rem'
    targetCanvas.style.paddingLeft = '2.81rem'
    targetCanvas.style.paddingTop = '5rem'
    targetCanvas.style.paddingBottom = '5rem'
    backgroundBlocks.map(block => {
      block.style.display = 'none'
    })

    html2canvas(targetCanvas, {
      backgroundColor: 'black',
      useCORS: true,
    }).then(canvas => {
      canvas.style.display = 'none'
      canvas.style.padding = '10px'
      document.body.appendChild(canvas)
      return canvas
    }).then(canvas => {
      const image = canvas.toDataURL('image/bmp')
      const fileName = `partners-list-${new Date().toJSON()}.bmp`
      const a = document.createElement('a')
      a.setAttribute('download', fileName)
      a.setAttribute('href', image)
      a.click()
      canvas.remove()

      targetCanvas.style.paddingRight = origPaddingX
      targetCanvas.style.paddingLeft = origPaddingX
      targetCanvas.style.paddingTop = origPaddingY
      targetCanvas.style.paddingBottom = origPaddingY
      backgroundBlocks.map(block => {
        block.style.display = origDisplay
      })
    })
  }

  cta.onclick = onClick
}

$(window).on("load", PoweredByKaia)

