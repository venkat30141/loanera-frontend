import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./BorrowerProfile.css";

const BorrowerProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    monthlyIncome: "",
    creditScore: "",
  });

  // 🔥 IMPORTANT: DEBUG USER OBJECT
  useEffect(() => {
    console.log("Logged in user:", user);
  }, [user]);

  // ✅ FETCH PROFILE
  const fetchProfile = async () => {
    try {
      if (!user || !user.id) {
        console.error("User or user.id missing", user);
        return;
      }

      console.log("Fetching borrower profile for userId:", user.id);

      const res = await axios.get(`/api/borrower/profile/${user.id}`);
      console.log("Profile fetched:", res.data);

      setProfile(res.data);
    } catch (err) {
      console.error("Profile not found or error:", err.response?.data || err.message);
      setProfile(null); // profile not found → show create form
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE PROFILE
  const handleCreateProfile = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userId: user.id,   // 🔥 MUST MATCH BACKEND
        monthlyIncome: form.monthlyIncome,
        creditScore: form.creditScore,
      };

      console.log("Creating profile with payload:", payload);

      const res = await axios.post("/api/borrower/profile", payload);
      console.log("Profile created:", res.data);

      setProfile(res.data);
    } catch (err) {
      console.error("Failed to create profile:", err.response?.data || err.message);
      alert("Failed to create borrower profile");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Borrower Profile</h2>

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
  <h3>Financial Health</h3>

  {/* CREDIT SCORE RING */}
  <div className="credit-ring-container">
    <div
      className="credit-ring"
      style={{
        background: `conic-gradient(
          #4da3ff ${profile.creditScore / 9 * 360}deg,
          rgba(255,255,255,0.15) 0deg
        )`
      }}
    >
      <div className="credit-ring-inner">
        <span className="score">{profile.creditScore}</span>
        <span className="label">Credit Score</span>
      </div>
    </div>
  </div>

  {/* MONTHLY INCOME BAR */}
  <div className="income-bar-container">
    <div className="income-header">
      <span>Monthly Income</span>
      <span>₹{profile.monthlyIncome}</span>
    </div>

    <div className="income-bar">
      <div
        className="income-fill"
        style={{
          width: `${Math.min(profile.monthlyIncome / 100000 * 100, 100)}%`
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
          <h3>Complete Your Borrower Profile</h3>

          <form onSubmit={handleCreateProfile}>
            <input
              type="number"
              name="monthlyIncome"
              placeholder="Monthly Income"
              required
              onChange={handleChange}
            />

            <input
              type="number"
              name="creditScore"
              placeholder="Credit Score"
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

export default BorrowerProfile;
