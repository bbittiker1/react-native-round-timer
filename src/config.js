export default (function() {
	//
	// Configurable environment variables set at run-time from public/config.js
	//
	return {
		isBackend: window.ENV.REACT_APP_BACKEND,
		id_token: window.ENV.DEBUG_JWT_TOKEN,
		api_server_url: window.ENV.REACT_APP_API_SERVER_URL,
		is_debug: window.ENV.REACT_APP_IS_DEBUG,
		isDebug: window.ENV.REACT_APP_IS_DEBUG,
		debugUsername: window.ENV.DEBUG_USERNAME,
		debugPassword: window.ENV.DEBUG_PASSWORD,
		apiServerUrl: window.ENV.REACT_APP_API_SERVER_URL,
		environment: window.ENV.REACT_APP_NODE_ENV,
		apiBase: window.ENV.API_BASE,
		idleTimeout: 1000 * 60 * 5,	// 5 minutes
		autoLogoutTime: 30,			// 30 seconds
		googleMapsApiKey: window.ENV.GOOGLE_MAP_KEY
	};
})();
