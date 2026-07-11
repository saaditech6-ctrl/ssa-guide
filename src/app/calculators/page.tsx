import Link from "next/link"
import { Calculator, Clock, TrendingUp, Shield, Heart } from "lucide-react"

export const metadata = {
  title: "Free Social Security Calculators 2026",
  description: "Free calculators for Social Security benefits, retirement age, break-even analysis, Medicare costs, and SSDI eligibility.",
}

const calculators = [
  {
    icon: Calculator,
    title: "Benefits Estimator",
    desc: "Estimate your monthly Social Security retirement benefit at any claiming age using the official SSA formula.",
    href: "/calculators/benefits-estimator",
    color: "#faf0cc",
    iconColor: "#a6760d",
    badge: "Most Popular",
    time: "2 min",
  },
  {
    icon: Clock,
    title: "Full Retirement Age Calculator",
    desc: "Find your exact Full Retirement Age based on your birth year and see how early or late claiming affects your benefit.",
    href: "/calculators/retirement-age",
    color: "#dce6f4",
    iconColor: "#163d7d",
    badge: null,
    time: "1 min",
  },
  {
    icon: TrendingUp,
    title: "Break-Even Calculator",
    desc: "Discover the exact age at which delaying Social Security benefits becomes more profitable than claiming early.",
    href: "/calculators/break-even",
    color: "#d1fae5",
    iconColor: "#065f46",
    badge: null,
    time: "2 min",
  },
  {
    icon: Shield,
    title: "SSDI Eligibility Check",
    desc: "Answer a few simple questions to see if you may qualify for Social Security Disability Insurance benefits.",
    href: "/calculators/ssdi-eligibility",
    color: "#ede9fe",
    iconColor: "#5b21b6",
    badge: null,
    time: "3 min",
  },
  {
    icon: Heart,
    title: "Medicare Cost Estimator",
    desc: "Estimate your Medicare Part A, Part B, and Part D premiums and out-of-pocket costs for 2026.",
    href: "/calculators/medicare-cost",
    color: "#fee2e2",
    iconColor: "#991b1b",
    badge: null,
    time: "2 min",
  },
  {
    icon: Calculator,
    title: "Social Security Tax Calculator",
    desc: "Determine how much of your retirement benefits are taxable based on IRS income benchmarks.",
    href: "/calculators/tax-calculator",
    color: "#fffbeb",
    iconColor: "#d97706",
    badge: "Tax Tool",
    time: "3 min",
  },
]

export default function CalculatorsPage() {
  return (
    <div style={{backgroundColor:"#f0f4fa",minHeight:"100vh"}}>
      <div style={{background:"linear-gradient(135deg, #071530 0%, #0b2045 40%, #102e60 100%)",padding:"3.5rem 0"}}>
        <div className="container-site" style={{maxWidth:"70rem"}}>
          <span style={{fontSize:"0.75rem",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",color:"#e4b325",display:"block",marginBottom:"0.75rem"}}>Free tools</span>
          <h1 className="heading-xl text-white" style={{marginBottom:"1rem"}}>Social Security Calculators</h1>
          <p className="body-lg" style={{color:"#7aa2d3",maxWidth:"36rem"}}>
            All calculators use official SSA formulas. No registration required. Your data never leaves your browser.
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"1.5rem",marginTop:"2rem"}}>
            {["No signup required","SSA-formula based","100% free forever","Data never stored"].map((t,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.875rem",color:"#7aa2d3"}}>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",backgroundColor:"#e4b325"}}/>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site" style={{maxWidth:"70rem",paddingTop:"3rem",paddingBottom:"3rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href} className="card-hover" style={{display:"flex",flexDirection:"column"}}>
              <div style={{padding:"1.75rem",display:"flex",flexDirection:"column",flex:1}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1.25rem"}}>
                  <div style={{width:"48px",height:"48px",borderRadius:"12px",backgroundColor:calc.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <calc.icon size={22} color={calc.iconColor} />
                  </div>
                  <div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
                    {calc.badge && (
                      <span style={{
                        fontSize:"0.7rem",
                        fontWeight:600,
                        padding:"0.2rem 0.6rem",
                        borderRadius:"9999px",
                        backgroundColor: calc.badge === "Most Popular" ? "#faf0cc" : "#ffeec2",
                        color: calc.badge === "Most Popular" ? "#6a4613" : "#78350f"
                      }}>
                        {calc.badge === "Most Popular" ? "⭐ " : "💼 "}{calc.badge}
                      </span>
                    )}
                    <span style={{fontSize:"0.75rem",color:"#4578ba",backgroundColor:"#f0f4fa",padding:"0.2rem 0.6rem",borderRadius:"9999px"}}>
                      {calc.time}
                    </span>
                  </div>
                </div>
                <h2 style={{fontFamily:"var(--font-playfair)",fontSize:"1.2rem",fontWeight:600,color:"#071530",marginBottom:"0.6rem"}}>{calc.title}</h2>
                <p style={{color:"#102e60",fontSize:"0.875rem",lineHeight:1.7,flex:1}}>{calc.desc}</p>
                <div style={{marginTop:"1.25rem",paddingTop:"1rem",borderTop:"1px solid #f0f4fa",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:"0.875rem",fontWeight:500,color:calc.iconColor}}>Open calculator →</span>
                  <calc.icon size={14} color={calc.iconColor} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{marginTop:"3rem",backgroundColor:"#071530",borderRadius:"1rem",padding:"2rem",textAlign:"center"}}>
          <h2 style={{fontFamily:"var(--font-playfair)",fontSize:"1.5rem",fontWeight:600,color:"white",marginBottom:"0.75rem"}}>
            Not sure which calculator to use?
          </h2>
          <p style={{color:"#7aa2d3",fontSize:"0.9rem",marginBottom:"1.5rem"}}>
            Start with the Benefits Estimator — it gives you the clearest picture of your retirement income.
          </p>
          <Link href="/calculators/benefits-estimator" className="btn-primary" style={{display:"inline-flex"}}>
            Start with Benefits Estimator
          </Link>
        </div>
      </div>
    </div>
  )
}