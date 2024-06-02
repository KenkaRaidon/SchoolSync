"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();
  const [roles, setRoles] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roleId: ''
    }
  });

  useEffect(() => {
    const getAllRoles = async () => {
      const res = await axios.get("/api/roles/getAll");
      setRoles(res.data);
    };
    getAllRoles();
  }, []);

  const registerUser = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      roleId: data.roleId
    };
    await axios.post('/api/auth/register', userData);
    reset();
  };

  return (
    <>
      <ToastContainer />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-lg p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Crear usuario</h2>
                <Form onSubmit={handleSubmit(registerUser)}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                      type="text"
                      placeholder="Ingresar nombre del usuario"
                      {...register("name", { required: "Dato es obligatorio" })}
                    />
                    {errors.name && (
                      <Form.Text className="text-danger">
                        {errors.name.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Ingresar correo del usuario"
                      {...register("email", { required: "Dato es obligatorio" })}
                    />
                    {errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Ingresar password del usuario"
                      {...register("password", { required: "Dato es obligatorio" })}
                    />
                    {errors.password && (
                      <Form.Text className="text-danger">
                        {errors.password.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRole">
                    <Form.Select
                      id="roleId"
                      {...register("roleId", { required: "Dato es obligatorio" })}
                    >
                      <option value="">Seleccionar rol</option>
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.role}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.roleId && (
                      <Form.Text className="text-danger">
                        {errors.roleId.message}
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