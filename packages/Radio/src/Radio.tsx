import React from 'react';

export type IProps = {
    /** Doesn't really do anything */
    isTest?: boolean;
    /** Add your favorite number (Also does nothing) */
    another: number;
};

const Radio = (props: IProps) => {
    const { isTest, ...rest } = props;
    return <input type="radio" {...rest} />;
};

export default Radio;
