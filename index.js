// idea based on https://github.com/replugged-org/heygirl (used most of their code, thank you.)

const { Plugin } = require('powercord/entities');

const ForgImages = {
  jpg: 'https://cdn.discordapp.com/attachments/788198099067076638/1009655751469441038/forg.jpg',
  png: 'https://cdn.discordapp.com/attachments/788198099067076638/1009655751721103410/forg.gif',
  gif: 'https://cdn.discordapp.com/attachments/788198099067076638/1009655752031473755/forg.png'
}

module.exports = class HeyForg extends Plugin {
  constructor () {
    super();

    this.URLs = [].concat(
      Array(3).fill('jpg'),
      Array(2).fill('gif'),
      Array(1).fill('png'),
      Array(4).fill('gif'),
      Array(3).fill('jpg'),
      Array(1).fill('png')
    ).map((format) => (
      ForgImages[format]
    ));
  }

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

  getRandomURL () {
    return this.URLs[Math.floor(Math.random() * this.URLs.length)];
  }

  heyforg () {
    document.querySelectorAll('[style*="background-image"]')
      .forEach(({ style }) => (
        style.backgroundImage = `url("${this.getRandomURL()}")`
      ));

    document.querySelectorAll('img')
      .forEach(image => (
        image.src = this.getRandomURL()
      ));
  }
};
