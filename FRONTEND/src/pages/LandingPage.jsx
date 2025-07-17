import { Link } from "react-router";
import { Navbar } from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-white to-blue-50">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Empowering <span className="text-blue-600">Freelancers</span> &{" "}
            <span className="text-blue-600">Clients</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            FreelanceHub helps businesses find skilled professionals and
            freelancers discover amazing projects.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Freelancing"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose <span className="text-blue-600">FreelanceHub</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "For Freelancers",
              desc: "Showcase your skills, build your portfolio, and find high-paying gigs.",
              icon: "🧑‍💻",
            },
            {
              title: "For Clients",
              desc: "Hire top freelancers for your projects, quickly and securely.",
              icon: "📢",
            },
            {
              title: "Secure & Fast",
              desc: "We provide reliable communication and secure payments.",
              icon: "🔒",
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="bg-blue-50 hover:bg-blue-100 transition p-6 rounded-2xl text-center shadow-sm"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {title}
              </h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
