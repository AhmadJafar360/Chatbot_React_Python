import db from "../models/index.js";
import jwt from "jsonwebtoken";

const Users = db.User;
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const userId = user[0].id;
      const firstname = user[0].firstname;
      const lastname = user[0].lastname;
      const gender = user[0].gender;
      const email = user[0].email;
      const phone = user[0].phone;
      const birthdate = user[0].birthdate;

      const accessToken = jwt.sign(
        {
          userId,
          firstname,
          lastname,
          gender,
          email,
          phone,
          birthdate,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );

      res.json({ msg: "Refresh Token Reload", accessToken });
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// import db from "../models/index.js";
// import jwt from "jsonwebtoken";

// const Users = db.Users;

// export const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) return res.sendStatus(401);

//     const user = await Users.findAll({
//       where: {
//         refresh_token: refreshToken,
//       },
//     });

//     if (!user[0]) return res.sendStatus(403);

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
//       if (err) return res.sendStatus(403);
//       const userId = user[0].id;
//       const firstname = user[0].firstname;
//       const lastname = user[0].lastname;
//       const gender = user[0].gender;
//       const email = user[0].email;
//       const phone = user[0].phone;
//       const birthdate = user[0].birthdate;
//       const accessToken = jwt.sign(
//         {
//           userId,
//           firstname,
//           lastname,
//           gender,
//           email,
//           phone,
//           birthdate,
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//           expiresIn: "15s",
//         }
//       );

//       res.json({ accessToken });
//     });
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };
