import React from 'react';

export type ISomeComponent = {
    /** Adds alert when clicked */
    doSomethingOnClick?: boolean;
};

/* eslint-disable */

const SomeComponent: React.FC<ISomeComponent> = (props: ISomeComponent) => {
    const { doSomethingOnClick } = props;

    function handleClick() {
        alert('Clicked');
    }
    if (doSomethingOnClick) {
        return (
            <h1 onKeyPress={handleClick} role="button" onClick={handleClick}>
                Click Me
            </h1>
        );
    }
    return <h1>Not Clickable</h1>;
};

export default SomeComponent;
