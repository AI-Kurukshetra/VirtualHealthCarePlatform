export class AppError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.details = details;
  }
}

export function mapError(error, fallbackMessage = 'Something went wrong. Please try again.') {
  if (error instanceof AppError) {
    return {
      message: error.message,
      status: error.status,
      details: error.details
    };
  }

  if (error && typeof error === 'object') {
    return {
      message: error.message || fallbackMessage,
      status: error.status || 500,
      details: error.details || null
    };
  }

  return {
    message: fallbackMessage,
    status: 500,
    details: null
  };
}

export async function withErrorHandling(asyncFn) {
  try {
    return await asyncFn();
  } catch (error) {
    console.error('API Error:', error);
    const mappedError = mapError(error);
    throw new AppError(mappedError.message, mappedError.status, mappedError.details);
  }
}
