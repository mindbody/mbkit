import React from "react"
import styles from "./Nav.module.scss"
import { Link } from "gatsby"
const classnames = require("classnames")

// a menu should be `ul > li`, nested if needed
export const menu = [
  {
    title: "Dashboard",
    to: null,
    newTab: false,
    menu: [
      {
        title: "Business Overview",
        to: "/business-overview",
        menu: [
          {
            title: "Another",
            to: "/business-overview",
            menu: [],
          },
          {
            title: "Test",
            to: "/business-test",
            menu: [],
          },
        ],
      },
      {
        title: "Classes",
        to: "/classes",
        menu: [
          {
            title: "Yoga",
            to: "yoga",
            menu: [],
          },
          {
            title: "Spin",
            to: "spin",
            menu: [],
          },
        ],
      },
    ],
  },
  {
    title: "Account",
    to: "/account",
    newTab: false,
    menu: [
      {
        title: "Sign In",
        to: "sign-in",
        newTab: false,
        menu: [],
      },
      {
        title: "Sign Up",
        to: "sign-up",
        newTab: false,
        menu: [],
      },
    ],
  },
]

const noop = () => {}
export default function Nav(props) {
  const { menu = [], className, onClick = noop, ...rest } = props
  const [visibleChildren, setVisibleChildren] = React.useState(
    menu.map(item => ({ isVisible: true, title: item.title }))
  )

  function handleVisibleChange(item) {
    const updatedVisiblity = visibleChildren.map(c => {
      if (c.title === item.title) {
        return {
          ...c,
          isVisible: !c.isVisible,
        }
      }
      return c
    })
    setVisibleChildren(updatedVisiblity)
  }
  // TODO
  // auto detect mobile and show floating hamburger
  // linkAs which allows change of anchor link
  if (menu.length === 0) {
    return null
  }

  const navClassName = classnames({
    [styles.menu]: true,
    [className]: className,
  })
  return (
    <nav className={navClassName} {...rest}>
      <ul>
        {menu.map(item => {
          const hasChildren = item.menu && item.menu.length > 0
          const { isVisible } = visibleChildren.find(
            c => c.title === item.title
          )
          const buttonClassnames = classnames({
            [styles.menu__item__toggleChildren]: true,
            [styles.menu__item__toggleChildrenOpened]: isVisible,
          })
          return (
            <li key={item.title}>
              <div className={styles.menu__item}>
                {(item.to && (
                  <Link onClick={onClick} to={item.to}>
                    {item.title}
                  </Link>
                )) ||
                  item.title}{" "}
                {hasChildren && (
                  <button
                    onClick={() => handleVisibleChange(item)}
                    className={buttonClassnames}
                  />
                )}
              </div>
              {isVisible && hasChildren && (
                <Nav menu={item.menu} onClick={onClick} />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
