import React, {useEffect, useState} from 'react';
import {SynthControl} from './SynthControl';
import {SynthVisualization} from './SynthVisualization';
import {SynthContextProvider, useSynthContext} from "./SynthContext";
import {WorkstationSynthControl} from './WorkstationSynthControl'
// import {PolySynthControl} from './PolySynthControl.tsx.txt'
import {Synth} from "tone";
import * as Tone from "tone"
import {Sequencer} from "./Sequencer";


const SynthDashboard: React.FC = () => {
    const [rerender, startRerender] = useState(0)
    const startTone = () => {
        startRerender((rerender) => rerender + 1)
        if (rerender < 1) {
            console.log("tone started")
            Tone.start()
        }
    }


    return (
        <SynthContextProvider>
            <div onClick={startTone} className="min-h-screen bg-gray-700 py-3 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-5xl mx-auto center bg-amber-300">
                    <h1 className="text-4xl font-bold text-center mb-8">Poly Synth Dashboard</h1>
                    <Sequencer />
                    <div className="synth-controls grid grid-cols-3 gap-1 sm:grid-cols-2">
                        {
                            Object.keys(useSynthContext()).map((synthKind: string): JSX.Element => {
                                return (
                                    <div className={`bg-white p-6 lg shadow-md rounded-2xl`}
                                         key={`${synthKind.toString()}Container`}>
                                        <SynthControl key={`${synthKind.toString()}SynthEngine`}
                                                      synthType={synthKind.toString()}/>
                                        <SynthVisualization key={`${synthKind.toString()}Viz`}
                                                            synthType={synthKind.toString()}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </SynthContextProvider>
    );
};

export default SynthDashboard;
