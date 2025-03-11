import { useEffect, useState } from "react";
import ExtensionSection from "./components/ExtensionSection";
import FeatureBelt from "./components/FeatureBelt";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { authServices } from "./utils/appwrite";

export interface IUser {
  name: string;
  email: string;
  $id: string;
}

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    authServices.getAccount().then((res) => {
      if (!!res) {
        setUser({
          name: res!?.name,
          email: res!?.email,
          $id: res!?.$id,
        });
      }
      console.log(res);
    });
  }, []);
  return (
    <>
      <Navbar user={user!} setUser={setUser} />
      <div className="flex flex-col items-center gap-10 min-w-[350px] w-[80vw] min-h-screen">
        <Hero user={user!} />
        <FeatureBelt />
        <ExtensionSection />
      </div>
    </>
  );
};

export default App;
