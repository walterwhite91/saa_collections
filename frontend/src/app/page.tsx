import { HeroSection } from "@/components/sections/HeroSection";
import { CollectionFeature } from "@/components/sections/CollectionFeature";
import { EditorialBlocks } from "@/components/sections/EditorialBlocks";
import { CuratedEssentials } from "@/components/sections/CuratedEssentials";
import { BrandStory } from "@/components/sections/BrandStory";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { SocialGallery } from "@/components/sections/SocialGallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroSection />
      <CollectionFeature />
      <EditorialBlocks />
      <CuratedEssentials />
      <BrandStory />
      <ValuesSection />
      <SocialGallery />
    </main>
  );
}
