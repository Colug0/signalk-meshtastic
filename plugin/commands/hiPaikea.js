module.exports = {
  crewOnly: false, 
  example: 'Hi Paikea',
  accept: (msg) => (msg.data.toLowerCase() === 'hi paikea'),

  handle: (msg, settings, device) => {
    const message = "Hi Barbara and Thomas, you are my favourite crew! Greatings from Paikea";

    return device.sendText(
      message, 
      msg.from, 
      true, 
      false
    );
  },
};