import { parseCookies } from "nookies";
import React from "react";
import NewProduct from "../../../components/Admin/Product/NewProduct";
import { wrapper } from "../../../redux/store";

const NewProductPage = () => {
  return (
    <div>
      <NewProduct />
    </div>
  );
};

export default NewProductPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const { token, role } = await parseCookies({ req });

      if (!token || role !== "admin") {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { role },
      };
    }
);
