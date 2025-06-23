
// QRForm.js
import React, { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import "./UserForm.css";

export default function UserForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
     phone: "",
    companyName: "",
    linkedIn: "",
    jobTitle: "",
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
           {/* Company name */}
                    <label>
                      Company Name
                      <input
                        type="text"
                        name="companyName"
                        placeholder="xyz"
                        value={form.companyName}
                        onChange={handleChange}

                      />
                    </label>
                     {/* Job Title */}
                              <label>
                                Job Title
                                <input
                                  type="text"
                                  name="jobTitle"
                                  placeholder="Developer"
                                  value={form.jobTitle}
                                  onChange={handleChange}

                                />
                              </label>
                               {/* LinkedIn */}
                                                            <label>
                                                              Linked In
                                                              <input
                                                                type="text"
                                                                name="linkedIn"
                                                                placeholder="https://www.linkedin.com/in/abc/"
                                                                value={form.linkedIn}
                                                                onChange={handleChange}

                                                              />
                                                            </label>
          {/* Phone Number */}
                                       <label>
                                         Phone Number
                                         <input
                                            type="tel"
                                           name="phone"
                                           placeholder="+1 234 567 8900"
                                           value={form.phone}
                                           onChange={handleChange}

                                         />
                                       </label>

          {/* Bio Section */}
                  <div className="bio-section slide-in">
                    <label>
                      Personal Bio
                      <textarea
                        name="bio"
                        rows="4"
                        placeholder="Write a short bio about yourself..."
                        value={form.bio}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

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
          {form.email && (
            <div className="qr zoom-in">
              <QRCodeCanvas
                value={`${form.email}`}
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
