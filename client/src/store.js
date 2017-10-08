import { observable } from 'mobx';
import { getSessions, getTeam, getProposal, getMe } from './data-service';
import uniqBy from 'lodash/uniqBy';
import flatMap from 'lodash/flatMap';

const store = observable({
  speakers: [],
  sessions: [],
  team: [],
  showTeamMember: null,
  onTeamMemberClick: id => {
    store.showTeamMember = store.showTeamMember === id ? null : id;
  },
  selectedDate: 0,
  setSelectedDate: i => store.selectedDate = i,
  isSmallScreen: window.innerWidth < 576,
  user: { isFetching: true },
  onLogout: () => store.user = { authenticated: false },
	getProposal: (id) => getProposal(id).then(proposal => {
    store.sessions = store.sessions.concat(processSession(proposal));
  }),
	isUploadingPhoto: false,
  onUploadingPhoto: () => {
    store.isUploadingPhoto = true;
  },
  onPhotoUploaded: (url) => {
    store.isUploadingPhoto = false;
    console.log("user", store.user);
    store.user = { ...store.user, picture: url };
    const speaker = store.speakers.find(x => x.id === store.user.id);
    if (speaker) speaker.picutre = url;
  }
});

export default store;

const processSession = session => ({
	...session,
	speaker_ids: session.speaker_ids.map(speaker => ({
		...speaker,
		picture: speaker.picture.replace("/dtltonc5g/image/upload/", "/dtltonc5g/image/upload/w_300/")
	}))
});;

getTeam().then(team => {
  store.team = team;
});

getSessions().then(sessions => {
  const processedSessions = sessions.map(processSession);
  store.sessions = processedSessions;

  store.speakers = uniqBy(flatMap(processedSessions, session => session.speaker_ids), x => x._id)
    .map(x => ({
      ...x,
      sessions: filterSessions(x.proposals)
    }))
    .sort((a, b) => {
      if (a.name === "Sheizaf Rafaeli") return -1;
      if (b.name === "Sheizaf Rafaeli") return 1;
      if (a.name === "Randy Shoup") return -1;
      if (b.name === "Randy Shoup") return 1;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    });
});

getMe().then(user => {
  if (user.proposals) {
		user.sessions = filterSessions(user.proposals);
  }
  store.user = user;
});

const filterSessions = sessionIds => sessionIds.map(p => store.sessions.find(session => session._id === p)).filter(x => !!x)

window.__store = store;