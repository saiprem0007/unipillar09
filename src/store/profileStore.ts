import { create } from "zustand";
import {
  getProfile,
  updateProfile as updateProfileApi,
  addJosaa as addJosaaApi,
  addCsab as addCsabApi,
} from "@/lib/api/user.api";

let isFetching = false;
let lastFetchTime = 0;

type Profile = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  createdAt: string;
  category: string;
  gender: string;
  pwd: string;
  homeState: string;
  jeeMains: number | null;
  jeeAdvanced: number | null;
};

type Allocation = {
  id?: string | number;
  round: number;
  college: string;
  branch: string;
  status: string;
};

interface ProfileState {
  profile: Profile | null;
  josaa: Allocation[];
  csab: Allocation[];
  loaded: boolean;
  fetchAll: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  addJosaa: (data: any) => Promise<void>;
  addCsab: (data: any) => Promise<void>;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  josaa: [],
  csab: [],
  loaded: false,

  fetchAll: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Prevent duplicate requests
    if (isFetching) return;

    const now = Date.now();
    if (now - lastFetchTime < 1000) return;

    isFetching = true;

    try {
      const res = await getProfile();

      console.log(
        "PROFILE RESPONSE:",
        JSON.stringify(res, null, 2)
      );

      const user = res.user;

      set({
        profile: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          createdAt: user.createdAt,

          category: user.profile?.category || "",
          gender: user.profile?.gender || "",
          pwd: user.profile?.pwd || "",
          homeState: user.profile?.homeState || "",
          jeeMains: user.profile?.jeeMains || null,
          jeeAdvanced: user.profile?.jeeAdvanced || null,
        },

        josaa: user?.josaaAllocations || [],
        csab: user?.csabAllocations || [],

        loaded: true,
      });

      lastFetchTime = Date.now();
    } catch (err) {
      console.error("Profile fetch error:", err);

      set({
        loaded: true,
      });
    } finally {
      isFetching = false;
    }
  },

  updateProfile: async (data: any) => {
    await updateProfileApi(data);
    await get().fetchAll();
  },

  addJosaa: async (data: any) => {
    await addJosaaApi(data);
    await get().fetchAll();
  },

  addCsab: async (data: any) => {
    await addCsabApi(data);
    await get().fetchAll();
  },

  reset: () => {
    set({
      profile: null,
      josaa: [],
      csab: [],
      loaded: false,
    });
  },
}));