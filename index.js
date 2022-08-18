// idea based on https://github.com/replugged-org/heygirl (used most of their code, thank you.)

const { Plugin } = require('powercord/entities');

const ForgImages = {
  png: 'https://cdn.discordapp.com/attachments/788198099067076638/1009655752031473755/forg.png'
}

module.exports = class HeyForg extends Plugin {
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'heyforg',
      description: 'Replaces every image with forg',
      usage: '{c}',
      executor: this.heyforg.bind(this)
    });
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('heyforg');
  }

  heyforg () {
    document.querySelectorAll('[style*="background-image"]')
      .forEach(({ style }) => (
        style.backgroundImage = `url("${ForgImages.png}")`
      ));

    document.querySelectorAll('img')
      .forEach(image => (
        image.src = ForgImages.png
      ));
  }
};
