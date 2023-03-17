import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
export function LoginRoute({ children }: { children: any }): JSX.Element | null {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (isLoggedIn) {
        return children;
    }
    return null;
}

export function LogoutRoute({ children }: { children: any }): JSX.Element | null {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (!isLoggedIn) {
        return children;
    }
    return null;
}
