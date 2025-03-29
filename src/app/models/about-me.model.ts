export interface Experience {
  title: string;
  company: string;
  description: string[];
  expanded: boolean;
  startDate: string;
  endDate: string;
  tags: string[];
}

export interface Education {
  degree: string;
  details: string;
  expanded: boolean;
  startYear: string;
  endYear: string;
}

export interface Skill {
  name: string;
  icon: string;
}
