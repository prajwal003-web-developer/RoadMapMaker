import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdCircle, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import api from "../../api";
import useRoadmap from "../Zustand/Roadmap";

const RoadmapTab = ({ setreFetch,project }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const Tab = searchParams.get("tab");

  return (
    <div>
      <div className="flex py-3 px-4 rounded-full items-center gap-4 bg-[#80808038]">
        <button
          onClick={() => {
            setSearchParams({
              tab: "week",
            });
          }}
          className={`p-3 w-32  rounded-xl cursor-pointer ${
            Tab == "roadmap" ? "" : "bg-gray-300 text-black"
          }`}
        >
          Weeks
        </button>

        <button
          onClick={() => {
            setSearchParams({
              tab: "roadmap",
            });
          }}
          className={`p-3 w-32  rounded-xl cursor-pointer ${
            Tab == "roadmap" ? "bg-gray-300 text-black" : ""
          }`}
        >
          RoadMap
        </button>
      </div>
      {Tab == "roadmap" ? (
        <CompleteRoadMap setreFetch={setreFetch} project={project} />
      ) : (
        <Week project={project} />
      )}
    </div>
  );
};

export default RoadmapTab;

const Week = ({ project }) => {
  return (
    <div className="flex gap-3 flex-col px-3 mt-6">
      {project?.roadmap?.map((itm, idx) => {
        let data;
        let total = 0;
        let completed = 0;
        itm.topics[0].subtopics?.map((itm) => {
          total++;
          if (itm?.isCompleted) {
            completed++;
          }
        });
        data = ((completed / total) * 100).toFixed(2);

        return (
          <div
            key={idx}
            className="border-2 border-solid bg-[#ffffff10] border-gray-700 rounded-xl p-3"
          >
            <div className="font-semibold text-xl">Step {idx + 1}</div>
            <div className="text-sm md:text-lg font-semibold">
              {itm?.topics[0].name}
            </div>
            <div>
              <div className="text-sm md:text-[1rem] ">
                {itm?.topics[0]?.explanation}
              </div>
              <div className="font-semibold my-2 overflow-clip text-gray-200">
                Progress of:{" "}
                <span className="text-sm">{itm?.topics[0].name}</span>
              </div>

              <div className="flex justify-between gap-3 pb-4 items-center">
                <div className="h-6 rounded-xl w-full bg-gray-300 overflow-clip">
                  <div
                    style={{
                      width:`${data}%`
                    }}
                    className={`h-full duration-300 transition-all bg-gradient-to-r from-green-600 to-green-900`}
                  ></div>
                </div>
                <div className="font-semibold text-sm">{data}%</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CompleteRoadMap = ({ project,setreFetch }) => {
  const [Loading, setLoading] = useState(false);

  const {id} = useParams()

  const {ReplaceRoadMap} = useRoadmap()


  const HandleRead = async (data) => {
    if (Loading) {
      return;
    }
    try {
      setLoading(true);
      let datax
      if (data?.isCompleted) {
         datax = await api.get(`/project/mark-as-unread/${data?._id}/${id}`);

      } else {
        datax = await api.get(`/project/mark-as-read/${data?._id}/${id}`);
        
      }
      ReplaceRoadMap(id,datax.data.data)
      toast.success("Action Completed");
      setreFetch(p=>!p)
    } catch (error) {
      console.log(error?.message || error);
      toast.error("Couldnt Perform Action");
    } finally {
      setLoading(false);
      
    }
  };
  return (
    <div className="mt-4 flex gap-3 flex-col">
      {project?.roadmap?.map((itm, idx) => {
        return (
          <div
            key={idx}
            className="border-2 border-solid bg-[#ffffff10] border-gray-700 rounded-xl p-3"
          >
            <div className="font-semibold text-xl">Step {idx + 1}</div>
            <h1 className="font-semibold text-gray-300">
              {itm?.topics[0]?.name}
            </h1>

            <p className="m-1 text-sm">{itm?.topics[0]?.explanation}</p>

            <div className="flex flex-col gap-1 px-6">
              {itm?.topics[0]?.subtopics.map((items, index) => {
                return (
                  <div
                    className="bg-[#8080800a] justify-between items-center flex flex-wrap gap-3 p-3 rounded"
                    key={index + 999}
                  >
                    <div className="font-semibold ">
                      Topic ({index + 1}): {items?.name}
                    </div>
                    <div className="flex flex-1 gap-3 flex-wrap justify-end ">
                      <button
                        onClick={() => {
                          HandleRead(items);
                        }}
                        className={`p-3 ${
                          items?.isCompleted ? "bg-green-600" : "bg-gray-500"
                        }  rounded cursor-pointer`}
                      >
                        {Loading ? (
                          <MdCircle className="animate-spin" size={"1.4rem"} />
                        ) : (
                          <>
                            {items?.isCompleted ? (
                              <IoCheckmarkDoneSharp />
                            ) : (
                              <MdOutlineCheckBoxOutlineBlank size={"1.3rem"} />
                            )}
                          </>
                        )}
                      </button>
                      {/* <button className="p-3 bg-blue-600 rounded cursor-pointer">
                        B
                      </button>
                      <button className="p-3 bg-gray-600 rounded cursor-pointer">
                        C
                      </button>
                      <button className="p-3  bg-[#ffffff09] rounded cursor-pointer">
                        D
                      </button> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
