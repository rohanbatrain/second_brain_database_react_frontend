import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Head>
        <title>Second Brain Database</title>
        <meta name="description" content="The ultimate tool to organize, manage, and retrieve your knowledge seamlessly." />
      </Head>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-color to-secondary-color py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Second Brain Database (SBD)
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white">
          Your personal knowledge hub for productivity and organization.
        </p>
        <div className="mt-8">
          <a
            href="#features"
            className="bg-white text-primary-color font-medium px-6 py-3 rounded-full shadow-lg hover:bg-secondary-color hover:text-white transition duration-300"
          >
            Explore Features
          </a>
          <a
            href="#contact"
            className="ml-4 border border-white text-white font-medium px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-primary-color transition duration-300"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose SBD?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Centralized Knowledge</h3>
              <p>
                Keep all your notes, tasks, and references in one place. No more
                juggling between multiple apps.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Intelligent Organization</h3>
              <p>
                SBD organizes your data intuitively, making retrieval a breeze.
                Smart tags and search make your information instantly
                accessible.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Collaboration Tools</h3>
              <p>
                Share and collaborate on projects with your team effortlessly.
                Keep everyone on the same page.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Customizable Workflows</h3>
              <p>
                Tailor SBD to your needs. Define categories, workflows, and
                layouts that match your productivity style.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Secure and Private</h3>
              <p>
                Your data is encrypted and secure. Only you have access to your
                Second Brain.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Cross-Platform Support</h3>
              <p>
                Access your Second Brain on desktop, mobile, or tablet. Your
                data stays synced across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-color text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Building Your Second Brain Today
        </h2>
        <p className="mb-8">
          Sign up now and take control of your knowledge like never before.
        </p>
        <a
          href="#contact"
          className="bg-secondary-color text-primary-color font-medium px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-primary-color transition duration-300"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} Second Brain Database. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}
