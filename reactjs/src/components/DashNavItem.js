import { BLOCKED_PAGES } from 'next/dist/shared/lib/constants'
import React from 'react'

const DashNavItem = ({ href, isActive, children }) => {
    return (
        <li>
            <a style={styles.a}
                href={href}
                className={`${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
            >
                {children}
            </a>
        </li>
    )
}

export default DashNavItem

const styles = {
    a: {
        display: 'block',
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
    },


}