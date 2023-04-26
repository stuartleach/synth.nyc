import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from "./SynthContext";

// type Instrument = /*'kick' | 'snare' | 'hihat' |*/ 'synthKick' | 'synthSnare' | 'synthHihat';
type Instrument =
    'synthOne'
    | 'synthTwo'
    | 'synthThree'
    | 'synthFour'
    | 'synthFive'
    | 'synthSix'
    | 'synthSeven'
    | 'synthEight';
type Pattern = {
    [key in Instrument]: boolean[];
};

type StepProps = {
    isActive: boolean;
    pitch: string;
    volume: number;
    onClick: () => void;
}

interface MixerControlsProps {
    mute: boolean;
    volume: number;
    onMute: () => void;
    onVolumeChange: (volume: number) => void;
    FX1: boolean;
    FX2: boolean;
    FX1Volume: number;
    FX2Volume: number;
    OnFX1Volume: (volume: number) => void;
    OnFX2Volume: (volume: number) => void;
    OnFX1: () => void;
    OnFX2: () => void;
}

export const MixerControls: React.FC<MixerControlsProps> = ({
                                                                mute,
                                                                volume,
                                                                onMute,
                                                                onVolumeChange,
                                                                FX1,
                                                                FX2,
                                                                FX1Volume,
                                                                FX2Volume,
                                                                OnFX1Volume,
                                                                OnFX2Volume,
                                                                OnFX1,
                                                                OnFX2,
                                                            }) => {
    return (
        <div className="mixer-controls">
            <button className={`mute-button ${mute ? 'active' : ''}`} onClick={onMute}>
                {mute ? 'Unmute' : 'Mute'}
            </button>
            <div className="volume-control">
                <label htmlFor="volume">Volume: {volume}</label>
                <input
                    type="range"
                    id="volume"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                />
            </div>
            <div className="fx-controls">
                <div className="fx1-control">
                    <label htmlFor="fx1-volume">FX1: {FX1Volume}</label>
                    <input
                        type="range"
                        id="fx1-volume"
                        min={0}
                        max={100}
                        value={FX1Volume}
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        disabled={!FX1}
                    />
                </div>
                <div className="fx2-control">
                    <label htmlFor="fx2-volume">FX2: {FX2Volume}</label>
                    <input
                        type="range"
                        id="fx2-volume"
                        min={0}
                        max={100}
                        value={FX2Volume}
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        disabled={!FX2}
                    />
                </div>
            </div>
        </div>
    );
};

export const Sequencer: React.FC = () => {
    const synthContext = useSynthContext();

    // Sequencer component implementation
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [tempo, setTempo] = useState(120);
    const [mixerSettings, setMixerSettings] = useState({
        synthOne: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        },
        synthTwo: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        },
        synthThree: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        }, synthFour: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        }, synthFive: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        }, synthSix: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        }, synthSeven: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        }, synthEight: {
            mute: false,
            volume: 50,
            FX1: false,
            FX2: false,
            FX1Volume: 50,
            FX2Volume: 50,
        },
    })

    const handleMute = (instrument: Instrument) => {
        setMixerSettings((prevSettings) => {
            const newSettings = {...prevSettings};
            newSettings[instrument].mute = !newSettings[instrument].mute;
            return newSettings;
        });
    };

    const handleVolumeChange = (instrument: Instrument, volume: number) => {
        setMixerSettings((prevSettings) => {
            const newSettings = {...prevSettings};
            newSettings[instrument].volume = volume;
            return newSettings;
        });
    };

    const handleFX1Toggle = (instrument: Instrument) => {
        setMixerSettings((prevSettings) => {
            const newSettings = {...prevSettings};
            newSettings[instrument].FX1 = !newSettings[instrument].FX1;
            return newSettings;
        });
    }

    const handleFX2Toggle = (instrument: Instrument) => {
        setMixerSettings((prevSettings) => {
            const newSettings = {...prevSettings};
            newSettings[instrument].FX2 = !newSettings[instrument].FX2;
            return newSettings;
        });
    }

    const handleFX1Volume = (instrument: Instrument, volume: number) => {
        setMixerSettings((prevSettings) => {
            const newSettings = {...prevSettings};
            newSettings[instrument].FX1Volume = volume;
            return newSettings;
        });
    }

    const handleFX2Volume = (instrument: Instrument, volume: number) => {
        setMixerSettings((prevSettings) => {
            const newSettings = {...prevSettings};
            newSettings[instrument].FX2Volume = volume;
            return newSettings;
        });
    }

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
                onClick={() => {
                    Tone.Transport.start();
                    setIsPlaying(!isPlaying)
                }}
            >
                {isPlaying ? 'Stop' : 'Play'}
            </button>
            <div className="pattern">
                {Object.keys(pattern).map((instrument: string) => (
                    <div key={instrument} className="instrument-row m-2 text-3xl">
                        {/*Create div to move instrument name to left of row*/}
                        {/*<div className="instrument-name justify-start">{instrument}</div>*/}
                        <MixerControls
                            mute={mixerSettings[instrument as Instrument].mute}
                            volume={mixerSettings[instrument as Instrument].volume}
                            onMute={() => handleMute(instrument as Instrument)}
                            onVolumeChange={(volume: number) =>
                                handleVolumeChange(instrument as Instrument, volume)
                            }
                            OnFX1={() => handleFX1Toggle(instrument as Instrument)}
                            OnFX2={() => handleFX2Toggle(instrument as Instrument)}
                            OnFX1Volume={(volume: number) =>
                                handleFX1Volume(instrument as Instrument, volume)
                            }
                            OnFX2Volume={(volume: number) =>
                                handleFX2Volume(instrument as Instrument, volume)
                            }
                            FX1={false}
                            FX2={false}
                            FX1Volume={0}
                            FX2Volume={0}
                        />
                        {pattern[instrument as Instrument].map((isActive: boolean, step: number) => (
                            <button
                                key={step}
                                className={`step ${isActive ? 'active bg-blue-300' : 'bg-black'} ${
                                    currentStep === step ? 'current bg-red-300' : ''
                                }  ${isActive && currentStep === step ? 'bg-green-300' : ''} p-5 m-1 rounded-full`}
                                onClick={() => {
                                    toggleStep(instrument as Instrument, step);
                                }}
                            >{isActive ? " " : " "}</button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

}