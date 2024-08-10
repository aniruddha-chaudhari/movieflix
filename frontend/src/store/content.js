import { create } from "zustand";

export const useContentstore = create((set) => ({
contentType: 'movie',
setContentType: (type) => set({contentType: type})


}));