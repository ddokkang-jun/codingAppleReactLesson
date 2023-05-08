import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { Button } from "react-bootstrap";
import axios from "axios";
import ProductCard from "./ProductCard";
// http://localhost:5000/products
//https://codingapple1.github.io/shop/data2.json
// json-server --watch db.json --port 5000

const Home = ({ shoes }) => {
  let [copiedShoes, setCopiedShoes] = useState(shoes);
  let [buttonClickCount, setButtonClickCount] = useState(1);
  let [noMoreProductsAlert, setNoMoreProductsAlert] = useState(false);
  let [loading, setLoading] = useState(false);
  // console.log("buttonClickCount :",buttonClickCount);

  return (
    <div>
      <Banner />
      <div className='container product-container'>
        <div className='row'>
          {copiedShoes.map((item, i) => {
            return <ProductCard key={i} shoes={item} />;
          })}
        </div>
      </div>
      {loading == true ? (
        <div className='alert alert-warning'>데이터로딩중...</div>
      ) : null}
      {noMoreProductsAlert == true ? (
        <div className='alert alert-warning'>더이상 상품이 없습니다.</div>
      ) : null}
      <div className='more-btn'>
        <Button
          variant='primary'
          onClick={() => {
            setLoading(true);
            setButtonClickCount(buttonClickCount + 1);
            if (buttonClickCount == 1) {
              axios
                .get("https://codingapple1.github.io/shop/data2.json")
                .then((result) => {
                  let copy = [...copiedShoes, ...result.data];
                  setCopiedShoes(copy);
                });
            } else if (buttonClickCount == 2) {
              axios
                .get("https://codingapple1.github.io/shop/data3.json")
                .then((result) => {
                  let copy = [...copiedShoes, ...result.data];
                  setCopiedShoes(copy);
                });
            } else {
              setNoMoreProductsAlert(true);
            }
            setLoading(false);
          }}>
          상품더보기
        </Button>
      </div>
    </div>
  );
};

export default Home;
