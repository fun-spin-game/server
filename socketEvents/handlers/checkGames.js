export default async ({
  ws,
  gameCtrl,
}) => {
  const {
    expiredGamesIds,
    createdGames,
    notifyUsersCreatorsIdsAboutGameExpired,
    usersToUpdate,
  } = await gameCtrl.checkAndExpireNotExpiredGames();
  if (usersToUpdate.length) {
    usersToUpdate.forEach(o => ws.send(o.id, 'USER_UPDATED', o));
  }
  if (expiredGamesIds.length || createdGames.length) {
    ws.send('*', 'PLAYGROUND_UPDATED', {
      expiredGamesIds,
      gameUserDisconnectGameActions: [],
      createdGames: createdGames.map(o => ({ ...o.toJSON(), creatorUser: o.creatorUser.toJSON() })),
      notifyUsersCreatorsIdsAboutGameExpired,
    });
  }
};
