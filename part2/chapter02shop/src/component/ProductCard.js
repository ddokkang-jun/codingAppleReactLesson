import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ shoes }) => {
  let navigate = useNavigate();
  return (
    <>
      <div
        className='col-md-4'
        onClick={() => {
          navigate("/detail/" + shoes.id);
        }}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant='top' src={shoes.imageAddress} />
          <Card.Body>
            <Card.Title className='card-title'>{shoes.title}</Card.Title>
            <Card.Text>{shoes.price}원</Card.Text>
            <Button
              variant='primary'
              onClick={() => {
                navigate("/detail/" + shoes.id);
              }}>
              제품보기
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
