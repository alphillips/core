
module.exports = function(app) {

  app.get('/v1/user', function (req, res) {
    var user = {
      clientId:null,
      clientGroupPartyId:125807,
      partyId:122724,
      firstName:"Jon",
      lastName:"Snow",
      exporterPartyIds:[125808,125809],
      defaultExporterId:125808
    }

    res.json(user)
  })

}
