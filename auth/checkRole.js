// module.exports = role => {
//   return function(req, res, next) {
//     if (
//       req.decodedJwt &&
//       req.decodedJwt.roles &&
//       req.decodedJwt.roles.includes(role)
//     ) {
//       next();
//     } else {
//       res.status(403).json({ message: "You're not authorized, you're not a Medical staff" });
//     }
//   };
// };

// module.exports = function checkRole(req, res, next) {
//   if (!req.body.hasAccess) {
//     next();
//   } else {
//     res
//       .status(403)
//       .json({ message: "You're not authorized, you're not a Medical staff" });
//   }
// };

// module.exports = checkRole => {
//   return function(req, res, next) {
//     if (
//       req.body.hasAccess
//     ) {
//       next();
//     } else {
//       res.status(403).json({ message: "You're not authorized, you're not a Medical staff" });
//     }
//   };
// };

// module.exports = function checkRole(req, res, next) {
//   if (req.decodedJwt && !req.decodedJwt.hasAccess) {
//     next();
//   } 
// };
