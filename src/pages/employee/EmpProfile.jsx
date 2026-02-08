import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiCheckCircle,
  FiEdit,
  FiUpload,
  FiX,
} from "react-icons/fi";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=12");

  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex@company.com",
    phone: "+91 98765 43210",
    location: "Chennai, India",
    role: "Senior Software Engineer",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="content">
      <h1>My Profile</h1>
      <p className="subtitle">Employee personal and work information</p>

      <div className="profile-layout">
        {/* LEFT CARD */}
        <div className="profile-card-left">
          <img src={avatar} alt="Profile" className="profile-avatar" />

          <label className="upload-btn">
            <FiUpload /> Change Photo
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </label>

          <h2>{profile.name}</h2>
          <p className="role">{profile.role}</p>

          <span className="profile-status">
            <FiCheckCircle /> Active Employee
          </span>

          <button className="edit-btn" onClick={() => setShowModal(true)}>
            <FiEdit /> Edit Profile
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="profile-card-right">
          <div className="profile-section">
            <h3><FiUser /> Personal Details</h3>

            <div className="profile-row">
              <FiMail />
              <span>Email</span>
              <b>joe@test.com</b>
            </div>

            <div className="profile-row">
              <FiPhone />
              <span>Phone</span>
              <b>{profile.phone}</b>
            </div>

            <div className="profile-row">
              <FiMapPin />
              <span>Location</span>
              <b>{profile.location}</b>
            </div>
          </div>

          <div className="profile-section">
            <h3><FiBriefcase /> Job Details</h3>

            <div className="profile-row">
              <FiCalendar />
              <span>Joining Date</span>
              <b>12 Mar 2021</b>
            </div>
          </div>

          <div className="profile-section">
            <h3><FiCreditCard /> Bank Details</h3>

            <div className="profile-row">
              <FiCreditCard />
              <span>Bank</span>
              <b>HDFC Bank</b>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <FiX onClick={() => setShowModal(false)} />
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />

              <label>Phone</label>
              <input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />

              <label>Location</label>
              <input
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
