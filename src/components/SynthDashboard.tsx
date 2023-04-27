import React, {useEffect, useState} from 'react';
import {SynthControl} from './SynthControl';
import {SynthVisualization} from './SynthVisualization';
import {SynthContextProvider, useSynthContext} from "./SynthContext";
import {WorkstationSynthControl} from './WorkstationSynthControl'
// import {PolySynthControl} from './PolySynthControl.tsx.txt'
import * as Tone from "tone"
import {Sequencer} from "./Sequencer";
import {TodoList} from "./TodoList";
import {ThreeDimensions} from "./ThreeD/ThreeDimensions";


const SynthDashboard: React.FC = () => {
    const [rerender, startRerender] = useState(0)
    const startTone = async () => {
        startRerender((rerender) => rerender + 1)
        await Tone.start().then(() => {
            console.log("tone started")
        })
    }

    useEffect(() => {
        console.log(rerender, "count");
        (async () => {
            await startTone()
        })()

    }, [])


    return (
        <>
            <SynthContextProvider>
                <div onClick={async () => {
                    await startTone()
                }} className="min-h-screen bg-gray-700 py-3 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-5xl mx-auto center ">

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
                        <div className={`todoList justify-end align-baseline`}>
                            <TodoList/>
                        </div>
                    </div>
                </div>
            </SynthContextProvider></>
    )
};

export default SynthDashboard;
