import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';



function Series() {
    // we might STOP using series ?????
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [values, setValues] = useState({
        title: '',
        description: '',
        videolink: '',
    })

    const { id } = useParams();
    const navigate = useNavigate();

    // if node env is development then set localhost:8000 else use REACT_APP_BASE_URL
    const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let ignore = false;

        // reach out to API only once
        if (!ignore) {
            // getSeries();
            getSingleSeries();
        }
        return () => {
            ignore = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // no dependencies

    const getSingleSeries = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/series/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    // setSeries(data);
                    setSeries({
                        ...series,
                        title: data.title,
                        description: data.description,
                        videolink: data.videolink,
                    });
                    // // const { name, class } = data;
                    // setValues({
                    //     title: data.title,
                    //     description: data.description
                    //     videolink: data.videolink
                    // })
                    setValues(data)
                });
        } catch (error) {
            setErrors(error.message || "Unexpected Error")
        } finally {
            setLoading({ ...loading, loading: false });
        }

    }

    // reach out to server
    const deleteSeries = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/series/${id}`, {
                // option Delete
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    setSeries(data);
                    // navigate back to the dashboard, replace history with this
                    navigate("/dashboard", { replace: true })
                })
        } catch (error) {
            // setErrors(error.message || "Unexpected Error")
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg:
                    'Unexpected Error',
            })
        } finally {
            setLoading(false)
        }
    }

    // 
    const updateSingleSeries = async () => {
        try {
            await fetch(`${API_BASE}/series/${id}`, {
                // PATCH option
                method: 'PATCH',
                headers: {  // check headers are sending json
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)    // send updated stringify values
            })
                .then(res => res.json())
                .then(data => {
                    console.log({ data })
                })
        } catch (error) {
            // setErrors(error.message || "Unexpected Error")
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg:
                    'Unexpected Error',
            })
        } finally {
            setLoading(false)
        }
    }

    // take event
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form from submitting the page by default
        updateSingleSeries();
    }

    // take event to allow it to update and set values while it changes
    const handleInputChanges = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,  // use spread operator to get the latest version of values
            [event.target.name]: event.target.value // set value from the form to the event target name
        }))
    }

    return (
        <div>
            <header className="App-header" style={styles.bgGradient}>
                <div style={styles.section}>
                    <Link to="/" style={styles.breadCrumb}>Home <span aria-hidden="true">→</span></Link>
                    <Link to="/list" style={styles.breadCrumb}>Series List <span aria-hidden="true">→</span></Link>
                    <Link to="/dashboard" style={styles.breadCrumb}>Dashboard <span aria-hidden="true">→</span></Link>
                    <span style={styles.current}>
                        Edit Series
                    </span>
                </div>
                <div style={styles.centText}>
                    <h1 style={styles.myH1}>
                        <em>Onthe</em>Scene: Series Information
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
            </header>

            <div style={styles.create}>
                <div style={styles.createRow}>
                    <div style={styles.createCol}>
                        <div style={styles.card}>
                            {/* 
                    if we have series, then show series.title
                    both and, series && series.title
                */}
                            {/* <h5>{series && series.title ? values.title : series.title}</h5> */}

                            <h2 style={styles.centText}>{values && values.title}</h2>
                            <p>{values && values.description}</p>
                            <p>{values && values.videolink}</p>
                            <a href={`${values.videolink}`} target="_blank" rel="noreferrer" style={styles.aWatch}>
                                <button style={styles.watch}>Launch Video <span aria-hidden="true">→</span></button>
                            </a>
                            <button onClick={() => deleteSeries()} style={styles.btnSub}>Delete Series</button>
                        </div>
                    </div>
                    <div style={styles.createCol}>
                        <div style={styles.noCard}>
                            <h2>Edit: Series Information and Video Link</h2>
                            {/* onSubmit call handleSubmit to update title and description */}
                            <form onSubmit={(event) => handleSubmit(event)} >
                                <div style={styles.inner}>
                                    <label>
                                        Title:
                                        <input type="text" name="title" value={values.title} onChange={handleInputChanges} style={styles.input} />
                                    </label>
                                    <label>
                                        Description:
                                        {/* <input type="text" name="description" value={values.description} onChange={handleInputChanges} style={styles.input} /> */}
                                        <textarea name="description" rows="10" value={values.description} onChange={handleInputChanges} style={styles.inputLong} />
                                        {/* {values.description} */}
                                        {/* <textarea /> */}
                                    </label>
                                    <label>
                                        Video Link: <em>Paste Link to video here</em>
                                        <input type="text" name="videolink" value={values.videolink} onChange={handleInputChanges} style={styles.input} />
                                    </label>
                                    <button type="submit" value="Submit" style={styles.btnSub}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Series;

const styles = {
    inner: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    inputLong: {
        display: 'block',
        width: '100%',
        height: '6rem',
        fontSize: '1rem',
        borderRadius: '0.375rem',
        borderColor: 'rgb(209 213 219)',
        paddingLeft: '1.75rem',
        paddingRight: '3rem',
    },
    input: {
        display: 'block',
        width: '100%',
        height: '2rem',
        fontSize: '1rem',
        borderRadius: '0.375rem',
        borderColor: 'rgb(209 213 219)',
        paddingLeft: '1.75rem',
        paddingRight: '3rem',
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
        marginTop: '1.5rem',
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        color: '#111827',
    },
    pHero: {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        color: '#111827',
    },
    btnLinks: {
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
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.75rem',
        color: 'rgb(17 24 39)',
    },
    current: {
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
    breadCrumb: {
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.75rem',
        color: 'rgb(17 24 39)',
        textDecoration: 'none',
        padding: '1rem',
    },
    bgGradient: {
        padding: '2rem 1rem',
        backgroundImage: 'linear-gradient(#a5def2, #fff)',

    },
    create: {
        display: 'flex',
        flex: '33%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
        margin: 'auto',
        padding: '3px',
    },
    card: {
        flex: '45%',
        backgroundColor: '#f2f2f2',
        margin: '2rem ',
        padding: '10px',
        width: '100%',
        maxWidth: '640px',
        height: '15rem',
        textAlign: 'left',
        border: '2px solid lightblue',
        borderRadius: '1.5em',
    },
    noCard: {
        flex: '45%',
        margin: '2rem ',
        padding: '10px',
        width: '100%',
        maxWidth: '640px',
        height: '15rem',
        textAlign: 'left',
    },
    section: {
        paddingTop: '1.5rem',
        paddingLeft: '1.5rem',
    },
    createRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: '2rem',
        rowGap: '2.5rem',
    },
    createCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    leftList: {
        listStyleType: 'none',
        marginTop: '1rem',
        paddingBottom: '1.5rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500px',
        color: '#1e80c1',

    },
    btnSub: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1.5rem',
        borderColor: 'transparent',
        backgroundColor: '#1e80c1',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '500px',
        color: 'white',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
}