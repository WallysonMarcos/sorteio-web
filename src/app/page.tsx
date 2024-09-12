'use client';

import { PlayIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Button, Card, List, ListItem, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Countdown from '@/ui/animations/countdown';
import Link from 'next/link';
import useSound from 'use-sound';


import { ParticipantType } from '@/lib/types';
import { delay, generateRandonIndex, GetLocalStorateData } from '@/lib/actions';
import WinnerAnimation from '@/ui/animations/winner';
import GiftsAnimation from '@/ui/animations/gifts';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 0,
    transform: 'translate(-50%, -50%)',
  },
};

export default function Home() {


  const [participants, setParticipants] = useState<ParticipantType[]>([])
  const [winners, setWinners] = useState<ParticipantType[]>([])
  const [winner, setWinner] = useState<ParticipantType>();
  const [modalIsOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [playCountdonw] = useSound('/sounds/top5.mp3', { playbackRate: 1.3 })
  const [playWinner] = useSound('/sounds/winner.mp3')

  useEffect(() => {
    const storage = GetLocalStorateData();
    setParticipants([...storage]);
  }, [])


  const onSortParticipant = async () => {

    const _participants = [...participants];

    if (_participants.length > 0) {
      playCountdonw();
      setLoading(true);
      setModalOpen(true);
      await delay(5000);
      const _index = generateRandonIndex(0, _participants.length);
      const _winner = _participants[_index];
      _winner.win = true;
      setWinner(_winner);
      setWinners([_winner, ...winners]);
      setLoading(false)
      playWinner();
      setParticipants([..._participants.filter((e) => e.id != _winner.id)]);
    } else {
      alert('Cadastre novos participantes!');
    }

  }


  return (
    <main className="flex min-h-screen flex-col items-center p-4 mx-auto max-w-3xl ">

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => { if (!loading) setModalOpen(false) }}
        style={customStyles} >
        {
          loading ?
            (<Countdown height={900} width={900} />) :
            (<WinnerAnimation name={winner?.name || ''} height={600} width={600} onClose={() => { setModalOpen(false) }} />)
        }
      </Modal>

      <GiftsAnimation height={150} width={300} />
      <Title className="m-2 text-6xl font-bold tracking-tight text-green-900 ">Sorteio de Brindes</Title>


      <Card decoration={'top'} decorationColor={'green'} key={'lastsorts'} className="p-2 mt-4">
        <Title className="text-2xl" >Último(s) Sorteado(s)</Title>
        <List className="px-2 mt-2 max-h-60 scroll-auto overflow-auto">
          {
            winners.length > 0 ?
              (
                winners?.map((item, index) => (
                  <ListItem key={item.name}>
                    <span className={` ${index == 0 ? 'font-bold text-lg text-green-600' : 'font-normal text-base  text-gray-600'}`}>{`• ${item.name} ${index == 0 ? '🥳' : ''}`}</span>
                  </ListItem>
                ))
              ) :
              (
                <ListItem key={'none-winner'}>
                  <span className='text-base  text-gray-600'>{` ... `}</span>
                </ListItem>
              )

          }
        </List>
      </Card>

      <Button className='m-2 w-full' disabled={participants.length == 0} icon={PlayIcon} color='green' onClick={() => { onSortParticipant() }}>Sortear</Button>

      <Card decoration={'top'} decorationColor={'gray'} key={'listparticipants'} className="p-2 mt-4">
        <Title className="text-2xl" >Lista de Particiante(s)</Title>
        <List className="px-2 mt-2 max-h-60 scroll-auto overflow-auto">
          {
            participants?.map((item) => (
              <ListItem key={item.name}>
                <span className='text-base text-gray-600'>{`• ${item.name} `}</span>
              </ListItem>
            ))}
        </List>
      </Card>

      <Link className='m-2 w-full' href={'/participants'}>
        <Button className='w-full hover:bg-gray-900' icon={UserGroupIcon} color='gray'>Cadastrar Paricipante(s)</Button>
      </Link>

    </main>
  )
}
