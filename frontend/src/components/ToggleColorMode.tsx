import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      className="  m-4 top-0 right-0 absolute rounded-md"
    >
      {colorMode === "dark" ? (
        <SunIcon color="orange.400" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
};

export default ToggleColorMode;
