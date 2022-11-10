import useAuth from "./useAuth";

const useLogout = () => {
  const { logoutUser } = useAuth();
  const logout = async () => {
    await logoutUser();
  };
  return { logout };
};

export default useLogout;
