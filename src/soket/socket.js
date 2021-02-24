import React, { useEffect, useState, useReducer } from 'react';
import io from 'socket.io-client';

const initialState = {
    messages: [],
    // message: '',
};

function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        // case 'ON_INITIAL_MESSAGE':
        //     return { ...state, chatMessages: payload };
        case 'ON_MESSAGE_CHANGE':
            return { ...state, messages: [payload, ...state.messages] };
        default:
            return state;
    }
}

function SocketInd() {
    const socket = io('http://localhost:3001/sockettesting', { transports: ['websocket', 'polling', 'flashsocket'] });
    const [state, dispatch] = useReducer(reducer, initialState)
    const [userId, setUserId] = useState(Math.floor(Math.random() * 15))
    const room = '002010020023'
    const [isRoomJoin, setIsRoomJoin] = useState(false)

    useEffect(() => {
        // socket.emit('testing', { name: 'zain' })
        setupListner()
    }, [])

    function handleJoinRoom() {
        socket.emit('join-room', { userId, room })
        setIsRoomJoin(!isRoomJoin)
    }

    function setupListner() {
        socket.on('new-message', payload => {
            console.log('new-message', payload)
            dispatch({ type: 'ON_MESSAGE_CHANGE', payload: { msgs: payload.msgs } });
        })
    }

    function handleSendNotification() {
        let snglMsg = `${userId}${room}${Math.floor(Math.random() * 15)}`
        socket.emit('new-message', { userId, room, msgs: snglMsg })
        // dispatch({ type: 'ON_MESSAGE_CHANGE', payload: { msgs: snglMsg } });
    }

    return (
        <div>
            {console.log(state.messages)}
            <button onClick={handleJoinRoom}>Hit me to join room on socket</button>
            {isRoomJoin &&
                <button onClick={handleSendNotification}>Hit me to send notification on socket</button>
            }
        </div>
    )
}

export default React.memo(SocketInd);