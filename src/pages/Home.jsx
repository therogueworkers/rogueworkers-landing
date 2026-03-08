import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="hero">
            <h1>Anonymous Career Intel</h1>
            <p>
                Salary transparency, interview insights, and honest company reviews.
                Join Rogue Workers to access raw, verified data and take control of your career.
            </p>
            <div className="hero-btns">
                <Link to="/register" className="btn-primary">Join for Free</Link>
                <Link to="/login" className="btn-outline">Sign In</Link>
            </div>
        </div>
    );
};

export default Home;
