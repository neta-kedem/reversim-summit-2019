import React from 'react';
import {Container, Button} from 'reactstrap';
import {img, body} from './Speaker2.css';
import cn from 'classnames';
import SpeakerSocialLinks from './SpeakerSocialLinks';

const Speaker = ({
  speaker: {name, oneLiner, picture, twitter, github, linkedin, stackOverflow},
}) => (
  <div className="text-white">
    <div style={{backgroundImage: `url('${picture}')`}} alt={name} className={img} />
    <div className={cn(body, 'ml-4 pt-8 pb-4 px-2 bg-emph')}>
      <div className="font-size-md font-weight-bold mb-4">{name}</div>
      <div className="font-size-sm mb-7">{oneLiner}</div>
      <SpeakerSocialLinks {...{twitter, github, linkedin, stackOverflow}} />
    </div>
  </div>
);

const isDownCalc = perRow => index => !((index + perRow - 1) % perRow);

const SpeakersSection = props => {
  const speakers = props.sampleSpeakers.map(s => props.users[s]);
  const perRow = window.innerWidth < 1200 ? 2 : 3;
  const isDown = isDownCalc(perRow);
  return (
    <section className="mb-20">
      <Container>
        <h1 className="mb-14">Speakers</h1>
        <div className="d-flex flex-wrap">
          {speakers.map((speaker, i) => (
            <div
              className={cn('mb-18', {'mt-16': isDown(i), 'mr-8 mr-md-14': (i + 1) % perRow})}
              key={i}>
              <Speaker speaker={speaker} />
            </div>
          ))}
        </div>
        <div className="d-flex align-items-center mt-2">
          <div className="border border-cyan mr-4 flex-1" />
          <a href="/speakers">
            <Button>View all speakers</Button>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default SpeakersSection;
