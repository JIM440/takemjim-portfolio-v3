
export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  content: string;
  rating: number;
  image: string;
}


export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  media: string[];
  servicesRendered: string[];
  tools?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  categories: ("web" | "mobile" | "design")[];
}