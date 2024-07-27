class DatabaseError extends Error {
  error: string;

  constructor(message: string) {
    super(message);
    this.error = 'DatabaseError';
  }
}

export default DatabaseError;
