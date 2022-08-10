import React, { useState } from "react";
import "./adminRest.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const products = gql`
  query {
    product {
      id
      img
      name
      price
      res
      resName
    }
  }
`;
const Restarant = gql`
  query {
    restaraunts {
      id
      name
      res_cotegory_id
    }
  }
`;
const addproduct = gql`
  mutation ($name: String!, $img: String!, $price: Int!, $res: ID!) {
    newproduct(name: $name, img: $img, price: $price, res: $res) {
      id
      img
      name
      price
      res
    }
  }
`;
const DeletePro = gql`
  mutation ($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      name
    }
  }
`;

const AddProduct = () => {
  const { data, loading, error } = useQuery(products);
  const { data: res } = useQuery(Restarant);
  const [addPro] = useMutation(addproduct);
  const [deletePro] = useMutation(DeletePro);
  const [btn, setBtn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, img, price, select } = e.target.elements;

    addPro({
      variables: {
        name: name.value,
        img: "",
        price: +price.value,
        res: select.value,
      },
    });
    window.location.reload();
    e.target.reset();
  };

  const handleDelete = (e) => {
    deletePro({
      variables: {
        deleteProductId: e.target.id,
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
            <th scope="col">Restarant Nomi</th>
            <th scope="col">Maxsulot Nomi</th>
            <th scope="col">Narxlari</th>
            <th>
              <button className="btn btn-primary" onClick={(e) => setBtn(true)}>
                add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.product?.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.resName}</td>
              <td>{e.name}</td>
              <td>{e.price}</td>
              <td
                className="cursor fs-4 fw-bold"
                id={e.id}
                onClick={(e) => handleDelete(e)}
              >
                x
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`modal1 w-50 bg-body ${btn || "active"}`}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="">
              <form
                action=""
                className="form-control"
                onSubmit={(e) => handleSubmit(e)}
              >
                <h1>Mahsulot qushish</h1>
                <input
                  type="text"
                  name="name"
                  id=""
                  className="form-control my-4"
                  placeholder="Mahsulot nomi"
                />
                <input
                  type="file"
                  name="img"
                  id=""
                  className="form-control my-4"
                />
                <input
                  type="number"
                  name="price"
                  id=""
                  className="form-control my-4"
                  placeholder="Mahsulot narxi"
                />
                <select name="select" id="" className="form-select my-4">
                  {res?.restaraunts?.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>

                <button className="btn btn-primary m-3">Add</button>
                <button
                  className="btn btn-danger m-3"
                  onClick={(e) => setBtn(false)}
                >
                  close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
