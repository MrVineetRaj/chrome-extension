import { authServices } from "../utils/appwrite";
import { IUser } from "../App";

const Navbar = ({
  user,
  setUser,
}: {
  user: IUser;
  setUser: (val: IUser | null) => void;
}) => {
  const handleLogin = async () => {
    authServices.loginOAuth("github").then(async () => {
      let currUser = await authServices.getAccount();
      setUser({
        name: currUser!.name,
        $id: currUser!.$id,
        email: currUser!.email,
      });
    });
  };

  const handleLogout = async () => {
    await authServices.logout();
    setUser(null);
  };

  return (
    <div className="sticky top-0 flex items-center justify-between  py-2 border-b  border-b-primary bg-white/80 z-50">
      <img src="/logo.png" alt="" className="w-[100px] md:w-[150px]" />
      <button
        className="bg-white text-primary border-primary border-2"
        onClick={() => {
          if (!!user) {
            console.log("Logging out");
            handleLogout();
          } else {
            handleLogin();
          }
        }}
      >
        {!!user ? "Logout" : "Get Started"}
      </button>
    </div>
  );
};

export default Navbar;
