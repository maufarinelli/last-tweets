import React, { Component } from 'react';
import TweetsList from '../TweetsList/TweestList';
import './tweetsGrid.css';

class TweetsGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    fetchTweets() {
        fetch('http://localhost:4000/get/tweets')
            .then(response => response.json())
            .then(tweets => {
                this.setState({list: tweets});
            })
    }

    componentWillMount() {
        this.fetchTweets();
    }

    render() {
        return (
            <div className="grid">
                {this.state.list.map((tweetList, index) => {
                    return <TweetsList list={tweetList} key={index} />
                })}
            </div>
        );
    }
}

export default TweetsGrid;