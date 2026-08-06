import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
//import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [image, setImage ] = useState(null);
  const [preview, setPreview ] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("profileImage", image);

    const res = await API.put("/users/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Profile image uploaded successfully");
    setPreview("http://localhost:5000" + res.data.profileImage);

  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
  }
};

  return (
    <MainLayout>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                My Profile
              </h2>

              <div className="text-center mb-4">
  <img
    src={
      preview ||
      "https://via.placeholder.com/150?text=Profile"
    }
    alt="Profile"
    className="rounded-circle"
    width="150"
    height="150"
  />

  <input
    type="file"
    className="form-control mt-3"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />

  <button
    className="btn btn-primary mt-3"
    onClick={uploadImage}
  >
    Upload Photo
  </button>
</div>

              <div className="mb-3">
                <strong>Name:</strong>
                <p>{user.name}</p>
              </div>

              <div className="mb-3">
                <strong>Email:</strong>
                <p>{user.email}</p>
              </div>

              <div className="mb-3">
                <strong>User ID:</strong>
                <p>{user._id}</p>
              </div>

              <button className="btn btn-primary w-100">
                Edit Profile
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
    </MainLayout>
  );
}

export default Profile;