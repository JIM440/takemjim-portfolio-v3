import ServiceCard from './ServiceCard';
const ServiceList = ({
  services,
}: {
  services: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }[];
}) => {
  return (
    <div className="grid grid-cols-none gap-10 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          name={service.name}
          description={service.description}
          imageUrl={service.imageUrl}
        />
      ))}
    </div>
  );
};

export default ServiceList;
