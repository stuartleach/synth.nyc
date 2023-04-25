import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from "./SynthContext";

type Instrument = 'kick' | 'snare' | 'hihat';
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

    const drumSamples = {
        kick: 'https://example.com/kick.wav',
        snare: 'https://example.com/snare.wav',
        hihat: 'https://example.com/hihat.wav',
    };

    const synthDrums = {
        kick: new Tone.MembraneSynth().toDestination(),
        snare: new Tone.NoiseSynth().toDestination(),
        hihat: new Tone.NoiseSynth().toDestination(),
    }

    const drumPlayers = new Tone.Players(drumSamples).toDestination();

    const initialPattern: Pattern = {
        kick: new Array(16).fill(false),
        snare: new Array(16).fill(false),
        hihat: new Array(16).fill(false),
    };
    const [pattern, setPattern] = useState(initialPattern);

    const toggleStep = (instrument: Instrument, step: number) => {
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
                        drumPlayers.player(typedInstrument).start(time);
                    }
                }
            },
            Array.from({length: 16}, (_, i) => i),
            '16n'
        );

        if (isPlaying) {
            sequence.start(0);
            Tone.Transport.start();
        } else {
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
                onClick={() => setIsPlaying(!isPlaying)}
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
                                } bg-amber-300 p-6`}
                                onClick={() => toggleStep(instrument as Instrument, step)}
                            >{isActive ? "🛢️" : "🥁"}</button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

}