
  export const datasetDecision = [
    {
        decision: 57,
      month: 'كانون2',
    },
    {
        decision: 17,
      month: 'شباط',
    },
    {
        decision: 93,
      month: 'اذار',
    },
    {
        decision: 46,
      month: 'نيسان',
    },
    {
        decision: 64,
      month: 'ايار',
    },
    {
        decision: 23,
      month: 'حزيران',
    },
    {
        decision: 70,
      month: 'تموز',
    },
    {
        decision: 20,
      month: 'اب',
    },
  ];
  export const datasetNews = [
    {
        news: 57,
      month: 'كانون2',
    },
    {
        news: 92,
      month: 'شباط',
    },
    {
        news: 93,
      month: 'اذار',
    },
    {
        news: 56,
      month: 'نيسان',
    },
    {
        news: 89,
      month: 'ايار',
    },
    {
        news: 23,
      month: 'حزيران',
    },
    {
        news: 40,
      month: 'تموز',
    },
    {
        news: 60,
      month: 'اب',
    },
  ];
  export const datasetEvent = [
    {
        event: 57,
      month: 'كانون2',
    },
    {
        event: 72,
      month: 'شباط',
    },
    {
        event: 93,
      month: 'اذار',
    },
    {
        event: 16,
      month: 'نيسان',
    },
    {
        event: 69,
      month: 'ايار',
    },
    {
        event: 93,
      month: 'حزيران',
    },
    {
        event: 85,
      month: 'تموز',
    },
    {
        event: 20,
      month: 'اب',
    },
  ];
  export const datasetServices = [
    {
        services: 57,
      month: 'كانون2',
    },
    {
        services: 72,
      month: 'شباط',
    },
    {
        services: 93,
      month: 'اذار',
    },
    {
        services: 16,
      month: 'نيسان',
    },
    {
        services: 49,
      month: 'ايار',
    },
    {
        services: 63,
      month: 'حزيران',
    },
    {
        services: 90,
      month: 'تموز',
    },
    {
        services: 60,
      month: 'اب',
    },
  ];
  
  export const valueFormatter = (value: number | null): string => {
    if (value === null) {
      return "N/A"; // Handle null values
    }
    return value.toLocaleString(); // Format as locale-specific number
  };