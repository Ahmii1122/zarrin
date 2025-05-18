import vector from "../assets/Vector.png";

const SubscribeSec = () => {
  return (
    <section className="bg-primary relative max-w-contained mx-auto">
      <img
        src={vector}
        alt="vector"
        className="absolute -top-20 left-0 rounded-r-full"
      />
      <img
        src={vector}
        alt="vector"
        className="absolute -bottom-20 right-0 rounded-l-full"
      />

      <div className="flex flex-col items-center justify-between p-6 md:p-12">
        <p className="font-raleway font-bold text-white text-[24px] md:text-[52px] leading-[32px] md:leading-[48px] max-w-[800px] text-center mb-12 mt-28">
          Get our stories delivered From us to your inbox weekly.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Your email"
            className="border-none rounded-lg py-3 px-4 md:py-4 md:pl-4 md:pr-24"
          />
          <button className="bg-primary text-white rounded-lg py-3 px-4 md:py-4 md:px-9 border  text-[11px] md:text-[18px] border-white text-nowrap">
            Get Started
          </button>
        </div>
        <p className="font-raleway font-normal text-base  text-center max-w-[600px] mt-6 mb-32 text-tgray3">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm will get a reponse the following day.
        </p>
      </div>
    </section>
  );
};

export default SubscribeSec;
