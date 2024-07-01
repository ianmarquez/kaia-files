let faqOpenedIndex;
let isFaqMobile = false;

function closeAccordion(header, content) {
  if (faqOpenedIndex === undefined || !header || !content) return;
  const openedHeader = header;
  const openedContent = content;

  const timeline = gsap.timeline();
  timeline.timeScale(3);

  timeline.to(openedContent, {
    height: 0,
  });
  timeline.to(
    openedHeader,
    {
      color: "var(--greyscale--fg--subtlest)",
      textDecoration: "none",
    },
    "<"
  );
  const [_, openedFAQSymbol] = gsap.utils.toArray(openedHeader.children);
  timeline.to(openedFAQSymbol, { rotation: 0 }, "<");

  faqOpenedIndex = undefined;
}

const FAQBodyAnimation = () => {
  const faqHeaders = gsap.utils.toArray(".faq-header-div");
  const faqContent = gsap.utils.toArray(".faq-item-content");
  const faqFilterChips = gsap.utils.toArray(".faq-filter-chip");

  $("#all-filter").detach().prependTo(".faq-filter-collection-list");

  function openAccordion(header, idx) {
    const timeline = gsap.timeline();
    const [_, symbol] = gsap.utils.toArray(header.children);
    timeline.timeScale(3);
    if (faqOpenedIndex !== undefined) {
      timeline.to(faqContent[faqOpenedIndex], {
        height: 0,
      });
      timeline.to(
        faqHeaders[faqOpenedIndex],
        {
          color: "var(--greyscale--fg--subtlest)",
          textDecoration: "none",
        },
        "<"
      );

      const [_, openedFAQSymbol] = gsap.utils.toArray(
        faqHeaders[faqOpenedIndex].children
      );
      timeline.to(openedFAQSymbol, { rotation: 0 }, "<");
    }
    timeline.to(
      faqContent[idx],
      {
        height: "auto",
      },
      "<"
    );

    timeline.to(
      header,
      {
        color: "var(--brand--fg--neutral)",
        // textDecoration: "underline"
      },
      "<"
    );

    timeline.to(symbol, { rotation: 45 }, "<");
  }

  faqFilterChips.map((chip) => {
    chip.onclick = () =>
      closeAccordion(faqHeaders[faqOpenedIndex], faqContent[faqOpenedIndex]);
  });

  faqHeaders.map((header, idx) => {
    header.onclick = () => {
      if (faqOpenedIndex !== idx) {
        openAccordion(header, idx);
        faqOpenedIndex = idx;
      } else {
        closeAccordion(faqHeaders[faqOpenedIndex], faqContent[faqOpenedIndex]);
      }
    };
  });
};

function AnimateDropdown() {
  let dropdownOpen = false;
  if (!isFaqMobile) return;
  const faqDropdown = document.getElementById("faq-dropdown-div");
  const faqFormBlock = document.querySelector(".faq-form-block");
  const faqFilters = gsap.utils.toArray(".faq-filter-chip-container");
  const [filterText, symbol] = gsap.utils.toArray(faqDropdown.children);
  const dropdownTimeline = gsap.timeline();
  dropdownTimeline.timeScale(3);

  faqFilters.map((filter) => {
    console.log(filter);
    filter.addEventListener("click", () => {
      closeDropdown();
      filterText.innerText = filter.innerText;
    });
  });

  faqDropdown.onclick = () => {
    if (dropdownOpen) return closeDropdown();
    return openDropdown();
  };
  function closeDropdown() {
    dropdownOpen = !dropdownOpen;
    dropdownTimeline
      .to(symbol, {
        rotation: 0,
      })
      .to(
        faqFormBlock,
        {
          height: 0,
        },
        "<"
      );
  }

  function openDropdown() {
    dropdownOpen = !dropdownOpen;
    dropdownTimeline
      .to(symbol, {
        rotation: 180,
      })
      .to(
        faqFormBlock,
        {
          height: "auto",
        },
        "<"
      );
  }
}

function AttachFAQEventsOnDOMLifecycle() {
  const mobilePageIndicator = document.getElementById("faq-page-indicator");
  isFaqMobile = document.body.clientWidth <= 767;

  FAQBodyAnimation();
  AnimateDropdown();

  setTimeout(() => {
    const pageButtons = gsap.utils.toArray(".faq-page-button");
    const faqFilters = gsap.utils.toArray(".faq-filter-chip-container");
    const paginationNavBtns = gsap.utils.toArray(".faq-pagination-nav-button");

    function onButtonClick() {
      if (faqOpenedIndex !== undefined) {
        const faqHeaders = gsap.utils.toArray(".faq-header-div");
        const faqContent = gsap.utils.toArray(".faq-item-content");
        closeAccordion(faqHeaders[faqOpenedIndex], faqContent[faqOpenedIndex]);
      }
      setTimeout(FAQBodyAnimation, 500);
    }

    pageButtons.map((pageButton) => {
      pageButton.onclick = onButtonClick;
    });

    faqFilters.map((filter) => {
      filter.addEventListener("click", () => {
        onButtonClick();
        mobilePageIndicator.innerText = 1;
      });
    });

    paginationNavBtns.map((paginationBtn) => {
      paginationBtn.onclick = () => {
        const buttonType = paginationBtn.classList[0];
        if (buttonType === "w-pagination-previous") {
          mobilePageIndicator.innerText =
            parseInt(mobilePageIndicator.innerText) - 1;
        } else {
          mobilePageIndicator.innerText =
            parseInt(mobilePageIndicator.innerText) + 1;
        }
        onButtonClick();
      };
    });
  }, 500);
}

$(window).on("resize", AttachFAQEventsOnDOMLifecycle);

$(document).ready(AttachFAQEventsOnDOMLifecycle);
