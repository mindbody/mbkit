import React from 'react';

export type TTestButtonProps = {
    /** Changes the outputted text value */
    test?: boolean;
};
const TestButton: React.FC<TTestButtonProps> = (props: TTestButtonProps) => {
    return <button>{props.test ? `Just a test` : `Not a test`}</button>;
};

export default TestButton;
