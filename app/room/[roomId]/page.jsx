"use client"
import Messages from "@/componentes/chat/Messages";
import MessageField from "@/componentes/chat/MessageField";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


const Page = ({ params }) => {
    const { data: session } = useSession();
    const { roomId } = params
    const [messages, setMessages] = useState([]);
    console.log(session)

    useEffect(() => {
        const fetchMessages = async () => {
            await axios.get(`/api/message/find`, { params: { roomId } }).then((res) => {
                console.log(res.data.data)
                setMessages(res.data.data);
            });
        };

        fetchMessages();
    }, [roomId]);

    return (
        <Container fluid className="d-flex flex-column vh-100">
            <Row className="flex-grow-1">
                <Col md={{ span: 8, offset: 2 }} className="d-flex flex-column">
                    <Card className="flex-grow-1">
                        <Card.Header>Messages</Card.Header>
                        <Card.Body className="overflow-auto">
                            <Messages roomId={roomId} initialMessages={messages} />
                        </Card.Body>
                        <Card.Footer>
                            <MessageField roomId={roomId} correo={session?.user.email}/>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Page