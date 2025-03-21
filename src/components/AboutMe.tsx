'use client';

import Image from 'next/image';

export default function AboutMe() {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row gap-8">
      {/* Experience Section */}
      <div className="lg:w-2/3">
        <div className="flex flex-col items-center text-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/avatar.jpeg`}
            alt="Lê Hải Triều"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-600 shadow-md"
          />
          <h1 className="text-3xl font-bold mt-4">Lê Hải Triều</h1>
          <p className="text-gray-500 text-lg">Experienced Android Developer | Mobile Enthusiast 🚀</p>

          {/* Social Links */}
          <div className="mt-4 flex justify-center gap-6">
            <a 
              href="https://github.com/trieulh-ict" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white bg-gray-800 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-700 transition-all"
            >
              🌐 GitHub
            </a>
            <a 
              href="https://linkedin.com/in/le-hai-trieu-71443711b/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-500 transition-all"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-6 text-gray-700 text-center">
          <p>
            I’m an <strong>Android developer</strong> with <strong>10+ years</strong> of experience, passionate about building smooth, high-performance mobile applications. 
            I thrive in <strong>product-driven environments</strong> where I can contribute to impactful mobile experiences.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b pb-2">📌 Professional Experience</h2>
          <ul className="mt-4 space-y-6">
            {[
              { title: "Senior Android Developer", company: "CIMB Thai Bank", duration: "Oct 2022 - Present", description: "Leading fintech Android development for seamless banking solutions." },
              { title: "Senior Android Developer", company: "Zipmex", duration: "Jun 2022 - Sep 2022", description: "Developed secure crypto trading applications." },
              { title: "Senior Android Developer", company: "Techcombank (TCB)", duration: "Jan 2022 - Jun 2022", description: "Built and optimized mobile banking applications." },
              { title: "Senior Android Developer", company: "One Mount Group", duration: "Oct 2019 - Dec 2021", description: "Enterprise-level Android development and best practices." },
              { title: "Senior Android Developer", company: "Planday", duration: "Sep 2018 - Oct 2019", description: "Android and Kotlin development for scalable apps." },
              { title: "Android Developer (Mid.)", company: "Got It", duration: "Jan 2017 - Sep 2018", description: "Worked on Android projects using Java and React Native." },
              { title: "Android Developer", company: "Airpoli", duration: "Mar 2016 - 2017", description: "Developing Android applications for an education startup." },
              { title: "Software Engineer", company: "Samsung Vietnam Mobile R&D Center", duration: "Jun 2014 - Mar 2016", description: "Worked on mobile software development for Samsung devices." },
            ].map((job, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md shadow">
                <h3 className="text-xl font-semibold">{job.title} @ {job.company}</h3>
                <p className="text-gray-500">{job.duration}</p>
                <p className="mt-2 whitespace-pre-line">{job.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack & Skills and Education Sections */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        {/* Skills Section */}
        <div className="bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-2xl font-semibold border-b pb-2">💡 Tech Stack & Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Android (Kotlin & Java)", "React Native", "Flutter", "React", "Git", "CI/CD", "Clean Architecture & MVVM", "Code Review", "Performance Optimization", "Product-Centric Development"].map((skill, index) => (
              <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-2xl font-semibold border-b pb-2">🎓 Education</h2>
          <p className="mt-4">
            <strong>Hanoi University of Science and Technology</strong> <br />
            Engineer&apos;s Degree in <strong>Computer Software Engineering</strong> (2009 - 2014) <br />
            <span className="text-gray-500">ICT Program - Grade: Good</span>
          </p>
        </div>
      </div>
    </div>
  );
}