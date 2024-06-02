"use client";
import { ToastContainer, toast } from "react-toastify";
import { LoadingContext } from "@/context/LoadingProvider";
import { signIn, useSession } from "next-auth/react";
import {  redirect } from 'next/navigation';
import { useContext } from 'react';
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Page() {
    const { data: session } = useSession();
    const { setIsLoading } = useContext(LoadingContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            email: '',
            password: ''
        }
    });

    if (session?.user) {
        redirect('/');
    }

    const loginUser = async (data) => {
        setIsLoading(true);
        console.log(data);

        const res = await signIn("credentials", {
            ...data,
            callbackUrl: `${window.location.origin}/`,
            redirect: false,
        });
        reset();

        setIsLoading(false);

        if (res?.error) {
            toast.warning("Credenciales incorrectas.");
        }
    };

    const onError = (error) => {
        console.log("ERROR:::", error);
    };

    return (
        <>
            <ToastContainer />
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow-lg p-4">
                            <Card.Body>
                                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                                <Form onSubmit={handleSubmit(loginUser, onError)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Correo</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingresar correo"
                                            {...register("email", { required: "Correo es obligatorio" })}
                                        />
                                        {errors.email && (
                                            <Form.Text className="text-danger">
                                                {errors.email.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Ingresar contraseña"
                                            {...register("password", { required: "Contraseña es obligatoria" })}
                                        />
                                        {errors.password && (
                                            <Form.Text className="text-danger">
                                                {errors.password.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Iniciar Sesión
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