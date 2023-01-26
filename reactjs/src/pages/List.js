import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// import MyList from '../components/MyList';
// import MyListItems from '../components/MyListItems';

import '../App.css';


const List = () => {

    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [values, setValues] = useState({
        title: '',
        info: '',
        videolink: ''
    })


    // if node env is development then set localhost:8000 else use REACT_APP_BASE_URL
    const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let ignore = false;

        // reach out to API only once
        if (!ignore) {
            getSeries();
        }
        return () => {
            ignore = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // no dependencies

    const getSeries = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/series`)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    setSeries(data);
                    setValues({
                        ...values,
                        title: data[0].title,
                        info: data[0].info,
                        videolink: data[0].videolink
                    })
                });
        } catch (error) {
            // setErrors(error.message || "Unexpected Error")
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg:
                    'Unexpected Error',
            })
        } finally {
            setLoading({ ...loading, loading: false });
        }

    }

    return (
        <div>
            <header className="App-header" style={styles.bgGradient}>
                <div style={styles.section}>
                    <Link to="/" style={styles.breadCrumb}>Home <span aria-hidden="true">→</span></Link>
                    <span style={styles.current}>
                        Series List
                    </span>
                </div>
                <div style={styles.centText}>
                    <h1 style={styles.myH1}>
                        <em>Onthe</em>Scene: Series List
                    </h1>
                    <h3 style={styles.myH3}>
                        Highlighting Meaningful and Powerful Messages
                    </h3>
                    <div style={styles.btnLinks}>
                        <Link to="/list">
                            <button style={styles.link1}>View Series</button>
                        </Link>
                        <Link to="/dashboard" style={styles.link2}>
                            Dashboard <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                {/* <div style={styles.container}>
                    {
                        series?.map(show => (
                            <div className='bg-blue-500' style={styles.card}>
                                <li key={show._id} style={styles.items}>
                                    <Link to={`/series/${show._id}`}>{show.title}</Link>
                                </li>
                            </div>
                        ))
                    }
                </div> */}
            </header>

            <article style={styles.article}>
                <div style={styles.rows}>
                    {
                        series?.map(show => (
                            <div style={styles.card}>
                                {/* <img src={show.image} alt="" width="60" height="88" style={styles.image} /> */}
                                <div style={styles.container}>
                                    <dl style={styles.dl}>
                                        <div style={styles.desc}>
                                            <dd><h2 style={styles.title}>{show.title}</h2></dd>
                                            <dd>{show.description}</dd>
                                        </div>
                                        <div>
                                            <dd>
                                                <a href={`${show.videolink}`} target="_blank" rel="noreferrer" style={styles.aWatch}>
                                                    <button style={styles.watch}>Watch Video <span aria-hidden="true">→</span></button>
                                                </a>
                                                <Link to={`/series/${show._id}`} style={styles.editLink}>Edit <span aria-hidden="true">→</span></Link>
                                            </dd>
                                        </div>
                                        <div className="ml-2">
                                            <dd style={styles.link}>{show.year}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </article>

        </div>
    );
}

export default List;

const styles = {
    // container: {
    //     flex: 1,
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     padding: 0,
    //     margin: 0,
    //     listStyle: 'none',
    // },
    // items: {
    //     padding: '5px',
    //     width: '500px',
    //     height: '200px',
    //     marginTop: '10px',
    //     lineHeight: '40px',
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: '1.3em',
    //     textAlign: 'left',
    // },
    rows: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        flex: '33.33%',
        // flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        margin: 'auto',
        padding: '10px',
        maxWidth: '28rem',
        height: '15rem',
        textAlign: 'left',
        border: '2px solid lightblue',
        borderRadius: '1.5em',
    },
    series: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },


    article: {
        display: 'flex',
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
    fillPage: {
        //  mx-auto max-w-2xl py-32 sm:py-48 lg:py-56
        position: 'relative',
        margin: '0 auto',
        maxWidth: '42rem',
        padding: '2rem',
    },
    centText: {
        textAlign: 'center',
    },
    myH1: {
        fontSize: '2.25rem',
        fontWeight: '700px',
        color: '#111827',
        letterSpacing: '-0.025em',
        lineHeight: '2.5rem',
        marginBottom: '1rem',
        // smText: {
        //     maxWidth: '640px',
        //     fontSize: '3.75rem',
        //     lineHeight: 1,
        // },
    },
    myH3: {
        // mt- 6 text- lg leading-8 text - gray - 600
        marginTop: '1.5rem',
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        color: '#111827',
    },
    pHero: {
        // mt- 6 text- lg leading-8 text - gray - 600
        // marginTop: '1.5rem',
        // padding: '0 3rem',
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        color: '#111827',
    },
    btnLinks: {
        // mt-10 flex items-center justify-center gap-x-6
        marginTop: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem',

    },
    link1: {
        borderRadius: '0.375rem',
        backgroundColor: '#414c6b',
        padding: '0.375rem 0.875rem',
        color: 'white',
        fontWeight: '600',
        fontSize: '1rem',
        lineHeight: '1.75rem',
        letterSpacing: '-0.025em',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    link2: {
        // text-base font-semibold leading-7 text-gray-900
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.75rem',
        color: 'rgb(17 24 39)',
    },
    editLink: {
        // text-base font-semibold leading-7 text-gray-900
        paddingLeft: '1.3rem',
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.75rem',
        color: 'rgb(17 24 39)',
    },
    current: {
        // text-base font-semibold leading-7 text-gray-900
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.75rem',
        color: '#797ef6',
        textDecoration: 'none',
        backgroundColor: 'white',
        boxShadow: '0 1px 2px 0 rgba(0, 0',
        padding: '0.375rem 0.875rem',
        borderRadius: '0.375rem',
    },
    aWatch: {
        textDecoration: 'none',
    },
    watch: {
        // text-base font-semibold leading-7 text-gray-900
        fontSize: '1rem',
        fontWeight: '600',
        // lineHeight: '1.75rem',
        color: '#797ef6',
        textDecoration: 'none',
        backgroundColor: 'white',
        // boxShadow: '0 1px 2px 0 rgba(0, 0',
        padding: '0.375rem 0.875rem',
        borderRadius: '0.375rem',
        outline: 'none',
    },
    breadCrumb: {
        // text-base font-semibold leading-7 text-gray-900
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.75rem',
        color: 'rgb(17 24 39)',
        textDecoration: 'none',
        padding: '1rem',
    },
    // #a5def2
    //  bg-gradient-to-r from-cyan-500 to-blue-500
    bgGradient: {
        // backgroundColor: '#',
        // background: 'linear-gradient(180deg, #797ef6 0',
        // blur: 'blur(64px)',
        //  h-14 bg-gradient-to-r from-cyan-500 to-blue-500
        padding: '2rem 1rem',
        backgroundImage: 'linear-gradient(#a5def2, #fff)',

    },
    section: {
        paddingTop: '1.5rem',
        paddingLeft: '1.5rem',
    },

}