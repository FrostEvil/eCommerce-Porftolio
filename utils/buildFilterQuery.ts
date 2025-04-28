import { FiltersProps } from "@/types/type";

export const buildFilterQueryRoute = (filters: FiltersProps) => {
  const params = new URLSearchParams();

  params.append("page", "1");

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v.toString()));
    } else if (value && value !== 299) {
      params.append(key, value.toString());
    }
  });

  return `/books?${params.toString()}`;
};

export const filterQuery = (filters: FiltersProps) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v.toString()));
    } else if (value && value !== 299) {
      params.append(key, value.toString());
    }
  });

  return `&${params.toString()}`;
};
