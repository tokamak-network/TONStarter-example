import ora from "ora";

export const animateEllipsis = async <T>(
  text: string,
  asyncTask: () => Promise<T>,
  interval: number
): Promise<T> => {
  const spinner = ora(text).start();

  const animation = setInterval(() => {
    const currentText = spinner.text;
    if (currentText.endsWith("...")) {
      spinner.text = text;
    } else {
      spinner.text += ".";
    }
  }, interval);

  try {
    // Execute the asynchronous task
    const result = await asyncTask();
    clearInterval(animation);
    spinner.succeed(); // Change spinner to a success state after completing the task
    return result;
  } catch (error) {
    clearInterval(animation);
    spinner.fail("Error occurred"); // Change spinner to a failure state on error
    throw error;
  }
};
