import LatestProducts from "../components/Products/LatestProducts";
import TopRatingProducts from "../components/Products/TopRatingProducts";
import Slider from "../components/Slider/Slider";
import {
  getLastestProducts,
  getTopRatedProducts,
} from "../redux/actions/productActions";
import { wrapper } from "../redux/store";

export default function Home() {
  return (
    <div>
      {/* <Slider /> */}
      <LatestProducts />
      <TopRatingProducts />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(getLastestProducts(req));
      await store.dispatch(getTopRatedProducts(req));
    }
);
