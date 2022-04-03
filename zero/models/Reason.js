const Sequelize = require('sequelize')
const db = require('../../db/connection')

const Reasons = db.define('reason', {
   numberID: {
      type: Sequelize.INTEGER
   },
   register: {
      type: Sequelize.INTEGER
   },
   like: {
      type: Sequelize.TEXT
   },
   proud: {
      type: Sequelize.TEXT
   },
   work: {
      type: Sequelize.TEXT
   },
   organization: {
      type: Sequelize.TEXT
   } 
}) // Criando todas as variáveis no banco de dados

module.exports = Reasons
