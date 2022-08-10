import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Img from "../../assets/images/miliy.jpg";
import { useQuery, gql } from "@apollo/client";

import "./products.css";
const restaurants = gql`
  query ($restarauntId: ID!) {
    restaraunt(id: $restarauntId) {
      id
      name
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
      <div className="row justify-content-around mt-5">
        {data &&
          data.restaraunt.map((e) => (
            <div className="col-5 my-3" key={e.id}>
              <Link to={`/food/${e.id}`}>
                <div
                  className="card_product card"
                  style={{
                    backgroundImage: `url(${Img})`,
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
