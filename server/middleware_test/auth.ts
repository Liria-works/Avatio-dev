// import jwt from "jsonwebtoken"; //jwtの勉強から

// export default defineEventHandler((event) => {
//     const token = event.node.req.headers["authorization"];

//     if (!token) {
//         return {
//             status: 401,
//             body: { error: "Authorization token is missing" },
//         };
//     }

//     try {
//         const decoded = jwt.verify(token, "secret-key");

//         // ユーザーが管理者であることを確認
//         if (decoded.role !== "admin") {
//             return {
//                 status: 403,
//                 body: { error: "Access denied" },
//             };
//         }

//         // 管理者であれば次のハンドラーに進む
//         event.context.user = decoded;
//     } catch (error) {
//         return {
//             status: 401,
//             body: { error: "Invalid token" },
//         };
//     }
// });
