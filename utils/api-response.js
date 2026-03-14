import { NextResponse } from 'next/server';

export function successResponse(data, status = 200, meta = null) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta
    },
    { status }
  );
}

export function errorResponse(message, status = 500, details = null) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        details
      }
    },
    { status }
  );
}
