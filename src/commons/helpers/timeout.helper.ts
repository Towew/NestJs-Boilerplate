//# For Timeout Purposes
const customSetTimeout = async (miliseconds: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, miliseconds));
};

export { customSetTimeout };
