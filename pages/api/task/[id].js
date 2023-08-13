import { Task } from "@/models/task";
import { checkAuth, connectDB } from "../../../utils/features";
import { asyncError, errorHandler } from "@/middlewares/error";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login first");

  // console.log(req.query); // -> we get id, note: on req.params, we get undefined

  const taskId = req.query.id;
  const task = await Task.findById(taskId);

  if (!task) return errorHandler(res, 404, "Task Not Found!");
  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully!",
    });
  } else if (req.method === "DELETE") {

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task Deleted Successfully!",
      });
  } else {
    errorHandler(res, 400, "This method is not available.");
  }
});

export default handler;
