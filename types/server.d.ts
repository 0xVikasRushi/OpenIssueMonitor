type ServerStatus = "Started" | "Stopped" | "Crashed" | "Ideal";
interface ServerConfig {
  API_URL: string;
  ACCESS_TOKEN: string;
  TELEGRAM_ACCESS_TOKEN: string;
  TELEGRAM_CHAT_ID: number;
  REPO_NAME: string;
  REPO_OWNER: string;
  LABELS: Map<string, boolean>;
  SERVER_STATUS: ServerStatus;
  CONFIGURATION: string;
  REQUEST_RATE: number;
}

export { ServerConfig, ServerStatus };
