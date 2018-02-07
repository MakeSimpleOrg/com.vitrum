'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class Vitrum1SatEUDevice extends ZwaveDevice {
	async onMeshInit() {
		//this.enableDebug();

		if(Object.keys(this.node.CommandClass).length < 5)
		{
			this.registerCapability('onoff', 'BASIC');
			this.registerCapability('onoff', 'SWITCH_MULTILEVEL');
			this.registerCapability('dim', 'BASIC');
			this.registerCapability('dim', 'SWITCH_MULTILEVEL');

			this.registerReportListener('BASIC', 'BASIC_SET', ( rawReport, parsedReport ) => {
				if(this.getCapabilityValue('onoff') == true && rawReport.Value == 0)
					this.setCapabilityValue('onoff', false);
				else if(this.getCapabilityValue('onoff') == false && rawReport.Value > 0)
					this.setCapabilityValue('onoff', true);
				this.setCapabilityValue('dim', rawReport.Value / 99);
			});
		}
	}
}

module.exports = Vitrum1SatEUDevice;
