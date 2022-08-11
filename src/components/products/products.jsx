import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Wifi from "../../assets/images/wifi.svg";
import { useQuery, gql } from "@apollo/client";

import "./products.css";
const restaurants = gql`
  query ($restarauntId: ID!) {
    restaraunt(id: $restarauntId) {
      id
      name
      img
    }
  }
`;
const Products = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(restaurants, {
    variables: { restarauntId: id },
  });
  console.log();
  return (
    <div>
      {loading && (
        <div className="wifi d-flex w-100 h-100 justify-content-center align-items-center ">
          <img class="ldld" src={Wifi}></img>
        </div>
      )}
      <div className="row justify-content-around mt-5">
        {data &&
          data.restaraunt.map((e) => (
            <div className="col-5 my-3" key={e.id}>
              <Link to={`/food/${e.id}`}>
                {console.log(e)}
                <div
                  className="card_product card"
                  style={{
                    backgroundImage: `url(${e.img})`,
                  }}
                >
                  <div className="bg title_1"></div>
                  <h1>{e.name}</h1>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
