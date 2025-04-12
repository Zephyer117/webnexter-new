import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ServiceFeaturesProps {
  features?: Feature[];
  title?: string;
  subtitle?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: "Creative Ideas",
    description: "At Webnexter, we excel in innovative, out-of-the-box solutions. Our creative thinking drives unique, impactful web development and design.",
  },
  {
    title: "100% Responsive",
    description: "We ensure your website looks and works perfectly on all devices. Our responsive design guarantees a seamless user experience.",
  },
  {
    title: "Online Business",
    description: "We help you establish a strong digital presence, driving growth and success in the competitive online marketplace.",
  },
];

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  features = defaultFeatures,
  title = "Vision & Values",
  subtitle = "What We're Good At"
}) => {
  return (
    <section className="py-20 bg-gradient-to-tr from-secondary-dark/40 via-secondary/60 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-bottom">
          <h2 className="text-6xl font-semibold text-primary mb-4">{subtitle}</h2>
          <h3 className="text-5xl font-bold text-text-primary">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-left">
          {features.map((feature, index) => (
            <div key={index} className="py-8 px-5 rounded-lg overflow-hidden shadow-md hover:shadow-lg 
            transition-shadow hover-lift bg-gradient-to-br from-secondary-light to-secondary 
            hover:bg-gradient-to-br hover:from-secondary hover:to-secondary-dark duration-500">
              {feature.icon && (
                <div className="text-primary text-4xl mb-4">
                  {feature.icon}
                </div>
              )}
              <h4 className="text-left md:text-center text-xl font-semibold text-text-primary mb-3">{feature.title}</h4>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures; 