'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutMe() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in">
      {/* Experience Section */}
      <Card className="lg:w-2/3 p-8 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center text-center p-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/avatar.jpeg`}
            alt="Lê Hải Triều"
            width={120}
            height={120}
            className="rounded-full border-4 border-primary shadow-md transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-3xl font-bold mt-4 text-primary">Lê Hải Triều</h1>
          <p className="text-muted-foreground text-lg">Experienced Android Developer | Mobile Enthusiast 🚀</p>

          {/* Social Links */}
          <div className="mt-4 flex justify-center gap-6">
            <Button asChild variant="outline" size="lg">
              <a 
                href="https://github.com/trieulh-ict" 
                target="_blank" 
                rel="noopener noreferrer" 
              >
                🌐 GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a 
                href="https://linkedin.com/in/le-hai-trieu-71443711b/" 
                target="_blank" 
                rel="noopener noreferrer" 
              >
                💼 LinkedIn
              </a>
            </Button>
          </div>
        </CardContent>

        <div className="mt-6 text-muted-foreground text-center">
          <p>
            I’m an <strong>Android developer</strong> with <strong>10+ years</strong> of experience, passionate about building smooth, high-performance mobile applications. 
            I thrive in <strong>product-driven environments</strong> where I can contribute to impactful mobile experiences.
          </p>
        </div>

        <div className="mt-8">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold border-b pb-2 whitespace-nowrap overflow-hidden text-ellipsis">📌 Professional Experience</CardTitle>
          </CardHeader>
          <ul className="mt-4 space-y-6">
            {[
              { title: "Senior Android Developer", company: "CIMB Thai Bank", duration: "Oct 2022 - Present", description: "Leading fintech Android development for seamless banking solutions." },
              { title: "Senior Android Developer", company: "Zipmex", duration: "Jun 2022 - Sep 2022", description: "Developed secure crypto trading applications." },
              { title: "Senior Android Developer", company: "Techcombank (TCB)", duration: "Jan 2022 - Oct 2022", description: "Built and optimized mobile banking applications." },
              { title: "Senior Android Developer", company: "One Mount Group", duration: "Oct 2019 - Dec 2021", description: "Enterprise-level Android development and best practices." },
              { title: "Senior Android Developer", company: "Planday", duration: "Sep 2018 - Oct 2019", description: "Android and Kotlin development for scalable apps." },
              { title: "Android Developer (Mid.)", company: "Got It", duration: "Jan 2017 - Sep 2018", description: "Worked on Android projects using Java and React Native." },
              { title: "Android Developer", company: "Airpoli", duration: "Mar 2016 - 2017", description: "Developing Android applications for an education startup." },
              { title: "Software Engineer", company: "Samsung Vietnam Mobile R&D Center", duration: "Jun 2014 - Mar 2016", description: "Worked on mobile software development for Samsung devices." },
            ].map((job, index) => (
              <li key={index} className="p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-foreground">{job.title} @ {job.company}</h3>
                <p className="text-muted-foreground">{job.duration}</p>
                <p className="mt-2 whitespace-pre-line text-secondary-foreground">{job.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Tech Stack & Skills and Education Sections */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        {/* Skills Section */}
        <Card className="p-4 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold border-b pb-2 whitespace-nowrap overflow-hidden text-ellipsis">💡 Tech Stack & Skills</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 flex flex-wrap gap-2 p-0">
            {["Android (Kotlin & Java)", "React Native", "Flutter", "React", "Git", "CI/CD", "Clean Architecture & MVVM", "Code Review", "Performance Optimization", "Product-Centric Development"].map((skill, index) => (
              <Badge key={index} variant="default" className="animate-bounce-in-delay" style={{ animationDelay: `${index * 0.1}s` }}>
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="p-4 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold border-b pb-2 whitespace-nowrap overflow-hidden text-ellipsis">🎓 Education</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 p-0 text-muted-foreground">
            <p>
              <strong>Hanoi University of Science and Technology</strong> <br />
              Engineer&apos;s Degree in <strong>Computer Software Engineering</strong> (2009 - 2014) <br />
              <span className="text-muted-foreground">ICT Program - Grade: Good</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}