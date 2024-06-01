'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Escribe un mensaje..."
                    {...register("message")}
                />
                <Button type="submit" variant="primary">Enviar</Button>
            </InputGroup>
        </Form>
    );
};

export default MessageField;