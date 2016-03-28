var babelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');

var graphqlUrl = 'http://localhost:3000/graphql';
//var graphqlUrl = 'http://www.GraphQLHub.com/graphql';

var response = request('POST', graphqlUrl, {
	qs: {
		query: introspectionQuery
	}
});

var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = babelRelayPlugin(schema.data, {
	abortOnError: true
});
