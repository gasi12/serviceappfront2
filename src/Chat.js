import { StompSessionProvider, useSubscription, useStompClient } from 'react-stomp-hooks';
import { useState, useEffect } from 'react';
import {StompHeaders} from "@stomp/stompjs";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyVHlwZSI6InVzZXIiLCJzdWIiOiJkZWZhdWx0QGFkbWluIiwiaWF0IjoxNjkyMDk1Mjc5LCJleHAiOjE2OTIxMDEyNzl9.QjenukxtpbMgzJPLdPAVxceNHzQz78vknNLqVZFbNo0";

const ChatComponent = () => {

    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");

    const onMessage = (message) => {
        let parsedMessage = JSON.parse(message.body);
        console.log(parsedMessage); // Log the server response
        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    useSubscription("/topic/greetings/1", onMessage);

    const stompClient = useStompClient();

    const sendMessage = () => {
        stompClient.publish({
            destination: "/app/hello/1",
            headers: {
                'Authorization': 'Bearer ' + token // Assume 'token' variable contains your actual token
            },
            body: JSON.stringify({
                content: typedMessage,
                author: 'username', // replace 'username' with the actual username
                serviceId: 1, // replace 1 with the actual serviceId
                timestamp: new Date().toISOString() // current date and time
            })
        });
        setTypedMessage("");
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) =>
                    <li key={index}>Author: {msg.author}, Message: {msg.content} </li>
                )}
            </ul>
            <input type="text" onChange={(e) => setTypedMessage(e.target.value)} value={typedMessage} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

const Chat = () => {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        setTicket("1e437e3d-0b99-4198-afd3-3d65a51fda30")
    }, []);

    if (ticket==null) {
        return <div>Loading...</div>;
    }

    return (
        <StompSessionProvider
            url={`http://localhost:8080/gs-guide-websocket?ticket=${ticket}`}
        >
            <ChatComponent />
        </StompSessionProvider>
    );
};

export default Chat;
