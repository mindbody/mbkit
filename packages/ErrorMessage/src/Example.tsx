import React, { ChangeEvent } from 'react';
import { ErrorMessage } from './ErrorMessage';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ErrorMessageExample = () => {
    const [email, setEmail] = React.useState('');
    const [emailIsInvalid, setEmailIsInvalid] = React.useState(false);
    function handleValidate(emailDraft?: string) {
        const isValid = RegExp(emailRegex).test(emailDraft || email);
        setEmailIsInvalid(!isValid);
    }

    function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        const nextEmail = e.target.value;
        setEmail(nextEmail);
        if (emailIsInvalid) {
            handleValidate(nextEmail);
        }
    }
    return (
        <>
            <label htmlFor="email" id="email-label">
                Email
            </label>
            <input
                type="email"
                id="email"
                aria-labelledby="email-label"
                onChange={handleChangeEmail}
                value={email}
                onBlur={() => handleValidate(email)}
            />
            <ErrorMessage show={emailIsInvalid}>Please enter a valid email address</ErrorMessage>
        </>
    );
};
