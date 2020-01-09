import React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from '../Calendar';

describe('Calendar', () => {
    it('should render on the page with the correct month and year when activeStartDate is passed', () => {
        const { getByText } = render(<Calendar activeStartDate={new Date(2019, 0, 26)} />);
        expect(getByText('January 2019')).toBeTruthy();
    });
});
