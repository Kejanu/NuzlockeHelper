import React, {useEffect, useState} from 'react';
import {homeRemote} from "../remotes/homeRemote";

const Home = () => {

    const [restMessage, setRestMessage] = useState("");
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [connected, setConnected] = useState<boolean>(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string>("");

    const [selectValue, setSelectValue] = useState<string>("");

    const selectChanged = (value: string) => {
        setSelectValue(value);
        send(value);
    }

    useEffect(() => {
        homeRemote.fetchRestMessage()
            .then((result: any) => {
                setRestMessage(result.text);
            })
    }, []);

    const connect = () => {
        if (socket !== null) {
            return;
        }

        console.log("Clicked for: " + name);
        const initSocket = new WebSocket("ws://localhost:8080" + "/chat/" + name);
        initSocket.onopen = () => {
            console.log("Connected to socket");
            setConnected(true);
        };
        initSocket.onmessage = (message) => {
            console.log("Got message: " + message.data);
            setSelectValue(message.data);
            setMessages(prevState => (prevState + "\n" + message.data));
        }
        setSocket(initSocket);
    }

    const send = (message: string) => {
        if (socket === null) {
            return;
        }

        socket.send(message);
    }

    return (
        <div className={'tw-grid tw-grid-cols-2'}>
            <div>
                Name: <input type="text" onChange={e => setName(e.target.value)}/>
                <button className={'tw-outline'} type="button" onClick={connect}>
                    Connect
                </button>
            </div>
            <div>
                Text: <input type="text" onChange={(e) => setInput(e.target.value)}/>
                <button className={'tw-outline'} type="button" onClick={e => send(input)}>
                    Send
                </button>
            </div>

            <textarea className={'tw-col-span-2 tw-outline tw-h-40'} value={messages} readOnly={true}/>

            <select className={'tw-col-span-2 tw-mt-4'} onChange={e => selectChanged(e.target.value)}>
                <option>First</option>
                <option>Second</option>
                <option>Third</option>
            </select>
        </div>
    )
}

export default Home;