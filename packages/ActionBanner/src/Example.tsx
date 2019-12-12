import React, { useState } from 'react';
import { ActionBanner } from './ActionBanner';

export const ActionBannerExample = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} Banner</button>
            <ActionBanner show={show} variant="error" onClose={() => setShow(false)}>
                <svg style={{ marginRight: 4 }} viewBox="0 0 21 21" width="16px" height="16px">
                    <g fill="none" fillRule="evenodd" stroke="#992D38">
                        <path d="M10.493.594L.54 20.327c-.084.17-.082.173.106.173h19.706c.18 0 .186-.01.105-.173L10.505.594c-.067-.134.056-.135-.012 0z"></path>
                        <path d="M10.5 14.5v-6M10.5 17.5v-1" strokeLinecap="round"></path>
                    </g>
                </svg>
                This is an error banner
            </ActionBanner>
            <p>Content Below the banner should get pushed down</p>
        </>
    );
};
