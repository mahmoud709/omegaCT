import { hrArabic } from "../language";
import HRLoginForm from "./HRLoginForm";
export default async function HRLoginPage() {
  return <HRLoginForm ar={await hrArabic()} />;
}
