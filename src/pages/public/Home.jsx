import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <h1>
            One Platform.<br />
            <span>All Loan Solutions.</span>
          </h1>

          <p>
            Borrow • Lend • Manage • Analyze — all in one intelligent system
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              Open Account
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <motion.section
        className="stats-section"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          ["₹10Cr+", "Loans Processed"],
          ["25K+", "Active Users"],
          ["99.9%", "Secure Transactions"],
          ["24/7", "Support"],
        ].map(([value, label], index) => (
          <motion.div
            key={index}
            className="stat-card"
            variants={fadeUp}
          >
            <h2>{value}</h2>
            <p>{label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        className="workflow"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp}>How It Works</motion.h2>

        <div className="workflow-steps">
          {[
            ["Register", "Create your role-based account"],
            ["Verify Profile", "Complete borrower or lender profile"],
            ["Apply / Invest", "Borrowers apply, lenders fund"],
            ["Track EMI", "Monitor payments & returns"],
          ].map(([title, desc], i) => (
            <motion.div
              key={i}
              className="step"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <span>{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ROLES */}
      <motion.section
        className="roles"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp}>Built For Everyone</motion.h2>

        <div className="role-cards">
          {[
            ["Borrowers", "Apply loans & track EMI", "borrower"],
            ["Lenders", "Invest & earn returns", "lender"],
            ["Admins", "Approve & manage loans", "admin"],
            ["Analysts", "Insights & risk analysis", "analyst"],
          ].map(([title, desc, cls], i) => (
            <motion.div
              key={i}
              className={`role-card ${cls}`}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECURITY */}
      <motion.section
        className="security"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>Bank-Grade Security</h2>
        <p>
          Encryption, role-based access & enterprise-level protection
        </p>
      </motion.section>

      {/* TESTIMONIAL */}
      <motion.section
        className="testimonial"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>Trusted by Thousands</h2>
        <blockquote>
          “LMS simplified loan management with transparency & speed.”
        </blockquote>
        <span>— Verified Customer</span>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="final-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>Experience Modern Banking</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/register")}
        >
          Get Started Today
        </button>
      </motion.section>

      {/* ENTERPRISE FOOTER */}
      <footer className="enterprise-footer">
        <div className="footer-container">

          <div className="footer-brand">
            <h2>LoanEra</h2>
            <h3>~ Experiance the LoanEra Platform</h3>
            <p>
              Secure, scalable, and enterprise-ready platform for managing
              loan lifecycles, approvals, repayments, and compliance workflows.
            </p>
          </div>

          <div className="footer-links">

            <div>
              <h4>Product</h4>
              <ul>
                <li>Dashboard</li>
                <li>Loan Management</li>
                <li>EMI Calculator</li>
                <li>Reports & Analytics</li>
              </ul>
            </div>

            <div>
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4>Legal</h4>
              <ul>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Data Protection</li>
                <li>Regulatory Compliance</li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li>support@loanera.com</li>
                <li>+91 98765 43210</li>
                <li>Help Center</li>
                <li>System Status</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <p>
              © 2026 LoanEra. All rights reserved.
              <span className="version">v1.0.0</span>
            </p>
          </div>

          <div className="footer-right">
            <span className="badge">SSL Secured</span>
            <span className="badge">ISO 27001</span>
            <span className="badge">RBI Guidelines Ready</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
