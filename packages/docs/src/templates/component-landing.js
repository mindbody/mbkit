import React from "react"
import { navigate } from "gatsby"

// TODO Add landing page? For now redirect to first component
export default props => {
  const firstComponent = props.pageContext.components[0].node
  if (typeof window !== "undefined") {
    navigate(`/components/${firstComponent.slug}`)
  }
  return <></>
}
