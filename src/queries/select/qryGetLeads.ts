import LeadSqlType from '../../types/LeadSqlType';

const qryGetLeads = (filter: LeadSqlType = {}): [string, Array<string>] => {
  const replacements: any[] = [];

  //   construct filter
  let whereClause = '';
  if (filter.uuid) {
    whereClause += `\nAND uuid = ?`;
    replacements.push(filter.uuid);
  }

  const query = `
        SELECT * FROM leads
        WHERE true
        ${whereClause}
    `;
  return [query, replacements];
};

export default qryGetLeads;
