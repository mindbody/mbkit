import React from "react"
import styles from "./index.module.scss"
import Nav from "../components/Nav/Nav"
import componentNav from "../../generated/componentNav.json"
const classnames = require("classnames")

const sitemap = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Components",
    menu: componentNav,
  },
]

const Layout = props => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const layoutStyles = classnames({
    [styles.container]: true,
    [styles.open]: mobileNavOpen,
  })
  const navStyles = classnames({
    [styles.nav]: true,
  })

  function handleLinkClick() {
    if (mobileNavOpen) {
      setMobileNavOpen(false)
    }
  }
  return (
    <div className={layoutStyles}>
      <div className={styles.navContainer}>
        <nav className={navStyles}>
          <Nav menu={sitemap} onClick={handleLinkClick} />
        </nav>
        <button
          className={styles.mobileNavButton}
          onClick={e => setMobileNavOpen(!mobileNavOpen)}
        />
      </div>
      <main className={styles.main}>{props.children}</main>
    </div>
  )
}

export default Layout
