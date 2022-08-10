import React, { useState } from "react";
import "./adminRest.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase";

import { v4 } from "uuid";

const restaurants = gql`
  query {
    restaraunts {
      id
      name
      res_cotegory_id
    }
  }
`;
const Cotegory = gql`
  query {
    cotegory {
      name
      id
      img
    }
  }
`;
const restaurant = gql`
  mutation ($name: String!, $resCotegoryId: ID!, $img: String!) {
    newRes(name: $name, res_cotegory_id: $resCotegoryId, img: $img) {
      id
      img
      name
      res_cotegory_id
    }
  }
`;
const DeleteRes = gql`
  mutation ($deleteResId: ID!) {
    deleteRes(id: $deleteResId) {
      name
    }
  }
`;

const AdminRest = () => {
  const { data, loading, error } = useQuery(restaurants);
  const { data: cotegory } = useQuery(Cotegory);
  const [newRes] = useMutation(restaurant);
  const [deleteRes] = useMutation(DeleteRes);
  const [btn, setBtn] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, img, select } = e.target.elements;

    newRes({
      variables: {
        name: name.value,
        resCotegoryId: select.value,
        img: imageUrl,
      },
    });
    window.location.reload();
    e.target.reset();
  };

  const handleImg = (e) => {
    e.preventDefault();

    const imageUpload = e.target.files[0];

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };
  const handleDelete = (e) => {
    deleteRes({
      variables: {
        deleteResId: e.target.id,
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
            <th>
              <button className="btn btn-primary" onClick={(e) => setBtn(true)}>
                add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.restaraunts?.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.name}</td>
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
                <h1>Restarant qushish</h1>
                <input
                  type="text"
                  name="name"
                  id=""
                  className="form-control my-4"
                  placeholder="Restaran Nomi"
                />
                <input
                  type="file"
                  name="img"
                  id=""
                  className="form-control my-4"
                  onChange={(e) => handleImg(e)}
                />
                <select name="select" id="" className="form-select my-4">
                  {cotegory?.cotegory?.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-primary m-3"
                  disabled={imageUrl ? false : true}
                >
                  Add
                </button>
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

export default AdminRest;
