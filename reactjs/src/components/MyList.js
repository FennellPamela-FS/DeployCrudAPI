import React from 'react'

const MyList = ({ children }) => {
    return (
        <ul style={styles.ulDiv}>
            {children}
        </ul>
    )
}

export default MyList;

const styles = {
    ulDiv: {
        // divide-y divide-slate-100
        borderTopWidth: '1px',
        borderTopColor: '#f2f2f2',
    }
}