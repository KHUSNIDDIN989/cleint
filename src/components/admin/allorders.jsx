import React, { useState } from "react";
import "./adminRest.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const orders = gql`
  query {
    orders {
      id
      orderedTime
      orderedUserLocation
      orderName
      orderUserName
      orderUserNumber
    }
  }
`;

const DeleteOrder = gql`
  mutation ($deleteorderId: ID!) {
    deleteorder(id: $deleteorderId) {
      orderName
    }
  }
`;

const AllOrder = () => {
  const { data, loading, error } = useQuery(orders);
  const [deleteOrder] = useMutation(DeleteOrder);

  const handleDelete = (e) => {
    deleteOrder({
      variables: {
        deleteorderId: e.target.id,
      },
    });
    window.location.reload();
  };

  return (
    <div className="p-4 mt-5">
      <table className="table-hover table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Faydalanuvchi</th>
            <th scope="col">Faydalanuvchi Tel</th>
            <th scope="col">Manizil</th>
            <th scope="col">Byurtmalar</th>
            <th scope="col">Vaqti</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data?.orders?.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.orderUserName}</td>
              <td>{e.orderUserNumber}</td>
              <td>{e.orderedUserLocation}</td>
              <td>{e.orderName}</td>
              <td>{e.orderedTime.split("T")[0]}</td>

              <td
                className="cursor fs-4 fw-bold text-danger"
                id={e.id}
                onClick={(e) => handleDelete(e)}
              >
                x
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrder;
