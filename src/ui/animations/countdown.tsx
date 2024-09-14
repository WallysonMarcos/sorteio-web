'use client';

import Lottie from 'react-lottie-player';
import lottieJson from '@/ui/lotties/countdown.json';

 

export default function CountdownAnimation( ) {
    
    return (
        <div className="flex justify-center py-0">
            <Lottie
                loop
                animationData={lottieJson}
                play
                className='w-[90%] h-[90%]' 
            />
    </div> 
    )
        
}