import React from 'react';
import { render } from '@testing-library/react';
import { Link } from '../Link';

describe('Link element', () => {
    it('should render an anchor without crashing', () => {
        const { getByText } = render(<Link href="/test">Test</Link>);
        expect(getByText('Test')).toBeTruthy();
    });
});
