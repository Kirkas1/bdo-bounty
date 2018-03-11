import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

	awesomeThings = [];
	newThing = '';
	loading = false;

	/*@ngInject*/
	constructor($http, $log) {
		this.$http = $http;
		this.$log = $log;
	}

	$onInit() {
		this.$log.debug("Ya we're doing it");
		this.loading = true;
		this.$http.get('/api/things')
			.then(response => {
				this.$log.debug("Wowzers!!", response);
				// [{
				// 	user: {
				// 		name: "Kirkas",
				// 		karma: 5
				// 	},
				// 	reward: {
				// 		name: "Artisan's Memory",
				// 		quantity: 10,
				// 	},
				// 	dateCreated: new Date(date.getFullYear(), date.getMonth(), 1)
				// }, {
				// 	user: {
				// 		name: "Finnius",
				// 		karma: 4.5
				// 	},
				// 	reward: {
				// 		name: "Pearls",
				// 		quantity: 1000
				// 	},
				// 	dateCreated: new Date(2017, date.getMonth(), 1)
				// }, {
				// 	user: {
				// 		name: "Winston",
				// 		karma: 2
				// 	},
				// 	reward: {
				// 		name: "Pearls",
				// 		quantity: 10000
				// 	},
				// 	dateCreated: new Date()
				// }]
				this.bountyCards = response.data;

				for(var i = 0; i < this.bountyCards.length; i++) {
					var card = this.bountyCards[i];

					 // Checks to see if there is a .5 on our karma to make the display easier
					if(card.user.karma % 1 !== 0) {
						card.user.halfKarma = true;
					}
				}
				this.loading = false;
			});
	}

	addThing() {
		if (this.newThing) {
			this.$http.post('/api/things', {
				name: this.newThing
			});
			this.newThing = '';
		}
	}

	getArrayOfLength = function(n) {
		this.$log.debug("Here");
		return new Array(Math.floor(n));
	}

	deleteThing(thing) {
		this.$http.delete(`/api/things/${thing._id}`);
	}
}

export default angular.module('bdoBountyApp.main', [uiRouter])
	.config(routing)
	.component('main', {
		template: require('./main.html'),
		controller: MainController
	})
	.name;
