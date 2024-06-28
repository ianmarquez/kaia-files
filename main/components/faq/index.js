const faq = () => {
  let openedIdx;
  const faqHeaders = gsap.utils.toArray(".faq-header-div")
  const faqContent = gsap.utils.toArray(".faq-item-content")
  const faqFilterChips = gsap.utils.toArray(".faq-filter-chip")


  function closeAccordion() {
    if (openedIdx === undefined) return
    const openedHeader = faqHeaders[openedIdx]
    const openedContent = faqContent[openedIdx]

    const timeline = gsap.timeline()
    timeline.timeScale(3)


    timeline.to(openedContent, {
      height: 0
    })
    timeline.to(openedHeader, {
      color: "var(--greyscale--fg--subtlest)",
      // textDecoration: "none"
    }, "<")
    const [_, openedFAQSymbol] = gsap.utils.toArray(openedHeader.children)
    timeline.to(openedFAQSymbol, { rotation: 0 }, "<")

    openedIdx = undefined
  }

  function openAccordion(header, idx) {
    const timeline = gsap.timeline()
    const [_, symbol] = gsap.utils.toArray(header.children)
    timeline.timeScale(3)
    if (openedIdx !== undefined) {
      timeline.to(faqContent[openedIdx], {
        height: 0
      })
      timeline.to(faqHeaders[openedIdx], {
        color: "var(--greyscale--fg--subtlest)",
        textDecoration: "none"
      }, "<")

      const [_, openedFAQSymbol] = gsap.utils.toArray(faqHeaders[openedIdx].children)
      timeline.to(openedFAQSymbol, { rotation: 0 }, "<")

    }
    timeline.to(faqContent[idx], {
      height: "auto"
    }, "<")

    timeline.to(header, {
      color: "var(--brand--fg--neutral)",
      // textDecoration: "underline"
    }, "<")

    timeline.to(symbol, { rotation: 45 }, "<")

  }

  faqFilterChips.map(chip => {
    chip.onclick = () => closeAccordion()
  })

  faqHeaders.map((header, idx) => {
    header.onclick = () => {
      if (openedIdx !== idx) {
        openAccordion(header, idx)
        openedIdx = idx
      } else {
        closeAccordion()
      }
    }
  })
}


$(document).ready(faq)
