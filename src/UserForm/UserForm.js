
// QRForm.js
import React, { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import "./UserForm.css";

export default function UserForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    photo: null
  });

  // Store a locally generated object-URL for preview
  const [photoPreview, setPhotoPreview] = useState(null);

  // Update field values
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm((f) => ({ ...f, [name]: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

   return (
      <div className="form-wrapper fade-in">
        <h2>Create Your QR Profile</h2>

        <form
          className="profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted!");   // Replace with real handler
          }}
        >
          {/* Full name */}
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              placeholder="Jane Doe"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </label>

          {/* Email */}
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          {/* Profile photo */}
          <label className="file-label">
            Profile Picture
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange}
            />
          </label>

          {/* Live image preview */}
          {photoPreview && (
            <div className="preview bounce-in">
              <img src={photoPreview} alt="Preview" />
            </div>
          )}

          {/* QR code generated from full name + email */}
          {form.fullName && form.email && (
            <div className="qr zoom-in">
              <QRCodeCanvas
                value={`${form.fullName}|${form.email}`}
                size={128}
                includeMargin
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            Save Profile
          </button>
        </form>
      </div>
    );
}
