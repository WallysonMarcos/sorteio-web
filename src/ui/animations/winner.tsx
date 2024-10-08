'use client';

import Lottie from 'react-lottie-player';
import lottieJson from '@/ui/lotties/winner.json';
import { Card, Icon, Title } from '@tremor/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type loadingProps = {
    name: string
    onClose: Function; 
}


export default function WinnerAnimation(props: loadingProps) {
    

    return (
        <Card className="flex justify-center">
            <Icon className="absolute right-1 top-1" 
                style={{ cursor: 'pointer' }} 
                icon={XMarkIcon} 
                variant='light' 
                size='sm' 
                color='green' 
                onClick={ () => props.onClose()} />
            <Lottie
                loop
                animationData={lottieJson}
                play 
            />
            <div className='absolute h-full w-full flex flex-col items-center justify-center'>
                <p className="text-center font-bold text-green-900 text-6xl	">
                    {`${props.name}`}      
                </p>
                <p className='mt-4 text-6xl'>🥳</p>
            </div> 
    </Card> 
    )
        
}