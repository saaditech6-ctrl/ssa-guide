import { SSA_2026 } from "./2026"
import { SSA_2027 } from "./2027"

export function getSsaParams(year: 2026): typeof SSA_2026
export function getSsaParams(year: 2027): typeof SSA_2027
export function getSsaParams(year: 2026 | 2027): typeof SSA_2026 | typeof SSA_2027 {
  return year === 2026 ? SSA_2026 : SSA_2027
}
