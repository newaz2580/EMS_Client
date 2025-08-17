import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import { uploadImage } from "../../Api/Utils";
import { FiEdit, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCreditCard } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        setProfileData(res.data);
      } catch (error) {
        toast.error("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchProfile();
  }, [user?.email, axiosSecure]);

  if (loading) return <LoadingSpinner />;
  if (!profileData) return <p className="text-center text-red-500">No profile data found</p>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const form = e.target;
      const updatedData = {
        name: form.name.value,
        designation: form.designation.value,
        phone: form.phone.value,
        address: form.address.value,
        salary: form.salary.value,
      };
      const imageFile = form.image.files[0];
      if (imageFile) updatedData.imageURL = await uploadImage(imageFile);

      await axiosSecure.put(`/users/${user.email}`, updatedData);
      toast.success("Profile updated successfully!");
      setProfileData({ ...profileData, ...updatedData });
      setIsEditOpen(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Profile</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Profile Image */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative">
            <img
              src={profileData.imageURL}
              alt={profileData.name}
              className="w-44 h-44 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
              onClick={() => setIsEditOpen(true)}
              title="Edit Profile"
            >
              <FiEdit />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{profileData.name}</h2>
          <p className="text-gray-500 dark:text-gray-300">{profileData.designation}</p>
        </div>

        {/* Right: Info Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2"><FiMail /> {profileData.email}</p>
            <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2"><FiPhone /> {profileData.phone}</p>
            <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2"><FiMapPin /> {profileData.address}</p>
          </div>

          {/* Work Info */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2"><FiBriefcase /> Role: {profileData.role}</p>
            <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2"><FiCreditCard /> Bank Acc: {profileData.bank_account_no}</p>
            <p className="text-gray-500 dark:text-gray-300">Salary: ৳{profileData.salary}</p>
          </div>

          {/* Status Info */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition">
            <p>Status: <span className={`font-semibold ${profileData.status === "active" ? "text-green-600" : "text-red-600"}`}>{profileData.status}</span></p>
            <p>Verified: <span>{profileData.isVerified ? "Yes" : "No"}</span></p>
            <p>Created At: {new Date(profileData.created_at).toLocaleString()}</p>
            <p>Last Login: {new Date(profileData.last_loggedIn).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit Profile</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input name="name" defaultValue={profileData.name} className="input input-bordered w-full" placeholder="Name" />
              <input name="designation" defaultValue={profileData.designation} className="input input-bordered w-full" placeholder="Designation" />
              <input name="phone" defaultValue={profileData.phone} className="input input-bordered w-full" placeholder="Phone" />
              <input name="address" defaultValue={profileData.address} className="input input-bordered w-full" placeholder="Address" />
              <input type="number" name="salary" defaultValue={profileData.salary} className="input input-bordered w-full" placeholder="Salary" />
              <input type="file" name="image" accept="image/*" className="file-input w-full" />
              <div className="flex justify-end gap-2 mt-3">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={updating}>
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
