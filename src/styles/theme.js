import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
	root: {
		display: "flex",
		// borderColor: "solid red 1px"
		// drawerWidth: 240
	},

	// drawer: {
	// 	width: DRAWER_WIDTH,
	// 	flexShrink: 0,
	// 	whiteSpace: "nowrap"
	// },
	transitions: {
		// duration: {
		//     enteringScreen: 1000,
		//     leavingScreen: 1000
		// },
		// easing: easeInO
	},
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: "#66BB6A",
			color: "white"
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			// light: '#842037',
			main: "#F44336"
			// dark: will be calculated from palette.secondary.main,
			// contrastText: '#ffcc00',
		},

		pause: {
			main: "#3949AB"
		},

		// success: {
		// 	main: THEME.color.brandSuccess
		// },
		//
		// error: {
		// 	main: THEME.color.brandDanger
		// },
		//
		// warning: {
		// 	main: THEME.color.brandWarning
		// },

		// mcafeeDark: THEME.color.mainDark,
		//
		textColor: "#FFFFFF",
		// linkColor: "#337AB7"
		// error: will use the default color
	},
	overrides: {
		MuiFormControlLabel: {
			label: {
				fontSize: "0.875rem",
			}
		},
		MuiButton: {
			root: {
				marginBottom: "3px"

			},
			contained: {
				// main: 'green'
				// paddingTop: defaultTheme.spacing(2),
				// paddingBottom: defaultTheme.spacing(2)
			},
			containedPrimary: {
				// backgroundColor: THEME.color.main,
				color: "white",
				// "&:hover": {
				// 	textDecoration: "none",
				// 	backgroundColor: THEME.color.mainDark,
				// 	// Reset on touch devices, it doesn't add specificity
				// 	"@media (hover: none)": {
				// 		backgroundColor: THEME.color.mainDark
				// 	}
				// }
			},
			text: {
				color: "white"
			},

			// outlinedPrimary: {
			// 	color: "white",
			// 	// border: "white 1px solid",
			// 	// "&:hover": {
			// 	// 	textDecoration: "none",
			// 	// 	backgroundColor: THEME.color.mainDark,
			// 	// 	// Reset on touch devices, it doesn't add specificity
			// 	// 	"@media (hover: none)": {
			// 	// 		backgroundColor: THEME.color.mainDark
			// 	// 	}
			// 	// }
			// }

			//
			// containedSecondary: {
			//     // backgroundColor: 'orange',
			//     // color: 'white'
			//     // paddingLeft: defaultTheme.spacing(4),
			//     // paddingRight: defaultTheme.spacing(4)
			// }
		},
		MuiInput: {
			root: {
				// borderRadius: 0,
				// backgroundColor: "#fff",
				// border: '1px solid gray',
				fontSize: 12,
				// padding: '10px 12px',
				// width: 'calc(100% - 24px)',
			}
		}
	}
});
