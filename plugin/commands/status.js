module.exports = {
  crewOnly: true, 
  example: 'Report Status',
  accept: (msg) => (msg.data.toLowerCase() === 'report status'),

  handle: (msg, settings, device, app) => {
    const windPath = 'environment.wind.angleTrueGround';
    const depthPath = 'environment.depth.belowSurface';
    const maxRadiusPath = 'navigation.anchor.maxRadius';
    const currentRadiusPath = 'navigation.anchor.currentRadius';

    const windValue = app.getSelfPath(windPath);
    const depthValue = app.getSelfPath(depthPath);
    const maxRadiusValue = app.getSelfPath(maxRadiusPath);
    const currentRadiusValue = app.getSelfPath(currentRadiusPath);

    const windKnots = windValue ? (windValue.value * 1.94384).toFixed(2) + ' kn' : null; // Convert m/s to knots
    const depthMeters = depthValue ? depthValue.value.toFixed(2) + ' m' : null;
    const maxRadiusMeters = maxRadiusValue ? maxRadiusValue.value.toFixed(2) + ' m' : null;
    const currentRadiusMeters = currentRadiusValue ? currentRadiusValue.value.toFixed(2) + ' m' : null;

    const messages = [];
    if (windKnots) messages.push(`Wind: ${windKnots}`);
    if (depthMeters) messages.push(`Depth: ${depthMeters}`);
    if (maxRadiusMeters) messages.push(`Max Anchor Radius: ${maxRadiusMeters}`);
    if (currentRadiusMeters) messages.push(`Current Anchor Radius: ${currentRadiusMeters}`);

    if (messages.length > 0) {
      return device.sendText(
        messages.join(', '),
        msg.from,
        true,
        false
      );
    } else {
      return device.sendText(
        `Error: No valid data available from the specified paths.`,
        msg.from,
        true,
        false
      );
    }
  },
};