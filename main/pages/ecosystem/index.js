window.ecosystemListVisible = false;
window.searching = false;
window.ecosystemLoaded = false;
window.selectedPartnerCategory = null;

function ecosystemGetFormFactor() {
  let response = 'desktop'

  const windowWidth = document.body.clientWidth;
  if (windowWidth <= 479) {
    return 'mobile'
  } else if (windowWidth <= 767) {
    return 'landscape'
  } else if (windowWidth <= 991) {
    return 'tablet'
  }

  return response
}

function formatEcosystemFilterCircles(formFactor) {
  let circleRadius = 175;
  let centralCircleRadius = 195;
  let leftBiasMultiplier = 0.9
  let rightBiasMultiplier = -0.9

  if (formFactor === 'tablet') {
    circleRadius = 85;
    centralCircleRadius = 120;
    leftBiasMultiplier = 0.7
    rightBiasMultiplier = -0.8
  } else if (formFactor === 'landscape') {
    circleRadius = 120;
    centralCircleRadius = 120;
    leftBiasMultiplier = 0.7
    rightBiasMultiplier = -0.8
  } else if (formFactor === 'mobile') {
    circleRadius = 120;
    centralCircleRadius = 120;
    leftBiasMultiplier = 0.7
    rightBiasMultiplier = 0.7
  }


  const items = gsap.utils.toArray(".ecosystem-partners-filter-list-item")
  const groupSize = Math.floor(items.length / 3)
  const peripheralCircleSize = groupSize
  const centralCircleSize = items.length - (groupSize * 2)

  const firstGroupDiv = document.getElementById('first-ecosystem-circle')
  const secondGroupDiv = document.getElementById('second-ecosystem-circle')
  const thirdGroupDiv = document.getElementById('third-ecosystem-circle')

  const firstGroup = createGroup(items, peripheralCircleSize)
  const secondGroup = createGroup(items, centralCircleSize)
  const thirdGroup = createGroup(items, peripheralCircleSize)

  function createGroup(elements, numberOfIterations) {
    const response = []
    for (let i = 0; i < numberOfIterations; i++) {
      response.push(elements.shift())
    }
    return response
  }


  firstGroup.forEach(function(item, index) {
    firstGroupDiv.appendChild(item)
    moveCircle(item, index, 1, firstGroup.length, circleRadius, 'left');
  });
  secondGroup.forEach(function(item, index) {
    secondGroupDiv.appendChild(item)
    moveCircle(item, index, 1, secondGroup.length, centralCircleRadius);
  });
  thirdGroup.forEach(function(item, index) {
    thirdGroupDiv.appendChild(item)
    moveCircle(item, index, 1, thirdGroup.length, circleRadius, 'right');
  });

  function moveCircle(link, index, scale, contentLength, radius, bias) {
    let multiplier = 1
    if (bias) {
      if (bias === 'left')
        multiplier = leftBiasMultiplier
      else
        multiplier = rightBiasMultiplier
    }
    link.style.position = 'absolute'
    const offsetWidth = link.offsetWidth / 2;
    const offsetHeight = link.offsetHeight / 2;
    const radians = 2 * Math.PI * ((index / contentLength) * multiplier);
    x = -(Math.sin(radians) * radius * scale);
    y = -(Math.cos(radians) * radius * scale);
    link.style.top = (x + radius - offsetHeight) + 'px'
    link.style.left = (y + radius - offsetWidth) + 'px'

    if (window.ecosystemLoaded === false) {
      gsap.from(link, {
        opacity: 0,
        scale: 0.4,
        ease: Power1.easeInOut,
        duration: 0.3
      })
    }
  }
  window.ecosystemLoaded = true
}

function attachEventsAnimation() {
  const cardsSection = document.getElementById('ecosystem-cards-section')
  const filters = gsap.utils.toArray('.ecosystem-partners-filter-list-item ');
  const filterDiv = cardsSection.querySelector('.ecosystem-partner-header-content-div')
  const list = cardsSection.querySelector('.ecosystem-partner-content-div')
  const listHeading = cardsSection.querySelector('.ecosystem-partners-list-block-heading')
  const searchBar = cardsSection.querySelector('.search')
  const [_, heading, searchContent] = gsap.utils.toArray(listHeading.children)

  searchBar.addEventListener('keyup', (e) => {
    const textboxVal = e.target.value
    if (!window.ecosystemListVisible) {
      showList()
      setEcosystemDefaultSort()
    }

    if (textboxVal.length > 0) {
      searchContent.innerText = `"${textboxVal}"`
    } else {
      searchContent.innerText = ''
      if (heading.innerText.length === 0) {
        hideList()
      }
    }
  })


  const timeline = gsap.timeline({ paused: true })
    .to(filterDiv, {
      opacity: 0,
      ease: Power1.easeInOut,
      duration: 0.3,
    })
    .to(filterDiv, { zIndex: -1, ease: Power1.easeInOut, duration: 0.3 }, "<")
    .from(listHeading, {
      opacity: 0,
      ease: Power1.easeInOut,
      duration: 0.3,
    },)
    .from(list, {
      opacity: 0,
      duration: 0.3,
      ease: Power1.easeInOut,
    }, "<")
    .to(filterDiv, {
      duration: 0.3,
      ease: Power1.easeInOut,
      height: 0,
      padding: 0,
    })
    .to(list, {
      duration: 0.3,
      ease: Power1.easeInOut,
      height: 'auto'
    }, '<')

  filters.map(filter => {
    filter.addEventListener('click', () => {
      showList(filter.innerText)
      listHeading.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  })

  listHeading.addEventListener('click', () => {
    setTimeout(hideList, 10)
  })

  function hideList() {
    const ecosystemCardsSection = document.getElementById('ecosystem-cards-section')
    const mobilePageIndicator = ecosystemCardsSection.querySelector(".list-pagination-page-button.mobile");
    mobilePageIndicator.innerText = '1'

    timeline.reverse()
    window.ecosystemListVisible = false;
    window.selectedPartnerCategory = ''
    heading.innerText = ''
    searchContent.innerText = ''
    searchBar.value = ''
    updateEcosystemExportUrl()
  }

  function showList(filterVal) {
    if (window.ecosystemListVisible) {
      return
    }
    if (filterVal) {
      heading.innerText = filterVal
    }

    timeline.play()
    window.ecosystemListVisible = true;
    window.selectedPartnerCategory = filterVal
    updateEcosystemExportUrl()
  }
}

function setEcosystemDefaultSort() {
  const button = document.getElementById('default-sort')
  button.click()
}

function updateEcosystemExportUrl() {
  const selectedCategery = window.selectedPartnerCategory
  const exportButton = document.getElementById('ecosystem-export-button')
  const redirectURL = exportButton.getAttribute('href')
  let newUrl = ''
  if (!selectedCategery) {
    newUrl = redirectURL.split('?')[0]
  } else {
    newUrl = redirectURL + `?category=${selectedCategery}`
  }
  return exportButton.setAttribute('href', newUrl)
}

function ecosystemPageIncrementEvents() {
  const ecosystemCardsSection = document.getElementById('ecosystem-cards-section')
  const listHeading = ecosystemCardsSection.querySelector('.ecosystem-partners-list-block-heading')
  const mobilePageIndicator = ecosystemCardsSection.querySelector(".list-pagination-page-button.mobile");
  const paginationNavBtns = gsap.utils.toArray(".list-pagination-nav-button");

  paginationNavBtns.map((paginationBtn) => {
    const onClick = () => {
      const buttonType = paginationBtn.classList[0];
      if (buttonType === "w-pagination-previous") {
        mobilePageIndicator.innerText =
          parseInt(mobilePageIndicator.innerText) - 1;
      } else {
        mobilePageIndicator.innerText =
          parseInt(mobilePageIndicator.innerText) + 1;
      }
      if (ecosystemGetFormFactor() !== 'desktop') {
        listHeading.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    };
    paginationBtn.addEventListener('click', onClick)
  });

}


function Ecosystem() {
  const formFactor = ecosystemGetFormFactor()
  attachEventsAnimation()
  setTimeout(() => formatEcosystemFilterCircles(formFactor), 100)
  setEcosystemDefaultSort()
  ecosystemPageIncrementEvents()
}

$(window).on('resize', Ecosystem)
$(window).on("load", Ecosystem)
