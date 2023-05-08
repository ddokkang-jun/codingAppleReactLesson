import React, { useEffect, useState } from "react";

const RecentShowProducts = ({ shoes }) => {
  let [recentProducts, setRecentProducts] = useState([]);

  // console.log(recentProducts);
  // console.log(shoes);

  useEffect(() => {
    let myArr = localStorage.getItem("watch");
    if (myArr == null) {
      myArr = [];
    } else {
      myArr = JSON.parse(myArr);
    }
    setRecentProducts(myArr);
  }, []);

  return (
    <div>
      <h1>최근 본 상품</h1>
      <hr />
      {recentProducts
        ? recentProducts.map((num, index) => (
            <h1 key={index}>{shoes.find((item) => item.id === num).title}</h1>
          ))
        : null}
      <hr />
    </div>
  );
};

export default RecentShowProducts;
