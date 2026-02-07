import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

console.log("=== MongoDB Configuration ===");
console.log("MONGODB_URI exists:", !!MONGODB_URI);
if (MONGODB_URI) {
  // Mask password in logs
  const maskedUri = MONGODB_URI.replace(/:([^@]+)@/, ":****@");
  console.log("MONGODB_URI (masked):", maskedUri);
}

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log("connectDB() called");

  if (cached!.conn) {
    console.log("Using cached MongoDB connection");
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log("Creating new MongoDB connection...");
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connection established successfully!");
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
    console.log("MongoDB connection ready");
  } catch (e) {
    console.error("=== MongoDB Connection ERROR ===");
    console.error("Error:", e);
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
