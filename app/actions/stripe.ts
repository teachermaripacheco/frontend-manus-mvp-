"use server"
import { stripe } from "@/lib/stripe"

export type PlanType = "basic" | "premium" | "pro"
export type BillingInterval = "monthly" | "annual"

// Pricing in cents
const PRICING = {
  basic: {
    monthly: 999, // $9.99
    annual: 7990, // $79.90 (equivalent to $6.66/month)
  },
  premium: {
    monthly: 1999, // $19.99
    annual: 15990, // $159.90 (equivalent to $13.33/month)
  },
  pro: {
    monthly: 2999, // $29.99
    annual: 23990, // $239.90 (equivalent to $19.99/month)
  },
}

export async function createCheckoutSession(planType: PlanType, billingInterval: BillingInterval) {
  try {
    // Get the price based on plan and interval
    const amount = PRICING[planType][billingInterval]
    const name = `SURI AI ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/canceled`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: name,
              description: `${billingInterval === "annual" ? "Annual" : "Monthly"} subscription to ${name}`,
            },
            unit_amount: amount,
            recurring: {
              interval: billingInterval === "annual" ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        planType,
        billingInterval,
      },
    })

    if (!session.url) {
      throw new Error("Failed to create checkout session")
    }

    // Return the URL instead of redirecting
    return { url: session.url }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

