import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./body.css";
import { useQuery, gql } from "@apollo/client";

// const restaurants = gql`
//   query ($restarauntId: ID!) {
//     restaraunt(id: $restarauntId) {
//       id
//       name
//     }
//   }
// `;
const Body = () => {
  // const [cotegorys, setCotegory] = useState("");
  // const { data, loading, error } = useQuery(restaurants, {
  //   // variables: { cotegory: cotegorys },
  // });
  // console.log(cotegorys);
  return (
    <div className="row justify-content-around mt-5">
      <div className="col-5">
        <Link to="/product/1">
          <div className="card">
            <div className="img_1  d-flex justify-content-center align-items-center">
              <h1 className="title_1 ">Fasd Food</h1>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-5">
        <Link to="/product/2">
          <div className="card">
            <div className="img_2">
              <div className="title_1">
                <h1>Miliy Taomlar</h1>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Body;
