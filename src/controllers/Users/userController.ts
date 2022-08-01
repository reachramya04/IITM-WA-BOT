import * as WAWebJS from "whatsapp-web.js";
import { sendCalendar } from "../../actions/sendCalendar";
import { sendClassMessage } from "../../actions/sendClassMessage";
import { sendMessage, random } from "../../actions/sendMessage";
import { sendNotes } from "../../actions/sendNotes";
import {
  CALENDAR_COMMANDS,
  CLASS_COMMAND,
  COMMANDS,
  NOTES_CMD,
} from "../../utils/Commands/instructions";
import { USER_PING_MESSAGES } from "../../utils/messages/messages";
import { PING_REPLIES, USER_COMMANDS } from "../../utils/reply/replies";
export const userControl = (bot: WAWebJS.Chat, message: string) => {
  // Ping Message Reply
  if (USER_PING_MESSAGES.includes(message.toLocaleLowerCase())) {
    sendMessage(
      bot,
      PING_REPLIES.members[random(PING_REPLIES.memberMsgNumber)]
    );
    return;
    // Commands Message Reply
  } else if (COMMANDS.includes(message.toLocaleLowerCase())) {
    sendMessage(bot, USER_COMMANDS, true);
    return;

    // Notes Replies
  } else if (NOTES_CMD.includes(message.toLocaleLowerCase())) {
    sendNotes(bot, "USER");

    // Calender Replies
  } else if (CALENDAR_COMMANDS.includes(message.toLocaleLowerCase())) {
    sendCalendar(bot);

    // Class Commands Replies
  } else if (CLASS_COMMAND.includes(message.toLocaleLowerCase())) {
    sendClassMessage(bot);
  }
};
