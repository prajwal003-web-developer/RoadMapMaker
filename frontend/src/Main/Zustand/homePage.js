import { create } from "zustand";

const useHomePage = create((set) => ({
  isOpen: false,
  
  setIsOpen: (value) => set({ isOpen: value }), // update state
}));

export default useHomePage;
