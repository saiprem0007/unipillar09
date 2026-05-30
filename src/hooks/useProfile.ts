import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api/user.api";

export function useProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await getProfile();
        if (mounted) setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return profile;
}