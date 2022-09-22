import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  const roomId = req.query.roomId;

  if (req.method === "GET") {
    const rooms = readDB();
    const checkroomid = rooms.filter((x) => {
      return x.roomId === roomId;
    });
    const check = checkroomid.map((x) => x.messages);
    // console.log(check[0]);

    if (checkroomid.length === 0)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    return res.json({
      ok: true,
      messages: check[0],
    });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const checkroomid = rooms.filter((x) => {
      return x.roomId === roomId;
    });
    if (checkroomid.length === 0)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    //read request body
    const text = req.body.text;

    if (typeof text !== "string" || text === undefined)
      return res.status(400).json({ ok: false, message: "Invalid text input" });

    //create new id
    const newId = uuidv4();
    const newText = {
      messageId: newId,
      text: text,
    };

    const messofroom = checkroomid.map((x) => x.messages);
    messofroom[0].push(newText);
    writeDB(messofroom[0]);
    // console.log(rooms);
    writeDB(rooms);
    return res.json({ ok: true, message: newText });
  } else {
    return res.status(404).json({ ok: false, message: "Invalid room id" });
  }
}
