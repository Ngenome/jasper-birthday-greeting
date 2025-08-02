
import { type Greeting } from '../schema';

export const getBirthdayGreeting = async (): Promise<Greeting> => {
  // Return a static birthday greeting for Jasper Zesi
  return {
    message: "Happy Birthday, Jasper Zesi! 🎉",
    recipient: "Jasper Zesi",
    timestamp: new Date()
  };
};
