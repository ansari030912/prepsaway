import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";
import AllVendorsTableCard from "./AllVendorsTableCard";

const AllVendorsCard = async ({ referral }) => {
  const vendorResponce = await fetch(`${Base_URL}/v1/vendors`, {
    headers: {
      "x-api-key": X_API_Key,
    },
    cache: "no-store",
  });

  if (!vendorResponce.ok) {
    throw new Error(`HTTP error! Status: ${vendorResponce.status}`);
  }

  const vendorData = await vendorResponce.json();

  const response = await fetch(`${Base_URL}/v1/hot_exams`, {
    headers: {
      "x-api-key": X_API_Key,
    },
  });

  const data = await response.json();
  return (
    <AllVendorsTableCard
      data={data}
      vendorData={vendorData}
      referral={referral}
    />
  );
};

export default AllVendorsCard;
