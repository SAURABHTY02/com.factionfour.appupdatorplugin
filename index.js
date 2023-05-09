const { dialog } = require('electron')
const ProgressBar = require('electron-progressbar');
const { autoUpdater } = require('electron-updater');


class ElectronUpdater {
	constructor(options = {}) {
		this.options = this.options = {			
			autoUpdater,
			...options
		};

		if (options.logger) {
			this.options.autoUpdater.logger = this.options.logger;
		}
	}

	get autoUpdater() {
		return this.options.autoUpdater;
	}

	checkUpdate(option = {}) {
		//this.autoUpdater.setFeedURL(option)
		this.autoUpdater.checkForUpdates();
		this.autoUpdater.on("update-available", () => {
			console.log("update-available");
		})
		this.autoUpdater.on('update-not-available', () => {
			console.log('Update not available');
		});
		this.autoUpdater.on('update-downloaded', () => {
			console.log('Update downloaded');
			autoUpdater.quitAndInstall();
		});
	}

	async checkForUpdates(option) {
		this.checkUpdate(option);
	}
}

module.exports = {
	ElectronUpdater,
	autoUpdate: options => {
		const autoAppUpdater = new ElectronUpdater(options);
		autoAppUpdater.checkForUpdates();
		return autoAppUpdater;
	}
};