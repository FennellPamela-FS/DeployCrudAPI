import React from 'react'

const MyListItems = ({ show }) => {
    return (
        <ul style={styles.ulDiv}>
            <article style={styles.article}>
                <img src={show.image} alt="" width="60" height="88" style={styles.image} />
                <div style={styles.container}>
                    <h2 style={styles.title}>{show.title}</h2>
                    <ul style={styles.dl}>
                        <li style={styles.desc}>
                            {/* <dt className="sr-only">Description</dt> */}
                            <dd>{show.description}</dd>
                        </li>
                        <li>
                            {/* <dt className="sr-only">Watch</dt> */}
                            <dd style={styles.btn}>{show.videolink}</dd>
                        </li>
                        <div className="ml-2">
                            <dt className="sr-only">View Dashboard</dt>
                            <dd style={styles.link}>{show.year}</dd>
                        </div>
                    </ul>
                </div>
            </article>
        </ul>
    )
}

export default MyListItems;

const styles = {
    ulDiv: {
        borderTopWidth: '1px',
        borderTopColor: '#f2f2f2',
    },
    article: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: '1.5rem',
        padding: '1.5rem',
    },
    image: {
        flex: 'none',
        borderRadius: '0.375rem',
        backgroundColor: 'rgb(241 245 249)',
    },
    container: {
        minWidth: 0,
        position: 'relative',
        flex: '1 1 auto',
    },
    title: {
        fontWeight: '600px',
        color: 'rgb(15 23 42)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: '5rem',
    },
    dl: {
        marginTop: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
        fontWeight: '500px',
    },
    desc: {
        //  flex-none w-full mt-2 font-normal
        flex: 'none',
        width: '100%',
        marginTop: '0.5rem',
        fontWeight: '400px',
    },
    btn: {
        //  px-1.5 ring-1 ring-slate-200 rounded
        paddingLeft: '0.375rem',
        paddingRight: '0.375rem',
        borderRadius: '0.25rem',
        border: '1px solid #1e80c1',
    },
    link: {
        //  px-1.5 ring-1 ring-slate-200 rounded
        paddingLeft: '0.375rem',
        paddingRight: '0.375rem',
        borderRadius: '0.25rem',
        color: '#1e80c1',
    },



}