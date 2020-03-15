import React from 'react';
import { Text } from '@mbkit/typography';

import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Text size={6} color="meta">
                Copyright &copy; {new Date().getFullYear()} Mindbody, Inc.
            </Text>
        </footer>
    );
}
