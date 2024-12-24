import { BackButton } from "@/lib/twa/components/BackButton";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page">Settings</div>
      <BackButton onClick={() => navigate("/account")} />
    </>
  );
}
