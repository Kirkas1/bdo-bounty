'use strict';
const angular = require('angular');

export class bountyCardComponent {
	date = new Date();

	cardInfo = {
		user: {
			name: "Placeholder",
			karma: 3.5
		},
		reward: {
			name: "Artisan's Memory",
			quantity: 10,
		},
		dateCreated: new Date(date.getFullYear(), date.getMonth(), 1)
	}
	/*@ngInject*/
	constructor($log) {

		this.message = 'World';
		$log.debug("Boom");
	}

	getAge(postDate) {
		if(angular.isDate(postDate)) {
			var currentDate = new Date();
			return currentDate - postDate;
		} else {
			$log.debug("Error!");
			return 0;
		}
	}
}

export default angular.module('directives.bountyCard', [])
	.component('bountyCard', {
		template: require('./bountyCard.html'),
		bindings: {
			message: '<'
		},
		controller: bountyCardComponent
	})
	.name;
