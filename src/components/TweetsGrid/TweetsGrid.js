import React, { Component } from 'react';
import TweetsList from '../TweetsList/TweestList';

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
            <div className="pure-g">
                {this.state.list.map(tweetList => {
                    return <TweetsList list={tweetList} />
                })}
            </div>
        );
    }
}

export default TweetsGrid;