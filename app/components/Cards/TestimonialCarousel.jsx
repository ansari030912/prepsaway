const reviews = [
  {
    text: "I aced my Amazon certification thanks to the detailed practice exams on Preps Away.",
    name: "Jane Smith",
  },
  {
    text: "The best resource for Microsoft certification prep. Preps Away's test engine is unmatched!",
    name: "Robert Johnson",
  },
  {
    text: "Dell certification was a breeze with Preps Away. Their test engine is simply the best.",
    name: "Emily Davis",
  },
  {
    text: "PMI exams were tough, but Preps Away made it manageable. Fantastic test engine!",
    name: "Michael Wilson",
  },
  {
    text: "The Riverbed exam was easy to tackle with the help of Preps Away's thorough test engine.",
    name: "Jessica Taylor",
  },
  {
    text: "RSA certifications felt easier with Preps Away’s outstanding practice tests.",
    name: "William Martinez",
  },
  {
    text: "I highly recommend Preps Away for SAFe certification prep. Their test engine is the best!",
    name: "Linda Anderson",
  },
  {
    text: "Salesforce certification exams are well covered on Preps Away. Excellent test engine!",
    name: "Christopher Thomas",
  },
  {
    text: "SANS certification prep was simplified with Preps Away. Great resource!",
    name: "Susan Jackson",
  },
  {
    text: "SAP exams are extensive, but Preps Away's test engine covered everything I needed.",
    name: "Charles White",
  },
  {
    text: "Preps Away helped me pass my SAS Institute exams with ease. Their test engine is superb!",
    name: "Patricia Harris",
  },
  {
    text: "The Scaled Agile exam was tough, but Preps Away's practice tests made it manageable.",
    name: "Daniel Lewis",
  },
  {
    text: "Scrum certification prep was straightforward with Preps Away’s excellent test engine.",
    name: "Barbara Clark",
  },
  {
    text: "SDI exam prep was a breeze with Preps Away. Highly recommend their test engine!",
    name: "Paul Robinson",
  },
  {
    text: "ServiceNow certification was made easier with Preps Away. The test engine is top-notch!",
    name: "Nancy Walker",
  },
  {
    text: "Sitecore exam prep is fantastic on Preps Away. Great test engine!",
    name: "Kevin Hall",
  },
  {
    text: "Six Sigma certification was achievable thanks to Preps Away's thorough test engine.",
    name: "Karen Young",
  },
  {
    text: "Slack certification was smooth with the help of Preps Away’s excellent test engine.",
    name: "Donald Hernandez",
  },
  {
    text: "Preps Away made SNIA certification prep simple and effective. Highly recommended!",
    name: "Betty King",
  },
  {
    text: "If you're looking for the best test engine for Cisco exams, Preps Away is the answer!",
    name: "Thomas Wright",
  },
  {
    text: "Amazon certification prep has never been easier, thanks to Preps Away. Excellent resource!",
    name: "Helen Lopez",
  },
  {
    text: "Preps Away's test engine helped me pass my Microsoft exams with flying colors.",
    name: "Larry Scott",
  },
  {
    text: "The best place for Dell certification prep. Preps Away’s test engine is unbeatable!",
    name: "Margaret Green",
  },
  {
    text: "PMI certification was made simpler with Preps Away’s fantastic test engine.",
    name: "Brian Adams",
  },
  {
    text: "I highly recommend Preps Away for Riverbed exam prep. Their test engine is superb!",
    name: "Dorothy Baker",
  },
  {
    text: "RSA certification was easy to achieve with Preps Away’s thorough practice exams.",
    name: "Kenneth Gonzalez",
  },
  {
    text: "SAFe exam prep was a breeze with Preps Away. Excellent test engine!",
    name: "Lisa Nelson",
  },
  {
    text: "Salesforce certification was manageable thanks to Preps Away’s great test engine.",
    name: "Matthew Carter",
  },
  {
    text: "Preps Away's test engine is the best for SANS certification prep. Highly recommended!",
    name: "Betty Mitchell",
  },
  {
    text: "I passed my SAP exams with ease thanks to Preps Away. Great test engine!",
    name: "Steven Perez",
  },
  {
    text: "SAS Institute certification was easy with the help of Preps Away’s detailed practice tests.",
    name: "Linda Roberts",
  },
  {
    text: "Preps Away made Scaled Agile exam prep straightforward and effective.",
    name: "George Turner",
  },
  {
    text: "Scrum certification was simple with Preps Away. Their test engine is top-notch!",
    name: "Sarah Phillips",
  },
  {
    text: "SDI exam prep was efficient with Preps Away’s excellent test engine.",
    name: "Edward Campbell",
  },
  {
    text: "ServiceNow certification was easier with Preps Away. Highly recommend their test engine!",
    name: "Deborah Parker",
  },
  {
    text: "Sitecore exam prep was effective with the help of Preps Away’s test engine.",
    name: "Joseph Evans",
  },
  {
    text: "Preps Away's test engine made Six Sigma certification a smooth process. Highly recommended!",
    name: "Dorothy Edwards",
  },
  {
    text: "Slack certification was straightforward with Preps Away’s detailed practice exams.",
    name: "Larry Collins",
  },
  {
    text: "SNIA exam prep was simplified with Preps Away’s fantastic test engine.",
    name: "Sandra Stewart",
  },
  {
    text: "Cisco certification was manageable with the help of Preps Away. Excellent test engine!",
    name: "Raymond Morris",
  },
  {
    text: "Amazon exams were easier with Preps Away’s thorough test engine. Highly recommend!",
    name: "Sharon Rogers",
  },
  {
    text: "I passed my Microsoft certification thanks to Preps Away. Their test engine is the best!",
    name: "Jerry Reed",
  },
  {
    text: "Preps Away’s test engine is incredibly user-friendly and effective for Riverbed exams.",
    name: "Sarah Hill",
  },
  {
    text: "The RSA practice exams on Preps Away are top-notch. The test engine is unparalleled!",
    name: "Brian Scott",
  },
  {
    text: "I passed my SAFe certification with flying colors thanks to Preps Away. Their test engine is the best!",
    name: "Laura Green",
  },
  {
    text: "Preps Away’s test engine made my Salesforce certification preparation a breeze. Highly recommend!",
    name: "Kevin Adams",
  },
  {
    text: "The SANS exam prep on Preps Away is outstanding. The test engine is incredibly effective!",
    name: "Lisa Baker",
  },
  {
    text: "Preps Away has the best test engine for SAP certifications. I passed with ease!",
    name: "Eric Nelson",
  },
  {
    text: "I’m so grateful for Preps Away’s test engine. It made my SAS Institute exam preparation so much easier!",
    name: "Kimberly Carter",
  },
];

const TestimonialCarousel = () => {
  return (
    <section
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        backgroundColor: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      <div
        style={{ paddingLeft: "1rem", paddingRight: "1rem", margin: "0 auto" }}
      >
        <h2
          style={{
            marginBottom: "1.25rem",
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: "-0.015em",
            lineHeight: "1.2",
          }}
          className="text-4xl lg:text-5xl"
        >
          See what others are saying
        </h2>
        <p
          style={{
            marginBottom: "4rem",
            fontSize: "1.125rem",
            color: "#4B5563",
            fontWeight: "500",
            textAlign: "center",
            margin: "0 auto",
            maxWidth: "24rem",
            textWrap: "nowrap",
          }}
        >
          Top World Wide Review About PrepsAway.com
        </p>
        <div className="carousel-container">
          <div className="carousel-track">
            {reviews.map((review, index) => (
              <div key={index} className="carousel-slide">
                <div className="review-card">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          style={{ width: "auto", padding: "0.125rem" }}
                        >
                          <svg
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.30769 0L12.1838 5.82662L18.6154 6.76111L13.9615 11.2977L15.0598 17.7032L9.30769 14.6801L3.55554 17.7032L4.65385 11.2977L0 6.76111L6.43162 5.82662L9.30769 0Z"
                              fill="#F59E0B"
                            ></path>
                          </svg>
                        </div>
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingTop: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          className="text-6xl"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            marginRight: "5px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="0.3em"
                            height="0.3em"
                            viewBox="0 0 24 24"
                            style={{ transform: " scaleX(-1)" }} // Rotate the SVG 180 degrees
                          >
                            <path
                              fill="currentColor"
                              d="M7 3h9.95v9.96l-3.99 7.98H8l3.97-7.98H7z"
                            />
                          </svg>
                        </span>
                        <span>{review.text}</span>
                        <span
                          className="text-6xl"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column",
                            marginLeft: "5px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="0.3em"
                            height="0.3em"
                            viewBox="0 0 24 24"
                            style={{
                              transform: "rotate(360deg) ", // Rotate the SVG 180 degrees and flip it horizontally
                            }}
                          >
                            <path
                              fill="currentColor"
                              d="M7 3h9.95v9.96l-3.99 7.98H8l3.97-7.98H7z"
                            />
                          </svg>
                        </span>
                      </span>
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: "auto",
                        padding: "0.5rem",
                        textAlign: "center",
                        paddingTop: "20px",
                      }}
                      className="text-green-500"
                    >
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                        {review.name}
                        <hr className="border-2 border-green-300" />
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
