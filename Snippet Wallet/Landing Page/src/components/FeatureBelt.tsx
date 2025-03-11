const features: string[] = [
  "Share your Snippet with everyone",
  "Save your Snippet with one click",
  "Dynamic Snippet rendering Enabled",
  "UI friendly Chrome Extension",
  "Store your snippet category wise",
];
const FeatureBelt = () => {

  
  return (
    <div className="w-[100svw] bg-primary z-20 py-10 text-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-10 md:gap-20 lg:gap-30 xl:gap-48 ">
        {features?.map((feature, index) => (
          <p key={index} className="text-center font-semibold ">
            {feature}
          </p>
        ))}
        {features?.map((feature, index) => (
          <p key={index} className="text-center font-semibold ">
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FeatureBelt;
