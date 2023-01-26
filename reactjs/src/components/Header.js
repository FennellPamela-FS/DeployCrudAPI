import React from 'react';
import Nav from './Nav';

// React Router
// import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header style={styles.myHeader}>
            <h2 style={styles.hText}><em>Onthe</em>Scene</h2>
            <div>
                <Nav />
            </div>
            {/* <div style={styles.rightSide}>
                <Link to="/dashboard" style={styles.rightIcons} />
                <Link to="/series" style={styles.rightIcons} />
            </div> */}
        </header>
    )
}

export default Header;


const styles = {
    myHeader: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0.25rem 1.25rem',
        justifyContent: 'space-between',
        justifyItems: 'center',
        textAlign: 'center',
        backgroundColor: '#414c6b',
        color: '#5baeb7',
        alignItems: 'center',
        boxShadow: '1px 6px 1px 1px rgba(0, 0, 255, .1)',
        border: '0px 0px 1px 0px solid',
        borderBottom: '8px solid #a5def2',
    },
    hText: {
        fontSize: '2rem',
        // fontWeight: 'bold',
    }
}

