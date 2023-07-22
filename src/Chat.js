import { StompSessionProvider, useSubscription, useStompClient } from 'react-stomp-hooks';
import { useState, useEffect } from 'react';
import {StompHeaders} from "@stomp/stompjs";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWZhdWx0QGFkbWluIiwiaWF0IjoxNjg5MDMzMTg4LCJleHAiOjE2ODkwMzkxODh9.IUV_0REAhhsFVkTS6uGhgK80LU-KZgWjW26Cpmznwow";

const ChatComponent = () => {

    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");

    // Adjust the onMessage function to parse the body to a JSON object
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
                name: typedMessage
            })
        });
        setTypedMessage("");
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) =>
                    <li key={index}> {msg.content} </li>
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
        // fetch('http://localhost:8080/generateTicket')
        //     .then(response => response.text())
        //     .then((ticket) => {
        //         setTicket(ticket);
        //     });
        setTicket("3bdb92cb-e5f5-4848-811c-2cd56bb47ca6")
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
