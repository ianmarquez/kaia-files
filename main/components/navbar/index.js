
const navBar = () => {
  const isTablet = document.body.clientWidth <= 991;
  const menuItems = gsap.utils.toArray('.nav-block')
  const drawerItems = gsap.utils.toArray('.navbar-drawer-content-div')
  const heightMap = {
    0: "18rem",
    1: "24rem",
    2: "12rem",
    3: "14rem",
    4: "18rem"
  }

  let openedIdx;

  menuItems.pop()

  if (isTablet) return

  $(window).click(function() {
    if (openedIdx === undefined) return
    closeAnimation(menuItems[openedIdx], openedIdx)
  });

  $('.navbar-drawer').click(function(event) {
    event.stopPropagation();
  });

  $('.nav-block').click(function(event) {
    event.stopPropagation();
  });

  const closeAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline()
    timeline.to('.navbar-drawer', { height: "0" })
    timeline.to(menuItem, {
      color: "var(--greyscale--fg--subtlest)",
    }, "<")

    timeline.to(drawerItems[idx], {
      height: 0
    }, "<")
  }

  const openAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline()
    timeline.to('.navbar-drawer', { height: "0" })
    timeline.to(menuItem, {
      color: "var(--brand--fg--neutral)"
    }, "<")
    menuItems.map((otherMenuItem, omIdx) => {
      if (omIdx !== idx) {
        timeline.to(otherMenuItem, {
          color: "var(--greyscale--fg--subtlest)",
        }, "<")
      }
    })

    drawerItems.map((drawerItem, drawerIdx) => {
      if (drawerIdx !== idx) {
        timeline.to(drawerItem, {
          height: 0,
        }, "<")
      }
    })
    timeline.to('.navbar-drawer', { height: heightMap[idx] })
    timeline.to(drawerItems[idx], {
      height: 'auto'
    }, "<")
  }

  menuItems.map((menuItem, idx) => {
    menuItem.onclick = () => {
      if (openedIdx !== idx) {
        openAnimation(menuItem, idx)
        openedIdx = idx
      } else {
        closeAnimation(menuItem, idx)
        openedIdx = undefined
      }
    }
  })
}

$(document).ready(navBar)

