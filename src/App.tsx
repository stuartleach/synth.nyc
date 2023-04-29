import React, {useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import SynthDashboard from "./components/SynthDashboard";
import * as Tone from "tone";
import {ThreeDimensions} from "./components/ThreeD/ThreeDimensions";
import ShapeGrid from "./components/ThreeD/ShapeGrid";

function EmptyTags(): JSX.Element {
    return (<></>)
}

function App() {

    const [playing, setPlaying] = React.useState(false);

    const initialized = Tone.getContext() || null

    const startTone = () => {
        setPlaying(!playing)
        return Tone.start()
    }

    useEffect(() => {
    }, [playing])

    return (
        <div className="App">
            {/*<ThreeDimensions/>*/}
            <div className="canvas-container" style={{width: '100vw', height: '100vh'}}>

                <ShapeGrid/></div>
            {/*<div className="App-body">
                {initialized ?
                    <SynthDashboard/> : <EmptyTags />}
            </div>*/}
        </div>
    );
}

export default App;
