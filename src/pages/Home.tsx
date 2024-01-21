import { Link } from 'react-router-dom';
import ProductCard from '../components/Product-card';

const Home = () => {
  const addCartHandler = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productID="dasadsads"
          name="macbook"
          price={4545}
          stock={435}
          photo="https://i.zst.com.br/thumbs/12/37/12/-36761254.jpg"
          handler={addCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
