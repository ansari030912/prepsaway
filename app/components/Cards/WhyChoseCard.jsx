/* eslint-disable @next/next/no-img-element */

const WhyChoseCard = () => {
  return (
    <section
      //   style={{ borderBottom: "30px solid #F7F7F7" }}
      className="pt-4 pb-12 bg-white overflow-hidden "
    >
      <div className="container mx-auto px-4">
        <div className="bg-gray-50 overflow-hidden rounded-t-3xl">
          <div className="px-8 pt-20">
            <div className="md:max-w-2xl text-center mx-auto">
              <span className="inline-block mb-3 text-sm text-blue-500 font-bold uppercase tracking-widest">
                Why Chose Preps Away
              </span>
              <h1 className="font-heading mb-6 text-3xl lg:text-5xl text-gray-900 font-black tracking-tight">
                Master Your IT Skills with PrepsAway!
              </h1>
              <p className="mb-2 text-xl font-semibold text-gray-600">
                Dominate your IT certification goals with PrepsAway! We provide
                up-to-date practice exams for various certifications, designed
                by industry experts. Identify knowledge gaps, refine your
                understanding, and conquer your exam with confidence. Get
                started today and unlock your IT potential!
              </p>
              <div className="flex flex-wrap justify-center mb-20 -m-2">
                <div className="w-full md:w-auto p-2"></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-20 px-8 rounded-full max-w-max mx-auto">
              <img
                src="/table-work-computer-study-reading.jpg"
                className="rounded-3xl"
                alt=""
              />
            </div>
            <div className="absolute left-0 top-0 w-full h-1/2 bg-white">
              <div className="h-full bg-gray-50 rounded-b-3xl"></div>
            </div>
            <div className="absolute left-0 bottom-0 w-full h-1/2 bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoseCard;
