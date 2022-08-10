import React, { useState } from "react";
import { useEffect } from "react";
import Img from "../../assets/images/miliy.jpg";
import { useMutation, gql } from "@apollo/client";

const orders = gql`
  mutation (
    $orderName: String!
    $orderUserName: String!
    $orderUserNumber: String!
    $orderedUserLocation: String!
  ) {
    neworder(
      orderName: $orderName
      orderUserName: $orderUserName
      orderUserNumber: $orderUserNumber
      orderedUserLocation: $orderedUserLocation
    ) {
      id
      orderedTime
      orderedUserLocation
      orderName
      orderUserName
      orderUserNumber
    }
  }
`;

const Carzinka = () => {
  // const [newOrder, setNewOrder] = useState({});
  const [order1, setOrder] = useState([]);

  const [newOrder] = useMutation(orders);

  let [order, setCorz] = useState();
  const [a, setA] = useState();
  useEffect(() => {
    setCorz(JSON.parse(window.localStorage.getItem("order")) || []);
  }, [a]);
  const handleChageInput = (evt, data) => {
    let value = evt.target.value;
    data.count = value;

    const filteredOrders = order?.filter((e) => e?.id != evt.target?.id);

    setOrder([...filteredOrders, data]);
  };

  let zakaz = "";
  for (let dat of order1 || []) {
    zakaz += `${dat.count} ta ${dat.name} `;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, adres, number } = e.target.elements;

    newOrder({
      variables: {
        orderName: zakaz,
        orderUserName: user.value,
        orderUserNumber: adres.value,
        orderedUserLocation: number.value,
      },
    });
    localStorage.removeItem("order");
    window.location.reload(true);

    setA(1);
  };

  const handleDelete = (e) => {
    order = order.filter((ele) => ele.id !== e.target.id);
    console.log(order);
    localStorage.setItem("order", JSON.stringify(order));

    setA(1);
    window.location.reload(true);
  };

  return (
    <div className="row">
      <div className="col-6 scroll">
        {order?.map((e) => (
          <div className="card p-5 d-flex flex-row my-3" key={Math.random()}>
            {console.log(e)}
            <img src={Img} alt="" width={300} height={200} />
            <div className="w-100 d-flex justify-content-center align-items-center flex-column">
              <h2 className="text-center">Lavash</h2>
              <h3 className="text-center">Narxi 20 000</h3>
              <div className="d-flex w-100 justify-content-center">
                <button
                  className="btn btn-danger mx-3"
                  id={e.id}
                  onClick={(e) => handleDelete(e)}
                >
                  O'chirish
                </button>
                <input
                  type="number"
                  className="form-control w-25"
                  name=""
                  value={1}
                  id={e.id}
                  onKeyUp={(evt) => handleChageInput(evt, e)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-6">
        <form
          action=""
          className="form-control h-100 d-flex flex-column justify-content-center align-items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1>Buyurtma berish</h1>
          <input
            name="user"
            type="text"
            className="form-control my-3"
            placeholder="Ism Famliya"
          />
          <input
            name="adres"
            type="text"
            className="form-control my-3"
            placeholder="Manzilni kiriting"
          />
          <input
            name="number"
            type="number"
            className="form-control my-3"
            placeholder="Tel Raqamingizni kiriting"
          />
          <button className="btn btn-primary w-100 mt-4">Byutma Berish</button>
        </form>
      </div>
    </div>
  );
};

export default Carzinka;
