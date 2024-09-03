import * as UserApi from "../network/user_api";
import { UnauthorizedError, BadRequestError } from "../network/http-errors";
import useSWR from "swr";

export default function useAuthenticatedUser() {
    const { data, isLoading, error, mutate } = useSWR("authenticated_user",
        async () => {
            try {
                return await UserApi.getAuthenticatedUser();
            } catch (error) {
                if (error instanceof UnauthorizedError || error instanceof BadRequestError) {
                    return null;
                } else {
                    throw error;
                }
            }
        }
    );

    return {
        user: data,
        userLoading: isLoading,
        userLoadingError: error,
        mutateUser: mutate,
    }
}