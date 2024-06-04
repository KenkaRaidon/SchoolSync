"use client";
import { ToastContainer, toast } from "react-toastify";
import { LoadingContext } from "@/context/LoadingProvider";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Page() {
    const { data: session, status } = useSession();
    const { setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true)
        if (!["loading", "authenticated"].includes(status)) {
          setIsLoading(false)
          redirect('/auth/login');
        }
        if (status === "authenticated") {
          setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [status]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            title: '',
            text: '',
            image: '',
        }
    });

    const registerAnnouncement = async (data) => {
        setIsLoading(true);
        const res = await fetch('/api/announcement/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: data.title, text: data.text, image: data.image, correo: session.user.email })
        });
        reset();
        const announcement = JSON.parse(await res.text());
        if (announcement.error) {
            toast.warning(announcement.error);
            setIsLoading(false)
            return;
        }
        toast.success("Announcement created successfully")
        setIsLoading(false);
    };

    return (
        <>
            <ToastContainer />
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow-lg p-4">
                            <Card.Body>
                                <h2 className="text-center mb-4">Anuncios</h2>
                                <Form onSubmit={handleSubmit(registerAnnouncement)}>
                                    <Form.Group className="mb-3" controlId="formBasicTitle">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar Titulo"
                                            {...register("title", { required: "Dato es obligatorio" })}
                                        />
                                        {errors.title && (
                                            <Form.Text className="text-danger">
                                                {errors.title.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Control
                                            as="textarea" rows={3}
                                            placeholder="Ingresar anuncio"
                                            {...register("text", { required: "Dato es obligatorio" })}
                                        />
                                        {errors.text && (
                                            <Form.Text className="text-danger">
                                                {errors.text.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Crear
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}