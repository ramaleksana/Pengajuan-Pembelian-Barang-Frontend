import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const { username } = useAuth();
    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="text-center mt-5">
                    <h3>Selamat datang, {username}</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
