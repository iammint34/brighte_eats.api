import LeadSqlType from "../../types/LeadSqlType";


const qryInsertLead = (fields: LeadSqlType): [string, Array<string>] => {
  let columns = '';
  let values = '';
  const replacements: string[] = [];

  const keys = Object.keys(fields);

  keys.forEach((key) => {
    if (key in fields) {
      const value = fields[key];
      if (typeof value === 'string' && (value as string).substring(0, 1).includes(':', 0)) {
        columns += `${key},`;
        values += `${(value as string).substring(1)},`;
      } else if (typeof value === 'string' || typeof value === 'number') {
        columns += `${key},`;
        values += '?,';
        replacements.push(value);
      }
    }
  });

  return [`INSERT INTO leads (${columns.slice(0, -1)}) VALUES (${values.slice(0, -1)})`, replacements];
};

export default qryInsertLead;
