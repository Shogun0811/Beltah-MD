const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0VpckFrMTJpbjViN3dIWWJWOUdydkFRTEFlMDRsZTF5YjF4WDBHVXpuMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEd5ZStRMUFic0JDdHJEU0ZjNkhkYmpETTV1OWxWYXFpeFNXYk5WTzl4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRnNwclZCU0RCblp4aWpJVzcrVXd4bWpKV0tSWUt0ZFRKYnRUN2xIREdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyNzg5WGY3R0lXQXRFVHQzTjRZdEwvOWtldmVLZklhV2NJNGNhNFpIb1ZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitCdURyU2l2SHY4ciswcFRqVmNQSXE3YkwxMkU4Q3hha1RNL3g3RmNtbHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImV1ZEQ4V3RYcjkzeGpPU0NjOXpxditPam1oVHRJS25RMnFXVk1FTjVoM0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU50Q2FQK05mZlFBWWsyWjNveTNGYjYrcy9JRERmb0tSVHdNM3cxaVkzbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmp1L1Q4N2pCeW9DVTNlWHhQRlBXM3dFemxtN1praE9idEZOazN4YlJVMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlzRkVUTWRBNm14eWpzRldKVzRnWFZmSmtTMmVBOTJRVm1aRmtqdHZ1dmdUT1ordGlNNUxDRjczUER0TVcrNEdacmJzRythMWVtbG8rM05oN0lPVEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYsImFkdlNlY3JldEtleSI6ImhMZjJxYWVqVWVnTU81UzFBb3JVdE1MU0Ruc3FoV0NDZHdDUUtiRitiYjg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFJRDVjWVpiU2F1dGVHMXM3dWp0WlEiLCJwaG9uZUlkIjoiYTg4ZDRhYjctMmE1ZS00ZTA0LWE5ZmYtNjEwOWFjYzE2NzYxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJkMFNJTjdYN0RmUTJhcmQyUHpHbGdPMkMyUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvWXFKNXd5R3IrbnNBdHZHWXBvc3E2WEZDUlU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSEtBRzREQkQiLCJtZSI6eyJpZCI6IjIyMTc2MDI2MzYzMToyNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLjgqTjg5Djg6njg5Ljg54u8J2QgfCdkKLwnZCc8J2QqPCdkKbwnZCa8J2Qq/CdkK4g8J2QkvCdkKHwnZCo8J2QoPCdkK7wnZCn8J2QmsSrIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMNkV2OXNIRUxyUXNMUUdHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJnZmRUMFFud1oxTThpOFZTcnlQc1l4QjRMWVgrV042UGJhaFB0U2xKNkVVPSIsImFjY291bnRTaWduYXR1cmUiOiJmTzIxUW9yTTMxclliTkF6THFKeGZjRXc3dTlzYWtyUmYvZDVaWTRoVFhETmdnT3hHS1IxVTJRK0Z2UldzRWNTWTRjVlljSGYramxUc0I0SWRPYkJBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTmt0QngzdHBSSERXK1pGdXdmRVhZMFBRZmFpTExTclEwRGlWamNvbGZtdEQ3WVF2djVxeHlJMFd4NjVzV0RXMzFwTCtFZHA1ZkwzVVF4ckhZamgzQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjE3NjAyNjM2MzE6MjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWUgzVTlFSjhHZFRQSXZGVXE4ajdHTVFlQzJGL2xqZWoyMm9UN1VwU2VoRiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDQ2MTM4MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNMEYifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Bicomaru Shogunaī",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "221760263631",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
