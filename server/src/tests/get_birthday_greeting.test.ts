
import { describe, expect, it } from 'bun:test';
import { getBirthdayGreeting } from '../handlers/get_birthday_greeting';

describe('getBirthdayGreeting', () => {
  it('should return a birthday greeting', async () => {
    const result = await getBirthdayGreeting();

    expect(result.message).toBe("Happy Birthday, Jasper Zesi! 🎉");
    expect(result.recipient).toBe("Jasper Zesi");
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should return current timestamp', async () => {
    const beforeCall = new Date();
    const result = await getBirthdayGreeting();
    const afterCall = new Date();

    expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
    expect(result.timestamp.getTime()).toBeLessThanOrEqual(afterCall.getTime());
  });

  it('should return consistent message and recipient', async () => {
    const result1 = await getBirthdayGreeting();
    const result2 = await getBirthdayGreeting();

    expect(result1.message).toBe(result2.message);
    expect(result1.recipient).toBe(result2.recipient);
  });

  it('should return greeting with proper structure', async () => {
    const result = await getBirthdayGreeting();

    expect(typeof result.message).toBe('string');
    expect(typeof result.recipient).toBe('string');
    expect(result.timestamp).toBeInstanceOf(Date);
    expect(result.message.length).toBeGreaterThan(0);
    expect(result.recipient.length).toBeGreaterThan(0);
  });
});
