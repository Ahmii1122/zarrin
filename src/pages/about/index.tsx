import { useState } from "react";
import about from "../../assets/about.jpg";
import SubscribeSec from "../../components/SubscribeSec";

const index = () => {
  const [activeCard, setActiveCard] = useState(AboutCard[0]);
  return (
    <section className="max-w-contained mx-auto mt-16">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="font-raleway font-bold text-xs text-tgray mb-4">
          ABOUT US
        </p>
        <p className="font-raleway font-bold text-[34px] max-w-[520px] text-center mb-4">
          Creative Blog Writting and publishing site
        </p>
        <p className="max-w-[800px] text-center text-tgray mb-20">
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
          Organically grow the holistic world view of disruptive innovation via
          workplace diversity and empowerment.
        </p>
        <img src={about} alt="about" className="w-full rounded-xl p-2" />
      </div>
      <div>
        <p className="font-roboto font-bold text-base text-tgray mt-24 mb-8">
          HOW WE WORK
        </p>
        <div className="flex md:flex-row flex-col justify-between gap-4 p-2">
          <p className="font-raleway font-bold text-5xl max-w-[500px]">
            I will show you how our team works
          </p>
          <p className="font-roboto font-normal text-tgray2 max-w-[420px]">
            Bring to the table win-win market strategies to ensure perfect
            articles.{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:w-full justify-center items-center  mb-20">
          {AboutCard.map((item) => (
            <div
              key={item.id}
              className={`	mt-20 px-6 rounded-xl ${
                activeCard.id === item.id ? "bg-primary" : "bg-white"
              }`}
              onClick={() => setActiveCard(item)}
            >
              <p
                className={`font-raleway font-bold text-7xl mb-6 mt-6  ${
                  activeCard.id === item.id ? "text-white" : "text-tgray/10"
                }`}
              >
                {item.id}
              </p>
              <p
                className={`font-raleway font-bold text-2xl mb-4 ${
                  activeCard.id === item.id ? "text-white" : " text-primary"
                }`}
              >
                {item.title}
              </p>
              <p
                className={`	font-roboto font-normal text-base leading-[150%]  ${
                  activeCard.id === item.id ? "text-white" : "text-tgray/70"
                }`}
              >
                {item.description}
              </p>
              {activeCard.id === item.id && (
                <p className="font-roboto font-normal text-base text-white mt-8 mb-8 underline  ">
                  Learn More
                </p>
              )}
            </div>
          ))}
        </div>
        <SubscribeSec />
      </div>
    </section>
  );
};

export default index;

const AboutCard = [
  {
    id: "01",
    title: "Brainstorming",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated",
  },
  {
    id: "02",
    title: "Analysing",
    description:
      "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line solely on the bottom line.",
  },
  {
    id: "03",
    title: "News Publishing",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
  },
];
