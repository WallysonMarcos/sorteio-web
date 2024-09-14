'use client';

const STORAGE_KEY = "@sorteio-web";

export  function GetLocalStorateData() { 
    const store = window.localStorage.getItem(STORAGE_KEY);
    if (store == null) {
        window.localStorage.setItem('@sorteio-web', JSON.stringify({ participants: [] }))
        return []
    } else {
        return JSON.parse(store)
    } 
}

export  function SetLocalStorateData(data: Object) { 
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); 
}

export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}

export const generateRandonIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}