import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



const Dashboard = () => {

    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        title: '',
        description: '',
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

    }, []) // no dependencies

    const getSeries = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/series`)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    setSeries(data);
                });
        } catch (error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false);
        }

    }

    const createSeries = async () => {
        try {
            await fetch(`${API_BASE}/series`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(() => getSeries())
        } catch (error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false)
        }
    }

    // take event
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form from submitting the page by default
        createSeries();
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
                <h1>Series Dashboard Page</h1>
                <Link to="/">Home</Link>
                <ul>
                    {
                        series?.map(singleseries => (
                            <li key={singleseries._id}>
                                <Link to={`/series/${singleseries._id}`}>{singleseries.title}</Link>
                            </li>
                        ))
                    }
                </ul>

                <h3>Create: Series</h3>
                <p>Assign title, description, and video link</p>
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

export default Dashboard