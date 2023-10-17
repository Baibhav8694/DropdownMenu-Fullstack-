import React from 'react';
import './App.css';  // Assuming you might have an App.css for styling purposes
import DropdownComponent from './components/DropdownComponent'; // Adjust the path according to where you have saved the DropdownComponent.js

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Location Selector</h1>
            </header>
            <main>
                <DropdownComponent />
            </main>
        </div>
    );
}

export default App;
