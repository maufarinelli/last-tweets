import React from 'react';
import Tweet from '../Tweet/Tweet';
import './tweetList.css';

const TweetsList = ({list}) => {
    const title = Object.keys(list)[0].charAt(0).toUpperCase() + Object.keys(list)[0].slice(1);

    const tweetsList = Object.values(list)[0];
    return (
        <div className="grid-item">
            <h2>{title}</h2>
            <ul>
                {tweetsList.map((tweet, index) => {
                    return <Tweet tweet={tweet} key={index} />
                })}
            </ul>
        </div>
    );
};

export default TweetsList;