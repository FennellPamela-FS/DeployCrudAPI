import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return (
        <div className='App' style={styles.bgGradient}>
            <div style={styles.fillPage}>
                <header className="App-header">
                    <div style={styles.centText}>
                        <h1 style={styles.myH1}>
                            Welcome to <em>Onthe</em>Scene
                        </h1>
                        <h3 style={styles.myH3}>
                            Highlighting Meaningful and Powerful Messages
                        </h3>
                        <p style={styles.pHero}>
                            Feature of the Month: Peace of Mind: In this series we will look at how some familiar names in scripture dealt with many of the same struggles we face today. We’ll learn how they overcame those struggles not through their own strength, but by depending on God.
                        </p>
                        <div style={styles.btnLinks}>
                            <Link
                                to="/list"

                            >
                                <button style={styles.link1}>View Series</button>
                            </Link>
                            <Link to="/dashboard" style={styles.link2}>
                                Dashboard <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </header>
                <main>
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
                </main>
            </div>
        </div>
    )
}

export default Home

const styles = {
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
    // #a5def2
    //  bg-gradient-to-r from-cyan-500 to-blue-500
    bgGradient: {
        // backgroundColor: '#',
        // background: 'linear-gradient(180deg, #797ef6 0',
        // blur: 'blur(64px)',
        //  h-14 bg-gradient-to-r from-cyan-500 to-blue-500
        padding: '2rem 1rem',
        backgroundImage: 'linear-gradient(#a5def2, #fff)',

    }

}