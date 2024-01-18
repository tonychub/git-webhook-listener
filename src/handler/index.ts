import { fetchHistory, runScriptById } from "@/api/myApi";

export const handleRunScript = async (scriptId: string) => {
  let status = "";
  const response = await runScriptById(scriptId);
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  do {
    const resHistory = await fetchHistory(scriptId, response.data._id);
    if (resHistory.error) {
      status = "error";
      break;
    }
    if (resHistory.data) {
      status = resHistory.data.status || "";
    }
    await timeout(5000);
  } while (status !== "finish" && status !== "error");
  return status;
};
