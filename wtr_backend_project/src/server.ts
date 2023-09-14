import { app } from "./app";
const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
