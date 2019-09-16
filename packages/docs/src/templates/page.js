import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const PageTemplate = props => {
  const { title, id, content } = props.pageContext.page
  return (
    <>
      <h1>{title}</h1>
      {documentToReactComponents(content.json)}
    </>
  )
}

export default PageTemplate
