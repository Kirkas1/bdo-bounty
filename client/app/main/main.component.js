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
				this.bountyCards = response.data;
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
