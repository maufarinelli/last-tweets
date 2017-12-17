import React from 'react';
import './tweet.css';

const Tweet = ({tweet}) => (
    <li className="tweet">
        <div className="tweet-header">
            <img src={tweet.user.profile_image_url} alt={tweet.user.name} />
            <h1>{tweet.user.name}</h1>
        </div>
        <small>{tweet.created_at}</small>
        <p>{tweet.text}</p>
    </li>
);
export default Tweet;
