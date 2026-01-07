import React from "react";

import { useEffect, useState } from "react";
import ProjectHeader from "./ProjectHeader";

import { useNavigate, useParams } from "react-router-dom";
import useRoadmap from "../Zustand/Roadmap";
import Layout from "../Layout";
import LoadingComponent from "../LoadingComponent";

import { useSearchParams } from "react-router-dom";
import Progress from "./Progress";
import RoadmapTab from "./RoadmapTab";
import { toast } from "react-toastify";
import api from "../../api";
import { useAuth } from "@clerk/clerk-react";

const Roadmap = () => {
  const [searchParams] = useSearchParams();

  const { getToken } = useAuth();

  const { id } = useParams();

  const [project, setproject] = useState({});

  const [Loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

  const Roadmaps = useRoadmap((p) => p.RoadMaps);
  const { RemoveRoadMap } = useRoadmap();

  const navigate = useNavigate();

  const [reFetch, setreFetch] = useState(false);

  useEffect(() => {
    if (Roadmaps) {
      const data = Roadmaps?.find((p) => p._id == id);
      setproject(data);

      setLoading(false);
    }
  }, [Roadmaps, id, reFetch]);

  const [deleteLoading, setdeleteLoading] = useState(false);

  const HandleDelete = async () => {
    setisDeleteModalOpen(false);
    if (deleteLoading) {
      return;
    }
    try {
      setdeleteLoading(true);

      const token = await getToken();
      const datas = await api.delete(`/project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("succesfully Deleted");

      navigate("/home");

      RemoveRoadMap(id);
    } catch (error) {
      toast.error("Couldnt Delete The Roadmap");
    } finally {
      setdeleteLoading(false);
      setisDeleteModalOpen(false);
    }
  };

  if (Loading) return <LoadingComponent />;

  return (
    <Layout>
      <div className="min-h-[100dvh] pt-18 px-4">
        <ProjectHeader project={project} />
        <Progress project={project} />
        <RoadmapTab setreFetch={setreFetch} project={project} />
        <div className="flex gap-3 flex-wrap px-4 py-8">
          <button
            onClick={() => {
              setisDeleteModalOpen(true);
            }}
            className="flex-1 bg-red-600 p-3 rounded-xl cursor-pointer"
          >
            Delete Roadmap
          </button>

          {/* <button className="flex-1 bg-green-600 p-3 rounded-xl cursor-pointer">
            Share Roadmap
          </button> */}
        </div>
        {isDeleteModalOpen && (
          <div
            onClick={() => {
              setisDeleteModalOpen(false);
            }}
            className="inset-0 fixed bg-[#0000008e] p-4 flex justify-center items-center z-50  "
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-4 rounded bg-[#5c58587c] md:w-[33rem] backdrop-blur-sm border border-solid border-gray-700 w-full"
            >
              <div className="text-lg font-semibold text-gray-200">
                Do You Want To Delete This Roadmap ? There is No Going Back !
                After Deleting.
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={HandleDelete}
                  className="p-2 rounded px-7 bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setisDeleteModalOpen(false);
                  }}
                  className="p-2 rounded px-7 bg-black"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Roadmap;
