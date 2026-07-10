import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    // Wire this up to your actual contact/email endpoint when ready.
    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Thanks for reaching out — we'll be in touch shortly.",
      });
      setForm({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 900);
  };

  return (
    <div className="contact">
      <div className="contact__orb" />

      <div className="contact__inner">
        <div className="contact__eyebrow">
          <span className="contact__eyebrow-dot" />
          Get In Touch
        </div>

        <h1 className="contact__title">
          Contact <em>Us</em>
        </h1>

        <p className="contact__subtitle">
          We'd love to hear from you. Reach out anytime and our team will
          respond as soon as possible.
        </p>

        <div className="contact__layout">
          <div className="contact-info">
            <div className="contact-info__item">
              <h3>Address</h3>
              <p>123 Main Street, Gujranwala, Pakistan</p>
            </div>

            <div className="contact-info__item">
              <h3>Phone</h3>
              <p>+92 310 4653905</p>
            </div>

            <div className="contact-info__item">
              <h3>Email</h3>
              <p>info@hoteltransylvania.com</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__field">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="contact-form__submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send Message"}
            </button>

            {status.message && (
              <p
                className={
                  status.type === "success"
                    ? "contact-form__status contact-form__status--success"
                    : "contact-form__status contact-form__status--error"
                }
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;