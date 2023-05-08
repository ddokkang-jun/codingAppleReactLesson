import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { addList, increaseProductCount } from "../store/store";

const ProductDetail = ({ shoes }) => {
  // console.log("id type = ",typeof(id)); // string
  // console.log("shoes id type = ",typeof(shoes[0].id)); // number
  // 버그있음 x.id === id 하면 에러발생됨. 서로 타입이 다름.
  let { id } = useParams();
  let product = shoes.find((x) => x.id == id);
  let [warningModal, setWarningModal] = useState(true);
  let [orderNumber, setOrderNumber] = useState(0);
  let [orderAlert, setOrderAlert] = useState(false);
  let [탭, 탭변경] = useState(0);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();
  let productsFromStore = useSelector((state) => state.products);

  useEffect(() => {
    let myArr = localStorage.getItem('watch');
    if(myArr == null){
      myArr = [];
    }else{
      myArr = JSON.parse(myArr);
    }

    myArr.push(product.id);
    myArr = new Set(myArr);
    myArr = Array.from(myArr);
    localStorage.setItem('watch',JSON.stringify(myArr));

  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    let a = setTimeout(() => {
      setWarningModal(false);
    }, 5000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    if (isNaN(orderNumber) == true) {
      setOrderAlert(true);
    } else {
      setOrderAlert(false);
    }
  }, [orderNumber]);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, []);

  return (
    <div className={"container start " + fade}>
      {warningModal == true ? (
        <div className='alert alert-warning'>5초후에 사라짐</div>
      ) : null}

      <div className='row'>
        <div className='col-md-6'>
          <img src={product.imageAddress} width='100%' alt='' />
        </div>
        <div className='col-md-6 product-detail-area'>
          <h4 className='pt-5'>{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}원</p>
          <input
            type='text'
            placeholder='주문하실 상품의 수량을 숫자로 입력해주세요'
            onChange={(event) => setOrderNumber(event.target.value)}
          />
          {orderAlert == true ? (
            <div className='alert alert-warning'>
              숫자만 입력하실 수 있습니다.
            </div>
          ) : null}
          {productsFromStore.find((item) => item.id == product.id) ? (
            <button
              className='btn btn-danger order-btn'
              onClick={() => {
                dispatch(increaseProductCount(product.id));
              }}>
              위시리스트에 추가하기
            </button>
          ) : (
            <button
              className='btn btn-danger order-btn'
              onClick={() => {
                dispatch(addList(product));
              }}>
              위시리스트에 추가하기
            </button>
          )}
        </div>
      </div>
      <TabsExample 탭={탭} 탭변경={탭변경} />
    </div>
  );
};

function TabsExample({ 탭, 탭변경 }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [탭]);

  return (
    <>
      <Nav
        fill
        variant='tabs'
        defaultActiveKey='link-1'
        className='detailPage-tab-btn'>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey='link-1'>
            Option 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey='link-2'>
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey='link-3'>
            Option 3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className={"detailPage-tab start " + fade}>
        {
          [
            <div className='detailPage-tab-description'>내용0</div>,
            <div className='detailPage-tab-description'>내용1</div>,
            <div className='detailPage-tab-description'>내용2</div>,
          ][탭]
        }
      </div>
    </>
  );
}

export default ProductDetail;
