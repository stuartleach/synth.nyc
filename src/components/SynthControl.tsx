// SynthControl.tsx
import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from "./SynthContext";

interface SynthControlProps {
    synthType: string;
}

export const SynthControl: React.FC<SynthControlProps> = ({synthType}) => {
    const synthContext = useSynthContext();
    const synth = synthContext[synthType as keyof typeof synthContext] as
        | Tone.Synth
        | Tone.FMSynth
        | Tone.AMSynth
        | Tone.DuoSynth
        | Tone.MembraneSynth
        // | Tone.PolySynth<Tone.Synth>
        | null;
    const [volume, setVolume] = useState<number>(0);
    const [detune, setDetune] = useState<number>(0);

    useEffect(() => {


        if (synth) {
            synth.connect(Tone.Master); // deprecated; fix eventually.
        }
        return () => {
            synth?.dispose();
        };
    }, [synth]);


    useEffect(() => {
        if (!synth) return;

        synth.toDestination();

        return () => {
            synth.disconnect();
        };
    }, [synth]);


    const handleNoteOn = (note: string) => {
        synth?.triggerAttack(note, Tone.now());
    };

    const handleNoteOff = (note: string) => {
        synth?.triggerRelease(Tone.now()/*note, Tone.now()*/);
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        synth?.set({volume: newVolume});
    };

    const handleDetuneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDetune = parseFloat(event.target.value);
        setDetune(newDetune);
        synth?.set({detune: newDetune});
    };

    return (
        <div className={`synth-control ${synthType}`}>
            <h3 className="text-xl font-bold mb-4">{synthType}</h3>
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
