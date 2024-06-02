'use client'
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation'
import { LoadingContext } from '@/context/LoadingProvider';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setIsLoading } = useContext(LoadingContext);
  const [announcement, setAnnouncement] = useState([]);

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

  useEffect(() => {
    const getAllAnnouncement = async () => {
      const res = await axios.get("/api/announcement/getAll");
      setAnnouncement(res.data.data);
    };
    getAllAnnouncement();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // El '0' debe ser '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${month}/${day}/${year} ${hours}:${minutesStr} ${ampm}`;
  };

  console.log(announcement)
  return (
    <>
      <ToastContainer />
      <Container fluid className="d-flex flex-column vh-100">
        <Row className="flex-grow-1">
          <Col md={{ span: 8, offset: 2 }} className="d-flex flex-column">
          <h1>Dashboard</h1>
          <br></br>
            {announcement.map((ano, index) => (
              <div key={index}>
              <Card key={index} className="flex-grow-1 mb-3 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <strong>{ano.userEmail}</strong>: {ano.title}
                </Card.Header>
                <Card.Body className="overflow-auto">
                  {ano.text}
                  {/* {ano.image && <img src={ano.image} alt="Announcement" className="img-fluid mt-3" />} */}
                </Card.Body>
                <Card.Footer className="text-muted text-end">
                  {formatDateTime(new Date(ano.createdAt), 'MM/dd/yyyy')}
                </Card.Footer>
              </Card>
              </div>
            ))
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Page