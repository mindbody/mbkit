import React, { useState, useEffect } from 'react';
import { Toaster } from './Toaster';

type ExampleTopProps = {
    message: string;
};
export const ToasterExampleTop = (props: ExampleTopProps) => {
    const { message } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timeout: any;
        if (show) {
            timeout = setTimeout(() => {
                setShow(false);
            }, 5000);
        }

        return () => {
            // When show is changed manually we need to clear the timeout so it
            // doesn't clear the toaster if it's opened again within the timeout period
            clearTimeout(timeout);
        };
    }, [show]);

    return (
        <>
            <button onClick={() => setShow(!show)} disabled={show}>
                Show example toaster on top
            </button>
            <Toaster show={show} location="top-center">{message}</Toaster>
        </>
    );
};
