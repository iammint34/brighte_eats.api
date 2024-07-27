import querySync from '../libraries/querySync';
import qryGetLeads from '../queries/select/qryGetLeads';
import LeadSqlType from '../types/LeadSqlType';

const getLeads = async (filters: LeadSqlType = {}) => {
  const [query, replacements] = qryGetLeads(filters);
  return querySync(query, replacements);
};

export default getLeads;
