import FeaturedFacilities from "@/components/FeaturedFacilities";
import HeroBanner from "@/components/HeroBanner";
import MissionVision from "@/components/Mission";
import TipsSection from "@/components/TipsSection";

import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroBanner></HeroBanner>
    <FeaturedFacilities></FeaturedFacilities>
    <TipsSection></TipsSection>
    <MissionVision></MissionVision>
    </>
  );
}
