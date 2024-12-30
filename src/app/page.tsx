import Head from "next/head";
import "../styles/Home.css"; // Import the CSS file

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans relative">
      <Head>
        <title>Second Brain Database</title>
        <meta name="description" content="The ultimate tool to organize, manage, and retrieve your knowledge seamlessly." />
      </Head>

      <img
        src="/images/brain_unsplash.jpg"
        alt="Brain"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
      <div className="relative z-10">

        {/* Hero Section */}
        <header className="hero-section">
          <h1 className="hero-title">
            Second Brain Database (SBD)
          </h1>
          <p className="hero-subtitle">
            Your personal knowledge hub for productivity and organization.
          </p>
          <div className="hero-buttons">
            <a
              href="#features"
              className="btn-primary"
            >
              Explore Features
            </a>
            <a
              href="/setup"
              className="btn-secondary"
            >
              Setup
            </a>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="container">
            <h2 className="section-title">
              Why Choose SBD?
            </h2>
            <div className="features-grid">
              <div className="card">
                <h3 className="card-title">Centralized Knowledge</h3>
                <p className="card-text">
                  Keep all your notes, tasks, and references in one place. No more
                  juggling between multiple apps.
                </p>
              </div>
              <div className="card">
                <h3 className="card-title">Intelligent Organization</h3>
                <p className="card-text">
                  SBD organizes your data intuitively, making retrieval a breeze.
                  Smart tags and search make your information instantly
                  accessible.
                </p>
              </div>
              <div className="card">
                <h3 className="card-title">Collaboration Tools</h3>
                <p className="card-text">
                  Share and collaborate on projects with your team effortlessly.
                  Keep everyone on the same page.
                </p>
              </div>
              <div className="card">
                <h3 className="card-title">Customizable Workflows</h3>
                <p className="card-text">
                  Tailor SBD to your needs. Define categories, workflows, and
                  layouts that match your productivity style.
                </p>
              </div>
              <div className="card">
                <h3 className="card-title">Secure and Private</h3>
                <p className="card-text">
                  Your data is encrypted and secure. Only you have access to your
                  Second Brain.
                </p>
              </div>
              <div className="card">
                <h3 className="card-title">Cross-Platform Support</h3>
                <p className="card-text">
                  Access your Second Brain on desktop, mobile, or tablet. Your
                  data stays synced across all devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        

        {/* Footer */}
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Second Brain Database. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
