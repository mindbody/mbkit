import React, { useState, useEffect } from 'react';
import { Toaster } from './Toaster';

type ExampleProps = {
    message: string;
};
export const ToasterExample = (props: ExampleProps) => {
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
                Show example toaster
            </button>
            <Toaster show={show}>{message}</Toaster>
        </>
    );
};
