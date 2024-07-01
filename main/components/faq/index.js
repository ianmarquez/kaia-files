let faqOpenedIndex;

function closeAccordion(header, content) {
  if (faqOpenedIndex === undefined || !header || !content) return
  const openedHeader = header
  const openedContent = content

  const timeline = gsap.timeline()
  timeline.timeScale(3)

  timeline.to(openedContent, {
    height: 0
  })
  timeline.to(openedHeader, {
    color: "var(--greyscale--fg--subtlest)",
    textDecoration: "none"
  }, "<")
  const [_, openedFAQSymbol] = gsap.utils.toArray(openedHeader.children)
  timeline.to(openedFAQSymbol, { rotation: 0 }, "<")

  faqOpenedIndex = undefined
}

const faq = () => {
  const faqHeaders = gsap.utils.toArray(".faq-header-div")
  const faqContent = gsap.utils.toArray(".faq-item-content")
  const faqFilterChips = gsap.utils.toArray(".faq-filter-chip")

  function closeAccordion() {
    if (faqOpenedIndex === undefined) return
    const openedHeader = faqHeaders[faqOpenedIndex]
    const openedContent = faqContent[faqOpenedIndex]

    const timeline = gsap.timeline()
    timeline.timeScale(3)


    timeline.to(openedContent, {
      height: 0
    })
    timeline.to(openedHeader, {
      color: "var(--greyscale--fg--subtlest)",
      textDecoration: "none"
    }, "<")
    const [_, openedFAQSymbol] = gsap.utils.toArray(openedHeader.children)
    timeline.to(openedFAQSymbol, { rotation: 90 }, "<")

    openedIdx = undefined
  }
  $("#all-filter").detach().prependTo(".faq-filter-collection-list")

  function openAccordion(header, idx) {
    const timeline = gsap.timeline()
    const [_, symbol] = gsap.utils.toArray(header.children)
    timeline.timeScale(3)
    if (faqOpenedIndex !== undefined) {
      timeline.to(faqContent[faqOpenedIndex], {
        height: 0
      })
      timeline.to(faqHeaders[faqOpenedIndex], {
        color: "var(--greyscale--fg--subtlest)",
        textDecoration: "none"
      }, "<")

      const [_, openedFAQSymbol] = gsap.utils.toArray(faqHeaders[faqOpenedIndex].children)
      timeline.to(openedFAQSymbol, { rotation: 0 }, "<")

    }
    timeline.to(faqContent[idx], {
      height: "auto"
    }, "<")

    timeline.to(header, {
      color: "var(--brand--fg--neutral)",
      textDecoration: "underline"
    }, "<")

    timeline.to(symbol, { rotation: 270 }, "<")

  }

  faqFilterChips.map(chip => {
    chip.onclick = () => closeAccordion(faqHeaders[faqOpenedIndex], faqContent[faqOpenedIndex])
  })

  faqHeaders.map((header, idx) => {
    header.onclick = () => {
      if (faqOpenedIndex !== idx) {
        openAccordion(header, idx)
        faqOpenedIndex = idx
      } else {
        closeAccordion(faqHeaders[faqOpenedIndex], faqContent[faqOpenedIndex])
      }
    }
  })
}


$(document).ready(() => {
  faq()

  setTimeout(() => {
    const pageButtons = gsap.utils.toArray(".faq-page-button")
    const faqFilters = gsap.utils.toArray(".faq-filter-chip-container")
    const items = [...pageButtons, ...faqFilters]

    items.map(pageButton => {
      pageButton.onclick = () => {
        if (faqOpenedIndex !== undefined) {
          const faqHeaders = gsap.utils.toArray(".faq-header-div")
          const faqContent = gsap.utils.toArray(".faq-item-content")
          console.log(faqOpenedIndex)
          closeAccordion(faqHeaders[faqOpenedIndex], faqContent[faqOpenedIndex])
        }
        setTimeout(faq, 500)
      }
    })
  }, 500)
})
