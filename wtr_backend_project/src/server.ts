import { app } from "./app";
const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
