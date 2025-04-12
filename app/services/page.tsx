import React from 'react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceCategories from '@/components/services/ServiceCategories';
import ServiceCTA from '@/components/services/ServiceCTA';

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
      <ServiceHero />
      <ServiceFeatures />
      <ServiceCategories />
      <ServiceCTA />
    </div>
  );
} 