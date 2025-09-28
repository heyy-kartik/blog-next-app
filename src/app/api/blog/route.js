const { NextResponse } = require("next/server");

async function GET(request) {
  return NextResponse.json({
    msg: "API Working",
  });
}
