import * as WAWebJS from "whatsapp-web.js";
import {
  Client,
  GroupNotification,
  LocalAuth,
  MessageMedia,
  // RemoteAuth,
} from "whatsapp-web.js";
import qrcode = require("qrcode-terminal");
import { checkMessage } from "./actions/messageActions";
import { main } from "./controllers/main";
import { introduction, sendCommands } from "./actions/introduction";
import {
  GREETINGS,
  HEY_EMOJIES,
  USER_JOIN_GREETINGS,
} from "./utils/reply/replies";
import { random } from "./actions/sendMessage";
const express = require("express");
import axios from "axios";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { COMMANDS_CMDS } from "./utils/Commands/instructions";
// import mongoose from "mongoose";
// import { MongoStore } from "wwebjs-mongo";
dotenv.config();

const app = express();

// const LOCAL = String(process.env.dev) === "true";

// const DB_URL = LOCAL
//   ? String(process.env.DEV_DB_URL)
//   : String(process.env.PROD_DB_URL);

// mongoose.connect(DB_URL, () => {
//   const store = new MongoStore({ mongoose: mongoose });
//   const client = new Client({
//     puppeteer: {
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     },
//     authStrategy: new RemoteAuth({
//       store: store,
//       backupSyncIntervalMs: 300000,
//     }),
//   });

const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth({
    dataPath: `${__dirname}/sessions`,
  }),
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
  console.log(qr);
});

client.on("ready", async () => {
  console.log("Connected");
  client.sendMessage(
    process.env.WA_BOT_ID as string,
    `${process.env.BOT_NAME as string}: I am Connected BOSS`
  );
});

client.on("message_create", async (message: WAWebJS.Message) => {
  const bool = checkMessage(message);
  const str: string[] = message.mentionedIds;
  const isMention =
    (message.body[0] === "@" && str.includes("919871453667@c.us")) ||
    message.body
      .toLowerCase()
      .split(" ")
      .includes(`@${(process.env.BOT_NAME as String).toLocaleLowerCase()}`);
  if (isMention && bool !== "NONE") {
    const allChats = await client.getChats();
    const WA_BOT = allChats[0];
    introduction(WA_BOT, bool);
  }
  if (
    bool !== "NONE" &&
    message.body.split(",")[0][0] === (process.env.BOT_PREFIX as string) &&
    COMMANDS_CMDS.includes(message.body.split(",")[0].toLocaleLowerCase())
  ) {
    const allChats = await client.getChats();
    const WA_BOT = allChats[0];
    sendCommands(WA_BOT);
  }
  if (
    (bool === "ADMIN" || bool === "USER") &&
    message.body[0] === (process.env.BOT_PREFIX as string)
  ) {
    const allChats = await client.getChats();
    const WA_BOT = allChats[0];
    main(WA_BOT, message, bool);
  }
});

client.on("group_join", async (msg: GroupNotification) => {
  const contact = await client.getNumberId(msg.recipientIds[0]);
  const details = await client.getContactById(contact?._serialized || "");
  if (details.name) {
    client.sendMessage(
      process.env.WA_BOT_ID as string,
      `${process.env.BOT_NAME as String}: *${
        details.name
      }* Joined the Group!\n${
        USER_JOIN_GREETINGS.messages[random(USER_JOIN_GREETINGS.messageNum)]
      }\nHey new ${GREETINGS.member[random(GREETINGS.memberMsgNumber)]} ${
        HEY_EMOJIES[random(HEY_EMOJIES.length)]
      }!\nCheck out what bot(${
        process.env.BOT_NAME as String
      }) can do by *Mentioning* me!\nor check the Commands of ${
        process.env.BOT_NAME as String
      } by typing]\n*${process.env.BOT_PREFIX as string}AllCmds*`
    );
  } else {
    client.sendMessage(
      process.env.WA_BOT_ID as string,
      `${process.env.BOT_NAME as String}: A Good Person Joined the Group!\n${
        USER_JOIN_GREETINGS.messages[random(USER_JOIN_GREETINGS.messageNum)]
      }\nHey new ${GREETINGS.member[random(GREETINGS.memberMsgNumber)]} ${
        HEY_EMOJIES[random(HEY_EMOJIES.length)]
      }!\nCheck out what bot(${
        process.env.BOT_NAME as String
      }) can do by *Mentioning* me!\nor check the Commands of ${
        process.env.BOT_NAME as String
      } by typing]\n*${process.env.BOT_PREFIX as string}AllCmds*`
    );
  }
});

client.on("group_leave", async (notification: WAWebJS.GroupNotification) => {
  console.log(notification);
  const sticker = MessageMedia.fromFilePath(`${__dirname}/leave.png`);
  if (notification.chatId === process.env.WA_BOT_ID) {
    const allChats = await client.getChats();
    const WA_BOT = allChats[0];
    WA_BOT.sendMessage(`${process.env.BOT_NAME as String}:`);
    WA_BOT.sendMessage(sticker, { sendMediaAsSticker: true });
  }
});

client.initialize();
// });
// Get Bot LIVE

// Continuously ping the server to prevent it from becoming idle
setInterval(async () => {
  await axios.get("https://iitm-wa-bot.herokuapp.com/");
  console.log("[SERVER] Pinged server");
}, 15 * 60 * 1000); // every 15 minutes

const port = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("BOT");
});

app.listen(port, () =>
  console.log(`[SERVER] Server is running on port ${port}`)
);

// All other pages should be returned as error pages
app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .send(
      "<h1>Sorry, this page does not exist!</h1><br><a href='/'>Back to Home</a>"
    );
});
