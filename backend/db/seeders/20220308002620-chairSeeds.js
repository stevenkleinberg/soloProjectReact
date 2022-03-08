'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Chairs', [
      {userId:'1', address:'69420 West Parker Ave', city:'Chicago', state:'Illinois', country:'United States', name:'Ol reliable', description:'A beautiful recling armchair with cupholders, comfort beyond imagination!', price:'150', createdAt: new Date(), updatedAt: new Date()},
      {userId:'2', address:'888 broadway', city:'Chicago', state:'Illinois', country:'United States',name:'showtime!', description:'theatre seats. obstructed view', price:'40', createdAt: new Date(), updatedAt: new Date()},
      {userId:'1', address:'4547 chair st', city:'Chicago', state:'Illinois', country:'United States', name:'El Trono',description:'15th century spanish throne. Feel the royalty in youre buns.', price:'500', createdAt: new Date(), updatedAt: new Date()},
      {userId:'3', address:'1000 keister way', city:'Chicago', state:'Illinois', country:'United States',name:'Chair will be blood', description:'folding chair at wrestlemania. Sit on it, use it as a weapon i dont care!!!!!', price:'200', createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Chairs', null, {});

  }
};
