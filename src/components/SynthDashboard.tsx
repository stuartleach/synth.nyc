import React, {useEffect, useState} from 'react';
import {SynthControl} from './SynthControl';
import {SynthVisualization} from './SynthVisualization';
import {SynthContextProvider, useSynthContext} from "./SynthContext";
import {WorkstationSynthControl} from './WorkstationSynthControl'
// import {PolySynthControl} from './PolySynthControl.tsx.txt'
import {Synth} from "tone";
import * as Tone from "tone"


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
            <div onClick={startTone} className="min-h-screen bg-gray-100 py-3 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl mx-auto center">
                    <h1 className="text-4xl font-bold text-center mb-8">Poly Synth Dashboard</h1>
                    <div className="synth-controls grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {/* Render SynthControl components for each synth implementation */}
                        {/*{
                            SynthContextProvider.defaultProps && Object.keys(SynthContextProvider).map((synthKind: string): JSX.Element => {
                                return (
                                    <>
                                        <div>HELLO WORLD</div>
                                        <button onClick={() => console.log(synthKind)}></button>
                                        <SynthControl synthType={synthKind.toString()}/>
                                    </>
                                )
                            })
                        }*/}
                        {/*<WorkstationSynthControl synthTypes={Object.keys(useSynthContext())} />*/}
                        {/*<PolySynthControl synthTypes={Object.keys(useSynthContext())} />*/}
                        {
                            Object.keys(useSynthContext()).map((synthKind: string): JSX.Element => {
                                return (
                                    <div className={`shadow-lg bg-white p-6 lg shadow-md rounded-2xl`} key={`${synthKind.toString()}Container`}>
                                        <SynthControl key={`${synthKind.toString()}SynthEngine`}
                                                      synthType={synthKind.toString()}/>
                                        <SynthVisualization key={`${synthKind.toString()}Viz`}
                                                            synthType={synthKind.toString()}/>
                                    </div>
                                )
                            })
                        }


                    </div>
                    <div className="synth-visualizations mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/*Render SynthVisualization components for each synth implementation*/}
                        {/*<SynthVisualization synthType="Synth"/>*/}
                        {/*<SynthVisualization synthType="FMSynth"/>*/}
                        {/*<SynthVisualization synthType="Implementation2"/>*/}
                        {/*<SynthVisualization synthType="Implementation3"/>*/}
                        ...
                    </div>
                </div>
            </div>
        </SynthContextProvider>
    );
};

export default SynthDashboard;
