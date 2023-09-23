import { app } from "./app";
const port = 8800;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
