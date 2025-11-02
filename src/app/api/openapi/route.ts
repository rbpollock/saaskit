import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "openapi.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const spec = JSON.parse(fileContents);

    return NextResponse.json(spec);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load OpenAPI specification" },
      { status: 500 }
    );
  }
}
