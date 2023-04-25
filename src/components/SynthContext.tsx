// SynthContext.tsx
import React, {createContext, useContext} from 'react';
import * as Tone from 'tone';
import {Synth} from "tone";

interface SynthInstances {
    ToneSynth: Tone.Synth | null;
    FMSynth: Tone.FMSynth | null;
    AMSynth: Tone.AMSynth | null;
    DuoSynth: Tone.DuoSynth | null;
    MembraneSynth: Tone.MembraneSynth | null;
    // PolySynth: Tone.PolySynth | null;
    // Implementation6: Tone.PolySynthOptions<SynthInstances> | null;
    // Add more implementations as needed
}

const defaultSynthInstances: SynthInstances = {
    ToneSynth: null,
    FMSynth: null,
    AMSynth: null,
    DuoSynth: null,
    MembraneSynth: null,
};

const SynthContext = createContext<SynthInstances>(defaultSynthInstances);

export const useSynthContext = () => {
    return useContext(SynthContext);
};

interface SynthContextProviderProps {
    children: React.ReactNode;
}

export const SynthContextProvider: React.FC<SynthContextProviderProps> = ({children}) => {
    const [synthInstances, setSynthInstances] = React.useState<SynthInstances>(defaultSynthInstances);

    React.useEffect(() => {
        setSynthInstances({
            ToneSynth: new Tone.Synth(),
            FMSynth: new Tone.FMSynth(),
            AMSynth: new Tone.AMSynth(),
            DuoSynth: new Tone.DuoSynth,
            MembraneSynth: new Tone.MembraneSynth(),
            // PolySynth: new Tone.PolySynth<Synth>()
            // Add more implementations as needed
        });
    }, []);

    return <SynthContext.Provider value={synthInstances}>{children}</SynthContext.Provider>;
};
