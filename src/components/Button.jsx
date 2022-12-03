import { SocialLoginUI } from "./SocialLogin";

export function Button({ label, onPressed }) {
  return (
    <>
      <button className="primary-btn" onClick={onPressed}>
        {label}
      </button>

      <SocialLoginUI />
      <div className="card">HS</div>
    </>
  );
}
