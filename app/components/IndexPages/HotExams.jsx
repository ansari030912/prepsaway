import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import HotExamCards from "../Cards/HotExamCards";

const HotExams = async () => {
  const response = await fetch(`${Base_URL}/v1/hot_exams`, {
    headers: {
      "x-api-key": X_API_Key,
    },
  });

  const data = await response.json();
  return <HotExamCards data={data} />;
};

export default HotExams;
