export default function Whoami() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
      {/* About Section */}
      <div className="brand-border bg-accent-blue">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">[ About ]</h2>
        <p className="leading-relaxed mb-3 text-white text-sm sm:text-base">
          I build stuff, mostly Backend oriented, but I'm getting good with frontend as well. My experience mostly covers full stack applications,
          B2B projects, blockchain integrations and smart contracts. Also love tinkering with servers, barebone hardware and Linux systems in general.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="brand-border">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-accent-green">[ Tech Stack ]</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-accent-blue">Languages</h3>
            <ul className="list-disc list-inside space-y-1 opacity-90 text-sm sm:text-base">
              <li>TypeScript</li>
              <li>Python</li>
              <li>Solidity</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-accent-blue">Full Stack Libs</h3>
            <ul className="list-disc list-inside space-y-1 opacity-90 text-sm sm:text-base">
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Express.js</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-accent-blue">DevOps & Tools</h3>
            <ul className="list-disc list-inside space-y-1 opacity-90 text-sm sm:text-base">
              <li>Linux (Arch or Deb based)</li>
              <li>Docker</li>
              <li>Git</li>
              <li>AWS/Azure</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-accent-blue">Currently Learning</h3>
            <ul className="list-disc list-inside space-y-1 opacity-90 text-sm sm:text-base">
              <li>Rust</li>
              <li>Golang</li>
              <li>C/C++</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Projects/Experience Section */}
      <div className="brand-border">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-accent-green">[ What I Build ]</h2>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-accent-blue">Web Applications</h3>
            <p className="opacity-90 text-sm sm:text-base">Full-stack applications with modern frameworks, focusing on performance and user experience.</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-accent-blue">Backend Systems</h3>
            <p className="opacity-90 text-sm sm:text-base">Scalable APIs, microservices, and database architectures for complex business logic.</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-accent-blue">Blockchain & Smart Contracts</h3>
            <p className="opacity-90 text-sm sm:text-base">Solidity, Ethereum, and other blockchain technologies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
