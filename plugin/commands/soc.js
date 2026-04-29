module.exports = {
  crewOnly: true, 
  example: 'Report SOC',
  accept: (msg) => (msg.data.toLowerCase() === 'report soc'),

  handle: (msg, settings, device, app) => {
    const path = 'electrical.batteries.LiFePo4.capacity.stateOfCharge';
    const socValue = app.getSelfPath(path);

    if (socValue && socValue.value !== undefined) {
      const percentage = Math.round(socValue.value * 100);
      
      return device.sendText(
        `battery state of charge: ${percentage}%`, 
        msg.from, 
        true, 
        false
      );
    } else {
      return device.sendText(
        `Error: Path ${path} not found or no value available.`, 
        msg.from, 
        true, 
        false
      );
    }
  },
};