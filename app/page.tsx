import Navbar from "@/components/Navbar";
import ModernSlider from "@/components/Slider";


const navItems = [
  {
    label: "Home",
    link: "#",
  },
  {
    label: "Products",
    subItems: [
      { label: "Product 1", link: "#product1" },
      { label: "Product 2", link: "#product2" },
      { label: "Product 3", link: "#product3" },
    ],
  },
  {
    label: "Services",
    subItems: [
      { label: "Service 1", link: "#service1" },
      { label: "Service 2", link: "#service2" },
    ],
  },
  {
    label: "About",
    link: "#about",
  },
  {
    label: "Contact",
    link: "#contact",
  },
]

export default function Home() {
  return (
    <>
      <Navbar items={navItems} brand={"Fariborz Rajabi"}/>
      <div>
      <ModernSlider/>
      </div>
    </>
  );
}
