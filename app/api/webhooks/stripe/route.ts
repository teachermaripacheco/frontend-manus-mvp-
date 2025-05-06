import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature") || ""

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Error verifying webhook signature:", error)
    return new NextResponse("Webhook signature verification failed", { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session

      // In a real application, you would:
      // 1. Create or update a user in your database
      // 2. Store subscription information
      // 3. Grant access to the purchased plan
      console.log("Checkout session completed:", session)

      // Extract metadata
      const planType = session.metadata?.planType
      const billingInterval = session.metadata?.billingInterval

      console.log(`User subscribed to ${planType} plan with ${billingInterval} billing`)

      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription

      // In a real application, you would:
      // 1. Update the subscription status in your database
      // 2. Handle upgrades/downgrades
      console.log("Subscription updated:", subscription)
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription

      // In a real application, you would:
      // 1. Update the subscription status in your database
      // 2. Remove access to paid features
      console.log("Subscription deleted:", subscription)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return new NextResponse("Webhook received", { status: 200 })
}

