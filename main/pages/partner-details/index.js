
function PartnerDetails() {
  const copyLinks = gsap.utils.toArray('.copy-link')
  const reportBtn = document.querySelector('.report-button')

  copyLinks.map(link => {
    link.addEventListener('click', () => {
      const url = link.getAttribute('external-url')
      navigator.clipboard.writeText(url).then(() => {
        console.log('copied:', url)
      }, (err) => {
        console.log(err)
      })
    })
  })

  if (reportBtn) {
    const recipient = reportBtn.getAttribute('email-target')
    const partnerName = reportBtn.getAttribute('email-subject')
    const url = `mailto:${recipient}?subject=Report ${partnerName}`
    reportBtn.href = url
  }


  console.log('partner-details', copyLinks)
}


$(window).on("load", PartnerDetails)
