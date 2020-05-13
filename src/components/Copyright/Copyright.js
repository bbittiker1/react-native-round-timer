import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

import Config from "../../config";

// console.log(Config);

export default function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mcafee.com/">
                Bbittiker
			</Link>{" "}
			{new Date().getFullYear()}
			{` v${ Config.appVersion }`}
		</Typography>
	);
}
