import React, { Component } from 'react';

const Tweet = ({tweet}) => (
    <li>
        <img src={tweet.user.profile_image_url} alt={tweet.user.name} />
        <h1>{tweet.user.name}</h1>
        <p>{tweet.created_at}</p>
        <p>{tweet.text}</p>
    </li>
);
export default Tweet;
