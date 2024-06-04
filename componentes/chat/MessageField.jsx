'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';
import './MessageField.css'; // Importar el archivo CSS

const MessageField = ({ roomId, correo }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        await axios.post(`/api/message/create`, {
            text: data.message,
            roomId,
            correo,
        });
        reset();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="message-field-form">
            <div className="input-container">
                <Form.Control
                    as="textarea"
                    placeholder="Escribe un mensaje..."
                    {...register("message")}
                    className="message-input"
                />
                <Button type="submit" variant="primary" className="send-button">
                    <FaArrowUp />
                </Button>
            </div>
        </Form>
    );
};

export default MessageField;