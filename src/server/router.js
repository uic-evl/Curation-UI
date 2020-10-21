const passport = require("passport");

const Authentication = require("./controllers/authentication");
const Labeling = require("./controllers/labeling");
const Security = require("./controllers/security");
const HumanErrorTest = require("./controllers/humanErrorTest");
const Tasks = require("./controllers/tasks");
const Pipeline = require("./controllers/pipeline");
const DocumentLabeling = require("./controllers/docLabeling");
const passportService = require("./services/passport");
const Figures = require("./controllers/figures");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  // Authentication
  app.post("/api/signin", requireSignin, Authentication.signin);
  app.patch("/api/signup", Authentication.signup);
  app.patch("/api/verify/:token", Authentication.verify);
  app.patch("/api/updatePassword", Authentication.updatePassword);

  // Labeling interface
  app.get("/api/modalities", Labeling.getModalities);
  app.get("/api/training/:previous", Labeling.getNextImage);
  app.patch("/api/training/:id", Labeling.updateImage);
  app.patch("/api/updateSubfigure/", DocumentLabeling.updateSubfigure);
  app.patch("/api/updateAllSubfigures/", DocumentLabeling.updateAllSubfigures);
  app.patch(
    "/api/markFigureMissingPanels/",
    DocumentLabeling.markFigureMissingPanels
  );

  // Role and groups management
  app.patch("/api/addRole", Security.addRole);
  app.patch("/api/removeRole", Security.removeRole);
  app.patch("/api/createGroup", Security.createGroup);
  app.patch("/api/editGroup", Security.editGroup);
  app.get("/api/getGroup/:groupName", Security.getGroup);
  app.get(
    "/api/getGroupsByOrganization/:organization",
    Security.getGroupsByOrganization
  );
  app.get("/api/fetchUsersByGroup/:groupname", Security.fetchUsersByGroup);
  app.get("/api/fetchUserById/:id", Security.fetchUserById);
  app.patch("/api/removeRole", Security.removeRole);
  app.get("/api/fetchUsersFromOrgByGroup", Security.fetchUsersFromOrgByGroup);

  // Test human error in classification tasks
  app.patch("/api/createTest", HumanErrorTest.createTest);
  app.get("/api/getTests", HumanErrorTest.fetchTests);
  app.patch("/api/getNextTestImage", HumanErrorTest.getNext);
  app.patch("/api/getPreviousTestImage", HumanErrorTest.getPrevious);
  app.patch("/api/updateUserTestImage", HumanErrorTest.updateImage);

  // Tasks
  app.get("/api/getTasks/:username", Tasks.fetchTasks);
  app.patch("/api/openTask", Tasks.openTask);
  app.get("/api/fetchTask/:id", Tasks.fetchTask);
  app.patch("/api/finishTask", Tasks.finishTask);
  app.get(
    "/api/fetchDocumentContent/:id",
    DocumentLabeling.fetchDocumentContent
  );

  // Integration pipeline
  app.patch("/api/insertFromPipe", Pipeline.insertFromPipe);
  // app.patch('/api/sendPipeTask', Pipeline.sendPipeTask);
  app.patch("/api/sendPipeTask", Pipeline.savePipelineTask);

  // Figures
  app.get("/api/fetchFigures/:state", Figures.fetchFigures);
  app.get("/api/searchSubfigures/", Figures.searchSubfigures);
  app.post("/api/flag/:id", Figures.flag);
  app.get("/api/figures/count/reviewed/", Figures.countReviewed);
  app.get("/api/figure/taskUrl/:id", Figures.getTaskUrl);
};
