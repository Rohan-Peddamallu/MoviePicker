import GenreFetch from "../components/GenreFetch";
import ToggleColorMode from "../components/ToggleColorMode";

const Home = () => {
  return (
    <div>
      <ToggleColorMode />
      <GenreFetch />
    </div>
  );
};

export default Home;
