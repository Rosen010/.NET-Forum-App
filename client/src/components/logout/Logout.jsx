import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { logoutHandler } = useContext(UserContext);
    const navigate = useNavigate();

    logoutHandler()
        .then(() => navigate('/'));

    return null;
}