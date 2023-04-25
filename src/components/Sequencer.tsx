import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from "./SynthContext";

// type Instrument = /*'kick' | 'snare' | 'hihat' |*/ 'synthKick' | 'synthSnare' | 'synthHihat';
type Instrument = 'synthOne' | 'synthTwo' | 'synthThree' | 'synthFour' | 'synthFive' | 'synthSix' | 'synthSeven' | 'synthEight';
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
        synthOne: new Tone.MembraneSynth().toDestination(),
        synthTwo: new Tone.NoiseSynth().toDestination(),
        synthThree: new Tone.FMSynth().toDestination(),
        synthFour: new Tone.MembraneSynth().toDestination(),
        synthFive: new Tone.DuoSynth().toDestination(),
        synthSix: new Tone.NoiseSynth().toDestination(),
        synthSeven: new Tone.AMSynth().toDestination(),
        synthEight: new Tone.NoiseSynth().toDestination(),
    }

    // const drumPlayers = new Tone.Players(drumSamples).toDestination();


    const initialPattern: Pattern = {
        /*kick: new Array(16).fill(false),*/
        /*snare: new Array(16).fill(false),*/
        /*hihat: new Array(16).fill(false),*/
        synthOne: new Array(16).fill(false),
        synthTwo: new Array(16).fill(false),
        synthThree: new Array(16).fill(false),
        synthFour: new Array(16).fill(false),
        synthFive: new Array(16).fill(false),
        synthSix: new Array(16).fill(false),
        synthSeven: new Array(16).fill(false),
        synthEight: new Array(16).fill(false),
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
                className={`play-button ${isPlaying ? 'active' : ''} text-stone-200 text-9xl font-extrabold uppercase font-display`}
                onClick={() => {Tone.Transport.start(); setIsPlaying(!isPlaying)}}
            >
                {isPlaying ? 'Stop' : 'Play'}
            </button>
            <div className="pattern">
                {Object.keys(pattern).map((instrument: string) => (
                    <div key={instrument} className="instrument-row m-2 text-3xl">
                        {pattern[instrument as Instrument].map((isActive: boolean, step: number) => (
                            <button
                                key={step}
                                className={`step ${isActive ? 'active bg-blue-300' : 'bg-black'} ${
                                    currentStep === step ? 'current bg-red-300' : ''
                                }  ${isActive && currentStep === step ? 'bg-green-300': ''} p-5 m-2 rounded-full`}
                                onClick={() => toggleStep(instrument as Instrument, step)}
                            >{isActive ? " " : " "}</button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

}