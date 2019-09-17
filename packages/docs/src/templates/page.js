import React from "react"
import { Link } from "gatsby"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const PageTemplate = props => {
  const { title, id, content } = props.pageContext.page
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        const text = node.content[0].value
        const linkTo = node.data.uri
        if (linkTo.includes("http")) {
          return (
            <a href={linkTo} target="_blank" rel="nofollow">
              {text}
            </a>
          )
        }

        return <Link to={linkTo}>{text}</Link>
      },
    },
  }
  return (
    <>
      <h1>{title}</h1>
      {documentToReactComponents(content.json, options)}
    </>
  )
}

export default PageTemplate
