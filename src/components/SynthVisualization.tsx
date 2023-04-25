// SynthVisualization.tsx
import React, {useRef, useEffect} from 'react';
import * as Tone from 'tone';
import {useSynthContext} from './SynthContext';

interface SynthVisualizationProps {
    synthType: string;
}

export const SynthVisualization: React.FC<SynthVisualizationProps> = ({synthType}) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const analyserRef = useRef<Tone.Analyser | null>(null);
        const synthContext = useSynthContext();
        const animationFrameIdRef = useRef<number | null>(null);

        const synth = synthContext[synthType as keyof typeof synthContext] as
            | Tone.Synth
            | Tone.FMSynth
            | Tone.AMSynth
            | Tone.DuoSynth
            | Tone.MembraneSynth
            // | Tone.PolySynth<any>
            | null;

        useEffect(() => {
            if (!synth) return;

            // Create an analyser node for the specific synthType prop
            analyserRef.current = new Tone.Analyser('waveform', 1024);
            synth.connect(analyserRef?.current);


            return () => {
                // Clean up the analyser node when the component is unmounted
                synth.disconnect();
                analyserRef.current = null;
            };
        }, [synth]);
        useEffect(() => {
            if (!canvasRef.current || !analyserRef.current) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const drawWaveform = () => {
                const waveformArray = analyserRef?.current?.getValue();
                if (!(waveformArray instanceof Float32Array)) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let i = 0; i < waveformArray.length; i++) {
                    const x = (canvas.width * i) / waveformArray.length;
                    const y = ((waveformArray[i] + 1) / 2) * canvas.height;
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.strokeStyle = '#4c4c4c';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Call the drawWaveform function in a loop using requestAnimationFrame and store the ID
                animationFrameIdRef.current = requestAnimationFrame(drawWaveform);
            };

            // Initial call to drawWaveform
            drawWaveform();

            // Clean up when component is unmounted
            return () => {
                // Cancel the animation frame using the stored ID
                if (animationFrameIdRef.current !== null) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                }
            };
        }, [canvasRef, analyserRef, synthContext]);


        return (
            <div className={`synth-visualization pt-10 ${synthType}`}>
                <h3 className="text-xl font-bold mb-4">{synthType} Visualization</h3>
                <div className="relative w-full h-48">
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"/>
                </div>
            </div>
        );
    }
;
