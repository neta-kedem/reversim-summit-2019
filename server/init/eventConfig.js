import moment from 'moment-timezone';

const config = {
  cfpStateDate: process.env.CFP_START_DATE ||  "2018-04-25",
  cfpEndDate: process.env.CFP_END_DATE || "2018-05-31",
  votingStartDate: process.env.VOTING_START_DATE || "2018-06-01",
  votingEndDate: process.env.VOTING_END_DATE || "2018-06-10",
}

export default () => {
  const cfp = moment().tz('Israel').isBetween(config.cfpStateDate, config.cfpEndDate, 'day', "[]");
  const voting = moment().tz('Israel').isBetween(config.votingStartDate, config.votingEndDate, 'day', "[]");
  
  return {
    cfpStateDate: config.cfpStateDate,
    cfpEndDate: config.cfpEndDate,
    votingStartDate: config.votingStartDate,
    votingEndDate: config.votingEndDate,
    cfp,
    voting,
  }
}
