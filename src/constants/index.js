import config from "../config";

export const JWT_TOKEN = "id_token";
export const CURRENT_USER = "currentUser";
export const CURRENT_USER_ID = "currentUserId";

// Sidebar/Drawer width when open.
export const DRAWER_WIDTH = 240;

export const APIS = (function() {
	const API_BASE = config.apiBase;

	return {
		login: `${API_BASE}/login`,
		changePassword: `${API_BASE}/change-password`,
		changelog: `${API_BASE}/anomaly/changelog`,
		convicted: `${API_BASE}/anomaly/convicted`,
		markAnomaly: `${API_BASE}/anomaly/add`,
		anomalyCountByTime: (logQuery, from, to) => `${API_BASE}/reports/anomaly/count-time?log=${logQuery}&from=${from}&to=${to}`,
		anomalyDomainCount: (logQuery, from, to) =>`${API_BASE}/reports/anomaly/domain-count?log=${logQuery}&from=${from}&to=${to}`,
		anomalyBaselineCount: (logQuery, from, to) => `${API_BASE}/reports/anomaly/baseline-count?log=${logQuery}&from=${from}&to=${to}`,
		anomalyCountByMan: (logQuery, from, to) => `${API_BASE}/reports/anomaly/count-manufacturer?log=${logQuery}&from=${from}&to=${to}`,
		// devicesByModel: `${API_BASE}/reports/anomaly/devices-model`,
		unpickAnomaly: `${API_BASE}/anomaly/unpick`,
		pickAnomaly: `${API_BASE}/anomaly/pick`,
		addBaseline: `${API_BASE}/baseline-unknown`,
		firewallBaselines: `${API_BASE}/firewall-baselines`,
		deviceByManufacturer: `${API_BASE}/reports/devices/total-devices-manufacturer`,
		devicesByModel: `${API_BASE}/reports/devices/total-devices-model`,
		devicesNew: (logQuery, from, to) => `${API_BASE}/reports/devices/devices-new?log=${logQuery}&from=${from}&to=${to}`,
		devicesHousingInsight: `${API_BASE}/reports/devices/devices-housing-insight`,
		apiBase: API_BASE
	};
})();

export const ENVIRONMENTS = {
	production: "production",
	local: "local",
	dev: "dev"
};

export const META = {
	app: {
		title: "McAfee IOTChangeLog"
	},
	action: {
		logout: "Logout"
	}
};

export const THEME = {
	color: {
		main: "#C01818",
		mainDark:  "#75160D",
		brandSecondary: "#BECCFD",
		brandSuccess: "#1AB394",
		brandWarning: "#F3C363",
		brandInfo: "#5D80F9",
		brandDanger: "#EB3349"
	}
};
