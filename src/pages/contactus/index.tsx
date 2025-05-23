import frame from "../../assets/frame.png";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import map from "../../assets/map.jpg";
import SubscribeSec from "../../components/SubscribeSec";
const index = () => {
  return (
    <div className="max-w-contained mx-auto mt-24 ">
      <div className="flex flex-col items-center text-center justify-center">
        <p className="font-raleway font-bold text-5xl">Get in Touch</p>
        <p className="font-raleway font-normal text-base text-tgray2 max-w-[400px] mt-4 mb-14">
          Contact us to publish your content and show ads to our website and get
          a good reach.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mb-20">
        {/* Office Card */}
        <div className="flex flex-col rounded-lg  text-center shadow-[-7px_0px_84px_50px_rgba(0,_0,_0,_0.1)]">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-5 mt-16">
            <img src={frame} alt="" />
          </div>
          <h4 className="font-bold text-xl text-primary mb-5">Office</h4>
          <p className="text-base font-raleway text-gray-400 mb-11">
            Victoria Street, London, UK
          </p>
        </div>

        {/* Email Card */}
        <div className="flex flex-col rounded-lg  text-center shadow-[-7px_0px_84px_50px_rgba(0,_0,_0,_0.1)]">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-5 mt-16">
            <img src={email} alt="" />
          </div>
          <h4 className="font-bold text-xl text-primary mb-5">Email</h4>
          <p className="text-base font-raleway text-gray-400 mb-11">
            hello@samzen.com
          </p>
        </div>

        {/* Phone Card */}
        <div className="flex flex-col rounded-lg  text-center shadow-[-7px_0px_84px_50px_rgba(0,_0,_0,_0.1)]">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-5 mt-16">
            <img src={phone} alt="" />
          </div>
          <h4 className="font-bold text-xl text-primary mb-5">Phone</h4>
          <p className="text-base font-raleway text-gray-400 mb-11">
            +001 234 567 3451
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-contained mx-auto h-[540px] rounded-xl  shadow- mb-96">
        {/* Map Background */}
        <img
          src={map}
          alt="Map background"
          className="w-full h-full object-cover "
        />

        {/* Contact Form Card */}
        <div className="absolute w-[70%] md:w-1/2  left-1/2 bg-white rounded-xl p-8 -translate-x-1/2 -translate-y-1/2 shadow-xl">
          <form className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder=""
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder=""
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder=""
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="subject" className="mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder=""
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="message" className="mb-2">
                Message
              </label>
              <textarea
                placeholder=""
                rows={5}
                className="col-span-2 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                required
              />
            </div>
            <div className="col-span-2 items-center justify-center flex ">
              <button
                type="submit"
                className="  bg-purple-600 hover:bg-purple-700 text-white py-5 px-9 rounded-md text-sm transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <SubscribeSec />
    </div>
  );
};

export default index;
