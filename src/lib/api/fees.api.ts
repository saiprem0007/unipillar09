import api from '../axios';

export interface CollegeFee {
  collegeName: string;
  collegeShortName: string;
  fees: number;
  instType: 'IIT' | 'NIT' | 'IIIT' | 'OTHER';
}

export const fetchFeesByType = async (type: string): Promise<CollegeFee[]> => {
  const { data } = await api.get<CollegeFee[]>(`/fees/by-type?type=${type}`);
  return data;
};

export const fetchFeeLookup = async (shortName: string): Promise<CollegeFee | null> => {
  const { data } = await api.get<CollegeFee>(`/fees/lookup?shortName=${encodeURIComponent(shortName)}`);
  if ('error' in data) return null;
  return data;
};