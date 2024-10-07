// import components
import Hero from "./components/Hero";
import Navbar from "./Layouts/Navbar";
import Skills from "./components/Skills";
import Service from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Hireme from "./components/Hireme";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
// Animation package
import Aos from "aos";
import "aos/dist/aos.css";
import { fetchHomePage } from "./untils/GlobalApi";

const App = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });

    const loadHomePage = async () => {
      try {
        const data = await fetchHomePage("vi");
        setHomeData(data);
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomePage();
  }, []);

  console.log(homeData);
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Skills />
      <Service />
      <Projects />
      <Testimonials />
      <Hireme />
      <Contact />
      <footer className="p-3 text-center">
        <h6 className="mb-3">Huynh ca</h6>
        <p>© All CopyRights Reserved 2024</p>
      </footer>
    </div>
  );
};

export default App;
