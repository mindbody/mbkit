import React from 'react';
import { Text } from '@mbkit/typography';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Text size={6} color="meta">
                Copyright &copy; {new Date().getFullYear()} Mindbody, Inc.
            </Text>
        </footer>
    );
};
