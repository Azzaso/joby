import { Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export function Widget() {
  const {userInfo} = useSelector((state)=>state.auth);
  return (
    <section className="m-10">
      <div className="p-10 rounded-l-xl shadow-lg  from-dark to-[#980A3F] rounded-xl bg-gradient-to-tl">
          <Typography
            variant="small"
            color="white"
            className="font-bold mb-2 font-poppins"
          >
            lorem ipsum
          </Typography>
          <Typography variant="h3" color="white" className="font-poppins">
           Welcome back {userInfo.name} !
          </Typography>
          <Typography
            className="mt-2 mb-6 !text-base font-normal text-gray-500 font-poppins"
          >
            lorem ipsum
          </Typography>
          <Button className="flex-shrink-0 font-poppins" color="pink" variant="gradient">
            Get Started
          </Button>
      </div>
    </section>
  );
}
export default Widget;