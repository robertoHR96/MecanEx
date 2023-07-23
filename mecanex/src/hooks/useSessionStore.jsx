import React, { useState } from 'react'

export const useSessionStore = (key, initialValue) => {
    /* A function that returns a pair of values: the first is the current value of the local storage item,
    and the second is a function that lets you update the value. */

    const [StoredValue, setStoreValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key.toString())
            return item ? JSON.parse(item) : initialValue
        } catch {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoreValue(value);
            window.sessionStorage.setItem(key.toString(), JSON.stringify(value))
        } catch {
            console.log("error no se ha podido guardar el valor")
        }
    }

    return [StoredValue, setValue]

}
/*
const [StoredValue, setStoreValue] = useState(() => {
    try {
        const item = window.sessionStorage.getItem(key.toString())
        return item ? JSON.parse(item) : initialValue
    } catch {
        return initialValue;
    }
});

const setValue = (value) => {
    try {
        setStoreValue(value);
        window.sessionStorage.setItem(key.toString(), JSON.stringify(value))
    } catch {
        console.log("error no se ha podido guardar el valor")
    }
}
*/