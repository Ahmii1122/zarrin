const index = () => {
  return (
    <div className="max-w-contained mx-auto mt-24 ">
      <div className="flex flex-col items-center text-center justify-center">
        <p className="font-raleway font-bold text-5xl">Get in Touch</p>
        <p className="font-raleway font-normal text-base text-tgray2 max-w-[400px] mt-4">
          Contact us to publish your content and show ads to our website and get
          a good reach.
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-32">
        <div className="">
          <p>ahmad</p>
        </div>
        <div>
          <p>abbas</p>
        </div>
        <div>
          <p>ali</p>
        </div>
      </div>
    </div>
  );
};

export default index;
