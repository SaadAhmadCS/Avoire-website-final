

// app/api/products/[slug]/route.js
import { NextResponse } from "next/server"
import { getProductBySlug } from "@/app/models/product"

export async function GET(request) {
     try {
          // extract slug from URL
          const url = new URL(request.url)
          const slug = url.pathname.split("/").pop() // last part of path

          const product = await getProductBySlug(slug)

          if (!product) {
               return NextResponse.json({ error: "Not found" }, { status: 404 })
          }

          return NextResponse.json(product)
     } catch (err) {
          console.error(err)
          return NextResponse.json({ error: "Server error" }, { status: 500 })
     }
}