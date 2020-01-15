import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

export default function Breadcrumbs() {
    return (
        <div style={{ textTransform: 'capitalize' }}>
            <Location>
                {({ location }) => {
                    let links = [];

                    const crumbs = location.pathname.split('/');

                    // If last character is an empty string, remove it
                    if (crumbs[crumbs.length - 1] === '') {
                        crumbs.pop();
                    }

                    if (crumbs.length === 1) {
                        return null;
                    }

                    // iterate over each crumb and add appropriate item
                    crumbs.forEach((crumb, index) => {
                        const crumbWithSpace = crumb.replace('-', ' ');

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
                            links.push(<React.Fragment key={crumbWithSpace}>{crumbWithSpace}</React.Fragment>);

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
                                    {crumbWithSpace}
                                </Link>,
                            );
                        }
                    });

                    // finally render links
                    return links;
                }}
            </Location>
        </div>
    );
}
