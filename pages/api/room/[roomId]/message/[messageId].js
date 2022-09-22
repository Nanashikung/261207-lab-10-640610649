import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

// export default function roomIdMessageIdRoute(req, res) {
//   //read value from URL
//   const roomId = req.query.roomId;
//   const messageId = req.query.messageId;
//   const rooms = readDB();

//   if (req.method === "DELETE") {
//     const checkroomid = rooms.filter((x) => {
//       return x.roomId === roomId;
//     });
//     console.log(checkroomid[0].messages);
//     if (checkroomid.length === 0)
//       return res.status(404).json({ ok: false, message: "Invalid room id" });

//     // const roomsIdx = rooms.findIndex((x) => x.roomId === roomId);
//     // const messIdx = rooms.message.findIndex((x) => x.messageId === messageId);
//     // if (roomsIdx === -1)
//     //   return res.status(404).json({ ok: false, message: "Invalid room id" });
//     // if (messIdx === -1)
//     //   return res.status(404).json({ ok: false, message: "Invalid message id" });
//     // rooms.splice(roomsIdx, 1);
//     // writeDB(rooms);
//     // return res.json({ ok: true });

//     const room = rooms.find((x) => x.roomId === roomId);
//     // console.log(room);

//     const messIdx = room.messages.find((x) => x.messageId === messageId);
//     console.log(messIdx);
//     if (messIdx === -1) {
//       res.status(400).json({
//         ok: false,
//         message: "Invalid message ID",
//       });
//     }
//     room.messages.splice(messIdx, 1);
//     writeDB(rooms);
//     res.status(200).json({
//       ok: true,
//     });
//   }
// }

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  if (req.method === "DELETE") {
    const rooms = readDB();
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      const messageIdx = room.messages.findIndex(
        (message) => message.messageId === messageId
      );
      // console.log(messageIdx);
      if (messageIdx === -1) {
        res.status(404).json({
          ok: false,
          message: "Invalid message ID",
        });
      } else {
        room.messages.splice(messageIdx, 1);
        writeDB(rooms);
        res.status(200).json({
          ok: true,
        });
      }
    } else {
      res.status(404).json({
        ok: false,
        message: "Invalid room ID",
      });
    }
  }
}
