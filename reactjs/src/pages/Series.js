import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';



const Series = () => {
    // we might STOP using series ?????
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        title: '',
        description: '',
        videolink: ''
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

    }, []) // no dependencies

    const getSingleSeries = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/series/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    setSeries(data);
                    // // const { name, class } = data;
                    // setValues({
                    //     title: data.title,
                    //     description: data.description
                    //     videolink: data.videolink
                    // })
                    setValues(data)
                });
        } catch (error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false);
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
            setError(error.message || "Unexpected Error")
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
            setError(error.message || "Unexpected Error")
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
            [event.target.title]: event.target.value // set value from the form to the event target name
        }))
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1> Series Details Page</h1>
                {/* 
                    if we have series, then show series.title
                    both and, series && series.title
                */}
                {/* <h5>{series && series.title ? values.title : series.title}</h5> */}

                <h5>{values && values.title}</h5>
                <p>{values && values.description}</p>
                <p>{values && values.videolink}</p>
                <a href={`${values.videolink}`}>Launch Video</a>


                <button onClick={() => deleteSeries()}>Delete Series</button>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>

                <h3>Edit: Series Profile</h3>
                {/* onSubmit call handleSubmit to update name and class */}
                <form onSubmit={(event) => handleSubmit(event)}>
                    <label>
                        Title:
                        <input type="text" name="title" value={values.title} onChange={handleInputChanges} />
                    </label>
                    <label>
                        Description:
                        {/* <input type="text" name="description" value={values.description} onChange={handleInputChanges} /> */}
                        <textarea name="description" rows="10" cols="30" value={values.description} onChange={handleInputChanges} />
                        {/* {values.description} */}
                        {/* <textarea /> */}
                    </label>
                    <label>
                        Video Link: <em>Paste Link to video here</em>
                        <input type="text" name="videolink" value={values.videolink} onChange={handleInputChanges} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </header>
        </div>
    )
}

export default Series