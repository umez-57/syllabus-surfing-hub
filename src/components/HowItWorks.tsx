
import React from 'react';
import { Upload, Search, Share2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Students and faculty upload study materials including syllabi, notes, and previous year questions.',
    icon: Upload,
    color: 'bg-blue-500'
  },
  {
    number: '02',
    title: 'Search',
    description: 'Find exactly what you need with our powerful search and filtering system by department and type.',
    icon: Search,
    color: 'bg-green-500'
  },
  {
    number: '03',
    title: 'Share',
    description: 'Access, download, and share knowledge with your fellow students to build a stronger academic community.',
    icon: Share2,
    color: 'bg-purple-500'
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white text-center mb-16">
          How It <span className="text-accent">Works</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-6 z-10">
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
              )}

              {/* Step Card */}
              <div className="brutalist-card text-center">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-black font-bold text-2xl rounded-full mb-6 border-4 border-black">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${step.color} text-white rounded-lg mb-6 border-4 border-black`}>
                  <step.icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
