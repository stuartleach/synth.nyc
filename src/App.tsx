import React, {useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import SynthDashboard from "./components/SynthDashboard";
import * as Tone from "tone";


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
        <div className="App" >
            <div className="App-body">
                {initialized ?
                    <SynthDashboard/> : <EmptyTags />}
            </div>
        </div>
    );
}

export default App;
