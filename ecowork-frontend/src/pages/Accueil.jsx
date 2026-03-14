import HeroBanner from '../components/HeroBanner'
import ExploreSection from '../components/ExploreSection'
import TechAndFooter from '../components/TechAndFooter'
import ProductivitySection from '../components/ProductivitySection'
import SustainabilitySection from '../components/SustainabilitySection'

export default function Accueil() {
  return (
    <>
      <HeroBanner />
      <ExploreSection />
      <ProductivitySection />
      <SustainabilitySection />
      <TechAndFooter />
    </>
  )
}