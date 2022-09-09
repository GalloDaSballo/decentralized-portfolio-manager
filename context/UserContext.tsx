import {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import { providers } from "ethers";

type UserContextData = {
    activeProvider: providers.JsonRpcProvider | null;
    logout: () => void;
    login: (providerString: string) => void;
};

const UserContext = createContext<UserContextData>({
    activeProvider: null,
    login: (providerString) => null,
    logout: () => null,
});
export default UserContext;

export const UserContextProvider: React.FC = ({ children }) => {
    const [
        activeProvider,
        setActiveProvider,
    ] = useState<providers.JsonRpcProvider | null>(null);

    /**
     * Logs the user out of magic
     */
    const logout = useCallback(async () => {
        try {
            setActiveProvider(null);
        } catch (err) {
            // Do nothing
        }
    }, []);

    /**
     * Login with magic, enrich context with address and provider for convenience
     * @param email
     */
    const login = async (newrpcString: string) => {
        try {
            setActiveProvider(new providers.JsonRpcProvider(newrpcString));
        } catch (err) {
            logout();
        }
    };

    return (
        <UserContext.Provider
            value={{
                activeProvider,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useLogin = () => {
    const { login } = useContext(UserContext);

    return login;
};

export const useLogout = () => {
    const { logout } = useContext(UserContext);

    return logout;
};

export const useProvider = () => {
    const { activeProvider } = useContext(UserContext);

    return activeProvider;
};
