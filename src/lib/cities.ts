export type CitySEO = {
  city: string;
  state: string;
  stateName: string;
  metro: string;
  description: string;
  focusTopics: string[];
};

export const cities: CitySEO[] = [
  {
    city: "new-york",
    state: "new-york",
    stateName: "New York",
    metro: "New York City",
    description: "Social Security and Medicare planning for New York City and surrounding metro-area residents.",
    focusTopics: ["Social Security in New York City", "Medicare NYC", "retirement planning New York", "SSA office New York"],
  },
  {
    city: "los-angeles",
    state: "california",
    stateName: "California",
    metro: "Los Angeles",
    description: "Los Angeles retirement, disability, and Medicare guidance for local benefit planning decisions.",
    focusTopics: ["Social Security in Los Angeles", "Medicare Los Angeles", "Los Angeles SSDI", "SSA office Los Angeles"],
  },
  {
    city: "chicago",
    state: "illinois",
    stateName: "Illinois",
    metro: "Chicago",
    description: "Chicago residents can compare retirement age, disability claims, and Medicare planning with local guidance.",
    focusTopics: ["Social Security in Chicago", "Chicago Medicare", "SSDI Chicago", "Chicago retirement planning"],
  },
  {
    city: "houston",
    state: "texas",
    stateName: "Texas",
    metro: "Houston",
    description: "Houston benefit planning guidance for retirement, survivor claims, disability, and Medicare.",
    focusTopics: ["Social Security in Houston", "Medicare Houston", "SSDI Houston", "Houston retirement benefits"],
  },
  {
    city: "miami",
    state: "florida",
    stateName: "Florida",
    metro: "Miami",
    description: "Miami Social Security guidance for retirement planning, SSA office support, and Medicare coverage.",
    focusTopics: ["Social Security in Miami", "Medicare Miami", "SSI Florida", "SSA office Miami"],
  },
  {
    city: "phoenix",
    state: "arizona",
    stateName: "Arizona",
    metro: "Phoenix",
    description: "Phoenix retirees can review claim timing, Medicare planning, and local office resources for Social Security benefits.",
    focusTopics: ["Social Security in Phoenix", "Arizona retirement benefits", "Phoenix Medicare", "SSA office Phoenix"],
  },
  {
    city: "philadelphia",
    state: "pennsylvania",
    stateName: "Pennsylvania",
    metro: "Philadelphia",
    description: "Philadelphia benefit planning for retirement, SSDI, survivors, and local claim guidance.",
    focusTopics: ["Social Security in Philadelphia", "Medicare Philadelphia", "SSDI Philadelphia", "Philadelphia SSA office"],
  },
  {
    city: "san-francisco",
    state: "california",
    stateName: "California",
    metro: "San Francisco",
    description: "San Francisco Social Security guidance for retirement age decisions and Medicare-related planning.",
    focusTopics: ["Social Security in San Francisco", "SF Medicare", "San Francisco retirement", "SSA office San Francisco"],
  },
  {
    city: "seattle",
    state: "washington",
    stateName: "Washington",
    metro: "Seattle",
    description: "Seattle benefit planning for Social Security, Medicare, and retirement decisions in the Pacific Northwest.",
    focusTopics: ["Social Security in Seattle", "Seattle Medicare", "Washington retirement benefits", "SSA office Seattle"],
  },
  {
    city: "atlanta",
    state: "georgia",
    stateName: "Georgia",
    metro: "Atlanta",
    description: "Atlanta Social Security help for claim planning, survivor benefits, and Medicare enrollment guidance.",
    focusTopics: ["Social Security in Atlanta", "Atlanta Medicare", "Georgia SSDI", "Atlanta SSA office"],
  },
  {
    city: "denver",
    state: "colorado",
    stateName: "Colorado",
    metro: "Denver",
    description: "Denver planning resources for claim timing, retirement income, and Medicare decisions.",
    focusTopics: ["Social Security in Denver", "Medicare Denver", "Colorado retirement benefits", "SSA office Denver"],
  },
  {
    city: "dallas",
    state: "texas",
    stateName: "Texas",
    metro: "Dallas-Fort Worth",
    description: "Dallas-Fort Worth residents can review retirement, survivor, SSDI, and local office planning information.",
    focusTopics: ["Social Security in Dallas", "Dallas Medicare", "SSDI Dallas", "Dallas SSA office"],
  },
  {
    city: "boston",
    state: "massachusetts",
    stateName: "Massachusetts",
    metro: "Boston",
    description: "BostonSocial Security guidance for retirement age decisions, benefit taxes, and Medicare planning.",
    focusTopics: ["Social Security in Boston", "Boston Medicare", "Massachusetts retirement benefits", "Boston SSA office"],
  },
  {
    city: "orlando",
    state: "florida",
    stateName: "Florida",
    metro: "Orlando",
    description: "Orlando local guidance for Social Security planning, disability claims, and Medicare coverage.",
    focusTopics: ["Social Security in Orlando", "Orlando Medicare", "SSDI Orlando", "SSA office Orlando"],
  },
  {
    city: "minneapolis",
    state: "minnesota",
    stateName: "Minnesota",
    metro: "Minneapolis",
    description: "Minneapolis resident guidance for retirement decisions, Medicare, and Social Security office support.",
    focusTopics: ["Social Security in Minneapolis", "Minnesota Medicare", "Minneapolis retirement", "SSA office Minneapolis"],
  },
  {
    city: "charlotte",
    state: "north-carolina",
    stateName: "North Carolina",
    metro: "Charlotte",
    description: "Charlotte local guide for Social Security claim timing, disability, and Medicare planning.",
    focusTopics: ["Social Security in Charlotte", "Medicare Charlotte", "SSDI Charlotte", "SSA office Charlotte"],
  },
  {
    city: "nashville",
    state: "tennessee",
    stateName: "Tennessee",
    metro: "Nashville",
    description: "Nashville retirement planning and local benefit advice for Social Security and Medicare decisions.",
    focusTopics: ["Social Security in Nashville", "Medicare Nashville", "retirement Nashville", "SSA office Nashville"],
  },
  {
    city: "austin",
    state: "texas",
    stateName: "Texas",
    metro: "Austin",
    description: "Austin Social Security planning for retirement income, disability claims, and local office access.",
    focusTopics: ["Social Security in Austin", "Austin Medicare", "SSDI Austin", "Austin SSA office"],
  },
  {
    city: "portland",
    state: "oregon",
    stateName: "Oregon",
    metro: "Portland",
    description: "Portland Social Security guidance covering retirement planning and local Medicare support.",
    focusTopics: ["Social Security in Portland", "Portland Medicare", "Oregon retirement benefits", "SSA office Portland"],
  },
  {
    city: "las-vegas",
    state: "nevada",
    stateName: "Nevada",
    metro: "Las Vegas",
    description: "Las Vegas benefit guidance for retirement income, disability support, and Medicare planning.",
    focusTopics: ["Social Security in Las Vegas", "Vegas Medicare", "Nevada retirement benefits", "SSA office Las Vegas"],
  },
];

export function getCityBySlug(state: string, city: string) {
  return cities.find(
    (item) => item.state === state.toLowerCase() && item.city === city.toLowerCase()
  );
}

export function getMajorCitiesForState(state: string) {
  return cities.filter((item) => item.state === state.toLowerCase());
}
