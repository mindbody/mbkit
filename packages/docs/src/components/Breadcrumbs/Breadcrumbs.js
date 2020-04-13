import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

export default function Breadcrumbs(props) {
    const { isFullPage } = props;
    if (isFullPage) {
        return null;
    }
    return (
        <Location>
            {({ location }) => {
                let links = [];
                // TODO: refactor component to include page {title}
                const lowerCaseWords = ['and', 'to', 'for', 'with', 'about'];
                const crumbs = location.pathname.split('/');

                // If last character is an empty string, remove it
                if (crumbs[crumbs.length - 1] === '') {
                    crumbs.pop();
                }

                // iterate over each crumb, format casing, and add appropriate item
                crumbs.forEach((crumb, index) => {
                    const formattedCrumb = crumb
                        .replace(/-/g, ' ')
                        .split(' ')
                        .map(c => {
                            if (!lowerCaseWords.includes(c)) {
                                return c.charAt(0).toUpperCase() + c.slice(1);
                            } else {
                                return c;
                            }
                        })
                        .join(' ');

                    // If is first and only crumb, just send text
                    if (index === 0 && crumbs.length === 1) {
                        links.push(<React.Fragment key="home">Home</React.Fragment>);
                    }

                    // If not first character, add a spacing slash
                    if (index !== 0) {
                        links.push(<React.Fragment key={`spacer-${index}`}> / </React.Fragment>);
                    }

                    // If is last crumb, only display it as text
                    if (index === crumbs.length - 1) {
                        links.push(<React.Fragment key={formattedCrumb}>{formattedCrumb}</React.Fragment>);

                        // else is first index, display home as link
                    } else if (index === 0) {
                        links.push(
                            <Link key={'home'} to="/">
                                Home
                            </Link>,
                        );

                        // otherwise display it as a link
                    } else {
                        const path = crumbs
                            .map((c, i) => {
                                if (i <= index) {
                                    return `${c}/`;
                                }
                                return '';
                            })
                            .join('');

                        links.push(
                            <Link key={crumb} to={path.substring(0, path.length - 1)}>
                                {formattedCrumb}
                            </Link>,
                        );
                    }
                });

                // finally render links
                return links;
            }}
        </Location>
    );
}
