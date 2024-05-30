"use client";
import { ToastContainer, toast } from "react-toastify";
import { LoadingContext } from "@/context/LoadingProvider";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Page() {
    const { data: session } = useSession();
    const { setIsLoading } = useContext(LoadingContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            role: '',
        }
    });

    const registerRole = async (data) => {
        setIsLoading(true);
        const res = await fetch('/api/roles/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: data.role })
        });
        const role = JSON.parse(await res.text());
        if (role.error) {
            toast.warning(role.error);
            setIsLoading(false)
            return;
        }
        toast.success("Role created successfully")
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
                                <h2 className="text-center mb-4">Crear rol</h2>
                                <Form onSubmit={handleSubmit(registerRole)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar nombre del rol"
                                            {...register("role", { required: "Dato es obligatorio" })}
                                        />
                                        {errors.role && (
                                            <Form.Text className="text-danger">
                                                {errors.role.message}
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