import clsx from "clsx";
import { MainStyled } from "./styled";
import { instance } from "@/utils/apis/axios";
import { useState, useEffect } from "react";

export default function Main() {
  const [clientResponse, setClientResponse] = useState({});

  async function createUser() {
    try {
      const response = await instance.post("/users", {
        username: "test7username",
        password: "test7password",
        email: "test7email",
      });
      setClientResponse(response);
      console.log("this is response", response);
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async (id: number) => {
    try {
      const response = await instance.get(`/users/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  getUser(1);

  return (
    <>
      <MainStyled className={clsx("main-container")}>
        <button onClick={createUser}>create user</button>

        <div>hello world</div>
      </MainStyled>
    </>
  );
}
