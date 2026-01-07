import { create } from "zustand";

const useRoadmap = create((set) => ({
  RoadMaps: [],

  // add a roadmap
  setRoadMap: (value) =>
    set((state) => ({
      RoadMaps: [...state.RoadMaps, value],
    })),

  // replace all roadmaps
  setAllRoadMaps: (roadmaps) =>
    set({
      RoadMaps: roadmaps,
    }),

  // clear all
  clearRoadMaps: () =>
    set({
      RoadMaps: [],
    }),

  // replace one roadmap by id
  ReplaceRoadMap: (id, data) =>
    set((state) => ({
      RoadMaps: state.RoadMaps.map((rm) =>
        rm._id === id ? { ...rm, ...data } : rm
      ),
    })),

  // remove one roadmap by id
  RemoveRoadMap: (id) =>
    set((state) => ({
      RoadMaps: state.RoadMaps.filter((rm) => rm._id !== id),
    })),
}));

export default useRoadmap;
