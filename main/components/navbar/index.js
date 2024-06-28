const tablet = () => {
  let openedIdx;
  const menuItems = gsap.utils.toArray('.nav-block')
  menuItems.pop()
  const drawerItems = gsap.utils.toArray('.navbar-drawer-content-div.tablet')

  $(window).click(function() {
    if (openedIdx === undefined) return
    closeAnimation(menuItems[openedIdx], openedIdx)
  });

  $('.navbar-drawer-content-div.tablet').click(function(event) {
    event.stopPropagation();
  });

  $('.nav-block').click(function(event) {
    event.stopPropagation();
  });


  const closeAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline()
    timeline.timeScale(5)
    const [_, symbol] = gsap.utils.toArray(menuItem.children)

    timeline.to(menuItem, {
      color: "var(--greyscale--fg--subtlest)",
    }, "<")

    timeline.to(symbol, { rotation: 0 }, "<")

    timeline.to(drawerItems[idx], {
      height: 0
    }, "<")
  }


  const openAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline()
    timeline.timeScale(5)
    const [_, symbol] = gsap.utils.toArray(menuItem.children)

    timeline.to(menuItem, {
      color: "var(--brand--fg--neutral)"
    }, "<")
    timeline.to(symbol, {
      rotation: 45
    }, "<")
    drawerItems.map((drawerItems, drawerIdx) => {
      if (drawerIdx !== idx) {
        timeline.to(drawerItems, { height: 0 }, "<")
      }
    })
    menuItems.map((otherMenuItem, omIdx) => {
      if (omIdx !== idx) {
        timeline.to(otherMenuItem, {
          color: "var(--greyscale--fg--subtlest)",
        }, "<")
        const [_, otherMenuItemSym] = gsap.utils.toArray(otherMenuItem.children)
        timeline.to(otherMenuItemSym, { rotation: 0 }, "<")
      }
    })
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

const desktop = () => {
  const menuItems = gsap.utils.toArray('.nav-block')
  const drawerItems = gsap.utils.toArray('.navbar-drawer-content-div.desktop')
  const heightMap = {
    0: "18rem",
    1: "24rem",
    2: "12rem",
    3: "14rem",
    4: "18rem"
  }

  let openedIdx;

  menuItems.pop()

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
    timeline.timeScale(5)
    const [_, symbol] = gsap.utils.toArray(menuItem.children)
    timeline.to(menuItem, {
      color: "var(--brand--fg--neutral)"
    }, "<")
    timeline.to('.navbar-drawer', { height: "0" })
    timeline.to(menuItem, {
      color: "var(--greyscale--fg--subtlest)",
    }, "<")
    timeline.to(symbol, { rotation: 0 }, "<")
    timeline.to(drawerItems[idx], {
      height: 0
    }, "<")
  }

  const openAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline()
    timeline.timeScale(5)
    const [_, symbol] = gsap.utils.toArray(menuItem.children)
    timeline.to(menuItem, {
      color: "var(--brand--fg--neutral)"
    }, "<")
    timeline.to(symbol, { rotation: 45 }, "<")
    menuItems.map((otherMenuItem, omIdx) => {
      if (omIdx !== idx) {
        timeline.to(otherMenuItem, {
          color: "var(--greyscale--fg--subtlest)",
        }, "<")
        const [_, otherMenuItemSym] = gsap.utils.toArray(otherMenuItem.children)
        timeline.to(otherMenuItemSym, { rotation: 0 }, "<")
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


const navBar = () => {
  const isTablet = document.body.clientWidth <= 991;
  console.log('test')
  if (isTablet) return tablet()

  return desktop()
}

$(document).ready(navBar)
$(window).on('resize', navBar);

