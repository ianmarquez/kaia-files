let openedPillIndex = 0;
let isMobilePillTabs = document.body.clientWidth <= 767;

function hidePillContent(pill) {
  const [header, content] = gsap.utils.toArray(pill.children)
  const iconContainer = header.children[1]
  const verticalBar = iconContainer.children[1]
  const bounds = header.getBoundingClientRect()

  const hideTimeline = gsap.timeline()
  hideTimeline.timeScale(2)

  hideTimeline
    .to(content,
      { ...(isMobilePillTabs ? { height: 0 } : { width: 0 }) },
    )
    .to(pill, {
      ...(isMobilePillTabs ? { height: 80 } : { width: bounds.width }),
      flex: 'none'
    }, '<')
    .to(verticalBar, { rotation: 90 }, '<')
}

function showPillContent(pill) {
  const [header, content] = gsap.utils.toArray(pill.children)
  const iconContainer = header.children[1]
  const verticalBar = iconContainer.children[1]
  const showTimeline = gsap.timeline({
    onStart: function() {
      gsap.set(pill, { clearProps: "flex" });
    }
  });
  showTimeline.timeScale(2)

  showTimeline
    .to(content, {
      ...(isMobilePillTabs ? { height: 'auto' } : { width: 'auto' })
    })
    .from(content, { opacity: 0 }, "<")
    .to(pill,
      {
        ...(isMobilePillTabs ? { height: 'auto' } : { width: 'auto' })
      }, "<")
    .to(verticalBar, { rotation: 0 }, "<")
}

function resetPillTabsState() {
  openedPillIndex = 0
  const pills = gsap.utils.toArray('.pill')
  pills.map(pill => {
    const [header, content] = gsap.utils.toArray(pill.children)
    const iconContainer = header.children[1]
    const verticalBar = iconContainer.children[1]

    gsap.set(pill, { clearProps: "all" });
    gsap.set(content, { clearProps: 'all' })
    gsap.set(iconContainer, { clearProps: 'all' })
    gsap.set(verticalBar, { clearProps: 'all' })
    gsap.set(header, { clearProps: 'all' })
  })

}

function PillTabs() {
  isMobilePillTabs = document.body.clientWidth <= 767;
  const pills = gsap.utils.toArray('.pill')
  const [_, two, three] = pills

  hidePillContent(two)
  hidePillContent(three)

  pills.map((pill, idx) => {
    pill.onclick = () => {
      if (idx !== openedPillIndex) {
        showPillContent(pill)
        hidePillContent(pills[openedPillIndex])
        openedPillIndex = idx;
      }
    }
  })

};

$(window).on("resize", () => {
  resetPillTabsState()
  PillTabs()
});
$(document).ready(PillTabs);
