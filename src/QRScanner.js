import { useState } from "react";
import {QrReader} from "react-qr-reader";

export default function QRScanner() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (scannedData) => {
    if (scannedData) {
      try {
        const parsed = JSON.parse(scannedData); // { email: "someone@example.com" }
        const res = await fetch("http://localhost:5000/api/profile/${parsed.email");
        const result = await res.json();

        if (result.success) {
          setProfile(result.user);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Invalid QR code or server error");
      }
    }
  };

  const handleError = (err) => {
    setError("Camera error: " + err.message);
  };

  return (
    <div>
      <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
            //   setScanResult(result?.text);
              console.log("Scanned:", result?.text);
            }
            if (!!error) {
              console.log("Error:", error);
            }
          }}
          style={{ width: '100%' }}
        />

      {profile && (
        <div>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <img src="http://localhost:5000/${profile.profilePic}" alt="profile" width="100" />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}