import React from 'react';

const DashNav = ({ children }) => {
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                {children}
            </ul>
        </nav>
    )
}

export default DashNav;

const styles = {
    nav: {
        padding: '1rem 1.5rem',
        fontSize: '0.87rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
    },
    ul: {
        display: 'flex',
        marginLeft: '0.75rem',
    }
}