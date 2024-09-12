'use client';

import Lottie from 'react-lottie-player';
import lottieJson from '@/ui/lotties/winner.json';
import { Card, Icon, Title } from '@tremor/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type loadingProps = {
    name: string
    onClose: Function;
    width?: number;
    height?: number;
}


export default function WinnerAnimation(props: loadingProps) {
    

    return (
        <Card className="flex justify-center ">
            <Icon className=" absolute  right-1 top-1" 
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
                style={{ width: props.width || 250, height: props.height  || 250 }}
            />
            <Title className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-green-900">
                {`${props.name}`}                 
                <p className='mt-4'>🥳</p>
            </Title>
            
    </Card> 
    )
        
}