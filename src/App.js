import React from 'react';
import TweetsGrid from './components/TweetsGrid/TweetsGrid';
import './App.css';

const App = () => (
    <div className="last-tweets-app">
        <h1>Following the 30 latest tweets of: </h1>
        <TweetsGrid />
    </div>
);
export default App;
