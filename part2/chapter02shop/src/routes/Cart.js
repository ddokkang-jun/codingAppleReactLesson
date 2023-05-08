import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RecentShowProducts from '../component/RecentShowProducts';
import { decreaseProductCount, deleteList, increaseProductCount } from "../store/store";

const Cart = ({shoes}) => {
  let products = useSelector((state) => state.products);
  let dispatch = useDispatch();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>장바구니상품삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {products
            ? products.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name ? item.name : item.title}</td>
                  <td>{item.count}</td>
                  <td>
                    <button
                      onClick={() => {
                        dispatch(increaseProductCount(item.id));
                      }}>
                      +
                    </button>
                    <button
                      onClick={() => {
                        dispatch(decreaseProductCount(item.id));
                      }}>
                      -
                    </button>
                  </td>
                  <td><button onClick={()=>{
                    dispatch(deleteList(item.id));
                  }}>Delete</button></td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      <RecentShowProducts shoes={shoes} />
    </div>
  );
};

export default Cart;
