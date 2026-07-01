type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

class Logger {
  private static formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}]: ${message}`;
  }

  public static info(message: string): void {
    console.log(this.formatMessage("INFO", message));
  }

  public static warn(message: string): void {
    console.warn(this.formatMessage("WARN", message));
  }

  public static error(message: string, error?: any): void {
    console.error(this.formatMessage("ERROR", message));
    if (error) {
      console.error(error);
    }
  }

  public static debug(message: string): void {
    if (process.env.NODE_ENV !== "production") {
      console.log(this.formatMessage("DEBUG", message));
    }
  }
}

export default Logger;
export { Logger };
