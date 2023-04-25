// SynthControl.tsx
import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from "./SynthContext";
import {Panner, Param} from "tone";

interface WorkstationSynthControlProps {
    synthTypes: string[]
}

export const WorkstationSynthControl: React.FC<WorkstationSynthControlProps> = ({synthTypes}) => {
    const synthContext = useSynthContext();
    const panner = new Tone.Panner(1).toDestination()

    // const synthEngines = synthTypes

    const synths = synthTypes.map((synthType) => {
        return synthContext[synthType as keyof typeof synthContext] as
            | Tone.Synth
            | Tone.FMSynth
            // | Tone.
            | null;
    })
    const [volume, setVolume] = useState<number>(0);
    const [detune, setDetune] = useState<number>(0);
    // const [panValue, setPanValue] = useState<number>(0)


    useEffect(() => {
        if (synths) {
            synths.forEach((synth, index) => synth?.connect(Tone.Master).connect(panner)) // deprecated; fix eventually.
        }
        return () => {
            synths?.forEach((synth) => synth?.dispose())
        };
    }, [synths]);

    useEffect(() => {

    }, [])

    const handleNoteOn = (note: string) => {
        synths?.forEach((synth, index) => {
            // panner.pan.apply(new AudioParam())
            let randomPosNeg = (Math.random() > 0.5) ? -1 : 1
            // setPanValue(Math.random() * randomPosNeg)
            panner.pan.rampTo(Math.random() * randomPosNeg, Tone.now());
            synth?.triggerAttack(note, Tone.now() + index / (Math.random() * 10))
        })
    }

    const handleNoteOff = (note: string) => {
        synths.forEach((synth, index) => synth?.triggerRelease(/*note,*/ Tone.now() + index / (Math.random() * 20)));
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        synths.forEach(synth => synth?.set({volume: newVolume}))
    };


    const handleDetuneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDetune = parseFloat(event.target.value);
        setDetune(newDetune);
        synths.forEach(synth => synth?.set({detune: newDetune}));
    };

    return (
        <div
            className={`synth-control bg-white p-6 rounded-lg shadow-md ${synthTypes && synthTypes.map(synthType => synthType)}`}>
            {synthTypes && synthTypes.map(synthType => (<h3 className="text-xl font-bold mb-4">{synthType}</h3>))}
            <div className="note-controls mb-4">
                <button
                    onMouseDown={() => handleNoteOn('C4')}
                    onMouseUp={() => handleNoteOff('C4')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    C
                </button>
                {/* Add more buttons for other notes */}
            </div>
            <div className="parameter-controls">
                <label className="block">
                    <span className="text-gray-700">Volume</span>
                    <input
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="mt-1 block w-full"
                    />
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Detune</span>
                    <input
                        type="range"
                        min="-1200"
                        max="1200"
                        step="1"
                        value={detune}
                        onChange={handleDetuneChange}
                        className="mt-1 block w-full"
                    />
                </label>
            </div>
        </div>
    );
};
