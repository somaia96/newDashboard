
  export const datasetDecision = [
    {
        decision: 57,
      month: 'كانون2',
    },
    {
        decision: 52,
      month: 'شباط',
    },
    {
        decision: 93,
      month: 'اذار',
    },
    {
        decision: 56,
      month: 'نيسان',
    },
    {
        decision: 69,
      month: 'ايار',
    },
    {
        decision: 63,
      month: 'حزيران',
    },
    {
        decision: 80,
      month: 'تموز',
    },
    {
        decision: 60,
      month: 'اب',
    },
  ];
  export const datasetNews = [
    {
        news: 57,
      month: 'كانون2',
    },
    {
        news: 52,
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
        news: 69,
      month: 'ايار',
    },
    {
        news: 63,
      month: 'حزيران',
    },
    {
        news: 80,
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
        event: 52,
      month: 'شباط',
    },
    {
        event: 93,
      month: 'اذار',
    },
    {
        event: 56,
      month: 'نيسان',
    },
    {
        event: 69,
      month: 'ايار',
    },
    {
        event: 63,
      month: 'حزيران',
    },
    {
        event: 80,
      month: 'تموز',
    },
    {
        event: 60,
      month: 'اب',
    },
  ];
  export const datasetServices = [
    {
        services: 57,
      month: 'كانون2',
    },
    {
        services: 52,
      month: 'شباط',
    },
    {
        services: 93,
      month: 'اذار',
    },
    {
        services: 56,
      month: 'نيسان',
    },
    {
        services: 69,
      month: 'ايار',
    },
    {
        services: 63,
      month: 'حزيران',
    },
    {
        services: 80,
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