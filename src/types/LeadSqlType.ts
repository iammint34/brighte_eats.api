type LeadSqlType = {
  [key: string]: {
    id?: number;
    uuid?: string;
    name?: string;
    email?: string;
    mobile?: string;
    postcode?: string;
    services?: string;
  };
};

export default LeadSqlType;
