import type { Metadata } from "next"
import BenefitsEstimator from "./BenefitsEstimator"

export const metadata: Metadata = {
  title: "Social Security Benefits Estimator",
  description:
    "Estimate Social Security benefits from your birth year and earnings history, or use quick mode for an illustrative estimate. Compare AIME, PIA, claiming ages, and break-even points.",
  alternates: {
    canonical: "/calculators/benefits-estimator",
  },
}

export default function BenefitsEstimatorPage() {
  return <BenefitsEstimator />
}
