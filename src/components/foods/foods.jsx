import React, { useState } from "react";
import Img from "../../assets/images/miliy.jpg";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useCount from "../../hooks/useCount";

const restaurants = gql`
  query ($productsId: ID!) {
    products(id: $productsId) {
      name
      id
      price
      res
    }
  }
`;
const Foods = () => {
  const [count, setCount] = useCount();
  const { id } = useParams();
  const [id1, setId] = useState(null);
  const { data, loading, error } = useQuery(restaurants, {
    variables: { productsId: id },
  });

  const local = data?.products.find((e) => e.id == id1);
  setCount(local);
  let json = JSON.parse(localStorage.getItem("order"));

  const [local1, setLocal1] = useState(json || []);

  useEffect(() => {
    if (local) {
      setLocal1([...local1, local]);
    }
  }, [local]);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(local1));
  }, [local1]);

  return (
    <div>
      <div className="col">
        {data?.products &&
          data?.products?.map((e) => (
            <div className="card p-5 d-flex flex-row my-3" key={e.id}>
              <img src={Img} alt="" width={300} height={200} />
              <div className="w-100 d-flex justify-content-center align-items-center flex-column">
                <h2 className="text-center">{e.name}</h2>
                <h3 className="text-center">Narxi {e.price}</h3>
                <div
                  className="w-100 d-flex justify-content-center "
                  style={{ userSelect: "none" }}
                ></div>
                <button
                  className="btn btn-primary"
                  id={e.id}
                  onClick={(e) => {
                    setId(e.target.id);
                    window.location.reload();
                  }}
                >
                  Qushish
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Foods;
