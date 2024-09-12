'use client';

import Lottie from 'react-lottie-player';
import lottieJson from '@/ui/lotties/participants.json';

type loadingProps = {
    width?: number;
    height?: number
}


export default function PeoplesAnimation(props: loadingProps) {
    

    return (
        <div className="flex justify-center py-0">
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: props.width ?? 250, height: props.height ?? 250 }}
            />
    </div> 
    )
        
}