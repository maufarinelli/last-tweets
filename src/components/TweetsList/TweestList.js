import React, { Component } from 'react';
import Tweet from '../Tweet/Tweet';

const TweetsList = ({list}) => {
    return (
        <div className="pure-u-1-3">
            <h2>{Object.keys(list)[0]}</h2>
            <u>
                {Object.values(list).map(tweet => {
                    return <Tweet tweet={tweet}/>
                })};
            </u>
        </div>
    );
};

export default TweetsList;