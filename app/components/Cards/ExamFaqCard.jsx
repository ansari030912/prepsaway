const ExamFaqCard = ({ examData }) => {
  return (
    <section
      style={{
        backgroundImage: `url('/240_F_434119329_ClLhtcZKL2375Ug3qKqzJjSxZov7cqWe.jpg')`,
      }}
      className="py-6 bg-cover bg-fixed"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mt-6 text-4xl font-bold font-heading text-gray-600">
            {examData.exam_title} FAQ&apos;s
          </h2>
        </div>
        <div className="flex flex-wrap -m-4">
          {Array.isArray(examData.exam_faqs) &&
            examData.exam_faqs.map((faq, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="relative py-1">
                  <div className="flex flex-col justify-center">
                    <h3 className=" mt-6 mb-4 flex min-w-16 h-16 pl-4 px-4 items-center clip-path-right-top rounded-lg bg-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 26 26"
                      >
                        <path
                          fill="white"
                          d="M13 0c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3h6l4 4v-4c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zm4.188 3h1.718l1.688 6h-1.5l-.407-1.5h-1.5L16.813 9H15.5zM18 4c-.1.4-.212.888-.313 1.188l-.28 1.312h1.187l-.282-1.313C18.113 4.888 18 4.4 18 4M3 10c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3v4l4-4h6c1.7 0 3-1.3 3-3v-6h-3c-1.9 0-3.406-1.3-3.906-3zm4.594 2.906c1.7 0 2.5 1.4 2.5 3c0 1.4-.481 2.288-1.281 2.688c.4.2.874.306 1.374.406l-.374 1c-.7-.2-1.426-.512-2.126-.813c-.1-.1-.275-.093-.375-.093C6.112 18.994 5 18 5 16c0-1.7.994-3.094 2.594-3.094m0 1.094c-.8 0-1.188.9-1.188 2c0 1.2.388 2 1.188 2c.8 0 1.218-.9 1.218-2s-.418-2-1.218-2"
                        />
                      </svg>
                      <span className="ml-2 text-white my-2 font-bold">
                        {faq.faq_q}
                      </span>
                    </h3>
                  </div>
                  <p
                    className={`text-base text-gray-500 font-semibold overflow-hidden transition-all duration-500 max-h-96`}
                  >
                    {faq.faq_a}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExamFaqCard;
