import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./LenderProfile.css";

const LenderProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    availableFunds: "",
  });

  // 🔥 DEBUG USER OBJECT
  useEffect(() => {
    console.log("Logged in lender:", user);
  }, [user]);

  // ✅ FETCH PROFILE
  const fetchProfile = async () => {
    try {
      if (!user || !user.id) {
        console.error("User or user.id missing", user);
        return;
      }

      console.log("Fetching lender profile for userId:", user.id);

      const res = await axios.get(`/api/lender/profile/${user.id}`);
      console.log("Lender profile fetched:", res.data);

      setProfile(res.data);
    } catch (err) {
      console.error("Profile not found:", err.response?.data || err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE PROFILE
  const handleCreateProfile = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userId: user.id,
        availableFunds: form.availableFunds,
      };

      console.log("Creating lender profile:", payload);

      const res = await axios.post("/api/lender/profile", payload);
      console.log("Profile created:", res.data);

      setProfile(res.data);
    } catch (err) {
      console.error("Failed to create profile:", err.response?.data || err.message);
      alert("Failed to create lender profile");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Lender Profile</h2>

      {/* ✅ PROFILE EXISTS */}
      {profile && (
        <div className="profile-card">
          <div className="profile-section">
            <h3>Personal Details</h3>
            <p><strong>Name:</strong> {profile.user.name}</p>
            <p><strong>Email:</strong> {profile.user.email}</p>
            <p><strong>Status:</strong> {profile.user.status}</p>
          </div>

          <div className="profile-section finance-visuals">
            <h3>Investment Power</h3>

            {/* FUNDS RING */}
            <div className="credit-ring-container">
              <div
                className="credit-ring"
                style={{
                  background: `conic-gradient(
                    #00e5a8 ${Math.min(profile.availableFunds / 1000000 * 360, 360)}deg,
                    rgba(255,255,255,0.15) 0deg
                  )`
                }}
              >
                <div className="credit-ring-inner">
                  <span className="score">₹{profile.availableFunds}</span>
                  <span className="label">Available Funds</span>
                </div>
              </div>
            </div>

            {/* FUNDS BAR */}
            <div className="income-bar-container">
              <div className="income-header">
                <span>Available Funds</span>
                <span>₹{profile.availableFunds}</span>
              </div>

              <div className="income-bar">
                <div
                  className="income-fill"
                  style={{
                    width: `${Math.min(profile.availableFunds / 5000000 * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ❌ PROFILE NOT FOUND → CREATE */}
      {!profile && (
        <div className="profile-card">
          <h3>Complete Your Lender Profile</h3>

          <form onSubmit={handleCreateProfile}>
            <input
              type="number"
              name="availableFunds"
              placeholder="Available Funds"
              required
              onChange={handleChange}
            />

            <button type="submit">Create Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LenderProfile;
