import { IUser } from "../App";
import { authServices } from "../utils/appwrite";

const Hero = ({ user }: { user: IUser }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-start w-full bg-white p-1 md:p-4 rounded-2xl h-[80vw] md:h-[40vw]  relative z-20">
      <h1 className="text-[15vw] md:text-[7vw] font-bold text-primary italic ">
        Snippet <br className="hidden md:inline-block" />
        Wallet
      </h1>
      <h3 className="text-[3vw] md:text-[2vw] font-thin ">
        A one stop solution to all your needs for managing <br />
        Your
        <span className="font-semibold italic text-primary">
          {" "}
          Coding Snippets
        </span>
      </h3>
      <button
        className="bg-primary text-white md:text-[1.5vw]"
        onClick={() => {
          if (!!user) {
            return;
          } else {
            authServices.loginOAuth("github");
          }
        }}
      >
        {!!user ? "Download Extension" : "Start Now"}
      </button>
      <img
        src="/snippet-1.png"
        alt=""
        className="absolute w-[50vw]  hidden md:inline -z-10 rotate-[-135deg] shadow-lg -right-18 -top-[40%] border-2 rounded-2xl border-primary opacity-50"
      />{" "}
      <img
        src="/snippet-2.png"
        alt=""
        className="absolute hidden md:inline w-[50vw] -z-10 rotate-[15deg] shadow-lg -right-18 -bottom-[60%] border-2 rounded-2xl border-primary opacity-50"
      />
    </div>
  );
};

export default Hero;
