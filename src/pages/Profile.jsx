import { useState, useEffect } from "react";
import { readUser } from "../services/localStorage.service";
import { FaUser } from "react-icons/fa";
import { Updateprofile } from "../api/profile.api";
import { Card, Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../services/NotificationService";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = readUser();
    console.log("Stored User:", storedUser);
    if (storedUser && storedUser.id && !isNaN(storedUser.id)) {
      setUser(storedUser);
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
    } else {
      console.error("Invalid user data in localStorage:", storedUser);
      showErrorNotification("Invalid user data in localStorage.", "Load Profile");
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditClick = async () => {
    if (editMode) {
      setLoading(true);
      setError(null);
      try {
        if (!user || !user.id || isNaN(user.id)) {
          console.error("User ID is missing or invalid!", user);
          showErrorNotification("User ID is missing or invalid!", "Update Profile");
          setLoading(false);
          return;
        }

        const updatedUserData = {
          name: name || "",
          email: email || "",
          role: user.role || ""
        };
        console.log("Updated User Data:", updatedUserData);
        console.log("User ID:", user.id);

        const response = await Updateprofile(user.id, updatedUserData);

        if (response?.status === 200) {
          const updatedUser = { ...user, name, email };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          showSuccessNotification(
            "Profile updated successfully!",
            "Update Profile"
          );
        } else {
          showErrorNotification("Failed to update profile.", "Update Profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error.response ? error.response.data : error.message);
        showErrorNotification(
          "An error occurred while updating profile.",
          "Update Profile"
        );
      } finally {
        setLoading(false);
      }
    }

    setEditMode(!editMode);
  };

  return (
    <div className="main-container mt-5">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card
            className=" shadow-lg border-0 rounded-lg"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="card-body p-4">
              <div className="text-center">
                <div className="mb-3">
                  <FaUser
                    className=""
                    style={{ fontSize: "5em" }}
                  />
                </div>
                <h3 className="mb-0 font-weight-bold " style={{ color: "black" }}>Profile</h3>
                {user && (
                  <>
                    <h5 className="mt-2">{user.name}</h5>
                    <p className="text-muted">{user.email}</p>
                  </>
                )}
              </div>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    readOnly={!editMode}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    readOnly={!editMode}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditClick}
                    disabled={loading}
                    style={{ backgroundColor: "black", border: "none" }}
                  >
                    {editMode ? (
                      loading ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span> Saving...</span>
                        </>
                      ) : (
                        "Save"
                      )
                    ) : (
                      "Edit Profile"
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-3 alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
