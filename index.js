const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(`
██╗   ██╗███████╗ ██████╗████████╗ ██████╗  ██████╗ 
██║   ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗ ██╔══██╗
██║   ██║█████╗  ██║         ██║    ██║    ██║ ██████╔╝
╚██╗ ██╔╝██╔══╝  ██║         ██║    ██║   ██║ ██╔══██╗
 ╚████╔╝ ███████╗╚██████╗   ██║    ╚██████╔╝ ██║  ██║
  ╚═══╝  ╚══════╝ ╚═════╝   ╚═╝     ╚═════╝  ╚═╝  ╚═╝                                                 
By : ${chalk.bold('Vicenzo#3819')}
`);

  const auth = rs.question(chalk.bgYellow('Enter Auth Token : ');
  console.log('STARTING');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.bgRed(`\r[ ${moment().format('HH:mm:ss')} ] Auth Sudah Expired !`));
      Break

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const tokenPass = data.User.BattlePass.PassTokens;
      const exp = data.User.Experience;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalk.bgCyan(`\r
♨  [${moment().format('HH:mm:ss')}]  -
→  ${(`Negara By Vicenzo : ${country}`)}
→  ${(`Nama By Vicenzo : ${username}`)}
→  ${(`Pass Star By Vicenzo : ${tokenPass}`)}
→  ${(`Exp By Vicenzo: ${exp}`)}  
→  ${(`Tropy By Vicenzo : ${trophy}`)}  
→  ${(`Crown By Vicenzo : ${crown}`)}
→  ${(`Status : ✔ Success`)}`));
      await sleep(6500);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Your account has been banned`));
      break;
    }
  }

})();
