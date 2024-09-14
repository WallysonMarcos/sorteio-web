'use client'

import { GetLocalStorateData, SetLocalStorateData } from '@/lib/actions';
import { ParticipantType } from '@/lib/types';
import PeoplesAnimation from '@/ui/animations/peoples';
import { ArrowLeftIcon, CheckBadgeIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Card, Icon, List, ListItem, Title } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom';



export default function Page() {

    const router = useRouter();
    const [participants, setParticipants] = useState<ParticipantType[]>([])
    const [nameInput, setNameInput] = useState('');

    useEffect(() => {
        const init = async () => {
            const storage = await GetLocalStorateData();
            setParticipants([...storage]);
        }

        init();
    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const names = nameInput.split(',');
        const _participants = [...participants];
        names.map((p, index) => _participants.push({ id: participants.length + index, name: p, win: false }));
        setParticipants(_participants);
        setNameInput('');
    }

    const onSaveList = () => {
        SetLocalStorateData(participants);
        router.push('/');
    }

    const onCleanList = () => {
        SetLocalStorateData([]);
        setParticipants([]);
    }

    const onDeleteParticipants = (id: number) => {
        let _participants = [...participants];
        setParticipants([..._participants.filter((e) => e.id != id)]);
    }

    return (
        <main className="p-2 mt-4 mx-auto max-w-4xl">
            <form onSubmit={handleSubmit} className='border-b border-gray-900/10 pb-4'>
                <div className="space-y-4">
                    <PeoplesAnimation height={200} width={500} />
                    <div className='flex gap-4'>
                        <Icon className="mb-4" style={{ cursor: 'pointer' }} icon={ArrowLeftIcon} variant='light' size='sm' color='green' onClick={() => router.back()} />
                        <Title className="mb-4 ">Cadastrar Participante(s)</Title>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                value={nameInput ?? ''}
                                type="text"
                                name="first-name"
                                id="first-name"
                                required
                                minLength={2}
                                onChange={(e) => { setNameInput(e.target.value) }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => { setNameInput('') }} className="text-sm font-semibold leading-6 text-gray-900" >
                        Limpar
                    </button>
                    <FormButton />

                </div>
            </form>

            <Card className="p-2 mt-8 mx-auto max-w-4xl  ">
                <Title>Lista de Particiante(s)</Title>
                <List className="mt-4 h-80  scroll-auto overflow-auto">
                    {
                        participants?.map((item) => (
                            <ListItem key={item.name}>
                                <span>{item.name}</span>
                                <Icon size="sm" color={'orange'} icon={TrashIcon} onClick={() => { onDeleteParticipants(item.id) }} style={{ cursor: 'pointer' }} />
                            </ListItem>
                        ))}
                </List>
            </Card>

            <div className="mt-4 flex items-center justify-end gap-x-6">

                <Button icon={TrashIcon} color='amber' onClick={() => { onCleanList() }}>Limpar Lista</Button>
                <Button icon={CheckBadgeIcon} color='green' onClick={() => { onSaveList() }}>Salvar Lista</Button>
            </div>
        </main>
    )
}

const FormButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' icon={PlusCircleIcon} disabled={pending} color='sky'>Adicionar</Button>
    )
}