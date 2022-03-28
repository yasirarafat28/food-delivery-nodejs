import app from "./app";

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Food Delivery server is on 🔥 on port ${port}`);
});

export default server;
