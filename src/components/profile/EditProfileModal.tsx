'use client';

import { useState, useEffect } from 'react';
import { useProfileStore } from '@/store/profileStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ open, onClose }: Props) {
  const { profile, updateProfile } = useProfileStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        email: profile.email || '',
        mobile: profile.mobile || '',
      });
    }
  }, [profile, open]);

  if (!open) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateProfile(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] brutalist-border brutalist-shadow">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border mb-2"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border mb-2"
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full p-2 border mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}