import { ContactFooter } from "@/components/contact-footer";
import { Description } from "@/components/description";
import { Gallery } from "@/components/gallery";
import { Landing } from "@/components/landing";
import { SlidingImages } from "@/components/sliding-images";

export default function Home() {
  return (
    <main>
      <Landing />
      <Description />
      <Gallery />
      <SlidingImages />
      <ContactFooter />
    </main>
  );
}
