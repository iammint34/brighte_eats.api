import querySync from '../libraries/querySync';
import qryInsertLead from '../queries/insert/qryInsertLead';
import LeadSqlType from '../types/LeadSqlType';

const insertLead = async (lead: LeadSqlType) => {
  const [query, replacements] = qryInsertLead(lead);
  return querySync(query, replacements);
};

export default insertLead;
