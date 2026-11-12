import CalculatorPage from "@/components/pages/CalculatorPage";
import { calculatorMetadata } from "@/lib/calculator-seo";
export const metadata = calculatorMetadata();
export default function Page() { return <CalculatorPage />; }
