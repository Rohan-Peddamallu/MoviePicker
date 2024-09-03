import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Box,
  Heading,
  Container,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import ToggleColorMode from "../components/ToggleColorMode";
import * as UserApi from "../network/user_api";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one letter, one number, and one special character",
    }),
});
type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const { mutateUser } = useAuthenticatedUser();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const Response = await UserApi.SignUp(data);
      console.log(Response);
      mutateUser();
      setIsSubmitted(true);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const inputBgColor = useColorModeValue("white", "gray.600");

  return (
    <>
      <ToggleColorMode />
      <Container maxW="md" py={12}>
        <Box bg={bgColor} p={6} rounded="md" boxShadow="md">
          <Heading
            as="h2"
            size="lg"
            textAlign="center"
            mb={6}
            color={textColor}
          >
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel color={textColor}>Name</FormLabel>
                <Input
                  placeholder="Name"
                  {...register("name")}
                  bg={inputBgColor}
                  color={textColor}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                  bg={inputBgColor}
                  color={textColor}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel color={textColor}>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    bg={inputBgColor}
                    color={textColor}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isDisabled={!isValid}
                width="full"
                mt={4}
              >
                Submit
              </Button>
              {isSubmitted && (
                <Flex align="center" justify="center" mt={2}>
                  <CheckIcon color="green.500" />
                  <p className="ml-4">Confirmed!</p>
                </Flex>
              )}

              <p>
                Already have an acount?{" "}
                <span>
                  <a href="/login" className="text-blue-500">
                    Login{" "}
                  </a>
                </span>
              </p>
            </VStack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
