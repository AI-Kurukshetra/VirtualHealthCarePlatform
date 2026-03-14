import { describe, expect, it } from 'vitest';
import { AppError, mapError } from '@/utils/error-handler';

describe('error-handler', () => {
  it('maps AppError correctly', () => {
    const error = new AppError('Boom', 418, { foo: 'bar' });
    expect(mapError(error)).toEqual({
      message: 'Boom',
      status: 418,
      details: { foo: 'bar' }
    });
  });

  it('falls back for unknown error', () => {
    expect(mapError('x').status).toBe(500);
  });
});
