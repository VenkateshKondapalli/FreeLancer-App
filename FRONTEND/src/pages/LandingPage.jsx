import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section
        className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-6 md:px-16 py-24 lg:py-32"
        data-aos="fade-up"
      >
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Connect With Top{" "}
            <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Freelancers
            </span>{" "}
            &{" "}
            <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Clients
            </span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg">
            The most intuitive platform for businesses to find talent and for
            professionals to grow their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/signup?role=freelancer"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ring-offset-2"
            >
              Find Work
            </Link>
            <Link
              to="/signup?role=client"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 ring-offset-2"
            >
              Hire Talent
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${
                      i % 2 === 0 ? "women" : "men"
                    }/${30 + i}.jpg`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                500+ Active Users
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                4.9/5 (2K+ Reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2" data-aos="fade-left">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Team collaborating"
              className="w-full max-w-lg mx-auto rounded-xl shadow-2xl border-8 border-white dark:border-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Project Completed
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1.2K+ Success Stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="bg-white dark:bg-gray-800 py-20 lg:py-24 px-6 md:px-16 transition-colors duration-300"
        data-aos="fade-up"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                FreelanceHub
              </span>{" "}
              Stands Out
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Our platform is designed to make connections seamless and
              productive
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Matching",
                desc: "Our AI connects you with ideal partners based on skills and project needs.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                bgColor: "bg-blue-100 dark:bg-blue-900/30",
                image:
                  "https://img.freepik.com/free-vector/handshake-concept-illustration_114360-904.jpg",
              },
              {
                title: "Secure Payments",
                desc: "Escrow protection ensures you only pay for satisfactory work.",
                icon: (
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                bgColor: "bg-green-100 dark:bg-green-900/30",
                image:
                  "https://img.freepik.com/free-vector/secure-payment-concept-illustration_114360-2284.jpg",
              },
              {
                title: "Real Collaboration",
                desc: "Built-in tools for messaging, file sharing, and milestone tracking.",
                icon: (
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                bgColor: "bg-purple-100 dark:bg-purple-900/30",
                image:
                  "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg",
              },
            ].map(({ title, desc, icon, bgColor, image }, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200/80 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 p-6 rounded-2xl text-center shadow-md hover:shadow-2xl hover:-translate-y-2 transform flex flex-col group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="mb-4 h-40 aspect-[4/3] flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div
                  className={`inline-block ${bgColor} p-3 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 flex-grow">
                  {desc}
                </p>
                <button className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline self-center">
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Freelancers" },
              { number: "5K+", label: "Clients" },
              { number: "25K+", label: "Projects" },
              { number: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="bg-gray-100 dark:bg-gray-800/50 py-20 px-6 md:px-16 transition-colors duration-300"
        data-aos="fade-up"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                desc: "Highlight your skills or project needs",
                image:
                  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              },
              {
                step: "2",
                title: "Find Matches",
                desc: "Browse or get recommended connections",
                image:
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              },
              {
                step: "3",
                title: "Start Collaborating",
                desc: "Use our tools to work together effectively",
                image:
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-md opacity-70"></div>
                  <div className="relative bg-white dark:bg-gray-700 w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500 dark:border-blue-400 group">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      {item.step}
                    </span>
                  </div>
                </div>
                <div className="mb-6 h-40 w-full overflow-hidden rounded-lg shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="bg-white dark:bg-gray-800 py-20 px-6 md:px-16 transition-colors duration-300"
        data-aos="fade-up"
      >
        <div className="container mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Success{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "FreelanceHub helped me build a sustainable freelance career with great clients.",
                name: "Sarah K.",
                role: "UX Designer",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                rating: 5,
              },
              {
                quote:
                  "Found our lead developer through FreelanceHub - couldn't be happier!",
                name: "Michael T.",
                role: "Startup Founder",
                image: "https://randomuser.me/api/portraits/men/36.jpg",
                rating: 5,
              },
              {
                quote:
                  "The payment protection gives me confidence to take on bigger projects.",
                name: "David L.",
                role: "Full Stack Developer",
                image: "https://randomuser.me/api/portraits/men/54.jpg",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-blue-500 dark:border-blue-400"
                />
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-gray-500 dark:text-gray-300 mb-4 text-lg italic">
                  "{testimonial.quote}"
                </div>
                <div className="font-bold text-gray-800 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 py-20 px-6 text-center transition-colors duration-300 relative overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Work?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community of professionals and businesses achieving more
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup?role=freelancer"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 dark:text-blue-800 font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Freelancing
            </Link>
            <Link
              to="/signup?role=client"
              className="inline-block bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-200 dark:bg-gray-800/70 transition-colors duration-300">
        <div className="container mx-auto py-8 px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FreelanceHub. All rights
              reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-sm text-gray-500 dark:text-gray-500">
            Illustrations by Freepik, Images by Unsplash
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
