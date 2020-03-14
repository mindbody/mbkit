import React from 'react';
import { Text } from '@mbkit/typography';

export const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Text size={6} color="meta">
                Copyright &copy; {new Date().getFullYear()} Mindbody, Inc.
            </Text>
        </footer>
    );
};
