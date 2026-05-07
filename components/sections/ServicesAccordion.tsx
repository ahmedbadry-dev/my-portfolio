"use client";

import { useState } from "react";

import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/types/sanity";

type ServicesAccordionProps = Readonly<{
  services: readonly Service[];
}>;

function getInitialServiceId(services: readonly Service[]) {
  const featuredService = services.find((service) => service.featured);
  return featuredService?._id ?? services[0]?._id ?? null;
}

export function ServicesAccordion({ services }: ServicesAccordionProps) {
  const [openServiceId, setOpenServiceId] = useState<string | null>(() =>
    getInitialServiceId(services)
  );

  const handleToggle = (serviceId: string) => {
    setOpenServiceId((current) => (current === serviceId ? null : serviceId));
  };

  return (
    <div className="mt-3xl grid gap-md md:mt-[54px]">
      {services.map((service, index) => (
        <ServiceCard
          index={index}
          isOpen={openServiceId === service._id}
          key={service._id}
          onToggle={handleToggle}
          service={service}
        />
      ))}
    </div>
  );
}
