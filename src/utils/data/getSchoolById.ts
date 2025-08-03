import { mockSchools } from "../../../../shared/mocks/schools";

export const getSchoolById = (id: string) => {
  return mockSchools.find((school) => school.id === id) || null;
};