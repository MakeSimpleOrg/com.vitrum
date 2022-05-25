'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class Vitrum6SatEUDevice extends ZwaveDevice {
	async onMeshInit() {
		//this.enableDebug();

		if(Object.keys(this.node.CommandClass).length < 5)
		{
			this.registerCapability('onoff', 'BASIC');
			this.registerReportListener('BASIC', 'BASIC_SET', ( rawReport, parsedReport ) => {
				if(rawReport.Value == 0)
					this.setCapabilityValue('onoff', false);
				else
					this.setCapabilityValue('onoff', true);
			});
		}
	}
}

module.exports = Vitrum6SatEUDevice;
