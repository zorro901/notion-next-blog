import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {/*  */}
        <Navbar />
        {/*  */}
        <main></main>
        {/*  */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
