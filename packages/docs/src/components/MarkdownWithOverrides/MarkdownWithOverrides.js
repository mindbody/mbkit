import React from 'react';
import Markdown from 'markdown-to-jsx';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import theme from 'prism-react-renderer/themes/vsDark';
import styles from './MarkdownWithOverrides.module.scss';

const CodeEditorPreview = props => {
    function handleKeyPress(e) {
        // when pressed escape the user to the next available or previous focusable element
        const shiftKeyPressed = e.shiftKey;
        const escapeKeyPressed = e.key === 'Escape';

        if (escapeKeyPressed) {
            const focusable = document.querySelectorAll(
                'button, [href]:not(link), input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            const focusableArray = Array.from(focusable);
            const currentIndex = focusableArray.findIndex(el => el === document.activeElement);

            // If shift is pressed while escaping, send them back one element
            if (shiftKeyPressed) {
                let previousElement = focusableArray[currentIndex - 1];
                if (!previousElement) {
                    previousElement = focusableArray[focusableArray.length - 1];
                }
                previousElement.focus();
                return;
            }

            // otherwise continue forward
            let nextElement = focusableArray[currentIndex + 1];
            if (!nextElement) {
                nextElement = focusableArray[0];
            }
            nextElement.focus();
        }
    }
    return (
        <div className={styles.codeEditorWrapper}>
            <LiveProvider code={props.children} scope={props.scope} theme={theme}>
                <div className={styles.codeEditor}>
                    <LiveEditor onKeyDown={handleKeyPress} />
                </div>
                <div className={styles.codePreview}>
                    <LiveError />
                    <LivePreview />
                </div>
            </LiveProvider>
        </div>
    );
};

const MarkdownWithOverrides = ({ children, overrides }) => (
    <Markdown
        options={{
            overrides: {
                RenderOnly: props => props.children,
                EditorOnly: props => {
                    return (
                        <LiveProvider
                            code={props.children[0]}
                            theme={theme}
                            disabled={true}
                            noInline={true}
                            language={props.language || 'tsx'}
                        >
                            <LiveEditor />
                        </LiveProvider>
                    );
                },
                code: props => <CodeEditorPreview {...props} scope={overrides} children={props.children} />,
                pre: props => <div {...props} />,
                // CodePreview: props => <CodeEditorPreview {...props} scope={overrides} children={props.children} />,
                ...overrides,
            },
        }}
    >
        {children}
    </Markdown>
);

export default MarkdownWithOverrides;
