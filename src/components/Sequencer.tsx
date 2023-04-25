import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from "./SynthContext";

type Instrument = /*'kick' | 'snare' | 'hihat' |*/ 'synthKick' | 'synthSnare' | 'synthHihat';
type Pattern = {
    [key in Instrument]: boolean[];
};

type StepProps = {
    isActive: boolean;
    pitch: string;
    volume: number;
    onClick: () => void;
}

export const Sequencer: React.FC = () => {
    const synthContext = useSynthContext();

    // Sequencer component implementation
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

   /* const drumSamples = {
        kick: "",
        snare: "",
        hihat: "",
    };*/

    const synthDrums = {
        synthKick: new Tone.MembraneSynth().toDestination(),
        synthSnare: new Tone.NoiseSynth().toDestination(),
        synthHihat: new Tone.NoiseSynth().toDestination(),
    }

    // const drumPlayers = new Tone.Players(drumSamples).toDestination();


    const initialPattern: Pattern = {
        /*kick: new Array(16).fill(false),*/
        /*snare: new Array(16).fill(false),*/
        /*hihat: new Array(16).fill(false),*/
        synthKick: new Array(16).fill(false),
        synthSnare: new Array(16).fill(false),
        synthHihat: new Array(16).fill(false),
    };
    const [pattern, setPattern] = useState(initialPattern);

    const toggleStep = (instrument: Instrument, step: number) => {
        console.log("toggleStep", instrument, step)
        setPattern((prevPattern) => {
            const newPattern = {...prevPattern};
            newPattern[instrument][step] = !newPattern[instrument][step];
            return newPattern;
        });
    };


   useEffect(() => {
    const sequence = new Tone.Sequence(
        (time, step) => {
            setCurrentStep(step);
            for (const instrument in pattern) {
                const typedInstrument = instrument as Instrument;
                if (pattern[typedInstrument][step]) {
                    // Replace drumPlayers with synthDrums and triggerAttackRelease instead of start
                    synthDrums[typedInstrument].triggerAttackRelease("16n", time);
                }
            }
        },
        Array.from({length: 16}, (_, i) => i),
        '16n'
    );

    if (isPlaying) {
        console.log("playing...")
        sequence.start(0);
        Tone.Transport.start();
    } else {
        console.log("stopped playing...")
        sequence.stop();
        Tone.Transport.stop();
    }

    return () => {
        sequence.dispose();
    };
}, [pattern, isPlaying]);


    return (
        <div className="sequencer">
            <button
                className={`play-button ${isPlaying ? 'active' : ''}`}
                onClick={() => {Tone.Transport.start(); setIsPlaying(!isPlaying)}}
            >
                {isPlaying ? 'Stop' : 'Play'}
            </button>
            <div className="pattern bg-red-500">
                {Object.keys(pattern).map((instrument: string) => (
                    <div key={instrument} className="instrument-row bg-pink-500 m-2 text-3xl">
                        {pattern[instrument as Instrument].map((isActive: boolean, step: number) => (
                            <button
                                key={step}
                                className={`step ${isActive ? 'active' : ''} ${
                                    currentStep === step ? 'current' : ''
                                } bg-amber-300 p-3`}
                                onClick={() => toggleStep(instrument as Instrument, step)}
                            >{isActive ? "🛢️" : "🥁"}</button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

}