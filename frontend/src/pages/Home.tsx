import { Button } from "@chakra-ui/react";
import GenreFetch from "../components/GenreFetch";
import ToggleColorMode from "../components/ToggleColorMode";

const Home = () => {
  return (
    <div>
      <ToggleColorMode />
      <Button>
        <a href="/login">Sign Out</a>
      </Button>
      <GenreFetch />
    </div>
  );
};

export default Home;
