var E=Object.create;var t=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var L=e=>t(e,"__esModule",{value:!0});var T=(e,s)=>{L(e);for(var r in s)t(e,r,{get:s[r],enumerable:!0})},O=(e,s,r)=>{if(s&&typeof s=="object"||typeof s=="function")for(let o of _(s))!D.call(e,o)&&o!=="default"&&t(e,o,{get:()=>s[o],enumerable:!(r=N(s,o))||r.enumerable});return e},a=e=>O(L(t(e!=null?E(y(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);T(exports,{adminControl:()=>P});var p=a(require("../../actions/sendMessage")),C=a(require("../../utils/messages/messages")),m=a(require("../../utils/reply/replies")),i=a(require("../../utils/Commands/instructions")),n=a(require("../..")),l=a(require("../../actions/sendNotes")),f=a(require("../../actions/sendCalendar")),c=a(require("../../actions/sendClassMessage")),M=a(require("../../actions/help")),A=a(require("../../actions/sendSource")),d=a(require("../../actions/courseInfo")),S=a(require("../../actions/sendPlaylist"));const P=async(e,s,r)=>{const o=s.body.slice(1),u=(await e.getChats())[n.BOT];C.ADMIN_CHECK_MESSAGES.includes(o.toLocaleLowerCase())?await u.sendMessage(`${process.env.BOT_NAME}: ${m.PING_REPLIES.admin[(0,p.random)(m.PING_REPLIES.adminMsgNumber)]}`):i.NOTES_CMD.includes(o.split(" ")[0].toLocaleLowerCase())?o.split(" ").length>1?(0,l.sendNotesByFilter)(e,o,s,r):(0,l.sendNotes)(e,s,r):i.CALENDAR_COMMANDS.includes(o.toLocaleLowerCase())||i.CALENDAR_TYPOS.includes(o.toLocaleLowerCase())?(0,f.sendCalendar)(e,s,r):i.CLASS_COMMAND.includes(o.toLocaleLowerCase())?(0,c.sendClassMessage)(e,s,"ADMIN"):i.HELP_CMDS.includes(o.toLocaleLowerCase())?(0,M.help)(e,s,r):i.SOURCE.includes(o.toLocaleLowerCase())?(0,A.sendSource)(e,r):i.IMP_DATES.includes(o.toLocaleLowerCase())?(0,d.sendImpDates)(e,s,r):i.ELIGIBILITY.includes(o.toLocaleLowerCase())?(0,d.sendEligibility)(e,s,r):i.PLALIST_CMD_ALISA.includes(o.toLocaleLowerCase())&&(0,S.sendPlayList)(e,s,r)};0&&(module.exports={adminControl});
//# sourceMappingURL=adminController.js.map