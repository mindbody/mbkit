import React from "react"
import Markdown from "markdown-to-jsx"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import theme from "prism-react-renderer/themes/vsDark"

const CodeEditorPreview = props => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
      <LiveProvider code={props.children} scope={props.scope} theme={theme}>
        <div>
          <LiveEditor />
        </div>
        <div>
          <LiveError />
          <LivePreview />
        </div>
      </LiveProvider>
    </div>
  )
}

const MarkdownWithOverrides = ({ children, overrides }) => (
  <Markdown
    options={{
      overrides: {
        code: props => (
          <CodeEditorPreview scope={overrides} children={props.children} />
        ),
        pre: props => <div {...props} />,
        ...overrides,
      },
    }}
  >
    {children}
  </Markdown>
)

export default MarkdownWithOverrides
