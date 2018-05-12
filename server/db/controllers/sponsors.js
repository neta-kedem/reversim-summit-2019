import Sponsor from '../models/sponsor';
import passport from 'passport';
import _ from 'lodash';
import cloudinary from 'cloudinary';
import shuffler from 'shuffle-seed';

async function all(req, res) {
  const sponsors = await getAllSponsors(true);
  return res.status(200).send(sponsors);
}

async function getAllSponsors(shouldShuffle) {
  let sponsors = await Sponsor.find({});
  if (shouldShuffle) {
    const shuffleSeed = String(Date.now());
    sponsors = shuffler.shuffle(sponsors, shuffleSeed);
  }

  return sponsors;
}

async function add(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  let sponsor = _.clone(req.body);

  sponsor.created_at = new Date();
  sponsor.updated_at = new Date();

  const model = await Sponsor.create(sponsor);
  return res.status(200).send(model);
}

async function update(req, res) {
  if (!req.user || !req.user.isReversimTeamMember) return res.sendStatus(401);
  const sponsor = await Sponsor.findOne({ _id: req.params.id });
  if (!sponsor) {
    console.error('error in sponsor update - no sponsor found');
    return res.status(500).send('Something went wrong getting the data');
  } else {
    req.body.updated_at = new Date();
    const data = _.omit(req.body, ['_id']);
    await Sponsor.findOneAndUpdate({ _id: req.params.id }, data);
    return res.sendStatus(200);
  }
}

function remove(req, res) {

}

export default {
  all,
  add,
  update,
  remove,

  getAllSponsors
}