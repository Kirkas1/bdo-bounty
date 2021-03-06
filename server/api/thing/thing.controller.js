/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api / things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  upsert
 * PATCH   /api/things/:id          ->  patch
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {
	Thing
} from '../../sqldb';

function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200;
	return function(entity) {
		if (entity) {
			return res.status(statusCode).json(entity);
		}
		return null;
	};
}

function patchUpdates(patches) {
	return function(entity) {
		try {
			// eslint-disable-next-line prefer-reflect
			jsonpatch.apply(entity, patches, /*validate*/ true);
		} catch (err) {
			return Promise.reject(err);
		}

		return entity.save();
	};
}

function removeEntity(res) {
	return function(entity) {
		if (entity) {
			return entity.destroy()
				.then(() => {
					res.status(204).end();
				});
		}
	};
}

function handleEntityNotFound(res) {
	return function(entity) {
		if (!entity) {
			res.status(404).end();
			return null;
		}
		return entity;
	};
}

function handleError(res, statusCode) {
	statusCode = statusCode || 500;
	return function(err) {
		res.status(statusCode).send(err);
	};
}

// Gets a list of Things
export function index(req, res) {
	var date = new Date();

	var sampleCards = [{
		user: {
			name: "Kirkas",
			karma: 5
		},
		reward: {
			name: "Artisan's Memory",
			quantity: 10,
		},
		target: {
			charName: "Hanazura",
			famName: "Miraizura",
			guild: "Mathers",
			class: "Ranger",
			level: 63,
			gearScore: 600,
			server: "Serendia 5",
			location: "Titium Valley"
		},
		motivation: "This guy would not leave me alone. Big bully.",
		dateCreated: new Date(date.getFullYear(), date.getMonth(), 1)
	}, {
		user: {
			name: "Finnius",
			karma: 4.5
		},
		reward: {
			name: "Pearls",
			quantity: 1000
		},
		target: {
			charName: "Hanazura",
			famName: "Miraizura",
			guild: "Mathers",
			class: "Ranger",
			level: 63,
			gearScore: 600,
			server: "Serendia 5",
			location: "Titium Valley"
		},
		motivation: "This guy would not leave me alone. Big bully.",
		dateCreated: new Date(2017, date.getMonth(), 1)
	}, {
		user: {
			name: "Winston",
			karma: 2
		},
		reward: {
			name: "Pearls",
			quantity: 10000
		},
		target: {
			charName: "Hanazura",
			famName: "Miraizura",
			guild: "Mathers",
			class: "Ranger",
			level: 63,
			gearScore: 600,
			server: "Serendia 5",
			location: "Titium Valley"
		},
		motivation: "This guy would not leave me alone. Big bully.",
		dateCreated: new Date()
	}]
	return res.status(200).json(sampleCards);

	// return Thing.findAll()
	// 	.then(respondWithResult(res))
	// 	.catch(handleError(res));
}

// Gets a single Thing from the DB
export function show(req, res) {
	return Thing.find({
			where: {
				_id: req.params.id
			}
		})
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Creates a new Thing in the DB
export function create(req, res) {
	return Thing.create(req.body)
		.then(respondWithResult(res, 201))
		.catch(handleError(res));
}

// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
	if (req.body._id) {
		Reflect.deleteProperty(req.body, '_id');
	}

	return Thing.upsert(req.body, {
			where: {
				_id: req.params.id
			}
		})
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Updates an existing Thing in the DB
export function patch(req, res) {
	if (req.body._id) {
		Reflect.deleteProperty(req.body, '_id');
	}
	return Thing.find({
			where: {
				_id: req.params.id
			}
		})
		.then(handleEntityNotFound(res))
		.then(patchUpdates(req.body))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
	return Thing.find({
			where: {
				_id: req.params.id
			}
		})
		.then(handleEntityNotFound(res))
		.then(removeEntity(res))
		.catch(handleError(res));
}
