'use client'
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation'
import { LoadingContext } from '@/context/LoadingProvider';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setIsLoading } = useContext(LoadingContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      roomName: '',
    }
  });
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

  const createRoom = async (data) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomName: data })
      });
      const room = JSON.parse(await res.text());
      if (room.error) {
        toast.warning("Existe room con ese nombre.");
        setIsLoading(false)
        return;
      }
      router.push(`/room/${room.id}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const joinRoom = async (data) => {
    setIsLoading(true)
    const res = await fetch('/api/rooms/findRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomName: data })
    });
    const textResponse = await res.text();

    if (textResponse=="null") {
      toast.warning("No existe room con ese nombre.");
      setIsLoading(false)
      return;
    }

    // Si esperas un JSON, conviértelo a JSON después de leer el texto
    const room = JSON.parse(textResponse);
    router.push(`/room/${room.id}`)
    setIsLoading(false)
  }

  return (
    <>
    <ToastContainer />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-lg p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Rooms</h2>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar nuevo room"
                      {...register("roomName", { required: "El nombre del room es obligatorio" })}
                    />
                    {errors.roomName && (
                      <Form.Text className="text-danger">
                        {errors.roomName.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Row>
                  <Col>
                    <Button variant="primary"
                      type="button"
                      onClick={handleSubmit(({ roomName }) => createRoom(roomName))}
                      className="w-100 mb-2">
                      Create
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="secondary"
                      type="button"
                      onClick={handleSubmit(({ roomName }) => joinRoom(roomName))}
                      className="w-100">
                      Join
                    </Button>
                  </Col>
                </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Page