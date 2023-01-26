import React from 'react'
// React Router
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div style={styles.myNav}>
            <Link to="/" style={styles.a}>Home</Link>
            <Link to="/list" style={styles.a}>Series</Link>
            <Link to="/dashboard" style={styles.a}>Dashboard</Link>
        </div>
    )
}

export default Nav;

const styles = {

    myNav: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        listStyle: 'none',
        margin: 0,
    },

    /* Style the topnav links */
    a: {
        display: 'block',
        color: '#f2f2f2',
        textDecoration: 'none',
        padding: '1em',
        textTransform: 'uppercase',

    },


}