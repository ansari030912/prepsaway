/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";

const RecentUpdateExamCard = ({ data }) => {
  return (
    <section>
      <div className="container mx-auto">
        <div>
          <div className="overflow-x-auto custom-scrollbar">
            <div className="inline-block w-full min-w-max overflow-hidden p-2">
              <table className="table-auto w-full">
                <tbody>
                  {Array.isArray(data) &&
                    data.slice(0, 10).map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          borderRadius: "15px",

                          boxShadow:
                            index % 2 === 0
                              ? "0px 0px 10px rgba(0, 0, 0, 0.1)"
                              : "",
                        }}
                      >
                        <td className="p-0">
                          {data ? (
                            <div
                              className={
                                index % 2 === 0
                                  ? "flex items-center pl-4 pr-4 h-20 bg-blueGray-50 border-l border-t border-b border-gray-100 bg-gray-50 rounded-tl-2xl rounded-bl-2xl"
                                  : "flex items-center pl-4 pr-4 h-20 "
                              }
                            >
                              <div className="flex items-center">
                                <img
                                  className="mr-4 h-8"
                                  src={item?.exam_vendor_img}
                                  alt=""
                                />
                                <div className="flex-shrink-1">
                                  <h4 className="font-heading text-wrap font-medium leading-4 text-blue-400 hover:text-blue-600">
                                    <Link
                                      href={`/exam-questions/${item.exam_vendor_perma}/${item.exam_perma}`}
                                      className="text-lg text-gray-600"
                                    >
                                      {item.exam_vendor_title} -{" "}
                                      {item.exam_code}
                                    </Link>
                                    <br />
                                    <Link
                                      href={`/exam-questions/${item.exam_vendor_perma}/${item.exam_perma}`}
                                      className="text-sm"
                                    >
                                      {item.exam_title}
                                    </Link>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-start">
                              <div className="p-4 max-w-sm w-full mx-auto">
                                <div className="animate-pulse flex  space-x-4">
                                  <div className="rounded-full bg-slate-500 h-10 w-10"></div>
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-500 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-500 rounded"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>

                        <td className="p-0 text-right">
                          {data && (
                            <div
                              className={
                                index % 2 === 0
                                  ? "flex items-center justify-end p-5 h-20 text-right bg-blueGray-50 border-t border-b border-r rounded-tr-xl rounded-br-xl border-gray-100 bg-gray-50"
                                  : "flex items-center justify-end p-5 h-20 text-right"
                              }
                            >
                              <span className="py-2 pb-2 px-3 text-xs text-green-600 font-medium bg-green-200 rounded-full">
                                {moment(item.exam_update_date).format(
                                  "DD MMM YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* <hr /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentUpdateExamCard;
