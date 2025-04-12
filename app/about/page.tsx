'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const skills = [
    { name: 'Web Development', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Mobile Development', level: 80 },
    { name: 'Project Management', level: 75 },
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'UI Frameworks', level: 90 },
  ];

  const experiences = [
    {
      year: '2020 - Present',
      title: 'Senior Web Developer',
      company: 'Tech Solutions Inc.',
      description: 'Leading web development projects and mentoring junior developers.',
      icon: '💼',
    },
    {
      year: '2018 - 2020',
      title: 'UI/UX Designer',
      company: 'Creative Design Studio',
      description: 'Creating user-centered designs for web and mobile applications.',
      icon: '🎨',
    },
    {
      year: '2016 - 2018',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Building responsive websites and implementing modern UI components.',
      icon: '💻',
    },
  ];

  const education = [
    {
      year: '2012 - 2016',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      description: 'Focused on web technologies and software engineering.',
      icon: '🎓',
    },
    {
      year: '2016 - 2018',
      degree: 'Master of Science in Human-Computer Interaction',
      school: 'Design Institute',
      description: 'Specialized in user experience design and interaction patterns.',
      icon: '📚',
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2021',
      icon: '☁️',
    },
    {
      name: 'Google Professional Web Developer',
      issuer: 'Google',
      year: '2020',
      icon: '🌐',
    },
    {
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      year: '2019',
      icon: '🔄',
    },
  ];

  return (
    <div className="mt-14 pt-24 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 animate-slide-down text-text-primary">About Us</h1>
        
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="w-48 h-48 rounded-full overflow-hidden 
            bg-gradient-to-br from-secondary/50 to-secondary/80 flex-shrink-0 animate-slide-left">
              <div className="w-full h-full flex items-center justify-center text-text-secondary">
                <Image src="/webnexter.png" alt="Profile" width={192} height={192} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left animate-slide-left">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">John Doe</h2>
              <p className="text-xl text-text-secondary mb-4">
                A passionate full-stack developer with 5+ years of experience in building modern web applications.
                I specialize in React, Node.js, and cloud technologies.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link
                  href="/contact"
                  className="button-tech-big button-tech-big-hover hover:animate-pulse duration-700"
                >
                  Contact Me
                </Link>
                <Link
                  href="/resume.pdf"
                  className="button-tech-big button-tech-big-hover hover:animate-pulse duration-700"
                >
                  Download CV
                </Link>
              </div>
            </div>
          </div>


        {/* Skills Section */}
        <div className="mb-16 animate-slide-bottom">
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-text-primary font-medium">{skill.name}</span>
            <span className="text-text-secondary text-sm">{skill.level}%</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
            {/* Filled progress bar */}
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-in-out rounded-full"
              style={{
                width: `${skill.level}%`,
                transitionDelay: `${index * 100}ms`,
              }}
            ></div>

            {/* End circle indicator */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-primary bg-white transition-all duration-1000 ease-in-out
              ${skill.level >= 90 ? 'animate-pulse-glow shadow-[0_0_10px_rgba(255,255,255,0.6)]' : ''}`}
              style={{
                left: `calc(${skill.level}% - 0.5rem)`,
                transitionDelay: `${index * 100}ms`,
              }}
                    ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Experience</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Senior Full-Stack Developer',
                company: 'Tech Corp',
                period: '2020 - Present',
                description: 'Leading development of enterprise web applications using React and Node.js.',
              },
              {
                title: 'Web Developer',
                company: 'Digital Agency',
                period: '2018 - 2020',
                description: 'Developed and maintained client websites using modern web technologies.',
              },
            ].map((job, index) => (
              <div key={index} className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{job.title}</h3>
                <p className="text-text-secondary mb-2">{job.company}</p>
                <p className="text-text-light mb-4">{job.period}</p>
                <p className="text-text-secondary">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Education</h2>
          <div className="space-y-6">
            {[
              {
                degree: 'Master of Science in Computer Science',
                school: 'University of Technology',
                period: '2016 - 2018',
              },
              {
                degree: 'Bachelor of Science in Software Engineering',
                school: 'State University',
                period: '2012 - 2016',
              },
            ].map((edu, index) => (
              <div key={index} className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{edu.degree}</h3>
                <p className="text-text-secondary mb-2">{edu.school}</p>
                <p className="text-text-light">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                date: '2021',
              },
              {
                name: 'Google Cloud Professional Developer',
                issuer: 'Google Cloud',
                date: '2020',
              },
            ].map((cert, index) => (
              <div key={index} className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{cert.name}</h3>
                <p className="text-text-secondary mb-2">{cert.issuer}</p>
                <p className="text-text-light">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
} 